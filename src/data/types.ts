export type Lang = 'ja' | 'id';

/** Teks dwibahasa. Semua konten mock memakai bentuk ini. */
export interface Bilingual {
  ja: string;
  id: string;
}

export type Country = 'JP' | 'ID';

export type Industry =
  | 'manufacturing'
  | 'it'
  | 'fnb'
  | 'textile'
  | 'logistics'
  | 'automotive'
  | 'fishery'
  | 'education'
  | 'travel'
  | 'hospital'
  | 'handicraft'
  | 'hotelresort'
  | 'sport'
  | 'others';

export type Purpose =
  | 'sales'
  | 'export'
  | 'sourcing'
  | 'partnership'
  | 'investment'
  | 'talent';

export type CompanySize = 'small' | 'medium' | 'large';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface Company {
  id: string;
  name_ja: string;
  name_id: string;
  /** Status verifikasi ANC — hanya 'verified' tampil publik; pemilik tetap melihat miliknya. */
  verificationStatus: VerificationStatus;
  country: Country;
  industry: Industry;
  size: CompanySize;
  founded: number;
  location_ja: string;
  location_id: string;
  summary_ja: string;
  summary_id: string;
  description_ja: string;
  description_id: string;
  offering: Bilingual[];
  seeking: Bilingual[];
  purpose: Purpose[];
  matchScore: number;
  matchReason_ja: string;
  matchReason_id: string;
  /** Warna latar logo placeholder (inisial perusahaan). */
  logoColor: string;
  pic: {
    name: string;
    title_ja: string;
    title_id: string;
    email: string;
  };
  website: string;
}
