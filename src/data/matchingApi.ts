import { supabase } from '../lib/supabase';

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
