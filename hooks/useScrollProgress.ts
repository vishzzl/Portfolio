'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let isScheduled = false;

    const handleScroll = () => {
      if (isScheduled) return;
      isScheduled = true;

      rafId = requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        
        if (scrollHeight > 0) {
          const progress = Math.min(Math.max(currentScroll / scrollHeight, 0), 1);
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
        
        isScheduled = false;
      });
    };

    // Initialize progress on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollProgress;
}
