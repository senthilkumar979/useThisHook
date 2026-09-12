# Contributing

Thanks for helping grow **usethishook**.

## Add a hook

1. Create `src/hooks/useYourHook.ts` with a named export.
2. Re-export it from `src/index.ts`.
3. Add `src/hooks/useYourHook.test.ts`.
4. Keep the hook file under 150 lines and TypeScript-strict.
5. Document it in the README table.

## Checks

```bash
npm test
npm run typecheck
npm run build
```
