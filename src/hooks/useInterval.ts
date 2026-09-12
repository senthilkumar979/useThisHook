import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delayMs: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) return;

    const intervalId = window.setInterval(() => {
      savedCallback.current();
    }, delayMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [delayMs]);
};
