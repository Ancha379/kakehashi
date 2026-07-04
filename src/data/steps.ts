import type { Bilingual } from './types';
import type { LucideIcon } from 'lucide-react';
import {
  UserPlus,
  Sparkles,
  ShieldCheck,
  Handshake,
  FileCheck,
  MessagesSquare,
  Users
} from 'lucide-react';

export interface FlowStep {
  icon: LucideIcon;
  title: Bilingual;
  desc: Bilingual;
}

/** Alur layanan 4 STEP (section landing). */
export const serviceFlow: FlowStep[] = [
  {
    icon: UserPlus,
    title: { id: 'Daftar & buat profil', ja: '登録・プロフィール作成' },
    desc: {
      id: 'Isi profil perusahaan dalam bahasa Anda — AI menerjemahkannya otomatis. Tim ANC Japan memverifikasi perusahaan Anda.',
      ja: '自国語で企業プロフィールを作成 — AIが自動翻訳します。ANCジャパンが企業審査を行います。'
    }
  },
  {
    icon: Sparkles,
    title: { id: 'Matching & negosiasi', ja: 'マッチング・商談' },
    desc: {
      id: 'AI merekomendasikan partner paling cocok. Ajukan meeting dan mulai chat dengan terjemahan otomatis.',
      ja: 'AIが最適なパートナー候補を提案。商談を申し込み、自動翻訳チャットでやり取りを開始します。'
    }
  },
  {
    icon: ShieldCheck,
    title: { id: 'Verifikasi & pendampingan', ja: '確認・伴走支援' },
    desc: {
      id: 'Koordinator ANC Japan mendampingi negosiasi, menjembatani budaya bisnis, dan memverifikasi detail kesepakatan.',
      ja: 'コーディネーターが交渉に同席し、商習慣の違いを橋渡し。取引条件を丁寧に確認します。'
    }
  },
  {
    icon: Handshake,
    title: { id: 'Deal aman', ja: '安心して成約' },
    desc: {
      id: 'Kontrak ditandatangani dengan dukungan penuh. Success fee hanya dibayar saat hasil terwujud.',
      ja: '万全のサポートのもとで契約締結。成功報酬は成果が出たときだけ。'
    }
  }
];

/** Mekanisme / cara kerja (section landing). */
export const howItWorks: FlowStep[] = [
  {
    icon: ShieldCheck,
    title: { id: 'Screening perusahaan', ja: '企業審査' },
    desc: {
      id: 'Setiap perusahaan diverifikasi legalitas dan rekam jejaknya sebelum tampil di platform.',
      ja: '掲載前にすべての企業の法人情報・実績を確認します。'
    }
  },
  {
    icon: Sparkles,
    title: { id: 'AI merekomendasikan kandidat', ja: 'AIが候補を提案' },
    desc: {
      id: 'AI menganalisis industri, kebutuhan, dan tujuan untuk menghitung skor kecocokan.',
      ja: '業種・ニーズ・目的を分析し、マッチ度スコアを算出します。'
    }
  },
  {
    icon: MessagesSquare,
    title: { id: 'Komunikasi tanpa hambatan bahasa', ja: '言語の壁のないやり取り' },
    desc: {
      id: 'Chat dan profil diterjemahkan otomatis JP⇔ID — cukup pakai bahasa masing-masing.',
      ja: 'チャットもプロフィールも日⇔尼で自動翻訳。自分の言語だけでOK。'
    }
  },
  {
    icon: Users,
    title: { id: 'Koordinator mendampingi', ja: 'コーディネーターが伴走' },
    desc: {
      id: 'Dari meeting pertama sampai negosiasi harga, koordinator dwibahasa selalu hadir.',
      ja: '初回商談から価格交渉まで、バイリンガル担当者が常にサポート。'
    }
  },
  {
    icon: FileCheck,
    title: { id: 'Kesepakatan yang aman', ja: '安全な契約へ' },
    desc: {
      id: 'Dokumen dan syarat kesepakatan diperiksa bersama sebelum tanda tangan.',
      ja: '契約書と取引条件を第三者視点で確認したうえで締結します。'
    }
  }
];
