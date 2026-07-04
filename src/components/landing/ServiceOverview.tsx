import { useTranslation } from 'react-i18next';
import { ArrowLeftRight } from 'lucide-react';
import { features } from '../../data/features';
import { useLocalized } from '../../lib/localized';
import SectionHeading from '../ui/SectionHeading';

function CompanyNode({ flag, title, desc }: { flag: string; title: string; desc: string }) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-card">
      <span className="text-3xl" aria-hidden>
        {flag}
      </span>
      <h3 className="mt-2 font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}

export default function ServiceOverview() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="services" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('service.title')} subtitle={t('service.subtitle')} />

        {/* Diagram alur matching sederhana */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-6">
          <CompanyNode flag="🇯🇵" title={t('service.diagramJp')} desc={t('service.diagramJpDesc')} />

          <div className="flex flex-col items-center gap-2">
            <ArrowLeftRight className="h-6 w-6 rotate-90 text-primary-400 lg:rotate-0" aria-hidden />
            <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-center text-white shadow-lg">
              <span
                aria-hidden
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold"
              >
                架
              </span>
              <h3 className="mt-2 text-lg font-extrabold">{t('service.diagramPlatform')}</h3>
              <p className="mt-1 text-xs leading-relaxed text-primary-100">
                {t('service.diagramPlatformDesc')}
              </p>
            </div>
            <ArrowLeftRight className="h-6 w-6 rotate-90 text-primary-400 lg:rotate-0" aria-hidden />
          </div>

          <CompanyNode flag="🇮🇩" title={t('service.diagramId')} desc={t('service.diagramIdDesc')} />
        </div>

        {/* Chip 4 pilar layanan */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {features.map((f) => (
            <span
              key={f.title.id}
              className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-4 py-2 text-xs font-semibold text-primary-800 shadow-sm"
            >
              <f.icon className="h-4 w-4 text-primary-600" />
              {l(f.title)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
