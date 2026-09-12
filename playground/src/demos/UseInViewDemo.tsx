import { useInView } from 'usethishook';

export const UseInViewDemo = () => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div className="space-y-3">
      <p className={isInView ? 'text-emerald-700 dark:text-emerald-300' : 'text-muted'}>
        Sentinel is {isInView ? 'in view' : 'out of view'}. Scroll the box.
      </p>
      <div className="h-40 overflow-auto rounded-xl border border-line">
        <div className="h-48" />
        <div
          ref={ref}
          className={`mx-4 rounded-lg p-4 text-center ${isInView ? 'bg-emerald-500/20' : 'bg-code'}`}
        >
          Watch me
        </div>
        <div className="h-48" />
      </div>
    </div>
  );
};

export const useInViewExample = `import { useInView } from 'usethishook';

export const LazyBlock = () => {
  const { ref, isInView } = useInView({ once: true });
  return <div ref={ref}>{isInView ? <HeavyChart /> : 'Loading…'}</div>;
};`;
