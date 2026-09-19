// Serve every built mockup, one port each. Ctrl-C to stop.
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http';
const root = process.cwd();
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
let port = 8901; const list = [];
for (const slug of fs.readdirSync(path.join(root,'sites')).sort()) {
  const mdir = path.join(root,'sites',slug,'mockups');
  if (!fs.existsSync(mdir)) continue;
  for (const v of ['calm','interactive','unique']) {
    const dist = path.join(mdir, v, 'dist');
    if (!fs.existsSync(dist)) continue;
    const p = port++;
    http.createServer((req,res)=>{
      let f = path.join(dist, decodeURIComponent(req.url.split('?')[0]));
      if (f.endsWith('/')) f += 'index.html';
      fs.readFile(f,(e,b)=> e ? (res.statusCode=404,res.end('404'))
        : (res.setHeader('content-type', types[path.extname(f)]||'application/octet-stream'), res.end(b)));
    }).listen(p);
    list.push({ slug, variant: v, url: `http://localhost:${p}/` });
  }
}
console.table(list);
console.log('serving — leave this running');
