import type { Bilingual, Country } from './types';

// Bentuk data event yang dipakai UI. Sumbernya kini dari Supabase (lihat
// `eventsApi.ts`), bukan mock lagi.
export interface EventItem {
  id: string;
  title: Bilingual;
  country: Country;
  city: Bilingual;
  /** Rentang tanggal untuk ditampilkan (teks dwibahasa). */
  dateLabel: Bilingual;
  category: Bilingual;
}
