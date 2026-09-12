import { useState } from 'react';
import { useEventListener } from 'usethishook';

export const UseEventListenerDemo = () => {
  const [last, setLast] = useState('none');
  useEventListener(typeof window === 'undefined' ? null : window, 'resize', () => {
    setLast(`resize ${window.innerWidth}×${window.innerHeight}`);
  });

  return <p>Last window event: {last}. Resize the window.</p>;
};

export const useEventListenerExample = `import { useEventListener } from 'usethishook';

export const ResizeNote = () => {
  useEventListener(window, 'resize', () => {
    console.log(window.innerWidth);
  });
  return null;
};`;
