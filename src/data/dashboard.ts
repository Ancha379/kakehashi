import type { Bilingual } from './types';

export interface MatchRequest {
  id: string;
  companyId: string;
  message: Bilingual;
  date: string;
}

export interface ActiveDeal {
  id: string;
  companyId: string;
  stage: 'negotiation' | 'sample' | 'contract';
  lastUpdate: Bilingual;
  date: string;
}

export interface NotificationItem {
  id: string;
  type: 'match' | 'message' | 'system';
  text: Bilingual;
  time: Bilingual;
}

export const profileCompletion = 80;

export const dashboardStats = {
  profileViews: 128,
  newMatches: 12,
  unreadMessages: 3,
  activeMeetings: 2
};

export const matchRequests: MatchRequest[] = [
  {
    id: 'req-1',
    companyId: 'jp-07',
    message: {
      id: 'Kami ingin melakukan uji coba smart farming di kebun kopi mitra Anda.',
      ja: '貴社提携のコーヒー農園でスマート農業の実証実験をさせていただきたいです。'
    },
    date: '2026-07-02'
  },
  {
    id: 'req-2',
    companyId: 'jp-08',
    message: {
      id: 'Kami dapat menawarkan mesin roasting terekondisi untuk ekspansi fasilitas Anda.',
      ja: '貴社の設備拡張に向けて、整備済み焙煎機をご提案できます。'
    },
    date: '2026-07-01'
  }
];

export const activeDeals: ActiveDeal[] = [
  {
    id: 'deal-1',
    companyId: 'jp-02',
    stage: 'sample',
    lastUpdate: {
      id: 'Sampel 2 kg medium roast dikirim, menunggu hasil cupping.',
      ja: '中煎りサンプル2kgを発送済み。カッピング結果待ち。'
    },
    date: '2026-07-03'
  },
  {
    id: 'deal-2',
    companyId: 'jp-05',
    stage: 'negotiation',
    lastUpdate: {
      id: 'Menunggu estimasi biaya reefer container dari NLP.',
      ja: 'NLPからのリーファーコンテナ概算見積もり待ち。'
    },
    date: '2026-07-04'
  }
];

export const notifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'match',
    text: {
      id: 'AI menemukan 3 rekomendasi match baru untuk profil Anda.',
      ja: 'AIが新しいマッチ候補を3社見つけました。'
    },
    time: { id: '2 jam lalu', ja: '2時間前' }
  },
  {
    id: 'notif-2',
    type: 'message',
    text: {
      id: 'Pesan baru dari さくら食品株式会社 (Sakura Foods).',
      ja: 'さくら食品株式会社から新着メッセージがあります。'
    },
    time: { id: '5 jam lalu', ja: '5時間前' }
  },
  {
    id: 'notif-3',
    type: 'system',
    text: {
      id: 'Koordinator ANC Japan menjadwalkan meeting online: Jumat 10:00 WIB.',
      ja: 'ANCジャパンのコーディネーターがオンライン商談を設定しました：金曜12:00（日本時間）。'
    },
    time: { id: 'Kemarin', ja: '昨日' }
  },
  {
    id: 'notif-4',
    type: 'system',
    text: {
      id: 'Verifikasi dokumen legalitas Anda telah selesai. Profil kini berstatus “Tervalidasi”.',
      ja: '貴社の法人確認が完了しました。プロフィールは「審査済み」になりました。'
    },
    time: { id: '3 hari lalu', ja: '3日前' }
  }
];
