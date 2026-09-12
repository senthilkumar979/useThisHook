import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const playgroundRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: playgroundRoot,
  base: process.env.GITHUB_PAGES === 'true' ? '/usethishook/' : '/',
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
