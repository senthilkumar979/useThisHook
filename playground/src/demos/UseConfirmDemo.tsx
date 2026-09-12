import { useState } from 'react';
import { useConfirm } from 'usethishook';
import { buttonClass } from '../components/styles';

export const UseConfirmDemo = () => {
  const { confirm, render } = useConfirm();
  const [result, setResult] = useState('Waiting');

  return (
    <div className="space-y-3">
      <button
        type="button"
        className={buttonClass}
        onClick={async () => {
          const ok = await confirm({
            title: 'Delete invoice?',
            message: 'This cannot be undone.',
            danger: true,
            confirmLabel: 'Delete',
          });
          setResult(ok ? 'Deleted' : 'Kept');
        }}
      >
        Delete
      </button>
      <p>{result}</p>
      {render()}
    </div>
  );
};

export const useConfirmExample = `import { useConfirm } from 'usethishook';

export const Row = () => {
  const { confirm, render } = useConfirm();
  return (
    <>
      <button type="button" onClick={async () => { if (await confirm({ title: 'Delete?' })) remove(); }}>Delete</button>
      {render()}
    </>
  );
};`;
