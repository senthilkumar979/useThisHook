import { useAsyncAction } from 'usethishook';
import { buttonClass } from '../components/styles';

function saveName(name: string) {
  return new Promise<string>((resolve, reject) => {
    window.setTimeout(() => {
      if (!name.trim()) reject(new Error('Name is required'));
      else resolve(`Saved “${name}”`);
    }, 700);
  });
}

export const UseAsyncActionDemo = () => {
  const { run, isPending, error, data } = useAsyncAction(saveName);

  return (
    <div className="space-y-3">
      <button type="button" className={buttonClass} disabled={isPending} onClick={() => void run('Ada')}>
        {isPending ? 'Saving…' : 'Save Ada'}
      </button>
      <button type="button" className={buttonClass} disabled={isPending} onClick={() => void run('').catch(() => undefined)}>
        Save empty (error)
      </button>
      <p>{data ?? (error instanceof Error ? error.message : 'Idle')}</p>
    </div>
  );
};

export const useAsyncActionExample = `import { useAsyncAction } from 'usethishook';

export const SaveButton = () => {
  const { run, isPending } = useAsyncAction(api.save);
  return <button type="button" disabled={isPending} onClick={() => void run()}>Save</button>;
};`;
