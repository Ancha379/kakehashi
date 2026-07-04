import { useTranslation } from 'react-i18next';
import { cn } from '../lib/cn';

const langs = [
  { code: 'ja', label: 'JP' },
  { code: 'id', label: 'ID' }
] as const;

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const active = i18n.language === 'ja' ? 'ja' : 'id';

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border border-slate-200 bg-white p-0.5"
    >
      {langs.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-pressed={active === lang.code}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-bold transition-colors',
            active === lang.code
              ? 'bg-primary-700 text-white'
              : 'text-slate-500 hover:text-slate-800'
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
