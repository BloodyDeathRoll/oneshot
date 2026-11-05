#!/usr/bin/env python3
"""Assemble the calm mockup (concept 1, "The view from the roof") into one self-contained dist/index.html.

Words, rooms, ratings, reviews and contact come from copy/en.json through data.py; nothing is retyped.
Strings written here are interface labels and section titles the template owns.
Media: src/make-media.sh. CSS and JS: page.css / page.js beside this file, inlined.
Run: bash src/make-media.sh && python3 src/build.py   (from anywhere)
"""
import base64, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from data import *   # noqa

DIST = HERE.parent / 'dist'
FIRST_SCREEN_ONLY = '--hero' in sys.argv

def src(name): return f'img/{name}.webp'
def b64(name): return 'data:image/webp;base64,' + base64.b64encode((DIST / src(name)).read_bytes()).decode()
def wh(name): return webp_size(DIST / src(name))
def srcset(names): return ', '.join(f'{src(n)} {wh(n)[0]}w' for n in names)

def picture(name, alt, sizes=None, lazy=True, cls='', names=None, pos=None):
    w, h = wh(name)
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    ss = f' srcset="{srcset(names)}" sizes="{sizes}"' if names else ''
    c = f' class="{cls}"' if cls else ''
    st = f' style="object-position:{pos}"' if pos else ''
    return f'<img{c} src="{src(name)}"{ss} width="{w}" height="{h}" alt="{E(alt)}"{st}{extra}>'

def band(cls, d, d1280, m, alt, over=''):
    """A full-bleed photograph: 21:9 or cover on desktop, 4:5 on the phone. `over` is optional type on it."""
    W, H = wh(d)
    return (f'<div class="band {cls}"><picture>'
            f'<source media="(max-width: 767px)" srcset="{src(m)}" width="{wh(m)[0]}" height="{wh(m)[1]}">'
            f'<img src="{src(d)}" srcset="{srcset([d1280, d])}" sizes="100vw" width="{W}" height="{H}" alt="{E(alt)}" loading="lazy" decoding="async">'
            f'</picture>{over}</div>')

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items):  # the " | " separators are drawn in CSS; page.js hides one that would start a wrapped line
    return '<span class="pl">' + ' '.join(f'<span class="pi">{i}</span>' for i in items) + '</span>'

def book(cls='', label=BOOK_LABEL, icon=True):
    return f'<a class="btn btn-book {cls}" href="{E(BOOK)}">{svg("cal") if icon else ""}<span>{E(label)}</span></a>'
def call(cls='', label=None):
    return f'<a class="btn btn-call {cls}" href="{TEL}">{svg("phone")}<span>{E(label or "Call " + PHONE_SHOWN)}</span></a>'

# ---------------------------------------------------------------- the first screen
hero = f"""
<header class="top" id="top">
  <a class="mark" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections"><a href="#rooms">Rooms</a><a href="#roof">The roof</a><a href="#break">The break</a></nav>
  {book('btn-sm top-book', 'Check dates')}
  <a class="top-call" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg('phone')}</a>
</header>
<section class="hero" aria-label="{E(NAME)}">
  <div class="hero-media">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('hero-m')}" width="{wh('hero-m')[0]}" height="{wh('hero-m')[1]}">
      <img class="hero-img" src="{src('hero-d')}" srcset="{srcset(['hero-1280', 'hero-d'])}" sizes="100vw"
        width="{wh('hero-d')[0]}" height="{wh('hero-d')[1]}" alt="{E(ALT['img-009'])}" fetchpriority="high">
    </picture>
  </div>
  <div class="hero-text">
    <h1 class="script">{E(NAME)}</h1>
    <p class="where">{E(HERO_LINE)}</p>
    <div class="hero-actions">{book('btn-hero')}{call('btn-hero-call', 'Call')}</div>
  </div>
</section>"""

def show_html(sid, slides, n, ratio, label):
    """A dot slideshow: a scroll-snap row (works with JS off); dots and arrows are enabled by page.js."""
    cls = ' '.join('r' + r if r[0].isdigit() else r for r in ratio.split())
    return (f'<div class="show {cls}" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">'
            + ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"></button>' for i in range(n))
            + f'</div><span class="pips" aria-hidden="true">' + '<i></i>' * n
            + f'</span><button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def show(sid, names, ratio, label, sizes, prefix):
    slides = ''.join(
        f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {len(names)}">'
        f'{picture(prefix + n, ALT[n])}</li>' for i, n in enumerate(names))
    return show_html(sid, slides, len(names), ratio, label)

def rating(r):
    return (f'<a class="rating" href="{E(r["url"])}" rel="noopener">'
            f'<span class="score">{r["shown"]}<small>/{r["scale"]}</small></span>'
            f'<span class="rmeta"><span class="rname">{E(r["name"])}</span>'
            f'<span class="rsub">{r["count"]} reviews</span><span class="rsub">{E(r["day"])}</span></span></a>')

def moment(icon, label):   # the clock that orders the page: a time or a time of day, never an invented hour
    return f'<p class="moment">{svg(icon)}<span>{E(label)}</span></p>'

# ---------------------------------------------------------------- 13:00, check-in (the booking head)
R = {r['platform']: r for r in RATINGS}
checkin = f"""
<section class="checkin" aria-labelledby="h-in">
  <div class="col center">
    <h2 class="script title" id="h-in">{E(STAY['checkInFrom'])}, check-in</h2>
    <p class="lede">{E(TAGLINE)}</p>
    <p class="details">{pipe(['Coconuts in front of the guesthouse', 'Restaurant upstairs, 7:30–22:00', 'Roof terrace', 'Rack for your boards'])}</p>
    <div class="ratings two">{rating(R['booking'])}{rating(R['google'])}</div>
    <div class="actions">{book(label=BOOK_LONG)}{call(label='Call')}</div>
    <p class="fine">{E(CLOSING.split('. ')[0])}.</p>
  </div>
</section>"""

# ---------------------------------------------------------------- the rooms
# Round 2 (4f round 1: six alternating rows ran ~6 desktop / ~7 phone screens): the A/C group is one 4-up row,
# the fan group one row with its label and the house rules beside it. On the phone the A/C rooms stack with 3:2
# photos and the two fan rooms sit side by side.
def room_card(label, i, kind):
    r = ROOMS[label]
    meta = pipe([f'{svg("bed")}{E(r["beds"])}', f'{svg("people")}Sleeps {r["sleeps"]}', f'{svg("area")}{E(area(r))}'])
    imgs = GALLERIES[label]
    slides = ''.join(
        f'<li class="slide" aria-roledescription="slide" aria-label="{k+1} of {len(imgs)}">'
        f'{picture("r-" + n, ALT[n], pos=POS.get(n))}</li>' for k, n in enumerate(imgs))
    return (f'<article class="room {kind}" aria-labelledby="rm-{i}">'
            f'{show_html(f"s-room-{i}", slides, len(imgs), "45 over", label + ", photos")}'
            f'<div class="room-text"><h4 id="rm-{i}">{E(label)}</h4><p class="meta">{meta}</p>'
            f'<p class="note">{E(r["note"])}</p><div class="actions">{book("btn-room")}</div></div></article>')

ac_cards = ''.join(room_card(l, n, 'ac') for n, l in enumerate(AC_ROOMS))
fan_cards = ''.join(room_card(l, n + len(AC_ROOMS), 'fan') for n, l in enumerate(FAN_ROOMS))
rooms = f"""
<section class="rooms tint" id="rooms" aria-labelledby="h-rooms">
  <div class="wrap wide">
    <div class="head center">
      <h2 class="script title" id="h-rooms">Six kinds of room</h2>
      <div class="lede">{paras('Six kinds of room')}</div>
    </div>
    <h3 class="group">{svg('snow')}<span>Rooms with air conditioning and hot water</span></h3>
    <div class="grid-ac">{ac_cards}</div>
    <div class="fan-row">
      <div class="fan-head">
        <h3 class="group">{svg('fan')}<span>Fan rooms: no air conditioning and no hot water</span></h3>
        <div class="stay">
          <p class="details">{pipe([f"Check-in from {STAY['checkInFrom']}", f"Check-out until {STAY['checkOutTo']}"])}</p>
          <p>{E(STAY['note'])}</p>
        </div>
      </div>
      <div class="fan-cards">{fan_cards}</div>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- inside the house
three = ''.join(picture(f'q-{a}', ALT[a]) for a in ['img-006', 'img-016', 'img-003'])
inside = f"""
<section class="inside" aria-labelledby="h-inside">
  <div class="wrap">
    <div class="split75">
      <div class="pic">{picture('court-1400', ALT['img-007'], '(max-width: 899px) 100vw, 680px', names=['court-800', 'court-1400'])}</div>
      <div class="txt"><h2 class="script title" id="h-inside">Inside the house</h2>{paras('Inside the house')}</div>
    </div>
    <div class="three">{three}</div>
  </div>
</section>"""

# ---------------------------------------------------------------- the afternoon: on the roof
roof = f"""
<section class="roof" id="roof" aria-labelledby="h-roof">
  {band('b-roof', 'roof-1920', 'roof-1280', 'roof-m', ALT['img-103'])}
  <div class="wrap roof-grid">
    <div class="txt">{moment('sun', 'The afternoon')}<h2 class="script title" id="h-roof">On the roof</h2>{paras('On the roof')}</div>
    <div class="pic reader">{picture('reader-720', ALT['img-015'])}</div>
    <div class="pic swing">{picture('swing-1000', ALT['img-101'])}</div>
  </div>
</section>"""

# ---------------------------------------------------------------- sunset: by the beach
beach = f"""
<section class="beach tint" aria-labelledby="h-beach">
  {band('b-sunset', 'sunset-1920', 'sunset-1280', 'sunset-m', ALT['img-008'])}
  <div class="wrap beach-grid">
    <div class="txt">{moment('sunset', 'Sunset')}<h2 class="script title" id="h-beach">By the beach</h2>{paras('By the beach')}</div>
    <div class="pic turtles">{picture('turtles-1280', ALT['img-095'])}</div>
  </div>
</section>"""

# ---------------------------------------------------------------- until 22:00: the restaurant, and the family
MEAGAN = next(r for r in REVIEWS if r['author'].startswith('Meagan'))
def quote_html(r, cls='q'):
    body = '<br>'.join(E(l) for l in r['lines'])
    return (f'<blockquote class="{cls}"><p>{body}</p></blockquote>'
            f'<p class="who">{pipe([E(r["author"]), E(r["src"]), E(r["month"])])}</p>')
EAT = ['img-105', 'img-106', 'img-107', 'img-104']
eat = f"""
<section class="eat" aria-labelledby="h-eat">
  {band('b-night', 'night-1920', 'night-1280', 'night-m', ALT['img-099'],
        f'<div class="over">{moment("moon", "Until 22:00")}<h2 class="script title" id="h-eat">The restaurant upstairs</h2></div>')}
  <div class="wrap">
    <div class="split75">
      {show('s-eat', EAT, '32', 'The restaurant upstairs, photos', '(max-width: 899px) 100vw, 680px', 'eat-')}
      <div class="txt">
        {paras('The restaurant upstairs')}
        <p class="hours">{svg('clock')}<span>{E(HOURS_NOTE)}</span></p></div>
    </div>
    <div class="family">
      <div class="fam-txt"><h2 class="script title sm" id="h-family">The Eranga family home</h2>{paras('The Eranga family home')}</div>
      <figure class="pull">{quote_html(MEAGAN)}</figure>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- from 7:30: the break, and Rosa
N = rosa_now()
ROSA_PAGE = f'https://rosa.surf/spot/{ROSA_ID}'
brk = f"""
<section class="brk tint" id="break" aria-labelledby="h-break">
  <div class="wrap">
    <div class="col">
      <h2 class="script title" id="h-break">From 7:30, the break</h2>
      <p class="spot">{E(SPOT)}</p>
      <p class="season">{E(SEASON)}</p>
    </div>
    <div class="rosa">
      <div class="rosa-head">
        <div class="now" id="rosa-now" data-generated="{E(N['generated'])}" data-json="https://rosa-data-opal.vercel.app/data/spots/{ROSA_ID}.json">
          <p class="now-k">Coconuts, now</p>
          <p class="now-h"><span id="rosa-h">{N['h']}</span><small>m</small></p>
          <p class="now-p" id="rosa-phrase">{E(N['phrase'].capitalize())}</p>
          <ul class="now-list">
            <li>{svg('clock')}<span id="rosa-time">{E(N['time'])}</span></li>
            <li>{svg('wave')}<span id="rosa-swell">Swell {N['period']} s from the {N['sdir']}</span></li>
            <li>{svg('wind')}<span id="rosa-wind">Wind {N['wind']} km/h, {E(N['wclass'])}</span></li>
          </ul>
          <a class="credit" href="{ROSA_PAGE}" rel="noopener">Forecast for {ROSA_NAME} by Rosa</a>
        </div>
        <p class="rosa-plain" id="rosa-plain"><a class="btn btn-call" href="{ROSA_PAGE}" rel="noopener">{svg('wave')}<span>See today's forecast for {ROSA_NAME} on Rosa</span></a></p>
      </div>
      <div class="rosa-box" data-rosa="https://rosa.surf/widget/?spot={ROSA_ID}&amp;theme=light&amp;units=metric" data-title="Rosa surf forecast - {ROSA_NAME}">
        <div class="fallback"><a class="btn btn-call" href="{ROSA_PAGE}" rel="noopener">{svg('wave')}<span>See today's forecast for {ROSA_NAME} on Rosa</span></a></div>
      </div>
    </div>
    <p class="amen">{pipe([E(a) for a in AMENITIES])}</p>
  </div>
</section>"""

# ---------------------------------------------------------------- 11:00, check-out: guests
QUOTES = [r for r in REVIEWS if r is not MEAGAN]     # Meagan's words sit with the family; every quote appears once
qs = ''.join(f'<li class="qi" aria-roledescription="slide" aria-label="{i+1} of {len(QUOTES)}">{quote_html(r)}</li>'
             for i, r in enumerate(QUOTES))
guests = f"""
<section class="guests" id="guests" aria-labelledby="h-guests">
  <div class="wrap">
    <h2 class="script title center" id="h-guests">{E(STAY['checkOutTo'])}, check-out</h2>
    <div class="ratings three-r">{''.join(rating(r) for r in RATINGS)}</div>
    <div class="quotes" data-quotes role="region" aria-roledescription="carousel" aria-label="What guests wrote">
      <ul class="qtrack" tabindex="0">{qs}</ul>
      <div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous review">{svg("prev")}</button>
        <div class="dots" role="group" aria-label="Choose a review">{''.join(f'<button type="button" class="dot" aria-label="Review {i+1}"></button>' for i in range(len(QUOTES)))}</div><span class="pips" aria-hidden="true">{'<i></i>' * len(QUOTES)}</span>
        <button class="arw next" type="button" aria-label="Next review">{svg("next")}</button></div>
    </div>
  </div>
</section>"""

# ---------------------------------------------------------------- getting here, closing, footer
getting = f"""
<section class="out tint" id="getting-here" aria-labelledby="h-out">
  <div class="wrap out-grid">
    <div><h2 class="script title" id="h-out">Getting here</h2>{paras('Getting here')}
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p></div>
    <div class="out-side actions col">
      <a class="btn btn-call" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>
      {call()}
    </div>
  </div>
</section>"""

closing = f"""
<section class="closing" id="book" aria-label="Book">
  <div class="col center">
    <p class="script close-line">{E(CLOSING)}</p>
    <div class="actions">{book()}{call(label='Call')}</div>
  </div>
</section>"""

foot = f"""<footer class="foot tint">
  <div class="wrap foot-grid">
    <div><p class="foot-name script">{E(NAME)}</p><p>{E(ADDRESS)}</p></div>
    <div class="actions col">
      <a class="btn btn-call btn-sm" href="{TEL}">{svg('phone')}<span>{E(PHONE_SHOWN)}</span></a>
      <a class="btn btn-call btn-sm" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
    </div>
    <div class="actions col">
      <a class="btn btn-call btn-sm" href="{E(BOOK)}">{svg('cal')}<span>Rooms on Booking.com</span></a>
      <a class="btn btn-call btn-sm" href="{E(AIRBNB)}" rel="noopener">{svg('home')}<span>Airbnb</span></a>
    </div>
  </div>
  <p class="wrap fine">Ratings and reviews as published on Booking.com, Google and Airbnb, read {E(RATINGS[0]['day'])}.</p>
</footer>
<nav class="bar" id="bar" aria-label="Book or call">{book("bar-book")}<a class="btn bar-call" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg("phone")}</a></nav>"""

sections = [hero]
if FIRST_SCREEN_ONLY:
    sections.append('<section class="stub" aria-hidden="true"></section>')
else:
    sections += [checkin, rooms, inside, roof, beach, eat, brk, guests, getting, closing]

css = (HERE / 'page.css').read_text()
js = (HERE / 'page.js').read_text()
page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
{head()}
{font_link('family=Onest:wght@400;600&family=Satisfy')}
<link rel="preload" as="image" href="{src('hero-d')}" imagesrcset="{srcset(['hero-1280', 'hero-d'])}" imagesizes="100vw" media="(min-width: 768px)" fetchpriority="high">
<link rel="preload" as="image" href="{src('hero-m')}" media="(max-width: 767px)" fetchpriority="high">
<script>document.documentElement.classList.replace('no-js','js')</script>
<style>{css}
.hero-img{{background-image:url({b64('hero-d-lq')})}}
@media (max-width:767px){{.hero-img{{background-image:url({b64('hero-m-lq')})}}}}
.hero-img.loaded{{background-image:none}}</style>
</head>
<body>
<a class="skip" href="#rooms">Skip to the rooms</a>
<main>
{''.join(sections)}
</main>
{'' if FIRST_SCREEN_ONLY else foot}
<script>{js}</script>
</body>
</html>
'''
(DIST / 'index.html').write_text(page)
print('wrote', DIST / 'index.html', len(page), 'bytes')
