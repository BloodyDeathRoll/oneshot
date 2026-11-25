#!/usr/bin/env python3
"""Assemble the calm mockup of Sea You Surfers Nest (concept 1, "The board rack") into one
self-contained dist/index.html.

Every word about the business comes from sites/sea-you-surfers-nest/copy/en.json (passed 4c); nothing
is retyped. Strings written here are interface labels and section furniture the template owns
("See live dates", "In every room", "Open in Google Maps", the alt texts). CSS and JS are page.css and
page.js beside this file, inlined. Media: src/make-media.sh (run it first).
Run: python3 sites/sea-you-surfers-nest/mockups/calm/src/build.py
"""
import html, json, pathlib, re, struct

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
DIST = HERE.parent / 'dist'
COPY = json.loads((ROOT / 'sites/sea-you-surfers-nest/copy/en.json').read_text())
DOSSIER = json.loads((ROOT / 'dossier/sea-you-surfers-nest/dossier.json').read_text())

# The phone number on the house's sign is unconfirmed (dossier gaps[0], concepts §2 and §6): every Call
# button is left out until a human confirms it. Flip this to True and the buttons appear everywhere.
PHONE_CONFIRMED = False

E = lambda s: html.escape(str(s), quote=True)
NAME = COPY['businessName']
TAGLINE = COPY['tagline']
SPOT = COPY['spot']
CLOSING = COPY['closing']
BLOCK = {b['heading']: b for b in COPY['copyBlocks']}
ROOMS = COPY['rooms']
STAY = COPY['stayInfo']
CONTACT = COPY['contact']
LINKS = COPY['bookingLinks']
BOOK, BOOK_LABEL = LINKS[0]['url'], LINKS[0]['label']
AIR_ROOM, AIR_HOUSE = LINKS[1], LINKS[2]
assert BOOK == DOSSIER['booking']['engine_url']['value'], 'booking URL must equal the dossier, character for character'
assert CONTACT['phone'] == DOSSIER['contact']['phone']['value']
PHONE = CONTACT['phone']
PHONE_SHOWN = '+94 71 588 0052'
WHERE = 'Midigama, Sri Lanka'          # town and country from contact.address (concepts §6: no short hero line)
SHORT = 'See live dates'               # template label (concepts §3); the copy's full label rides in aria-label
MAP = CONTACT['mapUrl']

MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split()
def month(ym): y, m = ym.split('-'); return f'{MONTHS[int(m) - 1]} {y}'
def day(iso): y, m, d = iso.split('-'); return f'{int(d)} {MONTHS[int(m) - 1]} {y}'
PLATFORM = {'google': 'Google', 'booking': 'Booking.com', 'airbnb': 'Airbnb'}
RATINGS = [dict(r, name=PLATFORM[r['platform']], shown=f"{r['score']:.1f}") for r in COPY['ratings']]
AM = {a['label']: a for a in COPY['amenities']}
def amen(label):
    a = AM[label]; return a['label'] + (f" {a['note']}" if a.get('note') and a['note'].startswith('in ') else '')
INCLUDED = [amen('Free WiFi'), amen('Kitchen'), amen('Fan and mosquito net'), amen('Free private parking on site')]

# Alt texts, written from each photograph opened at full size (not from the dossier's descriptions).
ALT = {
    'img-004': 'A covered veranda: a wooden armchair with a cane seat, a low wooden table, potted plants and grey carved doors at the back, and three surfboards standing on a wall rack on the right',
    'img-034': 'Three surfboards, yellow, white with a blue rail and pale green, standing on a green wall rack beside potted plants',
    'img-002': 'A mint-green four-poster double with white sheets and striped pillows; a grey panelled double door stands open onto a veranda with a green table and chairs',
    'img-015': 'A mint-green four-poster with green sheets and a teal velvet throw, between two grey doors',
    'img-012': 'A mint-green four-poster with lime-green sheets and pillows beside a shuttered window',
    'img-022': 'Lime-green pillows and sheets on a mint-green bed, a teal throw across the foot and a potted plant beside it',
    'img-033': 'A mint-green four-poster with white sheets next to a grey panelled door, a dark mirror shelf and a green bedside cabinet',
    'img-032': 'A white bathroom with a pedestal sink under a black-framed mirror',
    'img-009': 'A mint-green four-poster with grey sheets, a timber towel ladder, a mirror and a green cabinet beside a dark green door',
    'img-026': 'A mint-green four-poster with grey pillows and a teal velvet throw under a ceiling fan',
    'img-005': 'A mint-green four-poster with a teal throw beside a timber towel ladder, a green cabinet and a mirror',
    'img-025': 'A wooden side table with a white tea set and a mint-green chair beside the foot of a four-poster',
    'img-071': 'A concrete bench with a teal cushion in the courtyard, potted plants either side and palm trees above the wall',
    'img-003': 'A mint-green table with a potted plant and two mint-green chairs on the upstairs balcony, palm fronds beyond the parapet',
    'img-045': 'Two carved wooden armchairs with cane seats and a round wooden table on a balcony',
    'img-027': 'A carved grey double door under a carved fanlight, a wall lamp beside it and a carved wooden chair',
    'img-035': 'Carved wooden masks hanging beside a grey door with a carved panel, ferns and plants below',
    'img-036': 'A shower built into a wooden surfboard fixed to a grey garden wall, the shower head above it and palms behind',
    'img-001': "The house's round sign on a post, a wave, a surfboard and a palm drawn on it with the words Sea You, The Surfers Nest, Midigama; palms and a roof behind",
}
# the spot line is set as a quote and its credit; the copy's words are split at the closing quote mark, never changed
SPOT_Q, SPOT_BY = re.match(r'(“[^”]+”)\s+(.+)$', SPOT).groups()
assert f'{SPOT_Q} {SPOT_BY}' == SPOT
DELUXE = ['img-002', 'img-015', 'img-012', 'img-022', 'img-033', 'img-032']
STANDARD = ['img-009', 'img-026', 'img-005', 'img-025']

# ---------------------------------------------------------------- helpers
def webp_size(p):
    b = p.read_bytes()
    if b[12:16] == b'VP8X': return 1 + int.from_bytes(b[24:27], 'little'), 1 + int.from_bytes(b[27:30], 'little')
    if b[12:16] == b'VP8 ': w, h = struct.unpack('<HH', b[26:30]); return w & 0x3fff, h & 0x3fff
    if b[12:16] == b'VP8L':
        n = int.from_bytes(b[21:25], 'little'); return (n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1
    raise ValueError(p)
def src(n): return f'img/{n}.webp'
def wh(n): return webp_size(DIST / src(n))
def srcset(names): return ', '.join(f'{src(n)} {wh(n)[0]}w' for n in names)
def img(names, alt, sizes, cls='', lazy=True):
    big = names[-1]; w, h = wh(big)
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    ss = f' srcset="{srcset(names)}" sizes="{sizes}"' if len(names) > 1 else ''
    return f'<img{f" class={chr(34)}{cls}{chr(34)}" if cls else ""} src="{src(big)}"{ss} width="{w}" height="{h}" alt="{E(alt)}"{extra}>'

def paras(body): return ''.join(f'<p>{E(p)}</p>' for p in body.split('\n\n'))

ICON = {
    'cal': '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    'phone': '<path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>',
    'map': '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
    'room': '<path d="M4 20V5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V20M2.5 20h19"/><circle cx="12.6" cy="12.4" r=".9"/><path d="M16 8h3.5v12"/>',
    'house': '<path d="M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
    'prev': '<path d="M14.5 6 8.5 12l6 6"/>',
    'next': '<path d="M9.5 6l6 6-6 6"/>',
    'up': '<path d="M6 14.5l6-6 6 6"/>',
    # "In every room": drawn from the house's own objects
    'bed': '<path d="M4 21V3M20 21V3M4 3h16M4 6.5h16"/><path d="M4 14.5h16v3.5H4zM6.5 14.5v-2.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2.2M12.5 14.5v-2.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2.2"/>',
    'throw': '<path d="M3.5 7.5c3-1.6 6-1.6 8.5 0s5.5 1.6 8.5 0v10c-3 1.6-6 1.6-8.5 0s-5.5-1.6-8.5 0z"/><path d="M3.5 12.5c3-1.6 6-1.6 8.5 0s5.5 1.6 8.5 0"/>',
    'ladder': '<path d="M8 2.5 6 21.5M16 2.5l2 19M7.6 6.5h8.8M7.2 10.5h9.6M6.8 14.5h10.4M6.4 18.5h11.2"/>',
    'cabinet': '<rect x="7" y="2.5" width="10" height="8" rx="1.2"/><rect x="5.5" y="12.5" width="13" height="9" rx="1.2"/><path d="M5.5 16.5h13M10.5 14.5h3"/>',
    'fan': '<circle cx="12" cy="9" r="1.6"/><path d="M12 7.4C11 4.5 12.6 3 14.6 3.4M13.6 9.4c3 .3 3.8 2.4 2.6 4M10.5 9.6c-2.4 1.8-4.5 1.1-4.6-.9"/><path d="M12 10.6V14"/><path d="M5 21c0-4 3-6.6 7-6.6s7 2.6 7 6.6"/>',
}
def svg(name, cls='ic'):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICON[name]}</svg>'

def book(cls='', label=None, full=True):
    """The primary action: a plain link to the Booking.com listing (works with JS off)."""
    lab = label or (BOOK_LABEL if full else SHORT)
    aria = f' aria-label="{E(BOOK_LABEL)}"' if lab != BOOK_LABEL else ''
    return f'<a class="btn btn-book {cls}" href="{E(BOOK)}"{aria}>{svg("cal")}<span>{E(lab)}</span></a>'
def call(cls=''):
    if not PHONE_CONFIRMED: return ''
    return f'<a class="btn btn-ink {cls}" href="tel:{PHONE}">{svg("phone")}<span>Call Ashly</span></a>'
def airbnb(link, icon, cls=''):
    return f'<a class="btn btn-ink {cls}" href="{E(link["url"])}" rel="noopener">{svg(icon)}<span>{E(link["label"])}</span></a>'

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return f' {SEP} '.join(f'<span>{E(i)}</span>' for i in items)

def rating(r):
    return (f'<li><a class="rating" href="{E(r["url"])}" rel="noopener">'
            f'<span class="score">{r["shown"]}<small>/{r["scale"]}</small></span>'
            f'<span class="rmeta"><b>{E(r["name"])}</b> {r["count"]} reviews</span><span class="rday">{E(day(r["capturedAt"]))}</span></a></li>')
def ratings(cls=''):
    return f'<ul class="ratings {cls}" aria-label="Ratings">' + ''.join(rating(r) for r in RATINGS) + '</ul>'

def ctrl(n, what):
    return (f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous {what}">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a {what}"><span class="pill" aria-hidden="true"></span>'
            + ''.join(f'<button type="button" class="dot" aria-label="{what.capitalize()} {i + 1} of {n}"></button>' for i in range(n))
            + f'</div><button class="arw next" type="button" aria-label="Next {what}">{svg("next")}</button></div>')

def show(sid, names, label):
    """A 3:2 dot slideshow. Without JS it is a scroll-snap row; with JS the slides stack and cross-fade."""
    slides = ''.join(
        f'<li class="slide{" on" if i == 0 else ""}" aria-roledescription="slide" aria-label="{i + 1} of {len(names)}">'
        f'{img([f"room-{a}-720", f"room-{a}-1080", f"room-{a}-1600"], ALT[a], "(max-width: 1199px) calc(100vw - 2 * var(--gut)), 1120px")}</li>'
        for i, a in enumerate(names))
    return (f'<div class="show" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>{ctrl(len(names), "photo")}</div>')

# ---------------------------------------------------------------- sections
hero = f"""
<header class="top" id="top">
  <a class="mark script" href="#top">{E(NAME)}</a>
  {book('btn-sm top-book', full=False)}
</header>
<section class="hero" aria-label="{E(NAME)}">
  <picture class="hero-media">
    <source media="(max-width: 699px)" srcset="{srcset(['hero-img-034-600', 'hero-img-034-900'])}" sizes="100vw" width="900" height="1800">
    <img src="{src('hero-img-004-1920')}" srcset="{srcset(['hero-img-004-1280', 'hero-img-004-1920'])}" sizes="100vw"
      width="1920" height="1080" alt="{E(ALT['img-004'])}" fetchpriority="high">
  </picture>
  <div class="hero-text">
    <h1 class="script">{E(NAME)}</h1>
    <p class="where">{E(TAGLINE)}</p>
    {book('btn-hero', full=False)}
  </div>
</section>"""

glance = f"""
<section class="glance" id="glance" aria-labelledby="h-glance">
  <div class="col center">
    <h2 class="sr" id="h-glance">At a glance</h2>
    <figure class="spot-q">
      <blockquote><p>{E(SPOT_Q)}</p></blockquote>
      <figcaption>{E(SPOT_BY)}</figcaption>
    </figure>
    <p class="inc">{pipe(INCLUDED)}</p>
    {ratings('glance-r')}
    <p class="price">Live dates on Booking.com</p>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>"""

def room_row(r, sid, names, flip=False):
    return f"""
  <article class="room" aria-labelledby="h-{sid}">
    {show(sid, names, r['label'] + ' photographs')}
    <div class="room-text">
      <div><h3 id="h-{sid}">{E(r['label'])}</h3>
      <p class="room-facts">{pipe([r['beds'], f"Sleeps {r['sleeps']}"])}</p></div>
      <p class="room-note">{E(r['note'])}</p>
      <div class="actions">{book('btn-room', full=False)}{call()}</div>
    </div>
  </article>"""

EVERY = [('bed', 'Mint-green four-poster double'), ('throw', 'Teal velvet throw'), ('ladder', 'Timber towel ladder'),
         ('cabinet', 'Green cabinet with a mirror'), ('fan', AM['Fan and mosquito net']['label'])]
rooms_b = BLOCK['Seven rooms']
rooms = f"""
<section class="rooms tint" id="rooms" aria-labelledby="h-rooms">
  <div class="wrap">
    <div class="rooms-head">
      <h2 class="script" id="h-rooms">{E(rooms_b['heading'])}</h2>
      <div class="rooms-intro">{paras(rooms_b['body'])}</div>
    </div>
    <div class="every">
      <h3>In every room</h3>
      <ul>{''.join(f'<li>{svg(i, "ic ic-mint")}<span>{E(t)}</span></li>' for i, t in EVERY)}</ul>
    </div>
    {room_row(ROOMS[0], 'deluxe', DELUXE)}
    {room_row(ROOMS[1], 'standard', STANDARD)}
  </div>
</section>"""

court_b = BLOCK['Around the courtyard']
court = f"""
<section class="court" id="courtyard" aria-labelledby="h-court">
  <div class="band">{img(['court-img-071-800', 'court-img-071-1600'], ALT['img-071'], '100vw')}</div>
  <div class="wrap court-grid">
    <div class="court-text">
      <h2 class="script" id="h-court">{E(court_b['heading'])}</h2>
      {paras(court_b['body'])}
    </div>
    <div class="pair">
      {img(['balc-img-003-800'], ALT['img-003'], '(max-width: 899px) 50vw, 340px')}
      {img(['balc-img-045-800'], ALT['img-045'], '(max-width: 899px) 50vw, 340px')}
    </div>
  </div>
</section>"""

carved_b = BLOCK['Carved doors and a surfboard shower']
carved = f"""
<section class="carved tint" id="carved" aria-labelledby="h-carved">
  <div class="wrap">
    <h2 class="script center" id="h-carved">{E(carved_b['heading'])}</h2>
    <div class="prints" role="region" tabindex="0" aria-label="Photographs: the carved door, the masks and the surfboard shower">{''.join(f'<div class="print">{img([f"print-{a}-640"], ALT[a], "(max-width: 699px) 62vw, 340px")}</div>' for a in ['img-027', 'img-035', 'img-036'])}</div>
    <div class="col">{paras(carved_b['body'])}</div>
  </div>
</section>"""

bf_b = BLOCK['Breakfast']

ashly_b = BLOCK['Ashly']
# Kenza first (4f round 1): her "steps away from the sea" is the page's one guest line about the water
TESTI = sorted(COPY['testimonials'], key=lambda t: t['author'] != 'Kenza')
quotes = ''.join(
    f'<figure class="q{" on" if i == 0 else ""}" aria-roledescription="slide" aria-label="{i + 1} of {len(COPY["testimonials"])}">'
    f'<blockquote lang="{t["lang"]}"><p>{E(t["quote"])}</p></blockquote>'
    f'<figcaption>{pipe([t["author"], PLATFORM[t["source"]], month(t["date"])])}</figcaption></figure>'
    for i, t in enumerate(TESTI))
guests = f"""
<section class="guests" id="guests" aria-labelledby="h-ashly">
  <div class="wrap guests-grid">
    <div class="ashly">
      <h2 class="script" id="h-ashly">{E(ashly_b['heading'])}</h2>
      {paras(ashly_b['body'])}
      <div class="bf">
        <h3 class="script">{E(bf_b['heading'])}</h3>
        <p>{E(bf_b['body'])}</p>
      </div>
    </div>
    <div class="said">
      <h3 class="sr">What guests wrote</h3>
      <div class="quotes" data-quotes role="region" aria-roledescription="carousel" aria-label="Guest reviews">
        <div class="qstack" aria-live="polite">{quotes}</div>
        {ctrl(len(COPY['testimonials']), 'review')}
      </div>
    </div>
  </div>
</section>"""

find_b = BLOCK['Finding the house']
checkout = f"Check-out {STAY['checkOutFrom']}–{STAY['checkOutTo']}"
finding = f"""
<section class="finding tint" id="finding" aria-labelledby="h-find">
  <div class="wrap find-grid">
    <div class="sign print">{img(['sign-img-001-720'], ALT['img-001'], '(max-width: 899px) 60vw, 400px')}</div>
    <div class="find-text">
      <h2 class="script" id="h-find">{E(find_b['heading'])}</h2>
      <p class="addr">{svg('map')}<span>{E(CONTACT['address'])}</span></p>
      <div class="actions"><a class="btn btn-ink" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>{call()}</div>
      <div class="find-body">{paras(find_b['body'])}</div>
      <p class="stay">{pipe([checkout, STAY['note']])}</p>
    </div>
  </div>
</section>"""

closing = f"""
<section class="closing" id="book" aria-labelledby="h-close">
  <div class="close-band">
    <picture>
      <source media="(max-width: 699px)" srcset="{src('close-img-002-800')}" width="800" height="600">
      <img src="{src('close-img-002-1600')}" width="1600" height="686" alt="{E(ALT['img-002'])}" loading="lazy" decoding="async">
    </picture>
  </div>
  <div class="close-card">
    <h2 class="sr" id="h-close">Book your stay</h2>
    <p class="close-line">{E(CLOSING)}</p>
    <div class="actions center close-actions">{book()}{airbnb(AIR_ROOM, 'room')}{airbnb(AIR_HOUSE, 'house')}{call()}</div>
  </div>
</section>"""

foot = f"""<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-id">
      <p class="foot-name script">{E(NAME)}</p>
      <p>{E(CONTACT['address'])}</p>
      <p class="fine">Ratings as published on Google, Booking.com and Airbnb, read {E(day(RATINGS[0]['capturedAt']))}.</p>
    </div>
    <nav class="foot-links" aria-label="Book and find the house">
      <a class="btn btn-ink btn-sm" href="{E(BOOK)}">{svg('cal')}<span>Booking.com</span></a>
      <a class="btn btn-ink btn-sm" href="{E(AIR_ROOM['url'])}" rel="noopener">{svg('room')}<span>Airbnb, a room</span></a>
      <a class="btn btn-ink btn-sm" href="{E(AIR_HOUSE['url'])}" rel="noopener">{svg('house')}<span>Airbnb, the whole house</span></a>
      <a class="btn btn-ink btn-sm" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
      {call('btn-sm')}
    </nav>
  </div>
  <p class="wrap fine copy">© 2026 {E(NAME)}</p>
</footer>
<nav class="bar" id="bar" aria-label="Book">
  <div class="bar-panel" id="bar-panel" hidden>
    <p class="bar-spot">{E(SPOT)}</p>
    <p class="inc">{pipe(INCLUDED)}</p>
    {ratings('bar-r')}
    <p class="price">Live dates on Booking.com</p>
  </div>
  <div class="bar-row">
    <button class="bar-more" type="button" aria-expanded="false" aria-controls="bar-panel" aria-label="At a glance">{svg('up')}</button>
    {book('bar-book', full=False)}{call('bar-call')}
  </div>
</nav>"""

css = (HERE / 'page.css').read_text()
js = (HERE / 'page.js').read_text()
desc = f'{TAGLINE} Seven double rooms, live dates on Booking.com.'
page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(NAME)} · {E(WHERE)}</title>
<meta name="description" content="{E(desc)}">
<meta property="og:title" content="{E(NAME)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:image" content="{src('hero-img-004-1280')}">
<meta name="theme-color" content="#ffffff">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Karla:wght@400;600&display=swap">
<link rel="preload" as="image" media="(min-width: 700px)" imagesrcset="{srcset(['hero-img-004-1280', 'hero-img-004-1920'])}" imagesizes="100vw" fetchpriority="high">
<link rel="preload" as="image" media="(max-width: 699px)" imagesrcset="{srcset(['hero-img-034-600', 'hero-img-034-900'])}" imagesizes="100vw" fetchpriority="high">
<script>document.documentElement.classList.add('js')</script>
<style>{css}</style>
</head>
<body>
<a class="skip" href="#rooms">Skip to the rooms</a>
<main>
{hero}
{glance}
{rooms}
{court}
{carved}
{guests}
{finding}
{closing}
</main>
{foot}
<script>{js}</script>
</body>
</html>
'''
page = re.sub(r'\n\s*\n', '\n', page)
(DIST / 'index.html').write_text(page)
print('wrote', DIST / 'index.html', len(page), 'bytes')
