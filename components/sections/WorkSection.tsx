import BorderDrawCard from '@/components/BorderDrawCard';
import {
  AnalyticsDiagram,
  RAGDiagram,
  SaaSDiagram,
  WorkflowDiagram,
} from '@/components/ProjectDiagram';
import SectionHeader from '@/components/ui/SectionHeader';
import { ProjectOpenButton } from '@/components/ui/OpenCardButton';
import { PROJECT_CARDS, type ProjectCard } from '@/lib/portfolio-data';
import Link from 'next/link';

function ProjectDiagram({ diagram }: { diagram: ProjectCard['diagram'] }) {
  switch (diagram) {
    case 'rag':
      return <RAGDiagram />;
    case 'saas':
      return <SaaSDiagram />;
    case 'workflow':
      return <WorkflowDiagram />;
    case 'analytics':
      return <AnalyticsDiagram />;
  }
}

export default function WorkSection() {
  return (
    <section id="work" className="section-shell border-b border-brand-divider">
      <SectionHeader num="03 // WORK" title="Selected Case Studies" />
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        {PROJECT_CARDS.map((project, index) => {
          const isAlternating = index % 2 === 1;

          return (
            <BorderDrawCard
              key={project.title}
              className="project-card group border border-brand-divider/60"
            >
              <ProjectOpenButton
                projectIndex={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-center p-4 sm:p-6 md:p-10"
              >
                <div
                  className={`lg:col-span-6 w-full aspect-[5/3] min-h-[12rem] overflow-hidden bg-brand-bg ${
                    isAlternating ? 'lg:order-2' : ''
                  }`}
                >
                  <ProjectDiagram diagram={project.diagram} />
                </div>
                <div
                  className={`lg:col-span-6 flex flex-col justify-between min-w-0 ${
                    isAlternating ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    <span className="font-mono text-[0.68rem] sm:text-xs text-brand-accent tracking-widest uppercase block mb-2">
                      {project.eyebrow}
                    </span>
                    <h3 className="font-serif text-[clamp(1.9rem,8vw,2.6rem)] text-brand-dark mb-4 leading-tight text-balance">
                      {project.title}
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="border-t border-brand-divider pt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <span className="text-xs uppercase tracking-widest text-brand-muted">
                        OUTCOME
                      </span>
                      <span className="font-serif text-xl md:text-2xl text-brand-accent font-semibold sm:text-right leading-tight">
                        {project.outcome}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ProjectOpenButton>
            </BorderDrawCard>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-brand-divider/40 text-center">
        <p className="text-sm text-brand-muted mb-3 font-sans">
          Looking for boutique website design, local SEO, or independent client portals?
        </p>
        <Link
          href="/commissions"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-accent hover:text-brand-dark transition-colors duration-200 focus-visible-ring"
        >
          <span>View Client Commission Work →</span>
        </Link>
      </div>
    </section>
  );
}
