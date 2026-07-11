import { useTranslation } from 'react-i18next';
import { LogIn, UserPlus, Eye } from 'lucide-react';
import Logo from '../../components/landing/Logo';
import Button from '../../components/ui/Button';
import LanguageToggle from '../../components/LanguageToggle';
import { useDemoMode } from '../../lib/DemoModeProvider';

/**
 * Layar gate untuk /app saat pengunjung belum login dan belum masuk mode demo.
 * Menawarkan Masuk / Daftar, atau "Lihat sebagai demo" agar reviewer ANC tetap
 * bisa menjelajah tanpa akun.
 */
export default function AppGate() {
  const { t } = useTranslation();
  const { enableDemo } = useDemoMode();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <Logo />
        <LanguageToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
          <h1 className="text-center font-display text-2xl font-bold text-slate-900">
            {t('app.gate.title')}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">{t('app.gate.subtitle')}</p>

          <div className="mt-8 space-y-3">
            <Button to="/login" size="lg" className="w-full">
              <LogIn className="h-4 w-4" />
              {t('app.gate.login')}
            </Button>
            <Button to="/signup" variant="outline" size="lg" className="w-full">
              <UserPlus className="h-4 w-4" />
              {t('app.gate.signup')}
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-100" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t('app.demoBadge')}
            </span>
            <span className="h-px flex-1 bg-slate-100" />
          </div>

          <Button variant="ghost" size="lg" className="w-full" onClick={enableDemo}>
            <Eye className="h-4 w-4" />
            {t('app.gate.demo')}
          </Button>
          <p className="mt-2 text-center text-xs text-slate-400">{t('app.gate.demoHint')}</p>
        </div>
      </main>
    </div>
  );
}
