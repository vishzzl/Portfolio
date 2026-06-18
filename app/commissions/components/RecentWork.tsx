'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROJECTS, type ProjectData } from '../data';

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

/* ── Count-Up Hook ───────────────────────────────────────────── */

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (!inView || fired.current || target === 0) return;
    fired.current = true;

    let start: number | null = null;
    let raf: number;

    const easeOutExpo = (t: number) => 1 - Math.pow(2, -10 * t);

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return value;
}

/* ── Impact Display ──────────────────────────────────────────── */

function ImpactDisplay({ project, inView }: { project: ProjectData; inView: boolean }) {
  const count = useCountUp(project.impactValue ?? 0, inView);

  if (project.impactValue != null) {
    return (
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="wwm-impact-number">
          {project.impactPrefix ?? ''}
          {count}
          {project.impactSuffix ?? ''}
        </span>
        <span className="wwm-body">{project.impactLabel}</span>
      </div>
    );
  }

  return <p className="wwm-body">{project.impactLabel}</p>;
}

/* ── Project Card ────────────────────────────────────────────── */

function ProjectCard({ project }: { project: ProjectData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  // 3D tilt state
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [shadowOffset, setShadowOffset] = useState({ x: 0, y: 8 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      setRotation({
        x: -offsetY * 6, // rotateX: tilting up/down
        y: offsetX * 6,  // rotateY: tilting left/right
      });
      setShadowOffset({
        x: -offsetX * 12,
        y: 8 - offsetY * 8,
      });
    },
    [isTouchDevice],
  );

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) setIsHovering(true);
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setShadowOffset({ x: 0, y: 8 });
  }, []);

  const tiltStyle: React.CSSProperties = isTouchDevice
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovering
          ? 'transform 0.15s ease'
          : 'transform 0.4s ease',
        boxShadow: isHovering
          ? `${shadowOffset.x}px ${Math.max(shadowOffset.y, 2)}px 40px rgba(0, 0, 0, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.7)`
          : undefined,
      };

  return (
    <motion.div variants={itemVariants}>
      <div
        ref={cardRef}
        className="glass-card"
        style={{
          padding: 'clamp(32px, 4vw, 40px)',
          ...tiltStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top row: name + year */}
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <h3 className="wwm-card-title">{project.name}</h3>
          <span className="wwm-mono shrink-0" style={{ color: 'var(--text-muted)' }}>
            {project.year}
          </span>
        </div>

        {/* Divider */}
        <div
          className="mb-6"
          style={{ height: '1px', background: 'var(--border)' }}
        />

        {/* Content sections */}
        <div className="grid gap-6" style={{ gridTemplateColumns: '1fr' }}>
          {/* Problem */}
          <div>
            <span
              className="block mb-1.5"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
              }}
            >
              Problem
            </span>
            <p className="wwm-body">{project.problem}</p>
          </div>

          {/* Approach */}
          <div>
            <span
              className="block mb-1.5"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
              }}
            >
              Approach
            </span>
            <p className="wwm-body">{project.approach}</p>
          </div>

          {/* Impact — dominant */}
          <div className="pt-2">
            <span
              className="block mb-2"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
              }}
            >
              Impact
            </span>
            <ImpactDisplay project={project} inView={isInView} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── RecentWork Section ──────────────────────────────────────── */

export default function RecentWork() {
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
        <motion.div variants={itemVariants} className="mb-10">
          <span
            ref={eyebrowRef}
            className={`wwm-eyebrow ${eyebrowInView ? 'is-visible' : ''}`}
          >
            Selected Projects
          </span>
          <h2 className="wwm-h2 mt-4">Recent work.</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
