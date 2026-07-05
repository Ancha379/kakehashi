import { useTranslation } from 'react-i18next';
import { Compass, SearchX, MessagesSquare } from 'lucide-react';
import SectionTag from './SectionTag';

const icons = [Compass, SearchX, MessagesSquare];

interface Item {
  title: string;
  desc: string;
}

export default function PainPoints() {
  const { t } = useTranslation();
  const items = t('lp.pain.items', { returnObjects: true }) as Item[];

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTag tag={t('lp.pain.tag')} title={t('lp.pain.title')} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Compass;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-500/10 text-coral-600">
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
