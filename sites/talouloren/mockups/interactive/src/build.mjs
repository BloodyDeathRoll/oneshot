// Builds dist/index.html for the talouloren interactive mockup ("הזרקור", The Spot).
// All words come from the passed copy (sites/talouloren/copy/he.json, en.json): Hebrew is rendered
// into the HTML, English is inlined for the toggle. Media comes from src/make-media.sh.
// Usage: node sites/talouloren/mockups/interactive/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../../../..');
const read = (p) => fs.readFileSync(path.resolve(root, p), 'utf8');
const he = JSON.parse(read('sites/talouloren/copy/he.json'));
const en = JSON.parse(read('sites/talouloren/copy/en.json'));
const dossier = JSON.parse(read('dossier/talouloren/dossier.json'));
const i18nSrc = fs.readFileSync(path.join(here, 'i18n.js'), 'utf8');
const ctx = {}; vm.runInNewContext(i18nSrc, ctx);
const { tr, trHtml } = ctx;

const used = new Set();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const val = (k) => { used.add(k); const v = tr(he, k); if (v === '') throw new Error('empty copy key ' + k); return v; };
const T = (k, tag = 'span', attrs = '') => `<${tag} data-t="${k}"${attrs ? ' ' + attrs : ''}>${trHtml(val(k))}</${tag}>`;
const P = (k, cls = 'prose') => `<div class="${cls}" data-tp="${k}">${val(k).split(/\n\s*\n/).map((p) => `<p>${trHtml(p)}</p>`).join('')}</div>`;
const A = (attr, k) => `${attr}="${esc(val(k))}" data-ta="${attr}:${k}"`;
const yt = Object.fromEntries(dossier.videos.map((v) => [v.id, (v.source_url.match(/[?&]v=([\w-]{11})/) || [])[1]]));
const WA = (k) => `href="https://wa.me/${he.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(val(k))}" data-wa="${k}"`;
const L = (n) => he[n.split('.')[0]];

// ---------- icons
const I = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l11-6.5z"/></svg>',
  arrow: '<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M19 12H5m6-6-6 6 6 6"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
  yt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3Z"/></svg>',
  li: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3v12H3zm6 0h2.9v1.7h.1a3.2 3.2 0 0 1 2.8-1.6c3 0 3.6 2 3.6 4.6V21h-3v-6.5c0-1.6 0-3.5-2.1-3.5s-2.4 1.6-2.4 3.4V21H9z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6"/></svg>',
};
const social = { instagram: I.ig, youtube: I.yt, linkedin: I.li };

// ---------- pieces used on several routes
const goldBtn = (href = '#check', k = 'x.cta.check', cls = '') => `<a class="btn btn-gold ${cls}" href="${href}">${T(k)}</a>`;
const waBtn = (k = 'x.msg.whatsapp_prefill', label = 'x.cta.whatsapp') => `<a class="btn btn-line btn-wa" ${WA(k)} target="_blank" rel="noopener">${I.wa}${T(label)}</a>`;
const bookBtn = (cls = 'btn-gold') => `<a class="btn ${cls}" href="#book" data-book>${T('x.cta.book')}</a>`;
const endCall = (headKey, action) => `
  <section class="endcall lit-end">
    <div class="wrap">${T(headKey, 'h2', 'class="h-sec"')}
      <div class="row-btns">${action}${waBtn()}</div></div>
  </section>`;
const film = (vid, img, alt, w, h, cls = '') => `
  <button class="film ${cls}" type="button" data-video="${yt[vid]}" data-vid="${vid}" ${A('aria-label', 'x.cta.play')}>
    <img src="img/${img}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async">
    <span class="play">${I.play}</span>
  </button>`;

// partners
const shaharFrame = (big = false) => `
  <div class="partner partner-sn${big ? ' big' : ''}" data-partner>
    <div class="frame ph-frame" role="img" aria-label="Shahar Naor, portrait coming">
      <span class="sq" aria-hidden="true"></span>
      <span class="ph-label"><span lang="he">צילום בדרך</span><span class="sep"> · </span><span lang="en" dir="ltr">Portrait coming</span></span>
    </div>
    <div class="p-cap">${T('team.1.name', 'h3', 'class="p-name"')}${T('team.1.role', 'p', 'class="p-role"')}</div>
  </div>`;
const talFrame = (big = false) => `
  <div class="partner partner-tal${big ? ' big' : ''}" data-partner>
    <div class="frame"><img src="img/tal.webp" width="520" height="520" loading="lazy" decoding="async"
      alt="Tal Oren smiling, curly hair, dark knit sweater, in front of a bright window, black and white"></div>
    <div class="p-cap">${T('team.0.name', 'h3', 'class="p-name"')}${T('team.0.role', 'p', 'class="p-role"')}</div>
  </div>`;
const snStrip = `
  <ul class="sn-strip" role="list">
    <li><img src="img/sn-paleforce.webp" width="640" height="480" loading="lazy" alt="Shahar's Pale Force animation for Late Night with Conan O'Brien: Conan and the cartoon hero, NBC logo"></li>
    <li><img src="img/sn-cocacola.webp" width="640" height="480" loading="lazy" alt="Coca-Cola Israel web project: a colourful illustrated page with a red heart and a crowd of figures"></li>
    <li><img src="img/sn-app.webp" width="640" height="480" loading="lazy" alt="A branded app screen: a glowing teal ring emblem on a dark sea-green ground"></li>
  </ul>
  ${T('x.home.proof.nbc_note', 'p', 'class="note"')}`;

// cases
const cases = he.caseStudies.map((c, i) => ({ ...c, i }));
const caseImg = { amdocs: 'case-amdocs', maccabi: 'case-maccabi', seat: 'case-seat', 'park-bavli': 'case-park-bavli', wella: 'case-wella', 'calvin-klein': 'case-calvin-klein' };
const caseAlt = {
  amdocs: 'From the Amdocs film: employees round a workshop table, black and white',
  maccabi: 'From the Maccabi film: a nurse in a white coat at her desk in a clinic, talking with a visitor',
  seat: 'From the SEAT commercial: an older man in a grey suit in a yellow armchair, mid-sentence',
  'park-bavli': 'From the Park Bavli film: a dancer in a high apartment with tall windows over the city',
  wella: 'From the Wella film: a smiling man in a white hooded suit under blue light',
  'calvin-klein': 'From the Calvin Klein film: a photo booth under a studio light in a hotel hall',
};
const caseFilm = { amdocs: 'vid-038', maccabi: 'vid-022', seat: 'vid-055', 'park-bavli': 'vid-020', wella: 'vid-029', 'calvin-klein': 'vid-042', 'eugene-perma': 'vid-060', 'visa-cal': 'vid-013', 'doron-shefer': 'vid-058', rita: 'vid-023', amt: 'vid-024' };
const sectorKey = (s) => ({ 'ארגונים': 'organisations', 'יזמים': 'entrepreneurs', 'מותגים': 'brands' })[s];

const caseCard = (c) => `
  <article class="case-card" data-spot-card>
    <a href="#work-${c.slug}" class="case-link">
      <div class="case-img"><img src="img/${caseImg[c.slug]}.webp" width="1280" height="720" loading="lazy" decoding="async" alt="${esc(caseAlt[c.slug])}"></div>
      <div class="case-txt">
        ${T(`caseStudies.${c.i}.client`, 'p', 'class="case-client"')}
        ${T(`caseStudies.${c.i}.outcome`, 'h3', 'class="case-out"')}
        ${T(`caseStudies.${c.i}.challenge`, 'p', 'class="case-ph"')}
        <span class="more">${T('x.cta.read_case')}${I.arrow}</span>
      </div>
    </a>
  </article>`;

// ---------- HOME
const pains = [0, 1, 2, 3, 4].map((i) => `<li>${T(`copyBlocks.1.body#${i}`)}</li>`).join('');
const ladder = [0, 1, 2, 3, 4].map((i) => `<li class="fw${i === 4 ? ' fw-gold' : ''}">${T(`copyBlocks.2.body@${i}`)}</li>`).join('');
const brandMarks = { 0: 'mercedes', 1: 'loreal', 2: 'wella', 11: 'mizrahi', 12: 'philip-morris', 14: 'castro' };
const brandItems = he.clientLogos.map((b, i) => brandMarks[i]
  ? `<li class="mark"><img src="img/logo-${brandMarks[i]}.webp" ${A('alt', `clientLogos.${i}.name`)} height="40" loading="lazy"></li>`
  : `<li class="word">${T(`clientLogos.${i}.name`)}</li>`).join('');
const peopleItems = he.extras.home.proof.people.map((_, i) => `<li>${T(`x.home.proof.people.${i}`)}</li>`).join('');
const stats = [0, 1, 2].map((i) => `<div class="stat">${T(`x.home.proof.stats.${i}.value`, 'p', 'class="stat-v" data-count')}${T(`x.home.proof.stats.${i}.label`, 'p', 'class="stat-l"')}</div>`).join('');
const q3opts = [0, 1, 2, 3].map((i) => `<a class="opt" href="#check" data-q3="${i}">${T(`x.pages.check.questions.2.options.${i}`)}</a>`).join('');
const faq = he.extras.home.faq.items.map((_, i) => `<details class="faq-i"><summary>${T(`x.home.faq.items.${i}.q`)}<span class="pm" aria-hidden="true"></span></summary>${T(`x.home.faq.items.${i}.a`, 'p')}</details>`).join('');

const home = `
<section class="view on" id="home" aria-labelledby="h-hero">
  <section class="hero" data-spot-zone>
    <div class="hero-film">
      <video id="hero-video" muted loop playsinline preload="none" poster="img/hero-d.webp" aria-hidden="true"
        data-src-d="video/hero-d" data-src-m="video/hero-m"></video>
      <img class="hero-poster" src="img/hero-d.webp" width="960" height="1080" fetchpriority="high"
        alt="A man talking to camera in black and white on a pure black ground, from the Talou L'oren film SUCCESS IS BALANCE">
      <div class="dim" aria-hidden="true"></div><div class="glow" aria-hidden="true"></div>
      <button class="film-btn" type="button" data-video="${yt['vid-036']}" data-vid="vid-036">${I.play}${T('x.cta.play')}</button>
    </div>
    <div class="hero-txt">
      <p class="eyebrow" lang="en" dir="ltr">${T('tagline')}</p>
      ${T('copyBlocks.0.heading', 'h1', 'class="h-hero" id="h-hero"')}
      ${T('copyBlocks.0.body', 'p', 'class="lead"')}
      <div class="row-btns doors-btns">
        <a class="btn btn-line" href="#story">${T('x.home.hero.door_story')}${I.arrow}</a>
        <a class="btn btn-line" href="#launch">${T('x.home.hero.door_launch')}${I.arrow}</a>
      </div>
      <p class="hero-names">${[0, 1, 2, 3].map((i) => T(`caseStudies.${i}.client`)).join('<span aria-hidden="true"> · </span>')}</p>
    </div>
    <div class="spot" aria-hidden="true"></div>
  </section>

  <section class="mirror" aria-labelledby="h-mirror">
    <div class="wrap">
      ${T('copyBlocks.1.heading', 'h2', 'class="h-label" id="h-mirror"')}
      <ol class="pains" role="list">${pains}</ol>
    </div>
  </section>

  <section class="flip" aria-labelledby="h-flip">
    <div class="wrap">
      ${T('copyBlocks.2.heading', 'h2', 'class="h-label" id="h-flip"')}
      <ol class="ladder" role="list">${ladder}</ol>
      ${T('copyBlocks.2.body', 'p', 'class="flip-body"')}
    </div>
  </section>

  <section class="doors" aria-labelledby="h-doors">
    <div class="wrap">
      ${T('x.home.doors_title', 'h2', 'class="h-sec" id="h-doors"')}
      <div class="door-grid">
        ${[[2, 'story', 'door-story', 1250, 1000, 'A group shoot in black and white: four people pulling faces at the camera, one laughing with his mouth wide open'], [3, 'launch', 'door-launch', 1244, 995, 'A man in a long coat walking past a street mural, black and white']].map(([i, slug, img, w, h, alt]) => `
        <article class="door" data-spot-card>
          <div class="door-img"><img src="img/${img}.webp" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${alt}"></div>
          <div class="door-txt">
            ${T(`services.${i}.title`, 'h3', 'class="door-t"')}
            ${T(`services.${i}.summary`, 'p')}
            ${T(`services.${i}.format`, 'p', 'class="meta"')}
            <p class="meta">${T(`x.pages.${slug}.price_label`)} ${T(`x.pages.${slug}.price`)}</p>
            <a class="btn btn-line" href="#${slug}">${T(`services.${i}.title`)}${I.arrow}</a>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="how" aria-labelledby="h-how">
    <div class="wrap">
      ${T('x.home.how.title', 'h2', 'class="h-sec" id="h-how"')}
      <ol class="steps" role="list">
        <li class="step step-1"><span class="n">1</span>${T('x.home.how.step1', 'h3')}${T('services.0.summary', 'p')}
          <div class="q3">
            <p class="q3-n"><span data-t="x.pages.check.progress" data-n-fill="3">${trHtml(val('x.pages.check.progress').replace('{n}', '3'))}</span></p>
            ${T('x.pages.check.questions.2.q', 'p', 'class="q3-q"')}
            <div class="opts">${q3opts}</div>
          </div>
        </li>
        <li class="step"><span class="n">2</span>${T('x.home.how.step2', 'h3')}${T('services.1.summary', 'p')}</li>
        <li class="step"><span class="n">3</span>${T('x.home.how.step3_title', 'h3')}${T('x.home.how.step3_body', 'p')}</li>
      </ol>
    </div>
  </section>

  <section class="proof" aria-labelledby="h-proof">
    <div class="wrap">
      ${T('x.home.proof.title', 'h2', 'class="h-sec" id="h-proof"')}
      <div class="stats">${stats}</div>
    </div>
    <div class="marquee m-brands" data-marquee><ul role="list">${brandItems}</ul></div>
    <div class="wrap">${T('x.home.proof.people_title', 'h3', 'class="h-label"')}</div>
    <div class="marquee m-people slow" data-marquee><ul role="list">${peopleItems}</ul></div>
    <div class="wrap">${T('x.home.proof.sectors', 'p', 'class="note"')}${T('x.home.proof.nbc_note', 'p', 'class="note"')}</div>
  </section>

  <section class="cases" aria-labelledby="h-cases">
    <div class="cases-pin">
      <div class="wrap">${T('x.home.cases_title', 'h2', 'class="h-sec" id="h-cases"')}</div>
      <div class="cases-track">${cases.slice(0, 4).map(caseCard).join('')}</div>
    </div>
  </section>

  <section class="partners" aria-labelledby="h-partners">
    <div class="wrap">
      ${T('x.home.partners_title', 'h2', 'class="h-sec" id="h-partners"')}
      ${T('copyBlocks.3.heading', 'p', 'class="partners-h"')}
      <div class="pair" data-pair>
        <div>${talFrame()}${T('team.0.bio', 'p', 'class="bio"')}</div>
        <div>${shaharFrame()}${T('team.1.bio', 'p', 'class="bio"')}${snStrip}</div>
      </div>
      ${P('copyBlocks.3.body', 'prose partners-body')}
    </div>
  </section>

  <section class="band" aria-labelledby="h-band">
    <picture><source media="(max-width: 700px)" srcset="img/band-m.webp">
      <img src="img/band-d.webp" width="2000" height="1334" loading="lazy" decoding="async" alt="A man in sunglasses at the wheel of a Mercedes, black and white"></picture>
    <div class="band-txt wrap">
      ${T('x.home.partnership_band.heading', 'h2', 'class="h-sec" id="h-band"')}
      ${T('services.4.summary', 'p', 'class="lead"')}
      ${T('services.4.body#1', 'p', 'class="breath"')}
      <a class="btn btn-line" href="#partnership">${T('x.home.partnership_band.button')}${I.arrow}</a>
    </div>
  </section>

  <section class="faq" aria-labelledby="h-faq">
    <div class="wrap narrow">
      ${T('x.home.faq.title', 'h2', 'class="h-sec" id="h-faq"')}
      <div class="faq-list">${faq}</div>
    </div>
  </section>

  <section class="final" aria-labelledby="h-final">
    <div class="wrap">
      ${T('x.home.final.heading', 'h2', 'class="h-final" id="h-final"')}
      <div class="row-btns center"><span class="final-spot">${goldBtn('#check', 'x.cta.check', 'btn-big')}</span>${waBtn()}</div>
      ${T('closing', 'p', 'class="note center"')}
    </div>
  </section>
</section>`;

// ---------- STORY / LAUNCH
const method = (lit) => `<ol class="method" role="list" data-method>${he.extras.method_steps.map((s, i) => `
  <li class="${i < lit ? 'in' : 'out'}"><span class="mn">${s.n}</span>${T(`x.method_steps.${i}.title`)}</li>`).join('')}</ol>`;
const doorPage = (slug, i, vid, img, alt, lit) => `
<section class="view" id="${slug}" aria-labelledby="h-${slug}">
  <section class="split" data-spot-zone>
    <div class="split-txt">
      <p class="eyebrow">${T(`services.${i}.title`)}</p>
      ${T(`x.pages.${slug}.headline`, 'h1', `class="h-page" id="h-${slug}"`)}
      ${T(`services.${i}.summary`, 'p', 'class="lead"')}
      <p class="meta">${T(`services.${i}.format`)}</p>
      <div class="row-btns">${goldBtn()}</div>
    </div>
    ${film(vid, img, alt, 864, 1080, 'split-film')}
    <div class="spot" aria-hidden="true"></div>
  </section>
  <section class="wrap two">
    <div>${T(`x.pages.${slug}.pain_heading`, 'h2', 'class="h-sec"')}${T(`services.${i}.body#0`, 'p', 'class="lead"')}</div>
    <div>${T(`x.pages.${slug}.get_heading`, 'h2', 'class="h-sec"')}${T(`services.${i}.body#1`, 'p', 'class="lead"')}</div>
  </section>
  <section class="wrap">
    ${T(`x.pages.${slug}.method_heading`, 'h2', 'class="h-sec"')}${T('method.intro', 'p', 'class="note"')}
    ${method(lit)}
  </section>
  <section class="wrap price-row"><p class="meta">${T(`x.pages.${slug}.price_label`)}</p><p class="price">${T(`x.pages.${slug}.price`)}</p><p class="meta">${T(`services.${i}.audience`)}</p></section>
  ${endCall(`x.pages.${slug}.end_heading`, goldBtn())}
</section>`;

// ---------- PARTNERSHIP
const partnership = `
<section class="view" id="partnership" aria-labelledby="h-partnership">
  <section class="band band-top">
    <picture><source media="(max-width: 700px)" srcset="img/band-m.webp">
      <img src="img/band-d.webp" width="2000" height="1334" alt="A man in sunglasses at the wheel of a Mercedes, black and white"></picture>
    <div class="band-txt wrap">
      <p class="eyebrow">${T('services.4.title')}</p>
      ${T('x.pages.partnership.headline', 'h1', 'class="h-page" id="h-partnership"')}
      ${T('services.4.summary', 'p', 'class="lead"')}
      <div class="row-btns">${bookBtn()}</div>
    </div>
  </section>
  <section class="wrap two">
    <div>${T('x.pages.partnership.pain_heading', 'h2', 'class="h-sec"')}${T('services.4.body#0', 'p', 'class="lead"')}${T('services.4.body#1', 'p', 'class="breath"')}</div>
    <div>${T('x.pages.partnership.how_heading', 'h2', 'class="h-sec"')}${T('services.4.body#2', 'p', 'class="lead"')}<p class="meta">${T('services.4.format')}</p></div>
  </section>
  <section class="wrap two">
    <div>${T('x.pages.partnership.who_heading', 'h2', 'class="h-sec"')}${T('services.4.audience', 'p', 'class="lead"')}</div>
    <div class="price-row"><p class="meta">${T('x.pages.partnership.price_label')}</p><p class="price">${T('x.pages.partnership.price')}</p><p class="meta">${T('x.pages.partnership.capacity')}</p></div>
  </section>
  ${endCall('x.pages.partnership.end_heading', bookBtn())}
</section>`;

// ---------- WORK + case pages
const workRows = cases.map((c) => `
  <li class="w-row" data-sector="${sectorKey(c.sector)}">
    <a href="#work-${c.slug}">
      ${T(`caseStudies.${c.i}.client`, 'span', 'class="w-client"')}
      ${T(`caseStudies.${c.i}.title`, 'span', 'class="w-title"')}
      ${T(`caseStudies.${c.i}.sector`, 'span', 'class="w-sector"')}
      ${I.arrow}
    </a>
  </li>`).join('');
const voices = he.extras.video_library.voices.filter((v) => ['vid-040', 'vid-009', 'vid-030', 'vid-048', 'vid-059'].includes(v.id));
const voiceIdx = (id) => he.extras.video_library.voices.findIndex((v) => v.id === id);
const vCard = (img, id, labelKey) => `
  <li><button class="v-card" type="button" data-video="${yt[id]}" data-vid="${id}" ${A('aria-label', labelKey)}>
    <img src="img/${img}.webp" width="405" height="720" loading="lazy" decoding="async" alt="">
    <span class="play">${I.play}</span>${T(labelKey, 'span', 'class="v-cap"')}</button></li>`;
const voiceRow = voices.map((v) => vCard(`watch-${v.id.slice(4)}`, v.id, `x.video_library.voices.${voiceIdx(v.id)}.caption`)).join('');
const work = `
<section class="view" id="work" aria-labelledby="h-work">
  <div class="wrap page-head">
    ${T('x.pages.work.headline', 'h1', 'class="h-page" id="h-work"')}
    ${T('x.pages.work.pain', 'p', 'class="lead"')}${T('x.pages.work.intro', 'p', 'class="note"')}
    <div class="chips" role="group" data-filter>
      ${['all', 'organisations', 'entrepreneurs', 'brands'].map((f, i) => `<button type="button" class="chip" aria-pressed="${i === 0}" data-f="${f}">${T(`x.pages.work.filter.${f}`)}</button>`).join('')}
      <span class="chip-ul" aria-hidden="true"></span>
    </div>
  </div>
  <ul class="w-rows wrap" role="list">${workRows}</ul>
  <section class="wrap">
    ${T('x.pages.work.voices_heading', 'h2', 'class="h-sec"')}${T('x.pages.work.voices_intro', 'p', 'class="note"')}
    <ul class="v-row" role="list">${voiceRow}</ul>
  </section>
  ${endCall('x.pages.work.end_heading', bookBtn())}
</section>`;
const casePages = cases.map((c) => `
<section class="view case-page" id="work-${c.slug}" aria-labelledby="h-c-${c.slug}">
  <div class="wrap page-head">
    <a class="back" href="#work">${I.arrow}${T('x.nav.work')}</a>
    <p class="eyebrow">${T(`caseStudies.${c.i}.client`)} · ${T(`caseStudies.${c.i}.sector`)}</p>
    ${T(`caseStudies.${c.i}.title`, 'h1', `class="h-page" id="h-c-${c.slug}"`)}
  </div>
  <div class="wrap">${caseImg[c.slug] ? film(caseFilm[c.slug], caseImg[c.slug], caseAlt[c.slug], 1280, 720, 'wide') : `<button class="film wide nofilm" type="button" data-video="${yt[caseFilm[c.slug]]}" data-vid="${caseFilm[c.slug]}" ${A('aria-label', 'x.cta.play')}><span class="play">${I.play}</span>${T(`caseStudies.${c.i}.client`, 'span', 'class="nofilm-t"')}</button>`}</div>
  <div class="wrap three">
    <div>${T('x.pages.work.case_sections.before', 'h2', 'class="h-label"')}${T(`caseStudies.${c.i}.challenge`, 'p')}</div>
    <div>${T('x.pages.work.case_sections.did', 'h2', 'class="h-label"')}${P(`x.pages.work.case_what_we_did.${c.slug}`)}</div>
    <div>${T('x.pages.work.case_sections.after', 'h2', 'class="h-label"')}${T(`caseStudies.${c.i}.outcome`, 'p', 'class="lead"')}</div>
  </div>
  ${endCall('x.pages.work.end_heading', bookBtn())}
</section>`).join('');

// ---------- ABOUT
const about = `
<section class="view" id="about" aria-labelledby="h-about">
  <div class="wrap page-head">${T('x.pages.about.headline', 'h1', 'class="h-page" id="h-about"')}${T('copyBlocks.3.heading', 'p', 'class="lead"')}</div>
  <div class="wrap pair big" data-pair>
    <div>${talFrame(true)}${T('x.pages.about.tal_brings_label', 'h2', 'class="h-label"')}${T('team.0.bio', 'p', 'class="bio"')}</div>
    <div>${shaharFrame(true)}${T('x.pages.about.shahar_brings_label', 'h2', 'class="h-label"')}${T('team.1.bio', 'p', 'class="bio"')}${snStrip}</div>
  </div>
  <div class="wrap">${P('copyBlocks.3.body', 'prose partners-body')}</div>
  ${endCall('x.pages.about.end_heading', bookBtn())}
</section>`;

// ---------- BRANDS
const brandFilms = he.extras.video_library.proof.map((v, i) => ({ ...v, i })).filter((v) => v.page === 'brands');
// /brands film tiles: the film's own title, but in English never a Hebrew title: a mixed title keeps its Latin
// words (suffix ~), an all-Hebrew title falls back to the client's name from the logo wall
const brandIdx = { 'vid-021': 9, 'vid-006': 5, 'vid-002': 12 };
const brandFilmKey = (v) => brandIdx[v.id] != null ? `clientLogos.${brandIdx[v.id]}.name` : `x.video_library.proof.${v.i}.label~`;
const brandsF = (k) => `<label class="fl"><input name="${k}" ${k === 'email' ? 'type="email"' : k === 'phone' ? 'type="tel"' : 'type="text"'} placeholder=" " required>${T(`x.pages.brands.form.${k}`)}</label>`;
const brands = `
<section class="view" id="brands" aria-labelledby="h-brands">
  <section class="band band-top">
    <img src="img/route-brands.webp" width="1920" height="1080" alt="The L'Oréal building's entrance, people standing at the door, black and white">
    <div class="band-txt wrap">${T('x.pages.brands.headline', 'h1', 'class="h-page" id="h-brands"')}${T('x.pages.brands.pain', 'p', 'class="lead"')}${T('x.pages.brands.solution', 'p', 'class="lead"')}</div>
  </section>
  <section class="wrap">
    ${T('x.pages.brands.films_heading', 'h2', 'class="h-sec"')}
    <ul class="film-row" role="list">${brandFilms.map((v) => `<li><button class="film-tile" type="button" data-video="${yt[v.id]}" data-vid="${v.id}"><span class="play">${I.play}</span>${T(brandFilmKey(v), 'span', 'dir="auto"')}</button></li>`).join('')}</ul>
  </section>
  <section class="wrap two">
    <div>${T('x.pages.brands.services_heading', 'h2', 'class="h-sec"')}${T('services.6.summary', 'p', 'class="lead"')}${T('services.6.body', 'p', 'class="note"')}</div>
    <form class="form" data-mockform novalidate>
      ${T('x.pages.brands.form.heading', 'h2', 'class="h-sec"')}
      <div class="f-grid">${['name', 'company', 'role', 'email', 'phone'].map(brandsF).join('')}
      <label class="fl full"><textarea name="need" placeholder=" " rows="3" required></textarea>${T('x.pages.brands.form.need')}</label></div>
      <button class="btn btn-gold" type="submit">${T('x.pages.brands.form.submit')}</button>
      ${T('x.form.success', 'p', 'class="ok" hidden')}
    </form>
  </section>
</section>`;

// ---------- WATCH
const series = he.extras.pages.watch.series;
const proofLib = he.extras.video_library.proof;
const pIdx = (id) => proofLib.findIndex((v) => v.id === id);
const seriesCards = {
  proof: [['amdocs', 'vid-038'], ['maccabi', 'vid-022'], ['seat', 'vid-055'], ['park-bavli', 'vid-020'], ['wella', 'vid-029'], ['calvin-klein', 'vid-042']].map(([k, id]) => vCard(`watch-${k}`, id, `caseStudies.${cases.findIndex((c) => c.slug === k)}.client`)).join(''),  // the client's name, localized (the film titles are verbatim Hebrew/English)
  voices: voiceRow,
};
const watch = `
<section class="view" id="watch" aria-labelledby="h-watch">
  <div class="wrap page-head">${T('x.pages.watch.headline', 'h1', 'class="h-page" id="h-watch"')}${T('x.pages.watch.pain', 'p', 'class="lead"')}${T('x.pages.watch.intro', 'p', 'class="note"')}</div>
  ${series.map((s, i) => `
  <section class="wrap series">
    <div class="series-h">${T(`x.pages.watch.series.${i}.name`, 'h2', 'class="h-sec"')}${T(`x.pages.watch.series.${i}.line`, 'p', 'class="note"')}</div>
    ${seriesCards[s.key] ? `<ul class="v-row" role="list" data-dimrow>${seriesCards[s.key]}</ul>` : `<div class="v-empty"><span class="v-ghost" aria-hidden="true"></span><span class="v-ghost" aria-hidden="true"></span><span class="v-ghost" aria-hidden="true"></span>${T('x.pages.watch.empty_series', 'p')}</div>`}
  </section>`).join('')}
  ${endCall('x.pages.watch.after_video', goldBtn())}
</section>`;

// ---------- COURSE
const course = `
<section class="view" id="course" aria-labelledby="h-course">
  <div class="wrap page-head">
    <p class="eyebrow" lang="en" dir="ltr">${T('tagline')}</p>
    <h1 class="h-page" id="h-course" lang="en" dir="ltr">${T('x.pages.course.headline')}</h1>
    ${T('x.pages.course.pain', 'p', 'class="lead"')}${T('services.5.summary', 'p', 'class="lead"')}
  </div>
  <div class="wrap">${film('vid-036', 'route-course', 'Tal on a stool in the dark brick studio under one top light', 1600, 900, 'wide')}</div>
  <section class="wrap">${T('x.pages.course.lessons_heading', 'h2', 'class="h-sec"')}${T('services.5.body', 'p', 'class="note"')}${method(10)}</section>
  <section class="wrap">${T('x.pages.course.voices_heading', 'h2', 'class="h-sec"')}
    <ul class="v-row" role="list">${vCard('watch-048', 'vid-048', `x.video_library.voices.${voiceIdx('vid-048')}.caption`)}${vCard('watch-059', 'vid-059', `x.video_library.voices.${voiceIdx('vid-059')}.caption`)}</ul></section>
  <section class="wrap price-row"><p class="meta">${T('x.pages.course.price_label')}</p><p class="price">${T('x.pages.course.price')}</p><p class="meta">${T('services.5.format')}</p>
    <div class="row-btns"><a class="btn btn-gold" href="#course" data-mock>${T('x.cta.buy_course')}</a>${waBtn('services.5.ctaText')}</div></section>
</section>`;

// ---------- CHECK
const qs = he.extras.pages.check.questions;
const qScreen = (q, i) => {
  const k = `x.pages.check.questions.${i}`;
  let input = '';
  if (q.input === 'text') input = `<div class="fl big"><input type="text" name="q${i + 1}" aria-labelledby="q${i}" ${i === 0 ? 'autocomplete="organization"' : ''}></div>`;
  if (q.input === 'textarea') input = `<div class="fl big"><textarea name="q${i + 1}" rows="3" aria-labelledby="q${i}"></textarea></div>${q.none ? `<label class="tick"><input type="checkbox" name="q${i + 1}none"><span>${T(`${k}.none`)}</span></label>` : ''}`;
  if (q.input === 'single' || q.input === 'multi') input = `<div class="opts big" role="${q.input === 'single' ? 'radiogroup' : 'group'}" aria-labelledby="q${i}">${q.options.map((_, j) => `
      <label class="opt"><input type="${q.input === 'single' ? 'radio' : 'checkbox'}" name="q${i + 1}" value="${j}">${T(`${k}.options.${j}`)}</label>`).join('')}</div>`;
  if (q.input === 'budget_when') input = `<p class="budget">${T(`${k}.budget`)}</p><div class="opts big" role="radiogroup" aria-labelledby="q${i}">${q.when.map((_, j) => `
      <label class="opt"><input type="radio" name="q10" value="${j}">${T(`${k}.when.${j}`)}</label>`).join('')}</div>`;
  return `
    <fieldset class="q" data-q="${i}" ${i ? 'hidden' : ''} ${q.optional ? 'data-optional' : ''}>
      <legend class="q-q" id="q${i}">${T(`${k}.q`)}</legend>
      ${q.hint ? T(`${k}.hint`, 'p', 'class="note"') : ''}
      ${input}
    </fieldset>`;
};
const check = `
<section class="view check" id="check" aria-labelledby="h-check" data-spot-zone>
  <div class="spot" aria-hidden="true"></div>
  <div class="check-intro wrap narrow" data-intro>
    <p class="eyebrow">${T('services.0.format')}</p>
    ${T('x.pages.check.intro.title', 'h1', 'class="h-page" id="h-check"')}
    ${T('services.0.body', 'p', 'class="lead"')}
    ${T('x.pages.check.intro.meta', 'p', 'class="meta"')}
    <button class="btn btn-gold btn-big" type="button" data-start>${T('x.pages.check.intro.start')}</button>
  </div>
  <form class="check-form wrap narrow" data-check hidden novalidate>
    <div class="progress" aria-hidden="true"><span></span></div>
    <p class="counter" aria-live="polite"><span data-n>1</span> / 10</p>
    ${qs.map(qScreen).join('')}
    <fieldset class="q" data-q="10" hidden>
      <legend class="q-q">${T('x.pages.check.contact.title')}</legend>
      <div class="f-grid">
        <label class="fl"><input name="name" type="text" autocomplete="name" placeholder=" " required>${T('x.form.name')}</label>
        <label class="fl"><input name="email" type="email" autocomplete="email" placeholder=" " required>${T('x.form.email')}</label>
        <label class="fl"><input name="phone" type="tel" autocomplete="tel" placeholder=" " required>${T('x.form.phone')}</label>
      </div>
      <label class="tick"><input type="checkbox" name="consent" required><span>${T('x.pages.check.contact.consent')}</span></label>
    </fieldset>
    <div class="q-nav">
      <button class="btn btn-line" type="button" data-back>${T('x.cta.back')}</button>
      <button class="btn btn-gold" type="button" data-next disabled>${T('x.cta.next')}${I.arrow}</button>
      <button class="btn btn-gold" type="submit" data-submit hidden>${T('x.pages.check.contact.submit')}</button>
      ${T('x.pages.check.answer_to_continue', 'p', 'class="note hint-next"')}
    </div>
  </form>
</section>`;

// ---------- THANKS, SNAPSHOT
const thanks = `
<section class="view" id="thanks" aria-labelledby="h-thanks">
  <div class="wrap narrow page-head">${T('x.pages.thanks.title', 'h1', 'class="h-page" id="h-thanks"')}${T('x.pages.thanks.body', 'p', 'class="lead"')}${T('x.pages.thanks.meanwhile', 'p', 'class="note"')}</div>
  <div class="wrap"><ul class="v-row" role="list">${seriesCards.proof}</ul></div>
  <div class="wrap row-btns"><a class="btn btn-line" href="#snapshot">${T('x.pages.snapshot.title')}${I.arrow}</a></div>
</section>`;
const dims = he.extras.pages.snapshot.dimensions;
const sample = [3, 2, 4, 2, 1]; // shortcut: mock readings for the layout only, marked MOCK on the page; the real scan fills them
const snapshot = `
<section class="view snapshot" id="snapshot" aria-labelledby="h-snap">
  <div class="wrap page-head">
    <p class="eyebrow" lang="en" dir="ltr">${T('tagline')}</p>
    <h1 class="h-snap" id="h-snap" data-bizname>${trHtml(val('x.pages.snapshot.title'))}</h1>
    ${T('x.pages.snapshot.intro', 'p', 'class="lead"')}
  </div>
  <section class="wrap">
    <div class="snap-h">${T('x.pages.snapshot.scores_title', 'h2', 'class="h-sec"')}<p class="note">${T('x.pages.snapshot.scale')} · <mark class="ph" lang="en">MOCK</mark></p></div>
    <ul class="meters" role="list">${dims.map((d, i) => `
      <li class="meter" style="--v:${sample[i]}">
        <div class="m-h">${T(`x.pages.snapshot.dimensions.${i}.name`, 'h3')}<span class="m-v" aria-label="${sample[i]} / 5">${sample[i]}</span></div>
        ${T(`x.pages.snapshot.dimensions.${i}.q`, 'p', 'class="note"')}
        <div class="m-bar" aria-hidden="true"><span></span><i></i><i></i><i></i><i></i></div>
      </li>`).join('')}</ul>
  </section>
  <section class="wrap two">
    <div>${T('x.pages.snapshot.noticed_title', 'h2', 'class="h-sec"')}<ol class="obs" role="list"><li data-raw="{observation_1}">${trHtml('{observation_1}')}</li><li data-raw="{observation_2}">${trHtml('{observation_2}')}</li><li data-raw="{observation_3}">${trHtml('{observation_3}')}</li></ol></div>
    <div>${T('x.pages.snapshot.first_move_title', 'h2', 'class="h-sec"')}<p class="lead" data-raw="{first_move}">${trHtml('{first_move}')}</p></div>
  </section>
  <section class="wrap">
    ${T('x.pages.snapshot.path_title', 'h2', 'class="h-sec"')}
    <ul class="paths" role="list">${['course', 'story', 'launch', 'partnership', 'craft'].map((p) => `<li class="${p === 'story' ? 'lit' : ''}">${T(`x.pages.snapshot.paths.${p}`)}</li>`).join('')}</ul>
    <p class="signed"><img src="img/sig-gold.svg" alt="" width="160" height="26">${T('x.pages.snapshot.signed')}</p>
    ${T('x.pages.snapshot.cta_line', 'p', 'class="lead"')}
    <div class="row-btns">${bookBtn('btn-gold btn-big')}</div>
  </section>
</section>`;

// ---------- BOOK (page + drawer share one form)
const bookForm = (id) => `
  <form class="book" data-bookform novalidate id="${id}">
    <ol class="b-steps" role="list"><li class="on" data-step-i="0">${T('x.pages.book.step_time')}</li><li data-step-i="1">${T('x.pages.book.step_details')}</li><li data-step-i="2">${T('x.pages.book.step_pay')}</li></ol>
    <div class="b-sum"><p>${T('services.1.title', 'strong')} · ${T('services.1.format')}</p><p>${T('x.placeholders.price_session')} · ${T('services.1.body')}</p></div>
    <fieldset class="b-step" data-step="0">
      <legend class="sr">${T('x.pages.book.step_time')}</legend>
      <div class="days" role="radiogroup" data-days></div>
      <div class="slots" role="radiogroup" data-slots></div>
    </fieldset>
    <fieldset class="b-step" data-step="1" hidden>
      <legend class="sr">${T('x.pages.book.step_details')}</legend>
      <label class="fl"><input name="name" type="text" autocomplete="name" placeholder=" " required>${T('x.form.name')}</label>
      <label class="fl"><input name="email" type="email" autocomplete="email" placeholder=" " required>${T('x.form.email')}</label>
      <label class="fl"><input name="phone" type="tel" autocomplete="tel" placeholder=" " required>${T('x.form.phone')}</label>
    </fieldset>
    <fieldset class="b-step" data-step="2" hidden>
      <legend class="sr">${T('x.pages.book.step_pay')}</legend>
      <p class="mock-pay"><mark class="ph" lang="en">MOCK · Cardcom</mark></p>
      <label class="fl"><input inputmode="numeric" placeholder=" " autocomplete="off"><span>•••• •••• •••• ••••</span></label>
      <div class="f-grid"><label class="fl"><input inputmode="numeric" placeholder=" " autocomplete="off"><span>MM / YY</span></label><label class="fl"><input inputmode="numeric" placeholder=" " autocomplete="off"><span>CVV</span></label></div>
    </fieldset>
    <div class="q-nav">
      <button class="btn btn-line" type="button" data-bback hidden>${T('x.cta.back')}</button>
      <button class="btn btn-gold" type="button" data-bnext disabled>${T('x.cta.next')}${I.arrow}</button>
      <button class="btn btn-gold" type="submit" data-bpay hidden>${T('x.pages.book.pay_button')}</button>
    </div>
  </form>`;
const book = `
<section class="view" id="book" aria-labelledby="h-book">
  <div class="wrap narrow page-head">${T('x.pages.book.title', 'h1', 'class="h-page" id="h-book"')}${T('x.pages.snapshot.cta_line', 'p', 'class="lead"')}<div class="row-btns">${waBtn('services.1.ctaText')}<a class="btn btn-line" href="tel:${he.contact.phone}">${I.phone}<span dir="ltr">050-463-5536</span></a></div></div>
  <div class="wrap narrow">${bookForm('book-page')}</div>
</section>
<section class="view" id="booked" aria-labelledby="h-booked">
  <div class="wrap narrow page-head booked">
    <img class="sig-draw" src="img/sig-gold.svg" alt="" width="320" height="52">
    ${T('x.pages.booked.title', 'h1', 'class="h-page" id="h-booked"')}
    <p class="lead" data-booked>${trHtml(val('x.pages.booked.body'))}</p>
    <a class="btn btn-line" href="#home">${T('x.cta.home')}${I.arrow}</a>
  </div>
</section>`;

// ---------- legal + 404
const legal = `
<section class="view" id="privacy" aria-labelledby="h-privacy"><div class="wrap narrow page-head">${T('x.pages.privacy.title', 'h1', 'class="h-page" id="h-privacy"')}${P('x.pages.privacy.body')}</div></section>
<section class="view" id="accessibility" aria-labelledby="h-acc"><div class="wrap narrow page-head">${T('x.pages.accessibility.title', 'h1', 'class="h-page" id="h-acc"')}${P('legal.accessibilityStatement')}${T('legal.accessibilityContact', 'p', 'class="note"')}</div></section>
<section class="view" id="notfound" aria-labelledby="h-404"><div class="wrap narrow page-head">${T('x.pages.not_found.title', 'h1', 'class="h-page" id="h-404"')}${T('x.pages.not_found.body', 'p', 'class="lead"')}<a class="btn btn-line" href="#home">${T('x.cta.home')}${I.arrow}</a></div></section>`;

// ---------- header, footer, bar, drawer, lightbox
const navKeys = ['story', 'launch', 'partnership', 'work', 'about', 'brands', 'watch', 'course'];
const header = `
<a class="skip" href="#main">דילוג לתוכן</a>
<header class="hdr">
  <a class="logo" href="#home" aria-label="Talou L'oren"><img src="img/sig-gold.svg" alt="Talou L'oren" width="150" height="25"></a>
  <nav class="nav" aria-label="ראשי">${navKeys.map((k) => `<a href="#${k}">${T(`x.nav.${k}`)}</a>`).join('')}</nav>
  <div class="hdr-end">
    <button class="lang" type="button" data-lang lang="en">${T('x.nav.lang_switch')}</button>
    <a class="btn btn-gold btn-sm hdr-cta" href="#check">${T('x.nav.header_button')}</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu>${T('x.nav.menu')}<span class="burger" aria-hidden="true"></span></button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="תפריט">${['home', ...navKeys].map((k) => `<a href="#${k}">${T(`x.nav.${k}`)}</a>`).join('')}</nav>
</div>`;
const footer = `
<footer class="ftr">
  <div class="wrap ftr-grid">
    <div class="ftr-brand">
      <img class="sig-draw" src="img/sig-gold.svg" alt="Talou L'oren" width="260" height="43" loading="lazy">
      <p class="eyebrow" lang="en" dir="ltr">${T('tagline')}</p>
    </div>
    <form class="news" data-mockform novalidate>
      ${T('newsletter.label', 'p')}
      <div class="news-row"><label class="fl"><input type="email" name="email" autocomplete="email" placeholder=" " required>${T('x.form.email')}</label>
      <button class="btn btn-line" type="submit">${T('x.footer.newsletter_button')}</button></div>
      ${T('x.form.success', 'p', 'class="ok" hidden')}
    </form>
    <div class="ftr-contact">
      <a class="btn btn-gold btn-sm" ${WA('x.msg.whatsapp_prefill')} target="_blank" rel="noopener">${I.wa}${T('x.cta.whatsapp')}</a>
      <a class="ic-link" href="tel:${he.contact.phone}">${I.phone}<span dir="ltr">050-463-5536</span></a>
      <a class="ic-link" href="mailto:${he.contact.email}">${I.mail}<span dir="ltr">${he.contact.email}</span></a>
      <ul class="socials" role="list">${he.socialLinks.map((s) => `<li><a class="ic" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.platform}">${social[s.platform]}</a></li>`).join('')}</ul>
    </div>
  </div>
  <div class="wrap ftr-legal"><a href="#privacy">${T('x.footer.privacy')}</a><a href="#accessibility">${T('x.footer.accessibility')}</a><p data-year>${trHtml(val('x.footer.rights').replace('{year}', String(new Date().getFullYear())))}</p></div>
</footer>
<div class="bar" aria-label="Talou L'oren">
  <a class="btn btn-gold bar-check" href="#check">${T('x.nav.header_button')}</a>
  <a class="btn btn-gold bar-book" href="#book" data-book hidden>${T('x.cta.book')}</a>
  <a class="bar-wa" ${WA('x.msg.whatsapp_prefill')} target="_blank" rel="noopener" ${A('aria-label', 'x.cta.whatsapp')}>${I.wa}</a>
</div>
<a class="wa-chip" ${WA('x.msg.whatsapp_prefill')} target="_blank" rel="noopener" ${A('aria-label', 'x.cta.whatsapp')}>${I.wa}</a>
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="h-drawer" hidden>
  <div class="drawer-scrim" data-close></div>
  <div class="drawer-panel">
    <div class="drawer-head">${T('x.pages.book.title', 'h2', 'class="h-sec" id="h-drawer"')}<button class="x" type="button" data-close ${A('aria-label', 'x.nav.close')}>${I.close}</button></div>
    ${bookForm('book-drawer')}
  </div>
</div>
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="video" hidden>
  <div class="lb-frame"><iframe title="video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
  <button class="x" type="button" data-lbclose ${A('aria-label', 'x.nav.close')}>${I.close}</button>
</div>`;

// ---------- assemble
const views = [home, doorPage('story', 2, 'vid-015', 'route-story', 'Tal to camera in black and white on a grey seamless, looking down mid-thought', 7),
  doorPage('launch', 3, 'vid-027', 'route-launch', 'From the workshop film: an audience seated in rows, taking notes, black and white', 10),
  partnership, work, casePages, about, brands, watch, course, check, thanks, snapshot, book, legal].join('\n');
const body = `${header}\n<main id="main">${views}</main>\n${footer}`;

const dict = (src) => Object.fromEntries([...used].map((k) => [k, tr(src, k)]));
// the two faces the first screen sets are inlined, so the headline never reflows when they arrive (CLS)
const css = fs.readFileSync(path.join(here, 'style.css'), 'utf8').replace(/url\(fonts\/((?:karantina-hebrew-700|karantina-latin-700|heebo-hebrew-400|heebo-latin-400|heebo-hebrew-500)\.woff2)\)/g,
  (_, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(here, '../dist/fonts', f)).toString('base64')})`);
const js = fs.readFileSync(path.join(here, 'app.js'), 'utf8');
const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(val('x.seo.home.title'))}</title>
<meta name="description" content="${esc(val('x.seo.home.description'))}">
<meta name="theme-color" content="#060606">
<script>(function(r){r.classList.add('js');var n=0,k=function(){if(++n===2)r.classList.add('fonts')};document.addEventListener('DOMContentLoaded',k);setTimeout(function(){r.classList.add('fonts')},1500);if(document.fonts&&document.fonts.load)Promise.all([document.fonts.load('700 1em Karantina','\u05d0.'),document.fonts.load('400 1em Heebo','\u05d0,')]).then(k,k);else k()})(document.documentElement)</script>
<link rel="preload" href="img/hero-d.webp" as="image" fetchpriority="high">
<style>${css}</style>
</head>
<body>
${body}
<script>${i18nSrc}
var COPY = ${JSON.stringify({ he: dict(he), en: dict(en) })};
</script>
<script>${js}</script>
</body>
</html>
`;
fs.writeFileSync(path.join(here, '../dist/index.html'), html);
console.log('dist/index.html', (html.length / 1024).toFixed(0), 'KB,', used.size, 'copy keys');
