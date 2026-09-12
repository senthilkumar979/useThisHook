import { useSelection } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

const rows = [
  { id: '1', name: 'Invoice 1001' },
  { id: '2', name: 'Invoice 1002' },
  { id: '3', name: 'Invoice 1003' },
];

export const UseSelectionDemo = () => {
  const selection = useSelection({ mode: 'multiple' });

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <label key={row.id} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selection.isSelected(row.id)}
            onChange={() => selection.toggle(row.id)}
          />
          {row.name}
        </label>
      ))}
      <p>Selected: {selection.selected.join(', ') || 'none'}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={() => selection.selectAll(rows.map((row) => row.id))}
        >
          Select all
        </button>
        <button type="button" className={ghostButtonClass} onClick={selection.clear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export const useSelectionExample = `import { useSelection } from 'usethishook';

export const Table = ({ ids }: { ids: string[] }) => {
  const selection = useSelection();
  return <button type="button" onClick={() => selection.selectAll(ids)}>Select page</button>;
};`;
