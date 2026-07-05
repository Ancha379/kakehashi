import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import SectionTag from './SectionTag';

interface Item {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t('lp.testi.items', { returnObjects: true }) as Item[];

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTag tag={t('lp.testi.tag')} title={t('lp.testi.title')} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
            >
              <div className="flex gap-0.5 text-amber-400" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-bold text-white">
                  {item.name.replace(/[^A-Za-z぀-ヿ一-龯]/g, '').charAt(0)}
                </span>
                <span>
                  <span className="block font-display text-sm font-bold text-navy-950">{item.name}</span>
                  <span className="block text-xs text-slate-500">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
