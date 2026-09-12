import { useEffect, useRef, type RefObject } from 'react';

export type EventListenerTarget =
  Window | Document | EventTarget | RefObject<EventTarget | null> | null;

function resolveTarget(target: EventListenerTarget): EventTarget | null {
  if (target == null) return null;
  if (typeof target === 'object' && 'current' in target) return target.current;
  return target;
}

export const useEventListener = (
  target: EventListenerTarget,
  type: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const element = resolveTarget(target);

  useEffect(() => {
    if (typeof window === 'undefined' || !element) return;

    const listener = (event: Event) => {
      handlerRef.current(event);
    };

    element.addEventListener(type, listener, options);
    return () => {
      element.removeEventListener(type, listener, options);
    };
  }, [element, options, type]);
};
