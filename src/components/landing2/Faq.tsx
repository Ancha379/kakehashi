import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import SectionTag from './SectionTag';
import { cn } from '../../lib/cn';

interface Item {
  q: string;
  a: string;
}

export default function Faq() {
  const { t } = useTranslation();
  const items = t('lp.faq.items', { returnObjects: true }) as Item[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionTag tag={t('lp.faq.tag')} title={t('lp.faq.title')} />
        <div className="mt-12 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-sm font-bold text-navy-950 md:text-base">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      'h-5 w-5 shrink-0 text-royal-500 transition-transform',
                      isOpen && 'rotate-45'
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <p className="border-t border-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
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
