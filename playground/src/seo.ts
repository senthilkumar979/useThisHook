import type { RouteSeo } from './routeSeo';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function applyRouteSeo(seo: RouteSeo) {
  document.title = seo.title;
  setMeta('name', 'description', seo.description);
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.ogDescription);
  setMeta('property', 'og:url', seo.canonical);
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.ogDescription);
  setCanonical(seo.canonical);

  const script = document.getElementById('route-jsonld');
  if (script) script.textContent = seo.jsonLd;
}
