#!/usr/bin/env python3
"""tools/restore-assets.py <slug> — rebuild dossier/<slug>/assets/ images from dossier.json.

Why: Shahar, 2026-09-30 — the Global Surf assets were lost with a worktree. dossier.json records
every image's source_url, original size and sha256, so the files can be fetched again and checked.
Run tools/link-assets.sh <slug> first so they land in the store, not in the checkout.

Same steps as the harvester's first run: download the original, apply EXIF rotation, and
  long edge > 2000 px  -> resize to 2000 (Lanczos), JPEG quality 88, optimised
  otherwise, plain JPEG with no rotation -> the downloaded bytes, unchanged
  otherwise            -> JPEG quality 90
Then compare sha256 with the dossier. Prints one line per file that is missing or differs.
Also fetches business.logo (+ variants) and writes the images' entries of assets/index.json
(video entries already there are kept). Existing files whose sha256 matches are skipped.
"""
import hashlib, io, json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'

if len(sys.argv) != 2:
    sys.exit(__doc__)
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dossier', sys.argv[1])
D = json.load(open(os.path.join(ROOT, 'dossier.json')))
sha = lambda b: hashlib.sha256(b).hexdigest()


def fetch(url):
    r = subprocess.run(['curl', '-s', '-f', '-L', '-m', '120', '--retry', '3', '--retry-all-errors', '-A', UA, url], capture_output=True)
    return r.stdout if r.returncode == 0 and len(r.stdout) > 1000 else None


def image(e):
    out = os.path.join(ROOT, e['file'])
    if os.path.exists(out) and sha(open(out, 'rb').read()) == e['sha256']:
        return e['id'], 'ok'
    raw = fetch(e['source_url'])
    if raw is None:
        return e['id'], 'DOWNLOAD FAILED ' + e['source_url']
    try:
        src = Image.open(io.BytesIO(raw))
    except Exception:  # the URL now serves something else (an expired CDN link, a login page)
        return e['id'], 'NOT AN IMAGE ANY MORE ' + e['source_url']
    im = ImageOps.exif_transpose(src).convert('RGB')
    buf = io.BytesIO()
    if max(im.size) > 2000:
        im.thumbnail((2000, 2000), Image.LANCZOS)
        im.save(buf, 'JPEG', quality=88, optimize=True)
        data = buf.getvalue()
    elif src.format == 'JPEG' and src.getexif().get(274, 1) in (1, None):
        data = raw
    else:
        im.save(buf, 'JPEG', quality=90)
        data = buf.getvalue()
    open(out, 'wb').write(data)
    if sha(data) == e['sha256']:
        return e['id'], 'ok'
    w, h = Image.open(io.BytesIO(data)).size
    same = (w, h) == (e['width'], e['height'])
    return e['id'], f"DIFFERS from the dossier sha256 ({w}x{h}, {'same size' if same else 'size was %sx%s' % (e['width'], e['height'])})"


os.makedirs(os.path.join(ROOT, 'assets'), exist_ok=True)
images = D.get('images', [])
with ThreadPoolExecutor(4) as ex:
    res = list(ex.map(image, images))
bad = [(i, s) for i, s in res if s != 'ok']
for i, s in bad:
    print(i, s)
print(f'{len(res) - len(bad)} of {len(res)} images match the dossier')

logo = (D.get('business') or {}).get('logo') or {}
for f, u in [(logo.get('value'), logo.get('source_url'))] + [(v.get('file'), v.get('source_url')) for v in logo.get('variants', [])]:
    if f and u and not os.path.exists(os.path.join(ROOT, f)):
        r = subprocess.run(['curl', '-s', '-f', '-L', '-m', '60', '--retry', '3', '--retry-all-errors', '-A', UA, '-o', os.path.join(ROOT, f), u])
        print(f, 'ok' if r.returncode == 0 else 'DOWNLOAD FAILED')

p = os.path.join(ROOT, 'assets', 'index.json')
idx = json.load(open(p)) if os.path.exists(p) else []
idx = [x for x in idx if x.get('kind') != 'image' or x.get('role') == 'poster']
ok = {i for i, s in res if s == 'ok'}
new = [dict(id=e['id'], file=e['file'], kind='image', source_url=e['source_url'], fetched_at=e['fetched_at'],
            license=e['license'], license_note=e['license_note'], sha256=e['sha256'], width=e['width'],
            height=e['height'], usable=True) for e in images if e['id'] in ok]
json.dump(new + idx, open(p, 'w'), indent=1)
open(p, 'a').write('\n')
