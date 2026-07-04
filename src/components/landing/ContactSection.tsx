import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { useToast } from '../ui/Toast';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

export default function ContactSection() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast(t('contact.toast'));
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-xl px-4">
        <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card md:p-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                {t('contact.email')}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder={t('contact.emailPlaceholder')}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="mb-1.5 block text-sm font-semibold text-slate-700">
                {t('contact.company')}
              </label>
              <input
                id="contact-company"
                type="text"
                required
                placeholder={t('contact.companyPlaceholder')}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-700">
                {t('contact.message')}
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                className={inputClass}
              />
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full">
            <Send className="h-4 w-4" />
            {t('contact.submit')}
          </Button>
        </form>
      </div>
    </section>
  );
}
