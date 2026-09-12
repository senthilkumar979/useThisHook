import { useCallback, useEffect, useRef, useState } from 'react';

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const item = window.localStorage.getItem(key);
    return item === null ? fallback : (JSON.parse(item) as T);
  } catch {
    return fallback;
  }
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  const [storedValue, setStoredValue] = useState<T>(() => readValue(key, initialValue));

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      setStoredValue((previous) => {
        const nextValue = value instanceof Function ? value(previous) : value;

        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore write errors (quota, private mode).
        }

        return nextValue;
      });
    },
    [key],
  );

  useEffect(() => {
    setStoredValue(readValue(key, initialValueRef.current));
  }, [key]);

  return [storedValue, setValue] as const;
};
