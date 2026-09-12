import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useSearchState } from './useSearchState';

const defaults = { q: '', page: '1' };

describe('useSearchState', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('writes and reads query params', () => {
    const { result } = renderHook(() => useSearchState(defaults));

    expect(result.current[0]).toEqual(defaults);

    act(() => {
      result.current[1]({ q: 'hooks' });
    });

    expect(result.current[0].q).toBe('hooks');
    expect(window.location.search).toContain('q=hooks');
  });
});
