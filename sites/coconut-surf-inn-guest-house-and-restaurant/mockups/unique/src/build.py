#!/usr/bin/env python3
"""Assemble the unique mockup (concept 3, "Round the clock") into dist/index.html, plus dist/rooms/index.html,
the no-JS page behind the "Find your room" overlay.

Words, rooms, ratings, reviews and contact come from copy/en.json; nothing is retyped. Strings written here
are interface labels the template owns (button labels, the clock's moments, chips). The forecast headline is
inlined from src/rosa-weligama-west.json (a real, unedited Rosa response for spot weligama-west, "Coconut",
fetched 2026-11-05) and refreshed live, lazily, by page.js. Media: src/make-media.sh. CSS / JS: page.css,
page.js (inlined).
Run: python3 sites/coconut-surf-inn-guest-house-and-restaurant/mockups/unique/src/build.py
"""
import html, json, pathlib, struct, datetime, base64

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]
DIST = HERE.parent / 'dist'
C = json.loads((SITE / 'copy' / 'en.json').read_text())
ROSA = json.loads((HERE / 'rosa-weligama-west.json').read_text())

def E(s): return html.escape(str(s), quote=True)

def webp_size(p):
    b = p.read_bytes()
    assert b[:4] == b'RIFF' and b[8:12] == b'WEBP', p
    k = b[12:16]
    if k == b'VP8X': return 1 + int.from_bytes(b[24:27], 'little'), 1 + int.from_bytes(b[27:30], 'little')
    if k == b'VP8 ': w, h = struct.unpack('<HH', b[26:30]); return w & 0x3fff, h & 0x3fff
    if k == b'VP8L':
        v = int.from_bytes(b[21:25], 'little'); return (v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1
    raise ValueError(p)

# ---------------------------------------------------------------- facts from the copy
NAME = C['businessName']
TAGLINE = C['tagline']
WHERE = 'A guesthouse in Gurubebila, between Midigama and Weligama'   # words of the tagline: type + place on the first screen (4f r1)
assert WHERE in TAGLINE
BLOCKS = {b['heading']: [p.strip() for p in b['body'].split('\n\n')] for b in C['copyBlocks']}
SPOT, SEASON, CLOSING, HOURS = C['spot'], C['season'], C['closing'], C['hoursNote']
BOOK = C['bookingLinks'][0]['url']
BOOK_LABEL = C['bookingLinks'][0]['label']                    # "Check dates on Booking.com"
BOOK_LONG = 'See rooms and live dates on Booking.com'         # audit primary_label (concepts.md §3)
PHONE = C['contact']['phone']
TEL = 'tel:' + PHONE
PHONE_SHOWN = '+94 77 892 1396'
assert PHONE_SHOWN.replace(' ', '') == PHONE
ADDRESS = C['contact']['address']
MAP = C['contact']['mapUrl']
AIRBNB = next(r['url'] for r in C['ratings'] if r['platform'] == 'airbnb')
SI = C['stayInfo']

PLAT = {'booking': 'Booking.com', 'google': 'Google', 'airbnb': 'Airbnb'}
def day(iso):
    d = datetime.date.fromisoformat(iso); return f'{d.day} {d:%b %Y}'
def month(ym):
    d = datetime.date.fromisoformat(ym + '-01'); return f'{d:%B %Y}'
RATINGS = [dict(r, name=PLAT[r['platform']], day=day(r['capturedAt']),
                shown=(f"{r['score']:.1f}" if r['platform'] != 'airbnb' else f"{r['score']:.2f}")) for r in C['ratings']]

ROOM = {r['label']: r for r in C['rooms']}
# A/C rooms first (the photographs sell them), fan rooms after, never hidden (concepts.md §3, audit F5)
ROOMS = [
    ('Deluxe Double Room with Balcony', 'ac', ['076', '073', '079', '068', '077', '074']),
    ('Superior Double Room', 'ac', ['035', '037', '034', '017', '064']),
    ('Deluxe Double Room (2 Adults + 1 Child)', 'ac', ['040', '036', '053']),
    ('Deluxe Family Room', 'ac', ['031', '045', '022', '027']),
    ('Budget Double Room', 'fan', ['046', '047', '048', '049']),
    ('Budget Single Room', 'fan', ['056', '057', '059', '061']),
]
for label, kind, _ in ROOMS:
    note = ROOM[label]['note']
    assert (kind == 'fan') == ('no air conditioning' in note), label
    assert kind == 'fan' or 'Air conditioning' in note and 'hot water' in note, label
CHIP = {'ac': 'A/C | Hot water', 'fan': 'Fan'}

ALT = {
    '009': 'The view from the roof: coconut palms over the open green and the beach shacks, the sea beyond, with white water breaking on the reef',
    '103': 'The thatched roof terrace in the afternoon: a grey hammock slung between timber posts, a swing seat, and the sea beyond the palms',
    '008': 'Three coconut palms against a pink and orange sunset sky over the beach',
    '099': 'The house at night, its upper-floor restaurant lit with strings of bulbs among the palms',
    '105': 'The restaurant upstairs: cushioned benches with saffron and crimson cushions around a low dark table, the sea and palms beyond the railing',
    '076': 'Double bed with a grey cover and red cushions, a ceiling fan and an air conditioner, the balcony doors open onto green',
    '073': 'Double bed with red cushions against a rust-red wall, a ceiling fan and an air conditioner above',
    '079': 'Double doors open onto the balcony, rattan chairs and banana plants beyond',
    '068': 'The balcony: two rattan chairs with magenta cushions and a round rattan table beside the room door',
    '077': 'Rattan chairs with magenta cushions on the balcony above banana plants',
    '074': 'Bathroom with grey polished walls, a wall-hung basin, a timber-framed mirror and a toilet',
    '035': 'Double bed with a green towel beside red-framed glass doors and white curtains',
    '037': 'Double bed on a dark timber frame with a green towel, the bedside lamps lit',
    '034': 'Red-framed double doors open into the room in the evening, a towel ladder beside them',
    '030': 'The veranda: a hammock, a wooden bench, a surfboard against the wall and a potted palm',
    '017': 'A hammock on the veranda in front of the red-framed glass doors',
    '064': 'Bathroom with an electric water heater above the shower, and a toilet',
    '040': 'Double bed under a wall lamp, with a chair and a bedside table, grey walls',
    '036': 'A carved dark-wood bed beside an antique dresser and a red wall',
    '053': 'Grey concrete bathroom with a shower and a toilet',
    '031': 'Room with two beds, a red feature wall and a ceiling fan',
    '045': 'A long room with two beds, a red feature wall and a wall-mounted desk',
    '022': 'A long room with concrete walls, a wall-mounted desk and stool, and a red wall',
    '027': 'The room entrance: a red wall, a wooden ladder rail and a wall lantern',
    '047': 'Bed with a rolled purple towel under a mosquito net',
    '046': 'An open door onto an older room with a mosquito-net bed',
    '048': 'Doorway into a bedroom with a net canopy',
    '049': 'Room doors with frosted panels, standing open',
    '056': 'Bed under a white mosquito-net canopy',
    '057': 'Net-canopy bed beside a driftwood rail hung on ropes',
    '059': 'Bed with a mosquito net and a wall shelf',
    '061': 'A plain older bathroom with a white pedestal basin',
    '006': 'The skylit light-well: palms growing out of a shallow jade water channel between red-framed windows',
    '007': 'The courtyard water channel with palms, between the red-framed windows of the rooms',
    '011': 'A corridor beside the water channel, palms and red-framed windows',
    '019': 'Looking down the stairwell through a screen of rods to the pebble-paved courtyard',
    '016': 'The side lawn with surfboards racked against the wall',
    '002': 'The round Coconut Surf Inn sign, a palm in front of an orange sun, on the grey entrance wall in leaf shade',
}

# ---------------------------------------------------------------- the forecast headline (fixture, Rosa)
cur = ROSA['current']
sw = next(s for s in cur['swells'] if s['in_window'])
PTS = 'N NNE NE ENE E ESE SE SSE S SSW SW WSW W WNW NW NNW'.split()
def compass(d): return PTS[round(d / 22.5) % 16]
def fmt_h(h): return f'{h[0]:.1f}–{h[1]:.1f}'
t = datetime.datetime.fromisoformat(cur['t'])
FC = dict(h=fmt_h(cur['h']), phrase=cur['phrase'], time=f'{t:%a} {t.day} {t:%b}, {t:%H:%M}',
          period=f"{sw['period']:.0f}" if sw['period'] >= 10 else f"{sw['period']:.1f}", sdir=compass(sw['dir']),
          wind=f"{cur['wind']['kph']:.0f}", wclass=cur['wind']['class'], gen=ROSA['generated_at'])
SPOT_ID, SPOT_NAME = 'weligama-west', 'Coconuts'
assert ROSA['spot']['id'] == SPOT_ID and ROSA['spot']['town'] == 'Midigama'
ROSA_PAGE = f'https://rosa.surf/spot/{SPOT_ID}'
ROSA_JSON = f'https://rosa-data-opal.vercel.app/data/spots/{SPOT_ID}.json'
ROSA_WIDGET = f'https://rosa.surf/widget/?spot={SPOT_ID}&theme=light&units=metric'

# ---------------------------------------------------------------- helpers
ICON = {
    'cal': '<path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>',
    'phone': '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    'bed': '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M3 18v2M21 18v2M7 9V6h10v3"/>',
    'map': '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    'prev': '<path d="M15 5l-7 7 7 7"/>', 'next': '<path d="M9 5l7 7-7 7"/>',
    'close': '<path d="M6 6l12 12M18 6L6 18"/>', 'wave': '<path d="M2 15c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3M2 19c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3M7 9c0-3 2.5-5 5.5-5"/>',
    'wind': '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h7"/>', 'clock': '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    'swell': '<path d="M3 17c3-6 6-9 9-9s5 3 5 6c-2 0-3-1-3-3M3 21h18"/>',
}
def svg(n, cls='ic'):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICON[n]}</svg>'
SEP = '<span class="sep" aria-hidden="true">|</span>'
def pipe(items): return f' {SEP} '.join(f'<span>{i}</span>' for i in items)

def src(name, pre=''): return f'{pre}img/{name}.webp'
def wh(name): return webp_size(DIST / src(name))
def b64(name): return 'data:image/webp;base64,' + base64.b64encode((DIST / src(name)).read_bytes()).decode()
def img(name, alt, lazy=True, cls='', sizes=None, set_=None, pre='', extra=''):
    w, h = wh(name)
    load = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high" decoding="async"'
    ss = f' srcset="{", ".join(f"{src(n, pre)} {wh(n)[0]}w" for n in set_)}" sizes="{sizes}"' if set_ else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{src(name, pre)}"{ss} width="{w}" height="{h}" alt="{E(alt)}"{load}{extra}>'

def book(cls='', label=BOOK_LABEL, icon=True):
    return f'<a class="btn btn-book {cls}" href="{E(BOOK)}" rel="noopener">{svg("cal") if icon else ""}<span>{E(label)}</span></a>'
def call(cls='', label=None):
    return f'<a class="btn btn-ghost {cls}" href="{TEL}">{svg("phone")}<span>{E(label or "Call " + PHONE_SHOWN)}</span></a>'
def sun_call(cls=''):
    return f'<a class="sun-call {cls}" href="{TEL}" aria-label="Call {E(PHONE_SHOWN)}">{svg("phone")}</a>'
def finder(cls='btn-ghost', label='Find your room', pre=''):
    return f'<a class="btn {cls}" href="{pre}rooms/" data-finder data-open-drawer>{svg("bed")}<span>{E(label)}</span></a>'

def rating(r):
    return (f'<a class="rating" href="{E(r["url"])}" rel="noopener"><span class="score">{r["shown"]}<small>/{r["scale"]}</small></span>'
            f'<span class="rmeta">{pipe([E(r["name"]), f"{r["count"]} reviews", E(r["day"])])}</span></a>')

def show(sid, nums, label, chip):
    def held(n):  # off-screen slides wait for page.js (set when the slideshow nears); <noscript> keeps them without JS
        t = img("room-img-" + n, ALT[n])
        return t.replace(' src="', ' data-src="', 1) + f'<noscript>{t}</noscript>'
    slides = ''.join(f'<li class="slide" aria-roledescription="slide" aria-label="{i+1} of {len(nums)}">{img("room-img-" + n, ALT[n]) if i == 0 else held(n)}</li>'
                     for i, n in enumerate(nums))
    dots = ''.join(f'<button type="button" class="dot" aria-label="Photo {i+1}"></button>' for i in range(len(nums)))
    return (f'<div class="show" data-show id="{sid}" role="region" aria-roledescription="carousel" aria-label="{E(label)}">'
            f'<ul class="track" tabindex="0">{slides}</ul><span class="chip">{E(chip)}</span>'
            f'<div class="ctrl" hidden><button class="arw prev" type="button" aria-label="Previous photo">{svg("prev")}</button>'
            f'<div class="dots" role="group" aria-label="Choose a photo">{dots}</div>'
            f'<button class="arw next" type="button" aria-label="Next photo">{svg("next")}</button></div></div>')

def paras(ps, cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{E(p)}</p>' for p in ps)

def quote_html(q, cls='q'):
    lines = [l.strip() for l in q['quote'].replace('\r\n', '\n').split('\n') if l.strip()]
    body = '<br>'.join(E(l) for l in lines)
    return (f'<figure class="{cls}"><blockquote><p>{body}</p></blockquote>'
            f'<figcaption>{pipe([E(q["author"]), PLAT[q["source"]], month(q["date"])])}</figcaption></figure>')

T = {q['author'].split(',')[0]: q for q in C['testimonials']}

# ---------------------------------------------------------------- page parts
def header(pre=''):
    home = pre or '#top'
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="top" id="top">
  <a class="mark" href="{home}">{E(NAME)}</a>
  <nav class="nav" aria-label="Sections">{pipe([f'<a href="{pre}#rooms">Rooms</a>', f'<a href="{pre}#stay">The stay</a>', f'<a href="{pre}#break">The break</a>'])}</nav>
  <div class="top-act">{book('btn-sm', 'Check dates')}{sun_call('sun-sm')}</div>
</header>'''

hero = f'''
<section class="hero" aria-labelledby="h1">
  <div class="hero-pic">
    <picture>
      <source media="(max-width: 767px)" srcset="img/hero-img-009-phone-560.webp" width="{wh('hero-img-009-phone-560')[0]}" height="{wh('hero-img-009-phone-560')[1]}">
      {img('hero-img-009-1440', ALT['009'], lazy=False, sizes='100vw', set_=['hero-img-009-1280', 'hero-img-009-1440'])}
    </picture>
  </div>
  <div class="hero-in">
    <h1 class="script" id="h1">{E(NAME)}</h1>
    <p class="where">{E(WHERE)}</p>
    {book('btn-hero')}
  </div>
</section>'''

spot_first = SPOT.split('. ')[0] + '.'
checkin = f'''
<section class="checkin" id="checkin" aria-labelledby="h-checkin">
  <div class="col">
    <h2 class="script" id="h-checkin"><span class="t">13:00</span>, check-in</h2>
    <p class="facts">{E(TAGLINE)} {E(spot_first)} {E(HOURS)} {E(CLOSING.split('. ')[0])}.</p>
    <div class="ratings">{''.join(rating(r) for r in RATINGS)}</div>
    <div class="actions">{book('', BOOK_LONG)}{call()}</div>
  </div>
</section>'''

def room_card(label, kind, nums, i):
    r = ROOM[label]
    sid = f'room-{i}'
    meta = pipe([E(r['beds']), f"Sleeps {r['sleeps']}"])
    return (f'<article class="room room-{kind}" id="r{i}" data-sleeps="{r["sleeps"]}">{show(sid, nums, label + ", photos", CHIP[kind])}'
            f'<div class="rtxt"><h3>{E(label)}</h3><p class="meta">{meta}</p><p class="note">{E(r["note"])}</p>'
            f'{book("btn-sm")}</div></article>')

stay_line = pipe([f'Check-in from {E(SI["checkInFrom"])}', f'Check-out until {E(SI["checkOutTo"])}'])
rooms = f'''
<section class="rooms tint" id="rooms" aria-labelledby="h-rooms">
  <div class="wrap">
    <div class="rooms-head">
      <h2 class="script" id="h-rooms">Six kinds of room</h2>
      <p>{E(BLOCKS['Six kinds of room'][0])}</p>
      {finder()}
    </div>
    <div class="room-grid">{''.join(room_card(l, k, n, i) for i, (l, k, n) in enumerate(ROOMS))}</div>
    <p class="stayinfo"><span class="si">{stay_line}</span> {E(SI['note'])}</p>
  </div>
</section>'''

# three columns that end flush (each a 2:3 portrait over a 3:2 landscape); on phones 016 drops and 030 runs full width
HOUSE_COLS = [['006', '007'], ['019', '011'], ['016', '030']]
house = f'''
<section class="house" id="house" aria-labelledby="h-house">
  <div class="wrap house-grid">
    <div class="house-txt">
      <h2 class="script" id="h-house">Inside the house</h2>
      {paras(BLOCKS['Inside the house'])}
    </div>
    <div class="masonry">{''.join('<div class="mcol">' + ''.join(f'<div class="m m-{n}">{img("house-img-" + n, ALT[n])}</div>' for n in col) + '</div>' for col in HOUSE_COLS)}</div>
  </div>
</section>'''

# ---- the set-piece: five moments, each with its frame; horizons (fraction of frame height) for the wipe
MOMENTS = [
    dict(n='103', tick='Afternoon', title='The afternoon', sub='On the roof', hz=.40,
         body=paras(BLOCKS['On the roof']), q=T['Erin']),
    dict(n='008', tick='Sunset', title='Sunset', sub='By the beach', hz=.84, body=paras(BLOCKS['By the beach']), q=None),
    dict(n='099', tick='22:00', title='Until 22:00', sub='The restaurant upstairs', hz=.45,
         body=paras(BLOCKS['The restaurant upstairs'] + [HOURS]), q=None),
    dict(n='105', tick='7:30', title='From 7:30', sub='The Eranga family home', hz=.46,
         body=paras(BLOCKS['The Eranga family home']), q=T['Janno']),
    dict(n='009', tick='The break', title='The break', sub='Coconuts', hz=.67,
         body=paras([SPOT, SEASON]) + '<p><a class="btn btn-ghost btn-sm" href="#break">' + svg('wave') + '<span>Today on Coconuts</span></a></p>', q=None),
]
def frame_img(m, cls, lazy=True):
    return img(f'clock-img-{m["n"]}', ALT[m['n']], lazy=lazy, cls=cls,
               sizes='(max-width: 767px) 100vw, 56vw', set_=[f'clock-img-{m["n"]}-760', f'clock-img-{m["n"]}'],
               extra=f' data-hz="{m["hz"]}"')
ticks = ''.join(f'<li class="tick" style="--i:{i}"><span>{E(m["tick"])}</span></li>' for i, m in enumerate(MOMENTS))
blocks = ''.join(
    f'<article class="blk" data-i="{i}" aria-labelledby="m{i}"><div class="ph">{frame_img(m, "")}</div>'
    f'<div class="btxt"><h3 class="script" id="m{i}">{E(m["title"])}</h3><p class="sub">{E(m["sub"])}</p>{m["body"]}'
    + (quote_html(m['q'], 'q q-small') if m['q'] else '') + '</div></article>'
    for i, m in enumerate(MOMENTS))
stay = f'''
<section class="clock" id="stay" aria-labelledby="h-stay">
  <h2 class="sr" id="h-stay">A day at the house, round the clock</h2>
  <div class="clock-grid">
    <div class="clock-media" aria-hidden="true">
      <div class="dial"><ol class="ticks">{ticks}</ol><span class="sun" aria-hidden="true"></span></div>
      <div class="frames" data-loading-gl>{''.join(frame_img(m, 'fr' + (' on' if i == 0 else '')) for i, m in enumerate(MOMENTS))}<canvas class="gl"></canvas></div>
    </div>
    <div class="clock-text">{blocks}</div>
  </div>
</section>'''

amen = ' | '.join(a['label'] + (f" ({a['note']})" if a.get('note') else '') for a in C['amenities'])
forecast = f'''
<section class="break" id="break" aria-labelledby="h-break">
  <div class="wrap">
    <h2 class="script" id="h-break">Today on Coconuts</h2>
    <div class="fc">
      <div class="fc-now" id="rosa-now" data-generated="{E(FC['gen'])}" data-json="{E(ROSA_JSON)}">
        <div class="fc-vals">
          <p class="fc-h"><span id="rosa-h">{E(FC['h'])}</span><small>m</small></p>
          <p class="fc-phrase" id="rosa-phrase">Wave height now, {E(FC['phrase'])}</p>
          <ul class="fc-list">
            <li>{svg('clock')}<span id="rosa-time">{E(FC['time'])}</span></li>
            <li>{svg('swell')}<span>Swell <b id="rosa-p">{E(FC['period'])} s</b> from the <b id="rosa-d">{E(FC['sdir'])}</b></span></li>
            <li>{svg('wind')}<span>Wind <b id="rosa-w">{E(FC['wind'])} km/h</b>, <span id="rosa-wc">{E(FC['wclass'])}</span></span></li>
          </ul>
        </div>
        <p class="fc-plain"><a class="btn btn-ghost" href="{E(ROSA_PAGE)}" rel="noopener">{svg('wave')}<span>See today's forecast for {SPOT_NAME} on Rosa</span></a></p>
        <p class="credit"><a href="{E(ROSA_PAGE)}" rel="noopener">Forecast for {SPOT_NAME} by Rosa</a></p>
      </div>
      <div class="rosa-box" data-rosa="{E(ROSA_WIDGET)}" data-title="Rosa surf forecast - {SPOT_NAME}">
        <a class="btn btn-ghost fallback" href="{E(ROSA_PAGE)}" rel="noopener">{svg('wave')}<span>See today's forecast for {SPOT_NAME} on Rosa</span></a>
      </div>
    </div>
    <p class="amen"><span class="amen-k">At the house</span> {E(amen)}</p>
  </div>
</section>'''

qs = [q for q in C['testimonials'] if q['author'].split(',')[0] not in ('Erin', 'Janno')]   # those two sit in the set-piece; each review once
guests = f'''
<section class="guests tint" id="guests" aria-labelledby="h-guests">
  <div class="wrap">
    <h2 class="script" id="h-guests"><span class="t">11:00</span>, check-out</h2>
    <div class="ratings">{''.join(rating(r) for r in RATINGS)}</div>
    <div class="quotes" data-quotes role="region" aria-roledescription="carousel" aria-label="What guests wrote">
      <div class="ctrl qctrl" hidden><button class="arw prev" type="button" aria-label="Previous review">{svg('prev')}</button>
        <span class="qn" aria-live="polite">1 / {len(qs)}</span>
        <div class="dots" role="group" aria-label="Choose a review">{''.join(f'<button type="button" class="dot" aria-label="Review {i+1}"></button>' for i in range(len(qs)))}</div>
        <button class="arw next" type="button" aria-label="Next review">{svg('next')}</button></div>
      <div class="qstack">{''.join(quote_html(q, 'q q-big' + (' on' if i == 0 else '')) for i, q in enumerate(qs))}</div>
    </div>
  </div>
</section>'''

getting = f'''
<section class="here" id="getting-here" aria-labelledby="h-here">
  <div class="wrap here-grid">
    <div class="print">{img('sign-img-002', ALT['002'])}</div>
    <div class="here-txt">
      <h2 class="script" id="h-here">Getting here</h2>
      {paras(BLOCKS['Getting here'])}
      <p class="addr">{svg('map')}<span>{E(ADDRESS)}</span></p>
      <div class="actions"><a class="btn btn-ghost" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Open in Google Maps</span></a>{call()}</div>
    </div>
  </div>
</section>'''

closing = f'''
<section class="closing" id="book" aria-label="Book">
  <p class="script close-line">{E(CLOSING)}</p>
  <div class="actions">{book('btn-hero')}{sun_call()}</div>
</section>'''

def footer(pre=''):
    return f'''<footer class="foot tint">
  <div class="wrap foot-grid">
    <div><p class="mark">{E(NAME)}</p><p>{E(ADDRESS)}</p><p class="small">{E(HOURS)}</p></div>
    <div class="foot-act">{call()}<a class="btn btn-ghost" href="{E(MAP)}" rel="noopener">{svg('map')}<span>Map</span></a></div>
    <div class="foot-act">{book('btn-sm', 'Rooms on Booking.com')}<a class="btn btn-ghost btn-sm" href="{E(AIRBNB)}" rel="noopener">{svg('bed')}<span>Airbnb</span></a></div>
  </div>
</footer>'''

def bar(pre=''):
    return f'''<div class="bar" id="bar">{book('', BOOK_LABEL)}{finder('btn-ghost', 'Find your room', pre)}</div>'''

# ---- the "Find your room" overlay (tiles: how many are coming)
def room_row(label, pre=''):
    kind, nums = next((k, n) for l, k, n in ROOMS if l == label)
    r = ROOM[label]
    return (f'<li class="pick" data-sleeps="{r["sleeps"]}"><div class="pick-pic">{img("room-img-" + nums[0], ALT[nums[0]], pre=pre)}<span class="chip">{E(CHIP[kind])}</span></div>'
            f'<div class="pick-txt"><h3>{E(label)}</h3><p class="meta"><span class="kind">{E(CHIP[kind])} {SEP} </span>{pipe([E(r["beds"]), "Sleeps " + str(r["sleeps"])])}</p><p class="note">{E(r["note"])}</p>{book("btn-sm")}</div></li>')

TILES = [('1', 'Just me'), ('2', 'Two of us'), ('3', 'Three'), ('4', 'Four')]
sheet = f'''
<div class="scrim" id="scrim" hidden></div>
<div class="sheet" id="sheet" data-drawer role="dialog" aria-modal="true" aria-labelledby="sheet-h" hidden>
  <div class="sheet-in">
    <button class="x" type="button" data-close aria-label="Close">{svg('close')}</button>
    <p class="script sheet-h" id="sheet-h">How many are coming?</p>
    <div class="tiles" role="group" aria-label="How many are coming">
      {''.join(f'<button type="button" class="tile" data-n="{n}"><b>{n}</b><span>{E(t)}</span></button>' for n, t in TILES)}
      <button type="button" class="tile tile-ns" data-n="0"><b>?</b><span>Not sure</span></button>
    </div>
    <div class="answer" aria-live="polite">
      <ul class="picks">{''.join(room_row(l) for l, _, _ in ROOMS)}</ul>
      <div class="notsure" hidden><p>{E(CLOSING)}</p><div class="actions">{call()}</div></div>
    </div>
  </div>
</div>'''

CSS = (HERE / 'page.css').read_text()
# the hero's own blurred 40 px copy, painted under the photo until it arrives
HERO_LQ = (f".hero-pic img:not(.loaded){{background-image:url({b64('hero-img-009-lq')})}}"
           f"@media (max-width:767px){{.hero-pic img:not(.loaded){{background-image:url({b64('hero-img-009-phone-lq')})}}}}")
JS = (HERE / 'page.js').read_text()
# Fonts: Google Fonts at 4e (4g self-hosts). Latin files only, preloaded so they land before first paint, with
# metric-matched fallbacks in page.css; Red Hat Text is one variable file for 400-600.
F_RHT = 'https://fonts.gstatic.com/s/redhattext/v19/RrQXbohi_ic6B3yVSzGBrMxQaKctMc-JPQ.woff2'
F_CAV = 'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6eIWpYT5Kmgq3sw.woff2'
FONTS = (f'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         f'<link rel="preload" as="font" type="font/woff2" href="{F_RHT}" crossorigin>'
         f'<link rel="preload" as="font" type="font/woff2" href="{F_CAV}" crossorigin>'
         '<style>'
         f"@font-face{{font-family:'Red Hat Text';font-style:normal;font-weight:400 600;font-display:swap;src:url({F_RHT}) format('woff2')}}"
         f"@font-face{{font-family:'Caveat';font-style:normal;font-weight:600;font-display:swap;src:url({F_CAV}) format('woff2')}}"
         '</style>')
HEADJS = ("<script>(function(d){var c=d.documentElement.classList;c.add('js');c.add('at-hero');"
          "if(matchMedia('(prefers-reduced-motion: no-preference)').matches&&!/[?&]still\\b/.test(location.search))c.add('pin')})(document)</script>")
DESC = f'{NAME}: {TAGLINE} Six kinds of room, a restaurant upstairs and a roof terrace; Coconuts reef break in front.'

def page(title, body, pre='', extra_head=''):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(title)}</title>
<meta name="description" content="{E(DESC)}">
<meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(DESC)}">
<meta property="og:image" content="{pre}img/hero-img-009-1280.webp"><meta name="theme-color" content="#ffffff">
{HEADJS}
{FONTS}
{extra_head}
<style>{CSS}{HERO_LQ}</style>
</head>
<body>
{body}
<script>{JS}</script>
</body>
</html>
'''

ld = {"@context": "https://schema.org", "@type": "LodgingBusiness", "name": NAME, "telephone": PHONE,
      "address": ADDRESS, "checkinTime": SI['checkInFrom'], "checkoutTime": SI['checkOutTo'],
      "aggregateRating": {"@type": "AggregateRating", "ratingValue": RATINGS[0]['score'], "bestRating": 10, "reviewCount": RATINGS[0]['count']}}
main = (header() + f'<main id="main">{hero}{checkin}{rooms}{house}{stay}{forecast}{guests}{getting}{closing}</main>'
        + footer() + bar() + sheet)
out = page(f'{NAME} | Guesthouse in Gurubebila, between Midigama and Weligama', main,
           extra_head=f'<script type="application/ld+json">{json.dumps(ld)}</script>')
assert out.count(BOOK) >= 10
(DIST / 'index.html').write_text(out)

# ---- rooms/: the overlay as a page of its own (JS off)
groups = [(1, 'Just me'), (2, 'Two of us'), (3, 'Three of us'), (4, 'Four of us')]
def fits(n): return [l for l, _, _ in sorted(ROOMS, key=lambda x: ROOM[x[0]]['sleeps']) if n <= ROOM[l]['sleeps'] <= n + 1]
rp = (header('../') + '<main id="main" class="roomspage"><div class="wrap">'
      + f'<p><a class="btn btn-ghost btn-sm" href="../">{svg("prev")}<span>Back to {E(NAME)}</span></a></p>'
      + '<h1 class="script">How many are coming?</h1>'
      + ''.join(f'<section class="rp-group" aria-labelledby="g{n}"><h2 id="g{n}">{E(t)}</h2><ul class="picks">'
                + ''.join(room_row(l, '../') for l in fits(n)) + '</ul></section>' for n, t in groups)
      + f'<section class="rp-group" aria-labelledby="g0"><h2 id="g0">Not sure</h2><p>{E(CLOSING)}</p><div class="actions">{call()}</div></section>'
      + '</div></main>' + footer('../') + bar('../'))
rp = rp.replace('href="rooms/"', 'href="./"')
(DIST / 'rooms').mkdir(exist_ok=True)
(DIST / 'rooms' / 'index.html').write_text(page(f'Find your room | {NAME}', rp, pre='../').replace('src="img/', 'src="../img/'))
print('ok', len(out), 'bytes')
