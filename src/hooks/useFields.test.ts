import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFields } from './useFields';

const emailSchema = {
  safeParse: (data: unknown) => {
    const values = data as { email: string };
    if (!values.email.includes('@')) {
      return {
        success: false as const,
        error: { issues: [{ path: ['email'], message: 'Enter a valid email' }] },
      };
    }
    return { success: true as const, data: values };
  },
};

describe('useFields', () => {
  const initial = { name: 'Ada', email: '' };

  it('updates fields and reports dirty state', () => {
    const { result } = renderHook(() => useFields(initial));

    expect(result.current.isDirty).toBe(false);
    act(() => {
      result.current.setField('name', 'Grace');
    });
    expect(result.current.values.name).toBe('Grace');
    expect(result.current.isDirty).toBe(true);
  });

  it('validates with a schema and submit only when valid', () => {
    const { result } = renderHook(() => useFields(initial, emailSchema));
    const onValid = vi.fn();

    act(() => {
      result.current.submit(onValid);
    });
    expect(onValid).not.toHaveBeenCalled();
    expect(result.current.errors.email).toBe('Enter a valid email');

    act(() => {
      result.current.setField('email', 'ada@example.com');
    });
    act(() => {
      result.current.submit(onValid);
    });
    expect(onValid).toHaveBeenCalledTimes(1);
  });
});
