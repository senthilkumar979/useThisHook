import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRef } from 'react';
import { useStableCallback } from './useStableCallback';
import { useResetState } from './useResetState';

describe('useStableCallback', () => {
  it('keeps a stable identity while calling the latest function', () => {
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
