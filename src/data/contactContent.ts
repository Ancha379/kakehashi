import type { Bilingual } from './types';

export interface ContactOrg {
  name: Bilingual;
  /** Untuk siapa kontak ini. */
  forWho: Bilingual;
  address: Bilingual;
  phone: string;
  email: string;
}

export const contactOrgs: ContactOrg[] = [
  {
    name: { ja: '株式会社ANCジャパン', id: 'ANC Japan (株式会社ANCジャパン)' },
    forWho: { ja: '日本企業のお問い合わせ窓口', id: 'Untuk perusahaan Jepang' },
    address: {
      ja: '〒460-0008 名古屋市中区栄4-14-31 栄オークリッジ9F',
      id: '〒460-0008 Sakae Oak Ridge 9F, 4-14-31 Sakae, Naka-ku, Nagoya, Aichi, Jepang'
    },
    phone: '052-243-2328',
    email: 'info@anc-japan.com'
  },
  {
    name: { ja: 'PT Kebun Teknologi Indonesia', id: 'PT Kebun Teknologi Indonesia' },
    forWho: { ja: 'インドネシア企業のお問い合わせ窓口', id: 'Untuk perusahaan Indonesia' },
    address: {
      ja: 'Bekasi Town Square blok I10-I11, Jl. Cut Mutia, RT.003/RW.009, Margahayu, Bekasi Timur, Kota Bekasi, Jawa Barat 17113, Indonesia',
      id: 'Bekasi Town Square blok I10-I11, Jl. Cut Mutia, RT.003/RW.009, Margahayu, Bekasi Timur, Kota Bekasi, Jawa Barat 17113, Indonesia'
    },
    phone: '087783084446',
    email: 'business@kebun.tech'
  }
];
