import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects, wrapIndex, contact } from '../src/projects.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(projects.length, 4);
assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
for (const [input, expected] of [[-1,3],[0,0],[1,1],[2,2],[3,3],[4,0],[7,3],[-7,1]]) assert.equal(wrapIndex(input), expected);
assert.throws(() => wrapIndex(1,0), TypeError);
assert.throws(() => wrapIndex(1.5), TypeError);
for (const project of projects) {
  assert(project.name && project.alt && project.description);
  assert(!('headline' in project) && !('subtitle' in project) && !('action' in project) && !('note' in project) && !('nav' in project));
  assert(fs.existsSync(path.join(root,'src',project.image)));
  const url = new URL(project.url);
  assert.equal(url.protocol, 'https:');
}
assert.deepEqual(projects.map(project => new URL(project.url).hostname), ['andys.rest','emcotec.ru','www.artcom.ru','cleanroomshop.ru']);
assert.equal(contact.telegram, '@Garmanika');
assert.equal(contact.email, 'aleks.orlov97@gmail.com');
const html = fs.readFileSync(path.join(root,'src/index.html'),'utf8');
assert(html.includes('lang="ru"'));
assert.equal((html.match(/<h1\b/g)||[]).length,1);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs must be unique');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^https?:/.test(match[1])) continue;
  assert(fs.existsSync(path.join(root,'src',match[1])), 'Missing '+match[1]);
}
for(const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]),'Missing anchor '+match[1]);
assert(html.includes('aria-live="polite"'));
assert(!html.includes('<form'),'No collection of customer data in this static version');
const css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8');
for(const match of css.matchAll(/url\('([^']+)'\)/g)) assert(fs.existsSync(path.join(root,'src',match[1])),'Missing '+match[1]);
assert(css.includes('prefers-reduced-motion'));
assert(css.includes(':focus-visible'));
console.log('PASS: carousel boundaries, four published projects, HTTPS links, owner contacts, unique IDs, anchors, assets, accessibility hooks, no data collection');
