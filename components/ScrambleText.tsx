'use client';

import React, { useState, useEffect } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-/<>[]{}';

interface ScrambleTextProps {
  text: string;
  delay: number; // Delay in seconds before starting the scramble animation
  duration?: number; // Total duration of the scramble in seconds
}

export default function ScrambleText({ text, delay, duration = 0.8 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Reveal text start after the initial staggered word delay
    const startTimeout = setTimeout(() => {
      setIsRevealed(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isRevealed) return;

    let frame = 0;
    const fps = 18; // Lower frame rate for character updates to make it feel calm and deliberate
    const totalFrames = Math.floor(duration * fps);
    const interval = 1000 / fps;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '.') return char;

          // Settle characters progressively from left to right
          const charThreshold = index / text.length;
          if (progress >= charThreshold) {
            return char;
          }

          // Otherwise return random characters for the cycling effect
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isRevealed, text, duration]);

  // Render non-breaking spaces before activation to avoid CLS (Cumulative Layout Shift)
  return <span>{displayText || (isRevealed ? '' : text.replace(/./g, '\u00A0'))}</span>;
}
