import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchOutgoingRequests, fetchPartnerSlugs } from '../data/matchingApi';
import type { OutgoingRequest } from '../data/matchingApi';
import { useViewer } from './ViewerProvider';

interface MatchRequestsContextValue {
  /** Semua permintaan 商談 yang dikirim perusahaan viewer. */
  outgoing: OutgoingRequest[];
  /** Jumlah permintaan yang masih menunggu jawaban. */
  pendingCount: number;
  /** true bila sudah ada permintaan pending ke slug perusahaan ini. */
  hasPending: (slug: string) => boolean;
  /** true bila sudah bermitra (punya deal 商談) dengan slug perusahaan ini. */
  isPartner: (slug: string) => boolean;
  /** Tandai optimistik bahwa permintaan ke slug ini baru dikirim. */
  markPending: (slug: string) => void;
  /** Muat ulang dari server. */
  refresh: () => void;
  loading: boolean;
}

const MatchRequestsContext = createContext<MatchRequestsContextValue | null>(null);

export function MatchRequestsProvider({ children }: { children: ReactNode }) {
  const { slug, hasCompany } = useViewer();
  const [outgoing, setOutgoing] = useState<OutgoingRequest[]>([]);
  const [partnerSlugs, setPartnerSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!hasCompany) {
      setOutgoing([]);
      setPartnerSlugs([]);
      return;
    }
    setLoading(true);
    try {
      const [reqs, partners] = await Promise.all([fetchOutgoingRequests(), fetchPartnerSlugs()]);
      setOutgoing(reqs);
      setPartnerSlugs(partners);
    } catch (e) {
      // dashboard/tombol tetap berfungsi tanpa data ini
      console.error('Muat permintaan/mitra 商談 gagal:', e);
    } finally {
      setLoading(false);
    }
    // slug ikut dep agar refetch saat perusahaan viewer berubah (mis. setelah onboarding).
  }, [hasCompany, slug]);

  useEffect(() => {
    void load();
  }, [load]);

  const value = useMemo<MatchRequestsContextValue>(() => {
    const pendingSet = new Set(
      outgoing.filter((r) => r.status === 'pending').map((r) => r.toSlug)
    );
    const partnerSet = new Set(partnerSlugs);
    return {
      outgoing,
      pendingCount: pendingSet.size,
      hasPending: (s: string) => pendingSet.has(s),
      isPartner: (s: string) => partnerSet.has(s),
      markPending: (s: string) =>
        setOutgoing((prev) =>
          prev.some((r) => r.toSlug === s && r.status === 'pending')
            ? prev
            : [
                {
                  id: `local-${s}`,
                  toSlug: s,
                  status: 'pending',
                  createdAt: new Date().toISOString()
                },
                ...prev
              ]
        ),
      refresh: () => void load(),
      loading
    };
  }, [outgoing, partnerSlugs, loading, load]);

  return (
    <MatchRequestsContext.Provider value={value}>{children}</MatchRequestsContext.Provider>
  );
}

export function useMatchRequests(): MatchRequestsContextValue {
  const ctx = useContext(MatchRequestsContext);
  if (!ctx) throw new Error('useMatchRequests harus dipakai di dalam <MatchRequestsProvider>');
  return ctx;
}
