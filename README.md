# useThisHook

**useThisHook** is an open-source TypeScript library of named React hooks for everyday UI, forms, lists, overlays, and browser APIs. Import only what you need — the package is tree-shakeable.

The npm package name is lowercase: [`usethishook`](https://www.npmjs.com/package/usethishook).

```bash
npm install usethishook
```

**Peer dependency:** React 18 or later (React 19 is supported).

## Why use it

- Drop the same hooks into Vite, Next.js, CRA, or Module Federation hosts.
- Named exports and generated `.d.ts` types — no default export.
- Promise-based overlays, wizards, confirm, and file pick instead of ad-hoc `useEffect` state machines.
- A playground with a live preview, plain-English description, API reference, and copy-paste example for every hook.

## Documentation playground

- Hosted: [usethishook.mentorbridge.in](https://usethishook.mentorbridge.in) (Vercel)
- Mirror: [senthilkumar979.github.io/usethishook](https://senthilkumar979.github.io/usethishook/) (GitHub Pages)

```bash
npm install
npm run playground
```

Open the URL Vite prints (usually `http://localhost:5173`). Light mode is the default; use the sun/moon icon at the top right to switch theme.

- Home (`#/`): what the library is, install, and the hook index
- Hook pages (`#/useToggle`, `#/useConfirm`, …): description, live preview, API, example

See [`playground/README.md`](playground/README.md).

- `npm run playground:build` — static site with `base: /` (Vercel / custom domain)
- `npm run playground:build:pages` — same site with `base: /usethishook/` for project GitHub Pages

Output is `playground/dist`. Hash routes (`#/…`) work on Pages without extra rewrite rules. In the GitHub repo, set **Settings → Pages → Source** to **GitHub Actions**.

## Usage

```tsx
import { useToggle, useDebounce, useLocalStorage } from 'usethishook';

export const SearchBox = () => {
  const { value: isOpen, toggle } = useToggle();
  const [query, setQuery] = useLocalStorage('search', '');
  const debouncedQuery = useDebounce(query, 300);

  return (
    <div>
      <button type="button" onClick={toggle}>
        {isOpen ? 'Hide' : 'Show'} search
      </button>
      {isOpen && (
        <input value={query} onChange={(event) => setQuery(event.target.value)} />
      )}
      <p>Searching for: {debouncedQuery}</p>
    </div>
  );
};
```

Confirm and overlay hooks return a `render()` function. Place it in the tree once:

```tsx
import { useConfirm } from 'usethishook';

export const DeleteButton = () => {
  const { confirm, render } = useConfirm();

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          if (await confirm({ title: 'Delete this row?', danger: true })) {
            // delete
          }
        }}
      >
        Delete
      </button>
      {render()}
    </>
  );
};
```

## Hooks

Playground paths are hash routes on the local docs app (for example `#/useToggle`).

### State

| Hook | Purpose | Preview |
| --- | --- | --- |
| `useToggle` | Boolean with `toggle`, `setTrue`, `setFalse` | `#/useToggle` |
| `useCounter` | Increment, decrement, reset | `#/useCounter` |
| `useDisclosure` | Open / close / toggle for menus and dialogs | `#/useDisclosure` |
| `useDebounce` | Debounce a rapidly changing value | `#/useDebounce` |
| `usePrevious` | Previous render’s value | `#/usePrevious` |
| `useInterval` | Declarative `setInterval` (`null` pauses) | `#/useInterval` |
| `useCopyToClipboard` | Clipboard write + last copied text | `#/useCopyToClipboard` |
| `useLocalStorage` | JSON state persisted in `localStorage` | `#/useLocalStorage` |
| `useDocumentTitle` | Set `document.title` while mounted | `#/useDocumentTitle` |

### Browser

| Hook | Purpose | Preview |
| --- | --- | --- |
| `useOnlineStatus` | `navigator.onLine` plus online/offline events | `#/useOnlineStatus` |
| `useMediaQuery` | Subscribe to a CSS media query | `#/useMediaQuery` |
| `useWindowSize` | Viewport width and height | `#/useWindowSize` |
| `useOnClickOutside` | Handler when the user presses outside a ref | `#/useOnClickOutside` |
| `useOverlay` | Promise-based custom overlay | `#/useOverlay` |
| `useStepFlow` | Multi-step wizard that resolves when finished | `#/useStepFlow` |
| `useAsyncSelect` | Native file picker as a Promise | `#/useAsyncSelect` |

### App

| Hook | Purpose | Preview |
| --- | --- | --- |
| `useStableCallback` | Stable function identity, always-latest body | `#/useStableCallback` |
| `useOnChange` | Callback when a value changes, not on mount | `#/useOnChange` |
| `useResetState` | Local state that resets when a source key changes | `#/useResetState` |
| `useAsyncAction` | Pending / error / data around one async action | `#/useAsyncAction` |
| `useDebouncedCallback` | Debounce calling a function | `#/useDebouncedCallback` |
| `useFields` | Small form object, optional Zod-shaped schema | `#/useFields` |
| `useList` | Insert, update, remove, reorder by `id` | `#/useList` |
| `useSelection` | Single or multi select ids | `#/useSelection` |
| `useSearchState` | URL search params as React state | `#/useSearchState` |
| `useConfirm` | Await a yes/no dialog | `#/useConfirm` |
| `usePrompt` | Await a string from a dialog | `#/usePrompt` |
| `useControllableState` | Controlled and uncontrolled in one setter | `#/useControllableState` |
| `useUnsavedChanges` | Tab-close warning and in-app leave confirm | `#/useUnsavedChanges` |
| `useElementSize` | Element size via `ResizeObserver` | `#/useElementSize` |
| `useInView` | Element vs viewport via `IntersectionObserver` | `#/useInView` |
| `usePagination` | Page, offset, next/prev with clamping | `#/usePagination` |

## Scripts

| Command | What it does |
| --- | --- |
| `npm test` | Vitest (jsdom) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | ESM + CJS + types via tsup (`dist/`) |
| `npm run playground` | Docs app |
| `npm run playground:build` | Static playground |

`prepublishOnly` runs typecheck, tests, and build.

## Local development

```bash
npm install
npm test
npm run build
npm run playground
```

Guidelines for adding a hook: [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Publish

**npm** is the install path for everyone: `npm install usethishook`. That listing does not appear on GitHub Packages by itself — GitHub hosts a second registry.

**GitHub Packages** needs a scoped name (`@owner/package`). The committed `package.json` stays `usethishook` for npm. [`.github/workflows/github-packages.yml`](.github/workflows/github-packages.yml) renames it to `@senthilkumar979/usethishook` only for that publish, then uploads with `GITHUB_TOKEN`.

After you merge the workflow:

1. Repo **Actions** → **Publish GitHub Package** → **Run workflow** (for the current `0.1.0`), or create a GitHub Release.
2. The empty “Get started with GitHub Packages” panel is replaced by the package on the repo sidebar.

Install from GitHub Packages (optional; still requires a GitHub token for the registry):

```bash
npm install @senthilkumar979/usethishook
```

```ini
@senthilkumar979:registry=https://npm.pkg.github.com
```

Later npm releases: `npm version patch|minor|major`, `npm publish --access public`, then run the Packages workflow (or cut a Release) so both registries stay in sync.

## License

**useThisHook** is released under the [MIT License](LICENSE).

Copyright © 2026 **Senthil Kumar Thangavel**.

You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided the copyright notice and permission notice appear in all copies or substantial portions of the software.

The software is provided **“as is”**, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from use of the software.

The full legal text is in [`LICENSE`](LICENSE).

## Author

**Senthil Kumar Thangavel**

- Website: [senthilkumar.mentorbridge.in](https://senthilkumar.mentorbridge.in)
- LinkedIn: [linkedin.com/in/senthilk979](https://www.linkedin.com/in/senthilk979)

Issues and ideas: [GitHub issues](https://github.com/senthilkumar979/usethishook/issues).
