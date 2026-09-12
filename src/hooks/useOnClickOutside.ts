import { type RefObject, useEffect } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);
};
