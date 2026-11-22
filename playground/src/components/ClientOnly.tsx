import { useEffect, useState, type ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Renders `fallback` on the server and the first client paint, then `children`. */
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return fallback;
  return children;
};
