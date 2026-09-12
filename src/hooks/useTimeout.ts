import { useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delayMs: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null || typeof window === 'undefined') return;

    const timeoutId = window.setTimeout(() => {
      savedCallback.current();
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delayMs]);
};
