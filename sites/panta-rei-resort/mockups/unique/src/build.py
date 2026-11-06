#!/usr/bin/env python3
"""Builds dist/index.html of the Panta Rei "unique" mockup (From the pool to the sea).

Every word a visitor reads about the business comes from sites/panta-rei-resort/copy/en.json,
inserted here verbatim; this file only holds the layout, interface labels and the script.
Run from anywhere:  python3 sites/panta-rei-resort/mockups/unique/src/build.py
"""
import html, json, re, pathlib, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
C = json.loads((ROOT / 'sites/panta-rei-resort/copy/en.json').read_text())
OUT = HERE.parent / 'dist' / 'index.html'

e = lambda s: html.escape(s, quote=True)
def paras(body):
    return ''.join(f'<p>{e(p)}</p>' for p in body.split('\n\n'))
def block(heading):
    return next(b for b in C['copyBlocks'] if b['heading'] == heading)
def price(n):
    return f'{n:,}'

WELCOME = block('Welcome to Panta Rei')
POOL = block('The pool')
FOOD = block('Restaurant and bar')
FIT = block('Panta Fitness Club')
SURF = block('After the surf')
STAY = block('Four ways to stay')
GROUPS = block('Groups and retreats')
HERE_BLOCK = block('Getting here and around')
W1, W2 = WELCOME['body'].split('\n\n')
POOL1 = POOL['body'].split('\n\n')[0]
STAY1, STAY2 = STAY['body'].split('\n\n')

ENGINE = C['bookingLinks'][0]['url']
ROOM_URL = {b['label']: b['url'] for b in C['bookingLinks'][1:]}
WA_NUM = C['contact']['whatsapp'].lstrip('+')
TEL = C['contact']['phone']
def wa(text):
    return f'https://wa.me/{WA_NUM}?text=' + urllib.parse.quote(text)
WA_HELLO = wa("Hi Panta Rei! I'd like to ask about a stay.")
WA_GROUP = wa("Hi Panta Rei! We're planning a group stay and would like to ask about it.")
MAPS = C['contact']['mapUrl']
RATE = {r['platform']: r for r in C['ratings']}
B, G = RATE['booking'], RATE['google']
CAPTURED = '6 Nov 2026'  # ratings[].capturedAt and the prices' fetched_at, 2026-11-06

# the three set-piece captions: existing copy lines, verbatim (a is an excerpt of W2's first sentence)
CAP_A = '16 bungalows, each with its own charm and style'
CAP_B = 'The bungalows sit in a ring around a long pool'  # verbatim excerpt of The pool ¶1 (≤ 12 words, 4f round 2)
CAP_C = C['spot']
assert CAP_A in W2 and CAP_B in POOL['body'] and CAP_C == C['spot']

ROOMS = [
    ('Double Room', 'double', ['028', '031', '029', '007', '013'],
     ['Double Room: bed with a rattan arch headboard and a teak drawer base, rattan pendant lamps',
      'Bedroom with tall teak French windows open to the garden and a rattan arch headboard',
      'Bathroom: white basin counter with a rattan cabinet, blue crazy-paving tiles and a window to the trees',
      'Bed with a striped throw, rattan-panel wardrobe doors and an orange rattan armchair',
      'Bed facing a rattan-panel wardrobe and a slatted bathroom door, round rattan rug']),
    ('Triple Room', 'triple', ['037', '034', '036', '010', '011'],
     ['Triple Room: bed with a rattan arch headboard, a pink rocking chair and an arched rattan mirror',
      'Freestanding white bathtub under wooden-framed windows, blue crazy-paving tiles by the shower',
      'Bungalow front: red tile roof, white walls, teak doors and two rattan chairs on the terrace',
      'Bed under a vaulted white ceiling, an orange rattan armchair and an arched mirror',
      'A straw bag and a red cloth on wall hooks, an arched rattan mirror, the bathtub beyond']),
    ('Family Villa', 'family', ['038', '040', '012', '014', '015'],
     ['Family Villa bedroom with tall teak French windows to the garden and a rattan arch headboard',
      'The private outdoor bath: a white tub behind teak-framed glass doors, palms over the garden wall',
      'Sliding glass doors open to the lawn and pool, a surfboard leaning outside, a hat on the bed',
      'Bed under a palm-fan headboard with rattan pendant lamps and open shelving',
      'White villa with glass sliding doors behind dense tropical planting and a stone path']),
    ('Suite with Private Pool', 'suite', ['043', '046', '047', '016', '044', '002'],
     ['Suite: the bed faces open glass doors onto the private plunge pool and two terrace chairs',
      'The private plunge pool on its terrace with two wooden lounge chairs and tropical planting',
      'Bed under a large palm-fan headboard, rattan pendant lamps, a louvred teak door and a potted palm',
      'Built-in white sofa niche with cushions and a rattan side table, the glass shower to the right',
      'Walk-in shower with pale crazy-paving stone walls and a lit niche',
      'A pale palm-fan headboard over the bed, a rattan pendant lamp, a wooden stool and a potted palm']),
]
ROOM_COPY = {r['label']: r for r in C['rooms']}

def gallery(label, ids, alts, cls=''):
    slides = ''.join(
        f'<img src="img/room-{i}-s.webp" srcset="img/room-{i}-s.webp 720w, img/room-{i}-l.webp 1200w" '
        f'sizes="(min-width: 960px) 52vw, 100vw" width="1200" height="800" loading="lazy" decoding="async" alt="{e(a)}">'
        for i, a in zip(ids, alts))
    dots = ''.join(f'<button type="button" class="dot" aria-label="Photo {n + 1} of {len(ids)}"></button>' for n in range(len(ids)))
    return (f'<div class="gal {cls}" data-gal>'
            f'<div class="gal-track" tabindex="0" role="group" aria-roledescription="slideshow" aria-label="{e(label)} photos">{slides}</div>'
            f'<div class="gal-ui"><button type="button" class="gal-btn prev" aria-label="Previous photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>'
            f'<div class="dots">{dots}</div>'
            f'<button type="button" class="gal-btn next" aria-label="Next photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div></div>')

def size_of(note):
    m = re.match(r'(\d+ m²)', note); return m.group(1) if m else ''

room_stage = ''.join(f'<div class="stage-room" data-room="{k}">{gallery(l, ids, alts)}</div>' for l, k, ids, alts in ROOMS)
room_blocks = ''
for l, k, ids, alts in ROOMS:
    r = ROOM_COPY[l]
    room_blocks += (
        f'<article class="room" id="room-{k}" data-room="{k}">'
        f'{gallery(l, ids, alts, "gal-inline")}'
        f'<div class="room-text"><h3>{e(l)}</h3>'
        f'<p class="facts"><span>{e(r["beds"])}</span> <span>Sleeps {r["sleeps"]}</span></p>'
        f'<p class="note">{e(r["note"])}</p>'
        f'<a class="btn book" href="{e(ROOM_URL[l])}">Book this room</a></div></article>')

drawer_rooms = ''.join(
    f'<label class="pick"><input type="radio" name="room" value="{k}" data-url="{e(ROOM_URL[l])}" data-name="{e(l)}" data-sleeps="{ROOM_COPY[l]["sleeps"]}"{" checked" if n == 0 else ""}>'
    f'<img src="img/room-{ids[0]}-s.webp" width="720" height="480" alt="" loading="lazy">'
    f'<span class="pick-name">{e(l)}</span><span class="pick-size">{size_of(ROOM_COPY[l]["note"])} | Sleeps {ROOM_COPY[l]["sleeps"]}</span></label>'
    for n, (l, k, ids, alts) in enumerate(ROOMS))

book_rooms = ''.join(f'<a class="book-room" href="{e(ROOM_URL[l])}"><img src="img/room-{ids[0]}-s.webp" width="720" height="480" alt="" loading="lazy"><span><b>{e(l)}</b><small>{size_of(ROOM_COPY[l]["note"])} | Sleeps {ROOM_COPY[l]["sleeps"]}</small></span></a>' for l, k, ids, alts in ROOMS)

def rows(items):
    return ''.join(f'<li><span>{e(a)}</span><b>{e(b)}</b></li>' for a, b in items)
P = {p['label']: p for p in C['priceList']}
lkr = lambda lab: f"{price(P[lab]['price'])} LKR"
massage_rows = rows([(l, lkr(l)) for l in P if 'Massage' in l])
class_rows = rows([(l.replace('Fitness class: ', '').capitalize(), lkr(l)) for l in P if l.startswith('Fitness class')])
SRC = {'google': 'Google', 'booking': 'Booking.com', 'site': 'pantareiresort.com'}
quotes = ''.join(
    f'<figure class="quote"><blockquote>{"<br>".join(e(x) for x in t["quote"].split(chr(10)))}</blockquote>'
    f'<p class="by">{e(t["author"])} <span>· {SRC[t["source"]]}</span></p></figure>'
    for t in C['testimonials'])
qdots = ''.join(f'<button type="button" class="dot" aria-label="Review {n + 1} of {len(C["testimonials"])}"></button>' for n in range(len(C['testimonials'])))
amen = ''.join(f'<li>{e(a["label"])}{(" <small>(" + e(a["note"]) + ")</small>") if a["note"] else ""}</li>' for a in C['amenities'])
days = ''.join(f'<li class="day{" off" if d == "Fri" else ""}" data-d="{n}"><b>{d}</b><span>{"Day off" if d == "Fri" else "8:30"}</span></li>'
               for n, d in enumerate(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']))
SI = C['stayInfo']

ICON = {
 'wa': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.2 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"/></svg>',
 'tel': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
 'cal': '<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
 'pin': '<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
 'mail': '<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>',
 'ig': '<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>',
 'fb': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21z"/></svg>',
 'yt': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></svg>',
 'x': '<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 'menu': '<svg viewBox="0 0 24 24" aria-hidden="true" class="stroke"><path d="M4 8h16M4 16h16"/></svg>',
}
S = C['contact']
SOC = {'ig': 'https://www.instagram.com/pantarei_resort/', 'fb': 'https://www.facebook.com/profile.php?id=100093054286482',
       'yt': 'https://www.youtube.com/@Panta_Rei_Resort'}

tpl = (HERE / 'page.html').read_text()
tpl = tpl.replace('<!--BODY-->', (HERE / 'body.part.html').read_text())
tpl = tpl.replace('</main>', '</main>\n' + (HERE / 'footer.part.html').read_text())
tpl = tpl.replace('/*SECTIONS*/', (HERE / 'sections.css').read_text())
tpl = tpl.replace('/*MORE_JS*/', (HERE / 'more.js').read_text())
vals = {
 'TITLE': e(f"{C['businessName']} · Kabalana, Ahangama"),
 'DESC': e(C['tagline']),
 'ENGINE': e(ENGINE), 'WA': e(WA_HELLO), 'WA_GROUP': e(WA_GROUP), 'TEL': e(TEL), 'MAPS': e(MAPS),
 'TEL_SHOW': '+94 72 800 3022',
 'CAP_A': e(CAP_A), 'CAP_B': e(CAP_B), 'CAP_C': e(CAP_C),
 'W_HEAD': e(WELCOME['heading']), 'W1': e(W1), 'W2': e(W2), 'FEATURE': e(C['featureLine']),
 'TAGLINE': e(C['tagline']),
 'STAY_HEAD': e(STAY['heading']), 'STAY1': e(STAY1), 'STAY2': e(STAY2),
 'ROOM_STAGE': room_stage, 'ROOM_BLOCKS': room_blocks,
 'POOL_HEAD': e(POOL['heading']), 'POOL_BODY': paras(POOL['body']),
 'DAYPASS': e(P['Pool day pass']['label']), 'DAYPASS_P': lkr('Pool day pass'), 'DAYPASS_N': e(P['Pool day pass']['note']),
 'SURF_HEAD': e(SURF['heading']), 'SURF_BODY': paras(SURF['body']), 'MASSAGE_ROWS': massage_rows,
 'FOOD_HEAD': e(FOOD['heading']), 'FOOD_BODY': paras(FOOD['body']), 'HOURS': e(C['hoursNote']),
 'FIT_HEAD': e(FIT['heading']), 'FIT_BODY': paras(FIT['body']), 'DAYS': days, 'CLASS_ROWS': class_rows,
 'CLASS_NOTE': e(P['Fitness class: residents']['note']),
 'B_SCORE': f"{B['score']}", 'B_COUNT': f"{B['count']}", 'B_URL': e(B['url']),
 'G_SCORE': f"{G['score']}", 'G_COUNT': f"{G['count']}", 'G_URL': e(G['url']),
 'CAPTURED': CAPTURED, 'QUOTES': quotes, 'QDOTS': qdots,
 'HERE_HEAD': e(HERE_BLOCK['heading']), 'HERE_BODY': paras(HERE_BLOCK['body']),
 'ADDRESS': e(S['address']), 'CHECKIN': SI['checkInFrom'], 'CHECKOUT': SI['checkOutTo'], 'STAY_NOTE': e(SI['note']),
 'AMEN': amen,
 'GROUP_HEAD': e(GROUPS['heading']), 'GROUP_BODY': paras(GROUPS['body']),
 'CLOSING': e(C['closing']), 'EMAIL': e(S['email']),
 'DRAWER_ROOMS': drawer_rooms, 'BOOK_ROOMS': book_rooms, 'BOOK_LABEL': e(C['bookingLinks'][0]['label']),
 'IG': SOC['ig'], 'FB': SOC['fb'], 'YT': SOC['yt'], 'NAME': e(C['businessName']),
}
for k, v in ICON.items(): vals['I_' + k.upper()] = v
out = re.sub(r'\{\{([A-Z0-9_]+)\}\}', lambda m: str(vals[m.group(1)]), tpl)
left = re.findall(r'\{\{[A-Z0-9_]+\}\}', out)
assert not left, left
OUT.write_text(out)
print('wrote', OUT.relative_to(ROOT), len(out), 'bytes')
