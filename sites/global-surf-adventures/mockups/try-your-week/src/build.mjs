// Builds dist/index.html and dist/book/index.html for mockup "try-your-week" from the audited copy
// (sites/global-surf-adventures/copy/en.json) and dossier alt texts. Every visible business string
// is read from en.json; nothing is retyped here except interface glue (step numbers, arrows).
//   node sites/global-surf-adventures/mockups/try-your-week/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
const vidEl = (l, R, cls = '') => `<video class="lv-vid ${cls}" muted loop playsinline preload="none" disablepictureinpicture poster="${R}video/${l.vid}-poster.webp" aria-label="${esc(l.aria)}">
  <source data-src="${R}video/${l.vid}-m720.mp4" data-media="(max-width: 700px)" type="video/mp4">
  <source data-src="${R}video/${l.vid}-m1280.webm" data-media="(min-width: 701px)" type="video/webm">
  <source data-src="${R}video/${l.vid}-m1280.mp4" data-media="(min-width: 701px)" type="video/mp4"></video>`;
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
    <div>
      <a class="logo" href="${R || '#top'}" aria-label="${esc(X.logo.home_link_label)}">${logo}</a>
      <p>${esc(C.tagline)}</p>
      <div class="stack">
        <a class="btn btn-soft" href="${wa}">${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp_footer)}</a>
        <a class="btn btn-soft" href="tel:${C.contact.phone}">${ic('phone')}${esc(X.ctas.call)}</a>
        <a class="btn btn-soft" href="mailto:${C.contact.email}">${ic('mail')}${esc(X.ctas.email)}</a>
      </div>
    </div>
    <div>
      <h3>${esc(X.section_titles.getting_here)}</h3>
      <p>${esc(C.contact.address)}</p>
      <p>${esc(info.body)}</p>
      <p>${esc(X.detail_lines.stay)}</p>
      <a class="btn btn-soft" href="${esc(C.contact.mapUrl)}">${ic('pin')}${esc(X.ctas.map)}</a>
    </div>
    <div>
      <h3>${esc(X.section_titles.instagram)}</h3>
      <p>${esc(X.instagram.line)}</p>
      <div class="social">
        <a href="${s.instagram}" aria-label="Instagram">${ic('ig')}</a>
        <a href="${s.youtube}" aria-label="YouTube">${ic('yt')}</a>
        <a href="${s.facebook}" aria-label="Facebook">${ic('fb')}</a>
      </div>
    </div>
  </div>
  <div class="legal"><span>© ${esc(C.businessName)}</span><span>${esc(X.detail_lines.welcome)}</span></div>
</div></footer>`;
}
const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mansalva&family=Newsreader:opsz,wght@6..72,300..650&display=swap" rel="stylesheet">`;
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
.hero h1{font-family:var(--serif);font-weight:400;font-size:clamp(40px,5.2vw,68px);line-height:1.05;letter-spacing:-.015em;margin:0;font-variation-settings:"opsz" 72}
.hero p{font-size:clamp(19px,1.6vw,22px);margin:12px 0 32px;font-weight:500}
.hero .btn{text-shadow:none;min-width:220px;box-shadow:0 8px 28px rgba(0,0,0,.18)}
.stage-wrap{max-width:1120px;margin:0 auto}
.lv-panels{display:grid}
.lv-panel{grid-area:1/1;transition:opacity .4s var(--ease),visibility .4s}
.js .lv-panel[aria-hidden="true"]{opacity:0;visibility:hidden}
.no-js .lv-panels{display:block}.no-js .lv-panel{margin-bottom:56px}
.lv-media{position:relative;aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;background:#dfe3e6;touch-action:pan-y}
.lv-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.lv-info{display:grid;grid-template-columns:minmax(0,1.3fr) auto auto;gap:28px;align-items:center;padding:28px 4px 0}
.lv-info h3{font-family:var(--serif);font-weight:500;font-size:28px;margin:0 0 2px;letter-spacing:-.01em}
.lv-info p{margin:0;color:var(--ink-2)}
.lv-info .detail{font-size:17px;white-space:nowrap}
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
.feature::after,.closing::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 50% 40% at 50% 50%,rgba(8,20,28,.32),rgba(8,20,28,0) 100%);pointer-events:none}
.feature p,.closing .in{z-index:2}
.feature p{position:relative;font-size:clamp(28px,3.4vw,46px);line-height:1.15;max-width:760px;margin:0;padding:0 var(--gut);text-shadow:0 2px 26px rgba(0,0,0,.45);font-variation-settings:"opsz" 60}
.lodge-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(32px,5vw,72px);align-items:center}
.am{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:14px 28px}
.am li{display:flex;gap:12px;align-items:flex-start;font-size:16.5px;line-height:1.35}
.am svg{color:var(--place)}
.am small{display:block;color:var(--ink-2);font-size:14.5px}
.rate{display:flex;align-items:center;justify-content:center;gap:18px;margin:-6px 0 36px;flex-wrap:wrap;text-align:left}
.rate .big{font-size:64px;line-height:1;font-weight:400;font-variation-settings:"opsz" 72}
.rate p{margin:0;color:var(--ink-2);font-size:16.5px}
.rate p b{color:var(--ink)}
.quotes{--per:3}
.quotes .vp{background:none;border-radius:0;margin:0 -12px}
.quotes .track>*{flex-basis:calc(100% / var(--per));padding:0 12px}
.q{height:100%;background:var(--tint-soft);border-radius:var(--r);padding:32px 30px;display:flex;flex-direction:column;margin:0}
.q blockquote{margin:0 0 22px;font-size:19px;line-height:1.5;flex:1}
.q blockquote::before{content:"\\201C";display:block;font-family:var(--script);font-size:54px;line-height:.6;color:var(--place);margin-bottom:10px}
.q figcaption{font-size:15.5px;color:var(--ink-2)}
.q figcaption b{color:var(--ink);font-weight:600;display:block;font-size:16.5px}
.waves{display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:clamp(32px,6vw,96px);align-items:center}
.now{display:flex;align-items:baseline;gap:14px;margin:26px 0 6px}
.now .h{font-size:clamp(48px,6vw,64px);line-height:1;font-variation-settings:"opsz" 72;white-space:nowrap}
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
.closing .in{position:relative;padding:80px var(--gut);max-width:820px}
.closing p{font-size:clamp(26px,3vw,40px);line-height:1.2;margin:0 0 32px;text-shadow:0 2px 24px rgba(0,0,0,.5);font-variation-settings:"opsz" 60}
@media (max-width:900px){
  .lv-info{grid-template-columns:1fr;gap:14px;padding-top:20px}
  .lv-info .btn-row .btn{flex:1}
  .two,.lodge-grid,.waves{grid-template-columns:1fr}
  .quotes{--per:1}
  .rosa-box{justify-self:center}
  .ig-row a{flex-basis:calc((100% - 16px)/2.3)}
}
@media (max-width:700px){
  .lv-media{aspect-ratio:4/5}
  .lv-dots{display:flex}
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
  <video id="heroVid" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true">
    <source data-src="video/vid-009e-m1280.webm" data-media="(max-width: 900px)" type="video/webm">
    <source data-src="video/vid-009e-m1280.mp4" data-media="(max-width: 900px)" type="video/mp4">
    <source data-src="video/vid-009e-d1920.webm" data-media="(min-width: 901px)" type="video/webm">
    <source data-src="video/vid-009e-d1920.mp4" data-media="(min-width: 901px)" type="video/mp4">
  </video>
  <div class="hero-in">
    <h1>${esc(X.hero.title_c2)}</h1>
    <p>${esc(X.hero.subtitle)}</p>
    <a class="btn btn-book" href="#levels">${esc(X.ctas.hero_c2)}</a>
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
      <div class="dots lv-dots">${LV.map((m, j) => `<button type="button" data-go="${j}" aria-label="Level ${m.n}" aria-current="${j === k}"></button>`).join('')}</div>
      <div class="lv-info">
        <div><h3>${esc(l.label)}</h3><p>${esc(l.one)}</p></div>
        <p class="detail">${esc(X.detail_lines.level_price).replace('$1,466', '<b>$1,466</b>')} | Saturday check-in</p>
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
    <p class="credit"><a href="https://rosa.surf/spot/south-point">Forecast for South Point by Rosa</a></p>
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
const SNAP = {
  asOf: '29 Sep 2026', base7: 1466,
  saturdays: ['2026-10-03', '2026-10-24', '2026-10-31', '2026-12-19', '2027-01-23', '2027-01-30', '2027-02-13', '2027-02-20', '2027-02-27', '2027-03-06', '2027-03-13', '2027-03-20', '2027-03-27', '2027-04-03'],
  rooms: { dorm: { one: 0, two: 0 }, twin: { one: 140.04, two: 80.025 }, deluxe: { one: 418.46, two: 418.46 } },
};
const B = X.booking;
const fmtDate = (s) => { const dt = new Date(s + 'T12:00:00Z'); return dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); };
const bookCss = `
.desk{padding:104px 0 150px}
.prog{list-style:none;margin:0 auto 36px;padding:0;display:flex;justify-content:center;gap:8px;flex-wrap:wrap}
.prog button{display:flex;align-items:center;gap:10px;min-height:44px;padding:0 18px 0 8px;border-radius:999px;border:0;background:var(--tint-soft);color:var(--ink-2);font-size:16px;cursor:pointer}
.prog .n{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#fff;font-size:14px;font-weight:600}
.prog .n svg{width:16px;height:16px;stroke-width:2.4}
.prog button[aria-current="step"]{background:var(--ink);color:#fff}
.prog button[aria-current="step"] .n{background:rgba(255,255,255,.16);color:#fff}
.prog button.done{color:var(--ink)}
.prog button.done .n{background:var(--place);color:#fff}
.prog button:disabled{cursor:default;opacity:.7}
.step{max-width:1120px;margin:0 auto}
.js .step:not(.on){display:none}
.no-js .step{margin-bottom:96px}
.js .step.in{animation:stepIn .3s var(--ease)}
.js .step.in.back{animation-name:stepBack}
@keyframes stepIn{from{opacity:0;transform:translateX(56px)}to{opacity:1;transform:none}}
@keyframes stepBack{from{opacity:0;transform:translateX(-56px)}to{opacity:1;transform:none}}
.step-h{text-align:center;margin-bottom:26px}
.step-h .count{font-size:15px;color:var(--ink-2);margin:0 0 4px}
.step-h h1,.step-h h2{font-family:var(--script);font-weight:400;font-size:clamp(40px,4.6vw,54px);line-height:1.05;margin:0}
.step-h h1:focus,.step-h h2:focus{outline:none}
.band{position:relative;height:clamp(240px,40vh,440px);border-radius:var(--r);overflow:hidden;background:#dfe3e6}
.band img,.band video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.band .lv-vid{transition:opacity .4s var(--ease)}
.js .band .lv-vid:not(.on){opacity:0}
.no-js .band .lv-vid:not(:first-of-type){display:none}
.lvsum{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,5vw,72px);margin-top:36px}
.lvsum h3{font-family:var(--serif);font-weight:500;font-size:32px;margin:0 0 8px;letter-spacing:-.01em}
.lvsum .one{font-size:20px;margin-bottom:14px}
.lvsum h4{font-family:var(--script);font-weight:400;font-size:34px;margin:0 0 18px}
.lvsum .note{margin:22px 0 0;font-size:16px;color:var(--ink-2)}
.lv-panel[hidden]{display:none}
.no-js .lv-panel{margin-bottom:40px}
.chosen{display:none;align-items:center;gap:8px;color:var(--place);font-weight:600;font-size:16px;margin-top:14px}
.room-panel.picked .chosen{display:flex}
.room .flag{display:none;font-size:15.5px;color:var(--book);font-weight:600;margin:-8px 0 14px}
.room-panel.full .flag{display:block}
.fields{max-width:760px;margin:36px auto 0;display:grid;gap:18px}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.fl{position:relative;min-height:64px;border-radius:12px;background:var(--tint-soft);padding:26px 16px 8px;display:flex;align-items:center;gap:10px;transition:background-color .2s,box-shadow .2s}
.fl:focus-within{background:#fff;box-shadow:0 0 0 2px var(--place)}
.fl>label,.fl>.lab{position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:17px;color:var(--ink-2);pointer-events:none;transition:top .2s var(--ease),font-size .2s var(--ease),transform .2s var(--ease)}
.fl.filled>label,.fl.filled>.lab,.fl:focus-within>label,.fl.up>.lab{top:14px;transform:none;font-size:13.5px;letter-spacing:.01em}
.fl .val{flex:1;font-size:18px;font-weight:500;min-width:0}
.fl input[type=number]{flex:1;min-width:0;border:0;background:none;font:inherit;font-size:18px;font-weight:500;color:var(--ink);padding:0;-moz-appearance:textfield;outline:none}
.fl input::-webkit-inner-spin-button{-webkit-appearance:none}
.fl select{flex:1;border:0;background:none;font:inherit;font-size:18px;color:var(--ink);outline:none;padding:0;appearance:none}
.step-btn{width:40px;height:40px;border-radius:50%;border:0;background:#fff;display:grid;place-items:center;cursor:pointer;color:var(--ink);box-shadow:0 1px 4px rgba(10,25,32,.08)}
.step-btn:disabled{opacity:.35;cursor:default}
.step-btn svg{width:18px;height:18px;stroke-width:2}
.date-btn{position:absolute;inset:0;border:0;background:none;cursor:pointer;border-radius:12px}
.fl .cal-i{margin-left:auto;color:var(--ink-2)}
.help{font-size:15px;color:var(--ink-2);margin:-8px 0 0 4px}
.err{color:var(--book);font-weight:600}
.seg{display:flex;gap:6px;flex:1}
.fl.segf{padding-top:36px;padding-bottom:10px}
.seg label{flex:1;position:relative}
.seg input{position:absolute;opacity:0;inset:0}
.seg span{display:grid;place-items:center;min-height:36px;border-radius:8px;background:#fff;font-size:17px;cursor:pointer;transition:background-color .2s,color .2s}
.seg input:checked+span{background:var(--ink);color:#fff}
.seg input:focus-visible+span{outline:3px solid var(--place);outline-offset:2px}
.cal{position:absolute;z-index:20;left:0;top:calc(100% + 8px);width:min(360px,calc(100vw - 32px));background:#fff;border-radius:16px;box-shadow:0 18px 50px rgba(10,25,32,.18);padding:16px}
.cal[hidden]{display:none}
.cal-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-weight:600}
.cal-top button{width:40px;height:40px;border-radius:50%;border:0;background:var(--tint-soft);display:grid;place-items:center;cursor:pointer}
.cal-top button:disabled{opacity:.3}
.cal table{width:100%;border-collapse:collapse;text-align:center;font-size:15.5px}
.cal th{font-weight:500;color:var(--ink-2);font-size:13.5px;padding:6px 0}
.cal td{padding:2px}
.cal td button{width:40px;height:40px;border-radius:50%;border:0;background:none;color:#9AA1AA;font:inherit}
.cal td button.ok{color:var(--ink);background:rgba(0,130,146,.12);font-weight:600;cursor:pointer}
.cal td button.ok:hover{background:rgba(0,130,146,.24)}
.cal td button[aria-pressed="true"]{background:var(--ink);color:#fff}
.datewrap{position:relative}
.js .nojs-date,.no-js .js-date,.no-js #cal{display:none}
.tot{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,56px);margin-top:36px;align-items:start}
.card{background:var(--tint-soft);border-radius:var(--r);padding:30px}
.card h3{font-family:var(--script);font-weight:400;font-size:32px;margin:0 0 16px}
.rows{margin:0;display:grid;gap:12px}
.rows div{display:flex;justify-content:space-between;gap:18px;align-items:baseline}
.rows dt{color:var(--ink-2)}
.rows dd{margin:0;text-align:right;font-weight:500}
.rows .sum{padding-top:12px;margin-top:4px;font-size:20px}
.rows .sum dt{color:var(--ink);font-weight:600}
.rows .sum dd{font-weight:650;font-size:24px}
.card .small{font-size:15px;color:var(--ink-2);margin:14px 0 0}
.handoff .btn{width:100%}
.handoff p{font-size:16px;color:var(--ink-2);margin:14px 0 0}
.nojs-go{display:grid;gap:10px}
.js .nojs-go{display:none}
.no-js .js-go{display:none}
.bbar{position:fixed;left:0;right:0;bottom:0;z-index:35;background:#fff;box-shadow:0 -8px 30px rgba(10,25,32,.10);padding:12px 0 calc(12px + env(safe-area-inset-bottom))}
.bbar .wrap{display:flex;align-items:center;gap:14px}
.bbar .sum{flex:1;min-width:0;line-height:1.25}
.bbar .sum b{font-size:20px;display:block}
.bbar .sum span{font-size:14.5px;color:var(--ink-2)}
.no-js .bbar{display:none}
.hdr-wa .wa{color:var(--wa)}
@media (max-width:900px){
  .hdr-wa{display:none}
  .lvsum,.tot{grid-template-columns:1fr}
  .desk{padding-top:84px}
  .prog button{padding:0 12px 0 6px;font-size:14.5px}
  .prog .t{display:none}
  .prog button[aria-current="step"] .t{display:inline}
}
@media (max-width:640px){
  .fgrid{grid-template-columns:1fr}
  .band{height:34vh}
  .bbar .btn{padding:0 18px}
  .bbar .back{display:none}
}
`;
const nights = X.booking.nights_options;
const book = page('../', `Book your surf week | ${C.businessName}`, C.tagline, bookCss, `
${header('../', true)}
<main id="main" class="desk">
<form id="bk" method="get" action="https://globalsurfadventures.bookinglayer.com/en/product/level-1-fomies" class="wrap" novalidate>
 <ol class="prog" aria-label="Booking steps">${B.step_pills.map((p, k) => `<li><button type="button" data-step="${k}" ${k ? 'disabled' : 'aria-current="step"'}><span class="n">${k + 1}</span><span class="t">${esc(p)}</span></button></li>`).join('')}</ol>

 <section class="step on" id="s-level" data-hash="level" aria-labelledby="h-level">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 1).replace('{total}', 4)}</p><h1 id="h-level" tabindex="-1">${esc(X.section_titles.book_level)}</h1></div>
  <div class="pills-row">${tabsLv('b')}</div>
  <div class="band">${LV.map((l, k) => vidEl(l, '../', k ? '' : 'on')).join('')}</div>
  ${LV.map((l, k) => `<div class="lv-panel" id="blv-${l.n}" role="tabpanel" aria-labelledby="btab-${l.n}">
   <div class="lvsum">
    <div><h3>${esc(l.label)}</h3><p class="one">${esc(l.one)}</p>
      <p class="detail">${esc(X.detail_lines.level_price).replace('$1,466', '<b>$1,466</b>')}</p>
      <p class="detail">${esc(X.detail_lines.trust)}</p></div>
    <div><h4>${esc(X.section_titles.book_included)}</h4>${incList(l)}<p class="note">${esc(X.inclusions.optional_extra)}</p></div>
   </div></div>`).join('')}
 </section>

 <section class="step" id="s-room" data-hash="room" aria-labelledby="h-room">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 2).replace('{total}', 4)}</p><h2 id="h-room" tabindex="-1">${esc(X.section_titles.book_room)}</h2></div>
  <div id="bookRooms">${roomViewer('../', 'b', (r) => `<p class="flag">${esc(B.room_not_free)}</p><button type="button" class="btn btn-book pick" data-room="${r.key}">${esc(X.ctas.room)}</button><p class="chosen">${ic('check')}${esc(r.label)}</p>`)}</div>
  <p class="detail" style="text-align:center;margin-top:28px">${esc(X.rooms_note)}</p>
 </section>

 <section class="step" id="s-dates" data-hash="dates" aria-labelledby="h-dates">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 3).replace('{total}', 4)}</p><h2 id="h-dates" tabindex="-1">${esc(X.section_titles.book_dates)}</h2></div>
  <div class="band">${img('001', { R: '../', sizes: '(max-width: 1160px) 100vw, 1120px' })}</div>
  <div class="fields">
    <div class="fgrid">${[['female', B.field_women], ['male', B.field_men], ['couple', B.field_couples]].map(([n, l]) => `
      <div class="fl filled"><label for="g-${n}">${esc(l)}</label>
        <input id="g-${n}" name="${n}" type="number" inputmode="numeric" min="0" max="${n === 'couple' ? 3 : 6}" value="${n === 'female' ? 1 : 0}">
        <button type="button" class="step-btn" data-dec="${n}" aria-label="${esc(B.stepper_less)}: ${esc(l)}">${ic('minus')}</button>
        <button type="button" class="step-btn" data-inc="${n}" aria-label="${esc(B.stepper_more)}: ${esc(l)}">${ic('plus')}</button>
      </div>`).join('')}</div>
    <p class="help">${esc(B.guests_help)}</p>
    <div class="datewrap">
      <div class="fl nojs-date filled"><label for="d-start">${esc(B.field_checkin)}</label>
        <select id="d-start" name="start"><option value="">${esc(B.field_checkin_nojs_placeholder)}</option>${SNAP.saturdays.map((s) => `<option value="${s}">${fmtDate(s)}</option>`).join('')}</select>${ic('down', 'i cal-i')}</div>
      <div class="fl js-date" id="dateField"><span class="lab" id="dlab">${esc(B.field_checkin)}</span><span class="val" id="dval"></span>${ic('cal', 'i cal-i')}
        <button type="button" class="date-btn" id="dateBtn" aria-haspopup="dialog" aria-expanded="false" aria-labelledby="dlab dval"></button></div>
      <div class="cal" id="cal" role="dialog" aria-label="${esc(B.field_checkin)}" hidden></div>
    </div>
    <p class="help" id="dhelp">${esc(B.field_checkin_help)}</p>
    <div class="fl up segf" role="radiogroup" aria-labelledby="nlab"><span class="lab" id="nlab">${esc(B.field_nights)}</span>
      <div class="seg">${nights.map((n, k) => `<label><input type="radio" name="duration" value="${+n + 1}" data-nights="${n}"${k ? '' : ' checked'}><span>${n}</span></label>`).join('')}</div></div>
    <input type="hidden" id="d-end" value="">
  </div>
 </section>

 <section class="step" id="s-total" data-hash="total" aria-labelledby="h-total">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 4).replace('{total}', 4)}</p><h2 id="h-total" tabindex="-1">${esc(X.section_titles.book_total)}</h2></div>
  <div class="band">${img('093', { R: '../', sizes: '(max-width: 1160px) 100vw, 1120px' })}</div>
  <div class="tot">
    <div class="card">
      <dl class="rows">
        <div><dt>${esc(B.summary_labels.level)}</dt><dd id="t-level">${esc(LV[0].label)}</dd></div>
        <div><dt>${esc(B.summary_labels.dates)}</dt><dd id="t-dates">–</dd></div>
        <div><dt>${esc(B.summary_labels.guests)}</dt><dd id="t-guests">1</dd></div>
        <div><dt>${esc(B.summary_labels.room)}</dt><dd id="t-room">${esc(RM[0].label)}</dd></div>
      </dl>
      <p class="small err" id="t-roomflag" hidden></p>
    </div>
    <div class="card">
      <dl class="rows">
        <div><dt>${esc(B.total_package)}</dt><dd id="p-base">$1,466</dd></div>
        <div><dt>${esc(B.total_room)}</dt><dd id="p-room">${esc(B.room_included)}</dd></div>
        <div><dt>${esc(B.total_per_person)}</dt><dd id="p-pp">$1,466</dd></div>
        <div class="sum"><dt id="p-all-l">${esc(B.total_all.replace('{n}', 1))}</dt><dd id="p-all">$1,466</dd></div>
      </dl>
      <p class="small" id="p-src">${esc(B.prices_snapshot.replace('{date}', SNAP.asOf))} | ${esc(B.currency_note)}</p>
      <p class="small">${esc(B.deposit)}</p>
    </div>
  </div>
  <div class="handoff" style="max-width:640px;margin:40px auto 0;text-align:center">
    <div class="js-go"><button type="submit" class="btn btn-book">${esc(X.ctas.handoff)}</button></div>
    <div class="nojs-go">${LV.map((l) => `<button type="submit" class="btn btn-book" formaction="https://globalsurfadventures.bookinglayer.com/en/product/${l.slug}">${esc(X.ctas.handoff)}: ${esc(l.label)}</button>`).join('')}</div>
    <p>${esc(B.handoff)} ${esc(B.handoff_nothing_booked)}</p>
    <div class="btn-row c" style="margin-top:18px"><a class="btn btn-soft" href="${wa}">${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp)}</a></div>
  </div>
 </section>
</form>
</main>
${footer('../')}
<div class="bbar" id="bbar"><div class="wrap">
  <p class="sum" style="margin:0"><b id="b-total">$1,466</b><span id="b-sub"></span></p>
  <button type="button" class="btn btn-soft back" id="b-back">${ic('left')}</button>
  <button type="button" class="btn btn-book" id="b-next">${esc(X.ctas.step_next)}</button>
</div></div>
`, `
(function(){var d=document,GS=window.GS;
var LV=${JSON.stringify(LV.map((l) => ({ n: l.n, slug: l.slug, id: l.id, label: l.label })))};
var RMS=${JSON.stringify(RM.map((r) => ({ key: r.key, label: r.label, title: r.engine_title })))};
var SNAP=${JSON.stringify(SNAP)};
var T=${JSON.stringify({ next: X.ctas.step_next, go: X.ctas.handoff, incl: B.room_included, supp: B.room_supplement, notFree: B.room_not_free, onlyOne: B.room_only_one_free, all: B.total_all, snap: B.prices_snapshot, live: B.prices_live, fb: B.prices_fallback, cur: B.currency_note, choose: B.field_checkin_nojs_placeholder, help: B.field_checkin_help })};
var BD='globalsurfadventures.bookinglayer.com',API='https://api.bookinglayer.io/public/';
var q=new URLSearchParams(location.search);
var S={level:Math.max(0,Math.min(2,(+q.get('level')||1)-1)),room:Math.max(0,RMS.findIndex(function(r){return r.key===q.get('room');})),start:'',nights:7,g:{female:1,male:0,couple:0},live:null,choosable:SNAP.saturdays.slice(),step:0,reached:0};
var steps=[].slice.call(d.querySelectorAll('.step')),prog=[].slice.call(d.querySelectorAll('.prog button'));
function money(v){var r=Math.round(v*100)/100;return '$'+r.toLocaleString('en-US',{minimumFractionDigits:r%1?2:0,maximumFractionDigits:2});}
function persons(){return S.g.female+S.g.male+2*S.g.couple;}
function addDays(s,n){var t=new Date(s+'T12:00:00Z');t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10);}
function fmt(s){return new Date(s+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});}
function short(s){return new Date(s+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:'UTC'});}

/* ---- level ---- */
var band=d.querySelector('#s-level .band'),bvids=[].slice.call(band.querySelectorAll('video')),lpanels=[].slice.call(d.querySelectorAll('#s-level .lv-panel'));
function showLevel(k){S.level=k;bvids.forEach(function(v,j){v.classList.toggle('on',j===k);if(j===k&&S.step===0)GS.attach(v);else if(!v.paused)v.pause();});lpanels.forEach(function(p,j){p.hidden=j!==k;});d.getElementById('bk').action='https://globalsurfadventures.bookinglayer.com/en/product/'+LV[k].slug;S.live=null;S.choosable=SNAP.saturdays.slice();render();}
var ltabs=GS.tabs(d.querySelector('#s-level [role=tablist]'),function(k){showLevel(k);if(S.step>=2)refreshLive();});

/* ---- rooms ---- */
var rbox=d.getElementById('bookRooms'),rpanels=[].slice.call(rbox.querySelectorAll('.room-panel'));
var rtabs=GS.roomViewer(rbox);
rpanels.forEach(function(p,k){p.hidden=k!==S.room;});
function markRoom(){rpanels.forEach(function(p,k){p.classList.toggle('picked',k===S.room&&S.reached>1);});}
rbox.querySelectorAll('.pick').forEach(function(b,k){b.addEventListener('click',function(){S.room=k;S.reached=Math.max(S.reached,2);markRoom();render();go(2);});});

/* ---- guests ---- */
['female','male','couple'].forEach(function(n){var inp=d.getElementById('g-'+n);
  function set(v){var max=n==='couple'?3:6;v=Math.max(0,Math.min(max,v|0));var others=persons()-(n==='couple'?2:1)*S.g[n];var per=n==='couple'?2:1;while(v>0&&others+per*v>6)v--;S.g[n]=v;inp.value=v;guestsChanged();}
  d.querySelector('[data-dec='+n+']').addEventListener('click',function(){set(S.g[n]-1);});
  d.querySelector('[data-inc='+n+']').addEventListener('click',function(){set(S.g[n]+1);});
  inp.addEventListener('change',function(){set(+inp.value);});});
var gt;function guestsChanged(){S.live=null;render();clearTimeout(gt);gt=setTimeout(fetchCal,600);}
function stepBtns(){var p=persons();['female','male','couple'].forEach(function(n){d.querySelector('[data-dec='+n+']').disabled=S.g[n]<=0;d.querySelector('[data-inc='+n+']').disabled=p+(n==='couple'?2:1)>6||S.g[n]>=(n==='couple'?3:6);});}

/* ---- nights ---- */
d.querySelectorAll('input[name=duration]').forEach(function(r){r.addEventListener('change',function(){S.nights=+r.dataset.nights;S.live=null;render();refreshLive();});});

/* ---- calendar ---- */
var cal=d.getElementById('cal'),dbtn=d.getElementById('dateBtn'),dfield=d.getElementById('dateField'),month=null;
function ym(s){return s.slice(0,7);}
function drawCal(){var first=month?month:ym(S.start||S.choosable[0]||SNAP.saturdays[0]);month=first;
  var y=+first.slice(0,4),m=+first.slice(5,7)-1,start=new Date(Date.UTC(y,m,1)),dow=(start.getUTCDay()+6)%7,days=new Date(Date.UTC(y,m+1,0)).getUTCDate();
  var months=S.choosable.map(ym),minM=months[0]||first,maxM=months[months.length-1]||first;
  var h='<div class="cal-top"><button type="button" data-m="-1" aria-label="Previous month"'+(first<=minM?' disabled':'')+'><svg class="i"><use href="#i-left"/></svg></button><span>'+start.toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})+'</span><button type="button" data-m="1" aria-label="Next month"'+(first>=maxM?' disabled':'')+'><svg class="i"><use href="#i-right"/></svg></button></div><table role="grid"><thead><tr>'+['Mo','Tu','We','Th','Fr','Sa','Su'].map(function(x){return '<th scope="col">'+x+'</th>';}).join('')+'</tr></thead><tbody><tr>';
  for(var i=0;i<dow;i++)h+='<td></td>';
  for(var dd=1;dd<=days;dd++){var s=first+'-'+String(dd).padStart(2,'0'),ok=S.choosable.indexOf(s)>-1;
    h+='<td><button type="button" '+(ok?'class="ok" data-d="'+s+'" aria-label="'+fmt(s)+'"':'disabled tabindex="-1" aria-hidden="true"')+' aria-pressed="'+(s===S.start)+'">'+dd+'</button></td>';
    if((dow+dd)%7===0&&dd<days)h+='</tr><tr>';}
  cal.innerHTML=h+'</tr></tbody></table>';}
function shiftM(n){var y=+month.slice(0,4),m=+month.slice(5,7)-1+n;var t=new Date(Date.UTC(y,m,1));month=t.toISOString().slice(0,7);drawCal();}
function openCal(){month=null;drawCal();cal.hidden=false;dbtn.setAttribute('aria-expanded','true');dfield.classList.add('up');var b=cal.querySelector('[aria-pressed=true]')||cal.querySelector('.ok');(b||cal.querySelector('button')).focus();}
function closeCal(f){cal.hidden=true;dbtn.setAttribute('aria-expanded','false');if(!S.start)dfield.classList.remove('up');if(f)dbtn.focus();}
dbtn.addEventListener('click',function(){cal.hidden?openCal():closeCal();});
cal.addEventListener('click',function(e){e.stopPropagation();var b=e.target.closest('button');if(!b)return;if(b.dataset.m){shiftM(+b.dataset.m);cal.querySelector('[data-m="'+b.dataset.m+'"]').focus();return;}if(b.dataset.d){S.start=b.dataset.d;S.live=null;d.getElementById('d-start').value=S.start;closeCal(true);render();refreshLive();}});
cal.addEventListener('keydown',function(e){if(e.key==='Escape')closeCal(true);});
d.addEventListener('click',function(e){if(!cal.hidden&&!e.target.closest('.datewrap'))closeCal();});

/* ---- live data, only after the visitor interacts (docs/bookinglayer.md §6) ---- */
function tfetch(u,o){var c=new AbortController();setTimeout(function(){c.abort();},8000);o=o||{};o.signal=c.signal;return fetch(u,o).then(function(r){if(!r.ok)throw r.status;return r.json();});}
function gq(){return '&female='+S.g.female+'&male='+S.g.male+'&couple='+S.g.couple+'&business_domain='+BD;}
function fetchCal(){if(persons()<1)return;var lv=LV[S.level],t=new Date(),e=new Date();e.setUTCFullYear(e.getUTCFullYear()+1);
  tfetch(API+'products/'+lv.id+'/availabilities?format=choosable&show_available_only=1&mode=checkin&start='+t.toISOString().slice(0,10)+'&end='+e.toISOString().slice(0,10)+gq())
  .then(function(j){var ds=j&&j.data&&j.data.dates;if(!ds)throw 'shape';var list=Object.keys(ds).filter(function(k){return ds[k].choosable;}).sort();if(!list.length)throw 'empty';S.choosable=list;if(S.start&&list.indexOf(S.start)<0){S.start='';d.getElementById('dhelp').innerHTML='<span class=err>'+T.choose+'</span>';}render();refreshLive();})
  .catch(function(){});}
var lt;function refreshLive(){clearTimeout(lt);if(!S.start||persons()<1)return;lt=setTimeout(function(){
  var lv=LV[S.level],end=addDays(S.start,S.nights),key=[lv.id,S.start,end,S.g.female,S.g.male,S.g.couple].join();
  var guests=[];for(var i=0;i<persons();i++)guests.push({id:(crypto.randomUUID?crypto.randomUUID():'g'+i+Date.now()),index:i+1});
  Promise.all([tfetch(API+'accommodations/availabilities?product='+lv.id+'&start='+S.start+'&end='+end+'&currency=USD'+gq()),
    tfetch(API+'packages/'+lv.id+'/items?business_domain='+BD,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({start:S.start,end:end,currency:'USD',guests:guests,items:[]})})])
  .then(function(r){var acc=r[0]&&r[0].data,tot=r[1]&&r[1].data&&r[1].data.totals;if(!Array.isArray(acc)||!tot||typeof tot.base!=='number')throw 'shape';
    var rooms={};acc.forEach(function(a){var t=a.translations&&a.translations.en&&a.translations.en.title;if(!t)return;var p=a.price&&a.price.from;if(!(t in rooms)||(p||0)<rooms[t])rooms[t]=p||0;});
    S.live={key:key,base:tot.base,rooms:rooms};S.liveFail=false;render();})
  .catch(function(){S.liveFail=true;render();});},300);}

/* ---- totals ---- */
function calc(){var n=persons(),r=RMS[S.room];
  if(S.live){var free=r.title in S.live.rooms;return{known:true,live:true,free:free,basePP:S.live.base/n,roomPP:free?S.live.rooms[r.title]:null};}
  if(S.nights!==7)return{known:false};
  var sr=SNAP.rooms[r.key];return{known:true,live:false,free:true,basePP:SNAP.base7,roomPP:n>=2?sr.two:sr.one};}
function render(){var n=persons(),c=calc(),lv=LV[S.level],r=RMS[S.room];
  stepBtns();
  var has=!!S.start;dfield.classList.toggle('filled',has);dfield.classList.toggle('up',has||!cal.hidden);d.getElementById('dval').textContent=has?fmt(S.start):'';
  var end=has?addDays(S.start,S.nights):'';d.getElementById('d-end').value=end;
  d.getElementById('t-level').textContent=lv.label;
  d.getElementById('t-dates').textContent=has?fmt(S.start)+' – '+fmt(end):'–';
  var gl=[];if(S.g.female)gl.push(S.g.female+' '+${JSON.stringify(B.field_women)});if(S.g.male)gl.push(S.g.male+' '+${JSON.stringify(B.field_men)});if(S.g.couple)gl.push(S.g.couple+' '+${JSON.stringify(B.field_couples)});
  d.getElementById('t-guests').textContent=gl.join(' | ')||'–';
  d.getElementById('t-room').textContent=r.label;
  /* room availability flags */
  var freeList=S.live?RMS.filter(function(x){return x.title in S.live.rooms;}):RMS;
  rpanels.forEach(function(p,k){p.classList.toggle('full',!!S.live&&!(RMS[k].title in S.live.rooms));
    if(S.live&&RMS[k].title in S.live.rooms){var v=S.live.rooms[RMS[k].title];p.querySelector('[data-price]').textContent=v?T.supp.replace('{amount}',(Math.round(v*100)/100).toLocaleString('en-US')):T.incl;}});
  var flag=d.getElementById('t-roomflag');
  if(S.live&&!c.free){flag.hidden=false;flag.textContent=freeList.length===1?T.onlyOne.replace('{room}',freeList[0].label):T.notFree;}else flag.hidden=true;
  var lbl=T.all.replace('{n}',n);if(n===1)lbl=lbl.replace(/guests$/,'guest');d.getElementById('p-all-l').textContent=lbl;
  if(c.known){var rp=c.roomPP==null?0:c.roomPP,pp=c.basePP+rp;
    d.getElementById('p-base').textContent=money(c.basePP);d.getElementById('p-room').textContent=rp?'+'+money(rp):T.incl;
    d.getElementById('p-pp').textContent=money(pp);d.getElementById('p-all').textContent=money(pp*n);
    d.getElementById('b-total').textContent=(has?'':'From ')+money(pp*n);}
  else{['p-base','p-room','p-pp','p-all'].forEach(function(id){d.getElementById(id).textContent='–';});d.getElementById('b-total').textContent='From '+money(SNAP.base7)+' pp';}
  d.getElementById('p-src').textContent=(c.live?T.live:(S.liveFail?T.fb.replace('{date}',SNAP.asOf):T.snap.replace('{date}',SNAP.asOf)))+' | '+T.cur;
  d.getElementById('b-sub').textContent=lv.label+(n?' | '+lbl:'')+(has?' | '+short(S.start)+'–'+short(end):'');
  var nx=d.getElementById('b-next');nx.textContent=S.step===3?T.go:T.next;
  d.getElementById('b-back').style.visibility=S.step?'visible':'hidden';}

/* ---- steps ---- */
var hashes=['level','room','dates','total'];
function go(k,fromHash){if(k===S.step)return;
  if(k>=3&&!(S.start&&persons()>0)){k=2;}
  var back=k<S.step;S.step=k;S.reached=Math.max(S.reached,k);
  steps.forEach(function(s,j){s.classList.remove('in','back');s.classList.toggle('on',j===k);});
  var s=steps[k];void s.offsetWidth;s.classList.add('in');if(back)s.classList.add('back');
  prog.forEach(function(b,j){b.disabled=j>S.reached;b.classList.toggle('done',j<S.reached&&j!==k);if(j===k)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');b.querySelector('.n').innerHTML=(j<S.reached&&j!==k)?'<svg class="i"><use href="#i-check"/></svg>':String(j+1);});
  bvids.forEach(function(v,j){if(k===0&&j===S.level)GS.attach(v);else if(!v.paused)v.pause();});
  if(k===1)GS.slides(rpanels[S.room].querySelector('.slides'));
  markRoom();render();
  if(!fromHash)history.pushState(null,'','#'+hashes[k]);
  scrollTo({top:0,behavior:GS.RM?'auto':'smooth'});s.querySelector('[tabindex="-1"]').focus({preventScroll:true});}
prog.forEach(function(b,j){b.addEventListener('click',function(){go(j);});});
function next(){if(S.step===1){S.room=rtabs.tabs.findIndex(function(t){return t.getAttribute('aria-selected')==='true';});S.reached=Math.max(S.reached,2);}
  if(S.step===2&&!S.start){d.getElementById('dhelp').innerHTML='<span class=err>'+T.choose+'</span>';openCal();return;}
  if(S.step===3){submit();return;}go(S.step+1);}
d.getElementById('b-next').addEventListener('click',next);
d.getElementById('b-back').addEventListener('click',function(){go(Math.max(0,S.step-1));});
addEventListener('popstate',function(){var k=hashes.indexOf(location.hash.slice(1));go(k<0?0:Math.min(k,S.reached),true);});
function submit(){if(!S.start||persons()<1){go(2);return;}
  var u='https://globalsurfadventures.bookinglayer.com/en/product/'+LV[S.level].slug+'?start='+S.start+'&end='+addDays(S.start,S.nights);
  ['female','male','couple'].forEach(function(n){if(S.g[n])u+='&'+n+'='+S.g[n];});location.href=u;}
d.getElementById('bk').addEventListener('submit',function(e){e.preventDefault();submit();});

/* ---- init ---- */
rtabs.select(S.room);ltabs.select(S.level);showLevel(S.level);
rpanels.forEach(function(p,k){p.hidden=k!==S.room;});
if(q.get('room'))S.reached=0;
history.replaceState(null,'','#level');render();
})();
`);

fs.mkdirSync(path.join(dist, 'book'), { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), home);
fs.writeFileSync(path.join(dist, 'book/index.html'), book);
console.log('built', (home.length / 1024).toFixed(0) + ' KB', (book.length / 1024).toFixed(0) + ' KB');
