#!/usr/bin/env node
// sites/the-sandhya/mockups/calm/src/build.mjs — writes dist/index.html from copy/en.json and
// page.html, so every word on the page is the audited copy and never retyped.
// node sites/the-sandhya/mockups/calm/src/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const c = JSON.parse(readFileSync(join(here, '../../../copy/en.json'), 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const block = (h) => c.copyBlocks.find((b) => b.heading === h);
const paras = (h) => block(h).body.split('\n\n');
const p = (t, cls) => `<p${cls ? ` class="${cls}"` : ''}>${esc(t)}</p>`;

const ENGINE = c.bookingLinks[0];
const icon = (n, cls = 'ic') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const bookBtn = (l = ENGINE, extra = '') => `<a class="btn btn-book${extra}" href="${esc(l.url)}">${esc(l.label)}</a>`;
const tel = `tel:${c.contact.phone}`;
const mail = `mailto:${c.contact.email}`;
const phonePrinted = '+94 765 700 007'; // the hotel's own printing of contact.phone (dossier contact.phone.verified)
const callBtn = `<a class="btn btn-soft" href="${tel}">${icon('phone')}Call</a>`;
const mailBtn = `<a class="btn btn-soft" href="${mail}">${icon('mail')}Email</a>`;
const mapBtn = `<a class="btn btn-soft" href="${esc(c.contact.mapUrl)}">${icon('pin')}Map</a>`;
const igBtn = `<a class="btn btn-soft" href="${esc(c.socialLinks[0].url)}">${icon('insta')}Instagram</a>`;

// Rooms: photographs per room as listed in concepts.md, alt written from each photograph.
const SHOTS = {
  'Studio King': [
    ['img-077', 1400, 'A white bed in the foreground, glass doors looking onto the long blue pool, parasols and the sea, a tall black mirror on the far wall and a dark bench beside it.'],
    ['img-061', 1400, 'From the foot of the bed: a dark daybed, a round wooden table and glass doors with two palms and white surf beyond.'],
    ['img-062', 1400, 'The whole room: a king bed with a teak headboard on the right, a cowhide on the floor, a ceiling fan and the glass doors to the sea on the left.'],
    ['img-070', 1400, 'A king bed against a pale wall, with chevron-panelled teak wardrobe doors and a short corridor behind it.'],
    ['img-079', 1400, 'A white stone basin under a lit mirror, a teak splashback and a glass-walled shower to the left.'],
  ],
  'Studio Twin': [
    ['img-043', 1400, 'Two white beds with teak headboards, a jute rug, a round table and glass doors with the sea and palms on the right.'],
    ['img-080', 1400, 'From behind the beds: glass doors with a bent palm and white surf, curtains drawn to each side, a round table to the right.'],
    ['img-165', 1400, 'Two beds side by side on small dark rugs, chevron-panelled teak wardrobe doors on the wall behind.'],
    ['img-167', 1400, 'Two beds on the left, sliding glass doors filling the right with palms, sea and a table with a red-shaded lamp.'],
    ['img-083', 1280, 'A round wooden table with a water bottle and a small plant, two wooden chairs with woven seats and a red-shaded floor lamp in front of sheer curtains.'],
  ],
  'Studio+ King': [
    ['img-042', 1400, 'A teak desk built into the back of the bed, a tall black mirror on the wall and glass doors with a palm and the sea beyond.'],
    ['img-066', 1400, 'A teak desk built into the back of the bed, seen from the side, with a glimpse of the pool and lawn through the glass doors.'],
    ['img-067', 1400, 'The corner of a white bed, a round table with flowers and a red lamp, and glass doors with the pool, a parasol and the sea.'],
    ['img-074', 1400, 'A white bed along the left, a jute rug and sliding glass doors on the right with palms and a lounge chair outside.'],
    ['img-076', 1400, 'A deep white stand-alone tub with a teak tray against a dark wall, and through a doorway a desk and a palm in the window.'],
    ['img-073', 1400, 'A bathroom with dual white basins on the left, a towel ladder and the stand-alone soaking tub under a lit niche.'],
  ],
  'Director’s Suite': [
    ['img-087', 1400, 'The suite from the living area: a grey sofa and teak desk in front, a television on a teak unit, the bed behind and a wall of glass with palms and the sea.'],
    ['img-171', 1400, 'From the bed: a corner of glass with palms and surf on the left, a television unit, a grey sofa and a tall mirror.'],
    ['img-172', 1400, 'A long teak desk and a grey sofa in the foreground, and the bed beyond a television unit.'],
    ['img-058', 1400, 'A walk-in wardrobe lined in teak, with a white robe on a hanger and open shelves on either side.'],
    ['img-059', 1400, 'From the wardrobe, a long teak-backed double basin running towards a white tub at the far end.'],
    ['img-055', 1400, 'A marble bathroom with a stand-alone tub beyond a glass door and a double basin in the foreground.'],
  ],
};
const slide = ([id, w, alt], i) => {
  const dims = `width="${w}" height="${Math.round(w * 2 / 3)}" sizes="(max-width: 767px) 100vw, 60vw" alt="${esc(alt)}"`;
  const set = `img/${id}-1000.webp 1000w, img/${id}-${w}.webp ${w}w`;
  // The first photograph is ordinary lazy. The rest wake when the room comes near (a phone would
  // otherwise fetch every strip on first load), with a plain image for JS off.
  if (i === 0) return `<li class="slide"><img loading="lazy" decoding="async" src="img/${id}-1000.webp" srcset="${set}" ${dims}></li>`;
  return `<li class="slide"><img decoding="async" data-src="img/${id}-1000.webp" data-srcset="${set}" ${dims}><noscript><img src="img/${id}-1000.webp" srcset="${set}" ${dims}></noscript></li>`;
};
const roomLink = (label) => c.bookingLinks.find((l) => l.label.startsWith(label + ':'));
const rooms = c.rooms.map((r, i) => `
    <article class="room${i % 2 ? ' flip' : ''}">
      <div class="show" role="group" aria-roledescription="slideshow" aria-label="${esc(r.label)}">
        <div class="stage"><ul class="strip" tabindex="0">${SHOTS[r.label].map((s, i) => slide(s, i)).join('')}</ul></div>
        <div class="dots"></div>
      </div>
      <div class="room-text">
        <h3>${esc(r.label)}</h3>
        <p class="meta">${esc(r.beds)} | Sleeps ${r.sleeps}</p>
        <p>${esc(r.note)}</p>
        ${bookBtn(roomLink(r.label))}
      </div>
    </article>`).join('');

// ¶3 of The rooms as a list: the copy's own words, cut at its commas. First letters are raised in CSS.
const KIT = [
  ['bed', 'a plush pillow-top mattress with 500 thread count linen'],
  ['shower', 'a shower big enough for two'],
  ['leaf', 'Spa Ceylon amenities'],
  ['robe', 'bathrobes and slippers'],
  ['fan', 'central air conditioning and a ceiling fan'],
  ['desk', 'a desk'],
  ['plug', 'universal sockets'],
  ['dryer', 'a hairdryer'],
  ['speaker', 'a Bluetooth speaker'],
  ['wifi', 'High speed WiFi'],
  ['news', 'newspapers and magazines from around the world on PressReader'],
];
const R = paras('The rooms');
const D = paras('The Dining Room');
const I = paras('Pause, take a deep breath & exhale. You are home.');
const L = paras('Casual Luxe');
const K = paras('Kabalana and around');
const X = paras('Exclusive Use');
const W = paras('Why Sandhya');
const amenities = c.amenities.map((a) => `<li>${icon('check')}<span>${esc(a.label)}${a.note ? ` <span class="soft">| ${esc(a.note)}</span>` : ''}</span></li>`).join('');

const host = { 'au.trip.com': 'Trip.com', 'www.kayak.com': 'Kayak' };
const ratingBits = c.ratings.map((r) => ({ url: r.url, score: `${r.score}/${r.scale}`, rest: `${host[new URL(r.url).hostname]} | ${r.count} reviews | <span class="nb">read ${r.capturedAt}</span>` }));
const ratingBig = ratingBits.map((r) => `<a class="rating" href="${esc(r.url)}"><span class="score">${r.score}</span><span class="sep"> | </span><span class="rate-rest"><span>${r.rest}</span>${icon('arrow')}</span></a>`).join('');
const ratingLine = ratingBits.map((r) => `<li><a class="rate-line" href="${esc(r.url)}"><span>${r.score} | ${r.rest}</span>${icon('arrow')}</a></li>`).join('');
const monthName = (ym) => new Date(`${ym}-15T00:00:00Z`).toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const quotes = c.testimonials.map((t) => `<blockquote class="quote"><p>${esc(t.quote)}</p><footer>${esc(t.author)} | Trip.com | ${monthName(t.date)}</footer></blockquote>`).join('');
const price = c.priceList[0];
const money = `US$${price.price.toLocaleString('en-US')}`;

const vars = {
  TAGLINE_H1: esc(c.tagline).replace('Kabalana Beach,', '<span class="nb">Kabalana Beach,</span>').replace('Ahangama, Sri Lanka.', '<span class="nb">Ahangama, Sri Lanka.</span>'),
  TAGLINE: esc(c.tagline),
  ENGINE_URL: esc(ENGINE.url),
  ENGINE_LABEL: esc(ENGINE.label),
  BOOK: bookBtn(),
  BOOK_ARROW: `<a class="btn btn-book btn-big" href="${esc(ENGINE.url)}">${esc(ENGINE.label)}${icon('arrow')}</a>`,
  CALL: callBtn, EMAIL: mailBtn, MAP: mapBtn, IG: igBtn, TEL: tel, PHONE_ICON: icon('phone'),
  INTRO_H: esc(block('Pause, take a deep breath & exhale. You are home.').heading),
  I1: p(I[0]), I2: p(I[1], 'big'), I3: p(I[2]), I4: p(I[3]),
  ROOMS_H: esc('The rooms'), R1: p(R[0], 'lede'), R2: p(R[1], 'lede-s'), R4: p(R[3]), R5: p(R[4]),
  ROOMS: rooms,
  KIT_HEAD: 'Every room has',
  KIT: KIT.map(([i, t]) => `<li>${icon(i)}<span class="cap">${esc(t)}</span></li>`).join(''),
  CHECKIN: esc(c.stayInfo.checkInFrom), CHECKOUT: esc(c.stayInfo.checkOutTo), STAY_NOTE: esc(c.stayInfo.note),
  AMENITIES: amenities,
  FEATURE: esc(c.featureLine),
  DINING_H: esc('The Dining Room'), D1: p(D[0]), D2: p(D[1]), D3: p(D[2]), D4: p(D[3]), D5: p(D[4], 'strong'),
  LUXE_H: esc('Casual Luxe'), L1: p(L[0]), L2: p(L[1]), L3: esc(L[2]), L4: p(L[3]), L5: p(L[4]), L6: esc(L[5]),
  KAB_H: esc('Kabalana and around'), SPOT: esc(c.spot), K: K.map((t) => p(t)).join(''),
  GUESTS_RATINGS: ratingBig, QUOTES: quotes,
  X_H: esc('Exclusive Use'), X1: p(X[0]), X2: p(X[1]),
  PRICE_LABEL: esc(price.label), PRICE: money, PRICE_NOTE: esc(price.note),
  CARE_H: esc('Looking after the place'), CARE: p(paras('Looking after the place')[0]),
  WHY_H: esc('Why Sandhya'), W1: p(W[0], 'big'), W2: p(W[1]),
  BREAKFAST: esc(D[4]), RATES: esc(R[4]), RATE_LINES: ratingLine, CLOSING: esc(c.closing),
  ADDRESS: esc(c.contact.address), HOURS: esc(c.hoursNote), PHONE_PRINTED: phonePrinted, EMAIL_TEXT: esc(c.contact.email),
};
const page = readFileSync(join(here, 'page.html'), 'utf8').replace(/\{\{(\w+)\}\}/g, (m, k) => {
  if (!(k in vars)) throw new Error(`no value for ${m}`);
  return vars[k];
});
writeFileSync(join(here, '../dist/index.html'), page);
console.log(`dist/index.html ${(page.length / 1024).toFixed(1)} KB`);
