import type { Bilingual } from './types';

// Bentuk data dashboard yang dipakai UI. Sumber datanya kini dari Supabase
// (lihat `dashboardApi.ts`), bukan mock lagi.

export interface MatchRequest {
  id: string;
  /** slug perusahaan pengirim permintaan. */
  companyId: string;
  message: Bilingual;
  date: string;
}

export interface ActiveDeal {
  id: string;
  /** slug perusahaan mitra (company_b). */
  companyId: string;
  stage: 'negotiation' | 'sample' | 'contract';
  lastUpdate: Bilingual;
  date: string;
}
