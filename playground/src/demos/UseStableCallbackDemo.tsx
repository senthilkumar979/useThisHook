import { useState } from 'react';
import { useInterval, useStableCallback } from 'usethishook';
import { inputClass } from '../components/styles';

export const UseStableCallbackDemo = () => {
  const [label, setLabel] = useState('Ada');
  const [ticks, setTicks] = useState(0);
  const tick = useStableCallback(() => {
    setTicks((count) => count + 1);
  });
  useInterval(tick, 1000);

  return (
    <div className="space-y-3">
      <input className={inputClass} value={label} onChange={(event) => setLabel(event.target.value)} />
      <p>
        Interval still uses the latest name <span className="text-white">{label}</span> without resetting.
        Ticks: {ticks}
      </p>
    </div>
  );
};

export const useStableCallbackExample = `import { useStableCallback } from 'usethishook';

export const Poller = ({ query }: { query: string }) => {
  const poll = useStableCallback(() => fetch(\`/search?q=\${query}\`));
  useInterval(poll, 5000);
  return null;
};`;
