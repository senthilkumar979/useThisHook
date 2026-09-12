import { useHover } from 'usethishook';

export const UseHoverDemo = () => {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="rounded-xl border border-line bg-surface px-4 py-6 text-center text-sm"
    >
      {isHovered ? 'Pointer is over this card' : 'Hover this card'}
    </div>
  );
};

export const useHoverExample = `import { useHover } from 'usethishook';

export const Tip = () => {
  const { ref, isHovered } = useHover<HTMLButtonElement>();
  return <button ref={ref} type="button">{isHovered ? 'Ready' : 'Hover me'}</button>;
};`;
