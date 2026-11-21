#!/usr/bin/env python3
"""Assemble the interactive mockup (concept 2, "Dappled") into one self-contained dist/index.html.

Words, rooms, ratings, reviews and contact come from copy/en.json through ../../lotus_data.py; nothing
is retyped. Strings written here are interface labels the template owns ("Choose your floor", tab and
chip labels). Media: src/make-media.sh. CSS and JS: page.css / page.js beside this file, inlined.
Run: python3 sites/lotus-surf-house/mockups/interactive/src/build.py
"""
import pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[1]))
from lotus_data import *   # noqa

DIST = HERE.parent / 'dist'
def src(name): return f'img/{name}.webp'
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
def call(cls='', short=False):
    t = 'Call' if short else f'Call {PHONE_SHOWN}'
    return f'<a class="btn btn-call {cls}" href="{TEL}">{svg("phone")}<span>{E(t)}</span></a>'

def show(sid, names, alts, ratio, label):
    slides = ''.join(f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {len(names)}">{img(n, ALT[a])}</li>'
                     for i, (n, a) in enumerate(zip(names, alts)))
    return (f'<div class="show r{ratio}" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul>'
            f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">'
            + ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"></button>' for i in range(len(names)))
            + f'</div><button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def num(v, label):  # rolled by page.js on first view; plain text without it
    return f'<span class="num" data-roll="{v}" aria-label="{E(label)}">{v}</span>'

bk, gg = RATINGS
hero = f'''
<header class="top" id="top">
  <a class="mark" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections"><a href="#floors">Rooms</a><a href="#getting-here">Getting here</a></nav>
  {book('btn-sm', 'Check dates')}
</header>
<section class="hero" aria-label="{E(NAME)}">
  <div class="hero-media">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('hero-tall-720')} 720w, {src('hero-tall-960')} 960w" sizes="100vw">
      <img class="hero-img" src="{src('hero-wide-1600')}" srcset="{src('hero-wide-1120')} 1120w, {src('hero-wide-1600')} 1600w" sizes="100vw"
        width="1600" height="900" alt="{E(ALT['img-020'])}" fetchpriority="high">
    </picture>
    <canvas class="light" aria-hidden="true"></canvas>
  </div>
  <div class="hero-text">
    <h1 class="hand">{E(NAME)}</h1>
    <p class="where">{E(TOWN)}</p>
    {book('btn-hero')}
  </div>
</section>'''

facts = f'''
<section class="facts" aria-label="The house at a glance">
  <div class="wrap">
    <p class="tag">{E(TAGLINE)}</p>
    <ul class="fact-row">
      <li>{svg('wave')}<span><b>Midigama Beach 250 m</b><small>Booking.com</small></span></li>
      <li>{svg('cup')}<span><b>Breakfast included</b><small>8 to 10 in the morning</small></span></li>
      <li>{svg('cal')}<span><b>Live dates</b><small>on Booking.com</small></span></li>
      <li>{svg('star')}<span><b>{num(bk['shown'], bk['shown'] + ' out of 10')}/10 <i>and</i> {num(gg['shown'], gg['shown'] + ' out of 5')}/5</b>
        <small><a href="{E(bk['url'])}" rel="noopener">Booking.com, {bk['count']} reviews</a> · <a href="{E(gg['url'])}" rel="noopener">Google, {gg['count']}</a> · {E(bk['day'])}</small></span></li>
    </ul>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>'''

def tile(r, i):
    return f'''
      <div class="tile" data-tile>
        <button class="tile-head" type="button" aria-expanded="{'true' if i == 0 else 'false'}" aria-controls="tile-{i}">
          <span class="tile-name">{E(r['label'])}</span>
          <span class="tile-sub">{E(beds(r))}</span>
          <span class="chip">{svg('fan')}Fan, no A/C, no hot water</span>
          <span class="plus" aria-hidden="true"></span>
        </button>
        <div class="tile-body" id="tile-{i}"><div class="tile-in">
          <p>{E(r['note'])}</p>{book('btn-sm')}
        </div></div>
      </div>'''

garden_names = ['r45-img-029', 'r45-img-032', 'r45-img-030', 'r45-img-043', 'r45-img-028']
king_ids = GALLERIES[KING['label']]
floors = f'''
<section class="floors tint" id="floors" aria-labelledby="h-floors">
  <div class="wrap">
    <h2 class="hand" id="h-floors">Choose your floor</h2>
    <div class="switch" role="tablist" aria-label="Floors" hidden>
      <span class="pill" aria-hidden="true"></span>
      <button role="tab" id="t-garden" aria-controls="p-garden" aria-selected="true">{svg('leaf')}Garden floor</button>
      <button role="tab" id="t-up" aria-controls="p-up" aria-selected="false" tabindex="-1">{svg('stairs')}Upstairs</button>
      <button role="tab" id="t-roof" aria-controls="p-roof" aria-selected="false" tabindex="-1">{svg('sun')}Roof</button>
    </div>
    <div class="stage">
      <div class="panel" id="p-garden" role="tabpanel" aria-labelledby="t-garden">
        <h3 class="panel-h">Garden floor</h3>
        <div class="split">
          {show('gshow', garden_names, [n[4:] for n in garden_names], '45', 'Garden rooms, photos')}
          <div class="tiles">
            {''.join(tile(r, i) for i, r in enumerate(GARDEN_ROOMS))}
            <figure class="yq"><blockquote><p>{E(BLOCKS['Old rooms and new'][0])}</p></blockquote></figure>
          </div>
        </div>
      </div>
      <div class="panel" id="p-up" role="tabpanel" aria-labelledby="t-up">
        <h3 class="panel-h">Upstairs</h3>
        <div class="split up">
          {show('kshow', [f'k32-{a}-1440' for a in king_ids], king_ids, '32', 'King Room with Balcony, photos')}
          <div class="king">
            <p class="tile-name big">{E(KING['label'])}</p>
            <p class="tile-sub">{E(beds(KING))}</p>
            <p class="chips"><span class="chip on">{svg('snow')}A/C</span><span class="chip on">{svg('drop')}Hot water</span><span class="chip on">{svg('leaf')}Balcony</span></p>
            <p>{E(KING['note'])} {E(BLOCKS['Old rooms and new'][1])}</p>
            {book()}
          </div>
        </div>
      </div>
      <div class="panel" id="p-roof" role="tabpanel" aria-labelledby="t-roof">
        <h3 class="panel-h">Roof</h3>
        <div class="split roof">
          <div class="roof-pics">{img('roof-021', ALT['img-021'])}{img('roof-022', ALT['img-022'])}{img('roof-004', ALT['img-004'])}</div>
          <div class="king">
            <p class="tile-name big">{E('Up on the roof')}</p>
            {paras('Up on the roof')}
            {book()}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>'''

garden = f'''
<section class="garden" id="garden" aria-labelledby="h-garden">
  <div class="wrap g-split">
    {img('table-1280', ALT['img-001'], cls='table', sizes='(max-width: 899px) 100vw, 58vw', set_=['table-800', 'table-1280'])}
    <div>
      <h2 class="hand" id="h-garden">In the garden</h2>
      {paras('In the garden')}
    </div>
  </div>
  <div class="wrap"><p class="amen">{pipe([E(a) for a in AMENITIES])}</p></div>
</section>'''

fiona = next(r for r in REVIEWS if r['first'] == 'Fiona')
porch = f'''
<section class="porch tint" aria-labelledby="h-breakfast">
  <div class="wrap">
    <h2 class="hand" id="h-breakfast">Breakfast</h2>
    <div class="p-grid">
      <figure class="fiona"><blockquote><p>{E(fiona['quote'])}</p></blockquote>
        <figcaption>{pipe([E(fiona['author']), 'Booking.com', E(fiona['month'])])}</figcaption></figure>
      <div class="p-side">
        <div class="print">{img('porch-720', ALT['img-032'])}</div>
        {paras('Breakfast')}
        <h3 class="hand small">Yelum</h3>
        {paras('Yelum')}
      </div>
    </div>
  </div>
</section>'''

cards = ''.join(
    f'<li class="card"><blockquote><p>{E(r["quote"])}</p></blockquote><p class="who"><b>{E(r["first"])}</b>, {E(r["country"])}'
    f'<br>{E(r["src"])} · {E(r["month"])}</p></li>' for r in REVIEWS)
guests = f'''
<section class="guests" id="guests" aria-labelledby="h-guests">
  <div class="wrap">
    <h2 class="hand" id="h-guests">Guests say</h2>
    <div class="figs">
      <a class="fig" href="{E(bk['url'])}" rel="noopener"><span class="big">{num(bk['shown'], bk['shown'] + ' out of 10')}<small>/10</small></span><span>Booking.com · {bk['count']} reviews · {E(bk['day'])}</span></a>
      <a class="fig" href="{E(gg['url'])}" rel="noopener"><span class="big">{num(gg['shown'], gg['shown'] + ' out of 5')}<small>/5</small></span><span>Google · {gg['count']} reviews · {E(gg['day'])}</span></a>
    </div>
  </div>
  <ul class="cards" data-drag tabindex="0" aria-label="Guest reviews">{cards}</ul>
</section>'''

getting = f'''
<section class="out tint" id="getting-here" aria-labelledby="h-out">
  <div class="wrap o-grid">
    <div>
      <h2 class="hand" id="h-out">Getting here</h2>
      {paras('Getting here')}
      <p class="addr">{svg('pin')}<span>{E(ADDRESS)}</span></p>
      <div class="actions"><a class="btn btn-call" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>{call()}</div>
    </div>
    <div class="know">
      <h3>Good to know</h3>
      <p>{E(STAY['note'])}</p>
      <p class="muted">{pipe([f"Check-out {STAY['checkOutFrom']}–{STAY['checkOutTo']}", 'Check-in at any hour'])}</p>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing" id="book" aria-label="Book">
  <div class="wrap center">
    <p class="hand close-line">{E(CLOSING)}</p>
    <div class="actions">{book()}{call()}</div>
  </div>
</section>'''
foot = f'''
<footer class="foot">
  <div class="wrap f-grid">
    <div><p class="hand f-name">{E(NAME)}</p><p>{E(ADDRESS)}</p></div>
    <div class="actions">
      <a class="btn btn-call btn-sm" href="{TEL}">{svg('phone')}<span>{E(PHONE_SHOWN)}</span></a>
      <a class="btn btn-call btn-sm" href="{E(BOOK)}">{svg('cal')}<span>Booking.com</span></a>
      <a class="btn btn-call btn-sm" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Google Maps</span></a>
    </div>
  </div>
  <p class="wrap fine">Ratings and reviews as published on Booking.com and Google, read {E(bk['day'])}.</p>
</footer>
<div class="bar" id="bar">
  <div class="bar-more" id="bar-more" hidden>
    <p>{E(TAGLINE)}</p>
    <p class="muted">{pipe(['Midigama Beach 250 m', 'Breakfast included, 8–10', 'Live dates on Booking.com'])}</p>
    <p class="muted">{pipe([f"{bk['shown']}/10 Booking.com, {bk['count']} reviews", f"{gg['shown']}/5 Google, {gg['count']}", E(bk['day'])])}</p>
  </div>
  <div class="bar-row">
    {book('bar-book')}
    <a class="btn bar-icon" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg('phone')}</a>
    <button class="btn bar-icon bar-tog" type="button" aria-expanded="false" aria-controls="bar-more" aria-label="More about the house" hidden>{svg('up')}</button>
  </div>
</div>'''

css = (HERE / 'page.css').read_text()
js = (HERE / 'page.js').read_text()
page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
{head('interactive')}
{font_link('family=Be+Vietnam+Pro:wght@400;600&family=Patrick+Hand')}
<link rel="preload" as="image" href="{src('hero-wide-1600')}" imagesrcset="{src('hero-wide-1120')} 1120w, {src('hero-wide-1600')} 1600w" imagesizes="100vw" media="(min-width: 768px)" fetchpriority="high">
<link rel="preload" as="image" href="{src('hero-tall-960')}" imagesrcset="{src('hero-tall-720')} 720w, {src('hero-tall-960')} 960w" imagesizes="100vw" media="(max-width: 767px)" fetchpriority="high">
<script>document.documentElement.classList.replace('no-js','js')</script>
<style>{css}</style>
</head>
<body>
<a class="skip" href="#floors">Skip to the rooms</a>
<main>
{hero}
{facts}
{floors}
{garden}
{porch}
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
