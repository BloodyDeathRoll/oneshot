#!/usr/bin/env python3
"""Builds the "Postcard" mockup pages (dist/index.html, dist/book/index.html) from the audited copy.

All words come from sites/global-surf-adventures/copy/en.json (incl. mockup_extras); interface
labels that the copy does not carry are marked TEMPLATE-LABEL below and listed in notes.md.
Run from the repo root:  python3 sites/global-surf-adventures/mockups/postcard/build.py
"""
import json, html, re, os, urllib.parse

ROOT = os.getcwd()
HERE = os.path.join(ROOT, 'sites/global-surf-adventures/mockups/postcard')
DIST = os.path.join(HERE, 'dist')
C = json.load(open(os.path.join(ROOT, 'sites/global-surf-adventures/copy/en.json')))
X = C['mockup_extras']
e = html.escape

# ---------------------------------------------------------------- facts / links (copied, not retyped)
BL = {b['label']: b['url'] for b in C['bookingLinks']}
WA_URL = BL['Ask on WhatsApp']                       # wa.me/972523593240 + prefill (copy)
WA_NUM = WA_URL.split('wa.me/')[1].split('?')[0]
def wa(text):
    return f'https://wa.me/{WA_NUM}?text=' + urllib.parse.quote(text)
WA_FREE = wa('Hi Global Surf Lodge Kabalana, I would like to ask about dates for the Freestylers – B&B only package.')
TEL = C['contact']['phone']
MAIL = C['contact']['email']
MAP = C['contact']['mapUrl']
ENGINE = 'https://globalsurfadventures.bookinglayer.com/en/product/'
IG = X['instagram']
SOC = X['socials']
TERMS = 'https://www.globalsurf.com/terms-conditions/'
ROSA_SPOT, ROSA_NAME = 'south-point', 'South Point'

LEVELS = [
    dict(slug='level-1-fomies', key='level_1', name=C['lessons'][0]['label'], one=X['levels'][0]['one_liner'],
         cta=X['ctas']['level_1'], vid='vid-010', id='877aef3d-86ed-4b60-8932-03e49c613af8',
         alt='A woman stands up on a soft-top in the evening sun'),
    dict(slug='level-2-rollers', key='level_2', name=C['lessons'][1]['label'], one=X['levels'][1]['one_liner'],
         cta=X['ctas']['level_2'], vid='vid-003e', id='4b58b491-24fc-4fb8-a40d-2705df961db4',
         alt='A surfer in a blue rash vest turns on a reef wave'),
    dict(slug='level-3-riders', key='level_3', name=C['lessons'][2]['label'], one=X['levels'][2]['one_liner'],
         cta=X['ctas']['level_3'], vid='vid-002e', id='54ec3447-2efb-4677-8685-f272e00d32e8',
         alt='A surfer rides deep in a green right-hand barrel'),
]
FREE = dict(name=C['lessons'][3]['label'], one=X['levels'][3]['one_liner'])
PRICE_LINE = X['detail_lines']['level_price']            # From $1,466 pp | 7 nights

ALT = {
    'img-063': 'The dorm: single beds under a timber loft with a ladder',
    'img-078': 'The dorm loft and single beds, seen from the door',
    'img-095': 'Two single beds side by side under a sloping white roof',
    'img-042': 'Single beds on a timber floor under a white roof',
    'img-050': 'A room terrace with a hanging chair and glass doors',
    'img-064': 'Open-air bathroom with a palm tree growing through it',
    'img-080': 'Twin room with two beds, rattan lamps and glass doors to the garden',
    'img-084': 'Twin room with a rattan pendant lamp',
    'img-083': 'Towels, a surf book and a plant on a timber shelf',
    'img-069': 'Private bathroom with a glass shower',
    'img-079': 'Bathroom with a concrete wall, glass shower and plants',
    'img-081': 'Double room with a large white bed and garden doors',
    'img-082': 'Double room with a white bed, rattan lamp and a hammock outside',
    'img-041': 'Double room with coral cushions and a woven pouf',
    'img-043': 'Double room with a lime wall, bed and daybed',
    'img-044': 'Daybed with cushions under framed surf prints',
    'img-071': 'Two framed black-and-white wave photographs',
    'img-104': 'A group walks along the beach carrying surfboards',
    'img-011': 'A breakfast bowl of fruit, banana and granola',
    'img-111': 'A surfer on a longboard at sunset',
    'img-023': 'Guests raise their glasses at a shared table by the pool',
    'img-114': 'A surf theory class sitting in a circle on the sand',
    'img-060': 'The pool, lounge and garden from above',
    'img-115': 'A surf coach explains how a wave breaks at the chalkboard',
    'img-001': 'A guest on a daybed by the pool in front of a white bungalow',
    'img-016': 'A guest flips her wet hair out of the pool in an arc of spray',
    'img-077': 'Red cushions and a timber table on the pool terrace',
    'img-026': 'The pool from straight above, with a palm and surfboards',
    'img-061': 'Beanbags on the timber deck by the pool',
    'img-075': 'White beanbags on the deck under the lounge roof',
    'img-072': 'The roadside sign: Globalsurf Lodge Kabalana',
    'img-118': 'A woman carries a surfboard on her head by the railway line',
    'img-024': 'A pineapple floating in the pool',
    'img-005': 'The pool at water level, with the open lounge behind',
    'img-093': 'The pool and lounge at dusk with the lights on',
}

def pic(pre, id, alt, widths, jpg, sizes='100vw', eager=False, tag='', cls='', w=None, h=None):
    src = ', '.join(f'{pre}img/{id}{tag}-{x}.webp {x}w' for x in widths)
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    wh = f' width="{w}" height="{h}"' if w else ''
    c = f' class="{cls}"' if cls else ''
    return (f'<picture><source type="image/webp" srcset="{src}" sizes="{sizes}">'
            f'<img{c} src="{pre}img/{id}{tag}-{jpg}.jpg"{wh} alt="{e(alt)}" {load} decoding="async"></picture>')

def slide_pic(pre, id, sizes, eager=False):
    wj = 1200 if id != 'img-095' else 1200
    return pic(pre, id, ALT[id], [800, 1600] if id != 'img-095' else [800, 1400], 1200, sizes, eager, w=1200, h=800)

def slideshow(pre, ids, label, sizes, cls=''):
    slides = ''.join(f'<div class="slide" role="group" aria-roledescription="slide" aria-label="{i+1} of {len(ids)}">{slide_pic(pre, x, sizes)}</div>' for i, x in enumerate(ids))
    return (f'<div class="show {cls}" data-show aria-roledescription="carousel" aria-label="{e(label)}">'
            f'<div class="show-frame"><div class="show-track" tabindex="0">{slides}</div>'
            f'<button class="arrow prev" type="button" aria-label="Previous photo"><svg><use href="#i-left"/></svg></button>'
            f'<button class="arrow next" type="button" aria-label="Next photo"><svg><use href="#i-right"/></svg></button></div>'
            f'<div class="dots" role="group" aria-label="Choose a photo"></div></div>')

def detail(s):
    return '<span class="sep">|</span>'.join(e(p.strip()) for p in s.split('|'))

def icon(n, cls=''):
    return f'<svg class="{cls}" aria-hidden="true"><use href="#i-{n}"/></svg>'

# ---------------------------------------------------------------- icons + logo
logo_paths = open(os.path.join(HERE, 'logo-paths.txt')).read()
SPRITE = f'''<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="logo" viewBox="0 0 128 39"><g fill="currentColor" fill-rule="evenodd">{logo_paths}</g></symbol>
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
<symbol id="i-bed" viewBox="0 0 24 24"><path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 15h18M6 9V6.5A1.5 1.5 0 0 1 7.5 5h3A1.5 1.5 0 0 1 12 6.5V9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-bowl" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18a9 9 0 0 1-18 0zM9 19.5 8.5 21h7l-.5-1.5"/><path d="M9 3c-1 1.3 1 2.2 0 3.5M13 3c-1 1.3 1 2.2 0 3.5"/></g></symbol>
<symbol id="i-plate" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="13" cy="12" r="7.5"/><circle cx="13" cy="12" r="4"/><path d="M3 4v5.5M3 12v8M1.8 4v4a1.2 1.2 0 0 0 2.4 0V4"/></g></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></g></symbol>
<symbol id="i-book" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/></g></symbol>
<symbol id="i-board" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5.2 18.8C3 16.6 6 10.8 10.4 6.4S19.6.9 20.9 3.1c1.3 2.2-2 8-6.4 12.4s-7.1 5.5-9.3 3.3z"/><path d="M6.5 17.5 18.5 5.5"/></g></symbol>
<symbol id="i-van" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 16.5V7a1 1 0 0 1 1-1H14v10.5M14 9.5h3.6l3.4 3.6v3.4h-1.8M9 16.5h6.5M2.5 16.5h1.8"/><circle cx="6.6" cy="17" r="1.9"/><circle cx="17" cy="17" r="1.9"/></g></symbol>
<symbol id="i-map" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 4 3 6.2v13.6L9 17.6l6 2.2 6-2.2V4.2L15 6.4 9 4zM9 4v13.6M15 6.4V20"/></g></symbol>
<symbol id="i-water" viewBox="0 0 24 24"><path d="M12 3s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
<symbol id="i-cup" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h12v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.8a2.2 2.2 0 0 1 0 4.4H16M3 21h14"/><path d="M8 3.5c-.8 1 .8 1.8 0 3M12 3.5c-.8 1 .8 1.8 0 3"/></g></symbol>
<symbol id="i-left" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-right" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
<symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.6 4.4-2.1 1.3a11.5 11.5 0 0 0 5.8 5.8l1.3-2.1 4.4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></g></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-6.4-7-11.8a7 7 0 0 1 14 0C19 14.6 12 21 12 21z" stroke-linejoin="round"/><circle cx="12" cy="9.3" r="2.5"/></g></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5.2"/><circle cx="12" cy="12" r="4.1"/></g><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/></symbol>
<symbol id="i-yt" viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/></symbol>
<symbol id="i-fb" viewBox="0 0 24 24"><path d="M13.5 21v-7.5h2.7l.4-3.2h-3.1V8.4c0-.9.3-1.6 1.6-1.6h1.6V4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2.3H7.6v3.2h2.7V21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M12 2.6a9.3 9.3 0 0 0-8 14.1L2.7 21.4l4.8-1.3A9.3 9.3 0 1 0 12 2.6zm0 1.7a7.6 7.6 0 1 1-3.9 14.1l-.3-.2-2.8.8.8-2.7-.2-.3A7.6 7.6 0 0 1 12 4.3zM8.8 7.4c-.2 0-.5 0-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.5 2.6 1 3.1.8 3.7.8.6-.1 1.8-.8 2-1.5.3-.7.3-1.4.2-1.5 0-.1-.3-.2-.6-.4l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6z" fill="currentColor" stroke="none"/></symbol>
</g></svg>'''

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">')

def head(pre, title, desc, extra=''):
    return f'''<!doctype html>
<html lang="en" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(title)}</title><meta name="description" content="{e(desc)}">
<script>document.documentElement.classList.replace('no-js','js')</script>
{FONTS}<link rel="stylesheet" href="{pre}site.css">{extra}</head>'''

NAV = [('Levels', '#levels'), ('Rooms', '#rooms'), ('The lodge', '#welcome'), ('Contact', '#contact')]  # TEMPLATE-LABEL (concepts.md §0)

def header(pre, home):
    h = '' if home else '../'
    links = ''.join(f'<a href="{h}{u}">{e(t)}</a>' for t, u in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="hdr" id="hdr"><div class="wrap">
<a class="logo" href="{h}./" aria-label="{e(X['logo']['home_link_label'])}"><svg viewBox="0 0 128 39" role="img" aria-label="{e(X['logo']['alt'])}"><use href="#logo"/></svg></a>
<nav class="nav" aria-label="Main">{links}</nav>
<a class="btn btn-book hdr-book" href="{pre}book/">{e(X['ctas']['header_and_bar'])}</a>
<button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="sheet">{icon('menu')}</button>
</div></header>
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Menu">
<div class="sheet-top"><a class="logo" href="{h}./" aria-label="{e(X['logo']['home_link_label'])}"><svg viewBox="0 0 128 39" style="width:128px"><use href="#logo"/></svg></a>
<button class="menu-btn" type="button" aria-label="Close menu" style="display:inline-flex;color:var(--ink)">{icon('close')}</button></div>
<nav aria-label="Main">{links}</nav>
<a class="btn btn-book btn-lg" href="{pre}book/">{e(X['ctas']['header_and_bar'])}</a>
</div>'''

def footer(pre):
    st = X['detail_lines']['stay']
    addr = C['contact']['address']
    return f'''<footer class="foot" id="contact"><div class="wrap">
<div class="foot-grid">
<div><a class="logo" href="{pre}./" aria-label="{e(X['logo']['home_link_label'])}"><svg viewBox="0 0 128 39"><use href="#logo"/></svg></a>
<p>{e(C['tagline'])}</p></div>
<div><h2>Talk to us</h2><div class="stack">
<a class="btn btn-white" href="{e(WA_URL)}">{icon('wa','wa')}{e(X['ctas']['whatsapp_footer'])}</a>
<a class="btn btn-white" href="tel:{TEL}">{icon('phone')}{e(X['ctas']['call'])}</a>
<a class="btn btn-white" href="mailto:{MAIL}">{icon('mail')}{e(X['ctas']['email'])}</a></div></div>
<div><h2>Visit</h2><p>{e(addr)}<br>{e(st)}</p>
<a class="btn btn-white" href="{e(MAP)}">{icon('pin')}{e(X['ctas']['map'])}</a></div>
<div><h2>Follow</h2><div class="social">
<a href="{e(SOC['instagram'])}" aria-label="Instagram">{icon('ig')}</a>
<a href="{e(SOC['youtube'])}" aria-label="YouTube">{icon('yt')}</a>
<a href="{e(SOC['facebook'])}" aria-label="Facebook">{icon('fb')}</a></div></div>
</div>
<div class="legal"><span>© Global Surf Adventures</span><a href="{TERMS}">Terms and conditions</a></div>
</div></footer>'''

# ---------------------------------------------------------------- home page
def home():
    pre = ''
    hero = f'''<section class="hero" aria-label="{e(C['businessName'])}">
<picture class="hero-media"><source media="(max-width:700px)" type="image/webp" srcset="img/vid-009e-poster-m.webp"><source type="image/avif" srcset="video/vid-009e-poster.avif"><source type="image/webp" srcset="img/vid-009e-poster-960.webp 960w, img/vid-009e-poster-1920.webp 1920w" sizes="100vw"><img src="img/vid-009e-poster-1920.jpg" width="1920" height="1080" alt="" fetchpriority="high"></picture>
<video muted loop playsinline preload="none" aria-hidden="true" data-hero data-webm-d="video/vid-009e-d1920.webm" data-mp4-d="video/vid-009e-d1920.mp4" data-webm-m="video/vid-009e-m1280.webm" data-mp4-m="video/vid-009e-m720.mp4"></video>
<div class="hero-copy"><h1>{e(X['hero']['title_c1'])}</h1>
<a class="btn btn-book btn-lg" href="book/">{e(X['ctas']['hero_c1'])}</a></div>
</section>'''

    intro = C['copyBlocks'][0]
    paras = ''.join(f'<p>{e(p)}</p>' for p in intro['body'].split('\n\n'))
    welcome = f'''<section class="sec" id="welcome"><div class="welcome">
<div class="flank l">{pic(pre,'img-118',ALT['img-118'],[640],640,'22vw',tag='-p',w=640,h=800)}</div>
<div class="text"><h2 class="script">{e(X['section_titles']['welcome'])}</h2>{paras}
<p class="detail">{detail(X['detail_lines']['welcome'])}</p></div>
<div class="flank r">{pic(pre,'img-024',ALT['img-024'],[640],640,'22vw',tag='-p',w=640,h=800)}</div>
</div></section>'''

    one_price = C['copyBlocks'][3]['body'].split('\n\n')[0]
    cards = ''
    for L in LEVELS:
        v = L['vid']
        cards += f'''<article class="lvl">
<div class="lvl-media"><picture><source type="image/webp" srcset="img/{v}-poster-45.webp"><img src="img/{v}-poster-45.jpg" width="640" height="800" alt="{e(L['alt'])}" loading="lazy" decoding="async"></picture>
<video muted loop playsinline preload="none" aria-hidden="true" data-clip data-webm-m="video/{v}-m1280.webm" data-mp4-m="video/{v}-m720.mp4"></video></div>
<div class="lvl-body"><h3>{e(L['name'])}</h3><p>{e(L['one'])}</p>
<div class="price">{price_html()}</div>
<a class="btn btn-book" href="book/?level={L['slug']}">{e(L['cta'])}</a></div></article>'''
    levels = f'''<section class="sec tint" id="levels"><div class="wrap">
<div class="sec-head"><h2 class="script">{e(X['section_titles']['levels'])}</h2><p>{e(one_price)}</p></div>
<div class="levels" data-row>{cards}</div>
<div class="dots lvl-dots" role="group" aria-label="Choose a level card"></div>
<div class="free"><div class="ph">{pic(pre,'img-001',ALT['img-001'],[800],1200,'(max-width:900px) 100vw, 420px',w=1200,h=800)}</div>
<div><h3>{e(FREE['name'])}</h3><p>{e(FREE['one'])}</p><p class="detail" style="margin-top:6px">{detail(X['detail_lines']['freestylers'])}</p></div>
<a class="btn btn-white" href="{e(WA_FREE)}">{icon('wa','wa')}{e(X['ctas']['freestylers'])}</a></div>
<p class="trust">{trust_html()}</p>
</div></section>'''

    inc = X['inclusions']
    lis = ''.join(f'<li>{icon(i["icon"])}<span>{e(i["text"])}</span></li>' for i in inc['level_1'])
    l3 = [i['text'] for i in inc['level_3'] if 'coached' in i['text']][0]
    included = f'''<section class="sec" id="included"><div class="wrap incl">
<div><h2 class="script">{e(X['section_titles']['included'])}</h2>
<ul>{lis}</ul>
<p class="note">{e(LEVELS[2]['name'])}<span class="sep">|</span>{e(l3)}<br>{e(inc['optional_extra'])}</p></div>
<div class="ph">{pic(pre,'img-115',ALT['img-115'],[800,1600],1200,'(max-width:900px) 100vw, 45vw',w=1200,h=800)}</div>
</div></section>'''

    wk = C['copyBlocks'][1]
    wparas = ''.join(f'<p>{e(p)}</p>' for p in wk['body'].split('\n\n'))
    week = f'''<section class="sec tint" id="week"><div class="wrap">
<div class="week-text"><h2 class="script">{e(X['section_titles']['week'])}</h2>{wparas}</div>
{slideshow(pre, ['img-104','img-011','img-111','img-023','img-114','img-060'], 'Photos of a week at the lodge', '(max-width:1100px) 100vw, 1040px', 'week-show')}
</div></section>'''

    rm = C['copyBlocks'][4]['body'].split('\n\n')[0]
    rows = ''
    for i, R in enumerate(X['rooms']):
        key = ['dorm', 'twin', 'deluxe'][i]
        rows += f'''<article class="room">
{slideshow(pre, R['gallery'], 'Photos: ' + R['label'], '(max-width:900px) 100vw, 58vw')}
<div><h3>{e(R['label'])}</h3><p class="line">{e(R['line'])}</p><p class="desc">{e(R['description'])}</p>
<p class="detail">{detail(R['details'])}</p>
<p class="price-note">{room_price_html(R)}</p>
<a class="btn btn-soft" href="book/?room={key}#step-room">{e(X['ctas']['room'])}</a></div></article>'''
    rooms = f'''<section class="sec" id="rooms"><div class="wrap">
<div class="sec-head"><h2 class="script">{e(X['section_titles']['rooms'])}</h2><p>{e(rm)}</p></div>
<div class="rooms">{rows}</div>
<p class="detail every">{detail(X['detail_lines']['every_room'])}</p>
</div></section>'''

    feature = f'''<section class="feature" aria-label="The pool">
<picture><source media="(max-width:700px)" type="image/webp" srcset="img/img-005-p-800.webp"><source type="image/webp" srcset="img/img-005-1000.webp 1000w, img/img-005-2000.webp 2000w" sizes="100vw"><img src="img/img-005-2000.jpg" width="2000" height="1125" alt="{e(ALT['img-005'])}" loading="lazy" decoding="async"></picture>
<p>{e(C['featureLine'])}</p></section>'''

    R0 = C['ratings'][0]
    src_name = {'booking': 'Booking.com'}
    qs = ''
    for t in C['testimonials']:
        s = src_name.get(t['source'])
        cite = f'<b>{e(t["author"])}</b>' + (f'<span class="sep">|</span>{s}' if s else '')
        qs += f'<figure class="q"><blockquote>“{e(t["quote"])}”</blockquote><figcaption><cite>{cite}</cite></figcaption></figure>'
    guests = f'''<section class="sec tint" id="guests"><div class="wrap">
<div class="sec-head" style="margin-bottom:28px"><h2 class="script">{e(X['section_titles']['guests'])}</h2></div>
<div class="score"><span class="num">{R0['score']}</span><span class="src"><b>Booking.com</b>{R0['count']} reviews<span class="sep">|</span>28 Sep 2026</span></div>
<p class="detail cats">{detail(X['detail_lines']['rating_categories'])}</p>
<div class="quotes" data-show aria-roledescription="carousel" aria-label="Guest reviews"><div class="q-track show-track" style="aspect-ratio:auto" tabindex="0">{qs}</div>
<div class="dots" role="group" aria-label="Choose a review"></div></div>
</div></section>'''

    waves = f'''<section class="sec" id="waves"><div class="wrap waves">
<div><h2 class="script">{e(X['section_titles']['waves'])}</h2><p class="lead">{e(C['spot'])}</p>
<div class="now">
<div><div class="v">0.7–1.0<small>m</small></div><div class="k">Wave height, chest-high</div></div>
<div><div class="v">14<small>s</small></div><div class="k">Swell from the SSW</div></div>
<div><div class="v">7<small>km/h</small></div><div class="k">Wind, cross-shore</div></div>
</div>
<p class="detail">Mon 28 Sep, 20:30<span class="sep">|</span><a href="https://rosa.surf/spot/{ROSA_SPOT}" style="color:var(--place);font-weight:500">Forecast for {ROSA_NAME} by Rosa</a></p></div>
<div class="rosa-box" data-rosa="https://rosa.surf/widget/?spot={ROSA_SPOT}&amp;theme=light&amp;units=metric" data-title="Rosa surf forecast - {ROSA_NAME}">
<div class="fallback"><a class="btn btn-white" href="https://rosa.surf/spot/{ROSA_SPOT}">See today's forecast for {ROSA_NAME} on Rosa</a></div></div>
</div></section>'''

    tiles = ''.join(f'<a href="{e(IG["url"])}" aria-label="{e(IG["tile_link_label"])}">{pic(pre,x,ALT[x],[600],600,"(max-width:800px) 33vw, 16vw",tag="-sq",w=600,h=600)}</a>'
                    for x in ['img-016', 'img-077', 'img-026', 'img-072', 'img-061', 'img-075'])
    insta = f'''<section class="sec tint" id="instagram"><div class="wrap">
<div class="ig-head"><h2 class="script" style="margin:0">{e(X['section_titles']['instagram'])}</h2><p>{e(IG['line'])}</p>
<a class="btn btn-white" href="{e(IG['url'])}">{icon('ig','ig-ico')}{e(X['ctas']['instagram'])}</a></div>
<div class="ig">{tiles}</div></div></section>'''

    closing = f'''<section class="feature closing" aria-label="Book">
<picture><source media="(max-width:700px)" type="image/webp" srcset="img/img-093-p-800.webp"><source type="image/webp" srcset="img/img-093-800.webp 800w, img/img-093-1536.webp 1536w" sizes="100vw"><img src="img/img-093-1536.jpg" width="1536" height="658" alt="{e(ALT['img-093'])}" loading="lazy" decoding="async"></picture>
<div class="inner"><p>{e(C['closing'])}</p><div class="btns">
<a class="btn btn-book btn-lg" href="book/">{e(X['ctas']['closing'])}</a>
<a class="btn btn-white btn-lg" href="{e(WA_URL)}">{icon('wa','wa')}{e(X['ctas']['whatsapp'])}</a></div></div></section>'''

    mbar = f'''<div class="mbar" id="mbar"><div class="t"><b>{e(PRICE_LINE.split('|')[0].strip())}</b>{e(PRICE_LINE.split('|')[1].strip())}</div>
<a class="btn btn-book" href="book/">{e(X['ctas']['header_and_bar'])}</a></div>'''

    body = (head(pre, f"{C['businessName']} | {X['hero']['title_c1']}", C['tagline']) +
            f'<body>{SPRITE}{header(pre, True)}<main id="main">{hero}{welcome}{levels}{included}{week}{rooms}{feature}{guests}{waves}{insta}{closing}</main>{footer(pre)}{mbar}'
            f'<script src="site.js" defer></script></body></html>')
    open(os.path.join(DIST, 'index.html'), 'w').write(body)

def price_html():
    a, b = [x.strip() for x in PRICE_LINE.split('|')]
    m = re.match(r'(From )(\$[\d,]+)( pp)', a)
    return f'{m.group(1)}<b>{m.group(2)}</b>{m.group(3)}<span class="sep">|</span>{e(b)}'

def trust_html():
    parts = [p.strip() for p in X['detail_lines']['trust'].split('|')]
    first = re.sub(r'^([\d.]+)', r'<b>\1</b>', e(parts[0]))
    return first + ''.join(f'<span class="sep">|</span>{e(p)}' for p in parts[1:])

def room_price_html(R):
    s = R['supplement']
    if 'display' in s:
        main = s['display']
    else:
        main = s['display_one_guest'] + '<br>' + e(s['display_couple'])
        return f'<b>{e(s["display_one_guest"])}</b><br><b>{e(s["display_couple"])}</b><small>{e(s["sample"])}<span class="sep">|</span>as of {e(s["as_of"])}</small>'
    return f'<b>{e(main)}</b><small>{e(s["sample"])}<span class="sep">|</span>as of {e(s["as_of"])}</small>'

# ---------------------------------------------------------------- booking page
SATURDAYS = ['2026-10-03', '2026-10-24', '2026-10-31', '2026-12-19', '2027-01-23', '2027-01-30', '2027-02-13',
             '2027-02-20', '2027-02-27', '2027-03-06', '2027-03-13', '2027-03-20', '2027-03-27', '2027-04-03']

def fmt(d):
    import datetime as dt
    x = dt.date.fromisoformat(d)
    return x.strftime('%a %-d %b %Y')

def book():
    pre = '../'
    B = X['booking']
    import datetime as dt
    L0 = LEVELS[0]
    band = f'''<section class="band" aria-label="{e(L0['name'])}">
<picture><source type="image/webp" srcset="../img/{L0['vid']}-poster-1600.webp"><img id="band-img" src="../video/{L0['vid']}-poster.jpg" width="1920" height="1080" alt="" fetchpriority="high"></picture>
<video id="band-vid" muted loop playsinline preload="none" aria-hidden="true" data-webm-m="../video/{L0['vid']}-m1280.webm" data-mp4-m="../video/{L0['vid']}-m720.mp4"></video>
<h1 id="band-title">{e(L0['name'])}</h1></section>'''

    opts = ''
    for i, L in enumerate(LEVELS):
        opts += f'''<label class="opt"><input type="radio" name="lvl" form="nosubmit" value="{L['slug']}"{' checked' if i == 0 else ''}>
<span class="th"><picture><source type="image/webp" srcset="../img/{L['vid']}-poster-45.webp"><img src="../img/{L['vid']}-poster-45.jpg" width="640" height="800" alt="" loading="lazy"></picture></span>
<span><h3>{e(L['name'])}</h3><p>{e(L['one'])}</p><p class="pr">{price_html()}</p></span>
<span class="tick">{icon('check')}</span></label>'''
    step1 = f'''<section class="step" id="step-level" aria-labelledby="h-level">
<p class="step-n">{e(B['step_counter'].format(n=1, total=4))}</p><h2 class="script" id="h-level">{e(X['section_titles']['book_level'])}</h2>
<div class="choose" role="radiogroup" aria-labelledby="h-level">{opts}</div>
<div class="free-line"><p><b>{e(FREE['name'])}</b><span class="sep">|</span>{e(FREE['one'])}</p>
<a class="btn btn-white" href="{e(WA_FREE)}">{icon('wa','wa')}{e(X['ctas']['freestylers'])}</a></div>
<p class="trust" style="margin-top:22px;text-align:left">{trust_html()}</p>
</section>'''

    inc = X['inclusions']
    def lis(k):
        return ''.join(f'<li>{icon(i["icon"])}<span>{e(i["text"])}</span></li>' for i in inc[k])
    incl = f'''<section class="step incl-b" id="step-included" aria-labelledby="h-inc">
<h2 class="script" id="h-inc">{e(X['section_titles']['book_included'])}</h2>
<ul data-incl="level_1">{lis('level_1')}</ul><ul data-incl="level_2" hidden>{lis('level_2')}</ul><ul data-incl="level_3" hidden>{lis('level_3')}</ul>
<p class="note">{e(inc['optional_extra'])}</p></section>'''

    cards = ''
    for i, R in enumerate(X['rooms']):
        key = ['dorm', 'twin', 'deluxe'][i]
        cards += f'''<article class="rcard" data-room="{key}" data-title="{e(R['engine_title'])}">
{slideshow(pre, R['gallery'], 'Photos: ' + R['label'], '(max-width:1000px) 100vw, 760px')}
<div class="body"><h3>{e(R['label'])}</h3><p class="line">{e(R['line'])}</p><p class="detail">{detail(R['details'])}</p>
<p class="state" hidden></p>
<div class="row"><p class="sup" style="margin:0" data-sup>{room_price_html(R)}</p>
<label class="pick"><input type="radio" name="room" form="nosubmit" value="{key}"><span>{icon('check')}{e(X['ctas']['room'])}</span></label></div></div></article>'''
    step2 = f'''<section class="step" id="step-room" aria-labelledby="h-room">
<p class="step-n">{e(B['step_counter'].format(n=2, total=4))}</p><h2 class="script" id="h-room">{e(X['section_titles']['book_room'])}</h2>
<div class="rcards">{cards}</div><p class="rooms-note">{e(X['rooms_note'])}</p></section>'''

    starts = ''.join(f'<option value="{d}">{fmt(d)}</option>' for d in SATURDAYS)
    ends = sorted({(dt.date.fromisoformat(d) + dt.timedelta(days=7 * n)).isoformat() for d in SATURDAYS for n in (1, 2, 3, 4)})
    endo = ''.join(f'<option value="{d}">{fmt(d)}</option>' for d in ends)
    nights = ''.join(f'<label><input type="radio" name="nights" form="nosubmit" value="{n}"{" checked" if n == "7" else ""}><span>{n}</span></label>' for n in B['nights_options'])
    def stepper(nm, lab, mx):
        return f'''<div class="field up stepper"><input id="g-{nm}" name="{nm}" type="number" inputmode="numeric" min="0" max="{mx}" value="0" placeholder=" "><label for="g-{nm}">{e(lab)}</label>
<button class="sb minus" type="button" aria-label="{e(B['stepper_less'])}: {e(lab)}" data-d="-1">{icon('minus')}</button><button class="sb plus" type="button" aria-label="{e(B['stepper_more'])}: {e(lab)}" data-d="1">{icon('plus')}</button></div>'''
    step3 = f'''<section class="step" id="step-dates" aria-labelledby="h-dates">
<p class="step-n">{e(B['step_counter'].format(n=3, total=4))}</p><h2 class="script" id="h-dates">{e(X['section_titles']['book_dates'])}</h2>
<div class="fields">
<div class="field nojs-only"><select id="start" name="start" required><option value="" disabled selected hidden></option>{starts}</select><label for="start">{e(B['field_checkin'])}</label>{icon('down','chev')}</div>
<div class="field nojs-only"><select id="end" name="end" required><option value="" disabled selected hidden></option>{endo}</select><label for="end">Check-out (Saturdays)</label>{icon('down','chev')}</div>
<div class="js-only"><div class="field" id="cal-field"><button class="val" type="button" id="cal-btn" aria-expanded="false" aria-controls="cal"></button><span class="lab" id="cal-lab">{e(B['field_checkin'])}</span>{icon('down','chev')}</div>
<div class="cal" id="cal" role="dialog" aria-label="{e(B['field_checkin'])}"><div class="cal-top"><button type="button" data-m="-1" aria-label="Previous month">{icon('left')}</button><b id="cal-month"></b><button type="button" data-m="1" aria-label="Next month">{icon('right')}</button></div>
<div class="cal-grid" id="cal-grid"></div><p class="cal-foot" id="cal-foot"></p></div>
<p class="help">{e(B['field_checkin_help'])}</p>
<div class="seg-wrap"><p class="seg-l" id="n-l">{e(B['field_nights'])}</p><div class="seg" role="radiogroup" aria-labelledby="n-l">{nights}</div></div></div>
</div>
<p class="sub-l">{e(X['booking']['summary_labels']['guests'])}</p>
<div class="fields three">{stepper('female', B['field_women'], 6)}{stepper('male', B['field_men'], 6)}{stepper('couple', B['field_couples'], 3)}</div>
<p class="help">{e(B['guests_help'])}</p>
</section>'''

    nojs_btns = ''.join(f'<button class="btn btn-book" type="submit" formaction="{ENGINE}{L["slug"]}">{e(X["ctas"]["handoff"])}: {e(L["name"])}</button>' for L in LEVELS)
    step4 = f'''<section class="step" id="step-total" aria-labelledby="h-total">
<p class="step-n">{e(B['step_counter'].format(n=4, total=4))}</p><h2 class="script" id="h-total">{e(X['section_titles']['book_total'])}</h2>
<div class="tot" aria-live="polite"><dl>
<dt>{e(B['total_package'])}</dt><dd id="t-pkg">$1,466</dd>
<dt>{e(B['total_room'])}</dt><dd id="t-room">{e(B['room_included'])}</dd>
<dt>{e(B['total_per_person'])}</dt><dd id="t-pp">$1,466</dd>
<span class="gap"></span>
<dt id="t-all-l">{e(B['total_all'].format(n=1).replace(' guests',' guest'))}</dt><dd class="big" id="t-all">$1,466</dd></dl>
<p class="src" id="t-src">{e(B['currency_note'])}<span class="sep">|</span>{e(B['prices_snapshot'].format(date='29 Sep 2026'))}</p></div>
<p class="deposit">{e(B['deposit'])}</p>
<div class="handoff"><div class="js-only"><button class="btn btn-book" type="submit" id="go">{e(X['ctas']['handoff'])}</button></div>
<div class="nojs-only nojs-go">{nojs_btns}</div>
<p>{e(B['handoff'])} {e(B['handoff_nothing_booked'])}</p>
<div class="or"><a class="btn btn-white" href="{e(WA_URL)}">{icon('wa','wa')}{e(X['ctas']['whatsapp'])}</a></div></div>
</section>'''

    S = B['summary_labels']
    summary = f'''<aside class="sum" aria-label="Summary"><h2 id="s-level">{e(L0['name'])}</h2><dl>
<dt>{e(S['dates'])}</dt><dd id="s-dates" class="muted">{e(B['field_checkin_nojs_placeholder'])}</dd>
<dt>{e(S['guests'])}</dt><dd id="s-guests" class="muted">0</dd>
<dt>{e(S['room'])}</dt><dd id="s-room" class="muted">–</dd></dl>
<div class="t"><span>{e(S['total'])}</span><b id="s-total">$1,466</b></div>
<button class="btn btn-book js-only" type="submit" form="bk">{e(X['ctas']['handoff'])}</button>
<small id="s-src">{e(B['prices_snapshot'].format(date='29 Sep 2026'))}</small></aside>'''

    mbar = f'''<div class="mbar" id="mbar"><div class="t"><b id="m-total">$1,466</b><span id="m-sub">{e(S['total'])}</span></div>
<button class="btn btn-book js-only" type="button" id="m-go">{e(X['ctas']['bar_on_booking_page'])}</button></div>'''

    data = dict(
        engine=ENGINE, asOf='29 Sep 2026', base7=1466, saturdays=SATURDAYS, bd='globalsurfadventures.bookinglayer.com',
        levels={L['slug']: dict(name=L['name'], id=L['id'], vid=L['vid'], incl=L['key']) for L in LEVELS},
        rooms={['dorm', 'twin', 'deluxe'][i]: dict(title=R['engine_title'], label=R['label'],
               single=R['supplement'].get('one_guest_per_person', R['supplement'].get('per_person', 0)),
               couple=R['supplement'].get('couple_per_person', R['supplement'].get('per_person', 0)))
               for i, R in enumerate(X['rooms'])},
        t=dict(included=B['room_included'], sup=B['room_supplement'], notfree=B['room_not_free'], onlyone=B['room_only_one_free'],
               all=B['total_all'], snap=B['prices_snapshot'], live=B['prices_live'], fail=B['prices_fallback'],
               cur=B['currency_note'], place=B['field_checkin_nojs_placeholder'],
               later='Price for {n} nights on the next page'),  # TEMPLATE-LABEL
    )
    body = (head(pre, f"{X['section_titles']['book_level']} | {C['businessName']}", C['tagline']) +
            f'<body class="bookpage">{SPRITE}{header(pre, False)}<main id="main">{band}'
            f'<form id="nosubmit" hidden></form>'
            f'<div class="book"><form id="bk" method="get" action="{ENGINE}{L0["slug"]}">{step1}{incl}{step2}{step3}{step4}<div class="book-end"></div></form>{summary}</div>'
            f'</main>{footer(pre)}{mbar}'
            f'<script id="bk-data" type="application/json">{json.dumps(data, ensure_ascii=False)}</script>'
            f'<script src="../site.js" defer></script><script src="../book.js" defer></script></body></html>')
    open(os.path.join(DIST, 'book', 'index.html'), 'w').write(body)

home()
book()
print('ok')
