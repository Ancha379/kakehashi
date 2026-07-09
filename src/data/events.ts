import type { Bilingual, Country } from './types';

export interface EventItem {
  id: string;
  title: Bilingual;
  /** Negara lokasi acara. */
  country: Country;
  city: Bilingual;
  /** Rentang tanggal untuk ditampilkan. */
  dateLabel: Bilingual;
  category: Bilingual;
}

/**
 * Mock daftar event — expo/pameran dagang di Indonesia & Jepang. Pendaftaran
 * peserta diurus oleh ANC Japan (lihat catatan di section Event).
 */
export const eventItems: EventItem[] = [
  {
    id: 'evt-01',
    title: { id: 'Trade Expo Indonesia 2026', ja: 'Trade Expo Indonesia 2026' },
    country: 'ID',
    city: { id: 'Jakarta (ICE BSD)', ja: 'ジャカルタ（ICE BSD）' },
    dateLabel: { id: '15–19 Okt 2026', ja: '2026年10月15〜19日' },
    category: { id: 'Ekspor / Multi-sektor', ja: '輸出・多分野' }
  },
  {
    id: 'evt-02',
    title: { id: 'Japan IT Week Autumn 2026', ja: 'Japan IT Week 秋 2026' },
    country: 'JP',
    city: { id: 'Tokyo (Makuhari Messe)', ja: '東京（幕張メッセ）' },
    dateLabel: { id: '21–23 Okt 2026', ja: '2026年10月21〜23日' },
    category: { id: 'IT & Software', ja: 'IT・ソフトウェア' }
  },
  {
    id: 'evt-03',
    title: { id: 'SIAL InterFOOD 2026', ja: 'SIAL InterFOOD 2026' },
    country: 'ID',
    city: { id: 'Jakarta (JIExpo Kemayoran)', ja: 'ジャカルタ（JIExpo）' },
    dateLabel: { id: '12–15 Nov 2026', ja: '2026年11月12〜15日' },
    category: { id: 'F&B & Agri', ja: '食品・農業' }
  },
  {
    id: 'evt-04',
    title: { id: 'Manufacturing Indonesia 2026', ja: 'Manufacturing Indonesia 2026' },
    country: 'ID',
    city: { id: 'Jakarta (JIExpo Kemayoran)', ja: 'ジャカルタ（JIExpo）' },
    dateLabel: { id: '2–5 Des 2026', ja: '2026年12月2〜5日' },
    category: { id: 'Manufaktur & Mesin', ja: '製造・機械' }
  },
  {
    id: 'evt-05',
    title: { id: 'FOODEX JAPAN 2027', ja: 'FOODEX JAPAN 2027' },
    country: 'JP',
    city: { id: 'Tokyo (Tokyo Big Sight)', ja: '東京（東京ビッグサイト）' },
    dateLabel: { id: '3–6 Mar 2027', ja: '2027年3月3〜6日' },
    category: { id: 'F&B & Agri', ja: '食品・農業' }
  },
  {
    id: 'evt-06',
    title: { id: 'Sustainable Fashion Expo Tokyo', ja: 'サステナブルファッション EXPO 東京' },
    country: 'JP',
    city: { id: 'Tokyo (Tokyo Big Sight)', ja: '東京（東京ビッグサイト）' },
    dateLabel: { id: '9–11 Sep 2026', ja: '2026年9月9〜11日' },
    category: { id: 'Tekstil & Garmen', ja: '繊維・アパレル' }
  }
];
