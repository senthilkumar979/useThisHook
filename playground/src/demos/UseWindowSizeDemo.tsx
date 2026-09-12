import { useWindowSize } from 'usethishook';

export const UseWindowSizeDemo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      {width} × {height}
    </p>
  );
};

export const useWindowSizeExample = `import { useWindowSize } from 'usethishook';

export const SizeLabel = () => {
  const { width, height } = useWindowSize();
  return <p>{width} × {height}</p>;
};`;
