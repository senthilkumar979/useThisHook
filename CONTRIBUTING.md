# Contributing

Thanks for helping grow **useThisHook** (npm: `usethishook`).
By participating you agree to the [Code of Conduct](.github/CODE_OF_CONDUCT.md).

## Add a hook

1. Create `src/hooks/useYourHook.ts` (or `.tsx`) with a named export.
2. Re-export it from `src/index.ts`.
3. Add `src/hooks/useYourHook.test.ts` (or `.tsx`).
4. Keep the hook file under 150 lines and TypeScript-strict. Do not add a runtime dependency unless the hook cannot work without it.
5. Document it in the README hook table.
6. Playground (all of these):
   - Catalog entry (`stateHooks.ts`, `browserHooks.ts`, `appHooks.ts`, or `leverageHooks.ts`).
   - Description in `playground/src/descriptions/`.
   - API spec in `playground/src/api/`.
   - Demo component and copy-paste example string in `playground/src/demos/`.

## Checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run playground:build
```

Node 20 or later (`engines.node`).

## Publish

Do not publish from your laptop unless you must. Bump SemVer + CHANGELOG, push `main`, then **Actions → Publish npm**.
