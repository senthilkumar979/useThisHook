import { usePagination } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

const items = Array.from({ length: 23 }, (_, index) => `Row ${index + 1}`);

export const UsePaginationDemo = () => {
  const pager = usePagination({ total: items.length, pageSize: 5 });
  const slice = items.slice(pager.offset, pager.offset + pager.pageSize);

  return (
    <div className="space-y-3">
      <ul className="space-y-1 text-sm">
        {slice.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-sm text-zinc-400">
        Page {pager.page} of {pager.pageCount} · offset {pager.offset}
      </p>
      <div className="flex gap-2">
        <button type="button" className={ghostButtonClass} disabled={!pager.canPrev} onClick={pager.prev}>
          Prev
        </button>
        <button type="button" className={buttonClass} disabled={!pager.canNext} onClick={pager.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export const usePaginationExample = `import { usePagination } from 'usethishook';

export const Table = ({ rows }: { rows: string[] }) => {
  const pager = usePagination({ total: rows.length, pageSize: 20 });
  const pageRows = rows.slice(pager.offset, pager.offset + pager.pageSize);
  return <button type="button" onClick={pager.next} disabled={!pager.canNext}>Next</button>;
};`;
