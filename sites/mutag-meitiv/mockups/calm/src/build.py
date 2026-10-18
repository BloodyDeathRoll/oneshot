#!/usr/bin/env python3
"""Series-2 calm mockup "דף ההזמנה" (mutag-meitiv, station 4e): renders dist/index.html from the
audited copy (sites/mutag-meitiv/copy/he.json, incl. mockup_extras.series2_organisations) and
src/page.css + src/page.js. Every business word comes from he.json verbatim; only interface labels
live here. Media first: bash src/make-media.sh. Then: python3 src/build.py"""
import json, html, pathlib, urllib.parse, datetime, base64, re

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
DIST = HERE.parent / 'dist'
C = json.loads((SITE / 'copy/he.json').read_text())
O = C['mockup_extras']['series2_organisations']
e = html.escape

WA = C['contact']['whatsapp'].lstrip('+')
def wa(text): return f'https://wa.me/{WA}?text=' + urllib.parse.quote(text)
ORG_TEXT = O['path']['ctaText']                     # every general button on this home page
CAL = C['bookingLinks'][0]
TEL = C['contact']['phone']
TEL_SHOW = '054-668-6808'
MAIL = C['contact']['email']
svc = {s['slug']: s for s in C['services']}
blocks = C['copyBlocks']
def block(start): return next(b for b in blocks if b['heading'].startswith(start))
def paras(t): return [p for p in t.split('\n\n') if p.strip()]
def P(t, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>' + e(p).replace('\n', '<br>') + '</p>' for p in paras(t))
quotes = {t['author']: t for t in C['testimonials']}
social = {s['platform']: s['url'] for s in C['socialLinks']}
def data_uri(name, mime='image/webp'):
    return f'data:{mime};base64,' + base64.b64encode((DIST / 'img' / name).read_bytes()).decode()

# ---------------------------------------------------------------- icons (inline, currentColor)
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
 'back': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.4 5.6 15.8 7l-5 5 5 5-1.4 1.4L8 12l6.4-6.4Z"/></svg>',
 'plus': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z"/></svg>',
 'ext': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 4h6v6h-2V7.4l-7.3 7.3-1.4-1.4L16.6 6H14V4ZM5 6h6v2H6v10h10v-5h2v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"/></svg>',
}
# the four formats' line icons, drawn by the template (stroke, 40 px): mic, group, compass, cap
LINE = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"'
FMT_ICON = {
 'brands-of-change': f'<svg viewBox="0 0 40 40" aria-hidden="true"><g {LINE}><rect x="15" y="5" width="10" height="18" rx="5"/><path d="M10 19a10 10 0 0 0 20 0M20 29v6M14 35h12"/></g></svg>',
 'therapists-retreat': f'<svg viewBox="0 0 40 40" aria-hidden="true"><g {LINE}><circle cx="20" cy="12" r="4.5"/><circle cx="9" cy="16" r="3.5"/><circle cx="31" cy="16" r="3.5"/><path d="M12 33v-4a8 8 0 0 1 16 0v4M3.5 31v-2.5a5.5 5.5 0 0 1 7-5.3M36.5 31v-2.5a5.5 5.5 0 0 0-7-5.3"/></g></svg>',
 'strategic-planning': f'<svg viewBox="0 0 40 40" aria-hidden="true"><g {LINE}><circle cx="20" cy="20" r="15"/><path d="m25.5 14.5-3.2 7.8-7.8 3.2 3.2-7.8z"/><path d="M20 5v3M20 32v3M5 20h3M32 20h3"/></g></svg>',
 'btc-professionals': f'<svg viewBox="0 0 40 40" aria-hidden="true"><g {LINE}><path d="m3 15 17-8 17 8-17 8z"/><path d="M10 18.5V27c0 2.8 4.5 5 10 5s10-2.2 10-5v-8.5M37 15v9"/></g></svg>',
}
SOC_LABEL = {'instagram': 'אינסטגרם', 'linkedin': 'לינקדאין', 'spotify': 'ספוטיפיי', 'apple_podcasts': 'אפל פודקאסטים'}
CUR = 'https://www.mutagmeitiv.com'
PAGE = {  # the current site's page for each offer (a 4e mockup has no inner pages yet)
 'strategic-planning': f'{CUR}/process', 'personal-branding': f'{CUR}/personal101',
 'brands-of-change': f'{CUR}/סדנאות-והרצאות', 'therapists-retreat': f'{CUR}/סדנאות-והרצאות',
 'btc-professionals': f'{CUR}/service-page/brand-the-change-לאנשי-מקצוע',
}

def wa_btn(text=ORG_TEXT, label='כתבו להדס בוואטסאפ', cls='btn btn-wa', extra=''):
    return f'<a class="{cls}" href="{e(wa(text))}" target="_blank" rel="noopener"{extra}>{I["wa"]}<span>{label}</span></a>'
def wa_round(text, label):
    return f'<a class="wa-round" href="{e(wa(text))}" target="_blank" rel="noopener" aria-label="{e(label)}">{I["wa"]}</a>'

UNIT = {'per_person': 'למשתתף/ת'}
def price(s):
    if s.get('price') is None: return ''
    if s['price'] == 0: return '<span class="chip">ללא תשלום</span>'
    vat = ' + מע״מ' if s.get('vat') == 'excluded' else ''
    unit = UNIT.get(s.get('unit'), '')
    return f'<span class="price"><b>{s["price"]:,} ₪</b>{vat}{" " + unit if unit else ""}</span>'
AS_OF = '<p class="as-of">המחירים כפי שפורסמו באתר הנוכחי, נכון ל־18.10.2026.</p>'

def img(name, alt, w, h, cls='', lazy=True, sizes=None, srcset=None):
    s = f' srcset="{srcset}" sizes="{sizes}"' if srcset else ''
    lz = ' loading="lazy" decoding="async"' if lazy else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="img/{name}.webp"{s} width="{w}" height="{h}" alt="{e(alt)}"{lz}>'

def quote(name, clamp=True):
    q = quotes[name]; lang = q.get('lang') or 'he'; d = 'ltr' if lang == 'en' else 'rtl'
    role = f'<span class="q-role">{e(q["role"])}</span>' if q.get('role') else ''
    body = e(q['quote'].strip('״')).replace('\n\n', '<br><br>').replace('\n', '<br>')
    long = clamp and len(q['quote']) > 240
    more = '<button class="q-more" type="button" hidden aria-expanded="false">לקריאת הכל</button>' if long else ''
    return (f'<figure class="quote" lang="{lang}" dir="{d}"><blockquote{" data-clamp" if long else ""}><p>{body}</p></blockquote>{more}'
            f'<figcaption><b>{e(q["author"])}</b>{role}</figcaption></figure>')

# ---------------------------------------------------------------- header + hero
NAV = [('#orgs', 'לארגונים'), ('#svc-strategic-planning', svc['strategic-planning']['title']),
       ('#talks', block('הרצאות וסדנאות')['heading']), ('#individuals', svc['personal-branding']['title']),
       ('#courses', block('קורסים')['heading']), ('#team', 'אודות')]
nav_html = ''.join(f'<li><a href="{h}">{e(t)}</a></li>' for h, t in NAV)
ICON_G, WORD_G = data_uri('icon-green.webp'), data_uri('wordmark-green.webp')
header = f'''
<a class="skip" href="#main">דילוג לתוכן</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="brand" href="#top" aria-label="{e(C['businessName'])}, לראש העמוד">
      <img class="b-ic" src="{ICON_G}" width="200" height="132" alt=""><img class="b-wm" src="{WORD_G}" width="420" height="94" alt="">
    </a>
    <nav class="nav" aria-label="ראשי"><ul>{nav_html}</ul></nav>
    {wa_btn(cls='btn btn-wa hdr-wa')}
    <details class="mnav" data-mnav>
      <summary aria-label="תפריט"><span></span><span></span><span></span></summary>
      <div class="mnav-sheet"><ul>{nav_html}</ul>{wa_btn()}</div>
    </details>
  </div>
</header>'''

intro = O['intro']
hero = f'''
<section class="hero" id="top" aria-labelledby="h1">
  <picture class="hero-ph">
    <source media="(max-width: 699px)" srcset="img/img-033-hero-p560.webp 560w, img/img-033-hero-p800.webp 800w" sizes="100vw" width="800" height="1000">
    <img src="img/img-033-hero-2000.webp" srcset="img/img-033-hero-1280.webp 1280w, img/img-033-hero-2000.webp 2000w" sizes="100vw"
      width="2000" height="770" fetchpriority="high" alt="הדס דרכלי בשמלה ירוקה, מחייכת, מול קיר הכנס Brand Manager Day 2024">
  </picture>
  <div class="band">
    <div class="wrap band-in">
      <div class="band-t">
        <h1 id="h1">{e(O['tagline_options'][0])}</h1>
        <p class="band-line">{e(intro['heading'])}</p>
      </div>
      <div class="band-act" data-hero-cta>{wa_btn(cls='btn btn-wa btn-lg')}</div>
    </div>
  </div>
</section>'''

# the intro continues the band's line (its heading is the band line, so it is not repeated here)
ip = paras(intro['body'])
intro_s = f'''
<section class="intro" aria-label="{e(intro['heading'])}">
  <div class="wrap intro-in">
    <div class="intro-t">
      <p class="lead">{e(ip[0])}</p>
      <p>{e(ip[1])}</p>
      <a class="btn btn-ghost" href="#orgs">{e(O['path']['heading'])}</a>
    </div>
    <div class="intro-ph">{img('img-ig-01-intro', 'הדס בשמלה ירוקה על במה, מול שקופית BRAND THE CHANGE, מבט מהקהל', 900, 1125)}</div>
  </div>
</section>'''

# ---------------------------------------------------------------- what organisations commission
path_p = paras(O['path']['body'])
def split(p, s):
    if ':' in p: a, b = p.split(':', 1); return a.strip(), b.strip()
    t = s['title']                                   # p4 opens with the service's own title
    return (t, p[len(t):].strip()) if p.startswith(t) else (t, p)
def fmt_row(p, slug):
    s = svc[slug]; name, desc = split(p, s)
    fmt = e(s['format']) if s.get('format') and s['format'] not in desc else ''   # never repeat what the line says
    det = [x for x in (fmt, price(s)) if x]
    det_html = f'<p class="r-det">{" <span class=sep aria-hidden=true>|</span> ".join(det)}</p>' if det else ''
    return f'''<li class="frow" id="svc-{slug}">
  <span class="f-ic">{FMT_ICON[slug]}</span>
  <div class="f-main"><h3><a class="f-link" href="{e(PAGE[slug])}" target="_blank" rel="noopener">{e(name)}</a></h3><p class="f-desc">{e(desc)}</p>{det_html}</div>
  {wa_round(s['ctaText'], 'וואטסאפ להדס: ' + name)}
</li>'''
orgs = f'''
<section class="orgs" id="orgs" aria-labelledby="orgs-h">
  <div class="wrap narrow">
    <h2 id="orgs-h" class="sec-h">{e(O['path']['heading'])}</h2>
    <ul class="frows" id="talks">{''.join(fmt_row(p, s) for p, s in zip(path_p, O['path']['services']))}</ul>
    <div class="orgs-act">{wa_btn(cls='btn btn-wa btn-lg')}{AS_OF}</div>
  </div>
</section>'''

# ---------------------------------------------------------------- the award, in the judges' words (D1, D3)
aw = C['awards'][0]
award = f'''
<section class="award" aria-labelledby="award-h">
  <div class="wrap award-in">
    <img class="seal" src="img/img-040-award.webp" width="240" height="240" alt="חותם פרס המיתוג הישראלי 2022" loading="lazy">
    <h2 id="award-h" class="award-line">{e(O['proof']['award'])}</h2>
    <figure class="jq">
      <blockquote cite="{e(aw['url'])}"><p>{e(O['proof']['judgesQuote'])}</p></blockquote>
      <figcaption><a class="jq-src" href="{e(aw['url'])}" target="_blank" rel="noopener"><span>{e(O['proof']['judgesQuoteAttribution'])}</span>{I['ext']}</a></figcaption>
    </figure>
  </div>
</section>'''

# ---------------------------------------------------------------- logos (D2) + the talks
def logo(l):
    from PIL import Image
    iid = l['logo'].split(':')[1]
    w0, h0 = Image.open(DIST / 'img' / f'{iid}-logo.webp').size
    ar = w0 / h0
    w = (7400 * ar) ** .5; h = w / ar                 # one optical size: equal area per mark
    if h < 42: h = 42; w = h * ar
    if w > 200: w = 200; h = w / ar
    if h > 92: h = 92; w = h * ar
    return f'<li><img src="img/{iid}-logo.webp" width="{w0}" height="{h0}" style="--w:{w:.0f}px" alt="{e(l["name"])}" loading="lazy"></li>'
talks = ''
for t, u in zip(O['proof']['talks'], O['proof']['instagramLinks']):
    yr = re.match(r'ב-(\d{4})', t).group(1)
    talks += (f'<li><a class="talk" href="{e(u)}" target="_blank" rel="noopener"><span class="t-yr" aria-hidden="true">{yr}</span>'
              f'<span class="t-txt">{e(t)}</span><span class="t-go">{I["instagram"]}<span>לפוסט</span></span></a></li>')
grateful = f'''
<section class="grateful" aria-labelledby="gr-h">
  <div class="wrap">
    <h2 id="gr-h" class="sec-h">{e(O['proof']['heading'])}</h2>
    <ul class="logos">{''.join(logo(l) for l in C['clientLogos'])}</ul>
    <ul class="talks">{talks}</ul>
  </div>
</section>'''

# ---------------------------------------------------------------- the method: four photo panels
M = C['method']
PANEL = [('img-003-panel', 'משתתפת כותבת על קנבס הטבעות WHO ARE YOU? התלוי על הקיר'),
         ('img-032-panel', 'יד מחזיקה קלף של Brand the Change מעל שורת קלפים על שולחן עץ'),
         (None, 'מבט מלמעלה על שולחן סדנה: לוחות קולאז׳, גזירי מגזינים, מספריים, טושים וירק, וידיים בעבודה'),
         ('img-011-panel', 'מסך הבמה בכנס: הסמל של מותג מיטיב ליד הכותרת BRANDS OF CHANGE')]
def panel(i, s):
    im, alt = PANEL[i]
    if im: media = img(im, alt, 800, 1200, 'p-img')
    else:
        media = (f'<video class="p-img" muted loop playsinline preload="none" disablepictureinpicture poster="img/vid-004-poster.webp" '
                 f'width="464" height="696" aria-label="{e(alt)}" data-clip><source data-src="video/table-464x696.webm" type="video/webm">'
                 f'<source data-src="video/table-464x696.mp4" type="video/mp4"></video>')
    ps = paras(s['body'])
    return f'''<article class="panel" tabindex="0" aria-labelledby="st-{i}">
  <div class="p-media">{media}</div>
  <div class="p-txt">
    <div class="p-cap"><span class="p-label" lang="en" dir="ltr">{e(s['label'])}</span><h3 id="st-{i}">{e(s['title'])}</h3></div>
    <div class="p-body"><div><div class="p-clip" data-pclip>{''.join(f'<p>{e(x)}</p>' for x in ps)}</div><button class="p-more" type="button" hidden aria-expanded="false">קראו עוד</button></div></div>
  </div>
</article>'''
method = f'''
<section class="method" id="method" aria-labelledby="method-h">
  <div class="wrap method-head">
    <h2 id="method-h" class="sec-h">{e(M['name'])}</h2>
    <div class="m-intro">{P(M['intro'])}</div>
  </div>
  <div class="panels" data-panels>{''.join(panel(i, s) for i, s in enumerate(M['stages']))}</div>
  <div class="dots dots-light" data-pdots hidden></div>
</section>'''

# ---------------------------------------------------------------- testimonials (individuals, never labelled as organisations)
SLIDES = ['אנווה רצון', 'יובל אברהם - בונים לחיים', 'Julia Dojas - Heart of Hosting']
testi = f'''
<section class="testi" aria-labelledby="testi-h">
  <div class="wrap narrow">
    <h2 id="testi-h" class="sec-h">{e(C['mockup_extras']['testimonialsHeading'])}</h2>
    <div class="slider" data-slider>
      <div class="slides" tabindex="0" aria-label="המלצות">{''.join(f'<div class="slide" role="group" aria-roledescription="שקופית" aria-label="{i+1} מתוך {len(SLIDES)}">{quote(n)}</div>' for i, n in enumerate(SLIDES))}</div>
      <div class="dots" data-dots hidden>{''.join(f'<button type="button" aria-label="המלצה {i+1}"></button>' for i in range(len(SLIDES)))}</div>
    </div>
  </div>
</section>'''

# ---------------------------------------------------------------- also for owners and professionals
def orow(s):
    full = s.get('status') == 'full'
    chip = '<span class="chip chip-full">ההרשמה נסגרה</span>' if full else ''
    det = [x for x in (e(s['format']) if s.get('format') else '', price(s), chip) if x]
    det_html = f'<p class="r-det">{" <span class=sep aria-hidden=true>|</span> ".join(det)}</p>' if det else ''
    lab = ('עדכנו אותי בוואטסאפ: ' if full else 'וואטסאפ להדס: ') + s['title']
    return f'<li class="orow"><div><h4>{e(s["title"])}</h4><p class="o-sum">{e(s["summary"])}</p>{det_html}</div>{wa_round(s["ctaText"], lab)}</li>'
def grp(id_, label, items, extra=''):
    return (f'<details class="grp" id="{id_}"><summary><span class="g-t">{label}</span>{extra}<span class="g-ic">{I["plus"]}</span></summary>'
            f'<ul class="orows">{"".join(orow(s) for s in items)}</ul></details>')
pb = svc['personal-branding']
open_ws = [svc[x] for x in ('the-better-4', 'brand-and-breakfast', 'community-meetups')]
courses = [svc[x] for x in ('change-leaders-course', 'business-to-brand')]
iw = svc['intro-workshop']
indiv = f'''
<section class="indiv" id="individuals" aria-labelledby="ind-h">
  <div class="wrap ind-in">
    <h2 id="ind-h" class="sec-h">גם לבעלי עסקים ולאנשי מקצוע</h2>
    <div class="ind-lead">
      <h3>{e(pb['title'])}</h3>
      <p>{e(pb['summary'])}</p>
      <p class="r-det">{e(pb['format'])}</p>
      <div class="acts">{wa_btn(pb['ctaText'], 'לפרטים בוואטסאפ', 'btn btn-wa')}<a class="btn btn-ghost" href="{e(PAGE['personal-branding'])}" target="_blank" rel="noopener">לפרטים</a></div>
    </div>
    <div class="ind-list">
      {grp('open-ws', 'סדנאות פתוחות', open_ws, f'<span class="g-n">{len(open_ws)}</span>')}
      {grp('courses', e(block('קורסים')['heading']), courses, f'<span class="g-n">{len(courses)}</span>')}
      {grp('intro-ws', 'סדנת הכרות', [iw], '<span class="chip">ללא תשלום</span>')}
      {AS_OF}
    </div>
  </div>
</section>'''

# ---------------------------------------------------------------- the demo case study: a designed cover (L5)
cs = C['caseStudies'][0]
frame = lambda t: f'<div class="ph-frame">{I["img"]}<span>{t}</span></div>'
process = ''.join(f'<li><span class="p-label" lang="en" dir="ltr">{e(p["stage"])}</span><p>{e(p["body"])}</p></li>' for p in cs['process'])
ICON_W, ICON_M = data_uri('icon-white.webp'), data_uri('icon-mint.webp')
case = f'''
<section class="case" aria-labelledby="case-h">
  <div class="wrap">
    <h2 id="case-h" class="sec-h">מקרה בוחן</h2>
    <details class="case-card">
      <summary>
        <span class="case-art" aria-hidden="true"><img src="{ICON_M}" width="400" height="265" alt=""></span>
        <span class="case-txt"><span class="demo-badge">דוגמה</span>
          <span class="case-client">{e(cs['client'])} <span class="sep" aria-hidden="true">|</span> {e(cs['sector'])}</span>
          <span class="case-title">{e(cs['title'])}</span>
          <span class="btn btn-mint-ghost case-open">לצפייה במקרה הבוחן</span></span>
      </summary>
      <div class="case-body">
        <p class="demo-note">זהו מקרה בוחן לדוגמה, לא פרויקט אמיתי. כך ייראה עמוד פרויקט כשיתווסף פרויקט אמיתי.</p>
        <h4>האתגר</h4><p>{e(cs['challenge'])}</p>
        <div class="case-frames">{frame('תמונה לדוגמה | לפני')}{frame('תמונה לדוגמה | לפני')}</div>
        <h4>התהליך</h4><ol class="case-steps">{process}</ol>
        <h4>התוצאה</h4><p>{e(cs['outcome'])}</p>
        <div class="case-frames one">{frame('תמונה לדוגמה | אחרי')}</div>
        <figure class="quote"><blockquote><p>{e(cs['quote'])}</p></blockquote><figcaption><b>{e(cs['quoteAuthor'])}</b></figcaption></figure>
        <p class="credits">{e(cs['credits'])}</p>
      </div>
    </details>
  </div>
</section>'''

# ---------------------------------------------------------------- team (founder larger; bios on tap)
T = C['team']; team_b = block('צוות עם משמעות')
def member(m):
    pid = m['photo'].split(':')[1]
    founder = m.get('founder')
    pic = img('img-034-founder', 'הדס דרכלי צוחקת ליד קנבס הטבעות WHO ARE YOU?, בז׳קט צהוב', 700, 875) if founder \
        else img(pid + '-team', 'דיוקן של ' + m['name'], 520, 650)
    return (f'<article class="mem{" founder" if founder else ""}"><div class="m-ph">{pic}</div><div class="m-t"><h3>{e(m["name"])}</h3>'
            f'<p class="role">{e(m["role"])}</p><details class="bio"><summary>קראו עוד</summary>{P(m["bio"])}</details></div></article>')
team = f'''
<section class="team" id="team" aria-labelledby="team-h">
  <div class="wrap">
    <div class="team-head"><h2 id="team-h" class="sec-h">{e(team_b['heading'])}</h2><div class="sec-lede">{P(team_b['body'])}</div></div>
    <div class="mems">{''.join(member(m) for m in T)}</div>
  </div>
</section>'''

# ---------------------------------------------------------------- content: podcast + blog
air = block('ON AIR')
pod_btn = ''.join(f'<a class="btn btn-ghost" href="{e(l["url"])}" target="_blank" rel="noopener">{I[l["platform"]]}<span lang="en" dir="ltr">{"Spotify" if l["platform"]=="spotify" else "Apple Podcasts"}</span></a>' for l in C['podcast']['links'])
def date_he(d): y, m, dd = d.split('-'); return f'{int(dd)}.{int(m)}.{y}'
posts = sorted(C['posts'], key=lambda p: p['date'], reverse=True)
feat = next(p for p in posts if p['date'] == '2026-05-28')       # the newest post with a business-owned cover
others = [p for p in posts[:3] if p is not feat][:2]
content = f'''
<section class="content" id="content" aria-label="תוכן">
  <div class="wrap content-in">
    <div class="pod">
      {img('podcast-art', 'עטיפת הפודקאסט מותג מיטיב: הדס דרכלי, ידיים שלובות, על רקע סגול', 560, 560, 'pod-art')}
      <div class="pod-t"><h2 class="sec-h sm"><span lang="en" dir="ltr">ON AIR</span> {e(air['heading'].split('—', 1)[1].strip())}</h2>
        <p>{e(paras(air['body'])[1])}</p><div class="acts">{pod_btn}</div></div>
    </div>
    <div class="blog">
      <h2 class="sec-h sm">מהבלוג</h2>
      <a class="post" href="{e(feat['oldUrl'])}" target="_blank" rel="noopener">{img('post-2026-05-28', 'שורת ראשים שקופים בכחול, האחרון בוער בכתום', 800, 533)}
        <span class="post-t"><time datetime="{feat['date']}">{date_he(feat['date'])}</time><b>{e(feat['title'])}</b></span></a>
      <ul class="post-list">{''.join(f'<li><a href="{e(p["oldUrl"])}" target="_blank" rel="noopener"><time datetime="{p["date"]}">{date_he(p["date"])}</time><span>{e(p["title"])}</span></a></li>' for p in others)}</ul>
      <a class="btn btn-ghost" href="{CUR}/blog" target="_blank" rel="noopener">לבלוג המלא</a>
    </div>
  </div>
</section>'''

# ---------------------------------------------------------------- Instagram strip
ig_order = ['01', '08', '03', '02', '09', '11']
ig_url = {t['image'].split('-')[-1]: t['postUrl'] for t in C['instagramTiles']}
ig_alt = {'03': 'הדס בחולצה ירוקה מסדרת צבעים וצמחים על שולחן סדנה', '01': 'הדס בשמלה ירוקה על במה מול שקופית BRAND THE CHANGE',
          '02': 'הדס בשמלה מודפסת עלים מול קיר חטיפי שוקולד', '09': 'ידיים קושרות עטיפת מתנה מעלי בננה על שולחן עץ',
          '08': 'מסך הקרנה של כנס IMPACT NATION עם חצים וקודי QR', '11': 'כוס קפה וגזירי מגזינים בסדנת מפת חזון'}
insta = f'''
<section class="insta" aria-labelledby="ig-h">
  <div class="wrap ig-head"><h2 id="ig-h" class="sec-h">מותג מיטיב באינסטגרם</h2>
    <a class="btn btn-ghost" href="{e(social['instagram'])}" target="_blank" rel="noopener">{I['instagram']}<span lang="en" dir="ltr">@mutagmeitiv</span></a></div>
  <ul class="ig">{''.join(f'<li><a href="{e(ig_url[i])}" target="_blank" rel="noopener">{img("img-ig-" + i, ig_alt[i], 520, 520)}</a></li>' for i in ig_order)}</ul>
</section>'''

# ---------------------------------------------------------------- closing + footer
closing = f'''
<section class="closing" id="book" aria-labelledby="close-h">
  <picture class="close-ph">
    <source media="(max-width: 699px)" srcset="img/img-c05-close-p900.webp" width="900" height="675">
    <img src="img/img-c05-close-1600.webp" width="1600" height="533" loading="lazy" decoding="async" alt="שמונה נשים מחזיקות את לוחות הקולאז׳ שהכינו בסדנה, מחייכות">
  </picture>
  <div class="close-band"><div class="wrap close-in" data-nobar>
    <h2 id="close-h" class="close-t">{e(C['closing'])}</h2>
    <div class="acts">{wa_btn(cls='btn btn-wa btn-lg')}<a class="btn btn-light btn-lg" href="{e(CAL['url'])}" target="_blank" rel="noopener">{I['cal']}<span>{e(CAL['label'])}</span></a></div>
  </div></div>
</section>'''

dl = C['downloads'][0]
year = datetime.date.today().year
soc = ''.join(f'<a class="soc" href="{e(s["url"])}" target="_blank" rel="noopener" aria-label="{SOC_LABEL[s["platform"]]}">{I[s["platform"]]}</a>' for s in C['socialLinks'])
footer = f'''
<footer class="ftr" data-ftr>
  <div class="wrap ftr-in">
    <div class="ftr-brand"><img src="{ICON_W}" width="400" height="265" alt="{e(C['businessName'])}" class="ftr-ic">
      <p>{e(C['tagline'])}</p><div class="socs">{soc}</div></div>
    <div class="ftr-contact"><h2>{e(block('פה יוצרים קשר')['heading'])}</h2>
      <div class="pills">{wa_btn(label='וואטסאפ', cls='pill pill-wa')}
        <a class="pill" href="tel:{TEL}">{I['phone']}<span dir="ltr">{TEL_SHOW}</span></a>
        <a class="pill" href="mailto:{MAIL}">{I['mail']}<span dir="ltr">{MAIL}</span></a>
        <a class="pill" href="{e(dl['file'])}" target="_blank" rel="noopener">{I['pdf']}<span>{e(dl['label'])}</span></a></div></div>
    <nav class="ftr-nav" aria-label="ניווט באתר"><h2>ניווט</h2><ul>{nav_html}<li><a href="#content">תוכן</a></li><li><a href="{CUR}/הצהרת-נגישות">הצהרת נגישות</a></li></ul></nav>
  </div>
  <div class="wrap ftr-base"><span>© {year} {e(C['businessName'])}</span>{''.join(f'<span>{e(c)}</span>' for c in C['mockup_extras']['footerCredits'])}</div>
</footer>
<div class="bar" data-bar>{wa_btn(cls='btn btn-wa bar-btn', extra=' tabindex="-1"')}</div>'''

# ---------------------------------------------------------------- assemble
import os
FIRST = os.environ.get('FIRST') == '1'   # look loop: the first screen alone, before the rest is built
body_html = hero if FIRST else hero + intro_s + orgs + award + grateful + method + testi + indiv + case + team + content + insta + closing
footer_html = '' if FIRST else footer
css = (HERE / 'page.css').read_text()
for w in (400, 600):
    for sub in ('hebrew', 'latin'):   # Plex inlined: one self-contained file, no font request, no swap
        b64 = base64.b64encode((DIST / f'fonts/plex-{w}-{sub}.woff2').read_bytes()).decode()
        css = css.replace(f'url(fonts/plex-{w}-{sub}.woff2)', f'url(data:font/woff2;base64,{b64})')
js = (HERE / 'page.js').read_text()
doc = f'''<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(C['businessName'])} | {e(O['tagline_options'][0].rstrip('.'))}</title>
<meta name="description" content="{e(ip[0])}">
<meta name="robots" content="noindex">
<link rel="preload" as="image" href="img/img-033-hero-2000.webp" imagesrcset="img/img-033-hero-1280.webp 1280w, img/img-033-hero-2000.webp 2000w" imagesizes="100vw" media="(min-width: 700px)">
<link rel="preload" as="image" href="img/img-033-hero-p800.webp" imagesrcset="img/img-033-hero-p560.webp 560w, img/img-033-hero-p800.webp 800w" imagesizes="100vw" media="(max-width: 699px)">
<style>{css}</style>
</head>
<body>
{header}
<main id="main">
{body_html}
</main>
{footer_html}
<script>{js}</script>
</body>
</html>'''
(DIST / 'index.html').write_text(doc)
print('wrote', DIST / 'index.html', len(doc), 'bytes')
