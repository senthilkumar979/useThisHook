import { version } from '../../package.json';
import { getHookById, hooksCatalog } from './hooksCatalog';

export const SITE_ORIGIN = 'https://usethishook.mentorbridge.in';
const REPO = 'https://github.com/senthilkumar979/useThisHook';
const NPM = 'https://www.npmjs.com/package/usethishook';

const hookCount = hooksCatalog.length;

const HOME_TITLE = 'useThisHook — promise dialogs and zero-dep React hooks';
const HOME_DESCRIPTION = `Promise-based confirm/prompt dialogs and ${hookCount} tree-shakeable React hooks. Zero runtime deps, TypeScript, live playground.`;
const HOME_OG_DESCRIPTION = `Promise-based confirm/prompt dialogs and ${hookCount} tree-shakeable React hooks. Zero runtime deps, live playground.`;

const COMPARE_TITLE = 'useThisHook vs usehooks-ts and react-use';
const COMPARE_DESCRIPTION =
  'Compare usethishook with usehooks-ts and react-use: zero runtime deps, promise dialogs, live playground, and MCP for AI tools.';

const MCP_TITLE = 'usethishook-mcp — React hook docs for Cursor and Claude';
const MCP_DESCRIPTION = `MCP server for useThisHook. List, search, and paste APIs for ${hookCount} TypeScript React hooks in Cursor and Claude Desktop.`;

export interface RouteSeo {
  route: string;
  title: string;
  description: string;
  ogDescription: string;
  canonical: string;
  jsonLd: string;
}

const author = {
  '@type': 'Person',
  name: 'Senthil Kumar Thangavel',
  url: 'https://senthilkumar.mentorbridge.in',
};

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function homeJsonLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'useThisHook',
        url: `${SITE_ORIGIN}/`,
        description: HOME_DESCRIPTION,
        publisher: author,
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'usethishook',
        description:
          'Reusable React hooks for everyday UI, state, browser APIs, and promise-based dialogs. Zero runtime dependencies, tree-shakeable, TypeScript.',
        url: `${SITE_ORIGIN}/`,
        codeRepository: REPO,
        programmingLanguage: ['TypeScript', 'JavaScript'],
        runtimePlatform: 'React 18+',
        license: 'https://opensource.org/licenses/MIT',
        downloadUrl: NPM,
        author,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'useThisHook',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: `${SITE_ORIGIN}/`,
        downloadUrl: NPM,
        softwareVersion: version,
        description: HOME_DESCRIPTION,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        license: 'https://opensource.org/licenses/MIT',
        author,
      },
    ],
  });
}

function pageJsonLd(title: string, description: string, canonical: string) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'useThisHook', url: `${SITE_ORIGIN}/` },
  });
}

function routeCopy(route: string) {
  if (route === 'compare') return { title: COMPARE_TITLE, description: COMPARE_DESCRIPTION };
  if (route === 'mcp') return { title: MCP_TITLE, description: MCP_DESCRIPTION };

  const hook = route ? getHookById(route) : undefined;
  if (hook) {
    return {
      title: `${hook.name} React hook — useThisHook`,
      description: `${hook.summary} ${hook.whenToUse} Live demo and API for ${hook.name} from usethishook.`,
    };
  }

  return { title: HOME_TITLE, description: HOME_DESCRIPTION };
}

export function seoForRoute(route: string): RouteSeo {
  const isHome = !route;
  const { title, description } = routeCopy(route);
  const canonical = isHome ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/${route}`;
  const ogDescription = isHome ? HOME_OG_DESCRIPTION : description;

  return {
    route,
    title,
    description,
    ogDescription,
    canonical,
    jsonLd: isHome ? homeJsonLd() : pageJsonLd(title, description, canonical),
  };
}
