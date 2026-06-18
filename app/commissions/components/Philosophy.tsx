'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

export default function Philosophy() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(eyebrowRef, { once: true, margin: '-50px' });

  return (
    <section className="wwm-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{ maxWidth: 640 }}
      >
        <motion.div variants={itemVariants}>
          <span
            ref={eyebrowRef}
            className={`wwm-eyebrow ${isInView ? 'is-visible' : ''}`}
          >
            Philosophy
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="wwm-h2"
          style={{ marginTop: 24 }}
        >
          How I like to work.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="wwm-body"
          style={{ marginTop: 32 }}
        >
          I prefer working directly with the person who owns the problem. No
          long chains. No weekly status decks. Just clear communication and
          steady progress.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="wwm-body"
          style={{ marginTop: 20 }}
        >
          I like to keep things simple on purpose. Not because complex is
          hard&nbsp;— because simple is better. Every decision should make the
          product easier to use, not harder to explain.
        </motion.p>
      </motion.div>
    </section>
  );
}
