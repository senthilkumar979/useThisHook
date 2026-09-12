import { useKeyPress } from 'usethishook';

export const UseKeyPressDemo = () => {
  const isEscape = useKeyPress('Escape');

  return <p>Escape is {isEscape ? 'down' : 'up'}. Press Escape (not in a text field).</p>;
};

export const useKeyPressExample = `import { useKeyPress } from 'usethishook';

export const EscHint = () => {
  const isEscape = useKeyPress('Escape');
  return isEscape ? <p>Closing…</p> : null;
};`;
