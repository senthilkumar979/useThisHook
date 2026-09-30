const linkClass =
  'font-medium text-violet-700 underline decoration-violet-400/50 underline-offset-2 hover:decoration-violet-500 dark:text-violet-300';

export const HomeCommunity = () => (
  <section className="space-y-5">
    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
      Contribute & sponsor
    </h2>
    <p className="max-w-2xl text-sm leading-6 text-muted">
      useThisHook is MIT and free forever. Help grow it — or keep the lights on for demos and
      tooling.
    </p>
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-3">
        <h3 className="text-base font-medium text-fg">Contributors welcome</h3>
        <p className="text-sm leading-6 text-muted">
          New hooks, clearer demos, docs, and bug fixes all help. Good first wins: tighten a demo,
          fix a typo, add a test, or document a gotcha you hit as a beginner.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a
            className={linkClass}
            href="https://github.com/senthilkumar979/useThisHook/blob/main/CONTRIBUTING.md"
            rel="noreferrer"
            target="_blank"
          >
            Contributing guide
          </a>
          <a
            className={linkClass}
            href="https://github.com/senthilkumar979/useThisHook/issues"
            rel="noreferrer"
            target="_blank"
          >
            Issues
          </a>
          <a
            className={linkClass}
            href="https://github.com/senthilkumar979/useThisHook/discussions"
            rel="noreferrer"
            target="_blank"
          >
            Discussions
          </a>
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-medium text-fg">Sponsor the project</h3>
        <p className="text-sm leading-6 text-muted">
          If these hooks save you time, a sponsor helps cover hosting, tooling, and continued work.
          Stars and “used in production” notes help too.
        </p>
        <p className="text-sm">
          <a
            className={linkClass}
            href="https://github.com/sponsors/senthilkumar979"
            rel="noreferrer"
            target="_blank"
          >
            Become a GitHub Sponsor
          </a>
        </p>
      </div>
    </div>
  </section>
);
