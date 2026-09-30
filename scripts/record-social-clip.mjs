/**
 * Records a short playground clip for X / LinkedIn / Bluesky.
 *
 * Prerequisites: playground running locally, Playwright browsers installed.
 *   npm run playground
 *   npx playwright install chromium
 *   node scripts/record-social-clip.mjs
 */
import { chromium } from 'playwright';
import { mkdir, readdir, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs', 'social');
const tmpDir = path.join('/tmp', 'usethishook-record');
const baseUrl = process.argv[2] ?? 'http://127.0.0.1:5173';

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)),
    );
  });
}

await mkdir(outDir, { recursive: true });
await rm(tmpDir, { recursive: true, force: true });
await mkdir(tmpDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
  recordVideo: { dir: tmpDir, size: { width: 1280, height: 720 } },
  colorScheme: 'dark',
});
const page = await context.newPage();

await page.goto(`${baseUrl}/useConfirm`, { waitUntil: 'networkidle' });
await page.waitForSelector('text=Live preview');

// Prefer dark theme for the dialog contrast on social feeds.
// String form so ESLint does not treat browser APIs as Node globals.
await page.evaluate(`(() => {
  document.documentElement.classList.add('dark');
  document.documentElement.style.colorScheme = 'dark';
  try {
    localStorage.setItem('usethishook-theme', 'dark');
  } catch {
    // ignore
  }
})()`);
await page.waitForTimeout(300);

const previewHeading = page.getByRole('heading', { name: 'Live preview' });
await previewHeading.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);

const deleteBtn = page.getByRole('button', { name: 'Delete', exact: true }).first();
await deleteBtn.click();
await page.getByRole('heading', { name: 'Delete invoice?' }).waitFor({ state: 'visible' });
await page.waitForTimeout(1400);

await page.getByRole('button', { name: 'Delete', exact: true }).last().click();
await page.getByText('Deleted').waitFor({ state: 'visible' });
await page.waitForTimeout(1400);

await context.close();
await browser.close();

const videos = (await readdir(tmpDir)).filter((f) => f.endsWith('.webm'));
if (videos.length === 0) throw new Error('No Playwright video recorded');

const webmPath = path.join(tmpDir, videos[0]);
const mp4Path = path.join(outDir, 'useConfirm-clip.mp4');
const gifPath = path.join(outDir, 'useConfirm-clip.gif');
const posterPath = path.join(outDir, 'useConfirm-poster.png');

await run('ffmpeg', [
  '-y',
  '-i',
  webmPath,
  '-vf',
  'fps=30,scale=1280:720:flags=lanczos',
  '-c:v',
  'libx264',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-an',
  mp4Path,
]);

await run('ffmpeg', [
  '-y',
  '-i',
  webmPath,
  '-vf',
  'fps=12,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5',
  '-loop',
  '0',
  gifPath,
]);

// Mid-dialog poster (~2.0s after start with the timing above).
await run('ffmpeg', [
  '-y',
  '-ss',
  '2.0',
  '-i',
  webmPath,
  '-frames:v',
  '1',
  '-update',
  '1',
  '-q:v',
  '2',
  posterPath,
]);

await copyFile(webmPath, path.join(outDir, 'useConfirm-clip.webm'));

console.log(`Wrote:\n  ${mp4Path}\n  ${gifPath}\n  ${posterPath}`);
