// paint-depth.mjs: paints the two depth maps for the interactive mockup (no image input, no
// dependencies). Called by make-media.sh. Writes 8-bit greyscale PNG. 1 = nearest, 0 = farthest.
//
// Round 2: no silhouettes at all. Each photograph is a room, and a room is a few flat planes: wall,
// glass wall, ceiling, floor. Inverse depth is linear across a plane, and seen from inside a box the
// nearest plane wins, so depth = max(planes). Every plane therefore moves as a plane: straight lines
// stay straight wherever the camera goes, and there is no edge in the map for a line to kink on.
// Furniture stands on the floor's plane. The glass wall, its uprights and the sea are one plane.
// The coefficients come from where the planes meet in each photograph's 2000 px frame.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'img');
const MAP_W = 320;

const LOUNGE = {
  w: 2000, h: 1333, name: 'depth-hero.png',
  planes: [
    (x) => (1010 - x) * 0.000121,                       // left wall, stair and rods
    (x) => (x - 1010) * 0.000384,                       // glass wall, uprights, sky, sea, pool
    (x, y) => 0.0000187 * x + 0.001912 * y - 1.5678,    // floor, and everything standing on it
    (x, y) => 0.0001745 * x - 0.000559 * y - 0.0432,    // ceiling
  ],
};

const ROOM = {
  w: 2000, h: 1334, name: 'depth-feature.png',
  planes: [
    (x) => (735 - x) * 0.00051,                         // left wall
    (x) => (x - 735) * 0.0005,                          // glass wall, frames, and the view through them
    (x, y) => -0.000443 * x + 0.002019 * y - 1.6935,    // floor, bed, table
    (x, y) => -0.000283 * x - 0.00124 * y + 0.5052,     // ceiling
  ],
};

function paint({ w, h, planes }) {
  const W = MAP_W, H = Math.round((W * h) / w), s = w / W;
  const data = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = 0;
    for (const f of planes) v = Math.max(v, f((x + 0.5) * s, (y + 0.5) * s));
    data[y * W + x] = v;
  }
  return { W, H, data };
}

// Round the creases a little, so a line crossing from one plane to the next turns and never kinks.
function soften({ W, H, data }) {
  const k = [1, 4, 6, 4, 1];
  const t = new Float32Array(W * H), o = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = 0; for (let i = -2; i <= 2; i++) v += data[y * W + Math.min(W - 1, Math.max(0, x + i))] * k[i + 2];
    t[y * W + x] = v / 16;
  }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = 0; for (let i = -2; i <= 2; i++) v += t[Math.min(H - 1, Math.max(0, y + i)) * W + x] * k[i + 2];
    o[y * W + x] = v / 16;
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
  writeFileSync(file, png(soften(paint(m))));
  console.log(file);
}
