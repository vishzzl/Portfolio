import BorderDrawCard from '@/components/BorderDrawCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { ServiceOpenButton } from '@/components/ui/OpenCardButton';
import { SERVICE_CARDS } from '@/lib/portfolio-data';

export default function ServicesSection() {
  return (
    <section id="services" className="section-shell border-b border-brand-divider">
      <SectionHeader num="02 // SERVICES" title="Capabilities" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {SERVICE_CARDS.map((service, index) => (
          <BorderDrawCard
            key={service.title}
            className="service-card group border border-brand-divider/60 min-h-[17rem] sm:min-h-[18rem]"
          >
            <ServiceOpenButton serviceIndex={index} className="p-5 sm:p-7 md:p-8">
              <span className="font-mono text-xs text-brand-accent tracking-widest">
                {`// ${String(index + 1).padStart(2, '0')}`}
              </span>
              <h3 className="font-serif text-[clamp(1.45rem,6vw,1.75rem)] text-brand-dark mt-4 mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ServiceOpenButton>
          </BorderDrawCard>
        ))}
      </div>
    </section>
  );
}
