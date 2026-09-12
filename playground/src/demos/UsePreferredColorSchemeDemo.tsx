import { usePreferredColorScheme } from 'usethishook';

export const UsePreferredColorSchemeDemo = () => {
  const scheme = usePreferredColorScheme();

  return (
    <p>
      OS preference is <span className="font-medium text-fg">{scheme}</span>. This is not the
      playground theme switcher.
    </p>
  );
};

export const usePreferredColorSchemeExample = `import { usePreferredColorScheme } from 'usethishook';

export const SchemeLabel = () => {
  const scheme = usePreferredColorScheme();
  return <p>{scheme}</p>;
};`;
