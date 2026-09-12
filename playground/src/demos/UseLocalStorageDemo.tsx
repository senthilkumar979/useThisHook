import { useLocalStorage } from 'usethishook';
import { inputClass } from '../components/styles';

export const UseLocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('playground-name', '');

  return (
    <div className="space-y-3">
      <input
        className={inputClass}
        value={name}
        placeholder="Your name"
        onChange={(event) => setName(event.target.value)}
      />
      <p>Stored as playground-name. Refresh the page to confirm it persists.</p>
    </div>
  );
};

export const useLocalStorageExample = `import { useLocalStorage } from 'usethishook';

export const NameField = () => {
  const [name, setName] = useLocalStorage('name', '');
  return <input value={name} onChange={(event) => setName(event.target.value)} />;
};`;
