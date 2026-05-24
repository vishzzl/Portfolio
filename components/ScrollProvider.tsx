'use client';

import { useEffect } from 'react';

interface LenisInstance {
  raf: (time: number) => void;
  destroy?: () => void;
  stop: () => void;
  start: () => void;
}

type LenisConstructor = new (config: Record<string, unknown>) => LenisInstance;

declare global {
  interface Window {
    Lenis?: LenisConstructor;
    lenis?: LenisInstance;
  }
}

export default function ScrollProvider() {
  useEffect(() => {
    const shouldUseNativeScroll =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldUseNativeScroll) return;

    let frame = 0;
    let isCancelled = false;
    let script: HTMLScriptElement | null = null;

    const startLenis = () => {
      if (isCancelled || !window.Lenis || window.lenis) return;

      const lenis = new window.Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      window.lenis = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    };

    if (window.Lenis) {
      startLenis();
    } else {
      script = document.createElement('script');
      script.src = 'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js';
      script.async = true;
      script.dataset.lenis = 'true';
      script.onload = startLenis;
      document.head.appendChild(script);
    }

    return () => {
      isCancelled = true;

      if (frame) cancelAnimationFrame(frame);
      window.lenis?.destroy?.();
      window.lenis = undefined;

      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
