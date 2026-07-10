import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import SectionTag from './SectionTag';
import { cn } from '../../lib/cn';

interface Plan {
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  cta: string;
}

export default function Pricing() {
  const { t } = useTranslation();
  const plans = t('lp.pricing.plans', { returnObjects: true }) as Plan[];

  return (
    <section id="harga" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionTag
          tag={t('lp.pricing.tag')}
          title={t('lp.pricing.title')}
          subtitle={t('lp.pricing.subtitle')}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((plan, i) => {
            const popular = i === 1;
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col rounded-3xl border p-8 shadow-card',
                  popular
                    ? 'border-royal-500 bg-navy-950 text-white shadow-lift'
                    : 'border-slate-200 bg-white'
                )}
              >
                {popular && (
                  <span className="absolute -top-3 right-8 rounded-full bg-coral-500 px-3 py-1 font-display text-xs font-bold text-white">
                    {t('lp.pricing.popular')}
                  </span>
                )}
                <h3
                  className={cn(
                    'font-display text-base font-bold',
                    popular ? 'text-white' : 'text-navy-950'
                  )}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={cn(
                      'font-display text-4xl font-extrabold',
                      popular ? 'text-white' : 'text-navy-950'
                    )}
                  >
                    {plan.price}
                  </span>
                  <span className={cn('text-sm', popular ? 'text-[#aeb9ff]' : 'text-slate-500')}>
                    {plan.unit}
                  </span>
                </div>
                <p className={cn('mt-3 text-sm leading-relaxed', popular ? 'text-[#c3cae6]' : 'text-slate-600')}>
                  {plan.desc}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                          popular ? 'bg-mint-500 text-white' : 'bg-mint-400/20 text-mint-500'
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={popular ? 'text-[#e6e9f7]' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={cn(
                    'mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-sm font-bold transition-colors',
                    popular
                      ? 'bg-royal-500 text-white shadow-glow hover:bg-royal-600'
                      : 'bg-navy-950 text-white hover:bg-navy-800'
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
