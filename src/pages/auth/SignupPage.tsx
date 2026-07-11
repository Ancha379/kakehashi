import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Eye, EyeOff, Loader2, Mail, MailCheck } from 'lucide-react';
import type { Country } from '../../data/types';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../lib/AuthProvider';
import { useLang } from '../../lib/localized';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/15';

export default function SignupPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState<Country>('ID');
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error, needsConfirmation } = await signUp({
      email: email.trim(),
      password,
      fullName: companyName.trim(),
      locale: lang
    });
    setBusy(false);
    if (error) {
      setError(t('auth.signup.failed'));
      return;
    }
    if (needsConfirmation) {
      setConfirmSent(true);
      return;
    }
    navigate('/app/register');
  };

  // Layar sukses saat konfirmasi email diperlukan.
  if (confirmSent) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-400/15">
            <MailCheck className="h-8 w-8 text-mint-500" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-extrabold text-navy-950">
            {t('auth.signup.checkEmailTitle')}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {t('auth.signup.checkEmailBody', { email: email.trim() })}
          </p>
          <Link
            to="/login"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-royal-500 px-7 py-3 font-display text-sm font-bold text-white shadow-glow transition-colors hover:bg-royal-600"
          >
            {t('auth.signup.loginLink')}
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl font-extrabold text-navy-950 md:text-3xl">
        {t('auth.signup.title')}
      </h1>
      <p className="mt-2 text-sm text-slate-500">{t('auth.signup.subtitle')}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            {t('auth.field.email')}
          </span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.field.emailPlaceholder')}
              className={`${inputClass} pl-10`}
            />
          </div>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">
              {t('auth.field.companyName')}
            </span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('auth.field.companyNamePlaceholder')}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">
              {t('auth.field.country')}
            </span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
              className={inputClass}
            >
              <option value="ID">🇮🇩 {t('meta.countries.ID')}</option>
              <option value="JP">🇯🇵 {t('meta.countries.JP')}</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            {t('auth.field.password')}
          </span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.field.passwordPlaceholder')}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={t(showPassword ? 'auth.field.hidePassword' : 'auth.field.showPassword')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <span className="mt-1 block text-xs text-slate-400">{t('auth.field.passwordHint')}</span>
        </label>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-royal-500 focus:ring-royal-500"
          />
          <span>{t('auth.signup.agree')}</span>
        </label>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!agree || busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-royal-500 px-6 py-3 font-display text-sm font-bold text-white shadow-glow transition-colors hover:bg-royal-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? t('auth.processing') : t('auth.signup.submit')}
          {!busy && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <Check className="h-3.5 w-3.5 text-mint-500" />
          {t('auth.signup.freeNote')}
        </p>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        {t('auth.signup.hasAccount')}{' '}
        <Link to="/login" className="font-bold text-royal-600 hover:underline">
          {t('auth.signup.loginLink')}
        </Link>
      </p>
    </AuthLayout>
  );
}
