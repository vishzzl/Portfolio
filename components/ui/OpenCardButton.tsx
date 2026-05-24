'use client';

import React from 'react';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';

interface OpenCardButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectOpenButton({
  projectIndex,
  children,
  className = '',
}: OpenCardButtonProps & { projectIndex: number }) {
  const { openProject } = usePortfolioUI();

  return (
    <button
      type="button"
      onClick={() => openProject(projectIndex)}
      aria-haspopup="dialog"
      className={`block w-full h-full text-left focus-visible-ring ${className}`}
    >
      {children}
    </button>
  );
}

export function ServiceOpenButton({
  serviceIndex,
  children,
  className = '',
}: OpenCardButtonProps & { serviceIndex: number }) {
  const { openService } = usePortfolioUI();

  return (
    <button
      type="button"
      onClick={() => openService(serviceIndex)}
      aria-haspopup="dialog"
      className={`block w-full h-full text-left focus-visible-ring ${className}`}
    >
      {children}
    </button>
  );
}
