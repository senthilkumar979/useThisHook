import { useEffect, useState } from 'react';

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

export const useKeyPress = (key: string) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      if (event.key === key) setIsPressed(true);
    };

    const handleUp = (event: KeyboardEvent) => {
      if (event.key === key) setIsPressed(false);
    };

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);

    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [key]);

  return isPressed;
};
