#!/usr/bin/env python3
"""Assemble the interactive mockup (concept 2, "Under the thatch") into one self-contained dist/index.html.

Words, rooms, ratings, reviews and contact come from copy/en.json through coconut_data.py; nothing is
retyped. Strings written here are interface labels the template owns ("How do you like to sleep?",
tile, chip and clock labels). Media: src/make-media.sh. CSS and JS: page.css / page.js, inlined.
Run: python3 sites/coconut-surf-inn-guest-house-and-restaurant/mockups/interactive/src/build.py
"""
import pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from coconut_data import *   # noqa

DIST = HERE.parent / 'dist'
def src(name): return f'img/{name}.webp'
def wh(name): return webp_size(DIST / src(name))
def img(name, alt_id, lazy=True, cls='', sizes=None, set_=None):
    w, h = wh(name)
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    ss = f' srcset="{", ".join(f"{src(n)} {wh(n)[0]}w" for n in set_)}" sizes="{sizes}"' if set_ else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{src(name)}"{ss} width="{w}" height="{h}" alt="{E(ALT[alt_id])}"{extra}>'
def pic(tag, a, widths, sizes, **kw):  # one crop, several widths
    names = [f'{tag}-{a}-{w}' for w in widths]
    return img(names[-1], a, sizes=sizes, set_=names, **kw)

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return (' ' + SEP + ' ').join(f'<span>{i}</span>' for i in items)
def book(cls='', label=BOOK_LABEL):
    return f'<a class="btn btn-book {cls}" href="{E(BOOK)}">{svg("cal")}<span>{E(label)}</span></a>'
def call(cls='', short=False):
    t = 'Call' if short else f'Call {PHONE_SHOWN}'
    return f'<a class="btn btn-call {cls}" href="{TEL}">{svg("phone")}<span>{E(t)}</span></a>'
def clock(icon, label): return f'<p class="clock">{svg(icon)}<span>{E(label)}</span></p>'
def num(v, label):  # rolled by page.js on first view; plain text without it. role="img" carries the label
    return f'<span class="num" role="img" data-roll="{v}" aria-label="{E(label)}">{v}</span>'

def lazy(tag, a, widths, sizes):
    """A slide that is not on screen yet: its <img> is written by page.js when the slide's room or
    slideshow is shown; with JS off the <noscript> copy loads instead."""
    names = [f'{tag}-{a}-{w}' for w in widths]; w, h = wh(names[-1])
    ss = ', '.join(f'{src(n)} {wh(n)[0]}w' for n in names)
    return (f'<span class="lazy" data-src="{src(names[-1])}" data-srcset="{ss}" data-sizes="{sizes}" data-w="{w}" data-h="{h}" data-alt="{E(ALT[a])}">'
            f'<noscript>{pic(tag, a, widths, sizes)}</noscript></span>')

def show(sid, tag, ids, widths, sizes, ratio, label, eager=1, cls=''):
    """eager = how many leading slides carry a real (lazy-loading) <img>; the rest are deferred."""
    slides = ''.join(f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {len(ids)}">'
                     f'{pic(tag, a, widths, sizes) if i < eager else lazy(tag, a, widths, sizes)}</li>'
                     for i, a in enumerate(ids))
    return (f'<div class="show r{ratio} {cls}" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">'
            + ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"></button>' for i in range(len(ids)))
            + f'</div><button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

bk, gg, ab = RATINGS['booking'], RATINGS['google'], RATINGS['airbnb']
def rate(r, scale):  # a headline rating block: score, source, count and capture date; the whole block links to the source
    return (f'<a class="rate" href="{E(r["url"])}" rel="noopener"><span class="big">{num(r["shown"], r["shown"] + " out of " + scale)}<small aria-hidden="true">/{scale}</small></span>'
            f'<span class="rate-k"><b>{E(r["name"])}</b>, {r["count"]} reviews<br>{E(r["day"])}</span></a>')

# ------------------------------------------------------------------------------------------ hero
hero = f'''
<header class="top" id="top">
  <a class="mark" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections">{pipe(['<a href="#sleep">Rooms</a>', '<a href="#roof">The roof</a>', '<a href="#break">The break</a>'])}</nav>
  <div class="top-act">{book('btn-sm', 'Check dates')}<a class="btn btn-ic top-call" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg('phone')}</a></div>
</header>
<section class="hero" aria-label="{E(NAME)}">
  <div class="hero-media">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('hero-tall-450')} 450w, {src('hero-tall-600')} 600w" sizes="110vw">
      <img class="hero-img" src="{src('hero-wide-1920')}" srcset="{src('hero-wide-1440')} 1440w, {src('hero-wide-1920')} 1920w" sizes="100vw"
        width="1920" height="1080" alt="{E(ALT['img-102'])}" fetchpriority="high">
    </picture>
    <canvas class="depth" aria-hidden="true" data-wide="{src('hero-wide-1920')}" data-depth-wide="img/depth-wide.png" data-depth-tall="img/depth-tall.png"></canvas>
  </div>
  <div class="hero-text">
    <h1 class="hand">{E(NAME)}</h1>
    <p class="where">{E(WHERE)}</p>
    {book('btn-hero')}
  </div>
</section>'''

# ------------------------------------------------------------------- 13:00, check-in: at a glance
facts = f'''
<section class="facts" id="glance" aria-labelledby="h-glance">
  <div class="wrap">
    <div class="g-split">
    <div class="g-text">
    <h2 class="hand" id="h-glance">13:00, check-in</h2>
    <p class="lead">{E(TAGLINE)}</p>
    <p class="details">{pipe(['Coconuts in front of the guesthouse, an A-frame reef break', 'Restaurant upstairs, 7:30–22:00, every day', 'Live dates and prices on Booking.com'])}</p>
    <div class="actions">{book('', BOOK_LONG)}{call()}</div>
    </div>
    <div class="rates">{rate(bk, '10')}{rate(gg, '5')}</div>
    </div>
  </div>
</section>'''

# ------------------------------------------------------------ How do you like to sleep? (booking)
def chips(r):
    def c(on, icon, label, off_label):
        return f'<span class="chip{" on" if on else " off"}">{svg(icon)}{E(label if on else off_label)}</span>'
    return (c(r['fan'], 'fan', 'Fan', 'No fan') + c(r['ac'], 'snow', 'A/C', 'No A/C')
            + c(r['hot'], 'drop', 'Hot water', 'No hot water') + (c(True, 'door', 'Balcony', '') if r['balcony'] else ''))

def room_card(r, first):
    ids = GALLERIES[r['label']]
    return f'''
      <article class="room{' on' if first else ''}" id="room-{r['slug']}" data-room="{r['slug']}" aria-labelledby="rn-{r['slug']}">
        {show('rs-' + r['slug'], 'r43', ids, [720, 1200], '(max-width: 899px) 100vw, 880px', '43', r['label'] + ', photos', eager=1 if first else 0)}
        <div class="room-text">
          <h3 class="room-name" id="rn-{r['slug']}">{E(r['label'])}</h3>
          <p class="room-meta">{pipe([E(r['beds']), f"sleeps {r['sleeps']}", f"{r['m2']} m²"])}</p>
          <p class="chips">{chips(r)}</p>
          <p class="room-note">{E(r['note'])}</p>
          {book('btn-room')}
        </div>
      </article>'''

def tile(g, label, rooms, i):
    n = len(rooms); s = sorted({r['sleeps'] for r in rooms})
    sub = f"{n} kinds of room · sleep {' or '.join(map(str, s)) if len(s) < 3 else f'{s[0]} to {s[-1]}'}"
    icon = {'ac': 'snow', 'fan': 'fan', 'big': 'people'}[g]
    return (f'<a class="tile" href="#grp-{g}" role="tab" id="tab-{g}" data-group="{g}" aria-selected="{"true" if i == 0 else "false"}"'
            f' aria-controls="viewer"{"" if i == 0 else " tabindex=\"-1\""}>{svg(icon, "ic tile-ic")}'
            f'<span class="tile-label">{E(label)}</span><span class="tile-sub">{E(sub)}</span></a>')

ac_rooms = GROUPS[0][2]; fan_rooms = GROUPS[1][2]
order = ac_rooms + fan_rooms                       # every room once: A/C first (concepts §4.1), then fan
groups_attr = {r['slug']: ' '.join(g for g, _, rs in GROUPS if r in rs) for r in ROOMS}
listing = ''.join(f'<button class="pick" type="button" data-pick="{r["slug"]}" data-groups="{groups_attr[r["slug"]]}" aria-controls="room-{r["slug"]}">'
                  f'<span class="pick-name">{E(r["label"])}</span><span class="pick-sub">{svg("snow" if r["ac"] else "fan")}{"A/C" if r["ac"] else "Fan"} · sleeps {r["sleeps"]} · {r["m2"]} m²</span></button>'
                  for r in order)
off = BLOCKS['Six kinds of room'][0]
sleep = f'''
<section class="sleep tint" id="sleep" aria-labelledby="h-sleep">
  <div class="wrap">
    <div class="sleep-head">
      <h2 class="hand" id="h-sleep">How do you like to sleep?</h2>
      <p><b>Six kinds of room.</b> {E(off)}</p>
    </div>
    <div class="tiles" role="tablist" aria-label="How do you like to sleep?">
      {''.join(tile(g, l, rs, i) for i, (g, l, rs) in enumerate(GROUPS))}
    </div>
    <div class="viewer" id="viewer" role="tabpanel" aria-labelledby="tab-ac">
      <div class="picks" aria-label="Rooms"><span class="pill" aria-hidden="true"></span>{listing}</div>
      <div class="rooms">
        <h3 class="grp" id="grp-ac">{svg('snow')}Rooms with air conditioning and hot water</h3>
        <span class="anchor" id="grp-big" aria-hidden="true"></span>
        {''.join(room_card(r, i == 0) for i, r in enumerate(ac_rooms))}
        <h3 class="grp" id="grp-fan">{svg('fan')}Fan rooms: no air conditioning and no hot water</h3>
        {''.join(room_card(r, False) for r in fan_rooms)}
      </div>
    </div>
    <p class="stay">{svg('clock')}<span>{pipe([f"Check-in from {STAY['checkInFrom']}", f"Check-out until {STAY['checkOutTo']}"])} {SEP} {E(STAY['note'])}</span></p>
  </div>
</section>'''

# ------------------------------------------------------------------------------ inside the house
veranda = ['img-024', 'img-020', 'img-005', 'img-016']
inside = f'''
<section class="inside" id="inside" aria-labelledby="h-inside">
  <div class="wrap in-split">
    {pic('r32', 'img-007', [900, 1440], '(max-width: 899px) 100vw, 56vw', cls='well')}
    <div class="in-text">
      <h2 class="hand" id="h-inside">Inside the house</h2>
      {paras('Inside the house')}
    </div>
  </div>
  <ul class="row" data-drag tabindex="0" aria-label="The verandas, photos">
    {''.join(f'<li>{img(f"r45-{a}-720", a)}</li>' for a in veranda)}
  </ul>
</section>'''

# ----------------------------------------------------------------------------- the afternoon: roof
erin = next(r for r in REVIEWS if r['first'] == 'Erin')
roof = f'''
<section class="roof" id="roof" aria-labelledby="h-roof">
  <div class="wrap roof-split">
    <div class="roof-text">
      {clock('sun', 'The afternoon')}
      <h2 class="hand" id="h-roof">On the roof</h2>
      {paras('On the roof')}
    </div>
    {pic('r169', 'img-104', [900, 1440], '(max-width: 899px) 100vw, 58vw', cls='roof-img')}
  </div>
  <div class="wrap roof-two">
    <figure class="quote"><blockquote><p>{E(erin['quote'])}</p></blockquote>
      <figcaption>{pipe([f"<b>{E(erin['first'])}</b>, {E(erin['country'])}", erin['src'], E(erin['month'])])}</figcaption></figure>
    {show('roof-show', 'r32', ['img-100', 'img-101', 'img-015'], [800, 1200], '(max-width: 899px) 100vw, 680px', '32', 'On the roof, photos')}
  </div>
</section>'''

# ----------------------------------------------------------------------------- sunset: by the beach
beach = f'''
<section class="beach" id="beach" aria-labelledby="h-beach">
  <div class="band">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('r45-img-008-900')} 900w" sizes="100vw">
      <img src="{src('r169-img-008-1920')}" srcset="{src('r169-img-008-1280')} 1280w, {src('r169-img-008-1920')} 1920w" sizes="100vw"
        width="1920" height="1080" alt="{E(ALT['img-008'])}" loading="lazy" decoding="async">
    </picture>
  </div>
  <div class="tint beach-body">
    <div class="wrap beach-split">
      <div class="beach-text">
        {clock('sunset', 'Sunset')}
        <h2 class="hand" id="h-beach">By the beach</h2>
        {paras('By the beach')}
      </div>
      <div class="print">{pic('r32', 'img-095', [800, 1200], '(max-width: 899px) 100vw, 44vw')}</div>
    </div>
  </div>
</section>'''

# ------------------------------------------------------------------ until 22:00: the restaurant
janno = next(r for r in REVIEWS if r['first'] == 'Janno')
food = f'''
<section class="food" id="restaurant" aria-labelledby="h-food">
  <div class="wrap food-split">
    {pic('r45', 'img-106', [720, 1152], '(max-width: 899px) 100vw, 50vw', cls='food-img')}
    <div class="food-text">
      {clock('moon', 'Until 22:00')}
      <h2 class="hand" id="h-food">The restaurant upstairs</h2>
      {paras('The restaurant upstairs')}
      <p class="hours">{svg('clock')}<span>{E(HOURS)}</span></p>
      <figure class="quote small"><blockquote><p>{E(janno['quote'])}</p></blockquote>
        <figcaption>{pipe([f"<b>{E(janno['first'])}</b>, {E(janno['country'])}", janno['src'], E(janno['month'])])}</figcaption></figure>
    </div>
  </div>
  <div class="wrap">{pic('r219', 'img-099', [1280, 1920], '(max-width: 899px) 100vw, 1600px', cls='night')}</div>
  <div class="wrap family">
    <h3 class="hand" id="h-family">The Eranga family home</h3>
    <div>{paras('The Eranga family home')}</div>
  </div>
</section>'''

# -------------------------------------------------------------------------- from 7:30: the break
F = FORECAST
brk = f'''
<section class="break tint" id="break" aria-labelledby="h-break">
  <div class="wrap">
    <h2 class="hand" id="h-break">From 7:30, the break</h2>
    <div class="br-grid">
      <div class="br-left">
        <p class="spot">{E(SPOT)}</p>
        <p class="season">{E(SEASON)}</p>
        <div class="now" id="rosa-now" data-generated="{E(F['generated'])}">
          <p class="now-h"><span class="now-v" data-count="{F['hi']}"><span>{F['lo']}–</span><span class="cnt">{F['hi']}</span></span><small>m</small></p>
          <p class="now-k">{E(F['phrase'].capitalize())} at Coconuts <span class="sep" aria-hidden="true">|</span> {E(F['time'])}</p>
          <ul class="now-row">
            <li>{svg('swell')}<span><b>Swell {E(F['swell_h'])}</b> {E(F['swell'])}</span></li>
            <li>{svg('wind')}<span><b>Wind {E(F['wind'])}</b> {E(F['wind_class'])}</span></li>
          </ul>
          <p class="credit"><a href="{E(ROSA_PAGE)}" rel="noopener">Forecast for {E(ROSA_NAME)} by Rosa</a></p>
        </div>
      </div>
      <div class="rosa-box" data-rosa="{E(ROSA_WIDGET)}" data-title="Rosa surf forecast - {E(ROSA_NAME)}" data-loading="false">
        <a class="btn btn-call rosa-plain" href="{E(ROSA_PAGE)}" rel="noopener">{svg('wave')}<span>See today's forecast for {E(ROSA_NAME)} on Rosa</span></a>
      </div>
    </div>
    <p class="amen">{pipe([E(a) for a in AMENITIES])}</p>
  </div>
</section>'''

# ------------------------------------------------------------------------- 11:00, check-out: guests
def card(r):
    body = ''.join(f'<p>{E(p)}</p>' for p in r['paras'])
    return (f'<li class="card"><blockquote>{body}</blockquote><p class="who"><b>{E(r["first"])}</b>, {E(r["country"])}'
            f'<br>{E(r["src"])} · {E(r["month"])}</p></li>')
def rl(r, scale):
    return f'<a class="rl" href="{E(r["url"])}" rel="noopener"><b>{r["shown"]}/{scale}</b> {E(r["name"])}, {r["count"]} reviews, {E(r["day"])}</a>'
guests = f'''
<section class="guests" id="guests" aria-labelledby="h-guests">
  <div class="wrap">
    <h2 class="hand" id="h-guests">11:00, check-out</h2>
    <p class="rates-line">{''.join(rl(r, sc) for r, sc in ((bk, '10'), (gg, '5'), (ab, '5')))}</p>
  </div>
  <ul class="row cards" data-drag tabindex="0" aria-label="Guest reviews">{''.join(card(r) for r in REVIEWS if r['first'] not in ('Erin', 'Janno'))}</ul>
</section>'''

# ---------------------------------------------------------------------------------- getting here
getting = f'''
<section class="out tint" id="getting-here" aria-labelledby="h-out">
  <div class="wrap o-grid">
    <div>
      <h2 class="hand" id="h-out">Getting here</h2>
      {paras('Getting here')}
    </div>
    <div class="o-side">
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>
      <div class="actions col"><a class="btn btn-call" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>{call()}</div>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing" id="book" aria-label="Book">
  <div class="wrap center">
    <p class="close-line">{E(CLOSING)}</p>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>'''

foot = f'''
<footer class="foot tint">
  <div class="wrap f-grid">
    <div><p class="hand f-name">{E(NAME)}</p><p>{E(ADDRESS)}</p><p class="muted">{E(HOURS)}</p></div>
    <div class="actions">
      <a class="btn btn-call btn-sm" href="{TEL}">{svg('phone')}<span>{E(PHONE_SHOWN)}</span></a>
      <a class="btn btn-call btn-sm" href="{E(BOOK)}">{svg('cal')}<span>Rooms on Booking.com</span></a>
      <a class="btn btn-call btn-sm" href="{E(AIRBNB)}" rel="noopener">{svg('bed')}<span>Airbnb</span></a>
      <a class="btn btn-call btn-sm" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
    </div>
  </div>
  <p class="wrap fine">Ratings and reviews as published on Booking.com, Google and Airbnb, read {E(bk['day'])}.</p>
</footer>
<div class="bar" id="bar">
  <div class="bar-more" id="bar-more" hidden>
    <p>{E(TAGLINE)}</p>
    <p class="muted">{pipe(['Coconuts in front of the guesthouse', 'Restaurant upstairs, 7:30–22:00', 'Live dates and prices on Booking.com'])}</p>
    <p class="muted">{pipe([f"{bk['shown']}/10 Booking.com, {bk['count']} reviews", f"{gg['shown']}/5 Google, {gg['count']} reviews", E(bk['day'])])}</p>
  </div>
  <div class="bar-row">
    {book('bar-book')}
    <a class="btn bar-icon" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg('phone')}</a>
    <button class="btn bar-icon bar-tog" type="button" aria-expanded="false" aria-controls="bar-more" aria-label="More about the house" hidden>{svg('up')}</button>
  </div>
</div>'''

css = (HERE / 'page.css').read_text()
js = (HERE / 'page.js').read_text()
desc = f"{TAGLINE} Coconuts reef break in front. Rooms with a fan or with A/C. Book on Booking.com or call {PHONE_SHOWN}."
page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(NAME)}, Gurubebila</title><meta name="description" content="{E(desc)}">
<meta property="og:title" content="{E(NAME)}"><meta property="og:description" content="{E(TAGLINE)}"><meta property="og:image" content="{src('hero-wide-1440')}">
<meta name="theme-color" content="#ffffff">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Merienda:wght@700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,700&display=swap">
<link rel="preload" as="image" href="{src('hero-wide-1920')}" imagesrcset="{src('hero-wide-1440')} 1440w, {src('hero-wide-1920')} 1920w" imagesizes="100vw" media="(min-width: 768px)" fetchpriority="high">
<link rel="preload" as="image" href="{src('hero-tall-600')}" imagesrcset="{src('hero-tall-450')} 450w, {src('hero-tall-600')} 600w" imagesizes="110vw" media="(max-width: 767px)" fetchpriority="high">
<script>document.documentElement.classList.replace('no-js','js')</script>
<style>{css}</style>
</head>
<body>
<a class="skip" href="#sleep">Skip to the rooms</a>
<main>
{hero}
{facts}
{sleep}
{inside}
{roof}
{beach}
{food}
{brk}
{guests}
{getting}
{closing}
</main>
{foot}
<script>{js}</script>
</body>
</html>
'''
(DIST / 'index.html').write_text(page)
print('wrote', DIST / 'index.html', len(page), 'bytes')
