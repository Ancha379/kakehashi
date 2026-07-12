import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Company } from '../data/types';
import { fetchCompanies } from '../data/companiesApi';
import { useAuth } from './AuthProvider';

interface CompaniesContextValue {
  companies: Company[];
  loading: boolean;
  error: string | null;
  getCompany: (id: string) => Company | undefined;
  reload: () => void;
}

const CompaniesContext = createContext<CompaniesContextValue | null>(null);

/** Memuat direktori perusahaan dari Supabase sekali, lalu menyediakannya ke seluruh app. */
export function CompaniesProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  // Refetch saat sesi auth berubah: RLS baru mengembalikan perusahaan sendiri
  // (termasuk yang masih 'pending') setelah token terpasang di client.
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchCompanies()
      .then((data) => {
        if (active) setCompanies(data);
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [nonce, userId]);

  const value = useMemo<CompaniesContextValue>(() => {
    const byId = new Map(companies.map((c) => [c.id, c]));
    return {
      companies,
      loading,
      error,
      getCompany: (id: string) => byId.get(id),
      reload: () => setNonce((n) => n + 1)
    };
  }, [companies, loading, error]);

  return <CompaniesContext.Provider value={value}>{children}</CompaniesContext.Provider>;
}

export function useCompanies(): CompaniesContextValue {
  const ctx = useContext(CompaniesContext);
  if (!ctx) throw new Error('useCompanies harus dipakai di dalam <CompaniesProvider>');
  return ctx;
}

/** Perusahaan demo yang dianggap sedang "login" (sementara, hingga auth penuh). */
export const currentCompanyId = 'id-01';
