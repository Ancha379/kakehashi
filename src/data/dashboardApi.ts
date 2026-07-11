import { supabase } from '../lib/supabase';
import type { ActiveDeal, MatchRequest } from './dashboard';

/** Perusahaan viewer (demo yang dianggap login). */
const VIEWER_SLUG = 'id-01';

interface ReqRow {
  id: string;
  message_ja: string | null;
  message_id: string | null;
  created_at: string;
  from: { slug: string } | null;
}

interface DealRow {
  id: string;
  stage: 'negotiation' | 'sample' | 'contract';
  last_update_ja: string | null;
  last_update_id: string | null;
  updated_at: string;
  partner: { slug: string } | null;
}

const dateOnly = (iso: string) => iso.slice(0, 10);

/**
 * Ambil data dashboard perusahaan viewer dari Supabase:
 * - permintaan match masuk (status pending, ditujukan ke viewer)
 * - deal aktif (viewer sebagai company_a)
 */
export async function fetchDashboard(): Promise<{ requests: MatchRequest[]; deals: ActiveDeal[] }> {
  const { data: viewer } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', VIEWER_SLUG)
    .maybeSingle();
  const viewerId = viewer?.id;
  if (!viewerId) return { requests: [], deals: [] };

  const [{ data: reqData, error: reqErr }, { data: dealData, error: dealErr }] = await Promise.all([
    supabase
      .from('match_requests')
      .select('id, message_ja, message_id, created_at, from:companies!from_company_id(slug)')
      .eq('to_company_id', viewerId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
    supabase
      .from('deals')
      .select('id, stage, last_update_ja, last_update_id, updated_at, partner:companies!company_b_id(slug)')
      .eq('company_a_id', viewerId)
      .order('updated_at', { ascending: false })
  ]);
  if (reqErr) throw reqErr;
  if (dealErr) throw dealErr;

  const requests: MatchRequest[] = ((reqData as unknown as ReqRow[]) ?? []).map((r) => ({
    id: r.id,
    companyId: r.from?.slug ?? '',
    message: { ja: r.message_ja ?? '', id: r.message_id ?? '' },
    date: dateOnly(r.created_at)
  }));

  const deals: ActiveDeal[] = ((dealData as unknown as DealRow[]) ?? []).map((d) => ({
    id: d.id,
    companyId: d.partner?.slug ?? '',
    stage: d.stage,
    lastUpdate: { ja: d.last_update_ja ?? '', id: d.last_update_id ?? '' },
    date: dateOnly(d.updated_at)
  }));

  return { requests, deals };
}
