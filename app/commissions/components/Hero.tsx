'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { HERO_PILLARS } from '../data';

// ── Scramble Characters ───────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
const HEADLINE_TEXT = "Let's build something useful together.";

// ── Animation Variants ────────────────────────────────────────
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

const pillarVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const isEyebrowInView = useInView(eyebrowRef, { once: true, margin: '-50px' });

  // ── Character Scramble (Effect #3) ────────────────────────
  const [displayText, setDisplayText] = useState(HEADLINE_TEXT);
  const [isScrambling, setIsScrambling] = useState(true);
  const scrambleRan = useRef(false);

  useEffect(() => {
    if (scrambleRan.current) return;
    scrambleRan.current = true;

    const chars = HEADLINE_TEXT.split('');
    const totalDuration = 1200; // 1.2 seconds
    const intervalMs = 30;
    const totalFrames = totalDuration / intervalMs;
    let frame = 0;

    setIsScrambling(true);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = chars
        .map((char, i) => {
          if (char === ' ' || char === '.' || char === "'") return char;
          const threshold = i / chars.length;
          if (progress >= threshold) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setDisplayText(HEADLINE_TEXT);
        setIsScrambling(false);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  // ── Magnetic Button (Effect #4) ────────────────────────────
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const handleBtnMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < 60) {
        setBtnOffset({ x: dx * 0.3, y: dy * 0.3 });
      } else {
        setBtnOffset({ x: 0, y: 0 });
      }
    },
    [isTouchDevice],
  );

  const resetBtnOffset = useCallback(() => {
    setBtnOffset({ x: 0, y: 0 });
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="wwm-section"
      style={{ paddingTop: 'clamp(120px, 16vw, 180px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16 items-start"
      >
        {/* Left Column */}
        <div>
          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <span
              ref={eyebrowRef}
              className={`wwm-eyebrow ${isEyebrowInView ? 'is-visible' : ''}`}
            >
              Work With Me
            </span>
          </motion.div>

          {/* Headline with Scramble */}
          <motion.h1
            variants={itemVariants}
            className="wwm-h1 mt-6 mb-6"
            style={{
              fontFamily: isScrambling
                ? "var(--font-mono-terminal), 'JetBrains Mono', monospace"
                : "var(--font-instrument), Georgia, serif",
              transition: 'font-family 0.15s ease',
            }}
          >
            {displayText}
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="wwm-body max-w-[520px] mb-10">
            I help businesses, founders, and teams turn ideas into products people enjoy using.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary — Magnetic */}
            <div
              className="inline-block"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={resetBtnOffset}
            >
              <motion.button
                ref={btnRef}
                className="glass-btn glass-btn-primary"
                animate={{ x: btnOffset.x, y: btnOffset.y }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 14,
                  mass: 0.1,
                }}
                onClick={() => scrollToSection('contact')}
              >
                Start a conversation
              </motion.button>
            </div>

            {/* Secondary — Ghost */}
            <button
              className="glass-btn glass-btn-ghost"
              onClick={() => scrollToSection('recent-work')}
            >
              See recent work
            </button>
          </motion.div>

          {/* Location Line with Green Pulse (Effect #10) */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-10 flex-wrap"
          >
            <span className="wwm-pulse-container">
              <span className="wwm-pulse-ring" />
              <span className="wwm-pulse-dot" />
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Based in Bengaluru, India
              <span className="mx-2 opacity-30">·</span>
              Working remotely
              <span className="mx-2 opacity-30">·</span>
              Usually replies within 24 hours
            </span>
          </motion.div>
        </div>

        {/* Right Column — Editorial Notes */}
        <motion.div
          variants={containerVariants}
          className="hidden md:flex flex-col gap-6 pt-20"
        >
          {HERO_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              variants={pillarVariants}
              className="flex items-center gap-4"
              style={{
                paddingLeft: '20px',
                borderLeft: '1px solid var(--border)',
              }}
            >
              <span
                className="text-sm"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
              >
                {pillar}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
