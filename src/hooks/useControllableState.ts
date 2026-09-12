import { type SetStateAction, useCallback, useState } from 'react';

export interface ControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>) => {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const setValue = useCallback(
    (update: SetStateAction<T>) => {
      const next = typeof update === 'function' ? (update as (previous: T) => T)(current) : update;
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [current, isControlled, onChange],
  );

  return [current, setValue] as const;
};
