import type { HookApi } from '../hookDoc';
import { FieldTable } from './FieldTable';

interface ApiReferenceProps {
  name: string;
  api: HookApi;
}

export const ApiReference = ({ name, api }: ApiReferenceProps) => (
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
    <div className="border-b border-white/10 bg-gradient-to-r from-violet-500/10 via-transparent to-sky-500/10 px-5 py-4">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-zinc-500">Call signature</p>
      <code className="mt-2 block font-mono text-[0.95rem] text-zinc-100">{api.signature}</code>
    </div>
    <div className="space-y-8 p-5">
      <p className="text-[0.95rem] leading-7 text-zinc-300">{api.explanation}</p>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Arguments passed into {name}</h3>
        <FieldTable
          caption={`${name} arguments`}
          emptyLabel={`${name} takes no arguments. Call it with empty parentheses.`}
          fields={api.arguments}
        />
      </div>
      <div>
        <h3 className="mb-1 text-sm font-semibold text-white">What you get back</h3>
        <p className="mb-3 text-sm leading-6 text-zinc-400">{api.returns.description}</p>
        <p className="mb-3 font-mono text-[0.8rem] text-sky-200/90">{api.returns.type}</p>
        <FieldTable
          caption={`${name} return fields`}
          emptyLabel="The return value is a single result, not an object with named fields."
          fields={api.returns.fields ?? []}
        />
      </div>
      {api.caveats && api.caveats.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <h3 className="mb-2 text-sm font-semibold text-amber-100">Good to know</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-amber-50/80">
            {api.caveats.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);
