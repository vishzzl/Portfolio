import Reveal from '@/components/motion/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

export default function AboutSection() {
  return (
    <section id="about" className="section-shell border-b border-brand-divider">
      <SectionHeader num="01 // ABOUT" title="Core Philosophy" />
      <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-4">
          <h3 className="font-serif text-[clamp(1.8rem,7vw,2.6rem)] italic text-brand-dark tracking-wide leading-tight text-balance">
            Architectural systems thinking applied to every layer.
          </h3>
        </div>
        <div className="lg:col-span-8 space-y-6 text-brand-muted text-sm sm:text-base leading-relaxed max-w-2xl">
          <p>
            Vishal is an independent Full Stack and AI Engineer with deep expertise in scalable
            cloud-native architecture, enterprise systems, and AI-native product development. He
            collaborates with product companies and engineering teams to design, build, and ship
            reliable, high-performance digital products.
          </p>
          <p>
            His approach is structural - prioritizing robustness, reliability, and clean separation
            of concerns. He is a partner who integrates deeply with teams, designing scalable data
            models, deploying performant backend services, and polishing user interfaces with the
            same precision.
          </p>
          <p className="font-serif text-brand-dark italic">
            Available for select contracts, long-term engagements, and advisory roles.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
