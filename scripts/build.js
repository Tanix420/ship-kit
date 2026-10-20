// Build script: copies public/ -> dist/ and writes build-info.json.
// Deliberately simple so an agent can read all of it in one sitting.
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'dist');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const entry of fs.readdirSync(SRC)) {
  fs.copyFileSync(path.join(SRC, entry), path.join(OUT, entry));
}

let commit = 'unknown';
try {
  commit = execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim();
} catch {
  // not a git checkout (e.g. downloaded zip) — fine, record unknown
}

fs.writeFileSync(
  path.join(OUT, 'build-info.json'),
  JSON.stringify({ builtAt: new Date().toISOString(), commit, kit: 'ship-kit-lite' }, null, 2)
);

console.log(`built dist/ from public/ (commit: ${commit})`);
