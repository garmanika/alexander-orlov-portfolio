import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function copy(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name), dest = path.join(to, entry.name);
    if (entry.isDirectory()) copy(source, dest);
    else fs.copyFileSync(source, dest);
  }
}
copy(path.join(root, 'src'), path.join(root, 'dist'));
console.log('Build complete: dist/index.html');
