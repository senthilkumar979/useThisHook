import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('invokes the callback once after the delay and pauses when delay is null', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(({ delay }) => useTimeout(callback, delay), {
      initialProps: { delay: 200 as number | null },
    });

    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: null });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('uses the latest callback without resetting the timer', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ callback }) => useTimeout(callback, 100), {
      initialProps: { callback: first },
    });

    rerender({ callback: second });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
