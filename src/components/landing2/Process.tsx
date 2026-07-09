import { useTranslation } from 'react-i18next';
import SectionTag from './SectionTag';

interface Step {
  title: string;
  desc: string;
}

export default function Process() {
  const { t } = useTranslation();
  const steps = t('lp.process.steps', { returnObjects: true }) as Step[];

  return (
    <section
      id="proses"
      className="scroll-mt-20 py-16 text-white md:py-24"
      style={{ background: 'radial-gradient(120% 130% at 85% 0%, #22317a 0%, #111a52 45%, #0A1230 100%)' }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTag tag={t('lp.process.tag')} title={t('lp.process.title')} tone="dark" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-500 font-display text-lg font-extrabold text-white shadow-glow">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#aeb9ff]">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
