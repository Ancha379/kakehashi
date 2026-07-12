import type { Bilingual } from './types';

export interface ContactOrg {
  name: Bilingual;
  /** Untuk siapa kontak ini. */
  forWho: Bilingual;
  address: Bilingual;
  phone: string;
  email: string;
}

// PLACEHOLDER — ganti dengan data asli. Nilai '—' berarti belum diisi.
export const contactOrgs: ContactOrg[] = [
  {
    name: { ja: '株式会社ANCジャパン', id: 'ANC Japan (株式会社ANCジャパン)' },
    forWho: { ja: '日本企業のお問い合わせ窓口', id: 'Untuk perusahaan Jepang' },
    address: {
      ja: '愛知県名古屋市（詳細は準備中）',
      id: 'Nagoya, Aichi, Jepang (detail akan diperbarui)'
    },
    phone: '—',
    email: '—'
  },
  {
    name: { ja: 'PT Kebun Teknologi Indonesia', id: 'PT Kebun Teknologi Indonesia' },
    forWho: { ja: 'インドネシア企業のお問い合わせ窓口', id: 'Untuk perusahaan Indonesia' },
    address: {
      ja: 'インドネシア（詳細は準備中）',
      id: 'Indonesia (detail akan diperbarui)'
    },
    phone: '—',
    email: '—'
  }
];
