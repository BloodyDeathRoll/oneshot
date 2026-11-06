#!/usr/bin/env python3
"""Builds sites/panta-rei-resort/mockups/calm/dist/index.html from the audited copy (copy/en.json).

Every visible word about the business comes from en.json, verbatim; only interface labels
("Book this room", "Menu", day names) and alt text live here. Media comes from src/make-media.sh.
Run: python3 sites/panta-rei-resort/mockups/calm/src/build.py
"""
import json, html, pathlib, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
C = json.loads((ROOT / 'sites/panta-rei-resort/copy/en.json').read_text())
OUT = HERE.parent / 'dist/index.html'
e = lambda s: html.escape(s, quote=True)
paras = lambda body, cls='': ''.join(f'<p{cls}>{e(p)}</p>' for p in body.split('\n\n'))
block = {b['heading']: b for b in C['copyBlocks']}
links = {b['label']: b['url'] for b in C['bookingLinks']}
ENGINE = links['Check dates and book direct']
WA_NUM = C['contact']['whatsapp'].lstrip('+')
PHONE = C['contact']['phone']
EMAIL = C['contact']['email']
MAP = C['contact']['mapUrl']
SOC = {  # dossier.contact.socials
    'Instagram': 'https://www.instagram.com/pantarei_resort/',
    'Facebook': 'https://www.facebook.com/profile.php?id=100093054286482',
    'YouTube': 'https://www.youtube.com/@Panta_Rei_Resort',
}

def wa(text):
    return f'https://wa.me/{WA_NUM}?text=' + urllib.parse.quote(text)

def lkr(n):
    return f'LKR {n:,}'

CUR = ' aria-current="true"'
UNIT = {'per_person': 'per person', 'per_lesson': 'per class', 'flat': ''}

ICON = {
 'arrow': '<svg class="arr" width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 'wa': '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3Z"/></svg>',
 'phone': '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
 'mail': '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 'pin': '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
 'prev': '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 'next': '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 'Instagram': '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
 'Facebook': '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4A20 20 0 0 0 14.3 4c-2.2 0-3.7 1.3-3.7 3.8v2.7H8v3h2.6V21Z"/></svg>',
 'YouTube': '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z"/></svg>',
}

# ---- rooms: photos per room follow dossier.room_types[].photos; alt text written from each photograph
ROOM_PHOTOS = {
 'Double Room': [
  ('028', 'White bed with a rattan arch headboard and a teak drawer base, rattan-panel wardrobe, the bathroom beyond'),
  ('031', 'Bed with a rattan arch headboard beside tall teak French windows open to the garden'),
  ('007', 'Bed with a rattan arch headboard and a striped throw, rattan wardrobe doors, a round rattan rug on the grey floor'),
  ('013', 'Bed under a vaulted white ceiling, rattan-panel wardrobe and slatted bathroom door, round rattan rug'),
  ('029', 'Bathroom: white concrete vanity with a rattan cabinet, blue stone shower wall and a teak window'),
 ],
 'Triple Room': [
  ('037', 'Bed with a rattan arch headboard, a pink cushioned rattan rocking chair and an arched rattan mirror'),
  ('010', 'Bed under a vaulted white ceiling, an orange cushioned rattan armchair and an arched mirror'),
  ('034', 'Bathroom with a freestanding white bathtub under teak-framed windows and blue stone tiles'),
  ('011', 'A straw bag and a red cloth on wall hooks, an arched rattan mirror, the bathtub beyond a white curtain'),
  ('036', 'Bungalow front: red tile roof, white walls, teak doors and two rattan chairs on the terrace among palms'),
 ],
 'Family Villa': [
  ('012', 'Sliding glass doors open to the lawn and pool, a surfboard leaning outside, a straw hat on the bed'),
  ('038', 'Bed with a rattan arch headboard beside tall teak French windows to the garden'),
  ('014', 'Two beds pushed together under a pale palm-fan headboard, rattan pendants and open shelving'),
  ('040', 'Outdoor bath: a freestanding white tub on pebbles in a walled garden, seen through teak doors'),
  ('015', 'White villa with glass sliding doors behind dense tropical planting and a stone path'),
 ],
 'Suite with Private Pool': [
  ('043', 'Bed facing open glass doors onto the private plunge pool and its terrace'),
  ('046', 'The private plunge pool on its terrace, two wooden lounge chairs, dense palms behind'),
  ('047', 'Bed under a large palm-fan headboard, rattan pendant lamps and a potted palm'),
  ('002', 'Palm-fan headboard, rattan pendant lamp, a wooden stool and a potted palm'),
  ('016', 'Lounge niche: a built-in white bench with cushions, a rattan side table, the glass-walled shower'),
 ],
}

def slides(key, photos, ratio_note=''):
    items = []
    for k, (iid, alt) in enumerate(photos):
        lazy = 'lazy'
        items.append(f'<li class="slide"><img src="img/img-{iid}-43-1200.webp" srcset="img/img-{iid}-43-720.webp 720w, img/img-{iid}-43-1200.webp 1200w" sizes="(max-width: 860px) 100vw, 56vw" width="1200" height="900" alt="{e(alt)}" loading="{lazy}" decoding="async"></li>')
    dots = ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1} of {len(photos)}"{CUR if i == 0 else ""}></button>' for i in range(len(photos)))
    return f'''<div class="show" data-show>
      <ul class="track" tabindex="0" aria-label="{e(key)}, photos">{''.join(items)}</ul>
      <button type="button" class="nav-btn prev" aria-label="Previous photo">{ICON['prev']}</button>
      <button type="button" class="nav-btn next" aria-label="Next photo">{ICON['next']}</button>
      <div class="dots">{dots}</div>
    </div>'''

room_rows = []
for i, r in enumerate(C['rooms']):
    lab = r['label']
    room_rows.append(f'''<article class="room{' flip' if i % 2 else ''}" id="room-{i+1}">
    {slides(lab, ROOM_PHOTOS[lab])}
    <div class="room-text">
      <h3>{e(lab)}</h3>
      <p class="facts">{e(r['beds'])}<span class="sep" aria-hidden="true">|</span><span class="nw">Sleeps {r['sleeps']}</span></p>
      <p>{e(r['note'])}</p>
      <div class="acts">
        <a class="btn btn-book" href="{e(links[lab])}" data-room="{i}">Book this room {ICON['arrow']}</a>
        <a class="btn btn-soft" href="{e(wa(f"Hi Panta Rei Resort, I'd like to ask about the {lab}."))}">{ICON['wa']} Ask us</a>
      </div>
    </div>
  </article>''')

# ---- prices
P = C['priceList']
def price_rows(rows):
    out = []
    for p in rows:
        unit = UNIT.get(p['unit'], '')
        note = f'<span class="pnote">{e(p["note"])}</span>' if p.get('note') else ''
        out.append(f'<li><span class="plabel">{e(p["label"])}{note}</span><span class="pval">{lkr(p["price"])}{(" <small>" + unit + "</small>") if unit else ""}</span></li>')
    return '<ul class="prices">' + ''.join(out) + '</ul>'
day_pass = [p for p in P if p['label'].startswith('Pool day pass')]
classes = [p for p in P if p['label'].startswith('Fitness class')]
massages = [p for p in P if 'Massage' in p['label']]

# fitness week: 'Vinyasa yoga is at 8:30 every morning; Friday is the day off.' (copy block)
DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
week = ''.join(
    f'<li class="day{" off" if d == "Fri" else ""}" data-day="{n}"><span class="dn">{d}</span><span class="dt">{"Off" if d == "Fri" else "8:30"}</span></li>'
    for n, d in zip([1, 2, 3, 4, 5, 6, 0], DAYS))

# ---- guests
SRC = {'google': 'Google', 'booking': 'Booking.com', 'site': 'our website'}
quotes = []
for t in C['testimonials']:
    q = '</p><p>'.join(e(x) for x in t['quote'].split('\n'))
    quotes.append(f'<li class="slide quote"><blockquote><p>{q}</p></blockquote><p class="who">{e(t["author"])} <span>on {SRC[t["source"]]}</span></p></li>')
qdots = ''.join(f'<button type="button" class="dot" aria-label="Review {i+1} of {len(quotes)}"{CUR if i == 0 else ""}></button>' for i in range(len(quotes)))
R = {r['platform']: r for r in C['ratings']}
def rating(key, name):
    r = R[key]
    return f'<a class="rating" href="{e(r["url"])}" rel="noopener" target="_blank"><span class="score">{r["score"]:g}<small>/{r["scale"]}</small></span><span class="rsrc">{name}<br><small>{r["count"]} reviews</small></span></a>'

amen = ''.join(f'<li>{e(a["label"])}{(" <small>(" + e(a["note"]) + ")</small>") if a.get("note") else ""}</li>' for a in C['amenities'])
SI = C['stayInfo']

drawer_rooms = ''.join(f'''<label class="chip-room"><input type="radio" name="room" value="{i}" data-url="{e(links[r['label']])}" data-label="{e(r['label'])}" data-sleeps="{r['sleeps']}"><img src="img/img-{ROOM_PHOTOS[r['label']][0][0]}-43-720.webp" width="720" height="540" alt="" loading="lazy"><span><b>{e(r['label'])}</b><small>Sleeps {r['sleeps']}</small></span></label>''' for i, r in enumerate(C['rooms']))

W = lambda name: block[name]
offer = W('Four ways to stay')
welcome = W('Welcome to Panta Rei')

CSS = (HERE / 'style.css').read_text()
JS = (HERE / 'app.js').read_text()

page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Panta Rei Resort, Kabalana · Boutique resort in Ahangama, Sri Lanka</title>
<meta name="description" content="{e(C['tagline'])}">
<meta name="theme-color" content="#F7F9FB">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Gochi+Hand&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<a class="skip" href="#welcome">Skip to content</a>
<header class="hdr" id="hdr">
  <a class="logo" href="#top" aria-label="Panta Rei Resort, back to the top"><img src="img/img-023-240.webp" width="84" height="84" alt="Panta Rei Resort, Kabalana"></a>
  <nav class="nav" aria-label="Sections">
    <a href="#rooms">Rooms</a><a href="#restaurant">Restaurant</a><a href="#fitness">Fitness</a><a href="#getting-here">Getting here</a>
    <a class="btn btn-book" href="{ENGINE}" data-drawer>Check dates</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" stroke-width="1.8"/></svg>Menu</button>
  </nav>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <button type="button" class="x" aria-label="Close menu" data-close>&times;</button>
  <a href="#rooms">Rooms</a><a href="#pool">The pool</a><a href="#restaurant">Restaurant</a><a href="#fitness">Fitness</a><a href="#after-surf">After the surf</a><a href="#guests">Guests</a><a href="#getting-here">Getting here</a><a href="#groups">Groups</a>
  <div class="menu-acts"><a class="btn btn-book" href="{ENGINE}" data-drawer>Check dates</a><a class="btn btn-soft" href="{e(wa("Hi Panta Rei Resort, I'd like to ask about a stay."))}">{ICON['wa']} WhatsApp</a></div>
</div>

<main id="top">
<section class="hero" aria-label="Panta Rei Resort from the air">
  <picture>
    <source media="(max-aspect-ratio: 3/4)" srcset="img/vid-001-poster-p608.webp" width="608" height="1080">
    <img src="img/vid-001-poster-1920.webp" srcset="img/vid-001-poster-1280.webp 1280w, img/vid-001-poster-1920.webp 1920w" sizes="100vw" width="1920" height="1080" alt="Red-roofed white bungalows in a ring around a long turquoise pool, seen from above" fetchpriority="high">
  </picture>
  <video muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true" data-hero>
    <source data-src="video/vid-001-p608.mp4" type="video/mp4" media="(max-aspect-ratio: 3/4)">
    <source data-src="video/vid-001-m1280.webm" type="video/webm" media="(max-width: 767px)">
    <source data-src="video/vid-001-m1280.mp4" type="video/mp4" media="(max-width: 767px)">
    <source data-src="video/vid-001-d1920.webm" type="video/webm">
    <source data-src="video/vid-001-d1920.mp4" type="video/mp4">
  </video>
  <div class="hero-in">
    <h1>Panta Rei, Kabalana</h1>
    <a class="btn btn-book" href="{ENGINE}" data-drawer>Check dates {ICON['arrow']}</a>
  </div>
</section>

<section class="welcome tint" id="welcome">
  <div class="wrap grid">
    <div class="w-main">
      <h2 class="script">{e(welcome['heading'])}</h2>
      <p class="lead">{e(C['tagline'])}</p>
      {paras(welcome['body'], ' class="big"')}
    </div>
    <p class="feature script" aria-label="{e(C['featureLine'])}">{e(C['featureLine'])}</p>
  </div>
</section>
<figure class="bleed par" aria-hidden="false"><img src="img/img-030-1350.webp" srcset="img/img-030-800.webp 800w, img/img-030-1350.webp 1350w" sizes="100vw" width="1350" height="900" alt="The open-air lounge under the main building: rattan pendant lamps, orange cushioned rattan chairs, the garden beyond" loading="lazy" decoding="async"></figure>

<section class="rooms" id="rooms">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="script">{e(offer['heading'])}</h2>
      <div>{paras(offer['body'])}</div>
    </div>
    {''.join(room_rows)}
  </div>
</section>

<section class="pool" id="pool">
  <figure class="pool-img par"><img src="img/img-006-1844.webp" srcset="img/img-006-1000.webp 1000w, img/img-006-1844.webp 1844w" sizes="100vw" width="1844" height="1224" alt="A guest wading into the long pool, red-roofed bungalows and tall palms beyond" loading="lazy" decoding="async"></figure>
  <div class="pool-card">
    <h2 class="script">{e(W('The pool')['heading'])}</h2>
    {paras(W('The pool')['body'])}
    {price_rows(day_pass)}
  </div>
</section>

<section class="resto" id="restaurant">
  <div class="wrap grid">
    <div class="r-text">
      <h2 class="script">{e(W('Restaurant and bar')['heading'])}</h2>
      {paras(W('Restaurant and bar')['body'])}
      <p class="hours">{e(C['hoursNote'])}</p>
    </div>
    <div class="r-photos">
      <img class="wide" src="img/img-003-900.webp" width="900" height="594" alt="Breakfast served at a teak table under greenery: a bowl, juice and coffee" loading="lazy" decoding="async">
      <div class="trio">
        <img src="img/img-005-700.webp" width="700" height="1049" alt="Lunch on a teak table in the garden: sliders and plated dishes" loading="lazy" decoding="async">
        <img src="img/img-018-700.webp" width="700" height="1049" alt="Garlic prawns in a dark bowl on a woven rattan mat, from above" loading="lazy" decoding="async">
        <img src="img/img-019-700.webp" width="700" height="1050" alt="A small bowl on the balcony rail, the garden blurred below" loading="lazy" decoding="async">
      </div>
    </div>
  </div>
</section>

<section class="fit tint" id="fitness">
  <div class="wrap grid">
    <img class="fit-img" src="img/img-004-800.webp" width="800" height="1199" alt="A yoga class in the open-air shala, a woman in triangle pose, other mats behind" loading="lazy" decoding="async">
    <div class="fit-text">
      <h2 class="script">{e(W('Panta Fitness Club')['heading'])}</h2>
      {paras(W('Panta Fitness Club')['body'])}
      <ol class="week" aria-label="Vinyasa yoga, this week">{week}</ol>
      {price_rows(classes)}
    </div>
  </div>
</section>

<section class="surf" id="after-surf">
  <div class="wrap grid">
    <figure class="surf-img par"><img src="img/img-035-1350.webp" srcset="img/img-035-800.webp 800w, img/img-035-1350.webp 1350w" sizes="(max-width: 860px) 100vw, 58vw" width="1350" height="900" alt="Two guests carrying surfboards across the lawn by the pool, a woman in a straw hat crouching with a dog" loading="lazy" decoding="async"></figure>
    <div class="surf-text">
      <h2 class="script">{e(W('After the surf')['heading'])}</h2>
      {paras(W('After the surf')['body'])}
      {price_rows(massages)}
    </div>
  </div>
</section>

<section class="guests tint" id="guests">
  <div class="wrap grid">
    <div class="g-head">
      <h2 class="script">What guests say</h2>
      <div class="ratings">{rating('booking', 'Booking.com')}{rating('google', 'Google')}</div>
      <p class="cap">Scores as of 6 November 2026</p>
    </div>
    <div class="show quotes" data-show>
      <ul class="track" tabindex="0" aria-label="Guest reviews">{''.join(quotes)}</ul>
      <button type="button" class="nav-btn prev" aria-label="Previous review">{ICON['prev']}</button>
      <button type="button" class="nav-btn next" aria-label="Next review">{ICON['next']}</button>
      <div class="dots">{qdots}</div>
    </div>
  </div>
</section>

<section class="here" id="getting-here">
  <div class="wrap grid">
    <div class="h-text">
      <h2 class="script">{e(W('Getting here and around')['heading'])}</h2>
      {paras(W('Getting here and around')['body'])}
      <p class="addr">{ICON['pin']} {e(C['contact']['address'])}</p>
      <a class="btn btn-soft" href="{e(MAP)}" rel="noopener" target="_blank">Open in Google Maps {ICON['arrow']}</a>
    </div>
    <div class="h-info">
      <h3>Good to know</h3>
      <p class="facts">Check-in from {SI['checkInFrom']}<span class="sep" aria-hidden="true">|</span><span class="nw">Check-out by {SI['checkOutTo']}</span></p>
      <p>{e(SI['note'])}</p>
      <ul class="amen">{amen}</ul>
    </div>
  </div>
</section>

<section class="groups tint" id="groups">
  <div class="wrap narrow">
    <h2 class="script">{e(W('Groups and retreats')['heading'])}</h2>
    {paras(W('Groups and retreats')['body'])}
    <a class="btn btn-soft" href="{e(wa("Hi Panta Rei Resort, I'd like to ask about a group stay."))}">{ICON['wa']} Ask about a group</a>
  </div>
</section>

<section class="closing" id="book" aria-label="Book your stay">
  <figure class="par"><img src="img/vid-002-still-1920.webp" srcset="img/vid-002-still-1280.webp 1280w, img/vid-002-still-1920.webp 1920w" sizes="100vw" width="1920" height="1080" alt="The ring of red roofs among the palms from high above, the sea beyond" loading="lazy" decoding="async"></figure>
  <div class="closing-in">
    <p>{e(C['closing'])}</p>
    <div class="acts"><a class="btn btn-book" href="{ENGINE}" data-drawer>Check dates {ICON['arrow']}</a><a class="btn btn-white" href="{e(wa("Hi Panta Rei Resort, I'd like to ask about a stay."))}">{ICON['wa']} WhatsApp</a></div>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap grid">
    <div class="f-brand">
      <img src="img/img-023-240.webp" width="96" height="96" alt="Panta Rei Resort, Kabalana" loading="lazy">
      <p>{e(C['contact']['address'])}</p>
      <div class="soc">{''.join(f'<a href="{u}" rel="noopener" target="_blank" aria-label="{n}">{ICON[n]}</a>' for n, u in SOC.items())}</div>
    </div>
    <div class="f-acts">
      <a class="btn btn-book" href="{ENGINE}">Book direct {ICON['arrow']}</a>
      <a class="btn btn-soft" href="{e(wa("Hi Panta Rei Resort, I'd like to ask about a stay."))}">{ICON['wa']} WhatsApp</a>
      <a class="btn btn-soft" href="tel:{PHONE}">{ICON['phone']} +94 72 800 3022</a>
      <a class="btn btn-soft" href="mailto:{EMAIL}">{ICON['mail']} {EMAIL}</a>
    </div>
    <nav class="f-nav" aria-label="Footer">
      <a href="#rooms">Rooms</a><a href="#pool">The pool</a><a href="#restaurant">Restaurant</a><a href="#fitness">Fitness</a><a href="#guests">Guests</a><a href="#getting-here">Getting here</a>
    </nav>
  </div>
  <p class="wrap small">© Panta Rei Resort, Kabalana</p>
</footer>

<div class="bar" id="bar" aria-hidden="true">
  <a class="btn btn-book" href="{ENGINE}" data-drawer tabindex="-1">Check dates</a>
  <a class="btn btn-wa" href="{e(wa("Hi Panta Rei Resort, I'd like to ask about a stay."))}" aria-label="WhatsApp" tabindex="-1">{ICON['wa']}</a>
</div>

<div class="scrim" id="scrim" hidden></div>
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-title" hidden>
  <div class="dr-head"><h2 id="dr-title">Check dates</h2><button type="button" class="x" aria-label="Close" data-close>&times;</button></div>
  <form class="dr-body" action="{ENGINE}" method="get" onsubmit="return false">
    <fieldset class="rooms-pick"><legend>Your room</legend>{drawer_rooms}</fieldset>
    <fieldset class="when"><legend>Dates and guests</legend>
      <div class="fl"><input type="date" id="d-in" placeholder=" " required><label for="d-in">Arrival</label></div>
      <div class="fl"><input type="date" id="d-out" placeholder=" " required><label for="d-out">Departure</label></div>
      <div class="step" role="group" aria-label="Guests"><span>Guests</span><button type="button" data-g="-1" aria-label="One guest fewer">−</button><output id="g-n">2</output><button type="button" data-g="1" aria-label="One guest more">+</button></div>
    </fieldset>
    <div class="sum" id="sum">
      <p class="sum-room" id="sum-room">Choose a room to see its prices for your dates.</p>
      <p class="sum-inc">{e(offer['body'].split(chr(10))[0])}</p>
      <p class="sum-trust">{R['booking']['score']:g}/10 on Booking.com · {R['booking']['count']} reviews</p>
    </div>
    <div class="dr-foot">
    <a class="btn btn-book go" id="go" href="{ENGINE}">See prices on our booking page {ICON['arrow']}</a>
    <a class="btn btn-soft" id="go-wa" href="{e(wa("Hi Panta Rei Resort, I'd like to ask about a stay."))}">{ICON['wa']} Ask on WhatsApp first</a>
    </div>
  </form>
</div>
<script>
const WA_NUM="{WA_NUM}",ENGINE="{ENGINE}";
{JS}
</script>
</body>
</html>
'''
OUT.write_text(page)
print('wrote', OUT.relative_to(ROOT), len(page), 'bytes')
