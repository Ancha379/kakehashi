import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import { eventItems } from '../../data/events';
import { useLocalized } from '../../lib/localized';
import SectionTag from './SectionTag';

const flagOf = (c: 'JP' | 'ID') => (c === 'JP' ? '🇯🇵' : '🇮🇩');

export default function Events() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="event" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTag tag={t('lp.events.tag')} title={t('lp.events.title')} subtitle={t('lp.events.subtitle')} />

        {/* Catatan: pendaftaran diurus ANC */}
        <div className="mx-auto mt-6 flex max-w-max items-center gap-2 rounded-full bg-royal-500/10 px-4 py-2 font-display text-sm font-bold text-royal-600">
          <ShieldCheck className="h-4 w-4" />
          {t('lp.events.ancHandles')}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {eventItems.map((evt) => (
            <article
              key={evt.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-br from-navy-800 to-navy-950 px-5 py-4 text-white">
                <span className="text-2xl" aria-hidden>
                  {flagOf(evt.country)}
                </span>
                <span className="font-display text-xs font-semibold text-[#aeb9ff]">{l(evt.category)}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold leading-snug text-navy-950">{l(evt.title)}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0 text-royal-500" aria-hidden />
                    {l(evt.dateLabel)}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-royal-500" aria-hidden />
                    {l(evt.city)}
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-navy-800"
                >
                  {t('lp.events.register')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
