import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className="border-t border-brand-divider py-10 sm:py-12 flex flex-col md:flex-row justify-between items-center gap-5 text-brand-muted text-xs tracking-widest uppercase">
      <div className="text-center md:text-left">
        Vishal © 2025 · Full Stack + AI Engineer
      </div>
      <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 justify-center">
        <Link
          href="/commissions"
          className="inline-flex min-h-11 items-center gap-1 hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
        >
          <span>Commissions</span>
        </Link>
        <a
          href="https://www.linkedin.com/in/vishzzl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
        >
          <Linkedin size={12} aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/vishzzl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
        >
          <Github size={12} aria-hidden="true" />
          <span>GitHub</span>
        </a>
        <a
          href="mailto:2vishalvishwakarma@gmail.com"
          className="inline-flex min-h-11 items-center gap-1 hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
        >
          <Mail size={12} aria-hidden="true" />
          <span>Email</span>
        </a>
        <a
          href="tel:+919353802971"
          className="inline-flex min-h-11 items-center gap-1 hover:text-brand-dark transition-colors duration-300 focus-visible-ring"
        >
          <Phone size={12} aria-hidden="true" />
          <span>Phone</span>
        </a>
      </div>
    </footer>
  );
}
