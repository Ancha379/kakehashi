// Edge Function: translate-message
// Menerjemahkan pesan chat JP<->ID via Claude Haiku 4.5, lalu menyimpan pesan
// (original + terjemahan) ke tabel `messages` memakai service role. Dengan
// begitu API key Anthropic tak pernah ada di front-end, dan pesan yang
// disiarkan lewat Realtime sudah membawa terjemahannya.
import Anthropic from 'npm:@anthropic-ai/sdk@0.68.0';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Panduan penerjemahan dwibahasa untuk konteks bisnis B2B Indonesia<->Jepang.
// Catatan: prompt caching baru aktif bila prefix >= 4096 token (Haiku). Prompt
// ini masih di bawah itu, jadi `cache_control` terpasang tapi belum "menggigit"
// sampai panduan/glosarium diperbesar.
const SYSTEM_PROMPT = `Anda penerjemah profesional untuk platform business matching B2B antara perusahaan Indonesia dan Jepang (Kakehashi oleh ANC Japan).

Tugas: terjemahkan pesan chat bisnis antara bahasa Indonesia (id) dan bahasa Jepang (ja).

Aturan:
- Keluarkan HANYA teks terjemahan akhir. Tanpa penjelasan, tanpa catatan, tanpa tanda kutip pembungkus, tanpa menuliskan ulang teks sumber.
- Pertahankan makna, nuansa, dan tingkat kesopanan bisnis. Untuk bahasa Jepang gunakan bentuk sopan (敬語/です・ます) yang wajar untuk komunikasi antar perusahaan.
- Jaga konsistensi istilah dagang/logistik/regulasi (mis. ekspor-impor, bea cukai, sertifikasi halal, MOQ, lead time, PIC, invoice, PO).
- Nama perusahaan, nama orang, merek, kode produk, angka, satuan, dan mata uang dibiarkan apa adanya.
- Jika teks sumber sudah dalam bahasa target, kembalikan apa adanya.
- Pertahankan sapaan seperti "-san"/"様" bila muncul.`;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return jsonResponse({ error: 'Metode tidak didukung' }, 405);

  try {
    const { threadId, lang, original, senderSlug = 'id-01' } = await req.json();
    if (!threadId || !lang || !original || (lang !== 'ja' && lang !== 'id')) {
      return jsonResponse({ error: 'threadId, lang (ja|id), dan original wajib diisi' }, 400);
    }

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) return jsonResponse({ error: 'ANTHROPIC_API_KEY belum di-set sebagai secret' }, 500);

    const target = lang === 'ja' ? 'id' : 'ja';
    const targetName = target === 'ja' ? 'bahasa Jepang' : 'bahasa Indonesia';

    const anthropic = new Anthropic({ apiKey });
    const completion = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: `Terjemahkan pesan berikut ke ${targetName}:\n\n${original}` }]
    });

    const translated = completion.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('slug', senderSlug)
      .maybeSingle();

    const { data: row, error } = await supabase
      .from('messages')
      .insert({
        thread_id: threadId,
        sender_company_id: company?.id ?? null,
        lang,
        original_text: original,
        translated_text: translated
      })
      .select('id, sender_company_id, lang, original_text, translated_text, created_at')
      .single();
    if (error) throw error;

    return jsonResponse({ message: row, usage: completion.usage }, 200);
  } catch (e) {
    return jsonResponse({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
