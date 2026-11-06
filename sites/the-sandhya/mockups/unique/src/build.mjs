#!/usr/bin/env node
// Builds dist/index.html from sites/the-sandhya/copy/en.json (words verbatim, never retyped),
// src/page.css, src/hour.js and src/page.js. One file, CSS and JS inline, as station 4e asks.
//   node sites/the-sandhya/mockups/unique/src/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const copy = JSON.parse(readFileSync(join(HERE, '../../../copy/en.json'), 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const block = (h) => { const b = copy.copyBlocks.find((x) => x.heading === h); if (!b) throw new Error('no block ' + h); return b; };
const paras = (h) => block(h).body.split('\n\n');
const P = (s) => `<p>${esc(s)}</p>`;

const ENGINE = copy.bookingLinks[0];
const TEL = copy.contact.phone, MAIL = copy.contact.email;
const ICON = {
  call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3.5h2.6l1.5 4.2-1.9 1.5a12 12 0 0 0 6 6l1.5-1.9 4.2 1.5v2.6c0 1.2-1 2.1-2.2 2C10.200 18.900 5.100 13.800 4.600 5.700c-.1-1.200.8-2.200 2-2.200z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.500" width="18" height="13" rx="2"/><path d="m3.500 7 8.500 6 8.500-6"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.300 7-11.500A7 7 0 0 0 5 9.500C5 14.700 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.200" cy="6.800" r=".6" fill="currentColor"/></svg>'
};
const quiet = (href, ic, label, ext) => `<a class="quiet" href="${attr(href)}"${ext ? ' rel="noopener"' : ''}>${ICON[ic]}${label}</a>`;
const contactBtns = (all) => [
  quiet('tel:' + TEL, 'call', 'Call'), quiet('mailto:' + MAIL, 'mail', 'Email'),
  ...(all ? [quiet(copy.contact.mapUrl, 'map', 'Map', 1), quiet(copy.socialLinks[0].url, 'ig', 'Instagram', 1)] : [])
].join('');

// sizes: what the picture is really drawn at. w: the widths make-media.sh writes.
const srcset = (id, ws) => ws.map((w) => `img/${id}-${w}.webp ${Math.min(w, NAT[id][0])}w`).join(', ');
const NAT = { 'img-077': [2000, 1333], 'img-061': [2000, 1334], 'img-062': [2000, 1334], 'img-070': [2000, 1334], 'img-079': [2000, 1333], 'img-043': [2000, 1333], 'img-080': [2000, 1333], 'img-165': [1501, 1000], 'img-167': [1501, 1000], 'img-083': [1280, 854], 'img-042': [2000, 1332], 'img-066': [2000, 1333], 'img-067': [2000, 1333], 'img-074': [2000, 1334], 'img-076': [2000, 1334], 'img-073': [2000, 1333], 'img-071': [2000, 1334], 'img-087': [1920, 1280], 'img-171': [1501, 1000], 'img-172': [1501, 1000], 'img-058': [2000, 1333], 'img-059': [2000, 1333], 'img-055': [2000, 1333], 'img-038': [2000, 1333], 'img-032': [2000, 1333], 'img-113': [1280, 853], 'img-110': [1280, 853], 'img-118': [2000, 1334], 'img-115': [1280, 853], 'img-117': [1920, 980], 'img-138': [1280, 853], 'img-126': [1280, 853], 'img-153': [1500, 853], 'img-034': [1500, 2000], 'img-013': [900, 912], 'img-039': [2000, 1334], 'img-027': [1200, 1200], 'img-154': [1280, 853] };
const pic = (id, ws, sizes, alt, cls = '') => {
  const big = ws[ws.length - 1], nw = Math.min(big, NAT[id][0]), nh = Math.round((nw * NAT[id][1]) / NAT[id][0]);
  return `<img${cls ? ` class="${cls}"` : ''} loading="lazy" decoding="async" src="img/${id}-${big}.webp" srcset="${srcset(id, ws)}" sizes="${sizes}" width="${nw}" height="${nh}" alt="${attr(alt)}">`;
};

const ROOMS = [
  { area: 38, photos: [
    ['img-062', 'White bed on a cowhide rug, a dark daybed and the sea through the glass', .44],
    ['img-077', 'Bed in the foreground, a round table and a tall black-framed mirror, with the pool and parasols through the glass'],
    ['img-061', 'Bed, dark daybed and round table, with sea and a palm through a wall of glass'],
    ['img-070', 'Bed and cowhide rug seen from the glass side, chevron timber wardrobe doors behind'],
    ['img-079', 'Bathroom basin on a timber counter under a mirror lit gold, a glass shower screen beside it'] ] },
  { area: 38, photos: [
    ['img-167', 'Single bed by the glass doors, balcony chairs, palms and sea beyond', .66],
    ['img-043', 'Two beds, a round table with wishbone chairs and a mirror, the sea through the glass'],
    ['img-080', 'Beds and a round table on a woven rug, a palm and the sea through the glass'],
    ['img-165', 'Two single beds on dark rugs beside a chevron timber wardrobe door'],
    ['img-083', 'Round table with two wishbone chairs and a red floor lamp against a sheer curtain'] ] },
  { area: 43, photos: [
    ['img-076', 'White freestanding bath with a timber caddy, the room and the sea beyond it', .34],
    ['img-071', 'The view from the bed: glass doors, one palm, loungers and the sea'],
    ['img-042', 'A timber desk built against the back of the bed, a palm and the sea through the glass'],
    ['img-066', 'Timber desk-headboard and mirror, lawn and water beyond the glass'],
    ['img-067', 'Round table and chairs by the glass, a patio and parasol beyond'],
    ['img-074', 'Bed with a side view through tall glass to patio chairs and palms'],
    ['img-073', 'Bathroom with a freestanding bath, a floor-standing tap and basins'] ] },
  { area: 75, photos: [
    ['img-087', 'Bed, television, grey sofa and a timber desk, with palms and bright sea through the glass', .60],
    ['img-171', 'Bed in the foreground, television and grey sofa, the sea and a palm through the glass'],
    ['img-172', 'Timber desk, chairs, grey sofa and television, the bed beyond them'],
    ['img-058', 'Walk-in wardrobe of timber shelves with a white robe hanging'],
    ['img-059', 'Timber wardrobe with a tall mirror, leading through to a marble bathroom'],
    ['img-055', 'Double basin under a lit mirror, marble walls and a bath beyond'] ] }
];

const roomHtml = copy.rooms.map((r, i) => {
  const d = ROOMS[i], link = copy.bookingLinks[i + 1];
  const sizes = '(max-width:767px) 100vw, 60vw';
  const slides = d.photos.map(([id, alt, f], k) => `<figure class="slide${k ? '' : ' on'}"${f ? ` style="--f:${f}"` : ''}>${pic(id, [800, 1280], sizes, alt)}</figure>`).join('');
  const dots = d.photos.map((_, k) => `<button class="dot${k ? '' : ' on'}" type="button" aria-label="${attr(r.label)}, photograph ${k + 1} of ${d.photos.length}"><i></i></button>`).join('');
  return `<article class="room" style="--area:${d.area}">
  <div class="pane"><div class="strip" tabindex="-1">${slides}</div><div class="dots">${dots}</div></div>
  <button class="grow" type="button" aria-expanded="false"><h3>${esc(r.label)}</h3><span class="plus" aria-hidden="true"></span></button>
  <div class="det">
    <div class="line">${esc(r.beds)} | Sleeps ${r.sleeps}</div>
    <p class="note">${esc(r.note)}</p>
    <a class="btn go" href="${attr(link.url)}">${esc(link.label)}</a>
  </div>
</article>`;
}).join('\n');

const KIT_ICON = ['M3 16.500V11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.500M3 14.500h18M3 18.500v-2M21 18.500v-2M7 9V7h4v2M13 9V7h4v2', 'M6 4h6a3 3 0 0 1 3 3v2M3 12h18M6 12v3a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-3M15 9h.01', 'M8 3c.8 1.500 2 2.500 4 2.500S15.200 4.500 16 3l4 2.500-2 3.500-2-.8V21H8V8.200L6 9 4 5.500z', 'M12 4v16M5 8l14 8M19 8 5 16', 'M6 3v5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V3M9 11v10M15 11v10', 'M3 9.500a14 14 0 0 1 18 0M6 13a9.500 9.500 0 0 1 12 0M9 16.500a4.500 4.500 0 0 1 6 0M12 20h.01', 'M4 5h11v14H6a2 2 0 0 1-2-2zM15 9h5v8a2 2 0 0 1-2 2h-3M7 9h5M7 12.500h5M7 16h3'];
// Paragraph 3 of "The rooms", in its own words and order, as the concept's icon list.
const para3 = paras('The rooms')[2];
const KIT = ['a plush pillow-top mattress with 500 thread count linen', 'a shower big enough for two', 'Spa Ceylon amenities, bathrobes and slippers', 'central air conditioning and a ceiling fan', 'a desk, universal sockets, a hairdryer and a Bluetooth speaker', 'High speed WiFi', 'newspapers and magazines from around the world on PressReader'];
for (const k of KIT) if (!para3.includes(k)) throw new Error('kit item not in the copy: ' + k);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const kitHtml = KIT.map((k, i) => `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${KIT_ICON[i]}"/></svg><span>${esc(cap(k))}</span></li>`).join('');

const rate = (r) => {
  const name = /trip\.com/.test(r.url) ? 'Trip.com' : 'Kayak';
  return { name, big: `<b>${r.score}<small>/${r.scale}</small></b>`, meta: `${name} | ${r.count} reviews | read ${r.capturedAt}`, url: r.url, score: r.score, scale: r.scale, count: r.count, at: r.capturedAt };
};
const rates = copy.ratings.map(rate);
const month = (d) => { const [y, m] = d.split('-'); return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][+m - 1] + ' ' + y; };
const quotes = copy.testimonials.map((t) => `<blockquote>${esc(t.quote)}<footer>${esc(t.author)} | Trip.com | ${month(t.date)}</footer></blockquote>`).join('');

const din = paras('The Dining Room');
const intro = paras('Pause, take a deep breath & exhale. You are home.');
const luxe = paras('Casual Luxe');
const kab = paras('Kabalana and around');
const ex = paras('Exclusive Use');
const why = paras('Why Sandhya');
const look = paras('Looking after the place');
const rm = paras('The rooms');
const simply = luxe[5].match(/^(.*?\.) (We are not international\..*)$/);
if (!simply) throw new Error('Casual Luxe last paragraph changed');
const whyHtml = esc(why[0]).replace('संध्य', '<span class="skt" lang="sa">संध्य</span>');
const price = copy.priceList[0];
const breakfast = din[4], nightly = rm[4];

const amen = copy.amenities.map((a) => `<li>${esc(a.label)}${a.note ? `<small>${esc(a.note)}</small>` : ''}</li>`).join('');

const css = readFileSync(join(HERE, 'page.css'), 'utf8');
const hour = readFileSync(join(HERE, 'hour.js'), 'utf8');
const js = readFileSync(join(HERE, 'page.js'), 'utf8');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(copy.businessName)} | ${esc(copy.tagline)}</title>
<meta name="description" content="${attr(copy.tagline)}">
<meta name="theme-color" content="#E0E8F6">
<script>(function(d){d.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('pin')})(document.documentElement)</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Halant:wght@500&family=Mukta:wght@400;500;600&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Halant:wght@500&family=Mukta:wght@400;500;600&display=swap" rel="stylesheet"></noscript>
<link rel="preload" as="image" href="img/hour-slice.webp" media="(min-width:768px)" fetchpriority="high">
<link rel="preload" as="image" href="img/hour-slice-phone.webp" media="(max-width:767px)" fetchpriority="high">
<style>
${css}</style>
</head>
<body>
<header class="hero" id="top">
  <div class="head">
    <a href="#top" aria-label="${attr(copy.businessName)}"><img src="img/logo-white.webp" width="406" height="106" alt="${attr(copy.businessName)}"></a>
    <nav aria-label="Main"><a href="#rooms">Rooms</a><a href="#dining">Dining</a><a href="#exclusive">Exclusive Use</a></nav>
  </div>
  <span class="pic">
    <picture>
      <source media="(max-width:767px)" srcset="img/hour-slice-phone.webp" width="780" height="1114">
      <img class="poster" src="img/hour-slice.webp" width="1920" height="1080" fetchpriority="high" alt="The Sandhya's long two-storey concrete building seen square-on from the beach, with palms in front and sand below. Across the picture the same building moves from a bright cloudy day at the left to dusk at the right, its curtained windows lit gold.">
    </picture>
    <canvas id="hour" aria-hidden="true"></canvas>
  </span>
  <div class="say">
    <h1>${esc(copy.tagline)}</h1>
    <a class="btn" href="${attr(ENGINE.url)}">${esc(ENGINE.label)}</a>
  </div>
</header>

<div class="page">
<div class="top">
  <a href="#top" aria-label="${attr(copy.businessName)}"><img src="img/logo-white.webp" width="406" height="106" alt="" loading="lazy"></a>
  <nav aria-label="Sections"><a href="#rooms">Rooms</a><a href="#dining">Dining</a><a href="#exclusive">Exclusive Use</a><a class="btn" data-remember href="${attr(ENGINE.url)}"><span class="t">${esc(ENGINE.label)}</span></a></nav>
</div>

<main>
<section id="rooms">
  <div class="rooms-head"><h2>${esc(block('The rooms').heading)}</h2>${P(rm[0])}</div>
  <div class="elev">
${roomHtml}
  </div>
  <div class="kit">
    <p class="lead">${esc(rm[1])}</p>
    <p class="has">Every room has</p>
    <ul>${kitHtml}</ul>
    <p class="after">${esc(rm[3])} ${esc(rm[4])}</p>
    <p class="stay"><b>Check-in from ${esc(copy.stayInfo.checkInFrom)} | Check-out to ${esc(copy.stayInfo.checkOutTo)}</b><br>${esc(copy.stayInfo.note)}</p>
  </div>
</section>

<section class="arrive">
  ${pic('img-038', [1000, 2000], '100vw', 'The road side of the hotel: a long grey concrete wall, tall timber doors standing open at the top of a few wide steps, and a shade tree over the paving', 'wide')}
  <div class="txt">
    <h2>${esc(block('Pause, take a deep breath & exhale. You are home.').heading)}</h2>
    <div class="body">${intro.map(P).join('')}</div>
  </div>
</section>

<section id="dining">
  <div class="din-head"><h2>${esc(block('The Dining Room').heading)}</h2></div>
  <div class="mason">
    <div class="col">
      <figure>${pic('img-113', [800, 1280], '(max-width:767px) 100vw, 50vw', 'A round timber table and two chairs set for breakfast on a stone floor, seen from straight above')}</figure>
      <div class="tx">${P(din[0])}${P(din[1])}</div>
      <figure class="por">${pic('img-115', [800, 1280], '(max-width:767px) 100vw, 50vw', 'Noodles with prawns and green beans on a patterned plate, chopsticks on a woven mat, seen from above')}</figure>
    </div>
    <div class="col b">
      <figure class="por">${pic('img-110', [800, 1280], '(max-width:767px) 100vw, 50vw', 'A stack of pancakes with fruit behind two small white covered dishes')}</figure>
      <figure>${pic('img-118', [800, 1400], '(max-width:767px) 100vw, 50vw', 'A plate of noodles on a patterned plate on a teak table, with a navy napkin and cutlery')}</figure>
      <div class="tx">${P(din[2])}${P(din[3])}${P(din[4])}</div>
    </div>
  </div>
  <div class="din-wide" style="padding-left:0;padding-right:0">${pic('img-117', [1000, 1920], '100vw', 'Yellow rice in a patterned bowl surrounded by small bowls of curry on white marble, seen from above')}</div>
</section>

<section class="house">
  ${pic('img-032', [1000, 2000], '100vw', 'The double-height lounge in low sun: sofa and armchairs on a polished floor, a white stair hung on a fan of steel rods, and a whole wall of glass onto the pool and the sea', 'bleed')}
  <p class="feature">${esc(copy.featureLine)}</p>
  <div class="luxe">
    <h2>${esc(block('Casual Luxe').heading)}</h2>
    <div class="l">${P(luxe[0])}${P(luxe[1])}<p class="wall">${esc(luxe[2])}</p></div>
    <div class="r">${P(luxe[3])}${P(luxe[4])}
      <div class="details">
        <figure>${pic('img-138', [800], '(max-width:767px) 50vw, 24vw', 'A fan of thin steel rods fixed into a pale concrete wall')}</figure>
        <figure>${pic('img-126', [800], '(max-width:767px) 50vw, 24vw', 'Close view of vertical timber slats')}</figure>
      </div>
    </div>
    <p class="simply"><small>${esc(simply[1])}</small>${esc(simply[2])}</p>
  </div>
</section>

<section id="guests">
  <div class="rates">
    ${rates.map((r) => `<a class="rate" href="${attr(r.url)}" rel="noopener">${r.big}<span>${esc(r.meta)}</span></a>`).join('\n    ')}
  </div>
  <div class="quotes">${quotes}</div>
</section>

<section class="kab" id="kabalana">
  <p class="spot">${esc(copy.spot)}</p>
  ${pic('img-153', [800, 1500], '100vw', 'The hotel small in the distance behind palms, across white sand and clear turquoise shallows', 'wide')}
  <div class="grid">
    <div class="left">
      <figure class="tall">${pic('img-034', [700, 1100], '(max-width:767px) 100vw, 46vw', 'A wide raked beach running away along a lawn edge, with a stone bowl and a slate sign carrying the hotel\'s name')}</figure>
      <div class="mapline">
        <a class="printlink" href="${attr(copy.contact.mapUrl)}" rel="noopener" aria-label="Map">${pic('img-013', [900], '(max-width:767px) 320px, 46vw', 'The hotel\'s own hand-drawn map of the south-west coast of Sri Lanka, from the airport and Colombo down past Galle to The Sandhya')}</a>
        ${quiet(copy.contact.mapUrl, 'map', 'Map', 1)}
      </div>
    </div>
    <div class="steps">
      <h2>${esc(block('Kabalana and around').heading)}</h2>
      ${kab.map((t) => `<p class="st">${esc(t)}</p>`).join('\n      ')}
      <div class="serv"><h3>Services</h3><ul>${amen}</ul></div>
    </div>
  </div>
</section>

<section id="exclusive">
  <div class="excl">
    <figure class="ph">${pic('img-039', [800, 1400], '(max-width:767px) 100vw, 62vw', 'The long two-storey block from the beach end: pool decks, parasols and lawn under tall palms and a blue sky')}</figure>
    <div class="tx">
      <h2>${esc(block('Exclusive Use').heading)}</h2>
      ${ex.map(P).join('')}
      <div class="price"><b>US$${price.price.toLocaleString('en-US')}</b><span class="lab">${esc(price.label)}</span><small>${esc(price.note)}</small></div>
      <div class="acts">${contactBtns(false)}</div>
    </div>
    <div class="after-excl"><h3>${esc(block('Looking after the place').heading)}</h3>${look.map(P).join('')}</div>
  </div>
</section>

<section class="piece" aria-hidden="true">
  <div class="stage">
    <div class="frame">
      <picture class="still-slice"><source media="(max-width:767px)" srcset="img/hour-slice-phone.webp"><img src="img/hour-slice.webp" alt="" loading="lazy" decoding="async"></picture>
      <picture class="still-dusk"><source media="(max-width:767px)" srcset="img/hour-dusk-phone.webp"><img src="img/hour-dusk.webp" alt="" loading="lazy" decoding="async"></picture>
    </div>
    <div class="pdots">${'<i class="pd"></i>'.repeat(8)}</div>
  </div>
</section>

<section class="why" id="why">
  <h2>${esc(block('Why Sandhya').heading)}</h2>
  <div class="tx"><p>${whyHtml}</p>${P(why[1])}</div>
  <figure class="p1" data-drift="-26">${pic('img-027', [700, 1200], '(max-width:767px) 90vw, 46vw', 'The concrete building at blue hour against a deep blue sky, curtained balconies glowing gold from inside, chairs in silhouette on the decks')}</figure>
  <figure class="p2" data-drift="18">${pic('img-154', [700, 1280], '(max-width:767px) 78vw, 44vw', 'The hotel at night seen along the beach, palms lit from below and a string of small lights along the sand under a starry sky')}</figure>
</section>

<section class="book" id="book">
  <h2>${esc(copy.tagline)}</h2>
  <p class="spot">${esc(copy.spot)}</p>
  <p class="inc">${esc(breakfast)} ${esc(nightly)}</p>
  <div class="minis">${rates.map((r) => `<a href="${attr(r.url)}" rel="noopener"><b>${r.score}/${r.scale}</b>${esc(r.name)} | ${r.count} reviews | read ${r.at}</a>`).join('')}</div>
  <a class="btn" href="${attr(ENGINE.url)}">${esc(ENGINE.label)}</a>
  <p class="closing">${esc(copy.closing)}</p>
  <div class="acts" style="justify-content:center">${contactBtns(false)}</div>
</section>
</main>

<footer class="foot">
  <a href="#top" aria-label="${attr(copy.businessName)}"><img src="img/logo-white.webp" width="406" height="106" alt="" loading="lazy"></a>
  <address>${esc(copy.contact.address)}<br>${esc(copy.hoursNote)}</address>
  <div class="acts">${contactBtns(true)}</div>
</footer>

<div class="bar">
  <a class="btn" data-remember href="${attr(ENGINE.url)}"><span class="t">${esc(ENGINE.label)}</span></a>
  <a class="call" href="tel:${attr(TEL)}" aria-label="Call">${ICON.call}</a>
</div>
</div>
<script>
${hour}
${js}</script>
</body>
</html>
`;
writeFileSync(join(HERE, '../dist/index.html'), html);
console.log('built', html.length, 'bytes');
