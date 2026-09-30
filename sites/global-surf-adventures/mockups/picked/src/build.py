#!/usr/bin/env python3
"""Build the picked composite (home + booking pages) from src/ and the audited copy.
Every visible string comes from sites/global-surf-adventures/copy/en.json (incl. mockup_extras);
the few interface labels the copy lacks are marked TEMPLATE-LABEL and listed in notes.md.
Photos and level clips are copied from the three approved mockups' dist/ (origin kept in the path:
img/s = #1 the-sign, img/p = #3 postcard, img/w = #2 try-your-week).
Run:  python3 sites/global-surf-adventures/mockups/picked/src/build.py
"""
import json, html, os, re, shutil, urllib.parse, datetime as dt
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '../../../../..'))
MOCK = os.path.join(ROOT, 'sites/global-surf-adventures/mockups')
DIST = os.path.join(HERE, '..', 'dist')
C = json.load(open(os.path.join(ROOT, 'sites/global-surf-adventures/copy/en.json')))
D = json.load(open(os.path.join(ROOT, 'dossier/global-surf-adventures/dossier.json')))
X = C['mockup_extras']
e = lambda s: html.escape(str(s), quote=True)
rd = lambda f: open(os.path.join(HERE, f)).read()

# ------------------------------------------------------------------ assets (copied, never linked across mockups)
SRC = {'s': 'the-sign', 'p': 'postcard', 'w': 'try-your-week'}
USED = set()
def a(origin, name, kind='img'):
    """Copy <mockup>/dist/<kind>/<name> to picked/dist/<kind>/<origin>/<name>; return the relative path."""
    src = os.path.join(MOCK, SRC[origin], 'dist', kind, name)
    rel = f'{kind}/{origin}/{name}'
    dst = os.path.join(DIST, rel)
    if not os.path.exists(src):
        raise SystemExit('missing asset ' + src)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
        shutil.copy2(src, dst)
    USED.add(rel)
    return rel

ALT = {}
for im in D['images']:
    if isinstance(im, dict) and im.get('description'):
        t = im['description'].strip(); ALT[im['id']] = t[0].upper() + t[1:]
# postcard / sign alt texts where the dossier has no description (written from what the photograph shows)
ALT_FALLBACK = {
 'img-063': 'The dorm: single beds under a timber loft with a ladder', 'img-095': 'Two single beds side by side under a sloping white roof',
 'img-042': 'Single beds on a timber floor under a white roof', 'img-050': 'A room terrace with a hanging chair and glass doors',
 'img-064': 'Open-air bathroom with a palm tree growing through it', 'img-080': 'Twin room with two beds, rattan lamps and glass doors to the garden',
 'img-084': 'Twin room with a rattan pendant lamp', 'img-083': 'Towels, a surf book and a plant on a timber shelf',
 'img-069': 'Private bathroom with a glass shower', 'img-079': 'Bathroom with a concrete wall, glass shower and plants',
 'img-081': 'Double room with a large white bed and garden doors', 'img-082': 'Double room with a white bed, rattan lamp and a hammock outside',
 'img-041': 'Double room with coral cushions and a woven pouf', 'img-043': 'Double room with a lime wall, bed and daybed',
 'img-044': 'Daybed with cushions under framed surf prints', 'img-071': 'Two framed black-and-white wave photographs',
 'img-104': 'A group walks along the beach carrying surfboards', 'img-011': 'A breakfast bowl of fruit, banana and granola',
 'img-023': 'Guests raise their glasses at a shared table by the pool', 'img-114': 'A surf theory class sitting in a circle on the sand',
 'img-060': 'The pool, lounge and garden from above', 'img-115': 'A surf coach explains how a wave breaks at the chalkboard',
 'img-001': 'A guest on a daybed by the pool in front of a white bungalow', 'img-118': 'A woman carries a surfboard on her head by the railway line',
 'img-024': 'A pineapple floating in the pool', 'img-005': 'The pool at water level, with the open lounge behind',
 'img-111': 'A surfer on a longboard at sunset', 'img-093': 'The pool and lounge at dusk with the lights on',
}
alt = lambda i: ALT.get(i) or ALT_FALLBACK.get(i, '')

# ------------------------------------------------------------------ links (copied, not retyped)
BL = {b['label']: b['url'] for b in C['bookingLinks']}
WA = BL['Ask on WhatsApp']
WA_NUM = WA.split('wa.me/')[1].split('?')[0]
WA_FREE = f'https://wa.me/{WA_NUM}?text=' + urllib.parse.quote('Hi Global Surf Lodge Kabalana, I would like to ask about dates for the Freestylers – B&B only package.')  # [postcard]
ENGINE = BL['Book Level 1'].rsplit('/', 1)[0] + '/'
LOGO_D = open(os.path.join(MOCK, 'the-sign/src/logo-d.txt')).read().strip()
TERMS = 'https://www.globalsurf.com/terms-conditions/'
ROSA_SPOT, ROSA_NAME = 'south-point', 'South Point'

LEVELS = [  # clips: the-sign's 4:5 level cuts
 dict(slug='level-1-fomies', n='1', vid='vid-010-p45', id='877aef3d-86ed-4b60-8932-03e49c613af8'),
 dict(slug='level-2-rollers', n='2', vid='vid-003e-p45', id='4b58b491-24fc-4fb8-a40d-2705df961db4'),
 dict(slug='level-3-riders', n='3', vid='vid-002e-p45', id='54ec3447-2efb-4677-8685-f272e00d32e8'),
]
for k, L in enumerate(LEVELS):
    L['name'] = C['lessons'][k]['label']; L['one'] = X['levels'][k]['one_liner']; L['cta'] = X['ctas']['level_' + L['n']]
FREE = dict(name=C['lessons'][3]['label'], one=X['levels'][3]['one_liner'])
ROOMS = [dict(r, key=k, short=s, gallery=[g for g in r['gallery'] if g != 'img-078'])
         for r, k, s in zip(X['rooms'], ['dorm', 'twin', 'double'], ['Dorm', 'Twin', 'Deluxe double'])]  # short names: TEMPLATE-LABEL [week]

def detail(s):
    return '<span class="sep">|</span>'.join(e(p.strip()) for p in s.split('|'))

# ------------------------------------------------------------------ icons [sign sprite + postcard inclusion icons]
ICON = {
 'bed': '<path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 15h18M6 9V6.5A1.5 1.5 0 0 1 7.5 5h3A1.5 1.5 0 0 1 12 6.5V9"/>',
 'bowl': '<path d="M3 11h18a9 9 0 0 1-18 0zM9 19.5 8.5 21h7l-.5-1.5"/><path d="M9 3c-1 1.3 1 2.2 0 3.5M13 3c-1 1.3 1 2.2 0 3.5"/>',
 'plate': '<circle cx="13" cy="12" r="7.5"/><circle cx="13" cy="12" r="4"/><path d="M3 4v5.5M3 12v8M1.8 4v4a1.2 1.2 0 0 0 2.4 0V4"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
 'book': '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/>',
 'board': '<path d="M5.2 18.8C3 16.6 6 10.8 10.4 6.4S19.6.9 20.9 3.1c1.3 2.2-2 8-6.4 12.4s-7.1 5.5-9.3 3.3z"/><path d="M6.5 17.5 18.5 5.5"/>',
 'van': '<path d="M2.5 16.5V7a1 1 0 0 1 1-1H14v10.5M14 9.5h3.6l3.4 3.6v3.4h-1.8M9 16.5h6.5M2.5 16.5h1.8"/><circle cx="6.6" cy="17" r="1.9"/><circle cx="17" cy="17" r="1.9"/>',
 'map': '<path d="M9 4 3 6.2v13.6L9 17.6l6 2.2 6-2.2V4.2L15 6.4 9 4zM9 4v13.6M15 6.4V20"/>',
 'water': '<path d="M12 3s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11z"/>',
 'cup': '<path d="M4 9h12v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.8a2.2 2.2 0 0 1 0 4.4H16M3 21h14"/><path d="M8 3.5c-.8 1 .8 1.8 0 3M12 3.5c-.8 1 .8 1.8 0 3"/>',
}
SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + ''.join(
  f'<symbol id="ic-{k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{v}</symbol>' for k, v in ICON.items()) + '''
<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.480-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.870.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.510-5.26c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 6.99 2.9 9.830 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-yt" viewBox="0 0 24 24"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/></symbol>
<symbol id="i-fb" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 3.5h3.6l1.9 4.8-2.4 1.5a11.5 11.5 0 0 0 6.1 6.1l1.5-2.4 4.8 1.9V19a2 2 0 0 1-2 2A17.5 17.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21.5s-7-6.1-7-11.5a7 7 0 0 1 14 0c0 5.4-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/></symbol>
<symbol id="i-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></symbol>
<symbol id="i-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h18"/></symbol>
<symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
</defs></svg>'''
# the WhatsApp path above is the sign's; guard against a typo creeping in by using the sign's source verbatim
SIGN_BUILD = open(os.path.join(MOCK, 'the-sign/src/build.py')).read()
_wa = re.search(r'<symbol id="i-wa".*?</symbol>', SIGN_BUILD).group(0)
SPRITE = re.sub(r'<symbol id="i-wa".*?</symbol>', lambda m: _wa, SPRITE)
ic = lambda n, cls='': f'<svg{f" class={chr(34)}{cls}{chr(34)}" if cls else ""} aria-hidden="true"><use href="#{n}"/></svg>'

FONT_URL = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,500&display=swap'
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         f'<link rel="stylesheet" href="{FONT_URL}" media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="{FONT_URL}"></noscript>')

def logo(w_cls=''):
    return f'<svg viewBox="12 21 237 46" aria-hidden="true"><path fill="currentColor" d="{LOGO_D}"/></svg>'

NAV = [('Levels', '#levels'), ('Rooms', '#rooms'), ('The lodge', '#welcome'), ('Contact', '#contact')]  # TEMPLATE-LABEL (concepts.md §0)

def header(pre, home):
    h = '' if home else '../'
    links = ''.join(f'<a href="{h}{u}">{t}</a>' for t, u in NAV).replace('href="../#contact"', 'href="#contact"')
    book = f'<a class="btn btn-book hdr-book" href="{pre}book/">{e(X["ctas"]["header_and_bar"])}</a>' if home else ''
    menu_book = f'<a class="btn btn-book" href="{pre}book/">{e(X["ctas"]["header_and_bar"])}</a>' if home else ''
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="hdr{'' if home else ' solid'}" id="hdr">
  <div class="hdr-in">
    <a class="logo" href="{h or './'}" aria-label="{e(X['logo']['home_link_label'])}">{logo()}</a>
    <nav class="nav" aria-label="Main">{links}</nav>
    {book}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">{ic('i-menu')}</button>
  </div>
  <div class="menu" id="menu" hidden>{links}{menu_book}</div>
</header>'''

def footer(pre):  # [sign]
    c = C['contact']; S = X['socials']; CT = X['ctas']
    info = next(b for b in C['copyBlocks'] if b['heading'] == 'Getting here')['body']
    return f'''<footer class="foot" id="contact">
  <div class="wrap foot-g">
    <div>
      <a class="logo" href="{pre or './'}" aria-label="{e(X['logo']['home_link_label'])}">{logo()}</a>
      <p style="margin-top:22px;max-width:320px">{e(C['tagline'])}</p>
    </div>
    <div>
      <h2>Talk to us</h2>
      <div class="stack">
        <a class="btn btn-soft" href="{e(WA)}">{ic('i-wa', 'wa')}{e(CT['whatsapp_footer'])}</a>
        <a class="btn btn-soft" href="tel:{c['phone']}">{ic('i-phone')}{e(CT['call'])}</a>
        <a class="btn btn-soft" href="mailto:{c['email']}">{ic('i-mail')}{e(CT['email'])}</a>
      </div>
    </div>
    <div>
      <h2>{e(X['section_titles']['getting_here'])}</h2>
      <address>{e(c['address'])}</address>
      <p class="small">{e(info)}</p>
      <p class="small">{e(X['detail_lines']['stay'])}</p>
      <a class="btn btn-soft" href="{e(c['mapUrl'])}" target="_blank" rel="noopener">{ic('i-pin')}{e(CT['map'])}</a>
    </div>
    <div>
      <h2>Follow</h2>
      <div class="social">
        <a href="{S['instagram']}" target="_blank" rel="noopener" aria-label="Instagram">{ic('i-ig')}</a>
        <a href="{S['youtube']}" target="_blank" rel="noopener" aria-label="YouTube">{ic('i-yt')}</a>
        <a href="{S['facebook']}" target="_blank" rel="noopener" aria-label="Facebook">{ic('i-fb')}</a>
      </div>
    </div>
  </div>
  <div class="wrap legal"><span>© Global Surf Adventures</span><a href="{TERMS}" target="_blank" rel="noopener">Terms and conditions</a></div>
</footer>'''

def show(pre, items, label, cls='', arrows=True):
    """One dot slideshow: items are ready HTML slides."""
    arr = (f'<button class="arrow prev" type="button" aria-label="Previous photo">{ic("i-l")}</button>'
           f'<button class="arrow next" type="button" aria-label="Next photo">{ic("i-r")}</button>') if arrows else ''
    return (f'<div class="show {cls}" data-show><div class="show-frame"><div class="show-track" tabindex="0" role="region" aria-label="{e(label)}">'
            + ''.join(items) + f'</div>{arr}</div><div class="dots"></div></div>')

def wimg(pre, i, sizes, lazy=True, aspect_w=1400, aspect_h=933):  # try-your-week renditions
    n = i[4:]
    big = 1333 if n in ('010', '024') else 1400
    s8 = a('w', f'img-{n}-800.webp'); s14 = a('w', f'img-{n}-{big}.webp')
    return (f'<img src="{pre}{s14}" srcset="{pre}{s8} 800w, {pre}{s14} {big}w" sizes="{sizes}" width="{aspect_w}" height="{aspect_h}" alt="{e(alt(i))}"'
            + (' loading="lazy" decoding="async"' if lazy else '') + '>')

def room_viewer(pre, action, idp=''):  # [week]
    pills = ''.join(f'<button type="button" role="tab" id="{idp}rt-{r["key"]}" aria-controls="{idp}room-{r["key"]}" aria-selected="{"true" if k == 0 else "false"}">{e(r["short"])}</button>' for k, r in enumerate(ROOMS))
    panels = ''
    for k, r in enumerate(ROOMS):
        s = r['supplement']
        price = e(s['display']) if 'display' in s else f'{e(s["display_one_guest"])}<br>{e(s["display_couple"])}'
        slides = [f'<figure>{wimg(pre, g, "(max-width: 1000px) 100vw, 780px", lazy=True)}</figure>' for j, g in enumerate(r['gallery'])]
        panels += f'''
<div class="room-panel" id="{idp}room-{r['key']}" role="tabpanel" aria-labelledby="{idp}rt-{r['key']}" data-room="{r['key']}" data-engine-title="{e(r['engine_title'])}">
 <div class="room">
  {show(pre, slides, r['label'] + ', photographs')}
  <div class="room-txt">
   <h3>{e(r['label'])}</h3>
   <p class="line">{e(r['line'])}</p>
   <p class="desc">{e(r['description'])}</p>
   <p class="detail">{detail(r['details'])}</p>
   <p class="price" data-rprice>{price}</p>
   <p class="rstate" data-rstate hidden></p>
   {action(r, k)}
  </div>
 </div>
</div>'''
    return f'<div class="room-box"><div class="pills-row"><div class="pills" role="tablist" aria-label="Room type">{pills}</div></div><div class="room-panels">{panels}</div></div>'

def head(pre, title, desc, css, extra=''):
    return f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<script>document.documentElement.className='js'</script>
{extra}
{FONTS}
<style>
{css}
</style>
</head>'''

# ------------------------------------------------------------------ home
def home():
    pre = ''
    CT = X['ctas']; ST = X['section_titles']
    hero = f'''<section class="hero" id="top" aria-label="{e(C['businessName'])}">
  <picture class="hero-p"><source media="(max-width: 767px) and (orientation: portrait)" type="image/webp" srcset="video/hero-poster-m.webp"><source type="image/webp" srcset="video/hero-poster-d.webp"><img src="video/hero-poster-d.jpg" width="1728" height="972" alt="" fetchpriority="high"></picture>
  <video class="hero-v" muted loop playsinline preload="none" aria-hidden="true"
    data-d-webm="video/hero-d1728.webm" data-d-mp4="video/hero-d1728.mp4"
    data-m-webm="video/hero-m608.webm" data-m-mp4="video/hero-m608.mp4"></video>
  <div class="hero-c">
    <h1>{e(X['hero']['title_c3'])}</h1>
    <a class="btn btn-book btn-lg" href="book/">{e(CT['hero_c1'])}</a>
  </div>
</section>'''

    intro = C['copyBlocks'][0]
    paras = ''.join(f'<p>{e(p)}</p>' for p in intro['body'].split('\n\n'))
    def ppic(i, w, sizes, tag='-p'):  # postcard portrait crops
        ws = [640, 1066] if w == 1066 else [640]
        src = ', '.join(f'{a("p", f"{i}{tag}-{x}.webp")} {x}w' for x in ws)
        jpg = a('p', f'{i}{tag}-{w}.jpg')
        return f'<picture><source type="image/webp" srcset="{src}" sizes="{sizes}"><img src="{jpg}" width="{w}" height="{round(w*1.25)}" alt="{e(alt(i))}" loading="lazy" decoding="async"></picture>'
    welcome = f'''<section class="sec welcome" id="welcome" aria-labelledby="t-welcome"><div class="wrap split">
<div class="w-media"><div class="w-main">{ppic('img-118', 1066, '(max-width:900px) 100vw, 44vw')}</div>
<div class="w-small">{ppic('img-024', 640, '(max-width:900px) 40vw, 18vw')}</div></div>
<div class="w-text"><h2 class="script" id="t-welcome">{e(ST['welcome'])}</h2><div class="lead">{paras}</div>
<p class="detail">{detail(X['detail_lines']['welcome'])}</p></div>
</div></section>'''

    panels = ''
    for L in LEVELS:
        v = L['vid']
        po = a('s', f'{v}-poster.jpg', 'video'); wb = a('s', f'{v}.webm', 'video'); mp = a('s', f'{v}.mp4', 'video')
        panels += f'''<article class="panel" data-level="{L['slug']}">
  <a class="panel-media" href="book/?level={L['slug']}#room" tabindex="-1" aria-hidden="true">
    <img src="{po}" width="864" height="1080" alt="" loading="lazy" decoding="async">
    <video muted loop playsinline preload="none" data-webm="{wb}" data-mp4="{mp}"></video>
  </a>
  <div class="panel-t">
    <h3>{e(L['name'])}</h3>
    <p>{e(L['one'])}</p>
    <p class="detail">{detail(X['detail_lines']['level_price'])}</p>
    <a class="btn btn-book" href="book/?level={L['slug']}#room">{e(L['cta'])}</a>
  </div>
</article>'''
    levels = f'''<section class="levels bg-soft" id="levels" aria-labelledby="t-levels">
  <div class="wrap">
    <h2 class="script center" id="t-levels">{e(ST['levels'])}</h2>
    <div class="panels-w" data-panels><div class="panels">{panels}</div><div class="dots panel-dots"></div></div>
    <div class="free">
      <div><h3>{e(FREE['name'])}</h3><p>{e(FREE['one'])}</p><p class="detail">{detail(X['detail_lines']['freestylers'])}</p></div>
      <a class="btn btn-soft" href="{e(WA)}">{ic('i-wa', 'wa')}{e(CT['freestylers'])}</a>
    </div>
  </div>
</section>'''

    inc = X['inclusions']
    lis = ''.join(f'<li>{ic("ic-" + i["icon"])}<span>{e(i["text"])}</span></li>' for i in inc['level_1'])
    l3 = [i['text'] for i in inc['level_3'] if 'coached' in i['text']][0]
    included = f'''<section class="incl" id="included" aria-labelledby="t-incl">
<div class="incl-media">{ppic('img-115', 1066, '(max-width:900px) 100vw, 50vw')}</div>
<div class="incl-body"><h2 class="script" id="t-incl">{e(ST['included'])}</h2>
<ul>{lis}</ul>
<p class="note">{e(LEVELS[2]['name'])}<span class="sep">|</span>{e(l3)}<br>{e(inc['optional_extra'])}</p></div>
</section>'''

    wk = C['copyBlocks'][1]
    wparas = ''.join(f'<p>{e(p)}</p>' for p in wk['body'].split('\n\n'))
    wslides = []
    for j, i in enumerate(['img-104', 'img-011', 'img-023', 'img-114', 'img-060']):
        s8 = a('p', f'{i}-800.webp'); s16 = a('p', f'{i}-1600.webp'); jp = a('p', f'{i}-1200.jpg')
        wslides.append(f'<figure><picture><source type="image/webp" srcset="{s8} 800w, {s16} 1600w" sizes="(max-width:900px) 100vw, 62vw"><img src="{jp}" width="1200" height="800" alt="{e(alt(i))}" loading="lazy" decoding="async"></picture></figure>')
    week = f'''<section class="sec bg-soft week" id="week" aria-labelledby="t-week"><div class="week-grid">
<div class="week-text"><h2 class="script" id="t-week">{e(ST['week'])}</h2>{wparas}</div>
{show(pre, wslides, 'Photos of a week at the lodge', 'week-show')}
</div></section>'''

    tw1 = next(b for b in C['copyBlocks'] if b['heading'] == 'Twelve rooms, one big family')['body'].split('\n\n')[0]
    rooms = f'''<section class="sec" id="rooms" aria-labelledby="t-rooms">
 <div class="wrap">
  <div class="sec-head split2"><h2 class="script" id="t-rooms">{e(ST['rooms'])}</h2><p>{e(tw1)}</p></div>
  {room_viewer(pre, lambda r, k: f'<a class="btn btn-book" href="book/?room={r["key"]}">{e(CT["room"])}</a>')}
  <p class="detail rooms-note">{e(X['rooms_note'])}</p>
 </div>
</section>'''

    f1 = a('p', 'img-005-1000.webp'); f2 = a('p', 'img-005-2000.webp'); fm = a('p', 'img-005-p-800.webp'); fj = a('p', 'img-005-2000.jpg')
    feature = f'''<section class="feature" aria-label="The pool">
<picture><source media="(max-width:700px)" type="image/webp" srcset="{fm}"><source type="image/webp" srcset="{f1} 1000w, {f2} 2000w" sizes="100vw"><img src="{fj}" width="2000" height="1125" alt="{e(alt('img-005'))}" loading="lazy" decoding="async"></picture>
<p>{e(C['featureLine'])}</p></section>'''

    R0 = C['ratings'][0]
    qs = []
    for t in C['testimonials']:
        s = {'booking': 'Booking.com'}.get(t['source'])
        cite = f'<b>{e(t["author"])}</b>' + (f'<span class="sep">|</span>{s}' if s else '')
        qs.append(f'<figure class="q"><blockquote>“{e(t["quote"])}”</blockquote><figcaption><cite>{cite}</cite></figcaption></figure>')
    guests = f'''<section class="sec bg-soft" id="guests" aria-labelledby="t-guests"><div class="wrap guests">
<div class="g-score"><h2 class="script" id="t-guests">{e(ST['guests'])}</h2>
<div class="score"><span class="num">{R0['score']}</span><span class="src"><b>Booking.com</b>{R0['count']} reviews<span class="sep">|</span>28 Sep 2026</span></div>
<p class="detail">{detail(X['detail_lines']['rating_categories'])}</p></div>
{show(pre, qs, 'Guest reviews', 'quotes', arrows=False)}
</div></section>'''

    waves = f'''<section class="sec" id="waves" aria-labelledby="t-waves"><div class="wrap waves">
<div><h2 class="script" id="t-waves">{e(ST['waves'])}</h2><p class="lead">{e(C['spot'])}</p>
<div class="now" id="rosa-now" data-generated="2026-09-28T14:26:37+00:00" data-json="https://rosa-data-opal.vercel.app/data/spots/{ROSA_SPOT}.json">
<div><div class="v" id="rosa-h">0.7–1.0<small>m</small></div><div class="k" id="rosa-hk">Wave height, chest-high</div></div>
<div><div class="v" id="rosa-p">14<small>s</small></div><div class="k" id="rosa-pk">Swell from the SSW</div></div>
<div><div class="v" id="rosa-w">7<small>km/h</small></div><div class="k" id="rosa-wk">Wind, cross-shore</div></div>
</div>
<p class="rosa-link" id="rosa-plain"><a class="btn btn-soft" href="https://rosa.surf/spot/{ROSA_SPOT}">See today's forecast for {ROSA_NAME} on Rosa</a></p>
<p class="detail" id="rosa-meta"><span id="rosa-time">Mon 28 Sep, 20:30</span><span class="sep">|</span><a class="credit" href="https://rosa.surf/spot/{ROSA_SPOT}">Forecast for {ROSA_NAME} by Rosa</a></p></div>
<div class="rosa-box" data-rosa="https://rosa.surf/widget/?spot={ROSA_SPOT}&amp;theme=light&amp;units=metric" data-title="Rosa surf forecast - {ROSA_NAME}">
<div class="fallback"><a class="btn btn-soft" href="https://rosa.surf/spot/{ROSA_SPOT}">See today's forecast for {ROSA_NAME} on Rosa</a></div></div>
</div></section>'''

    IG = X['instagram']
    tiles = ''.join(f'<a href="{e(IG["url"])}" aria-label="{e(IG["tile_link_label"])}">{wimg(pre, "img-" + n, "(max-width: 900px) 45vw, 260px", aspect_w=1400 if n not in ("010", "024") else 800, aspect_h=933 if n not in ("010", "024") else 1333)}</a>'
                    for n in ['001', '024', '060', '099', '114', '010', '073', '012'])
    insta = f'''<section class="sec bg-soft" id="instagram" aria-labelledby="t-insta">
 <div class="wrap">
  <div class="ig-head">
    <div><h2 class="script" id="t-insta">{e(ST['instagram'])}</h2><p>{e(IG['line'])}</p></div>
    <a class="btn btn-ink" href="{IG['url']}">{ic('i-ig')}{e(CT['instagram'])}</a>
  </div>
  <div class="ig-row" id="igRow">{tiles}</div>
  <div class="dots" id="igDots"></div>
 </div>
</section>'''

    cl1, cl2 = [x.strip() + '.' if not x.strip().endswith(('.', '?')) else x.strip() for x in C['closing'].split('. ', 1)]
    closing = f'''<section class="closing" aria-label="{e(CT['closing'])}">
<div class="cl-media">{ppic('img-111', 1066, '(max-width:900px) 100vw, 50vw')}</div>
<div class="cl-body"><h2 class="script">{e(cl1)}</h2><p>{e(cl2)}</p><div class="btns">
<a class="btn btn-book btn-lg" href="book/">{e(CT['closing'])}</a>
<a class="btn btn-soft btn-lg" href="{e(WA)}">{ic('i-wa', 'wa')}{e(CT['whatsapp'])}</a></div></div></section>'''

    lp = X['detail_lines']['level_price'].split('|')
    bar = f'''<div class="bar" id="bar" aria-hidden="true">
  <p><strong>{e(lp[0].strip())}</strong> | {e(lp[1].strip())}</p>
  <a class="btn btn-book" href="book/" tabindex="-1">{e(CT['header_and_bar'])}</a>
</div>'''

    import base64
    lq = {k: base64.b64encode(open(os.path.join(DIST, f'video/hero-poster-{k}-lq.webp'), 'rb').read()).decode() for k in 'md'}
    lq_css = (f'.hero{{background:#CDE4EE url(data:image/webp;base64,{lq["d"]}) center/cover no-repeat}}'
              f'@media (max-width: 767px) and (orientation: portrait){{.hero{{background-image:url(data:image/webp;base64,{lq["m"]})}}}}')
    pre_poster = '<link rel="preload" as="image" type="image/webp" href="video/hero-poster-m.webp" media="(max-width: 767px) and (orientation: portrait)"><link rel="preload" as="image" type="image/webp" href="video/hero-poster-d.webp" media="not all and (max-width: 767px) and (orientation: portrait)">'
    out = (head(pre, f"{C['businessName']} | {X['hero']['title_c1']}", C['tagline'], rd('site.css') + rd('home.css') + lq_css, pre_poster)
           + f'\n<body class="home">\n{SPRITE}\n{header(pre, True)}\n<main id="main">\n{hero}\n{welcome}\n{levels}\n{included}\n{week}\n{rooms}\n{feature}\n{guests}\n{waves}\n{insta}\n{closing}\n</main>\n{footer(pre)}\n{bar}\n<script>\n{rd("common.js")}\n{rd("home.js")}\n</script>\n</body>\n</html>\n')
    open(os.path.join(DIST, 'index.html'), 'w').write(out)

if __name__ == '__main__':
    home()
    if os.path.exists(os.path.join(HERE, 'book.py')):
        exec(open(os.path.join(HERE, 'book.py')).read())
    # prune copied assets no longer referenced (the hero loop in video/ is made by make-hero.sh and kept)
    for kind in ('img', 'video'):
        for org in SRC:
            d = os.path.join(DIST, kind, org)
            for f in (os.listdir(d) if os.path.isdir(d) else []):
                if f'{kind}/{org}/{f}' not in USED: os.remove(os.path.join(d, f))
    print('built;', len(USED), 'assets copied')
