import { supabase } from '../lib/supabase';
import { getViewerSlug } from '../lib/viewer';

export type MatchRequestStatus = 'pending' | 'accepted' | 'declined';

export interface OutgoingRequest {
  id: string;
  /** slug perusahaan tujuan permintaan. */
  toSlug: string;
  status: MatchRequestStatus;
  createdAt: string;
}

interface OutgoingRow {
  id: string;
  status: MatchRequestStatus;
  created_at: string;
  to: { slug: string } | null;
}

/** Ambil permintaan 商談 yang DIKIRIM perusahaan viewer (untuk status tombol & dashboard). */
export async function fetchOutgoingRequests(): Promise<OutgoingRequest[]> {
  const slug = getViewerSlug();
  if (!slug) return [];
  const { data: viewer } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  const viewerId = viewer?.id;
  if (!viewerId) return [];
  const { data, error } = await supabase
    .from('match_requests')
    .select('id, status, created_at, to:companies!to_company_id(slug)')
    .eq('from_company_id', viewerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return ((data as unknown as OutgoingRow[]) ?? []).map((r) => ({
    id: r.id,
    toSlug: r.to?.slug ?? '',
    status: r.status,
    createdAt: r.created_at
  }));
}

/** Ajukan 商談 (business meeting) ke perusahaan target (via RPC ber-gate). */
export async function requestMeeting(targetSlug: string, message?: string): Promise<void> {
  const { error } = await supabase.rpc('request_meeting', {
    p_target_slug: targetSlug,
    p_message: message ?? null
  });
  if (error) throw error;
}

/** Terima/tolak permintaan match masuk (hanya penerima). Terima -> buat thread + deal. */
export async function respondMatchRequest(requestId: string, accept: boolean): Promise<void> {
  const { error } = await supabase.rpc('respond_match_request', {
    p_request_id: requestId,
    p_accept: accept
  });
  if (error) throw error;
}
