#!/usr/bin/env bash
# dossier/mutag-meitiv/make-media.sh — (re)download every image and video recorded in dossier.json.
#
# Why a recipe and not tools/restore-assets.py: this harvest keeps PNG transparency (logos, badges,
# cut-out photos) instead of flattening to JPEG, converts one AVIF logo, and its Instagram media
# sit behind expiring CDN URLs that only the public, no-login embed page
# (https://www.instagram.com/p/<code>/embed/captioned/) hands out — so they are re-resolved here
# with a headless browser on every run. No login, no cookies.
#
# media: dossier/mutag-meitiv/assets/img-*
# media: dossier/mutag-meitiv/assets/logo-*
# media: dossier/mutag-meitiv/assets/video/*
#
#   dossier/mutag-meitiv/make-media.sh            # download what is missing, check sha256 against dossier.json
#   dossier/mutag-meitiv/make-media.sh --write    # harvest mode: (re)download all, write sha256/width/height into dossier.json
#   dossier/mutag-meitiv/make-media.sh --videos   # also re-fetch the Instagram videos (tools/fetch-video.mjs, same cuts)
#
# Processing (same rules as tools/restore-assets.py, plus alpha): EXIF rotation applied; long edge
# > 2000 px -> resized to 2000 (Lanczos); an image with transparency stays PNG (optimised); otherwise
# a plain JPEG with no rotation keeps its downloaded bytes, anything else becomes JPEG q88 (resized)
# or q90. Never upscaled. Run from anywhere; needs python3 + Pillow, node + playwright, ffmpeg.
set -euo pipefail
cd "$(dirname "$0")/../.."
D=dossier/mutag-meitiv
export D

# 1. Instagram: resolve fresh CDN URLs (images + videos) from the public embed pages.
codes=$(python3 -c "
import json; d=json.load(open('$D/dossier.json'))
cs={i['instagram']['code']+':'+i['instagram']['kind'] for i in d.get('images',[]) if i.get('instagram')}
cs|={v['instagram']['code']+':'+v['instagram']['kind'] for v in d.get('videos',[]) if v.get('instagram')}
print(' '.join(sorted(cs)))")
if [ -n "$codes" ]; then
  CODES="$codes" node --input-type=module > "$D/assets/.ig-resolved.json" <<'JS'
import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 800, height: 1200 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36' });
const out = {};
for (const ck of process.env.CODES.split(' ')) {
  const [code, kind] = ck.split(':');
  const p = await ctx.newPage();
  try { await p.goto(`https://www.instagram.com/${kind}/${code}/embed/captioned/`, { waitUntil: 'load', timeout: 60000 }); await p.waitForTimeout(3000); } catch {}
  out[code] = await p.evaluate(() => ({
    images: [...document.querySelectorAll('img')].map(i => { const c = (i.srcset || '').split(',').map(s => s.trim().split(' ')).filter(x => x[0]).map(([u, w]) => [u, parseInt(w) || 0]).sort((a, b) => b[1] - a[1]); return c.length ? c[0][0] : i.src; }),
    videos: [...document.querySelectorAll('video')].map(v => v.src).filter(Boolean),
  }));
  await p.close();
}
await b.close();
console.log(JSON.stringify(out));
JS
fi

# 2. Images and logos.
python3 - "$@" <<'PY'
import hashlib, io, json, os, subprocess, sys, tempfile
from PIL import Image, ImageOps
Image.MAX_IMAGE_PIXELS = None
D = os.environ['D']; WRITE = '--write' in sys.argv
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
dj = os.path.join(D, 'dossier.json'); d = json.load(open(dj))
igp = os.path.join(D, 'assets', '.ig-resolved.json'); ig = json.load(open(igp)) if os.path.exists(igp) else {}
sha = lambda b: hashlib.sha256(b).hexdigest()

def fetch(url):
    r = subprocess.run(['curl', '-s', '-f', '-L', '-m', '120', '--retry', '3', '--retry-all-errors', '-A', UA, url], capture_output=True)
    return r.stdout if r.returncode == 0 and len(r.stdout) > 500 else None

def url_of(e):
    i = e.get('instagram')
    if not i: return e['source_url']
    for u in ig.get(i['code'], {}).get('images', []):
        if i['media_key'] in u: return u
    return None

def process(raw):
    try:
        src = Image.open(io.BytesIO(raw)); src.load()
    except Exception:  # AVIF without Pillow support: let ffmpeg decode it
        with tempfile.TemporaryDirectory() as t:
            open(f'{t}/in', 'wb').write(raw); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{t}/in', f'{t}/out.png'], check=True)
            src = Image.open(f'{t}/out.png'); src.load()
    alpha = src.mode in ('RGBA', 'LA', 'PA') or (src.mode == 'P' and 'transparency' in src.info)
    im = ImageOps.exif_transpose(src)
    buf = io.BytesIO()
    if alpha:
        im = im.convert('RGBA')
        if max(im.size) > 2000: im.thumbnail((2000, 2000), Image.LANCZOS)
        im.save(buf, 'PNG', optimize=True); return buf.getvalue(), im.size, 'png'
    im = im.convert('RGB')
    if max(im.size) > 2000:
        im.thumbnail((2000, 2000), Image.LANCZOS); im.save(buf, 'JPEG', quality=88, optimize=True)
    elif src.format == 'JPEG' and src.getexif().get(274, 1) in (1, None):
        return raw, im.size, 'jpg'
    else:
        im.save(buf, 'JPEG', quality=90)
    return buf.getvalue(), im.size, 'jpg'

entries = list(d.get('images', []))
logo = d.get('business', {}).get('logo') or {}
logos = ([logo] if logo.get('source_url') else []) + list(logo.get('variants', []))
bad = 0
for e in entries + logos:
    f = e.get('file') or e.get('value')
    out = os.path.join(D, f)
    if not WRITE and os.path.exists(out) and e.get('sha256') == sha(open(out, 'rb').read()):
        continue
    u = url_of(e)
    raw = fetch(u) if u else None
    if raw is None:
        print('DOWNLOAD FAILED', f, u or e.get('source_url')); bad += 1; continue
    data, size, ext = process(raw)
    if not f.endswith('.' + ext):
        print('EXTENSION MISMATCH', f, ext); bad += 1; continue
    os.makedirs(os.path.dirname(out), exist_ok=True); open(out, 'wb').write(data)
    if WRITE:
        e['sha256'] = sha(data); e['width'], e['height'] = size
    elif e.get('sha256') != sha(data):
        print('DIFFERS', f, size); bad += 1
if WRITE:
    json.dump(d, open(dj, 'w'), ensure_ascii=False, indent=1); open(dj, 'a').write('\n')
    # assets/index.json: image entries rewritten, video entries (tools/fetch-video.mjs) kept
    p = os.path.join(D, 'assets', 'index.json')
    idx = [x for x in (json.load(open(p)) if os.path.exists(p) else []) if x.get('kind') != 'image' or x.get('role') == 'poster']
    new = [dict(id=e['id'], file=e['file'], kind='image', source_url=e['source_url'], fetched_at=e['fetched_at'], license=e['license'],
                license_note=e['license_note'], sha256=e['sha256'], width=e['width'], height=e['height'], usable=e['license'] == 'business-owned')
           for e in entries if e.get('sha256')]
    json.dump(new + idx, open(p, 'w'), ensure_ascii=False, indent=1); open(p, 'a').write('\n')
print(f'{len(entries) + len(logos) - bad} of {len(entries) + len(logos)} images ok')
PY

# 3. Videos (only with --videos): the same cuts as recorded in dossier.json.
if [[ " $* " == *" --videos "* ]]; then
  python3 -c "
import json; d=json.load(open('$D/dossier.json')); ig=json.load(open('$D/assets/.ig-resolved.json'))
for v in d.get('videos',[]):
  i=v.get('instagram')
  if not i or not ig.get(i['code'],{}).get('videos'): continue
  a=[ig[i['code']]['videos'][0],'--license',v['license'],'--license-note',v['license_note']]
  c=v.get('cut')
  a+= (['--start',str(c['start_s']),'--length',str(c['length_s']),'--poster-at',str(v['poster']['at_s']),'--describe',v['shows']] if c else ['--no-renditions'])
  print(json.dumps(a))" | while read -r args; do
    mapfile -t A < <(python3 -c "import json,sys; [print(x) for x in json.loads(sys.argv[1])]" "$args")
    node tools/fetch-video.mjs mutag-meitiv "${A[@]}"
  done
fi
