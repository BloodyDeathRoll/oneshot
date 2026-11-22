#!/usr/bin/env python3
"""Assemble the Sea You Surfers Nest unique mockup (concept 3, "Every side of the four-poster") into
dist/index.html, plus dist/stay/index.html: the booking door as a page of its own, for JS off.

Every word, room, rating, review and link comes from sites/sea-you-surfers-nest/copy/en.json (passed 4c)
and is never retyped; the booking URLs are checked against dossier.json here. Strings written in this file
are interface labels the template owns (button and section labels) and alt texts, written from the
photographs themselves. Media: src/make-media.sh. CSS / JS: page.css, page.js (inlined).
Run: bash src/make-media.sh && python3 src/build.py
"""
import html, json, math, pathlib, re
from datetime import date

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]                                  # sites/sea-you-surfers-nest
REPO = SITE.parents[1]
DIST = HERE.parent / 'dist'
copy = json.loads((SITE / 'copy/en.json').read_text())
dossier = json.loads((REPO / 'dossier/sea-you-surfers-nest/dossier.json').read_text())

E = lambda s: html.escape(str(s), quote=True)

# ---------------------------------------------------------------- facts, from the copy, checked
LINKS = copy['bookingLinks']
BOOK, AIR_ROOM, AIR_HOUSE = LINKS
assert BOOK['url'] == dossier['booking']['engine_url']['value'], 'Booking.com URL differs from the dossier'
other = [o['url'] for o in dossier['booking']['other_engines']['value']]
assert AIR_ROOM['url'] in other and AIR_HOUSE['url'] in other, 'Airbnb URL differs from the dossier'
C = copy['contact']
assert C['phone'] == dossier['contact']['phone']['value']
# The phone was read off the sign in a photograph and is not confirmed (dossier contact.phone, gaps[0]).
# concepts.md §2/§6: every Call button stays out until a human confirms it. Flip this to show them.
PHONE_CONFIRMED = False
TEL = 'tel:' + C['phone']

NAME = copy['businessName']
TOWN = 'Midigama, Sri Lanka'          # town + country of contact.address (template line, concepts §6)
TAGLINE, CLOSING, SPOT = copy['tagline'], copy['closing'], copy['spot']
ADDRESS, MAP = C['address'], C['mapUrl']
BLOCK = {b['heading']: b['body'].split('\n\n') for b in copy['copyBlocks']}
def paras(h, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{E(p)}</p>' for p in BLOCK[h])
def sentences(text):
    return [s for s in re.split(r'(?<=[.!?])\s+(?=[A-Z“])', text) if s]
SEVEN = [s for p in BLOCK['Seven rooms'] for s in sentences(p)]
assert len(SEVEN) == 4, SEVEN
AC_LINE = SEVEN[1]                     # "Only one has air conditioning, …"

def fmt_day(s): d = date.fromisoformat(s); return f'{d.day} {d:%b %Y}'
def fmt_month(s): y, m = s.split('-'); return f'{date(int(y), int(m), 1):%b %Y}'
PLATFORM = {'booking': 'Booking.com', 'google': 'Google', 'airbnb': 'Airbnb'}
RATINGS = [dict(r, name=PLATFORM[r['platform']], day=fmt_day(r['capturedAt']),
                shown=f"{r['score']:.1f}") for r in copy['ratings']]
assert len({r['day'] for r in RATINGS}) == 1
RATED_ON = RATINGS[0]['day']
REVIEWS = [dict(t, month=fmt_month(t['date']), src=PLATFORM[t['source']]) for t in copy['testimonials']]
# concepts §3, unique: Kenza first in the stack (the walk to the sea in a guest's words)
REVIEWS.sort(key=lambda t: 0 if t['author'] == 'Kenza' else 1)
ROOMS = copy['rooms']
STAY = copy['stayInfo']
AMEN = copy['amenities']
INCLUDED = ['Free WiFi', 'Kitchen', 'Fan and mosquito net', 'Free private parking on site']   # concepts §3 order
AMEN_BY = {a['label']: a for a in AMEN}
assert all(i in AMEN_BY for i in INCLUDED)
def amen(a): return a['label'] + (f" ({a['note']})" if a.get('note') else '')
SPEAKS = {'en': 'English'}

# ---------------------------------------------------------------- photographs
ALT = {
 'img-001': 'The round sign on a post: “Sea You, The Surfers Nest, Midigama” around a wave, a surfboard and a palm, with a phone number under it',
 'img-002': 'A mint-green four-poster made up in white linen, a grey panelled door open onto the veranda and its green table',
 'img-003': 'A mint-green table with a potted pothos and two mint chairs on the upstairs balcony, palm fronds beyond the parapet',
 'img-004': 'The veranda lounge: a cane armchair and a low wooden table under an amber lamp, plants, a carved door, and surfboards against the wall',
 'img-005': 'A mint-green four-poster with a teal velvet throw over grey sheets, a timber towel ladder and a green cabinet beside it',
 'img-007': 'A mint-green table laid with a white teapot, cups and a pink rose, green chairs on a red-oxide floor',
 'img-008': 'A white bathroom with a toilet, an instant shower heater and a rain shower head',
 'img-009': 'A mint four-poster in grey linen seen from its corner, a green cabinet, a mirror, a towel ladder and a green WC door behind',
 'img-010': 'A timber towel ladder and a green cabinet beside a green door marked WC, the four-poster at the edge',
 'img-012': 'A mint four-poster with lime sheets and pillows beside a barred window with grey shutters, a towel ladder in the corner',
 'img-013': 'A mint four-poster with green sheets, a green mirror shelf on the wall and a green door beyond',
 'img-015': 'A mint-green four-poster with a gabled canopy, lime sheets, striped pillows and a teal velvet throw, grey panelled doors either side',
 'img-017': 'The foot of a mint-green four-poster: lime sheets, a teal velvet throw and a rolled towel, the door open to the balcony chairs',
 'img-022': 'A bed with lime-green pillows and sheets, a teal throw across the foot and a potted plant beside the mint headboard',
 'img-025': 'A small wooden table with a white tea set between two green chairs, the foot of the bed at the edge',
 'img-026': 'A mint four-poster with a slatted canopy, grey sheets and a teal throw, a ceiling fan above',
 'img-027': 'A carved grey double door under a carved fanlight, a wall lamp beside it and a carved cane chair at its side',
 'img-032': 'A pedestal basin under a black-framed mirror in a white bathroom',
 'img-033': 'The corner of a four-poster in white linen and striped pillows, a mint cabinet and a dark mirror by a grey carved door',
 'img-036': 'An outdoor shower: a wooden surfboard fixed to a grey garden wall with a tap and a shower head, palms above',
 'img-038': 'A variegated pothos in a white pot on a concrete bench',
 'img-041': 'A carved cane settee and a low wooden table among potted plants, a leaf in the foreground',
 'img-042': 'An outside stair beside a white wall, a grey shuttered window under a carved panel, snake plants at its foot',
 'img-045': 'Two carved wooden armchairs with cane seats and a round table on a balcony',
 'img-053': 'The long side of a mint-green four-poster with a teal velvet throw and rolled towels, a barred window and a towel ladder behind',
 'img-071': 'A concrete bench with a teal cushion in the courtyard, potted plants either side and palms over the wall',
 'img-076': 'Two colonial easy chairs and a round table on the upstairs balcony, coconut palms beyond',
}
# Booking.com's own room tags (dossier room_types[].note) decide each gallery; bathrooms never lead.
GALLERY = {'Deluxe Double Room': ['img-012', 'img-002', 'img-022', 'img-033', 'img-013', 'img-032'],
           'Standard Double Room': ['img-026', 'img-009', 'img-005', 'img-025', 'img-010', 'img-008']}
tags = {rt['value']['label']: rt['note'] for rt in dossier['room_types'] if 'label' in rt['value']}
for room, ids in GALLERY.items():
    for i in ids: assert i.split('-')[1] in tags[room], (room, i)
SIDES = [('img-015', None), ('img-002', 'side-002'), ('img-017', 'side-017'), ('img-053', 'side-053')]
MASONRY = ['img-071', 'img-003', 'img-045', 'img-041', 'img-004', 'img-007', 'img-076', 'img-038', 'img-042']

def webp_size(path):
    b = pathlib.Path(path).read_bytes()[:40]
    kind = b[12:16]
    if kind == b'VP8 ':
        return int.from_bytes(b[26:28], 'little') & 0x3FFF, int.from_bytes(b[28:30], 'little') & 0x3FFF
    if kind == b'VP8L':
        v = int.from_bytes(b[21:25], 'little'); return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1
    if kind == b'VP8X':
        return int.from_bytes(b[24:27], 'little') + 1, int.from_bytes(b[27:30], 'little') + 1
    raise ValueError(path)
def wh(name): return webp_size(DIST / f'img/{name}.webp')
def img(name, alt, lazy=True, cls='', attrs=''):
    w, h = wh(name)
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high" decoding="async"'
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="img/{name}.webp" width="{w}" height="{h}" alt="{E(alt)}"{extra}{attrs}>'

# ---------------------------------------------------------------- icons (24 grid, stroke)
ICON = {
 'cal': '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
 'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 'pin': '<path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/>',
 'map': '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5zM9 4v13.5M15 6.5V20"/>',
 'house': '<path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20"/>',
 'door': '<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21M3.5 21h17M14.5 12.5h.01"/>',
 'bed': '<path d="M3 19v-9M21 19v-5a3 3 0 0 0-3-3H8v8M3 15h18"/><circle cx="6" cy="12" r="1.6"/>',
 'wifi': '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.6 16a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19.3" r="1"/>',
 'pot': '<path d="M4 10h16M6 10v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-6M9 6.5c0-1 .8-1.5 1.5-2M13 6.5c0-1 .8-1.5 1.5-2M20 12h1.5"/>',
 'fan': '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C12 6 13.5 3 16 3.5c2 .4 1.5 4-4 6.9M13.6 12c4.4 0 7.4 1.5 6.9 4-.4 2-4 1.5-6.9-4M12 13.6c0 4.4-1.5 7.4-4 6.9-2-.4-1.5-4 4-6.9M10.4 12C6 12 3 10.5 3.5 8c.4-2 4 1.5 6.9 4"/>',
 'car': '<path d="M4 16.5V12l2-5h12l2 5v4.5M3 12h18M4 16.5h16M6.5 19v-2.5M17.5 19v-2.5"/><circle cx="7.5" cy="14" r=".6"/><circle cx="16.5" cy="14" r=".6"/>',
 'star': '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 'prev': '<path d="m15 18-6-6 6-6"/>', 'next': '<path d="m9 18 6-6-6-6"/>', 'x': '<path d="M6 6l12 12M18 6 6 18"/>',
 'more': '<path d="M3.5 11.5 12 4l8.5 7.5M6 9.5V20h12V9.5"/><path d="M9.5 14.5h5"/>',
 'throw': '<path d="M3 8.5c3-1.5 6 1.5 9 0s6-1.5 9 0v8c-3-1.5-6 1.5-9 0s-6-1.5-9 0z"/><path d="M6.5 12.2c1.8-.6 3.6.6 5.5 0"/>',
 'ladder': '<path d="M8 2.5 6.5 21.5M16 2.5l1.5 19M7.6 7h8.8M7.2 12h9.6M6.8 17h10.4"/>',
 'cabinet': '<rect x="7" y="2.5" width="10" height="7" rx="1"/><rect x="6" y="12" width="12" height="9.5" rx="1"/><path d="M12 12v9.5M10.5 16.5h.01M13.5 16.5h.01"/>',
}
def svg(name, cls='ic'):
    return (f'<svg class="{cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{ICON[name]}</svg>')
# The page's one shape (concepts §4.3): the gable of the canopy. Here as the four-poster icon.
GABLE_ICON = ('<svg class="ic ic-gable" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
              'stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" focusable="false">'
              '<path d="M5 21V9.5L12 4l7 5.5V21M5 9.5h14M5 16.5h14M5 13h14"/></svg>')

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return (' ' + SEP + ' ').join(f'<span>{i}</span>' for i in items)

def btn_book(cls='', label=None, short=False):
    lab = 'See live dates' if short else (label or BOOK['label'])
    aria = f' aria-label="{E(BOOK["label"])}"' if short else ''
    return f'<a class="btn btn-book {cls}" href="{E(BOOK["url"])}"{aria}>{svg("cal")}<span>{E(lab)}</span></a>'
def btn_link(link, icon, cls='btn-line'):
    return f'<a class="btn {cls}" href="{E(link["url"])}">{svg(icon)}<span>{E(link["label"])}</span></a>'
def btn_call(cls='btn-line'):
    return f'<a class="btn {cls}" href="{TEL}">{svg("phone")}<span>Call Ashly</span></a>' if PHONE_CONFIRMED else ''
def btn_door(label='More ways to book', cls='btn-line', pre=''):
    return f'<a class="btn {cls}" href="{pre}stay/" data-door>{svg("more")}<span>{E(label)}</span></a>'

def rating_inline(r):
    return (f'<a class="rate" href="{E(r["url"])}" rel="noopener"><b>{r["shown"]}/{r["scale"]}</b> '
            f'<span>{E(r["name"])}, {r["count"]} reviews</span></a>')
def rating_block(r):
    return (f'<a class="rblock" href="{E(r["url"])}" rel="noopener"><span class="rscore">{r["shown"]}<small>/{r["scale"]}</small></span>'
            f'<span class="rname">{E(r["name"])}</span><span class="rmeta">{r["count"]} reviews | {E(r["day"])}</span></a>')

def show(sid, ids, label):
    n = len(ids)
    slides = ''.join(f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {n}">{img("r-" + a, ALT[a])}</li>'
                     for i, a in enumerate(ids))
    return (f'<div class="show" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl"><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">'
            + ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1} of {n}"></button>' for i in range(n))
            + f'</div><button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def quote_html(t):
    q = '<br>'.join(E(line.strip()) for line in t['quote'].split('\n'))   # Kenza's line break stays (review N4)
    return q

# ---------------------------------------------------------------- the page
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Leckerli+One&display=swap">')
CSS = (HERE / 'page.css').read_text()
JS = (HERE / 'page.js').read_text()
HEAD_JS = ("(function(){var d=document.documentElement;d.classList.add('js');"
           "var q=location.search,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,c=navigator.connection,"
           "sd=!!(c&&c.saveData),weak=(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory||4)<=2;"
           "if((!rm&&!sd&&!weak&&'WebGLRenderingContext' in window&&!/[?&]still/.test(q))||/[?&]turn/.test(q))d.classList.add('piece');})();")

def head(title, desc, pre=''):
    return (f'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
            f'<title>{E(title)}</title><meta name="description" content="{E(desc)}">'
            f'<meta property="og:title" content="{E(NAME)}"><meta property="og:description" content="{E(TAGLINE)}">'
            f'<meta property="og:image" content="{pre}img/h015-1280.webp"><meta name="theme-color" content="#ffffff">'
            + FONTS)

hw, hh = wh('h015-1920')
pw, ph = wh('p015-900')
mw, mh = wh('h005-1000')

def caption_dots():
    return '<div class="cap-dots" aria-hidden="true">' + ''.join('<i></i>' for _ in range(4)) + '</div>'

stage = f'''
<div class="stage" data-loading="false">
  <canvas class="gl gl-back" aria-hidden="true"></canvas>
  <div class="ph ph0"><picture>
    <source media="(max-width: 899px)" srcset="img/h005-720.webp 720w, img/h005-1000.webp 1000w" sizes="100vw" width="{mw}" height="{mh}">
    <img src="img/h015-1920.webp" srcset="img/h015-1280.webp 1280w, img/h015-1920.webp 1920w" sizes="100vw"
      width="{hw}" height="{hh}" alt="{E(ALT['img-015'])}" data-alt-phone="{E(ALT['img-005'])}" fetchpriority="high" decoding="async">
  </picture></div>
''' + ''.join(f'''  <div class="ph side" data-side="{k}" aria-hidden="true"><img data-src="img/{name}.webp" width="{wh(name)[0]}" height="{wh(name)[1]}" alt="{E(ALT[a])}" decoding="async"></div>
''' for k, (a, name) in enumerate(SIDES) if name) + f'''  <canvas class="gl gl-front" aria-hidden="true"></canvas>
  <div class="caps" aria-live="off">
    <p class="title cap-title">Seven rooms</p>
    <div class="cap-stack">{''.join(f'<p class="cap" data-cap="{i}">{E(s)}</p>' for i, s in enumerate(SEVEN))}</div>
    {caption_dots()}
  </div>
  <p class="loading" aria-hidden="true"><span></span>Laying out the four-poster</p>
</div>'''

hero = f'''
<section class="hero" aria-labelledby="h-name">
  <div class="hero-in">
    <div class="veil" aria-hidden="true"></div>
    <h1 class="title hero-name" id="h-name">{E(NAME)}</h1>
    <p class="hero-where">{E(TOWN)}</p>
    {btn_book('btn-hero', short=True)}
  </div>
  <p class="hint">{GABLE_ICON}Scroll, and the bed turns</p>
</section>'''

spot_q, spot_by = SPOT.split('” ', 1)
glance = f'''
<section class="glance" id="glance" aria-label="At a glance">
  <div class="glance-in">
    <p class="g-tag">{E(TAGLINE)}</p>
    <p class="g-spot"><span class="title">{E(spot_q)}”</span> <span class="g-by">{E(spot_by)}</span></p>
    <ul class="g-inc" aria-label="Included">
      <li>{svg('wifi')}<span>{E(amen(AMEN_BY['Free WiFi']))}</span></li>
      <li>{svg('pot')}<span>Kitchen</span></li>
      <li>{svg('fan')}<span>Fan and mosquito net</span></li>
      <li>{svg('car')}<span>Free private parking on site</span></li>
    </ul>
    <p class="g-price">{svg('cal')}<span>Live dates on Booking.com</span></p>
    <p class="g-rates">{pipe([rating_inline(r) for r in RATINGS])}<span class="g-asof">Ratings as of {E(RATED_ON)}</span></p>
    <div class="g-acts">{btn_book()}{btn_door()}{btn_call()}</div>
  </div>
</section>'''

static_turn = f'''
<section class="still-turn" aria-labelledby="h-seven">
  <div class="wrap still-grid">
    <div class="still-photos">
      {img('p015-900', ALT['img-015'])}{img('side-002', ALT['img-002'])}{img('side-017', ALT['img-017'])}{img('side-053', ALT['img-053'])}
    </div>
    <div class="still-text">
      <h2 class="title" id="h-seven">Seven rooms</h2>
      {''.join(f'<p>{E(s)}</p>' for s in SEVEN)}
    </div>
  </div>
</section>'''

def room_card(r, sid):
    return f'''
    <article class="room">
      {show(sid, GALLERY[r['label']], r['label'] + ' photographs')}
      <h3 class="title room-name">{E(r['label'])}</h3>
      <p class="room-facts">{pipe([E(r['beds']), f"sleeps {r['sleeps']}"])}</p>
      <p class="room-note">{E(r['note'])}</p>
      {btn_book()}
    </article>'''

rooms = f'''
<section class="rooms" id="rooms" aria-labelledby="h-rooms">
  <div class="wrap">
    <h2 class="title sec-title" id="h-rooms">Deluxe or Standard</h2>
    <div class="room-pair">{room_card(ROOMS[0], 'show-deluxe')}{room_card(ROOMS[1], 'show-standard')}</div>
    <div class="every">
      <h3 class="every-h">In every room</h3>
      <ul class="every-list">
        <li>{GABLE_ICON}<span>Mint-green four-poster double</span></li>
        <li>{svg('throw')}<span>Teal velvet throw</span></li>
        <li>{svg('ladder')}<span>Timber towel ladder</span></li>
        <li>{svg('cabinet')}<span>Green cabinet with a mirror</span></li>
      </ul>
      <p class="facil"><span class="facil-h">Facilities</span> {pipe([E(amen(a)) for a in AMEN])}</p>
    </div>
  </div>
</section>'''

def mas_item(a):
    return f'<figure class="m-item">{img("m-" + a, ALT[a])}</figure>'
court = f'''
<section class="court" id="house" aria-labelledby="h-court">
  <div class="wrap masonry">
    <div class="m-text">
      <h2 class="title sec-title" id="h-court">Around the courtyard</h2>
      {paras('Around the courtyard')}
    </div>
    {''.join(mas_item(a) for a in MASONRY)}
  </div>
</section>'''

carved = f'''
<section class="carved" aria-labelledby="h-carved">
  <div class="wrap carved-grid">
    <div class="carved-l">
      <figure class="print">{img('print-027', ALT['img-027'])}</figure>
      <div class="carved-text">
        <h2 class="title sec-title" id="h-carved">Carved doors and a surfboard shower</h2>
        {paras('Carved doors and a surfboard shower')}
      </div>
    </div>
    <figure class="print carved-r">{img('print-036', ALT['img-036'])}</figure>
  </div>
</section>'''

breakfast = f'''
<section class="breakfast" aria-labelledby="h-bf">
  <div class="wrap narrow center">
    <h2 class="title sec-title" id="h-bf">Breakfast</h2>
    {paras('Breakfast', 'big')}
  </div>
</section>'''

cards = ''.join(f'''
      <figure class="qcard" data-q="{i}" aria-roledescription="slide" aria-label="{i+1} of {len(REVIEWS)}">
        <blockquote><p>{quote_html(t)}</p></blockquote>
        <figcaption>{pipe([E(t['author']), E(t['src']), E(t['month'])])}</figcaption>
      </figure>''' for i, t in enumerate(REVIEWS))
guests = f'''
<section class="guests" id="guests" aria-labelledby="h-ashly">
  <div class="wrap guests-grid">
    <div class="ashly">
      <h2 class="title sec-title" id="h-ashly">Ashly</h2>
      {paras('Ashly')}
    </div>
    <div class="said">
      <div class="rblocks">{''.join(rating_block(r) for r in RATINGS)}</div>
      <div class="qstack" role="region" aria-roledescription="carousel" aria-label="What guests wrote">
        <div class="qcards">{cards}
        </div>
        <div class="qctrl"><button class="arw qprev" type="button" aria-label="Previous review">{svg('prev')}</button>
          <div class="dots" role="group" aria-label="Choose a review">{''.join(f'<button type="button" class="dot" aria-label="Review {i+1} of {len(REVIEWS)}"></button>' for i in range(len(REVIEWS)))}</div>
          <button class="arw qnext" type="button" aria-label="Next review">{svg('next')}</button></div>
      </div>
    </div>
  </div>
</section>'''

stay_line = [f"Check-out {STAY['checkOutFrom']}–{STAY['checkOutTo']}", 'Spoken here: ' + ', '.join(SPEAKS[l] for l in copy['languagesSpoken'])]
finding = f'''
<section class="finding" id="finding" aria-labelledby="h-find">
  <div class="wrap find-grid">
    <figure class="print sign">{img('print-001', ALT['img-001'])}</figure>
    <div class="find-text">
      <h2 class="title sec-title" id="h-find">Finding the house</h2>
      {paras('Finding the house')}
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>
      <div class="find-acts"><a class="btn btn-line" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a></div>
      <p class="stayline">{pipe([E(x) for x in stay_line])}</p>
      <p class="staynote">{E(STAY['note'])}</p>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing" id="book" aria-labelledby="h-close">
  <div class="gable-panel">
    <h2 class="visually-hidden" id="h-close">Book</h2>
    <p class="close-line">{E(CLOSING)}</p>
    <div class="close-acts">{btn_book()}{btn_link(AIR_ROOM, 'bed')}{btn_link(AIR_HOUSE, 'house')}{btn_call()}</div>
  </div>
</section>'''

footer = f'''
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="title foot-name">{E(NAME)}</p><p class="foot-addr">{E(ADDRESS)}</p></div>
    <div class="foot-acts">
      <a class="btn btn-ghost" href="{E(BOOK['url'])}">{svg('cal')}<span>Booking.com</span></a>
      <a class="btn btn-ghost" href="{E(AIR_ROOM['url'])}">{svg('bed')}<span>Airbnb, a room</span></a>
      <a class="btn btn-ghost" href="{E(AIR_HOUSE['url'])}">{svg('house')}<span>Airbnb, the whole house</span></a>
      <a class="btn btn-ghost" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
    </div>
  </div>
  <p class="wrap foot-small">© 2026 {E(NAME)} | Photographs: the house’s own</p>
</footer>'''

def door_html(pre='', page=False):
    """The booking door: three tiles, the A/C line, (Call when confirmed). A side sheet hinged on its right
    edge; on its own page at stay/ for JS off."""
    tiles = (f'<a class="tile tile-book" href="{E(BOOK["url"])}">{svg("cal")}<span>{E(BOOK["label"])}</span></a>'
             f'<a class="tile" href="{E(AIR_ROOM["url"])}">{svg("bed")}<span>{E(AIR_ROOM["label"])}</span></a>'
             f'<a class="tile" href="{E(AIR_HOUSE["url"])}">{svg("house")}<span>{E(AIR_HOUSE["label"])}</span></a>'
             + (f'<a class="tile" href="{TEL}">{svg("phone")}<span>Call Ashly</span></a>' if PHONE_CONFIRMED else ''))
    close = (f'<a class="door-x btn-ghost" href="../">{svg("x")}<span>Back to the house</span></a>' if page else
             f'<button class="door-x" type="button" data-door-close aria-label="Close">{svg("x")}</button>')
    return f'''<div class="door-in">
      <div class="door-gable" aria-hidden="true"></div>
      {close}
      <h2 class="title door-h" id="door-h">Book a room</h2>
      <div class="tiles">{tiles}</div>
      <p class="door-ac">{E(AC_LINE)}</p>
    </div>'''

door = f'''
<div class="door" id="door" role="dialog" aria-modal="true" aria-labelledby="door-h" hidden>
  <div class="door-scrim" data-door-close></div>
  <div class="door-panel">{door_html()}</div>
</div>'''

topbar = f'''
<header class="top" id="top">
  <a class="mark title" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections"><a href="#rooms">Rooms</a><a href="#house">The house</a><a href="#guests">Guests</a><a href="#finding">Finding it</a></nav>
  <a class="btn btn-book btn-sm" href="stay/" data-door>{svg('cal')}<span>Book</span></a>
</header>'''

bar = f'''
<div class="bar" id="bar">{btn_book('bar-book', short=True)}<a class="btn btn-line bar-more" href="stay/" data-door aria-label="More ways to book">{svg('more')}<span>More</span></a></div>'''

desc = f"{TAGLINE} Seven double rooms, live dates on Booking.com, the whole house on Airbnb."
page = f'''<!doctype html>
<html lang="en">
<head>{head(f'{NAME}, Midigama', desc)}
<script>{HEAD_JS}</script>
<style>{CSS}</style>
</head>
<body>
<a class="skip" href="#glance">Skip to the details</a>
{topbar}
<main>
<div class="piece" id="piece">
{stage}
<div class="flow">{hero}{glance}<div class="turn-room" aria-hidden="true"></div></div>
</div>
{static_turn}{rooms}{court}{carved}{breakfast}{guests}{finding}{closing}
</main>
{footer}{bar}{door}
<script>{JS}</script>
</body>
</html>
'''
DIST.mkdir(exist_ok=True)
(DIST / 'index.html').write_text(page)

stay = f'''<!doctype html>
<html lang="en">
<head>{head(f'Book a room | {NAME}', desc, '../')}
<style>{CSS}</style>
</head>
<body class="stay-page">
<main class="door door-page"><div class="door-panel">{door_html('../', page=True)}</div></main>
</body>
</html>
'''
(DIST / 'stay').mkdir(exist_ok=True)
(DIST / 'stay/index.html').write_text(stay)
print('wrote', DIST / 'index.html', len(page), 'bytes;', DIST / 'stay/index.html')
