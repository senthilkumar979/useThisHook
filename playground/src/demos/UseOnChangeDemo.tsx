import { useState } from 'react';
import { useOnChange } from 'usethishook';
import { inputClass } from '../components/styles';

export const UseOnChangeDemo = () => {
  const [text, setText] = useState('hello');
  const [log, setLog] = useState('No changes yet (mount is ignored).');

  useOnChange(text, (current, previous) => {
    setLog(`Changed from “${previous}” to “${current}”.`);
  });

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <p>{log}</p>
    </div>
  );
};

export const useOnChangeExample = `import { useOnChange } from 'usethishook';

export const UserPanel = ({ userId }: { userId: string }) => {
  useOnChange(userId, () => closeSidebar());
  return <p>{userId}</p>;
};`;
