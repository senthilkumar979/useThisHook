# Social clips

Short playground recordings for X / LinkedIn / Bluesky.

## Assets

| File                                               | Use                                       |
| -------------------------------------------------- | ----------------------------------------- |
| [`useConfirm-clip.mp4`](./useConfirm-clip.mp4)     | LinkedIn / X video (1280×720, ~5s, H.264) |
| [`useConfirm-clip.gif`](./useConfirm-clip.gif)     | X / Bluesky GIF (960×540, looping)        |
| [`useConfirm-poster.png`](./useConfirm-poster.png) | Static preview / thumbnail                |

Demo: [useConfirm playground](https://usethishook.mentorbridge.in/useConfirm)

## Ready-to-post copy

### X / Bluesky

```
Await confirm() in a click handler — no UI kit.

npm i usethishook

→ https://usethishook.mentorbridge.in/useConfirm
```

### LinkedIn

```
React tip: you can await a confirm dialog from a click handler without pulling in a component library.

useThisHook ships promise-based confirm / prompt / overlay / step-flow hooks with zero runtime dependencies (React peer only).

Live demo → https://usethishook.mentorbridge.in/useConfirm
npm i usethishook
```

## Re-record

```bash
npm run playground
# other terminal:
npx playwright install chromium   # once
npm install --no-save playwright  # once per machine if needed
node scripts/record-social-clip.mjs
```
