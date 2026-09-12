import { useToggle } from 'usethishook';
import { buttonClass } from '../components/styles';

export const UseToggleDemo = () => {
  const { value, toggle, setTrue, setFalse } = useToggle();

  return (
    <div className="space-y-3">
      <p>Panel is {value ? 'open' : 'closed'}.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={toggle}>
          Toggle
        </button>
        <button type="button" className={buttonClass} onClick={setTrue}>
          Open
        </button>
        <button type="button" className={buttonClass} onClick={setFalse}>
          Close
        </button>
      </div>
    </div>
  );
};

export const useToggleExample = `import { useToggle } from 'usethishook';

export const PanelToggle = () => {
  const { value, toggle } = useToggle();
  return <button type="button" onClick={toggle}>{value ? 'Hide' : 'Show'}</button>;
};`;
