import { useSearchState } from 'usethishook';
import { buttonClass, inputClass } from '../components/styles';

const searchDefaults = { q: '', tab: 'all' };

export const UseSearchStateDemo = () => {
  const [params, setParams] = useSearchState(searchDefaults);

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={params.q}
        placeholder="Filter (writes ?q= into the URL)"
        onChange={(event) => setParams({ q: event.target.value })}
      />
      <div className="flex gap-2">
        {(['all', 'open', 'done'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={buttonClass}
            onClick={() => setParams({ tab })}
          >
            {tab}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">
        URL search: q={params.q || '(empty)'} · tab={params.tab}
      </p>
    </div>
  );
};

export const useSearchStateExample = `import { useSearchState } from 'usethishook';

const defaults = { q: '', page: '1' };

export const Filters = () => {
  const [params, setParams] = useSearchState(defaults);
  return <input value={params.q} onChange={(event) => setParams({ q: event.target.value })} />;
};`;
