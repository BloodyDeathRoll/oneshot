#!/usr/bin/env python3
"""Assemble the calm mockup (concept 1, "The gate") into one self-contained dist/index.html.

Words, rooms, ratings, reviews and contact come from copy/en.json through ../../lotus_data.py; nothing
is retyped. Strings written here are interface labels and section titles the template owns.
Media: src/make-media.sh. CSS and JS: page.css / page.js beside this file, inlined.
Run: python3 sites/lotus-surf-house/mockups/calm/src/build.py
"""
import pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1]))
from lotus_data import *   # noqa

DIST = HERE.parent / 'dist'
def src(name): return f'img/{name}.webp'
def wh(name): return webp_size(DIST / src(name))

def picture(name, alt, sizes='100vw', lazy=True, cls='', alts=None):
    w, h = wh(name)
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    return f'<img class="{cls}" src="{src(name)}" width="{w}" height="{h}" alt="{E(alt)}"{extra}>'

def srcset(names):
    return ', '.join(f'{src(n)} {wh(n)[0]}w' for n in names)

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return (' ' + SEP + ' ').join(f'<span>{i}</span>' for i in items)

def book(cls='', label=BOOK_LABEL, icon=True):
    return f'<a class="btn btn-book {cls}" href="{E(BOOK)}">{svg("cal") if icon else ""}<span>{E(label)}</span></a>'
def call(cls=''):
    return f'<a class="btn btn-call {cls}" href="{TEL}">{svg("phone")}<span>Call {E(PHONE_SHOWN)}</span></a>'

def show(sid, names, alts_from, ratio, label, sizes):
    """A dot slideshow: a scroll-snap row (works with JS off), dots and arrows added by page.js."""
    slides = ''.join(
        f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {len(names)}">'
        f'{picture(n, ALT[a], lazy=True)}</li>' for i, (n, a) in enumerate(zip(names, alts_from)))
    return (f'<div class="show r{ratio}" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">'
            + ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"></button>' for i in range(len(names)))
            + f'</div><button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def rating(r, big=False):
    return (f'<a class="rating{" big" if big else ""}" href="{E(r["url"])}" rel="noopener">'
            f'<span class="score">{r["shown"]}<small>/{r["scale"]}</small></span>'
            f'<span class="rmeta">{pipe([E(r["name"]), f"{r["count"]} reviews", E(r["day"])])}</span></a>')

# ---------------------------------------------------------------- sections
hero = f'''
<header class="top" id="top">
  <a class="mark" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections"><a href="#garden">Rooms</a><a href="#getting-here">Getting here</a></nav>
  {book('btn-sm', 'Check dates')}
</header>
<section class="hero" aria-label="{E(NAME)}">
  <div class="hero-text">
    <h1 class="script">{E(NAME)}</h1>
    <p class="where">{E(TOWN)}</p>
    {book('btn-hero')}
  </div>
  <div class="hero-media">
    <img src="{src('gate-1200')}" srcset="{srcset(['gate-800', 'gate-1200'])}" sizes="(max-width: 767px) 76vh, 50vw"
      width="1200" height="1600" alt="{E(ALT['img-019'])}" fetchpriority="high" class="gate">
  </div>
</section>'''

glance_line = pipe([E(SPOT.replace('Booking.com puts Midigama Beach 250 m from the house.', 'Midigama Beach 250 m (Booking.com)')),
                    'Breakfast included, 8–10', 'Check-in any hour'])
glance = f'''
<section class="glance" aria-label="The house at a glance">
  <div class="col">
    <p class="tag">{E(TAGLINE)}</p>
    <p class="details">{glance_line}</p>
    <div class="ratings">{''.join(rating(r) for r in RATINGS)}</div>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>'''

def room_row(r, sid, quote=''):
    names = [f'r45-{a}' for a in GALLERIES[r['label']]]
    return f'''
  <article class="room">
    {show(sid, names, GALLERIES[r['label']], '45', r['label'] + ', photos', '(max-width: 767px) 100vw, 480px')}
    <div class="room-text">
      <h3>{E(r['label'])}</h3>
      <p class="beds">{svg('bed')}{E(beds(r))}</p>
      <p class="note">{E(r['note'])}</p>
      {book()}
    </div>
  </article>{quote}'''

yelum_quote = f'''
  <figure class="owner-quote">
    <h3 class="script small">Old rooms and new</h3>
    <blockquote><p>{E(BLOCKS['Old rooms and new'][0])}</p></blockquote>
  </figure>'''

garden = f'''
<section class="floor tint" id="garden" aria-labelledby="h-garden">
  <div class="wrap">
    <h2 class="script" id="h-garden">In the garden</h2>
    <div class="lede">{paras('In the garden')}</div>
    <div class="wide">{picture('garden-1600', ALT['img-020'])}</div>
    <p class="floor-label">{svg('leaf')}Ground floor, three room types</p>
    {room_row(GARDEN_ROOMS[0], 'g1', yelum_quote)}
    {room_row(GARDEN_ROOMS[1], 'g2')}
    {room_row(GARDEN_ROOMS[2], 'g3')}
  </div>
</section>'''

fiona = next(r for r in REVIEWS if r['first'] == 'Fiona')
porch = f'''
<section class="porch" aria-labelledby="h-yelum">
  <div class="wrap porch-grid">
    <div class="print">{picture('porch-840', ALT['img-032'])}</div>
    <div class="porch-text">
      <h2 class="script" id="h-yelum">Yelum</h2>
      {paras('Yelum')}
      <h2 class="script">Breakfast</h2>
      {paras('Breakfast')}
      <figure class="fiona"><blockquote><p>{E(fiona['quote'])}</p></blockquote>
        <figcaption>{pipe([E(fiona['author']), 'Booking.com', E(fiona['month'])])}</figcaption></figure>
    </div>
  </div>
</section>'''

kn = [f'k32-{a}-1600' for a in GALLERIES[KING['label']]]
stay_line = pipe([f"Check-out {STAY['checkOutFrom']}–{STAY['checkOutTo']}", 'Check-in at any hour', 'Cash only'])
king = f'''
<section class="floor tint" id="upstairs" aria-labelledby="h-king">
  <div class="wrap">
    <h2 class="script" id="h-king">The King Rooms</h2>
    <div class="lede">{paras('Old rooms and new', slice(1, 2))}</div>
    {show('k', kn, GALLERIES[KING['label']], '32', 'King Room with Balcony, photos', '(max-width: 1240px) 100vw, 1200px')}
    <div class="king-row">
      <div><h3>{E(KING['label'])}</h3><p class="beds">{svg('bed')}{E(beds(KING))}</p></div>
      <p class="note">{E(KING['note'])}</p>
      {book()}
    </div>
    <p class="stay">{stay_line}</p>
  </div>
</section>'''

roof = f'''
<section class="roof" aria-labelledby="h-roof">
  <div class="wrap">
    <h2 class="script" id="h-roof">Up on the roof</h2>
    <div class="lede">{paras('Up on the roof')}</div>
    <div class="three">{picture('roof-021', ALT['img-021'])}{picture('roof-022', ALT['img-022'])}{picture('roof-004', ALT['img-004'])}</div>
    <p class="amen">{pipe([E(a) for a in AMENITIES])}</p>
  </div>
</section>'''

quotes = ''.join(
    f'<li class="q" aria-roledescription="slide" aria-label="{i+1} of {len(REVIEWS)}"><blockquote><p>{E(r["quote"])}</p></blockquote>'
    f'<p class="who">{pipe([E(r["author"]), E(r["src"]), E(r["month"])])}</p></li>' for i, r in enumerate(REVIEWS))
guests = f'''
<section class="guests tint" id="guests" aria-labelledby="h-guests">
  <div class="wrap">
    <h2 class="script" id="h-guests">Guests</h2>
    <div class="ratings big">{''.join(rating(r, True) for r in RATINGS)}</div>
    <div class="quotes" data-quotes role="region" aria-roledescription="carousel" aria-label="Guest reviews">
      <ul class="qtrack" tabindex="0">{quotes}</ul>
      <div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous review">{svg("prev")}</button>
        <div class="dots" role="group" aria-label="Choose a review">{''.join(f'<button type="button" class="dot" aria-label="Review {i+1}"></button>' for i in range(len(REVIEWS)))}</div>
        <button class="arw next" type="button" aria-label="Next review">{svg("next")}</button></div>
    </div>
    <p class="more"><a class="btn btn-quiet" href="{E(REVIEW_URL)}" rel="noopener">Read all {RATINGS[0]["count"]} reviews on Booking.com</a></p>
  </div>
</section>'''

getting = f'''
<section class="out" id="getting-here" aria-labelledby="h-out">
  <div class="wrap out-grid">
    <div>
      <h2 class="script" id="h-out">Getting here</h2>
      {paras('Getting here')}
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>
    </div>
    <div class="out-side">
      <div class="actions col">
        <a class="btn btn-ink" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>
        {call('btn-ink')}
      </div>
      <h3>Good to know</h3>
      <p>{E(STAY['note'])}</p>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing tint" id="book" aria-label="Book">
  <div class="wrap center">
    <p class="script close-line">{E(CLOSING)}</p>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>'''
foot = f'''<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="foot-name script">{E(NAME)}</p><p>{E(ADDRESS)}</p></div>
    <div class="actions">
      <a class="btn btn-ink btn-sm" href="{TEL}">{svg('phone')}<span>{E(PHONE_SHOWN)}</span></a>
      <a class="btn btn-ink btn-sm" href="{E(BOOK)}">{svg('cal')}<span>Booking.com</span></a>
      <a class="btn btn-ink btn-sm" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
    </div>
  </div>
  <p class="wrap fine">Ratings and reviews as published on Booking.com and Google, read 3 Nov 2026.</p>
</footer>
<div class="bar" id="bar">{book('bar-book')}<a class="btn bar-call" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg('phone')}</a></div>'''

css = (HERE / 'page.css').read_text()
js = (HERE / 'page.js').read_text()
page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
{head('calm')}
{font_link('family=Hanken+Grotesk:wght@400;600&family=Parisienne')}
<link rel="preload" as="image" href="{src('gate-1200')}" imagesrcset="{srcset(['gate-800', 'gate-1200'])}" imagesizes="(max-width: 767px) 76vh, 50vw" fetchpriority="high">
<script>document.documentElement.classList.replace('no-js','js')</script>
<style>{css}</style>
</head>
<body>
<a class="skip" href="#garden">Skip to the rooms</a>
<main>
{hero}
{glance}
{garden}
{porch}
{king}
{roof}
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
