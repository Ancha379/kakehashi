import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import { howItWorks } from '../../data/steps';
import { useLocalized } from '../../lib/localized';
import SectionHeading from '../ui/SectionHeading';

export default function HowItWorks() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="how" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('how.title')} subtitle={t('how.subtitle')} />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {howItWorks.map((step, i) => (
            <li
              key={step.title.id}
              className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
            >
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="hidden h-5 w-5 text-primary-600 lg:block" aria-hidden />
                <h3 className="text-sm font-bold leading-snug text-slate-900">{l(step.title)}</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">{l(step.desc)}</p>
            </li>
          ))}
        </ol>

        {/* Peran koordinator ANC Japan */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-primary-50 p-6 md:flex-row md:items-center md:gap-6 md:p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-700 text-white">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-primary-900">{t('how.coordinatorTitle')}</h3>
            <p className="mt-1 text-sm leading-relaxed text-primary-800/80">
              {t('how.coordinatorNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
