import type { Company } from '../data/types';
import { cn } from '../lib/cn';

interface CompanyLogoProps {
  company: Company;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-xl'
};

/** Logo placeholder: inisial perusahaan di atas warna brand-nya. */
export default function CompanyLogo({ company, size = 'md' }: CompanyLogoProps) {
  const initial = company.name_id.replace(/^PT\s+/i, '').charAt(0).toUpperCase();
  return (
    <div
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl font-bold text-white',
        sizes[size]
      )}
      style={{ backgroundColor: company.logoColor }}
    >
      {initial}
    </div>
  );
}
