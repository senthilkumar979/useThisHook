import { useState } from 'react';
import { useDocumentTitle } from 'usethishook';
import { inputClass } from '../components/styles';

export const UseDocumentTitleDemo = () => {
  const [title, setTitle] = useState('usethishook playground');
  useDocumentTitle(title);

  return (
    <div className="space-y-3">
      <input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} />
      <p>Check the browser tab title. It restores when you leave this page.</p>
    </div>
  );
};

export const useDocumentTitleExample = `import { useDocumentTitle } from 'usethishook';

export const Page = () => {
  useDocumentTitle('Settings');
  return <h1>Settings</h1>;
};`;
