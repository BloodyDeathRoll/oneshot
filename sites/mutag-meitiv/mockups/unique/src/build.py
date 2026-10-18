#!/usr/bin/env python3
"""Builds dist/index.html (one self-contained page) for the unique mockup "מפת חזון".

Every visible word of business copy is read from sites/mutag-meitiv/copy/he.json, never retyped;
the WhatsApp number and Calendly URL come from the same file (contact / bookingLinks / services).
Interface labels (button words, section labels the schema has no field for) live here.
CSS and JS are inlined from style.css and app.js. Run: python3 sites/mutag-meitiv/mockups/unique/src/build.py
"""
import json, html, pathlib, urllib.parse, datetime

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
C = json.loads((ROOT / 'sites/mutag-meitiv/copy/he.json').read_text())
OUT = HERE.parent / 'dist' / 'index.html'

e = lambda s: html.escape(s or '', quote=True)
WA_NUM = C['contact']['whatsapp'].lstrip('+')
PHONE = C['contact']['phone']
PHONE_LOCAL = '0' + PHONE[4:6] + '-' + PHONE[6:9] + '-' + PHONE[9:]
EMAIL = C['contact']['email']
CAL = C['bookingLinks'][0]
DEFAULT_LINE = 'היי הדס, הגעתי מהאתר של מותג מיטיב.'
wa = lambda text=DEFAULT_LINE: f'https://wa.me/{WA_NUM}?text=' + urllib.parse.quote(text)
svc = {s['slug']: s for s in C['services']}
tst = {t['author']: t for t in C['testimonials']}
blocks = C['copyBlocks']
blk = lambda heading: next(b for b in blocks if b['heading'].startswith(heading))
paras = lambda s: [p.strip() for p in (s or '').split('\n\n') if p.strip()]
X = C['mockup_extras']

def ptext(s):
    """paragraphs, single newlines become <br>"""
    return ''.join(f'<p>{"<br>".join(e(l) for l in p.split(chr(10)))}</p>' for p in paras(s))

ICON = {
 'wa': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 5 5 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.6-.4Z" fill="currentColor"/></svg>',
 'phone': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.2Z" fill="currentColor"/></svg>',
 'mail': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4 7.3V17h16V7.3l-8 4.9Zm0-2.3L19.2 7H4.8L12 9.9Z" fill="currentColor"/></svg>',
 'instagram': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.5.5A5 5 0 0 0 2.6 5.4c-.3.7-.5 1.4-.5 2.5C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.5a5 5 0 0 0 2.8 2.8c.7.3 1.4.5 2.5.5 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c1.1 0 1.8-.2 2.5-.5a5 5 0 0 0 2.8-2.8c.3-.7.5-1.4.5-2.5.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.5a5 5 0 0 0-2.8-2.8c-.7-.3-1.4-.5-2.5-.5C15.1 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 1 0 1.5.2 1.9.3.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.4.3.9.3 1.9.1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.1-.9.3-1.9.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.5-.2-1.9-.3a3.2 3.2 0 0 1-1.2-.8 3.2 3.2 0 0 1-.8-1.2c-.1-.4-.3-.9-.3-1.9-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.5.3-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.1.9-.3 1.9-.3 1-.1 1.3-.1 4-.1Z" fill="currentColor"/></svg>',
 'linkedin': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z" fill="currentColor"/></svg>',
 'spotify': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.6.6 0 0 1-.9.2c-2.4-1.5-5.4-1.8-8.9-1a.6.6 0 1 1-.3-1.2c3.9-.9 7.2-.5 9.9 1.1.3.2.4.6.2.9Zm1.2-2.7a.8.8 0 0 1-1.1.3c-2.7-1.7-6.9-2.2-10.1-1.2a.8.8 0 1 1-.5-1.5c3.7-1.1 8.3-.6 11.4 1.3.4.2.5.7.3 1.1Zm.1-2.8C14.7 9 9.4 8.8 6.3 9.7a1 1 0 1 1-.5-1.8c3.5-1.1 9.4-.9 13.1 1.3a1 1 0 0 1-1 1.7Z" fill="currentColor"/></svg>',
 'apple_podcasts': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9 9 0 0 0-4 17.1v-2a7.3 7.3 0 1 1 8 0v2A9 9 0 0 0 12 2Zm0 3.6a5.4 5.4 0 0 0-3 9.9V13.4a3.6 3.6 0 1 1 6 0v2.1a5.4 5.4 0 0 0-3-9.9Zm0 4.1a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm-1.2 4.8c-.6 0-1 .5-.9 1.1l.6 5.3c.1.6.7 1.1 1.5 1.1s1.4-.5 1.5-1.1l.6-5.3c.1-.6-.3-1.1-.9-1.1h-2.4Z" fill="currentColor"/></svg>',
 'arrow': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 5.3 8 12l6.7 6.7 1.4-1.4L10.8 12l5.3-5.3-1.4-1.4Z" fill="currentColor"/></svg>',
 'cal': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2Zm12 8H5v9h14v-9ZM5 6v2h14V6H5Z" fill="currentColor"/></svg>',
}
SOC_LABEL = {'instagram': 'אינסטגרם', 'linkedin': 'לינקדאין', 'spotify': 'ספוטיפיי', 'apple_podcasts': 'אפל פודקאסטים'}

HEART = 'M300 520 C 250 472, 30 342, 30 182 C 30 92, 100 30, 186 30 C 240 30, 280 60, 300 100 C 320 60, 360 30, 414 30 C 500 30, 570 92, 570 182 C 570 342, 350 472, 300 520 Z'

def btn_wa(text=DEFAULT_LINE, label='כתבו להדס בוואטסאפ', cls='btn btn-wa'):
    return f'<a class="{cls}" href="{e(wa(text))}" target="_blank" rel="noopener">{ICON["wa"]}<span>{label}</span></a>'

def price(s):
    if s.get('price') is None: return ''
    if s['price'] == 0: return ''  # the coral 'חינם' strip carries it
    unit = {'per_person': 'למשתתף', 'flat': ''}.get(s.get('unit'), '')
    vat = '+ מע״מ' if s.get('vat') == 'excluded' else ''
    small = ' · '.join(x for x in (vat, unit) if x)
    return f'<p class="price"><b>{s["price"]:,} ₪</b>{f"<small>{small}</small>" if small else ""}</p>'

import re as _re
_LAT = _re.compile(r'^[A-Za-z0-9 &\-\'.]+$')
def split_title(t):
    """Latin-only segments of a mixed title become a small kicker line (all words kept, in order)."""
    parts = [p.strip() for p in t.split(' — ')]
    lat = [p for p in parts if _LAT.match(p)]; heb = [p for p in parts if not _LAT.match(p)]
    if not lat or not heb: return '', t
    return ' — '.join(lat), ' — '.join(heb)

def offer_card(s):
    kick, title = split_title(s['title'])
    kick_html = f'<p class="kicker" lang="en" dir="ltr">{e(kick)}</p>' if kick else ''
    fmt = f'<p class="fmt">{e(s["format"])}</p>' if s.get('format') else ''
    full = '<span class="chip chip-full">מלא · ההרשמה סגורה</span>' if s.get('status') == 'full' else ''
    free = ' is-free' if s.get('price') == 0 else ''
    return f'''<article class="offer{free}">
  {('<span class="free-strip">חינם</span>' if free else '')}
  {kick_html}<h4>{e(title)}</h4>
  {fmt}
  <p class="aud">{e(s["audience"])}</p>
  <div class="offer-foot">{price(s)}{full}{btn_wa(s["ctaText"], "כתבו להדס", "btn btn-green btn-sm")}</div>
</article>'''

_qn = [0]
def excerpt(q, lim=150):
    """the quote's own opening words, cut at a sentence end if one falls in range, else at a word"""
    flat = q.replace('\n', ' ').strip().lstrip('״')
    if len(flat) <= lim + 30: return None
    for m in _re.finditer(r'[.!?](\s|$)', flat):
        if 50 <= m.end() <= lim + 20: cut = flat[:m.end()].strip(); return cut if cut.endswith(('.', '!', '?')) else cut
    return flat[:flat.rfind(' ', 0, lim)].rstrip(',;:- ') + '…'

def quote(t, cls='q', clamp=False):
    lang = t.get('lang', 'he')
    _qn[0] += 1; qid = f'q{_qn[0]}'
    ex = excerpt(t['quote'])
    more = f'<button type="button" class="more" aria-expanded="false" aria-controls="{qid}">קראו עוד</button>' if ex else ''
    body = (f'<p class="ex">{e(ex)}</p><div class="full" id="{qid}">{ptext(t["quote"])}</div>') if ex else ptext(t['quote'])
    if ex: cls += ' has-ex'
    attrs = ' lang="en" dir="ltr"' if lang == 'en' else ''
    role = f'<span class="role">{e(t["role"])}</span>' if t.get('role') else ''
    return f'''<figure class="{cls}"{attrs}>
  <blockquote>{body}</blockquote>{more}
  <figcaption><b>{e(t["author"])}</b>{role}</figcaption>
</figure>'''

# ---------------------------------------------------------------- sections
pb, sp = svc['personal-branding'], svc['strategic-planning']
intro = blk('הי, הגעת')
talks = blk('הרצאות וסדנאות'); courses = blk('קורסים')
team_blk = blk('צוות עם משמעות'); air = blk('ON AIR')
M = C['method']
award = C['awards'][0]; cred = C['credentials'][0]

def lead_card(s, img, alt, n):
    chips = ''.join(f'<span class="chip">{e(x)}</span>' for x in [s.get('format')] if x)
    return f'''<article class="lead" id="{s["slug"]}">
  <div class="lead-photo"><img src="img/{img}" width="960" height="720" loading="lazy" decoding="async" alt="{e(alt)}"></div>
  <div class="lead-body">
    <p class="lead-n">0{n}</p>
    <h3>{e(s["title"])}</h3>
    <p class="lead-sum">{e(s["summary"])}</p>
    <p class="lead-aud"><span>למי</span>{e(s["audience"])}</p>
    {('<div class="chips">' + chips + '</div>') if chips else ''}
    <div class="actions">{btn_wa(s["ctaText"])}<a class="btn btn-soft" href="{OLD_PAGE[s["slug"]]}">לפרטים{ICON["arrow"]}</a></div>
  </div>
</article>'''

# until the service pages exist (4g), 'לפרטים' opens the current site's page for that service (dossier.pages)
OLD_PAGE = {'personal-branding': 'https://www.mutagmeitiv.com/personal101', 'strategic-planning': 'https://www.mutagmeitiv.com/process'}

STAGE_IMG = {
 'SENSING': ('stage-sensing-560.webp', 'משתתפת כותבת על קנבס ״WHO ARE YOU?״ גדול התלוי על הקיר'),
 'THINKING': ('stage-thinking-560.webp', 'יד מחזיקה קלף מעל שורת קלפים של Brand the Change על שולחן עץ'),
 'MAKING': None,
 'INFLUENCING': ('stage-influencing-560.webp', 'הדס על הבמה בשמלה ירוקה מול מסך ״BRAND THE CHANGE — Using brands as a force for good״'),
}
PIECE_POS = {'SENSING': 's1', 'THINKING': 's2', 'MAKING': 's3', 'INFLUENCING': 's4'}

def piece(label, extra=''):
    if label == 'MAKING':
        inner = ('<video class="leaves" muted loop playsinline preload="none" poster="img/leaves-poster.webp" aria-hidden="true" '
                 'data-webm="video/leaves-560.webm" data-mp4="video/leaves-560.mp4" width="560" height="700"></video>'
                 '<img class="vposter" src="img/leaves-poster.webp" width="560" height="700" loading="lazy" decoding="async" alt="ידיים עוטפות מתנה בעלי בננה וחוט על שולחן עץ">')
    else:
        src, alt = STAGE_IMG[label]
        inner = f'<img src="img/{src}" width="560" height="700" loading="lazy" decoding="async" alt="{e(alt)}">'
    return f'<div class="piece {PIECE_POS[label]}{extra}" data-stage="{label}">{inner}</div>'

stages_html = ''
for i, st in enumerate(M['stages'], 1):
    stages_html += f'''<article class="stage" data-stage="{st["label"]}" id="stage-{st["label"].lower()}">
  <div class="stage-piece">{piece(st["label"], " flat")}</div>
  <p class="stage-label"><span class="stage-n">{i}/4</span>{st["label"]}</p>
  <h3>{e(st["title"])}</h3>
  <div class="stage-body">{ptext(st["body"])}</div>
</article>'''

prog = ''.join(f'<li data-stage="{s["label"]}">{s["label"]}</li>' for s in M['stages'])
board_pieces = ''.join(piece(s['label']) for s in M['stages'])

logos = ''.join(f'<li><img src="img/logo-{int(l["logo"].split("-")[1])}.webp" alt="{e(l["name"])}" loading="lazy" decoding="async"></li>' for l in C['clientLogos'])

talk_cards = ''.join(offer_card(s) for s in C['services'] if s['group'] == 'talks_workshops')
course_cards = ''.join(offer_card(s) for s in C['services'] if s['group'] == 'courses')

cs = C['caseStudies'][0]
slides_order = ['רננה אורלב', 'Linda friedrich @ambartique', 'יובל אברהם - בונים לחיים', 'איה', 'AMBARTIQUE@לינדה', 'קרן']
slides = ''.join(f'<li class="slide" aria-roledescription="שקופית" aria-label="{i+1} מתוך {len(slides_order)}">{quote(tst[a], "q q-big")}</li>' for i, a in enumerate(slides_order))
dots = ''.join(f'<button type="button" class="dot" aria-label="ציטוט {i+1}"></button>' for i in range(len(slides_order)))

def team_card(m, img, founder=False):
    return f'''<article class="member{' founder' if founder else ''}">
  <div class="member-photo"><img src="img/{img}" width="560" height="700" loading="lazy" decoding="async" alt="{e(m["name"])}"></div>
  <div class="member-body">
    <h3>{e(m["name"])}</h3>
    <p class="member-role">{e(m["role"])}</p>
    <div class="bio" id="bio-{img[5:-5].split('-')[0]}">{ptext(m["bio"])}</div>
    <button type="button" class="more" aria-expanded="false" aria-controls="bio-{img[5:-5].split('-')[0]}">קראו עוד</button>
  </div>
</article>'''
TEAM_IMG = ['team-hadas-010.webp', 'team-tamar.webp', 'team-yael.webp', 'team-dana.webp', 'team-lior.webp']
team_html = ''.join(team_card(m, TEAM_IMG[i], m.get('founder')) for i, m in enumerate(C['team']))

posts = sorted(C['posts'], key=lambda p: p['date'], reverse=True)[:3]
def hdate(d):
    y, m, dd = d.split('-'); return f'{int(dd)}.{int(m)}.{y}'
post_html = ''.join(f'''<article class="post"><a href="{e(p["oldUrl"])}">
  <time datetime="{p["date"]}">{hdate(p["date"])}</time>
  <h3>{e(p["title"])}</h3>
  <p>{e(p["excerpt"])}</p>
  <span class="post-more">לקריאה{ICON["arrow"]}</span>
</a></article>''' for p in posts)

IG = ['03', '02', '08', '11', '04', '12']
ig_by = {t['image'].split('img-ig-')[1]: t['postUrl'] for t in C['instagramTiles']}
IG_ALT = {'03': 'הדס בחולצה ירוקה מסדרת צבעים וצמחים על שולחן סדנה', '02': 'הדס בשמלה עם הדפס עלים מול קיר חפיסות שוקולד צבעוניות',
          '08': 'מסך הקרנה ״IMPACT NATION un-conference״', '11': 'כוס קפה וגזרי מגזינים על שולחן סדנת מפת חזון',
          '04': 'כרטיס טקסט ״מצפן לצפון״ — לדמיין את המרחב הצפוני 2030 — הדס דרכלי', '12': 'כרטיס בצבע אלמוג ״Meet AIR-INK #circular economy״'}
ig_html = ''.join(f'<li><a href="{e(ig_by[i])}" target="_blank" rel="noopener"><img src="img/ig-{i}.webp" width="480" height="480" loading="lazy" decoding="async" alt="{e(IG_ALT[i])}"></a></li>' for i in IG)

soc = ''.join(f'<a class="soc" href="{e(s["url"])}" target="_blank" rel="noopener" aria-label="{SOC_LABEL[s["platform"]]}">{ICON[s["platform"]]}</a>' for s in C['socialLinks'])
pod_links = ''.join(f'<a class="btn btn-light" href="{e(l["url"])}" target="_blank" rel="noopener">{ICON[l["platform"]]}<span>{SOC_LABEL[l["platform"]]}</span></a>' for l in C['podcast']['links'])

NAV = [('מיתוג אישי לעסק', '#personal-branding'), ('תכנון אסטרטגי למותג', '#strategic-planning'),
       ('הרצאות וסדנאות', '#talks'), ('קורסים', '#courses'), ('אודות', '#team'), ('תוכן', '#content')]
nav_html = ''.join(f'<li><a href="{h}">{t}</a></li>' for t, h in NAV)

proc = {p['stage']: p['body'] for p in cs['process']}
cs_stages = ''.join(f'<div class="cs-piece {PIECE_POS[k]}"><p class="stage-label">{k}</p><p>{e(v)}</p></div>' for k, v in proc.items())

year = datetime.date.today().year
_m = C['featureLine'].split(', ')
_m = [_m[0] + ',', _m[1] + ',', ', '.join(_m[2:])]
motto_html = ' '.join(f'<span class="strip">{e(x)}</span>' for x in _m)
_h = intro['heading'].split('הגעת ')
h1_html = f'<span class="strip">{e(_h[0])}הגעת </span><span class="strip">{e(_h[1])}</span>'
acc = C['legal']
css = (HERE / 'style.css').read_text()
import base64
masks = ''  # CSS masks are CORS-fetched: inline them so the page works from file:// too; placed at the end of <body>
for n, var in (('logo-icon', '--icon'), ('logo-wordmark', '--wordmark')):
    b64 = base64.b64encode((OUT.parent / 'img' / f'{n}.webp').read_bytes()).decode()
    masks += f'{var}:url(data:image/webp;base64,{b64});'
css = css.replace('--icon:url(img/logo-icon.webp); --wordmark:url(img/logo-wordmark.webp);', '')
js = (HERE / 'app.js').read_text()

page = f'''<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>מותג מיטיב — {e(C["tagline"]).rstrip(".")}</title>
<meta name="description" content="{e(intro["body"].replace(chr(10), " "))}">
<script>document.documentElement.classList.add('js')</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&family=Heebo:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="img/hadas-forest-480.webp" fetchpriority="high">
<style>{css}</style>
</head>
<body>
<a class="skip" href="#main">דילוג לתוכן</a>
<header class="site-head" id="top">
  <div class="wrap head-row">
    <a class="brand" href="#top" aria-label="{e(C["businessName"])} — לדף הבית"><span class="mark" aria-hidden="true"></span><span class="word" aria-hidden="true"></span></a>
    <nav class="nav" aria-label="ראשי"><ul>{nav_html}</ul></nav>
    {btn_wa(cls="btn btn-wa head-cta")}
    <details class="mnav"><summary aria-label="תפריט"><span></span><span></span><span></span></summary><nav aria-label="תפריט נייד"><ul>{nav_html}</ul></nav></details>
  </div>
</header>

<main id="main">
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="board hero-board">
      <svg class="heart" viewBox="0 0 600 540" aria-hidden="true"><path d="{HEART}"/></svg>
      <div class="piece hp-clip" aria-hidden="true">
        <video class="table" muted loop playsinline preload="none" poster="img/table-poster.webp" width="464" height="832" data-webm="video/table-464.webm" data-mp4="video/table-464.mp4"></video>
        <img class="vposter" src="img/table-poster.webp" width="464" height="832" alt="" decoding="async">
      </div>
      <div class="piece hp-photo"><img src="img/hadas-forest-480.webp" srcset="img/hadas-forest-480.webp 480w, img/hadas-forest-720.webp 720w" sizes="(min-width: 900px) 300px, 220px" width="480" height="600" fetchpriority="high" decoding="async" alt="הדס דרכלי מחייכת ביער אורנים, בחולצה ירוקה"></div>
      <a class="sticker" href="{e(award["url"])}" target="_blank" rel="noopener">
        <img src="img/award-seal.webp" width="240" height="240" alt="" decoding="async">
        <span>פרס המיתוג הישראלי {award["year"]}</span>
      </a>
    </div>
    <div class="hero-text">
      <h1 id="h1">{h1_html}</h1>
      <p class="tagline">{e(C["tagline"])}</p>
      <div class="hero-cta" id="hero-cta">{btn_wa(cls="btn btn-wa btn-lg")}</div>
    </div>
  </div>
</section>

<section class="leads" aria-labelledby="h-tools">
  <div class="wrap">
    <h2 id="h-tools" class="sec-title">{e(X["homeToolsHeading"])}</h2>
    <p class="sec-lede">{e(paras(intro["body"])[1])}</p>
    <div class="lead-grid">
      {lead_card(pb, "svc-personal-960.webp", "הדס בז׳קט צהוב צוחקת ליד קנבס ״WHO ARE YOU?״ של Brand the Change, ספרייה מאחור", 1)}
      {lead_card(sp, "svc-strategic-960.webp", "קנבס עגול של Brand the Change על שולחן ליד חלון, עם עציצים, טושים ומחברות", 2)}
    </div>
    <div class="outcomes">
      {quote(tst["אנווה רצון"], "q q-out", clamp=True)}
      {quote(tst["Julia Dojas - Heart of Hosting"], "q q-out q-short")}
    </div>
  </div>
</section>

<section class="motto" aria-label="המוטו">
  <p class="strips">{motto_html}</p>
</section>

<section class="method" id="method" aria-labelledby="h-method">
  <div class="wrap">
    <h2 id="h-method" class="sec-title">{e(M["name"])}</h2>
    <div class="sec-lede">{ptext(M["intro"])}</div>
    <div class="sp" data-sp>
      <div class="sp-stages">{stages_html}</div>
      <div class="sp-board-col" aria-hidden="true">
        <div class="board sp-board" data-loading="true">
          <svg class="heart" viewBox="0 0 600 540"><path d="{HEART}"/></svg>
          {board_pieces}
          <p class="sp-load">טוען את הלוח…</p>
        </div>
        <ol class="sp-prog" lang="en" dir="ltr">{prog}</ol>
      </div>
    </div>
  </div>
</section>

<section class="proof" aria-labelledby="h-logos">
  <div class="wrap">
    <div class="proof-row">
      <a class="proof-card" href="{e(award["url"])}" target="_blank" rel="noopener">
        <img src="img/award-seal.webp" width="240" height="240" alt="חותם פרס המיתוג הישראלי 2022" loading="lazy" decoding="async">
        <span><b>{e(award["label"])}</b><small>{e(award["issuer"])} · {e(award["project"])}</small></span>
      </a>
      <a class="proof-card" href="{e(cred["url"])}" target="_blank" rel="noopener">
        <img src="img/btc-trainer.webp" width="240" height="240" alt="חותם CERTIFIED TRAINER — BRAND THE CHANGE" loading="lazy" decoding="async">
        <span><b>{e(cred["label"])}</b><small>{e(cred["issuer"])}</small></span>
      </a>
    </div>
    <h2 id="h-logos" class="sec-title sm">{e(X["clientLogosHeading"])}</h2>
    <ul class="logos">{logos}</ul>
  </div>
</section>

<section class="offers" id="talks" aria-labelledby="h-talks">
  <div class="moment">
    <picture><source media="(max-width: 899px)" srcset="img/moment-easel-800.webp"><img src="img/moment-easel-1600.webp" width="1600" height="640" loading="lazy" decoding="async" alt="הדס, בגבה למצלמה, מציגה לוח קולאז׳ על כן ציור בחלל סדנה"></picture>
    <div class="wrap moment-cap"><h2 id="h-talks" class="sec-title"><span class="strip">{e(talks["heading"])}</span></h2></div>
  </div>
  <div class="wrap">
    <p class="sec-lede offers-lede">{e(paras(talks["body"])[0])}</p>
    <div class="offer-row">{talk_cards}</div>
  </div>
</section>

<section class="courses band-deep" id="courses" aria-labelledby="h-courses">
  <div class="wrap">
    <h2 id="h-courses" class="sec-title">{e(courses["heading"])}</h2>
    <p class="sec-lede">{e(paras(courses["body"])[0])}</p>
    <div class="offer-row three">{course_cards}</div>
  </div>
</section>

<section class="case" id="work" aria-labelledby="h-case">
  <div class="wrap">
    <a class="case-tile" href="#work-{cs["slug"]}">
      <div class="case-cover" aria-hidden="true">
        <svg class="heart" viewBox="0 0 600 540"><path d="{HEART}"/></svg>
        {''.join(f'<span class="note {PIECE_POS[k]}">{k}</span>' for k in proc)}
      </div>
      <div class="case-body">
        <span class="demo-strip">דוגמה</span>
        <p class="case-client">{e(cs["client"])} · {e(cs["sector"])}</p>
        <h2 id="h-case">{e(cs["title"])}</h2>
        <p>{e(cs["challenge"])}</p>
        <span class="btn btn-soft">למקרה הבוחן לדוגמה{ICON["arrow"]}</span>
      </div>
    </a>
  </div>
</section>

<section class="voices band-green" aria-labelledby="h-voices">
  <div class="wrap">
    <h2 id="h-voices" class="sec-title">{e(X["testimonialsHeading"])}</h2>
    <div class="slider" data-slider>
      <ul class="slides" tabindex="0" aria-label="ציטוטים">{slides}</ul>
      <div class="slider-nav"><button type="button" class="arr prev" aria-label="הקודם">{ICON["arrow"]}</button><div class="dots">{dots}</div><button type="button" class="arr next" aria-label="הבא">{ICON["arrow"]}</button></div>
    </div>
  </div>
</section>

<section class="team" id="team" aria-labelledby="h-team">
  <div class="wrap">
    <h2 id="h-team" class="sec-title">{e(team_blk["heading"])}</h2>
    <div class="sec-lede">{ptext(team_blk["body"])}</div>
    <div class="team-grid">{team_html}</div>
  </div>
</section>

<div id="content">
<section class="air" aria-labelledby="h-air">
  <div class="wrap air-row">
    <div>
      <h2 id="h-air">{e(air["heading"])}</h2>
      <p>{e(paras(air["body"])[0])}</p>
    </div>
    <div class="air-links">{pod_links}</div>
  </div>
</section>

<section class="blog" aria-labelledby="h-blog">
  <div class="wrap">
    <div class="blog-head"><h2 id="h-blog" class="sec-title">מאמרים אחרונים</h2><a class="btn btn-soft" href="{e(C.get("blogUrl") or "https://www.mutagmeitiv.com/blog")}">לבלוג המלא{ICON["arrow"]}</a></div>
    <div class="post-grid">{post_html}</div>
  </div>
</section>
</div>

<section class="insta" aria-labelledby="h-ig">
  <div class="wrap insta-head">
    <h2 id="h-ig" class="sec-title">מותג מיטיב באינסטגרם</h2>
    <a class="btn btn-soft" href="{e(C["socialLinks"][0]["url"])}" target="_blank" rel="noopener">{ICON["instagram"]}<span dir="ltr">@mutagmeitiv</span></a>
  </div>
  <ul class="ig">{ig_html}</ul>
</section>

<section class="closing" id="book" aria-labelledby="h-close">
  <div class="wrap">
    <div class="closing-photo"><img src="img/closing-boards-1600.webp" srcset="img/closing-boards-800.webp 800w, img/closing-boards-1600.webp 1600w" sizes="(min-width: 1280px) 1232px, 100vw" width="1600" height="700" loading="lazy" decoding="async" alt="שמונה נשים עומדות יחד ומחזיקות את לוחות הקולאז׳ שהכינו בסדנה, מחייכות"></div>
    <div class="closing-card">
      <h2 id="h-close">{e(C["closing"])}</h2>
      <div class="actions center">{btn_wa(cls="btn btn-wa btn-lg")}<a class="btn btn-soft btn-lg" href="{e(CAL["url"])}" target="_blank" rel="noopener">{ICON["cal"]}<span>לקביעת שיחה בזום</span></a></div>
    </div>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <span class="foot-mark" role="img" aria-label="{e(C["businessName"])}"></span>
      <p>{e(C["tagline"])}</p>
      <div class="socs">{soc}</div>
    </div>
    <div class="foot-contact">
      <h2>פה יוצרים קשר</h2>
      <a class="pill" href="{e(wa())}" target="_blank" rel="noopener">{ICON["wa"]}<span>וואטסאפ</span></a>
      <a class="pill" href="tel:{PHONE}">{ICON["phone"]}<span dir="ltr">{PHONE_LOCAL}</span></a>
      <a class="pill" href="mailto:{EMAIL}">{ICON["mail"]}<span>{EMAIL}</span></a>
    </div>
    <nav class="foot-nav" aria-label="ניווט תחתון"><h2>ניווט מהיר</h2><ul>{nav_html}<li><a href="#accessibility">הצהרת נגישות</a></li></ul></nav>
  </div>
  <div class="foot-base-bar"><div class="wrap foot-base"><p>{" · ".join(e(x) for x in X["footerCredits"])}</p><p>© {year} {e(C["businessName"])}</p></div></div>
</footer>

<div class="mbar" data-mbar><span class="mbar-what">{e(C["businessName"])}</span>{btn_wa(cls="btn btn-wa")}</div>

<section class="sheet" id="work-{cs["slug"]}" role="dialog" aria-modal="true" aria-labelledby="cs-title" tabindex="-1">
  <div class="sheet-in">
    <a class="sheet-close" href="#work" aria-label="סגירה">×</a>
    <p class="demo-banner"><span class="demo-strip">דוגמה</span> מקרה בוחן לדוגמה, לא פרויקט אמיתי</p>
    <p class="case-client">{e(cs["client"])} · {e(cs["sector"])}</p>
    <h2 id="cs-title"><span class="strip">{e(cs["title"])}</span></h2>
    <div class="cs-grid">
      <div class="cs-text">
        <h3>האתגר</h3><p>{e(cs["challenge"])}</p>
        <h3>התוצאה</h3><p>{e(cs["outcome"])}</p>
        <figure class="q q-big"><blockquote><p>{e(cs["quote"])}</p></blockquote><figcaption><b>{e(cs["quoteAuthor"])}</b></figcaption></figure>
      </div>
      <div class="cs-board"><svg class="heart" viewBox="0 0 600 540" aria-hidden="true"><path d="{HEART}"/></svg>{cs_stages}</div>
    </div>
    <h3>לפני ואחרי</h3>
    <div class="cs-ba"><div class="ph-frame"><span>תמונה לדוגמה · לפני</span></div><div class="ph-frame"><span>תמונה לדוגמה · אחרי</span></div></div>
    <p class="cs-credits">{e(cs["credits"])}</p>
  </div>
</section>

<section class="sheet" id="accessibility" role="dialog" aria-modal="true" aria-labelledby="acc-title" tabindex="-1">
  <div class="sheet-in narrow">
    <a class="sheet-close" href="#top" aria-label="סגירה">×</a>
    <h2 id="acc-title">הצהרת נגישות</h2>
    {ptext(acc["accessibilityStatement"])}
    <p><b>{e(acc["accessibilityContact"])}</b></p>
  </div>
</section>

<style>:root{{{masks}}}.mark,.word{{background:var(--green)}}.foot-mark{{background:#fff}}</style>
<script>{js}</script>
</body>
</html>
'''
OUT.write_text(page)
print('wrote', OUT, len(page.encode()) // 1024, 'KB')
