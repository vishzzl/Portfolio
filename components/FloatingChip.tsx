'use client';

import React, { useState } from 'react';
import { motion, useTransform, MotionValue, AnimatePresence } from 'framer-motion';

interface FloatingChipProps {
  label: string;
  explanation: string;
  className?: string; // Positions, e.g., "top-[10%] left-[5%]"
  factor: number; // Parallax strength (multiplier)
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export default function FloatingChip({ label, explanation, className = '', factor, x, y }: FloatingChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map smooth mouse coordinates to parallax translate values
  const transformX = useTransform(x, (val: number) => val * factor);
  const transformY = useTransform(y, (val: number) => val * factor);

  return (
    <motion.div
      style={{ x: transformX, y: transformY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute ${className} px-3.5 py-1.5 rounded-full border border-brand-divider/80 bg-brand-bg/60 backdrop-blur-sm text-[10px] font-mono tracking-wider text-brand-muted select-none pointer-events-auto cursor-none hover:scale-105 hover:border-brand-accent hover:text-brand-dark hover:bg-brand-bg transition-all duration-300 z-10 hidden md:block interactive-cursor-target`}
    >
      <span>{label}</span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 p-3 bg-brand-bg border border-brand-accent/30 rounded-md shadow-lg text-[10px] leading-relaxed text-brand-dark text-center z-30 pointer-events-none normal-case font-sans tracking-normal font-normal"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            }}
          >
            {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
