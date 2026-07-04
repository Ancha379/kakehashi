import { useTranslation } from 'react-i18next';
import { indonesiaStats, japanStats } from '../../data/landing';
import type { StatCard } from '../../data/landing';
import { useLocalized } from '../../lib/localized';
import SectionHeading from '../ui/SectionHeading';

function StatGroup({ title, stats, accent }: { title: string; stats: StatCard[]; accent: boolean }) {
  const l = useLocalized();
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
          >
            <p className={`text-3xl font-extrabold ${accent ? 'text-accent-600' : 'text-primary-700'}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{l(stat.label)}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{l(stat.sub)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketStats() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('stats.title')} subtitle={t('stats.subtitle')} />
        <div className="grid gap-10 lg:grid-cols-2">
          <StatGroup title={t('stats.indonesiaTitle')} stats={indonesiaStats} accent />
          <StatGroup title={t('stats.japanTitle')} stats={japanStats} accent={false} />
        </div>
      </div>
    </section>
  );
}
