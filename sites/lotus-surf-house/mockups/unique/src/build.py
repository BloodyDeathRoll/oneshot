#!/usr/bin/env python3
"""Assemble the unique mockup (concept 3, "Under the net") into dist/index.html, plus dist/stay/index.html,
the no-JS page behind the slide-down room chooser.

Words, rooms, ratings, reviews and contact come from copy/en.json through ../../lotus_data.py; nothing
is retyped. Strings written here are interface labels the template owns (tile and button labels,
section titles). Media: src/make-media.sh. CSS / JS: page.css, page.js (inlined).
Run: python3 sites/lotus-surf-house/mockups/unique/src/build.py
"""
import pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1]))
from lotus_data import *   # noqa

DIST = HERE.parent / 'dist'
def src(name, pre=''): return f'{pre}img/{name}.webp'
def wh(name): return webp_size(DIST / src(name))
def img(name, alt, lazy=True, cls='', sizes=None, set_=None):
    w, h = wh(name)
    extra = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    ss = f' srcset="{", ".join(f"{src(n)} {wh(n)[0]}w" for n in set_)}" sizes="{sizes}"' if set_ else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{src(name)}"{ss} width="{w}" height="{h}" alt="{E(alt)}"{extra}>'

SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return (' ' + SEP + ' ').join(f'<span>{i}</span>' for i in items)
def book(cls='', label=BOOK_LABEL):
    return f'<a class="btn btn-book {cls}" href="{E(BOOK)}">{svg("cal")}<span>{E(label)}</span></a>'
def call(cls=''):
    return f'<a class="btn btn-call {cls}" href="{TEL}">{svg("phone")}<span>Call {E(PHONE_SHOWN)}</span></a>'
def chooser(label, cls='btn-call', target=''):
    t = f' data-tile-open="{target}"' if target else ''
    return f'<a class="btn {cls}" href="stay/" data-stay{t}>{svg("bed")}<span>{E(label)}</span></a>'

def show(sid, names, alts, ratio, label):
    slides = ''.join(f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {len(names)}">{img(n, ALT[a])}</li>'
                     for i, (n, a) in enumerate(zip(names, alts)))
    return (f'<div class="show r{ratio}" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">'
            + ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"></button>' for i in range(len(names)))
            + f'</div><button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def rating(r):
    return (f'<a class="rating" href="{E(r["url"])}" rel="noopener"><span class="score">{r["shown"]}<small>/{r["scale"]}</small></span>'
            f'<span class="rmeta">{pipe([E(r["name"]), f"{r["count"]} reviews", E(r["day"])])}</span></a>')

def net_svg(cls, w=640, h=720, hem=True):
    """The still net: the same drape, mesh and blush hem the cloth draws (page.js shape()). Shown first,
    and alone under reduced motion, without WebGL or without JS. No rail: the net fades in from above."""
    tie_l, tie_r = w * .07, w * .93
    hy = lambda u: h * (.90 + .07 * __import__('math').sin(__import__('math').pi * u))
    pts = ' '.join(f'{tie_l + (tie_r - tie_l) * k / 20:.1f} {hy(k / 20):.1f}' for k in range(21))
    hem_path = f'M{pts.replace(" ", ",", 1)}'
    hem_path = 'M' + ' L'.join(f'{tie_l + (tie_r - tie_l) * k / 20:.1f} {hy(k / 20):.1f}' for k in range(21))
    drape = (f'M8 0 L{w-8} 0 C{w-14} {h*.42} {w-4} {h*.70} {tie_r} {hy(1):.1f} '
             + ' '.join(f'L{tie_l + (tie_r - tie_l) * k / 20:.1f} {hy(k / 20):.1f}' for k in range(20, -1, -1))
             + f' C4 {h*.70} 14 {h*.42} 8 0 Z')
    mid = f'{cls}-{w}'
    return (f'<svg class="{cls}" viewBox="0 0 {w} {h}" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
            f'<defs><pattern id="{mid}-m" width="4" height="4" patternUnits="userSpaceOnUse">'
            f'<path d="M4 0H0V4" fill="none" stroke="rgb(120,104,90)" stroke-opacity=".13" stroke-width=".45"/></pattern>'
            f'<linearGradient id="{mid}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/>'
            f'<stop offset=".09" stop-color="#fff" stop-opacity="1"/></linearGradient>'
            f'<mask id="{mid}-k"><rect width="{w}" height="{h}" fill="url(#{mid}-g)"/></mask>'
            f'<linearGradient id="{mid}-f" x1="0" y1="0" x2="1" y2="0">'
            + ''.join(f'<stop offset="{k/14:.3f}" stop-color="rgb(150,134,118)" stop-opacity="{.16 if k % 2 else .035}"/>' for k in range(15))
            + '</linearGradient></defs>'
            f'<g mask="url(#{mid}-k)"><path class="dr" d="{drape}" fill="url(#{mid}-f)"/><path class="dr" d="{drape}" fill="rgba(255,255,255,.03)"/><path class="dr" d="{drape}" fill="url(#{mid}-m)"/></g>'
            + (f'<path class="dr" d="{hem_path}" fill="none" stroke="#BDA38E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' if hem else '')
            + '</svg>')

bk, gg = RATINGS
hero = f'''
<header class="top" id="top">
  <a class="mark" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections"><a href="#king">Rooms</a><a href="#getting-here">Getting here</a></nav>
  {book('btn-sm', 'Check dates')}
</header>
<section class="hero" aria-label="{E(NAME)}">
  <div class="hero-in">
    <h1 class="script">{E(NAME)}</h1>
    <p class="where">{E(TOWN)}</p>
    <div class="netstage" data-net="hero">
      <div class="print">{img('print-840', ALT['img-025'], lazy=False, sizes='(max-width: 767px) 300px, 420px', set_=['print-600', 'print-840', 'print-1200'])}</div>
      {net_svg('net-still')}
      <canvas class="net-gl" aria-hidden="true"></canvas>
    </div>
    {book('btn-hero')}
  </div>
</section>'''

glance = f'''
<section class="glance" aria-label="The house at a glance">
  <div class="col">
    <p class="facts">{E(TAGLINE)} {E(SPOT)} {E(BLOCKS['Breakfast'][0])}</p>
    <div class="ratings">{rating(bk)}{rating(gg)}</div>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>'''

house = f'''
<section class="house tint" aria-labelledby="h-house">
  <div class="wrap">
    <h2 class="script" id="h-house">From the roof down</h2>
    <div class="steps">
      <div class="step s1">
        <div class="pic">{img('row-roof', ALT['img-021'])}</div>
        <div class="txt"><p class="lvl">{svg('sun')}Roof</p><p>{E(BLOCKS['Up on the roof'][0].split('. ')[0])}.</p>
          <a class="btn btn-call btn-sm" href="#roof">See the roof</a></div>
      </div>
      <div class="step s2">
        <div class="pic">{img('row-up', ALT['img-002'])}</div>
        <div class="txt"><p class="lvl">{svg('stairs')}Upstairs</p><p><b>{E(KING['label'])}.</b> {E(KING['note'])}</p>
          {chooser('See the room', 'btn-call btn-sm', 'king')}</div>
      </div>
      <div class="step s3">
        <div class="pic">{img('row-garden', ALT['img-020'])}</div>
        <div class="txt"><p class="lvl">{svg('leaf')}Garden floor</p><p>{E(BLOCKS['In the garden'][1])}</p>
          {chooser('See the garden rooms', 'btn-call btn-sm', 'garden')}</div>
      </div>
    </div>
  </div>
</section>'''

kb = ['img-002', 'img-010', 'img-015']; kp = ['img-025', 'img-035', 'img-008']
king = f'''
<section class="king" id="king" aria-labelledby="h-king">
  <div class="wrap">
    <h2 class="script" id="h-king">The King Rooms</h2>
    <p class="lede">{E(BLOCKS['Old rooms and new'][1])}</p>
    <div class="pair">
      {show('kb', [f'k32-{a}' for a in kb], kb, '32', 'King Room bedroom, photos')}
      {show('kp', [f'k45-{a}' for a in kp], kp, '45', 'King Room balcony and bathroom, photos')}
    </div>
    <div class="room-row">
      <div><h3>{E(KING['label'])}</h3><p class="beds">{svg('bed')}{E(beds(KING))}</p></div>
      <p>{E(KING['note'])}</p>
      {book()}
    </div>
  </div>
</section>'''

def masonry():
    order = ['img-029', 'img-032', 'img-043', 'img-030', 'img-028', 'img-009']
    return '<div class="mason">' + ''.join(f'<div class="m">{img("m-" + a, ALT[a])}</div>' for a in order) + '</div>'
garden_list = ''.join(f'''
      <li><h3>{E(r['label'])}</h3><p class="beds">{svg('bed')}{E(beds(r))}</p><p>{E(r['note'])}</p>{book('btn-sm')}</li>''' for r in GARDEN_ROOMS)
garden = f'''
<section class="garden" id="garden" aria-labelledby="h-garden">
  <div class="wrap">
    <h2 class="script" id="h-garden">Old rooms and new</h2>
    <blockquote class="yq"><p>{E(BLOCKS['Old rooms and new'][0])}</p></blockquote>
    <div class="g-grid">
      {masonry()}
      <ul class="rlist">{garden_list}</ul>
    </div>
  </div>
</section>'''

fiona = next(r for r in REVIEWS if r['first'] == 'Fiona')
porch = f'''
<section class="porch tint" aria-labelledby="h-yelum">
  <div class="wrap">
    <figure class="fiona"><blockquote><p>{E(fiona['quote'])}</p></blockquote>
      <figcaption>{pipe([E(fiona['author']), 'Booking.com', E(fiona['month'])])}</figcaption></figure>
    <div class="p-cols">
      <div><h2 class="script" id="h-yelum">Yelum</h2>{paras('Yelum')}</div>
      <div><h2 class="script">Breakfast</h2>{paras('Breakfast')}</div>
      <div class="mat">{img('buddha-640', ALT['img-022'])}</div>
    </div>
  </div>
</section>'''

roof = f'''
<section class="roof" id="roof" aria-labelledby="h-roof">
  <div class="wrap r-grid">
    <div class="r1">{img('roof-021', ALT['img-021'])}</div>
    <div class="r2">{img('roof-004', ALT['img-004'])}</div>
    <div class="r-txt"><h2 class="script" id="h-roof">Up on the roof</h2>{paras('Up on the roof')}</div>
  </div>
  <div class="wrap"><p class="amen">{pipe([E(a) for a in AMENITIES])}</p></div>
</section>'''

quotes = ''.join(
    f'<li class="q" aria-roledescription="slide" aria-label="{i+1} of {len(REVIEWS)}"><blockquote><p>{E(r["quote"])}</p></blockquote>'
    f'<p class="who">{pipe([E(r["author"]), E(r["src"]), E(r["month"])])}</p></li>' for i, r in enumerate(REVIEWS))
guests = f'''
<section class="guests tint" aria-labelledby="h-guests">
  <div class="wrap center">
    <h2 class="script" id="h-guests">Guests</h2>
    <div class="ratings">{rating(bk)}{rating(gg)}</div>
    <div class="quotes" data-quotes role="region" aria-roledescription="carousel" aria-label="Guest reviews">
      <ul class="qtrack" tabindex="0">{quotes}</ul>
      <div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous review">{svg("prev")}</button>
        <div class="dots" role="group" aria-label="Choose a review">{''.join(f'<button type="button" class="dot" aria-label="Review {i+1}"></button>' for i in range(len(REVIEWS)))}</div>
        <button class="arw next" type="button" aria-label="Next review">{svg("next")}</button></div>
    </div>
  </div>
</section>'''

getting = f'''
<section class="out" id="getting-here" aria-labelledby="h-out">
  <div class="wrap o-grid">
    <div class="gate">{img('gate-840', ALT['img-019'])}</div>
    <div>
      <h2 class="script" id="h-out">Getting here</h2>
      {paras('Getting here')}
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>
      <div class="actions"><a class="btn btn-call" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>{call()}</div>
      <h3 class="know">Good to know</h3>
      <p>{E(STAY['note'])}</p>
      <p class="muted">{pipe([f"Check-out {STAY['checkOutFrom']}–{STAY['checkOutTo']}", 'Check-in at any hour'])}</p>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing" id="book" aria-label="Book">
  <div class="wrap">
    <div class="c-panel">
      <div class="netstage small" data-net="closing">{net_svg('net-still', 900, 170, hem=True)}<canvas class="net-gl" aria-hidden="true"></canvas></div>
      <p class="script close-line">{E(CLOSING)}</p>
      <div class="actions">{book()}{call()}</div>
    </div>
  </div>
</section>'''

def panel_body(pre=''):
    garden = ''.join(f'<li><h4>{E(r["label"])}</h4><p class="beds">{E(beds(r))}</p><p>{E(r["note"])}</p></li>' for r in GARDEN_ROOMS)
    return f'''
    <div class="tiles" role="group" aria-label="Which room?">
      <button class="tile" type="button" data-tile="garden" aria-pressed="false">{svg('fan')}<b>Garden room</b><span>fan, on the ground floor</span></button>
      <button class="tile" type="button" data-tile="king" aria-pressed="false">{svg('snow')}<b>King Room</b><span>A/C, upstairs</span></button>
      <button class="tile" type="button" data-tile="unsure" aria-pressed="false">{svg('phone')}<b>Not sure</b><span>ask Yelum first</span></button>
    </div>
    <div class="answers">
      <div class="ans" data-ans="garden"><h3>Garden room</h3><ul class="alist">{garden}</ul>{book()}</div>
      <div class="ans" data-ans="king"><h3>{E(KING['label'])}</h3><p class="beds">{E(beds(KING))}</p><p>{E(KING['note'])}</p>{book()}</div>
      <div class="ans" data-ans="unsure"><h3>Not sure</h3><blockquote><p>{E(BLOCKS['Old rooms and new'][0])}</p></blockquote>{call()}</div>
    </div>'''

stay_panel = f'''
<div class="stay" id="stay" role="dialog" aria-modal="true" aria-labelledby="stay-h" hidden>
  <div class="stay-in">
    <div class="stay-head"><p class="script" id="stay-h">Choose a room</p>
      <button class="x" type="button" aria-label="Close">{svg('x')}</button></div>
    {panel_body()}
  </div>
  <svg class="stay-hem" viewBox="0 0 1440 26" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 0H1440V6C1080 24 360 24 0 6Z" fill="#fff"/><path d="M0 6C360 24 1080 24 1440 6" stroke="#BDA38E" stroke-width="5" fill="none" vector-effect="non-scaling-stroke"/></svg>
</div>
<div class="scrim" hidden></div>'''

foot = f'''
<footer class="foot">
  <div class="wrap f-grid">
    <div><p class="script f-name">{E(NAME)}</p><p>{E(ADDRESS)}</p></div>
    <div class="actions">
      <a class="btn btn-call btn-sm" href="{TEL}">{svg('phone')}<span>{E(PHONE_SHOWN)}</span></a>
      <a class="btn btn-call btn-sm" href="{E(BOOK)}">{svg('cal')}<span>Booking.com</span></a>
      <a class="btn btn-call btn-sm" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
    </div>
  </div>
  <p class="wrap fine">Ratings and reviews as published on Booking.com and Google, read {E(bk['day'])}.</p>
</footer>
<div class="bar" id="bar">
  {book('bar-book', 'Check dates')}
  {chooser('Choose a room', 'bar-choose')}
  <a class="btn bar-icon" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg('phone')}</a>
</div>'''

css = (HERE / 'page.css').read_text()
js = (HERE / 'page.js').read_text()
FONTS = font_link('family=Gelasio:wght@400;500&family=Allura')
page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
{head('unique')}
{FONTS}
<link rel="preload" as="image" href="{src('print-840')}" imagesrcset="{src('print-600')} 600w, {src('print-840')} 840w, {src('print-1200')} 1200w" imagesizes="(max-width: 767px) 300px, 420px" fetchpriority="high">
<script>document.documentElement.classList.replace('no-js','js')</script>
<style>{css}</style>
</head>
<body>
<a class="skip" href="#king">Skip to the rooms</a>
<main>
{hero}
{glance}
{house}
{king}
{garden}
{porch}
{roof}
{guests}
{getting}
{closing}
</main>
{foot}
{stay_panel}
<script>{js}</script>
</body>
</html>
'''
(DIST / 'index.html').write_text(page)

# /stay/: the same chooser as a page of its own, for JS off (every answer shown, no images)
stay_page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Choose a room, {E(NAME)}</title><meta name="robots" content="noindex">
{FONTS}
<style>{css}</style>
</head>
<body class="stay-page">
<main class="wrap">
  <p><a class="btn btn-call btn-sm" href="../">{svg('prev')}<span>{E(NAME)}</span></a></p>
  <h1 class="script">Choose a room</h1>
  {panel_body()}
</main>
</body>
</html>
'''
(DIST / 'stay').mkdir(exist_ok=True)
(DIST / 'stay/index.html').write_text(stay_page)
print('wrote', DIST / 'index.html', len(page), 'bytes, and stay/index.html')
