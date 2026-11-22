#!/usr/bin/env python3
"""Assemble the interactive mockup (concept 2, "In the palms") into one self-contained dist/index.html.

Words, rooms, ratings, reviews and contact come from sites/sea-you-surfers-nest/copy/en.json; the booking
URL is checked against dossier.json. Nothing is retyped. Strings written here are interface labels the
template owns ("Who's coming?", "Two of you", "See live dates", "In every room", tab labels).
Media: src/make-media.sh. CSS and JS: page.css / page.js beside this file, inlined.
Run: python3 sites/sea-you-surfers-nest/mockups/interactive/src/build.py
"""
import html, json, pathlib, struct

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
ROOT = SITE.parents[1]
DIST = HERE.parent / 'dist'
COPY = json.loads((SITE / 'copy' / 'en.json').read_text())
DOSSIER = json.loads((ROOT / 'dossier' / 'sea-you-surfers-nest' / 'dossier.json').read_text())

E = lambda s: html.escape(str(s), quote=True)

# ---------------------------------------------------------------- facts, all from copy/en.json
NAME = COPY['businessName']
ADDRESS = COPY['contact']['address']
_parts = ADDRESS.split(', ')
TOWN = f"{_parts[1].split(' ')[0]}, {_parts[-1]}"            # "Midigama, Sri Lanka"
MAP = COPY['contact']['mapUrl']
BL = COPY['bookingLinks']
BOOK, BOOK_LABEL = BL[0]['url'], BL[0]['label']
AIR_ROOM, AIR_ROOM_LABEL = BL[1]['url'], BL[1]['label']
AIR_HOUSE, AIR_HOUSE_LABEL = BL[2]['url'], BL[2]['label']
assert BOOK == DOSSIER['booking']['engine_url']['value'], 'booking URL differs from the dossier'
for b in BL[1:]:
    assert b['url'] in [o['url'] for o in DOSSIER['booking']['other_engines']['value']], b
# The number is read off the sign and not confirmed (dossier gaps[0]); every Call button stays out until it is.
PHONE_CONFIRMED = False
PHONE = COPY['contact']['phone']
BLOCK = {b['heading']: b for b in COPY['copyBlocks']}
def paras(heading): return BLOCK[heading]['body'].split('\n\n')
OFFER = paras('Seven rooms')
SLEEPS_LINE, AC_LINE = OFFER[0].split('. ', 1); SLEEPS_LINE += '.'   # the copy's own two sentences
ASHLY = paras('Ashly')
ASHLY_REPLY = ASHLY[0]                                            # "Your host is Ashly. He's a Superhost…"
STAY = COPY['stayInfo']
AMEN = {a['label']: a for a in COPY['amenities']}
ROOMS = COPY['rooms']
MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split()
def month(ym): y, m = ym.split('-'); return f'{MONTHS[int(m)-1]} {y}'
def day(d): y, m, dd = d.split('-'); return f'{int(dd)} {MONTHS[int(m)-1]} {y}'
PLATFORM = {'google': 'Google', 'booking': 'Booking.com', 'airbnb': 'Airbnb'}
def score(r): return (f"{r['score']:.1f}" if r['scale'] == '10' else f"{r['score']:g}" if r['score'] % 1 else f"{r['score']:.1f}") + '/' + r['scale']
RATINGS = COPY['ratings']
ORDER = ['Kenza', 'Niamh', 'Marina, Italy', 'Molly Jayne', 'Raul']
QUOTES = sorted(COPY['testimonials'], key=lambda t: ORDER.index(t['author']))
CHECKOUT = f"Check-out {STAY['checkOutFrom']}–{STAY['checkOutTo']}"
TYPE_LINE = DOSSIER['business']['google_category']['value'].replace('&', 'and')   # "Bed and breakfast", Google's category
SPOT_Q, SPOT_BY = COPY['spot'].split(',” ')[0] + ',”', COPY['spot'].split(',” ')[1]

# ---------------------------------------------------------------- images
def webp_size(p):
    b = p.read_bytes()[:40]
    k = b[12:16]
    if k == b'VP8 ': w, h = struct.unpack('<HH', b[26:30]); return w & 0x3fff, h & 0x3fff
    if k == b'VP8L':
        v = int.from_bytes(b[21:25], 'little'); return (v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1
    if k == b'VP8X': return int.from_bytes(b[24:27], 'little') + 1, int.from_bytes(b[27:30], 'little') + 1
    raise ValueError(p)
def src(n): return f'img/{n}.webp'
def wh(n): return webp_size(DIST / src(n))
def img(n, alt, lazy=True, cls='', sizes=None, set_=None, extra=''):
    w, h = wh(n)
    a = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high" decoding="async"'
    ss = f' srcset="{", ".join(f"{src(x)} {wh(x)[0]}w" for x in set_)}" sizes="{sizes}"' if set_ else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{src(n)}"{ss} width="{w}" height="{h}" alt="{E(alt)}" draggable="false"{a}{extra}>'

# Written from the photographs themselves (looked at in the crops this page uses).
ALT = {
    'img-003': 'A mint-green table with a potted pothos and two mint chairs on the upstairs balcony, coconut palm fronds filling the view beyond the white parapet',
    'img-002': 'A mint-green four-poster double made up in white linen, a grey panelled door and a small black mirror on the wall behind it',
    'img-015': 'A gabled mint-green four-poster with lime sheets, grey and striped pillows and a teal velvet throw, grey doors either side',
    'img-012': 'A mint four-poster with lime-green sheets and pillows and a towel roll, a timber towel ladder by the shuttered window',
    'img-022': 'Lime-green sheets and pillows on a mint four-poster, the teal throw at the foot and a potted plant beside the bed',
    'img-013': 'A mint-framed mirror with a little shelf on the bedroom wall, the corner of a lime-green bed below it and a dark green door to the side',
    'img-033': 'A grey panelled door with a carved roundel, a black mirror and a mint bedside cabinet beside a bed in white linen',
    'img-005': 'A mint four-poster with grey pillows and a teal velvet throw, a timber towel ladder and a mint cabinet with a plant beside it',
    'img-026': 'A mint four-poster with a teal velvet throw over lime sheets and striped pillows, a grey door behind',
    'img-009': 'A mint four-poster with grey sheets and a folded towel, a timber towel ladder and a green mirror on the wall behind',
    'img-025': 'A round wooden side table with a white tea set between two green chairs, the foot of a bed with a teal throw at the edge',
    'img-010': 'A timber towel ladder and a mint cabinet beside a dark green door marked WC, the end of a grey-sheeted bed at the side',
    'img-071': 'The courtyard bench with turquoise cushions against a grey wall, a small wooden stool in front and palms above the wall',
    'img-006': 'A corner of the courtyard: a potted plant, a wooden stool with a chequerboard top and a concrete bench below a grey door',
    'img-007': 'A mint table laid with a white teapot, two cups and a pink rose in a little pot, on a red-oxide floor',
    'img-039': 'A round wooden table with a white tea set between two green chairs',
    'img-041': 'A carved wooden settee with a cane seat beside a low table, big leaves in the foreground',
    'img-045': 'Two carved wooden chairs with cane seats at a small round table on the balcony',
    'img-037': 'A wooden stool with a chequerboard top beside a concrete bench, a leaf in the foreground',
    'img-038': 'A variegated pothos in a white pot on a concrete ledge, big leaves behind it',
    'img-077': 'The long upstairs balcony: a settee with green cushions, mint tables and chairs, and palms beyond the railing',
    'img-036': 'A wooden surfboard fixed upright to a grey garden wall with a tap and a shower head, palms above the wall',
    'img-069': 'Carved wooden masks hanging on a wall beside a doorway, leaves at the edge',
    'img-051': 'A courtyard doorway under a carved grey fanlight, a mint four-poster with a teal throw inside, carved masks and a carved shutter on the white wall, plants in pots',
    'img-001': 'The round sign by the road: Sea You, The Surfers Nest, Midigama, with a wave, a board, a sun and a palm, against palms and a cloudy sky',
}
DELUXE = ['img-002', 'img-015', 'img-012', 'img-022', 'img-013', 'img-033']   # Booking.com tags these to Deluxe
STANDARD = ['img-005', 'img-026', 'img-009', 'img-025', 'img-010']             # … and these to Standard
SHELF = ['img-071', 'img-006', 'img-007', 'img-039', 'img-041', 'img-045', 'img-037', 'img-038', 'img-077']

# ---------------------------------------------------------------- icons (line, 24 grid, currentColor)
ICON = {
    'wave': '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M9 9a4 4 0 0 1 7-2.6"/>',
    'bed': '<path d="M4 21V4M20 21V4M4 4h16M4 14h16M4 18h16"/><path d="M7 14v-2.5a1.5 1.5 0 0 1 1.5-1.5h7a1.5 1.5 0 0 1 1.5 1.5V14"/>',
    'wifi': '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M6 12.5a9 9 0 0 1 12 0"/><path d="M9.5 16a4 4 0 0 1 5 0"/><circle cx="12" cy="19" r=".8" fill="currentColor"/>',
    'cal': '<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8 14h2M14 14h2M8 17h2"/>',
    'throw': '<path d="M4 6h16v9H4z"/><path d="M4 15c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3"/>',
    'ladder': '<path d="M8 3l-1 18M16 3l1 18M7.8 7h8.4M7.5 11.5h9M7.2 16h9.6"/>',
    'cabinet': '<rect x="6" y="11" width="12" height="10" rx="1.5"/><path d="M12 11v10M10.5 15.5h0M13.5 15.5h0"/><rect x="8" y="3" width="8" height="6" rx="1"/>',
    'fan': '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4c0-3 1-6 3.5-6s2 3.5-2 6.4M13.4 12.8c2.6 1.5 4.8 3.8 3.5 6s-4-.3-4.6-4.9M10.6 12.8c-2.6 1.5-5.7 2-6.6-.3s2.6-3.2 6.4-1.9"/>',
    'two': '<circle cx="8.5" cy="8" r="3"/><circle cx="16" cy="8.5" r="2.6"/><path d="M3 19.5c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5M14 14.3c3.4-.4 6.5 1.6 6.5 5.2"/>',
    'group': '<circle cx="12" cy="7" r="2.6"/><circle cx="5.5" cy="9.5" r="2.1"/><circle cx="18.5" cy="9.5" r="2.1"/><path d="M7 19.5c0-3 2.2-5.2 5-5.2s5 2.2 5 5.2M1.8 18.5c0-2.4 1.6-4.2 3.7-4.2M22.2 18.5c0-2.4-1.6-4.2-3.7-4.2"/>',
    'ask': '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/><path d="M10 8a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6.9v.4M12 13.2h0"/>',
    'star': '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
    'pin': '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    'phone': '<path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 6.5 6.5l1.4-2.3 4.6 1.8V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"/>',
    'out': '<path d="M7 17L17 7M9 7h8v8"/>',
    'prev': '<path d="M15 5l-7 7 7 7"/>',
    'next': '<path d="M9 5l7 7-7 7"/>',
    'house': '<path d="M3.5 11L12 4l8.5 7M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
    'key': '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>',
}
def svg(n, cls='ico'):
    return f'<svg class="{cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[n]}</svg>'

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return f' {SEP} '.join(f'<span>{i}</span>' for i in items)

def btn(href, label, kind='book', icon='out', short=None, cls=''):
    aria = f' aria-label="{E(label)}"' if short else ''
    return (f'<a class="btn btn-{kind} {cls}" href="{E(href)}" rel="noopener"{aria}>'
            f'<span>{E(short or label)}</span>{svg(icon, "ico ico-end")}</a>')
def book(cls='', short=None): return btn(BOOK, BOOK_LABEL, 'book', 'out', short, cls)
def call(cls=''):
    return '' if not PHONE_CONFIRMED else f'<a class="btn btn-soft {cls}" href="tel:{PHONE}">{svg("phone")}<span>Call Ashly</span></a>'

def ratings():
    """Shown once on the page (4f r1): large figures, no boxes, each linked to its listing, with count and date."""
    return ('<ul class="rates" aria-label="Ratings">' + ''.join(
        f'<li><a href="{E(r["url"])}" rel="noopener"><b>{score(r)}</b>'
        f'<span>{PLATFORM[r["platform"]]}</span><small>{r["count"]} reviews {SEP} {day(r["capturedAt"])}</small></a></li>'
        for r in RATINGS) + '</ul>')

def show(sid, names, label):
    n = len(names)
    slides = ''.join(
        f'<li class="slide{" is-on" if i == 0 else ""}" aria-roledescription="slide" aria-label="{i+1} of {n}">'
        f'{img("room-" + x, ALT[x], sizes="(max-width: 767px) 92vw, 520px")}</li>'
        for i, x in enumerate(names))
    dots = ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"{" aria-current=\"true\"" if i == 0 else ""}></button>' for i in range(n))
    return (f'<div class="show" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl"><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots">{dots}</div>'
            f'<button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def who(p):
    """The "Who's coming?" panel: the closing sentence made into a control. Every answer is plain links."""
    two = (f'<div class="ans is-on" id="{p}-two" data-ans="two"><p class="ans-h">Two of you</p>'
           f'<div class="ans-btns">{book()}{btn(AIR_ROOM, AIR_ROOM_LABEL, "soft")}</div>'
           f'<p class="ans-note">{pipe([E(ROOMS[0]["label"]), E(ROOMS[1]["label"]), E(ROOMS[0]["beds"]) + " each"])}</p></div>')
    group = (f'<div class="ans" id="{p}-group" data-ans="group"><p class="ans-h">A group</p>'
             f'<div class="ans-btns">{btn(AIR_HOUSE, AIR_HOUSE_LABEL)}</div>'
             f'<p class="ans-note">{E(SLEEPS_LINE)}</p></div>')
    ask = (f'<div class="ans" id="{p}-ask" data-ans="ask"><p class="ans-h">A question first</p>'
           f'<div class="ans-btns">{call() if PHONE_CONFIRMED else btn(AIR_ROOM, "Ask Ashly on Airbnb", "book", "ask")}</div>'
           f'<p class="ans-note">{E(ASHLY_REPLY)}</p></div>')
    tile = lambda key, icon, label, on=False: (
        f'<button class="tile" type="button" data-for="{key}" aria-controls="{p}-{key}" aria-pressed="{"true" if on else "false"}">'
        f'{svg(icon)}<span>{label}</span>'
        f'<svg class="ring" aria-hidden="true"><rect x="1" y="1" rx="17" ry="17" pathLength="1"/></svg></button>')
    return (f'<div class="who" data-who>'
            f'<div class="who-q"><h3 class="hand" id="who-h">Who’s coming?</h3>'
            f'<div class="tiles" role="group" aria-label="Who’s coming?">'
            f'{tile("two", "two", "Two of you", True)}{tile("group", "group", "A group")}{tile("ask", "ask", "A question first")}</div></div>'
            f'<div class="answers" aria-live="polite">{two}{group}{ask}</div></div>')

# ---------------------------------------------------------------- page
hero = f'''
<a class="skip" href="#rooms">Skip to the rooms</a>
<header class="top" data-top>
  <a class="mark hand" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections"><a href="#rooms">Rooms</a><a href="#house">Courtyard</a><a href="#guests">Guests</a><a href="#find">Finding the house</a></nav>
  {book('btn-sm', 'See live dates')}
</header>
<main id="top">
<section class="hero" aria-label="{E(NAME)}">
  <div class="hero-media">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('hero-tall-600')} 600w" sizes="100vw">
      <img class="hero-img" data-asset="img-003" src="{src('hero-wide-1400')}" srcset="{src('hero-wide-1000')} 1000w, {src('hero-wide-1400')} 1400w" sizes="100vw"
        width="1400" height="788" alt="{E(ALT['img-003'])}" fetchpriority="high" draggable="false">
    </picture>
    <canvas class="palms" aria-hidden="true"></canvas>
  </div>
  <div class="hero-text">
    <h1 class="hand">{E(NAME)}</h1>
    <p class="where">{pipe([E(TYPE_LINE), E(TOWN)])}</p>
    {book('btn-hero', 'See live dates')}
  </div>
</section>'''

glance = f'''
<section class="glance" id="glance" aria-labelledby="glance-h">
  <div class="wrap glance-grid">
    <div class="glance-main">
      <h2 class="tag" id="glance-h">{E(COPY['tagline'])}</h2>
      <p class="spot">{E(SPOT_Q)} <span>{E(SPOT_BY)}</span></p>
      <p class="incl">{pipe(['7 rooms, all doubles', 'sleeps 14', E(AMEN['Free WiFi']['label'] + ' ' + AMEN['Free WiFi']['note']), E(AMEN['Kitchen']['label']), E(AMEN['Fan and mosquito net']['label']), 'Live dates on Booking.com'])}</p>
      <div class="where-row"><p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>{btn(MAP, 'Open in Google Maps', 'soft', 'out')}</div>
    </div>
    {ratings()}
  </div>
  <div class="wrap">{who('w1')}</div>
</section>'''

def room(r, key, names, on):
    note = pipe([E(r['beds']), f"Sleeps {r['sleeps']}", E(r['note'])])
    return (f'<article class="room{" is-on" if on else ""}" id="room-{key}" role="tabpanel" aria-labelledby="tab-{key}">'
            f'{show("show-" + key, names, r["label"] + " photos")}'
            f'<div class="room-txt"><h3 class="room-h">{E(r["label"])}</h3><p class="room-note">{note}</p>'
            f'{book()}</div></article>')

EVERY = [('bed', 'Mint-green four-poster double'), ('throw', 'Teal velvet throw'), ('ladder', 'Timber towel ladder'),
         ('cabinet', 'Green cabinet with a mirror'), ('fan', AMEN['Fan and mosquito net']['label'])]
rooms = f'''
<section class="rooms" id="rooms" aria-labelledby="rooms-h">
  <div class="wrap rooms-grid">
    <div class="rooms-intro">
      <h2 class="hand" id="rooms-h">Seven rooms</h2>
      <div class="pill" role="tablist" aria-label="Room type">
        <span class="pill-thumb" aria-hidden="true"></span>
        <button role="tab" id="tab-deluxe" aria-controls="room-deluxe" aria-selected="true" type="button">Deluxe Double</button>
        <button role="tab" id="tab-standard" aria-controls="room-standard" aria-selected="false" type="button" tabindex="-1">Standard Double</button>
      </div>
      <div class="rooms-copy">{''.join(f'<p>{E(p)}</p>' for p in OFFER)}</div>
    </div>
    <div class="stage">
      {room(ROOMS[0], 'deluxe', DELUXE, True)}
      {room(ROOMS[1], 'standard', STANDARD, False)}
    </div>
  </div>
  <div class="wrap every">
    <h3>In every room</h3>
    <ul>{''.join(f'<li>{svg(i)}<span>{E(t)}</span></li>' for i, t in EVERY)}</ul>
  </div>
</section>'''

house = f'''
<section class="house" id="house" aria-labelledby="house-h">
  <div class="court">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('court-tall-800')} 800w" sizes="100vw">
      <img src="{src('court-1920')}" srcset="{src('court-1280')} 1280w, {src('court-1920')} 1920w" sizes="100vw" width="1920" height="960"
        alt="{E(ALT['img-051'])}" loading="lazy" decoding="async" draggable="false">
    </picture>
  </div>
  <div class="wrap house-head">
    <h2 class="hand" id="house-h">Around the courtyard</h2>
    <div>{''.join(f'<p>{E(p)}</p>' for p in paras('Around the courtyard'))}</div>
  </div>
  <div class="wrap shelf" data-shelf>
    <ul class="shelf-track" tabindex="0" aria-label="Around the house, {len(SHELF)} photos">
      {''.join(f'<li class="card">{img("shelf-" + x, ALT[x], sizes="320px")}</li>' for x in SHELF)}
    </ul>
    <div class="shelf-ctrl">
      <button class="arw prev" type="button" aria-label="Previous photos">{svg('prev')}</button>
      <button class="arw next" type="button" aria-label="Next photos">{svg('next')}</button>
    </div>
  </div>
</section>'''

character = f'''
<section class="character" id="character" aria-labelledby="char-h">
  <div class="wrap char-grid">
    <figure class="print print-shower">{img('shower-1000', ALT['img-036'], sizes="(max-width: 767px) 88vw, 520px")}</figure>
    <div class="char-txt">
      <h2 class="hand" id="char-h">Carved doors and a surfboard shower</h2>
      {''.join(f'<p>{E(p)}</p>' for p in paras('Carved doors and a surfboard shower'))}
      <figure class="print print-masks">{img('masks-600', ALT['img-069'], sizes="300px")}</figure>
    </div>
  </div>
</section>'''

breakfast = f'''
<section class="breakfast" aria-labelledby="bf-h">
  <div class="wrap narrow center">
    <h2 class="hand" id="bf-h">Breakfast</h2>
    <p class="big">{E(BLOCK['Breakfast']['body'])}</p>
  </div>
</section>'''

def quote(t, i):
    q = '<br>'.join(E(line) for line in t['quote'].split('\n'))
    meta = pipe([E(t['author']), PLATFORM[t['source']], month(t['date'])])
    return f'<li class="q{" is-on" if i == 0 else ""}"><blockquote><p>{q}</p></blockquote><p class="q-by">{meta}</p></li>'
guests = f'''
<section class="guests" id="guests" aria-labelledby="ashly-h">
  <div class="wrap guests-grid">
    <div class="ashly">
      <h2 class="hand" id="ashly-h">Ashly</h2>
      {''.join(f'<p>{E(p)}</p>' for p in ASHLY)}
    </div>
    <div class="said">
      <div class="qrow" data-qrow>
        <ul class="qtrack" tabindex="0" aria-label="What guests wrote">{''.join(quote(t, i) for i, t in enumerate(QUOTES))}</ul>
        <div class="dots qdots">{''.join(f'<button type="button" class="dot" aria-label="Review {i+1}"{" aria-current=\"true\"" if i == 0 else ""}></button>' for i in range(len(QUOTES)))}</div>
      </div>
    </div>
  </div>
</section>'''

find = f'''
<section class="find" id="find" aria-labelledby="find-h">
  <div class="wrap find-grid">
    <figure class="print print-sign">{img('sign-840', ALT['img-001'], sizes="(max-width: 767px) 80vw, 420px")}</figure>
    <div class="find-txt">
      <h2 class="hand" id="find-h">Finding the house</h2>
      {''.join(f'<p>{E(p)}</p>' for p in paras('Finding the house'))}
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>
      <div class="find-btns">{btn(MAP, 'Open in Google Maps', 'soft', 'out')}{call()}</div>
      <p class="stay">{pipe([E(CHECKOUT), E(STAY['note'])])}</p>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing" id="book" aria-labelledby="close-h">
  <div class="band">
    <picture><img src="{src('band-1920')}" srcset="{src('band-1280')} 1280w, {src('band-1920')} 1920w" sizes="100vw"
      width="1920" height="822" alt="{E(ALT['img-003'])}" loading="lazy" decoding="async" draggable="false"></picture>
    <div class="band-txt">
      <p id="close-h">{E(COPY['closing'])}</p>
      <div class="band-btns">{book()}{btn(AIR_HOUSE, AIR_HOUSE_LABEL, 'light')}{btn(AIR_ROOM, AIR_ROOM_LABEL, 'light')}</div>
    </div>
  </div>
</section>
</main>'''

footer = f'''
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="mark hand">{E(NAME)}</p><p class="foot-addr">{E(ADDRESS)}</p></div>
    <div class="foot-btns">
      {btn(BOOK, 'Booking.com', 'soft', 'out')}{btn(AIR_ROOM, 'Airbnb, a room', 'soft', 'out')}{btn(AIR_HOUSE, 'Airbnb, the whole house', 'soft', 'out')}
      {btn(MAP, 'Google Maps', 'soft', 'pin')}{call()}
    </div>
  </div>
  <div class="wrap foot-small"><p>© 2026 {E(NAME)}</p></div>
</footer>
<div class="bar" data-bar>
  <span class="bar-name"><b class="hand">{E(NAME)}</b><small>{E(TOWN)}</small></span>
  {book('btn-bar', 'See live dates')}
</div>'''

FONTS = 'https://fonts.googleapis.com/css2?family=Courgette&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap'
page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(NAME)}: a bed and breakfast in Midigama, Sri Lanka</title>
<meta name="description" content="{E(COPY['tagline'])} Seven double rooms, live dates on Booking.com, the whole house on Airbnb.">
<meta name="theme-color" content="#ffffff">
<script>document.documentElement.className='js'</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<link rel="preload" as="image" href="{src('hero-wide-1400')}" imagesrcset="{src('hero-wide-1000')} 1000w, {src('hero-wide-1400')} 1400w" imagesizes="100vw" media="(min-width: 768px)">
<link rel="preload" as="image" href="{src('hero-tall-600')}" media="(max-width: 767px)">
<style>
{(HERE / 'page.css').read_text()}
</style>
</head>
<body>
{hero}
{glance}
{rooms}
{house}
{character}
{breakfast}
{guests}
{find}
{closing}
{footer}
<script>
{(HERE / 'page.js').read_text()}
</script>
</body>
</html>
'''
(DIST / 'index.html').write_text(page)
print('wrote', DIST / 'index.html', len(page.encode()), 'bytes')
