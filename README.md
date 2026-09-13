# useThisHook

**The React hooks you actually ship — zero runtime dependencies.**

Named, typed, tree-shakeable hooks for UI, state, forms, lists, overlays, and the browser. You already have React. That is enough.

[![npm](https://img.shields.io/npm/v/usethishook.svg)](https://www.npmjs.com/package/usethishook)
[![license](https://img.shields.io/npm/l/usethishook.svg)](LICENSE)
[![CI](https://github.com/senthilkumar979/useThisHook/actions/workflows/ci.yml/badge.svg)](https://github.com/senthilkumar979/useThisHook/actions/workflows/ci.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/usethishook)](https://bundlephobia.com/package/usethishook)
[![types](https://img.shields.io/npm/types/usethishook.svg)](https://www.npmjs.com/package/usethishook)

```bash
npm install usethishook
```

Install **`usethishook`**. The product is **useThisHook**. Peers: **React 18+** and **React DOM 18+** (React 19 supported). Confirm, prompt, overlay, and step-flow need `react-dom`.

**Try it live:** [usethishook.mentorbridge.in](https://usethishook.mentorbridge.in) · [GitHub Pages](https://senthilkumar979.github.io/useThisHook/)

---

## Why teams pick it

| | |
| --- | --- |
| **0 runtime dependencies** | The published package has no `dependencies` block. No lodash, no date lib, no mystery `node_modules` tax on every consumer. |
| **You already pay for React** | Peers only. Hooks sit on `useState`, `useEffect`, and browser APIs you already trust. |
| **Tree-shake by import** | Named exports, `sideEffects: false`, ESM + CJS + `.d.ts`. Import `useBoolean` — leave the rest on the floor. |
| **TypeScript first** | Public types ship with the build. No `@types` package. No default export. |
| **SSR-aware** | Window, storage, and observers fall back on the server and subscribe after hydration. |
| **Promised UI, not effect soup** | Confirm, prompt, overlay, file pick, and multi-step flows return values you can `await` in a click handler. |

Works in **Vite, Next.js, CRA, and Module Federation** hosts — same import, same types.

---

## Sixty seconds

```tsx
import { useBoolean, useDebounce, useLocalStorage } from 'usethishook';

export const SearchBox = () => {
  const { value: isOpen, toggle } = useBoolean(false);
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

Dialogs that behave like functions:

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

Place `render()` once in the tree. That is the whole overlay contract.

---

## What you get

**31 hooks.** State that stays honest. Browser APIs without leftover listeners. App primitives for forms, lists, URLs, and leave-guards.

Each hook has a playground page: why it exists, a live preview, an API table, and a copy-paste example.

### State

| Hook                 | Purpose                                      | Preview                |
| -------------------- | -------------------------------------------- | ---------------------- |
| `useBoolean`         | Boolean with required `true` / `false` start | `#/useBoolean`         |
| `useDisclosure`      | Open / close / toggle for menus and dialogs  | `#/useDisclosure`      |
| `useDebounce`        | Debounce a rapidly changing value            | `#/useDebounce`        |
| `useInterval`        | Declarative `setInterval` (`null` pauses)    | `#/useInterval`        |
| `useCopyToClipboard` | Clipboard write + last copied text           | `#/useCopyToClipboard` |
| `useLocalStorage`    | JSON state persisted in `localStorage`       | `#/useLocalStorage`    |

### Browser

| Hook                | Purpose                                       | Preview               |
| ------------------- | --------------------------------------------- | --------------------- |
| `useOnlineStatus`   | `navigator.onLine` plus online/offline events | `#/useOnlineStatus`   |
| `useMediaQuery`     | Subscribe to a CSS media query                | `#/useMediaQuery`     |
| `useWindowSize`     | Viewport width and height                     | `#/useWindowSize`     |
| `useOnClickOutside` | Handler when the user presses outside a ref   | `#/useOnClickOutside` |
| `useOverlay`        | Promise-based custom overlay                  | `#/useOverlay`        |
| `useStepFlow`       | Multi-step wizard that resolves when finished | `#/useStepFlow`       |
| `useAsyncSelect`    | Native file picker as a Promise               | `#/useAsyncSelect`    |
| `useEventListener`  | DOM / window listener with a stable handler   | `#/useEventListener`  |
| `useTimeout`        | One-shot timer (`null` pauses)                | `#/useTimeout`        |
| `useKeyPress`       | Key held down (ignores inputs)                | `#/useKeyPress`       |

### App

| Hook                   | Purpose                                           | Preview                  |
| ---------------------- | ------------------------------------------------- | ------------------------ |
| `useStableCallback`    | Stable function identity, always-latest body      | `#/useStableCallback`    |
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

Preview paths are hash routes on the docs app (`#/useBoolean`, …).

---

## Playground

- **Hosted:** [usethishook.mentorbridge.in](https://usethishook.mentorbridge.in)
- **Mirror:** [senthilkumar979.github.io/useThisHook](https://senthilkumar979.github.io/useThisHook/)

```bash
npm install
npm run playground
```

Open the URL Vite prints (usually `http://localhost:5173`). Light mode is the default; use the sun/moon control to switch theme.

- Home (`#/`): product story, install, hook index
- Hook pages: description, live preview, API, example

See [`playground/README.md`](playground/README.md).

- `npm run playground:build` — static site, `base: /` (Vercel / custom domain)
- `npm run playground:build:pages` — `base: /useThisHook/` for project GitHub Pages

Output is `playground/dist`. Hash routes work on Pages without extra rewrites. Repo **Settings → Pages → Source → GitHub Actions**.

---

## Server rendering

Hooks that read `window`, `document`, `navigator`, or observers are safe to _call_ on the server. They fall back (`false`, `{ width: 0, height: 0 }`, empty query) and subscribe after mount.

- `useMediaQuery`, `useWindowSize`, `useOnlineStatus`, `useLocalStorage`, `useSearchState`, `useOnClickOutside`, `useElementSize`, `useInView`, `useUnsavedChanges`, `useEventListener`, `useTimeout`, and `useKeyPress` must not assume a browser until after hydration.
- Confirm, prompt, overlay, and step-flow still need `render()` in the client tree.

---

## Scripts

| Command                    | What it does                         |
| -------------------------- | ------------------------------------ |
| `npm test`                 | Vitest (jsdom)                       |
| `npm run typecheck`        | Library + playground `tsc --noEmit`  |
| `npm run lint`             | ESLint + Prettier check              |
| `npm run build`            | ESM + CJS + types via tsup (`dist/`) |
| `npm run playground`       | Docs app                             |
| `npm run playground:build` | Static playground (`base: /`)        |
| `npm run verify:commit`    | Secrets, lint, types, tests, build   |
| `npm run verify:push`      | Playground build + `npm audit`       |

`prepare` installs Husky. Commits run `verify:commit`; pushes run `verify:push`. `prepublishOnly` is `verify:commit`.

```bash
npm install
npm test
npm run build
npm run playground
```

Add a hook: [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## Publish

**npm** is the path everyone uses: `npm install usethishook`. Publishing is **manual** — it does not run on push.

1. Bump `version` in `package.json` and add a [`CHANGELOG.md`](CHANGELOG.md) section in the same commit.
2. On [npmjs.com/package/usethishook](https://www.npmjs.com/package/usethishook) → **Settings → Trusted Publisher**, add GitHub Actions:
   - Repository: `senthilkumar979/useThisHook`
   - Workflow filename: `npm-publish.yml` (exact; no path)
   - Environment: leave empty
3. **Actions → Publish npm → Run workflow.** The job uses OIDC (`id-token: write`). Do not set `NODE_AUTH_TOKEN` on that step — a 2FA publish token fails CI with `EOTP`.

[`.github/workflows/npm-publish.yml`](.github/workflows/npm-publish.yml) runs `npm publish --access public`. `prepublishOnly` still typechecks, tests, and builds.

**GitHub Packages** is optional and also not on push. The committed name stays `usethishook`. [`.github/workflows/github-packages.yml`](.github/workflows/github-packages.yml) publishes `@senthilkumar979/usethishook` for that job only.

```bash
npm install @senthilkumar979/usethishook
```

```ini
@senthilkumar979:registry=https://npm.pkg.github.com
```

---

## License

**useThisHook** is [MIT](LICENSE). Copyright © 2026 **Senthil Kumar Thangavel**.

Use it, ship it, fork it. The software is provided **“as is”**, without warranty. Full text: [`LICENSE`](LICENSE).

## Author

**Senthil Kumar Thangavel**

- [senthilkumar.mentorbridge.in](https://senthilkumar.mentorbridge.in)
- [linkedin.com/in/senthilk979](https://www.linkedin.com/in/senthilk979)
- [GitHub issues](https://github.com/senthilkumar979/useThisHook/issues)
