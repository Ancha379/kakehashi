import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Handshake, Lightbulb, Sparkles } from 'lucide-react';
import { useCompanies } from '../../lib/CompaniesProvider';
import { getViewerSlug } from '../../lib/viewer';
import { useAuth } from '../../lib/AuthProvider';
import { requestMeeting } from '../../data/matchingApi';
import { useLang } from '../../lib/localized';
import CompanyLogo from '../../components/CompanyLogo';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';

const countryFlag = { JP: '🇯🇵', ID: '🇮🇩' } as const;

function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600 bg-emerald-50';
  if (score >= 70) return 'text-accent-700 bg-accent-50';
  return 'text-slate-500 bg-slate-100';
}

export default function MatchingPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const { showToast } = useToast();
  const { session } = useAuth();
  const { companies, loading } = useCompanies();
  const [requestingId, setRequestingId] = useState<string | null>(null);

  const handleMeeting = async (slug: string) => {
    if (!session) {
      showToast(t('company.loginToRequest'));
      return;
    }
    setRequestingId(slug);
    try {
      await requestMeeting(slug);
      showToast(t('company.meetingToast'));
    } catch (e) {
      showToast(e instanceof Error ? e.message : String(e));
    } finally {
      setRequestingId(null);
    }
  };

  const recommendations = companies
    .filter((c) => c.id !== getViewerSlug())
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 md:text-2xl">
          <Sparkles className="h-5 w-5 text-accent-500" />
          {t('matching.title')}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{t('matching.subtitle')}</p>
      </div>

      <div className="space-y-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl border border-slate-100 bg-slate-100" />
          ))}
        {!loading &&
          recommendations.map((company) => {
          const name = lang === 'ja' ? company.name_ja : company.name_id;
          const reason = lang === 'ja' ? company.matchReason_ja : company.matchReason_id;
          return (
            <Card key={company.id} className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex flex-1 items-start gap-4">
                <CompanyLogo company={company} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900">{name}</h3>
                    <span className="text-xs text-slate-500">
                      {countryFlag[company.country]} {t(`meta.industries.${company.industry}`)}
                    </span>
                  </div>
                  <p className="mt-2 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                    <span>
                      <span className="font-semibold text-slate-700">{t('matching.reasonLabel')}: </span>
                      {reason}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <div
                  className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full ${scoreColor(company.matchScore)}`}
                >
                  <span className="text-lg font-extrabold leading-none">{company.matchScore}%</span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase">
                    {t('matching.matchLabel')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" to={`/app/companies/${company.id}`}>
                    {t('matching.viewProfile')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleMeeting(company.id)}
                    disabled={requestingId === company.id}
                  >
                    <Handshake className="h-3.5 w-3.5" />
                    {t('matching.propose')}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
