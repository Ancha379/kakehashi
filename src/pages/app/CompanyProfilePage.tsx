import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Save } from 'lucide-react';
import type { Company, CompanySize, Industry, Purpose } from '../../data/types';
import { saveCompanyProfile } from '../../data/companyProfileApi';
import type { ProfileEditPayload } from '../../data/companyProfileApi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../lib/AuthProvider';
import { useViewer } from '../../lib/ViewerProvider';
import { useCompanies } from '../../lib/CompaniesProvider';
import { cn } from '../../lib/cn';

const industryOptions: Industry[] = [
  'manufacturing', 'it', 'fnb', 'textile', 'logistics', 'automotive', 'fishery',
  'education', 'travel', 'hospital', 'handicraft', 'hotelresort', 'sport', 'others'
];
const purposeOptions: Purpose[] = ['sales', 'export', 'sourcing', 'partnership', 'investment', 'talent'];
const sizeOptions: CompanySize[] = ['small', 'medium', 'large'];

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function buildInitial(company: Company): ProfileEditPayload {
  return {
    name: company.name_id,
    industry: company.industry,
    size: company.size,
    founded: company.founded > 0 ? company.founded : null,
    website: company.website,
    location_id: company.location_id,
    location_ja: company.location_ja,
    summary_id: company.summary_id,
    summary_ja: company.summary_ja,
    description_id: company.description_id,
    description_ja: company.description_ja,
    purposes: company.purpose,
    pic_name: company.pic.name,
    pic_title_id: company.pic.title_id,
    pic_title_ja: company.pic.title_ja,
    pic_email: company.pic.email,
    offering: company.offering.map((o) => o.id),
    seeking: company.seeking.map((s) => s.id)
  };
}

function ProfileForm({ company }: { company: Company }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { reload } = useCompanies();
  const [form, setForm] = useState<ProfileEditPayload>(() => buildInitial(company));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProfileEditPayload>(key: K, value: ProfileEditPayload[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const togglePurpose = (p: Purpose) =>
    set('purposes', form.purposes.includes(p) ? form.purposes.filter((v) => v !== p) : [...form.purposes, p]);

  const linesToItems = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean);

  const handleSave = async () => {
    setError(null);
    if (!form.name.trim()) {
      setError(t('register.nameRequired'));
      return;
    }
    setSaving(true);
    try {
      await saveCompanyProfile(form);
      reload();
      showToast(t('profile.saved'));
      navigate('/app/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate('/app/dashboard')}
          className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </button>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{t('profile.title')}</h2>
        <p className="mt-1 text-sm text-slate-500">{t('profile.subtitle')}</p>
      </div>

      <Card className="space-y-5 md:p-8">
        <Field label={t('register.companyName')}>
          <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={t('register.industry')}>
            <select value={form.industry} onChange={(e) => set('industry', e.target.value as Industry)} className={inputClass}>
              {industryOptions.map((ind) => (
                <option key={ind} value={ind}>{t(`meta.industries.${ind}`)}</option>
              ))}
            </select>
          </Field>
          <Field label={t('register.size')}>
            <select value={form.size} onChange={(e) => set('size', e.target.value as CompanySize)} className={inputClass}>
              {sizeOptions.map((s) => (
                <option key={s} value={s}>{t(`meta.sizes.${s}`)}</option>
              ))}
            </select>
          </Field>
          <Field label={t('register.founded')}>
            <input
              type="number"
              value={form.founded ?? ''}
              onChange={(e) => set('founded', e.target.value ? Number(e.target.value) : null)}
              placeholder="2005"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label={t('register.website')}>
          <input type="url" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" className={inputClass} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`${t('profile.location')} (ID)`}>
            <input type="text" value={form.location_id} onChange={(e) => set('location_id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={`${t('profile.location')} (JA)`}>
            <input type="text" value={form.location_ja} onChange={(e) => set('location_ja', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`${t('profile.summary')} (ID)`}>
            <textarea rows={2} value={form.summary_id} onChange={(e) => set('summary_id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={`${t('profile.summary')} (JA)`}>
            <textarea rows={2} value={form.summary_ja} onChange={(e) => set('summary_ja', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`${t('profile.description')} (ID)`}>
            <textarea rows={3} value={form.description_id} onChange={(e) => set('description_id', e.target.value)} className={inputClass} />
          </Field>
          <Field label={`${t('profile.description')} (JA)`}>
            <textarea rows={3} value={form.description_ja} onChange={(e) => set('description_ja', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-slate-700">{t('register.purposes')}</legend>
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
                    selected ? 'border-primary-700 bg-primary-700 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300'
                  )}
                >
                  {t(`meta.purposes.${p}`)}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('profile.offering')}>
            <textarea
              rows={4}
              value={form.offering.join('\n')}
              onChange={(e) => set('offering', linesToItems(e.target.value))}
              placeholder={t('profile.itemsHint')}
              className={inputClass}
            />
          </Field>
          <Field label={t('profile.seeking')}>
            <textarea
              rows={4}
              value={form.seeking.join('\n')}
              onChange={(e) => set('seeking', linesToItems(e.target.value))}
              placeholder={t('profile.itemsHint')}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="mb-3 text-sm font-bold text-slate-900">{t('profile.pic')}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('profile.picName')}>
              <input type="text" value={form.pic_name} onChange={(e) => set('pic_name', e.target.value)} className={inputClass} />
            </Field>
            <Field label={t('profile.picEmail')}>
              <input type="email" value={form.pic_email} onChange={(e) => set('pic_email', e.target.value)} className={inputClass} />
            </Field>
            <Field label={`${t('profile.picTitle')} (ID)`}>
              <input type="text" value={form.pic_title_id} onChange={(e) => set('pic_title_id', e.target.value)} className={inputClass} />
            </Field>
            <Field label={`${t('profile.picTitle')} (JA)`}>
              <input type="text" value={form.pic_title_ja} onChange={(e) => set('pic_title_ja', e.target.value)} className={inputClass} />
            </Field>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        )}

        <div className="flex justify-end">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? <Save className="h-4 w-4 animate-pulse" /> : <Check className="h-4 w-4" />}
            {saving ? t('register.submitting') : t('profile.save')}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function CompanyProfilePage() {
  const { t } = useTranslation();
  const { session } = useAuth();
  const viewer = useViewer();
  const { getCompany } = useCompanies();
  const company = viewer.slug ? getCompany(viewer.slug) : undefined;

  // Edit profil hanya untuk yang login (mode demo tak bisa menyimpan).
  if (!session) return <Navigate to="/app/dashboard" replace />;

  if (!company) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary-700"
          role="status"
          aria-label={t('common.appName')}
        />
      </div>
    );
  }

  // key: remount saat perusahaan viewer berganti agar form re-inisialisasi.
  return <ProfileForm key={company.id} company={company} />;
}
