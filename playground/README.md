# Playground

Interactive docs for **useThisHook** (npm: `usethishook`). The home page explains the library and how to install it. Each hook page shows a live component, the API, and copy-paste example code.

From the repository root:

```bash
npm install
npm run playground
```

Then open the URL Vite prints (usually `http://localhost:5173`).

- Home (`#/`): what it is, benefits, install, hook index
- Hook pages (`#/useToggle`, `#/useOverlay`, …): preview + API + example

Build a static site with `npm run playground:build` (output in `playground/dist`). That build uses `base: /` for Vercel and custom domains.

GitHub Pages is a project site at `/useThisHook/`. The Pages build uses a relative Vite `base` (`./`) so asset URLs follow the HTML location and do not 404 on path casing. CI runs `npm run playground:build:pages` and deploys `playground/dist` via [`.github/workflows/pages.yml`](../.github/workflows/pages.yml).

The playground defaults to light mode. Theme choice is stored in `localStorage` under `usethishook-theme`.
