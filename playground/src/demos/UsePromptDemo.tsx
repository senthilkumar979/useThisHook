import { useState } from 'react';
import { usePrompt } from 'usethishook';
import { buttonClass } from '../components/styles';

export const UsePromptDemo = () => {
  const { prompt, render } = usePrompt();
  const [name, setName] = useState('Untitled');

  return (
    <div className="space-y-3">
      <p>View name: {name}</p>
      <button
        type="button"
        className={buttonClass}
        onClick={async () => {
          const next = await prompt({ title: 'Rename view', label: 'Name', initialValue: name });
          if (next !== null) setName(next);
        }}
      >
        Rename
      </button>
      {render()}
    </div>
  );
};

export const usePromptExample = `import { usePrompt } from 'usethishook';

export const Rename = () => {
  const { prompt, render } = usePrompt();
  return (
    <>
      <button type="button" onClick={() => void prompt({ title: 'Name' })}>Rename</button>
      {render()}
    </>
  );
};`;
