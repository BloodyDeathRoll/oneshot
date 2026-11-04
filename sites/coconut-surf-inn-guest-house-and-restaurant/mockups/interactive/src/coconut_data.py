"""Facts and helpers for the Coconut Surf Inn interactive mockup (station 4e, designer 0.7.1).

Data only: every word, room, rating and review comes from sites/<slug>/copy/en.json (passed at 4c)
and is never retyped; the booking URL and the phone are taken from the copy and checked against
dossier.json at import. The forecast headline comes from src/rosa-weligama-west.json, one real,
unedited response of Rosa's spot JSON for weligama-west (fetched 2026-11-05).
The only strings written here are alt texts (written from the photographs themselves) and
interface labels.
"""
import html, json, pathlib, re
from datetime import date, datetime

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parents[2]                                   # sites/coconut-surf-inn-guest-house-and-restaurant
REPO = SITE.parents[1]
SLUG = SITE.name
copy = json.loads((SITE / 'copy/en.json').read_text())
dossier = json.loads((REPO / f'dossier/{SLUG}/dossier.json').read_text())
rosa = json.loads((HERE / 'rosa-weligama-west.json').read_text())

E = lambda s: html.escape(str(s), quote=True)
BLOCKS = {b['heading']: b['body'].split('\n\n') for b in copy['copyBlocks']}
def paras(h, sl=slice(None), cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{E(p)}</p>' for p in BLOCKS[h][sl])

BOOK_LABEL = copy['bookingLinks'][0]['label']             # "Check dates on Booking.com"
BOOK = copy['bookingLinks'][0]['url']
assert BOOK == dossier['booking']['engine_url']['value'], 'booking URL differs from the dossier'
BOOK_LONG = 'See rooms and live dates on Booking.com'      # audit.json recommended.primary_label
audit = json.loads((REPO / f'dossier/{SLUG}/audit.json').read_text())
assert audit['recommended']['primary_label'] == BOOK_LONG, audit['recommended']['primary_label']
C = copy['contact']
assert C['phone'] == dossier['contact']['phone']['value'], 'phone differs from the dossier'
TEL = 'tel:' + C['phone']
PHONE_SHOWN = re.sub(r'^\+94(\d{2})(\d{3})(\d{4})$', r'+94 \1 \2 \3', C['phone'])
MAP = C['mapUrl']
ADDRESS = C['address']
NAME = copy['businessName']
WHERE = 'Gurubebila, between Midigama and Weligama'        # the tagline's own words (concepts §6)
assert WHERE in copy['tagline']
TAGLINE = copy['tagline']
CLOSING = copy['closing']
SPOT = copy['spot']
SEASON = copy['season']
HOURS = copy['hoursNote']
STAY = copy['stayInfo']
AIRBNB = next(r['url'] for r in copy['ratings'] if r['platform'] == 'airbnb')

def fmt_day(s): d = date.fromisoformat(s); return f'{d.day} {d:%b %Y}'
def fmt_month(s): y, m = s.split('-'); return f'{date(int(y), int(m), 1):%b %Y}'

PLATFORM = {'booking': 'Booking.com', 'google': 'Google', 'airbnb': 'Airbnb'}
RATINGS = {r['platform']: dict(r, name=PLATFORM[r['platform']], day=fmt_day(r['capturedAt']),
                               shown=(f"{r['score']:.1f}" if r['scale'] == '10' else f"{r['score']:g}"))
           for r in copy['ratings']}
REVIEWS = [dict(t, paras=[p.strip() for p in re.split(r'\r?\n\s*', t['quote']) if p.strip()],
                first=t['author'].split(',')[0], country=t['author'].split(', ')[-1],
                month=fmt_month(t['date']), src=PLATFORM[t['source']])
           for t in copy['testimonials']]
AMENITIES = [a['label'] + (f" ({a['note']})" if a.get('note') else '') for a in copy['amenities']]

# ---- rooms. The fan / A/C split is the page's main booking fact (audit F5). The schema has no
# group or feature field yet (concepts §6), so the grouping is read from each room's own note.
ROOMS = copy['rooms']
for r in ROOMS:
    n = r['note'].lower()
    r['ac'] = 'air conditioning' in n and 'no air conditioning' not in n
    r['hot'] = 'hot water' in n and 'no hot water' not in n
    r['fan'] = 'fan' in n
    r['balcony'] = 'balcony' in n
    r['m2'] = re.search(r'(\d+) m²', r['note']).group(1)
    r['slug'] = re.sub(r'[^a-z0-9]+', '-', r['label'].lower()).strip('-')
GROUPS = [  # (id, tile label, rooms) - tile labels are interface labels stating only what the notes say
    ('ac', 'Air conditioning and hot water', [r for r in ROOMS if r['ac'] and r['hot']]),
    ('fan', 'A fan and cold water', [r for r in ROOMS if not r['ac']]),
    ('big', 'Three or four of us', [r for r in ROOMS if r['sleeps'] >= 3]),
]

# Which photographs belong to which room (dossier images[].room_types), the bathroom last.
GALLERIES = {
 'Deluxe Double Room with Balcony': ['img-076', 'img-073', 'img-079', 'img-068', 'img-077', 'img-074'],
 'Superior Double Room': ['img-035', 'img-034', 'img-037', 'img-030', 'img-017', 'img-064'],
 'Deluxe Double Room (2 Adults + 1 Child)': ['img-040', 'img-036', 'img-038', 'img-053'],
 'Deluxe Family Room': ['img-031', 'img-045', 'img-022', 'img-027', 'img-089'],
 'Budget Double Room': ['img-047', 'img-046', 'img-048', 'img-049'],
 'Budget Single Room': ['img-056', 'img-057', 'img-059', 'img-061'],
}
for label, ids in GALLERIES.items():
    for i in ids:
        img = next(x for x in dossier['images'] if x['id'] == i)
        assert img['license'] == 'business-owned', i
        assert label in img['room_types'] or i == 'img-089', (label, i)   # img-089: Booking ties it to no room; it is the family room's bathroom per concepts §4.1

# Alt texts, written from each photograph (opened at full size), not from the dossier line alone.
ALT = {
 'img-102': 'Under the thatched roof of the roof terrace: the fringe of dry palm leaves across the top, a timber pillar on the left, a black swing frame with potted plants on the right, palms and the sea beyond the parapet',
 'img-076': 'A double bed with a grey cover and crimson cushions, glass doors open to the balcony, an air-conditioning unit and a ceiling fan',
 'img-073': 'A double bed with a grey cover and crimson cushions against a rust-red wall, a ceiling fan and an air-conditioning unit above',
 'img-079': 'Dark wooden doors open onto the balcony: two rattan chairs, a small round table, banana plants beyond',
 'img-068': 'Rattan chairs with crimson cushions and a round rattan table on the balcony, the bed seen through the door',
 'img-077': 'The balcony from one end: rattan chairs with crimson cushions, an air-conditioning unit on the wall, banana plants over the parapet',
 'img-074': 'A narrow bathroom with grey concrete walls, a white basin under a wooden mirror, a toilet at the end',
 'img-035': 'A double bed with white sheets and a green towel, red-framed glass doors and white curtains behind',
 'img-034': 'Red-framed double doors open at night into a room with a bed, a wooden ladder towel rail beside them',
 'img-037': 'A double bed with white sheets and a green towel, a dark wooden desk and chair, at night',
 'img-030': 'A hammock, a wooden bench, a surfboard and a potted palm on the veranda outside red-framed glass doors',
 'img-017': 'A dark hammock slung on the veranda in front of a room\'s red-framed glass doors',
 'img-064': 'A grey concrete bathroom with a shower, a toilet and an electric water heater on the wall',
 'img-040': 'A double bed with white sheets under a wall lamp, grey concrete walls and a wooden chair',
 'img-036': 'A carved dark-wood bed with white sheets, an antique dresser with a mirror, a red wall',
 'img-038': 'A driftwood clothes rail hung on ropes against a red wall, lit by a bare bulb',
 'img-053': 'A grey concrete bathroom with a toilet and a shower, a louvred window high in the wall',
 'img-031': 'A long room with two beds against a red wall at the far end, a ceiling fan and a desk',
 'img-045': 'Two beds against a red feature wall under a ceiling fan, a grey concrete floor',
 'img-022': 'A long room with grey concrete walls, a desk fixed to the wall and a stool, a red wall at the end',
 'img-027': 'The room\'s entry: a red wall, a wooden ladder towel rail and a wall lantern',
 'img-089': 'A grey concrete bathroom with a toilet and a shower',
 'img-047': 'A bed with white sheets and a rolled purple towel under a mosquito net',
 'img-046': 'A door open onto an older room with a bed under a mosquito net, a blue mat at the threshold',
 'img-048': 'A doorway into a room with a bed under a white mosquito-net canopy',
 'img-049': 'A red-framed door with frosted panels open onto a room with a net-canopy bed',
 'img-056': 'A bed under a white mosquito-net canopy on a wooden frame',
 'img-057': 'A bed under a mosquito net beside a driftwood rail on ropes',
 'img-059': 'A bed with white sheets and a mosquito net, a wooden shelf on the wall',
 'img-061': 'A plain bathroom with a white pedestal basin',
 'img-007': 'The skylit courtyard: palms planted in a shallow jade water channel between the red-framed windows of the rooms',
 'img-024': 'A carved wooden armchair outside a room\'s red-framed glass doors, a ladder and a rope screen beside it',
 'img-020': 'A veranda with a surfboard against the wall, a hanging plant and red-framed doors',
 'img-005': 'A surfboard leaning against the wall beside a potted palm and a red-framed door',
 'img-016': 'A side lawn with surfboards racked against the wall by a concrete staircase',
 'img-104': 'Long benches and a table on the roof terrace, potted plants and the swing frame, palms and the sea beyond',
 'img-100': 'The swing seat on the roof terrace, the sea and palms behind the parapet',
 'img-101': 'The wooden swing seat on its chains, the roof terrace and the sea behind',
 'img-015': 'A guest reading on a cushioned bench in the open-sided roof lounge',
 'img-008': 'Three coconut palms against a pink and orange sunset over the beach',
 'img-095': 'Guests and locals crouched on the sand around turtle hatchlings',
 'img-106': 'The restaurant upstairs: purple bench seats with saffron and crimson cushions around dark wooden tables',
 'img-099': 'The house at night: the restaurant floor lit with strings of lights, seen through the palms',
}

# ---- the Rosa headline (playbook §4): wave height now, the time it is for, swell, wind
ROSA_ID, ROSA_NAME = 'weligama-west', 'Coconuts'           # concepts §3 mapping; never coconut-beach
assert rosa['spot']['id'] == ROSA_ID and rosa['spot']['town'] == 'Midigama'
ROSA_PAGE = f'https://rosa.surf/spot/{ROSA_ID}'
ROSA_WIDGET = f'https://rosa.surf/widget/?spot={ROSA_ID}&theme=light&units=metric'
def compass(deg): return ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'][round(deg / 22.5) % 16]
_c = rosa['current']
_sw = next(s for s in _c['swells'] if s['in_window'])
_t = datetime.fromisoformat(_c['t'])
FORECAST = dict(
    lo=f"{_c['h'][0]:.1f}", hi=f"{_c['h'][1]:.1f}", phrase=_c['phrase'],
    time=f"{_t:%a} {_t.day} {_t:%b}, {_t:%H:%M}",
    swell=f"{round(_sw['period'])} s from the {compass(_sw['dir'])}", swell_h=f"{_sw['h']:.1f} m",
    wind=f"{round(_c['wind']['kph'])} km/h", wind_class=_c['wind']['class'],
    generated=rosa['generated_at'],
)

ICON = {  # stroke icons, 24 grid, currentColor
 'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 'cal': '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
 'pin': '<path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/>',
 'cup': '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zM17 9.5h1.5a2.5 2.5 0 0 1 0 5H17M7 3.5v2M10.5 3.5v2M14 3.5v2M4 21h13"/>',
 'wave': '<path d="M2.5 9c2.4 0 2.4-2 4.75-2S9.6 9 12 9s2.4-2 4.75-2S19.1 9 21.5 9M2.5 15c2.4 0 2.4-2 4.75-2S9.6 15 12 15s2.4-2 4.75-2 2.35 2 4.75 2"/>',
 'star': '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
 'sunset': '<path d="M5 17a7 7 0 0 1 14 0M2.5 17h19M12 4v4M4.6 9.6l1.8 1.4M19.4 9.6 17.6 11M8 21h8"/>',
 'moon': '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 'fan': '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C12 6 13.5 3 16 3.5c2 .4 1.5 4-4 6.9M13.6 12c4.4 0 7.4 1.5 6.9 4-.4 2-4 1.5-6.9-4M12 13.6c0 4.4-1.5 7.4-4 6.9-2-.4-1.5-4 4-6.9M10.4 12C6 12 3 10.5 3.5 8c.4-2 4 1.5 6.9 4"/>',
 'snow': '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
 'drop': '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 'people': '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.6 2.7-6 6-6s6 2.4 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.2 5 2.4 5 5.8"/>',
 'door': '<path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17M3 21h18M15 12h.01"/>',
 'map': '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5zM9 4v13.5M15 6.5V20"/>',
 'prev': '<path d="m15 18-6-6 6-6"/>', 'next': '<path d="m9 18 6-6-6-6"/>',
 'up': '<path d="m6 15 6-6 6 6"/>', 'x': '<path d="M6 6l12 12M18 6 6 18"/>',
 'bed': '<path d="M3 19v-9M21 19v-5a3 3 0 0 0-3-3H8v8M3 15h18"/><circle cx="6" cy="12" r="1.6"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'wind': '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
 'swell': '<path d="M2.5 16c3 0 3.5-7 9.5-7 3.2 0 4.6 2.6 3.2 4.4-1 1.3-3.2.9-3.2-.9M2.5 20h19"/>',
 'hammock': '<path d="M3 5v15M21 5v15M3 8c3 6 15 6 18 0"/>',
}
def svg(name, cls='ic', sw='1.8'):
    return (f'<svg class="{cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>')

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
