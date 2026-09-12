import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useUnsavedChanges } from './useUnsavedChanges';

describe('useUnsavedChanges', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does not listen when clean and allows leave', async () => {
    const add = vi.spyOn(window, 'addEventListener');
    const { result } = renderHook(() => useUnsavedChanges(false));

    expect(add).not.toHaveBeenCalledWith('beforeunload', expect.any(Function));
    await expect(result.current.confirmLeave()).resolves.toBe(true);
  });

  it('registers beforeunload when dirty and uses the confirmer', async () => {
    const confirmer = vi.fn().mockResolvedValue(false);
    const add = vi.spyOn(window, 'addEventListener');
    const { result } = renderHook(() => useUnsavedChanges(true, confirmer));

    expect(add).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    await act(async () => {
      await expect(result.current.confirmLeave('Sure?')).resolves.toBe(false);
    });
    expect(confirmer).toHaveBeenCalledWith('Sure?');
  });
});
