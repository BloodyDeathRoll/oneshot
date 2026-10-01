// Serve every built mockup, one port each. Ctrl-C to stop.
import fs from 'node:fs'; import path from 'node:path';
import { serve } from './_serve.mjs';
const root = process.cwd();
let port = 8901; const list = [];
for (const slug of fs.readdirSync(path.join(root,'sites')).sort()) {
  const mdir = path.join(root,'sites',slug,'mockups');
  if (!fs.existsSync(mdir)) continue;
  for (const v of ['calm','interactive','unique']) {
    const dist = path.join(mdir, v, 'dist');
    if (!fs.existsSync(dist)) continue;
    const p = port++;
    serve(dist, p);
    list.push({ slug, variant: v, url: `http://localhost:${p}/` });
  }
}
console.table(list);
console.log('serving — leave this running');
