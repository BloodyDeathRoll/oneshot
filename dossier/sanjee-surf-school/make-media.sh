#!/usr/bin/env bash
# dossier/sanjee-surf-school/make-media.sh — (re)download every image recorded in dossier.json.
#
# Why a recipe: dossier.json keeps the page an image was found on as `source_url` (where the fact
# was found) and the file itself as `photo_url`; tools/restore-assets.py only reads `source_url`,
# so this recipe fetches `photo_url` instead. No cookies, no login.
#   - Business's own site: hashed Vite asset names under https://sanjee-surf.com/assets/. A rebuild of
#     that site can change them: then this reports a failed download; the store keeps the files.
#   - Google listing: lh3.googleusercontent.com at =s2000-k-no (long edge at most 2000 px, never
#     upscaled). These are the 10 gallery items and the review thumbnails a logged-out visitor sees.
#
# media: dossier/sanjee-surf-school/assets/img-*
#
#   dossier/sanjee-surf-school/make-media.sh           # download what is missing, check sha256 against dossier.json
#   dossier/sanjee-surf-school/make-media.sh --write   # harvest mode: (re)download all, write sha256/width/height into dossier.json + assets/index.json
#
# Videos: none on disk. The four clips on the Google listing refuse a plain GET (403) and yt-dlp
# does not support the page; see dossier.json videos_note and sources.md.
#
# Processing: the downloaded bytes are kept as they are (no re-encode, no upscaling); a file over
# 2000 px on the long edge would be scaled to 2000 with ffmpeg (Lanczos). Width/height come from
# ffprobe. Needs python3, curl, ffmpeg/ffprobe (no Pillow).
set -euo pipefail
cd "$(dirname "$0")/../.."
D=dossier/sanjee-surf-school
[ -e "$D/assets" ] || tools/link-assets.sh sanjee-surf-school >/dev/null
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
def is_image(b):
    return b[:2] == b'\xff\xd8' or (b[:4] == b'RIFF' and b[8:12] == b'WEBP') or b[:8] == b'\x89PNG\r\n\x1a\n'
bad = 0
for e in d.get('images', []):
    out = os.path.join(D, e['file'])
    if not WRITE and os.path.exists(out) and sha(open(out, 'rb').read()) == e.get('sha256'):
        continue
    r = subprocess.run(['curl', '-s', '-f', '-L', '-m', '120', '--retry', '3', '-A', UA, e['photo_url']], capture_output=True)
    if r.returncode or len(r.stdout) < 1000 or not is_image(r.stdout):
        print(f"{e['id']}: download failed or not an image ({e['photo_url'][:90]})"); bad += 1; continue
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = out + '.dl'; open(tmp, 'wb').write(r.stdout)
    w, h = dims(tmp)
    if max(w, h) > 2000:
        vf = 'scale=2000:-2:flags=lanczos' if w >= h else 'scale=-2:2000:flags=lanczos'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-i', tmp, '-vf', vf, '-q:v', '2', '-f', 'image2', out], check=True); os.remove(tmp)
    else:
        os.replace(tmp, out)
    data = open(out, 'rb').read()
    if WRITE:
        e['sha256'] = sha(data); e['width'], e['height'] = dims(out)
    elif sha(data) != e.get('sha256'):
        print(f"{e['id']}: sha256 differs from dossier.json (the source replaced or re-encoded the file)"); bad += 1
if WRITE:
    json.dump(d, open(path, 'w'), indent=1, ensure_ascii=False); open(path, 'a').write('\n')
    index = [{'id': e['id'], 'file': e['file'], 'kind': 'image', 'source_url': e['source_url'], 'photo_url': e['photo_url'], 'fetched_at': e['fetched_at'],
              'license': e['license'], 'license_note': e['license_note'], 'sha256': e.get('sha256'), 'width': e.get('width'), 'height': e.get('height'),
              'usable': e['license'] == 'business-owned'} for e in d.get('images', [])]
    for name in ('mobile', 'desktop'):
        f = os.path.join(D, 'assets', f'old-site-{name}.png')
        if os.path.exists(f):
            w, h = dims(f)
            index.append({'id': f'old-site-{name}', 'file': f'assets/old-site-{name}.png', 'kind': 'screenshot', 'source_url': 'https://sanjee-surf.com/', 'fetched_at': d['existing_site'].get('fetched_at'),
                          'license': 'unknown', 'license_note': 'our screenshot of the old site: pitch evidence, not site media', 'sha256': sha(open(f, 'rb').read()), 'width': w, 'height': h, 'usable': False})
    json.dump(index, open(os.path.join(D, 'assets', 'index.json'), 'w'), indent=1, ensure_ascii=False)
print(f"{len(d.get('images', []))} images, {bad} problem(s)")
sys.exit(1 if bad else 0)
PY
