import { GooeyToaster } from 'goey-toast';
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { getHookById } from './hooksCatalog';
import { HomePage } from './pages/HomePage';
import { HookPage } from './pages/HookPage';

function readRoute() {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) return '';
  return hash.slice(2);
}

export const App = () => {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!window.location.hash.startsWith('#/')) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const hook = route ? getHookById(route) : undefined;

  return (
    <>
      <Layout activeId={hook?.id}>{hook ? <HookPage hook={hook} /> : <HomePage />}</Layout>
      <GooeyToaster position="bottom-right" />
    </>
  );
};
