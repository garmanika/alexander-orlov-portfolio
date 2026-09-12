import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
const port = '4189';
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['scripts/serve.mjs'], { env: { ...process.env, PORT: port }, stdio: 'inherit' });
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    await setTimeout(100);
    if (server.exitCode !== null) throw new Error('Test server exited before readiness');
    try { ready = (await fetch(base)).ok; } catch {}
    if (ready) break;
  }
  if (!ready) throw new Error('Test server did not start');
  const test = spawn(process.execPath, ['tests/browser.cjs'], { env: { ...process.env, TEST_BASE_URL: base }, stdio: 'inherit' });
  process.exitCode = await new Promise((resolve, reject) => { test.on('error', reject); test.on('exit', code => resolve(code ?? 1)); });
} finally {
  server.kill();
}
