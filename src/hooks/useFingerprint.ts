import { useCallback, useEffect, useRef, useState } from 'react';
import { collectFingerprint, type FingerprintComponents } from './fingerprintCollect';

export interface UseFingerprintOptions {
  /** When false, skip automatic identification. Default true. */
  enabled?: boolean;
}

export interface UseFingerprintReturn {
  visitorId: string | null;
  components: FingerprintComponents | null;
  isPending: boolean;
  error: Error | null;
  refresh: () => Promise<string | null>;
}

export type { FingerprintComponents };

export const useFingerprint = (options: UseFingerprintOptions = {}): UseFingerprintReturn => {
  const enabled = options.enabled ?? true;
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [components, setComponents] = useState<FingerprintComponents | null>(null);
  const [isPending, setIsPending] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);
  const runIdRef = useRef(0);

  const refresh = useCallback(async () => {
    if (typeof window === 'undefined') return null;

    const runId = ++runIdRef.current;
    setIsPending(true);
    setError(null);

    try {
      // Yield so canvas / WebGL work does not block the current frame.
      await Promise.resolve();
      const result = collectFingerprint();
      if (runId !== runIdRef.current) return result.visitorId;

      setVisitorId(result.visitorId);
      setComponents(result.components);
      setIsPending(false);
      return result.visitorId;
    } catch (error_) {
      if (runId !== runIdRef.current) return null;
      const nextError = error_ instanceof Error ? error_ : new Error(String(error_));
      setError(nextError);
      setIsPending(false);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsPending(false);
      return;
    }

    void refresh();

    return () => {
      runIdRef.current += 1;
    };
  }, [enabled, refresh]);

  return { visitorId, components, isPending, error, refresh };
};
