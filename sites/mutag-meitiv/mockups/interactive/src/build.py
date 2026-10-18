#!/usr/bin/env python3
"""Builds dist/index.html of the series-2 interactive mockup ("בחרו פורמט", Pick a format) from
src/page.css + src/page.js and the audited copy in sites/mutag-meitiv/copy/he.json.
Every business word comes from he.json verbatim; interface labels (chip names, button words,
a few section titles) are template labels and live here, marked T().
Usage: python3 sites/mutag-meitiv/mockups/interactive/src/build.py   (after src/make-media.sh)"""
import json, os, html, urllib.parse, base64
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '../../../../..'))
DIST = os.path.join(HERE, '../dist')
C = json.load(open(os.path.join(ROOT, 'sites/mutag-meitiv/copy/he.json')))
S2 = C['mockup_extras']['series2_organisations']
X = C['mockup_extras']
WA = 'https://wa.me/' + C['contact']['whatsapp'].lstrip('+')        # +972546686808 (he.json contact / dossier)
TEL = 'tel:' + C['contact']['phone']
_d = '0' + C['contact']['phone'][4:]
PHONE_SHOW = '%s-%s-%s' % (_d[:3], _d[3:6], _d[6:])
MAIL = 'mailto:' + C['contact']['email']
CAL = C['bookingLinks'][0]
ORG = S2['path']['ctaText']
svc = {s['slug']: s for s in C['services']}
e = lambda t: html.escape(t or '', quote=True)
T = lambda t: e(t)   # template label (no copy field exists for it)
def wa(text): return WA + '?text=' + urllib.parse.quote(text)
def paras(t, cls=''):
    return '\n'.join('<p%s>%s</p>' % (' class="%s"' % cls if cls else '', e(p.strip()).replace('\n', '<br>'))
                     for p in (t or '').split('\n\n') if p.strip())
def size(name):
    return Image.open(os.path.join(DIST, 'img', name + '.webp')).size
def data_uri(name):
    return 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(DIST, 'img', name + '.webp'), 'rb').read()).decode()

SVG = '''<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"/></symbol>
<symbol id="i-mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></symbol>
<symbol id="i-group" viewBox="0 0 24 24"><circle cx="8" cy="8.5" r="2.8"/><circle cx="16.5" cy="9" r="2.4"/><path d="M2.8 19c.6-3.2 2.7-5 5.2-5s4.6 1.8 5.2 5M13.6 14.6c.9-.5 1.9-.8 2.9-.8 2.2 0 4 1.6 4.6 4.6"/></symbol>
<symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z"/></symbol>
<symbol id="i-cap" viewBox="0 0 24 24"><path d="M2.5 9.2 12 5l9.5 4.2L12 13.4z"/><path d="M6.4 11v4.4c1.4 1.4 3.4 2.1 5.6 2.1s4.2-.7 5.6-2.1V11M21.5 9.2v5"/></symbol>
<symbol id="i-l" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-r" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-ext" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-pause" viewBox="0 0 24 24"><path d="M9 6v12M15 6v12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.3V17h16V7.3l-8 5.2-8-5.2ZM5.4 7l6.6 4.3L18.6 7H5.4Z"/></symbol>
<symbol id="i-cal" viewBox="0 0 24 24"><path d="M7 2v3M17 2v3M3.5 9h17M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></symbol>
<symbol id="i-instagram" viewBox="0 0 24 24"><path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.4 8c-.06-1.4-.37-2.7-1.4-3.7S17.7 2.9 16.3 2.8C14.9 2.7 9.1 2.7 7.7 2.8 6.3 2.9 5 3.2 4 4.2S2.6 6.6 2.6 8c-.1 1.4-.1 7.2 0 8.6.07 1.4.38 2.7 1.4 3.7s2.3 1.3 3.7 1.4c1.4.1 7.2.1 8.6 0 1.4-.07 2.7-.38 3.7-1.4s1.3-2.3 1.4-3.7c.1-1.4.1-7.2 0-8.6Zm-2 10.4a2.9 2.9 0 0 1-1.6 1.6c-1.1.45-3.8.35-5.8.35s-4.7.1-5.8-.35a2.9 2.9 0 0 1-1.6-1.6c-.45-1.1-.35-3.8-.35-5.8s-.1-4.7.35-5.8A2.9 2.9 0 0 1 6.2 5.2c1.1-.45 3.8-.35 5.8-.35s4.7-.1 5.8.35a2.9 2.9 0 0 1 1.6 1.6c.45 1.1.35 3.8.35 5.8s.1 4.7-.35 5.8Z"/></symbol>
<symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M5.3 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.6 9h3.4v11H3.6zM9.2 9h3.3v1.5h.05c.46-.87 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.4V20h-3.4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H9.2z"/></symbol>
<symbol id="i-spotify" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.12.3.18.39.57.2.86Zm1.22-2.73a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.48.7.25 1.07Zm.1-2.84C14.7 8.92 9.38 8.74 6.3 9.68a.94.94 0 1 1-.54-1.79c3.53-1.07 9.41-.86 13.12 1.34a.94.94 0 0 1-.96 1.6Z"/></symbol>
<symbol id="i-apple_podcasts" viewBox="0 0 24 24"><path d="M12 2.2a9.8 9.8 0 0 0-3.6 18.9c.2.07.4-.08.36-.29l-.18-1.2a.33.33 0 0 0-.2-.25 8.2 8.2 0 1 1 7.24 0 .33.33 0 0 0-.2.25l-.18 1.2c-.03.21.17.36.37.29A9.8 9.8 0 0 0 12 2.2Zm0 3.6a6.2 6.2 0 0 0-3.4 11.4c.2.13.46 0 .48-.24l.1-.95a.5.5 0 0 0-.15-.4 4.6 4.6 0 1 1 5.94 0 .5.5 0 0 0-.15.4l.1.95c.02.23.28.37.48.24A6.2 6.2 0 0 0 12 5.8Zm0 3.7a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm0 5.3c-1.3 0-1.9.7-1.8 1.7l.5 4.6c.08.7.6 1.1 1.3 1.1s1.22-.4 1.3-1.1l.5-4.6c.1-1-.5-1.7-1.8-1.7Z"/></symbol>
</defs></svg>'''
def ic(n): return '<svg aria-hidden="true"><use href="#i-%s"/></svg>' % n
def btn_wa(text, label='כתבו להדס בוואטסאפ', cls='', id_=''):
    return '<a class="btn btn-wa %s"%s href="%s">%s<span>%s</span></a>' % (cls, ' id="%s"' % id_ if id_ else '', e(wa(text)), ic('wa'), T(label))
def price(s):
    if s.get('price') is None: return ''
    if s['price'] == 0: return '<span class="tag free">%s</span>' % T('ללא תשלום')
    unit = {'per_person': ' לאדם', 'flat': ''}.get(s.get('unit'), '')
    vat = ' + מע״מ' if s.get('vat') == 'excluded' else ''
    return '<bdi>%s&nbsp;₪</bdi>%s%s' % ('{:,}'.format(s['price']), vat, unit)

# ---- the four organisation formats (path.services, in path.body order) and their template chip labels
path_p = [p.strip() for p in S2['path']['body'].split('\n\n')]
FMT = [  # key, chip label (template), service slug, path paragraph index, icon, hero photo alt, tab photo
    ('talk',  'הרצאה',        'brands-of-change',   1, 'mic',     'הדס דרכלי בשמלה ירוקה על במה, מול שקופית ״BRAND THE CHANGE — Using brands as a force for good״'),
    ('team',  'סדנה לצוות',   'therapists-retreat', 2, 'group',   'שמונה נשים עומדות יחד ומחזיקות את לוחות הקולאז׳ שהכינו בסדנה, מחייכות'),
    ('brand', 'מיתוג וריברנד', 'strategic-planning', 0, 'compass', 'אישה כותבת על קנבס ״WHO ARE YOU?״ של Brand the Change התלוי על קיר'),
    ('pro',   'השתלמות',      'btc-professionals',  3, 'cap',     'יד מחזיקה קלף מעל שורת קלפים של Brand the Change על שולחן עץ'),
]
def after_colon(p): return p.split(':', 1)[1].strip() if ':' in p else p
GENERAL = {'team'}   # "סדנה לצוות": a format, not the therapists' retreat -> general org message, no price (coordinator, 4f)
def fmt_msg(k, sl): return ORG if k in GENERAL else svc[sl]['ctaText']
data = {k: {'line': after_colon(path_p[pi]), 'wa': wa(fmt_msg(k, sl)), 'msg': fmt_msg(k, sl)} for k, _, sl, pi, _, _ in FMT}

out = []
# ---------------- header ----------------
nav = [('#formats', 'לארגונים'), ('#fmt-brand', svc['strategic-planning']['title']), ('#fmt-talk', 'הרצאות וסדנאות'),
       ('#acc-pb', svc['personal-branding']['title']), ('#acc-cr', 'קורסים'), ('#team', 'אודות')]
out.append('''<a class="skip" href="#main">%s</a>
<header class="hdr">
  <div class="hdr-in">
    <a class="brand" href="#top" aria-label="%s — לראש העמוד">
      <img class="wt" src="%s" width="48" height="34" alt=""><img class="g" src="%s" width="48" height="34" alt="">
      <img class="w wt" src="%s" width="80" height="26" alt=""><img class="w g" src="%s" width="80" height="26" alt="">
    </a>
    <ul class="nav" id="nav">%s</ul>
    <a class="btn btn-wa btn-sm hdr-wa off" href="%s">%s<span>%s</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="%s">%s</button>
  </div>
</header>''' % (T('דילוג לתוכן'), e(C['businessName']), data_uri('icon-white'), data_uri('icon-green'), data_uri('word-white'), data_uri('word-green'),
                 ''.join('<li><a href="%s">%s</a></li>' % (h, e(t)) for h, t in nav), e(wa(ORG)), ic('wa'), T('וואטסאפ'), T('תפריט'), ic('menu')))

# ---------------- hero ----------------
pics = ''
for i, (k, lbl, sl, pi, icn, alt) in enumerate(FMT):
    dw, dh = size('hero-%s-d' % k); mw, mh = size('hero-%s-m' % k)
    if i == 0:
        pics += '''<picture class="on" data-k="%s"><source media="(max-width:1023px)" srcset="img/hero-%s-m.webp" width="%d" height="%d"><img src="img/hero-%s-d.webp" width="%d" height="%d" alt="%s" fetchpriority="high"></picture>''' % (k, k, mw, mh, k, dw, dh, e(alt))
    else:
        pics += '''<picture data-k="%s"><source media="(max-width:1023px)" data-srcset="img/hero-%s-m.webp" width="%d" height="%d"><img data-src="img/hero-%s-d.webp" width="%d" height="%d" alt="%s"></picture>''' % (k, k, mw, mh, k, dw, dh, e(alt))
chips = ''.join('<a class="chip%s" href="#fmt-%s" data-k="%s">%s<span>%s</span></a>' % (' cur' if i == 0 else '', k, k, ic(icn), T(lbl)) for i, (k, lbl, sl, pi, icn, alt) in enumerate(FMT))
out.append('''<main id="main">
<section class="hero" id="top" aria-labelledby="h1">
  <div class="hero-ph">%s</div>
  <div class="wrap">
    <div class="card">
      <p class="who">%s <span>|</span> %s</p>
      <h1 id="h1">%s</h1>
      <p class="line" id="hero-line" aria-live="polite">%s</p>
      <p class="q-lbl" id="q-lbl">%s</p>
      <div class="chips" aria-labelledby="q-lbl">%s</div>
      %s
      <div class="bubble"><b>%s</b><p id="hero-msg">%s</p></div>
    </div>
  </div>
</section>''' % (pics, e(C['team'][0]['name']), e(C['businessName']), e(S2['tagline_options'][0]), e(data['talk']['line']), T('מה תרצו להזמין?'), chips,
                 btn_wa(ORG, id_='hero-wa'), T('ההודעה שתיפתח בוואטסאפ:'), e(ORG)))

# ---------------- intro ----------------
it = S2['intro']
out.append('''<section class="sec intro" id="intro"><div class="wrap narrow center">
  <h2>%s</h2>
  %s
</div></section>''' % (e(it['heading']), paras(it['body'])))

# ---------------- formats: tabs ----------------
tabs, panels = '', ''
for i, (k, lbl, sl, pi, icn, alt) in enumerate(FMT):
    s = svc[sl]
    gen = k in GENERAL
    tabs += '<a class="tab" href="#fmt-%s" id="t-%s" aria-controls="fmt-%s" data-k="%s" aria-selected="%s">%s</a>' % (k, k, k, k, 'true' if i == 0 else 'false', T(lbl))
    det = [] if gen else [x for x in (s.get('format'), s.get('audience')) if x]
    pr = '' if gen else price(s)
    panels += '''
  <article class="panel" id="fmt-%s" aria-labelledby="t-%s">
    <div class="ph"><img src="img/fmt-%s.webp" width="900" height="675" alt="%s" loading="lazy"></div>
    <div class="tx">
      <h3>%s</h3>
      <p>%s</p>
      %s
      %s
      <div class="actions">%s<a class="btn btn-ghost" href="#method">%s</a></div>
    </div>
  </article>''' % (k, k, k, e(alt), e(path_p[pi].split(':', 1)[0] if gen else s['title']), e(path_p[pi]),
                   ('<ul class="details">%s</ul>' % ''.join('<li>%s</li>' % e(x) for x in det)) if det else '',
                   ('<p class="price">%s</p>' % pr) if pr and s['price'] else '',
                   btn_wa(fmt_msg(k, sl)), T('איך זה עובד'))
out.append('''<section class="sec formats" id="formats" aria-labelledby="fh">
  <div class="wrap">
    <header class="sec-head center"><h2 id="fh">%s</h2></header>
    <div class="tabs" aria-label="%s">%s<span class="tab-ink" aria-hidden="true"></span></div>
    %s
    <div class="after"><p>%s</p>%s</div>
  </div>
</section>''' % (e(S2['path']['heading']), e(S2['path']['heading']), tabs, panels, T('לא בטוחים מה מתאים לכם?'), btn_wa(ORG)))

# ---------------- method: the deck ----------------
m = C['method']
ST = [('st-sensing', 'קנבס עגול מכוסה פתקים צבעוניים על קיר, אדם עומד לידו'),
      ('st-thinking', 'קנבס עגול על שולחן ליד חלון, עם צמחים, טושים ומחברות'),
      (None, 'שולחן סדנה מלמעלה: ידיים גוזרות ומדביקות תמונות מגזינים לקולאז׳'),
      ('st-influencing', 'מסך הקרנה ״IMPACT NATION un-conference״ עם חצים וקודי QR')]
mp_w, mp_h = size('st-making-poster')
slides = ''
for i, st in enumerate(m['stages']):
    im, alt = ST[i]
    if im:
        ph = '<img src="img/%s.webp" width="800" height="1000" alt="%s" loading="lazy">' % (im, e(alt))
    else:
        ph = ('<video id="making-vid" muted loop playsinline preload="none" poster="img/st-making-poster.webp" width="%d" height="%d" aria-label="%s">'
              '<source data-src="video/s2i-making.webm" type="video/webm"><source data-src="video/s2i-making.mp4" type="video/mp4"></video>') % (mp_w, mp_h, e(alt))
    slides += '''
      <li class="slide%s">
        <div class="ph">%s</div>
        <div class="bcard" data-i="%d">
          <div class="flip">
            <div class="face front" aria-hidden="true"><img src="img/icon-green.webp" width="56" height="37" alt=""><span class="st-big" lang="en" dir="ltr">%s</span><span class="st-n">%d / 4</span></div>
            <div class="face back"><span class="st-lbl" lang="en" dir="ltr">%s</span><h3>%s</h3>%s</div>
          </div>
        </div>
      </li>''' % (' front' if i == 0 else '', ph, i, e(st['label'].lower()), i + 1, e(st['label']), e(st['title']), paras(st['body']))
stt = ''.join('<button type="button" lang="en" dir="ltr"%s>%s</button>' % (' aria-current="true"' if i == 0 else '', e(st['label'])) for i, st in enumerate(m['stages']))
dots = ''.join('<button class="dot" type="button" aria-label="%s %d"%s></button>' % (T('שלב'), i + 1, ' aria-current="true"' if i == 0 else '') for i in range(4))
out.append('''<section class="sec deck-sec" id="method" aria-labelledby="mh" tabindex="-1">
  <div class="wrap">
    <header class="sec-head center"><h2 id="mh">%s</h2><div class="narrow">%s</div></header>
    <div class="deck-grid">
      <ul class="slides" aria-label="%s">%s
      </ul>
      <div class="deck-ctl"><button class="arrow" type="button" data-dir="-1" aria-label="%s">%s</button><div class="stage-tabs">%s</div><button class="arrow" type="button" data-dir="1" aria-label="%s">%s</button></div>
      <div class="dots">%s</div>
    </div>
  </div>
</section>''' % (e(m['name']), paras(m['intro']), T('ארבעת השלבים'), slides, T('השלב הקודם'), ic('r'), stt, T('השלב הבא'), ic('l'), dots))

# ---------------- proof: award (once, D1), the judges' words (D3), the talks ----------------
aw = C['awards'][0]; pf = S2['proof']
talk_alt = ['הדס דרכלי על הבמה בכנס המיתוג הישראלי 2024', 'כרטיס ״מצפן לצפון״ — סדנת מפת החזון של המרחב הצפוני', 'כרזת פסטיבל קיימות וא.נשים 3 עם תמונתה של הדס דרכלי']
talks = ''.join('''<li class="talk"><img src="img/talk-%s.webp" width="240" height="240" alt="%s" loading="lazy"><div><p>%s</p><a class="btn btn-ghost" href="%s" target="_blank" rel="noopener">%s</a></div></li>'''
                % (n, e(talk_alt[i]), e(pf['talks'][i]), e(pf['instagramLinks'][i]), T('לפוסט באינסטגרם')) for i, n in enumerate(['01', '04', '05']))
out.append('''<section class="sec proof" id="proof" aria-labelledby="ph">
  <div class="wrap">
    <header class="sec-head"><h2 id="ph">%s</h2></header>
    <div class="proof-grid">
      <div>
        <div class="award"><img src="img/award-seal.webp" width="220" height="220" alt="%s" loading="lazy"><p>%s</p></div>
        <a class="jq" href="%s" target="_blank" rel="noopener"><blockquote>%s</blockquote><span class="att"><span>%s</span>%s</span></a>
      </div>
      <div>
        <h3 class="talks-h">%s</h3>
        <ul class="talks">%s</ul>
      </div>
    </div>
  </div>
</section>''' % (T('על הבמות ובארגונים'), T('חותם פרס המיתוג הישראלי 2022'), e(pf['award']), e(aw['url']), e(pf['judgesQuote']),
                 e(pf['judgesQuoteAttribution']), ic('ext'), T('הרצאות וסדנאות, 2024–2025'), talks))

# ---------------- logos (D2: only under her own heading) ----------------
lis = ''
for lg in C['clientLogos']:
    n = lg['logo'].split(':')[1].replace('img-', 'logo-')
    w, h = size(n)
    tall = ' class="tall"' if w / h < 1.6 else ''
    hh = 72 if tall else 56
    lis += '<li><img%s src="img/%s.webp" width="%d" height="%d" alt="%s" loading="lazy" style="width:%dpx"></li>' % (tall, n, w, h, e(lg['name']), min(180 if not tall else 120, round(hh * w / h)))
out.append('''<section class="logos" aria-labelledby="lh">
  <div class="wrap"><h2 id="lh">%s</h2></div>
  <div class="mq"><ul class="mq-track">%s</ul><ul class="mq-track" aria-hidden="true">%s</ul></div>
  <div class="mq-btn"><button type="button" aria-pressed="false" data-pause="%s" data-play="%s">%s<span>%s</span></button></div>
</section>''' % (e(X['clientLogosHeading']), lis, lis.replace(' alt="', ' alt="" data-a="'), T('עצירת התנועה'), T('הפעלת התנועה'), ic('pause'), T('עצירת התנועה')))

# ---------------- testimonials: 3, sized per slide ----------------
by = {t['author']: t for t in C['testimonials']}
order = ['אנווה רצון', 'Julia Dojas - Heart of Hosting', 'יובל אברהם - בונים לחיים']
qs, qd = '', ''
for i, a in enumerate(order):
    t = by[a]; en = t.get('lang') == 'en'
    q = e(t['quote'].strip()).replace('\n\n', '<br>').replace('\n', '<br>')
    qs += '''<figure class="qs%s" aria-roledescription="%s" aria-label="%d / %d"%s><blockquote>%s</blockquote><button class="q-more" type="button" hidden aria-expanded="false" data-more="%s" data-less="%s">%s</button><figcaption><b>%s</b>%s</figcaption></figure>''' % (
        ' clamp' if len(t['quote']) > 300 else '', T('ציטוט'), i + 1, len(order), ' lang="en" dir="ltr"' if en else '', q,
        T('להמשך הציטוט'), T('לקצר'), T('להמשך הציטוט'), e(t['author']), ('<span>%s</span>' % e(t['role'])) if t.get('role') else '')
    qd += '<button class="dot" type="button" aria-label="%s %d"%s></button>' % (T('ציטוט'), i + 1, ' aria-current="true"' if i == 0 else '')
out.append('''<section class="sec quotes" aria-labelledby="qh">
  <div class="wrap narrow">
    <h2 id="qh">%s</h2>
    <div class="qtrack" tabindex="0" aria-label="%s">%s</div>
    <div class="qnav"><button class="arrow" type="button" data-dir="-1" aria-label="%s">%s</button><div class="dots">%s</div><button class="arrow" type="button" data-dir="1" aria-label="%s">%s</button></div>
  </div>
</section>''' % (e(X['testimonialsHeading']), T('ציטוטים'), qs, T('הקודם'), ic('r'), qd, T('הבא'), ic('l')))

# ---------------- individuals: a second, smaller chip set ----------------
def offer_row(s):
    tags = ''
    if s.get('format'): tags += '<span class="tag">%s</span>' % e(s['format'])
    p = price(s)
    if p: tags += p if s['price'] == 0 else '<span class="tag">%s</span>' % p
    full = s.get('status') == 'full'
    if full: tags += '<span class="tag full">%s</span>' % T('ההרשמה מלאה')
    return '''<li class="offer"><div><h4>%s</h4><p>%s</p>%s</div>%s</li>''' % (
        e(s['title']), e(s['summary']), ('<div class="meta">%s</div>' % tags) if tags else '',
        btn_wa(s['ctaText'], label=('לעדכון בוואטסאפ' if full else 'בוואטסאפ'), cls='btn-sm'))
groups = [('pb', svc['personal-branding']['title'], ['personal-branding']),
          ('ws', 'סדנאות פתוחות', ['intro-workshop', 'the-better-4', 'brand-and-breakfast', 'community-meetups']),
          ('cr', 'קורסים', ['change-leaders-course', 'business-to-brand'])]
sc = ''.join('<a class="subchip" href="#acc-%s" aria-controls="acc-%s">%s%s</a>' % (g, g, e(t), ic('down')) for g, t, _ in groups)
acc = ''.join('<div class="acc" id="acc-%s"><div><h3>%s</h3><ul class="offers">%s</ul></div></div>' % (g, e(t), ''.join(offer_row(svc[x]) for x in sl)) for g, t, sl in groups)
out.append('''<section class="also" id="also" aria-labelledby="ah">
  <div class="wrap"><div class="also-box">
    <h2 id="ah">%s</h2>
    <p class="sub">%s</p>
    <div class="subchips">%s</div>
    %s
  </div></div>
</section>''' % (T('גם לבעלי עסקים ולאנשי מקצוע'), e(svc['personal-branding']['audience']), sc, acc))

# ---------------- demo case study: a designed cover, labelled דוגמה ----------------
cs = C['caseStudies'][0]
out.append('''<section class="demo" aria-labelledby="dh">
  <div class="wrap">
    <article class="demo-tile">
      <div>
        <span class="badge">%s</span>
        <h3 id="dh">%s</h3>
        <p class="cl">%s | %s</p>
        <ol class="stg">%s</ol>
        <button class="btn btn-white" id="demo-btn" type="button" aria-controls="demo-more" data-more="%s" data-less="%s"><span>%s</span></button>
      </div>
      <div class="demo-more" id="demo-more"><h4>%s</h4><p>%s</p><h4>%s</h4><p>%s</p></div>
    </article>
  </div>
</section>''' % (T('דוגמה'), e(cs['title']), e(cs['client']), e(cs['sector']),
                 ''.join('<li lang="en" dir="ltr">%s</li>' % e(p['stage']) for p in cs['process']),
                 T('לסיפור המקרה'), T('סגירה'), T('לסיפור המקרה'), T('האתגר'), e(cs['challenge']), T('מה השתנה'), e(cs['outcome'])))

# ---------------- team ----------------
tm = C['team']
ph = {0: 'team-hadas', 1: 'team-036', 2: 'team-037', 3: 'team-038', 4: 'team-039'}
alts = ['הדס דרכלי צוחקת בז׳קט צהוב ליד קנבס ״WHO ARE YOU?״', 'תמר דרכלי', 'יעל שחר', 'דנה רוסו', 'ליאור ארסיני']
people, bios = '', ''
for i, p in enumerate(tm):
    w, h = size(ph[i])
    people += '''<li class="person%s"><button type="button" aria-controls="bio-%d"><div class="ph"><img src="img/%s.webp" width="%d" height="%d" alt="%s" loading="lazy"></div><b>%s</b><span>%s</span><span class="more">%s</span></button></li>''' % (
        ' f' if p.get('founder') else '', i, ph[i], w, h, e(alts[i]), e(p['name']), e(p['role']), T('עוד עליה'))
    bios += '<li class="bio" id="bio-%d"><h3>%s</h3>%s<button class="x" type="button" aria-label="%s">%s</button></li>' % (i, e(p['name']), paras(p['bio']), T('סגירה'), ic('x'))
tb = next(b for b in C['copyBlocks'] if b['heading'] == 'צוות עם משמעות')
out.append('''<section class="sec team" id="team" aria-labelledby="th">
  <div class="wrap">
    <header class="sec-head"><h2 id="th">%s</h2><p>%s</p></header>
    <ul class="people">%s%s</ul>
  </div>
</section>''' % (e(tb['heading']), e(tb['body'].split('\n\n')[0]), people, bios))

# ---------------- content: podcast + 2 latest posts ----------------
pod = next(b for b in C['copyBlocks'] if b['heading'].startswith('ON AIR'))
lk = {l['platform']: l['url'] for l in C['podcast']['links']}
posts = sorted(C['posts'], key=lambda p: p['date'], reverse=True)[:2]
def pdate(d): y, mo, da = d.split('-'); return '%d.%d.%s' % (int(da), int(mo), y)
pc = ''
for j, p in enumerate(posts):
    if p['date'] == '2026-05-28':
        cover = '<div class="ph"><img src="img/post-2026-05-28.webp" width="800" height="533" alt="" loading="lazy"></div>'
    else:
        cover = '<div class="ph type" aria-hidden="true"><img src="img/icon-white.webp" width="64" height="42" alt="" style="width:64px;height:auto;margin-inline-start:auto"></div>'
    pc += '<a class="post p%d" href="%s"><div>%s</div><div class="tx"><time datetime="%s">%s</time><h3>%s</h3>%s</div></a>' % (
        j + 1, e(p['oldUrl']), cover, p['date'], pdate(p['date']), e(p['title']), ('<p>%s</p>' % e(p['excerpt'])) if p.get('excerpt') else '')
out.append('''<section class="sec content" aria-labelledby="ch">
  <div class="wrap">
    <header class="sec-head"><h2 id="ch">%s</h2></header>
    <div class="c-grid">
      <div class="pod"><img src="img/podcast-art.webp" width="560" height="560" alt="%s" loading="lazy"><div><h3 lang="he">%s</h3><p>%s</p></div>
        <div class="actions"><a class="btn btn-white btn-sm" href="%s">%s<span>Spotify</span></a><a class="btn btn-white btn-sm" href="%s">%s<span>Apple Podcasts</span></a></div></div>
      %s
    </div>
    <div class="c-more"><a class="btn btn-ghost" href="%s">%s</a></div>
  </div>
</section>''' % (T('פודקאסט ומאמרים'), T('עטיפת הפודקאסט מותג מיטיב'), e(pod['heading']), e(pod['body'].split('\n\n')[0]),
                 e(lk['spotify']), ic('spotify'), e(lk['apple_podcasts']), ic('apple_podcasts'), pc, 'https://www.mutagmeitiv.com/blog', T('לבלוג המלא')))

# ---------------- instagram ----------------
ig = {t['image'].split(':')[1]: t['postUrl'] for t in C['instagramTiles']}
ig_alt = {'01': 'הדס על הבמה בשמלה ירוקה', '08': 'מסך IMPACT NATION un-conference', '03': 'הדס מסדרת צבעים וצמחים על שולחן סדנה',
          '02': 'הדס מול קיר חטיפי Tony’s Chocolonely', '09': 'ידיים קושרות עטיפת עלה בננה', '11': 'כוס קפה וגזרי מגזינים'}
tiles = ''.join('<li><a href="%s" target="_blank" rel="noopener"><img src="img/ig-%s.webp" width="500" height="500" alt="%s" loading="lazy"></a></li>' % (e(ig['img-ig-' + n]), n, e(ig_alt[n])) for n in ['01', '08', '03', '02', '09', '11'])
igu = next(s['url'] for s in C['socialLinks'] if s['platform'] == 'instagram')
out.append('''<section class="ig" aria-labelledby="igh">
  <div class="wrap ig-head"><div><h2 id="igh">%s</h2></div><a class="btn btn-ghost" href="%s" lang="en" dir="ltr">%s<span>@mutagmeitiv</span></a></div>
  <ul class="tiles">%s</ul>
</section>''' % (T('באינסטגרם'), e(igu), ic('instagram'), tiles))

# ---------------- closing ----------------
out.append('''<section class="closing" id="book" aria-labelledby="clh">
  <div class="band"><picture><source media="(max-width:767px)" srcset="img/closing-m.webp" width="800" height="600"><img src="img/closing-d.webp" width="1600" height="533" alt="%s" loading="lazy"></picture></div>
  <div class="wrap close-box">
    <h2 id="clh">%s</h2>
    <div class="actions">%s<a class="btn btn-ghost" href="%s">%s<span>%s</span></a></div>
  </div>
</section>
</main>''' % (e(FMT[1][5]), e(C['closing']), btn_wa(ORG), e(CAL['url']), ic('cal'), T('לקביעת שיחה ביומן')))

# ---------------- footer ----------------
cb = next(b for b in C['copyBlocks'] if b['heading'] == 'פה יוצרים קשר')
soc = ''.join('<a href="%s" aria-label="%s">%s</a>' % (e(s['url']), s['platform'].replace('_', ' ').title(), ic(s['platform'])) for s in C['socialLinks'])
dl = C['downloads'][0]
out.append('''<footer class="foot">
  <div class="wrap f-grid">
    <div class="f-brand"><img class="i" src="img/icon-white.webp" width="88" height="56" alt=""><br><img class="w" src="img/word-white.webp" width="200" height="40" alt="%s"><p>%s</p></div>
    <div class="f-contact"><h2>%s</h2>%s<a class="plain" href="%s">%s<bdi>%s</bdi></a><a class="plain" href="%s">%s<span>%s</span></a><div class="soc">%s</div></div>
    <div><h2>%s</h2><ul class="f-links">%s<li><a href="%s">%s</a></li></ul></div>
  </div>
  <div class="credits"><div class="wrap"><span>%s</span><span>%s</span></div></div>
</footer>
<div class="pbar">%s</div>''' % (e(C['businessName']), e(C['featureLine']), e(cb['heading']), btn_wa(ORG, cls='btn-ring'), e(TEL), ic('phone'), PHONE_SHOW, e(MAIL), ic('mail'), e(C['contact']['email']), soc,
                                  T('ניווט'), ''.join('<li><a href="%s">%s</a></li>' % (h, e(t)) for h, t in nav), e(dl['file']), e(dl['label']),
                                  ' | '.join(e(x) for x in X['footerCredits']), '© ' + e(C['businessName']), btn_wa(ORG)))

css = open(os.path.join(HERE, 'page.css')).read()
js = open(os.path.join(HERE, 'page.js')).read()
fmt_json = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
page = '''<!doctype html>
<html lang="he" dir="rtl" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>%s | %s</title>
<meta name="description" content="%s">
<meta name="theme-color" content="#173B34">
<link rel="preload" href="fonts/rubik-hebrew.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="img/hero-talk-m.webp" media="(max-width:1023px)">
<link rel="preload" as="image" href="img/hero-talk-d.webp" media="(min-width:1024px)">
<style>%s</style>
</head>
<body>
%s
%s
<script type="application/json" id="fmt-data">%s</script>
<script>%s</script>
</body>
</html>
''' % (e(C['businessName']), e(S2['tagline_options'][0]), e(it['body'].split('\n\n')[0]), css, SVG, '\n'.join(out), fmt_json, js)
open(os.path.join(DIST, 'index.html'), 'w').write(page)
print('wrote dist/index.html', len(page) // 1024, 'KB')
