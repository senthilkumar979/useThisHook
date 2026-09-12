import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDocumentTitle } from './useDocumentTitle';

describe('useDocumentTitle', () => {
  it('sets the document title and restores it on unmount', () => {
    document.title = 'Original';
    const { unmount } = renderHook(() => useDocumentTitle('Hooks'));

    expect(document.title).toBe('Hooks');
    unmount();
    expect(document.title).toBe('Original');
  });

  it('updates the title when the argument changes', () => {
    document.title = 'Original';
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'First' },
    });

    expect(document.title).toBe('First');
    rerender({ title: 'Second' });
    expect(document.title).toBe('Second');
  });
});
