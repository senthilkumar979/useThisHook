import { useCallback, useEffect, useState } from 'react';

export interface ElementSize {
  width: number;
  height: number;
}

export const useElementSize = <T extends HTMLElement = HTMLElement>() => {
  const [node, setNode] = useState<T | null>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return { ref, width: size.width, height: size.height } as const;
};
