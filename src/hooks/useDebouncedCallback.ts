import { useCallback, useEffect, useRef } from 'react';
import { useStableCallback } from './useStableCallback';

export const useDebouncedCallback = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
) => {
  const stableCallback = useStableCallback(callback);
  const timeoutRef = useRef(0);

  const cancel = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  const run = useCallback(
    (...args: TArgs) => {
      cancel();
      timeoutRef.current = window.setTimeout(() => {
        stableCallback(...args);
      }, delayMs);
    },
    [cancel, delayMs, stableCallback],
  );

  useEffect(() => cancel, [cancel]);

  return [run, cancel] as const;
};
