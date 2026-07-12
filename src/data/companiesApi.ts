import { supabase } from '../lib/supabase';
import { getViewerSlug } from '../lib/viewer';
import type { Company, CompanySize, Country, Industry, Purpose } from './types';

/** Bentuk baris dari tabel `companies` + relasi `company_items`. */
interface CompanyRow {
  id: string;
  slug: string;
  name_ja: string;
  name_id: string;
  country: Country;
  industry: Industry;
  size: CompanySize;
  founded: number | null;
  location_ja: string | null;
  location_id: string | null;
  summary_ja: string;
  summary_id: string;
  description_ja: string | null;
  description_id: string | null;
  purposes: Purpose[];
  website: string | null;
  logo_color: string | null;
  company_items: {
    kind: 'offering' | 'seeking';
    text_ja: string;
    text_id: string;
    position: number;
  }[];
}

interface MatchRow {
  company_b_id: string;
  score: number;
  reason_ja: string | null;
  reason_id: string | null;
}

// Catatan: kolom kontak PIC (pic_*) TIDAK diambil di sini — anon/authenticated
// tak punya hak SELECT-nya (lihat migrasi hide_pic_contact_from_public).
// Kontak PIC diambil terpisah via RPC `company_contact` (companyProfileApi).
const COMPANY_COLS =
  'id, slug, name_ja, name_id, country, industry, size, founded, location_ja, location_id, ' +
  'summary_ja, summary_id, description_ja, description_id, purposes, website, logo_color, ' +
  'company_items ( kind, text_ja, text_id, position )';

/** Petakan baris DB → tipe `Company` (id = slug agar kompatibel dgn kode lama). */
function mapRow(
  row: CompanyRow,
  match?: { score: number; reason_ja: string | null; reason_id: string | null }
): Company {
  const items = [...(row.company_items ?? [])].sort((a, b) => a.position - b.position);
  const pick = (kind: 'offering' | 'seeking') =>
    items.filter((i) => i.kind === kind).map((i) => ({ ja: i.text_ja, id: i.text_id }));

  const isViewer = row.slug === getViewerSlug();

  return {
    id: row.slug,
    name_ja: row.name_ja,
    name_id: row.name_id,
    country: row.country,
    industry: row.industry,
    size: row.size,
    founded: row.founded ?? 0,
    location_ja: row.location_ja ?? '',
    location_id: row.location_id ?? '',
    summary_ja: row.summary_ja,
    summary_id: row.summary_id,
    description_ja: row.description_ja ?? '',
    description_id: row.description_id ?? '',
    offering: pick('offering'),
    seeking: pick('seeking'),
    purpose: row.purposes ?? [],
    // Skor & alasan dari tabel matches (sudut pandang viewer). Perusahaan viewer
    // sendiri = 100.
    matchScore: isViewer ? 100 : match?.score ?? 0,
    matchReason_ja: isViewer ? '' : match?.reason_ja ?? '',
    matchReason_id: isViewer ? '' : match?.reason_id ?? '',
    logoColor: row.logo_color ?? '#334155',
    // Kontak PIC tidak ikut di direktori (privat) — diisi via RPC company_contact.
    pic: { name: '', title_ja: '', title_id: '', email: '' },
    website: row.website ?? ''
  };
}

/**
 * Ambil semua perusahaan (verified terlihat via RLS) + skor match dari sudut
 * pandang perusahaan viewer (id-01), digabung dari tabel `matches`.
 */
export async function fetchCompanies(): Promise<Company[]> {
  const { data: companyData, error: cErr } = await supabase.from('companies').select(COMPANY_COLS);
  if (cErr) throw cErr;
  const rows = companyData as unknown as CompanyRow[];

  const viewerId = rows.find((r) => r.slug === getViewerSlug())?.id;

  // Skor match berarah dari viewer → tiap perusahaan lain.
  const matchByCompanyId = new Map<string, MatchRow>();
  if (viewerId) {
    const { data: matchData, error: mErr } = await supabase
      .from('matches')
      .select('company_b_id, score, reason_ja, reason_id')
      .eq('company_a_id', viewerId);
    if (mErr) throw mErr;
    for (const m of (matchData as MatchRow[]) ?? []) matchByCompanyId.set(m.company_b_id, m);
  }

  return rows
    .map((r) => mapRow(r, matchByCompanyId.get(r.id)))
    .sort((a, b) => b.matchScore - a.matchScore);
}
