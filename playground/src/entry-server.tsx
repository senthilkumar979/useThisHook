import { renderToString } from 'react-dom/server';
import { DocumentApp } from './DocumentApp';
import { playgroundBase, routeFromPathname } from './hookHref';
import { hooksCatalog } from './hooksCatalog';
import { seoForRoute } from './routeSeo';
import { setSsrPathname } from './ssrPath';

export function listRouteIds() {
  return ['', 'compare', 'mcp', ...hooksCatalog.map((hook) => hook.id)];
}

export function renderRoute(id: string) {
  const pathname = `${playgroundBase()}${id}`;
  setSsrPathname(pathname);
  const route = routeFromPathname(pathname);
  if (route !== id) {
    throw new Error(`Prerender route mismatch for "${id}" (${pathname} -> "${route}")`);
  }

  return {
    html: renderToString(<DocumentApp />),
    seo: seoForRoute(id),
  };
}
