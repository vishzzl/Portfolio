'use client';

import { Check, Copy, Download, MessageSquare, Phone } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';
import type { ResumeFormat } from '@/lib/portfolio-data';

const RESUME_OPTIONS: { label: string; format: ResumeFormat }[] = [
  { label: 'PDF', format: 'pdf' },
  { label: 'Word', format: 'docx' },
];

export default function ContactSection() {
  const {
    emailCopyState,
    isContactFormatOpen,
    setContactFormatOpen,
    triggerCvDownload,
    triggerEmailCopy,
  } = usePortfolioUI();

  const handleResume = async (format: ResumeFormat) => {
    setContactFormatOpen(false);
    await triggerCvDownload(format);
  };

  return (
    <section id="contact" className="py-[clamp(6rem,16vw,12rem)] flex flex-col items-center text-center scroll-mt-24">
      <span className="font-mono text-xs text-brand-accent tracking-widest uppercase block mb-4">
        {"// AVAILABLE FOR SELECT CONTRACTS"}
      </span>
      <h2 className="font-serif text-[clamp(2.7rem,13vw,7rem)] text-brand-dark mb-6 max-w-4xl tracking-tight leading-[1.02] select-none text-balance">
        Let&apos;s build something <span className="italic font-light">remarkable</span>.
      </h2>
      <p className="text-brand-muted max-w-xl text-sm sm:text-base leading-relaxed mb-10 sm:mb-12">
        Available for select contracts, long-term engagements, and advisory roles. If you&apos;re
        working on something ambitious - let&apos;s talk.
      </p>

      <div className="w-full flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
        <Magnetic range={40} strength={0.3}>
          <a
            href="https://wa.me/919353802971?text=Hi%20Vishal,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project/role."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-3 text-xs uppercase tracking-widest text-brand-bg bg-brand-dark px-6 sm:px-8 py-4 hover:bg-[#25D366] hover:text-[#FAF9F6] transition-colors duration-300 shadow-sm focus-visible-ring"
          >
            <MessageSquare size={16} aria-hidden="true" />
            <span>WhatsApp Vishal</span>
          </a>
        </Magnetic>

        <Magnetic range={40} strength={0.3}>
          <div className="relative w-full sm:w-auto sm:min-w-52">
            <button
              type="button"
              onClick={() => setContactFormatOpen((value) => !value)}
              className="inline-flex w-full min-h-12 items-center justify-center gap-3 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-6 sm:px-8 py-4 hover:bg-brand-dark hover:text-brand-bg transition-all duration-300 focus-visible-ring"
              aria-expanded={isContactFormatOpen}
              aria-controls="contact-resume-menu"
            >
              <Download size={16} aria-hidden="true" />
              <span>Resume</span>
            </button>

            {isContactFormatOpen && (
              <div
                id="contact-resume-menu"
                className="absolute left-0 right-0 mt-3 border border-brand-divider/70 bg-brand-bg shadow-[0_24px_64px_rgba(0,0,0,0.12)] overflow-hidden z-20"
              >
                {RESUME_OPTIONS.map((option) => (
                  <button
                    key={option.format}
                    type="button"
                    onClick={() => handleResume(option.format)}
                    className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-brand-dark hover:bg-brand-divider/25 transition-colors duration-200 focus-visible-ring"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Magnetic>

        <Magnetic range={40} strength={0.3}>
          <button
            type="button"
            onClick={triggerEmailCopy}
            className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-3 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-6 sm:px-8 py-4 hover:bg-brand-dark hover:text-brand-bg transition-all duration-300 focus-visible-ring"
          >
            {emailCopyState === 'copied' ? (
              <>
                <Check size={16} className="text-[#5DB075]" aria-hidden="true" />
                <span className="text-[#5DB075]">Email Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} aria-hidden="true" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </Magnetic>

        <Magnetic range={40} strength={0.3}>
          <a
            href="tel:+919353802971"
            className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-3 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-6 sm:px-8 py-4 hover:bg-brand-dark hover:text-brand-bg transition-colors duration-300 focus-visible-ring"
          >
            <Phone size={16} aria-hidden="true" />
            <span>Call Vishal</span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
