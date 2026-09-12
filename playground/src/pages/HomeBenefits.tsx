const benefits = [
  {
    title: 'Drop into any React app',
    body: 'Peer-depends on React 18+. Named exports work with Vite, Next.js, CRA, and Module Federation hosts.',
  },
  {
    title: 'Typed, tree-shakeable',
    body: 'Strict TypeScript public APIs. Unused hooks stay out of the bundle because every hook is a named export.',
  },
  {
    title: 'Everyday UI, not toy snippets',
    body: 'Promise-based overlays and wizards, native file pick, storage, debounce, and browser subscriptions you would otherwise rewrite.',
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
