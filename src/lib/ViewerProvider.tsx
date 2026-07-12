import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';
import { useDemoMode } from './DemoModeProvider';
import { DEMO_VIEWER_SLUG, setViewerSlug } from './viewer';

type UserRole = 'company_admin' | 'coordinator' | 'admin';

interface ViewerContextValue {
  /** slug perusahaan viewer, atau null bila login tapi belum punya perusahaan. */
  slug: string | null;
  /** true = login & sudah tertaut ke perusahaan (atau mode demo). */
  hasCompany: boolean;
  /** role user login (null saat demo/anon). */
  role: UserRole | null;
  /** true = coordinator/admin (staf ANC). */
  isStaff: boolean;
  /** sedang menentukan perusahaan viewer. */
  loading: boolean;
  /** Muat ulang tautan perusahaan (mis. setelah onboarding). */
  refresh: () => void;
}

const ViewerContext = createContext<ViewerContextValue | null>(null);

export function ViewerProvider({ children }: { children: ReactNode }) {
  const { session, loading: authLoading } = useAuth();
  const { demo } = useDemoMode();
  const [slug, setSlug] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  const userId = session?.user?.id ?? null;

  useEffect(() => {
    let active = true;

    // Belum tahu status sesi → tunggu.
    if (authLoading) {
      setLoading(true);
      return;
    }

    // Login → resolusi perusahaan dari profil.
    if (userId) {
      setLoading(true);
      (async () => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_id, role')
          .eq('id', userId)
          .maybeSingle();
        let resolved: string | null = null;
        if (profile?.company_id) {
          const { data: company } = await supabase
            .from('companies')
            .select('slug')
            .eq('id', profile.company_id)
            .maybeSingle();
          resolved = company?.slug ?? null;
        }
        if (!active) return;
        // resolved bisa null (staf/onboarding) — JANGAN fallback ke id-01.
        setViewerSlug(resolved);
        setSlug(resolved);
        setRole((profile?.role as UserRole) ?? null);
        setLoading(false);
      })();
      return () => {
        active = false;
      };
    }

    // Tidak login: mode demo → id-01; kalau tidak, gate yang menangani.
    setRole(null);
    if (demo) {
      setViewerSlug(DEMO_VIEWER_SLUG);
      setSlug(DEMO_VIEWER_SLUG);
    } else {
      setViewerSlug(null);
      setSlug(null);
    }
    setLoading(false);
    return () => {
      active = false;
    };
  }, [userId, demo, authLoading, nonce]);

  const value = useMemo<ViewerContextValue>(
    () => ({
      slug,
      hasCompany: slug !== null,
      role,
      isStaff: role === 'coordinator' || role === 'admin',
      loading,
      refresh: () => setNonce((n) => n + 1)
    }),
    [slug, role, loading]
  );

  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}

export function useViewer(): ViewerContextValue {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error('useViewer harus dipakai di dalam <ViewerProvider>');
  return ctx;
}
