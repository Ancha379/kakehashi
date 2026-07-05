import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowLeftRight, Check } from 'lucide-react';
import heroJapan from '../../assets/hero-japan.jpg';
import heroIndonesia from '../../assets/hero-indonesia.jpg';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="relative overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(130% 120% at 12% 8%, #22317a 0%, #111a52 42%, #0A1230 100%)'
      }}
    >
      <div
        aria-hidden
        className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-royal-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-coral-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2">
        {/* Kolom teks */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-display text-xs font-semibold tracking-wide backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-mint-400" />
            {t('lp.hero.badge')}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            {t('lp.hero.line1a')}
            <em className="not-italic text-royal-400 md:italic">{t('lp.hero.line1em')}</em>
            {t('lp.hero.line1b')}
            <span className="mt-1 flex items-center gap-3">
              {t('lp.hero.countryLeft')}
              <ArrowLeftRight className="h-8 w-8 shrink-0 text-coral-500 md:h-10 md:w-10" aria-hidden />
              {t('lp.hero.countryRight')}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c3cae6] md:text-lg">
            {t('lp.hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/app/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-base font-bold text-navy-900 shadow-lift transition-transform hover:-translate-y-0.5"
            >
              {t('lp.cta.registerFree')}
            </Link>
            <Link
              to="/app/companies"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display text-base font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              {t('lp.cta.viewCompanies')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Kolom visual: split image Jepang / Indonesia */}
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 shadow-lift">
            <div className="relative h-56 overflow-hidden md:h-64">
              <img
                src={heroJapan}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                loading="eager"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 font-display text-xs font-bold backdrop-blur">
                🇯🇵 {t('lp.hero.japan')}
              </span>
            </div>
            <div className="relative h-56 overflow-hidden md:h-64">
              <img
                src={heroIndonesia}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                loading="eager"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 font-display text-xs font-bold backdrop-blur">
                🇮🇩 {t('lp.hero.indonesia')}
              </span>
            </div>
          </div>

          {/* Badge AI Match mengambang */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-900/80 px-4 py-3 shadow-lift backdrop-blur-md md:left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-500 text-white">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <span>
              <span className="block font-display text-base font-extrabold leading-none">
                {t('lp.hero.matchBadge')}
              </span>
              <span className="mt-1 block text-xs text-[#aeb9ff]">{t('lp.hero.matchSub')}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
