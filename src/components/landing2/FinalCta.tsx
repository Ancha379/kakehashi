import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FinalCta() {
  const { t } = useTranslation();

  return (
    <section
      id="daftar"
      className="scroll-mt-20 py-16 text-white md:py-24"
      style={{ background: 'radial-gradient(120% 140% at 20% 0%, #22317a, #0A1230 70%)' }}
    >
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          {t('lp.finalCta.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c3cae6]">
          {t('lp.finalCta.subtitle')}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/app/register"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-display text-base font-bold text-navy-900 shadow-lift transition-transform hover:-translate-y-0.5"
          >
            {t('lp.finalCta.primary')}
          </Link>
          <Link
            to="/app/register"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-display text-base font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            {t('lp.finalCta.secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
