import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Check, X, Globe, Mail, MapPin } from 'lucide-react';
import { fetchPendingCompanies, setVerificationStatus } from '../../data/screeningApi';
import type { PendingCompany } from '../../data/screeningApi';
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
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!viewer.isStaff) return;
    let active = true;
    fetchPendingCompanies()
      .then((d) => active && setPending(d))
      .catch(() => {})
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
    } catch (e) {
      showToast(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const name = (c: PendingCompany) => (lang === 'ja' ? c.name_ja : c.name_id);
  const summary = (c: PendingCompany) => (lang === 'ja' ? c.summary_ja : c.summary_id);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 md:text-2xl">
          <ShieldCheck className="h-5 w-5 text-primary-600" />
          {t('screening.title')}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{t('screening.subtitle')}</p>
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
                    {c.picName && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {c.picName}
                      </span>
                    )}
                    {c.picEmail && (
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {c.picEmail}
                      </span>
                    )}
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
    </div>
  );
}
