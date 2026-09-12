import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('defaults to zero and a step of one', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });

  it('increments, decrements, resets, and sets an explicit value', () => {
    const { result } = renderHook(() => useCounter(10, 2));

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(12);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(10);

    act(() => {
      result.current.setCount(42);
    });
    expect(result.current.count).toBe(42);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(10);
  });
});
