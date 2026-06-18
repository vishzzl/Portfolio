'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHAT_WE_CAN_BUILD } from '../data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function WhatWeCanBuild() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(eyebrowRef, { once: true, margin: '-50px' });

  return (
    <section className="wwm-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={itemVariants}>
          <span
            ref={eyebrowRef}
            className={`wwm-eyebrow ${isInView ? 'is-visible' : ''}`}
          >
            Scope
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="wwm-h2"
          style={{ marginTop: 24, marginBottom: 48 }}
        >
          What we can build.
        </motion.h2>

        <div
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {WHAT_WE_CAN_BUILD.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="wwm-scope-row flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
              style={{
                padding: '24px 16px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <h3
                className="wwm-card-title md:flex-shrink-0"
                style={{ minWidth: 220 }}
              >
                {item.title}
              </h3>
              <p className="wwm-body" style={{ flex: 1 }}>
                → {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
