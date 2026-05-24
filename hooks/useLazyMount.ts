'use client';

import { RefObject, useEffect, useState } from 'react';

export function useLazyMount<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = '600px 0px',
  defaultValue = false,
) {
  const [shouldMount, setShouldMount] = useState(defaultValue);

  useEffect(() => {
    if (shouldMount) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin, shouldMount]);

  return shouldMount;
}
