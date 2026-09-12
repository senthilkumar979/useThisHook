import { ApiReference } from '../components/ApiReference';
import { CodeBlock } from '../components/CodeBlock';
import { PreviewCard } from '../components/PreviewCard';
import type { HookDoc } from '../hooksCatalog';

interface HookPageProps {
  hook: HookDoc;
}

export const HookPage = ({ hook }: HookPageProps) => {
  const Demo = hook.Demo;

  return (
    <article className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-3">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-violet-300/80">
          {hook.category} hook
        </p>
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {hook.name}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-300">{hook.summary}</p>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400">{hook.whenToUse}</p>
      </header>
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Description
        </h2>
        <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5">
          <p className="max-w-3xl text-[0.95rem] leading-7 text-zinc-300">{hook.description}</p>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Live preview
        </h2>
        <PreviewCard>
          <Demo />
        </PreviewCard>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          API reference
        </h2>
        <ApiReference name={hook.name} api={hook.api} />
      </section>
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Drop into a component
        </h2>
        <CodeBlock code={hook.example} />
      </section>
    </article>
  );
};
