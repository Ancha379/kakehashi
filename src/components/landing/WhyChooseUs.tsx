import { useTranslation } from 'react-i18next';
import { whyChooseUs } from '../../data/features';
import { useLocalized } from '../../lib/localized';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="why" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('why.title')} subtitle={t('why.subtitle')} />
        <div className="grid gap-6 sm:grid-cols-2">
          {whyChooseUs.map((item, i) => (
            <div
              key={item.title.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
            >
              {/* Placeholder gambar — ganti dengan foto asli nanti */}
              <div
                aria-hidden
                className={`flex aspect-[3/1] items-center justify-center bg-gradient-to-br ${
                  i % 2 === 0
                    ? 'from-primary-100 via-primary-50 to-white'
                    : 'from-accent-100 via-accent-50 to-white'
                }`}
              >
                <item.icon
                  className={`h-10 w-10 ${i % 2 === 0 ? 'text-primary-300' : 'text-accent-400'}`}
                />
              </div>
              <div className="p-6">
                <h3 className="flex items-start gap-3 font-bold text-slate-900">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
                  {l(item.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{l(item.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
