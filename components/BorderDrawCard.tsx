import React from 'react';

interface BorderDrawCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BorderDrawCard({ children, className = '' }: BorderDrawCardProps) {
  return (
    <div className={`relative draw-border-container overflow-hidden bg-brand-bg transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}
