import type { Bilingual } from './types';

export interface NewsItem {
  id: string;
  category: Bilingual;
  title: Bilingual;
  summary: Bilingual;
  date: string;
  /** true = konten penuh hanya untuk member berbayar. */
  premium: boolean;
}

/**
 * Mock berita — fokus peraturan/informasi Indonesia yang relevan bagi
 * perusahaan Jepang, tersedia dwibahasa. Sebagian gratis, sebagian premium
 * (khusus member). Edit di sini tanpa menyentuh JSX.
 */
export const newsItems: NewsItem[] = [
  {
    id: 'news-01',
    category: { id: 'Investasi', ja: '投資' },
    title: {
      id: 'Revisi Daftar Prioritas Investasi 2026',
      ja: '2026年 投資優先リスト改正のポイント'
    },
    summary: {
      id: 'Ringkasan perubahan sektor yang terbuka bagi investasi asing dan batas kepemilikan terbaru.',
      ja: '外国投資に開放される分野と、最新の出資比率上限の変更点をまとめました。'
    },
    date: '2026-07-01',
    premium: false
  },
  {
    id: 'news-02',
    category: { id: 'Ketenagakerjaan', ja: '労務' },
    title: {
      id: 'Upah Minimum Provinsi (UMP) 2026',
      ja: '2026年 州別最低賃金（UMP）一覧'
    },
    summary: {
      id: 'Daftar UMP terbaru per provinsi dan implikasinya bagi perencanaan tenaga kerja.',
      ja: '州別の最新UMPと、人員計画への影響を解説します。'
    },
    date: '2026-06-24',
    premium: false
  },
  {
    id: 'news-03',
    category: { id: 'Sertifikasi', ja: '認証' },
    title: {
      id: 'Kewajiban Sertifikasi Halal: Jadwal & Tahapan',
      ja: 'ハラール認証義務化：スケジュールと手続きの全手順'
    },
    summary: {
      id: 'Panduan lengkap tahapan, dokumen, dan tenggat sertifikasi halal untuk produk impor.',
      ja: '輸入品のハラール認証について、手順・必要書類・期限を網羅した完全ガイド。'
    },
    date: '2026-06-18',
    premium: true
  },
  {
    id: 'news-04',
    category: { id: 'Ekspor-Impor', ja: '輸出入' },
    title: {
      id: 'Prosedur Lisensi Impor (API) & Bea Cukai',
      ja: '輸入ライセンス（API）と通関手続きの実務'
    },
    summary: {
      id: 'Langkah pengurusan API, klasifikasi HS code, dan tips mempercepat proses kepabeanan.',
      ja: 'API取得の流れ、HSコード分類、通関を早める実務のコツを解説。'
    },
    date: '2026-06-10',
    premium: true
  },
  {
    id: 'news-05',
    category: { id: 'Perizinan', ja: '許認可' },
    title: {
      id: 'Panduan OSS: Perizinan Usaha Berbasis Risiko',
      ja: 'OSS入門：リスクベース事業許可の取り方'
    },
    summary: {
      id: 'Cara membuat NIB dan izin usaha lewat sistem OSS, dari registrasi hingga terbit.',
      ja: 'OSSシステムでのNIB取得と事業許可の申請手順を、登録から発行まで。'
    },
    date: '2026-05-30',
    premium: false
  },
  {
    id: 'news-06',
    category: { id: 'Pendirian PT', ja: '法人設立' },
    title: {
      id: 'Syarat Pendirian PT PMA (Modal Asing)',
      ja: '現地法人（PT PMA）設立の要件と資本金'
    },
    summary: {
      id: 'Persyaratan modal, struktur pemegang saham, dan dokumen pendirian perusahaan modal asing.',
      ja: '外国資本企業の資本要件・株主構成・設立書類を詳しく解説。'
    },
    date: '2026-05-21',
    premium: true
  }
];
