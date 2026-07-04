import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../../data/faq';
import { useLocalized } from '../../lib/localized';
import { cn } from '../../lib/cn';
import SectionHeading from '../ui/SectionHeading';

export default function Faq() {
  const { t } = useTranslation();
  const l = useLocalized();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading title={t('faq.title')} subtitle={t('faq.subtitle')} />

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900 md:text-base">
                    {l(item.q)}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-slate-400 transition-transform',
                      open && 'rotate-180'
                    )}
                    aria-hidden
                  />
                </button>
                {open && (
                  <p className="border-t border-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {l(item.a)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
