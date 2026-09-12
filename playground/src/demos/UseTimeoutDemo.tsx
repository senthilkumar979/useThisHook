import { useState } from 'react';
import { useTimeout } from 'usethishook';
import { buttonClass } from '../components/styles';

export const UseTimeoutDemo = () => {
  const [delay, setDelay] = useState<number | null>(null);
  const [message, setMessage] = useState('Idle');

  useTimeout(() => {
    setMessage('Fired');
    setDelay(null);
  }, delay);

  return (
    <div className="space-y-3">
      <p>{message}</p>
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          setMessage('Waiting 800ms…');
          setDelay(800);
        }}
      >
        Start timeout
      </button>
    </div>
  );
};

export const useTimeoutExample = `import { useTimeout } from 'usethishook';

export const Splash = ({ onDone }: { onDone: () => void }) => {
  useTimeout(onDone, 1200);
  return <p>Loading…</p>;
};`;
