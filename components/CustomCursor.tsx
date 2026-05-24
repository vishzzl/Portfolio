'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorType = 'default' | 'pointer' | 'project' | 'learn' | 'close';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const latestPoint = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 45, stiffness: 550, mass: 0.1 });
  const dotY = useSpring(cursorY, { damping: 45, stiffness: 550, mass: 0.1 });
  const ringX = useSpring(cursorX, { damping: 26, stiffness: 100, mass: 0.7 });
  const ringY = useSpring(cursorY, { damping: 26, stiffness: 100, mass: 0.7 });

  useEffect(() => {
    const canUseCursor =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseCursor) return;

    setIsEnabled(true);

    const flushPoint = () => {
      cursorX.set(latestPoint.current.x);
      cursorY.set(latestPoint.current.y);
      frameRef.current = null;
    };

    const moveCursor = (event: MouseEvent) => {
      const margin = 2;
      const isOutside =
        event.clientX < margin ||
        event.clientY < margin ||
        event.clientX > window.innerWidth - margin ||
        event.clientY > window.innerHeight - margin;

      setIsVisible((wasVisible) => (wasVisible === !isOutside ? wasVisible : !isOutside));

      if (isOutside) return;

      latestPoint.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(flushPoint);
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const isClose = target.closest('.close-btn');
      const isProject = target.closest('.project-card');
      const isService = target.closest('.service-card');
      const isLink =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive-cursor-target') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';

      let nextType: CursorType = 'default';
      if (isClose) nextType = 'close';
      else if (isProject) nextType = 'project';
      else if (isService) nextType = 'learn';
      else if (isLink) nextType = 'pointer';

      setCursorType((previous) => (previous === nextType ? previous : nextType));
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('blur', hideCursor);
    window.addEventListener('focus', showCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('blur', hideCursor);
      window.removeEventListener('focus', showCursor);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [cursorX, cursorY]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) and (pointer: fine) {
          body,
          a,
          button,
          .project-card,
          .service-card,
          .close-btn,
          input,
          textarea,
          select {
            cursor: none !important;
          }
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-accent rounded-full pointer-events-none z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY, willChange: 'transform' }}
      />

      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden border"
        style={{
          x: ringX,
          y: ringY,
          width: cursorType === 'pointer' ? 44 : cursorType === 'project' || cursorType === 'learn' ? 64 : cursorType === 'close' ? 54 : 26,
          height: cursorType === 'pointer' ? 44 : cursorType === 'project' || cursorType === 'learn' ? 64 : cursorType === 'close' ? 54 : 26,
          backgroundColor:
            cursorType === 'pointer'
              ? 'rgba(182, 155, 117, 0.06)'
              : cursorType === 'project' || cursorType === 'learn'
                ? '#B69B75'
                : cursorType === 'close'
                  ? '#0E0E0E'
                  : 'transparent',
          borderColor:
            cursorType === 'project' || cursorType === 'learn' || cursorType === 'close'
              ? 'transparent'
              : cursorType === 'pointer'
                ? '#B69B75'
                : '#0E0E0E',
          willChange: 'transform',
          transition:
            'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
