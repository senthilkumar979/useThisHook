import { act, render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { type OverlayControls, useOverlay } from './useOverlay';

interface ConfirmContent {
  title?: string;
}

const Confirm = ({ title, isOpen, close }: ConfirmContent & OverlayControls<boolean>) => (
  <div>
    <span>{title}</span>
    <span>{isOpen ? 'open' : 'closed'}</span>
    <button type="button" onClick={() => close(true)}>
      Confirm
    </button>
  </div>
);

describe('useOverlay', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders nothing before it is opened', () => {
    const { result } = renderHook(() => useOverlay<ConfirmContent, boolean>(Confirm));
    expect(result.current.render()).toBeNull();
  });

  it('opens with props, locks scroll, and resolves on close', async () => {
    const { result } = renderHook(() => useOverlay<ConfirmContent, boolean>(Confirm));
    document.body.style.overflow = 'auto';
    let overlayResult: boolean | undefined;

    act(() => {
      void result.current.open({ title: 'Delete item?' }).then((value) => {
        overlayResult = value;
      });
    });

    expect(document.body.style.overflow).toBe('hidden');
    render(result.current.render());
    expect(screen.getByText('Delete item?')).toBeTruthy();
    expect(screen.getByText('open')).toBeTruthy();

    await act(async () => {
      screen.getByRole('button', { name: 'Confirm' }).click();
    });

    expect(overlayResult).toBe(true);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('can close without a matching open promise', () => {
    const { result } = renderHook(() => useOverlay<ConfirmContent, boolean>(Confirm));

    act(() => {
      result.current.close(false);
    });

    expect(result.current.render()).toBeNull();
  });
});
