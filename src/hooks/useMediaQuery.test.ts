import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

interface MockMediaQueryList {
  matches: boolean;
  media: string;
  addEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => void;
  removeEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => void;
  notify: (matches: boolean) => void;
}

function createMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  return (query: string): MockMediaQueryList => {
    const mediaQueryList: MockMediaQueryList = {
      matches: initialMatches,
      media: query,
      addEventListener: (_type, listener) => {
        listeners.add(listener);
      },
      removeEventListener: (_type, listener) => {
        listeners.delete(listener);
      },
      notify: (matches) => {
        mediaQueryList.matches = matches;
        listeners.forEach((listener) => {
          listener({ matches } as MediaQueryListEvent);
        });
      },
    };

    return mediaQueryList;
  };
}

describe('useMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns the current match and updates on change', () => {
    const matchMedia = createMatchMedia(false);
    window.matchMedia = matchMedia as unknown as typeof window.matchMedia;
    const mediaQueryList = matchMedia('(min-width: 768px)');
    window.matchMedia = vi.fn(() => mediaQueryList) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      mediaQueryList.notify(true);
    });
    expect(result.current).toBe(true);
  });
});
