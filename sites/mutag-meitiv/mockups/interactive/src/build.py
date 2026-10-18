#!/usr/bin/env python3
"""Builds dist/index.html of the interactive mockup ("ארבע הטבעות") from src/page.html and the
audited copy in sites/mutag-meitiv/copy/he.json. Every visible word of the business comes from
he.json verbatim; the few interface labels (tab names, button words) live here.
Usage: python3 sites/mutag-meitiv/mockups/interactive/src/build.py"""
import json, os, html, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '../../../../..'))
C = json.load(open(os.path.join(ROOT, 'sites/mutag-meitiv/copy/he.json')))
WA = 'https://wa.me/' + C['contact']['whatsapp'].lstrip('+')   # +972546686808 from he.json / dossier
DEFAULT_LINE = 'היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.'
CAL = C['bookingLinks'][0]['url']

e = lambda t: html.escape(t or '', quote=True)
def wa(text=DEFAULT_LINE):
    return WA + '?text=' + urllib.parse.quote(text)
def paras(t, cls=''):
    out = []
    for p in (t or '').split('\n\n'):
        p = p.strip()
        if p:
            out.append('<p%s>%s</p>' % (' class="%s"' % cls if cls else '', e(p).replace('\n', '<br>')))
    return '\n'.join(out)
def first_para(t):
    return (t or '').split('\n\n')[0]
svc = {s['slug']: s for s in C['services']}
blk = lambda h: next(b for b in C['copyBlocks'] if b['heading'] == h)
X = C['mockup_extras']
I_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg>'

def btn_wa(text=DEFAULT_LINE, label='כתבו להדס בוואטסאפ', cls=''):
    return '<a class="btn btn-wa %s" href="%s">%s<span>%s</span></a>' % (cls, e(wa(text)), I_WA, label)

def price(s):
    if s.get('price') is None:
        return ''
    if s['price'] == 0:
        return '<span class="chip chip-free">ללא תשלום</span>'
    unit = {'per_person': ' לאדם', 'flat': ''}.get(s.get('unit'), '')
    vat = ' + מע״מ' if s.get('vat') == 'excluded' else ''
    return '<span class="chip chip-price"><bdi>%s&nbsp;₪</bdi>%s%s</span>' % ('{:,}'.format(s['price']), vat, unit)

out = []

# ---------------- the two lead services ----------------
intro = next(b for b in C['copyBlocks'] if b['slot'] == 'intro')
lead = [svc['personal-branding'], svc['strategic-planning']]
imgs = {'personal-branding': ('svc-personal', 'אישה כותבת על קנבס ״WHO ARE YOU?״ של Brand the Change התלוי על קיר'),
        'strategic-planning': ('svc-strategic', 'קנבס עגול על שולחן ליד חלון, עם צמחים, טושים ומחברות')}
tabs = ''.join('<button class="tab" role="tab" id="t-%s" aria-controls="p-%s" aria-selected="%s">%s</button>'
               % (s['slug'], s['slug'], 'true' if i == 0 else 'false', e(s['title'])) for i, s in enumerate(lead))
panels = ''
for i, s in enumerate(lead):
    im, alt = imgs[s['slug']]
    chips = ''
    if s.get('format'):
        chips += '<span class="chip">%s</span>' % e(s['format'])
    panels += '''
  <article class="svc" role="tabpanel" id="p-%(slug)s" aria-labelledby="t-%(slug)s">
    <div class="svc-img"><img src="img/%(im)s.webp" width="960" height="960" alt="%(alt)s" loading="lazy"></div>
    <div class="svc-txt">
      <h3>%(title)s</h3>
      <p class="svc-sum">%(summary)s</p>
      %(chips)s
      <p class="svc-for"><span class="for-lbl">למי:</span> %(aud)s</p>
      <div class="actions">%(wa)s<a class="btn btn-soft" href="#services">לפרטים</a></div>
    </div>
  </article>''' % dict(slug=s['slug'], im=im, alt=alt, title=e(s['title']), summary=e(s['summary']),
                       chips=('<div class="chips">%s</div>' % chips) if chips else '', aud=e(s['audience']),
                       wa=btn_wa(s['ctaText']))
out.append('''
<section class="sec services" id="services">
  <div class="wrap">
    <header class="sec-head">
      <h2 class="hand">%s</h2>
      %s
    </header>
    <div class="tabs" role="tablist" aria-label="שני התהליכים">%s<span class="tab-ink" aria-hidden="true"></span></div>
    <div class="svc-row">%s
    </div>
  </div>
</section>''' % (e(X['homeToolsHeading']), paras(intro['body'], 'lead'), tabs, panels))

# ---------------- testimonials (beside the lead services, then the rest; never ever B&B here) ----------------
by = {t['author']: t for t in C['testimonials']}
order = X['testimonialsPlacement']['beside_lead_services'] + ['יובל אברהם - בונים לחיים', 'AMBARTIQUE@לינדה']
slides, dots = '', ''
for i, a in enumerate(order):
    t = by[a]
    lang = t.get('lang', 'he')
    attr = ' lang="en" dir="ltr"' if lang == 'en' else ''
    role = ('<span class="q-role">%s</span>' % e(t['role'])) if t.get('role') else ''
    q = e(t['quote'].strip()).replace('\n\n', '<br><br>').replace('\n', '<br>')
    long_cls = ' q-long' if len(t['quote']) > 420 else ''
    slides += '''
      <figure class="slide%s" id="q%d" aria-roledescription="שקופית" aria-label="%d מתוך %d"%s>
        <blockquote class="q-body" id="qb%d">%s</blockquote>
        <button class="q-more" aria-expanded="false" aria-controls="qb%d" hidden>להמשך הציטוט</button>
        <figcaption><span class="q-name">%s</span>%s</figcaption>
      </figure>''' % (long_cls, i, i + 1, len(order), attr, i, q, i, e(t['author']), role)
    dots += '<button class="dot-btn" aria-label="ציטוט %d" data-i="%d"%s></button>' % (i + 1, i, ' aria-current="true"' if i == 0 else '')
out.append('''
<section class="sec quotes" id="quotes" aria-labelledby="qh">
  <div class="wrap narrow">
    <h2 class="hand center" id="qh">%s</h2>
    <div class="slider" data-slider>
      <div class="track" tabindex="0" aria-label="ציטוטים מלקוחות">%s
      </div>
      <div class="slider-nav">
        <button class="arrow prev" aria-label="הקודם"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="dots">%s</div>
        <button class="arrow next" aria-label="הבא"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>
  </div>
</section>''' % (e(X['testimonialsHeading']), slides, dots))

# ---------------- proof: award, credential, logos ----------------
aw = C['awards'][0]; cr = C['credentials'][0]
logos = ''
for lg in C['clientLogos']:
    n = lg['logo'].split(':')[1].replace('img-', 'logo-')
    from PIL import Image as _I
    w, h = _I.open(os.path.join(HERE, '../dist/img/%s.webp' % n)).size
    logos += '<li><img src="img/%s.webp" alt="%s" loading="lazy" width="%d" height="%d" style="--ar:%.3f"></li>' % (n, e(lg['name']), w, h, w / h)
out.append('''
<section class="sec proof" id="proof">
  <div class="wrap">
    <div class="proof-cards">
      <a class="pcard" href="%s" target="_blank" rel="noopener">
        <img src="img/award-seal.webp" width="240" height="240" alt="חותם פרס המיתוג הישראלי 2022" loading="lazy">
        <span><strong>%s</strong><span class="pc-sub">%s · %d · %s</span></span>
      </a>
      <a class="pcard" href="%s" target="_blank" rel="noopener">
        <img src="img/btc-seal.webp" width="240" height="240" alt="חותם מנחה מוסמכת של Brand the Change" loading="lazy">
        <span><strong>%s</strong><span class="pc-sub" lang="en" dir="ltr">%s</span></span>
      </a>
    </div>
    <h2 class="hand center small-h">%s</h2>
  </div>
  <div class="marquee" data-marquee>
    <ul class="mq-track">%s</ul>
    <ul class="mq-track" aria-hidden="true">%s</ul>
    <button class="mq-pause" aria-pressed="false" aria-label="עצירת תנועת הלוגואים"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
  </div>
</section>''' % (e(aw['url']), e(aw['label']), e(aw['issuer']), aw['year'], e(aw['project']),
                 e(cr['url']), e(cr['label']), e(cr['issuer']), e(X['clientLogosHeading']), logos,
                 logos.replace(' alt="', ' alt="" data-alt="')))

# ---------------- the method: a scroll-lit ring ----------------
m = C['method']
stage_img = [('st-sensing', 'קנבס עגול מכוסה פתקים צבעוניים על קיר'),
             ('st-thinking', 'יד מחזיקה קלף של Brand the Change מעל שורת קלפים על שולחן עץ'),
             ('st-making', 'שולחן סדנה ארוך: משתתפות מכינות קולאז׳ים מגזרי מגזינים, טושים וצמחייה'),
             ('st-influencing', 'הדס דרכלי בשמלה ירוקה מול קיר הצילום של כנס Brand Manager Day 2024')]
R = [70, 110, 150, 190]   # SENSING at the heart, INFLUENCING outermost
def ring_svg(cls, lit=None, labels=True, size=440):
    c = '<svg class="%s" viewBox="0 0 440 440" aria-hidden="true">' % cls
    c += '<circle class="m-core" cx="220" cy="220" r="44"/>'
    for i, r in enumerate(R):
        state = ' on' if (lit is not None and (lit == 'all' or i == lit)) else ''
        c += '<circle class="m-ring%s" data-r="%d" cx="220" cy="220" r="%d"/>' % (state, i, r)
        if labels:
            c += '<text class="m-lbl%s" data-r="%d" x="220" y="%d" text-anchor="middle" direction="ltr">%s</text>' % (state, i, 220 - r + 5, m['stages'][i]['label'])
    c += '<image href="img/icon-white.webp" x="190" y="197" width="60" height="46"/>'
    return c + '</svg>'
RM = [70, 86, 102, 118]
def mini_ring(i, im, alt):
    # phone: the stage photo inside the rings; rings up to this stage light one by one as the card enters
    c = '<div class="mini"><svg viewBox="0 0 260 260" aria-hidden="true">'
    for k, r in enumerate(RM):
        c += '<circle class="mm-ring%s" data-k="%d" cx="130" cy="130" r="%d" style="--d:%dms"/>' % (' on' if k <= i else '', k, r, k * 140)
    c += '</svg><img src="img/%s.webp" width="640" height="640" alt="%s" loading="lazy"></div>' % (im, alt)
    return c
stages = ''
for i, st in enumerate(m['stages']):
    im, alt = stage_img[i]
    stages += '''
      <article class="stage" data-stage="%d">
        %s
        <div class="st-photo"><img src="img/%s.webp" width="640" height="640" alt="%s" loading="lazy"></div>
        <p class="st-lbl" lang="en" dir="ltr">%s</p>
        <h3>%s</h3>
        %s
        <div class="st-more" id="sm%d">%s</div>
        <button class="st-more-btn" aria-expanded="false" aria-controls="sm%d" hidden>עוד</button>
      </article>''' % (i, mini_ring(i, im, alt), im, alt, st['label'], e(st['title']), paras(first_para(st['body'])),
                          i, paras('\n\n'.join(st['body'].split('\n\n')[1:])), i)
out.append('''
<section class="sec method" id="method">
  <div class="wrap">
    <header class="sec-head">
      <h2 class="hand">%s</h2>
      %s
    </header>
    <div class="m-grid">
      <div class="m-stages">%s
      </div>
      <div class="m-sticky">%s</div>
    </div>
  </div>
</section>''' % (e(m['name']), paras(m['intro'], 'lead'), stages, ring_svg('big', lit=0)))

# ---------------- offers: two groups, tabs + accordions ----------------
def offer_card(s, extra=''):
    badge = '<span class="badge-free">חינם</span>' if s.get('price') == 0 else ''
    full = '<span class="chip chip-full">ההרשמה מלאה</span>' if s.get('status') == 'full' else ''
    fmt = ('<span class="chip">%s</span>' % e(s['format'])) if s.get('format') else ''
    title = e(s['title'])
    return '''
        <article class="offer%s">
          <button class="offer-head" aria-expanded="false" aria-controls="o-%s" id="oh-%s">
            <span class="o-title">%s%s</span>
            <span class="o-meta">%s%s</span>
            <span class="o-plus" aria-hidden="true"></span>
          </button>
          <div class="offer-body" id="o-%s" role="region" aria-labelledby="oh-%s"><div class="offer-body-in">
            <p class="o-sum">%s</p>
            <div class="chips">%s</div>
            <p class="svc-for"><span class="for-lbl">למי:</span> %s</p>
            %s
            <div class="actions">%s</div>
          </div></div>
        </article>''' % (' is-free' if badge else '', s['slug'], s['slug'], title, badge, price(s), full,
                         s['slug'], s['slug'], e(s['summary']), fmt, e(s['audience']), extra, btn_wa(s['ctaText'], cls='btn-sm'))
talk_rows = [s for s in C['services'] if s['group'] == 'talks_workshops' and s.get('status') != 'ended']
course_rows = [s for s in C['services'] if s['group'] == 'courses' and s.get('status') != 'ended']
bb_quotes = ''.join('<blockquote class="mini-q"><p>%s</p><cite>%s</cite></blockquote>' % (e(by[a]['quote'].strip()).replace('\n', '<br>'), e(a)) for a in ['איה', 'קרן'])
talks = ''.join(offer_card(s, bb_quotes if s['slug'] == 'brand-and-breakfast' else '') for s in talk_rows)
courses = ''.join(offer_card(s) for s in course_rows)
bt, bc = blk('הרצאות וסדנאות'), blk('קורסים')
cparas = bc['body'].split('\n\n')
out.append('''
<section class="sec offers" id="offers">
  <div class="wrap">
    <div class="off-top">
      <header class="sec-head">
        <h2 class="hand">הרצאות, סדנאות וקורסים</h2>
        <div class="tabs tabs-2" role="tablist" aria-label="הרצאות וסדנאות או קורסים">
          <button class="tab" role="tab" id="t-talks" aria-controls="g-talks" aria-selected="true">%s</button>
          <button class="tab" role="tab" id="t-courses" aria-controls="g-courses" aria-selected="false">%s</button>
          <span class="tab-ink" aria-hidden="true"></span>
        </div>
        <div class="g-intro" id="gi-talks">%s</div>
        <div class="g-intro" id="gi-courses"><p>%s</p><p>%s</p><p class="motto-en" lang="en" dir="ltr">%s</p></div>
      </header>
      <div class="off-media">
        <div class="off-photo"><img src="img/women-boards.webp" width="1200" height="900" alt="שמונה נשים עומדות יחד ומחזיקות את לוחות הקולאז׳ שהכינו בסדנה" loading="lazy"></div>
        <div class="sat2"><video id="offVid" muted loop playsinline preload="none" poster="img/table-poster.webp" aria-label="שולחן סדנה מלמעלה: קולאז׳ים, גזרי מגזינים, מספריים וטושים, ידיים בעבודה">
          <source data-src="video/table-464.webm" type="video/webm"><source data-src="video/table-464.mp4" type="video/mp4"></video></div>
      </div>
    </div>
    <div class="group" role="tabpanel" id="g-talks" aria-labelledby="t-talks">
      <div class="offer-list">%s
      </div>
    </div>
    <div class="group" role="tabpanel" id="g-courses" aria-labelledby="t-courses">
      <div class="offer-list">%s
      </div>
    </div>
  </div>
</section>''' % (e(bt['heading']), e(bc['heading']), paras(bt['body']),
                 e(cparas[0]), e(cparas[1]), e(cparas[2]), talks, courses))

# ---------------- the demo case study ----------------
cs = C['caseStudies'][0]
lbls = ''.join('<span>%s</span>' % st['label'] for st in m['stages'])
out.append('''
<section class="sec work" id="work">
  <div class="wrap">
    <h2 class="hand">מקרה בוחן</h2>
    <a class="case" href="#work" aria-label="מקרה בוחן לדוגמה: %s">
      <div class="case-frame">
        <span class="badge-demo">דוגמה</span>
        %s
      </div>
      <div class="case-txt">
        <p class="case-client">%s · %s</p>
        <h3>%s</h3>
        <p class="case-stages" lang="en" dir="ltr">%s</p>
        <blockquote class="case-q">%s<cite>%s</cite></blockquote>
        <span class="btn btn-soft btn-sm as-btn">לצפייה במקרה הבוחן</span>
      </div>
    </a>
  </div>
</section>''' % (e(cs['title']), ring_svg('case-rings', lit='all', labels=True), e(cs['client']), e(cs['sector']), e(cs['title']), lbls, e(cs['quote']), e(cs['quoteAuthor'])))

# ---------------- team ----------------
team_b = blk('צוות עם משמעות')
timgs = {'הדס דרכלי': 'team-hadas', 'תמר דרכלי': 'team-tamar', 'יעל שחר': 'team-yael', 'דנה רוסו': 'team-dana', 'ליאור ארסיני': 'team-lior'}
talt = {'הדס דרכלי': 'הדס דרכלי בחולצה ירוקה, ביער אורנים',
        'תמר דרכלי': 'תמר דרכלי בשמלה אדומה עם שרשרת פרחים, על רקע ירוק-מרווה',
        'יעל שחר': 'יעל שחר במשקפיים וחולצה כהה, על רקע אפור', 'דנה רוסו': 'דנה רוסו מביטה למטה, בחולצה פרחונית, על רקע צהוב',
        'ליאור ארסיני': 'ליאור ארסיני בחולצה ורודה, על רקע ירוק-מרווה'}
cards = ''
for i, p in enumerate(C['team']):
    if p.get('founder'):
        cards += '''
      <article class="founder">
        <div class="f-photo"><img src="img/%s.webp" width="600" height="750" alt="%s" loading="lazy"></div>
        <div class="f-txt"><h3>%s</h3><p class="role">%s</p>%s</div>
      </article>''' % (timgs[p['name']], talt[p['name']], e(p['name']), e(p['role']), paras(p['bio']))
    else:
        cards += '''
      <article class="member">
        <button class="m-card" aria-expanded="false" aria-controls="bio-%d">
          <span class="m-photo"><img src="img/%s.webp" width="600" height="750" alt="%s" loading="lazy"></span>
          <span class="m-name">%s</span><span class="role">%s</span>
          <span class="m-more" aria-hidden="true">עוד עליה</span>
        </button>
      </article>
      <div class="bio" id="bio-%d" role="region" aria-label="%s" tabindex="-1"><div class="bio-in"><p class="bio-name">%s</p>%s</div></div>''' % (i, timgs[p['name']], talt[p['name']], e(p['name']), e(p['role']), i, e(p['name']), e(p['name']), paras(p['bio']))
out.append('''
<section class="moment" aria-label="המוטו">
  <div class="mo-photo"><img src="img/wide-hadas-2000.webp" srcset="img/wide-hadas-1200.webp 1200w, img/wide-hadas-2000.webp 2000w" sizes="(max-width:900px) 100vw, 62vw" width="2000" height="1190" alt="הדס דרכלי בז׳קט צהוב צוחקת ליד קנבס ״WHO ARE YOU?״, ספרייה מאחוריה" loading="lazy"></div>
  <div class="mo-txt"><img class="mo-icon" src="img/icon-white.webp" width="400" height="310" alt="" loading="lazy"><p class="hand motto-line">%s</p></div>
</section>
<section class="sec team" id="team">
  <div class="wrap">
    <header class="sec-head center">
      <h2 class="hand">%s</h2>
      %s
    </header>
    <div class="team-grid">%s
    </div>
  </div>
</section>''' % (e(C['featureLine']), e(team_b['heading']), paras(team_b['body'], 'lead'), cards))

# ---------------- podcast + blog ----------------
pod = blk('ON AIR — על א.נשים, עסקים ומשמעות'); top = blk('הפרקים הכי נשמעים בפודקאסט')
pp = pod['body'].split('\n\n')
eps = ''.join('<li>%s</li>' % e(l) for l in top['body'].split('\n') if l.strip())
pl = {l['platform']: l['url'] for l in C['podcast']['links']}
posts = sorted(C['posts'], key=lambda p: p['date'], reverse=True)[:3]
def tile_svg(k):
    # a branded cover: the four rings, cropped differently on each card, and the icon
    cx, cy = [(80, 120), (300, 40), (190, 190)][k]
    s = '<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">'
    for j, r in enumerate([40, 70, 100, 130, 160]):
        s += '<circle cx="%d" cy="%d" r="%d" fill="none" stroke-width="%s" class="%s"/>' % (cx, cy, r, '6' if j == k + 1 else '1.4', 'tl' if j == k + 1 else 'tr')
    return s + '</svg><img src="img/icon-white.webp" width="400" height="310" alt="" loading="lazy">'
def dt(d): y, mo, da = d.split('-'); return '%s.%s.%s' % (da, mo, y)
pcards = ''.join('''
        <a class="post" href="%s"><span class="post-cover pc%d" aria-hidden="true">%s</span><span class="post-txt"><time datetime="%s">%s</time><h3>%s</h3>%s</span><span class="post-go" aria-hidden="true">←</span></a>'''
                 % (e(p['oldUrl']), k, tile_svg(k), p['date'], dt(p['date']), e(p['title']), ('<p>%s</p>' % e(p['excerpt'])) if p.get('excerpt') else '') for k, p in enumerate(posts))
out.append('''
<section class="sec pod" id="content">
  <div class="wrap pod-grid">
    <div class="pod-txt">
      <p class="eyebrow-l" lang="en" dir="ltr">ON AIR</p>
      <h2 class="hand">על א.נשים, עסקים ומשמעות</h2>
      <p class="lead">%s</p>
      <p>%s</p>
      <div class="actions">
        <a class="btn btn-wa btn-sm" href="%s" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-sp"/></svg><span>להאזנה ב-Spotify</span></a>
        <a class="btn btn-soft btn-sm" href="%s" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-ap"/></svg><span>Apple Podcasts</span></a>
      </div>
    </div>
    <div class="pod-list">
      <h3>%s</h3>
      <ol>%s</ol>
    </div>
  </div>
</section>
<section class="sec blog" aria-labelledby="bh">
  <div class="wrap">
    <div class="row-head"><h2 class="hand" id="bh">מאמרים אחרונים</h2><a class="btn btn-soft btn-sm" href="https://www.mutagmeitiv.com/blog">לבלוג המלא</a></div>
    <div class="posts">%s
    </div>
  </div>
</section>''' % (e(pp[0]), e(pp[1]), e(pl['spotify']), e(pl['apple_podcasts']), e(top['heading']), eps, pcards))

# ---------------- Instagram strip ----------------
ig_alt = {'ig-03': 'הדס בחולצה ירוקה מסדרת צבעים וצמחים על שולחן סדנה', 'ig-01': 'הדס בשמלה ירוקה על במה מול מסך BRAND THE CHANGE',
          'ig-02': 'הדס בשמלה בהדפס עלים מול קיר חטיפי שוקולד צבעוניים', 'ig-09': 'ידיים קושרות אריזת מתנה מעלי בננה על שולחן עץ',
          'ig-08': 'מסך הקרנה של כנס IMPACT NATION עם חיצים וקודי QR', 'ig-11': 'כוס קפה וגזרי מגזינים על שולחן סדנה'}
posturl = {t['image'].split('img-')[1]: t['postUrl'] for t in C['instagramTiles']}
ig = ''.join('<a class="ig" href="%s" target="_blank" rel="noopener"><img src="img/%s.webp" width="600" height="600" alt="%s" loading="lazy"></a>'
             % (e(posturl[k]), k, ig_alt[k]) for k in ['ig-03', 'ig-01', 'ig-02', 'ig-09', 'ig-08', 'ig-11'])
igurl = next(s['url'] for s in C['socialLinks'] if s['platform'] == 'instagram')
out.append('''
<section class="sec insta" aria-labelledby="ih">
  <div class="wrap center">
    <h2 class="hand" id="ih">באינסטגרם</h2>
    <a class="btn btn-soft btn-sm" href="%s" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-ig"/></svg><span lang="en" dir="ltr">@mutagmeitiv</span></a>
  </div>
  <div class="ig-grid">%s</div>
</section>''' % (e(igurl), ig))

# ---------------- closing ----------------
out.append('''
<section class="sec closing" id="book">
  <div class="wrap close-in">
    %s
    <div class="close-txt">
      <h2 class="hand">%s</h2>
      <p class="lead">%s</p>
      <div class="actions">%s<a class="btn btn-soft" href="%s" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-cal"/></svg><span>לקביעת שיחה ביומן</span></a></div>
    </div>
  </div>
</section>''' % (ring_svg('closing-ring', lit='all', labels=True), e(blk('פה יוצרים קשר')['heading']), e(C['closing']), btn_wa(), e(CAL)))

out = [out[0], out[2], out[1]] + out[3:]
sections = '\n'.join(out)

# ---------------- footer + phone bar ----------------
soc_icon = {'instagram': 'i-ig', 'linkedin': 'i-li', 'spotify': 'i-sp', 'apple_podcasts': 'i-ap'}
soc_name = {'instagram': 'Instagram', 'linkedin': 'LinkedIn', 'spotify': 'Spotify', 'apple_podcasts': 'Apple Podcasts'}
socials = ''.join('<a class="soc" href="%s" target="_blank" rel="noopener" aria-label="%s"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#%s"/></svg></a>'
                  % (e(s['url']), soc_name[s['platform']], soc_icon[s['platform']]) for s in C['socialLinks'])
phone = C['contact']['phone']; email = C['contact']['email']
dl = C['downloads'][0]
footer = '''
<footer class="ftr">
  <div class="wrap ftr-grid">
    <div class="f-brand">
      <img src="img/icon-white.webp" width="400" height="310" alt="מותג מיטיב" loading="lazy">
      <p>%s</p>
    </div>
    <div class="f-contact">
      <h2>%s</h2>
      <div class="f-btns">
        <a class="btn btn-wa btn-sm" href="%s">%s<span>וואטסאפ</span></a>
        <a class="btn btn-ghost btn-sm" href="tel:%s"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-ph"/></svg><span dir="ltr">054-668-6808</span></a>
        <a class="btn btn-ghost btn-sm" href="mailto:%s"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-ml"/></svg><span dir="ltr">%s</span></a>
      </div>
      <div class="f-soc">%s</div>
    </div>
    <nav class="f-nav" aria-label="ניווט בתחתית">
      <a href="#services">מיתוג אישי לעסק</a><a href="#services">תכנון אסטרטגי למותג</a><a href="#offers">הרצאות וסדנאות</a>
      <a href="#offers">קורסים</a><a href="#team">אודות</a><a href="#content">תוכן</a>
      <a href="%s">%s</a><a href="#accessibility">הצהרת נגישות</a>
    </nav>
  </div>
  <div class="wrap f-base"><span>%s</span><span>%s</span><span>© 2026 מותג מיטיב</span></div>
</footer>
<div class="pbar" id="pbar">
  <span class="pb-what"><strong>מותג מיטיב</strong><span>הדס דרכלי</span></span>
  <a class="btn btn-wa btn-sm" href="%s">%s<span>כתבו להדס בוואטסאפ</span></a>
</div>''' % (e(C['tagline']), e(blk('פה יוצרים קשר')['heading']), e(wa()), I_WA, phone, email, email, socials, e(dl['file']), e(dl['label']),
            e(X['footerCredits'][0]), e(X['footerCredits'][1]), e(wa()), I_WA)

page = open(os.path.join(HERE, 'page.html')).read()
page = page.replace('{{WA}}', e(wa()))
page = page.replace('{{HEROSVCS}}', '<p class="hero-svcs">' + ''.join('<a href="#services" data-tab="t-%s">%s</a>' % (s['slug'], e(s['title'])) for s in lead) + '</p>')
def _img64(m):
    return 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(HERE, '../dist/img/' + m.group(1)), 'rb').read()).decode()
import base64, re as _re
page = _re.sub(r'IMG64:([a-z-]+\.webp)', _img64, page)
page = page.replace('<!--SECTIONS-->', sections).replace('<!--FOOTER-->', footer)
page = page.replace('/*MORECSS*/', open(os.path.join(HERE, 'more.css')).read())
page = page.replace('//MOREJS', open(os.path.join(HERE, 'more.js')).read())
page = page.replace('<!--ICONS-->', open(os.path.join(HERE, 'icons.svg')).read())
open(os.path.join(HERE, '../dist/index.html'), 'w').write(page)
print('wrote dist/index.html', len(page))
