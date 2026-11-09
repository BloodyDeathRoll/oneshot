#!/usr/bin/env bash
# dossier/panta-rei-resort/make-media.sh — (re)download every image recorded in dossier.json.
#
# Why a recipe: the images are the property's own uploads on its Wix site (pantareiresort.com,
# static.wixstatic.com/media originals) and the room photos on its own direct-booking engine
# (Hostaway, pantareiresort.holidayfuture.com, bookingenginecdn.hostaway.com originals).
# dossier.json keeps the page as `source_url` (where the image was found) and the file as
# `photo_url`; tools/restore-assets.py only reads `source_url`, so this recipe fetches `photo_url`.
# No cookies, no login.
#
# media: dossier/panta-rei-resort/assets/img-*
#
#   dossier/panta-rei-resort/make-media.sh           # download what is missing, check sha256 against dossier.json
#   dossier/panta-rei-resort/make-media.sh --write   # harvest mode: (re)download all, write sha256/width/height into dossier.json
#
# Videos (assets/video/) are not made here: tools/fetch-video.mjs re-fetches them from their
# source_url (Wix video CDN and the business's YouTube channel) with the cut in dossier.json.
#
# Processing: a file over 2000 px on the long edge is scaled to 2000 with ffmpeg (Lanczos; JPEG q2,
# PNG lossless); smaller files are kept byte for byte (no re-encode, no upscaling). Width/height come
# from ffprobe. Needs python3, curl, ffmpeg/ffprobe (no Pillow).
set -euo pipefail
cd "$(dirname "$0")/../.."
D=dossier/panta-rei-resort
[ -e "$D/assets" ] || tools/link-assets.sh panta-rei-resort >/dev/null
python3 - "$D" "$@" <<'PY'
import hashlib, json, os, subprocess, sys
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
    png = out.endswith('.png')
    ok = r.stdout[:8] == b'\x89PNG\r\n\x1a\n' if png else r.stdout[:2] == b'\xff\xd8'
    if r.returncode or len(r.stdout) < 1000 or not ok:
        print(f"{e['id']}: download failed or wrong format ({e['photo_url']})"); bad += 1; continue
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = out + '.dl'; open(tmp, 'wb').write(r.stdout)
    w, h = dims(tmp)
    if max(w, h) > 2000:
        vf = 'scale=2000:-2:flags=lanczos' if w >= h else 'scale=-2:2000:flags=lanczos'
        args = ['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-vf', vf] + ([] if png else ['-q:v', '2']) + ['-f', 'image2', out]
        subprocess.run(args, check=True); os.remove(tmp)
    else:
        os.replace(tmp, out)
    data = open(out, 'rb').read()
    if WRITE:
        e['sha256'] = sha(data); e['width'], e['height'] = dims(out); e['original_size'] = [w, h]
    elif sha(data) != e.get('sha256'):
        print(f"{e['id']}: sha256 differs from dossier.json (the source re-encoded or replaced the photo)"); bad += 1
if WRITE:
    seen = {}
    for e in d.get('images', []):
        if e.get('sha256') in seen: print(f"{e['id']}: duplicate of {seen[e['sha256']]}")
        else: seen[e.get('sha256')] = e['id']
    json.dump(d, open(path, 'w'), indent=1, ensure_ascii=False); open(path, 'a').write('\n')
print(f"{len(d.get('images', []))} images, {bad} problem(s)")
sys.exit(1 if bad else 0)
PY
