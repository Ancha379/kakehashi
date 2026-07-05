import { useTranslation } from 'react-i18next';
import { ShieldCheck, Languages, Sparkles, Users } from 'lucide-react';
import SectionTag from './SectionTag';

const icons = [ShieldCheck, Languages, Sparkles, Users];

interface Item {
  title: string;
  desc: string;
}

export default function Features() {
  const { t } = useTranslation();
  const items = t('lp.features.items', { returnObjects: true }) as Item[];

  return (
    <section id="keunggulan" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTag tag={t('lp.features.tag')} title={t('lp.features.title')} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-royal-300 hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-500 to-navy-800 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
