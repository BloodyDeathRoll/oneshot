#!/usr/bin/env python3
"""Assemble the two mockup pages of "The sign" from src/ + the audited copy (copy/en.json).
Run from the repo root:  python3 sites/global-surf-adventures/mockups/the-sign/src/build.py
"""
import json, html, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '../../../../..'))
DIST = os.path.join(HERE, '..', 'dist')
COPY = json.load(open(os.path.join(ROOT, 'sites/global-surf-adventures/copy/en.json')))
X = COPY['mockup_extras']
e = lambda s: html.escape(s, quote=True)
rd = lambda f: open(os.path.join(HERE, f)).read()

LOGO_D = open(os.path.join(HERE, 'logo-d.txt')).read().strip()
WA = next(b['url'] for b in COPY['bookingLinks'] if 'wa.me' in b['url'])

ICON = {
 'bed': '<path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 14.5h18M3 18v2.5M21 18v2.5M6.5 9V6.5h4.5V9"/>',
 'bowl': '<path d="M3 11.5h18a9 9 0 0 1-18 0zM8.5 21h7M10 3.5c1.2 1.5-.8 2.8.4 4.5M14 3.5c1.2 1.5-.8 2.8.4 4.5"/>',
 'plate': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
 'book': '<path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5 2.5 2.5 0 0 0 6.5 23H20v-5"/>',
 'board': '<path d="M12 1.8c4.4 4.2 5.4 12.6 0 20.4-5.4-7.8-4.4-16.2 0-20.4zM12 15v4.5"/>',
 'van': '<path d="M2.5 6.5h12v10h-12zM14.5 9.5h4l3 3.5v3.5h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>',
 'map': '<path d="M9 4 3 6.2v14L9 18l6 2.2 6-2.2v-14L15 6.2 9 4zM9 4v14M15 6.2v14"/>',
 'water': '<path d="M12 2.8c4.2 5 6.3 8.4 6.3 11.4a6.3 6.3 0 0 1-12.6 0c0-3 2.1-6.4 6.3-11.4z"/>',
 'cup': '<path d="M4 8.5h12.5v4.5a6 6 0 0 1-6 6h-.5a6 6 0 0 1-6-6zM16.5 10h1.8a2.3 2.3 0 0 1 0 4.6h-1.8M8 2.5v3M12 2.5v3"/>',
}
SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + ''.join(
  f'<symbol id="ic-{k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{v}</symbol>' for k, v in ICON.items()) + '''
<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></symbol>
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

ALT = {  # from dossier.images[].shows (harvester), lightly phrased as sentences
 'img-063': 'Loft dorm room with single beds and a ladder', 'img-095': 'Single beds under the timber roof of the loft',
 'img-042': 'Beds on the timber loft floor', 'img-064': 'Open-air bathroom with a palm growing through it',
 'img-050': 'Bungalow entrance with a hammock', 'img-080': 'Room with two beds and rattan lamps',
 'img-084': 'Room with a rattan pendant lamp', 'img-083': 'Towels and plants on a bench',
 'img-069': 'Open-air bathroom with a glass shower', 'img-079': 'Bathroom with a glass shower',
 'img-081': 'Double room with a hammock by the door', 'img-082': 'Double room with glass doors to the garden',
 'img-041': 'Double room with a painted print', 'img-043': 'Double room with rattan stools',
 'img-044': 'Sofa below two wave prints', 'img-071': 'Framed wave prints on a white wall',
}
DORM_SKIP = {'img-078'}  # same frame as img-063 (DSC8048); shown once

ROOM_KEY = ['dorm', 'twin', 'double']

def room_gallery(r, idx, cls='rg'):
    imgs = [i for i in r['gallery'] if i not in DORM_SKIP]
    out = [f'<div class="{cls}" data-gallery>']
    out.append(f'<div class="rg-track" tabindex="0" role="region" aria-label="{e(r["label"])}, photographs">')
    for n, i in enumerate(imgs):
        w = 1400 if i == 'img-095' else 1600
        out.append(f'<img src="img/{i}-800.webp" srcset="img/{i}-800.webp 800w, img/{i}-{w}.webp {w}w" sizes="(max-width: 620px) 84vw, 900px" width="{w}" height="{round(w/1.5)}" loading="lazy" alt="{e(ALT[i])}">')
    out.append('</div>')
    out.append('<button class="arrow prev" type="button" aria-label="Previous photograph"><svg><use href="#i-l"/></svg></button>')
    out.append('<button class="arrow next" type="button" aria-label="Next photograph"><svg><use href="#i-r"/></svg></button>')
    out.append('<div class="dots" aria-hidden="true"></div></div>')
    return '\n'.join(out), imgs

def price_note(r):
    s = r['supplement']
    if 'display' in s:
        return s['display']
    return s['display_one_guest'] + ' | ' + s['display_couple']

def rooms_home():
    out = []
    for k, r in zip(ROOM_KEY, X['rooms']):
        g, _ = room_gallery(r, k)
        out.append(f'''<article class="room" id="room-{k}" aria-labelledby="rt-{k}">
{g}
<div class="wrap room-t">
  <div><h3 id="rt-{k}">{e(r["label"])}</h3><p class="room-line">{e(r["line"])}</p></div>
  <div><p>{e(r["description"])}</p><p class="detail">{e(r["details"])}</p><p class="room-price">{e(price_note(r))}</p>
  <a class="btn btn-book" href="book/?room={k}#step-room">{e(X["ctas"]["room"])}</a></div>
</div>
</article>''')
    return '\n'.join(out)

def incl_list(level, hidden=False, cls='ilist'):
    items = X['inclusions'][f'level_{level}']
    li = ''.join(f'<li><svg><use href="#ic-{i["icon"]}"/></svg>{e(i["text"])}</li>' for i in items)
    return f'<ul class="{cls}" data-incl-list="{level}"{" hidden" if hidden else ""}>{li}</ul>'

def quotes():
    src = {'booking': 'Booking.com', 'other': 'globalsurf.com'}
    return '\n'.join(f'<blockquote class="quote"><p>“{e(t["quote"])}”</p><footer><strong>{e(t["author"])}</strong> | on {src[t["source"]]}</footer></blockquote>' for t in COPY['testimonials'])

def footer(prefix=''):
    c = COPY['contact']; S = X['socials']; C = X['ctas']
    info = next(b for b in COPY['copyBlocks'] if b['heading'] == 'Getting here')['body']
    return f'''<footer class="foot" id="contact">
  <div class="wrap foot-g">
    <div>
      <a class="logo" href="{prefix or './'}" aria-label="{e(X["logo"]["home_link_label"])}"><svg viewBox="12 21 237 46" aria-hidden="true"><path fill="currentColor" d="{LOGO_D}"/></svg></a>
      <p style="margin-top:22px;max-width:320px">{e(COPY["tagline"])}</p>
    </div>
    <div>
      <h2>Talk to us</h2>
      <div class="stack">
        <a class="btn btn-soft" href="{e(WA)}"><svg class="wa"><use href="#i-wa"/></svg>{e(C["whatsapp_footer"])}</a>
        <a class="btn btn-soft" href="tel:{c["phone"]}"><svg><use href="#i-phone"/></svg>{e(C["call"])}</a>
        <a class="btn btn-soft" href="mailto:{c["email"]}"><svg><use href="#i-mail"/></svg>{e(C["email"])}</a>
      </div>
    </div>
    <div>
      <h2>{e(X["section_titles"]["getting_here"])}</h2>
      <address>{e(c["address"])}</address>
      <p class="small">{e(info)}</p>
      <p class="small">{e(X["detail_lines"]["stay"])}</p>
      <a class="btn btn-soft" href="{e(c["mapUrl"])}" target="_blank" rel="noopener"><svg><use href="#i-pin"/></svg>{e(C["map"])}</a>
    </div>
    <div>
      <h2>Follow</h2>
      <div class="social">
        <a href="{S["instagram"]}" target="_blank" rel="noopener" aria-label="Instagram"><svg><use href="#i-ig"/></svg></a>
        <a href="{S["youtube"]}" target="_blank" rel="noopener" aria-label="YouTube"><svg><use href="#i-yt"/></svg></a>
        <a href="{S["facebook"]}" target="_blank" rel="noopener" aria-label="Facebook"><svg><use href="#i-fb"/></svg></a>
      </div>
    </div>
  </div>
  <div class="wrap legal"><span>© Global Surf Adventures</span><a href="https://www.globalsurf.com/terms-conditions/" target="_blank" rel="noopener">Terms and conditions</a></div>
</footer>'''

def fix_paths(s, prefix):
    if not prefix: return s
    s = re.sub(r'(src|href|srcset|poster|data-[a-z-]+)="((?:img|video)/)', lambda m: f'{m.group(1)}="{prefix}{m.group(2)}', s)
    return re.sub(r'(w, )(img/)', lambda m: m.group(1) + prefix + m.group(2), s)

def build_home():
    s = rd('index.src.html')
    s = s.replace('/*@@CSS@@*/', rd('common.css') + rd('home.css'))
    s = s.replace('<!--@@SPRITE@@-->', SPRITE).replace('@@LOGO@@', LOGO_D)
    s = s.replace('<!--@@ROOMS@@-->', rooms_home())
    s = s.replace('<!--@@INCL@@-->', incl_list(1) + incl_list(2, True) + incl_list(3, True))
    s = s.replace('<!--@@QUOTES@@-->', quotes())
    s = s.replace('<!--@@FOOTER@@-->', footer())
    s = s.replace('/*@@JS@@*/', rd('common.js') + rd('home.js'))
    open(os.path.join(DIST, 'index.html'), 'w').write(s)

def build_book():
    s = rd('book.src.html')
    s = s.replace('/*@@CSS@@*/', rd('common.css') + rd('book.css'))
    s = s.replace('<!--@@SPRITE@@-->', SPRITE).replace('@@LOGO@@', LOGO_D)
    # rooms (radio cards with a gallery each)
    parts = []
    for k, r in zip(ROOM_KEY, X['rooms']):
        g, imgs = room_gallery(r, k, 'rg bk-rg')
        parts.append(f'''<div class="rcard" data-room="{k}" data-engine-title="{e(r["engine_title"])}">
{g}
<label class="rpick"><input type="radio" name="room" value="{k}" form="none"{" checked" if k == "dorm" else ""}>
<span class="rpick-t"><strong>{e(r["label"])}</strong><span>{e(r["line"])}</span><span class="detail">{e(r["details"])}</span>
<span class="rprice" data-rprice>{e(price_note(r))}</span></span><span class="tick"><svg><use href="#i-check"/></svg></span></label>
<p class="rstate" data-rstate hidden></p>
</div>''')
    s = s.replace('<!--@@BKROOMS@@-->', '\n'.join(parts))
    s = s.replace('<!--@@BKINCL@@-->', incl_list(1, cls='ilist bk') + incl_list(2, True, 'ilist bk') + incl_list(3, True, 'ilist bk'))
    # JS off: check-out as its own select (name=end), grouped by check-in, from the same snapshot calendar
    import datetime as dt
    starts = re.findall(r'<option value="(\d{4}-\d\d-\d\d)">', s)
    f = lambda d: d.strftime('%a %-d %b %Y')
    groups = []
    for st in starts:
        d0 = dt.date.fromisoformat(st)
        opts = ''.join(f'<option value="{(d0 + dt.timedelta(days=n)).isoformat()}">{n} nights, to {f(d0 + dt.timedelta(days=n))}</option>' for n in (7, 14, 21, 28))
        groups.append(f'<optgroup label="From {f(d0)}">{opts}</optgroup>')
    nojs = ('<noscript><div class="fl has nojs-end"><select id="f-end" name="end"><option value="">Choose your check-out</option>'
            + ''.join(groups) + '</select><label for="f-end">Check-out</label><svg class="chev"><use href="#i-chev"/></svg></div></noscript>')
    s = s.replace('<!--@@NOJSEND@@-->', nojs)
    s = s.replace('<!--@@FOOTER@@-->', footer('../'))
    s = s.replace('/*@@JS@@*/', rd('common.js') + rd('book.js'))
    s = fix_paths(s, '../')
    s = s.replace('url(video/', 'url(../video/')
    os.makedirs(os.path.join(DIST, 'book'), exist_ok=True)
    open(os.path.join(DIST, 'book', 'index.html'), 'w').write(s)

build_home()
if os.path.exists(os.path.join(HERE, 'book.src.html')):
    build_book()
print('built')
