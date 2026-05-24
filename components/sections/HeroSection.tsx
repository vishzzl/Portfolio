'use client';

import React, { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import FloatingChip from '@/components/FloatingChip';
import ScaleNetwork from '@/components/ScaleNetwork';
import ScrambleText from '@/components/ScrambleText';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function HeroSection() {
  const { isLoading, scrollToSection } = usePortfolioUI();
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useMediaQuery('(min-width: 768px) and (pointer: fine)');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseSpringX = useSpring(mouseX, { damping: 32, stiffness: 80 });
  const mouseSpringY = useSpring(mouseY, { damping: 32, stiffness: 80 });

  useEffect(() => {
    if (!hasFinePointer || shouldReduceMotion) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      nextX = event.clientX / window.innerWidth - 0.5;
      nextY = event.clientY / window.innerHeight - 0.5;

      if (frame) return;

      frame = requestAnimationFrame(() => {
        mouseX.set(nextX);
        mouseY.set(nextY);
        frame = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hasFinePointer, mouseX, mouseY, shouldReduceMotion]);

  const wordRevealVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '130%' },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 1.05,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: shouldReduceMotion ? 0 : custom * 0.13,
      },
    }),
  };

  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: 'easeOut' as const,
        delay: shouldReduceMotion ? 0 : 1.45,
      },
    },
  };

  const chipsEnabled = hasFinePointer && !isLoading && !shouldReduceMotion;

  return (
    <section
      id="hero"
      className="min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] flex flex-col justify-between py-[clamp(2rem,6vw,5rem)] border-b border-brand-divider scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1 my-auto py-5 sm:py-8">
        <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
          <h1 className="font-serif text-[clamp(3.35rem,17vw,10.5rem)] leading-[0.94] tracking-tight text-brand-dark select-none mb-[clamp(2rem,6vw,2.75rem)] text-balance">
            <div className="block h-fit py-0.5">
              <span className="clip-reveal inline-block h-fit mr-3 sm:mr-5">
                <motion.span
                  custom={0}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={isLoading ? 'hidden' : 'visible'}
                  className="inline-block origin-bottom"
                >
                  I
                </motion.span>
              </span>
              <span className="clip-reveal inline-block h-fit">
                <motion.span
                  custom={1}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={isLoading ? 'hidden' : 'visible'}
                  className="inline-block origin-bottom"
                >
                  design
                </motion.span>
              </span>
            </div>

            <div className="block h-fit py-0.5">
              <span className="clip-reveal inline-block h-fit">
                <motion.span
                  custom={2}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={isLoading ? 'hidden' : 'visible'}
                  className="inline-block origin-bottom italic font-light pr-3 sm:pr-4 text-brand-accent"
                >
                  systems
                </motion.span>
              </span>
            </div>

            <div className="block h-fit py-0.5">
              <span className="clip-reveal inline-block h-fit mr-3 sm:mr-5">
                <motion.span
                  custom={3}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={isLoading ? 'hidden' : 'visible'}
                  className="inline-block origin-bottom"
                >
                  that
                </motion.span>
              </span>
              <span className="clip-reveal inline-block h-fit">
                <motion.span
                  custom={4}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={isLoading ? 'hidden' : 'visible'}
                  className="inline-block origin-bottom"
                >
                  {!isLoading && (
                    <ScrambleText text="scale." delay={0.52} duration={shouldReduceMotion ? 0.01 : 1.8} />
                  )}
                </motion.span>
              </span>
            </div>
          </h1>

          <motion.div
            variants={taglineVariants}
            initial="hidden"
            animate={isLoading ? 'hidden' : 'visible'}
            className="max-w-xl text-brand-muted flex items-start gap-3 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            <div className="mt-2.5 flex-shrink-0" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-dot-pulse" />
            </div>
            <p className="font-sans">
              Independent engineer building scalable cloud-native platforms, intelligent AI
              workflows, and enterprise-grade digital experiences.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full relative min-w-0">
          <ScaleNetwork isActive={!isLoading} />
          {chipsEnabled && (
            <>
              <FloatingChip label="5+ Yrs Exp" explanation="Over 5 years of professional software engineering experience across scale environments." className="top-[25%] left-[-10%]" factor={30} x={mouseSpringX} y={mouseSpringY} />
              <FloatingChip label="40+ Delivered" explanation="Successfully built and deployed more than 40 web platforms and AI automation tools." className="bottom-[28%] left-[-12%]" factor={-25} x={mouseSpringX} y={mouseSpringY} />
              <FloatingChip label="0 Incidents" explanation="Maintained 99.99% system availability with zero critical runtime downtime incidents." className="top-[25%] right-[-8%]" factor={45} x={mouseSpringX} y={mouseSpringY} />
              <FloatingChip label="Full Stack" explanation="Expertise in both client-side interfaces and scalable service-oriented backend architectures." className="bottom-[28%] right-[-8%]" factor={-20} x={mouseSpringX} y={mouseSpringY} />
              <FloatingChip label="AI Architect" explanation="Designing and orchestrating complex multi-agent LLM systems and secure RAG integrations." className="top-[-10%] left-[30%]" factor={50} x={mouseSpringX} y={mouseSpringY} />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-brand-muted text-xs tracking-widest uppercase">
        <div>{"// FULL STACK + AI ARCHITECT"}</div>
        <a
          href="#about"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('about');
          }}
          className="flex min-h-11 items-center gap-2 hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
        >
          <span>Scroll</span>
          <motion.span
            animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <ArrowDown size={14} />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
