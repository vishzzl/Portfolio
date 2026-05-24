'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';
import { PROJECT_DETAILS, SERVICE_DETAILS } from '@/lib/portfolio-data';

const RAGSimulation = dynamic(
  () => import('@/components/ProjectSimulations').then((module) => module.RAGSimulation),
  { ssr: false, loading: () => <SimulationFallback /> },
);
const SaaSSimulation = dynamic(
  () => import('@/components/ProjectSimulations').then((module) => module.SaaSSimulation),
  { ssr: false, loading: () => <SimulationFallback /> },
);
const WorkflowSimulation = dynamic(
  () => import('@/components/ProjectSimulations').then((module) => module.WorkflowSimulation),
  { ssr: false, loading: () => <SimulationFallback /> },
);
const AnalyticsSimulation = dynamic(
  () => import('@/components/ProjectSimulations').then((module) => module.AnalyticsSimulation),
  { ssr: false, loading: () => <SimulationFallback /> },
);

function SimulationFallback() {
  return (
    <div className="min-h-[20rem] border border-brand-divider bg-[#F2F1EC] p-5 flex flex-col justify-between">
      <div>
        <div className="h-3 w-32 bg-brand-divider/80 mb-5" />
        <div className="space-y-3">
          <div className="h-2 w-5/6 bg-brand-divider/70" />
          <div className="h-2 w-3/4 bg-brand-divider/60" />
          <div className="h-2 w-2/3 bg-brand-divider/50" />
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
        Loading simulation
      </span>
    </div>
  );
}

function ProjectSimulation({ index }: { index: number }) {
  if (index === 0) return <RAGSimulation />;
  if (index === 1) return <SaaSSimulation />;
  if (index === 2) return <WorkflowSimulation />;
  return <AnalyticsSimulation />;
}

export default function PortfolioModals() {
  const { selectedProject, selectedService, closeModals, scrollToSection } = usePortfolioUI();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedProject !== null || selectedService !== null) {
      closeButtonRef.current?.focus();
    }
  }, [selectedProject, selectedService]);

  const modalTransition = {
    duration: shouldReduceMotion ? 0.01 : 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <>
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#FAF9F6]/92 backdrop-blur-md"
            onClick={closeModals}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={modalTransition}
              className="bg-[#FAF9F6] border border-[#0E0E0E] shadow-2xl max-w-6xl w-full max-h-[92svh] md:max-h-[86vh] overflow-hidden relative flex flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModals}
                className="close-btn absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 rounded-full border border-brand-divider hover:border-brand-dark transition bg-[#FAF9F6] z-50 cursor-pointer flex items-center justify-center focus-visible-ring"
                aria-label="Close case study"
              >
                <X size={16} aria-hidden="true" />
              </button>

              <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 md:p-12" data-lenis-prevent="true">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 border-b border-brand-divider pb-7 md:pb-8 mb-7 md:mb-8 pr-10 sm:pr-12 md:pr-0">
                  <div className="md:col-span-8">
                    <span className="font-mono text-[10px] sm:text-xs text-brand-accent uppercase tracking-widest block mb-2">
                      CASE STUDY // DETAIL
                    </span>
                    <h3
                      id="project-modal-title"
                      className="font-serif text-[clamp(2rem,10vw,3.4rem)] text-brand-dark tracking-tight leading-none text-balance"
                    >
                      {PROJECT_DETAILS[selectedProject].title}
                    </h3>
                  </div>

                  <div className="md:col-span-4 grid grid-cols-1 min-[390px]:grid-cols-2 gap-4 text-xs font-mono">
                    {[
                      ['Client:', PROJECT_DETAILS[selectedProject].client],
                      ['Role:', PROJECT_DETAILS[selectedProject].role],
                      ['Duration:', PROJECT_DETAILS[selectedProject].duration],
                      ['Target metric:', PROJECT_DETAILS[selectedProject].metric],
                    ].map(([label, value]) => (
                      <div key={label} className="min-w-0">
                        <span className="text-brand-muted block uppercase">{label}</span>
                        <span className={`${label === 'Target metric:' ? 'text-brand-accent font-bold' : 'text-brand-dark font-semibold'} mt-1 block break-words`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-8 items-start">
                  <div className="lg:col-span-5 space-y-6 text-sm">
                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Overview</h4>
                      <p className="text-brand-muted leading-relaxed">
                        {PROJECT_DETAILS[selectedProject].description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">The Challenge</h4>
                      <p className="text-brand-muted leading-relaxed">
                        {PROJECT_DETAILS[selectedProject].challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">The Architecture</h4>
                      <p className="text-brand-muted leading-relaxed font-mono text-xs bg-[#F2F1EC] p-3 border border-brand-divider break-words">
                        {PROJECT_DETAILS[selectedProject].architecture}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Key Outcomes</h4>
                      <ul className="space-y-2 list-none pl-0 text-brand-muted leading-relaxed">
                        {PROJECT_DETAILS[selectedProject].results.map((result) => (
                          <li key={result} className="flex items-start gap-2">
                            <span className="text-brand-accent font-semibold flex-shrink-0">✓</span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-7 border border-brand-divider overflow-hidden min-h-[20rem]">
                    <ProjectSimulation index={selectedProject} />
                  </div>
                </div>
              </div>

              <div className="bg-[#F2F1EC] border-t border-[#0E0E0E] px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  {"// Case Study interactive analysis"}
                </span>
                <div className="flex flex-col min-[420px]:flex-row gap-3 sm:gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-5 py-2.5 hover:bg-brand-dark hover:text-brand-bg transition-colors duration-200 focus-visible-ring"
                  >
                    <span>View Repository</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      closeModals();
                      requestAnimationFrame(() => scrollToSection('contact'));
                    }}
                    className="inline-flex min-h-11 items-center justify-center gap-2 text-xs uppercase tracking-widest text-brand-bg bg-brand-dark px-5 py-2.5 hover:bg-brand-accent hover:text-brand-bg transition-colors duration-200 focus-visible-ring"
                  >
                    <span>Consult on Similar System</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#FAF9F6]/92 backdrop-blur-md"
            onClick={closeModals}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={modalTransition}
              className="bg-[#FAF9F6] border border-[#0E0E0E] shadow-2xl max-w-3xl w-full max-h-[88svh] overflow-hidden relative flex flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModals}
                className="close-btn absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 rounded-full border border-brand-divider hover:border-brand-dark transition bg-[#FAF9F6] z-50 cursor-pointer flex items-center justify-center focus-visible-ring"
                aria-label="Close service detail"
              >
                <X size={16} aria-hidden="true" />
              </button>

              <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 md:p-12 pr-14 sm:pr-16 md:pr-12" data-lenis-prevent="true">
                <span className="font-mono text-[10px] sm:text-xs text-brand-accent uppercase tracking-widest block mb-2">
                  CAPABILITY // SERVICE DETAIL
                </span>
                <h3
                  id="service-modal-title"
                  className="font-serif text-[clamp(2rem,10vw,2.9rem)] text-brand-dark tracking-tight leading-none mb-1 text-balance"
                >
                  {SERVICE_DETAILS[selectedService].title}
                </h3>
                <span className="text-xs font-mono text-brand-muted block uppercase tracking-wider border-b border-brand-divider pb-4 mb-6">
                  {SERVICE_DETAILS[selectedService].subtitle}
                </span>

                <div className="space-y-6 text-sm">
                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Service Description</h4>
                    <p className="text-brand-muted leading-relaxed">
                      {SERVICE_DETAILS[selectedService].description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Typical Scope</h4>
                    <p className="text-brand-muted leading-relaxed font-mono text-xs bg-[#F2F1EC] p-3 border border-brand-divider">
                      {SERVICE_DETAILS[selectedService].scope}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Core Toolkit</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SERVICE_DETAILS[selectedService].toolkit.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono tracking-wider bg-brand-divider/40 text-brand-dark px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base italic text-brand-dark border-b border-brand-divider pb-1 mb-2 font-semibold">Typical Deliverables</h4>
                    <ul className="space-y-2 list-none pl-0 text-brand-muted leading-relaxed">
                      {SERVICE_DETAILS[selectedService].deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2">
                          <span className="text-brand-accent font-semibold flex-shrink-0">◆</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#F2F1EC] border-t border-[#0E0E0E] px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  {"// Contract scoping consultation"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeModals();
                    requestAnimationFrame(() => scrollToSection('contact'));
                  }}
                  className="w-full sm:w-auto inline-flex min-h-11 items-center justify-center gap-2 text-xs uppercase tracking-widest text-brand-bg bg-brand-dark px-6 py-2.5 hover:bg-brand-accent hover:text-brand-bg transition-colors duration-200 focus-visible-ring"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
