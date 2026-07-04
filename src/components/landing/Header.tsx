import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import LanguageToggle from '../LanguageToggle';
import Button from '../ui/Button';

const navItems = [
  { key: 'nav.services', href: '#services' },
  { key: 'nav.how', href: '#how' },
  { key: 'nav.features', href: '#features' },
  { key: 'nav.pricing', href: '#pricing' },
  { key: 'nav.faq', href: '#faq' }
];

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" aria-label="Kakehashi">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-700"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button to="/app/dashboard" variant="outline" size="sm">
            {t('common.login')}
          </Button>
          <Button to="/app/register" size="sm">
            {t('common.register')}
          </Button>
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
              className="block border-b border-slate-50 py-3 text-sm font-medium text-slate-700"
            >
              {t(item.key)}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <Button to="/app/dashboard" variant="outline" size="md" className="flex-1">
              {t('common.login')}
            </Button>
            <Button to="/app/register" size="md" className="flex-1">
              {t('common.register')}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
