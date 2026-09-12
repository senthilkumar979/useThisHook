import { useState } from 'react';
import { useDebounce } from 'usethishook';
import { inputClass } from '../components/styles';

export const UseDebounceDemo = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={query}
        placeholder="Type a search"
        onChange={(event) => setQuery(event.target.value)}
      />
      <p>Immediate: {query || '—'}</p>
      <p>Debounced: {debouncedQuery || '—'}</p>
    </div>
  );
};

export const useDebounceExample = `import { useState } from 'react';
import { useDebounce } from 'usethishook';

export const Search = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  return <input value={query} onChange={(event) => setQuery(event.target.value)} />;
};`;
