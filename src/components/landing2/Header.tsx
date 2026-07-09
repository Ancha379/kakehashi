import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from '../landing/Logo';
import LanguageToggle from '../LanguageToggle';
import { cn } from '../../lib/cn';

const navItems = [
  { key: 'lp.nav.features', href: '#keunggulan' },
  { key: 'lp.nav.process', href: '#proses' },
  { key: 'lp.nav.companies', href: '#perusahaan' },
  { key: 'lp.nav.news', href: '#news' },
  { key: 'lp.nav.events', href: '#event' },
  { key: 'lp.nav.pricing', href: '#harga' },
  { key: 'lp.nav.faq', href: '#faq' }
];

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" aria-label="Kakehashi">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="font-display text-sm font-semibold text-slate-600 transition-colors hover:text-navy-800"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Link
            to="/app/dashboard"
            className="font-display text-sm font-semibold text-slate-700 transition-colors hover:text-navy-800"
          >
            {t('lp.cta.login')}
          </Link>
          <Link
            to="/app/register"
            className="rounded-full bg-royal-500 px-5 py-2 font-display text-sm font-bold text-white shadow-glow transition-colors hover:bg-royal-600"
          >
            {t('lp.cta.register')}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-slate-50 py-3 font-display text-sm font-semibold text-slate-700"
            >
              {t(item.key)}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <Link
              to="/app/dashboard"
              className={cn(
                'flex-1 rounded-full border border-slate-300 py-2.5 text-center font-display text-sm font-bold text-slate-700'
              )}
            >
              {t('lp.cta.login')}
            </Link>
            <Link
              to="/app/register"
              className="flex-1 rounded-full bg-royal-500 py-2.5 text-center font-display text-sm font-bold text-white"
            >
              {t('lp.cta.register')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
