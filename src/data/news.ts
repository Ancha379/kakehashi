import type { Bilingual } from './types';

// Bentuk data berita yang dipakai UI. Sumbernya kini dari Supabase (lihat
// `newsApi.ts`), bukan mock lagi.
export interface NewsItem {
  id: string;
  category: Bilingual;
  title: Bilingual;
  summary: Bilingual;
  date: string;
  /** true = konten penuh hanya untuk member berbayar. */
  premium: boolean;
}
