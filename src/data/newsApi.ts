import { supabase } from '../lib/supabase';
import type { NewsItem } from './news';

interface NewsRow {
  id: string;
  category_ja: string | null;
  category_id: string | null;
  title_ja: string | null;
  title_id: string | null;
  summary_ja: string | null;
  summary_id: string | null;
  premium: boolean;
  date: string;
}

/** Ambil berita/info, terbaru dulu. */
export async function fetchNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('id, category_ja, category_id, title_ja, title_id, summary_ja, summary_id, premium, date')
    .order('date', { ascending: false });
  if (error) throw error;
  return ((data as NewsRow[]) ?? []).map((r) => ({
    id: r.id,
    category: { ja: r.category_ja ?? '', id: r.category_id ?? '' },
    title: { ja: r.title_ja ?? '', id: r.title_id ?? '' },
    summary: { ja: r.summary_ja ?? '', id: r.summary_id ?? '' },
    date: r.date,
    premium: r.premium
  }));
}
