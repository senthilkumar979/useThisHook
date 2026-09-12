import { useState } from 'react';
import { useConfirm, useUnsavedChanges } from 'usethishook';
import { buttonClass, ghostButtonClass, inputClass } from '../components/styles';

export const UseUnsavedChangesDemo = () => {
  const [draft, setDraft] = useState('Hello');
  const [saved, setSaved] = useState('Hello');
  const isDirty = draft !== saved;
  const { confirm, render } = useConfirm();
  const { confirmLeave } = useUnsavedChanges(isDirty, (message) =>
    confirm({ title: 'Unsaved changes', message, danger: true, confirmLabel: 'Leave' }),
  );

  return (
    <div className="space-y-3">
      <textarea
        className={inputClass}
        rows={3}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <p className="text-sm text-muted">
        {isDirty ? 'Dirty — closing the tab will warn.' : 'Clean'}
      </p>
      <div className="flex gap-2">
        <button type="button" className={buttonClass} onClick={() => setSaved(draft)}>
          Save
        </button>
        <button
          type="button"
          className={ghostButtonClass}
          onClick={async () => {
            if (await confirmLeave('Discard this draft?')) setDraft(saved);
          }}
        >
          Leave
        </button>
      </div>
      {render()}
    </div>
  );
};

export const useUnsavedChangesExample = `import { useUnsavedChanges } from 'usethishook';

export const Editor = ({ isDirty }: { isDirty: boolean }) => {
  const { confirmLeave } = useUnsavedChanges(isDirty);
  return <button type="button" onClick={async () => { if (await confirmLeave()) navigate('/'); }}>Back</button>;
};`;
