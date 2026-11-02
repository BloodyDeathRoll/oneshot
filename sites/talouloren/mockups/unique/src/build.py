#!/usr/bin/env python3
"""Assemble dist/index.html from page.html + page.css + page.js and the passed copy (he.json, en.json).
The copy is inlined verbatim; video embed ids come from dossier.json (source_url) for every video the page links.
Usage: python3 sites/talouloren/mockups/unique/src/build.py"""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__))
R = os.path.abspath(os.path.join(H, '../../../../..'))
copy = {l: json.load(open(f'{R}/sites/talouloren/copy/{l}.json')) for l in ('he', 'en')}
dos = json.load(open(f'{R}/dossier/talouloren/dossier.json'))
vids = {}
for v in dos['videos']:
    m = re.search(r'(?:v=|youtu\.be/)([\w-]{11})', v.get('source_url', ''))
    if m:
        res = v.get('resolution') or [0, 0]
        vids[v['id']] = {'yt': m.group(1), 'title': v['title'], 'vert': bool(res[1] > res[0])}
for i in ('vid-009', 'vid-030', 'vid-040'):  # 720x900 sources (ffprobe), not recorded as resolution in the dossier
    if i in vids: vids[i]['vert'] = True
page = open(f'{H}/page.html').read()
dump = lambda o: json.dumps(o, ensure_ascii=False).replace('</', '<\\/')
page = page.replace('/*CSS*/', open(f'{H}/page.css').read()).replace('/*JS*/', open(f'{H}/page.js').read())
# fonts inlined as data URIs: the mockup is opened from file:// (tools/shoot.mjs, the critics), where Chrome
# refuses cross-file font loads; the woff2 files themselves stay in dist/fonts/ (made by make-media.sh).
import base64
page = re.sub(r'url\((fonts/[\w.-]+\.woff2)\)', lambda m: 'url(data:font/woff2;base64,' + base64.b64encode(open(f'{H}/../dist/' + m.group(1), 'rb').read()).decode() + ')', page)
page = page.replace('/*COPY*/', dump(copy)).replace('/*VIDS*/', dump(vids))
os.makedirs(f'{H}/../dist', exist_ok=True)
open(f'{H}/../dist/index.html', 'w').write(page)
print('dist/index.html', len(page.encode()) // 1024, 'KB,', len(vids), 'videos')
