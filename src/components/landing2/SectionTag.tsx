import { cn } from '../../lib/cn';

interface SectionTagProps {
  tag: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  align?: 'center' | 'left';
}

/** Heading section: label kecil (tag) + judul besar, dipakai di seluruh landing. */
export default function SectionTag({
  tag,
  title,
  subtitle,
  tone = 'light',
  align = 'center'
}: SectionTagProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      <span
        className={cn(
          'inline-block font-display text-xs font-bold uppercase tracking-[0.18em]',
          dark ? 'text-royal-400' : 'text-royal-500'
        )}
      >
        {tag}
      </span>
      <h2
        className={cn(
          'mt-3 font-display text-2xl font-extrabold tracking-tight md:text-4xl',
          dark ? 'text-white' : 'text-navy-950'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-sm leading-relaxed md:text-base', dark ? 'text-[#aeb9ff]' : 'text-slate-500')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
