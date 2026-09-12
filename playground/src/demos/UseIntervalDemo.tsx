import { useState } from 'react';
import { useInterval } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

export const UseIntervalDemo = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  useInterval(() => setCount((previous) => previous + 1), isRunning ? 500 : null);

  return (
    <div className="space-y-3">
      <p className="text-2xl font-semibold">{count}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={() => setIsRunning((value) => !value)}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button type="button" className={ghostButtonClass} onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export const useIntervalExample = `import { useState } from 'react';
import { useInterval } from 'usethishook';

export const Timer = () => {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((value) => value + 1), 1000);
  return <p>{count}</p>;
};`;
