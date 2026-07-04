import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Jika diisi, tombol dirender sebagai <Link>. */
  to?: string;
  /** Jika diisi, tombol dirender sebagai <a> (anchor / link eksternal). */
  href?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 shadow-sm',
  secondary: 'bg-primary-50 text-primary-800 hover:bg-primary-100',
  outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm'
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base'
};

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
