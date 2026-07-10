import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BadgeCheck, Languages, Sparkles } from 'lucide-react';
import Logo from '../components/landing/Logo';
import LanguageToggle from '../components/LanguageToggle';

const trustItems = [
  { icon: BadgeCheck, key: 'auth.brand.trust1' },
  { icon: Languages, key: 'auth.brand.trust2' },
  { icon: Sparkles, key: 'auth.brand.trust3' }
];

/** Layar auth: panel brand (kiri, gelap) + area form (kanan). Stack di mobile. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Panel brand — hanya tampil di lg+ */}
      <aside
        className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 text-white lg:flex xl:w-[45%]"
        style={{
          background:
            'radial-gradient(130% 120% at 12% 8%, #22317a 0%, #111a52 42%, #0A1230 100%)'
        }}
      >
        <div
          aria-hidden
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-royal-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-coral-500/10 blur-3xl"
        />

        <Link to="/" className="relative">
          <Logo tone="light" />
        </Link>

        <div className="relative">
          <h2 className="max-w-md font-display text-3xl font-extrabold leading-tight">
            {t('auth.brand.title')}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#c3cae6]">
            {t('auth.brand.subtitle')}
          </p>
          <ul className="mt-8 space-y-3">
            {trustItems.map(({ icon: Icon, key }) => (
              <li key={key} className="flex items-center gap-3 text-sm font-medium text-[#e6e9f7]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-mint-400" />
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-[#6b7391]">{t('lp.footer.operated')}</p>
      </aside>

      {/* Area form */}
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy-800"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('auth.backHome')}
          </Link>
          <LanguageToggle />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-8 md:px-10">
          <div className="w-full max-w-md">
            {/* Logo untuk mobile (panel brand tersembunyi) */}
            <Link to="/" className="mb-8 inline-block lg:hidden">
              <Logo />
            </Link>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
