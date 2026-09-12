import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

const defaultUser = { name: 'unknown' };

describe('useLocalStorage', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('reads and writes JSON values', () => {
    const { result } = renderHook(() => useLocalStorage('theme', 'light'));
    expect(result.current[0]).toBe('light');

    act(() => {
      result.current[1]('dark');
    });

    expect(result.current[0]).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe(JSON.stringify('dark'));
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => {
      result.current[1]((previous) => previous + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('reads an existing stored value', () => {
    window.localStorage.setItem('user', JSON.stringify({ name: 'Ada' }));
    const { result } = renderHook(() => useLocalStorage('user', defaultUser));
    expect(result.current[0]).toEqual({ name: 'Ada' });
  });

  it('falls back when stored JSON is invalid', () => {
    window.localStorage.setItem('broken', '{not-json');
    const { result } = renderHook(() => useLocalStorage('broken', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
