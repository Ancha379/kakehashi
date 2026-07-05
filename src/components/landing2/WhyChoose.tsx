import { useTranslation } from 'react-i18next';
import { ShieldCheck, Languages, Globe2, Lock } from 'lucide-react';
import SectionTag from './SectionTag';
import delegation from '../../assets/delegation.jpg';

const icons = [ShieldCheck, Languages, Globe2, Lock];

interface Item {
  title: string;
  desc: string;
}

export default function WhyChoose() {
  const { t } = useTranslation();
  const items = t('lp.why.items', { returnObjects: true }) as Item[];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        {/* Foto asli delegasi bisnis RI–Jepang */}
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-lift">
            <img src={delegation} alt={t('lp.why.photoCaption')} className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">{t('lp.why.photoCaption')}</p>
        </div>

        {/* Teks + poin */}
        <div className="order-1 lg:order-2">
          <SectionTag tag={t('lp.why.tag')} title={t('lp.why.title')} align="left" />
          <p className="mt-4 text-base leading-relaxed text-slate-600">{t('lp.why.intro')}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = icons[i] ?? ShieldCheck;
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-500/10 text-royal-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-navy-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
