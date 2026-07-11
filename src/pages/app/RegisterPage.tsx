import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ImagePlus, Upload } from 'lucide-react';
import type { CompanySize, Country, Industry, Purpose } from '../../data/types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthProvider';
import { useViewer } from '../../lib/ViewerProvider';
import { useCompanies } from '../../lib/CompaniesProvider';
import { cn } from '../../lib/cn';

const industryOptions: Industry[] = [
  'manufacturing',
  'it',
  'fnb',
  'textile',
  'logistics',
  'automotive',
  'fishery',
  'education',
  'travel',
  'hospital',
  'handicraft',
  'hotelresort',
  'sport',
  'others'
];
const purposeOptions: Purpose[] = ['sales', 'export', 'sourcing', 'partnership', 'investment', 'talent'];
const sizeOptions: CompanySize[] = ['small', 'medium', 'large'];

interface FormState {
  companyName: string;
  logoUrl: string;
  logoName: string;
  country: Country;
  website: string;
  size: CompanySize;
  founded: string;
  industry: Industry;
  purposes: Purpose[];
  offering: string;
  seeking: string;
  notes: string;
}

const initialForm: FormState = {
  companyName: '',
  logoUrl: '',
  logoName: '',
  country: 'ID',
  website: '',
  size: 'small',
  founded: '',
  industry: 'manufacturing',
  purposes: [],
  offering: '',
  seeking: '',
  notes: ''
};

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

function Field({ label, children, optional }: { label: string; children: React.ReactNode; optional?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {optional && <span className="ml-2 text-xs font-normal text-slate-400">({optional})</span>}
      </span>
      {children}
    </label>
  );
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { session } = useAuth();
  const viewer = useViewer();
  const { reload } = useCompanies();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Onboarding nyata = user login yang belum punya perusahaan. Kalau mode demo
  // (tanpa sesi), submit hanya menampilkan layar sukses (tidak menulis DB).
  const onboarding = !!session && !viewer.hasCompany;

  const handleSubmit = async () => {
    setError(null);
    if (!onboarding) {
      setSubmitted(true);
      return;
    }
    if (!form.companyName.trim()) {
      setError(t('register.nameRequired'));
      setStep(0);
      return;
    }
    setSubmitting(true);
    const { error: rpcError } = await supabase.rpc('onboard_company', {
      p_name: form.companyName,
      p_country: form.country,
      p_industry: form.industry,
      p_size: form.size,
      p_purposes: form.purposes,
      p_offering: form.offering,
      p_seeking: form.seeking,
      p_notes: form.notes,
      p_website: form.website || null,
      p_founded: form.founded ? Number(form.founded) : null
    });
    setSubmitting(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    // Perusahaan dibuat & profil tertaut. Muat ulang viewer/direktori lalu ke
    // dashboard (menghindari layar sukses ter-unmount saat viewer re-resolve).
    reload();
    viewer.refresh();
    showToast(t('register.created'));
    navigate('/app/dashboard');
  };

  const steps = [t('register.step1'), t('register.step2'), t('register.step3'), t('register.step4')];

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const togglePurpose = (p: Purpose) =>
    set('purposes', form.purposes.includes(p) ? form.purposes.filter((v) => v !== p) : [...form.purposes, p]);

  // Upload logo (front-end saja): preview lokal via object URL, tidak dikirim ke mana pun.
  const onLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => {
      if (prev.logoUrl) URL.revokeObjectURL(prev.logoUrl);
      return { ...prev, logoUrl: url, logoName: file.name };
    });
  };

  const display = (value: string) => value.trim() || t('register.notFilled');

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-900 md:text-2xl">{t('register.successTitle')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{t('register.successBody')}</p>
        <Button to="/app/dashboard" className="mt-8">
          {t('register.goDashboard')}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{t('register.title')}</h2>
        <p className="mt-1 text-sm text-slate-500">{t('register.subtitle')}</p>
      </div>

      {/* Stepper */}
      <ol className="mb-8 flex items-center">
        {steps.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors',
                    done && 'bg-emerald-500 text-white',
                    current && 'bg-primary-700 text-white',
                    !done && !current && 'bg-slate-100 text-slate-400'
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'mt-1.5 hidden max-w-[5.5rem] text-center text-[11px] font-semibold leading-tight sm:block',
                    current ? 'text-primary-700' : 'text-slate-400'
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className={cn('mx-2 h-0.5 flex-1 rounded sm:-mt-5', done ? 'bg-emerald-400' : 'bg-slate-100')}
                />
              )}
            </li>
          );
        })}
      </ol>

      <Card className="md:p-8">
        {step === 0 && (
          <div className="space-y-4">
            {/* Upload logo — tampil di kiri-atas info perusahaan (masukan 牧野さん #7) */}
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                {t('register.logo')}
                <span className="ml-2 text-xs font-normal text-slate-400">({t('common.optional')})</span>
              </span>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                  {form.logoUrl ? (
                    <img src={form.logoUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ImagePlus className="h-6 w-6 text-slate-300" aria-hidden />
                  )}
                </div>
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                    <Upload className="h-4 w-4" aria-hidden />
                    {form.logoUrl ? t('register.logoChange') : t('register.logoUpload')}
                    <input type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                  </label>
                  <p className="mt-1.5 text-xs text-slate-400">{t('register.logoHint')}</p>
                </div>
              </div>
            </div>
            <Field label={t('register.companyName')}>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => set('companyName', e.target.value)}
                placeholder={t('register.companyNamePlaceholder')}
                className={inputClass}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('register.country')}>
                <select
                  value={form.country}
                  onChange={(e) => set('country', e.target.value as Country)}
                  className={inputClass}
                >
                  <option value="ID">🇮🇩 {t('meta.countries.ID')}</option>
                  <option value="JP">🇯🇵 {t('meta.countries.JP')}</option>
                </select>
              </Field>
              <Field label={t('register.founded')} optional={t('common.optional')}>
                <input
                  type="number"
                  value={form.founded}
                  onChange={(e) => set('founded', e.target.value)}
                  placeholder="2005"
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label={t('register.size')}>
              <select
                value={form.size}
                onChange={(e) => set('size', e.target.value as CompanySize)}
                className={inputClass}
              >
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {t(`meta.sizes.${s}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('register.website')} optional={t('common.optional')}>
              <input
                type="url"
                value={form.website}
                onChange={(e) => set('website', e.target.value)}
                placeholder={t('register.websitePlaceholder')}
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <Field label={t('register.industry')}>
              <select
                value={form.industry}
                onChange={(e) => set('industry', e.target.value as Industry)}
                className={inputClass}
              >
                {industryOptions.map((ind) => (
                  <option key={ind} value={ind}>
                    {t(`meta.industries.${ind}`)}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-slate-700">
                {t('register.purposes')}
              </legend>
              <div className="flex flex-wrap gap-2">
                {purposeOptions.map((p) => {
                  const selected = form.purposes.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePurpose(p)}
                      aria-pressed={selected}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                        selected
                          ? 'border-primary-700 bg-primary-700 text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300'
                      )}
                    >
                      {t(`meta.purposes.${p}`)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Field label={t('register.offering')}>
              <textarea
                rows={3}
                value={form.offering}
                onChange={(e) => set('offering', e.target.value)}
                placeholder={t('register.offeringPlaceholder')}
                className={inputClass}
              />
            </Field>
            <Field label={t('register.seeking')}>
              <textarea
                rows={3}
                value={form.seeking}
                onChange={(e) => set('seeking', e.target.value)}
                placeholder={t('register.seekingPlaceholder')}
                className={inputClass}
              />
            </Field>
            <Field label={t('register.notes')} optional={t('common.optional')}>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                placeholder={t('register.notesPlaceholder')}
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-bold text-slate-900">{t('register.reviewTitle')}</h3>
            <p className="mt-1 text-xs text-slate-500">{t('register.reviewHint')}</p>

            {/* Header: logo di kiri-atas + nama perusahaan */}
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                {form.logoUrl ? (
                  <img src={form.logoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-full w-full items-center justify-center rounded-xl bg-primary-700 text-lg font-bold text-white"
                  >
                    {form.companyName.replace(/^PT\s+/i, '').charAt(0).toUpperCase() || '?'}
                  </span>
                )}
              </div>
              <span className="font-bold text-slate-900">{display(form.companyName)}</span>
            </div>

            <dl className="mt-5 divide-y divide-slate-100 text-sm">
              {[
                [t('register.companyName'), display(form.companyName)],
                [t('register.country'), t(`meta.countries.${form.country}`)],
                [t('register.size'), t(`meta.sizes.${form.size}`)],
                [t('register.founded'), display(form.founded)],
                [t('register.website'), display(form.website)],
                [t('register.industry'), t(`meta.industries.${form.industry}`)],
                [
                  t('register.purposes'),
                  form.purposes.length
                    ? form.purposes.map((p) => t(`meta.purposes.${p}`)).join(', ')
                    : t('register.notFilled')
                ],
                [t('register.offering'), display(form.offering)],
                [t('register.seeking'), display(form.seeking)],
                [t('register.notes'), display(form.notes)]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-slate-500">{label}</dt>
                  <dd className="text-slate-800 sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className={cn(step === 0 && 'invisible')}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>
              {t('common.next')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="accent" onClick={handleSubmit} disabled={submitting}>
              <Check className="h-4 w-4" />
              {submitting ? t('register.submitting') : t('register.submit')}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
