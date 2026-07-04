import { useTranslation } from 'react-i18next';
import { ArrowRight, BadgeCheck, Languages, Users } from 'lucide-react';
import Button from '../ui/Button';

const trustItems = [
  { icon: BadgeCheck, key: 'hero.trust1' },
  { icon: Languages, key: 'hero.trust2' },
  { icon: Users, key: 'hero.trust3' }
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600 text-white">
      {/* Foto placeholder: ganti /public/hero.jpg dengan foto bisnis asli */}
      <img
        src={`${import.meta.env.BASE_URL}hero.jpg`}
        alt=""
        aria-hidden
        onError={(e) => (e.currentTarget.style.display = 'none')}
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay"
      />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary-400/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur">
            {t('hero.badge')}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {t('hero.title1')}
            <br />
            <span className="text-accent-300">{t('hero.title2')}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-100 md:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/app/register" variant="accent" size="lg">
              {t('common.registerFree')}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              to="/app/companies"
              size="lg"
              className="border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              {t('common.viewCompanies')}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustItems.map(({ icon: Icon, key }) => (
              <li key={key} className="flex items-center gap-2 text-sm font-medium text-primary-100">
                <Icon className="h-4 w-4 text-accent-300" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
