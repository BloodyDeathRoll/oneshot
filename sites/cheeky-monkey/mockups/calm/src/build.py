#!/usr/bin/env python3
"""Assemble the calm mockup (concept 1, "The signboard") into one self-contained dist/index.html.

Every word, price, room, review and contact on the page is read from sites/cheeky-monkey/copy/en.json
(passed at 4c); nothing is retyped. The only strings written here are interface labels (button and tab
names, "Every week includes") and image alt text. Media comes from src/make-media.sh.
Run: python3 sites/cheeky-monkey/mockups/calm/src/build.py
"""
import html, json, pathlib, re
from datetime import date

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]                      # sites/cheeky-monkey
copy = json.loads((SITE / 'copy/en.json').read_text())
E = lambda s: html.escape(str(s), quote=True)
blocks = {b['heading']: [p for p in b['body'].split('\n\n')] for b in copy['copyBlocks']}
def paras(h, sl=slice(None)): return ''.join(f'<p>{E(p)}</p>' for p in blocks[h][sl])
def link(label): return next(b['url'] for b in copy['bookingLinks'] if b['label'] == label)

BOOK = link('Check dates on Booking.com')
INSTA = link('Message us on Instagram')
C = copy['contact']
TEL = 'tel:' + C['phone']
PHONE_SHOWN = re.sub(r'^\+94(\d{2})(\d{3})(\d{4})$', r'+94 \1 \2 \3', C['phone'])
FACEBOOK = 'https://www.facebook.com/cheekymonkeysrilanka/'   # dossier contact.socials.facebook
SITE_URL = 'https://cheekymonkeymidigama.com/'               # dossier contact.socials.website (source "site")
def mail(subject): return f"mailto:{C['email']}?subject={subject.replace(' ', '%20')}"
def fmt_day(s): d = date.fromisoformat(s); return f'{d.day} {d:%b %Y}'
def fmt_month(s): y, m = s.split('-'); return f'{date(int(y), int(m), 1):%b %Y}'
def money(n, cur='USD'): return f'<small>{cur}</small>{n}'
SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return SEP.join(items)

I = {  # stroke icons, 24 grid, currentColor
 'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 'mail': '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6 9 7 9-7"/>',
 'cal': '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
 'pin': '<path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/>',
 'bed': '<path d="M3 19v-9M21 19v-5a3 3 0 0 0-3-3H8v8M3 15h18"/><circle cx="6" cy="12" r="1.6"/>',
 'cup': '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zM17 9.5h1.5a2.5 2.5 0 0 1 0 5H17M7 3.5v2M10.5 3.5v2M14 3.5v2M4 21h13"/>',
 'plate': '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="3.2"/><path d="M2.5 4v6M4 4v16M2.5 10H5.5M5.5 4v6M21.5 20V4c-1.8.8-2.5 3-2.5 6s.7 4 2.5 4"/>',
 'sun': '<circle cx="12" cy="14" r="4"/><path d="M12 4.5v2M4.5 14h-2M21.5 14h-2M6.6 8.6 5.2 7.2M17.4 8.6l1.4-1.4M2.5 20h19"/>',
 'music': '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
 'flame': '<path d="M12 21.5c3.6 0 6.5-2.6 6.5-6.3 0-3.9-3.3-6.3-4.3-10.7-2.3 1.6-3.4 4-3.2 6.4-1.3-.6-2.1-1.8-2.3-3.2C6.9 9.6 5.5 12 5.5 15.2c0 3.7 2.9 6.3 6.5 6.3z"/>',
 'gym': '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
 'board': '<path d="M12 2.5c3.2 3.4 4.5 8.2 4 12.6-.3 2.9-1.8 5.4-4 6.4-2.2-1-3.7-3.5-4-6.4-.5-4.4.8-9.2 4-12.6zM12 7v11"/>',
 'van': '<path d="M3 16.5V8a2 2 0 0 1 2-2h10l4 5h1a1 1 0 0 1 1 1v4.5h-2M3 16.5h2M9 16.5h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M15 6v5h4"/>',
 'wave': '<path d="M2.5 9c2.4 0 2.4-2 4.75-2S9.6 9 12 9s2.4-2 4.75-2S19.1 9 21.5 9M2.5 15c2.4 0 2.4-2 4.75-2S9.6 15 12 15s2.4-2 4.75-2 2.35 2 4.75 2"/>',
 'tag': '<path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.6"/>',
 'scooter': '<circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/><path d="M8 17.5h7l2-8h-3M17 9.5 15 4h-2.5M8 17.5 6.5 12H3"/>',
 'insta': '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
 'fb': '<path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H8.5v3.5H11V21h3.5v-6.5H17l.5-3.5h-3V9a.5.5 0 0 1 .5-.5z"/>',
 'prev': '<path d="m15 18-6-6 6-6"/>', 'next': '<path d="m9 18 6-6-6-6"/>',
 'play': '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>', 'pause': '<path d="M8 5v14M16 5v14" stroke-width="3"/>',
}
def svg(name, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<svg{c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{I[name]}</svg>'
def ic(name): return f'<span class="ic">{svg(name)}</span>'
def btn_book(label='Check dates on Booking.com', cls=''): return f'<a class="btn btn-book {cls}" href="{E(BOOK)}">{svg("cal")}{E(label)}</a>'
def btn_call(label='Call to book', cls='btn-soft'): return f'<a class="btn {cls}" href="{TEL}">{svg("phone")}{E(label)}</a>'
def btn_mail(subject, label='Email', cls='btn-soft'): return f'<a class="btn {cls}" href="{E(mail(subject))}">{svg("mail")}{E(label)}</a>'

def pic(base, sizes, alt, w, h, lazy=True, cls=''):
    """base is e.g. 'room-img-030' with -1440/-720 renditions"""
    ld = ' loading="lazy" decoding="async"' if lazy else ''
    return (f'<img{" class=" + chr(34) + cls + chr(34) if cls else ""} src="img/{base}-1440.webp" srcset="img/{base}-720.webp 720w, img/{base}-1440.webp 1440w" '
            f'sizes="{sizes}" width="{w}" height="{h}" alt="{E(alt)}"{ld}>')

def slideshow(slides_html, label, arrows=True):
    n = len(slides_html)
    dots = ''.join(f'<button class="dot" type="button" aria-label="Show {i + 1} of {n}"><span></span></button>' for i in range(n))
    arr = (f'<button class="arrow prev" type="button" aria-label="Previous">{svg("prev")}</button>'
           f'<button class="arrow next" type="button" aria-label="Next">{svg("next")}</button>') if arrows else ''
    ui = f'<div class="ss-ui">{arr}<div class="dots">{dots}</div></div>'
    track = (f'<div class="ss-track" tabindex="0" role="region" aria-roledescription="slideshow" aria-label="{E(label)}">'
             + ''.join(slides_html) + '</div>')
    return f'<div class="ss{" ui-top" if not arrows else ""}" data-ss>' + (ui + track if not arrows else track + ui) + '</div>'

# ---------------------------------------------------------------- surf weeks (priceList + "A week of surf")
week = blocks['A week of surf']
packs = []
for row in copy['priceList']:
    if row['unit'] != 'per_week': continue
    name, room = row['label'].rsplit(', ', 1)
    if not packs or packs[-1]['name'] != name: packs.append({'name': name, 'rows': []})
    packs[-1]['rows'].append((room, row))
TAB = {'Full Surf Lesson Package': 'Full Surf Lesson', 'Moderate Surf Lesson or Surf Spot Guiding Package': 'Moderate',
       'Yoga and Surf Lesson Package': 'Yoga and Surf', 'Surf Board Rental Package': 'Board Rental'}
tabs, panels = [], []
for i, p in enumerate(packs):
    on = i == 0
    tabs.append(f'<button class="tab" role="tab" id="t{i}" aria-controls="p{i}" aria-selected="{str(on).lower()}" tabindex="{0 if on else -1}" type="button">{E(TAB[p["name"]])}</button>')
    cells = ''.join(f'<div class="price"><span class="for">{E(room[0].upper() + room[1:])}</span><span class="amt">{money(r["price"], r["currency"])}</span>'
                    f'<span class="unit">{E(r["note"].split(". ")[0].lower().capitalize())} {SEP} published 2021</span></div>' for room, r in p['rows'])
    panels.append(f'<div class="panel{" on" if on else ""}" role="tabpanel" id="p{i}" aria-labelledby="t{i}">'
                  f'<h3 class="pk-name">{E(p["name"])}</h3><p class="pk-line">{E(week[i])}</p><div class="prices">{cells}</div>'
                  f'<div class="btns">{btn_call()}{btn_mail("Cheeky Monkey: " + p["name"])}</div></div>')
incl_items = [  # the fifth paragraph of "A week of surf", item by item, in its own words
    ('bed', 'seven nights', ''), ('cup', 'seven breakfasts', ''), ('plate', 'five dinners', ''),
    ('sun', 'two or three yoga classes', ''), ('music', 'a party night', ''), ('flame', 'the weekly BBQ night', ''),
    ('gym', 'free use of the gym', ''), ('board', 'your board for the lessons', 'with the three lesson packages'),
    ('van', 'the ride to the surf spot', 'with the three lesson packages'), ('wave', 'one lake tour in the week', 'USD 5 extra')]
assert all(t in week[4] for _, t, _ in incl_items if t not in ('one lake tour in the week',)) and 'lake tour in the week' in week[4]
incl = ''.join(f'<li>{ic(k)}<span>{E(t[0].upper() + t[1:])}{f"<br><span class=chip>{E(c)}</span>" if c else ""}</span></li>' for k, t, c in incl_items)

# ---------------------------------------------------------------- lessons
L = copy['lessons']
surf = L[0]
lvl = ', '.join(surf['level']).capitalize()
cards = (
  f'<article class="card"><h3>{E(surf["label"])}</h3><p>{surf["durationMin"]} min {SEP} {E(lvl)}</p>'
  f'<div class="amt">{money(surf["price"], surf["currency"])}</div><p>per person {SEP} published 2021</p><div class="btns">{btn_call()}</div></article>'
  f'<article class="card"><h3>{E(L[2]["label"])}</h3><p>{E(L[2]["groupSize"])}</p><div class="btns">{btn_call()}</div></article>'
  f'<article class="card"><h3>More lessons</h3><ul>' + ''.join(f'<li>{E(x["label"])}</li>' for x in (L[1], L[3], L[4])) +
  f'</ul><div class="btns">{btn_call()}</div></article>')

# ---------------------------------------------------------------- rooms
GAL = {  # concept 1 galleries, with what each photograph shows
 'Superior Double Room': [('img-030', 'four-poster bed under the yellow SURF TRIP bus mural'), ('img-014', 'the four-poster bed and the mermaid mural'),
   ('img-021', 'the bed below the RIDE THE WAVE glasses mural'), ('img-016', 'the bed, desk and mermaid mural'),
   ('img-033', 'the door open onto the balcony and palms'), ('img-026', 'the balcony door with palms outside')],
 'Double Room': [('img-058', 'the bed under the blue fishbone SURF mural'), ('img-041', 'the bed and polished concrete walls'),
   ('img-045', 'the bed by the open balcony door'), ('img-050', 'the view from the door over the garden to the sea'),
   ('img-053', 'the shared balcony with palms')],
 'Small Double Room': [('img-002', 'the double bed with navy linen'), ('img-004', 'the room with its desk'),
   ('img-009', 'the bed by the open door'), ('img-013', 'the sea from the top floor')],
 'Classic Triple Room': [('img-035', 'three single beds'), ('img-034', 'three single beds in warm light'),
   ('img-036', 'the room from the door'), ('img-037', 'the beds and the open door to the balcony')],
 'Small Twin Room': [('img-064', 'two single beds and the ochre wall'), ('img-063', 'the two beds and the ochre wall'),
   ('img-065', 'a bedside lamp against the ochre wall'), ('img-070', 'the sea seen from the door')],
}
rooms_by = {r['label']: r for r in copy['rooms']}
rooms_html = ''
for name, gal in GAL.items():
    r = rooms_by[name]
    slides = [pic(f'room-{a}', '(max-width:760px) 100vw, 1040px', f'{name}: {alt}', 1440, 960, lazy=True) for a, alt in gal]
    det = pipe([E(r['beds']), f'sleeps {r["sleeps"]}', E(r['note'])])
    rooms_html += (f'<article class="room" aria-label="{E(name)}">{slideshow(slides, name + ", photographs")}'
                   f'<div class="room-row"><div><h3>{E(name)}</h3><p class="pipe">{det}</p></div>{btn_book()}</div></article>')
S = copy['stayInfo']
stay = (f'<p class="stay pipe"><strong>Check-in</strong> {S["checkInFrom"]}–{S["checkInTo"]} {SEP} <strong>Check-out</strong> {S["checkOutFrom"]}–{S["checkOutTo"]} {SEP} '
        + pipe(E(x) for x in S['note'].rstrip('.').split('. ')) + '</p>')

# ---------------------------------------------------------------- shop
RENT_IC = {'Surfboards': 'board', 'Cheeky Monkey boards': 'tag', 'Scooters': 'scooter'}
rent = ''.join(f'<li>{ic(RENT_IC[x["label"]])}<span>{E(x["label"])}{f"<small>{E(x["note"])}</small>" if x.get("note") else ""}</span></li>' for x in copy['rentals'])
brands = pipe(E(b['label']) for b in copy['brands'])

# ---------------------------------------------------------------- roof
amen = pipe(E(a['label'] + (f' ({a["note"]})' if a.get('note') else '')) for a in copy['amenities'])

# ---------------------------------------------------------------- guests
PLAT = {'google': ('Google', 'Read on Google'), 'booking': ('Booking.com', 'Read on Booking.com')}
rates = ''.join(f'<a class="rate" href="{E(r["url"])}"><span class="sc">{r["score"]}<small>/{r["scale"]}</small></span>'
                f'<span class="meta">{pipe([PLAT[r["platform"]][0], f"{r["count"]} reviews", fmt_day(r["capturedAt"])])}</span></a>'
                for r in copy['ratings'])
SRC = {'booking': ('Booking.com', BOOK), 'site': ('cheekymonkeymidigama.com', SITE_URL)}
quotes = []
for t in copy['testimonials']:
    src, url = SRC[t['source']]
    when = f' {SEP} {fmt_month(t["date"])}' if t.get('date') else ''
    quotes.append(f'<blockquote class="quote"><p>“{E(t["quote"])}”</p><footer>{E(t["author"])} {SEP} <a href="{E(url)}">{E(src)}</a>{when}</footer></blockquote>')

# ---------------------------------------------------------------- getting here
air = [r for r in copy['priceList'] if r['unit'] == 'flat']
air_line = pipe(f'{E(r["label"])} {r["currency"]} {r["price"]}' for r in air) + f' {SEP} published 2021'

page = f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(copy["businessName"])} | Midigama, Sri Lanka</title>
<meta name="description" content="{E(copy["tagline"])}">
<meta name="theme-color" content="#ffffff">
<meta property="og:title" content="{E(copy["businessName"])}">
<meta property="og:description" content="{E(copy["tagline"])}">
<meta property="og:image" content="img/hero-wide-1280.webp">
<link rel="preload" href="fonts/albert-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/yellowtail-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="img/hero-tall-828.webp" imagesrcset="img/hero-tall-828.webp 828w, img/hero-tall-1200.webp 1200w" imagesizes="100vw" media="(max-width: 760px)">
<link rel="preload" as="image" href="img/hero-wide-1920.webp" imagesrcset="img/hero-wide-1280.webp 1280w, img/hero-wide-1920.webp 1920w" imagesizes="100vw" media="(min-width: 761px)">
<script>document.documentElement.classList.replace('no-js','js')</script>
<style>
{(HERE / 'page.css').read_text()}</style>
</head>
<body>
<header class="top">
  <a class="mark" href="#top">Cheeky Monkey</a>
  <nav class="nav" aria-label="Main">
    <a class="lnk" href="#weeks">Surf weeks</a><a class="lnk" href="#rooms">Rooms</a><a class="lnk" href="#shop">Shop</a>
    <a class="btn btn-book" href="{E(BOOK)}">Check dates</a>
    <a class="icon-btn" href="{TEL}" aria-label="Call {PHONE_SHOWN}">{svg("phone")}</a>
  </nav>
</header>
<div class="bar" aria-hidden="true">
  <a class="mark" href="#top" tabindex="-1">Cheeky Monkey</a>
  <nav class="nav"><a class="lnk" href="#weeks" tabindex="-1">Surf weeks</a><a class="lnk" href="#rooms" tabindex="-1">Rooms</a><a class="lnk" href="#shop" tabindex="-1">Shop</a>
  <a class="btn btn-book" href="{E(BOOK)}" tabindex="-1">Check dates</a></nav>
</div>

<main id="top">
<section class="hero" aria-label="{E(copy["businessName"])}, Midigama">
  <picture>
    <source media="(max-width:760px)" srcset="img/hero-tall-828.webp 828w, img/hero-tall-1200.webp 1200w" sizes="100vw">
    <img src="img/hero-wide-1920.webp" srcset="img/hero-wide-1280.webp 1280w, img/hero-wide-1920.webp 1920w" sizes="100vw" width="1920" height="1344"
      alt="The main road in Midigama seen between two surfboard noses: the Cheeky Monkey signs for rooms, bar and restaurant, the surf shop front, palms and a tuk-tuk" fetchpriority="high">
  </picture>
  <div class="hero-c">
    <h1>{E(copy["copyBlocks"][0]["heading"])}</h1>
    {btn_book()}
    <p class="where">Midigama, Sri Lanka</p>
  </div>
</section>

<section class="sec" id="weeks" aria-labelledby="weeks-h">
  <div class="wrap">
    <div class="lead center intro">{paras("Catch waves, not worries")}</div>
    <h2 class="title center" id="weeks-h">A week of surf</h2>
    <div data-tabs>
      <div class="tabs" role="tablist" aria-label="Surf week packages"><span class="pill" aria-hidden="true"></span>{"".join(tabs)}</div>
      <div class="panels">{"".join(panels)}</div>
    </div>
    <p class="center" style="margin-top:28px"><span class="dated">{E(week[5])}</span></p>
    <div class="incl"><h3>Every week includes</h3><ul class="ic-list">{incl}</ul></div>

    <div class="lessons">
      <h2 class="title sm center">Lessons for your level</h2>
      <div class="lead center"><p>{E(blocks["Lessons for your level"][0])}</p></div>
      <div class="cards">{cards}</div>
      <p class="center"><span class="dated">{E(blocks["Lessons for your level"][1])}</span></p>
    </div>
  </div>
</section>

<section class="sec tint" id="rooms" aria-labelledby="rooms-h">
  <div class="wrap">
    <h2 class="title center" id="rooms-h">The rooms</h2>
    <div class="rooms">{rooms_html}</div>
    {stay}
  </div>
</section>

<section class="sec" id="shop" aria-labelledby="shop-h">
  <div class="wrap">
    <div class="shop">
      <div class="shop-img"><img src="img/sign-1200.webp" srcset="img/sign-700.webp 700w, img/sign-1200.webp 1200w" sizes="(max-width:980px) 100vw, 640px" width="1200" height="1500" loading="lazy" decoding="async"
        alt="Baba's hand-painted roadside sign listing surf shop, lesson, repair, camp, scooters, taxi, every thing, beside a cream tuk-tuk and the Cheeky Monkey signs"></div>
      <div>
        <h2 class="title" id="shop-h">Baba's Surf Shop</h2>
        <div class="body">{paras("Baba's Surf Shop")}</div>
        <ul class="rent">{rent}</ul>
        <p class="brands pipe">{brands}</p>
        <div class="reel" data-reel>
          <img src="video/boards-poster.webp" width="720" height="1280" loading="lazy" decoding="async" alt="New hard boards in bright resin colours standing in the racks of the shop">
          <video muted loop playsinline preload="none" aria-hidden="true">
            <source data-src="video/boards-720.webm" type="video/webm"><source data-src="video/boards-720.mp4" type="video/mp4">
          </video>
          <button class="play" type="button" aria-label="Pause the video">{svg("pause", "i-pause")}{svg("play", "i-play")}</button>
        </div>
      </div>
    </div>
    <div class="trio">
      <div class="zoom"><img src="img/sq-fins.webp" width="720" height="720" loading="lazy" decoding="async" alt="Red, yellow, green and blue fins on a blue shelf in the shop"></div>
      <div class="zoom"><img src="img/sq-rack.webp" width="720" height="720" loading="lazy" decoding="async" alt="A rack of fish and mid-length boards, one with orange flowers"></div>
      <div class="zoom"><img src="img/sq-fish.webp" width="720" height="720" loading="lazy" decoding="async" alt="A lilac and a mint fish board on the stand, more racks behind"></div>
    </div>
  </div>
</section>

<section aria-labelledby="roof-h">
  <div class="band roof">
    <picture><source media="(max-width:760px)" srcset="img/roof-tall-828.webp"><img src="img/roof-wide-1864.webp" width="1864" height="799" loading="lazy" decoding="async" alt="Yoga on the roof at sunset, the sea behind"></picture>
    <p class="line"><span>{E(copy["featureLine"])}</span></p>
  </div>
  <div class="sec" style="padding-top:88px">
    <div class="wrap roof-txt">
      <h2 class="title" id="roof-h">Up on the roof</h2>
      <div class="body lead">{paras("Up on the roof")}</div>
      <p class="amen pipe">{amen}</p>
    </div>
  </div>
</section>

<section class="sec tint" aria-labelledby="baba-h">
  <div class="wrap split">
    <div class="baba-img"><img src="img/baba-900.webp" width="900" height="1125" loading="lazy" decoding="async" alt="Baba in a striped shirt among the boards in his shop"></div>
    <div>
      <h2 class="title" id="baba-h">Three rooms in 2009</h2>
      <div class="body lead" style="margin:0">{paras("Three rooms in 2009")}</div>
      <div class="print"><img src="img/oldfront-720.webp" width="720" height="480" loading="lazy" decoding="async" alt="The earlier shop front, Baba's Surf Shop and Surf School, before the renovation"></div>
    </div>
  </div>
</section>

<section class="sec guests" aria-labelledby="guests-h">
  <div class="wrap">
    <h2 class="title center" id="guests-h">Guests' words</h2>
    <div class="rates">{rates}</div>
    <div class="quotes">{slideshow(quotes, "Guest reviews", arrows=False)}</div>
  </div>
</section>

<section class="sec tint" aria-labelledby="here-h">
  <div class="wrap here">
    <div>
      <h2 class="title sm" id="here-h">Getting here</h2>
      <div class="body">{paras("Getting here")}</div>
      <dl>
        <div><dt>Address</dt><dd>{E(C["address"])}</dd></div>
        <div><dt>The waves</dt><dd>{E(copy["spot"])}</dd></div>
        <div><dt>When to come</dt><dd>{E(copy["season"])}</dd></div>
        <div><dt>Airport transfers</dt><dd class="pipe">{air_line}</dd></div>
      </dl>
      <div class="btns"><a class="btn btn-soft" href="{E(C["mapUrl"])}">{svg("pin")}Open in Google Maps</a></div>
    </div>
    <div>
      <h2 class="title sm">Good to know</h2>
      <div class="body">{paras("Good to know")}</div>
    </div>
  </div>
</section>

<section aria-labelledby="closing-h">
  <div class="band"><picture><source media="(max-width:760px)" srcset="img/closing-tall-828.webp"><img src="img/closing-wide-1920.webp" width="1920" height="823" loading="lazy" decoding="async" alt="A surfer in a Cheeky Monkey vest holds a yellow fish board, facing the shorebreak"></picture></div>
  <div class="closing wrap center">
    <h2 class="title" id="closing-h">{E(copy["closing"])}</h2>
    <div class="btns center">{btn_book()}{btn_call("Call " + PHONE_SHOWN, "btn-line")}{btn_mail("Cheeky Monkey: a question", "Email us", "btn-line")}</div>
  </div>
</section>

<section class="sec" style="padding-top:0" aria-labelledby="ig-h">
  <div class="wrap center">
    <h2 class="title sm" id="ig-h">On Instagram</h2>
    <div class="ig">
      <a href="{E(INSTA)}"><img src="img/ig-146.webp" width="480" height="480" loading="lazy" decoding="async" alt="Boards in the rack, one with orange flowers"></a>
      <a href="{E(INSTA)}"><img src="img/ig-134.webp" width="480" height="480" loading="lazy" decoding="async" alt="A surfer with a pink board at a pink sunset"></a>
      <a href="{E(INSTA)}"><img src="img/ig-108.webp" width="480" height="480" loading="lazy" decoding="async" alt="The fin wall in the shop"></a>
      <a href="{E(INSTA)}"><img src="img/ig-099.webp" width="480" height="480" loading="lazy" decoding="async" alt="The thatched terrace at dusk, the sea beyond"></a>
      <a href="{E(INSTA)}"><img src="img/ig-085.webp" width="480" height="480" loading="lazy" decoding="async" alt="Guests together on the beach"></a>
      <a href="{E(INSTA)}"><img src="img/ig-105.webp" width="480" height="480" loading="lazy" decoding="async" alt="A busy night at the bar"></a>
    </div>
    <a class="btn btn-soft" href="{E(INSTA)}">{svg("insta")}Follow on Instagram</a>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap foot-grid">
    <div><a class="mark" href="#top">Cheeky Monkey</a><address>{E(C["address"])}</address></div>
    <div><h2>Lessons and surf weeks</h2><div class="btns">{btn_call("Call " + PHONE_SHOWN)}{btn_mail("Cheeky Monkey: a question", "Email us")}</div></div>
    <div><h2>Rooms</h2><div class="btns">{btn_book("Rooms on Booking.com")}</div></div>
    <div><h2>Follow</h2><div class="soc"><a href="{E(INSTA)}" aria-label="Instagram">{svg("insta")}</a><a href="{FACEBOOK}" aria-label="Facebook">{svg("fb")}</a></div></div>
  </div>
</footer>

<nav class="pbar" aria-label="Book">
  {btn_book()}
  <a class="btn btn-line" href="{TEL}" aria-label="Call {PHONE_SHOWN}">{svg("phone")}Call</a>
</nav>
<script>
{(HERE / 'page.js').read_text()}</script>
</body>
</html>
'''
(HERE.parent / 'dist/index.html').write_text(page)
print('wrote', HERE.parent / 'dist/index.html', len(page), 'bytes')
