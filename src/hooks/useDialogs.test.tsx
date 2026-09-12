import { act, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useConfirm } from './useConfirm';
import { usePrompt } from './usePrompt';

describe('useConfirm', () => {
  it('resolves true when confirmed', async () => {
    const { result } = renderHook(() => useConfirm());
    let answer = false;

    act(() => {
      void result.current.confirm({ title: 'Delete?' }).then((value) => {
        answer = value;
      });
    });

    render(result.current.render());
    await act(async () => {
      screen.getByRole('button', { name: 'Confirm' }).click();
    });
    expect(answer).toBe(true);
  });
});

describe('usePrompt', () => {
  it('resolves the typed value', async () => {
    const { result } = renderHook(() => usePrompt());
    let answer: string | null = null;

    act(() => {
      void result.current.prompt({ title: 'Name', initialValue: 'Ada' }).then((value) => {
        answer = value;
      });
    });

    render(result.current.render());
    await act(async () => {
      screen.getByRole('button', { name: 'Save' }).click();
    });
    expect(answer).toBe('Ada');
  });
});
