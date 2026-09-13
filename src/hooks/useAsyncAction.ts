import { useCallback, useRef, useState } from 'react';
import { useStableCallback } from './useStableCallback';

export const useAsyncAction = <TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<TResult | undefined>(undefined);
  const runIdRef = useRef(0);
  const stableAction = useStableCallback(action);

  const run = useCallback(
    async (...args: TArgs) => {
      const runId = ++runIdRef.current;
      setIsPending(true);
      setError(null);

      try {
        const result = await stableAction(...args);
        if (runId !== runIdRef.current) return result;
        setData(result);
        setIsPending(false);
        return result;
      } catch (error_) {
        if (runId !== runIdRef.current) throw error_;
        setError(error_);
        setIsPending(false);
        throw error_;
      }
    },
    [stableAction],
  );

  const reset = useCallback(() => {
    runIdRef.current += 1;
    setIsPending(false);
    setError(null);
    setData(undefined);
  }, []);

  return { run, isPending, error, data, reset } as const;
};
