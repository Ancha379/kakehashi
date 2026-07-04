import type { Lang } from './types';

export interface ChatMessage {
  id: string;
  /** 'me' = perusahaan demo (id-01), 'them' = lawan bicara. */
  sender: 'me' | 'them';
  /** Bahasa teks asli pesan. */
  lang: Lang;
  original: string;
  translated: string;
  time: string;
}

export interface ChatThread {
  id: string;
  /** id perusahaan lawan bicara (lihat companies.ts). */
  companyId: string;
  messages: ChatMessage[];
}

/** Dua percakapan dummy JP⇔ID dari sudut pandang PT Nusantara Coffee Sejahtera. */
export const chatThreads: ChatThread[] = [
  {
    id: 'thread-1',
    companyId: 'jp-02', // Sakura Foods
    messages: [
      {
        id: 't1-m1',
        sender: 'them',
        lang: 'ja',
        original:
          'はじめまして。さくら食品の佐藤です。貴社のアラビカ豆に大変興味があります。まずはサンプルをお願いできますか？',
        translated:
          'Salam kenal. Saya Sato dari Sakura Foods. Kami sangat tertarik dengan biji arabika Anda. Bisakah kami meminta sampel terlebih dahulu?',
        time: '09:12'
      },
      {
        id: 't1-m2',
        sender: 'me',
        lang: 'id',
        original:
          'Terima kasih, Sato-san! Tentu, kami bisa kirim sampel 2 kg minggu ini. Apakah ada preferensi profil rasa atau tingkat roasting?',
        translated:
          '佐藤様、ありがとうございます！もちろんです。今週中に2kgのサンプルをお送りできます。味のプロファイルや焙煎度のご希望はありますか？',
        time: '09:30'
      },
      {
        id: 't1-m3',
        sender: 'them',
        lang: 'ja',
        original:
          '中煎りを希望します。輸送方法については、ANCジャパンのコーディネーターにも相談済みです。',
        translated:
          'Kami ingin medium roast. Mengenai metode pengiriman, kami juga sudah berkonsultasi dengan koordinator ANC Japan.',
        time: '10:02'
      },
      {
        id: 't1-m4',
        sender: 'me',
        lang: 'id',
        original:
          'Baik, kami siapkan medium roast dari lot Jawa Barat panen terbaru. Dokumen COA dan traceability akan kami lampirkan juga.',
        translated:
          '承知しました。西ジャワの最新収穫ロットから中煎りをご用意します。COA（成績書）とトレーサビリティ資料も添付いたします。',
        time: '10:15'
      },
      {
        id: 't1-m5',
        sender: 'them',
        lang: 'ja',
        original: '助かります。サンプル到着後、社内でカッピングを行い、来週中に商談の日程をご相談させてください。',
        translated:
          'Sangat membantu. Setelah sampel tiba, kami akan melakukan cupping internal, lalu mari kita atur jadwal meeting dalam minggu depan.',
        time: '10:40'
      }
    ]
  },
  {
    id: 'thread-2',
    companyId: 'jp-05', // Nihon Logistics Partners
    messages: [
      {
        id: 't2-m1',
        sender: 'me',
        lang: 'id',
        original:
          'Selamat siang, Nakamura-san. Kami sedang menyiapkan pengiriman kopi rutin ke Shizuoka. Apakah NLP bisa menangani reefer container 20 kaki dari Tanjung Priok?',
        translated:
          '中村様、こんにちは。静岡向けのコーヒー定期輸送を準備しています。タンジュンプリオク港からの20フィート・リーファーコンテナに対応可能でしょうか？',
        time: '13:05'
      },
      {
        id: 't2-m2',
        sender: 'them',
        lang: 'ja',
        original:
          'こんにちは。はい、対応可能です。名古屋港経由で静岡までの一貫輸送プランをご提案できます。月間の想定本数を教えていただけますか？',
        translated:
          'Selamat siang. Ya, kami bisa menanganinya. Kami dapat mengusulkan rencana pengiriman terpadu ke Shizuoka via Pelabuhan Nagoya. Boleh tahu perkiraan jumlah kontainer per bulan?',
        time: '13:22'
      },
      {
        id: 't2-m3',
        sender: 'me',
        lang: 'id',
        original: 'Tahap awal 1 kontainer per bulan, dan bisa naik ke 2–3 kontainer mulai kuartal depan jika kontrak dengan buyer berjalan.',
        translated:
          '初期段階では月1本、バイヤーとの契約が進めば来四半期から月2〜3本に増える見込みです。',
        time: '13:31'
      },
      {
        id: 't2-m4',
        sender: 'them',
        lang: 'ja',
        original:
          '承知しました。それでは概算見積もりを作成し、ANCジャパンのコーディネーター同席のオンライン商談で詳細をご説明します。',
        translated:
          'Baik, kami mengerti. Kami akan menyiapkan estimasi biaya, lalu menjelaskan detailnya dalam meeting online bersama koordinator ANC Japan.',
        time: '14:00'
      }
    ]
  }
];
