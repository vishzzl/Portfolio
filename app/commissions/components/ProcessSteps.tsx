'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { PROCESS_STEPS } from '../data';

/* ── Animation variants ──────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Step Dot ────────────────────────────────────────────────── */

function StepDot({ active }: { active: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 12, height: 12 }}
    >
      <div
        className="rounded-full transition-all duration-500"
        style={{
          width: active ? 8 : 6,
          height: active ? 8 : 6,
          background: active ? 'var(--accent)' : 'var(--border)',
        }}
      />
    </div>
  );
}

/* ── Desktop Horizontal Layout ───────────────────────────────── */

function DesktopProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.5'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Each step appears when line reaches its position
  const stepCount = PROCESS_STEPS.length;
  const stepThresholds = PROCESS_STEPS.map((_, i) => i / (stepCount - 1));

  return (
    <div ref={sectionRef} className="hidden md:block mt-16">
      <div className="relative">
        {/* SVG connecting line */}
        <svg
          className="absolute"
          style={{
            top: 5,
            left: '5%',
            width: '90%',
            height: 2,
            overflow: 'visible',
          }}
        >
          {/* Background track */}
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
          />
          {/* Animated line */}
          <motion.line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
            pathLength="1"
            className="wwm-process-line"
            style={{ strokeDashoffset: lineProgress }}
          />
        </svg>

        {/* Steps row */}
        <div className="flex justify-between">
          {PROCESS_STEPS.map((step, i) => {
            const stepOpacity = useTransform(
              scrollYProgress,
              [
                Math.max(0, stepThresholds[i] - 0.05),
                stepThresholds[i] + 0.05,
              ],
              [0, 1],
            );
            const stepY = useTransform(
              scrollYProgress,
              [
                Math.max(0, stepThresholds[i] - 0.05),
                stepThresholds[i] + 0.05,
              ],
              [16, 0],
            );

            return (
              <motion.div
                key={step.name}
                className="flex flex-col items-center text-center"
                style={{
                  width: `${100 / stepCount}%`,
                  opacity: stepOpacity,
                  y: stepY,
                }}
              >
                <StepDot active={true} />
                <h3
                  className="mt-4"
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.name}
                </h3>
                <p
                  className="wwm-body mt-2"
                  style={{ fontSize: '14px', maxWidth: '180px' }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Vertical Layout ──────────────────────────────────── */

function MobileProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.6'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const stepCount = PROCESS_STEPS.length;
  const stepThresholds = PROCESS_STEPS.map((_, i) => i / (stepCount - 1));

  return (
    <div ref={sectionRef} className="block md:hidden mt-12">
      <div className="relative pl-8">
        {/* Vertical SVG line */}
        <svg
          className="absolute left-[5px] top-0"
          style={{ width: 2, height: '100%', overflow: 'visible' }}
        >
          {/* Background track */}
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
          />
          {/* Animated line */}
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
            pathLength="1"
            className="wwm-process-line"
            style={{ strokeDashoffset: lineProgress }}
          />
        </svg>

        {/* Steps column */}
        <div className="flex flex-col gap-10">
          {PROCESS_STEPS.map((step, i) => {
            const stepOpacity = useTransform(
              scrollYProgress,
              [
                Math.max(0, stepThresholds[i] - 0.05),
                stepThresholds[i] + 0.05,
              ],
              [0, 1],
            );
            const stepX = useTransform(
              scrollYProgress,
              [
                Math.max(0, stepThresholds[i] - 0.05),
                stepThresholds[i] + 0.05,
              ],
              [12, 0],
            );

            return (
              <motion.div
                key={step.name}
                className="relative"
                style={{ opacity: stepOpacity, x: stepX }}
              >
                {/* Dot positioned on the vertical line */}
                <div
                  className="absolute"
                  style={{ left: '-27px', top: '2px' }}
                >
                  <StepDot active={true} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.name}
                </h3>
                <p className="wwm-body mt-1" style={{ fontSize: '14px' }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── ProcessSteps Section ────────────────────────────────────── */

export default function ProcessSteps() {
  const eyebrowRef = useRef(null);
  const eyebrowInView = useInView(eyebrowRef, { once: true, margin: '-50px' });

  return (
    <section>
      <motion.div
        className="wwm-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={itemVariants}>
          <span
            ref={eyebrowRef}
            className={`wwm-eyebrow ${eyebrowInView ? 'is-visible' : ''}`}
          >
            Process
          </span>
          <h2 className="wwm-h2 mt-4">What working together looks like.</h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DesktopProcess />
          <MobileProcess />
        </motion.div>
      </motion.div>
    </section>
  );
}
