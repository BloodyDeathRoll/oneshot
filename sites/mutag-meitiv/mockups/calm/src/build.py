#!/usr/bin/env python3
"""Calm mockup "ירוק בית" (mutag-meitiv, station 4e): renders dist/index.html from the audited
copy (sites/mutag-meitiv/copy/he.json) and src/page.css + src/page.js. Every visible word of the
business comes from he.json verbatim; only interface labels live here. Run: python3 build.py"""
import json, html, pathlib, urllib.parse, datetime

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
C = json.loads((SITE / 'copy/he.json').read_text())
OUT = HERE.parent / 'dist/index.html'
e = html.escape

WA = C['contact']['whatsapp'].lstrip('+')
def wa(text): return f'https://wa.me/{WA}?text=' + urllib.parse.quote(text)
WA_DEFAULT = wa('היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.')
CAL = C['bookingLinks'][0]
TEL = C['contact']['phone']
TEL_SHOW = '054-668-6808'
MAIL = C['contact']['email']
svc = {s['slug']: s for s in C['services']}
blocks = C['copyBlocks']
def block(heading_start):
    return next(b for b in blocks if b['heading'].startswith(heading_start))
def paras(text): return [p for p in text.split('\n\n') if p.strip()]
def P(text, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>' + e(p).replace('\n', '<br>') + '</p>' for p in paras(text))
quotes = {t['author']: t for t in C['testimonials']}
social = {s['platform']: s['url'] for s in C['socialLinks']}

# ---- icons (inline, currentColor)
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
 'img': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9.6l4-4 3.5 3.5 2.5-2.5 4 4V6H5Zm10 1.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z"/></svg>',
 'arrow': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.6 5.6 8.2 7l5 5-5 5 1.4 1.4L16 12l-6.4-6.4Z"/></svg>',
}
SOC_LABEL = {'instagram': 'אינסטגרם', 'linkedin': 'לינקדאין', 'spotify': 'ספוטיפיי', 'apple_podcasts': 'אפל פודקאסטים'}

def wa_btn(text=None, label='כתבו להדס בוואטסאפ', cls='btn btn-wa'):
    return f'<a class="{cls}" href="{e(wa(text) if text else WA_DEFAULT)}" target="_blank" rel="noopener">{I["wa"]}<span>{label}</span></a>'

def quote(name, extra=''):
    q = quotes[name]
    lang = q.get('lang') or 'he'
    d = 'ltr' if lang == 'en' else 'rtl'
    role = f'<span class="q-role">{e(q["role"])}</span>' if q.get('role') else ''
    long = len(q['quote']) > 260
    body = e(q['quote']).replace('\n\n', '<br><br>').replace('\n', '<br>')
    clamp = ' data-clamp' if long else ''
    more = '<button class="q-more" type="button" hidden aria-expanded="false">לקריאת הכל</button>' if long else ''
    return (f'<figure class="quote {extra}" lang="{lang}" dir="{d}"><blockquote{clamp}><p>{body}</p></blockquote>{more}'
            f'<figcaption><b>{e(q["author"])}</b>{role}</figcaption></figure>')

UNIT = {'per_person': 'למשתתף/ת', 'flat': '', 'per_lesson': '', 'per_day': 'ליום'}
def price(s):
    if s.get('price') is None: return ''
    if s['price'] == 0: return '<span class="chip chip-free">ללא תשלום</span>'
    n = f'{s["price"]:,}'
    vat = ' + מע״מ' if s.get('vat') == 'excluded' else ''
    unit = UNIT.get(s.get('unit'), '')
    unit = f' <small>{unit}</small>' if unit else ''
    return f'<span class="price"><b>{n} ₪</b>{vat}{unit}</span>'

def offer_card(s):
    status = '<span class="chip chip-full">ההרשמה נסגרה</span>' if s.get('status') == 'full' else ''
    fmt = f'<p class="o-format">{e(s["format"])}</p>' if s.get('format') else ''
    aud = f'<p class="o-aud">{e(s["audience"])}</p>' if s.get('audience') else ''
    label = 'עדכנו אותי בוואטסאפ' if s.get('status') == 'full' else 'לפרטים בוואטסאפ'
    return (f'<article class="offer reveal"><div class="o-top">{price(s)}{status}</div>'
            f'<h3>{e(s["title"])}</h3>{fmt}{aud}'
            f'<div class="o-act">{wa_btn(s.get("ctaText"), label, "btn btn-wa btn-sm")}</div></article>')

def img(name, alt, w, h, sizes='100vw', widths=None, cls='', lazy=True, prio=False):
    src = f'img/{name}.webp'
    srcset = ''
    if widths:
        srcset = ' srcset="' + ', '.join(f'img/{name.rsplit("-",1)[0]}-{x}.webp {x}w' for x in widths) + f'" sizes="{sizes}"'
    lz = ' loading="lazy" decoding="async"' if lazy else ''
    fp = ' fetchpriority="high"' if prio else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{src}"{srcset} width="{w}" height="{h}" alt="{e(alt)}"{lz}{fp}>'

# ---------------------------------------------------------------- sections
intro = blocks[0]
nav = [('#personal', 'מיתוג אישי לעסק'), ('#strategic', 'תכנון אסטרטגי למותג'), ('#talks', 'הרצאות וסדנאות'),
       ('#courses', 'קורסים'), ('#team', 'אודות'), ('#content', 'תוכן')]
nav_html = ''.join(f'<li><a href="{h}">{e(t)}</a></li>' for h, t in nav)

header = f'''
<a class="skip" href="#main">דילוג לתוכן</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="brand" href="#top" aria-label="{e(C['businessName'])}, לראש העמוד">
      <img class="wm" src="img/logo-wordmark.webp" width="640" height="143" alt="">
      <span class="ic" aria-hidden="true"></span>
    </a>
    <nav class="nav" aria-label="ראשי"><ul>{nav_html}</ul></nav>
    {wa_btn(label='כתבו להדס בוואטסאפ', cls='btn btn-wa btn-hdr')}
    <details class="mnav">
      <summary aria-label="תפריט"><span></span><span></span><span></span></summary>
      <div class="mnav-sheet"><ul>{nav_html}</ul>{wa_btn()}</div>
    </details>
  </div>
</header>'''

hero = f'''
<section class="hero" id="top" data-hero>
  <div class="hero-in">
    <div class="hero-photo">
      <img src="img/img-013-hero-1000.webp" srcset="img/img-013-hero-720.webp 720w, img/img-013-hero-1000.webp 1000w"
        sizes="(min-width: 900px) 480px, 92vw" width="1000" height="1250" fetchpriority="high"
        alt="הדס דרכלי מחייכת אל המצלמה בחולצה ירוקה, ביער אורנים">
    </div>
    <div class="hero-text">
      <h1>{e(intro['heading'])}</h1>
      <p class="tagline">{e(C['tagline'])}</p>
      <div class="hero-act" data-hero-cta>{wa_btn(cls='btn btn-wa btn-lg')}</div>
    </div>
  </div>
</section>'''

aw, cr = C['awards'][0], C['credentials'][0]
proof = f'''
<section class="proof" aria-label="הכרה והסמכה">
  <div class="wrap proof-in">
    <a class="proof-item" href="{e(aw['url'])}" target="_blank" rel="noopener">
      <img src="img/img-040-award.webp" width="72" height="72" alt="חותם פרס המיתוג הישראלי 2022" loading="lazy">
      <span><b>{e(aw['label'])}</b><small>{e(aw['issuer'])} · {aw['year']} · {e(aw['project'])}</small></span>
    </a>
    <a class="proof-item" href="{e(cr['url'])}" target="_blank" rel="noopener">
      <img src="img/img-041-btc.webp" width="72" height="72" alt="חותם CERTIFIED TRAINER של Brand the Change" loading="lazy">
      <span><b>{e(cr['label'])}</b><small>{e(cr['issuer'])}</small></span>
    </a>
  </div>
</section>'''

talks_b, courses_b = block('הרצאות וסדנאות'), block('קורסים')
tools_cards = [
  ('#personal', svc['personal-branding']['title'], svc['personal-branding']['summary']),
  ('#strategic', svc['strategic-planning']['title'], svc['strategic-planning']['summary']),
  ('#talks', talks_b['heading'], paras(talks_b['body'])[0]),
  ('#courses', courses_b['heading'], paras(courses_b['body'])[0]),
]
tools = '<section class="tools" aria-labelledby="tools-h"><div class="wrap">' \
  f'<h2 id="tools-h" class="sec-h">{e(C["mockup_extras"]["homeToolsHeading"])}</h2><div class="tools-row">' + \
  ''.join(f'<a class="tool reveal" href="{h}"><h3>{e(t)}</h3><p>{e(s)}</p></a>' for h, t, s in tools_cards) + \
  '</div></div></section>'

def lead(s, anchor, photo, alt, q, flip=False, cur=''):
    lines = ''
    if s.get('format'): lines += f'<li><span>מבנה</span>{e(s["format"])}</li>'
    if s.get('audience'): lines += f'<li><span>למי</span>{e(s["audience"])}</li>'
    return f'''
<section class="lead{' flip' if flip else ''}" id="{anchor}" aria-labelledby="{anchor}-h">
  <div class="wrap lead-in">
    <div class="lead-photo reveal">{img(photo + '-1200', alt, 1200, 900, '(min-width: 900px) 46vw, 92vw', [720, 1200])}</div>
    <div class="lead-text">
      <h2 id="{anchor}-h">{e(s['title'])}</h2>
      <p class="lead-sum">{e(s['summary'])}</p>
      <ul class="facts">{lines}</ul>
      {quote(q, 'q-lead')}
      <div class="acts">{wa_btn(s['ctaText'])}<a class="btn btn-soft" href="{cur}" target="_blank" rel="noopener">לפרטים</a></div>
    </div>
  </div>
</section>'''

leads = lead(svc['personal-branding'], 'personal', 'img-003', 'משתתפת כותבת על קנבס הטבעות WHO ARE YOU? בסדנה', 'אנווה רצון', cur='https://www.mutagmeitiv.com/personal101') + \
        lead(svc['strategic-planning'], 'strategic', 'img-012', 'קנבס הטבעות על שולחן עבודה ליד חלון, עציצים וטושים', 'Julia Dojas - Heart of Hosting', True, cur='https://www.mutagmeitiv.com/process')

motto = f'<section class="motto" aria-label="המוטו"><p class="wrap">{e(C["featureLine"])}</p></section>'

M = C['method']
STAGE_IMG = [('img-006-stage', 'קנבס הטבעות WHO ARE YOU? תלוי על קיר, מכוסה פתקים צבעוניים'),
             ('img-032-stage', 'יד מחזיקה קלף של Brand the Change מעל שורת קלפים על שולחן עץ'),
             ('img-c03-stage', 'שולחן סדנה ארוך: משתתפות מכינות קולאז׳ים מגזירי מגזינים, טושים וירק'),
             ('img-ig-01-stage', 'הדס בשמלה ירוקה על במה מול שקופית BRAND THE CHANGE')]
def stage(i, s):
    ps = paras(s['body'])
    more = f'<details><summary>קראו עוד</summary>' + ''.join(f'<p>{e(x)}</p>' for x in ps[1:]) + '</details>' if len(ps) > 1 else ''
    im, alt = STAGE_IMG[i]
    return (f'<li class="stage" data-stage="{i}"><span class="st-n" aria-hidden="true">{i+1}</span><div class="st-body">'
            f'<span class="st-label" lang="en" dir="ltr">{e(s["label"])}</span><h3>{e(s["title"])}</h3>'
            f'<div class="st-ph">{img(im, alt, 900, 1125)}</div><p>{e(ps[0])}</p>{more}</div></li>')
frames = ''.join(f'<img class="mf{" on" if i == 0 else ""}" data-frame="{i}" src="img/{im}.webp" width="900" height="1125" alt="{e(alt)}" loading="lazy" decoding="async">' for i, (im, alt) in enumerate(STAGE_IMG))
method = f"""
<section class="method" id="method" aria-labelledby="method-h">
  <div class="wrap">
    <div class="method-head"><h2 id="method-h" class="sec-h">{e(M['name'])}</h2><div class="sec-lede">{P(M['intro'])}</div></div>
    <div class="method-in">
      <div class="m-frame" aria-hidden="true">{frames}</div>
      <ol class="stages" data-stages>{''.join(stage(i, s) for i, s in enumerate(M['stages']))}</ol>
    </div>
  </div>
</section>
<div class="band" role="img" aria-label="מבט מלמעלה על משתתפים סביב שולחן, מכינים מפות חזון ממגזינים וטושים">
  {img('img-007-band-1600', '', 1600, 533, '100vw', [900, 1600])}
</div>
"""

talks = [s for s in C['services'] if s['group'] == 'talks_workshops' and s.get('status') != 'ended']
courses = [s for s in C['services'] if s['group'] == 'courses' and s.get('status') != 'ended']
video = """<div class="pair" aria-hidden="false">
  <div class="pair-ph">""" + img('img-030-pair', 'מבט מלמעלה על שולחנות עגולים בסדנה: ציורי מפות חזון, כוסות קפה ועפרונות צבעוניים', 1000, 1250) + """</div>
  <div class="clip"><video muted loop playsinline preload="none" disablepictureinpicture poster="img/vid-004-poster.webp" width="464" height="580"
    aria-label="מבט מלמעלה על שולחן סדנה: לוחות קולאז׳, גזירי מגזינים, מספריים, טושים וירק, וידיים בעבודה" data-clip>
    <source data-src="video/table-464.webm" type="video/webm">
    <source data-src="video/table-464.mp4" type="video/mp4">
  </video></div></div>"""
def row(s, extra=False):
    status = '<span class="chip chip-full">ההרשמה נסגרה</span>' if s.get('status') == 'full' else ''
    fmt = f'<span class="r-fmt">{e(s["format"])}</span>' if s.get('format') else ''
    aud = f'<p class="r-aud">{e(s["audience"])}</p>' if s.get('audience') else ''
    label = 'עדכנו אותי בוואטסאפ' if s.get('status') == 'full' else 'לפרטים בוואטסאפ'
    hid = ' data-more' if extra else ''
    return (f'<li class="orow"{hid}><div class="r-main"><h3>{e(s["title"])}</h3>{fmt}{aud}</div>'
            f'<div class="r-side">{price(s)}{status}<a class="r-wa" href="{e(wa(s["ctaText"]))}" target="_blank" rel="noopener">{I["wa"]}<span>{label}</span></a></div></li>')
def group(items, show):
    rows = ''.join(row(s, i >= show) for i, s in enumerate(items))
    more = f'<button class="btn btn-soft show-all" type="button" data-show-all hidden>הצג את כל {len(items)}</button>' if len(items) > show else ''
    return f'<ul class="orows">{rows}</ul>{more}'
def lede(text):   # the client's all-caps English slogan set in sentence case (wording unchanged)
    out = ''
    for x in paras(text):
        if x.isascii() and x.upper() == x and any(c.isalpha() for c in x):
            out += f'<p class="slogan" lang="en" dir="ltr">{e(x)}</p>'
        else:
            out += f'<p>{e(x)}</p>'
    return out
offers = f"""
<section class="offers" id="talks" aria-labelledby="talks-h">
  <div class="wrap">
    <div class="grp-head">
      <div class="grp-txt">
        <h2 id="talks-h" class="sec-h">{e(talks_b['heading'])}</h2><div class="sec-lede">{lede(talks_b['body'])}</div>
        {group(talks, 3)}
        <div class="grp2" id="courses"><h2 id="courses-h" class="sec-h">{e(courses_b['heading'])}</h2><div class="sec-lede">{lede(courses_b['body'])}</div>
        {group(courses, 3)}
        <p class="as-of">המחירים כפי שפורסמו באתר הנוכחי, נכון ל־18.10.2026.</p></div>
      </div>
      {video}
    </div>
  </div>
</section>"""

cs = C['caseStudies'][0]
frame = lambda t: f'<div class="ph-frame">{I["img"]}<span>{t}</span></div>'
process = ''.join(f'<li><span class="st-label" lang="en" dir="ltr">{e(p["stage"])}</span><p>{e(p["body"])}</p></li>' for p in cs['process'])
case = f'''
<section class="case" aria-labelledby="case-h">
  <div class="wrap">
    <h2 id="case-h" class="sec-h">מקרה בוחן</h2>
    <details class="case-card">
      <summary>
        <div class="case-txt"><span class="demo-badge inline">דוגמה</span><p class="case-client">{e(cs['client'])} · {e(cs['sector'])}</p>
          <h3>{e(cs['title'])}</h3><span class="btn btn-soft btn-sm case-open">לצפייה במקרה הבוחן</span></div>
      </summary>
      <div class="case-body">
        <p class="demo-note">זהו מקרה בוחן לדוגמה, לא פרויקט אמיתי. כך ייראה עמוד פרויקט כשיתווסף פרויקט אמיתי.</p>
        <h4>האתגר</h4><p>{e(cs['challenge'])}</p>
        <div class="case-before">{frame('תמונה לדוגמה · לפני')}{frame('תמונה לדוגמה · לפני')}</div>
        <h4>התהליך</h4><ol class="case-steps">{process}</ol>
        <h4>התוצאה</h4><p>{e(cs['outcome'])}</p>
        <div class="case-after">{frame('תמונה לדוגמה · אחרי')}</div>
        <figure class="quote"><blockquote><p>{e(cs['quote'])}</p></blockquote><figcaption><b>{e(cs['quoteAuthor'])}</b></figcaption></figure>
        <p class="credits">{e(cs['credits'])}</p>
      </div>
    </details>
  </div>
</section>'''

slides = ['יובל אברהם - בונים לחיים', 'Linda friedrich @ambartique', 'איה', 'רננה אורלב', 'AMBARTIQUE@לינדה', 'קרן']
testi = f'''
<section class="testi" aria-labelledby="testi-h">
  <div class="wrap">
    <h2 id="testi-h" class="sec-h">{e(C['mockup_extras']['testimonialsHeading'])}</h2>
    <div class="slider" data-slider>
      <div class="slider-vp"><div class="slides" tabindex="0" aria-label="המלצות">{''.join(f'<div class="slide" aria-roledescription="שקופית" aria-label="{i+1} מתוך {len(slides)}">{quote(n, "q-slide")}</div>' for i, n in enumerate(slides))}</div></div>
      <div class="dots" role="group" aria-label="בחירת המלצה" hidden>{''.join(f'<button type="button" aria-label="המלצה {i+1}"></button>' for i in range(len(slides)))}</div>
    </div>
  </div>
</section>'''

logos = ''.join(f'<li><img src="img/{l["logo"].split(":")[1]}-logo.webp" alt="{e(l["name"])}" loading="lazy"></li>' for l in C['clientLogos'])
clients = f'''
<section class="clients" aria-labelledby="clients-h">
  <div class="wrap"><h2 id="clients-h" class="sec-h">{e(C['mockup_extras']['clientLogosHeading'])}</h2><ul class="logos">{logos}</ul></div>
</section>'''

T = C['team']; team_b = block('צוות עם משמעות')
def member(m, i):
    pid = m['photo'].split(':')[1]
    if m.get('founder'):
        return f'''<article class="founder reveal"><div class="f-photo">{img('img-034-founder', 'הדס דרכלי צוחקת ליד קנבס הטבעות WHO ARE YOU?, בז׳קט צהוב', 700, 875)}</div>
          <div class="f-txt"><h3>{e(m['name'])}</h3><p class="role">{e(m['role'])}</p><div class="bio" data-bio>{P(m['bio'])}</div><button class="q-more bio-more" type="button" hidden aria-expanded="false">קראו עוד</button></div></article>'''
    return f'''<article class="member reveal">{img(pid + '-team', 'דיוקן של ' + m['name'], 600, 750)}
      <h3>{e(m['name'])}</h3><p class="role">{e(m['role'])}</p><div class="bio" data-bio>{P(m['bio'])}</div><button class="q-more bio-more" type="button" hidden aria-expanded="false">קראו עוד</button></article>'''
team = f'''
<section class="team" id="team" aria-labelledby="team-h">
  <div class="wrap">
    <h2 id="team-h" class="sec-h">{e(team_b['heading'])}</h2>
    <div class="sec-lede">{P(team_b['body'])}</div>
    {member(T[0], 0)}
    <div class="members">{''.join(member(m, i) for i, m in enumerate(T[1:]))}</div>
  </div>
</section>'''

air = block('ON AIR')
pod = ''.join(f'<a class="btn btn-light" href="{e(l["url"])}" target="_blank" rel="noopener">{I[l["platform"]]}<span>{"Spotify" if l["platform"]=="spotify" else "Apple Podcasts"}</span></a>' for l in C['podcast']['links'])
podcast = f'''
<section class="air" id="content" aria-labelledby="air-h">
  <div class="wrap air-in">
    <div class="air-art">{img("podcast-art", "עטיפת הפודקאסט מותג מיטיב: הדס דרכלי, ידיים שלובות, על רקע סגול", 560, 560)}</div>
    <div><h2 id="air-h"><span lang="en" dir="ltr">ON AIR</span> {e(air['heading'].split('—',1)[1].strip())}</h2>
    <p class="air-p">{e(paras(air['body'])[0])}</p>
    <p class="air-p2">{e(paras(air['body'])[1])}</p>
    <div class="acts">{pod}</div></div>
  </div>
</section>'''

def date_he(d):
    y, m, dd = d.split('-'); return f'{int(dd)}.{int(m)}.{y}'
COVERS = {'2026-05-28': 'שורת ראשים שקופים בכחול, האחרון בוער בכתום'}
def cover(p):
    if p['date'] in COVERS:
        return f'<div class="post-c">{img("post-" + p["date"], COVERS[p["date"]], 800, 533)}</div>'
    return '<div class="post-c post-tile" aria-hidden="true"><span></span></div>'
posts = sorted(C['posts'], key=lambda p: p['date'], reverse=True)[:3]
blog = '<section class="blog" aria-labelledby="blog-h"><div class="wrap"><h2 id="blog-h" class="sec-h">מאמרים אחרונים</h2><div class="posts">' + \
  ''.join(f'<a class="post reveal" href="{e(p["oldUrl"])}" target="_blank" rel="noopener">{cover(p)}<div class="post-t"><time datetime="{p["date"]}">{date_he(p["date"])}</time><h3>{e(p["title"])}</h3>' +
          (f'<p>{e(p["excerpt"])}</p>' if p.get('excerpt') else '') + '</div></a>' for p in posts) + \
  '</div><div class="center"><a class="btn btn-soft" href="https://www.mutagmeitiv.com/blog" target="_blank" rel="noopener">לבלוג המלא</a></div></div></section>'

ig_order = ['03', '01', '02', '09', '08', '11']
ig_url = {t['image'].split('-')[-1]: t['postUrl'] for t in C['instagramTiles']}
ig_alt = {'03': 'הדס בחולצה ירוקה מסדרת צבעים וצמחים על שולחן סדנה', '01': 'הדס בשמלה ירוקה על במה מול שקופית BRAND THE CHANGE',
          '02': 'הדס בשמלה מודפסת עלים מול קיר חטיפי שוקולד', '09': 'ידיים קושרות עטיפת מתנה מעלי בננה על שולחן עץ',
          '08': 'מסך הקרנה של כנס IMPACT NATION עם חצים וקודי QR', '11': 'כוס קפה וגזירי מגזינים בסדנת מפת חזון'}
insta = f'''
<section class="insta" aria-labelledby="ig-h">
  <div class="wrap center"><h2 id="ig-h" class="sec-h">מותג מיטיב באינסטגרם</h2>
    <p class="ig-line">סדנאות, הרצאות ואנשים, מהשולחן של הדס.</p>
    <a class="btn btn-soft" href="{e(social['instagram'])}" target="_blank" rel="noopener">{I['instagram']}<span lang="en" dir="ltr">@mutagmeitiv</span></a></div>
  <ul class="ig">{''.join(f'<li><a href="{e(ig_url[i])}" target="_blank" rel="noopener">{img("img-ig-" + i, ig_alt[i], 600, 600)}</a></li>' for i in ig_order)}</ul>
</section>'''

closing = f'''
<section class="closing" aria-labelledby="close-h">
  <div class="wrap">
    <div class="close-photo">{img('img-c05-1600', 'שמונה נשים מחזיקות את לוחות הקולאז׳ שהכינו בסדנה', 1600, 800, '(min-width: 1240px) 1160px, 92vw', [800, 1600])}</div>
    <h2 id="close-h" class="close-t">{e(C['closing'])}</h2>
    <div class="acts center">{wa_btn(cls='btn btn-wa btn-lg')}<a class="btn btn-soft btn-lg" href="{e(CAL['url'])}" target="_blank" rel="noopener">{I['cal']}<span>{e(CAL['label'])}</span></a></div>
  </div>
</section>'''

dl = C['downloads'][0]
year = datetime.date.today().year
soc = ''.join(f'<a class="soc" href="{e(s["url"])}" target="_blank" rel="noopener" aria-label="{SOC_LABEL[s["platform"]]}">{I[s["platform"]]}</a>' for s in C['socialLinks'])
footer = f'''
<footer class="ftr">
  <div class="wrap ftr-in">
    <div class="ftr-brand"><span class="ftr-icon" role="img" aria-label="{e(C['businessName'])}"></span>
      <p>{e(C['tagline'])}</p><div class="socs">{soc}</div></div>
    <div class="ftr-contact"><h2>{e(block('פה יוצרים קשר')['heading'])}</h2>
      <div class="pills">{wa_btn(label='וואטסאפ', cls='pill pill-wa')}
        <a class="pill" href="tel:{TEL}">{I['phone']}<span dir="ltr">{TEL_SHOW}</span></a>
        <a class="pill" href="mailto:{MAIL}">{I['mail']}<span dir="ltr">{MAIL}</span></a>
        <a class="pill" href="{e(dl['file'])}" target="_blank" rel="noopener">{I['pdf']}<span>{e(dl['label'])}</span></a></div></div>
    <nav class="ftr-nav" aria-label="ניווט באתר"><h2>ניווט</h2><ul>{nav_html}<li><a href="https://www.mutagmeitiv.com/הצהרת-נגישות">הצהרת נגישות</a></li></ul></nav>
  </div>
  <div class="wrap ftr-base"><span>© {year} {e(C['businessName'])}</span>{''.join(f'<span>{e(c)}</span>' for c in C['mockup_extras']['footerCredits'])}</div>
</footer>
<div class="bar" data-bar aria-hidden="true"><span class="bar-ic"></span><span class="bar-t">{e(C['businessName'])}</span>{wa_btn(cls='btn btn-wa btn-sm')}</div>'''

import base64
ICON = base64.b64encode((HERE.parent / 'dist/img/logo-icon-mask.webp').read_bytes()).decode()
css = ':root{--icon:url(data:image/webp;base64,' + ICON + ')}' + (HERE / 'page.css').read_text()
for sub in ('hebrew', 'latin'):   # Heebo inlined: one self-contained file, no font request at all
    b64 = base64.b64encode((HERE.parent / f'dist/fonts/heebo-{sub}.woff2').read_bytes()).decode()
    css = css.replace(f'url(fonts/heebo-{sub}.woff2)', f'url(data:font/woff2;base64,{b64})')
js = (HERE / 'page.js').read_text()
doc = f'''<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(C['businessName'])} | מיתוג אישי לעסק ובניית אסטרטגיה עסקית למותג עם משמעות</title>
<meta name="description" content="{e(paras(intro['body'])[0])} {e(paras(intro['body'])[1])}">
<meta name="robots" content="noindex">
<link rel="preload" as="image" href="img/img-013-hero-720.webp" imagesrcset="img/img-013-hero-720.webp 720w, img/img-013-hero-1000.webp 1000w" imagesizes="(min-width: 900px) 480px, 92vw">
<style>{css}</style>
</head>
<body>
{header}
<main id="main">
{hero}{proof}{tools}{leads}{motto}{method}{offers}{testi}{case}{clients}{team}{podcast}{blog}{insta}{closing}
</main>
{footer}
<script>{js}</script>
</body>
</html>'''
OUT.write_text(doc)
print('wrote', OUT, len(doc), 'bytes')
