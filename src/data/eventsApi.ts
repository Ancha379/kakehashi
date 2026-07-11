import { supabase } from '../lib/supabase';
import type { EventItem } from './events';

interface EventRow {
  id: string;
  title_ja: string | null;
  title_id: string | null;
  country: 'JP' | 'ID';
  city_ja: string | null;
  city_id: string | null;
  date_label_ja: string | null;
  date_label_id: string | null;
  category_ja: string | null;
  category_id: string | null;
  sort_order: number;
}

/** Ambil daftar event/expo, urut sesuai sort_order. */
export async function fetchEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title_ja, title_id, country, city_ja, city_id, date_label_ja, date_label_id, category_ja, category_id, sort_order'
    )
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return ((data as EventRow[]) ?? []).map((r) => ({
    id: r.id,
    title: { ja: r.title_ja ?? '', id: r.title_id ?? '' },
    country: r.country,
    city: { ja: r.city_ja ?? '', id: r.city_id ?? '' },
    dateLabel: { ja: r.date_label_ja ?? '', id: r.date_label_id ?? '' },
    category: { ja: r.category_ja ?? '', id: r.category_id ?? '' }
  }));
}
