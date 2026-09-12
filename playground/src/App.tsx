import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { getHookById } from './hooksCatalog';
import { HomePage } from './pages/HomePage';
import { HookPage } from './pages/HookPage';

function readRoute() {
  return window.location.hash.replace(/^#\/?/, '');
}

export const App = () => {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const hook = route ? getHookById(route) : undefined;

  return (
    <Layout activeId={hook?.id}>
      {hook ? <HookPage hook={hook} /> : <HomePage />}
    </Layout>
  );
};
