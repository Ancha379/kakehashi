import { useTranslation } from 'react-i18next';
import { serviceFlow } from '../../data/steps';
import { useLocalized } from '../../lib/localized';

export default function ServiceFlow() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section className="bg-primary-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2 className="text-2xl font-bold md:text-3xl">{t('flow.title')}</h2>
          <p className="mt-3 text-sm text-primary-200 md:text-base">{t('flow.subtitle')}</p>
        </div>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {serviceFlow.map((step, i) => (
            <li key={step.title.id} className="relative rounded-2xl bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-bold tracking-widest text-accent-300">
                {t('flow.stepLabel')} {i + 1}
              </p>
              <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/90 text-white">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold">{l(step.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-200">{l(step.desc)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
