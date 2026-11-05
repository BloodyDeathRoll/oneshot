#!/usr/bin/env python3
# Builds dist/index.html for the interactive mockup ("Where you start") from copy/en.json, so the words are
# the passed copy and nothing retyped. Run make-media.sh first. Run from anywhere.
import datetime, html, json, math, pathlib, re, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
DIST = HERE.parent / 'dist'
C = json.loads((SITE / 'copy' / 'en.json').read_text())
e = lambda s: html.escape(str(s), quote=True)
PRIMARY = C['ctas']['primary']
WA_DIGITS = C['contact']['whatsapp'].lstrip('+')
PHONE = C['contact']['phone']
PHONE_PRINT = f'+{PHONE[1:3]} {PHONE[3:5]} {PHONE[5:8]} {PHONE[8:]}'
EMAIL = C['contact']['email']
BIZ = C['businessName']
BLOCK = {b['heading']: b for b in C['copyBlocks']}
GENERIC = 'a surf lesson'
PRICE_DATE = 'All prices are as of 5 November 2026.'
assert PRICE_DATE in BLOCK['Before you book']['body']

def paras(heading):
    return BLOCK[heading]['body'].split('\n\n')

def ps(items, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{e(t)}</p>' for t in items)

def wa(ask):
    text = f"Hello {BIZ}, I'd like to ask about {ask}."
    return f"https://wa.me/{WA_DIGITS}?text=" + urllib.parse.quote(text)

def lesson_ask(name):
    # "Private Coaching" takes no article; the other two lessons do. Nothing here states a fact.
    return name if name == 'Private Coaching' else f'the {name}'

WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.9 1.3-.9 2.1 0 .9.4 1.9 1 2.6 1.2 1.7 2.7 3 4.6 3.8.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.6-.2Z"/></svg>'
PHONE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.4 9 3c.5-.1 1 .2 1.2.7l1.1 2.8c.2.4 0 .9-.3 1.2L9.5 9.1a12.6 12.6 0 0 0 5.4 5.4l1.4-1.5c.3-.3.8-.5 1.2-.3l2.8 1.1c.5.2.8.7.7 1.2l-.4 2.4c-.1.9-.9 1.6-1.8 1.6C10.7 19 5 13.300 5 5.200c0-.9.7-1.700 1.600-1.800Z"/></svg>'
MAIL_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.5l8 5 8-5V7H4Zm16 2.900-8 5-8-5V17h16V9.900Z"/></svg>'
PIN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7.500 7.500 0 0 0-7.500 7.500C4.500 15 12 22 12 22s7.500-7 7.500-12.500A7.500 7.500 0 0 0 12 2Zm0 10.300a2.800 2.800 0 1 1 0-5.600 2.800 2.800 0 0 1 0 5.600Z"/></svg>'

def btn(ask=GENERIC, label=None, cls=''):
    # data-ask: what this button is about. page.js adds the visitor's level, date and people to every one of them.
    label = label or PRIMARY
    own = '' if ask == GENERIC else f' data-own="1"'
    return f'<a class="btn {cls}" href="{e(wa(ask))}" data-ask="{e(ask)}"{own}>{WA_ICON}<span>{e(label)}</span></a>'

def contact_buttons(with_map=True):
    m = C['contact']['mapUrl']
    a = f'<a class="btn2" href="{e(m)}">{PIN_ICON}<span>Open in Google Maps</span></a>' if with_map else ''
    return (a + f'<a class="btn2" href="tel:{e(PHONE)}" aria-label="Call {e(PHONE_PRINT)}">{PHONE_ICON}<span>{e(PHONE_PRINT)}</span></a>'
            f'<a class="btn2" href="mailto:{e(EMAIL)}" aria-label="Email {e(EMAIL)}">{MAIL_ICON}<span>{e(EMAIL)}</span></a>')

NAV = [('Lessons', 'lessons'), ('Boards', 'boards'), ('Sanjee', 'sanjee'), ('Waves', 'waves'), ('Tuk-tuk', 'tuk-tuk'), ('Finding us', 'finding-us')]

def header():
    links = ''.join(f'<a href="#{i}">{n}</a>' for n, i in NAV)
    return f'''<header class="hdr" id="top">
  <a class="brand" href="#top">{e(BIZ)}</a>
  <nav class="nav" aria-label="Sections">{links}</nav>
  {btn(cls='btn-s hdr-cta needs-js')}
  <details class="menu">
    <summary>Menu</summary>
    <nav class="menu-panel" aria-label="Sections, menu">{links}</nav>
  </details>
</header>'''

def hero():
    alt = 'Orange and peach sunset over the sea, the sun low on the horizon, lines of swell with small figures in the water, and a wave breaking on to the sand.'
    # the two crops below are make-media.sh's, as fractions of the 1440x1920 photograph: x y w h
    wide = f'0 {400 / 1920:.5f} 1 {1100 / 1920:.5f}'
    tall = f'{110 / 1440:.5f} 0 {1040 / 1440:.5f} 1'
    return f'''<section class="hero" aria-label="{e(BIZ)}">
  <div class="hero-copy">
    <h1>Surf lessons in Weligama</h1>
    {btn(cls='hero-btn')}
  </div>
  <div class="stage" data-swell data-crop-wide="{wide}" data-crop-tall="{tall}">
    <picture>
      <source media="(max-width:700px)" srcset="img/hero-img-018-tall-1000.webp" width="1000" height="1846">
      <img src="img/hero-img-018-wide-1440.webp" width="1440" height="1100" alt="{e(alt)}" fetchpriority="high" decoding="async">
    </picture>
    <canvas aria-hidden="true"></canvas>
  </div>
</section>'''

TILES = [('first_time', 'Total beginner', "I'm a total beginner.", 'tile-img-005-380.webp', 380, 464),
         ('beginner', 'I can stand up', "I'm a beginner who can already stand up.", 'tile-img-006-384.webp', 384, 480),
         ('intermediate', 'Intermediate', "I'm an intermediate surfer.", 'tile-img-009-520.webp', 520, 650),
         ('advanced', 'Advanced', "I'm an advanced surfer.", 'tile-img-010-520.webp', 520, 650),
         ('unsure', 'Not sure', "I'm not sure of my level yet.", 'tile-img-012-750.webp', 750, 558)]

def where():
    who = paras('Who we teach')
    tiles = ''.join(
        f'<button type="button" class="tile" data-level="{k}" aria-pressed="false">'
        f'<img src="img/{f}" width="{w}" height="{h}" alt="" loading="lazy" decoding="async"><span class="tile-l">{e(l)}</span></button>'
        for k, l, _, f, w, h in TILES)
    return f'''<section class="where">
  <div class="where-top">
    <p class="lead">{e(C['tagline'])}</p>
    <div class="who">
      <h2 class="script">{e('Who we teach')}</h2>
      {ps(who)}
    </div>
  </div>
  <div class="tiles needs-js" role="group" aria-label="Your level">
    {tiles}
    <span class="tile-ring" aria-hidden="true"></span>
  </div>
  <div class="fits needs-js" id="fits" aria-live="polite"></div>
  <div class="lessons-head" id="lessons">
    <h2 class="script">{e('Lessons')}</h2>
    <p>{e(paras('Lessons')[0])}</p>
  </div>
  {cards()}
  {after_cards()}
</section>'''

LEVEL_WORDS = {'first_time': 'Total beginner', 'beginner': 'Beginner', 'intermediate': 'Intermediate', 'advanced': 'Advanced'}

def hours(mins):
    return f'{mins // 60}\u00a0hours'

def cards():
    out = []
    for l in C['lessons']:
        name = l['label']
        if name == 'Week Intensive':
            # "2 hours each": dossier lessons[2].note, "5 private 2-hour sessions" (coordinator's exception)
            details = [l['groupSize'], hours(l['durationMin']) + ' each']
        else:
            words = [LEVEL_WORDS[x] for x in l['level']]
            words = [words[0]] + [w.lower() for w in words[1:]]
            details = ([l['groupSize']] if l['groupSize'] else []) + [', '.join(words), hours(l['durationMin'])]
        unit = 'per lesson' if l['unit'] == 'per_lesson' else ''
        unit_html = f' <span class="per">{unit}</span>' if unit else ''
        levels = ' '.join(l['level'] or [])
        out.append(f'''<li class="card" id="card-{l['label'].split()[0].lower()}" data-lesson="{e(name)}" data-ask="{e(lesson_ask(name))}" data-levels="{levels}" data-price="{e(l['currency'])} {l['price']}">
      <span class="foryou" aria-hidden="true"><i></i>for you</span>
      <h3>{e(name)}</h3>
      <p class="details">{' | '.join(e(d) for d in details)}</p>
      <p class="price">{e(l['currency'])} {l['price']}{unit_html}</p>
      <p class="incl">{e(l['includes'])}</p>
      <div class="card-actions">
        {btn(lesson_ask(name))}
        <button type="button" class="add needs-js" aria-pressed="false"><span class="add-a">Add to my message</span><span class="add-b">In my message</span></button>
      </div>
    </li>''')
    return f'<ul class="cards">{"".join(out)}</ul>'

def rating(cls=''):
    r = C['ratings'][0]
    d = datetime.date.fromisoformat(r['capturedAt'])
    when = f"{d.day} {d.strftime('%B %Y')}"
    return f'''<a class="rating {cls}" href="{e(r['url'])}"><b>{r['score']}/{r['scale']}</b><span class="r-t"><span>{r['count']} Google reviews</span><i> | </i><span>as of {when}</span></span></a>'''

def after_cards():
    return f'''<div class="after-cards">
    <div class="after-a">
      <p>{e(paras('Lessons')[2])}</p>
      {rating()}
    </div>
    <p class="card-more week-more">{e(paras('Lessons')[1])}</p>
  </div>'''

def message():
    b = paras('Before you book')
    lessons = ''.join(f'<button type="button" class="chip" data-group="lesson" data-value="{e(l["label"])}" aria-pressed="false">{e(l["label"])}</button>' for l in C['lessons'])
    lessons += '<button type="button" class="chip" data-group="lesson" data-value="unsure" aria-pressed="false">Not sure</button>'
    people = ''.join(f'<button type="button" class="chip" data-group="people" data-value="{v}" aria-pressed="false">{l}</button>' for v, l in [('1', '1'), ('2', '2'), ('3', '3+'), ('unsure', 'Not sure')])
    return f'''<section class="msg-wrap" id="message">
  <div class="msg needs-js">
    <p class="msg-title" id="msg-title">Your message</p>
    <div class="bubble" role="status" aria-live="polite" aria-labelledby="msg-title"><p id="bubble"></p></div>
    <div class="msg-controls">
      <div class="ctl" role="group" aria-label="Lesson"><span class="ctl-l">Lesson</span><div class="chips">{lessons}</div></div>
      <div class="ctl" role="group" aria-label="Date"><span class="ctl-l">Date</span><div class="chips">
        <label class="date"><input type="date" id="date" aria-label="Date"></label>
        <button type="button" class="chip" data-group="date" data-value="unsure" aria-pressed="false">Not sure</button>
      </div></div>
      <div class="ctl" role="group" aria-label="People"><span class="ctl-l">People</span><div class="chips">{people}</div></div>
    </div>
    <a class="btn msg-send" id="send" href="{e(wa(GENERIC))}" data-ask="{e(GENERIC)}">{WA_ICON}<span>{e(PRIMARY)}</span></a>
  </div>
  <div class="before">
    <h2 class="script">{e('Before you book')}</h2>
    {ps(b)}
  </div>
</section>'''

# ---- boards, to scale: lengths from copyBlocks[3] para 2; outlines drawn to one scale in inches.
# Widths and shapes are illustration, no width is printed. Colours are sampled from the school's own photographs.
def outline(L, W, nose, tail):
    cx, h = W / 2, W / 2
    a, b = ((h * .14, 0), (h * .94, L * .2)) if nose == 'point' else ((h * .62, 0), (h * .98, L * .1))
    wp = L * .47
    tw, c = {'squash': (h * .46, 1.4), 'swallow': (h * .62, .4), 'round': (h * .34, 3.0)}[tail]
    t1, t2 = (h, L * .72), (tw + h * .2, L * .95)
    f = lambda x: f'{x:.1f}'
    right = f'M{f(cx)},0 C{f(cx + a[0])},{f(a[1])} {f(cx + b[0])},{f(b[1])} {f(cx + h)},{f(wp)} C{f(cx + t1[0])},{f(t1[1])} {f(cx + t2[0])},{f(t2[1])} {f(cx + tw)},{f(L - c)}'
    if tail == 'swallow':
        mid = f'L{f(cx + tw - .4)},{f(L)} L{f(cx)},{f(L - W * .24)} L{f(cx - tw + .4)},{f(L)} L{f(cx - tw)},{f(L - c)}'
    elif tail == 'round':
        mid = f'C{f(cx + tw)},{f(L - .6)} {f(cx + tw * .5)},{f(L)} {f(cx)},{f(L)} C{f(cx - tw * .5)},{f(L)} {f(cx - tw)},{f(L - .6)} {f(cx - tw)},{f(L - c)}'
    else:
        mid = f'Q{f(cx + tw)},{f(L)} {f(cx + tw - 1.6)},{f(L)} L{f(cx - tw + 1.6)},{f(L)} Q{f(cx - tw)},{f(L)} {f(cx - tw)},{f(L - c)}'
    left = f'C{f(cx - t2[0])},{f(t2[1])} {f(cx - t1[0])},{f(t1[1])} {f(cx - h)},{f(wp)} C{f(cx - b[0])},{f(b[1])} {f(cx - a[0])},{f(a[1])} {f(cx)},0 Z'
    return f'{right} {mid} {left}'

def inches(s):
    ft, inch = s.split("'")
    return int(ft) * 12 + int(inch or 0)

# name, min, max, width, nose, tail, deck colour, nose-range colour, rail colour
BOARDS = [("Fish and hybrids", "5'8", "6'4", 20.5, 'point', 'swallow', '#E9A45C', '#F4CFA4', '#C97A2E'),
          ("Performance shortboards", "5'10", "6'2", 18.5, 'point', 'squash', '#E9D8B8', '#F3EAD8', '#C72C60'),
          ("Mid-lengths and funboards", "6'8", "7'4", 21, 'round', 'round', '#53969D', '#A5CBCF', '#3A7379'),
          ("Mini-mals", "7'2", "7'10", 22.5, 'round', 'round', '#91B0C8', '#C6D6E3', '#6C8FA9'),
          ("Soft-top foamies", "8'0", "9'0", 24, 'round', 'squash', '#DE1446', '#F08CA3', '#AE0F36'),
          ("Longboards", "9'0", "9'4", 23, 'round', 'round', '#1E78C8', '#8FBBE3', '#155C9C')]

def chart():
    defs, items = [], []
    for i, (name, lo, hi, W, nose, tail, deck, tip, rail) in enumerate(BOARDS):
        a, b = inches(lo), inches(hi)
        stop = (1 - a / b) * 100
        p = outline(b, W, nose, tail)
        cx = W / 2
        end = b - W * .26 if tail == 'swallow' else b - .5
        fin_y = b - (W * .42)
        defs.append(f'<linearGradient id="g{i}" x1="0" y1="0" x2="0" y2="1"><stop offset="{stop:.2f}%" stop-color="{tip}"/><stop offset="{stop:.2f}%" stop-color="{deck}"/></linearGradient>')
        fx = W * {'swallow': .27, 'squash': .2, 'round': .15}[tail]
        fins = f'<g fill="{rail}"><path d="M{cx - fx:.1f},{fin_y:.1f} q-.5,3 .9,4.2 l.5,-.4 q-.8,-2 -.2,-3.8 Z"/><path d="M{cx + fx:.1f},{fin_y:.1f} q.5,3 -.9,4.2 l-.5,-.4 q.8,-2 .2,-3.8 Z"/></g>'
        v = (f'<svg class="b-v" viewBox="-1 -1 {W + 2} {b + 2}" aria-hidden="true"><path d="{p}" fill="url(#g{i})" stroke="{rail}" stroke-width=".7"/>'
             f'<path d="M{cx},.6 V{end:.1f}" stroke="#fff" stroke-width=".4" stroke-opacity=".75" fill="none"/>{fins}</svg>')
        items.append(f'<li class="board" style="--l:{b};--w:{W};--i:{i}">{v}<p><b>{e(name)}</b><span>{lo}–{hi}</span></p></li>')
    feet = ''.join(f'<span style="--ft:{n}">{n}\'</span>' for n in (5, 6, 7, 8, 9))
    return f'''<div class="chart">
      <svg width="0" height="0" class="defs" aria-hidden="true">{''.join(defs)}</svg>
      <div class="chart-in">
        <div class="feet" aria-hidden="true">{feet}</div>
        <ul class="boards" tabindex="0" aria-label="Board types and lengths">{''.join(items)}</ul>
      </div>
    </div>'''

def rate_table():
    rows, order = {}, []
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
      <p class="asof">{e(PRICE_DATE)}</p>
    </div>'''

def boards():
    return f'''<section class="boards-sec" id="boards">
  <div class="boards-copy">
    <h2 class="script">{e('Board rental')}</h2>
    {ps(paras('Board rental'))}
    {btn('renting a board')}
  </div>
  <div class="boards-data">
    {chart()}
    {rate_table()}
  </div>
</section>'''

def feature():
    alt = 'A surfer lying on a board, back to the camera, paddling at a low green wave with one arm lifted in a small splash. Two more heads in the water beyond it, open sea and a pale sky above.'
    return f'''<section class="feature" aria-label="{e(C['featureLine'])}">
  <p class="script">{e(C['featureLine'])}</p>
  <picture>
    <source media="(max-width:700px)" srcset="img/feature-img-009-near-1040.webp" width="1040" height="800">
    <img src="img/feature-img-009-wide-1600.webp" width="1600" height="860" alt="{e(alt)}" loading="lazy" decoding="async">
  </picture>
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
        ask = f'the {name} tour'
        cls = ' first-outing' if i == 3 else ''
        rows.append(f'''<li class="tour{cls}">
      <div><h3>{e(name)}{' <span>' + e(when) + '</span>' if when else ''}</h3><p>{e(r['note'])}</p></div>
      <b class="t-price">{e(r['currency'])} {r['price']}</b>
      <a class="ico" href="{e(wa(ask))}" data-ask="{e(ask)}" data-own="1" aria-label="{e(PRIMARY)} about {e(name)}">{WA_ICON}</a>
    </li>''')
    return f'''<section class="tours" id="tuk-tuk">
  <div class="tours-copy">
    <h2 class="script">{e('By tuk-tuk')}</h2>
    {ps(paras('By tuk-tuk'))}
  </div>
  <div>
    <ol class="tour-list">{''.join(rows)}</ol>
    <p class="asof asof-t">{e(PRICE_DATE)}</p>
  </div>
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
    {btn()}
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
    {btn(cls='btn-s')}
    {contact_buttons(False)}
  </div>
  <p class="foot-addr">{e(C['contact']['address'])}</p>
</footer>'''

def bar():
    return f'''<div class="bar">
  <a class="bar-msg needs-js" href="#message" tabindex="-1" aria-label="Your message"><span id="bar-text"></span></a>
  {btn()}
  <a class="ico ico-l" href="tel:{e(PHONE)}" aria-label="Call {e(PHONE_PRINT)}">{PHONE_ICON}</a>
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
    fonts = 'https://fonts.googleapis.com/css2?family=Courgette&family=Manrope:wght@400;600;700;800&display=swap'
    title = f"{BIZ} | Surf lessons in Weligama"
    data = {'wa': WA_DIGITS, 'biz': BIZ, 'generic': GENERIC, 'levels': {t[0]: t[2] for t in TILES},
            'lessonAsk': {l['label']: lesson_ask(l['label']) for l in C['lessons']}}
    return f'''<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(C['tagline'])}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(C['tagline'])}">
<meta property="og:type" content="website">
<meta property="og:image" content="img/og-img-018-1200.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="theme-color" content="#c9b9a8">
<meta name="color-scheme" content="light">
<script>document.documentElement.className='js'</script>
<link rel="preload" as="image" href="img/hero-img-018-tall-1000.webp" media="(max-width:700px)" fetchpriority="high">
<link rel="preload" as="image" href="img/hero-img-018-wide-1440.webp" media="(min-width:701px)" fetchpriority="high">
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
