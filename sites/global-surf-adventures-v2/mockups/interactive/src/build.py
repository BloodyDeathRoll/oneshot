#!/usr/bin/env python3
"""Assemble the interactive mockup ("The ride") into dist/index.html and dist/book/index.html.

Everything inline (CSS, JS, icons, logo); the words come from sites/<slug>/copy/en.json, image alt
text from the dossier. Run: python3 sites/global-surf-adventures-v2/mockups/interactive/src/build.py
"""
import html, json, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
SLUG = 'global-surf-adventures-v2'
DIST = HERE.parent / 'dist'
copy = json.loads((ROOT / f'sites/{SLUG}/copy/en.json').read_text())
dossier = json.loads((ROOT / f'dossier/{SLUG}/dossier.json').read_text())
desc = {i['id']: i.get('description', '') for i in dossier['images']}
X = copy['mockup_extras']
e = html.escape

def read(n): return (HERE / n).read_text()
LOGO = '<svg viewBox="0 0 257.2 88.8" aria-hidden="true">' + read('logo-paths.txt').strip() + '</svg>'
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&family=Sacramento&display=swap" rel="stylesheet">')

def alt(i): d = desc.get(i, ''); return d[:1].upper() + d[1:]

ROOM_KEYS = ['dorm', 'twin', 'double']
def sup(r):
    s = r['supplement']
    return s['display'] if 'display' in s else s['display_one_guest'] + ' | ' + s['display_couple']

def rooms():
    out = []
    for key, r in zip(ROOM_KEYS, X['rooms']):
        g = r['gallery']
        tiles = ''.join(f'<img src="img/room-{i[4:]}-600.webp" width="600" height="400" alt="{e(alt(i))}" loading="lazy">' for i in g[:4])
        photos = ' '.join(f'{i}:{alt(i)}'.replace(' ', ' ', 0) for i in g)
        photos = ' '.join(f'{i[4:]}:' + alt(i).replace(' ', '_') for i in g)
        out.append(f'''      <article class="room" data-room="{key}" data-name="{e(r['label'])}" data-line="{e(r['line'])}" data-det="{e(r['details'])}" data-sup="{e(sup(r))}" data-photos="{e(photos)}">
        <button class="mosaic" type="button" aria-label="See all {len(g)} photos of the {e(r['label'])}">{tiles}<span class="all"><svg class="ic"><use href="#i-grid"/></svg>{len(g)} photos</span></button>
        <h3>{e(r['label'])}</h3>
        <p class="line">{e(r['description'])}</p>
        <p class="det">{e(r['details'])}</p>
        <p class="sup">{e(sup(r))}</p>
        <a class="btn btn-tint" href="book/?room={key}">{e(X['ctas']['room'])}</a>
      </article>''')
    return '\n'.join(out)

SRC = {'booking': ('Booking.com', 'https://www.booking.com/hotel/lk/kabalana-by-ceilao-villas.en-gb.html'),
       'other': ('globalsurf.com', 'https://www.globalsurf.com/kabalana-lodge-surf-packages/')}
def quotes():
    out = []
    for t in copy['testimonials']:
        n, u = SRC[t['source']]
        out.append(f'''          <figure class="q"><blockquote>{e(t['quote'])}</blockquote><footer><b>{e(t['author'])}</b>on <a href="{u}" target="_blank" rel="noopener">{n}</a></footer></figure>''')
    return '\n'.join(out)

def room_tiles():
    out = []
    for n, (key, r) in enumerate(zip(ROOM_KEYS, X['rooms'])):
        g = r['gallery']
        photos = ' '.join(f'{i[4:]}:' + alt(i).replace(' ', '_') for i in g)
        out.append(f'''        <label class="tile" data-engine-title="{e(r['engine_title'])}"><input type="radio" name="room" value="{key}"{' checked' if n == 0 else ''}><img src="img/room-{g[0][4:]}-600.webp" width="600" height="400" alt="{e(alt(g[0]))}"><span class="sel"><svg class="ic"><use href="#i-check"/></svg></span><span class="tt"><b>{e(r['label'])}</b><span>{e(r['line'])}</span><em>{e(sup(r))}</em></span><button class="btn btn-tint seep js-only" type="button" data-photos="{e(photos)}" data-name="{e(r['label'])}"><svg class="ic"><use href="#i-grid"/></svg>See {len(g)} photos</button></label>''')
    return '\n'.join(out)

IG = '024 090 055 087 118 016 104 168'.split()
def ig():
    return '\n'.join(f'    <a href="{X["instagram"]["url"]}" target="_blank" rel="noopener" aria-label="{e(X["instagram"]["tile_link_label"])}"><img src="img/ig-{i}.webp" width="480" height="480" alt="{e(alt("img-" + i))}" loading="lazy"></a>' for i in IG)

def gal_css():
    h = read('home.css')
    arr = [l for l in h.splitlines() if l.startswith('.arr') or l.startswith('.dots')]
    return '\n'.join(arr) + '\n' + h[h.index('/* gallery dialog */'):h.index('/* waves */')]

def page(title, desc_, head_extra, css, body, js):
    return f'''<!doctype html>
<html lang="en" class="nojs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc_)}">
{FONTS}
{head_extra}
<style>
{read('common.css')}
{css}
</style>
<script>document.documentElement.className='js'</script>
</head>
<body>
{read('icons.svg')}
{body}
<script>
{js}
</script>
</body>
</html>
'''

home = read('home.html').replace('{{LOGO}}', LOGO).replace('{{ROOMS}}', rooms()).replace('{{QUOTES}}', quotes()).replace('{{IG}}', ig())
home = home.replace('{{ROOMS_ALT}}', '')
(DIST / 'index.html').write_text(page(
    'Global Surf Lodge Kabalana | Surf weeks in Sri Lanka', copy['tagline'],
    '<link rel="preload" as="image" href="img/ride-poster-p810.webp" media="(max-width: 700px)">\n<link rel="preload" as="image" href="img/ride-poster-1728.webp" media="(min-width: 701px)">',
    read('home.css'), home, read('home.js')))

if (HERE / 'book.html').exists():
    (DIST / 'book').mkdir(exist_ok=True)
    book = read('book.html').replace('{{LOGO}}', LOGO)
    book = book.replace('{{ROOM_TILES}}', room_tiles())
    (DIST / 'book' / 'index.html').write_text(page(
        'Book your surf week | Global Surf Lodge Kabalana', copy['tagline'], '', read('book.css') + gal_css(), book, read('book.js')).replace('src="img/', 'src="../img/').replace('href="./"', 'href="../"'))
print('built', DIST)
