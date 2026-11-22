import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { getHookById } from './hooksCatalog';
import { redirectLegacyHash, routeFromPathname } from './hookHref';
import { ComparePage } from './pages/ComparePage';
import { HomePage } from './pages/HomePage';
import { HookPage } from './pages/HookPage';
import { McpPage } from './pages/McpPage';
import { seoForRoute } from './routeSeo';
import { applyRouteSeo } from './seo';
import { getSsrPathname } from './ssrPath';

function readInitialRoute() {
  if (typeof window === 'undefined') return routeFromPathname(getSsrPathname());
  redirectLegacyHash();
  return routeFromPathname(window.location.pathname);
}

function pageForRoute(route: string, hook: ReturnType<typeof getHookById>) {
  if (route === 'compare') return <ComparePage />;
  if (route === 'mcp') return <McpPage />;
  if (hook) return <HookPage hook={hook} />;
  return <HomePage />;
}

export const App = () => {
  const [route, setRoute] = useState(readInitialRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(readInitialRoute());
    window.addEventListener('popstate', handlePopState);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = (event.target as Element | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
      if (target.target && target.target !== '_self') return;
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }
      window.history.pushState(null, '', `${url.pathname}${url.search}`);
      setRoute(routeFromPathname(url.pathname));
    };

    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const hook = getHookById(route);

  useEffect(() => {
    applyRouteSeo(seoForRoute(route));
  }, [route]);

  const page = pageForRoute(route, hook);

  return <Layout activeId={hook?.id ?? (route || undefined)}>{page}</Layout>;
};
