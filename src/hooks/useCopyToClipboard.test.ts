import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('copies text and can reset the copied value', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...window.navigator, clipboard: { writeText } });

    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copiedText).toBeNull();

    let didCopy = false;
    await act(async () => {
      didCopy = await result.current.copy('hello');
    });

    expect(didCopy).toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
    expect(result.current.copiedText).toBe('hello');

    act(() => {
      result.current.reset();
    });
    expect(result.current.copiedText).toBeNull();
  });

  it('returns false when the clipboard API is missing', async () => {
    vi.stubGlobal('navigator', { ...window.navigator, clipboard: undefined });
    const { result } = renderHook(() => useCopyToClipboard());

    let didCopy = true;
    await act(async () => {
      didCopy = await result.current.copy('hello');
    });

    expect(didCopy).toBe(false);
    expect(result.current.copiedText).toBeNull();
  });

  it('returns false when writing to the clipboard fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { ...window.navigator, clipboard: { writeText } });
    const { result } = renderHook(() => useCopyToClipboard());

    let didCopy = true;
    await act(async () => {
      didCopy = await result.current.copy('hello');
    });

    expect(didCopy).toBe(false);
    expect(result.current.copiedText).toBeNull();
  });
});
