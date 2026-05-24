'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Simulate dynamic loading jumps (creates a luxury digital interface feel)
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 350); // Muted pause at 100% for readability
      }
      setProgress(current);
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-brand-bg z-[9999] flex flex-col justify-between p-8 md:p-12 pointer-events-auto select-none"
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }, // Classic editorial exit curve
      }}
    >
      {/* Preloader Header */}
      <div className="flex justify-between items-baseline border-b border-brand-divider pb-3">
        <span className="font-serif text-lg italic text-brand-dark">Vishal</span>
        <span className="font-mono text-xs text-brand-muted tracking-widest">{"// PREPARING PORTFOLIO"}</span>
      </div>

      {/* Preloader Counter */}
      <div className="my-auto flex items-baseline justify-center">
        <h1 className="font-serif text-[18vw] font-light leading-none text-brand-dark tracking-tight flex items-baseline">
          <span>{progress.toString().padStart(3, '0')}</span>
          <span className="text-sm md:text-lg font-mono text-brand-accent tracking-widest ml-4 md:ml-6">%</span>
        </h1>
      </div>

      {/* Preloader Footer */}
      <div className="flex justify-between items-center text-brand-muted text-xs tracking-widest uppercase">
        <div>INITIALIZING ENGINE</div>
        <div>© 2025</div>
      </div>
    </motion.div>
  );
}
