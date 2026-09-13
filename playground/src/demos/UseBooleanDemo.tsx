import { useBoolean } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

export const UseBooleanDemo = () => {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div className="space-y-4">
      <p className="text-lg text-fg">Flag is {value ? 'true' : 'false'}</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={toggle}>
          Toggle
        </button>
        <button type="button" className={ghostButtonClass} onClick={setTrue}>
          Set true
        </button>
        <button type="button" className={ghostButtonClass} onClick={setFalse}>
          Set false
        </button>
      </div>
    </div>
  );
};

export const useBooleanExample = `import { useBoolean } from 'usethishook';

export const Panel = () => {
  const { value, toggle } = useBoolean(false);
  return <button type="button" onClick={toggle}>{value ? 'Hide' : 'Show'}</button>;
};`;
