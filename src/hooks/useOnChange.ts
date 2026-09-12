import { useEffect, useRef } from 'react';
import { useStableCallback } from './useStableCallback';

export const useOnChange = <T>(value: T, callback: (current: T, previous: T) => void) => {
  const callbackRef = useStableCallback(callback);
  const previousRef = useRef(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousRef.current = value;
      return;
    }

    if (Object.is(previousRef.current, value)) return;

    const previous = previousRef.current;
    previousRef.current = value;
    callbackRef(value, previous);
  }, [callbackRef, value]);
};
