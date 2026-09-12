import { useCallback, useRef } from 'react';

export const useStableCallback = <T extends (...args: never[]) => unknown>(fn: T): T => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const stable = useCallback((...args: never[]) => fnRef.current(...args), []);
  return stable as T;
};
