import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('returns undefined on the first render', () => {
    const { result } = renderHook(() => usePrevious('first'));
    expect(result.current).toBeUndefined();
  });

  it('returns the previous value after an update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    expect(result.current).toBe(1);
    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });

  it('keeps the previous value when the current value is unchanged', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'same' },
    });

    rerender({ value: 'next' });
    rerender({ value: 'next' });
    expect(result.current).toBe('same');
  });
});
