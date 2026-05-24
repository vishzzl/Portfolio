'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ResumeFormat } from '@/lib/portfolio-data';

type CvDownloadState = 'idle' | 'generating' | 'downloading' | 'complete';
type EmailCopyState = 'idle' | 'copied';

interface LenisController {
  stop: () => void;
  start: () => void;
}

interface PortfolioUIContextValue {
  isLoading: boolean;
  selectedProject: number | null;
  selectedService: number | null;
  cvDownloadState: CvDownloadState;
  emailCopyState: EmailCopyState;
  resumeFormat: ResumeFormat;
  isNavbarFormatOpen: boolean;
  isContactFormatOpen: boolean;
  completeLoading: () => void;
  openProject: (index: number) => void;
  openService: (index: number) => void;
  closeModals: () => void;
  setNavbarFormatOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  setContactFormatOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  triggerCvDownload: (format?: ResumeFormat) => Promise<void>;
  triggerEmailCopy: () => Promise<void>;
  scrollToSection: (id: string) => void;
}

const PortfolioUIContext = createContext<PortfolioUIContextValue | null>(null);

function getLenisController() {
  const anyWindow = window as unknown as { lenis?: LenisController };
  return anyWindow.lenis;
}

function downloadUrl(href: string, filename: string) {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function PortfolioUIProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [cvDownloadState, setCvDownloadState] = useState<CvDownloadState>('idle');
  const [emailCopyState, setEmailCopyState] = useState<EmailCopyState>('idle');
  const [resumeFormat, setResumeFormat] = useState<ResumeFormat>('pdf');
  const [isNavbarFormatOpen, setIsNavbarFormatOpen] = useState(false);
  const [isContactFormatOpen, setIsContactFormatOpen] = useState(false);
  const resetCvTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetEmailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const openProject = useCallback((index: number) => {
    setSelectedProject(index);
  }, []);

  const openService = useCallback((index: number) => {
    setSelectedService(index);
  }, []);

  const closeModals = useCallback(() => {
    setSelectedProject(null);
    setSelectedService(null);
  }, []);

  const setNavbarFormatOpen = useCallback((open: boolean | ((value: boolean) => boolean)) => {
    setIsNavbarFormatOpen(open);
    setIsContactFormatOpen(false);
  }, []);

  const setContactFormatOpen = useCallback((open: boolean | ((value: boolean) => boolean)) => {
    setIsContactFormatOpen(open);
    setIsNavbarFormatOpen(false);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const triggerCvDownload = useCallback(
    async (format: ResumeFormat = resumeFormat) => {
      if (cvDownloadState !== 'idle') return;

      if (resetCvTimer.current) {
        clearTimeout(resetCvTimer.current);
      }

      try {
        setCvDownloadState('generating');
        setResumeFormat(format);
        await new Promise((resolve) => setTimeout(resolve, 220));
        setCvDownloadState('downloading');

        if (format === 'pdf') {
          downloadUrl('/vishal_resume.pdf', 'Vishal_Resume.pdf');
        } else {
          const apiUrl = `https://resume-alter.vercel.app/api/resume?userId=1&token=7ad8c8488d2fea3c&format=${format}`;
          const response = await fetch(apiUrl);

          if (!response.ok) throw new Error('Failed to download resume');

          const blob = await response.blob();
          const href = URL.createObjectURL(blob);
          downloadUrl(href, `Vishal_Resume.${format}`);
          URL.revokeObjectURL(href);
        }

        setCvDownloadState('complete');
      } catch (error) {
        console.error('Resume download error:', error);
        setCvDownloadState('idle');
        return;
      }

      resetCvTimer.current = setTimeout(() => {
        setCvDownloadState('idle');
      }, 1800);
    },
    [cvDownloadState, resumeFormat],
  );

  const triggerEmailCopy = useCallback(async () => {
    if (emailCopyState !== 'idle') return;

    if (resetEmailTimer.current) {
      clearTimeout(resetEmailTimer.current);
    }

    try {
      await navigator.clipboard.writeText('2vishalvishwakarma@gmail.com');
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = '2vishalvishwakarma@gmail.com';
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      document.body.removeChild(fallback);
    }

    setEmailCopyState('copied');
    resetEmailTimer.current = setTimeout(() => {
      setEmailCopyState('idle');
    }, 1800);
  }, [emailCopyState]);

  useEffect(() => {
    const isLocked = isLoading || selectedProject !== null || selectedService !== null;
    const lenis = getLenisController();

    document.body.style.overflow = isLocked ? 'hidden' : '';
    document.documentElement.style.overflow = isLocked ? 'hidden' : '';

    if (isLocked) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoading, selectedProject, selectedService]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModals();
        setIsNavbarFormatOpen(false);
        setIsContactFormatOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModals]);

  useEffect(() => {
    return () => {
      if (resetCvTimer.current) clearTimeout(resetCvTimer.current);
      if (resetEmailTimer.current) clearTimeout(resetEmailTimer.current);
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      selectedProject,
      selectedService,
      cvDownloadState,
      emailCopyState,
      resumeFormat,
      isNavbarFormatOpen,
      isContactFormatOpen,
      completeLoading,
      openProject,
      openService,
      closeModals,
      setNavbarFormatOpen,
      setContactFormatOpen,
      triggerCvDownload,
      triggerEmailCopy,
      scrollToSection,
    }),
    [
      closeModals,
      completeLoading,
      cvDownloadState,
      emailCopyState,
      isContactFormatOpen,
      isLoading,
      isNavbarFormatOpen,
      openProject,
      openService,
      resumeFormat,
      scrollToSection,
      selectedProject,
      selectedService,
      setContactFormatOpen,
      setNavbarFormatOpen,
      triggerCvDownload,
      triggerEmailCopy,
    ],
  );

  return <PortfolioUIContext.Provider value={value}>{children}</PortfolioUIContext.Provider>;
}

export function usePortfolioUI() {
  const context = useContext(PortfolioUIContext);

  if (!context) {
    throw new Error('usePortfolioUI must be used inside PortfolioUIProvider');
  }

  return context;
}
