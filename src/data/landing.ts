import type { Bilingual } from './types';

export interface StatCard {
  value: string;
  label: Bilingual;
  sub: Bilingual;
}

/** Statistik potensi pasar Indonesia. */
export const indonesiaStats: StatCard[] = [
  {
    value: '280jt+',
    label: { id: 'Populasi', ja: '人口' },
    sub: {
      id: 'Terbesar ke-4 di dunia, pasar domestik raksasa',
      ja: '世界第4位。巨大な国内市場'
    }
  },
  {
    value: '~70%',
    label: { id: 'Usia produktif', ja: '生産年齢人口' },
    sub: {
      id: 'Bonus demografi: tenaga muda melimpah',
      ja: '人口ボーナス期。若い労働力が豊富'
    }
  },
  {
    value: '#1',
    label: { id: 'Ekonomi ASEAN', ja: 'ASEAN最大の経済' },
    sub: {
      id: 'Kelas menengah tumbuh pesat setiap tahun',
      ja: '中間層が毎年急速に拡大'
    }
  }
];

/** Kebutuhan pasar Jepang. */
export const japanStats: StatCard[] = [
  {
    value: '-11jt',
    label: { id: 'Proyeksi kekurangan tenaga kerja 2040', ja: '2040年の労働力不足予測' },
    sub: {
      id: 'Jepang membutuhkan talenta & partner produksi',
      ja: '人材と生産パートナーが不可欠に'
    }
  },
  {
    value: '60%+',
    label: { id: 'Perusahaan ingin ekspansi ASEAN', ja: 'ASEAN展開を検討する企業' },
    sub: {
      id: 'Indonesia jadi tujuan prioritas investasi Jepang',
      ja: 'インドネシアは最優先の投資先のひとつ'
    }
  },
  {
    value: '65+ thn',
    label: { id: 'Hubungan diplomatik RI–Jepang', ja: '日尼外交関係' },
    sub: {
      id: 'Fondasi kepercayaan ekonomi yang panjang',
      ja: '長年築かれた経済的信頼の土台'
    }
  }
];
