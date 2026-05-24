interface SectionHeaderProps {
  num: string;
  title: string;
}

export default function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div className="section-header w-full flex items-baseline justify-between gap-4 border-b border-brand-divider pb-3 mb-[clamp(2rem,6vw,3rem)]">
      <span className="font-mono text-[0.68rem] sm:text-xs text-brand-muted tracking-widest uppercase">
        {num}
      </span>
      <h2 className="font-serif text-base sm:text-lg italic text-brand-dark tracking-wide text-right">
        {title}
      </h2>
    </div>
  );
}
