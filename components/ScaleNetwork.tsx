'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function ScaleNetwork({ isActive }: { isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '-15% 0px -15% 0px' });
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = isActive && isInView && !shouldReduceMotion;

  // Entrance timeline delay offsets
  const startDelay = 1.2;

  // Variant helper for 0 -> 1 scale popping
  const popIn = (delayOffset: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 160,
        damping: 14,
        mass: 0.1,
        delay: startDelay + delayOffset,
      },
    },
  });

  // Variant helper for drawing strokes (pathLength 0 -> 1)
  const drawStroke = (delayOffset: number, duration: number = 0.7) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration,
        ease: 'easeInOut' as const,
        delay: startDelay + delayOffset,
      },
    },
  });

  // Pulse animation for Gen3 frontier nodes
  const pulseOpacity = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.35, 1, 0.35],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay: startDelay + 3.8,
      },
    },
  };

  // Pulse animation for ambient AI glows
  const pulseGlow = (scale: number) => ({
    hidden: { scale: 1, opacity: 0 },
    visible: {
      scale: [1, scale, 1],
      opacity: [0.1, 0.35, 0.1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay: startDelay + 3.8,
      },
    },
  });

  // Entrance slide-up wrapper
  const entranceVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 1.2,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={entranceVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className="w-full max-w-[min(36rem,100%)] aspect-[400/280] bg-transparent relative select-none interactive-cursor-target md:cursor-none"
    >
      <svg viewBox="0 0 400 280" className="w-full h-full fill-none overflow-visible" xmlns="http://www.w3.org/2000/svg">
          
          {/* BACKGROUND: Faint dashed growth curve arc */}
          <path
            d="M 30 260 A 300 300 0 0 1 370 20"
            stroke="#E6E5E0"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* TRAVELING SIGNAL PATH (Muted overlay track) */}
          {/* Path: Root (200,240) -> Gen1 Left (140,175) -> Gen2 Mid-Left (160,110) -> Gen3 Center (200,45) */}
          <path
            id="signalPath"
            d="M 200 240 L 140 175 L 160 110 L 200 45"
            stroke="none"
            fill="none"
          />

          {/* SIGNAL DOT (Travels up central branch every 3.8s, begins at t=2.0s) */}
          {shouldAnimate && (
            <circle r="3" fill="#B69B75">
              <animateMotion
                dur="3.8s"
                repeatCount="indefinite"
                begin={`${startDelay + 2.0}s`}
                path="M 200 240 L 140 175 L 160 110 L 200 45"
              />
            </circle>
          )}

          {/* LINES — ROOT TO GEN 1 (gray #C8C7C2) */}
          <g stroke="#C8C7C2" strokeWidth="1.2">
            <motion.line x1="200" y1="240" x2="140" y2="175" variants={drawStroke(0.4)} animate={isActive ? 'visible' : 'hidden'} />
            <motion.line x1="200" y1="240" x2="260" y2="175" variants={drawStroke(0.4)} animate={isActive ? 'visible' : 'hidden'} />
          </g>

          {/* LINES — GEN 1 TO GEN 2 (gray #C8C7C2) */}
          <g stroke="#C8C7C2" strokeWidth="1">
            {/* Gen1 Left (140,175) to Gen2 Outer Left (80,110) & Mid-Left (160,110) */}
            <motion.line x1="140" y1="175" x2="80" y2="110" variants={drawStroke(1.2)} animate={isActive ? 'visible' : 'hidden'} />
            <motion.line x1="140" y1="175" x2="160" y2="110" variants={drawStroke(1.2)} animate={isActive ? 'visible' : 'hidden'} />
            
            {/* Gen1 Right (260,175) to Gen2 Mid-Right (240,110) & Outer Right (320,110) */}
            <motion.line x1="260" y1="175" x2="240" y2="110" variants={drawStroke(1.2)} animate={isActive ? 'visible' : 'hidden'} />
            <motion.line x1="260" y1="175" x2="320" y2="110" variants={drawStroke(1.2)} animate={isActive ? 'visible' : 'hidden'} />
          </g>

          {/* LINES — GEN 2 TO GEN 3 FRONTIER (amber #B69B75 at 60% opacity) */}
          <g stroke="#B69B75" strokeWidth="1" strokeOpacity="0.6">
            {/* Outer Left (80,110) -> Cloud (60,45) */}
            <motion.line x1="80" y1="110" x2="60" y2="45" variants={drawStroke(2.0)} animate={isActive ? 'visible' : 'hidden'} />
            
            {/* Mid-Left (160,110) -> Scale (130,45) & AI (200,45) */}
            <motion.line x1="160" y1="110" x2="130" y2="45" variants={drawStroke(2.0)} animate={isActive ? 'visible' : 'hidden'} />
            <motion.line x1="160" y1="110" x2="200" y2="45" variants={drawStroke(2.0)} animate={isActive ? 'visible' : 'hidden'} />
            
            {/* Mid-Right (240,110) -> AI (200,45) & RAG (270,45) */}
            <motion.line x1="240" y1="110" x2="200" y2="45" variants={drawStroke(2.0)} animate={isActive ? 'visible' : 'hidden'} />
            <motion.line x1="240" y1="110" x2="270" y2="45" variants={drawStroke(2.0)} animate={isActive ? 'visible' : 'hidden'} />
            
            {/* Outer Right (320,110) -> Auto (340,45) */}
            <motion.line x1="320" y1="110" x2="340" y2="45" variants={drawStroke(2.0)} animate={isActive ? 'visible' : 'hidden'} />
          </g>

          {/* ROOT NODE (amber filled, size 12px -> r=6px) */}
          <g transform="translate(200, 240)">
            <motion.circle 
              r="6" 
              fill="#B69B75" 
              variants={popIn(0)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4 }}
              style={{ transformOrigin: 'center' }}
            />
          </g>

          {/* GEN 1 NODES (outlined gray, size 8px -> r=4px) */}
          <g stroke="#C8C7C2" strokeWidth="1.5" fill="#FAF9F6">
            <motion.circle 
              cx="140" 
              cy="175" 
              r="4" 
              variants={popIn(1.1)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4, stroke: '#B69B75' }}
              style={{ transformOrigin: 'center' }}
            />
            <motion.circle 
              cx="260" 
              cy="175" 
              r="4" 
              variants={popIn(1.1)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4, stroke: '#B69B75' }}
              style={{ transformOrigin: 'center' }}
            />
          </g>

          {/* GEN 2 NODES (size 6.5px -> r=3.25px) */}
          {/* Outer nodes are outlined gray, Inner are outlined amber */}
          <g strokeWidth="1.2" fill="#FAF9F6">
            {/* Outer Left */}
            <motion.circle 
              cx="80" 
              cy="110" 
              r="3.25" 
              stroke="#C8C7C2" 
              variants={popIn(1.9)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4, stroke: '#B69B75' }}
              style={{ transformOrigin: 'center' }}
            />
            {/* LangChain (Inner Left) */}
            <motion.circle 
              cx="160" 
              cy="110" 
              r="3.25" 
              stroke="#B69B75" 
              variants={popIn(1.9)} 
              animate={isActive ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4, strokeWidth: 2 }}
              style={{ transformOrigin: 'center' }}
            />
            {/* OpenAI (Inner Right) */}
            <motion.circle 
              cx="240" 
              cy="110" 
              r="3.25" 
              stroke="#B69B75" 
              variants={popIn(1.9)} 
              animate={isActive ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4, strokeWidth: 2 }}
              style={{ transformOrigin: 'center' }}
            />
            {/* Outer Right */}
            <motion.circle 
              cx="320" 
              cy="110" 
              r="3.25" 
              stroke="#C8C7C2" 
              variants={popIn(1.9)} 
              animate={isActive ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4, stroke: '#B69B75' }}
              style={{ transformOrigin: 'center' }}
            />
          </g>

          {/* GEN 3 FRONTIER GLOWS (Center AI node at top gets two ambient glow rings) */}
          <g transform="translate(200, 45)">
            <motion.circle r="12" stroke="#B69B75" strokeWidth="0.8" fill="none" variants={pulseGlow(1.4)} animate={shouldAnimate ? 'visible' : 'hidden'} />
            <motion.circle r="18" stroke="#B69B75" strokeWidth="0.6" fill="none" variants={pulseGlow(1.8)} animate={shouldAnimate ? 'visible' : 'hidden'} />
          </g>

          {/* GEN 3 FRONTIER NODES (filled amber, pulsing, size 4.5px -> r=2.25px, center AI = 6.5px -> r=3.25px) */}
          <g fill="#B69B75" stroke="none">
            {/* Cloud */}
            <motion.circle 
              cx="60" 
              cy="45" 
              r="2.25" 
              variants={popIn(2.7)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4 }}
              style={{ transformOrigin: 'center' }}
            />
            {/* Scale */}
            <motion.circle 
              cx="130" 
              cy="45" 
              r="2.25" 
              variants={popIn(2.7)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4 }}
              style={{ transformOrigin: 'center' }}
            />
            {/* RAG */}
            <motion.circle 
              cx="270" 
              cy="45" 
              r="2.25" 
              variants={popIn(2.7)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4 }}
              style={{ transformOrigin: 'center' }}
            />
            {/* Auto */}
            <motion.circle 
              cx="340" 
              cy="45" 
              r="2.25" 
              variants={popIn(2.7)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4 }}
              style={{ transformOrigin: 'center' }}
            />

            {/* AI Center Top Node (Pulsing, size 6.5px) */}
            <motion.circle 
              cx="200" 
              cy="45" 
              r="3.25" 
              variants={popIn(2.7)} 
              animate={shouldAnimate ? 'visible' : 'hidden'} 
              whileHover={{ scale: 1.4 }}
              style={{ transformOrigin: 'center' }}
            />
          </g>

          {/* Frontier Node Opacity Pulsars (Overlay matching coordinates for active states) */}
          <g fill="#B69B75" opacity="0.7">
            {shouldAnimate && (
              <>
                <motion.circle cx="60" cy="45" r="3.5" variants={pulseOpacity} animate="visible" />
                <motion.circle cx="130" cy="45" r="3.5" variants={pulseOpacity} animate="visible" />
                <motion.circle cx="200" cy="45" r="5" variants={pulseOpacity} animate="visible" />
                <motion.circle cx="270" cy="45" r="3.5" variants={pulseOpacity} animate="visible" />
                <motion.circle cx="340" cy="45" r="3.5" variants={pulseOpacity} animate="visible" />
              </>
            )}
          </g>

          {/* LABELS (Mono labels aligned to nodes) */}
          <g fill="#6B6B6B" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.05em" textAnchor="middle">
            {/* Root */}
            <motion.text x="200" y="260" variants={popIn(0.2)} animate={isActive ? 'visible' : 'hidden'} fill="#B69B75" fontWeight="600">FOUNDATION</motion.text>
            
            {/* Gen 1 */}
            <motion.text x="140" y="193" variants={popIn(1.3)} animate={isActive ? 'visible' : 'hidden'}>.NET</motion.text>
            <motion.text x="260" y="193" variants={popIn(1.3)} animate={isActive ? 'visible' : 'hidden'}>AZURE</motion.text>

            {/* Gen 2 */}
            <motion.text x="160" y="125" variants={popIn(2.1)} animate={isActive ? 'visible' : 'hidden'} fill="#B69B75">LANGCHAIN</motion.text>
            <motion.text x="240" y="125" variants={popIn(2.1)} animate={isActive ? 'visible' : 'hidden'} fill="#B69B75">OPENAI</motion.text>

            {/* Gen 3 Frontier */}
            <motion.text x="60" y="32" variants={popIn(2.9)} animate={isActive ? 'visible' : 'hidden'}>CLOUD</motion.text>
            <motion.text x="130" y="32" variants={popIn(2.9)} animate={isActive ? 'visible' : 'hidden'}>SCALE</motion.text>
            <motion.text x="200" y="32" variants={popIn(2.9)} animate={isActive ? 'visible' : 'hidden'} fill="#B69B75" fontWeight="600">AI</motion.text>
            <motion.text x="270" y="32" variants={popIn(2.9)} animate={isActive ? 'visible' : 'hidden'}>RAG</motion.text>
            <motion.text x="340" y="32" variants={popIn(2.9)} animate={isActive ? 'visible' : 'hidden'}>AUTO</motion.text>
          </g>

        </svg>
    </motion.div>
  );
}
