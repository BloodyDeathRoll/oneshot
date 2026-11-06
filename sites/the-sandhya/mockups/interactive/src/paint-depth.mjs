// paint-depth.mjs: paints the two hand-cut depth maps for the interactive mockup (no image input,
// no dependencies). Called by make-media.sh. The shapes are traced by eye from img-032 and img-068
// in their 2000 px frames. 1 = nearest the camera, 0 = farthest. Writes 8-bit greyscale PNG.
// A shape's value is a number, or [x0, y0, v0, x1, y1, v1]: a linear ramp between two points.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'img');
const MAP_W = 768;

// The room's back is one rigid box: wall, stair, rods and the glass wall all lie on planes that meet
// without a step, so the rods and the uprights stay dead straight whatever moves. Only three true
// edges exist: the sea behind the glass (a small step), the soffit over the wall, and the floor and
// furniture over everything behind them.
const WALL = [0, 0, 0.48, 1145, 0, 0.3];
const GLASS = [1145, 0, 0.3, 2000, 0, 0.5];
const VIEW = [1145, 0, 0.17, 2000, 0, 0.37]; // the same plane as the glass, one small step behind it
// Thin upright of the glass wall: x at its top, x at its bottom, half width in source px.
const bar = (xt, yt, xb, yb, w = 7) => ({ v: GLASS, p: [[xt - w, yt], [xt + w, yt], [xb + w, yb], [xb - w, yb]] });

const LOUNGE = {
  w: 2000, h: 1333, name: 'depth-hero.png',
  shapes: [
    // Sky, sea, lawn, deck and pool, seen through the glass.
    { v: VIEW, p: [[1145, 0], [2000, 0], [2000, 1333], [1145, 1333]] },
    // The wall, stair and rods, as far as the first full pane of the glass wall.
    { v: WALL, p: [[0, 0], [1145, 0], [1145, 1000], [0, 1000]] },
    // Ceiling, and the soffit seen beyond the upper panes.
    { v: [780, 118, 0.36, 1019, -329, 0.46], p: [[560, 0], [1640, 0], [1145, 205], [1000, 235]] },
    { v: GLASS, p: [[1145, 195], [1440, 0], [1660, 0], [1343, 118], [1200, 195], [1145, 217]] },
    // The band between the storeys and the overhang under it, as far as its lower edge.
    { v: GLASS, p: [[1145, 365], [2000, 195], [2000, 400], [1830, 430], [1812, 409], [1607, 460], [1537, 470], [1390, 495], [1285, 512], [1145, 530]] },
    // Lower uprights.
    bar(1157, 520, 1157, 800, 4), bar(1200, 516, 1200, 815, 6),
    bar(1281, 498, 1281, 830, 5), bar(1395, 478, 1395, 860, 6), bar(1537, 452, 1537, 892, 6),
    bar(1607, 442, 1607, 910, 6), bar(1815, 400, 1822, 960, 11),
    // Upper uprights.
    bar(1200, 150, 1200, 425, 6), bar(1343, 65, 1343, 385, 8),
    bar(1535, 0, 1535, 330, 9), bar(1810, 0, 1810, 250, 9),
    // The curved soffit of the landing, top left.
    { v: 0.72, p: [[0, 0], [85, 0], [110, 90], [170, 200], [270, 300], [445, 388], [448, 402], [330, 422], [150, 434], [0, 428]] },
    // Floor, a tilted plane: it meets the wall and the glass wall at their own values.
    { v: [1000, 850, 0.376, 978, 1333, 1], p: [[0, 908], [50, 880], [350, 860], [690, 838], [1230, 830], [1400, 855], [1822, 956], [2000, 999], [2000, 1333], [0, 1333]] },
    // Furniture. Each sits at the floor's value under its own feet, so nothing tears at the feet.
    { v: 0.44, p: [[355, 677], [432, 677], [432, 700], [418, 868], [372, 868], [392, 702], [358, 700]] }, // standing lamp
    { v: 0.53, p: [[52, 800], [300, 775], [352, 778], [352, 880], [240, 935], [50, 895]] }, // desk
    { v: 0.66, p: [[0, 860], [60, 860], [100, 815], [170, 825], [215, 870], [210, 950], [150, 975], [60, 975], [0, 975]] }, // blue chairs
    { v: 0.5, p: [[660, 745], [680, 745], [735, 945], [712, 945]] }, // red lamp, pole
    { v: 0.5, p: [[715, 748], [757, 748], [757, 808], [715, 812]] }, // red lamp, shade
    { v: 0.56, p: [[688, 828], [1060, 785], [1142, 793], [1142, 893], [750, 963], [705, 943], [690, 903]] }, // sofa
    { v: 0.52, p: [[1200, 878], [1225, 833], [1280, 798], [1310, 783], [1365, 791], [1415, 803], [1415, 848], [1390, 883], [1345, 913], [1385, 953], [1370, 958], [1335, 933], [1335, 973], [1325, 973], [1320, 938], [1240, 918], [1215, 933], [1200, 933], [1212, 903]] }, // hoop chair, far
    { v: 0.6, p: [[1405, 938], [1415, 903], [1430, 863], [1480, 833], [1520, 813], [1600, 823], [1685, 831], [1700, 903], [1660, 968], [1630, 998], [1650, 1033], [1640, 1038], [1618, 1013], [1618, 1091], [1606, 1091], [1605, 1023], [1450, 998], [1415, 1018], [1402, 1013], [1415, 968]] }, // hoop chair, near
    { v: 0.73, p: [[947, 965], [1145, 919], [1392, 1003], [1178, 1085], [950, 978]] }, // table, top only: its legs lie on the floor's own ramp
    { v: 0.88, p: [[608, 928], [645, 908], [685, 938], [700, 958], [805, 929], [807, 943], [750, 968], [765, 1003], [878, 971], [880, 985], [892, 1028], [840, 1048], [740, 1123], [660, 1231], [655, 1213], [690, 1123], [660, 1078], [615, 1141], [610, 1128], [640, 1073], [630, 1023]] }, // armchair, far
    { v: 1, p: [[708, 1023], [730, 995], [770, 1013], [815, 1063], [943, 1013], [946, 1025], [885, 1063], [895, 1118], [970, 1078], [1000, 1093], [1070, 1093], [1072, 1108], [1040, 1138], [1088, 1183], [1080, 1213], [1078, 1238], [1000, 1283], [1075, 1333], [840, 1333], [750, 1293], [700, 1313], [750, 1183], [730, 1153], [715, 1103], [708, 1053]] }, // armchair, near
  ],
};

const ROOM = {
  w: 2000, h: 1334, name: 'depth-feature.png',
  shapes: [
    // Sky, sea, lawn, pool and patio, seen through the glass: one gently tilted plane.
    { v: [0, 735, 0.14, 0, 1330, 0.34], p: [[0, 0], [2000, 0], [2000, 1334], [0, 1334]] },
    // Overhang and concrete column outside the glass.
    { v: 0.3, p: [[730, 240], [1110, 0], [1740, 0], [1490, 90], [925, 305], [885, 320], [735, 290]] },
    { v: 0.3, p: [[730, 285], [882, 322], [882, 880], [780, 960], [730, 1000]] },
    // The left wall, from the camera to the window.
    { v: [0, 0, 0.86, 730, 0, 0.4], p: [[0, 0], [730, 0], [730, 1010], [0, 1010]] },
    // Ceiling, meeting the wall at the wall's values.
    { v: [300, 180, 0.62, 0, 0, 0.9], p: [[0, 0], [1115, 0], [730, 240], [600, 255], [0, 105]] },
    // Curtain.
    { v: 0.42, p: [[600, 255], [727, 180], [745, 1000], [705, 1005], [600, 960]] },
    // Glass frames.
    { v: 0.38, p: [[726, 235], [1115, 0], [1132, 0], [742, 250], [752, 1010], [738, 1010]] },
    { v: 0.4, p: [[895, 130], [922, 118], [925, 1062], [898, 1042]] },
    { v: 0.5, p: [[1450, 0], [1490, 0], [1498, 1334], [1450, 1334]] },
    // Floor and the mat.
    { v: [0, 1000, 0.48, 0, 1334, 0.92], p: [[370, 1012], [745, 1002], [1000, 1130], [1450, 1334], [640, 1334]] },
    // Table, chairs and lamp.
    { v: 0.6, p: [[110, 860], [240, 850], [295, 950], [300, 980], [190, 980], [125, 950]] },
    { v: 0.6, p: [[278, 850], [565, 830], [570, 870], [510, 900], [505, 1095], [470, 1095], [400, 960], [340, 1000], [280, 890]] },
    { v: 0.6, p: [[552, 880], [612, 835], [730, 845], [730, 920], [700, 1095], [640, 1000], [570, 1095], [552, 1090]] },
    { v: 0.56, p: [[486, 695], [590, 690], [598, 720], [570, 830], [530, 1010], [515, 1005], [560, 780], [490, 760]] },
    // The bed, nearest of all.
    { v: 1, p: [[0, 990], [150, 955], [290, 955], [712, 1334], [0, 1334]] },
  ],
};

function valueAt(v, x, y) {
  if (typeof v === 'number') return v;
  const [x0, y0, v0, x1, y1, v1] = v;
  const dx = x1 - x0, dy = y1 - y0;
  const t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy)));
  return v0 + (v1 - v0) * t;
}

function inside(p, x, y) {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if ((p[i][1] > y) !== (p[j][1] > y) && x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) c = !c;
  }
  return c;
}

function paint({ w, h, shapes }) {
  const W = MAP_W, H = Math.round((W * h) / w), s = w / W, SS = 3;
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let sum = 0;
      for (let a = 0; a < SS; a++) {
        for (let b = 0; b < SS; b++) {
          const X = (x + (a + 0.5) / SS) * s, Y = (y + (b + 0.5) / SS) * s;
          let v = 0;
          for (const sh of shapes) if (inside(sh.p, X, Y)) v = valueAt(sh.v, X, Y); // last hit wins
          sum += v;
        }
      }
      out[y * W + x] = sum / (SS * SS);
    }
  }
  return { W, H, data: out };
}

// Grow near shapes by two map pixels, then soften: the ramp between two depths then lies wholly on
// the far side of a silhouette, so what stretches is plain sky or sea and never the object's own edge.
function dilate({ W, H, data }) {
  const o = new Float32Array(data);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    let m = data[y * W + x];
    for (const d of [-1, 1, -W, W]) m = Math.max(m, data[y * W + x + d]);
    o[y * W + x] = m;
  }
  return { W, H, data: o };
}
function soften({ W, H, data }) {
  const k = [1, 2, 1];
  const t = new Float32Array(W * H), o = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = 0; for (let i = -1; i <= 1; i++) v += data[y * W + Math.min(W - 1, Math.max(0, x + i))] * k[i + 1];
    t[y * W + x] = v / 4;
  }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = 0; for (let i = -1; i <= 1; i++) v += t[Math.min(H - 1, Math.max(0, y + i)) * W + x] * k[i + 1];
    o[y * W + x] = v / 4;
  }
  return { W, H, data: o };
}

function crc32(buf) {
  let c, r = 0xffffffff;
  for (let n = 0; n < buf.length; n++) { c = (r ^ buf[n]) & 255; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; r = (r >>> 8) ^ c; }
  return (r ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function png({ W, H, data }) {
  const raw = Buffer.alloc((W + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W + 1)] = 0;
    for (let x = 0; x < W; x++) raw[y * (W + 1) + 1 + x] = Math.round(Math.max(0, Math.min(1, data[y * W + x])) * 255);
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

for (const m of [LOUNGE, ROOM]) {
  const file = join(OUT, m.name);
  writeFileSync(file, png(soften(dilate(dilate(paint(m))))));
  console.log(file);
}
