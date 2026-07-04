import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import { pricingRows } from '../../data/pricing';
import { useLocalized } from '../../lib/localized';
import { cn } from '../../lib/cn';
import SectionHeading from '../ui/SectionHeading';

export default function Pricing() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="pricing" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('pricing.title')} subtitle={t('pricing.subtitle')} />

        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th scope="col" className="px-5 py-4 font-semibold">
                  {t('pricing.thItem')}
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  {t('pricing.thFee')}
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  {t('pricing.thNote')}
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingRows.map((row) => (
                <tr
                  key={row.item.id}
                  className={cn(
                    'border-b border-slate-50 last:border-0',
                    row.highlight && 'bg-accent-50/60'
                  )}
                >
                  <td className="px-5 py-4 font-semibold text-slate-800">{l(row.item)}</td>
                  <td
                    className={cn(
                      'px-5 py-4 font-bold',
                      row.highlight ? 'text-accent-700' : 'text-primary-700'
                    )}
                  >
                    {l(row.fee)}
                  </td>
                  <td className="px-5 py-4 text-slate-500">{l(row.note)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {t('pricing.note')}
        </p>
      </div>
    </section>
  );
}
