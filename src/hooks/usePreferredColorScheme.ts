import { useMediaQuery } from './useMediaQuery';

export type PreferredColorScheme = 'light' | 'dark';

export const usePreferredColorScheme = (): PreferredColorScheme => {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  return isDark ? 'dark' : 'light';
};
