import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePreferredColorScheme } from './usePreferredColorScheme';

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

describe('usePreferredColorScheme', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('reports light by default and updates when the media query changes', () => {
    const matchMedia = createMatchMedia(false);
    const mediaQueryList = matchMedia('(prefers-color-scheme: dark)');
    window.matchMedia = vi.fn(() => mediaQueryList) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('light');

    act(() => {
      mediaQueryList.notify(true);
    });
    expect(result.current).toBe('dark');
  });
});
