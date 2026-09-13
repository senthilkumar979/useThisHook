import { CodeBlock } from '../components/CodeBlock';

const installCommand = `npm install usethishook`;

const usageExample = `import { useBoolean } from 'usethishook';

export const Panel = () => {
  const { value, toggle } = useBoolean(false);
  return <button type="button" onClick={toggle}>{value ? 'Hide' : 'Show'}</button>;
};`;

export const HomeInstall = () => (
  <section className="space-y-5">
    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Install</h2>
    <p className="max-w-2xl text-sm leading-6 text-muted">
      The npm package name is lowercase{' '}
      <a
        className="font-medium text-violet-700 underline decoration-violet-400/50 underline-offset-2 hover:decoration-violet-500 dark:text-violet-300"
        href="https://www.npmjs.com/package/usethishook"
        rel="noreferrer"
        target="_blank"
      >
        usethishook
      </a>
      {'. '}
      The product name is <span className="text-fg">useThisHook</span>. Requires React 18 or later
      as a peer dependency.
    </p>
    <CodeBlock
      label="Terminal"
      code={installCommand}
      copiedToast="I knew it! Welcome to the club"
    />
    <p className="text-sm leading-6 text-muted">Then import a named hook:</p>
    <CodeBlock label="React" code={usageExample} />
  </section>
);
