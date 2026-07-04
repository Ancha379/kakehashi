import type { Bilingual } from './types';

export interface FaqItem {
  q: Bilingual;
  a: Bilingual;
}

export const faqItems: FaqItem[] = [
  {
    q: {
      id: 'Berapa biaya untuk menggunakan Kakehashi?',
      ja: 'Kakehashiの利用料金はいくらですか？'
    },
    a: {
      id: 'Pendaftaran, screening, AI matching, dan chat semuanya gratis. Kami hanya menerima success fee ketika kesepakatan bisnis benar-benar terjadi, dengan besaran yang disepakati di awal.',
      ja: '登録・審査・AIマッチング・チャットはすべて無料です。実際にビジネスが成約した場合のみ、事前に合意した料率の成功報酬をいただきます。'
    }
  },
  {
    q: {
      id: 'Perusahaan seperti apa yang bisa bergabung?',
      ja: 'どのような企業が参加できますか？'
    },
    a: {
      id: 'Perusahaan Indonesia dan Jepang dari berbagai industri (manufaktur, IT, F&B, tekstil, logistik, otomotif, dll). Semua pendaftar melewati proses screening oleh ANC Japan atau mitranya sebelum profil dipublikasikan.',
      ja: '製造・IT・食品・繊維・物流・自動車など、幅広い業種のインドネシア企業・日本企業が対象です。掲載前に、すべての企業がANCジャパンまたは提携先による審査を受けます。'
    }
  },
  {
    q: {
      id: 'Saya tidak bisa bahasa Jepang. Apakah tetap bisa berkomunikasi?',
      ja: 'インドネシア語ができなくても、やり取りできますか？'
    },
    a: {
      id: 'Bisa. Profil dan chat diterjemahkan otomatis JP⇔ID oleh AI, jadi masing-masing pihak cukup memakai bahasanya sendiri. Untuk negosiasi penting, koordinator dwibahasa ANC Japan siap mendampingi.',
      ja: 'はい。プロフィールもチャットもAIが日⇔尼で自動翻訳するため、お互い自分の言語のままやり取りできます。重要な交渉には、バイリンガルのコーディネーターが同席します。'
    }
  },
  {
    q: {
      id: 'Bagaimana Kakehashi menjamin keamanan dan kepercayaan?',
      ja: '取引の安全性はどのように担保されますか？'
    },
    a: {
      id: 'Hanya perusahaan yang lolos verifikasi (legalitas, rekam jejak, referensi) yang bisa tampil di platform. Selain itu, koordinator ANC Japan memantau proses dari perkenalan hingga kontrak.',
      ja: '法人確認・実績・レファレンスの審査を通過した企業のみ掲載されます。さらに、ANCジャパンのコーディネーターが出会いから契約まで一貫して伴走します。'
    }
  },
  {
    q: {
      id: 'Berapa lama sampai bertemu partner yang cocok?',
      ja: 'マッチングまでどのくらいかかりますか？'
    },
    a: {
      id: 'Tergantung industri dan kebutuhan, tetapi umumnya rekomendasi AI pertama muncul begitu profil selesai diverifikasi, dan meeting pertama bisa terjadi dalam 2–4 minggu.',
      ja: '業種やニーズによりますが、審査完了後すぐにAIのおすすめが表示され、初回商談まで2〜4週間程度が目安です。'
    }
  },
  {
    q: {
      id: 'Apakah ANC Japan membantu setelah deal terjadi?',
      ja: '成約後のサポートはありますか？'
    },
    a: {
      id: 'Ya. Sebagai perusahaan konsultan HR & bisnis Indonesia–Jepang, ANC Japan dapat mendampingi implementasi: kontrak, kepatuhan, rekrutmen, hingga ekspansi berikutnya (layanan konsultasi terpisah).',
      ja: 'はい。ANCジャパンは日尼のHR・ビジネスコンサルティング会社として、契約・コンプライアンス・採用・次の展開まで実行フェーズも支援できます（別途コンサルティング契約）。'
    }
  },
  {
    q: {
      id: 'Apakah data perusahaan saya aman?',
      ja: '企業情報の取り扱いは安全ですか？'
    },
    a: {
      id: 'Informasi sensitif (kontak PIC, detail kebutuhan) hanya dibuka kepada pihak yang sudah saling menyetujui match. Kami tidak menjual data ke pihak ketiga.',
      ja: '担当者連絡先や詳細ニーズなどの情報は、双方がマッチに合意した相手にのみ開示されます。第三者へのデータ販売は行いません。'
    }
  }
];
