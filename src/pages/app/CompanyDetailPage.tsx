import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Globe,
  Handshake,
  Languages,
  MapPin,
  Search,
  Sparkles,
  Users
} from 'lucide-react';
import { getCompany } from '../../data/companies';
import { useLang } from '../../lib/localized';
import CompanyLogo from '../../components/CompanyLogo';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../lib/cn';

const countryFlag = { JP: '🇯🇵', ID: '🇮🇩' } as const;

export default function CompanyDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const lang = useLang();
  const { showToast } = useToast();
  const company = id ? getCompany(id) : undefined;

  // 'translated' = bahasa UI aktif, 'original' = bahasa asli perusahaan
  const [textMode, setTextMode] = useState<'translated' | 'original'>('translated');

  if (!company) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-500">{t('company.notFound')}</p>
        <Button to="/app/companies" variant="outline" className="mt-4">
          <ArrowLeft className="h-4 w-4" />
          {t('company.back')}
        </Button>
      </div>
    );
  }

  const originalLang = company.country === 'JP' ? 'ja' : 'id';
  const textLang = textMode === 'original' ? originalLang : lang;
  const isAiTranslated = textLang !== originalLang;

  const name = lang === 'ja' ? company.name_ja : company.name_id;
  const description = textLang === 'ja' ? company.description_ja : company.description_id;
  const location = lang === 'ja' ? company.location_ja : company.location_id;
  const picTitle = lang === 'ja' ? company.pic.title_ja : company.pic.title_id;

  return (
    <div>
      <Link
        to="/app/companies"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('company.back')}
      </Link>

      {/* Header profil */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <CompanyLogo company={company} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{name}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {countryFlag[company.country]} {t(`meta.countries.${company.country}`)} ·{' '}
                {t(`meta.industries.${company.industry}`)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="success">
                  <BadgeCheck className="h-3 w-3" />
                  {t('companies.verified')}
                </Badge>
                <Badge tone="accent">
                  <Sparkles className="h-3 w-3" />
                  {t('companies.aiMatch')} {company.matchScore}%
                </Badge>
              </div>
            </div>
          </div>
          <Button size="lg" onClick={() => showToast(t('company.meetingToast'))}>
            <Handshake className="h-4 w-4" />
            {t('company.proposeMeeting')}
          </Button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Deskripsi + toggle 原文⇄翻訳 */}
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-slate-900">{t('company.about')}</h3>
              <div className="flex items-center rounded-full border border-slate-200 p-0.5">
                {(['translated', 'original'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTextMode(mode)}
                    aria-pressed={textMode === mode}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-bold transition-colors',
                      textMode === mode
                        ? 'bg-primary-700 text-white'
                        : 'text-slate-500 hover:text-slate-800'
                    )}
                  >
                    {mode === 'translated' ? t('company.translated') : t('company.original')}
                  </button>
                ))}
              </div>
            </div>
            <p lang={textLang} className="text-sm leading-relaxed text-slate-700">
              {description}
            </p>
            {isAiTranslated && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-semibold text-primary-700">
                <Languages className="h-3 w-3" />
                {t('company.aiTranslated')}
              </p>
            )}
          </Card>

          {/* Yang ditawarkan / dicari */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {t('company.offering')}
              </h3>
              <ul className="space-y-2">
                {company.offering.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-sm text-slate-700">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                <Search className="h-4 w-4 text-accent-500" />
                {t('company.seeking')}
              </h3>
              <ul className="space-y-2">
                {company.seeking.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-sm text-slate-700">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Kolom info samping */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 font-bold text-slate-900">{t('company.purposeTitle')}</h3>
            <div className="flex flex-wrap gap-2">
              {company.purpose.map((p) => (
                <Badge key={p} tone="primary">
                  {t(`meta.purposes.${p}`)}
                </Badge>
              ))}
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <dt className="w-24 shrink-0 text-slate-500">{t('company.founded')}</dt>
                <dd className="font-semibold text-slate-800">{company.founded}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <dt className="w-24 shrink-0 text-slate-500">{t('company.sizeLabel')}</dt>
                <dd className="font-semibold text-slate-800">{t(`meta.sizes.${company.size}`)}</dd>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <dt className="w-24 shrink-0 text-slate-500">{t('company.location')}</dt>
                <dd className="font-semibold text-slate-800">{location}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <dt className="w-24 shrink-0 text-slate-500">{t('company.website')}</dt>
                <dd className="truncate font-semibold text-primary-700">
                  <a href={company.website} target="_blank" rel="noreferrer" className="hover:underline">
                    {company.website.replace('https://', '')}
                  </a>
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h3 className="mb-4 font-bold text-slate-900">{t('company.pic')}</h3>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700"
              >
                {company.pic.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{company.pic.name}</p>
                <p className="text-xs text-slate-500">{picTitle}</p>
                <p className="mt-0.5 truncate text-xs text-primary-700">{company.pic.email}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
