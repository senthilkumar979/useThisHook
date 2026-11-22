/**
 * After `vite build`, render each playground route to static HTML and
 * write per-page <title>, description, canonical, and JSON-LD.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { patchPrerenderedHtml, type PrerenderHead } from './patchHtml';

process.env.NODE_ENV = 'production';

const playgroundRoot = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(playgroundRoot, 'dist');

interface RenderedRoute {
  html: string;
  seo: PrerenderHead;
}

interface ServerEntry {
  listRouteIds: () => string[];
  renderRoute: (id: string) => RenderedRoute;
}

function assertContent(id: string, html: string) {
  const checks: Record<string, string> = {
    '': 'useDebounce',
    compare: 'usehooks-ts',
    mcp: 'usethishook-mcp',
    useConfirm: 'useConfirm',
  };
  const needle = checks[id];
  if (needle && !html.includes(needle)) {
    throw new Error(`Prerendered /${id} HTML is missing "${needle}"`);
  }
}

async function main() {
  const indexPath = path.join(outDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Missing ${indexPath}. Run vite build before prerender.`);
  }
  const template = fs.readFileSync(indexPath, 'utf8');

  const server = await createServer({
    configFile: path.join(playgroundRoot, 'vite.config.ts'),
    mode: 'production',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    logLevel: 'warn',
  });

  try {
    const entry = (await server.ssrLoadModule('/src/entry-server.tsx')) as ServerEntry;
    const ids = entry.listRouteIds();
    for (const id of ids) {
      const rendered = entry.renderRoute(id);
      assertContent(id, rendered.html);
      const page = patchPrerenderedHtml(template, rendered.html, rendered.seo);
      assertContent(id, page);
      if (!id) {
        fs.writeFileSync(indexPath, page);
        continue;
      }
      const dir = path.join(outDir, id);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), page);
    }
    fs.copyFileSync(indexPath, path.join(outDir, '404.html'));
    console.log(`Prerendered ${ids.length} routes into ${outDir}`);
  } finally {
    await server.close();
  }
}

await main();
