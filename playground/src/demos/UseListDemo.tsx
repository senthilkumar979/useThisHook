import { useList } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

export const UseListDemo = () => {
  const list = useList([
    { id: '1', name: 'Ada' },
    { id: '2', name: 'Grace' },
  ]);

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {list.items.map((item, index) => (
          <li key={item.id} className="flex items-center justify-between gap-2">
            <span>{item.name}</span>
            <span className="flex gap-2">
              <button
                type="button"
                className={ghostButtonClass}
                onClick={() => list.move(index, Math.max(0, index - 1))}
              >
                Up
              </button>
              <button
                type="button"
                className={ghostButtonClass}
                onClick={() => list.remove(item.id)}
              >
                Remove
              </button>
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={buttonClass}
        onClick={() =>
          list.insert({ id: String(Date.now()), name: `Person ${list.items.length + 1}` })
        }
      >
        Add
      </button>
    </div>
  );
};

export const useListExample = `import { useList } from 'usethishook';

export const Attendees = () => {
  const list = useList([{ id: '1', name: 'Ada' }]);
  return <button type="button" onClick={() => list.remove('1')}>Remove</button>;
};`;
