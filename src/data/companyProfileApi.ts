import { supabase } from '../lib/supabase';
import { getViewerSlug } from '../lib/viewer';
import type { Company, CompanySize, Industry, Purpose } from './types';

export interface ProfileEditPayload {
  name: string;
  industry: Industry;
  size: CompanySize;
  founded: number | null;
  website: string;
  location_id: string;
  location_ja: string;
  summary_id: string;
  summary_ja: string;
  description_id: string;
  description_ja: string;
  purposes: Purpose[];
  pic_name: string;
  pic_title_id: string;
  pic_title_ja: string;
  pic_email: string;
  /** Satu item per baris. */
  offering: string[];
  seeking: string[];
}

async function getMyCompanyId(): Promise<string | null> {
  const { data } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', getViewerSlug())
    .maybeSingle();
  return data?.id ?? null;
}

/** Simpan profil perusahaan viewer + ganti daftar offering/seeking. */
export async function saveCompanyProfile(p: ProfileEditPayload): Promise<void> {
  const id = await getMyCompanyId();
  if (!id) throw new Error('Perusahaan tidak ditemukan');

  const summaryId = p.summary_id.trim() || p.summary_ja.trim() || p.name.trim();
  const summaryJa = p.summary_ja.trim() || p.summary_id.trim() || p.name.trim();

  const { error } = await supabase
    .from('companies')
    .update({
      name_ja: p.name.trim(),
      name_id: p.name.trim(),
      industry: p.industry,
      size: p.size,
      founded: p.founded,
      website: p.website.trim() || null,
      location_ja: p.location_ja.trim() || null,
      location_id: p.location_id.trim() || null,
      summary_ja: summaryJa,
      summary_id: summaryId,
      description_ja: p.description_ja.trim() || null,
      description_id: p.description_id.trim() || null,
      purposes: p.purposes,
      pic_name: p.pic_name.trim() || null,
      pic_title_ja: p.pic_title_ja.trim() || null,
      pic_title_id: p.pic_title_id.trim() || null,
      pic_email: p.pic_email.trim() || null
    })
    .eq('id', id);
  if (error) throw error;

  // Ganti seluruh item (offering/seeking).
  const { error: delErr } = await supabase.from('company_items').delete().eq('company_id', id);
  if (delErr) throw delErr;

  const rows = [
    ...p.offering.map((t, i) => ({ company_id: id, kind: 'offering', text_ja: t, text_id: t, position: i })),
    ...p.seeking.map((t, i) => ({ company_id: id, kind: 'seeking', text_ja: t, text_id: t, position: i }))
  ];
  if (rows.length) {
    const { error: insErr } = await supabase.from('company_items').insert(rows);
    if (insErr) throw insErr;
  }
}

/** Persentase kelengkapan profil dari field terisi (untuk kartu dashboard). */
export function computeProfileCompletion(c: Company | undefined): number {
  if (!c) return 0;
  const checks = [
    !!(c.summary_id || c.summary_ja),
    !!(c.description_id || c.description_ja),
    !!(c.location_id || c.location_ja),
    !!c.website,
    !!c.pic.name,
    !!c.pic.email,
    c.offering.length > 0,
    c.seeking.length > 0,
    c.purpose.length > 0,
    c.founded > 0
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}
