import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useBoolean } from './useBoolean';

describe('useBoolean', () => {
  it('starts with the required true or false input', () => {
    const { result: off } = renderHook(() => useBoolean(false));
    expect(off.current.value).toBe(false);

    const { result: on } = renderHook(() => useBoolean(true));
    expect(on.current.value).toBe(true);
  });

  it('toggles and sets boolean values', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });
});
