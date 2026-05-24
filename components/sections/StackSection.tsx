import TerminalIsland from '@/components/effects/TerminalIsland';
import SectionHeader from '@/components/ui/SectionHeader';
import { STACK_GROUPS } from '@/lib/portfolio-data';

export default function StackSection() {
  return (
    <section id="stack" className="section-shell border-b border-brand-divider">
      <SectionHeader num="04 // TECH TOOLKIT" title="Core Stack" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
          {STACK_GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="font-serif text-sm tracking-wider uppercase text-brand-dark border-b border-brand-divider pb-2 mb-4 font-semibold">
                {group.title}
              </h3>
              <ul className="space-y-3 font-mono text-xs text-brand-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 min-w-0">
                    <span className="w-1 h-1 bg-brand-accent rounded-full flex-none" />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:col-span-5">
          <TerminalIsland />
        </div>
      </div>
    </section>
  );
}
