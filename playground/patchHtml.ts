export interface PrerenderHead {
  title: string;
  description: string;
  ogDescription: string;
  canonical: string;
  jsonLd: string;
}

function escapeText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeAttr(value: string) {
  return escapeText(value).replaceAll('"', '&quot;');
}

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  if (pattern.exec(html) == null) throw new Error(`Built HTML is missing ${label}`);
  return html.replace(pattern, replacement);
}

function replaceMeta(html: string, attr: 'name' | 'property', key: string, content: string) {
  const pattern = new RegExp(String.raw`<meta\s[^>]*${attr}="${key}"[^>]*content="[^"]*"[^>]*/>`);
  return replaceOnce(
    html,
    pattern,
    `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`,
    `meta ${attr}="${key}"`,
  );
}

export function patchPrerenderedHtml(template: string, appHtml: string, seo: PrerenderHead) {
  if (!appHtml.trim()) throw new Error(`Empty prerender HTML for ${seo.canonical}`);

  let html = template;
  html = replaceOnce(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${escapeText(seo.title)}</title>`,
    'title',
  );
  html = replaceMeta(html, 'name', 'description', seo.description);
  html = replaceMeta(html, 'property', 'og:title', seo.title);
  html = replaceMeta(html, 'property', 'og:description', seo.ogDescription);
  html = replaceMeta(html, 'property', 'og:url', seo.canonical);
  html = replaceMeta(html, 'name', 'twitter:title', seo.title);
  html = replaceMeta(html, 'name', 'twitter:description', seo.ogDescription);
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    'canonical link',
  );
  html = replaceOnce(
    html,
    /<script type="application\/ld\+json" id="route-jsonld">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="route-jsonld">${seo.jsonLd}</script>`,
    'JSON-LD script',
  );

  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error('Built HTML is missing <div id="root"></div>');
  return hoistLeadingLinks(html.replace(root, `<div id="root">${appHtml}</div>`));
}

/** Move React 19 image preloads out of #root so hydration matches the client shell. */
function hoistLeadingLinks(html: string) {
  const marker = '<div id="root">';
  const start = html.indexOf(marker);
  if (start < 0) return html;
  let cursor = start + marker.length;
  const links: string[] = [];
  while (html.startsWith('<link ', cursor)) {
    const end = html.indexOf('>', cursor);
    if (end < 0) break;
    links.push(html.slice(cursor, end + 1));
    cursor = end + 1;
  }
  const withoutLinks = html.slice(0, start + marker.length) + html.slice(cursor);
  const shell = withoutLinks.slice(start + marker.length, start + marker.length + 4);
  if (!shell.startsWith('<div')) {
    throw new Error('Prerendered #root does not start with the app shell');
  }
  if (links.length === 0) return withoutLinks;
  return withoutLinks.replace('</head>', `${links.join('')}</head>`);
}
