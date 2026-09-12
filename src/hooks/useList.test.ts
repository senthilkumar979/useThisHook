import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useList } from './useList';
import { useSelection } from './useSelection';

describe('useList', () => {
  it('inserts, updates, removes, and moves items', () => {
    const { result } = renderHook(() => useList([{ id: '1', name: 'Ada' }]));

    act(() => {
      result.current.insert({ id: '2', name: 'Grace' });
    });
    act(() => {
      result.current.update('1', { name: 'Ada Lovelace' });
    });
    act(() => {
      result.current.move(1, 0);
    });
    expect(result.current.items.map((item) => item.id)).toEqual(['2', '1']);
    expect(result.current.items[1]?.name).toBe('Ada Lovelace');

    act(() => {
      result.current.remove('2');
    });
    expect(result.current.items).toHaveLength(1);
  });
});

describe('useSelection', () => {
  it('toggles multiple ids and can select only one', () => {
    const { result } = renderHook(() => useSelection({ initial: ['a'] }));

    act(() => {
      result.current.toggle('b');
    });
    expect(result.current.selected).toEqual(['a', 'b']);

    act(() => {
      result.current.selectOnly('c');
    });
    expect(result.current.selected).toEqual(['c']);
    expect(result.current.isSelected('c')).toBe(true);
  });

  it('keeps a single selection in single mode', () => {
    const { result } = renderHook(() => useSelection({ mode: 'single' }));

    act(() => {
      result.current.toggle('a');
      result.current.toggle('b');
    });
    expect(result.current.selected).toEqual(['b']);
  });
});
