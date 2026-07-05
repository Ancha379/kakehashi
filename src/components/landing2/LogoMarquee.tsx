import { useTranslation } from 'react-i18next';
import { companies } from '../../data/companies';
import type { Company } from '../../data/types';
import { useLang } from '../../lib/localized';

/** Chip logo: kotak inisial berwarna brand + nama perusahaan. */
function LogoChip({ company }: { company: Company }) {
  const lang = useLang();
  const name = lang === 'ja' ? company.name_ja : company.name_id;
  const initial = company.name_id.replace(/^PT\s+/i, '').charAt(0).toUpperCase();
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: company.logoColor }}
      >
        {initial}
      </span>
      <span className="whitespace-nowrap font-display text-sm font-bold text-slate-700">{name}</span>
    </div>
  );
}

/**
 * Barisan logo perusahaan terdaftar yang bergerak/slide (poin masukan 牧野さん #8).
 * Daftar digandakan 2x agar loop mulus; berhenti saat di-hover; nonaktif jika
 * pengguna memilih reduce-motion.
 */
export default function LogoMarquee() {
  const { t } = useTranslation();
  const loop = [...companies, ...companies];

  return (
    <section className="border-b border-slate-100 bg-white py-10">
      <p className="mb-6 text-center font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {t('lp.logos.title')}
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((company, i) => (
            <LogoChip key={`${company.id}-${i}`} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}
