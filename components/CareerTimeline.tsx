'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Briefcase, Cpu, Database, Terminal } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ChipDetail {
  label: string;
  explanation: string;
}

interface MilestoneItem {
  year: string;
  role: string;
  company: string;
  badge: string;
  badgeColor: string;
  badgeColorRgb: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  headline: string;
  details: ChipDetail[];
}

const MILESTONES: MilestoneItem[] = [
  {
    year: '2025 - PRESENT // CONSULTANT',
    role: 'Consultant (Full Stack Software Engineering)',
    company: 'Deloitte',
    badge: 'Azure & Data Engineering',
    badgeColor: '#B69B75',
    badgeColorRgb: '182, 155, 117',
    icon: Briefcase,
    headline:
      'Architected high-performance sales analytics for Mankind Pharma and led Azure cloud-based ERP modernization migrations.',
    details: [
      { label: 'Azure Databricks', explanation: 'Architected Mankind Pharma sales forecasting utilizing Azure Databricks lakehouses.' },
      { label: 'Azure Cache / Redis', explanation: 'Achieved sub-second API response times utilizing Azure Cache for Redis.' },
      { label: 'Azure Service Bus', explanation: 'Engineered real-time data sync, eliminating legacy schedulers.' },
      { label: 'Serverless .NET 9', explanation: 'Migrated 5,000+ daily legacy records using serverless .NET 9 Azure Functions.' },
      { label: 'dbt KPI Pipelines', explanation: 'Engineered automated dbt pipelines for complex sales KPI aggregations.' },
      { label: 'Guidewire FAH', explanation: 'Integrated Guidewire BillingCenter with 100% audit compliance.' },
    ],
  },
  {
    year: '2023 - 2025 // SENIOR ANALYST',
    role: 'AI Automation Lead',
    company: 'Accenture',
    badge: 'AI Agents & Automation',
    badgeColor: '#534AB7',
    badgeColorRgb: '83, 74, 183',
    icon: Cpu,
    headline:
      'Led end-to-end AI-driven automation projects, fine-tuning ML models to identify infrastructure patterns and automate resource bundling.',
    details: [
      { label: 'LangGraph Agents', explanation: 'Orchestrated complex multi-agent reasoning workflows using LangGraph.' },
      { label: 'ML Fine-Tuning', explanation: 'Fine-tuned open-source models using QLoRA for infrastructure patterns.' },
      { label: 'FastAPI & gRPC', explanation: 'Built low-latency gRPC and RESTful API endpoints for AI service integrations.' },
      { label: 'Qdrant Vector DB', explanation: 'Integrated Qdrant vector database indexes to scale semantic search.' },
      { label: 'Azure Logic Apps', explanation: 'Orchestrated complex custom event workflows to automate business operations.' },
      { label: 'KEDA Autoscaling', explanation: 'Maintained 99.9% reliability utilizing KEDA autoscaling on container apps.' },
    ],
  },
  {
    year: '2022 - 2023 // SENIOR ANALYST',
    role: 'Senior Software Engineer',
    company: 'Accenture',
    badge: '.NET & Enterprise Core',
    badgeColor: '#1D9E75',
    badgeColorRgb: '29, 158, 117',
    icon: Database,
    headline:
      'Engineered and maintained over 30 secure, high-throughput RESTful API endpoints integrating AI models into enterprise systems.',
    details: [
      { label: '.NET 8 & DDD', explanation: 'Scaffolded enterprise microservices utilizing Domain-Driven Design in .NET 8.' },
      { label: 'GraphQL Gateways', explanation: 'Designed low-latency GraphQL gateways to consolidate disparate APIs.' },
      { label: 'AI Integrations', explanation: 'Embedded predictive AI workflows inside high-throughput transactional services.' },
      { label: 'Azure Service Sync', explanation: 'Orchestrated real-time data sync pipelines across Azure Logic Apps.' },
      { label: 'Azure Key Vault', explanation: 'Secured connection keys and secrets with 100% audit compliance.' },
      { label: 'OpenTelemetry', explanation: 'Delivered comprehensive observability utilizing OpenTelemetry logs and traces.' },
    ],
  },
  {
    year: '2021 - 2022 // ANALYST',
    role: 'Cloud Automation Engineer',
    company: 'Accenture',
    badge: 'IaC & Platform Ops',
    badgeColor: '#993C1D',
    badgeColorRgb: '153, 60, 29',
    icon: Terminal,
    headline:
      'Streamlined cloud resource orchestration and automated business processes to significantly reduce manual intervention.',
    details: [
      { label: 'Pulumi IaC', explanation: 'Orchestrated cloud environments using Pulumi for type-safe IaC.' },
      { label: 'Python Scripting', explanation: 'Wrote background scripts for bulk record migrations and automated cleanup.' },
      { label: 'Azure Logic Flows', explanation: 'Designed serverless Azure Logic Apps flows to synchronize multi-cloud operations.' },
      { label: 'CI/CD Pipelines', explanation: 'Built automated GitHub Actions pipelines to streamline deployment workflows.' },
      { label: 'Azure Access IAM', explanation: 'Configured role-based access controls and secure cloud identity pathways.' },
      { label: 'System Reliability', explanation: 'Maintained 99.9% operational reliability across all automated pipelines.' },
    ],
  },
];

function getPhaseIndex(progress: number) {
  if (progress < 0.25) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.75) return 2;
  return 3;
}

function MobileTimeline() {
  return (
    <section className="section-shell border-b border-brand-divider bg-[#FAF9F6]">
      <div className="w-full flex items-baseline justify-between gap-4 border-b border-brand-divider pb-3 mb-8">
        <span className="font-mono text-[10px] text-brand-muted tracking-widest">
          01-B // PROFESSIONAL MILESTONES
        </span>
        <h2 className="font-serif text-base italic text-brand-dark tracking-wide text-right">
          Evolution of Impact
        </h2>
      </div>

      <div className="space-y-5">
        {MILESTONES.map((milestone) => {
          const Icon = milestone.icon;

          return (
            <article
              key={milestone.year}
              className="border border-brand-divider bg-[#FAF9F6] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.035)]"
              style={{ borderLeftColor: milestone.badgeColor, borderLeftWidth: 3 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                    {milestone.year}
                  </span>
                  <h3 className="font-serif text-2xl text-brand-dark mt-2 leading-tight">
                    {milestone.company}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mt-1">
                    {milestone.role}
                  </p>
                </div>
                <div
                  className="h-10 w-10 flex items-center justify-center border"
                  style={{ borderColor: milestone.badgeColor, color: milestone.badgeColor }}
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </div>
              </div>

              <p className="font-serif text-lg italic text-brand-dark leading-relaxed mt-5">
                &quot;{milestone.headline}&quot;
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {milestone.details.map((detail) => (
                  <span
                    key={detail.label}
                    className="font-mono text-[9px] uppercase tracking-wider border px-2.5 py-1 bg-[#F2F1EC]"
                    style={{ borderColor: `rgba(${milestone.badgeColorRgb}, 0.26)`, color: milestone.badgeColor }}
                    title={detail.explanation}
                  >
                    {detail.label}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DesktopTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyFrameRef = useRef<HTMLDivElement>(null);
  const currentPhaseRef = useRef(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [hoveredDetail, setHoveredDetail] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 42,
    stiffness: 92,
    restDelta: 0.001,
  });
  const orbitRotation = useTransform(smoothProgress, [0, 1], [0, 120]);
  const counterRotation = useTransform(smoothProgress, [0, 1], [0, -120]);

  const applyPhase = useCallback((nextIndex: number) => {
    if (currentPhaseRef.current === nextIndex) return;

    currentPhaseRef.current = nextIndex;
    setPhaseIndex(nextIndex);

    const milestone = MILESTONES[nextIndex];
    stickyFrameRef.current?.style.setProperty('--timeline-accent', milestone.badgeColor);
    stickyFrameRef.current?.style.setProperty('--timeline-accent-rgb', milestone.badgeColorRgb);
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    applyPhase(getPhaseIndex(latest));
  });

  useEffect(() => {
    const milestone = MILESTONES[0];
    stickyFrameRef.current?.style.setProperty('--timeline-accent', milestone.badgeColor);
    stickyFrameRef.current?.style.setProperty('--timeline-accent-rgb', milestone.badgeColorRgb);
    applyPhase(getPhaseIndex(smoothProgress.get()));
  }, [applyPhase, smoothProgress]);

  const radius = 160;

  return (
    <section ref={containerRef} className="relative w-full" style={{ minHeight: '400vh' }}>
      <div
        ref={stickyFrameRef}
        data-phase={phaseIndex}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-32 pb-16 bg-[#FAF9F6] border-b border-brand-divider"
        style={{
          '--timeline-accent': MILESTONES[0].badgeColor,
          '--timeline-accent-rgb': MILESTONES[0].badgeColorRgb,
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
          <svg width="100%" height="100%" aria-hidden="true">
            <pattern id="timelineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0E0E0E" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#timelineGrid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between px-[var(--container-inline)] min-h-0 relative z-10">
          <div className="w-full flex items-baseline justify-between border-b border-brand-divider pb-3 flex-shrink-0">
            <span className="font-mono text-[10px] text-brand-muted tracking-widest">
              01-B // PROFESSIONAL MILESTONES
            </span>
            <h2 className="font-serif text-lg italic text-brand-dark tracking-wide">
              Evolution of Impact
            </h2>
          </div>

          <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-0 py-4">
            <div className="absolute left-1/2 top-[40px] bottom-[140px] w-[2px] -translate-x-1/2 bg-brand-divider/40 select-none pointer-events-none z-0">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#B69B75] rounded-full origin-top"
                style={{ scaleY: smoothProgress, height: '100%' }}
              />
            </div>

            <div className="relative w-[460px] h-[460px] flex items-center justify-center">
              <div className="relative z-30 flex items-center justify-center">
                <motion.div
                  className="absolute w-[11.5rem] h-[11.5rem] rounded-full border border-dashed pointer-events-none"
                  style={{
                    borderColor: 'var(--timeline-accent)',
                    opacity: 0.35,
                    rotate: orbitRotation,
                  }}
                />

                <motion.div
                  className="w-40 h-40 rounded-full bg-[#FAF9F6] border flex flex-col items-center justify-center shadow-md relative accent-transition"
                  style={{
                    borderColor: 'var(--timeline-accent)',
                    boxShadow: '0 4px 24px rgba(var(--timeline-accent-rgb), 0.15)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredDetail ? hoveredDetail : phaseIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center text-center px-3"
                    >
                      {hoveredDetail ? (
                        <span className="font-sans text-[11px] leading-relaxed text-brand-dark select-none font-normal italic">
                          &quot;{hoveredDetail}&quot;
                        </span>
                      ) : (
                        <>
                          <span className="font-serif text-lg font-bold tracking-tight text-brand-dark select-none leading-none">
                            {MILESTONES[phaseIndex].year.split(' // ')[0].replace('PRESENT', 'PRES')}
                          </span>
                          <span className="font-mono text-xs tracking-widest uppercase mt-3 select-none leading-none truncate max-w-[130px] text-brand-muted">
                            {MILESTONES[phaseIndex].company}
                          </span>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div
                style={{ rotate: orbitRotation }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div key={phaseIndex} className="absolute inset-0 flex items-center justify-center">
                    {MILESTONES[phaseIndex].details.map((sat, index) => {
                      const angle = (index * 360) / MILESTONES[phaseIndex].details.length;
                      const radians = (angle * Math.PI) / 180;
                      const staggeredRadius = radius + (index % 2) * 28;
                      const targetX = Math.round(Math.cos(radians) * staggeredRadius);
                      const targetY = Math.round(Math.sin(radians) * staggeredRadius);

                      return (
                        <motion.div
                          key={sat.label}
                          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                          animate={{ x: targetX, y: targetY, opacity: 1, scale: 1 }}
                          exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                          style={{ rotate: counterRotation }}
                          transition={{
                            type: 'spring',
                            stiffness: 110,
                            damping: 15,
                            delay: index * 0.02,
                          }}
                          onMouseEnter={() => setHoveredDetail(sat.explanation)}
                          onMouseLeave={() => setHoveredDetail(null)}
                          className="absolute pointer-events-auto cursor-help"
                        >
                          <span
                            className="inline-block px-3.5 py-1.5 text-[10.5px] font-mono font-bold uppercase rounded-full border bg-[#FAF9F6] shadow-sm select-none accent-transition hover:scale-105 transition-all duration-300"
                            style={{
                              color: 'var(--timeline-accent)',
                              borderColor: 'rgba(var(--timeline-accent-rgb), 0.25)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                            }}
                          >
                            {sat.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="text-center max-w-2xl mx-auto px-6 mt-8 flex flex-col items-center relative z-20">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted mb-1 select-none leading-none">
                {MILESTONES[phaseIndex].company} · {MILESTONES[phaseIndex].role}
              </span>

              <AnimatePresence mode="wait">
                <motion.p
                  key={phaseIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-2xl text-brand-dark italic leading-relaxed font-light max-w-xl"
                >
                  &quot;{MILESTONES[phaseIndex].headline}&quot;
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full flex justify-center flex-shrink-0 pt-3">
            <span className="font-mono text-[8px] text-brand-muted tracking-widest uppercase">
              SCROLL TO MORPH EXPERIENCE // 2021 → PRESENT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CareerTimeline() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const shouldReduceMotion = useReducedMotion();

  if (!isDesktop || shouldReduceMotion) {
    return <MobileTimeline />;
  }

  return <DesktopTimeline />;
}
