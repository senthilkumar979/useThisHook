import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useElementSize } from './useElementSize';

describe('useElementSize', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes the attached node and reports contentRect size', () => {
    let observed: Element | null = null;
    const disconnect = vi.fn();
    const observe = vi.fn((element: Element) => {
      observed = element;
    });

    vi.stubGlobal(
      'ResizeObserver',
      class {
        callback: ResizeObserverCallback;
        constructor(callback: ResizeObserverCallback) {
          this.callback = callback;
        }
        observe = observe;
        disconnect = disconnect;
        trigger(width: number, height: number) {
          this.callback(
            [{ contentRect: { width, height } }] as ResizeObserverEntry[],
            this as unknown as ResizeObserver,
          );
        }
      },
    );

    const { result } = renderHook(() => useElementSize());
    const node = document.createElement('div');

    act(() => {
      result.current.ref(node);
    });

    expect(observe).toHaveBeenCalledWith(node);
    expect(observed).toBe(node);
  });
});
