import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Check, X, Globe, Handshake, ArrowRight, Clock, FileText, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  fetchAllMatchRequests,
  fetchPendingCompanies,
  setVerificationStatus
} from '../../data/screeningApi';
import type { PendingCompany, StaffMatchRequest } from '../../data/screeningApi';
import { fetchCompanyDocuments } from '../../data/companyDocsApi';
import type { CompanyDocument } from '../../data/companyDocsApi';
import { respondMatchRequest } from '../../data/matchingApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { useViewer } from '../../lib/ViewerProvider';
import { useCompanies } from '../../lib/CompaniesProvider';
import { useLang } from '../../lib/localized';

const countryFlag = { JP: '🇯🇵', ID: '🇮🇩' } as const;

export default function CoordinatorScreeningPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const viewer = useViewer();
  const { showToast } = useToast();
  const { reload } = useCompanies();
  const [pending, setPending] = useState<PendingCompany[]>([]);
  const [requests, setRequests] = useState<StaffMatchRequest[]>([]);
  const [docs, setDocs] = useState<CompanyDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!viewer.isStaff) return;
    let active = true;
    Promise.all([fetchPendingCompanies(), fetchAllMatchRequests()])
      .then(async ([companies, reqs]) => {
        if (!active) return;
        setPending(companies);
        setRequests(reqs);
        // Dokumen verifikasi perusahaan pending (URL bertanda-tangan, 1 jam).
        const documents = await fetchCompanyDocuments(companies.map((c) => c.id));
        if (active) setDocs(documents);
      })
      .catch((e) => console.error('Muat data screening gagal:', e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [viewer.isStaff]);

  // Hanya staf ANC (coordinator/admin).
  if (!viewer.loading && !viewer.isStaff) return <Navigate to="/app/dashboard" replace />;

  const act = async (id: string, status: 'verified' | 'rejected') => {
    setBusyId(id);
    try {
      await setVerificationStatus(id, status);
      setPending((prev) => prev.filter((c) => c.id !== id));
      reload(); // agar perusahaan verified langsung muncul di direktori
      showToast(t(status === 'verified' ? 'screening.approved' : 'screening.rejected'));
      if (status === 'verified') {
        // AI Matching: nilai perusahaan baru vs seluruh direktori (latar belakang).
        supabase.functions
          .invoke('score-matches', { body: { companyId: id } })
          .then(({ error }) => {
            if (error) throw error;
            showToast(t('screening.rescoreDoneOne'));
          })
          .catch((e) => console.error('score-matches gagal:', e));
      }
    } catch (e) {
      console.error('setVerificationStatus gagal:', e);
      showToast(t('screening.actionError'));
    } finally {
      setBusyId(null);
    }
  };

  // Backfill AI Match seluruh direktori — bertahap (fungsi membatasi kerja per
  // panggilan agar tak timeout; ulangi sampai remaining = 0).
  const [rescoring, setRescoring] = useState(false);
  const runBackfill = async () => {
    setRescoring(true);
    let total = 0;
    try {
      for (let guard = 0; guard < 12; guard++) {
        const { data, error } = await supabase.functions.invoke('score-matches', {
          body: { mode: 'backfill' }
        });
        if (error) throw error;
        const res = data as { scored: number; remaining: number; failures: string[] };
        total += res.scored;
        if (res.failures?.length) console.error('score-matches failures:', res.failures);
        if (!res.remaining) break;
      }
      showToast(t('screening.rescoreDone', { count: total }));
    } catch (e) {
      console.error('Backfill AI Match gagal:', e);
      showToast(t('screening.rescoreFailed'));
    } finally {
      setRescoring(false);
    }
  };

  // Fasilitasi 商談: staf merespons atas nama perusahaan penerima.
  const facilitate = async (id: string, accept: boolean) => {
    setBusyId(id);
    try {
      await respondMatchRequest(id, accept);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: accept ? 'accepted' : 'declined' } : r))
      );
      showToast(t(accept ? 'screening.reqAccepted' : 'screening.reqDeclined'));
    } catch (e) {
      console.error('respond_match_request (fasilitasi) gagal:', e);
      showToast(t('screening.actionError'));
    } finally {
      setBusyId(null);
    }
  };

  const name = (c: PendingCompany) => (lang === 'ja' ? c.name_ja : c.name_id);
  const summary = (c: PendingCompany) => (lang === 'ja' ? c.summary_ja : c.summary_id);
  const reqName = (c: StaffMatchRequest['from']) =>
    c ? (lang === 'ja' ? c.name_ja : c.name_id) : '—';

  const reqBadge = (status: StaffMatchRequest['status']) =>
    status === 'pending' ? (
      <Badge tone="accent">
        <Clock className="h-3 w-3" />
        {t('dashboard.waitingReply')}
      </Badge>
    ) : status === 'accepted' ? (
      <Badge tone="success">{t('dashboard.requestAccepted')}</Badge>
    ) : (
      <Badge tone="neutral">{t('dashboard.requestDeclined')}</Badge>
    );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 md:text-2xl">
            <ShieldCheck className="h-5 w-5 text-primary-600" />
            {t('screening.title')}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{t('screening.subtitle')}</p>
        </div>
        {/* Backfill AI Match: hitung skor pasangan yang belum ada (memakai API). */}
        <Button variant="outline" size="sm" onClick={runBackfill} disabled={rescoring}>
          <Sparkles className="h-4 w-4" />
          {rescoring ? t('screening.rescoreRunning') : t('screening.rescore')}
        </Button>
      </div>

      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary-700"
            role="status"
            aria-label={t('common.appName')}
          />
        </div>
      ) : pending.length === 0 ? (
        <Card className="py-12 text-center text-sm text-slate-500">{t('screening.empty')}</Card>
      ) : (
        <div className="space-y-4">
          {pending.map((c) => (
            <Card key={c.id} className="md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span aria-hidden>{countryFlag[c.country]}</span>
                    <h3 className="font-bold text-slate-900">{name(c)}</h3>
                    <Badge tone="accent">{t('screening.pending')}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>{t(`meta.industries.${c.industry}`)}</span>
                    <span>·</span>
                    <span>{t(`meta.sizes.${c.size}`)}</span>
                    <span>·</span>
                    <span>{t(`meta.countries.${c.country}`)}</span>
                  </div>

                  {summary(c) && <p className="mt-3 text-sm text-slate-700">{summary(c)}</p>}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.purposes.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700"
                      >
                        {t(`meta.purposes.${p}`)}
                      </span>
                    ))}
                  </div>

                  {(c.offering.length > 0 || c.seeking.length > 0) && (
                    <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                      {c.offering.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-600">{t('company.offering')}</p>
                          <ul className="mt-1 list-disc pl-4 text-slate-500">
                            {c.offering.map((o, i) => (
                              <li key={i}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {c.seeking.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-600">{t('company.seeking')}</p>
                          <ul className="mt-1 list-disc pl-4 text-slate-500">
                            {c.seeking.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {c.website && (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary-600 hover:underline"
                      >
                        <Globe className="h-3 w-3" />
                        {c.website}
                      </a>
                    )}
                  </div>

                  {/* Dokumen verifikasi (登記簿謄本/Akta dll.) — bahan utama 審査. */}
                  <div className="mt-3 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-600">{t('screening.docsTitle')}</p>
                    {docs.filter((d) => d.companyId === c.id).length === 0 ? (
                      <p className="mt-1 text-xs text-slate-400">{t('screening.docsNone')}</p>
                    ) : (
                      <ul className="mt-1.5 space-y-1">
                        {docs
                          .filter((d) => d.companyId === c.id)
                          .map((d) => (
                            <li key={d.id} className="flex items-center gap-2 text-xs">
                              <FileText className="h-3.5 w-3.5 shrink-0 text-primary-600" aria-hidden />
                              <span className="font-semibold text-slate-600">
                                {t(`register.doc${d.kind === 'registry' ? 'Registry' : 'Financial'}_${c.country}`)}
                                :
                              </span>
                              {d.url ? (
                                <a
                                  href={d.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="truncate text-primary-600 hover:underline"
                                >
                                  {d.fileName}
                                </a>
                              ) : (
                                <span className="truncate text-slate-400">{d.fileName}</span>
                              )}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="accent"
                    size="sm"
                    disabled={busyId === c.id}
                    onClick={() => act(c.id, 'verified')}
                  >
                    <Check className="h-4 w-4" />
                    {t('screening.approve')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={busyId === c.id}
                    onClick={() => act(c.id, 'rejected')}
                  >
                    <X className="h-4 w-4" />
                    {t('screening.reject')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Panel fasilitasi 商談 — koordinator memantau & merespons atas nama penerima */}
      {!loading && (
        <div className="mt-10">
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Handshake className="h-5 w-5 text-primary-600" />
              {t('screening.requestsTitle')}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{t('screening.requestsSubtitle')}</p>
          </div>
          {requests.length === 0 ? (
            <Card className="py-8 text-center text-sm text-slate-500">
              {t('screening.requestsEmpty')}
            </Card>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <Card key={req.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-sm">
                    {req.from ? (
                      <Link
                        to={`/app/companies/${req.from.slug}`}
                        className="font-bold text-slate-900 hover:text-primary-700"
                      >
                        {reqName(req.from)}
                      </Link>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                    {req.to ? (
                      <Link
                        to={`/app/companies/${req.to.slug}`}
                        className="font-bold text-slate-900 hover:text-primary-700"
                      >
                        {reqName(req.to)}
                      </Link>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                    <span className="text-xs text-slate-400">{req.createdAt.slice(0, 10)}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {reqBadge(req.status)}
                    {req.status === 'pending' && (
                      <>
                        <Button
                          variant="accent"
                          size="sm"
                          disabled={busyId === req.id}
                          onClick={() => facilitate(req.id, true)}
                        >
                          <Check className="h-4 w-4" />
                          {t('dashboard.accept')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === req.id}
                          onClick={() => facilitate(req.id, false)}
                        >
                          <X className="h-4 w-4" />
                          {t('dashboard.decline')}
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
