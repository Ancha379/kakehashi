import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Info } from 'lucide-react';
import Logo from '../components/landing/Logo';
import LanguageToggle from '../components/LanguageToggle';
import { useLocalized } from '../lib/localized';
import type { LegalDoc } from '../data/legalContent';

/** Halaman statis dwibahasa (Tentang / Privasi / Syarat). */
export default function StaticContentPage({ doc }: { doc: LegalDoc }) {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" aria-label="Kakehashi">
            <Logo />
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('app.backToSite')}
        </Link>

        <h1 className="font-display text-3xl font-bold text-slate-900">{l(doc.title)}</h1>
        {doc.intro && <p className="mt-4 text-slate-600">{l(doc.intro)}</p>}

        {doc.note && (
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{l(doc.note)}</span>
          </div>
        )}

        <div className="mt-8 space-y-8">
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-lg font-bold text-slate-900">{l(s.heading)}</h2>
              <div className="mt-2 space-y-2">
                {s.body.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-slate-600">
                    {l(p)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
