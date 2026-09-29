// Builds dist/index.html and dist/book/index.html for mockup "try-your-week" from the audited copy
// (sites/global-surf-adventures/copy/en.json) and dossier alt texts. Every visible business string
// is read from en.json; nothing is retyped here except interface glue (step numbers, arrows).
//   node sites/global-surf-adventures/mockups/try-your-week/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildBook } from './book-part.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../../../..');
const site = path.join(repo, 'sites/global-surf-adventures');
const dist = path.join(here, '../dist');
const C = JSON.parse(fs.readFileSync(path.join(site, 'copy/en.json'), 'utf8'));
const D = JSON.parse(fs.readFileSync(path.join(repo, 'dossier/global-surf-adventures/dossier.json'), 'utf8'));
const X = C.mockup_extras;
const read = (f) => fs.readFileSync(path.join(here, f), 'utf8');
const css = read('common.css'), js = read('common.js');
const sprite = () => read('sprite.svg').replace('</svg>', logoSym + '</svg>');
const rosa = JSON.parse(read('rosa-south-point.json'));

const logoSrc = fs.readFileSync(path.join(repo, 'dossier/global-surf-adventures/assets/logo-001.svg'), 'utf8')
  .replace(/<\?xml[^>]*>/, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/g, '')
  .replace(/fill="#000000"/g, 'fill="currentColor"');
const logoSym = logoSrc.replace(/<svg[^>]*>/, '<symbol id="logo" viewBox="0 0 128 39">').replace(/<\/svg>\s*$/, '</symbol>');
const logo = '<svg width="128" height="39" viewBox="0 0 128 39" aria-hidden="true" focusable="false"><use href="#logo"/></svg>';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const paras = (s) => s.split(/\n\n/).map((p) => `<p>${esc(p)}</p>`).join('');
const block = (h) => C.copyBlocks.find((b) => b.heading === h);
const alt = Object.fromEntries(D.images.map((i) => [i.id, i.description || i.shows || '']));
const ic = (id, cls = 'i') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const wa = C.bookingLinks.find((b) => b.url.includes('wa.me')).url;
const bl = (label) => C.bookingLinks.find((b) => b.label === label).url;
const rating = C.ratings[0];

// photos: dist/img/img-XXX-{800,1400}.webp (portraits 800/1333; 016 also 2000)
const W = { '010': [800, 1333, 2000], '024': [800, 1333, 2000], '026': [800, 1400, 786], '060': [800, 1400, 785], '061': [800, 1400, 785] };
function img(id, { sizes = '100vw', lazy = true, cls = '', big = false, R = '' } = {}) {
  const [a, b, h] = W[id] || [800, 1400, 933];
  const extra = big && id === '016' ? `, ${R}img/img-016-2000.webp 2000w` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="${R}img/img-${id}-${b}.webp" srcset="${R}img/img-${id}-${a}.webp ${a}w, ${R}img/img-${id}-${b}.webp ${b}w${extra}" sizes="${sizes}" width="${b}" height="${h}" alt="${esc(alt['img-' + id] || '')}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
}
function slides(ids, label, { sizes, R = '', cls = '' } = {}) {
  return `<div class="slides ${cls}" data-label="${esc(label)}" tabindex="-1">
  <div class="vp"><div class="track">${ids.map((id, k) => `<div>${img(id, { sizes, R, lazy: k > 0 })}</div>`).join('')}</div></div>
  <button type="button" class="arrow prev" aria-label="Previous photo">${ic('left')}</button>
  <button type="button" class="arrow next" aria-label="Next photo">${ic('right')}</button>
  <div class="dots"></div></div>`;
}

// ---------- levels ----------
const LV = [
  { n: 1, slug: 'level-1-fomies', id: '877aef3d-86ed-4b60-8932-03e49c613af8', vid: 'vid-010c', name: 'Fomies', inc: X.inclusions.level_1,
    aria: 'A beginner stands up on a soft-top in the golden evening light' },
  { n: 2, slug: 'level-2-rollers', id: '4b58b491-24fc-4fb8-a40d-2705df961db4', vid: 'vid-003e', name: 'Rollers', inc: X.inclusions.level_2,
    aria: 'A surfer in a blue rash vest rides a reef wave' },
  { n: 3, slug: 'level-3-riders', id: '54ec3447-2efb-4677-8685-f272e00d32e8', vid: 'vid-002e', name: 'Riders', inc: X.inclusions.level_3,
    aria: 'A surfer rides deep in a right-hand barrel' },
];
LV.forEach((l, k) => { l.label = C.lessons[k].label; l.one = X.levels[k].one_liner; l.cta = X.ctas['level_' + l.n]; });
const DT = { 'vid-010c': 'd1600', 'vid-003e': 'd1920', 'vid-002e': 'd1920' };
const vidEl = (l, R, cls = '') => `<div class="lv-clip ${cls}"><img class="vposter" src="${R}video/${l.vid}-poster.webp" alt="${esc(l.aria)}" loading="lazy" width="1280" height="720">
  <video class="lv-vid" hidden muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true">
  <source data-src="${R}video/${l.vid}-m1280.webm" data-media="(max-width: 900px)" type="video/webm">
  <source data-src="${R}video/${l.vid}-m1280.mp4" data-media="(max-width: 900px)" type="video/mp4">
  <source data-src="${R}video/${l.vid}-${DT[l.vid]}.webm" data-media="(min-width: 901px)" type="video/webm">
  <source data-src="${R}video/${l.vid}-${DT[l.vid]}.mp4" data-media="(min-width: 901px)" type="video/mp4"></video></div>`;
const incList = (l) => `<ul class="ilist">${l.inc.map((x) => `<li>${ic(x.icon)}<span>${esc(x.text)}</span></li>`).join('')}</ul>`;
const tabsLv = (idp) => `<div class="pills" role="tablist" aria-label="Surf level">${LV.map((l, k) =>
  `<button type="button" role="tab" id="${idp}tab-${l.n}" aria-controls="${idp}lv-${l.n}" aria-selected="${k === 0}"><span class="lvn">Level ${l.n}</span> <span class="lvx">${esc(l.name)}</span></button>`).join('')}</div>`;

// ---------- rooms ----------
const RM = X.rooms.map((r, k) => ({ ...r, key: ['dorm', 'twin', 'deluxe'][k], short: ['Dorm', 'Twin', 'Deluxe double'][k],
  gallery: r.gallery.filter((g) => g !== 'img-078').map((g) => g.slice(4)) }));
const roomPrice = (r) => r.supplement.display ? esc(r.supplement.display)
  : `${esc(r.supplement.display_one_guest)}<br>${esc(r.supplement.display_couple)}`;
function roomViewer(R, idp, action) {
  return `<div class="room-box">
  <div class="pills-row"><div class="pills" role="tablist" aria-label="Room type">${RM.map((r, k) =>
    `<button type="button" role="tab" id="${idp}rt-${r.key}" aria-controls="${idp}room-${r.key}" aria-selected="${k === 0}">${r.short}</button>`).join('')}</div></div>
  <div class="room-panels">${RM.map((r) => `
   <div class="room-panel" id="${idp}room-${r.key}" role="tabpanel" aria-labelledby="${idp}rt-${r.key}" data-room="${r.key}" data-title="${esc(r.engine_title)}">
    <div class="room">
     ${slides(r.gallery, r.label + ', photo', { sizes: '(max-width: 900px) 100vw, 680px', R })}
     <div class="room-txt">
      <h3>${esc(r.label)}</h3>
      <p class="line">${esc(r.line)}</p>
      <p class="desc">${esc(r.description)}</p>
      <p class="detail">${esc(r.details)}</p>
      <p class="price" data-price>${roomPrice(r)}</p>
      ${action(r)}
     </div>
    </div>
   </div>`).join('')}
  </div></div>`;
}

// ---------- shared chrome ----------
function header(R, book) {
  const links = [['#levels', 'Levels'], ['#rooms', 'Rooms'], ['#lodge', 'The lodge'], ['#contact', 'Contact']];
  const nav = links.map(([h, t]) => `<a href="${book ? '../' : ''}${h}">${t}</a>`).join('');
  return `<a class="sr" href="#main">Skip to content</a>
<header class="hdr${book ? ' solid always' : ''}"><div class="wrap">
  <a class="logo" href="${book ? '../' : '#top'}" aria-label="${esc(X.logo.home_link_label)}">${logo}</a>
  <nav class="nav" aria-label="Main">${nav}</nav>
  ${book ? `<a class="btn btn-soft btn-sm hdr-wa" href="${wa}">${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp)}</a>`
         : `<a class="btn btn-book" href="${R}book/">${esc(X.ctas.header_and_bar)}</a>`}
  ${book ? '' : `<a class="btn btn-book btn-sm mbook" href="${R}book/">${esc(X.ctas.header_and_bar)}</a>`}
  <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="menu">${ic('menu')}</button>
</div></header>
<div class="sheet" id="menu" aria-hidden="true" role="dialog" aria-label="Menu">
  <div class="sheet-top"><span class="logo" style="color:var(--ink)">${logo}</span><button class="close menu-btn" style="display:block" type="button" aria-label="Close menu">${ic('close')}</button></div>
  <nav aria-label="Menu">${nav}</nav>
  <div class="btn-row" style="flex-direction:column">
    <a class="btn btn-book" href="${R}book/">${esc(X.ctas.header_and_bar)}</a>
    <a class="btn btn-soft" href="${wa}">${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp)}</a>
  </div>
</div>`;
}
function footer(R) {
  const s = X.socials, info = block('Getting here');
  return `<footer class="foot" id="contact"><div class="wrap">
  <div class="foot-grid">
    <div class="fbrand">
      <a class="logo" href="${R || '#top'}" aria-label="${esc(X.logo.home_link_label)}">${logo}</a>
      <p>${esc(C.tagline)}</p>
      <div class="social">
        <a href="${s.instagram}" aria-label="Instagram">${ic('ig')}</a>
        <a href="${s.youtube}" aria-label="YouTube">${ic('yt')}</a>
        <a href="${s.facebook}" aria-label="Facebook">${ic('fb')}</a>
      </div>
    </div>
    <div class="stack">
      <a class="btn btn-white" href="${wa}" data-wa>${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp_footer)}</a>
      <a class="btn btn-white" href="tel:${C.contact.phone}">${ic('phone')}${esc(X.ctas.call)}</a>
      <a class="btn btn-white" href="mailto:${C.contact.email}">${ic('mail')}${esc(X.ctas.email)}</a>
    </div>
    <div>
      <h3>${esc(X.section_titles.getting_here)}</h3>
      <p><b>${esc(C.contact.address)}</b></p>
      <p>${esc(info.body)}</p>
      <p>${esc(X.detail_lines.stay)}</p>
      <a class="btn btn-white" href="${esc(C.contact.mapUrl)}">${ic('pin')}${esc(X.ctas.map)}</a>
    </div>
  </div>
  <div class="legal"><span>© ${esc(C.businessName)}</span><span>${esc(X.detail_lines.welcome)}</span></div>
</div></footer>`;
}
const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400..700&family=Water+Brush&display=swap" rel="stylesheet">`;
const page = (R, title, desc, pageCss, body, pageJs) => `<!doctype html>
<html lang="en" class="no-js"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#ffffff">
${fonts}
<style>${css}${pageCss}</style></head>
<body>${sprite()}
${body}
<script>${js}</script>
<script>${pageJs}</script>
</body></html>`;

// ================= HOME =================
const intro = block('Next set is yours'), day = block('Surf, breakfast, surf again'), twelve = block('Twelve rooms, one big family');
const [tw1, tw2] = twelve.body.split('\n\n');
const cur = rosa.current, sw = cur.swells.find((s) => s.in_window);
const compass = (deg) => ['north', 'north-northeast', 'northeast', 'east-northeast', 'east', 'east-southeast', 'southeast', 'south-southeast', 'south', 'south-southwest', 'southwest', 'west-southwest', 'west', 'west-northwest', 'northwest', 'north-northwest'][Math.round(deg / 22.5) % 16];
const t = new Date(cur.t);
const when = cur.t.slice(8, 10).replace(/^0/, '') + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+cur.t.slice(5, 7) - 1] + ', ' + cur.t.slice(11, 16);
const AM = { 'Outdoor swimming pool': 'pool', 'Yoga chalet': 'yoga', 'Yoga, meditation and sound healing sessions': 'sound', 'Ice baths': 'ice', 'Lookout terrace': 'wave',
  'Restaurant': 'food', 'Bar': 'bar', 'Gluten-free and vegan options': 'leaf', 'Co-working space': 'laptop', 'Free WiFi': 'wifi', 'Airport shuttle': 'plane',
  'Free private parking on site': 'park', 'Non-smoking rooms': 'nosmoke', 'Garden': 'palm', 'Sun terrace': 'lounger' };
const srcLabel = (q) => q.source === 'booking' ? ['Booking.com', rating.url] : ['globalsurf.com', D.reviews.quotes.find((x) => x.author === q.author)?.source_url];
const igTiles = ['001', '024', '060', '099', '114', '010', '073', '012'];

const homeCss = `
.hero{position:relative;height:100svh;min-height:560px;overflow:hidden;color:#fff;display:grid;place-items:center;text-align:center;background:#8fb7c4}
.hero picture{position:absolute;inset:0}
.hero .poster,.hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:"";position:absolute;inset:0;z-index:1;background:radial-gradient(ellipse 46% 34% at 50% 52%,rgba(8,20,28,.30),rgba(8,20,28,0) 100%);pointer-events:none}
.hero-in{position:relative;z-index:2;padding:0 var(--gut);text-shadow:0 2px 24px rgba(0,0,0,.4),0 1px 3px rgba(0,0,0,.25)}
.hero h1{font-family:var(--serif);font-weight:600;font-size:clamp(40px,5vw,66px);line-height:1.05;letter-spacing:-.025em;margin:0}
.hero p{font-size:clamp(18px,1.5vw,21px);margin:12px 0 30px;font-weight:500}
.hero .btn{text-shadow:none;min-width:220px;box-shadow:0 8px 28px rgba(0,0,0,.18)}
.stage-wrap{max-width:960px;margin:0 auto}
.lv-panels{display:grid}
.lv-panel{grid-area:1/1;transition:opacity .4s var(--ease),visibility .4s}
.js .lv-panel[aria-hidden="true"]{opacity:0;visibility:hidden}
.no-js .lv-panels{display:block}.no-js .lv-panel{margin-bottom:56px}
.lv-media{position:relative;aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;background:#dfe3e6;touch-action:pan-y}
.lv-clip,.lv-clip img,.lv-clip video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.lv-info{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:center;padding:28px 4px 0}
.lv-info h3{font-family:var(--serif);font-weight:600;font-size:24px;margin:0 0 2px;letter-spacing:-.015em}
.lv-info p{margin:0;color:var(--ink-2)}
.lv-info .detail{font-size:16.5px;white-space:nowrap}
.incl{padding:28px 4px 4px}
.incl[hidden]{display:none}
.incl .note{margin:22px 0 0;font-size:16px;color:var(--ink-2)}
.incl-toggle svg{transition:transform .3s}
.incl-toggle[aria-expanded="true"] svg{transform:rotate(180deg)}
.lv-dots{display:none}
.lv-foot{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;margin-top:40px;padding:22px 28px;border-radius:var(--r);background:var(--tint-soft)}
.lv-foot b{font-weight:600}
.lv-foot p{margin:0}
.trust{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:28px;font-size:16px;color:var(--ink-2)}
.trust .stars{display:flex;color:var(--place)}.trust .stars svg{width:16px;height:16px;fill:currentColor;stroke:none}
.trust b{color:var(--ink)}
.two{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,88px);align-items:center}
.two .copy p{color:var(--ink-2)}
.feature{position:relative;height:min(86vh,820px);min-height:480px;display:grid;place-items:center;overflow:hidden;color:#fff;text-align:center}
.feature img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.feature::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 50% 40% at 50% 50%,rgba(8,20,28,.32),rgba(8,20,28,0) 100%);pointer-events:none}
.closing::after{content:"";position:absolute;inset:0;background:rgba(6,16,22,.52);pointer-events:none}
.feature p,.closing .in{z-index:2}
.feature p{position:relative;font-family:var(--script);font-size:clamp(44px,5.4vw,76px);line-height:1.05;max-width:900px;margin:0;padding:0 var(--gut);text-shadow:0 2px 26px rgba(0,0,0,.45)}
.lodge-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(32px,5vw,72px);align-items:center}
.am{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:14px 28px}
.am li{display:flex;gap:12px;align-items:flex-start;font-size:16.5px;line-height:1.35}
.am svg{color:var(--place)}
.am small{display:block;color:var(--ink-2);font-size:14.5px}
.rate{display:flex;align-items:center;justify-content:center;gap:18px;margin:-6px 0 36px;flex-wrap:wrap;text-align:left}
.rate .big{font-size:64px;line-height:1;font-weight:600;letter-spacing:-.03em}
.rate p{margin:0;color:var(--ink-2);font-size:16.5px}
.rate p b{color:var(--ink)}
.quotes{--per:3}
.quotes .vp{background:none;border-radius:0;margin:0 -12px}
.quotes .track>*{flex-basis:calc(100% / var(--per));padding:0 12px}
.qnav{display:none;justify-content:center;gap:12px;margin-top:18px}
.qnav .btn{width:52px;padding:0}
@media (max-width:640px){.quotes .dots{display:none}.js .qnav{display:flex}}
.q{height:100%;background:var(--tint-soft);border-radius:var(--r);padding:32px 30px;display:flex;flex-direction:column;margin:0}
.q blockquote{margin:0 0 18px;font-size:17.5px;line-height:1.6;flex:1}
.q blockquote::before{content:"\\201C";display:block;font-family:var(--script);font-size:54px;line-height:.6;color:var(--place);margin-bottom:10px}
.q figcaption{font-size:15.5px;color:var(--ink-2)}
.q figcaption a{display:inline-flex;align-items:center;min-height:44px;color:var(--place);font-weight:600}
.q figcaption b{color:var(--ink);font-weight:600;display:block;font-size:16.5px}
.waves{display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:clamp(32px,6vw,96px);align-items:center}
.now{display:flex;align-items:baseline;gap:14px;margin:26px 0 6px}
.now .h{font-size:clamp(46px,5.5vw,60px);line-height:1;font-weight:600;letter-spacing:-.03em;white-space:nowrap}
.now span{color:var(--ink-2)}
.cond{list-style:none;padding:0;margin:18px 0 22px;display:grid;gap:10px}
.cond li{display:flex;gap:12px;align-items:center}
.cond svg{color:var(--place)}
.credit{font-size:15px;color:var(--ink-2)}
.credit a{color:var(--ink);font-weight:600}
.rosa-box{position:relative;width:100%;max-width:420px;height:500px;border-radius:16px;background:#fff;display:grid;place-items:center;overflow:hidden;justify-self:end}
.rosa-box iframe{width:100%;height:500px;border:0;display:block}
.ig-row{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px}
.ig-row::-webkit-scrollbar{display:none}
.ig-row a{flex:0 0 calc((100% - 4*16px)/4.4);scroll-snap-align:start;border-radius:14px;overflow:hidden}
.ig-row img{width:100%;height:auto;aspect-ratio:1;object-fit:cover;transition:transform .5s var(--ease)}
.ig-row a:hover img{transform:scale(1.04)}
.ig-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap}
.closing{position:relative;min-height:74vh;display:grid;place-items:center;text-align:center;color:#fff;overflow:hidden}
.closing img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.closing .in{position:relative;z-index:2;padding:80px var(--gut);max-width:760px}
.closing p{font-size:clamp(22px,2.4vw,30px);line-height:1.35;font-weight:500;margin:0 auto 30px;max-width:620px}
@media (max-width:900px){
  .lv-info{grid-template-columns:1fr;gap:14px;padding-top:20px}
  .lv-info .btn-row .btn{flex:1}
  .two,.lodge-grid,.waves{grid-template-columns:1fr}
  .quotes{--per:1}
  .rosa-box{justify-self:center}
  .ig-row a{flex-basis:calc((100% - 16px)/2.3)}
}
@media (max-width:700px){
  .am{grid-template-columns:1fr}
  .hero .btn{width:100%;max-width:340px}
  .lv-foot{padding:20px}
  .lv-foot .btn{width:100%}
  .lv-info .detail{white-space:normal}
  .feature{height:auto;aspect-ratio:4/5;min-height:0}
  .feature img{object-position:40% 50%}
}
@media (min-width:701px){.lvx::before{content:""}}
`;

const home = page('', `${C.businessName} | Surf weeks for all levels`, C.tagline, homeCss, `
${header('', false)}
<main id="main">
<section class="hero" id="top" aria-label="${esc(C.businessName)}">
  <picture><source srcset="video/vid-009e-poster.avif" type="image/avif"><img class="poster" src="video/vid-009e-poster.jpg" alt="" fetchpriority="high" width="1920" height="1080"></picture>
  <video id="heroVid" hidden muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true">
    <source data-src="video/vid-009e-m1280.webm" data-media="(max-width: 900px)" type="video/webm">
    <source data-src="video/vid-009e-m1280.mp4" data-media="(max-width: 900px)" type="video/mp4">
    <source data-src="video/vid-009e-d1920.webm" data-media="(min-width: 901px)" type="video/webm">
    <source data-src="video/vid-009e-d1920.mp4" data-media="(min-width: 901px)" type="video/mp4">
  </video>
  <div class="hero-in">
    <h1>${esc(X.hero.title_c2)}</h1>
    <p>${esc(X.hero.subtitle)}</p>
    <a class="btn btn-book" href="book/">${esc(X.ctas.hero_c2)}</a>
  </div>
</section>

<section class="sec" id="levels" aria-labelledby="lv-title">
 <div class="wrap">
  <div class="sec-head">
    <h2 class="title c" id="lv-title">${esc(X.section_titles.levels)}</h2>
    <div class="lede c">${paras(intro.body)}</div>
  </div>
  <div class="stage-wrap" id="stage">
   <div class="pills-row">${tabsLv('')}</div>
   <div class="lv-panels">${LV.map((l, k) => `
    <div class="lv-panel" id="lv-${l.n}" role="tabpanel" aria-labelledby="tab-${l.n}" aria-hidden="${k ? 'true' : 'false'}" data-slug="${l.slug}">
      <div class="lv-media">${vidEl(l, '')}</div>
      <div class="lv-info">
        <div><h3>${esc(l.label)}</h3><p>${esc(l.one)}</p><p class="detail" style="margin-top:6px">${esc(X.detail_lines.level_price).replace('$1,466', '<b>$1,466</b>')} | Saturday check-in</p></div>
        <div class="btn-row">
          <a class="btn btn-book" href="book/?level=${l.n}">${esc(l.cta)}</a>
          <button type="button" class="btn btn-soft incl-toggle" aria-expanded="false" aria-controls="incl-${l.n}">${esc(X.ctas.inclusions_toggle)} ${ic('down')}</button>
        </div>
      </div>
      <div class="incl" id="incl-${l.n}" hidden>${incList(l)}<p class="note">${esc(X.inclusions.optional_extra)}</p></div>
    </div>`).join('')}
   </div>
   <div class="lv-foot">
     <p><b>${esc(X.detail_lines.freestylers)}</b><br><span class="detail">${esc(X.levels[3].one_liner)}</span></p>
     <a class="btn btn-white" href="${wa}">${ic('wa', 'i f wa')}${esc(X.ctas.freestylers)}</a>
   </div>
   <p class="trust"><span><b>${rating.score}</b> ${esc(X.detail_lines.trust.replace(/^8\.6 /, ''))}</span></p>
  </div>
 </div>
</section>

<section class="sec tint on-tint" id="week" aria-labelledby="wk-title">
 <div class="wrap two">
  <div class="copy"><h2 class="title" id="wk-title">${esc(day.heading)}</h2>${paras(day.body)}</div>
  ${slides(['104', '011', '118', '115', '111', '023'], 'Photo of the week', { sizes: '(max-width: 900px) 100vw, 640px' })}
 </div>
</section>

<section class="sec" id="rooms" aria-labelledby="rm-title">
 <div class="wrap">
  <div class="sec-head"><h2 class="title c" id="rm-title">${esc(X.section_titles.rooms)}</h2><p class="lede c">${esc(tw1)}</p></div>
  ${roomViewer('', '', (r) => `<a class="btn btn-book" href="book/?room=${r.key}">${esc(X.ctas.room)}</a>`)}
  <p class="detail" style="text-align:center;margin-top:36px">${esc(X.rooms_note)}</p>
 </div>
</section>

<section class="feature" aria-label="${esc(C.featureLine)}">
  ${img('016', { sizes: '100vw', big: true })}
  <p>${esc(C.featureLine)}</p>
</section>

<section class="sec tint on-tint" id="lodge" aria-labelledby="lo-title">
 <div class="wrap">
  <div class="sec-head"><h2 class="title c" id="lo-title">${esc(X.section_titles.lodge)}</h2><p class="lede c">${esc(tw2)}</p></div>
  <div class="lodge-grid">
    ${slides(['005', '075', '077', '026', '061', '093'], 'Photo of the lodge', { sizes: '(max-width: 900px) 100vw, 640px' })}
    <ul class="am">${C.amenities.map((a) => `<li>${ic(AM[a.label] || 'check')}<span>${esc(a.label)}${a.note ? `<small>${esc(a.note)}</small>` : ''}</span></li>`).join('')}</ul>
  </div>
 </div>
</section>

<section class="sec" id="guests" aria-labelledby="gu-title">
 <div class="wrap">
  <h2 class="title c" id="gu-title">${esc(X.section_titles.guests)}</h2>
  <div class="rate"><span class="big">${rating.score}</span><p><b>${esc(X.detail_lines.trust.replace(/^8\.6 /, ''))}</b><br>${esc(X.detail_lines.rating_categories)}</p></div>
  <div class="slides quotes" data-label="Reviews, page">
    <div class="vp"><div class="track">${C.testimonials.map((q) => { const [s, u] = srcLabel(q); return `
      <div><figure class="q"><blockquote>${esc(q.quote)}</blockquote><figcaption><b>${esc(q.author)}</b><a href="${esc(u)}">${s}</a></figcaption></figure></div>`; }).join('')}
    </div></div>
    <div class="dots"></div>
    <div class="qnav"><button type="button" class="prev btn btn-soft" aria-label="Previous review">${ic('left')}</button><button type="button" class="next btn btn-soft" aria-label="Next review">${ic('right')}</button></div>
  </div>
 </div>
</section>

<section class="sec tint on-tint" id="waves" aria-labelledby="wa-title">
 <div class="wrap waves">
  <div>
    <h2 class="title" id="wa-title">${esc(X.section_titles.waves)}</h2>
    <p class="lede">${esc(C.spot)}</p>
    <div class="now"><span class="h">${cur.h[0]}–${cur.h[1]} m</span><span>${esc(cur.phrase)}</span></div>
    <p class="detail">South Point | ${when} local time</p>
    <ul class="cond">
      <li>${ic('wave')}<span>Swell ${sw.period} s from the ${compass(sw.dir)}</span></li>
      <li>${ic('wind')}<span>Wind ${Math.round(cur.wind.kph)} km/h, ${cur.wind.class}</span></li>
    </ul>
    <a class="btn btn-white" href="https://rosa.surf/spot/south-point">Forecast for South Point by Rosa</a>
  </div>
  <div class="rosa-box" id="rosa" data-src="https://rosa.surf/widget/?spot=south-point&amp;theme=light&amp;units=metric">
    <a class="btn btn-white" href="https://rosa.surf/spot/south-point">See today's forecast for South Point on Rosa</a>
  </div>
 </div>
</section>

<section class="sec" id="instagram" aria-labelledby="ig-title">
 <div class="wrap">
  <div class="ig-head sec-head">
    <div><h2 class="title" id="ig-title">${esc(X.section_titles.instagram)}</h2><p class="lede" style="margin:0">${esc(X.instagram.line)}</p></div>
    <a class="btn btn-ink" href="${X.instagram.url}">${ic('ig')}${esc(X.ctas.instagram)}</a>
  </div>
  <div class="ig-row" id="igRow">${igTiles.map((id) => `<a href="${X.instagram.url}" aria-label="${esc(X.instagram.tile_link_label)}">${img(id, { sizes: '(max-width: 900px) 45vw, 260px' })}</a>`).join('')}</div>
  <div class="dots" id="igDots"></div>
 </div>
</section>

<section class="closing" aria-label="${esc(X.ctas.closing)}">
  ${img('093', { sizes: '100vw' })}
  <div class="in"><p>${esc(C.closing)}</p>
    <div class="btn-row c"><a class="btn btn-book" href="book/">${esc(X.ctas.closing)}</a><a class="btn btn-white" href="${wa}">${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp)}</a></div>
  </div>
</section>
</main>
${footer('')}
<div class="mbar" id="mbar" aria-hidden="true"><p class="sum" style="margin:0"><b>${esc(X.detail_lines.level_price.split(' | ')[0])}</b>${esc(X.detail_lines.level_price.split(' | ')[1])} | Saturday check-in</p><a class="btn btn-book" href="book/" tabindex="-1">${esc(X.ctas.header_and_bar)}</a></div>
`, `
(function(){var d=document,GS=window.GS;
/* hero: video after first paint */
addEventListener('load',function(){requestAnimationFrame(function(){setTimeout(function(){var v=d.getElementById('heroVid');if(GS.attach(v)){v.addEventListener('playing',function(){d.querySelector('.hero .poster').style.opacity=0;},{once:true});}},150);});});
/* header + bar */
var hdr=d.querySelector('.hdr'),bar=d.getElementById('mbar');
new IntersectionObserver(function(e){var past=!e[0].isIntersecting;hdr.classList.toggle('solid',past);bar.classList.toggle('show',past);bar.setAttribute('aria-hidden',!past);bar.querySelector('a').tabIndex=past?0:-1;},{rootMargin:'-80px 0px 0px 0px'}).observe(d.querySelector('.hero'));
/* stage */
var stage=d.getElementById('stage'),panels=[].slice.call(stage.querySelectorAll('.lv-panel')),cur=0,inView=false;
function vids(){return panels.map(function(p){return p.querySelector('video');});}
function sync(){vids().forEach(function(v,k){if(k===cur&&inView){GS.attach(v);}else if(!v.paused){v.pause();}});}
var tabs=GS.tabs(stage.querySelector('[role=tablist]'),function(k){cur=k;panels.forEach(function(p,j){p.setAttribute('aria-hidden',j!==k);p.querySelectorAll('a,button').forEach(function(a){a.tabIndex=j===k?0:-1;});});sync();});
panels.forEach(function(p,j){if(j)p.querySelectorAll('a,button').forEach(function(a){a.tabIndex=-1;});});
new IntersectionObserver(function(e){inView=e[0].isIntersecting;sync();},{threshold:.4}).observe(stage.querySelector('.lv-panels'));
stage.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(){tabs.select(+b.dataset.go);});});
var x0=null,y0=0;stage.querySelectorAll('.lv-media').forEach(function(m){
  m.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;x0=e.clientX;y0=e.clientY;});
  m.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0,dy=e.clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))tabs.select(Math.max(0,Math.min(2,cur+(dx<0?1:-1))));});});
/* inclusions toggle: one state for all three levels */
var toggles=[].slice.call(stage.querySelectorAll('.incl-toggle'));
toggles.forEach(function(b){b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')!=='true';toggles.forEach(function(t){t.setAttribute('aria-expanded',open);d.getElementById(t.getAttribute('aria-controls')).hidden=!open;});});});
/* rooms */
GS.roomViewer(d.getElementById('rooms'));
d.querySelectorAll('#rooms .room-panel').forEach(function(p,k){if(k)p.hidden=true;});
/* instagram dots */
var row=d.getElementById('igRow'),dots=d.getElementById('igDots'),tiles=row.children;
function igPages(){var vis=Math.round(row.clientWidth/tiles[0].offsetWidth);return Math.max(1,Math.ceil((tiles.length-vis)/Math.max(1,Math.floor(vis)))+1);}
function igDraw(){dots.innerHTML='';var n=igPages();for(var k=0;k<n;k++){(function(k){var b=d.createElement('button');b.type='button';b.setAttribute('aria-label','Instagram photos '+(k+1)+' of '+n);b.onclick=function(){row.scrollTo({left:(row.scrollWidth-row.clientWidth)*k/(n-1||1),behavior:GS.RM?'auto':'smooth'});};dots.appendChild(b);})(k);}igMark();}
function igMark(){var n=dots.children.length,max=row.scrollWidth-row.clientWidth,k=max>0?Math.round(row.scrollLeft/max*(n-1)):0;[].forEach.call(dots.children,function(b,j){b.setAttribute('aria-current',j===k);});}
row.addEventListener('scroll',igMark,{passive:true});addEventListener('resize',igDraw);igDraw();
/* Rosa widget: only when the block nears the viewport */
var rb=d.getElementById('rosa');
new IntersectionObserver(function(e,o){if(!e[0].isIntersecting)return;o.disconnect();var f=d.createElement('iframe');f.src=rb.dataset.src.replace(/&amp;/g,'&');f.title='Rosa surf forecast - South Point';f.width='100%';f.height='500';f.loading='lazy';f.referrerPolicy='strict-origin-when-cross-origin';f.setAttribute('sandbox','allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');f.style.cssText='max-width:420px;border:0;border-radius:16px;display:block';rb.appendChild(f);f.style.position='absolute';f.style.inset='0';},{rootMargin:'300px'}).observe(rb);
})();
`);

// ================= BOOK =================
const book = buildBook({ C, X, LV, RM, esc, ic, img, vidEl, incList, tabsLv, roomViewer, header, footer, page, wa });

fs.mkdirSync(path.join(dist, 'book'), { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), home);
fs.writeFileSync(path.join(dist, 'book/index.html'), book);
console.log('built', (home.length / 1024).toFixed(0) + ' KB', (book.length / 1024).toFixed(0) + ' KB');
