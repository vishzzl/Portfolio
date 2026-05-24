'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useLazyMount } from '@/hooks/useLazyMount';
import { usePortfolioUI } from '@/components/PortfolioUIProvider';

const Terminal = dynamic(() => import('@/components/Terminal'), {
  ssr: false,
  loading: () => <TerminalFallback />,
});

function TerminalFallback() {
  return (
    <div
      className="w-full max-w-lg h-[min(380px,70svh)] bg-[#0F0F0F] rounded-[10px] border border-[#222] shadow-2xl overflow-hidden"
      aria-hidden="true"
    >
      <div className="h-11 bg-[#161616] border-b border-[#222] flex items-center px-4">
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="h-2 w-3/4 bg-[#2a2a2a]" />
        <div className="h-2 w-2/3 bg-[#242424]" />
        <div className="h-2 w-5/6 bg-[#242424]" />
      </div>
    </div>
  );
}

export default function TerminalIsland() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldMount = useLazyMount(ref, '700px 0px');
  const { isLoading } = usePortfolioUI();

  return (
    <div ref={ref} className="w-full flex justify-center lg:justify-end">
      {shouldMount ? <Terminal isActive={!isLoading} /> : <TerminalFallback />}
    </div>
  );
}
