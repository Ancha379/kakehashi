interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">{subtitle}</p>}
    </div>
  );
}
