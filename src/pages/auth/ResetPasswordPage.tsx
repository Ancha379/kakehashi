import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import Logo from '../../components/landing/Logo';
import LanguageToggle from '../../components/LanguageToggle';
import Button from '../../components/ui/Button';
import { useAuth } from '../../lib/AuthProvider';
import { supabase } from '../../lib/supabase';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const { resetPassword, updatePassword } = useAuth();

  // 'request' = minta email reset; 'update' = set sandi baru (dari tautan email).
  const [mode, setMode] = useState<'request' | 'update'>('request');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Bila tiba dari tautan reset, Supabase memroses token & memicu event ini.
    if (window.location.hash.includes('type=recovery')) setMode('update');
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setMode('update');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await resetPassword(email.trim());
    setLoading(false);
    if (err) setError(err);
    else setSent(true);
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError(t('auth.field.passwordHint'));
      return;
    }
    if (password !== confirm) {
      setError(t('auth.reset.mismatch'));
      return;
    }
    setLoading(true);
    const { error: err } = await updatePassword(password);
    setLoading(false);
    if (err) setError(err);
    else setDone(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" aria-label="Kakehashi">
          <Logo />
        </Link>
        <LanguageToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
          {done ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <h1 className="mt-4 font-display text-xl font-bold text-slate-900">
                {t('auth.reset.doneTitle')}
              </h1>
              <p className="mt-2 text-sm text-slate-500">{t('auth.reset.doneBody')}</p>
              <Button to="/login" size="lg" className="mt-6 w-full">
                {t('auth.reset.toLogin')}
              </Button>
            </div>
          ) : sent ? (
            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-primary-600" />
              <h1 className="mt-4 font-display text-xl font-bold text-slate-900">
                {t('auth.reset.sentTitle')}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {t('auth.reset.sentBody', { email })}
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('auth.reset.toLogin')}
              </Link>
            </div>
          ) : mode === 'update' ? (
            <form onSubmit={handleUpdate}>
              <KeyRound className="h-9 w-9 text-primary-600" />
              <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
                {t('auth.reset.updateTitle')}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{t('auth.reset.updateSubtitle')}</p>

              <label className="mt-6 block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {t('auth.reset.newPassword')}
                </span>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.field.passwordPlaceholder')}
                    className={`${inputClass} pr-11`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={t(showPwd ? 'auth.field.hidePassword' : 'auth.field.showPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <span className="mt-1 block text-xs text-slate-400">{t('auth.field.passwordHint')}</span>
              </label>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {t('auth.reset.confirmPassword')}
                </span>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder={t('auth.reset.confirmPlaceholder')}
                  className={inputClass}
                />
              </label>

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
              )}

              <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
                {loading ? t('auth.processing') : t('auth.reset.updateButton')}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRequest}>
              <KeyRound className="h-9 w-9 text-primary-600" />
              <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">
                {t('auth.reset.requestTitle')}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{t('auth.reset.requestSubtitle')}</p>

              <label className="mt-6 block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {t('auth.field.email')}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.field.emailPlaceholder')}
                  className={inputClass}
                  autoFocus
                  required
                />
              </label>

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
              )}

              <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
                {loading ? t('auth.processing') : t('auth.reset.sendButton')}
              </Button>

              <Link
                to="/login"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-700"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('auth.reset.toLogin')}
              </Link>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
