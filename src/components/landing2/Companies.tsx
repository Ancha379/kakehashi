import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2 } from 'lucide-react';
import SectionTag from './SectionTag';

interface Item {
  country: string;
  match: string;
  industry: string;
  name: string;
  desc: string;
}

const flagOf = (country: string) => (country === 'Japan' ? '🇯🇵' : '🇮🇩');

export default function Companies() {
  const { t } = useTranslation();
  const items = t('lp.companies.items', { returnObjects: true }) as Item[];
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 336, behavior: 'smooth' });
  };

  return (
    <section id="perusahaan" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTag tag={t('lp.companies.tag')} title={t('lp.companies.title')} align="left" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-navy-950 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-navy-950 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.name}
              className="flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
            >
              <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
                <Building2 className="h-10 w-10 text-white/25" aria-hidden />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-display text-xs font-bold text-navy-900">
                  {flagOf(item.country)} {item.country}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-royal-500 px-2.5 py-1 font-display text-xs font-bold text-white">
                  AI {item.match}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="font-display text-xs font-semibold text-royal-500">{item.industry}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-navy-950">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                <Link
                  to="/app/companies"
                  className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold text-royal-600 hover:gap-2"
                >
                  {t('lp.companies.detail')}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <BadgeCheck className="h-3.5 w-3.5" />
          {t('companies.verified')}
        </p>
      </div>
    </section>
  );
}
