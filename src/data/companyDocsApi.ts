import { supabase } from '../lib/supabase';

/** Jenis dokumen verifikasi: registry = 登記簿謄本/Akta Pendirian, financial = 決算書/Laporan Keuangan. */
export type CompanyDocKind = 'registry' | 'financial';

export interface CompanyDocument {
  id: string;
  companyId: string;
  kind: CompanyDocKind;
  fileName: string;
  /** URL bertanda-tangan (berlaku 1 jam) — bucket privat. */
  url: string | null;
}

const BUCKET = 'company-docs';

/**
 * Unggah dokumen verifikasi milik perusahaan sendiri (policy storage menolak
 * path di luar folder perusahaan pengunggah) + catat metadata-nya.
 */
export async function uploadCompanyDocument(
  companyId: string,
  kind: CompanyDocKind,
  file: File
): Promise<void> {
  const ext = file.name.split('.').pop() || 'pdf';
  const path = `${companyId}/${kind}-${Date.now()}.${ext}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
  if (upErr) throw upErr;
  const { error: dbErr } = await supabase.from('company_documents').insert({
    company_id: companyId,
    kind,
    file_path: path,
    file_name: file.name
  });
  if (dbErr) throw dbErr;
}

/**
 * Dokumen sejumlah perusahaan + URL bertanda-tangan (RLS: pemilik/staf).
 * Dipakai panel screening koordinator.
 */
export async function fetchCompanyDocuments(companyIds: string[]): Promise<CompanyDocument[]> {
  if (companyIds.length === 0) return [];
  const { data, error } = await supabase
    .from('company_documents')
    .select('id, company_id, kind, file_path, file_name')
    .in('company_id', companyIds)
    .order('created_at', { ascending: true });
  if (error) throw error;
  interface Row {
    id: string;
    company_id: string;
    kind: CompanyDocKind;
    file_path: string;
    file_name: string;
  }
  const rows = (data as Row[]) ?? [];
  return Promise.all(
    rows.map(async (r) => {
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(r.file_path, 3600);
      return {
        id: r.id,
        companyId: r.company_id,
        kind: r.kind,
        fileName: r.file_name,
        url: signed?.signedUrl ?? null
      };
    })
  );
}
