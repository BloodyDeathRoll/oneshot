# Build the town-mode area for run 2026-10-midigama-01, deterministic from the cached OSM inputs.
import json, sys
from shapely.geometry import LineString, Point, shape, mapping
from shapely.ops import transform, substring
from pyproj import Transformer

D = sys.argv[1]           # cache dir (coast.json, Galle.json)
OUT = sys.argv[2]         # reports/<run-id>/area.geojson
BUF = 200
ANCHOR = (80.3909468, 5.9652216)  # Nominatim node 1941205822 "Midigama", place=village

fwd = Transformer.from_crs(4326, 32644, always_xy=True).transform
inv = Transformer.from_crs(32644, 4326, always_xy=True).transform

d = json.load(open(f'{D}/coast.json'))
nodes = {e['id']: (e['lon'], e['lat']) for e in d['elements'] if e['type'] == 'node'}
way = [e for e in d['elements'] if e['type'] == 'way'][0]
coast = transform(fwd, LineString([nodes[i] for i in way['nodes']]))
galle = transform(fwd, shape(json.load(open(f'{D}/Galle.json'))[0]['geojson']))

# West cut: where the coastline leaves Galle District (the Galle–Matara district line).
west_pts = coast.intersection(galle.boundary)
anchor = transform(fwd, Point(ANCHOR))
geoms = getattr(west_pts, 'geoms', [west_pts])
west = min(geoms, key=lambda g: g.distance(anchor))
# East cut: where Nominatim's reverse geocode turns from village Midigama to Batawala (bisected
# along the shore 2026-10-26: Midigama at 80.40900, Batawala at 80.40916) — the meridian 80.40908.
EAST_LON = 80.40908
mer = transform(fwd, LineString([(EAST_LON, 5.90), (EAST_LON, 6.05)]))
cross = coast.intersection(mer)
east = min(getattr(cross, 'geoms', [cross]), key=lambda g: g.distance(anchor))
a, b = sorted([coast.project(west), coast.project(east)])
stretch = substring(coast, a, b)
poly = stretch.buffer(BUF, cap_style='flat')

wgs = lambda g: transform(inv, g)
fc = {'type': 'FeatureCollection', 'features': [
    {'type': 'Feature', 'properties': {'role': 'anchor', 'query': 'Midigama, Sri Lanka', 'geocoder': 'nominatim', 'osm': 'node/1941205822'}, 'geometry': mapping(wgs(anchor))},
    {'type': 'Feature', 'properties': {'role': 'west_cut', 'rule': 'coastline meets Galle District boundary (relation 5337914)'}, 'geometry': mapping(wgs(west))},
    {'type': 'Feature', 'properties': {'role': 'east_cut', 'rule': 'coastline crosses lng 80.40908, where Nominatim reverse geocoding turns from village Midigama (87100) to Batawala (81700)'}, 'geometry': mapping(wgs(east))},
    {'type': 'Feature', 'properties': {'role': 'coastline', 'osm': 'way/23463869', 'length_m': round(stretch.length)}, 'geometry': mapping(wgs(stretch))},
    {'type': 'Feature', 'properties': {'role': 'area', 'mode': 'town', 'shore_buffer_m': BUF, 'crs_for_buffer': 'EPSG:32644', 'area_km2': round(poly.area / 1e6, 3)}, 'geometry': mapping(wgs(poly))},
]}
json.dump(fc, open(OUT, 'w'), indent=1)
w, e = wgs(west), wgs(east)
print('west', w.x, w.y, 'east', e.x, e.y, 'stretch m', round(stretch.length), 'area km2', round(poly.area / 1e6, 3),
      'anchor->coast m', round(anchor.distance(coast)))
