'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorType = 'default' | 'pointer' | 'project' | 'learn' | 'close';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Stiff spring for the inner dot to follow cursor closely
  const dotX = useSpring(cursorX, { damping: 45, stiffness: 550, mass: 0.1 });
  const dotY = useSpring(cursorY, { damping: 45, stiffness: 550, mass: 0.1 });

  // Soft spring for the outer ring to create a premium fluid lag effect
  const ringX = useSpring(cursorX, { damping: 26, stiffness: 100, mass: 0.7 });
  const ringY = useSpring(cursorY, { damping: 26, stiffness: 100, mass: 0.7 });

  useEffect(() => {
    // Only enable custom cursor if it's not a touch-only device
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      const margin = 2; // small threshold to hide cursor right at the edge
      const isOutside = 
        e.clientX < margin || 
        e.clientY < margin || 
        e.clientX > window.innerWidth - margin || 
        e.clientY > window.innerHeight - margin;

      if (isOutside) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check hover classes/elements
      const isClose = target.closest('.close-btn');
      const isProject = target.closest('.project-card');
      const isService = target.closest('.service-card');
      const isLink = target.closest('a') || target.closest('button') || target.closest('.interactive-cursor-target') || target.tagName === 'A' || target.tagName === 'BUTTON';

      let newType: CursorType = 'default';
      if (isClose) {
        newType = 'close';
      } else if (isProject) {
        newType = 'project';
      } else if (isService) {
        newType = 'learn';
      } else if (isLink) {
        newType = 'pointer';
      }

      // Deduplicate state updates
      setCursorType((prev) => (prev !== newType ? newType : prev));
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    const handleFocus = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  // Render CSS configuration classes for style and scale transitions
  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) and (pointer: fine) {
          body, a, button, .project-card, .service-card, .close-btn, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner solid dot (stiff tracking) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-accent rounded-full pointer-events-none z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
          willChange: 'transform',
        }}
      />

      {/* Outer lagging ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden border"
        style={{
          x: ringX,
          y: ringY,
          width: cursorType === 'pointer' ? 44 : (cursorType === 'project' || cursorType === 'learn') ? 64 : cursorType === 'close' ? 54 : 26,
          height: cursorType === 'pointer' ? 44 : (cursorType === 'project' || cursorType === 'learn') ? 64 : cursorType === 'close' ? 54 : 26,
          backgroundColor: cursorType === 'pointer' ? 'rgba(182, 155, 117, 0.06)' : (cursorType === 'project' || cursorType === 'learn') ? '#B69B75' : cursorType === 'close' ? '#0E0E0E' : 'transparent',
          borderColor: (cursorType === 'project' || cursorType === 'learn' || cursorType === 'close') ? 'transparent' : cursorType === 'pointer' ? '#B69B75' : '#0E0E0E',
          willChange: 'transform, width, height',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {cursorType === 'project' && (
          <span className="text-[10px] tracking-widest text-brand-bg uppercase font-bold select-none">
            View
          </span>
        )}
        {cursorType === 'learn' && (
          <span className="text-[10px] tracking-widest text-brand-bg uppercase font-bold select-none">
            Learn
          </span>
        )}
        {cursorType === 'close' && (
          <span className="text-[9px] tracking-wider text-brand-bg uppercase font-bold select-none">
            Close
          </span>
        )}
      </motion.div>
    </>
  );
}
