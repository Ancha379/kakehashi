import type { Bilingual } from './types';
import type { LucideIcon } from 'lucide-react';
import {
  ShieldCheck,
  Languages,
  Sparkles,
  Users,
  Compass,
  SearchX,
  MessageSquareWarning,
  BadgeCheck,
  Workflow,
  HeartHandshake,
  Building2
} from 'lucide-react';

export interface FeatureItem {
  icon: LucideIcon;
  title: Bilingual;
  desc: Bilingual;
}

/** 4 keunggulan utama (特徴). */
export const features: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: { id: 'Kepercayaan', ja: '信頼性' },
    desc: {
      id: 'Hanya perusahaan yang lolos screening ANC Japan & mitranya yang bisa bergabung. Tidak ada akun anonim.',
      ja: 'ANCジャパンと提携先の審査を通過した企業のみが参加。匿名アカウントはありません。'
    }
  },
  {
    icon: Languages,
    title: { id: 'AI Translation', ja: 'AI翻訳' },
    desc: {
      id: 'Chat dan profil diterjemahkan otomatis JP⇔ID. Berkomunikasi lancar memakai bahasa masing-masing.',
      ja: 'チャットもプロフィールも日⇔尼で自動翻訳。お互い自分の言語のままスムーズにやり取り。'
    }
  },
  {
    icon: Sparkles,
    title: { id: 'AI Matching', ja: 'AIマッチング' },
    desc: {
      id: 'AI menganalisis kebutuhan dan menampilkan partner paling potensial lengkap dengan skor kecocokan.',
      ja: 'AIがニーズを分析し、マッチ度スコア付きで最適なパートナー候補を提案します。'
    }
  },
  {
    icon: Users,
    title: { id: 'Pendampingan Konsultan', ja: 'コンサルタント伴走' },
    desc: {
      id: 'Koordinator ANC Japan mendampingi dari perkenalan sampai deal — pilar layanan, bukan sekadar tambahan.',
      ja: '出会いから成約までコーディネーターが伴走。オプションではなく、サービスの柱です。'
    }
  }
];

/** 3 pain points (課題). */
export const painPoints: FeatureItem[] = [
  {
    icon: Compass,
    title: {
      id: '“Ingin ekspansi, tapi bingung mulai dari mana”',
      ja: '「海外展開したいが、何から始めればいいか分からない」'
    },
    desc: {
      id: 'Riset pasar, regulasi, budaya bisnis — semuanya terasa asing tanpa pemandu lokal yang paham kedua negara.',
      ja: '市場調査・規制・商習慣 — 両国を知る案内役がいなければ、すべてが手探りです。'
    }
  },
  {
    icon: SearchX,
    title: {
      id: '“Susah cari partner yang bisa dipercaya”',
      ja: '「信頼できるパートナーが見つからない」'
    },
    desc: {
      id: 'Informasi perusahaan asing sulit diverifikasi. Salah pilih partner bisa berakibat fatal bagi bisnis.',
      ja: '海外企業の情報は検証が困難。パートナー選びの失敗は大きな損失につながります。'
    }
  },
  {
    icon: MessageSquareWarning,
    title: {
      id: '“Kendala bahasa & perbedaan budaya bisnis”',
      ja: '「言語の壁とビジネス文化の違い」'
    },
    desc: {
      id: 'Negosiasi penting jadi lambat dan rawan salah paham ketika kedua pihak tidak berbagi bahasa yang sama.',
      ja: '共通言語がないと、重要な交渉ほど時間がかかり、誤解も生まれやすくなります。'
    }
  }
];

/** 4 alasan dipilih (選ばれる理由). */
export const whyChooseUs: FeatureItem[] = [
  {
    icon: BadgeCheck,
    title: { id: 'Jaringan tervalidasi di dua negara', ja: '両国の審査済みネットワーク' },
    desc: {
      id: 'ANC Japan berbasis di Nagoya dengan jaringan mitra di Indonesia — kami mengenal kedua pasar dari dalam.',
      ja: '名古屋を拠点に、インドネシアにも提携ネットワーク。両市場を内側から理解しています。'
    }
  },
  {
    icon: Workflow,
    title: { id: 'Teknologi + manusia', ja: 'テクノロジー × 人' },
    desc: {
      id: 'AI mempercepat pencarian; konsultan memastikan kualitas. Kombinasi yang tidak bisa digantikan salah satunya saja.',
      ja: 'AIがスピードを、コンサルタントが質を担保。どちらか一方では成り立ちません。'
    }
  },
  {
    icon: HeartHandshake,
    title: { id: 'Berpihak pada kedua sisi', ja: '双方の成功が前提' },
    desc: {
      id: 'Model success-fee membuat kami hanya berhasil jika Anda berhasil — insentif kami sejalan dengan Anda.',
      ja: '成功報酬型のため、お客様の成約が私たちの成果。インセンティブが完全に一致しています。'
    }
  },
  {
    icon: Building2,
    title: { id: 'Pengalaman HR & bisnis Indonesia–Jepang', ja: '日尼HR・ビジネスの実績' },
    desc: {
      id: 'Bertahun-tahun menjembatani SDM dan bisnis kedua negara — matching hanyalah awal dari dukungan kami.',
      ja: '長年、日尼の人材とビジネスを橋渡ししてきました。マッチングは支援の入り口にすぎません。'
    }
  }
];
