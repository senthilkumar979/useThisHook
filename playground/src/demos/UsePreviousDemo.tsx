import { useState } from 'react';
import { usePrevious } from 'usethishook';
import { inputClass } from '../components/styles';

export const UsePreviousDemo = () => {
  const [value, setValue] = useState('hello');
  const previous = usePrevious(value);

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <p>Current: {value}</p>
      <p>Previous: {previous ?? '—'}</p>
    </div>
  );
};

export const usePreviousExample = `import { useState } from 'react';
import { usePrevious } from 'usethishook';

export const Tracker = () => {
  const [value, setValue] = useState(0);
  const previous = usePrevious(value);
  return <button type="button" onClick={() => setValue(value + 1)}>{previous} → {value}</button>;
};`;
