import { useTranslation } from 'react-i18next';
import { features } from '../../data/features';
import { useLocalized } from '../../lib/localized';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';

export default function Features() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section id="features" className="scroll-mt-20 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('features.title')} subtitle={t('features.subtitle')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <Card key={item.title.id} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">{l(item.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{l(item.desc)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
