import { supabase } from '../lib/supabase';
import type { Lang } from './types';

/** Perusahaan viewer (demo yang dianggap login). */
const VIEWER_SLUG = 'id-01';

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

let viewerIdCache: string | null = null;
async function getViewerId(): Promise<string | null> {
  if (viewerIdCache) return viewerIdCache;
  const { data } = await supabase.from('companies').select('id').eq('slug', VIEWER_SLUG).maybeSingle();
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

/** Daftar percakapan viewer + preview pesan terakhir. */
export async function fetchThreads(): Promise<ChatThreadSummary[]> {
  const viewerId = await getViewerId();
  if (!viewerId) return [];
  const { data, error } = await supabase
    .from('threads')
    .select('id, created_at, partner:companies!company_b_id(slug), messages ( original_text, created_at )')
    .eq('company_a_id', viewerId)
    .order('created_at', { ascending: true });
  if (error) throw error;

  return ((data as unknown as { id: string; partner: { slug: string } | null; messages: { original_text: string; created_at: string }[] }[]) ?? []).map(
    (t) => {
      const msgs = [...(t.messages ?? [])].sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
      const last = msgs[msgs.length - 1];
      return {
        id: t.id,
        companyId: t.partner?.slug ?? '',
        lastOriginal: last?.original_text ?? '',
        lastTime: last ? fmtTime(last.created_at) : ''
      };
    }
  );
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
    const { data, error } = await supabase.functions.invoke('translate-message', {
      body: { threadId, lang, original, senderSlug: VIEWER_SLUG }
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
