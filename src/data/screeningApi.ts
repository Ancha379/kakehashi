import { supabase } from '../lib/supabase';
import type { CompanySize, Country, Industry, Purpose } from './types';

export interface PendingCompany {
  id: string;
  slug: string;
  name_id: string;
  name_ja: string;
  country: Country;
  industry: Industry;
  size: CompanySize;
  summary_id: string;
  summary_ja: string;
  website: string | null;
  purposes: Purpose[];
  offering: string[];
  seeking: string[];
  createdAt: string;
}

interface PendingRow {
  id: string;
  slug: string;
  name_id: string;
  name_ja: string;
  country: Country;
  industry: Industry;
  size: CompanySize;
  summary_id: string;
  summary_ja: string;
  website: string | null;
  purposes: Purpose[] | null;
  created_at: string;
  company_items: { kind: 'offering' | 'seeking'; text_id: string; position: number }[] | null;
}

function mapPending(r: PendingRow): PendingCompany {
  const items = [...(r.company_items ?? [])].sort((a, b) => a.position - b.position);
  return {
    id: r.id,
    slug: r.slug,
    name_id: r.name_id,
    name_ja: r.name_ja,
    country: r.country,
    industry: r.industry,
    size: r.size,
    summary_id: r.summary_id,
    summary_ja: r.summary_ja,
    website: r.website,
    purposes: r.purposes ?? [],
    offering: items.filter((i) => i.kind === 'offering').map((i) => i.text_id),
    seeking: items.filter((i) => i.kind === 'seeking').map((i) => i.text_id),
    createdAt: r.created_at
  };
}

/**
 * Perusahaan menunggu verifikasi (RLS: hanya staf yang bisa lihat pending).
 * Kontak PIC tidak diambil di sini (kolom privat) — staf melihatnya di halaman
 * detail perusahaan via RPC company_contact.
 */
export async function fetchPendingCompanies(): Promise<PendingCompany[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(
      'id, slug, name_id, name_ja, country, industry, size, summary_id, summary_ja, website, purposes, created_at, company_items(kind, text_id, position)'
    )
    .eq('verification_status', 'pending')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return ((data as unknown as PendingRow[]) ?? []).map(mapPending);
}

/** Setujui (verified) atau tolak (rejected) — RLS: hanya staf. */
export async function setVerificationStatus(id: string, status: 'verified' | 'rejected'): Promise<void> {
  const { error } = await supabase.from('companies').update({ verification_status: status }).eq('id', id);
  if (error) throw error;
}
