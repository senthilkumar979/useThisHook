import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useOnlineStatus } from './useOnlineStatus';

describe('useOnlineStatus', () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'onLine');

  afterEach(() => {
    if (originalDescriptor) {
      Object.defineProperty(window.navigator, 'onLine', originalDescriptor);
    }
  });

  it('reflects navigator.onLine and updates on online/offline events', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);

    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => false,
    });

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);

    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
});
