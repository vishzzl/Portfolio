'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FORM_FIELDS, type FormFieldDef } from '../data';

/* ── Animation variants ──────────────────────────────────────── */

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

/* ── Magnetic Button ─────────────────────────────────────────── */

function MagneticButton({
  children,
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  disabled?: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouchDevice || !btnRef.current) return;

      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 60) {
        setOffset({ x: dx * 0.3, y: dy * 0.3 });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    },
    [isTouchDevice],
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled}
      className="glass-btn glass-btn-primary"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ minWidth: '240px' }}
    >
      {children}
    </motion.button>
  );
}

/* ── Form Field ──────────────────────────────────────────────── */

function FormField({
  field,
  value,
  onChange,
}: {
  field: FormFieldDef;
  value: string;
  onChange: (val: string) => void;
}) {
  const hasValue = value !== '';

  if (field.type === 'textarea') {
    return (
      <div className="wwm-field-wrap wwm-field-wrap--textarea col-span-full">
        <textarea
          id={field.id}
          className="wwm-field-textarea"
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
        <label htmlFor={field.id} className="wwm-field-label">
          {field.label}
        </label>
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div
        className={`wwm-field-wrap ${hasValue ? 'wwm-field-wrap--has-value' : ''}`}
      >
        <select
          id={field.id}
          className="wwm-field-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{/* empty default */}</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <label htmlFor={field.id} className="wwm-field-label">
          {field.label}
        </label>
      </div>
    );
  }

  // Default: text input
  return (
    <div className="wwm-field-wrap">
      <input
        id={field.id}
        type="text"
        className="wwm-field-input"
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={field.id} className="wwm-field-label">
        {field.label}
      </label>
    </div>
  );
}

/* ── ContactForm Section ─────────────────────────────────────── */

export default function ContactForm() {
  const eyebrowRef = useRef(null);
  const eyebrowInView = useInView(eyebrowRef, { once: true, margin: '-50px' });

  // Form state
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    Object.fromEntries(FORM_FIELDS.map((f) => [f.id, ''])),
  );
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback((id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setSubmitted(true);
    },
    [formData],
  );

  // Separate fields by type for grid layout
  const textAndSelectFields = FORM_FIELDS.filter((f) => f.type !== 'textarea');
  const textareaFields = FORM_FIELDS.filter((f) => f.type === 'textarea');

  return (
    <section>
      <motion.div
        className="wwm-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={itemVariants} className="mb-10">
          <span
            ref={eyebrowRef}
            className={`wwm-eyebrow ${eyebrowInView ? 'is-visible' : ''}`}
          >
            Let&apos;s Talk
          </span>
          <h2 className="wwm-h2 mt-4">Start a conversation.</h2>
          <p className="wwm-body mt-3" style={{ maxWidth: '520px' }}>
            No pressure. A rough idea is enough to get started.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            variants={itemVariants}
            className="glass-card"
            style={{ padding: 'clamp(32px, 4vw, 48px)', textAlign: 'center' }}
          >
            <div className="flex flex-col items-center gap-3">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                style={{ color: '#22C55E' }}
              >
                <circle
                  cx="20"
                  cy="20"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 20L18 26L28 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="wwm-card-title">Message received.</h3>
              <p className="wwm-body">
                I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Grid for text/select fields: 2-col desktop, 1-col mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {textAndSelectFields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={(val) => updateField(field.id, val)}
                />
              ))}
            </div>

            {/* Textarea fields — full width */}
            {textareaFields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={(val) => updateField(field.id, val)}
              />
            ))}

            {/* Submit button */}
            <div className="mt-4 flex justify-start">
              <MagneticButton type="submit">
                Tell me about your idea
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}
