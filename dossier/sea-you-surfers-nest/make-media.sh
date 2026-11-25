#!/usr/bin/env bash
# dossier/sea-you-surfers-nest/make-media.sh — (re)download every image recorded in dossier.json.
#
# Why a recipe: the images are the property's own uploads on its Booking.com listing (hotel id
# 14923256) and the host's uploads on its two Airbnb listings (1508895627217411616,
# 1793988904511877292). dossier.json keeps the listing page as `source_url` (where the photo was
# found) and the CDN file as `photo_url`; tools/restore-assets.py only reads `source_url`, so this
# recipe fetches `photo_url` instead. No cookies, no login:
#   - Booking (cf.bstatic.com) serves `max2000` with the photo's own `k=` key: long edge 2000 px,
#     taken as served (originals are 3000–5500 px).
#   - Airbnb (a0.muscache.com) serves fixed widths (im_w=720/1200/1440/1920); the harvest picked
#     1920 for landscape and 1440 for portrait, never wider than the original. A portrait over
#     2000 px tall is scaled down to 2000 below.
#
# media: dossier/sea-you-surfers-nest/assets/img-*
#
#   dossier/sea-you-surfers-nest/make-media.sh           # download what is missing, check sha256 against dossier.json
#   dossier/sea-you-surfers-nest/make-media.sh --write   # harvest mode: (re)download all, write sha256/width/height/fetched_at into dossier.json
#
# No videos: the business publishes none (dossier.json videos_note).
#
# Processing: the downloaded bytes are kept as they are (no re-encode, no upscaling); a file over
# 2000 px on the long edge is scaled to 2000 with ffmpeg (Lanczos, q2). Width/height come from
# ffprobe. Needs python3, curl, ffmpeg/ffprobe (no Pillow).
set -euo pipefail
cd "$(dirname "$0")/../.."
D=dossier/sea-you-surfers-nest
[ -e "$D/assets" ] || tools/link-assets.sh sea-you-surfers-nest >/dev/null
python3 - "$D" "$@" <<'PY'
import hashlib, json, os, subprocess, sys, time
from datetime import datetime, timezone
D = sys.argv[1]; WRITE = '--write' in sys.argv[2:]
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
path = os.path.join(D, 'dossier.json')
d = json.load(open(path))
sha = lambda b: hashlib.sha256(b).hexdigest()
def dims(f):
    o = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip()
    w, h = o.split(',')[:2]; return int(w), int(h)
bad = 0; seen = {}
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
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-vf', vf, '-q:v', '2', '-f', 'image2', out], check=True); os.remove(tmp)
    else:
        os.replace(tmp, out)
    data = open(out, 'rb').read()
    if WRITE:
        e['sha256'] = sha(data); e['width'], e['height'] = dims(out)
        e['fetched_at'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        if e['sha256'] in seen:
            print(f"{e['id']}: same bytes as {seen[e['sha256']]}"); bad += 1
        seen[e['sha256']] = e['id']
    elif sha(data) != e.get('sha256'):
        print(f"{e['id']}: sha256 differs from dossier.json (the platform re-encoded or replaced the photo)"); bad += 1
    time.sleep(0.2)
if WRITE:
    json.dump(d, open(path, 'w'), indent=1, ensure_ascii=False); open(path, 'a').write('\n')
print(f"{len(d.get('images', []))} images, {bad} problem(s)")
sys.exit(1 if bad else 0)
PY
