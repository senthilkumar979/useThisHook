import { useCallback, useState } from 'react';

export const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((previous) => previous + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount((previous) => previous - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset, setCount } as const;
};
