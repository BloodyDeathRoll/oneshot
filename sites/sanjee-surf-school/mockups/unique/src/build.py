#!/usr/bin/env python3
"""Assemble the unique mockup (concept 3, "The set") into dist/index.html.

Every word on the page comes from copy/en.json; nothing is retyped. Strings written here are interface
labels the template owns (menu, tile labels, "Soft-top", "Call", "Open in Google Maps"). Media: src/make-media.sh.
CSS / JS: page.css, page.js (inlined).
Run: python3 sites/sanjee-surf-school/mockups/unique/src/build.py
"""
import base64, datetime, html, json, pathlib, struct, subprocess, tempfile, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
DIST = HERE.parent / 'dist'
C = json.loads((SITE / 'copy' / 'en.json').read_text())

def E(s): return html.escape(str(s), quote=True)

def webp_size(name):
    b = (DIST / 'img' / f'{name}.webp').read_bytes()
    assert b[:4] == b'RIFF' and b[8:12] == b'WEBP', name
    k = b[12:16]
    if k == b'VP8X': return 1 + int.from_bytes(b[24:27], 'little'), 1 + int.from_bytes(b[27:30], 'little')
    if k == b'VP8 ': w, h = struct.unpack('<HH', b[26:30]); return w & 0x3fff, h & 0x3fff
    if k == b'VP8L':
        v = int.from_bytes(b[21:25], 'little'); return (v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1
    raise ValueError(name)

# ---------------------------------------------------------------- facts from the copy
NAME = C['businessName']
HERO = 'Surf lessons in Weligama'                       # the tagline's own first words (concepts.md §2)
assert C['tagline'].startswith(HERO)
CTA = C['ctas']['primary']
R = C['ratings'][0]
assert R['platform'] == 'google'
d = datetime.date.fromisoformat(R['capturedAt'])
R_DATE = f'{d.day} {d:%B %Y}'
R_SCORE = f"{R['score']}/{R['scale']}"
R_COUNT = f"{R['count']} Google reviews"
R_ASOF = f'as of {R_DATE}'                               # marks the capture date (critic r1)
R_LINE = f'{R_SCORE}, {R_COUNT}, {R_ASOF}'
WA_DIGITS = C['contact']['whatsapp'].lstrip('+')        # copied from the passed copy, never retyped

def wa(text):
    return f'https://wa.me/{WA_DIGITS}?text=' + urllib.parse.quote(text)

HELLO = f'Hello {NAME}, '
WA_GENERAL = wa(HELLO + "I'd like to ask about a surf lesson.")

ICON_WA = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.3 20.8l4.3-1.1A8.8 8.8 0 1 0 12 3.2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.9 7.9c-.3 0-.7.2-.9.6-.5.8-.5 1.900.2 3.100a9 9 0 0 0 3.800 3.500c1.300.6 2.300.5 3-.1.400-.4.500-.8.500-1.100 0-.2-.1-.3-.3-.4l-1.500-.7c-.2-.1-.4 0-.5.100l-.6.700c-.1.200-.3.200-.5.100a6 6 0 0 1-2.700-2.400c-.1-.2-.1-.3 0-.5l.5-.6c.1-.2.100-.3 0-.5l-.6-1.500c-.1-.2-.2-.3-.4-.3Z" fill="currentColor"/></svg>'

def btn(href, label, cls='btn', extra=''):
    return f'<a class="{cls}" href="{E(href)}"{extra}><span class="btn-t">{label}</span></a>'

def print_img(cls, widths, sizes, alt, fetch=''):
    """A floating print. widths: list of (file, intrinsic width)."""
    w, h = webp_size(widths[-1][0])
    srcset = ', '.join(f'img/{f}.webp {iw}w' for f, iw in widths)
    extra = f' fetchpriority="{fetch}"' if fetch else ''
    return f'<img class="print {cls}" src="img/{widths[-1][0]}.webp" srcset="{srcset}" sizes="{sizes}" width="{w}" height="{h}" alt="{E(alt)}" data-print decoding="async" style="background-image:url({lqip(widths[0][0])})"{extra}>'

def lqip(name):
    """A tiny blurred placeholder of a picture, inlined, so nothing is ever a blank box on a slow load."""
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(DIST / 'img' / f'{name}.webp'), '-vf', 'scale=20:-2', f'{t}/x.png'], check=True)
        subprocess.run(['cwebp', '-quiet', '-q', '28', f'{t}/x.png', '-o', f'{t}/x.webp'], check=True)
        return 'data:image/webp;base64,' + base64.b64encode(pathlib.Path(f'{t}/x.webp').read_bytes()).decode()

# ---------------------------------------------------------------- header + first screen
NAV = [('Lessons', '#lessons'), ('Boards', '#boards'), ('Sanjee', '#sanjee'), ('Waves', '#waves'), ('Tuk-tuk', '#tuktuk'), ('Finding us', '#finding')]
nav_links = ''.join(f'<a href="{h}">{E(t)}</a>' for t, h in NAV)

header = f'''<header class="top">
 <a class="brand" href="#top">{E(NAME)}</a>
 <nav class="nav" aria-label="Page">{nav_links}</nav>
 <details class="menu">
  <summary><span>Menu</span></summary>
  <nav aria-label="Page, phone">{nav_links}</nav>
 </details>
</header>'''

GW, GH = webp_size('ground-img-002-2000')
PW, PH = webp_size('ground-img-002-phone')
LQ_D, LQ_P = lqip('ground-img-002-1440'), lqip('ground-img-002-phone')
hero = f'''<style>.hero:not(.loaded){{background-image:url({LQ_D})}}@media (max-width:759px){{.hero:not(.loaded){{background-image:url({LQ_P})}}}}</style>
<section class="hero" id="top">
 <picture>
  <source media="(max-width: 759px)" srcset="img/ground-img-002-phone.webp" width="{PW}" height="{PH}">
  <img class="ground" src="img/ground-img-002-2000.webp" srcset="img/ground-img-002-1440.webp 1440w, img/ground-img-002-2000.webp 2000w" sizes="100vw" width="{GW}" height="{GH}" alt="A bright blue sky over a blue bay, with a rust-red headland, palms and tiled roofs on the right and pale sand along the bottom." decoding="async">
 </picture>
 <div class="hero-words">
  <h1>{E(HERO)}</h1>
  <div class="hero-act">
   {btn(WA_GENERAL, E(CTA), 'btn btn-hero', ' id="hero-cta"')}
   <a class="rate-line" href="{E(R['url'])}" rel="noopener">{E(R_LINE)}</a>
  </div>
 </div>
 <div class="set" id="set">
  <canvas id="swell" aria-hidden="true"></canvas>
  {print_img('p-006', [('set-img-006', 760)], '(max-width: 759px) 32vw, 308px', 'A surfer in a dark top turning a white board on a green wave, with white water breaking behind.')}
  {print_img('p-007', [('set-img-007-640', 640), ('set-img-007-962', 962)], '(max-width: 759px) min(94vw, 560px), 640px', 'Sanjee seen from behind, crouched low and carving a green wave on a yellow board with a pink rail, spray flying from the turn.', fetch='high')}
 </div>
</section>'''

BODY = ''
BODY_FILE = HERE / 'body.py'
if BODY_FILE.exists():
    ns = dict(globals())
    exec(compile(BODY_FILE.read_text(), str(BODY_FILE), 'exec'), ns)
    BODY = ns['BODY']

# The preview host by the run's naming (<slug>.os1.workers.dev), until a real one exists. Not img-007: it carries the open rights flag.
OG_IMAGE = 'https://' + C['slug'] + '.os1.workers.dev/img/og-img-002.jpg'
CSS = (HERE / 'page.css').read_text()
JS = (HERE / 'page.js').read_text()

doc = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(NAME)} | {E(HERO)}</title>
<meta name="description" content="{E(C['tagline'])}">
<meta name="theme-color" content="#ffffff">
<meta property="og:title" content="{E(NAME)}">
<meta property="og:description" content="{E(C['tagline'])}">
<meta property="og:image" content="{OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/shrikhand/v17/a8IbNovtLWfR7T7bMJwrA4KR8TtctQ.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/figtree/v9/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2">
<link rel="preload" as="image" fetchpriority="high" imagesrcset="img/set-img-007-640.webp 640w, img/set-img-007-962.webp 962w" imagesizes="(max-width: 759px) min(94vw, 560px), 640px">
<script>document.documentElement.classList.add('js')</script>
<style>{CSS}</style>
</head>
<body>
<a class="skip" href="#lessons">Skip to lessons</a>
{header}
<main>
{hero}
{BODY}
</main>
<script>{JS}</script>
</body>
</html>
'''
DIST.mkdir(parents=True, exist_ok=True)
(DIST / 'index.html').write_text(doc)
print('wrote', DIST / 'index.html', len(doc), 'bytes')
