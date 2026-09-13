# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Bump `version` in `package.json` in the same change as the notes below, then run
**Actions → Publish npm** (manual). Create GitHub Release **vX.Y.Z** from the matching section.
Do not publish from a push or tag.

## [0.3.0] - 2026-09-13

### Added

- `useBoolean(initialValue: boolean)` — required `true` or `false`, plus `toggle`, `setTrue`, `setFalse`, `setValue`

### Removed

- `useToggle`, `useCounter`, `usePrevious`, `useDocumentTitle`, `useHover`, `usePreferredColorScheme`, `useOnChange`

## [0.2.0] - 2026-09-12

### Added

- `useEventListener` — window / document / node / ref listener with a stable handler
- `useTimeout` — one-shot delay (`null` pauses)
- `useHover` — `{ ref, isHovered }`
- `useKeyPress` — key held down; ignores editable fields
- `usePreferredColorScheme` — OS `light` | `dark` via `matchMedia`
- Playground **Home** control in the sidebar
- Smooth-scroll to top when changing playground routes
- Radix Scroll Area on the playground sidebar hook list

## [0.1.1] - 2026-09-12

### Changed

- `repository` and `bugs` URLs use the camelCase GitHub repo `useThisHook`.
- Playground GitHub Pages build uses relative asset URLs so `/useThisHook/` loads scripts.

## [0.1.0] - 2026-09-12

### Added

- First public release of `usethishook` with state, browser, and app hooks.
- Playground documentation with live previews and API reference.
