import { useState } from 'react';
import { useControllableState } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = ({ checked, defaultChecked = false, onCheckedChange }: SwitchProps) => {
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <button type="button" className={on ? buttonClass : ghostButtonClass} onClick={() => setOn((value) => !value)}>
      {on ? 'On' : 'Off'}
    </button>
  );
};

export const UseControllableStateDemo = () => {
  const [controlled, setControlled] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-zinc-400">Uncontrolled (own state)</p>
        <Switch defaultChecked />
      </div>
      <div>
        <p className="mb-2 text-sm text-zinc-400">Controlled by parent ({controlled ? 'true' : 'false'})</p>
        <Switch checked={controlled} onCheckedChange={setControlled} />
      </div>
    </div>
  );
};

export const useControllableStateExample = `import { useControllableState } from 'usethishook';

export const Switch = ({ checked, defaultChecked = false, onCheckedChange }) => {
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });
  return <button type="button" onClick={() => setOn((value) => !value)}>{on ? 'On' : 'Off'}</button>;
};`;
