import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export default function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl border border-slate-100 bg-white p-6 shadow-card', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
