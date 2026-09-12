import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useInView } from './useInView';

describe('useInView', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sets isInView when the observer reports intersection', () => {
    let trigger: ((isIntersecting: boolean) => void) | undefined;
    const disconnect = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          trigger = (isIntersecting: boolean) => {
            callback(
              [{ isIntersecting } as IntersectionObserverEntry],
              this as unknown as IntersectionObserver,
            );
          };
        }
        observe = vi.fn();
        disconnect = disconnect;
      },
    );

    const { result } = renderHook(() => useInView());
    const node = document.createElement('div');

    act(() => {
      result.current.ref(node);
    });

    act(() => {
      trigger?.(true);
    });
    expect(result.current.isInView).toBe(true);

    act(() => {
      trigger?.(false);
    });
    expect(result.current.isInView).toBe(false);
  });
});
