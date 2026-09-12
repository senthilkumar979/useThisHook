import { useCallback, useState } from 'react';

export type SelectionMode = 'single' | 'multiple';

interface UseSelectionOptions {
  mode?: SelectionMode;
  initial?: string[];
}

export const useSelection = ({ mode = 'multiple', initial = [] }: UseSelectionOptions = {}) => {
  const [selected, setSelected] = useState<string[]>(initial);

  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);

  const toggle = useCallback(
    (id: string) => {
      setSelected((previous) => {
        if (mode === 'single') return previous[0] === id ? [] : [id];
        return previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id];
      });
    },
    [mode],
  );

  const selectOnly = useCallback((id: string) => {
    setSelected([id]);
  }, []);

  const selectAll = useCallback(
    (ids: string[]) => {
      setSelected(mode === 'single' ? ids.slice(0, 1) : [...new Set(ids)]);
    },
    [mode],
  );

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  return { selected, isSelected, toggle, selectOnly, selectAll, clear, setSelected } as const;
};
