'use client';

import React, { useRef, useState, useEffect } from 'react';

interface BorderDrawCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BorderDrawCard({ children, className = '' }: BorderDrawCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Dynamically observe card resizing (crucial for responsive grids)
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Compute exact perimeter for dasharray alignment
  const perimeter = (dimensions.width + dimensions.height) * 2;

  return (
    <div
      ref={containerRef}
      className={`relative draw-border-container overflow-hidden bg-brand-bg transition-colors duration-300 ${className}`}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className="draw-border-svg absolute inset-0 w-full h-full pointer-events-none"
          width="100%"
          height="100%"
        >
          <rect
            className="draw-border-rect"
            x="0.75"
            y="0.75"
            width={dimensions.width - 1.5}
            height={dimensions.height - 1.5}
            rx="0" /* Sharp Swiss design grid corner */
            style={{
              strokeDasharray: perimeter,
              strokeDashoffset: perimeter,
            }}
          />
        </svg>
      )}
      {children}
    </div>
  );
}
