import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'primary' | 'accent' | 'success' | 'neutral';

const tones: Record<Tone, string> = {
  primary: 'bg-primary-50 text-primary-800',
  accent: 'bg-accent-50 text-accent-800',
  success: 'bg-emerald-50 text-emerald-700',
  neutral: 'bg-slate-100 text-slate-600'
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export default function Badge({ tone = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
