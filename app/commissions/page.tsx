'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './commissions.css';

// Section components
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import WhoThisIsFor from './components/WhoThisIsFor';
import WhatWeCanBuild from './components/WhatWeCanBuild';
import RecentWork from './components/RecentWork';
import HowIWork from './components/HowIWork';
import ProcessSteps from './components/ProcessSteps';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function CommissionsPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // ── Scroll Progress ─────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ── Touch Detection ─────────────────────────────────────────
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  // ── Cursor Spotlight (Effect #1) ────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isTouchDevice) return;
      const main = mainRef.current;
      if (!main) return;
      main.style.setProperty('--mouse-x', `${e.clientX}px`);
      main.style.setProperty('--mouse-y', `${e.clientY}px`);
    },
    [isTouchDevice],
  );

  return (
    <main
      ref={mainRef}
      className={`wwm-page wwm-dot-grid ${!isTouchDevice ? 'wwm-spotlight' : ''} relative min-h-screen`}
      onMouseMove={handleMouseMove}
    >
      {/* Scroll Progress Bar (left side, 2px) */}
      <motion.div
        className="wwm-scroll-progress hidden md:block"
        style={{ scaleY }}
      />

      {/* Noise Texture Overlay (Effect #12) */}
      <div className="wwm-noise" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="wwm-noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#wwm-noise-filter)"
          />
        </svg>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — How I Like To Work */}
        <Philosophy />

        {/* Section 3 — Who This Is For */}
        <WhoThisIsFor />

        {/* Section 4 — What We Can Build */}
        <WhatWeCanBuild />

        {/* Section 5 — Recent Work (Most Important) */}
        <RecentWork />

        {/* Section 6 — How I Work */}
        <HowIWork />

        {/* Section 7 — What Working Together Looks Like */}
        <ProcessSteps />

        {/* Section 8 — Start A Conversation */}
        <ContactForm />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
