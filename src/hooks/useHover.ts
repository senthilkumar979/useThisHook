import { useEffect, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    node.addEventListener('pointerenter', handleEnter);
    node.addEventListener('pointerleave', handleLeave);

    return () => {
      node.removeEventListener('pointerenter', handleEnter);
      node.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return { ref, isHovered } as const;
};
