import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import Logo from '../components/landing/Logo';
import LanguageToggle from '../components/LanguageToggle';
import Card from '../components/ui/Card';
import { useLocalized } from '../lib/localized';
import { contactOrgs } from '../data/contactContent';

export default function ContactPage() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" aria-label="Kakehashi">
            <Logo />
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('app.backToSite')}
        </Link>

        <h1 className="font-display text-3xl font-bold text-slate-900">{t('contact.title')}</h1>
        <p className="mt-4 text-slate-600">{t('contact.subtitle')}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {contactOrgs.map((org, i) => (
            <Card key={i} className="md:p-6">
              <h2 className="font-display text-lg font-bold text-slate-900">{l(org.name)}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
                {l(org.forWho)}
              </p>

              <dl className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <dd>{l(org.address)}</dd>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <dd>{org.phone}</dd>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <dd>
                    {org.email && org.email !== '—' ? (
                      <a href={`mailto:${org.email}`} className="text-primary-600 hover:underline">
                        {org.email}
                      </a>
                    ) : (
                      org.email
                    )}
                  </dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
