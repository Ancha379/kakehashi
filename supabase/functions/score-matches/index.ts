// Edge Function: score-matches — AI Matching sungguhan (Haiku 4.5).
// Dipanggil staf ANC (coordinator/admin):
//  - { companyId }      : nilai 1 perusahaan vs seluruh direktori verified
//                         (dipakai otomatis setelah approve di screening).
//  - { mode:'backfill' } : lengkapi pasangan yang belum punya skor, maksimal
//                         beberapa subjek per panggilan (hindari timeout);
//                         respons berisi `remaining` — frontend memanggil ulang
//                         sampai 0.
// Menulis tabel `matches` dua arah (a→b & b→a) dengan alasan dwibahasa.
import Anthropic from 'npm:@anthropic-ai/sdk@0.68.0';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const SYSTEM_PROMPT = `Anda analis business-matching senior untuk Kakehashi (ANC Japan) — platform yang menjodohkan perusahaan Indonesia dan Jepang untuk perdagangan, kemitraan, sourcing, dan investasi.

Tugas: menilai kecocokan bisnis antara SATU perusahaan subjek dan beberapa perusahaan kandidat.

Kriteria skor (0-100):
- 85-100: kebutuhan saling melengkapi secara langsung (yang dicari subjek = yang ditawarkan kandidat atau sebaliknya), industri relevan, lintas negara ID⇔JP.
- 70-84: komplementer kuat tapi tidak persis (industri berdekatan, tujuan cocok).
- 50-69: ada potensi tapi perlu penyesuaian.
- 0-49: kecocokan lemah (tujuan/industri tidak nyambung, atau sesama negara tanpa sinergi jelas).
Platform ini fokus menjembatani Indonesia⇔Jepang; pasangan sesama negara hanya menonjol bila sinerginya nyata.

Format keluaran: HANYA array JSON valid, tanpa teks lain, tanpa markdown fence. Satu objek per kandidat:
{"slug":"...","score":<int 0-100>,"reason_for_subject_ja":"...","reason_for_subject_id":"...","reason_for_candidate_ja":"...","reason_for_candidate_id":"..."}

- reason_for_subject: 1 kalimat mengapa KANDIDAT menarik bagi SUBJEK (ditampilkan ke subjek).
- reason_for_candidate: 1 kalimat mengapa SUBJEK menarik bagi KANDIDAT (ditampilkan ke kandidat).
- _ja = bahasa Jepang bisnis yang wajar; _id = bahasa Indonesia.
- Kalimat konkret menyebut produk/kebutuhan, bukan basa-basi.`;

interface CompanyRow {
  id: string;
  slug: string;
  name_ja: string;
  name_id: string;
  country: 'JP' | 'ID';
  industry: string;
  size: string;
  purposes: string[] | null;
  summary_ja: string | null;
  summary_id: string | null;
  description_ja: string | null;
  description_id: string | null;
  company_items: { kind: 'offering' | 'seeking'; text_ja: string; text_id: string }[] | null;
}

interface ScoreItem {
  slug: string;
  score: number;
  reason_for_subject_ja: string;
  reason_for_subject_id: string;
  reason_for_candidate_ja: string;
  reason_for_candidate_id: string;
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Profil kompak memakai bahasa asli perusahaan (JP→ja, ID→id).
function profileText(c: CompanyRow): string {
  const ja = c.country === 'JP';
  const name = ja ? c.name_ja : c.name_id;
  const summary = (ja ? c.summary_ja : c.summary_id) ?? '';
  const desc = (ja ? c.description_ja : c.description_id) ?? '';
  const items = c.company_items ?? [];
  const offering = items.filter((i) => i.kind === 'offering').map((i) => (ja ? i.text_ja : i.text_id));
  const seeking = items.filter((i) => i.kind === 'seeking').map((i) => (ja ? i.text_ja : i.text_id));
  return [
    `slug: ${c.slug}`,
    `nama: ${name}`,
    `negara: ${c.country} | industri: ${c.industry} | skala: ${c.size}`,
    `tujuan: ${(c.purposes ?? []).join(', ') || '-'}`,
    `ringkasan: ${summary}${desc ? ' — ' + desc : ''}`,
    `menawarkan: ${offering.join('; ') || '-'}`,
    `mencari: ${seeking.join('; ') || '-'}`
  ].join('\n');
}

function parseScores(text: string): ScoreItem[] {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start < 0 || end < 0) throw new Error('JSON array tidak ditemukan di keluaran model');
  const arr = JSON.parse(cleaned.slice(start, end + 1)) as ScoreItem[];
  return arr.filter(
    (s) =>
      s && typeof s.slug === 'string' && Number.isFinite(s.score) &&
      typeof s.reason_for_subject_ja === 'string' && typeof s.reason_for_subject_id === 'string'
  );
}

const CHUNK = 8; // kandidat per panggilan Claude (jaga keandalan JSON & output)
const BACKFILL_SUBJECTS_PER_CALL = 3; // hindari timeout; frontend memanggil ulang

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Metode tidak didukung' }, 405);

  try {
    const { companyId, mode } = await req.json().catch(() => ({}));

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) return jsonResponse({ error: 'ANTHROPIC_API_KEY belum di-set' }, 500);
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    // Hanya staf ANC yang boleh memicu penilaian (menghabiskan kredit API).
    const authHeader = req.headers.get('Authorization') ?? '';
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false }
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return jsonResponse({ error: 'Tidak terautentikasi' }, 401);

    const service = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    const { data: profile } = await service
      .from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (!profile || !['coordinator', 'admin'].includes(profile.role)) {
      return jsonResponse({ error: 'Hanya staf ANC' }, 403);
    }

    // Seluruh perusahaan verified + item tawar/cari.
    const { data: companiesData, error: cErr } = await service
      .from('companies')
      .select(
        'id, slug, name_ja, name_id, country, industry, size, purposes, summary_ja, summary_id, description_ja, description_id, company_items(kind, text_ja, text_id)'
      )
      .eq('verification_status', 'verified');
    if (cErr) throw cErr;
    const companies = (companiesData ?? []) as CompanyRow[];
    const bySlug = new Map(companies.map((c) => [c.slug, c]));
    const byId = new Map(companies.map((c) => [c.id, c]));

    // Tentukan pekerjaan: subjek → daftar kandidat yang perlu dinilai.
    let work: { subject: CompanyRow; candidates: CompanyRow[] }[] = [];
    let remaining = 0;

    if (mode === 'backfill') {
      const { data: existing, error: mErr } = await service
        .from('matches').select('company_a_id, company_b_id');
      if (mErr) throw mErr;
      const have = new Set((existing ?? []).map((m) => `${m.company_a_id}|${m.company_b_id}`));
      const all: { subject: CompanyRow; candidates: CompanyRow[] }[] = [];
      for (const subject of companies) {
        const missing = companies.filter(
          (c) =>
            c.id !== subject.id &&
            (!have.has(`${subject.id}|${c.id}`) || !have.has(`${c.id}|${subject.id}`))
        );
        if (missing.length > 0) all.push({ subject, candidates: missing });
        // Pasangan akan tertutup dua arah saat subjek pertama diproses; set
        // `have` di-update di bawah agar subjek berikutnya tak mengulang.
        for (const c of missing) {
          have.add(`${subject.id}|${c.id}`);
          have.add(`${c.id}|${subject.id}`);
        }
      }
      work = all.slice(0, BACKFILL_SUBJECTS_PER_CALL);
      remaining = Math.max(0, all.length - work.length);
    } else {
      if (!companyId) return jsonResponse({ error: 'companyId wajib diisi' }, 400);
      const subject = byId.get(companyId);
      if (!subject) return jsonResponse({ error: 'Perusahaan tidak ditemukan / belum verified' }, 404);
      const candidates = companies.filter((c) => c.id !== subject.id);
      if (candidates.length === 0) return jsonResponse({ scored: 0, remaining: 0 }, 200);
      work = [{ subject, candidates }];
    }

    const anthropic = new Anthropic({ apiKey });
    let scored = 0;
    const failures: string[] = [];

    for (const { subject, candidates } of work) {
      for (let i = 0; i < candidates.length; i += CHUNK) {
        const chunk = candidates.slice(i, i + CHUNK);
        const userMsg =
          `PERUSAHAAN SUBJEK:\n${profileText(subject)}\n\n` +
          `KANDIDAT (${chunk.length}):\n\n` +
          chunk.map((c, n) => `[${n + 1}]\n${profileText(c)}`).join('\n\n') +
          `\n\nNilai kecocokan subjek dengan SETIAP kandidat. Keluarkan HANYA array JSON.`;
        try {
          const completion = await anthropic.messages.create({
            model: 'claude-haiku-4-5',
            max_tokens: 4096,
            system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
            messages: [{ role: 'user', content: userMsg }]
          });
          const text = completion.content
            .filter((b) => b.type === 'text')
            .map((b) => (b as { text: string }).text)
            .join('');
          const items = parseScores(text);
          const rows: Record<string, unknown>[] = [];
          for (const it of items) {
            const cand = bySlug.get(it.slug);
            if (!cand || cand.id === subject.id) continue;
            const score = Math.max(0, Math.min(100, Math.round(it.score)));
            rows.push({
              company_a_id: subject.id, company_b_id: cand.id, score,
              reason_ja: it.reason_for_subject_ja, reason_id: it.reason_for_subject_id
            });
            rows.push({
              company_a_id: cand.id, company_b_id: subject.id, score,
              reason_ja: it.reason_for_candidate_ja ?? it.reason_for_subject_ja,
              reason_id: it.reason_for_candidate_id ?? it.reason_for_subject_id
            });
          }
          if (rows.length > 0) {
            const { error: upErr } = await service
              .from('matches')
              .upsert(rows, { onConflict: 'company_a_id,company_b_id' });
            if (upErr) throw upErr;
            scored += rows.length / 2;
          }
        } catch (e) {
          failures.push(`${subject.slug} chunk ${i / CHUNK}: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
    }

    return jsonResponse({ scored, remaining, failures }, 200);
  } catch (e) {
    return jsonResponse({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
