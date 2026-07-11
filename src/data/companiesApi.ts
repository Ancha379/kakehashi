import { supabase } from '../lib/supabase';
import type { Company, CompanySize, Country, Industry, Purpose } from './types';

/** Bentuk baris dari tabel `companies` + relasi `company_items`. */
interface CompanyRow {
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
  pic_name: string | null;
  pic_title_ja: string | null;
  pic_title_id: string | null;
  pic_email: string | null;
  match_score: number | null;
  match_reason_ja: string | null;
  match_reason_id: string | null;
  company_items: {
    kind: 'offering' | 'seeking';
    text_ja: string;
    text_id: string;
    position: number;
  }[];
}

/** Petakan baris DB → tipe `Company` yang dipakai UI (id = slug agar kompatibel). */
function mapRow(row: CompanyRow): Company {
  const items = [...(row.company_items ?? [])].sort((a, b) => a.position - b.position);
  const pick = (kind: 'offering' | 'seeking') =>
    items.filter((i) => i.kind === kind).map((i) => ({ ja: i.text_ja, id: i.text_id }));

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
    matchScore: row.match_score ?? 0,
    matchReason_ja: row.match_reason_ja ?? '',
    matchReason_id: row.match_reason_id ?? '',
    logoColor: row.logo_color ?? '#334155',
    pic: {
      name: row.pic_name ?? '',
      title_ja: row.pic_title_ja ?? '',
      title_id: row.pic_title_id ?? '',
      email: row.pic_email ?? ''
    },
    website: row.website ?? ''
  };
}

/** Ambil semua perusahaan (terverifikasi terlihat via RLS) beserta item-nya. */
export async function fetchCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(
      'slug, name_ja, name_id, country, industry, size, founded, location_ja, location_id, ' +
        'summary_ja, summary_id, description_ja, description_id, purposes, website, logo_color, ' +
        'pic_name, pic_title_ja, pic_title_id, pic_email, match_score, match_reason_ja, match_reason_id, ' +
        'company_items ( kind, text_ja, text_id, position )'
    )
    .order('match_score', { ascending: false });

  if (error) throw error;
  return (data as unknown as CompanyRow[]).map(mapRow);
}
