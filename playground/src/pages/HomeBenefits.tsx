const benefits = [
  {
    title: 'Awaitable UI without a kit',
    body: 'useConfirm, usePrompt, useOverlay, and useStepFlow resolve in your click handler. Mount render() once — no modal library required.',
  },
  {
    title: 'Zero runtime dependencies',
    body: 'The published package only peers on React 18+. Works with Vite, Next.js, CRA, and Module Federation hosts.',
  },
  {
    title: 'Typed and tree-shakeable',
    body: 'Strict TypeScript public APIs. Unused hooks stay out of the bundle because every hook is a named export.',
  },
  {
    title: 'Docs that match the code',
    body: 'Each page has a live component, an argument/return reference, and an example you can copy into production.',
  },
];

export const HomeBenefits = () => (
  <section>
    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
      Why useThisHook
    </h2>
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {benefits.map((benefit) => (
        <li key={benefit.title} className="rounded-2xl border border-line bg-surface p-5">
          <h3 className="text-base font-medium text-fg">{benefit.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{benefit.body}</p>
        </li>
      ))}
    </ul>
  </section>
);
