#!/usr/bin/env bash
# dossier/lotus-surf-house/make-media.sh — (re)download every image recorded in dossier.json.
#
# Why a recipe: the images are the property's own photos on its Booking.com listing
# (hotel id 5590766). dossier.json keeps the listing page as `source_url` (where the fact was
# found) and the CDN file as `photo_url`; tools/restore-assets.py only reads `source_url`, so this
# recipe fetches `photo_url` instead. Booking's CDN serves `max1920` with the photo's own `k=` key,
# no cookies, no login.
#
# media: dossier/lotus-surf-house/assets/img-*
#
#   dossier/lotus-surf-house/make-media.sh           # download what is missing, check sha256 against dossier.json
#   dossier/lotus-surf-house/make-media.sh --write   # harvest mode: (re)download all, write sha256/width/height into dossier.json
#
# Videos (assets/video/) are not made here: they are third-party YouTube uploads recorded in
# dossier.json videos[]; tools/fetch-video.mjs re-fetches them from their source_url.
#
# Processing: Booking's max1920 files are already <= 1920 px, so the downloaded bytes are kept as
# they are (no re-encode, no upscaling); a file over 2000 px on the long edge would be scaled to
# 2000 with ffmpeg (Lanczos, q2). Width/height come from ffprobe. Needs python3, curl, ffmpeg/ffprobe
# (no Pillow).
set -euo pipefail
cd "$(dirname "$0")/../.."
D=dossier/lotus-surf-house
[ -e "$D/assets" ] || tools/link-assets.sh lotus-surf-house >/dev/null
python3 - "$D" "$@" <<'PY'
import hashlib, json, os, subprocess, sys, tempfile
D = sys.argv[1]; WRITE = '--write' in sys.argv[2:]
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
path = os.path.join(D, 'dossier.json')
d = json.load(open(path))
sha = lambda b: hashlib.sha256(b).hexdigest()
def dims(f):
    o = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip()
    w, h = o.split(',')[:2]; return int(w), int(h)
bad = 0
for e in d.get('images', []):
    out = os.path.join(D, e['file'])
    if not WRITE and os.path.exists(out) and sha(open(out, 'rb').read()) == e.get('sha256'):
        continue
    r = subprocess.run(['curl', '-s', '-f', '-L', '-m', '120', '--retry', '3', '-A', UA, e['photo_url']], capture_output=True)
    if r.returncode or len(r.stdout) < 1000 or r.stdout[:2] != b'\xff\xd8':
        print(f"{e['id']}: download failed or not a JPEG ({e['photo_url']})"); bad += 1; continue
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = out + '.dl'; open(tmp, 'wb').write(r.stdout)
    w, h = dims(tmp)
    if max(w, h) > 2000:
        vf = 'scale=2000:-2:flags=lanczos' if w >= h else 'scale=-2:2000:flags=lanczos'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-vf', vf, '-q:v', '2', out], check=True); os.remove(tmp)
    else:
        os.replace(tmp, out)
    data = open(out, 'rb').read()
    if WRITE:
        e['sha256'] = sha(data); e['width'], e['height'] = dims(out); e['original_size'] = [w, h]
    elif sha(data) != e.get('sha256'):
        print(f"{e['id']}: sha256 differs from dossier.json (Booking re-encoded or replaced the photo)"); bad += 1
if WRITE:
    json.dump(d, open(path, 'w'), indent=1, ensure_ascii=False); open(path, 'a').write('\n')
print(f"{len(d.get('images', []))} images, {bad} problem(s)")
sys.exit(1 if bad else 0)
PY
