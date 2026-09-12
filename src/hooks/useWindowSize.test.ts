import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
  it('returns the current window size', () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it('updates when the window is resized', () => {
    window.innerWidth = 800;
    window.innerHeight = 600;
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 1280;
      window.innerHeight = 720;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1280, height: 720 });
  });
});
