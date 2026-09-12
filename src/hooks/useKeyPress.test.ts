import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useKeyPress } from './useKeyPress';

describe('useKeyPress', () => {
  it('becomes true on matching keydown and false on keyup', () => {
    const { result } = renderHook(() => useKeyPress('Escape'));
    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    });
    expect(result.current).toBe(false);
  });

  it('ignores keydown from an input', () => {
    const { result } = renderHook(() => useKeyPress('a'));
    const input = document.createElement('input');
    document.body.appendChild(input);

    const typed = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
    Object.defineProperty(typed, 'target', { value: input });
    act(() => {
      window.dispatchEvent(typed);
    });
    expect(result.current).toBe(false);

    input.remove();
  });
});
