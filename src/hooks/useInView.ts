import { useCallback, useEffect, useState } from 'react';

export interface InViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export const useInView = <T extends Element = Element>(options: InViewOptions = {}) => {
  const { root = null, rootMargin = '0px', threshold = 0, once = false } = options;
  const [node, setNode] = useState<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setIsInView(false);
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, root, rootMargin, threshold]);

  return { ref, isInView } as const;
};
