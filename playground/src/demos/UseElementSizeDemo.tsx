import { useElementSize } from 'usethishook';

export const UseElementSizeDemo = () => {
  const { ref, width, height } = useElementSize<HTMLDivElement>();

  return (
    <div className="space-y-3">
      <div
        ref={ref}
        className="min-h-24 resize overflow-auto rounded-xl border border-violet-400/40 bg-violet-500/15 p-4"
      >
        Drag the corner to resize this box.
      </div>
      <p>
        {Math.round(width)} × {Math.round(height)}
      </p>
    </div>
  );
};

export const useElementSizeExample = `import { useElementSize } from 'usethishook';

export const ChartHost = () => {
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  return <div ref={ref}><Chart width={width} height={height} /></div>;
};`;
