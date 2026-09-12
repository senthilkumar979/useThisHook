import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRef } from 'react';
import { useStableCallback } from './useStableCallback';
import { useOnChange } from './useOnChange';
import { useResetState } from './useResetState';

describe('useStableCallback', () => {
  it('keeps a stable identity while calling the latest function', () => {
    let latest = 0;
    const { result, rerender } = renderHook(
      ({ value }) => {
        const callback = useStableCallback(() => value);
        const identity = useRef(callback);
        return { callback, same: identity.current === callback };
      },
      { initialProps: { value: 1 } },
    );

    expect(result.current.callback()).toBe(1);
    rerender({ value: 2 });
    expect(result.current.same).toBe(true);
    expect(result.current.callback()).toBe(2);
    latest = result.current.callback();
    expect(latest).toBe(2);
  });
});

describe('useOnChange', () => {
  it('does not run on mount, then runs when the value changes', () => {
    const seen: Array<[number, number]> = [];
    const { rerender } = renderHook(
      ({ value }) => {
        useOnChange(value, (current, previous) => {
          seen.push([current, previous]);
        });
      },
      { initialProps: { value: 1 } },
    );

    expect(seen).toEqual([]);
    rerender({ value: 2 });
    expect(seen).toEqual([[2, 1]]);
  });
});

describe('useResetState', () => {
  it('resets local state when the source identity changes', () => {
    const { result, rerender } = renderHook(
      ({ source, initial }) => useResetState(source, initial),
      { initialProps: { source: 'a', initial: 'Ada' } },
    );

    act(() => {
      result.current[1]('Grace');
    });
    expect(result.current[0]).toBe('Grace');

    rerender({ source: 'b', initial: 'Alan' });
    expect(result.current[0]).toBe('Alan');
  });
});
