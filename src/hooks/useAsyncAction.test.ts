import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAsyncAction } from './useAsyncAction';

describe('useAsyncAction', () => {
  it('tracks pending, data, and error for an async callback', async () => {
    const { result } = renderHook(() =>
      useAsyncAction(async (value: number) => {
        if (value < 0) throw new Error('nope');
        return value * 2;
      }),
    );

    await act(async () => {
      await result.current.run(2);
    });
    expect(result.current.data).toBe(4);
    expect(result.current.isPending).toBe(false);

    await act(async () => {
      await expect(result.current.run(-1)).rejects.toThrow('nope');
    });
    expect(result.current.error).toBeInstanceOf(Error);

    act(() => {
      result.current.reset();
    });
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
