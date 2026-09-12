# useThisHook v0.2.0

Copy this into the GitHub Release body (tag `v0.2.0`, target `main`).

Then: **Actions → Publish npm → Run workflow** (requires `NPM_TOKEN`). Do not rely on this tag to publish npm.

---

## Install

```bash
npm install usethishook
```

- [Playground](https://usethishook.mentorbridge.in)
- [GitHub Pages](https://senthilkumar979.github.io/useThisHook/)
- [npm](https://www.npmjs.com/package/usethishook)

## Added

- `useEventListener` — window / document / node / ref listener with a stable handler
- `useTimeout` — one-shot delay (`null` pauses)
- `useHover` — `{ ref, isHovered }`
- `useKeyPress` — key held down; ignores editable fields
- `usePreferredColorScheme` — OS `light` | `dark` via `matchMedia`
- Playground **Home** button in the sidebar
- Smooth-scroll to the top when changing playground routes
