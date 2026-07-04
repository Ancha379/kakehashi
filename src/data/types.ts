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
  | 'automotive';

export type Purpose = 'sales' | 'sourcing' | 'partnership' | 'investment' | 'talent';

export type CompanySize = 'small' | 'medium' | 'large';

export interface Company {
  id: string;
  name_ja: string;
  name_id: string;
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
