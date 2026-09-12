import { useState } from 'react';
import { useCopyToClipboard } from 'usethishook';
import { buttonClass, inputClass } from '../components/styles';

export const UseCopyToClipboardDemo = () => {
  const [text, setText] = useState('npm install usethishook');
  const { copiedText, copy, reset } = useCopyToClipboard();

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="flex gap-2">
        <button type="button" className={buttonClass} onClick={() => void copy(text)}>
          Copy
        </button>
        <button type="button" className={buttonClass} onClick={reset}>
          Reset
        </button>
      </div>
      <p>{copiedText ? `Copied: ${copiedText}` : 'Nothing copied yet.'}</p>
    </div>
  );
};

export const useCopyToClipboardExample = `import { useCopyToClipboard } from 'usethishook';

export const CopyButton = () => {
  const { copy, copiedText } = useCopyToClipboard();
  return <button type="button" onClick={() => void copy('hello')}>{copiedText ? 'Copied' : 'Copy'}</button>;
};`;
