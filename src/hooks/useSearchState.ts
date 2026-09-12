import { useCallback, useMemo, useSyncExternalStore } from 'react';

const SEARCH_EVENT = 'usethishook:search';

function subscribe(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener(SEARCH_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener(SEARCH_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.location.search;
}

function getServerSnapshot() {
  return '';
}

function writeSearch(params: URLSearchParams) {
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
  window.history.replaceState(window.history.state, '', url);
  window.dispatchEvent(new Event(SEARCH_EVENT));
}

function readParams<T extends Record<string, string>>(defaults: T, search: string): T {
  const params = new URLSearchParams(search);
  const next = { ...defaults };
  for (const key of Object.keys(defaults) as Array<keyof T>) {
    const value = params.get(String(key));
    if (value !== null) next[key] = value as T[keyof T];
  }
  return next;
}

export const useSearchState = <T extends Record<string, string>>(defaults: T) => {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const values = useMemo(() => readParams(defaults, search), [defaults, search]);

  const setValues = useCallback(
    (update: Partial<T> | ((previous: T) => T)) => {
      const current = readParams(defaults, window.location.search);
      const next = typeof update === 'function' ? update(current) : { ...current, ...update };
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(next)) {
        if (value === '') continue;
        params.set(key, value);
      }
      writeSearch(params);
    },
    [defaults],
  );

  return [values, setValues] as const;
};
