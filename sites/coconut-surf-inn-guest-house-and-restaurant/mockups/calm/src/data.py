"""Facts and helpers for the Coconut Surf Inn calm mockup (station 4e, designer 0.7.1).

Data only: every word, room, rating and review comes from sites/<slug>/copy/en.json (passed at 4c) and
is never retyped; the booking URL and the phone are taken from the copy and checked against
dossier.json at import. Layout, type, colour and motion live in build.py / page.css / page.js.
The only strings written here are alt texts (written from the photographs themselves, opened at
full size) and interface labels. Kept inside mockups/calm/ because the interactive and unique
mockups are built in parallel by other agents in their own folders.
"""
import html, json, pathlib, re
from datetime import date, datetime, timezone

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]                                   # sites/coconut-surf-inn-guest-house-and-restaurant
REPO = SITE.parents[1]
SLUG = SITE.name
copy = json.loads((SITE / 'copy/en.json').read_text())
dossier = json.loads((REPO / f'dossier/{SLUG}/dossier.json').read_text())

E = lambda s: html.escape(str(s), quote=True)
BLOCKS = {b['heading']: b['body'].split('\n\n') for b in copy['copyBlocks']}
def paras(h, sl=slice(None), cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{E(p)}</p>' for p in BLOCKS[h][sl])

NAME = copy['businessName']
TAGLINE = copy['tagline']
# The hero line is a fragment of the tagline's own words (concepts §2 "Words", §6 schema gap heroLine).
HERO_LINE = 'Gurubebila, between Midigama and Weligama'
assert HERO_LINE in TAGLINE
CLOSING = copy['closing']
SPOT = copy['spot']
SEASON = copy['season']
HOURS_NOTE = copy['hoursNote']

BOOK_LABEL = copy['bookingLinks'][0]['label']             # "Check dates on Booking.com"
BOOK = copy['bookingLinks'][0]['url']
assert BOOK == dossier['booking']['engine_url']['value'], 'booking URL differs from the dossier'
BOOK_LONG = 'See rooms and live dates on Booking.com'     # the audit's primary_label (concepts §3)
C = copy['contact']
assert C['phone'] == dossier['contact']['phone']['value'], 'phone differs from the dossier'
TEL = 'tel:' + C['phone']
PHONE_SHOWN = re.sub(r'^\+94(\d{2})(\d{3})(\d{4})$', r'+94 \1 \2 \3', C['phone'])
MAP = C['mapUrl']
ADDRESS = C['address']
AIRBNB = next(r['url'] for r in copy['ratings'] if r['platform'] == 'airbnb')

def fmt_day(s): d = date.fromisoformat(s); return f'{d.day} {d:%b %Y}'
def fmt_month(s): y, m = s.split('-'); return f'{date(int(y), int(m), 1):%b %Y}'

PLATFORM = {'booking': 'Booking.com', 'google': 'Google', 'airbnb': 'Airbnb'}
def shown(r): return f"{r['score']:g}" if r['scale'] == '5' else f"{r['score']:.1f}"
RATINGS = [dict(r, name=PLATFORM[r['platform']], day=fmt_day(r['capturedAt']), shown=shown(r))
           for r in copy['ratings']]
REVIEWS = [dict(t, lines=[l.strip() for l in re.split(r'\r?\n', t['quote']) if l.strip()],
                month=fmt_month(t['date']), src=PLATFORM[t['source']])
           for t in copy['testimonials']]

ROOMS = {r['label']: r for r in copy['rooms']}
AC_ROOMS = ['Deluxe Double Room with Balcony', 'Superior Double Room',
            'Deluxe Double Room (2 Adults + 1 Child)', 'Deluxe Family Room']
FAN_ROOMS = ['Budget Double Room', 'Budget Single Room']
for l in AC_ROOMS: assert 'Air conditioning, fan and hot water' in ROOMS[l]['note'], l
for l in FAN_ROOMS: assert 'no air conditioning and no hot water' in ROOMS[l]['note'], l
def area(r): return re.search(r'(\d+) m²', r['note']).group(0)
STAY = copy['stayInfo']
AMENITIES = [a['label'] + (f" ({a['note']})" if a.get('note') else '') for a in copy['amenities']]

# Which photographs belong to which room (dossier images[].room_types; concepts §4.1 galleries).
# img-089 carries no room type in the dossier; it is the Deluxe Family's bathroom in the concept's list.
GALLERIES = {
 'Deluxe Double Room with Balcony': ['img-076', 'img-073', 'img-079', 'img-068', 'img-077', 'img-074'],
 'Superior Double Room': ['img-035', 'img-034', 'img-037', 'img-030', 'img-017', 'img-064'],
 'Deluxe Double Room (2 Adults + 1 Child)': ['img-040', 'img-036', 'img-038', 'img-053'],
 'Deluxe Family Room': ['img-031', 'img-045', 'img-022', 'img-027', 'img-089'],
 'Budget Double Room': ['img-047', 'img-046', 'img-048', 'img-049'],
 'Budget Single Room': ['img-056', 'img-057', 'img-059', 'img-061'],
}

# Alt texts, written from each photograph, not from the dossier line alone.
ALT = {
 'img-009': 'The view from the roof: tall coconut palms over an open green, beach shacks under a blue roof, and the sea with white water breaking on the reef',
 'img-076': 'A bedroom with a grey cover and red cushions on a wooden bed, an air-conditioning unit and a ceiling fan, glass doors open to the balcony',
 'img-073': 'A bedroom with a burnt-orange wall, a wooden double bed with red cushions, a ceiling fan and air conditioning, doors open to green leaves',
 'img-079': 'Dark wooden doors open onto a balcony with two rattan chairs and a small round table, banana plants and a palm beyond',
 'img-068': 'Rattan chairs with crimson cushions and a woven table on the balcony, the bed visible through the open door',
 'img-077': 'A long balcony with rattan chairs and a crimson cushion, looking over banana leaves',
 'img-074': 'A bathroom in grey polished concrete with a wall-hung white basin under a carved wooden mirror',
 'img-035': 'A white double bed with a green towel, red-framed glass doors and white curtains behind it',
 'img-034': 'Red-framed double doors open onto a grey concrete room, a wooden ladder towel rail beside them',
 'img-037': 'A wooden double bed with white sheets and a green towel in a grey room, a lamp on the bedside table',
 'img-030': 'The veranda outside a room: a hammock, a wooden bench, a surfboard leaning on the wall and a potted palm',
 'img-017': 'A dark hammock on green ropes slung along the veranda, in front of red-framed glass doors',
 'img-064': 'A grey concrete shower room with an electric water heater on the wall, a shower and a toilet',
 'img-040': 'A double bed with white pillows under a wall lamp in a grey room, a dark wooden chair beside it',
 'img-036': 'A carved dark-wood bed and an antique dresser in a room with a red wall',
 'img-038': 'A driftwood clothes rail hung on ropes against a red wall, lit by a bare bulb',
 'img-053': 'A concrete bathroom with a shower, a toilet and a small window high up',
 'img-031': 'A family room with two wooden beds side by side, a red wall and a ceiling fan',
 'img-045': 'The family room seen from the corner: two beds, a red wall, a lantern on the grey wall',
 'img-022': 'A long room with grey concrete walls, a wall-mounted desk and a stool, a red wall at the far end',
 'img-027': 'The entrance of a room: a red wall, a wooden ladder towel rail and a wall lantern',
 'img-089': 'A grey concrete bathroom with a shower and a toilet under a vent window',
 'img-047': 'A rolled purple towel on a white bed, a mosquito net tied up above it',
 'img-046': 'An open door onto a plain room with a bed under a mosquito-net canopy',
 'img-048': 'Through a doorway, a bed under a white mosquito-net canopy and a blue mat on the floor',
 'img-049': 'Wooden doors with frosted glass panels opening into a room with a net-covered bed',
 'img-056': 'A bed under a white mosquito-net canopy in a plain room with a wooden clothes stand',
 'img-057': 'A bed under a mosquito-net canopy, a driftwood rail hanging on ropes beside it',
 'img-059': 'A bed under a draped mosquito net beside a wooden wall shelf',
 'img-061': 'A white pedestal basin in a plain bathroom',
 'img-007': 'The skylit courtyard in the middle of the house: palms growing out of a shallow jade channel of water between red-framed windows',
 'img-006': 'The light-well from below: palms in the water channel, red-framed windows and the skylight above',
 'img-003': 'An outdoor shower among climbing plants and ferns in the garden',
 'img-103': 'The thatched roof terrace: a hammock slung between timber pillars, a swing frame, and the sea and palms beyond the parapet',
 'img-015': 'A guest in sunglasses reading a book, stretched out on a cushioned bench under the thatched roof',
 'img-101': 'A wooden swing seat on chains on the roof, palms and the sea behind it',
 'img-008': 'Three coconut palms in silhouette against a pink and orange sunset over the beach',
 'img-095': 'Guests and locals crouched on the sand around a scatter of turtle hatchlings',
 'img-105': 'The restaurant upstairs: purple cushioned benches and low dark tables, the sea between the pillars',
 'img-106': 'Purple bench seating with saffron and crimson cushions around a long wooden table under the slatted roof',
 'img-107': 'The long upper-floor restaurant: timber pillars, benches with cushions and tables along the open side',
 'img-104': 'Benches and long tables on the roof terrace beside the thatch, palms in the distance',
}
for imgs in GALLERIES.values():
    for a in imgs: assert a in ALT, a

ICON = {  # stroke icons, 24 grid, currentColor
 'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 'cal': '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
 'pin': '<path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/>',
 'map': '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5zM9 4v13.5M15 6.5V20"/>',
 'prev': '<path d="m15 18-6-6 6-6"/>', 'next': '<path d="m9 18 6-6-6-6"/>',
 'bed': '<path d="M3 19v-9M21 19v-5a3 3 0 0 0-3-3H8v8M3 15h18"/><circle cx="6" cy="12" r="1.6"/>',
 'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
 'sunset': '<path d="M12 9.5V3M8.5 6 12 2.5 15.5 6M4.2 13.2l1.4 1.4M2 18h20M18.4 14.6l1.4-1.4M7 18a5 5 0 0 1 10 0M5 21.5h14"/>',
 'moon': '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'wave': '<path d="M2.5 9c2.4 0 2.4-2 4.75-2S9.6 9 12 9s2.4-2 4.75-2S19.1 9 21.5 9M2.5 15c2.4 0 2.4-2 4.75-2S9.6 15 12 15s2.4-2 4.75-2 2.35 2 4.75 2"/>',
 'wind': '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h7"/>',
 'fan': '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C12 6 13.5 3 16 3.5c2 .4 1.5 4-4 6.9M13.6 12c4.4 0 7.4 1.5 6.9 4-.4 2-4 1.5-6.9-4M12 13.6c0 4.4-1.5 7.4-4 6.9-2-.4-1.5-4 4-6.9M10.4 12C6 12 3 10.5 3.5 8c.4-2 4 1.5 6.9 4"/>',
 'snow': '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
 'people': '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.8a3.2 3.2 0 0 1 0 6.4M18 14.3c1.8.8 3 2.6 3 4.7"/>',
 'area': '<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9h4M3.5 15h4M9 3.5v4M15 3.5v4"/>',
 'home': '<path d="M3 11 12 3.5 21 11M5.5 9v11.5h13V9"/>',
 'arrow': '<path d="M5 12h14M13 6l6 6-6 6"/>',
}
def svg(name, cls='ic', sw='1.8'):
    return (f'<svg class="{cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>')

def font_link(query):
    return ('<link rel="preconnect" href="https://fonts.googleapis.com">'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            f'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?{query}&display=swap">')

def head():
    desc = f"{TAGLINE} Coconuts reef break in front of the house, a restaurant upstairs and a roof terrace. {BOOK_LABEL} or call {PHONE_SHOWN}."
    return (f'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
            f'<title>{E(NAME)}, Gurubebila</title><meta name="description" content="{E(desc)}">'
            f'<meta name="theme-color" content="#ffffff">'
            f'<meta property="og:title" content="{E(NAME)}"><meta property="og:description" content="{E(TAGLINE)}">')

def webp_size(path):
    """(width, height) of a WebP file, read from its header (VP8, VP8L or VP8X)."""
    b = pathlib.Path(path).read_bytes()[:40]
    kind = b[12:16]
    if kind == b'VP8 ':
        return int.from_bytes(b[26:28], 'little') & 0x3FFF, int.from_bytes(b[28:30], 'little') & 0x3FFF
    if kind == b'VP8L':
        v = int.from_bytes(b[21:25], 'little'); return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1
    if kind == b'VP8X':
        return int.from_bytes(b[24:27], 'little') + 1, int.from_bytes(b[27:30], 'little') + 1
    raise ValueError(path)

# ---- Rosa (playbook §4; tools.md "The Rosa forecast"). Dossier spot "Coconuts" -> Rosa id weligama-west
# (concepts §3, checked live). Never `coconut` (404) and never `coconut-beach` (Arugam Bay).
ROSA_ID, ROSA_NAME = 'weligama-west', 'Coconuts'
rosa = json.loads((HERE / 'rosa-weligama-west.json').read_text())   # one unedited response, fetched 2026-11-05
assert rosa['spot']['id'] == ROSA_ID and rosa['spot']['town'] == 'Midigama'
COMPASS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
def compass(d): return COMPASS[round((d % 360) / 22.5) % 16]
def rosa_now():
    c = rosa['current']
    sw = next((s for s in c['swells'] if s['in_window']), None)
    t = datetime.fromisoformat(c['t'])
    return dict(
        generated=rosa['generated_at'],
        h='–'.join(f'{x:.1f}' for x in c['h']), phrase=c['phrase'],
        time=f'{t:%a} {t.day} {t:%b}, {t:%H:%M}',
        period=round(sw['period']) if sw else None, sdir=compass(sw['dir']) if sw else None,
        wind=round(c['wind']['kph']), wclass=c['wind']['class'])
