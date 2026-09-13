import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const SELF = 'scripts/check-secrets.mjs';

const patterns = [
  /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,
  /-----BEGIN PGP PRIVATE KEY BLOCK-----/,
  /ghp_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /npm_[A-Za-z0-9]{20,}/,
];

function linesMatch(text) {
  return text.split('\n').find((line) => patterns.some((pattern) => pattern.test(line)));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function addedLinesFromCachedDiff() {
  try {
    return execFileSync(
      'git',
      ['diff', '--cached', '--diff-filter=ACM', '-U0', '--', '.', `:(exclude)${SELF}`],
      { encoding: 'utf8' },
    )
      .split('\n')
      .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
      .map((line) => line.slice(1))
      .join('\n');
  } catch {
    return '';
  }
}

const stagedHit = linesMatch(addedLinesFromCachedDiff());
if (stagedHit) fail('Refusing commit: staged diff looks like a secret or private key.');

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

for (const file of tracked) {
  if (file === 'package-lock.json' || file.endsWith('.svg') || file === SELF) continue;
  try {
    if (linesMatch(readFileSync(file, 'utf8'))) {
      fail(`Refusing: ${file} looks like it contains a secret or private key.`);
    }
  } catch {
    continue;
  }
}
