import { useCallback, useState } from 'react';

export interface Identifiable {
  id: string;
}

export const useList = <T extends Identifiable>(initialItems: T[] = []) => {
  const [items, setItems] = useState(initialItems);

  const insert = useCallback((item: T, index?: number) => {
    setItems((previous) => {
      if (index === undefined || index >= previous.length) return [...previous, item];
      const next = [...previous];
      next.splice(Math.max(0, index), 0, item);
      return next;
    });
  }, []);

  const update = useCallback((id: string, patch: Partial<T> | ((item: T) => T)) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;
        return typeof patch === 'function' ? patch(item) : { ...item, ...patch };
      }),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const move = useCallback((fromIndex: number, toIndex: number) => {
    setItems((previous) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= previous.length ||
        toIndex >= previous.length
      ) {
        return previous;
      }
      const next = [...previous];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return previous;
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const replace = useCallback((nextItems: T[]) => {
    setItems(nextItems);
  }, []);

  return { items, insert, update, remove, move, replace, setItems } as const;
};
