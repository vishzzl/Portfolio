'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const completeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(100);
      const timeout = setTimeout(onComplete, 120);
      return () => clearTimeout(timeout);
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 7;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        completeTimeoutRef.current = setTimeout(onComplete, 260);
      }

      setProgress(current);
    }, 64);

    return () => {
      clearInterval(interval);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 bg-brand-bg z-[9999] flex flex-col justify-between p-5 sm:p-8 md:p-12 pointer-events-auto select-none"
      initial={{ y: 0 }}
      exit={{
        y: shouldReduceMotion ? 0 : '-100%',
        opacity: shouldReduceMotion ? 0 : 1,
        transition: { duration: shouldReduceMotion ? 0.12 : 0.78, ease: [0.76, 0, 0.24, 1] },
      }}
      role="status"
      aria-live="polite"
      aria-label="Preparing portfolio"
    >
      <div className="flex justify-between items-baseline gap-4 border-b border-brand-divider pb-3">
        <span className="font-serif text-lg italic text-brand-dark">Vishal</span>
        <span className="font-mono text-[10px] sm:text-xs text-brand-muted tracking-widest text-right">
          {"// PREPARING PORTFOLIO"}
        </span>
      </div>

      <div className="my-auto flex items-baseline justify-center">
        <h1 className="font-serif text-[clamp(6rem,28vw,18rem)] font-light leading-none text-brand-dark tracking-tight flex items-baseline">
          <span>{progress.toString().padStart(3, '0')}</span>
          <span className="text-sm md:text-lg font-mono text-brand-accent tracking-widest ml-3 md:ml-6">
            %
          </span>
        </h1>
      </div>

      <div className="flex justify-between items-center gap-4 text-brand-muted text-[10px] sm:text-xs tracking-widest uppercase">
        <div>INITIALIZING ENGINE</div>
        <div>© 2025</div>
      </div>
    </motion.div>
  );
}
