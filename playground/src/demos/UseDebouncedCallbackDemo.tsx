import { useState } from 'react';
import { useDebouncedCallback } from 'usethishook';
import { inputClass } from '../components/styles';

export const UseDebouncedCallbackDemo = () => {
  const [query, setQuery] = useState('');
  const [searches, setSearches] = useState<string[]>([]);
  const [runSearch] = useDebouncedCallback((value: string) => {
    setSearches((previous) => [`Fetched “${value}”`, ...previous].slice(0, 4));
  }, 400);

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={query}
        placeholder="Type; fetch waits 400ms after the last key"
        onChange={(event) => {
          setQuery(event.target.value);
          runSearch(event.target.value);
        }}
      />
      <ul className="space-y-1 text-sm text-muted">
        {searches.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const useDebouncedCallbackExample = `import { useDebouncedCallback } from 'usethishook';

export const Search = () => {
  const [search] = useDebouncedCallback((q: string) => api.search(q), 300);
  return <input onChange={(event) => search(event.target.value)} />;
};`;
