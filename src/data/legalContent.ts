import type { Bilingual } from './types';

export interface LegalSection {
  heading: Bilingual;
  body: Bilingual[];
}

export interface LegalDoc {
  title: Bilingual;
  intro?: Bilingual;
  /** Catatan (mis. penanda draf untuk dokumen hukum). */
  note?: Bilingual;
  sections: LegalSection[];
}

// ── ANCについて / Tentang ANC Japan ─────────────────────────────
export const aboutDoc: LegalDoc = {
  title: { ja: 'ANCについて', id: 'Tentang ANC Japan' },
  intro: {
    ja: 'Kakehashi は、インドネシアと日本の企業をつなぐ B2B ビジネスマッチングプラットフォームです。株式会社ANCジャパンが運営し、PT Kebun Teknologi Indonesia と協働しています。',
    id: 'Kakehashi adalah platform business matching B2B yang mempertemukan perusahaan Indonesia dan Jepang, dioperasikan oleh ANC Japan bekerja sama dengan PT Kebun Teknologi Indonesia.'
  },
  sections: [
    {
      heading: { ja: '株式会社ANCジャパン', id: 'ANC Japan (株式会社ANCジャパン)' },
      body: [
        {
          ja: '名古屋を拠点とする人材・ビジネスコンサルティング会社です。日本とインドネシアの企業が信頼できるパートナーと出会い、共に事業を築けるよう支援しています。',
          id: 'Perusahaan konsultan SDM & bisnis yang berbasis di Nagoya, Jepang. ANC Japan membantu perusahaan Jepang dan Indonesia menemukan mitra tepercaya dan membangun bisnis bersama.'
        },
        {
          ja: 'Kakehashi の運営主体として、企業の審査、マッチング、商談のコーディネートを担います。',
          id: 'Sebagai operator Kakehashi, ANC Japan menangani proses screening perusahaan, matching, dan pendampingan business meeting (商談).'
        }
      ]
    },
    {
      heading: { ja: 'PT Kebun Teknologi Indonesia', id: 'PT Kebun Teknologi Indonesia' },
      body: [
        {
          ja: 'インドネシア側の技術・運営パートナーです。プラットフォームの開発・運用を担い、インドネシア企業の登録やオンボーディングをサポートします。',
          id: 'Mitra teknologi dan operasional di sisi Indonesia. PT Kebun Teknologi Indonesia mengembangkan dan mengoperasikan platform, serta mendukung pendaftaran dan onboarding perusahaan Indonesia.'
        }
      ]
    },
    {
      heading: { ja: 'ミッション', id: 'Misi Kami' },
      body: [
        {
          ja: 'インドネシアと日本の企業をつなぐ、信頼のビジネス架け橋になること。',
          id: 'Menjadi jembatan bisnis tepercaya yang menghubungkan perusahaan Indonesia dan Jepang.'
        }
      ]
    }
  ]
};

// ── プライバシーポリシー / Kebijakan Privasi ────────────────────
export const privacyDoc: LegalDoc = {
  title: { ja: 'プライバシーポリシー', id: 'Kebijakan Privasi' },
  note: {
    ja: '本書は雛形（ドラフト）です。正式公開の前に法務によるご確認をおすすめします。',
    id: 'Dokumen ini adalah draf/template. Disarankan ditinjau secara hukum sebelum peluncuran resmi.'
  },
  sections: [
    {
      heading: { ja: '1. 収集する情報', id: '1. Informasi yang Kami Kumpulkan' },
      body: [
        {
          ja: 'アカウント情報（メールアドレス）、会社プロフィール（会社名、業種、所在地、担当者情報など）、およびチャットで送信されたメッセージを収集します。',
          id: 'Kami mengumpulkan informasi akun (alamat email), profil perusahaan (nama perusahaan, industri, lokasi, informasi narahubung), serta pesan yang dikirim melalui chat.'
        }
      ]
    },
    {
      heading: { ja: '2. 利用目的', id: '2. Cara Kami Menggunakan Informasi' },
      body: [
        {
          ja: '企業マッチング、メッセージの自動翻訳（日本語⇔インドネシア語）、審査、およびユーザーへのご連絡のために利用します。',
          id: 'Untuk melakukan matching perusahaan, terjemahan otomatis pesan (Jepang⇔Indonesia), proses screening, serta komunikasi dengan pengguna.'
        }
      ]
    },
    {
      heading: { ja: '3. 第三者への提供・処理委託', id: '3. Pihak Ketiga' },
      body: [
        {
          ja: 'データの保管・処理には Supabase を、メッセージの自動翻訳には Anthropic（Claude）を利用します。ユーザーの個人情報を販売することはありません。',
          id: 'Kami menggunakan Supabase untuk penyimpanan & pemrosesan data, dan Anthropic (Claude) untuk terjemahan otomatis. Kami tidak menjual data pribadi pengguna.'
        }
      ]
    },
    {
      heading: { ja: '4. データの保護', id: '4. Keamanan Data' },
      body: [
        {
          ja: 'アクセス制御（行レベルセキュリティ）や通信の暗号化など、合理的な安全管理措置を講じています。',
          id: 'Kami menerapkan langkah pengamanan yang wajar, seperti kontrol akses (row-level security) dan enkripsi saat transmisi data.'
        }
      ]
    },
    {
      heading: { ja: '5. お客様の権利', id: '5. Hak Anda' },
      body: [
        {
          ja: 'ご自身の情報の閲覧・修正・削除をご希望の場合は、ANCジャパンまでお問い合わせください。',
          id: 'Anda dapat mengakses, memperbaiki, atau meminta penghapusan data Anda dengan menghubungi ANC Japan.'
        }
      ]
    },
    {
      heading: { ja: '6. お問い合わせ', id: '6. Kontak' },
      body: [
        {
          ja: '本ポリシーに関するお問い合わせは、株式会社ANCジャパンまでご連絡ください。',
          id: 'Untuk pertanyaan mengenai kebijakan ini, silakan hubungi ANC Japan.'
        }
      ]
    }
  ]
};

// ── 利用規約 / Syarat Layanan ───────────────────────────────────
export const termsDoc: LegalDoc = {
  title: { ja: '利用規約', id: 'Syarat Layanan' },
  note: {
    ja: '本書は雛形（ドラフト）です。正式公開の前に法務によるご確認をおすすめします。',
    id: 'Dokumen ini adalah draf/template. Disarankan ditinjau secara hukum sebelum peluncuran resmi.'
  },
  sections: [
    {
      heading: { ja: '1. 本規約への同意', id: '1. Penerimaan Syarat' },
      body: [
        {
          ja: 'Kakehashi（以下「本サービス」）を利用することにより、本規約に同意したものとみなされます。',
          id: 'Dengan menggunakan Kakehashi ("Layanan"), Anda dianggap menyetujui Syarat Layanan ini.'
        }
      ]
    },
    {
      heading: { ja: '2. サービス内容', id: '2. Tentang Layanan' },
      body: [
        {
          ja: '本サービスは、インドネシアと日本の企業をつなぐ B2B ビジネスマッチングを提供します。ANCジャパンはマッチングの成立や取引の成果を保証するものではありません。',
          id: 'Layanan menyediakan business matching B2B antara perusahaan Indonesia dan Jepang. ANC Japan tidak menjamin terjadinya kecocokan atau hasil transaksi tertentu.'
        }
      ]
    },
    {
      heading: { ja: '3. 登録と審査', id: '3. Pendaftaran & Verifikasi' },
      body: [
        {
          ja: '登録企業は ANCジャパンの審査を受けます。ディレクトリに掲載されるのは審査を通過した企業のみです。虚偽の情報を登録した場合、掲載を取り消すことがあります。',
          id: 'Perusahaan yang mendaftar akan melalui screening ANC Japan. Hanya perusahaan yang lolos verifikasi yang tampil di direktori. Informasi palsu dapat menyebabkan pencabutan.'
        }
      ]
    },
    {
      heading: { ja: '4. 利用者の責任', id: '4. Kewajiban Pengguna' },
      body: [
        {
          ja: '利用者は正確な情報を提供し、法令および商習慣に従って本サービスを利用するものとします。',
          id: 'Pengguna wajib memberikan informasi yang akurat dan menggunakan Layanan sesuai hukum yang berlaku serta etika bisnis.'
        }
      ]
    },
    {
      heading: { ja: '5. 禁止事項', id: '5. Larangan' },
      body: [
        {
          ja: '不正アクセス、スパム、虚偽の表明、第三者の権利侵害など、本サービスの目的に反する行為を禁止します。',
          id: 'Dilarang melakukan akses tidak sah, spam, pernyataan palsu, pelanggaran hak pihak ketiga, dan tindakan lain yang bertentangan dengan tujuan Layanan.'
        }
      ]
    },
    {
      heading: { ja: '6. 免責事項', id: '6. Batasan Tanggung Jawab' },
      body: [
        {
          ja: '本サービスは現状有姿で提供されます。利用者間の取引や連絡から生じた損害について、ANCジャパンは責任を負いません。',
          id: 'Layanan disediakan "sebagaimana adanya". ANC Japan tidak bertanggung jawab atas kerugian yang timbul dari transaksi atau komunikasi antar pengguna.'
        }
      ]
    },
    {
      heading: { ja: '7. 規約の変更', id: '7. Perubahan Syarat' },
      body: [
        {
          ja: '本規約は必要に応じて改定されることがあります。重要な変更がある場合はサービス上で告知します。',
          id: 'Syarat ini dapat diperbarui sewaktu-waktu. Perubahan penting akan diberitahukan melalui Layanan.'
        }
      ]
    },
    {
      heading: { ja: '8. お問い合わせ', id: '8. Kontak' },
      body: [
        {
          ja: '本規約に関するお問い合わせは、株式会社ANCジャパンまでご連絡ください。',
          id: 'Untuk pertanyaan mengenai Syarat ini, silakan hubungi ANC Japan.'
        }
      ]
    }
  ]
};
