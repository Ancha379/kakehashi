import { supabase } from '../lib/supabase';
import { getViewerSlug } from '../lib/viewer';
import type { ActiveDeal, MatchRequest } from './dashboard';
import type { Bilingual } from './types';

export interface DashboardNotification {
  id: string;
  type: 'match' | 'message' | 'system';
  text: Bilingual;
  createdAt: string;
}

export interface DashboardStats {
  profileViews: number;
  newMatches: number;
  unreadMessages: number;
  activeMeetings: number;
}

export interface DashboardData {
  requests: MatchRequest[];
  deals: ActiveDeal[];
  notifications: DashboardNotification[];
  stats: DashboardStats;
  profileCompletion: number;
}

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
  company_a_id: string;
  a: { slug: string } | null;
  b: { slug: string } | null;
}

interface NotifRow {
  id: string;
  type: 'match' | 'message' | 'system';
  text_ja: string | null;
  text_id: string | null;
  created_at: string;
}

interface StatsRow {
  profile_views: number;
  new_matches: number;
  unread_messages: number;
  profile_completion: number;
}

const dateOnly = (iso: string) => iso.slice(0, 10);

const EMPTY: DashboardData = {
  requests: [],
  deals: [],
  notifications: [],
  stats: { profileViews: 0, newMatches: 0, unreadMessages: 0, activeMeetings: 0 },
  profileCompletion: 0
};

/** Ambil seluruh data dashboard perusahaan viewer dari Supabase. */
export async function fetchDashboard(): Promise<DashboardData> {
  const slug = getViewerSlug();
  if (!slug) return EMPTY;
  const { data: viewer } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();
  const viewerId = viewer?.id;
  if (!viewerId) return EMPTY;

  // Awal bulan berjalan (UTC) — untuk statistik "match baru bulan ini".
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const [reqRes, dealRes, notifRes, statsRes, matchCountRes, viewCountRes, unreadRes] =
    await Promise.all([
    supabase
      .from('match_requests')
      .select('id, message_ja, message_id, created_at, from:companies!from_company_id(slug)')
      .eq('to_company_id', viewerId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
    // Dua arah: viewer bisa jadi company_a ATAU company_b (penerima 商談
    // selalu jadi company_a saat deal dibuat — pengaju ada di sisi b).
    supabase
      .from('deals')
      .select(
        'id, stage, last_update_ja, last_update_id, updated_at, company_a_id, a:companies!company_a_id(slug), b:companies!company_b_id(slug)'
      )
      .or(`company_a_id.eq.${viewerId},company_b_id.eq.${viewerId}`)
      .order('updated_at', { ascending: false }),
    supabase
      .from('notifications')
      .select('id, type, text_ja, text_id, created_at')
      .eq('company_id', viewerId)
      .order('created_at', { ascending: false }),
    supabase
      .from('company_stats')
      .select('profile_views, new_matches, unread_messages, profile_completion')
      .eq('company_id', viewerId)
      .maybeSingle(),
    // Match nyata: permintaan 商談 yang di-accept bulan ini, dua arah.
    supabase
      .from('match_requests')
      .select('id', { count: 'exact', head: true })
      .or(`from_company_id.eq.${viewerId},to_company_id.eq.${viewerId}`)
      .eq('status', 'accepted')
      .gte('created_at', monthStart.toISOString()),
    // View profil nyata (tabel profile_views; RLS: hanya view yang diterima viewer).
    supabase
      .from('profile_views')
      .select('id', { count: 'exact', head: true })
      .eq('viewed_company_id', viewerId),
    // Pesan belum dibaca nyata (RPC; pesan mitra setelah last_read per thread).
    supabase.rpc('unread_message_count')
  ]);

  for (const res of [reqRes, dealRes, notifRes, statsRes]) {
    if (res.error) throw res.error;
  }

  const requests: MatchRequest[] = ((reqRes.data as unknown as ReqRow[]) ?? []).map((r) => ({
    id: r.id,
    companyId: r.from?.slug ?? '',
    message: { ja: r.message_ja ?? '', id: r.message_id ?? '' },
    date: dateOnly(r.created_at)
  }));

  const deals: ActiveDeal[] = ((dealRes.data as unknown as DealRow[]) ?? []).map((d) => ({
    id: d.id,
    // Mitra = sisi lawan dari viewer.
    companyId: (d.company_a_id === viewerId ? d.b?.slug : d.a?.slug) ?? '',
    stage: d.stage,
    lastUpdate: { ja: d.last_update_ja ?? '', id: d.last_update_id ?? '' },
    date: dateOnly(d.updated_at)
  }));

  const notifications: DashboardNotification[] = ((notifRes.data as NotifRow[]) ?? []).map((n) => ({
    id: n.id,
    type: n.type,
    text: { ja: n.text_ja ?? '', id: n.text_id ?? '' },
    createdAt: n.created_at
  }));

  const s = statsRes.data as StatsRow | null;
  const stats: DashboardStats = {
    // View profil NYATA dari tabel profile_views (dedup harian, hanya
    // perusahaan lain). Angka seed di company_stats tak dipakai lagi.
    profileViews: viewCountRes.count ?? 0,
    // Match baru dihitung nyata (accepted bulan ini); fallback angka seed.
    newMatches: matchCountRes.count ?? s?.new_matches ?? 0,
    // Unread NYATA dari mark-baca per thread; angka seed tak dipakai lagi.
    unreadMessages: (unreadRes.data as number | null) ?? 0,
    // 商談 aktif dihitung nyata dari jumlah deal.
    activeMeetings: deals.length
  };

  return { requests, deals, notifications, stats, profileCompletion: s?.profile_completion ?? 0 };
}
