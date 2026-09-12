# useThisHook

[![npm](https://img.shields.io/npm/v/usethishook.svg)](https://www.npmjs.com/package/usethishook)
[![license](https://img.shields.io/npm/l/usethishook.svg)](LICENSE)
[![CI](https://github.com/senthilkumar979/useThisHook/actions/workflows/ci.yml/badge.svg)](https://github.com/senthilkumar979/useThisHook/actions/workflows/ci.yml)

**useThisHook** is an open-source TypeScript library of named React hooks for everyday UI, forms, lists, overlays, and browser APIs. Import only what you need — the package is tree-shakeable.

The npm package name is lowercase: [`usethishook`](https://www.npmjs.com/package/usethishook).

```bash
npm install usethishook
```

**Peer dependencies:** React 18 or later, and **React DOM** 18 or later for confirm, prompt, overlay, and step-flow hooks (React 19 is supported).

## Why use it

- Drop the same hooks into Vite, Next.js, CRA, or Module Federation hosts.
- Named exports and generated `.d.ts` types — no default export.
- Promise-based overlays, wizards, confirm, and file pick instead of ad-hoc `useEffect` state machines.
- A playground with a live preview, plain-English description, API reference, and copy-paste example for every hook.

## Documentation playground

- Hosted: [usethishook.mentorbridge.in](https://usethishook.mentorbridge.in) (Vercel)
- Mirror: [senthilkumar979.github.io/useThisHook](https://senthilkumar979.github.io/useThisHook/) (GitHub Pages)

```bash
npm install
npm run playground
```

Open the URL Vite prints (usually `http://localhost:5173`). Light mode is the default; use the sun/moon icon at the top right to switch theme.

- Home (`#/`): what the library is, install, and the hook index
- Hook pages (`#/useToggle`, `#/useConfirm`, …): description, live preview, API, example

See [`playground/README.md`](playground/README.md).

- `npm run playground:build` — static site with `base: /` (Vercel / custom domain)
- `npm run playground:build:pages` — same site with `base: /useThisHook/` for project GitHub Pages

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
      {isOpen && <input value={query} onChange={(event) => setQuery(event.target.value)} />}
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

| Hook                 | Purpose                                      | Preview                |
| -------------------- | -------------------------------------------- | ---------------------- |
| `useToggle`          | Boolean with `toggle`, `setTrue`, `setFalse` | `#/useToggle`          |
| `useCounter`         | Increment, decrement, reset                  | `#/useCounter`         |
| `useDisclosure`      | Open / close / toggle for menus and dialogs  | `#/useDisclosure`      |
| `useDebounce`        | Debounce a rapidly changing value            | `#/useDebounce`        |
| `usePrevious`        | Previous render’s value                      | `#/usePrevious`        |
| `useInterval`        | Declarative `setInterval` (`null` pauses)    | `#/useInterval`        |
| `useCopyToClipboard` | Clipboard write + last copied text           | `#/useCopyToClipboard` |
| `useLocalStorage`    | JSON state persisted in `localStorage`       | `#/useLocalStorage`    |
| `useDocumentTitle`   | Set `document.title` while mounted           | `#/useDocumentTitle`   |

### Browser

| Hook                      | Purpose                                       | Preview                     |
| ------------------------- | --------------------------------------------- | --------------------------- |
| `useOnlineStatus`         | `navigator.onLine` plus online/offline events | `#/useOnlineStatus`         |
| `useMediaQuery`           | Subscribe to a CSS media query                | `#/useMediaQuery`           |
| `useWindowSize`           | Viewport width and height                     | `#/useWindowSize`           |
| `useOnClickOutside`       | Handler when the user presses outside a ref   | `#/useOnClickOutside`       |
| `useOverlay`              | Promise-based custom overlay                  | `#/useOverlay`              |
| `useStepFlow`             | Multi-step wizard that resolves when finished | `#/useStepFlow`             |
| `useAsyncSelect`          | Native file picker as a Promise               | `#/useAsyncSelect`          |
| `useEventListener`        | DOM / window listener with a stable handler   | `#/useEventListener`        |
| `useTimeout`              | One-shot timer (`null` pauses)                | `#/useTimeout`              |
| `useHover`                | Pointer over a ref                            | `#/useHover`                |
| `useKeyPress`             | Key held down (ignores inputs)                | `#/useKeyPress`             |
| `usePreferredColorScheme` | OS `prefers-color-scheme`                     | `#/usePreferredColorScheme` |

### App

| Hook                   | Purpose                                           | Preview                  |
| ---------------------- | ------------------------------------------------- | ------------------------ |
| `useStableCallback`    | Stable function identity, always-latest body      | `#/useStableCallback`    |
| `useOnChange`          | Callback when a value changes, not on mount       | `#/useOnChange`          |
| `useResetState`        | Local state that resets when a source key changes | `#/useResetState`        |
| `useAsyncAction`       | Pending / error / data around one async action    | `#/useAsyncAction`       |
| `useDebouncedCallback` | Debounce calling a function                       | `#/useDebouncedCallback` |
| `useFields`            | Small form object, optional Zod-shaped schema     | `#/useFields`            |
| `useList`              | Insert, update, remove, reorder by `id`           | `#/useList`              |
| `useSelection`         | Single or multi select ids                        | `#/useSelection`         |
| `useSearchState`       | URL search params as React state                  | `#/useSearchState`       |
| `useConfirm`           | Await a yes/no dialog                             | `#/useConfirm`           |
| `usePrompt`            | Await a string from a dialog                      | `#/usePrompt`            |
| `useControllableState` | Controlled and uncontrolled in one setter         | `#/useControllableState` |
| `useUnsavedChanges`    | Tab-close warning and in-app leave confirm        | `#/useUnsavedChanges`    |
| `useElementSize`       | Element size via `ResizeObserver`                 | `#/useElementSize`       |
| `useInView`            | Element vs viewport via `IntersectionObserver`    | `#/useInView`            |
| `usePagination`        | Page, offset, next/prev with clamping             | `#/usePagination`        |

## Server rendering

Hooks that read `window`, `document`, `navigator`, or observers are safe to _call_ on the server when they fall back (typical values: `false`, `{ width: 0, height: 0 }`, or an empty query). They subscribe after mount.

- `useMediaQuery`, `useWindowSize`, `useOnlineStatus`, `useLocalStorage`, `useSearchState`, `useDocumentTitle`, `useOnClickOutside`, `useElementSize`, `useInView`, `useUnsavedChanges`, `useEventListener`, `useTimeout`, `useHover`, `useKeyPress`, and `usePreferredColorScheme` must not assume a browser until after hydration.
- Confirm, prompt, overlay, and step-flow still need `render()` in the client tree.

## Scripts

| Command                    | What it does                         |
| -------------------------- | ------------------------------------ |
| `npm test`                 | Vitest (jsdom)                       |
| `npm run typecheck`        | Library + playground `tsc --noEmit`  |
| `npm run lint`             | ESLint + Prettier check              |
| `npm run build`            | ESM + CJS + types via tsup (`dist/`) |
| `npm run playground`       | Docs app                             |
| `npm run playground:build` | Static playground (`base: /`)        |

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

**npm** is the install path for everyone: `npm install usethishook`. Publishing to the public registry is **manual only** — it does not run on push.

1. Bump `version` in `package.json` and add a [`CHANGELOG.md`](CHANGELOG.md) section in the same commit.
2. Add a repo secret named `NPM_TOKEN` (npm access token with publish rights). Publish stays **Actions → Publish npm → Run workflow** — never on push.
3. After publish, link the npm package on the GitHub repo if it is not already connected.

[`.github/workflows/npm-publish.yml`](.github/workflows/npm-publish.yml) runs `npm publish --access public`. `prepublishOnly` still typechecks, tests, and builds.

**GitHub Packages** is a second registry and also does not publish on push. It needs a scoped name (`@owner/package`). The committed `package.json` stays `usethishook`. [`.github/workflows/github-packages.yml`](.github/workflows/github-packages.yml) renames it to `@senthilkumar979/usethishook` only for that job.

**Actions → Publish GitHub Package → Run workflow**, or create a GitHub Release.

Install from GitHub Packages (optional; still requires a GitHub token for the registry):

```bash
npm install @senthilkumar979/usethishook
```

```ini
@senthilkumar979:registry=https://npm.pkg.github.com
```

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

Issues and ideas: [GitHub issues](https://github.com/senthilkumar979/useThisHook/issues).
