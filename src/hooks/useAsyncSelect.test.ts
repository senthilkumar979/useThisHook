import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAsyncSelect } from './useAsyncSelect';

describe('useAsyncSelect', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('resolves with the selected file', async () => {
    const { result } = renderHook(() => useAsyncSelect());
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });

    vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(function (
      this: HTMLInputElement,
    ) {
      Object.defineProperty(this, 'files', { configurable: true, value: [file] });
      this.dispatchEvent(new Event('change'));
    });

    const selected = await result.current({ accept: '.txt' });
    expect(selected).toBe(file);
  });

  it('resolves with multiple files when enabled', async () => {
    const { result } = renderHook(() => useAsyncSelect());
    const files = [
      new File(['a'], 'a.txt', { type: 'text/plain' }),
      new File(['b'], 'b.txt', { type: 'text/plain' }),
    ];

    vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(function (
      this: HTMLInputElement,
    ) {
      Object.defineProperty(this, 'files', { configurable: true, value: files });
      this.dispatchEvent(new Event('change'));
    });

    const selected = await result.current({ multiple: true });
    expect(selected).toEqual(files);
  });

  it('resolves null when the picker is cancelled', async () => {
    const { result } = renderHook(() => useAsyncSelect());

    vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(function (
      this: HTMLInputElement,
    ) {
      this.dispatchEvent(new Event('cancel'));
    });

    const selected = await result.current();
    expect(selected).toBeNull();
  });

  it('resolves null after a focus cancel with no files', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAsyncSelect());

    vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => undefined);
    const pending = result.current();

    await act(async () => {
      window.dispatchEvent(new Event('focus'));
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(await pending).toBeNull();
  });
});
