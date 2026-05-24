'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 80, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const nextPositionRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const canUseMagnetism =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setIsEnabled(canUseMagnetism);
  }, []);

  const flushPosition = () => {
    setPosition(nextPositionRef.current);
    frameRef.current = null;
  };

  const queuePosition = (nextPosition: { x: number; y: number }) => {
    nextPositionRef.current = nextPosition;

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flushPosition);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!isEnabled || event.pointerType !== 'mouse' || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    queuePosition(
      distance < range
        ? { x: distanceX * strength, y: distanceY * strength }
        : { x: 0, y: 0 },
    );
  };

  const resetPosition = () => {
    if (!isEnabled) return;
    queuePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (!isEnabled) {
    return <span className="inline-block max-sm:w-full">{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="inline-block max-sm:w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onBlur={resetPosition}
    >
      <motion.span
        className="inline-block max-sm:w-full"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.1 }}
        style={{ willChange: 'transform' }}
      >
        {children}
      </motion.span>
    </span>
  );
}
