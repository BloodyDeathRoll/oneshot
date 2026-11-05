#!/usr/bin/env python3
"""Trace the wash line (concepts §4, concept 1) from the real foam edge on the sand in img-019.

The foam meets the wet sand along a diagonal in that photograph, from about (640, 1240) to (1440, 1530).
For each pixel column, walking up from the sand, the edge is the first pixel that is foam (bright and
not sand-coloured). The diagonal is removed with a least-squares line, the rest is lightly smoothed and
written as an SVG path, so the shape on the page is the shape of that water, unrolled to level.

Writes src/wash.json: {"d": path over viewBox 0 0 1440 100, "top": closed shape, white below the line}.
Needs ffmpeg. Text output only: no media. Run: python3 src/trace-wash.py
"""
import json, pathlib, subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[4]
SRC = ROOT / 'dossier/sanjee-surf-school/assets/img-019.webp'
W, H = 1440, 1920
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(SRC), '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                     capture_output=True, check=True).stdout
assert len(raw) == W * H * 3


def px(x, y):
    i = (y * W + x) * 3
    return raw[i], raw[i + 1], raw[i + 2]


def foam(x, y):
    r, g, b = px(x, y)
    return min(r, g, b) > 150 and b > r * 0.82   # bright, and not the orange of wet sand


def edge(x):
    # the first run of foam going up from below the diagonal; three pixels, so one fleck does not count
    start = min(H - 4, int(1240 + (x - 600) * 0.40) + 70)
    for y in range(start, 1150, -1):
        if foam(x, y) and foam(x, y - 1) and foam(x, y - 2):
            return y
    return None


xs, ys = [], []
for x in range(640, W, 2):
    y = edge(x)
    if y is not None:
        xs.append(x); ys.append(y)
n = len(xs)
mx, my = sum(xs) / n, sum(ys) / n
slope = sum((a - mx) * (b - my) for a, b in zip(xs, ys)) / sum((a - mx) ** 2 for a in xs)
level = [b - (my + slope * (a - mx)) for a, b in zip(xs, ys)]

# a median, then a small box blur: keeps the lobes, drops single-pixel noise
med = [sorted(level[max(0, i - 3):i + 4])[len(level[max(0, i - 3):i + 4]) // 2] for i in range(n)]
# Round 10 (critics: "a stock SVG wave divider"): much heavier blur, so the small regular lobes go and what is
# left is the long, slow line of the water's edge. W = half-width of the blur in samples (2 source px each).
W = 22
smooth = [sum(med[max(0, i - W):i + W + 1]) / len(med[max(0, i - W):i + W + 1]) for i in range(n)]
lo, hi = min(smooth), max(smooth)

# resample to the viewBox. In the photograph the foam is above the edge and its tongues point down at the sand.
# On the page the white is the foam and it comes from below, so the shape is flipped: tongues up.
# y runs 38..92 of a box where 100 is the foot of the hero, and it climbs gently to the right, where the bay's
# strip of sand is deeper, so the white stays on the sand.
STEPS = 12
pts = []
for k in range(STEPS + 1):
    i = round(k / STEPS * (n - 1))
    f = (hi - smooth[i]) / (hi - lo)
    pts.append((k / STEPS * 1440, 44 + f * 48 - 10 * (k / STEPS)))


def fmt(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


# Catmull-Rom to cubic Bezier
d = f'M{fmt(pts[0][0])} {fmt(pts[0][1])}'
for i in range(len(pts) - 1):
    p0, p1, p2, p3 = pts[max(i - 1, 0)], pts[i], pts[i + 1], pts[min(i + 2, len(pts) - 1)]
    c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
    c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
    d += f'C{fmt(c1[0])} {fmt(c1[1])} {fmt(c2[0])} {fmt(c2[1])} {fmt(p2[0])} {fmt(p2[1])}'

out = {'source': 'img-019 foam edge', 'columns': n, 'amplitude_px': round(hi - lo, 1), 'slope': round(slope, 3),
       'line': d, 'below': d + 'V100H0Z'}
(HERE / 'wash.json').write_text(json.dumps(out, indent=1) + '\n')
print(f'columns {n}, slope {slope:.3f}, amplitude {hi - lo:.1f} source px')
