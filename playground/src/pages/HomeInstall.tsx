import { CodeBlock } from '../components/CodeBlock';

const installCommand = `npm install usethishook`;

const usageExample = `import { useToggle } from 'usethishook';

export const Panel = () => {
  const { value, toggle } = useToggle();
  return <button type="button" onClick={toggle}>{value ? 'Hide' : 'Show'}</button>;
};`;

export const HomeInstall = () => (
  <section className="space-y-5">
    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">Install</h2>
    <p className="max-w-2xl text-sm leading-6 text-zinc-400">
      The npm package name is lowercase <code className="text-zinc-200">usethishook</code>. The product
      name is <span className="text-zinc-200">useThisHook</span>. Requires React 18 or later as a peer
      dependency.
    </p>
    <CodeBlock label="Terminal" code={installCommand} />
    <p className="text-sm leading-6 text-zinc-400">Then import a named hook:</p>
    <CodeBlock label="React" code={usageExample} />
  </section>
);
