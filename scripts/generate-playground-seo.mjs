#!/usr/bin/env node
/**
 * Writes playground/public/robots.txt, sitemap.xml, llms.txt, and llms-full.txt.
 * Hook copy comes from mcp/data/catalog.json, which is generated from playground source.
 * Run before playground builds: npm run playground:seo
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'playground/public');
const hooksDir = path.join(root, 'src/hooks');
const catalogPath = path.join(root, 'mcp/data/catalog.json');
const SITE = 'https://usethishook.mentorbridge.in';
const NPM = 'https://www.npmjs.com/package/usethishook';
const GITHUB = 'https://github.com/senthilkumar979/useThisHook';

const hookIds = fs
  .readdirSync(hooksDir)
  .filter((name) => /^use[A-Za-z0-9]+\.(ts|tsx)$/.test(name))
  .map((name) => name.replace(/\.(ts|tsx)$/, ''))
  .filter((id) => id !== 'dialogFrame')
  .sort((a, b) => a.localeCompare(b));

const urls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/compare`, priority: '0.9' },
  { loc: `${SITE}/mcp`, priority: '0.9' },
  ...hookIds.map((id) => ({ loc: `${SITE}/${id}`, priority: '0.8' })),
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

# LLM catalogs: ${SITE}/llms.txt and ${SITE}/llms-full.txt
Sitemap: ${SITE}/sitemap.xml
`;

function oneLine(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadCatalog() {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const catalogIds = catalog.hooks.map((hook) => hook.id).sort((a, b) => a.localeCompare(b));
  if (catalogIds.join('\n') !== hookIds.join('\n')) {
    throw new Error(
      'mcp/data/catalog.json is out of sync with src/hooks. Run npm run mcp:catalog.',
    );
  }
  return catalog;
}

function hookSections(hooks) {
  const groups = new Map();
  for (const hook of hooks) {
    const list = groups.get(hook.category) ?? [];
    list.push(hook);
    groups.set(hook.category, list);
  }
  return [...groups.entries()]
    .map(([category, entries]) => {
      const lines = entries.map(
        (hook) => `- [${hook.name}](${SITE}/${hook.id}): ${oneLine(hook.summary)}`,
      );
      return `## ${category}\n\n${lines.join('\n')}`;
    })
    .join('\n\n');
}

function buildLlms(catalog) {
  const count = catalog.hooks.length;
  return `# useThisHook

> Promise-based confirm/prompt dialogs and ${count} tree-shakeable React hooks. Zero runtime dependencies, TypeScript, SSR-safe.

Install with \`npm i usethishook\`. React 18+ is the only peer dependency.

- Docs: ${SITE}/
- npm: ${NPM}
- GitHub: ${GITHUB}
- Full hook reference: ${SITE}/llms-full.txt

## Docs

- [Home](${SITE}/): Install command, hook index, and what the library is for
- [Compare](${SITE}/compare): useThisHook vs usehooks-ts and react-use
- [MCP](${SITE}/mcp): usethishook-mcp for Cursor and Claude Desktop

${hookSections(catalog.hooks)}
`;
}

function buildLlmsFull(catalog) {
  const count = catalog.hooks.length;
  const hooks = catalog.hooks
    .map((hook) => {
      return `## ${hook.name}

Category: ${hook.category}

${oneLine(hook.summary)}

${oneLine(hook.whenToUse)}

${oneLine(hook.description)}

Signature: \`${hook.api.signature}\`

\`\`\`tsx
${hook.example.trim()}
\`\`\`

- Docs: ${SITE}/${hook.id}
- Import: \`${hook.import}\`
`;
    })
    .join('\n');

  return `# useThisHook

> Promise-based confirm/prompt dialogs and ${count} tree-shakeable React hooks. Zero runtime dependencies, TypeScript, SSR-safe. This file is the expanded catalog for language models.

Install: \`npm i usethishook\`

- Docs: ${SITE}/
- npm: ${NPM}
- GitHub: ${GITHUB}
- Short catalog: ${SITE}/llms.txt

${hooks}`;
}

const catalog = loadCatalog();
const llms = buildLlms(catalog);
const llmsFull = buildLlmsFull(catalog);
if (llms.includes('<div id="root">') || llmsFull.includes('<html')) {
  throw new Error('llms.txt generation produced HTML');
}

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull);
console.log(
  `Wrote robots.txt, sitemap.xml (${urls.length} URLs), llms.txt, and llms-full.txt (${catalog.hooks.length} hooks)`,
);
