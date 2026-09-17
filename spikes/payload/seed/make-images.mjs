#!/usr/bin/env node
/**
 * Generates the (clearly synthetic) fixture photos. Already run once — the JPEGs are committed
 * under fixtures/<slug>/media/. Re-run only to change them:  node seed/make-images.mjs
 * Borrows sharp from ../site/node_modules (run `npm ci` there first).
 */
import { mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const sharp = createRequire(path.join(here, '..', 'site', 'package.json'))('sharp')

const waves = (w, h, y0, n, color, amp, phase) =>
  Array.from({ length: n }, (_, i) => {
    const y = y0 + (i * (h - y0)) / n
    let d = `M0 ${y}`
    for (let x = 0; x <= w; x += w / 8) d += ` Q ${x + w / 16} ${y + (i % 2 ? amp : -amp) * Math.sin(phase + i)} ${x + w / 8} ${y}`
    return `<path d="${d} L${w} ${h} L0 ${h} Z" fill="${color}" opacity="${0.25 + (0.6 * i) / n}"/>`
  }).join('')

const board = (x, y, len, rot, fill, stripe) =>
  `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse rx="${len / 7}" ry="${len / 2}" fill="${fill}"/><rect x="-3" y="${-len / 2.2}" width="6" height="${len / 1.1}" fill="${stripe}"/></g>`

const scene = ({ w, h, sky, sun, sea, boards = [], label }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#s)"/>
  <circle cx="${w * sun.x}" cy="${h * sun.y}" r="${h * sun.r}" fill="${sun.c}"/>
  ${waves(w, h, h * 0.55, 7, sea, h * 0.035, sun.x * 10)}
  <rect y="${h * 0.86}" width="${w}" height="${h * 0.14}" fill="#ead9b5"/>
  ${boards.map((b) => board(w * b.x, h * b.y, h * b.len, b.rot, b.fill, b.stripe)).join('')}
  <text x="${w - 24}" y="${h - 24}" text-anchor="end" font-family="sans-serif" font-size="${h * 0.022}" fill="#14232b" opacity="0.55">${label}</text>
</svg>`

const sets = {
  'wobbly-pelican': [
    { file: 'pelican-lineup.jpg', w: 1600, h: 1067, sky: ['#ffd9a0', '#ff8f6b'], sun: { x: 0.72, y: 0.42, r: 0.13, c: '#fff1c9' }, sea: '#0d5c63', boards: [{ x: 0.2, y: 0.8, len: 0.42, rot: 12, fill: '#fffaf1', stripe: '#e4572e' }] },
    { file: 'pelican-first-wave.jpg', w: 1200, h: 1500, sky: ['#bfe9f2', '#6ec3d4'], sun: { x: 0.25, y: 0.2, r: 0.07, c: '#ffffff' }, sea: '#11698e', boards: [{ x: 0.5, y: 0.62, len: 0.3, rot: 78, fill: '#ffd166', stripe: '#14232b' }] },
    { file: 'pelican-board-rack.jpg', w: 1200, h: 1500, sky: ['#fdf0d5', '#f7c59f'], sun: { x: 0.8, y: 0.15, r: 0.05, c: '#fff' }, sea: '#2a9d8f', boards: [0.25, 0.4, 0.55, 0.7].map((x, i) => ({ x, y: 0.72, len: 0.5, rot: 0, fill: ['#e4572e', '#fffaf1', '#ffd166', '#0d5c63'][i], stripe: '#14232b' })) },
  ],
  'lazy-turtle': [
    { file: 'turtle-shopfront.jpg', w: 1600, h: 1067, sky: ['#cdeac0', '#7fc8a9'], sun: { x: 0.18, y: 0.3, r: 0.1, c: '#fdffb6' }, sea: '#386641', boards: [0.6, 0.68, 0.76, 0.84].map((x, i) => ({ x, y: 0.7, len: 0.55, rot: i * 3 - 4, fill: ['#f2e8cf', '#bc4749', '#a7c957', '#f2e8cf'][i], stripe: '#386641' })) },
    { file: 'turtle-longboards.jpg', w: 1200, h: 1500, sky: ['#e0fbfc', '#98c1d9'], sun: { x: 0.6, y: 0.25, r: 0.09, c: '#fff' }, sea: '#3d5a80', boards: [{ x: 0.35, y: 0.7, len: 0.6, rot: -8, fill: '#ee6c4d', stripe: '#293241' }, { x: 0.6, y: 0.72, len: 0.56, rot: 6, fill: '#e0fbfc', stripe: '#293241' }] },
  ],
}

for (const [slug, images] of Object.entries(sets)) {
  const dir = path.join(here, 'fixtures', slug, 'media')
  await mkdir(dir, { recursive: true })
  for (const img of images) {
    const svg = scene({ ...img, label: `synthetic fixture · ${slug}` })
    const info = await sharp(Buffer.from(svg)).jpeg({ quality: 70, mozjpeg: true }).toFile(path.join(dir, img.file))
    console.log(`${slug}/${img.file} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`)
  }
}
