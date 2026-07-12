import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BadgeCheck, Sparkles } from 'lucide-react';
import type { Company } from '../data/types';
import { useLang } from '../lib/localized';
import CompanyLogo from './CompanyLogo';
import Badge from './ui/Badge';

const countryFlag: Record<Company['country'], string> = { JP: '🇯🇵', ID: '🇮🇩' };

export default function CompanyCard({ company }: { company: Company }) {
  const { t } = useTranslation();
  const lang = useLang();
  const name = lang === 'ja' ? company.name_ja : company.name_id;
  const summary = lang === 'ja' ? company.summary_ja : company.summary_id;

  return (
    <Link
      to={`/app/companies/${company.id}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
    >
      <div className="flex items-start gap-3">
        <CompanyLogo company={company} />
        <div className="min-w-0 flex-1">
          <h3 title={name} className="truncate font-bold text-slate-900 group-hover:text-primary-700">
            {name}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {countryFlag[company.country]} {t(`meta.countries.${company.country}`)} ·{' '}
            {t(`meta.industries.${company.industry}`)}
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge tone="accent">
          <Sparkles className="h-3 w-3" />
          {t('companies.aiMatch')} {company.matchScore}%
        </Badge>
        {company.verificationStatus === 'verified' ? (
          <Badge tone="success">
            <BadgeCheck className="h-3 w-3" />
            {t('companies.verified')}
          </Badge>
        ) : (
          <Badge tone="accent">{t('companies.pendingBadge')}</Badge>
        )}
      </div>
    </Link>
  );
}
