import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const playgroundRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: playgroundRoot,
  // Relative URLs so GitHub Pages casing (/useThisHook vs /usethishook) cannot 404 assets.
  base: process.env.GITHUB_PAGES === 'true' ? './' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      usethishook: path.resolve(playgroundRoot, '../src/index.ts'),
    },
  },
  server: {
    port: 5173,
  },
});
