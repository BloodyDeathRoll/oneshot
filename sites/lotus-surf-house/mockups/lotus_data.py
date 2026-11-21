"""Facts and helpers shared by the three Lotus Surf House mockups (station 4e, designer 0.7.1).

Data only: every word, room, rating and review comes from sites/lotus-surf-house/copy/en.json (passed
at 4c) and is never retyped; the booking URL and phone are taken from the copy and checked against
dossier.json at import. Layout, type, colour and motion live in each variant's own build.py.
The only strings written here are alt texts (written from the photographs themselves) and
interface labels.
"""
import html, json, pathlib, re
from datetime import date

SITE = pathlib.Path(__file__).resolve().parents[1]          # sites/lotus-surf-house
REPO = SITE.parents[1]
copy = json.loads((SITE / 'copy/en.json').read_text())
dossier = json.loads((REPO / 'dossier/lotus-surf-house/dossier.json').read_text())

E = lambda s: html.escape(str(s), quote=True)
BLOCKS = {b['heading']: b['body'].split('\n\n') for b in copy['copyBlocks']}
def paras(h, sl=slice(None), cls=''):
    c = f' class="{cls}"' if cls else ''
    return ''.join(f'<p{c}>{E(p)}</p>' for p in BLOCKS[h][sl])

BOOK_LABEL = copy['bookingLinks'][0]['label']                 # "Check dates on Booking.com"
BOOK = copy['bookingLinks'][0]['url']
assert BOOK == dossier['booking']['engine_url']['value'], 'booking URL differs from the dossier'
C = copy['contact']
assert C['phone'] == dossier['contact']['phone']['value'], 'phone differs from the dossier'
TEL = 'tel:' + C['phone']
PHONE_SHOWN = re.sub(r'^\+94(\d{2})(\d{3})(\d{4})$', r'+94 \1 \2 \3', C['phone'])
MAP = C['mapUrl']
ADDRESS = C['address']
NAME = copy['businessName']
TOWN = 'Midigama, Sri Lanka'                                   # town + country of contact.address
TAGLINE = copy['tagline']
CLOSING = copy['closing']
SPOT = copy['spot']

def fmt_day(s): d = date.fromisoformat(s); return f'{d.day} {d:%b %Y}'
def fmt_month(s): y, m = s.split('-'); return f'{date(int(y), int(m), 1):%b %Y}'

PLATFORM = {'booking': 'Booking.com', 'google': 'Google'}
RATINGS = [dict(r, name=PLATFORM[r['platform']], day=fmt_day(r['capturedAt']),
                shown=(f"{r['score']:.1f}" if r['scale'] == '10' else f"{r['score']:.1f}"))
           for r in copy['ratings']]
REVIEWS = [dict(t, quote=re.sub(r'\s*\r?\n\s*', ' ', t['quote']).strip(),
                first=t['author'].split(',')[0], country=t['author'].split(', ')[-1],
                month=fmt_month(t['date']), src=PLATFORM[t['source']])
           for t in copy['testimonials']]
REVIEW_URL = next(r['url'] for r in copy['ratings'] if r['platform'] == 'booking')

ROOMS = {r['label']: r for r in copy['rooms']}
GARDEN_ROOMS = [r for r in copy['rooms'] if r['note'].startswith('Ground floor')]
KING = next(r for r in copy['rooms'] if r['note'].startswith('Upstairs'))
STAY = copy['stayInfo']
AMENITIES = [a['label'] + (f" ({a['note']})" if a.get('note') else '') for a in copy['amenities']]
def beds(r): return f"{r['beds']}, sleeps {r['sleeps']}"

# Alt texts, written from each photograph (opened at full size), not from the dossier line alone.
ALT = {
 'img-001': 'A blue ping-pong table with a yellow frame on the sandy garden lawn in sun, the white guest wing behind it',
 'img-002': 'An upstairs King Room: a bed under a white mosquito net with a blush trim, glass doors open onto a balcony with rattan chairs and trees',
 'img-004': 'A long wooden table and chairs on the roof terrace, green treetops behind',
 'img-008': 'A new bathroom with a poured-concrete basin, a round lit mirror and a walk-in shower',
 'img-009': 'The garden lawn with a stone birdbath in front of the tiled-roof garden wing and its veranda',
 'img-010': 'A King Room bed under a mosquito net, tall glass doors open to the trees',
 'img-015': 'A King Room with the bed under its net, an air-conditioning unit and a wooden wall shelf',
 'img-018': 'The entrance sign, "Lotus Surf House, Midigama" in metal script on a slate-blue wall under a flowering creeper',
 'img-019': 'The carved wooden garden gate standing open in a slate wall under a canopy of leaves, the sunlit garden through the doorway',
 'img-020': 'The garden under a big shade tree: a hammock by the wall, the lawn in dappled sun, a ping-pong table further back',
 'img-021': 'A corner of the roof terrace: a Buddha on a carved pedestal, yoga mats and cushions on the floor, palms beyond',
 'img-022': 'A bronze Buddha on its pedestal with offerings of fruit and flowers, among them a violet blossom',
 'img-025': 'From inside a King Room: glass doors open onto the balcony, two rattan chairs and a small table, palms and sky',
 'img-028': 'A ground-floor bathroom with grey flower-patterned wall tiles, black floor tiles, a pebble shower floor, a toilet and a basin',
 'img-029': 'A garden twin room with two single beds, striped covers, wooden wall shelves and a round woven rug',
 'img-030': 'A ground-floor bathroom with sage-green walls, a shower, a toilet and a small basin',
 'img-032': 'The veranda of the garden rooms: rattan chairs and a glass table on a red cement floor',
 'img-034': 'A King Room bedside: the bed under its net, an air-conditioning remote on a wooden side table',
 'img-035': 'An upstairs balcony with two rattan chairs between the palms',
 'img-043': 'The Deluxe Queen Room, wide-angle: a double bed under a mosquito net, rattan chairs and a rattan sofa, wooden shelves and a surfboard',
 'img-044': 'The wooden deck of a garden room, with rattan chairs and a glass table',
}

# Which photographs belong to which room. Booking.com ties the same photos to both twin types;
# no difference is invented between them.
GALLERIES = {
 'Standard Double or Twin Room with Garden View': ['img-029', 'img-032', 'img-030', 'img-009'],
 'Double or Twin Room with Garden View': ['img-029', 'img-032', 'img-009', 'img-030'],
 'Deluxe Queen Room': ['img-043', 'img-028', 'img-044'],
 'King Room with Balcony': ['img-002', 'img-010', 'img-015', 'img-025', 'img-034', 'img-008'],
}

ICON = {  # stroke icons, 24 grid, currentColor
 'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 'cal': '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
 'pin': '<path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/>',
 'cup': '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zM17 9.5h1.5a2.5 2.5 0 0 1 0 5H17M7 3.5v2M10.5 3.5v2M14 3.5v2M4 21h13"/>',
 'wave': '<path d="M2.5 9c2.4 0 2.4-2 4.75-2S9.6 9 12 9s2.4-2 4.75-2S19.1 9 21.5 9M2.5 15c2.4 0 2.4-2 4.75-2S9.6 15 12 15s2.4-2 4.75-2 2.35 2 4.75 2"/>',
 'star': '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 'leaf': '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15zM5 19l7-7"/>',
 'stairs': '<path d="M3 20h5v-5h5v-5h5V5h3"/>',
 'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
 'fan': '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C12 6 13.5 3 16 3.5c2 .4 1.5 4-4 6.9M13.6 12c4.4 0 7.4 1.5 6.9 4-.4 2-4 1.5-6.9-4M12 13.6c0 4.4-1.5 7.4-4 6.9-2-.4-1.5-4 4-6.9M10.4 12C6 12 3 10.5 3.5 8c.4-2 4 1.5 6.9 4"/>',
 'snow': '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
 'drop': '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 'train': '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M8.5 20l-2 2M15.5 20l2 2M8 13h.01M16 13h.01M8 16l-1.5 4h11L16 16"/>',
 'map': '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5zM9 4v13.5M15 6.5V20"/>',
 'prev': '<path d="m15 18-6-6 6-6"/>', 'next': '<path d="m9 18 6-6-6-6"/>',
 'up': '<path d="m6 15 6-6 6 6"/>', 'x': '<path d="M6 6l12 12M18 6 6 18"/>',
 'bed': '<path d="M3 19v-9M21 19v-5a3 3 0 0 0-3-3H8v8M3 15h18"/><circle cx="6" cy="12" r="1.6"/>',
 'quote': '<path d="M10 7H6a2 2 0 0 0-2 2v4h5v5H4M20 7h-4a2 2 0 0 0-2 2v4h5v5h-5" />',
}
def svg(name, cls='ic', sw='1.8'):
    return (f'<svg class="{cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>')

def font_link(query):
    return ('<link rel="preconnect" href="https://fonts.googleapis.com">'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            f'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?{query}&display=swap">')

def head(title_suffix, desc_extra=''):
    desc = f"{TAGLINE} Breakfast included. Book on Booking.com or call {PHONE_SHOWN}."
    return (f'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
            f'<title>{E(NAME)}, Midigama</title><meta name="description" content="{E(desc)}">'
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
