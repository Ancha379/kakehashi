import { supabase } from '../lib/supabase';
import { getViewerSlug } from '../lib/viewer';
import type { Lang } from './types';

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  lang: Lang;
  original: string;
  translated: string;
  time: string;
  createdAt: string;
}

export interface ChatThreadSummary {
  id: string;
  /** slug perusahaan lawan bicara. */
  companyId: string;
  lastOriginal: string;
  lastTime: string;
}

interface MsgRow {
  id: string;
  sender_company_id: string;
  lang: Lang;
  original_text: string;
  translated_text: string | null;
  created_at: string;
}

// Cache id viewer, di-keyed oleh slug supaya otomatis re-resolve saat viewer
// berganti (mis. demo id-01 -> perusahaan sendiri setelah login).
let cachedSlug: string | null = null;
let viewerIdCache: string | null = null;
async function getViewerId(): Promise<string | null> {
  const slug = getViewerSlug();
  if (!slug) return null;
  if (cachedSlug === slug && viewerIdCache) return viewerIdCache;
  const { data } = await supabase.from('companies').select('id').eq('slug', slug).maybeSingle();
  cachedSlug = slug;
  viewerIdCache = data?.id ?? null;
  return viewerIdCache;
}

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function mapMessage(row: MsgRow, viewerId: string | null): ChatMessage {
  return {
    id: row.id,
    sender: row.sender_company_id === viewerId ? 'me' : 'them',
    lang: row.lang,
    original: row.original_text,
    translated: row.translated_text ?? '',
    time: fmtTime(row.created_at),
    createdAt: row.created_at
  };
}

/** Daftar percakapan viewer + preview pesan terakhir (dua arah: viewer bisa a ATAU b). */
export async function fetchThreads(): Promise<ChatThreadSummary[]> {
  const viewerId = await getViewerId();
  if (!viewerId) return [];
  const { data, error } = await supabase
    .from('threads')
    .select(
      'id, created_at, company_a_id, a:companies!company_a_id(slug), b:companies!company_b_id(slug), messages ( original_text, created_at )'
    )
    .or(`company_a_id.eq.${viewerId},company_b_id.eq.${viewerId}`)
    .order('created_at', { ascending: true });
  if (error) throw error;

  interface ThreadRow {
    id: string;
    company_a_id: string;
    a: { slug: string } | null;
    b: { slug: string } | null;
    messages: { original_text: string; created_at: string }[];
  }
  return ((data as unknown as ThreadRow[]) ?? []).map((t) => {
    const msgs = [...(t.messages ?? [])].sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
    const last = msgs[msgs.length - 1];
    return {
      id: t.id,
      // Mitra = sisi lawan dari viewer.
      companyId: (t.company_a_id === viewerId ? t.b?.slug : t.a?.slug) ?? '',
      lastOriginal: last?.original_text ?? '',
      lastTime: last ? fmtTime(last.created_at) : ''
    };
  });
}

/** Pesan pada satu thread, urut waktu. */
export async function fetchMessages(threadId: string): Promise<ChatMessage[]> {
  const viewerId = await getViewerId();
  const { data, error } = await supabase
    .from('messages')
    .select('id, sender_company_id, lang, original_text, translated_text, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return ((data as MsgRow[]) ?? []).map((r) => mapMessage(r, viewerId));
}

/**
 * Kirim pesan sebagai viewer (front-end demo: tanpa auth per-perusahaan).
 * Utama: lewat Edge Function `translate-message` yang menerjemahkan (Haiku 4.5)
 * lalu menyimpan pesan berikut terjemahannya. Bila fungsi gagal (mis. secret
 * ANTHROPIC_API_KEY belum di-set), fallback ke insert langsung tanpa terjemahan
 * agar chat tetap berfungsi.
 */
export async function sendMessage(threadId: string, lang: Lang, original: string): Promise<ChatMessage> {
  const viewerId = await getViewerId();

  try {
    // Pengirim ditentukan server dari JWT (bukan dikirim klien).
    const { data, error } = await supabase.functions.invoke('translate-message', {
      body: { threadId, lang, original }
    });
    if (error) throw error;
    const row = (data as { message?: MsgRow })?.message;
    if (!row) throw new Error('Edge Function tidak mengembalikan pesan');
    return mapMessage(row, viewerId);
  } catch (err) {
    console.warn('[chat] terjemahan gagal, fallback insert tanpa terjemahan:', err);
    const { data, error } = await supabase
      .from('messages')
      .insert({ thread_id: threadId, sender_company_id: viewerId, lang, original_text: original })
      .select('id, sender_company_id, lang, original_text, translated_text, created_at')
      .single();
    if (error) throw error;
    return mapMessage(data as MsgRow, viewerId);
  }
}

/** Langganan Realtime: panggil onMessage tiap ada INSERT pesan baru di thread. */
export function subscribeMessages(threadId: string, onMessage: (m: ChatMessage) => void): () => void {
  const channel = supabase
    .channel(`messages-${threadId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${threadId}` },
      (payload) => onMessage(mapMessage(payload.new as MsgRow, viewerIdCache))
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}
