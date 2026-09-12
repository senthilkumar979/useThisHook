import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebouncedCallback } from './useDebouncedCallback';

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('invokes the latest callback after the delay and can cancel', () => {
    const spy = vi.fn();
    const { result, rerender } = renderHook(
      ({ fn }) => useDebouncedCallback(fn, 200),
      { initialProps: { fn: spy } },
    );

    act(() => {
      result.current[0]();
      vi.advanceTimersByTime(100);
    });
    expect(spy).not.toHaveBeenCalled();

    const next = vi.fn();
    rerender({ fn: next });
    act(() => {
      result.current[0]();
      vi.advanceTimersByTime(200);
    });
    expect(spy).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);

    act(() => {
      result.current[0]();
      result.current[1]();
      vi.advanceTimersByTime(200);
    });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
