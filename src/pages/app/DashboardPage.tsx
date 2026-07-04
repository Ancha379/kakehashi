import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  Eye,
  Handshake,
  MessageSquare,
  Sparkles,
  UserRoundCheck
} from 'lucide-react';
import {
  activeDeals,
  dashboardStats,
  matchRequests as initialRequests,
  notifications,
  profileCompletion
} from '../../data/dashboard';
import { getCompany } from '../../data/companies';
import { useLang, useLocalized } from '../../lib/localized';
import CompanyLogo from '../../components/CompanyLogo';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';

const stageTone = {
  negotiation: 'accent',
  sample: 'primary',
  contract: 'success'
} as const;

export default function DashboardPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const l = useLocalized();
  const { showToast } = useToast();
  const [requests, setRequests] = useState(initialRequests);

  const stats = [
    { icon: Eye, label: t('dashboard.statViews'), value: dashboardStats.profileViews },
    { icon: Sparkles, label: t('dashboard.statMatches'), value: dashboardStats.newMatches },
    { icon: MessageSquare, label: t('dashboard.statMessages'), value: dashboardStats.unreadMessages },
    { icon: Handshake, label: t('dashboard.statMeetings'), value: dashboardStats.activeMeetings }
  ];

  const resolveRequest = (id: string, accepted: boolean) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(accepted ? t('dashboard.acceptedToast') : t('dashboard.declinedToast'));
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-slate-500">{t('dashboard.welcome')}</p>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{t('app.demoCompany')}</h2>
      </div>

      {/* Ringkasan angka */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="truncate text-xs text-slate-500">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Permintaan match masuk */}
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
              <Sparkles className="h-4 w-4 text-accent-500" />
              {t('dashboard.matchRequests')}
              {requests.length > 0 && <Badge tone="accent">{requests.length}</Badge>}
            </h3>
            {requests.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-400">—</p>
            ) : (
              <ul className="space-y-4">
                {requests.map((req) => {
                  const company = getCompany(req.companyId);
                  if (!company) return null;
                  const name = lang === 'ja' ? company.name_ja : company.name_id;
                  return (
                    <li
                      key={req.id}
                      className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
                    >
                      <Link to={`/app/companies/${company.id}`} className="shrink-0">
                        <CompanyLogo company={company} size="sm" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/app/companies/${company.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-primary-700"
                        >
                          {name}
                        </Link>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                          {l(req.message)}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button size="sm" onClick={() => resolveRequest(req.id, true)}>
                          {t('dashboard.accept')}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => resolveRequest(req.id, false)}>
                          {t('dashboard.decline')}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          {/* 商談 aktif */}
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
              <Handshake className="h-4 w-4 text-primary-600" />
              {t('dashboard.activeDeals')}
            </h3>
            <ul className="space-y-4">
              {activeDeals.map((deal) => {
                const company = getCompany(deal.companyId);
                if (!company) return null;
                const name = lang === 'ja' ? company.name_ja : company.name_id;
                return (
                  <li key={deal.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                    <CompanyLogo company={company} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/app/companies/${company.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-primary-700"
                        >
                          {name}
                        </Link>
                        <Badge tone={stageTone[deal.stage]}>
                          {t(`dashboard.stage${deal.stage.charAt(0).toUpperCase()}${deal.stage.slice(1)}`)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{l(deal.lastUpdate)}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{deal.date}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Status profil */}
          <Card>
            <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <UserRoundCheck className="h-4 w-4 text-primary-600" />
              {t('dashboard.profileStatus')}
            </h3>
            <p className="text-sm font-semibold text-slate-700">
              {t('dashboard.profileComplete', { percent: profileCompletion })}
            </p>
            <div
              role="progressbar"
              aria-valuenow={profileCompletion}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">{t('dashboard.profileHint')}</p>
            <Button to="/app/register" variant="secondary" size="sm" className="mt-4 w-full">
              {t('dashboard.completeProfile')}
            </Button>
          </Card>

          {/* Notifikasi */}
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
              <Bell className="h-4 w-4 text-accent-500" />
              {t('dashboard.notifications')}
            </h3>
            <ul className="space-y-4">
              {notifications.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-400"
                  />
                  <div>
                    <p className="text-xs leading-relaxed text-slate-700">{l(item.text)}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{l(item.time)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
