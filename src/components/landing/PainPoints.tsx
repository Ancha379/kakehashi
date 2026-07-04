import { useTranslation } from 'react-i18next';
import { painPoints } from '../../data/features';
import { useLocalized } from '../../lib/localized';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';

export default function PainPoints() {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('pain.title')} subtitle={t('pain.subtitle')} />
        <div className="grid gap-5 md:grid-cols-3">
          {painPoints.map((item) => (
            <Card key={item.title.id}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold leading-snug text-slate-900">{l(item.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{l(item.desc)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
