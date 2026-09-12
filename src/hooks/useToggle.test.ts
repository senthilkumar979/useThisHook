import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('defaults to false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('starts with the provided initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it('toggles and sets boolean values', () => {
    const { result } = renderHook(() => useToggle());

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

    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });
});
