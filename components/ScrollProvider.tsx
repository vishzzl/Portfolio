'use client';

import React from 'react';
import Script from 'next/script';

export default function ScrollProvider() {
  return (
    <Script
      src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Prevent TypeScript compilation errors on window.Lenis by using safe unknown record structures
        const anyWindow = window as unknown as Record<string, unknown> & { lenis?: unknown };
        if (anyWindow.Lenis && typeof anyWindow.Lenis === 'function') {
          const LenisConstructor = anyWindow.Lenis as new (config: unknown) => { raf: (time: number) => void };
          const lenis = new LenisConstructor({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
          });

          // Save instance to window for global access if needed
          anyWindow.lenis = lenis;

          const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
          };

          requestAnimationFrame(raf);
        }
      }}
    />
  );
}
