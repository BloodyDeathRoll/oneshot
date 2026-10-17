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
# fonts are self-hosted (dist/fonts, made by make-media.sh); {{F}} is the page's path prefix
FONTS = (''
         '<style>@font-face{font-family:"Plus Jakarta Sans";font-style:normal;font-weight:400 600;font-display:swap;src:url({{F}}fonts/plus-jakarta-sans-latin.woff2) format("woff2")}'
         '@font-face{font-family:"Sacramento";font-style:normal;font-weight:400;font-display:swap;src:url({{F}}fonts/sacramento-latin.woff2) format("woff2")}</style>')

# the Rosa headline, from the checked-in snapshot of Rosa's south-point.json (src/rosa-south-point.json);
# home.js hides it once the snapshot is more than 24 h old and redraws it from the live file when that is fresh
import datetime
ROSA = json.loads((HERE / 'rosa-south-point.json').read_text())
def compass(d): return ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'][round(d / 45) % 8]
def fc_html():
    c = ROSA['current']; sw = next((x for x in c['swells'] if x['in_window']), None)
    t = datetime.datetime.fromisoformat(c['t'])
    rows = (f'<span>Swell {sw["h"]:g} m at {sw["period"]:g} s from the {compass(sw["dir"])}</span>' if sw else '') + f'<span>Wind {round(c["wind"]["kph"])} km/h, {c["wind"]["class"]}</span>'
    return (f'<div class="fc-h" data-fc data-gen="{ROSA["generated_at"]}">'
            f'<p class="fc-big"><span data-fh>{c["h"][0]:g}–{c["h"][1]:g}</span><small>m</small></p>'
            f'<p class="fc-when" data-fw>South Point, {e(c["phrase"])} <br>at {t:%H:%M}, {t.day} {t:%b}</p>'
            f'<p class="fc-rows" data-fr>{rows}</p></div>')

def alt(i): d = desc.get(i, ''); return d[:1].upper() + d[1:]

ROOM_KEYS = ['dorm', 'twin', 'double']
def sup(r):
    s = r['supplement']
    return s['display'] if 'display' in s else s['display_one_guest'] + ' | ' + s['display_couple']

def rooms():
    out = []
    for key, r in zip(ROOM_KEYS, X['rooms']):
        g = r['gallery']
        photos = ' '.join(f'{i[4:]}:' + alt(i).replace(' ', '_') for i in g)
        lead = (f'<button class="lead" type="button" data-i="0" aria-label="See all {len(g)} photos of the {e(r["label"])}">'
                f'<img src="img/room-{g[0][4:]}-1400.webp" srcset="img/room-{g[0][4:]}-600.webp 600w, img/room-{g[0][4:]}-1400.webp 1400w" sizes="(max-width:960px) 100vw, 760px" width="1400" height="933" alt="{e(alt(g[0]))}" loading="lazy">'
                f'<span class="all"><svg class="ic"><use href="#i-grid"/></svg>{len(g)} photos</span></button>')
        thumbs = ''.join(f'<button type="button" data-i="{n}" aria-label="Photo {n + 1} of {len(g)}, {e(r["label"])}"><img src="img/room-{i[4:]}-600.webp" width="600" height="400" alt="" loading="lazy"></button>' for n, i in enumerate(g[1:4], 1))
        out.append(f'''      <article class="room" data-room="{key}" data-name="{e(r['label'])}" data-line="{e(r['line'])}" data-det="{e(r['details'])}" data-sup="{e(sup(r))}" data-photos="{e(photos)}">
        <div class="room-media">{lead}<div class="thumbs">{thumbs}</div></div>
        <div class="room-txt">
          <h3>{e(r['label'])}</h3>
          <p class="line">{e(r['description'])}</p>
          <p class="det">{e(r['details'])}</p>
          <p class="sup">{e(sup(r))}</p>
          <a class="btn btn-book" href="book/?room={key}">{e(X['ctas']['room'])}</a>
        </div>
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

def page(title, desc_, head_extra, css, body, js, fp=''):
    return f'''<!doctype html>
<html lang="en" class="nojs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc_)}">
{FONTS.replace('{{F}}', fp)}
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
home = home.replace('{{ROOMS_ALT}}', '').replace('{{FC}}', fc_html())
(DIST / 'index.html').write_text(page(
    'Global Surf Lodge Kabalana | Surf weeks in Sri Lanka', copy['tagline'],
    '<link rel="preload" as="image" href="img/ride-poster-p810.webp" media="(max-width: 700px)">\n<link rel="preload" as="image" href="img/ride-poster-1728.webp" media="(min-width: 701px)">',
    read('home.css'), home, read('home.js')))

if (HERE / 'book.html').exists():
    (DIST / 'book').mkdir(exist_ok=True)
    book = read('book.html').replace('{{LOGO}}', LOGO)
    book = book.replace('{{ROOM_TILES}}', room_tiles())
    (DIST / 'book' / 'index.html').write_text(page(
        'Book your surf week | Global Surf Lodge Kabalana', copy['tagline'], '', read('book.css') + gal_css(), book, read('book.js'), '../').replace('src="img/', 'src="../img/').replace('href="./"', 'href="../"'))
print('built', DIST)
