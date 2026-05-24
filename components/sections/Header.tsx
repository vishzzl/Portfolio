'use client';

import React, { useState } from 'react';
import { Download, Menu, MessageSquare, X } from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';
import { NAV_ITEMS, type ResumeFormat } from '@/lib/portfolio-data';

const RESUME_OPTIONS: { label: string; format: ResumeFormat }[] = [
  { label: 'PDF', format: 'pdf' },
  { label: 'Word', format: 'docx' },
];

export default function Header() {
  const {
    isNavbarFormatOpen,
    setNavbarFormatOpen,
    triggerCvDownload,
    scrollToSection,
  } = usePortfolioUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  const handleResume = async (format: ResumeFormat) => {
    setNavbarFormatOpen(false);
    setIsMenuOpen(false);
    await triggerCvDownload(format);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-40 border-b border-brand-divider/40 bg-brand-bg/80 backdrop-blur-md transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-[var(--container-inline)] min-h-16 md:min-h-20 flex items-center justify-between gap-3">
        <a
          href="#hero"
          onClick={(event) => handleNav(event, 'hero')}
          className="interactive-cursor-target font-serif text-2xl font-bold tracking-tight text-brand-dark hover:text-brand-accent transition-colors duration-300 focus-visible-ring"
        >
          Vishal
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleNav(event, item.id)}
              className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 relative">
          <Magnetic range={60} strength={0.3}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setNavbarFormatOpen((value) => !value)}
                className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-5 py-3 hover:bg-brand-dark hover:text-brand-bg transition-colors duration-300 focus-visible-ring"
                aria-expanded={isNavbarFormatOpen}
                aria-controls="navbar-resume-menu"
              >
                <Download size={14} aria-hidden="true" />
                <span>Resume</span>
              </button>

              {isNavbarFormatOpen && (
                <div
                  id="navbar-resume-menu"
                  className="absolute right-0 mt-3 w-44 border border-brand-divider/70 bg-brand-bg shadow-[0_24px_64px_rgba(0,0,0,0.12)] overflow-hidden"
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

          <Magnetic range={60} strength={0.3}>
            <a
              href="https://wa.me/919353802971?text=Hi%20Vishal,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project/role."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-widest text-brand-dark border border-brand-dark px-5 py-3 hover:bg-[#25D366] hover:border-[#25D366] hover:text-[#FAF9F6] transition-colors duration-300 focus-visible-ring"
            >
              <MessageSquare size={14} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center border border-brand-divider text-brand-dark hover:border-brand-dark focus-visible-ring"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-brand-divider/60 bg-brand-bg px-[var(--container-inline)] py-4">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNav(event, item.id)}
                className="min-h-11 border border-brand-divider px-3 py-3 text-center text-[11px] uppercase tracking-widest text-brand-muted hover:border-brand-dark hover:text-brand-dark focus-visible-ring"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {RESUME_OPTIONS.map((option) => (
              <button
                key={option.format}
                type="button"
                onClick={() => handleResume(option.format)}
                className="min-h-11 border border-brand-dark px-3 py-3 text-[11px] uppercase tracking-widest text-brand-dark focus-visible-ring"
              >
                Resume {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
