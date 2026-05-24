'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useLazyMount } from '@/hooks/useLazyMount';

const CareerTimeline = dynamic(() => import('@/components/CareerTimeline'), {
  ssr: false,
  loading: () => <CareerTimelineFallback />,
});

function CareerTimelineFallback() {
  return (
    <section className="relative w-full min-h-[46rem] md:min-h-[400vh] border-b border-brand-divider bg-[#FAF9F6]">
      <div className="sticky top-0 min-h-screen flex flex-col justify-center px-[var(--container-inline)]">
        <div className="w-full max-w-7xl mx-auto border border-brand-divider bg-[#FAF9F6] p-6 sm:p-8">
          <div className="flex items-baseline justify-between border-b border-brand-divider pb-3 mb-8">
            <span className="font-mono text-[10px] text-brand-muted tracking-widest">
              01-B // PROFESSIONAL MILESTONES
            </span>
            <span className="font-serif text-lg italic text-brand-dark">Evolution of Impact</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['2025', '2023', '2022', '2021'].map((year) => (
              <div key={year} className="h-28 border border-brand-divider bg-[#F2F1EC]/50 p-4">
                <span className="font-serif text-3xl text-brand-accent">{year}</span>
                <div className="mt-5 h-1 w-16 bg-brand-divider" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CareerTimelineIsland() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldMount = useLazyMount(ref, '900px 0px');

  return (
    <div ref={ref}>
      {shouldMount ? <CareerTimeline /> : <CareerTimelineFallback />}
    </div>
  );
}
