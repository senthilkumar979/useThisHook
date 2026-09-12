import { useMediaQuery } from 'usethishook';

export const UseMediaQueryDemo = () => {
  const isWide = useMediaQuery('(min-width: 768px)');

  return (
    <p>
      Viewport is {isWide ? 'at least 768px wide' : 'narrower than 768px'}. Resize the window to
      see this update.
    </p>
  );
};

export const useMediaQueryExample = `import { useMediaQuery } from 'usethishook';

export const ResponsiveNote = () => {
  const isWide = useMediaQuery('(min-width: 768px)');
  return <p>{isWide ? 'Desktop layout' : 'Mobile layout'}</p>;
};`;
