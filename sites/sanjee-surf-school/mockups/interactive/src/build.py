#!/usr/bin/env python3
# Builds dist/index.html for the interactive mockup ("Where you start") from copy/en.json, so the words are
# the passed copy and nothing retyped. Run make-media.sh first. Run from anywhere.
# The hero photograph is inlined as a data URI at this station only: a page opened from file:// (how the look
# loop and the critics shoot it) may not hand a file:// image to WebGL, and would show the still. 4g serves it
# as a normal file.
import base64, datetime, html, json, math, pathlib, re, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
DIST = HERE.parent / 'dist'
C = json.loads((SITE / 'copy' / 'en.json').read_text())
e = lambda s: html.escape(str(s), quote=True)
PRIMARY = C['ctas']['primary']
WA_DIGITS = C['contact']['whatsapp'].lstrip('+')
PHONE = C['contact']['phone']
BIZ = C['businessName']
BLOCK = {b['heading']: b for b in C['copyBlocks']}

def paras(heading):
    return BLOCK[heading]['body'].split('\n\n')

def ps(items, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{e(t)}</p>' for t in items)

def wa(ask):
    text = f"Hello {BIZ}, I'd like to ask about {ask}."
    return f"https://wa.me/{WA_DIGITS}?text=" + urllib.parse.quote(text)

WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.9 1.3-.9 2.1 0 .9.4 1.9 1 2.6 1.2 1.7 2.7 3 4.6 3.8.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.6-.2Z"/></svg>'
PHONE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.4 9 3c.5-.1 1 .2 1.2.7l1.1 2.8c.2.4 0 .9-.3 1.2L9.5 9.1a12.6 12.6 0 0 0 5.4 5.4l1.4-1.5c.3-.3.8-.5 1.2-.3l2.8 1.1c.5.2.8.7.7 1.2l-.4 2.4c-.1.9-.9 1.6-1.8 1.6C10.7 19 5 13.300 5 5.200c0-.9.7-1.700 1.600-1.800Z"/></svg>'
MAIL_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.5l8 5 8-5V7H4Zm16 2.900-8 5-8-5V17h16V9.900Z"/></svg>'
PIN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7.500 7.500 0 0 0-7.500 7.500C4.500 15 12 22 12 22s7.500-7 7.500-12.500A7.500 7.500 0 0 0 12 2Zm0 10.300a2.800 2.800 0 1 1 0-5.600 2.800 2.800 0 0 1 0 5.600Z"/></svg>'

def btn(href, label=None, cls=''):
    label = label or PRIMARY
    return f'<a class="btn {cls}" href="{e(href)}">{WA_ICON}<span>{e(label)}</span></a>'

def contact_buttons():
    m = C['contact']['mapUrl']
    return (f'<a class="btn2" href="{e(m)}">{PIN_ICON}<span>Open in Google Maps</span></a>'
            f'<a class="btn2" href="tel:{e(PHONE)}">{PHONE_ICON}<span>Call</span></a>'
            f'<a class="btn2" href="mailto:{e(C["contact"]["email"])}">{MAIL_ICON}<span>Email</span></a>')

NAV = [('Lessons', 'lessons'), ('Boards', 'boards'), ('Sanjee', 'sanjee'), ('Waves', 'waves'), ('Tuk-tuk', 'tuk-tuk'), ('Finding us', 'finding-us')]

def header():
    links = ''.join(f'<a href="#{i}">{n}</a>' for n, i in NAV)
    return f'''<header class="hdr" id="top">
  <a class="brand" href="#top">{e(BIZ)}</a>
  <nav class="nav" aria-label="Sections">{links}</nav>
  <a class="btn btn-s hdr-cta needs-js" href="{e(wa('a surf lesson'))}" tabindex="-1">{WA_ICON}<span>{e(PRIMARY)}</span></a>
  <details class="menu">
    <summary>Menu</summary>
    <nav class="menu-panel" aria-label="Sections, menu">{links}</nav>
  </details>
</header>'''

def hero():
    data = base64.b64encode((DIST / 'img' / 'hero-img-009-1600.webp').read_bytes()).decode()
    alt = 'A surfer lying on a board, back to the camera, paddling at a low green wave with one arm lifted in a small splash. Two more heads in the water beyond it, open sea and a pale sky above.'
    return f'''<section class="hero" aria-label="{e(BIZ)}">
  <div class="hero-copy">
    <h1>Surf lessons in Weligama</h1>
    {btn(wa('a surf lesson'), cls='hero-btn')}
  </div>
  <div class="stage" data-swell data-figures="0.472,0.478 0.456,0.352 0.002,0.372">
    <img src="data:image/webp;base64,{data}" width="1600" height="1067" alt="{e(alt)}" fetchpriority="high" decoding="async" data-source="hero-img-009-1600.webp">
    <canvas aria-hidden="true"></canvas>
  </div>
</section>'''

TILES = [('first_time', 'Total beginner', "I'm a total beginner."),
         ('beginner', 'I can stand up', "I'm a beginner who can already stand up."),
         ('intermediate', 'Intermediate', "I'm an intermediate surfer."),
         ('advanced', 'Advanced', "I'm an advanced surfer."),
         ('unsure', 'Not sure', "I'm not sure of my level yet.")]

def where():
    who = paras('Who we teach')
    tiles = ''.join(f'<button type="button" class="tile" data-level="{k}" aria-pressed="false">{e(l)}</button>' for k, l, _ in TILES)
    return f'''<section class="where">
  <div class="panel">
    <div class="panel-top">
      <p class="lead">{e(C['tagline'])}</p>
      <div class="who">
        <h2 class="script">{e('Who we teach')}</h2>
        {ps(who)}
      </div>
    </div>
    <div class="tiles needs-js" role="group" aria-label="Your level">
      <span class="tile-pill" aria-hidden="true"></span>
      {tiles}
    </div>
    <div class="lessons-head" id="lessons">
      <h2 class="script">{e('Lessons')}</h2>
      <p>{e(paras('Lessons')[0])}</p>
    </div>
  </div>
  {cards()}
  {after_cards()}
</section>'''

LEVEL_WORDS = {'first_time': 'Total beginner', 'beginner': 'Beginner', 'intermediate': 'Intermediate', 'advanced': 'Advanced'}

def hours(mins):
    return f'{mins // 60} hours'

def cards():
    out = []
    lesson_p = paras('Lessons')
    for l in C['lessons']:
        name = l['label']
        details = []
        if name == 'Week Intensive':
            details = [l['groupSize'], hours(l['durationMin']) + ' each']
        else:
            words = [LEVEL_WORDS[x] for x in l['level']]
            words = [words[0]] + [w.lower() for w in words[1:]]
            if l['groupSize']:
                details.append(l['groupSize'])
            details += [', '.join(words), hours(l['durationMin'])]
        unit = 'per lesson' if l['unit'] == 'per_lesson' else ''
        unit_html = f' <span class="per">{unit}</span>' if unit else ''
        week = f'<p class="card-more">{e(lesson_p[1])}</p>' if name == 'Week Intensive' else ''
        levels = ' '.join(l['level'] or [])
        out.append(f'''<li class="card" data-lesson="{e(name)}" data-levels="{levels}">
      <span class="foryou" aria-hidden="true"><i></i>for you</span>
      <h3>{e(name)}</h3>
      <p class="details">{' | '.join(e(d) for d in details)}</p>
      <p class="price">{e(l['currency'])} {l['price']}{unit_html}</p>
      <p class="incl">{e(l['includes'])}</p>
      {week}
      <div class="card-actions">
        {btn(wa('the ' + name))}
        <button type="button" class="add needs-js" aria-pressed="false"><span class="add-a">Add to my message</span><span class="add-b">In my message</span></button>
      </div>
    </li>''')
    return f'<ul class="cards">{"".join(out)}</ul>'

def rating(cls=''):
    r = C['ratings'][0]
    d = datetime.date.fromisoformat(r['capturedAt'])
    when = f"{d.day} {d.strftime('%B %Y')}"
    return f'''<a class="rating {cls}" href="{e(r['url'])}"><b>{r['score']}/{r['scale']}</b><span class="r-t"><span>{r['count']} Google reviews</span><i> | </i><span>{when}</span></span></a>'''

def after_cards():
    return f'''<div class="after-cards">
    <p>{e(paras('Lessons')[2])}</p>
    {rating()}
  </div>'''

def message():
    b = paras('Before you book')
    lessons = ''.join(f'<button type="button" class="chip" data-group="lesson" data-value="{e(l["label"])}" aria-pressed="false">{e(l["label"])}</button>' for l in C['lessons'])
    lessons += '<button type="button" class="chip" data-group="lesson" data-value="unsure" aria-pressed="false">Not sure</button>'
    people = ''.join(f'<button type="button" class="chip" data-group="people" data-value="{v}" aria-pressed="false">{l}</button>' for v, l in [('1', '1'), ('2', '2'), ('3', '3+'), ('unsure', 'Not sure')])
    return f'''<section class="msg-wrap" id="message">
  <div class="msg needs-js">
    <p class="msg-title" id="msg-title">Your message</p>
    <div class="bubble"><p id="bubble" aria-live="polite" aria-labelledby="msg-title"></p></div>
    <div class="msg-controls">
      <div class="ctl" role="group" aria-label="Lesson"><span class="ctl-l">Lesson</span><div class="chips">{lessons}</div></div>
      <div class="ctl" role="group" aria-label="Date"><span class="ctl-l">Date</span><div class="chips">
        <label class="date"><input type="date" id="date" aria-label="Date"></label>
        <button type="button" class="chip" data-group="date" data-value="unsure" aria-pressed="false">Not sure</button>
      </div></div>
      <div class="ctl" role="group" aria-label="People"><span class="ctl-l">People</span><div class="chips">{people}</div></div>
    </div>
    <a class="btn msg-send" id="send" href="{e(wa('a surf lesson'))}">{WA_ICON}<span>{e(PRIMARY)}</span></a>
  </div>
  <div class="before">
    <h2 class="script">{e('Before you book')}</h2>
    {ps(b)}
  </div>
</section>'''

# ---- boards, to scale: lengths from copyBlocks[3] para 2; outlines drawn to one scale in inches
def outline(L, W, nose, tail):
    cx, h = W / 2, W / 2
    a, b = ((h * .14, 0), (h * .94, L * .2)) if nose == 'point' else ((h * .62, 0), (h * .98, L * .1))
    wp = L * .47
    tw = {'squash': h * .42, 'swallow': h * .62, 'pin': h * .2}[tail]
    t1, t2 = (h, L * .72), (tw + h * .2, L * .97)
    f = lambda x: f'{x:.1f}'
    right = f'M{f(cx)},0 C{f(cx + a[0])},{f(a[1])} {f(cx + b[0])},{f(b[1])} {f(cx + h)},{f(wp)} C{f(cx + t1[0])},{f(t1[1])} {f(cx + t2[0])},{f(t2[1])} {f(cx + tw)},{f(L)}'
    mid = f'L{f(cx)},{f(L - W * .26)} L{f(cx - tw)},{f(L)}' if tail == 'swallow' else f'L{f(cx - tw)},{f(L)}'
    left = f'C{f(cx - t2[0])},{f(t2[1])} {f(cx - t1[0])},{f(t1[1])} {f(cx - h)},{f(wp)} C{f(cx - b[0])},{f(b[1])} {f(cx - a[0])},{f(a[1])} {f(cx)},0 Z'
    return f'{right} {mid} {left}'

def inches(s):
    ft, inch = s.split("'")
    return int(ft) * 12 + int(inch or 0)

BOARDS = [("Fish and hybrids", "5'8", "6'4", 20.5, 'point', 'swallow'),
          ("Performance shortboards", "5'10", "6'2", 18.5, 'point', 'squash'),
          ("Mid-lengths and funboards", "6'8", "7'4", 21, 'round', 'squash'),
          ("Mini-mals", "7'2", "7'10", 22.5, 'round', 'squash'),
          ("Soft-top foamies", "8'0", "9'0", 24, 'round', 'squash'),
          ("Longboards", "9'0", "9'4", 23, 'round', 'pin')]

def chart():
    defs, items = [], []
    for i, (name, lo, hi, W, nose, tail) in enumerate(BOARDS):
        a, b = inches(lo), inches(hi)
        stop = (1 - a / b) * 100
        p = outline(b, W, nose, tail)
        end = b - W * .26 if tail == 'swallow' else b
        st = f'<path d="M{W / 2},0 V{end}" stroke="#fff" stroke-width=".45" stroke-opacity=".9" fill="none"/>'
        defs.append(f'<linearGradient id="g{i}" x1="0" y1="0" x2="0" y2="1"><stop offset="{stop:.2f}%" stop-color="#C9D8E4"/><stop offset="{stop:.2f}%" stop-color="#91B0C8"/></linearGradient>')
        v = f'<svg class="b-v" viewBox="0 0 {W} {b}" aria-hidden="true"><path d="{p}" fill="url(#g{i})"/>{st}</svg>'
        h = f'<svg class="b-h" viewBox="0 0 {b} {W}" aria-hidden="true"><g transform="translate({b} 0) rotate(90)"><path d="{p}" fill="url(#g{i})"/>{st}</g></svg>'
        items.append(f'<li class="board" style="--l:{b};--w:{W};--i:{i}">{v}{h}<p><b>{e(name)}</b><span>{lo}–{hi}</span></p></li>')
    feet = ''.join(f'<span style="--ft:{n}">{n}\'</span>' for n in (5, 6, 7, 8, 9))
    return f'''<div class="chart">
      <svg width="0" height="0" class="defs" aria-hidden="true">{''.join(defs)}</svg>
      <div class="chart-in">
        <div class="feet" aria-hidden="true">{feet}</div>
        <ul class="boards">{''.join(items)}</ul>
      </div>
    </div>'''

def rate_table():
    rows = {}
    order = []
    for r in C['rentals']:
        if ', ' not in r['label']:
            continue
        kind, dur = r['label'].split(', ', 1)
        if dur not in rows:
            rows[dur] = {}
            order.append(dur)
        rows[dur][kind] = r
    body = []
    for d in order:
        s, h = rows[d]['Soft-top'], rows[d]['Hardboard']
        note = s['note'] or ''
        n = f'<span class="r-note">{e(note)}</span>' if note else ''
        body.append(f'<tr data-soft="{s["price"]}" data-hard="{h["price"]}"><th scope="row">{e(d)}{n}</th><td class="soft">{e(s["currency"])} {s["price"]}</td><td class="hard">{e(h["currency"])} {h["price"]}</td><td class="roll" aria-hidden="true"></td></tr>')
    extra = []
    for r in C['rentals']:
        if ', ' not in r['label']:
            extra.append((r['label'], r['price'], r['currency'], 'per day'))
    for r in C['priceList']:
        if 'to buy' in r['label']:
            extra.append((r['label'], r['price'], r['currency'], ''))
    ex = ''.join(f'<li><span>{e(l)}{" | " + u if u else ""}</span><b>{e(c)} {p}</b></li>' for l, p, c, u in extra)
    return f'''<div class="rates" data-show="soft">
      <div class="kind needs-js" role="group" aria-label="Board type">
        <span class="kind-pill" aria-hidden="true"></span>
        <button type="button" data-kind="soft" aria-pressed="true">Soft-top</button>
        <button type="button" data-kind="hard" aria-pressed="false">Hardboard</button>
      </div>
      <table>
        <thead><tr><th scope="col">Duration</th><th scope="col" class="soft">Soft-top</th><th scope="col" class="hard">Hardboard</th><th class="roll" aria-hidden="true"></th></tr></thead>
        <tbody>{''.join(body)}</tbody>
      </table>
      <ul class="extras">{ex}</ul>
    </div>'''

def boards():
    return f'''<section class="boards-sec" id="boards">
  <div class="boards-copy">
    <h2 class="script">{e('Board rental')}</h2>
    {ps(paras('Board rental'))}
    {btn(wa('renting a board'))}
  </div>
  <div class="boards-data">
    {chart()}
    {rate_table()}
  </div>
</section>'''

def feature():
    alt = 'Orange and peach sunset over the sea, the sun low on the horizon, lines of swell coming in and small figures in the water.'
    return f'''<section class="feature" aria-label="{e(C['featureLine'])}">
  <picture>
    <source media="(max-width:700px)" srcset="img/feature-img-018-tall-900.webp" width="900" height="975">
    <img src="img/feature-img-018-wide-1440.webp" width="1440" height="720" alt="{e(alt)}" loading="lazy" decoding="async">
  </picture>
  <p class="script">{e(C['featureLine'])}</p>
</section>'''

def sanjee():
    head = 'Sanjee, head instructor'
    alt = 'Sanjee from behind, hair tied up, turning hard on a yellow board with a pink rail, throwing white spray off a green wave.'
    cred = ''.join(f'<li>{e(c["label"])} | {e(c["issuer"])}</li>' for c in C['credentials'])
    names = {'en': 'English', 'si': 'Sinhala'}
    langs = ' | '.join(names[x] for x in C['languagesSpoken'])
    return f'''<section class="sanjee" id="sanjee">
  <div class="print-wrap" data-parallax>
    <img src="img/print-img-007-962.webp" srcset="img/print-img-007-640.webp 640w, img/print-img-007-962.webp 962w" sizes="(max-width:900px) 100vw, 620px" width="962" height="938" alt="{e(alt)}" loading="lazy" decoding="async">
  </div>
  <div class="sanjee-copy">
    <h2 class="script">{e(head)}</h2>
    {ps(paras(head), 'say')}
    <ul class="creds">{cred}<li>Languages: {langs}</li></ul>
  </div>
</section>'''

def quotes():
    q = ''.join(f'''<li class="quote"><blockquote>{e(t['quote'])}</blockquote><p class="by"><b>{e(t['author'])}</b> | Google</p></li>''' for t in C['testimonials'])
    dots = ''.join(f'<button type="button" class="dot" aria-label="Review {i + 1} of {len(C["testimonials"])}"><i></i></button>' for i in range(len(C['testimonials'])))
    return f'''<section class="quotes-sec" aria-label="Google reviews">
  <div class="quotes-head">{rating('rating-big')}</div>
  <ul class="quotes" tabindex="0" aria-label="Reviews, scrolls sideways">{q}</ul>
  <div class="dots needs-js">{dots}</div>
</section>'''

def waves():
    w = paras('Other waves, as we rate them')
    keys = ['first_time beginner', 'intermediate', 'advanced']
    wp = ''.join(f'<p class="wave" data-for="{k}">{e(t)}</p>' for k, t in zip(keys, w))
    alt6 = 'A surfer standing on a white board with arms out, riding along a green wave with white water breaking behind.'
    alt14 = 'Three thatched parasols on a sand beach, a line of surf and a green wave behind them under a grey sky.'
    return f'''<section class="waves" id="waves">
  <div class="waves-a">
    <div class="spot">
      <p class="lead-s">{e(C['spot'])}</p>
      <p>{e(C['season'])}</p>
    </div>
    <img class="print" src="img/print-img-006-848.webp" width="848" height="480" alt="{e(alt6)}" loading="lazy" decoding="async">
  </div>
  <div class="waves-b">
    <img class="print" src="img/print-img-014-1000.webp" width="1000" height="750" alt="{e(alt14)}" loading="lazy" decoding="async">
    <div class="waves-copy">
      <h2 class="script">{e('Other waves, as we rate them')}</h2>
      {wp}
    </div>
  </div>
</section>'''

def tours():
    rows = []
    tour_rows = [r for r in C['priceList'] if 'to buy' not in r['label']]
    for i, r in enumerate(tour_rows):
        m = re.match(r'^(.*?)\s*(\(.*\))?$', r['label'])
        name, when = m.group(1), m.group(2) or ''
        cls = ' first-outing' if i == 3 else ''
        rows.append(f'''<li class="tour{cls}">
      <div><h3>{e(name)}{' <span>' + e(when) + '</span>' if when else ''}</h3><p>{e(r['note'])}</p></div>
      <b class="t-price">{e(r['currency'])} {r['price']}</b>
      <a class="ico" href="{e(wa('the ' + name))}" aria-label="{e(PRIMARY)} about {e(name)}">{WA_ICON}</a>
    </li>''')
    return f'''<section class="tours" id="tuk-tuk">
  <div class="tours-copy">
    <h2 class="script">{e('By tuk-tuk')}</h2>
    {ps(paras('By tuk-tuk'))}
  </div>
  <ol class="tour-list">{''.join(rows)}</ol>
</section>'''

def back():
    alt = 'A rust-red headland with palms and tiled roofs running into a blue bay under a clear sky, seen from the sand.'
    return f'''<section class="back" aria-label="{e(C['closing'])}">
  <picture>
    <source media="(max-width:700px)" srcset="img/back-img-002-tall-900.webp" width="800" height="1500">
    <img src="img/back-img-002-wide-2000.webp" width="2000" height="1250" alt="{e(alt)}" loading="lazy" decoding="async">
  </picture>
  <div class="back-copy">
    <p>{e(C['closing'])}</p>
    {btn(wa('a surf lesson'))}
  </div>
</section>'''

def finding():
    return f'''<section class="finding" id="finding-us">
  <div>
    <h2 class="script">{e('Finding us')}</h2>
    {ps(paras('Finding us'))}
  </div>
  <div class="finding-b">
    <p class="addr">{e(C['contact']['address'])}</p>
    <div class="btn-row">{contact_buttons()}</div>
  </div>
</section>'''

def footer():
    return f'''<footer class="foot" id="book">
  <p class="foot-name">{e(BIZ)}</p>
  <div class="btn-row">
    {btn(wa('a surf lesson'), cls='btn-s')}
    <a class="btn2" href="tel:{e(PHONE)}">{PHONE_ICON}<span>Call</span></a>
    <a class="btn2" href="mailto:{e(C['contact']['email'])}">{MAIL_ICON}<span>Email</span></a>
  </div>
  <p class="foot-addr">{e(C['contact']['address'])}</p>
</footer>'''

def bar():
    return f'''<div class="bar">
  {btn(wa('a surf lesson'))}
  <a class="ico ico-l" href="tel:{e(PHONE)}" aria-label="Call">{PHONE_ICON}</a>
</div>'''

def spring(zeta=.69, n=16, omega=13.0):
    # a real damped spring sampled for CSS linear(): overshoot about 1.05, settled inside the duration
    wd = omega * math.sqrt(1 - zeta * zeta)
    pts = []
    for i in range(n + 1):
        t = i / n * .6
        v = 1 - math.exp(-zeta * omega * t) * (math.cos(wd * t) + zeta * omega / wd * math.sin(wd * t))
        pts.append(f'{v:.3f}')
    pts[-1] = '1'
    return 'linear(' + ','.join(pts) + ')'

def page():
    css = (HERE / 'page.css').read_text().replace('__SPRING__', spring())
    js = (HERE / 'swell.js').read_text() + (HERE / 'page.js').read_text()
    fonts = 'https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Manrope:wght@400;600;700;800&display=swap'
    title = f"{BIZ} | Surf lessons in Weligama"
    data = {'wa': WA_DIGITS, 'biz': BIZ, 'levels': {k: s for k, _, s in TILES}}
    return f'''<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(C['tagline'])}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(C['tagline'])}">
<meta name="theme-color" content="#a4bcd8">
<meta name="color-scheme" content="light">
<script>document.documentElement.className='js'</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{fonts}" rel="stylesheet">
<style>{css}</style>
</head>
<body>
<a class="skip" href="#lessons">Skip to lessons</a>
{header()}
<main>
{hero()}
{where()}
{message()}
{boards()}
{feature()}
{sanjee()}
{quotes()}
{waves()}
{tours()}
{back()}
{finding()}
</main>
{footer()}
{bar()}
<script>var SITE={json.dumps(data)};{js}</script>
</body>
</html>
'''

(DIST / 'index.html').write_text(page())
print('wrote', DIST / 'index.html', (DIST / 'index.html').stat().st_size)
