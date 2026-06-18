'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHO_THIS_IS_FOR } from '../data';

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

export default function WhoThisIsFor() {
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
            Fit
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="wwm-h2"
          style={{ marginTop: 24, marginBottom: 48 }}
        >
          Who this is for.
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {WHO_THIS_IS_FOR.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="glass-card glass-card-lift"
              style={{ padding: 32 }}
            >
              <h3 className="wwm-card-title">{item.title}</h3>
              <p className="wwm-body" style={{ marginTop: 12 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
