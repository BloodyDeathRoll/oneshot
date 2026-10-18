#!/usr/bin/env python3
"""Series-2 unique mockup "על הבמה" (On stage) of mutag-meitiv, station 4e.

Renders dist/index.html from the audited copy (sites/mutag-meitiv/copy/he.json) and src/style.css +
src/app.js. Every visible word of the business comes from he.json verbatim (series-2 lines from
mockup_extras.series2_organisations); only interface labels live here. Fonts are inlined from
dist/fonts (made by src/make-media.sh). Run: python3 build.py   (PART=hero for the first screen only)"""
import json, html, pathlib, urllib.parse, datetime, base64, os, re

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
DIST = HERE.parent / 'dist'
C = json.loads((SITE / 'copy/he.json').read_text())
S2 = C['mockup_extras']['series2_organisations']
PART = os.environ.get('PART', 'all')
e = html.escape

WA = C['contact']['whatsapp'].lstrip('+')
def wa(text): return f'https://wa.me/{WA}?text=' + urllib.parse.quote(text)
ORG = S2['path']['ctaText']          # every general button on the home page carries the organisations line
CAL = C['bookingLinks'][0]
TEL = C['contact']['phone']
TEL_SHOW = '054-668-6808'
MAIL = C['contact']['email']
svc = {s['slug']: s for s in C['services']}
blocks = C['copyBlocks']
def block(start): return next(b for b in blocks if b['heading'].startswith(start))
def paras(t): return [p for p in (t or '').split('\n\n') if p.strip()]
def P(t, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>' + e(p).replace('\n', '<br>') + '</p>' for p in paras(t))
quotes = {t['author']: t for t in C['testimonials']}
social = {s['platform']: s['url'] for s in C['socialLinks']}
OLD = 'https://www.mutagmeitiv.com'

I = {
 'wa': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z"/></svg>',
 'phone': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
 'mail': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4 7.3V17h16V7.3l-8 4.9Zm0-2.3L19.2 7H4.8L12 9.9Z"/></svg>',
 'cal': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2Zm12 8H5v9h14v-9ZM5 6v2h14V6H5Z"/></svg>',
 'instagram': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.2s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.2-.1c-2.7-.1-4-1.4-4.1-4.1C3.6 15 3.6 14.7 3.6 12s0-3 .1-4.2C3.8 5.1 5.1 3.8 7.8 3.7 9 3.6 9.3 3.6 12 3.6ZM12 2C9.3 2 8.9 2 7.9 2.1 4.2 2.2 2.2 4.2 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.7 2.1 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.1 5.7-2.1 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.7-2.1-5.7-5.8-5.8C15.1 2 14.7 2 12 2Z"/></svg>',
 'linkedin': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z"/></svg>',
 'spotify': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.6.6 0 0 1-.9.2c-2.4-1.5-5.4-1.8-8.9-1a.6.6 0 1 1-.3-1.2c3.9-.9 7.2-.5 9.9 1.1.3.2.4.6.2.9Zm1.2-2.7a.8.8 0 0 1-1.1.3c-2.7-1.7-6.9-2.2-10.2-1.2a.8.8 0 1 1-.4-1.5c3.7-1.1 8.4-.6 11.5 1.3.4.2.5.7.2 1.1Zm.1-2.8C14.7 9 9.4 8.8 6.3 9.7a.9.9 0 1 1-.5-1.8c3.5-1.1 9.4-.9 13.1 1.3a.9.9 0 0 1-1 1.7Z"/></svg>',
 'apple_podcasts': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a9 9 0 0 0-3.6 17.2l.2-1.8a7.3 7.3 0 1 1 6.8 0l.2 1.8A9 9 0 0 0 12 2Zm0 3.6a5.4 5.4 0 0 0-3.3 9.7l.3-1.9a3.8 3.8 0 1 1 6 0l.3 1.9A5.4 5.4 0 0 0 12 5.6Zm0 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm0 4.6c-1.1 0-1.9.5-1.9 1.6l.6 5.2c.1.9.6 1.5 1.3 1.5s1.2-.6 1.3-1.5l.6-5.2c0-1.1-.8-1.6-1.9-1.6Z"/></svg>',
 'pdf': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 2h8l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm7 1.5V9h5.5L13 3.5ZM8 13v2h8v-2H8Zm0 4v2h5v-2H8Z"/></svg>',
 'arrow': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.4 5.6 15.8 7l-5 5 5 5-1.4 1.4L8 12l6.4-6.4Z"/></svg>',
 'plus': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z"/></svg>',
}
SOC_LABEL = {'instagram': 'אינסטגרם', 'linkedin': 'לינקדאין', 'spotify': 'ספוטיפיי', 'apple_podcasts': 'אפל פודקאסטים'}

def wa_btn(text=ORG, label='כתבו להדס בוואטסאפ', cls='btn btn-wa', aria=''):
    al = f' aria-label="{e(aria)}"' if aria else ''
    return f'<a class="{cls}" href="{e(wa(text))}" target="_blank" rel="noopener"{al}>{I["wa"]}<span>{e(label)}</span></a>'

def img(src, alt, w, h, cls='', lazy=True, prio=False, srcset='', sizes=''):
    ss = f' srcset="{srcset}" sizes="{sizes}"' if srcset else ''
    lz = ' loading="lazy" decoding="async"' if lazy else ''
    fp = ' fetchpriority="high"' if prio else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="img/{src}"{ss} width="{w}" height="{h}" alt="{e(alt)}"{lz}{fp}>'

def strips(text, split_after):
    """the h1 / title set as solid colour strips (the device of her own Instagram cards); a line break
    between the strips, words unchanged"""
    w = text.split(' ')
    return '<span class="strip">' + e(' '.join(w[:split_after])) + '</span><br><span class="strip">' + e(' '.join(w[split_after:])) + '</span>'

# ------------------------------------------------------------------ header
nav = [('#programme', 'לארגונים'), (f'{OLD}/process', svc['strategic-planning']['title']),
       ('#fringe', block('הרצאות וסדנאות')['heading']), (f'{OLD}/personal101', svc['personal-branding']['title']),
       ('#fringe', block('קורסים')['heading']), ('#team', 'אודות')]
def nav_html(): return ''.join(f'<li><a href="{e(h)}">{e(t)}</a></li>' for h, t in nav)

header = f'''
<a class="skip" href="#programme">דילוג לתוכן</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="brand" href="#top" aria-label="{e(C['businessName'])}, לראש העמוד">
      <img class="brand-ic" src="img/icon-white.webp" width="720" height="477" alt="">
      <img class="brand-wm" src="img/wordmark-white.webp" width="640" height="143" alt="">
    </a>
    <nav class="nav" aria-label="ראשי"><ul>{nav_html()}</ul></nav>
    {wa_btn(cls='btn btn-wa btn-hdr', aria='כתבו להדס בוואטסאפ')}
    <details class="mnav">
      <summary aria-label="תפריט"><span></span><span></span><span></span></summary>
      <div class="mnav-sheet"><ul>{nav_html()}</ul>{wa_btn()}</div>
    </details>
  </div>
</header>
<div class="bar" data-bar>{wa_btn(cls='btn btn-wa')}</div>'''

# ------------------------------------------------------------------ hero + the set-piece "into the screen"
M = C['method']
STAGE_PH = [
  ('st-sensing', 'אישה כותבת על קנבס גדול של Brand the Change, "WHO ARE YOU?", התלוי על הקיר'),
  ('st-thinking', 'קנבס עגול על שולחן ליד חלון עם צמחים, טושים ומחברות'),
  ('st-making', 'שולחן סדנה ארוך: משתתפות מכינות קולאז׳ים מגזרי מגזינים, טושים וירק'),
  ('st-influencing', 'הדס דרכלי בשמלה ירוקה על הבמה מול שקופית BRAND THE CHANGE, כנס המיתוג הישראלי 2024'),
]
def keep(t):   # a hyphenated compound ("ובת-קיימא") never breaks at its hyphen; words unchanged
    return re.sub(r'(\S+-\S+)', r'<span class="nb">\1</span>', e(t))
def slide(i, s):
    ph, alt = STAGE_PH[i]
    clip = ''
    if i == 2:   # MAKING: the business's own clip of the workshop table (vid-004) as a tile on the photo
        clip = ('<div class="s-clip s-video">'
                f'{img("s2u-table-poster.webp", "", 464, 580, cls="s-poster")}'
                '<video muted loop playsinline preload="none" disablepictureinpicture width="464" height="580" '
                'aria-label="מבט מלמעלה על שולחן הסדנה: גזרי מגזינים, תמונות וטושים" data-clip>'
                '<source data-src="video/s2u-table-464.webm" type="video/webm"><source data-src="video/s2u-table-464.mp4" type="video/mp4"></video></div>')
    media = (f'<figure class="s-photo">{img(ph + "-1000.webp", alt, 1000, 1250, srcset=f"img/{ph}-600.webp 600w, img/{ph}-1000.webp 1000w", sizes="(min-width: 900px) 50vw, 42vw")}{clip}</figure>')
    return (f'<article class="slide" data-slide="{i}" aria-labelledby="st-{i}">'
            f'<div class="s-text"><p class="s-label" lang="en" dir="ltr">{e(s["label"])}</p>'
            f'<h3 id="st-{i}">{keep(s["title"])}</h3><div class="s-body" data-more>{P(s["body"])}</div>'
            f'<button class="s-more" type="button" aria-expanded="false">קראו עוד</button></div>{media}</article>')

dots = ''.join(f'<li><button type="button" data-go="{i}" aria-label="{e(s["label"])}"><span></span></button></li>' for i, s in enumerate(M['stages']))
tag = S2['tagline_options'][0]
stage = f'''
<section class="stage" id="top" data-stage>
  <div class="stage-vp" data-pin>
    <div class="hero" data-hero>
      <div class="frame" data-frame>
        <picture class="hero-photo" data-photo>
          <source media="(max-width: 899px)" srcset="img/hero-m-800.webp" width="800" height="1000">
          <img src="img/hero-2000.webp" srcset="img/hero-1440.webp 1440w, img/hero-2000.webp 2000w" sizes="(min-width: 900px) 110vw, 100vw"
            width="2000" height="1023" fetchpriority="high"
            alt="מסך במה עם האייקון של מותג מיטיב והכותרת BRANDS OF CHANGE, ודוברת קטנה בקצה הבמה">
        </picture>
      </div>
      <div class="frame copy-frame">
        <div class="hero-copy" data-copy>
          <h1>{strips(tag, 3)}</h1>
          <div class="hero-act" data-hero-cta>{wa_btn(cls='btn btn-wa btn-lg')}</div>
        </div>
      </div>
      <p class="loading" data-loading aria-hidden="true">טוען את המצגת…</p>
    </div>
    <div class="screen" data-screen>
      <div class="m-head" data-head>
        <img class="m-icon" src="img/icon-white.webp" width="720" height="477" alt="" loading="lazy" decoding="async">
        <h2>{e(M['name'])}</h2>
        <div class="m-intro">{P(M['intro'])}</div>
      </div>
      <div class="slides">{''.join(slide(i, s) for i, s in enumerate(M['stages']))}</div>
      <ol class="dots" aria-label="שלבי המתודה">{dots}</ol>
    </div>
  </div>
</section>'''

# ------------------------------------------------------------------ the rest of the page (built after the first-screen rounds)
rest = ''
if PART == 'all':
    exec((HERE / 'sections.py').read_text())   # defines `rest` and `footer`, same helpers
else:
    footer = ''

# ------------------------------------------------------------------ assemble
css = (HERE / 'style.css').read_text()
for f in ('heebo-hebrew', 'heebo-latin', 'secular-hebrew', 'secular-latin'):   # fonts inlined: no font request at all
    b64 = base64.b64encode((DIST / f'fonts/{f}.woff2').read_bytes()).decode()
    css = css.replace(f'url(fonts/{f}.woff2)', f'url(data:font/woff2;base64,{b64})')
js = (HERE / 'app.js').read_text()
HEAD_JS = ("(function(){var d=document.documentElement;d.classList.add('js');"
  "var sd=navigator.connection&&navigator.connection.saveData;"
  "function m(){d.classList.toggle('pinned',!sd&&matchMedia('(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)').matches)}"
  "m();addEventListener('resize',m)})()")
doc = f'''<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(C['businessName'])} | מיתוג לעמותות ולארגונים, הרצאות וסדנאות לצוותים</title>
<meta name="description" content="{e(tag)} {e(paras(S2['intro']['body'])[0])}">
<meta name="robots" content="noindex">
<script>{HEAD_JS}</script>
<link rel="preload" as="image" href="img/hero-2000.webp" imagesrcset="img/hero-1440.webp 1440w, img/hero-2000.webp 2000w" imagesizes="110vw" media="(min-width: 900px)">
<link rel="preload" as="image" href="img/hero-m-800.webp" media="(max-width: 899px)">
<style>{css}</style>
</head>
<body>
{header}
<main id="main">
{stage}{rest}
</main>
{footer}
<script>{js}</script>
</body>
</html>'''
(DIST / 'index.html').write_text(doc)
print('wrote', DIST / 'index.html', len(doc), 'bytes')
