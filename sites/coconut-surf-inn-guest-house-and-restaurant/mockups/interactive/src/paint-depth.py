#!/usr/bin/env python3
# Hand-painted depth map for img-102 (the thatched roof terrace), for the interactive hero's
# parallax shader. Drawn from shapes in code: no model, no estimation, nothing generated from
# pixels. Each shape below was placed by eye on a 100 px grid over a 1200 x 900 preview of
# dossier/.../assets/img-102.jpg (1920 x 1440), and every coordinate is in that preview's space.
# Values: 0 = farthest (sea and sky), 1 = nearest (the thatch over your head and the pillars).
# Writes a 480 x 360 greyscale PGM (a quarter of the original) to the path given; make-media.sh
# crops it to the two hero crops and converts it to PNG.
# media: (none directly; called by make-media.sh, whose header covers dist/img/**)
import sys

W, H = 480, 360            # depth grid = original / 4
K = W / 1200               # preview -> grid
d = [[0.0] * W for _ in range(H)]

def poly(pts, val):
    """Fill a polygon (preview coords). val is a number or a function of preview y."""
    p = [(x * K, y * K) for x, y in pts]
    ys = [y for _, y in p]
    for gy in range(max(0, int(min(ys))), min(H, int(max(ys)) + 2)):
        cy = gy + .5
        xs = []
        for (x1, y1), (x2, y2) in zip(p, p[1:] + p[:1]):
            if (y1 <= cy < y2) or (y2 <= cy < y1):
                xs.append(x1 + (cy - y1) * (x2 - x1) / (y2 - y1))
        xs.sort()
        v = val(cy / K) if callable(val) else val
        for a, b in zip(xs[::2], xs[1::2]):
            for gx in range(max(0, int(a + .5)), min(W, int(b + .5))):
                d[gy][gx] = v

def rect(x1, y1, x2, y2, val): poly([(x1, y1), (x2, y1), (x2, y2), (x1, y2)], val)
def lerp(y, y1, v1, y2, v2): t = min(1, max(0, (y - y1) / (y2 - y1))); return v1 + (v2 - v1) * t

# 5. Sea and sky stay 0. The palms beyond the railing are thin and far: left at 0 so their fronds
#    never smear against the sky.
# 4. The trees and bushes beyond the railing on the right, and the strip of land at the horizon.
poly([(930, 360), (1000, 340), (1150, 330), (1150, 435), (930, 440)], .12)
rect(0, 440, 760, 452, .3)                                    # the railing at the roof edge
# 3. The terrace floor: far at its back edge, near at the bottom of the frame.
rect(0, 540, 1200, 900, lambda y: lerp(y, 540, .44, 900, .96))
# 2. The parapet, the long glass-topped planter, the walls, the swing and its plants.
rect(175, 447, 680, 600, .42)                                 # back wall of the parapet
poly([(975, 430), (1150, 430), (1150, 575), (975, 560)], .45)  # right-hand walls
poly([(240, 488), (760, 482), (770, 530), (228, 535)], .48)    # glass top of the planter
rect(228, 530, 828, 652, .53)                                 # its front face
poly([(760, 298), (1000, 296), (1055, 598), (1040, 600), (985, 360), (800, 330), (775, 600), (760, 600)], .5)  # swing frame
poly([(745, 360), (830, 335), (930, 345), (990, 400), (985, 520), (900, 560), (770, 540), (740, 470)], .5)       # its plants
rect(848, 548, 945, 626, .56)                                 # the square pot
rect(400, 540, 462, 652, .58)                                 # the small pot on the floor
poly([(150, 400), (215, 395), (215, 590), (150, 600)], .66)    # plants by the left pillar
rect(165, 585, 213, 682, .7)                                  # their planter
# 1. Nearest: the thatch overhead (sloping away from you), its fringe, the pillars, the hammock.
rect(0, 0, 1200, 32, 1.0)                                     # the front beam
rect(145, 32, 1160, 150, lambda y: lerp(y, 32, .95, 150, .64))  # the woven underside
rect(145, 150, 1160, 292, lambda y: lerp(y, 150, .62, 292, .22))  # the fringe: strands taper,
#    so their tips move little against the sky and never tear.
poly([(57, 0), (165, 0), (167, 742), (80, 742), (57, 600)], .86)  # left pillar
rect(1145, 30, 1200, 650, .84)                                # right pillar
poly([(0, 395), (62, 400), (62, 625), (0, 630)], .9)           # the hammock at the left edge

# Soften every edge (three box passes ~ a Gaussian, radius 3 at this scale): the shader then
# stretches a few pixels of uniform sky instead of tearing an outline.
def box(rows, r):
    out = []
    for row in rows:
        acc = sum(row[0:r + 1]) + row[0] * r
        new = []
        for x in range(len(row)):
            new.append(acc / (2 * r + 1))
            acc += row[min(len(row) - 1, x + r + 1)] - row[max(0, x - r)]
        out.append(new)
    return out
def T(m): return [list(c) for c in zip(*m)]
for _ in range(3):
    d = T(box(T(box(d, 3)), 3))

with open(sys.argv[1], 'wb') as f:
    f.write(b'P5 %d %d 255\n' % (W, H))
    f.write(bytes(max(0, min(255, round(v * 255))) for row in d for v in row))
