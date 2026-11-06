#!/usr/bin/env python3
"""Builds dist/index.html of the Panta Rei interactive mockup ("Morning swim") from the audited copy
(sites/panta-rei-resort/copy/en.json, used verbatim) + src/style.css + src/app.js.
Media comes from src/make-media.sh. Run: python3 sites/panta-rei-resort/mockups/interactive/src/build.py [--hero-only]
"""
import html, json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[2]
C = json.loads((SITE / 'copy' / 'en.json').read_text())
HERO_ONLY = '--hero-only' in sys.argv
e = lambda s: html.escape(s, quote=True)

def paras(body, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{e(p)}</p>' for p in body.split('\n\n'))

blocks = {b['heading']: b for b in C['copyBlocks']}
B = lambda h: blocks[h]
links = {b['label']: b['url'] for b in C['bookingLinks']}
ENGINE = links['Check dates and book direct']
WA_NUM = C['contact']['whatsapp'].lstrip('+')
WA = f'https://wa.me/{WA_NUM}'
from urllib.parse import quote
wa = lambda msg: f'{WA}?text={quote(msg)}'
WA_BOOK = wa("Hi Panta Rei! I'd like to check availability.")
WA_GROUP = wa("Hi Panta Rei! I'd like to ask about bringing a group.")
TEL = 'tel:' + C['contact']['phone']
TEL_SHOW = '+94 72 800 3022'
MAIL = C['contact']['email']
MAP = C['contact']['mapUrl']
SOC = {
    'Instagram': 'https://www.instagram.com/pantarei_resort/',
    'Facebook': 'https://www.facebook.com/profile.php?id=100093054286482',
    'YouTube': 'https://www.youtube.com/@Panta_Rei_Resort',
}
lkr = lambda n: f'{n:,} LKR'
price = {p['label']: p for p in C['priceList']}

# ---- icons
I = {
 'wa': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.42 5.2 5.33-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.2 8.2 0 1 1 7 3.9Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.18 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.2-.57.2-1.07.15-1.17-.06-.1-.22-.17-.47-.29Z"/></svg>',
 'tel': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
 'mail': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>',
 'pin': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
 'clock': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/></svg>',
 'arr': '<svg class="arr" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 'l': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
 'r': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
 'x': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 'down': '<svg class="caret" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
 'ig': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
 'fb': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/></svg>',
 'yt': '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8 0-1.3-.1-2.6-.4-3.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z"/></svg>',
}

def pic(name, w, h, alt, sizes='100vw', lazy=True, cls='', extra=''):
    """<picture> with webp at w and w/2, jpg fallback at w."""
    lz = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    c = f' class="{cls}"' if cls else ''
    return (f'<picture><source type="image/webp" srcset="img/{name}-{w//2}.webp {w//2}w, img/{name}-{w}.webp {w}w" sizes="{sizes}">'
            f'<img{c} src="img/{name}-{w}.jpg" width="{w}" height="{h}" alt="{e(alt)}"{lz}{extra}></picture>')

# ---- rooms
ROOM_PICS = {
 'double': ['Double Room: white bed with a rattan arch headboard, a wooden drawer base and rattan-panel wardrobe doors',
            'Bed with a rattan arch headboard beside tall teak French windows open to the garden',
            'Bathroom with a white vanity, a rattan-front cabinet, blue crazy-paving tiles and a window onto greenery',
            'Bed with a striped throw and a straw hat, rattan wardrobe doors and a round rattan rug',
            'Bed with a rattan arch headboard, a rattan-panel wardrobe and a round rattan rug on a polished concrete floor'],
 'triple': ['Triple Room: bed with a rattan arch headboard, a pink cushioned rocking chair and an arched rattan mirror under a white vaulted ceiling',
            'Freestanding white bathtub, blue crazy-paving tiles and wooden-framed windows',
            'Bungalow front: red tile roof, white walls, teak doors and two rattan chairs on the terrace',
            'Bed with a rattan arch headboard and an orange cushioned rattan armchair',
            'Hooks with a straw bag and a red cloth beside an arched rattan mirror'],
 'family': ['Family Villa bedroom: tall teak French windows to the garden and a rattan arch headboard',
            'Freestanding white tub on pebbles in a walled outdoor bath under palms',
            'Room with glass sliding doors open to the lawn, a surfboard leaning outside',
            'Twin beds pushed together under a large palm-fan headboard, rattan pendant lamps and open shelving',
            'White bungalow with glass sliding doors behind dense tropical planting'],
 'suite': ['Suite: bed facing open glass doors onto a private plunge pool and two terrace chairs',
           'The private plunge pool on its terrace with two wooden lounge chairs, palms behind',
           'Bed under a large palm-fan headboard with rattan pendant lamps and a potted palm',
           'Walk-in shower with pale crazy-paving stone walls, a backlit niche and a built-in bench',
           'Palm-fan headboard, a rattan pendant lamp, a wooden stool and a potted palm',
           'Lounge niche with a built-in white bench, cushions and a rattan side table, the glass shower to the right'],
}
KEYS = {'Double Room': 'double', 'Triple Room': 'triple', 'Family Villa': 'family', 'Suite with Private Pool': 'suite'}
rooms = []
for r in C['rooms']:
    k = KEYS[r['label']]
    size = re.match(r'(\d+ m²)', r['note']).group(1)
    rooms.append(dict(key=k, label=r['label'], url=links[r['label']], beds=r['beds'], note=r['note'],
                      sleeps=r['sleeps'], size=size, facts=f"{size} · sleeps {r['sleeps']}",
                      photos=[dict(f=f'room-{k}-{i+1}', alt=a) for i, a in enumerate(ROOM_PICS[k])]))
DATA = dict(engine=ENGINE, wa=WA, waText="Hi Panta Rei! I'd like to check availability", rooms=rooms)

ratings = {r['platform']: r for r in C['ratings']}
bk, gg = ratings['booking'], ratings['google']
cap = '6 Nov 2026'  # ratings[].capturedAt 2026-11-06
SRC = {'google': 'Google', 'booking': 'Booking.com', 'site': 'pantareiresort.com'}

import base64
LOGO = 'data:image/png;base64,' + base64.b64encode((HERE.parent / 'dist' / 'img' / 'logo.png').read_bytes()).decode()
CSS = f':root{{--logo:url({LOGO})}}' + (HERE / 'style.css').read_text()  # inline: CSS masks are blocked on file://

# =========================================================================== page
H = []
H.append(f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Panta Rei Resort · Kabalana, Ahangama</title>
<meta name="description" content="{e(C['tagline'])}">
<meta name="theme-color" content="#FAFBF8">
<meta property="og:title" content="Panta Rei Resort, Kabalana">
<meta property="og:description" content="{e(C['tagline'])}">
<meta property="og:image" content="img/ring-2000.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&display=swap">
<link rel="preload" as="image" href="img/hero-960.webp" imagesrcset="img/hero-960.webp 960w, img/hero-1920.webp 1920w" imagesizes="100vw" type="image/webp">
<script>document.documentElement.className='js'</script>
<style>{CSS}</style>
</head>
<body>
<a class="vh" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap">
    <a class="logo" href="#top" aria-label="Panta Rei Resort, Kabalana: back to the top"></a>
    <nav class="nav" aria-label="Sections">
      <a href="#rooms">Rooms</a><a href="#restaurant">Restaurant</a><a href="#fitness">Fitness</a><a href="#getting-here">Getting here</a>
    </nav>
    <a class="btn" href="{ENGINE}" data-book>Check dates</a>
    <a class="hdr-wa" href="{WA_BOOK}" aria-label="WhatsApp Panta Rei">{I['wa']}</a>
  </div>
</header>
<main id="main">
<section class="hero" id="top" aria-label="Panta Rei, Kabalana">
  <div class="hero-media">
    <picture><source type="image/webp" srcset="img/hero-960.webp 960w, img/hero-1920.webp 1920w" sizes="100vw"><img src="img/hero-1920.jpg" width="1920" height="1080" alt="Aerial view along a palm-lined beach, surf breaking on turquoise water" fetchpriority="high"></picture>
    <video id="hero-video" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true" poster="img/hero-1920.jpg">
      <source data-src="video/hero-m1280.webm" type="video/webm" media="(max-width: 767px)">
      <source data-src="video/hero-m1280.mp4" type="video/mp4" media="(max-width: 767px)">
      <source data-src="video/hero-d1920.webm" type="video/webm">
      <source data-src="video/hero-d1920.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hero-c">
    <h1>Panta Rei, Kabalana</h1>
    <a class="btn" href="{ENGINE}" data-book>Check dates</a>
  </div>
  <span id="hero-sentinel" style="position:absolute;bottom:0;left:0;height:1px;width:1px"></span>
</section>
''')

if not HERO_ONLY:
    w = B('Welcome to Panta Rei')
    H.append(f'''
<section class="sec page lilac welcome" aria-labelledby="h-welcome">
  <div class="wrap">
    <div>
      <h2 id="h-welcome">{e(w['heading'])}</h2>
      <p class="feature">{e(C['featureLine'])}</p>
      <p class="lead">{e(C['tagline'])}</p>
      {paras(w['body'])}
    </div>
    <div class="clip">
      {pic('welcome-poster', 720, 900, 'The pool from above, swimmers in the water and loungers along the stone deck', sizes='(max-width:860px) 90vw, 420px')}
      <video data-lazy muted loop playsinline preload="none" disablepictureinpicture aria-label="The pool from above with swimmers, rising over the palms to the sea" poster="img/welcome-poster-720.jpg">
        <source data-src="video/welcome-720.webm" type="video/webm"><source data-src="video/welcome-720.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</section>
''')
    o = B('Four ways to stay')
    cards = ''.join(f'''
      <a class="card" href="{r['url']}" data-book data-room="{r['key']}" aria-label="{e(r['label'])}, {r['size']}, sleeps {r['sleeps']}: see the room and check dates">
        {pic('card-' + r['key'], 720, 900, r['photos'][0]['alt'], sizes='(max-width:980px) 76vw, 300px')}
        <span class="go" aria-hidden="true">Look inside {I['arr']}</span>
        <span class="ct"><h3>{e(r['label'])}</h3><span class="meta">{r['size']} · sleeps {r['sleeps']}</span></span>
      </a>''' for r in rooms)
    st = C['stayInfo']
    H.append(f'''
<section class="sec rooms" id="rooms" aria-labelledby="h-rooms">
  <div class="wrap rooms-head">
    <h2 id="h-rooms">{e(o['heading'])}</h2>
    <div>{paras(o['body'])}</div>
  </div>
  <div class="ring">
    <img data-par="1" src="img/ring-2000.jpg" srcset="img/ring-1000.webp 1000w, img/ring-2000.webp 2000w" sizes="100vw" width="2000" height="1124" alt="The resort from the air: red-tiled bungalows and the white two-storey main building around a long turquoise pool, jungle all round" loading="lazy" decoding="async">
  </div>
  <div class="wrap cards">
    <div class="track">{cards}
    </div>
    <p class="stay-notes"><span><b>Check-in</b> from {st['checkInFrom']}</span><span><b>Check-out</b> until {st['checkOutTo']}</span><span>{e(st['note'])}</span></p>
  </div>
</section>
''')
    p = B('The pool'); dp = price['Pool day pass']
    H.append(f'''
<section class="sec pool" aria-labelledby="h-pool">
  <div class="wrap">
    <div class="prints">
      <div class="p1">{pic('pool', 1500, 1000, 'A guest wading into the long pool, red-roofed bungalows and tall palms beyond', sizes='(max-width:860px) 92vw, 680px')}</div>
      <div class="p2">{pic('plunge', 720, 900, "The suite's private plunge pool with two wooden lounge chairs", sizes='(max-width:860px) 36vw, 260px')}</div>
    </div>
    <div>
      <h2 id="h-pool">{e(p['heading'])}</h2>
      {paras(p['body'])}
      <div class="pass"><b>{e(dp['label'])}</b><span class="price">{lkr(dp['price'])}</span><span class="muted">per person · {e(dp['note'])}</span></div>
    </div>
  </div>
</section>
''')
    rb = B('Restaurant and bar')
    MENU = [
        ('Breakfast', ['Smoothie bowls', 'Granola', 'Banana oat pancakes', 'Shakshuka', 'The Sri Lankan plate: egg hoppers, dhal and coconut sambal'],
         'menu-breakfast', 'Breakfast served at a teak table under greenery: a bowl passed across, juice and fruit'),
        ('Later on', ['Fish bowl', 'Curry of the day', 'Whole grilled fish, priced on weight'],
         'menu-later', 'Sliders and plated dishes on a teak table in the garden'),
        ('Dinner', ['A mix of traditional and modern Mediterranean dishes'],
         'menu-dinner', 'A plate of pasta with prawns held over a teak table'),
    ]
    tabs = ''.join(f'<button class="tab" role="tab" type="button" id="t-{i}" aria-controls="m-{i}" aria-selected="{str(i==0).lower()}">{n}</button>' for i, (n, *_ ) in enumerate(MENU))
    panels = ''.join(f'<div class="menu-panel" role="tabpanel" id="m-{i}" aria-labelledby="t-{i}"><h3>{n}</h3><ul class="dishes">' + ''.join(f'<li>{e(x)}</li>' for x in d) + '</ul></div>' for i, (n, d, *_ ) in enumerate(MENU))
    plates = ''.join(f'<img{" class=on" if i==0 else ""} src="img/{f}-960.jpg" srcset="img/{f}-480.webp 480w, img/{f}-960.webp 960w" sizes="(max-width:860px) 90vw, 460px" width="960" height="1200" alt="{e(a)}" loading="lazy" decoding="async">' for i, (_, _, f, a) in enumerate(MENU))
    H.append(f'''
<section class="sec page peach resto" id="restaurant" aria-labelledby="h-resto">
  <div class="wrap">
    <div>
      <h2 id="h-resto">{e(rb['heading'])}</h2>
      {paras(rb['body'])}
      <div class="tabs" role="tablist" aria-label="Dishes by time of day"><span class="pill" aria-hidden="true"></span>{tabs}</div>
      {panels}
      <p class="hours">{I['clock']}<span>{e(C['hoursNote'])}</span></p>
    </div>
    <div class="plates">{plates}</div>
  </div>
</section>
''')
    f = B('Panta Fitness Club')
    days = [('Mon', 'Monday'), ('Tue', 'Tuesday'), ('Wed', 'Wednesday'), ('Thu', 'Thursday'), ('Fri', 'Friday'), ('Sat', 'Saturday'), ('Sun', 'Sunday')]
    week = ''.join(
        (f'<button class="day off" type="button" aria-pressed="false" data-say="Friday is the day off." aria-label="{full}"><span class="f">{d}</span><span class="b" aria-hidden="true">Off</span></button>'
         if d == 'Fri' else
         f'<button class="day" type="button" aria-pressed="false" data-say="{full}: Vinyasa yoga at 8:30." aria-label="{full}"><span class="f">{d}</span><span class="b" aria-hidden="true">8:30</span></button>')
        for d, full in days)
    rates = ''.join(f'<div class="rate"><small>{e(lbl.split(": ")[1].capitalize())}</small><span class="price">{lkr(price[lbl]["price"])}</span><small>per class</small></div>'
                    for lbl in ['Fitness class: residents', 'Fitness class: in-house guests', 'Fitness class: walk-ins'])
    H.append(f'''
<section class="sec fit" id="fitness" aria-labelledby="h-fit">
  <div class="wrap">
    <div class="phone">
      {pic('fitness-poster', 540, 960, 'A mat class on the open upper floor, women on their backs doing crunches', sizes='300px')}
      <video data-lazy muted loop playsinline preload="none" disablepictureinpicture aria-label="A mat class on the open upper floor, women on their backs doing crunches" poster="img/fitness-poster-540.jpg">
        <source data-src="video/fitness-540.webm" type="video/webm"><source data-src="video/fitness-540.mp4" type="video/mp4">
      </video>
    </div>
    <div>
      <h2 id="h-fit">{e(f['heading'])}</h2>
      {paras(f['body'])}
      <div class="week" role="group" aria-label="This week's yoga: tap a day">{week}</div>
      <p class="day-say" aria-live="polite"></p>
      <div class="rates">{rates}</div>
    </div>
  </div>
</section>
''')
    a = B('After the surf')
    def mrow(name):
        full, back = price[f'{name}, 60 min full body'], price[f'{name}, 45 min back, neck & shoulders']
        return (f'<div class="mass-row"><b>{name}</b><div><span><span>60 min full body</span><span class="price">{lkr(full["price"])}</span></span>'
                f'<span><span>45 min back, neck &amp; shoulders</span><span class="price">{lkr(back["price"])}</span></span></div></div>')
    H.append(f'''
<section class="sec page lilac surf" aria-labelledby="h-surf">
  <div class="wrap">
    <div>
      <h2 id="h-surf">{e(a['heading'])}</h2>
      {paras(a['body'])}
      <div class="mass">{mrow('Surf Therapy Massage')}{mrow('Revitalizing Massage')}</div>
    </div>
    <div class="surf-pic">{pic('surf', 1350, 900, 'Two guests carrying surfboards across the lawn by the pool; a woman in a straw hat crouches beside a dog', sizes='(max-width:860px) 92vw, 640px')}</div>
  </div>
</section>
''')
    qs = ''.join(f'<blockquote class="quote"><p>{e(t["quote"])}</p><footer>{e(t["author"])} <span>· on {SRC[t["source"]]}</span></footer></blockquote>' for t in C['testimonials'])
    H.append(f'''
<section class="sec guests" aria-labelledby="h-guests">
  <div class="wrap">
    <h2 id="h-guests">What guests say</h2>
    <div class="scores">
      <a class="score" href="{bk['url']}" rel="noopener"><span class="n">{bk['score']}</span><span><strong>/10 on Booking.com</strong><small>{bk['count']} reviews · captured {cap}</small></span></a>
      <a class="score" href="{gg['url']}" rel="noopener"><span class="n">{gg['score']}</span><span><strong>/5 on Google</strong><small>{gg['count']} reviews · captured {cap}</small></span></a>
    </div>
    <div class="quotes" tabindex="0" aria-label="Guest reviews, scroll sideways">{qs}</div>
    <div class="qctl"><button class="rbtn" id="qprev" type="button" aria-label="Previous review">{I['l']}</button><div class="dots" id="qdots"></div><button class="rbtn" id="qnext" type="button" aria-label="Next review">{I['r']}</button></div>
  </div>
</section>
''')
    g = B('Getting here and around')
    stops = [('5 km', 'Koggala Airport'), ('2.1 km', 'Ahangama station'), ('1.9 km', 'Kathaluwa station'), ('1.5 km', 'Koggala Lake'), ('A short walk', 'Kabalana Beach')]
    stl = ''.join(f'<li><span class="km">{k}</span><span>{n}</span></li>' for k, n in stops)
    am = '<span class="sep" aria-hidden="true">|</span>'.join(
        f'<span><b>{e(x["label"])}</b>{" (" + e(x["note"]) + ")" if x["note"] else ""}</span>' for x in C['amenities'])
    H.append(f'''
<section class="sec page sage around" id="getting-here" aria-labelledby="h-around">
  <div class="wrap">
    <div>
      <h2 id="h-around">{e(g['heading'])}</h2>
      {paras(g['body'])}
      <p class="addr">{I['pin']}<span>{e(C['contact']['address'])}</span></p>
      <div class="btns"><a class="btn soft" href="{MAP}" rel="noopener">Open in Google Maps {I['arr']}</a><a class="btn soft" href="{wa("Hi Panta Rei! Could you call a tuk tuk or a taxi for me?")}">{I['wa']} Ask us for a ride</a></div>
    </div>
    <div>
      <h3 class="vh">From the resort</h3>
      <ul class="stops" aria-label="Distances from the resort">{stl}</ul>
    </div>
    <div class="know" style="grid-column:1/-1">
      <h3>Good to know</h3>
      <p class="line">{am}</p>
    </div>
  </div>
</section>
''')
    gr = B('Groups and retreats')
    H.append(f'''
<section class="sec groups" aria-labelledby="h-groups">
  <div class="wrap">
    <div class="lounge">{pic('lounge', 1350, 900, 'The open-air lounge under the main building: rattan pendant lamps over orange cushioned rattan chairs', sizes='(max-width:860px) 92vw, 620px')}</div>
    <div>
      <h2 id="h-groups">{e(gr['heading'])}</h2>
      {paras(gr['body'])}
      <a class="btn" style="--bg:var(--ink)" href="{WA_GROUP}">{I['wa']} Ask about a group</a>
    </div>
  </div>
</section>
<section class="closing" id="book" aria-label="Book direct">
  {pic('closing', 1920, 1080, 'Top-down view of the long pool ringed by red-tiled bungalows', sizes='100vw')}
  <div class="wrap">
    <p>{e(C['closing'])}</p>
    <div class="btns"><a class="btn" href="{ENGINE}" data-book>Check dates and book direct {I['arr']}</a><a class="btn ghost" href="{WA_BOOK}"><span class="wa-c">{I['wa']}</span> WhatsApp</a></div>
  </div>
</section>
''')

H.append(f'''</main>
''' + ('' if HERO_ONLY else f'''<footer class="foot">
  <div class="wrap">
    <div>
      <span class="logo" role="img" aria-label="Panta Rei Resort, Kabalana"></span>
      <p>{e(C['tagline'])}</p>
      <p class="addr">{I['pin']}<span>{e(C['contact']['address'])}</span></p>
    </div>
    <div>
      <h3>Talk to us</h3>
      <div class="cbtns">
        <a class="btn soft sm" href="{WA_BOOK}"><span class="wa-c">{I['wa']}</span> WhatsApp {TEL_SHOW}</a>
        <a class="btn soft sm" href="{TEL}">{I['tel']} Call {TEL_SHOW}</a>
        <a class="btn soft sm" href="mailto:{MAIL}">{I['mail']} {MAIL}</a>
      </div>
    </div>
    <div>
      <h3>Follow</h3>
      <div class="icons">
        <a class="ic" href="{SOC['Instagram']}" rel="noopener" aria-label="Instagram">{I['ig']}</a>
        <a class="ic" href="{SOC['Facebook']}" rel="noopener" aria-label="Facebook">{I['fb']}</a>
        <a class="ic" href="{SOC['YouTube']}" rel="noopener" aria-label="YouTube">{I['yt']}</a>
      </div>
      <a class="btn" href="{ENGINE}" data-book>Book direct {I['arr']}</a>
    </div>
    <p class="small">© Panta Rei Resort, Kabalana</p>
  </div>
</footer>
''') + f'''
<div class="bar" aria-label="Book"><a class="btn" href="{ENGINE}" data-book>Check dates</a><a class="wa" href="{WA_BOOK}" aria-label="WhatsApp Panta Rei">{I['wa']}</a></div>
<a class="fwa" href="{WA_BOOK}" aria-label="WhatsApp Panta Rei">{I['wa']}</a>

<div class="scrim" id="scrim" hidden></div>
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-title" hidden>
  <div class="dr-head"><h2 id="dr-title">{e(C['bookingLinks'][0]['label'])}</h2><button class="x" type="button" aria-label="Close">{I['x']}</button></div>
  <div class="dr-body">
    <div class="pick" role="group" aria-label="Choose a room">''' + ''.join(
        f'<button class="rchip" type="button" data-room="{r["key"]}" aria-pressed="false"><img src="img/card-{r["key"]}-360.webp" width="52" height="52" alt="" loading="lazy"><span><b>{e(r["label"])}</b><small>{r["size"]} · sleeps {r["sleeps"]}</small></span></button>' for r in rooms) + f'''</div>
    <div class="room" aria-hidden="true"><div>
      <div class="gal"><div class="slides"></div><button class="rbtn prev" type="button" aria-label="Previous photo">{I['l']}</button><button class="rbtn next" type="button" aria-label="Next photo">{I['r']}</button><div class="dots"></div></div>
      <div class="rd"><h3></h3><p class="facts"></p><p class="beds"></p><p class="note"></p></div>
    </div></div>
    <p class="inc">{e(B('Four ways to stay')['body'].split(chr(10)+chr(10))[0])}</p>
    <p class="trust"><b>{bk['score']}</b><span>/10 on Booking.com · {bk['count']} reviews · captured {cap}</span></p>
    <div class="form">
      <div class="fl"><input id="f-arr" type="date" name="start"><label for="f-arr">Arrival</label></div>
      <div class="fl"><input id="f-dep" type="date" name="end"><label for="f-dep">Departure</label></div>
      <div class="fl full"><select id="f-gst" name="numberOfGuests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select><label for="f-gst">Guests</label>{I['down']}</div>
    </div>
    <p class="prices">Prices with your dates are on our booking page.</p>
  </div>
  <div class="dr-foot">
    <a class="btn" id="dr-go" href="{ENGINE}">See prices on our booking page {I['arr']}</a>
    <div class="row"><a class="btn soft" id="dr-wa" href="{WA_BOOK}"><span class="wa-c">{I['wa']}</span> WhatsApp</a><a class="btn soft" href="{TEL}">{I['tel']} Call</a></div>
  </div>
</div>
<script type="application/json" id="rooms-data">{json.dumps(DATA, ensure_ascii=False).replace("</", "<\\/")}</script>
<script>{(HERE / 'app.js').read_text()}</script>
</body>
</html>
''')

out = HERE.parent / 'dist' / 'index.html'
out.write_text(''.join(H))
print('wrote', out, len(''.join(H)), 'bytes', '(hero only)' if HERO_ONLY else '')
