import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('works uncontrolled from defaultValue', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: false }));

    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
  });

  it('works controlled and calls onChange', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: false, onChange }),
      { initialProps: { value: false } },
    );

    act(() => {
      result.current[1](true);
    });
    expect(onChange).toHaveBeenCalledWith(true);
    expect(result.current[0]).toBe(false);

    rerender({ value: true });
    expect(result.current[0]).toBe(true);
  });
});
