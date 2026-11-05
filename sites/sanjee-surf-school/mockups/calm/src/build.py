#!/usr/bin/env python3
"""Assemble the calm mockup (concept 1, "The sand") into one self-contained dist/index.html.

Words, prices, ratings, reviews and contact come from copy/en.json, read here and never retyped. Strings
written in this file are interface labels the template owns (nav, table heads, "Call", "Email",
"Open in Google Maps"), and the alt texts, written from the photographs themselves.
Media: src/make-media.sh. Wash line: src/trace-wash.py -> src/wash.json. CSS and JS: page.css / page.js, inlined.
Run: bash src/make-media.sh && python3 src/build.py   (from anywhere). --hero builds the first screen only.
"""
import html, json, pathlib, struct, sys, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
DIST = HERE.parent / 'dist'
C = json.loads((ROOT / 'sites/sanjee-surf-school/copy/en.json').read_text())
WASH = json.loads((HERE / 'wash.json').read_text())
FIRST_SCREEN_ONLY = '--hero' in sys.argv
E = html.escape

NAME = C['businessName']
CTA = C['ctas']['primary']
WA_DIGITS = C['contact']['whatsapp'].lstrip('+')
TEL = 'tel:' + C['contact']['phone']
MAILTO = 'mailto:' + C['contact']['email']
MAP = C['contact']['mapUrl']
BLOCKS = {b['heading']: b for b in C['copyBlocks']}
RATING = C['ratings'][0]

# The hero title is the tagline's own first words (concepts §2, the heroLine gap).
HERO_TITLE = 'Surf lessons in Weligama'
assert C['tagline'].startswith(HERO_TITLE)

ALT = {
    'hero': 'A blue bay seen from the sand under a clear sky, with a rust-red headland, palms and tiled roofs on the right',
    'lesson': 'An instructor and a student on the sand, knees bent in pop-up stance on a blue and a red soft-top',
    'band': 'One surfer paddling towards a low aqua wave, seen from behind, with a pale sky above the horizon',
    'sanjee': 'Sanjee smiling as he walks out of the shallows with a surfboard under his arm, a rust-coloured cliff behind him',
    'beach': 'An empty sand beach with wooden posts in the foreground, white water breaking on the left and palms running down the coast under a deep blue sky',
    'wave': 'A surfer turning across a green wave with white water breaking behind',
    'sand': 'Footprints on wet gold sand beside a line of foam, with bare stilt poles standing in the shallows and birds perched on them',
}


def webp_size(path):
    b = path.read_bytes()
    assert b[:4] == b'RIFF' and b[8:12] == b'WEBP', path
    kind = b[12:16]
    if kind == b'VP8X':
        return 1 + int.from_bytes(b[24:27], 'little'), 1 + int.from_bytes(b[27:30], 'little')
    if kind == b'VP8 ':
        w, h = struct.unpack('<HH', b[26:30])
        return w & 0x3FFF, h & 0x3FFF
    if kind == b'VP8L':
        n = int.from_bytes(b[21:25], 'little')
        return (n & 0x3FFF) + 1, ((n >> 14) & 0x3FFF) + 1
    raise ValueError(path)


def src(name): return f'img/{name}.webp'
def wh(name): return webp_size(DIST / src(name))
def srcset(names): return ', '.join(f'{src(n)} {wh(n)[0]}w' for n in names)


def wa(about=None):
    """A real wa.me link. The prefill names the business and whatever was chosen (concepts §3)."""
    what = about or 'surf lessons'
    text = f"Hello {NAME}, I'd like to ask about {what}."
    return f'https://wa.me/{WA_DIGITS}?text=' + urllib.parse.quote(text)


ICON = {
    'wa': '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.3 21.8l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 1.9a7.9 7.9 0 1 1-4.3 14.6l-.3-.2-2.5.7.7-2.4-.2-.3A7.9 7.9 0 0 1 12 4.1ZM8.9 7.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.3s1 2.7 1.1 2.8c.2.2 2 3 4.8 4.2 2.3.9 2.8.7 3.3.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.6-.5h-.6Z"/></svg>',
    'phone': '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 3.2c.5-.2 1 0 1.3.5l1.7 3c.2.4.2.9-.2 1.2L8 9.3a12 12 0 0 0 6.7 6.7l1.4-1.4c.3-.4.8-.4 1.2-.2l3 1.7c.5.3.7.8.5 1.3l-.8 2.3c-.2.6-.8 1-1.4 1A16.6 16.6 0 0 1 3 5.4c0-.6.4-1.2 1-1.4l2.6-.8Z"/></svg>',
    'mail': '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm.4 2 7.6 5.6L19.6 7H4.4ZM20 8.8l-7.4 5.4a1 1 0 0 1-1.2 0L4 8.8V17h16V8.8Z"/></svg>',
    'pin': '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.2 11.6 6.9 12.2.3.4.9.4 1.2 0 .7-.6 6.9-6.9 6.9-12.2A7.5 7.5 0 0 0 12 2Zm0 10.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z"/></svg>',
    'menu': '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path class="m1" fill="currentColor" d="M3 7h18v2H3z"/><path class="m2" fill="currentColor" d="M3 15h18v2H3z"/></svg>',
}


def book(about=None, cls='', label=None):
    aria = f' aria-label="{E(CTA)} about {E(about)}"' if about else ''
    return f'<a class="btn btn-wa {cls}" href="{E(wa(about))}"{aria}>{ICON["wa"]}<span>{E(label or CTA)}</span></a>'


NAV = [('lessons', 'Lessons'), ('boards', 'Boards'), ('sanjee', 'Sanjee'), ('waves', 'Waves'), ('tuktuk', 'Tuk-tuk'), ('finding', 'Finding us')]
nav_links = ''.join(f'<a href="#{i}">{E(t)}</a>' for i, t in NAV)

header = f"""
<header class="top" id="top">
  <a class="mark" href="#top">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections">{nav_links}</nav>
  {book(cls='btn-sm top-book')}
  <details class="menu">
    <summary aria-label="Menu">{ICON['menu']}</summary>
    <nav class="menu-panel" aria-label="Sections, phone">{nav_links}</nav>
  </details>
</header>"""

hero = f"""
<section class="hero" aria-label="{E(NAME)}">
  <picture>
    <source media="(max-width: 767px)" srcset="{src('hero-m')}" width="{wh('hero-m')[0]}" height="{wh('hero-m')[1]}">
    <img class="hero-img" src="{src('hero-1400')}" srcset="{srcset(['hero-1400', 'hero-2000'])}" sizes="100vw"
      width="{wh('hero-2000')[0]}" height="{wh('hero-2000')[1]}" alt="{E(ALT['hero'])}" fetchpriority="high">
  </picture>
  <div class="hero-words">
    <h1>{E(HERO_TITLE)}</h1>
    {book(cls='hero-book')}
  </div>
  <svg class="wash film" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true"><path d="{WASH['line']}V140H0Z"/></svg>
  <svg class="wash" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true"><path d="{WASH['line']}V140H0Z"/></svg>
</section>"""

bar = f"""
<div class="bar" id="bar">
  {book(cls='bar-book')}
  <a class="btn btn-soft btn-icon" href="{TEL}" aria-label="Call">{ICON['phone']}</a>
</div>"""


def page(main):
    css = (HERE / 'page.css').read_text()
    js = (HERE / 'page.js').read_text()
    fonts = 'https://fonts.googleapis.com/css2?family=Mr+Dafoe&family=Source+Sans+3:wght@400;600&display=swap'
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(NAME)} | {E(HERO_TITLE)}</title>
<meta name="description" content="{E(C['tagline'])}">
<meta name="theme-color" content="#FFFFFF">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{fonts}">
<link rel="preload" as="image" href="{src('hero-m')}" media="(max-width: 767px)">
<link rel="preload" as="image" imagesrcset="{srcset(['hero-1400', 'hero-2000'])}" imagesizes="100vw" media="(min-width: 768px)">
<script>document.documentElement.classList.add('js')</script>
<style>
{css}</style>
</head>
<body>
{main}
<script>
{js}</script>
</body>
</html>
"""


def paras(block, only=None):
    ps = BLOCKS[block]['body'].split('\n\n')
    picked = ps if only is None else [ps[i] for i in only]
    return ''.join(f'<p>{E(p)}</p>' for p in picked)


def pipe(items):
    """Compact details: the " | " is drawn in CSS, and one that would start a wrapped line is clipped (page.css)."""
    return '<p class="pl">' + ''.join(f'<span class="pi">{E(i)}</span>' for i in items) + '</p>'


def print_img(name, alt, cls=''):
    w, h = wh(name)
    return f'<div class="print {cls}"><img src="{src(name)}" width="{w}" height="{h}" alt="{E(alt)}" loading="lazy" decoding="async"></div>'


def usd(n): return f'USD {n}'


UNIT = {'per_lesson': 'per lesson', 'per_day': 'per day', 'flat': ''}
LEVEL = {'first_time': 'Total beginner', 'beginner': 'beginner', 'intermediate': 'intermediate', 'advanced': 'advanced'}
LANG = {'en': 'English', 'si': 'Sinhala'}


def hours(mins):
    assert mins % 60 == 0
    return f'{mins // 60} hours'


def level_words(levels):
    words = [LEVEL[x] for x in levels]
    return (words[0][0].upper() + words[0][1:] + ''.join(', ' + w for w in words[1:]))


def lesson_row(L):
    details = []
    if L['label'] == 'Week Intensive':      # level is null, so no level words; sessions and length together (concepts §3)
        assert L['level'] is None
        details = [L['groupSize'], hours(L['durationMin'])]
        extra = paras('Lessons', [1])
    else:
        details = [level_words(L['level']), hours(L['durationMin'])]
        if L['groupSize']:                  # Private Coaching only: the Beginner Lesson's is null and prints nothing (N7)
            details.append(L['groupSize'])
        extra = ''
    unit = UNIT[L['unit']]
    unit_html = f'<span class="unit">{E(unit)}</span>' if unit else ''
    return f"""
    <li class="row">
      <div class="row-text">
        <h3>{E(L['label'])}</h3>
        {pipe(details)}
        <p class="inc">{E(L['includes'])}</p>
        {f'<div class="row-more">{extra}</div>' if extra else ''}
      </div>
      <div class="row-buy">
        <p class="price">{usd(L['price'])}{unit_html}</p>
        {book(about=L['label'] if L['label'] == 'Private Coaching' else 'the ' + L['label'])}
      </div>
    </li>"""


def rating(tag='p', cls=''):
    date = '5 November 2026'
    assert RATING['capturedAt'] == '2026-11-05' and RATING['platform'] == 'google'
    return f"""<{tag} class="rate {cls}"><a href="{E(RATING['url'])}" rel="noopener"><span class="rate-score">{RATING['score']}/{RATING['scale']}</span> <span class="rate-words"><span>{RATING['count']} Google reviews</span> <span class="rate-date">{date}</span></span></a></{tag}>"""


# ---- rentals: the copy keeps kind and duration in one label; split here for the table (concepts §6, schema gap)
durations, table = [], {}
for r in C['rentals']:
    if ', ' not in r['label']:
        continue
    kind, dur = r['label'].split(', ', 1)
    assert kind in ('Soft-top', 'Hardboard')
    if dur not in table:
        durations.append(dur); table[dur] = {'note': r['note']}
    assert table[dur]['note'] == r['note']
    table[dur][kind] = r['price']
rate_rows = ''.join(
    f'<tr role="row"><th role="rowheader" scope="row">{E(d)}</th><td role="cell">{usd(table[d]["Soft-top"])}</td><td role="cell">{usd(table[d]["Hardboard"])}</td><td role="cell" class="note">{E(table[d]["note"] or "")}</td></tr>'
    for d in durations)
body_row = next(r for r in C['rentals'] if r['label'] == 'Bodyboard')
tours = C['priceList'][:12]
to_buy = C['priceList'][12:]
assert all('to buy' in r['label'] for r in to_buy) and len(tours) == 12 and not any('to buy' in r['label'] for r in tours)
extras = [(body_row['label'], usd(body_row['price']) + ' ' + UNIT[body_row['unit']])] + [(r['label'], usd(r['price'])) for r in to_buy]
extra_rows = ''.join(f'<li><span>{E(a)}</span><span class="extra-price">{E(b)}</span></li>' for a, b in extras)


def tour_row(t):
    name = t['label'].split(' (')[0]
    return f"""
    <li class="tour">
      <div class="tour-text"><h3>{E(t['label'])}</h3><p>{E(t['note'])}</p></div>
      <p class="tour-price">{usd(t['price'])}</p>
      <a class="btn btn-wa btn-round" href="{E(wa('the ' + name + ' tour'))}" aria-label="{E(CTA)} about the {E(name)} tour">{ICON['wa']}</a>
    </li>"""


quotes = ''.join(f"""
      <figure class="slide" role="group" aria-roledescription="slide" aria-label="{i + 1} of {len(C['testimonials'])}">
        <blockquote lang="{t['lang']}">{E(t['quote'])}</blockquote>
        <figcaption>{E(t['author'])} <span class="src">| Google</span></figcaption>
      </figure>""" for i, t in enumerate(C['testimonials']))
assert all(t['source'] == 'google' for t in C['testimonials'])

creds = [f"{c['label']}, {c['issuer']}" for c in C['credentials']] + [LANG[x] for x in C['languagesSpoken']]
spot_first, spot_rest = C['spot'].split('. ', 1)
waves = BLOCKS['Other waves, as we rate them']['body'].split('\n\n')
assert len(waves) == 3


def contact_buttons(long=False):
    call = f"Call {C['contact']['phone']}" if long else 'Call'
    mail = f"Email {C['contact']['email']}" if long else 'Email'
    return f"""{book()}
      <a class="btn btn-soft" href="{TEL}">{ICON['phone']}<span>{E(call)}</span></a>
      <a class="btn btn-soft" href="{MAILTO}">{ICON['mail']}<span>{E(mail)}</span></a>"""


body = f"""
<section class="sec shallows" id="who">
  <div class="split s75 wrap-wide">
    <div class="split-text">
      <p class="lead">{E(C['tagline'])}</p>
      <h2>{E(C['copyBlocks'][0]['heading'])}</h2>
      {paras('Who we teach')}
    </div>
    {print_img('lesson', ALT['lesson'])}
  </div>
</section>

<section class="sec lessons" id="lessons">
  <div class="wrap-wide measure">
    <h2>Lessons</h2>
    {paras('Lessons', [0])}
  </div>
  <ul class="rows wrap-wide">{''.join(lesson_row(L) for L in C['lessons'])}
  </ul>
  <div class="wrap-wide after-rows">
    {paras('Lessons', [2])}
    <div class="decide">
      <div class="d-rate">{rating()}</div>
      <div class="d-before">
        <h2>Before you book</h2>
        {paras('Before you book')}
      </div>
      <div class="d-buy">{book()}</div>
    </div>
  </div>
</section>

<section class="band" aria-label="{E(C['featureLine'])}">
  <picture>
    <source media="(max-width: 767px)" srcset="{src('band-m')}" width="{wh('band-m')[0]}" height="{wh('band-m')[1]}">
    <img src="{src('band-1600')}" width="{wh('band-1600')[0]}" height="{wh('band-1600')[1]}" alt="{E(ALT['band'])}" loading="lazy" decoding="async">
  </picture>
  <p class="feature">{E(C['featureLine'])}</p>
</section>

<section class="sec boards" id="boards">
  <div class="split s57 wrap-wide">
    <div class="split-text">
      <h2>Board rental</h2>
      {paras('Board rental')}
    </div>
    <div class="rates">
      <table role="table">
        <thead><tr role="row"><th role="columnheader" scope="col">Duration</th><th role="columnheader" scope="col">Soft-top</th><th role="columnheader" scope="col">Hardboard</th><th role="columnheader" scope="col" class="note"><span class="vh">Note</span></th></tr></thead>
        <tbody>{rate_rows}</tbody>
      </table>
      <ul class="extras">{extra_rows}</ul>
      {book(about='board rental', cls='block-book')}
    </div>
  </div>
</section>

<section class="sec sanjee" id="sanjee">
  <div class="split s57 wrap-wide">
    {print_img('sanjee', ALT['sanjee'], 'print-sanjee')}
    <div class="split-text">
      <h2>{E(C['copyBlocks'][1]['heading'])}</h2>
      <div class="said">{paras('Sanjee, head instructor')}</div>
      {pipe(creds)}
    </div>
  </div>
</section>

<section class="sec guests" id="guests">
  {rating('h2', 'rate-head')}
  <div class="show wrap-read" role="region" aria-roledescription="carousel" aria-label="Reviews on Google">
    <div class="track" tabindex="0">{quotes}
    </div>
    <div class="dots" role="group" aria-label="Choose a review"></div>
  </div>
</section>

<section class="sec outside" id="waves">
  <div class="split s75 wrap-wide">
    <div class="split-text">
      <h2>{E(spot_first)}.</h2>
      <p>{E(spot_rest)}</p>
      <p>{E(C['season'])}</p>
    </div>
    {print_img('beach', ALT['beach'])}
  </div>
  <div class="ladder wrap-wide">
    <h2>{E(C['copyBlocks'][6]['heading'])}</h2>
    <p class="w1">{E(waves[0])}</p>
    <p class="w2">{E(waves[1])}</p>
    {print_img('wave', ALT['wave'], 'w-print')}
    <p class="w3">{E(waves[2])}</p>
  </div>
</section>

<section class="sec coast" id="tuktuk">
  <div class="wrap-wide measure">
    <h2>By tuk-tuk</h2>
    {paras('By tuk-tuk')}
  </div>
  <ul class="tours wrap-wide">{''.join(tour_row(t) for t in tours)}
  </ul>
</section>

<section class="closing" id="finding">
  <div class="closing-text">
    <h2>Finding us</h2>
    {paras('Finding us')}
    <p class="addr">{E(C['contact']['address'])}</p>
    <a class="btn btn-soft" href="{E(MAP)}" rel="noopener">{ICON['pin']}<span>Open in Google Maps</span></a>
    <p class="close-line">{E(C['closing'])}</p>
    <div class="actions" id="book">{contact_buttons()}</div>
  </div>
  <div class="closing-pic">
    <picture>
      <source media="(max-width: 767px)" srcset="{src('sand-m')}" width="{wh('sand-m')[0]}" height="{wh('sand-m')[1]}">
      <img src="{src('sand-d')}" width="{wh('sand-d')[0]}" height="{wh('sand-d')[1]}" alt="{E(ALT['sand'])}" loading="lazy" decoding="async">
    </picture>
  </div>
</section>
</main>

<footer class="foot">
  <svg class="tide film" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true"><path d="{WASH['line']}V140H0Z"/></svg>
  <svg class="tide" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true"><path d="{WASH['line']}V140H0Z"/></svg>
  <p class="foot-name">{E(NAME)}</p>
  <div class="actions">{contact_buttons(long=True)}</div>
  <p class="foot-addr">{E(C['contact']['address'])}</p>
</footer>"""

if FIRST_SCREEN_ONLY:
    out = page(header + '<main>' + hero + '</main>' + bar)
else:
    out = page(header + '<main>' + hero + body + bar)

(DIST / 'index.html').write_text(out)
print('wrote', DIST / 'index.html', len(out.encode()), 'bytes')
