'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 80, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate center from the STATIC outer container, not the moving inner node
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        // Translate child towards cursor based on strength factor
        setPosition({ x: distanceX * strength, y: distanceY * strength });
      } else {
        // Reset translation
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const el = containerRef.current;
    if (!el) return;

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block">
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
