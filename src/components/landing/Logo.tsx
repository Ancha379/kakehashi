import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn';

interface LogoProps {
  /** 'light' untuk latar gelap (footer), 'dark' untuk latar terang (header). */
  tone?: 'light' | 'dark';
}

export default function Logo({ tone = 'dark' }: LogoProps) {
  const { t } = useTranslation();
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-900 text-lg font-bold text-white"
      >
        架
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            'block text-base font-extrabold tracking-tight',
            tone === 'dark' ? 'text-slate-900' : 'text-white'
          )}
        >
          {t('common.appName')}
        </span>
        <span
          className={cn(
            'block text-[10px] font-semibold uppercase tracking-wider',
            tone === 'dark' ? 'text-primary-700' : 'text-primary-200'
          )}
        >
          {t('common.byAnc')}
        </span>
      </span>
    </span>
  );
}
