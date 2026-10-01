// Static file server shared by serve-mockups, check-design, audit-mockup and shoot-mockups.
// serve(dir, port) resolves with the listening server. Never reads outside dir.
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http';

const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.ico':'image/x-icon'};

export const serve = (dir, port) => new Promise((res) => {
  dir = path.resolve(dir);
  const s = http.createServer((req, rp) => {
    let f; try { f = path.join(dir, decodeURIComponent(req.url.split('?')[0])); } catch { f = ''; }
    if (f !== dir && !f.startsWith(dir + path.sep)) { rp.statusCode = 404; return rp.end('404'); } // never outside dir
    if (f.endsWith('/')) f += 'index.html';
    fs.readFile(f, (e, b) => e ? (rp.statusCode = 404, rp.end('404'))
      : (rp.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream'), rp.end(b)));
  }).listen(port, () => res(s));
});
