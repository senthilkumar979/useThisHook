import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useEventListener } from './useEventListener';

describe('useEventListener', () => {
  it('listens on window and uses the latest handler', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ handler }) => useEventListener(window, 'resize', handler),
      { initialProps: { handler: first } },
    );

    window.dispatchEvent(new Event('resize'));
    expect(first).toHaveBeenCalledTimes(1);

    rerender({ handler: second });
    window.dispatchEvent(new Event('resize'));
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    unmount();
    window.dispatchEvent(new Event('resize'));
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('does not attach when the target is null', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener(null, 'click', handler));
    document.dispatchEvent(new Event('click', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
  });
});
