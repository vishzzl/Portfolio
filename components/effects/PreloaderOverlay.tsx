'use client';

import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';

export default function PreloaderOverlay() {
  const { isLoading, completeLoading } = usePortfolioUI();

  return (
    <AnimatePresence mode="wait">
      {isLoading && <Preloader onComplete={completeLoading} />}
    </AnimatePresence>
  );
}
