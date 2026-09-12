import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInterval } from './useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('invokes the callback on an interval and pauses when delay is null', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
      initialProps: { delay: 100 as number | null },
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    rerender({ delay: null });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('uses the latest callback without resetting the interval', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ callback }) => useInterval(callback, 100), {
      initialProps: { callback: first },
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(first).toHaveBeenCalledTimes(1);

    rerender({ callback: second });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });
});
