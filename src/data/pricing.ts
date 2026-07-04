import type { Bilingual } from './types';

export interface PricingRow {
  item: Bilingual;
  fee: Bilingual;
  note: Bilingual;
  highlight?: boolean;
}

/** Tabel biaya — edit di sini, tampilan mengikuti otomatis. */
export const pricingRows: PricingRow[] = [
  {
    item: { id: 'Pendaftaran & screening', ja: '登録・審査' },
    fee: { id: 'Gratis', ja: '無料' },
    note: {
      id: 'Verifikasi legalitas & rekam jejak oleh ANC Japan',
      ja: 'ANCジャパンによる法人確認・実績審査'
    }
  },
  {
    item: { id: 'Biaya bulanan platform', ja: '月額利用料' },
    fee: { id: 'Rp 0 / ¥0', ja: '0円' },
    note: {
      id: 'Tidak ada biaya berlangganan selama fase awal',
      ja: 'サービス初期フェーズは月額費用なし'
    }
  },
  {
    item: { id: 'AI matching & chat (AI translation)', ja: 'AIマッチング・チャット（AI翻訳）' },
    fee: { id: 'Gratis', ja: '無料' },
    note: {
      id: 'Termasuk rekomendasi AI & terjemahan otomatis JP⇔ID',
      ja: 'AIレコメンドと日⇔尼自動翻訳を含む'
    }
  },
  {
    item: { id: 'Pendampingan koordinator', ja: 'コーディネーター伴走支援' },
    fee: { id: 'Gratis', ja: '無料' },
    note: {
      id: 'Pendampingan dari perkenalan hingga negosiasi',
      ja: '出会いから交渉まで標準サポート'
    }
  },
  {
    item: { id: 'Success fee (saat deal terjadi)', ja: '成功報酬（成約時のみ）' },
    fee: { id: '3–5% dari nilai kontrak', ja: '成約金額の3〜5%' },
    note: {
      id: 'Disepakati kedua pihak sebelum negosiasi dimulai',
      ja: '交渉開始前に双方合意のうえ決定'
    },
    highlight: true
  },
  {
    item: { id: 'Konsultasi lanjutan (implementasi, HR, ekspansi)', ja: '追加コンサルティング（実行支援・HR・展開）' },
    fee: { id: 'Penawaran terpisah', ja: '別途お見積り' },
    note: {
      id: 'Opsional, sesuai kebutuhan pasca-deal',
      ja: '成約後のニーズに応じて任意でご利用可能'
    }
  }
];
