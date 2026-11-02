/* Talou L'oren — unique mockup "ההיפוך" (The Flip). One file, hash routes, he/en from the passed copy. */
(() => {
'use strict';
const COPY = window.COPY, VIDS = window.VIDS;
const root = document.documentElement;
const mqRM = matchMedia('(prefers-reduced-motion: reduce)');
const conn = navigator.connection || {};
// the head script decides the tier before first paint (html starts as .static, so JS-off is the stacked page)
const STATIC = root.classList.contains('static');
const PRERENDER = /[?&]prerender\b/.test(location.search);
const phone = () => innerWidth <= 760;

let L = 'he';
try { L = localStorage.getItem('tl-lang') || 'he'; } catch (e) {}
if (/[?&]lang=en\b/.test(location.search)) L = 'en';
let T, X;

// Mock-only interface labels (not site copy; marked as mock in notes.md).
const UI = {
  he: { portrait: 'צילום בדרך', portrait2: 'Portrait coming', film: 'הסרט', scroll: 'גללו', exslots: 'מועדים לדוגמה', expay: 'תשלום לדוגמה',
        card: 'מספר כרטיס', exp: 'תוקף', cvc: 'CVV', len: 'משך', price: 'מחיר', credit: 'קיזוז', when: 'מועד', sample: 'תמונת מצב לדוגמה',
        his: 'מה שחר עושה', site: 'shaharnaor.com', open: 'פתיחה', close: 'סגירה', mock: 'מוקאפ: שום דבר לא נשלח' },
  en: { portrait: 'Portrait coming', portrait2: 'צילום בדרך', film: 'The film', scroll: 'Scroll', exslots: 'Example times', expay: 'Example payment',
        card: 'Card number', exp: 'Expiry', cvc: 'CVV', len: 'Length', price: 'Price', credit: 'Credit', when: 'When', sample: 'Example snapshot',
        his: 'What Shahar makes', site: 'shaharnaor.com', open: 'Open', close: 'Close', mock: 'Mockup: nothing is sent' }
};
let U;

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LATIN = /[A-Za-z\u00C0-\u024F][A-Za-z0-9\u00C0-\u024F'’&@.\- ]*[A-Za-z0-9\u00C0-\u024F.]|[A-Za-z]/g;
// text: marks {placeholders} as visible placeholders, isolates Latin runs inside Hebrew, escapes everything else
const t = (s, iso = true) => String(s ?? '').split(/(\{[a-z_0-9]+\})/).map((seg, i) => {
  if (i % 2) return `<span class="tbd">${esc(seg)}</span>`;
  if (L !== 'he' || !iso) return esc(seg);
  let out = '', k = 0; seg.replace(LATIN, (m, at) => { out += esc(seg.slice(k, at)) + `<span lang="en" dir="ltr">${esc(m)}</span>`; k = at + m.length; return m; });
  return out + esc(seg.slice(k));
}).join('');
const paras = (s, cls = '') => String(s || '').split(/\n\n+/).map(p => `<p${cls ? ` class="${cls}"` : ''}>${t(p).replace(/\n/g, '<br>')}</p>`).join('');
const svc = slug => T.services.find(s => s.slug === slug);
const num = () => String(T.contact.whatsapp).replace(/\D/g, '');
const wa = text => `https://wa.me/${num()}?text=${encodeURIComponent(text || X.msg.whatsapp_prefill)}`;
const href = r => `#/${r}`;
const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
  play: '<svg viewBox="0 0 12 14" aria-hidden="true" fill="currentColor"><path d="M0 0l12 7-12 7z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  yt: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z"/></svg>',
  li: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3Zm7 0h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>'
};
const arr = '<span class="arr" aria-hidden="true">←</span>';
const goldCheck = (label, cls = '') => `<a class="btn btn-gold ${cls}" href="${href('check')}">${t(label)} ${arr}</a>`;
const bookBtn = (cls = '') => `<a class="btn btn-gold ${cls}" href="${href('book')}">${t(X.cta.book)} ${arr}</a>`;
const waBtn = (text, label = X.cta.whatsapp) => `<a class="btn btn-ghost btn-wa" href="${wa(text)}" target="_blank" rel="noopener">${ICON.wa}${t(label)}</a>`;
const img = (name, alt, cls = '', w, h, lazy = true) => `<img src="img/${name}.webp" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${w ? ` width="${w}" height="${h}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
const pic = (d, m, alt, cls = '', lazy = true) => `<picture><source media="(max-width:760px)" srcset="img/${m}.webp">${img(d, alt, cls, 0, 0, lazy)}</picture>`;

// alt text written from each picture (looked at), per language
const ALT = {
  he: { profile: 'טל אורן בפרופיל, חצי פנים מוארות, על רקע קיר לבנים כהה', stage: 'טל יושב על כיסא בסטודיו חשוך, שני פנסי צילום מכוונים אליו',
        tal033: 'טל אורן מדבר מול המצלמה על רקע שחור', tal001: 'טל אורן מחייך, בשחור־לבן',
        '025': 'גבר קירח בז׳קט שחור צוחק עם כוס ביד, בשחור־לבן', '029': 'גבר בז׳קט קופץ מול אותיות LOVE מוארות, בשחור־לבן', '014': 'גבר במשקפי שמש מאחורי הגה של מרצדס, בשחור־לבן',
        '021': 'חזית הבניין של L\'Oréal, אנשים בכניסה, בשחור־לבן', '019': 'מארז Wella בזהב על שחור, ולידו בקבוקים', '022': 'גוף מכוסה צבע, פיסולי, בשחור־לבן',
        w107: 'האנימציה של שחר ל־Pale Force: קונאן אובריאן ודמות מצוירת', w110: 'עמוד אינטרנט של קוקה־קולה ישראל, לבבות ודמויות צבעוניות', w105: 'סמל מואר באפליקציה, כחול על כהה' },
  en: { profile: 'Tal Oren in profile, half his face lit, against a dark brick wall', stage: 'Tal on a chair in a dark studio, two photo lamps aimed at him',
        tal033: 'Tal Oren talking to camera on black', tal001: 'Tal Oren smiling, black and white',
        '025': 'A bald man in a black jacket laughing, glass in hand, black and white', '029': 'A man in a jacket jumping in front of lit LOVE letters, black and white', '014': 'A man in sunglasses at the wheel of a Mercedes, black and white',
        '021': 'The L\'Oréal building front with people at the door, black and white', '019': 'A Wella box in gold on black, bottles beside it', '022': 'A paint-covered body, sculptural, black and white',
        w107: 'Shahar\'s Pale Force animation: Conan O\'Brien and a drawn character', w110: 'A Coca-Cola Israel web page with hearts and coloured figures', w105: 'A glowing app emblem, blue on dark' }
};
let A;

const CASE_IMG = { amdocs: 'case-038', maccabi: 'case-022', seat: 'case-055', 'park-bavli': 'case-020', wella: 'img-019', 'eugene-perma': 'film-060',
  'calvin-klein': 'film-042', 'visa-cal': 'film-013', 'doron-shefer': 'film-058', rita: 'img-022', amt: 'film-024' };
const CASE_FILM = slug => (X.video_library.proof.find(v => v.case === slug) || {}).id;

// ---------- chrome ----------
function chrome(render = true) {
  root.lang = L; root.dir = L === 'he' ? 'rtl' : 'ltr';
  if (render) {
  const navKeys = ['story', 'launch', 'partnership', 'work', 'about', 'brands', 'watch', 'course'];
  const links = navKeys.map(k => `<a href="${href(k)}" data-r="${k}">${t(X.nav[k])}</a>`).join('');
  document.getElementById('hdr').innerHTML = `
    <a class="logo" href="#/" aria-label="Talou L'oren, ${esc(X.nav.home)}"><img src="img/sig-gold.svg" alt="Talou L'oren" width="160" height="26"></a>
    <nav class="nav" aria-label="${esc(X.nav.menu)}">${links}</nav>
    <div class="hdr-end">
      <button class="lang" type="button" id="lang" lang="${L === 'he' ? 'en' : 'he'}">${esc(X.nav.lang_switch)}</button>
      <a class="btn btn-gold btn-sm" href="${href('check')}">${t(X.nav.header_button)}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="${esc(X.nav.menu)}"><span></span><span></span></button>
    </div>`;
  document.getElementById('menu').innerHTML = `<button class="close" type="button">${esc(X.nav.close)}</button>
    <a href="#/">${t(X.nav.home)}</a>${navKeys.map(k => `<a href="${href(k)}">${t(X.nav[k])}</a>`).join('')}
    <a href="${href('check')}" style="color:var(--gold)">${t(X.nav.header_button)}</a>`;
  document.getElementById('bar').innerHTML = `<a class="btn btn-gold" href="${href('check')}">${t(X.nav.header_button)}</a>
    <a class="wa" href="${wa()}" target="_blank" rel="noopener" aria-label="${esc(X.cta.whatsapp)}">${ICON.wa}</a>`;
  document.getElementById('chip').outerHTML = `<a id="chip" class="chip" href="${wa()}" target="_blank" rel="noopener"><i>${ICON.wa}</i>${t(X.cta.whatsapp)}</a>`;
  document.getElementById('ftr').innerHTML = footer();
  }
  document.getElementById('lang').onclick = () => { L = L === 'he' ? 'en' : 'he'; try { localStorage.setItem('tl-lang', L); } catch (e) {} boot(); };
  const mb = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
  const openMenu = o => { menu.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : '';
    if (o) menu.querySelector('a').focus(); else mb.focus(); };
  mb.onclick = () => openMenu(true);
  menu.querySelector('.close').onclick = () => openMenu(false);
  menu.onclick = e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); document.body.style.overflow = ''; mb.setAttribute('aria-expanded', false); } };
  menu.onkeydown = e => { if (e.key === 'Escape') openMenu(false); if (e.key === 'Tab') trap(e, menu); };
}
function trap(e, box) {
  const f = [...box.querySelectorAll('a,button,input,iframe,[tabindex]:not([tabindex="-1"])')].filter(x => x.offsetParent !== null);
  if (!f.length) return; const a = f[0], z = f[f.length - 1];
  if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
}
function footer() {
  const s = { instagram: ICON.ig, youtube: ICON.yt, linkedin: ICON.li };
  const tel = T.contact.phone;
  const telLocal = tel.replace('+972', '0').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
  return `<div class="wrap"><div class="g">
    <div><img class="sig" src="img/sig-gold.svg" alt="Talou L'oren" width="270" height="44">
      <p class="muted" style="max-width:36ch;margin:18px 0 0">${t(X.home.hero.eyebrow)}</p>
      <div class="soc">${T.socialLinks.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.platform)}">${s[l.platform] || ''}</a>`).join('')}
        <a href="${wa()}" target="_blank" rel="noopener" aria-label="${esc(X.cta.whatsapp)}">${ICON.wa}</a>
        <a href="tel:${esc(tel)}" aria-label="${esc(X.form.phone)}">${ICON.phone}</a>
        <a href="mailto:${esc(T.contact.email)}" aria-label="${esc(X.form.email)}">${ICON.mail}</a></div>
      <p class="muted contact-line" style="margin:16px 0 0;font-size:15px"><a href="tel:${esc(tel)}" style="text-decoration:none" dir="ltr">${esc(telLocal)}</a> · <a href="mailto:${esc(T.contact.email)}" style="text-decoration:none">${esc(T.contact.email)}</a></p></div>
    <div><h4>${t(X.nav.menu)}</h4><div class="links">${['story', 'launch', 'partnership', 'work', 'about', 'brands', 'watch', 'course'].map(k => `<a href="${href(k)}">${t(X.nav[k])}</a>`).join('')}</div></div>
    <div><h4>${t(T.newsletter.label)}</h4>
      <form class="nl" onsubmit="event.preventDefault();this.querySelector('.err').textContent=${esc(JSON.stringify(X.form.success))}">
        <label class="fld"><input type="email" required placeholder=" " autocomplete="email" id="nl-mail"><label for="nl-mail">${t(X.form.email)}</label><span class="err" aria-live="polite"></span></label>
        <button class="btn btn-ghost" type="submit">${t(X.footer.newsletter_button)}</button></form></div>
  </div>
  <div class="legal"><span>${t(X.footer.rights.replace('{year}', new Date().getFullYear()))}</span><a href="${href('privacy')}">${t(X.footer.privacy)}</a><a href="${href('accessibility')}">${t(X.footer.accessibility)}</a></div></div>`;
}

// ---------- Home ----------
function home() {
  const H = X.home, cb = T.copyBlocks, pains = cb[1].body.split(/\n\n+/);
  const ladder = cb[2].body.split(':').pop().replace(/\.$/, '').split(/,\s*/).map(s => s.trim());
  const check = svc('spotlight-check');
  const tal = T.team[0], sh = T.team[1];
  const cases = H.cases_order.map(s => T.caseStudies.find(c => c.slug === s));
  const flipLead = cb[2].body.split('.')[0] + '.';
  const shFrame = (big) => `<div class="frame coming"><div class="lbl"><span class="ini">${L === 'he' ? 'ש״נ' : 'SN'}</span>${t(sh.name)}<span>${esc(U.portrait)}</span><span lang="${L === 'he' ? 'en' : 'he'}" style="opacity:.75">${esc(U.portrait2)}</span></div></div>`;
  return `
<section class="flip" id="flip" aria-label="${esc(H.hero.eyebrow)}">
  <div class="stage" id="stage" style="--hero-still:url(img/profile-d.webp)">
    <div class="layer" aria-hidden="true">
      <picture><source media="(max-width:760px)" srcset="img/profile-m.webp"><img class="m-profile" id="mProfile" src="img/profile-d.webp" alt="" fetchpriority="high"></picture>
      <video class="m-video" id="mVideo" muted loop playsinline preload="none" poster="img/stage-d.webp"></video>
      <canvas id="beam"></canvas><div class="beam-css"></div><div class="shade"></div>
    </div>
    <div class="counter" aria-hidden="true"><b id="ctr">01</b> / 05</div>
    <div class="ph ph-hero" data-ph="0"><div class="inner">
      <span class="eyebrow metal" lang="en" dir="ltr">${esc(H.hero.eyebrow)}</span>
      <h1 class="hero-t">${t(cb[0].heading)}</h1>
      <nav class="seg" aria-label="${esc(H.doors_title)}"><a href="${href('story')}">${t(H.hero.door_story)}</a><a href="${href('launch')}">${t(H.hero.door_launch)}</a></nav>
    </div>
    <button class="film-btn" type="button" data-vid="vid-036"><i>${ICON.play}</i>${esc(U.film)}</button>
    <div class="scroll-cue" aria-hidden="true"><b></b>${esc(U.scroll)}</div></div>
    <div class="ph ph-pains" data-ph="1"><div class="inner">
      <p class="lead" style="margin:0 0 34px;color:#cfcfcf">${t(cb[0].body)}</p>
      <h2>${t(cb[1].heading)}</h2>
      <ol class="pains" id="pains">${pains.map((p, i) => `<li><span class="n" aria-hidden="true">0${i + 1}</span>${t(p)}</li>`).join('')}</ol></div></div>
    <div class="ph ph-flip" data-ph="2"><div class="inner">
      <h2>${t(cb[2].heading)}</h2><p>${t(flipLead)}</p>
      <ol class="ladder" id="ladder">${ladder.map(w => `<li><span>${t(w)}</span></li>`).join('')}</ol>
      ${img('stage-d', A.stage, 'static-only')}</div></div>
    <div class="ph ph-partners" data-ph="3"><div class="inner">
      <h2>${t(cb[3].heading)}</h2>
      <div class="duo">
        <div><div class="frame">${img('tal-001-p', A.tal001, '', 408, 510)}</div><div class="who"><b>${t(tal.name)}</b><span>${t(tal.role)}</span></div></div>
        <div>${shFrame()}<div class="who"><b>${t(sh.name)}</b><span>${t(sh.role)}</span></div></div>
      </div></div></div>
    <div class="ph ph-check" data-ph="4"><div class="inner">
      <span class="eyebrow metal" lang="en" dir="ltr">${esc(H.hero.eyebrow)}</span>
      <h2 style="margin:0">${t(check.title)}</h2>
      <p class="meta">${t(X.pages.check.intro.meta)}</p>
      <p class="muted" style="max-width:52ch;margin:0">${t(check.body)}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${goldCheck(X.cta.check)}${waBtn(check.ctaText)}</div></div></div>
  </div>
</section>

<section class="sec doors" aria-labelledby="doors-t"><div class="wrap">
  <h2 class="sr" id="doors-t">${t(H.doors_title)}</h2>
  ${['story', 'launch'].map((k, i) => { const s = svc(k); const im = k === 'story' ? '025' : '029';
    return `<div class="door" data-door>
    <button class="door-btn" type="button" aria-expanded="false" aria-controls="door-${k}"><span class="w">${t(s.title)}</span><span class="s">${t(s.summary)}</span></button>
    <div class="door-panel" id="door-${k}"><div><div class="in">
      ${img('img-' + im, A[im], '', 1500, 1000)}
      <div>${paras(s.body, 'muted')}
        <ul class="facts"><li><b>${t(X.pages[k].price_label)}</b><span>${t(X.pages[k].price)}</span></li><li><b>⏱</b><span>${t(s.format)}</span></li><li><b>→</b><span>${t(s.audience)}</span></li></ul>
        <a class="btn btn-ghost" href="${href(k)}">${t(s.title)} ${arr}</a></div></div></div></div></div>`; }).join('')}
</div></section>

<section class="sec" aria-labelledby="how-t" style="padding-top:0"><div class="wrap">
  <h2 class="sec-t" id="how-t">${t(H.how.title)}</h2>
  <div class="sheet">
    <a class="cell lit" href="${href('check')}" style="text-decoration:none"><span class="big" aria-hidden="true">1</span><div><h3>${t(H.how.step1)}</h3><p>${t(check.summary)}</p><p class="muted" style="font-size:14px;margin-top:8px">${t(check.format)}</p><span class="go">${t(X.cta.check)} ${arr}</span></div></a>
    <a class="cell" href="${href('book')}" style="text-decoration:none"><span class="big" aria-hidden="true">2</span><div><h3>${t(H.how.step2)}</h3><p>${t(svc('clarity-session').summary)}</p><p class="muted" style="font-size:14px;margin-top:8px">${t(svc('clarity-session').format)}</p><span class="go">${t(X.cta.book)} ${arr}</span></div></a>
    <div class="cell"><span class="big" aria-hidden="true">3</span><div><h3>${t(H.how.step3_title)}</h3><p>${t(H.how.step3_body)}</p><p style="display:flex;gap:6px;flex-wrap:wrap;margin-top:14px">${['story', 'launch', 'partnership'].map(k => `<a class="btn btn-ghost btn-sm" href="${href(k)}">${t(svc(k).title)}</a>`).join('')}</p></div></div>
  </div></div></section>

<section class="sec" aria-labelledby="proof-t" style="padding-top:0"><div class="wrap">
  <h2 class="sec-t" id="proof-t">${t(H.proof.title)}</h2>
  <div class="stats">${H.proof.stats.map(s => `<div class="stat"><span class="v">${t(s.value, false)}</span><span class="l">${t(s.label)}</span></div>`).join('')}</div>
  <div class="names">
    <p>${T.clientLogos.map(c => `<span>${t(c.name)}</span>`).join(' <span class="dot" aria-hidden="true">·</span> ')}</p>
    <p class="small">${t(H.proof.sectors)}</p>
    <h3 class="k" style="margin:20px 0 0">${t(H.proof.people_title)}</h3>
    <p>${H.proof.people.map(c => `<span>${t(c)}</span>`).join(' <span class="dot" aria-hidden="true">·</span> ')}</p>
    <p class="small">${t(H.proof.nbc_note)}</p>
  </div></div></section>

<section class="sec" aria-labelledby="cases-t" style="padding-top:0"><div class="wrap">
  <h2 class="sec-t" id="cases-t">${t(H.cases_title)}</h2>
  <div class="cases" data-slider>
    <div class="slides">${cases.map((c, i) => `<div class="slide${i ? '' : ' on'}" data-i="${i}">${pic(CASE_IMG[c.slug], CASE_IMG[c.slug] + '-m', T.videos.find(v => v.video === 'dossier:' + CASE_FILM(c.slug))?.description || c.title)}
      <button class="play" type="button" data-vid="${CASE_FILM(c.slug)}" aria-label="${esc(X.cta.play)}: ${esc(c.title)}">${ICON.play}</button></div>`).join('')}</div>
    <div class="case-t" aria-live="polite">${cases.map((c, i) => `<div class="item${i ? '' : ' on'}" data-i="${i}">
      <p class="k">${t(c.sector)} · 0${i + 1} / 04</p><h3 class="cl disp" style="font-weight:400">${t(c.client)}</h3>
      <p class="o">${t(c.outcome)}</p><p class="ph-line">${t(c.challenge)}</p>
      <a class="btn btn-ghost btn-sm" href="${href('work/' + c.slug)}">${t(X.cta.read_case)} ${arr}</a></div>`).join('')}
      <div class="dots" role="tablist">${cases.map((c, i) => `<button type="button" role="tab" aria-current="${!i}" aria-label="${esc(c.client)}" data-go="${i}"><i></i></button>`).join('')}</div>
    </div></div></div></section>

<section class="sec" aria-labelledby="partners-t" style="padding-top:0"><div class="wrap">
  <h2 class="sec-t" id="partners-t">${t(H.partners_title)}</h2>
  <div class="split" style="margin-top:10px"><p class="lead" style="margin:0">${t(cb[3].body.split(/\n\n/)[0])}</p><p class="muted" style="margin:0">${t(cb[3].body.split(/\n\n/)[1] || '')}</p></div>
  <div class="pair">
    <div class="bio"><h3>${t(tal.name)}</h3><p class="role">${t(tal.role)}</p><p>${t(tal.bio)}</p></div>
    <div class="bio"><h3>${t(sh.name)}</h3><p class="role">${t(sh.role)}</p><p>${t(sh.bio)}</p>
      <div class="strip">${img('work-107', A.w107, '', 640, 480)}${img('work-110', A.w110, '', 640, 480)}${img('work-105', A.w105, '', 640, 480)}</div>
      <p class="strip-n">${t(H.proof.nbc_note)}</p>
      <a class="link-out btn btn-ghost btn-sm" href="${esc(sh.url)}" target="_blank" rel="noopener"><span lang="en" dir="ltr">shaharnaor.com</span></a></div>
  </div></div></section>

<section class="band" aria-labelledby="band-t">
  <div class="bg" data-par style="background-image:url(img/${phone() ? 'band-m' : 'band-d'}.webp);background-position:50% 60%" role="img" aria-label="${esc(A['021'])}"></div>
  <div class="wrap"><h2 id="band-t">${t(H.partnership_band.heading)}</h2>
    <p class="lead">${t(svc('partnership').summary)}</p>
    <p class="breath">${t(svc('partnership').body.split(/\n\n/)[1])}</p>
    <a class="btn btn-ghost" href="${href('partnership')}">${t(H.partnership_band.button)} ${arr}</a></div>
</section>

<section class="sec" aria-labelledby="faq-t"><div class="wrap">
  <h2 class="sec-t" id="faq-t">${t(H.faq.title)}</h2>
  <div class="faq">${H.faq.items.map((f, i) => `<div class="qa"><button type="button" aria-expanded="false" aria-controls="qa${i}"><span>${t(f.q)}</span><span class="pl" aria-hidden="true"></span></button><div class="a" id="qa${i}" role="region"><div><p>${t(f.a)}</p></div></div></div>`).join('')}</div>
</div></section>

<section class="final" id="book" aria-labelledby="final-t">
  <h2 class="sr" id="final-t">${t(H.final.heading)}</h2>
  <div aria-hidden="true" style="overflow:hidden"><div class="mq">${Array(8).fill(`<span>${t(H.final.heading)}</span>`).join('')}</div></div>
  <div class="acts">${goldCheck(X.cta.check)}${waBtn(X.msg.whatsapp_prefill, X.cta.whatsapp)}</div>
</section>`;
}

// ---------- the set-piece: beam shader + scroll timeline ----------
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uTime,uGlare,uTurn,uWidth,uSide,uPow;uniform vec2 uPool;uniform vec4 uText;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/uRes;float a=uRes.x/uRes.y;vec2 p=vec2(uv.x*a,uv.y);
 float sx=uSide>0.?.9:.1;vec2 src=vec2(sx*a,1.1);vec2 tgt=vec2(uPool.x*a,uPool.y);
 vec2 gc=vec2(mix(.5,sx,.8)*a,a<1.?1.:.98);vec2 dg=(p-gc)/vec2(1.25,1.);float d2=dot(dg,dg);
 float glare=exp(-d2*3.)*.3+exp(-d2*14.)*.34+exp(-d2*70.)*.4+exp(-abs(p.y-gc.y)*30.)*exp(-abs(p.x-gc.x)*2.2)*.14;
 glare*=uGlare*(.92+.08*sin(uTime*.7));
 vec2 at=mix(vec2(.5*a,.42),tgt,uTurn);float wd=mix(.36,uWidth,uTurn);
 vec2 ax=normalize(at-src);vec2 v=p-src;float Lv=length(v);float ang=acos(clamp(dot(v/Lv,ax),-1.,1.));
 float cone=smoothstep(wd,wd*.3,ang);float along=dot(v,ax)/length(at-src);
 cone*=smoothstep(0.,.2,along)*(1.-smoothstep(1.,1.6,along))*(1.-.35*along);
 float fringe=max(smoothstep(wd*1.35,wd*.95,ang)-smoothstep(wd*.95,wd*.55,ang),0.);
 vec2 q=(p-tgt)/vec2(.34*uPow,.08*uPow);float pool=exp(-dot(q,q));
 mat2 R=mat2(.8,-.6,.6,.8);float sp=n(R*p*84.+vec2(uTime*.35,-uTime*.7));float sp2=n(R*R*p*47.-vec2(uTime*.2,uTime*.45));
 float dust=smoothstep(.78,.97,sp)*.9+smoothstep(.8,.98,sp2)*.6+n(p*5.+vec2(0.,-uTime*.06))*.35;
 float beam=cone*(.22+.55*dust)*mix(.75,1.,uTurn)+pool*.42*uTurn;
 vec2 tc=clamp(uv,uText.xy,uText.zw);float td=length((uv-tc)*vec2(a,1.));float tf=mix(.55,1.,smoothstep(0.,.32,td));
 vec3 gold=mix(vec3(.87,.69,.31),vec3(.99,.97,.69),clamp(cone*1.3+pool*.6,0.,1.));
 vec3 col=(gold*beam+vec3(1.,.96,.86)*glare)*tf+vec3(.24,.28,.38)*fringe*.12*uTurn;
 col+=(h(uv*uRes+fract(uTime))-.5)*.018;
 gl_FragColor=vec4(max(col,0.),1.);}`;
let flipState = null;
function initFlip() {
  const flip = document.getElementById('flip'); if (!flip) return;
  const stage = document.getElementById('stage'), cv = document.getElementById('beam');
  const phs = [...stage.querySelectorAll('.ph')], pains = [...document.querySelectorAll('#pains li')], words = [...document.querySelectorAll('#ladder span')];
  const prof = document.getElementById('mProfile'), vid = document.getElementById('mVideo'), ctr = document.getElementById('ctr');
  if (STATIC) { root.classList.add('nogl'); return; }
  let gl = null, U_ = {};
  try { gl = cv.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: true, powerPreference: 'low-power' }); } catch (e) {}
  if (gl) {
    const sh = (ty, s) => { const o = gl.createShader(ty); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(o); return o; };
    try {
      const pr = gl.createProgram();
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}'));
      gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      ['uRes', 'uTime', 'uGlare', 'uTurn', 'uWidth', 'uSide', 'uPow', 'uPool', 'uText'].forEach(k => U_[k] = gl.getUniformLocation(pr, k));
    } catch (e) { console.warn('beam shader', e); gl = null; }
  }
  if (!gl) root.classList.add('nogl'); else root.classList.remove('nogl');
  // a lost context (driver reset, headless software GL) falls back to the CSS beam, never a blank canvas
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); gl = null; root.classList.add('nogl'); });
  const scale = phone() ? .45 : .42;
  const size = () => { cv.width = Math.max(2, Math.round(stage.clientWidth * scale)); cv.height = Math.max(2, Math.round(stage.clientHeight * scale)); gl && gl.viewport(0, 0, cv.width, cv.height); };
  size(); addEventListener('resize', size);
  const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ramp = (p, a, b) => cl((p - a) / (b - a));
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const band = (p, a, b, c, d) => ramp(p, a, b) * (1 - ramp(p, c, d));
  const W = [[-1, -1, .06, .12], [.10, .14, .34, .38], [.38, .42, .60, .64], [.64, .68, .80, .84], [.84, .88, 9, 9]];
  let videoOn = false;
  const loadVideo = () => { if (videoOn) return; videoOn = true; const m = phone() ? 'm' : 'd';
    vid.poster = `img/stage-${m}.webp`;
    vid.innerHTML = `<source src="video/stage-${m}.webm" type="video/webm"><source src="video/stage-${m}.mp4" type="video/mp4">`; vid.load(); vid.play().catch(() => {}); };
  let p = 0, txt = [0, 0, 0, 0], inView = true, t0 = performance.now(), last = 0;
  const io = new IntersectionObserver(es => { inView = es[0].isIntersecting; if (inView) loop(); }, { rootMargin: '100px' }); io.observe(flip);
  function update() {
    const r = flip.getBoundingClientRect(); p = cl(-r.top / (flip.offsetHeight - innerHeight));
    let act = 0, best = -1;
    phs.forEach((el, i) => { const [a, b, c, d] = W[i]; const o = i === 0 ? 1 - ramp(p, c, d) : band(p, a, b, c, d);
      el.style.opacity = o.toFixed(3); el.classList.toggle('on', o > .02); el.style.transform = `translateY(${((1 - o) * (i === 0 ? -16 : 16)).toFixed(1)}px)`; if (o > best) { best = o; act = i; } });
    ctr.textContent = '0' + (act + 1);
    const step = (p - .14) / .04;
    pains.forEach((li, i) => { li.classList.toggle('lit', step >= i && step < i + 1.6); li.classList.toggle('done', step >= i + 1.6); });
    words.forEach((w, i) => { const q = ease(ramp(p, .42 + i * .02, .45 + i * .022)); w.style.transform = `translateY(${((1 - q) * 105).toFixed(1)}%)`; });
    const turn = ease(ramp(p, .22, .44));
    prof.style.opacity = (((phone() ? .86 : .62) + (phone() ? .14 : .38) * turn) * (1 - ramp(p, .38, .47))).toFixed(3);
    if (p > .2) loadVideo();
    stage.style.setProperty('--glare', (1 - ease(ramp(p, .24, .42))).toFixed(3)); stage.style.setProperty('--turn', turn.toFixed(3));
    stage.style.setProperty('--part', band(p, .62, .68, .82, .86).toFixed(3)); stage.style.setProperty('--chk', ramp(p, .84, .9).toFixed(3));
    vid.style.opacity = (ramp(p, .38, .47) * (1 - .78 * ramp(p, .62, .68)) * (1 - .6 * ramp(p, .82, .88))).toFixed(3);
    const box = phs[act].querySelector('.inner');
    if (box) { const b = box.getBoundingClientRect(), sw = stage.clientWidth, sh2 = stage.clientHeight;
      txt = [b.left / sw, 1 - b.bottom / sh2, b.right / sw, 1 - b.top / sh2]; }
  }
  function draw(now) {
    if (!gl) return; const tm = (now - t0) / 1000;
    const turn = ease(ramp(p, .22, .44)), part = band(p, .62, .68, .82, .86), chk = ramp(p, .84, .9);
    const rtl = root.dir === 'rtl';
    let px = .56, py = .3, w = .17, pw = 1;
    if (phone()) { px = .5; py = .32; }
    px = px + (.5 - px) * part; py = py + (.3 - py) * part; w = w + (.3 - w) * part; pw = 1 + .9 * part;
    py = py + (.36 - py) * chk; px = px + (.5 - px) * chk; w = w + (.07 - w) * chk; pw = pw + (.5 - pw) * chk;
    if (!rtl) px = 1 - px;
    gl.uniform2f(U_.uRes, cv.width, cv.height); gl.uniform1f(U_.uTime, tm);
    gl.uniform1f(U_.uGlare, (1 - ease(ramp(p, .24, .42))) * (phone() ? .62 : 1)); gl.uniform1f(U_.uTurn, turn);
    gl.uniform1f(U_.uWidth, w); gl.uniform1f(U_.uSide, rtl ? 1 : 0); gl.uniform1f(U_.uPow, pw);
    gl.uniform2f(U_.uPool, px, py); gl.uniform4f(U_.uText, txt[0], txt[1], txt[2], txt[3]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  let raf = 0;
  function loop(now = performance.now()) {
    cancelAnimationFrame(raf); if (!inView || document.hidden || !document.getElementById('flip')) return;
    if (now - last > 32) { last = now; update(); draw(now); }   // 30 fps: a light piece, and software GL keeps its context
    raf = requestAnimationFrame(loop);
  }
  document.addEventListener('visibilitychange', () => loop());
  flipState = { stop: () => { cancelAnimationFrame(raf); io.disconnect(); } };
  update(); draw(performance.now()); loop();
}

// ---------- shared interactions ----------
function wire() {
  document.querySelectorAll('[data-door]').forEach(d => { const b = d.querySelector('.door-btn');
    b.onclick = () => { const o = !d.classList.contains('open'); d.classList.toggle('open', o); b.setAttribute('aria-expanded', o); }; });
  document.querySelectorAll('.qa button').forEach(b => b.onclick = () => { const q = b.parentElement, o = !q.classList.contains('open');
    q.classList.toggle('open', o); b.setAttribute('aria-expanded', o); });
  document.querySelectorAll('[data-slider]').forEach(s => {
    const sl = [...s.querySelectorAll('.slide')], it = [...s.querySelectorAll('.item')], dots = [...s.querySelectorAll('.dots button')];
    let i = 0, tm; const go = n => { i = (n + sl.length) % sl.length; sl.forEach((e, k) => e.classList.toggle('on', k === i)); it.forEach((e, k) => e.classList.toggle('on', k === i)); dots.forEach((e, k) => e.setAttribute('aria-current', k === i)); };
    dots.forEach(d => d.onclick = () => { go(+d.dataset.go); clearInterval(tm); });
    let x0 = null; const sw = s.querySelector('.slides');
    sw.addEventListener('pointerdown', e => x0 = e.clientX); sw.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { go(i + ((dx < 0) === (root.dir === 'rtl') ? -1 : 1)); clearInterval(tm); } });
    if (!STATIC) tm = setInterval(() => go(i + 1), 6500);
  });
  const par = document.querySelector('[data-par]');
  if (par && !STATIC) { const f = () => { if (!document.contains(par)) return removeEventListener('scroll', f); if (phone()) { par.style.transform = ''; return; }
      const r = par.parentElement.getBoundingClientRect(), k = cl01((innerHeight - r.top) / (innerHeight + r.height)); par.style.transform = `translateY(${(32 - 64 * k).toFixed(1)}px)`; };
    addEventListener('scroll', f, { passive: true }); f(); }
  document.querySelectorAll('[data-vid]').forEach(b => b.addEventListener('click', () => openVid(b.dataset.vid, b.dataset.vert)));
}
const cl01 = x => Math.min(1, Math.max(0, x));
function openVid(id, vert) {
  const v = VIDS[id]; if (!v) return; const lb = document.getElementById('lb'), opener = document.activeElement;
  lb.classList.toggle('vert', !!vert);
  lb.innerHTML = `<button class="x" type="button">${esc(X.nav.close)}</button><div class="box"><iframe src="https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&rel=0" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div><p class="cap">${esc(v.title)}</p>`;
  lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(() => { lb.innerHTML = ''; }, 320); opener && opener.focus(); };
  lb.querySelector('.x').onclick = close; lb.querySelector('.x').focus();
  lb.onclick = e => { if (e.target === lb) close(); };
  lb.onkeydown = e => { if (e.key === 'Escape') close(); if (e.key === 'Tab') trap(e, lb); };
}

// ---------- route pages ----------
const rhero = (title, lead, pic_, alt, short) => `<header class="rhero${short ? ' short' : ''}">${pic_ ? pic(pic_, pic_ + '-m', alt, 'pic', false) : ''}<div class="wrap"><h1>${t(title)}</h1>${lead ? `<p class="lead">${t(lead)}</p>` : ''}</div></header>`;
const endcall = (heading, kind) => `<section class="endcall"><div class="wrap"><h2>${t(heading)}</h2><div class="acts">${kind === 'book' ? bookBtn() : goldCheck(X.cta.check)}${waBtn(kind === 'book' ? svc('clarity-session').ctaText : X.msg.whatsapp_prefill)}</div></div></section>`;
const HEB = /[\u0590-\u05FF]/;
const vlabel = v => { const c = v.case && T.caseStudies.find(x => x.slug === v.case); if (c) return c.client + ' · ' + c.title;
  const d = T.videos.find(x => x.video === 'dossier:' + v.id); if (d) return d.description;
  if (L !== 'en' || !HEB.test(v.label)) return v.label;
  // English page, Hebrew-only film title: the client's English name from the copy, else the Latin words of the title
  const ALIAS = { 'פיליפ מוריס': 'Philip Morris' };   // a Hebrew spelling of a client whose copy name is Latin
  const al = Object.keys(ALIAS).find(k => v.label.includes(k)); if (al) return ALIAS[al];
  const i = COPY.he.clientLogos.findIndex(l => v.label.includes(l.name)); if (i > -1) return T.clientLogos[i].name;
  return v.label.replace(/[\u0590-\u05FF\-]+/g, ' ').trim() || T.businessName; };
const vcard = v => VIDS[v.id] ? `<button class="vcard" type="button" data-vid="${v.id}" ${VIDS[v.id].vert ? 'data-vert="1"' : ''}>${img('v-' + v.id.slice(4), v.caption || v.label)}<span class="pi">${ICON.play}</span><span class="cap">${t(v.caption || vlabel(v))}</span></button>` : '';
const FILM_IMG = { ...Object.fromEntries(['043', '046', '067', '052', '049', '018', '016', '035', '019', '053', '021', '006', '002', '041', '039', '045'].map(i => ['vid-' + i, 'film-' + i])), 'vid-038': 'case-038', 'vid-022': 'case-022', 'vid-055': 'case-055', 'vid-020': 'case-020', 'vid-060': 'film-060', 'vid-042': 'film-042', 'vid-013': 'film-013', 'vid-058': 'film-058', 'vid-024': 'film-024', 'vid-027': 'film-027', 'vid-036': 'stage-d' };
const fcard = v => `<button class="fcard${FILM_IMG[v.id] ? '' : ' noposter'}" type="button" data-vid="${v.id}">${FILM_IMG[v.id] ? img(FILM_IMG[v.id], vlabel(v)) : ''}<span class="cap"${FILM_IMG[v.id] ? '' : ' style="position:static;background:none;padding:0"'}>${t(vlabel(v))}</span></button>`;

function trackPage(k) {
  const s = svc(k), P = X.pages[k], parts = s.body.split(/\n\n+/);
  const steps = X.method_steps, on = k === 'story' ? 7 : 10;
  const im = k === 'story' ? 'img-025' : 'img-029';
  return rhero(P.headline, s.summary, im, A[k === 'story' ? '025' : '029']) + `
  <section class="sec"><div class="wrap split">
    <div><span class="k">${t(s.title)}</span><h2 class="pain">${t(P.pain_heading)}</h2></div>
    <div>${paras(parts[0], 'lead')}</div></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap split">
    <div><h2 class="sec-t">${t(P.get_heading)}</h2><p class="lead">${t(parts[1] || '')}</p>
      <ul class="facts"><li><b>⏱</b><span>${t(s.format)}</span></li><li><b>→</b><span>${t(s.audience)}</span></li></ul>
      <div class="price-row"><b>${t(P.price_label)}</b><span>${t(P.price)}</span></div></div>
    <div><h2 class="sec-t">${t(P.method_heading)}</h2><p class="muted">${t(T.method.intro)}</p>
      <ol class="steps">${steps.map(m => `<li class="${m.n > on ? 'off' : ''}"><span class="n">${String(m.n).padStart(2, '0')}</span><span>${t(m.title)}</span></li>`).join('')}</ol></div></div></section>
  ${endcall(P.end_heading, 'check')}`;
}
function partnershipPage() {
  const s = svc('partnership'), P = X.pages.partnership, parts = s.body.split(/\n\n+/);
  return rhero(P.headline, s.summary, 'band', A['021']) + `
  <section class="sec"><div class="wrap split"><div><h2 class="pain">${t(P.pain_heading)}</h2></div>
    <div><p class="lead">${t(parts[0])}</p><p class="disp" style="font-size:clamp(28px,3vw,40px);margin:26px 0">${t(parts[1])}</p><p class="lead">${t(parts[2] || '')}</p></div></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap">
    <h2 class="sec-t">${t(P.how_heading)}</h2>
    <div class="sheet"><div class="cell"><span class="fn">1 / 3</span><h3>${t(s.format)}</h3></div>
      <div class="cell"><span class="fn">2 / 3</span><h3>${t(P.capacity)}</h3></div>
      <div class="cell"><span class="fn">3 / 3</span><h3>${t(P.price_label)}</h3><p>${t(P.price)}</p></div></div>
    <h2 class="sec-t" style="margin-top:80px">${t(P.who_heading)}</h2><p class="lead">${t(s.audience)}</p></div></section>
  ${endcall(P.end_heading, 'book')}`;
}
function workPage(slug) {
  const P = X.pages.work;
  if (slug) {
    const c = T.caseStudies.find(x => x.slug === slug); if (!c) return notFound();
    const film = CASE_FILM(slug), did = P.case_what_we_did[slug] || '';
    return `<header class="rhero">${img(CASE_IMG[slug], c.title, 'pic', 0, 0, false)}<div class="wrap"><span class="k">${t(c.sector)}</span><h1>${t(c.client)}</h1><p class="lead">${t(c.title)}</p>
      ${film ? `<button class="btn btn-ghost" type="button" data-vid="${film}">${ICON.play} ${t(X.cta.watch)}</button>` : ''}</div></header>
    <section class="sec"><div class="wrap"><div class="case-parts">
      <div class="split"><h2>${t(P.case_sections.before)}</h2><div>${paras(c.challenge)}</div></div>
      <div class="split"><h2>${t(P.case_sections.did)}</h2><div>${paras(did)}</div></div>
      <div class="split"><h2>${t(P.case_sections.after)}</h2><div><p class="disp" style="font-size:clamp(26px,2.8vw,40px);line-height:1.3;color:#fff">${t(c.outcome)}</p></div></div>
    </div></div></section>${endcall(P.end_heading, 'book')}`;
  }
  const F = P.filter, map = { 'ארגונים': 'organisations', 'יזמים': 'entrepreneurs', 'מותגים': 'brands', Organisations: 'organisations', Entrepreneurs: 'entrepreneurs', Brands: 'brands' };
  return rhero(P.headline, P.intro, null, '', true) + `<section class="sec" style="padding-top:20px"><div class="wrap">
    <p class="pain" style="max-width:30ch">${t(P.pain)}</p>
    <div class="chips" role="group">${Object.entries(F).map(([k, v], i) => `<button type="button" aria-pressed="${!i}" data-f="${k}">${t(v)}</button>`).join('')}</div>
    <div class="wall">${T.caseStudies.filter(c => c.published).map(c => `<a class="print" data-s="${map[c.sector] || ''}" href="${href('work/' + c.slug)}">${img(CASE_IMG[c.slug], c.title)}<span class="t"><b>${t(c.client)}</b><span>${t(c.title)}</span></span></a>`).join('')}</div>
    <h2 class="sec-t" style="margin-top:110px">${t(P.voices_heading)}</h2><p class="lead">${t(P.voices_intro)}</p>
    <div class="voices">${X.video_library.voices.filter(v => !v.page).map(vcard).join('')}</div></div></section>${endcall(P.end_heading, 'book')}`;
}
function aboutPage() {
  const P = X.pages.about, tal = T.team[0], sh = T.team[1], cb = T.copyBlocks[3].body.split(/\n\n+/);
  return rhero(P.headline, T.copyBlocks[3].heading, null, '', true) + `<section class="sec" style="padding-top:20px"><div class="wrap">
    <p class="lead">${t(cb[0])}</p>
    <div class="pair">
      <div class="bio"><div class="frame">${img('tal-001-p', A.tal001, '', 408, 510)}</div><h3>${t(tal.name)}</h3><p class="role">${t(tal.role)}</p><p>${t(tal.bio)}</p></div>
      <div class="bio"><div class="frame coming"><div class="lbl"><span class="ini">${L === 'he' ? 'ש״נ' : 'SN'}</span>${t(sh.name)}<span>${esc(U.portrait)}</span></div></div>
        <h3>${t(sh.name)}</h3><p class="role">${t(sh.role)}</p><p>${t(sh.bio)}</p>
        <div class="strip">${img('work-107', A.w107)}${img('work-110', A.w110)}${img('work-105', A.w105)}</div><p class="strip-n">${t(X.home.proof.nbc_note)}</p></div></div>
    <div class="split" style="margin-top:100px"><div><h2 class="sec-t">${t(P.tal_brings_label)}</h2><h2 class="sec-t">${t(P.shahar_brings_label)}</h2></div><p class="lead">${t(cb[1] || '')}</p></div>
    <h2 class="sec-t" style="margin-top:100px">${t(X.pages.work.voices_heading)}</h2>
    <div class="voices">${X.video_library.voices.slice(0, 5).map(vcard).join('')}</div></div></section>${endcall(P.end_heading, 'book')}`;
}
function brandsPage() {
  const P = X.pages.brands, f = P.form, craft = svc('craft');
  const fld = (id, label, type = 'text', ac = '') => `<label class="fld"><input id="b-${id}" type="${type}" placeholder=" " ${ac ? `autocomplete="${ac}"` : ''} required><label for="b-${id}">${t(label)}</label><span class="err"></span></label>`;
  return rhero(P.headline, P.solution, 'img-014', A['014']) + `<section class="sec"><div class="wrap split"><h2 class="pain">${t(P.pain)}</h2><p class="lead">${t(P.solution)}</p></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap"><h2 class="sec-t">${t(P.films_heading)}</h2>
    <div class="films">${X.video_library.proof.filter(v => v.page === 'brands' || ['vid-038', 'vid-022'].includes(v.id)).map(fcard).join('')}</div>
    <div class="split" style="margin-top:110px"><div><h2 class="sec-t">${t(P.services_heading)}</h2><p class="lead">${t(craft.summary)}</p><p class="muted">${t(craft.body)}</p></div>
    <form class="blk" novalidate data-form><h2>${t(f.heading)}</h2><div class="fields two">${fld('name', f.name, 'text', 'name')}${fld('co', f.company, 'text', 'organization')}${fld('role', f.role)}${fld('mail', f.email, 'email', 'email')}${fld('tel', f.phone, 'tel', 'tel')}</div>
      <div class="fields" style="margin-top:12px"><label class="fld"><textarea id="b-need" placeholder=" " required></textarea><label for="b-need">${t(f.need)}</label><span class="err"></span></label></div>
      <div class="navrow"><span class="need">${esc(U.mock)}</span><button class="btn btn-gold" type="submit">${t(f.submit)}</button></div><p class="ok" aria-live="polite"></p></form></div></div></section>`;
}
function watchPage() {
  const P = X.pages.watch, lib = X.video_library;
  const items = { flip: lib.flip, two_chairs: lib.two_chairs, boots: lib.boots, proof: lib.proof.filter(v => v.case).slice(0, 8), headlights: lib.headlights, voices: lib.voices };
  const first = (P.series.find(s => (items[s.key] || []).length) || P.series[0]).key;
  return rhero(P.headline, P.intro, null, '', true) + `<section class="sec" style="padding-top:10px"><div class="wrap">
    <p class="pain" style="max-width:30ch">${t(P.pain)}</p>
    <div class="series"><div class="tabs" role="tablist">${P.series.map((s, i) => `<button type="button" role="tab" id="tab-${s.key}" aria-selected="${s.key === first}" aria-controls="pan-${s.key}" tabindex="${s.key === first ? 0 : -1}">${t(s.name)}</button>`).join('')}</div>
    <div>${P.series.map((s, i) => { const v = items[s.key] || [];
      return `<div role="tabpanel" id="pan-${s.key}" aria-labelledby="tab-${s.key}" ${s.key !== first ? 'hidden' : ''}><p class="lead" style="margin-top:0">${t(s.line)}</p>
        ${v.length ? `<div class="voices">${v.map(x => VIDS[x.id] && ['vid-007', 'vid-004', 'vid-011', 'vid-012', 'vid-048', 'vid-059', 'vid-010', 'vid-040', 'vid-009', 'vid-030'].includes(x.id) ? vcard(x) : `<button class="vcard" type="button" data-vid="${x.id}">${FILM_IMG[x.id] ? `<img src="img/${FILM_IMG[x.id]}.webp" alt="${esc(vlabel(x))}" loading="lazy" style="object-position:50% 50%">` : ''}<span class="pi">${ICON.play}</span><span class="cap">${t(vlabel(x))}</span></button>`).join('')}</div>` : `<div class="empty">${t(P.empty_series)}</div>`}
        <div style="margin-top:28px">${goldCheck(P.after_video)}</div></div>`; }).join('')}</div></div></div></section>${endcall(X.home.final.heading, 'check')}`;
}
function coursePage() {
  const P = X.pages.course, s = svc('course'), lib = X.video_library;
  return rhero(P.headline, s.summary, 'stage', A.stage) + `<section class="sec"><div class="wrap split"><h2 class="pain">${t(P.pain)}</h2>
    <div><p class="lead">${t(s.body)}</p><ul class="facts"><li><b>⏱</b><span>${t(s.format)}</span></li><li><b>→</b><span>${t(s.audience)}</span></li></ul>
    <button class="btn btn-ghost" type="button" data-vid="vid-036">${ICON.play} ${t(lib.course_trailer.label)}</button></div></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap split"><div><h2 class="sec-t">${t(P.lessons_heading)}</h2><div class="price-row"><b>${t(P.price_label)}</b><span>${t(P.price)}</span></div>
    <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-gold" href="#/course" onclick="return false">${t(X.cta.buy_course)} ${arr}</a>${waBtn(s.ctaText)}</div></div>
    <ol class="steps">${X.method_steps.map(m => `<li><span class="n">${String(m.n).padStart(2, '0')}</span><span>${t(m.title)}</span></li>`).join('')}</ol></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap"><h2 class="sec-t">${t(P.voices_heading)}</h2><div class="voices">${lib.voices.filter(v => v.page === 'course').map(vcard).join('')}</div></div></section>`;
}

// ---------- the Check: the sitting ----------
const ss = { get: () => { try { return JSON.parse(sessionStorage.getItem('tl-check') || '{}'); } catch (e) { return {}; } }, set: o => { try { sessionStorage.setItem('tl-check', JSON.stringify(o)); } catch (e) {} } };
function checkPage(step) {
  const C = X.pages.check, Q = C.questions, ans = ss.get();
  const n = step === 'contact' ? 11 : +step || 0;
  const prog = `<div class="prog" aria-hidden="true"><i style="width:${Math.min(100, (Math.min(n, 10) / 10) * 100)}%"></i></div>`;
  if (!n) return `<div class="sit"><div class="card qin" style="text-align:center"><span class="eyebrow metal" lang="en" dir="ltr">Success is Beautiful</span>
    <h1 style="margin-top:14px">${t(C.intro.title)}</h1><p class="lead" style="margin:0 auto 14px">${t(svc('spotlight-check').body)}</p><p class="muted">${t(C.intro.meta)}</p>
    <div style="margin-top:28px"><a class="btn btn-gold" href="#/check/1">${t(C.intro.start)} ${arr}</a></div></div></div>${prog}`;
  if (n === 11) return `<div class="sit"><span class="fc"><b>✓</b></span><form class="card qin" novalidate data-contact><h1>${t(C.contact.title)}</h1>
    <div class="fields">${[['name', X.form.name, 'text', 'name'], ['mail', X.form.email, 'email', 'email'], ['tel', X.form.phone, 'tel', 'tel']].map(([id, l, ty, ac]) => `<label class="fld"><input id="c-${id}" type="${ty}" autocomplete="${ac}" placeholder=" " required value="${esc(ans['c-' + id] || '')}"><label for="c-${id}">${t(l)}</label><span class="err" aria-live="polite"></span></label>`).join('')}
    <label class="cbox"><input type="checkbox" id="c-ok" required ${ans['c-ok'] ? 'checked' : ''}><span>${t(C.contact.consent)}</span></label><span class="err" id="c-ok-err" aria-live="polite" style="color:#ffb4a6;font-size:13px"></span></div>
    <div class="navrow"><a class="btn btn-ghost" href="#/check/10">${t(X.cta.back)}</a><button class="btn btn-gold" type="submit">${t(C.contact.submit)} ${arr}</button></div></form></div>${prog}`;
  const q = Q[n - 1], v = ans['q' + n];
  let field = '';
  if (q.input === 'text' || q.input === 'textarea') {
    const tag = q.input === 'text' ? `<input id="qf" type="text" placeholder=" " value="${esc(v || '')}">` : `<textarea id="qf" placeholder=" ">${esc(v || '')}</textarea>`;
    field = `<label class="fld">${tag}<label for="qf">${t(q.q)}</label></label>${q.none ? `<label class="cbox" style="margin-top:14px"><input type="checkbox" id="qnone" ${ans['q' + n + 'none'] ? 'checked' : ''}><span>${t(q.none)}</span></label>` : ''}`;
  } else if (q.input === 'single' || q.input === 'multi') {
    const multi = q.input === 'multi', sel = multi ? (v || []) : v;
    field = `<div class="opts" role="${multi ? 'group' : 'radiogroup'}" aria-label="${esc(q.q)}">${q.options.map(o => `<button type="button" class="opt" ${multi ? `aria-pressed="${sel.includes(o)}"` : `role="radio" aria-checked="${sel === o}"`} data-o="${esc(o)}"><span class="ck" aria-hidden="true"></span><span>${t(o)}</span></button>`).join('')}</div>`;
  } else if (q.input === 'budget_when') {
    field = `<p class="k">${t(q.budget)}</p><div class="opts" role="radiogroup" aria-label="${esc(q.q)}">${q.when.map(o => `<button type="button" class="opt" role="radio" aria-checked="${v === o}" data-o="${esc(o)}"><span class="ck" aria-hidden="true"></span><span>${t(o)}</span></button>`).join('')}</div>`;
  }
  return `<div class="sit"><span class="fc" aria-hidden="true"><b>${String(n).padStart(2, '0')}</b> / 10</span>
    <div class="card qin" data-q="${n}"><p class="sr">${t(C.progress.replace('{n}', n))}</p><h1 id="qh">${t(q.q)}</h1>${q.hint ? `<p class="hint">${t(q.hint)}</p>` : ''}${field}
    <div class="navrow"><a class="btn btn-ghost" href="#/check/${n - 1}">${t(X.cta.back)}</a><span class="need" id="need" aria-live="polite"></span><a class="btn btn-gold" id="next" href="#/check/${n === 10 ? 'contact' : n + 1}">${t(X.cta.next)} ${arr}</a></div></div></div>${prog}`;
}
function wireCheck() {
  const card = document.querySelector('[data-q]'), ans = ss.get();
  if (card) {
    const n = +card.dataset.q, q = X.pages.check.questions[n - 1], next = document.getElementById('next'), need = document.getElementById('need');
    const ok = () => { const v = ans['q' + n]; return q.optional || (Array.isArray(v) ? v.length : (v && String(v).trim())) || ans['q' + n + 'none']; };
    const sync = () => { const good = !!ok(); next.toggleAttribute('aria-disabled', !good); next.style.opacity = good ? 1 : .35; need.textContent = good ? '' : X.pages.check.answer_to_continue; ss.set(ans); };
    const f = document.getElementById('qf'); if (f) { f.oninput = () => { ans['q' + n] = f.value; sync(); }; }
    const none = document.getElementById('qnone'); if (none) none.onchange = () => { ans['q' + n + 'none'] = none.checked; sync(); };
    card.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (b.hasAttribute('aria-pressed')) { const a = new Set(ans['q' + n] || []); a.has(b.dataset.o) ? a.delete(b.dataset.o) : a.add(b.dataset.o); ans['q' + n] = [...a]; b.setAttribute('aria-pressed', a.has(b.dataset.o)); }
      else { ans['q' + n] = b.dataset.o; card.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-checked', x === b)); }
      sync(); });
    next.onclick = e => { if (!ok()) { e.preventDefault(); need.textContent = X.pages.check.answer_to_continue; } };
    sync(); (f || card.querySelector('.opt') || next).focus({ preventScroll: true });
  }
  const form = document.querySelector('[data-contact]');
  if (form) form.onsubmit = e => { e.preventDefault(); let good = true;
    form.querySelectorAll('input:not([type=checkbox])').forEach(i => { ans[i.id] = i.value; const er = i.parentElement.querySelector('.err');
      let m = !i.value.trim() ? X.form.required : (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)) ? X.form.invalid_email : (i.type === 'tel' && i.value.replace(/\D/g, '').length < 9) ? X.form.invalid_phone : '';
      er.textContent = m; if (m) good = false; });
    const c = document.getElementById('c-ok'); ans['c-ok'] = c.checked; document.getElementById('c-ok-err').textContent = c.checked ? '' : X.form.required; if (!c.checked) good = false;
    ss.set(ans); if (good) location.hash = '#/thanks'; else form.querySelector('.err:not(:empty)')?.previousElementSibling?.previousElementSibling?.focus(); };
  document.querySelectorAll('[data-form]').forEach(f => f.onsubmit = e => { e.preventDefault(); let good = true;
    f.querySelectorAll('input,textarea').forEach(i => { const er = i.parentElement.querySelector('.err'); const m = !i.value.trim() ? X.form.required : (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)) ? X.form.invalid_email : ''; if (er) er.textContent = m; if (m) good = false; });
    f.querySelector('.ok').textContent = good ? X.form.success : ''; });
}
const firstName = () => (ss.get()['c-name'] || '').trim().split(/\s+/)[0];
const bizName = () => (ss.get().q1 || '').split(/[,،.\n]/)[0].trim();
function thanksPage() {
  const P = X.pages.thanks, fn = firstName(), lib = X.video_library;
  return `<div class="sit"><div class="card" style="text-align:center;max-width:980px">
    <h1 class="develop">${fn ? t(P.title.replace('{first_name}', fn)) : t(P.title)}</h1><p class="lead" style="margin:0 auto 50px">${t(P.body)}</p>
    <p class="k">${t(P.meanwhile)}</p><div class="voices" style="text-align:start">${[lib.boots[0], ...lib.voices.slice(0, 3)].map(v => VIDS[v.id] && FILM_IMG[v.id] ? `<button class="vcard" type="button" data-vid="${v.id}">${img(FILM_IMG[v.id], vlabel(v))}<span class="pi">${ICON.play}</span><span class="cap">${t(vlabel(v))}</span></button>` : vcard(v)).join('')}</div>
    <p style="margin-top:40px"><a class="btn btn-ghost" href="#/snapshot">${esc(U.sample)} ${arr}</a></p></div></div>`;
}
function snapshotPage() {
  const P = X.pages.snapshot, b = bizName();
  const demo = [3, 2, 4, 2, 1]; // mock reading for the layout; marked as an example below
  return `<div class="printpage"><article class="sheetp">
    <p class="k">${esc(U.sample)}</p><h1>${b ? t(b) : t(P.title)}</h1><p class="intro">${t(P.intro)}</p>
    <h2>${t(P.scores_title)} <span class="k" style="display:inline;font-family:var(--body);font-size:14px">${t(P.scale)}</span></h2>
    <div class="scores">${P.dimensions.map((d, i) => `<div class="score"><span class="nm">${t(d.name)}</span><span class="strips" role="img" aria-label="${esc(d.name)} ${demo[i]} / 5">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= demo[i] ? 'on' : ''}" style="transition-delay:${i * 120 + k * 60}ms"></i>`).join('')}</span><span class="val">${demo[i]}</span><span class="q">${t(d.q)}</span></div>`).join('')}</div>
    <h2>${t(P.noticed_title)}</h2><div class="obs">${[1, 2, 3].map(i => `<div><span class="tbd">{observation_${i}}</span></div>`).join('')}</div>
    <h2>${t(P.first_move_title)}</h2><p style="margin:0 0 50px"><span class="tbd">{first_move}</span></p>
    <h2>${t(P.path_title)}</h2><div class="pathcard"><b>${t(P.paths.story)}</b><span style="color:#bbb">${t(svc('story').format)}</span></div>
    <div class="signed"><img src="img/sig-black.svg" alt="" onerror="this.remove()"><span>${t(P.signed)}</span></div>
    <p style="margin:0 0 18px;color:#333">${t(P.cta_line)}</p>${bookBtn()}
  </article></div>`;
}
function bookPage() {
  const P = X.pages.book, s = svc('clarity-session'), ph = X.placeholders;
  const days = []; for (let d = new Date(), i = 0; days.length < 5 && i < 14; i++) { d = new Date(d); d.setDate(d.getDate() + 1); if (d.getDay() < 5) days.push(d); }
  const fmtD = d => new Intl.DateTimeFormat(L === 'he' ? 'he-IL' : 'en-GB', { weekday: 'short' }).format(d);
  const slots = ['09:30', '11:00', '13:00', '15:30', '17:00', '19:00'];
  const fld = (id, l, ty = 'text', ac = '', extra = '') => `<label class="fld"><input id="k-${id}" type="${ty}" placeholder=" " ${ac ? `autocomplete="${ac}"` : ''} ${extra} required><label for="k-${id}">${t(l)}</label><span class="err"></span></label>`;
  return rhero(P.title, s.summary, null, '', true) + `<section class="sec" style="padding-top:0"><div class="wrap"><form class="call" novalidate data-book>
    <div>
      <div class="blk"><h2><span class="n">01</span>${t(P.step_time)}</h2><div class="week" role="group">${days.map((d, i) => `<button type="button" class="day" aria-pressed="${i === 1}" data-d="${d.toISOString().slice(0, 10)}">${esc(fmtD(d))}<b>${d.getDate()}</b></button>`).join('')}</div>
        <div class="slots" role="group">${slots.map((x, i) => `<button type="button" class="slot" aria-pressed="${i === 1}">${x}</button>`).join('')}</div><p class="note">${esc(U.exslots)}</p></div>
      <div class="blk"><h2><span class="n">02</span>${t(P.step_details)}</h2><div class="fields">${fld('name', X.form.name, 'text', 'name')}<div class="fields two">${fld('mail', X.form.email, 'email', 'email')}${fld('tel', X.form.phone, 'tel', 'tel')}</div></div></div>
      <div class="blk"><h2><span class="n">03</span>${t(P.step_pay)}</h2><span class="mockpay">${esc(U.expay)}</span>
        <div class="fields">${fld('card', U.card, 'text', 'off', 'inputmode="numeric"')}<div class="fields two">${fld('exp', U.exp, 'text', 'off')}${fld('cvc', U.cvc, 'text', 'off', 'inputmode="numeric"')}</div></div></div>
    </div>
    <aside class="blk summary"><h2>${t(s.title)}</h2><dl><dt>${esc(U.len)}</dt><dd>${t(ph.session_length)}</dd><dt>${esc(U.price)}</dt><dd>${t(ph.price_session)}</dd><dt>${esc(U.when)}</dt><dd id="when">—</dd><dt>${esc(U.credit)}</dt><dd>${t(s.body)}</dd></dl>
      <button class="btn btn-gold" type="submit">${t(P.pay_button)} ${arr}</button><p class="note">${esc(U.mock)}</p>
      <p style="margin-top:18px">${waBtn(s.ctaText)}</p></aside></form></div></section>`;
}
function wireBook() {
  const f = document.querySelector('[data-book]'); if (!f) return;
  const when = () => { const d = f.querySelector('.day[aria-pressed=true]'), s = f.querySelector('.slot[aria-pressed=true]');
    const dt = new Date(d.dataset.d); const txt = `${new Intl.DateTimeFormat(L === 'he' ? 'he-IL' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(dt)} · ${s.textContent}`;
    document.getElementById('when').textContent = txt; return [new Intl.DateTimeFormat(L === 'he' ? 'he-IL' : 'en-GB', { day: 'numeric', month: 'long' }).format(dt), s.textContent]; };
  f.querySelectorAll('.day,.slot').forEach(b => b.onclick = () => { f.querySelectorAll('.' + b.className.split(' ')[0]).forEach(x => x.setAttribute('aria-pressed', x === b)); when(); });
  when();
  f.onsubmit = e => { e.preventDefault(); let good = true;
    f.querySelectorAll('input').forEach(i => { const er = i.parentElement.querySelector('.err'); const m = !i.value.trim() ? X.form.required : (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)) ? X.form.invalid_email : ''; er.textContent = m; if (m) good = false; });
    if (good) { const [d, tm] = when(); try { sessionStorage.setItem('tl-booked', JSON.stringify({ d, tm })); } catch (x) {} location.hash = '#/booked'; }
    else f.querySelector('.err:not(:empty)').previousElementSibling.previousElementSibling.focus(); };
}
function bookedPage() {
  let b = {}; try { b = JSON.parse(sessionStorage.getItem('tl-booked') || '{}'); } catch (e) {}
  const P = X.pages.booked; let body = P.body; if (b.d) body = body.replace('{date}', b.d).replace('{time}', b.tm);
  return `<div class="sit"><div class="card" style="text-align:center"><h1 class="develop">${t(P.title)}</h1><p class="lead" style="margin:0 auto 34px">${t(body)}</p><a class="btn btn-ghost" href="#/">${t(X.cta.home)} ${arr}</a></div></div>`;
}
function legalPage(k) {
  const P = X.pages[k]; const body = k === 'accessibility' ? T.legal.accessibilityStatement + '\n\n' + T.legal.accessibilityContact : P.body;
  return rhero(P.title, '', null, '', true) + `<section class="sec" style="padding-top:0"><div class="wrap" style="max-width:780px">${paras(body, 'lead')}</div></section>`;
}
function notFound() {
  const P = X.pages.not_found;
  return `<div class="sit"><div class="card" style="text-align:center"><h1>${t(P.title)}</h1><p class="lead" style="margin:0 auto 30px">${t(P.body)}</p><a class="btn btn-gold" href="#/">${t(X.cta.home)} ${arr}</a></div></div>`;
}

// ---------- router ----------
function route(e, render = true) {
  flipState && flipState.stop(); flipState = null;
  const h = location.hash.replace(/^#\/?/, ''), [r, sub] = h.split('/');
  const main = document.getElementById('main');
  const seo = X.seo[r || 'home'] || X.seo.home;
  const pages = { '': home, story: () => trackPage('story'), launch: () => trackPage('launch'), partnership: partnershipPage, work: () => workPage(sub), about: aboutPage,
    brands: brandsPage, watch: watchPage, course: coursePage, check: () => checkPage(sub), thanks: thanksPage, snapshot: snapshotPage, book: bookPage, booked: bookedPage,
    privacy: () => legalPage('privacy'), accessibility: () => legalPage('accessibility') };
  if (render) main.innerHTML = (pages[r] || notFound)();
  root.classList.toggle('route-check', r === 'check');
  const bb = document.querySelector('#bar .btn-gold'); if (bb) { const bk = r === 'thanks' || r === 'snapshot';
    bb.setAttribute('href', href(bk ? 'book' : 'check')); bb.innerHTML = t(bk ? X.cta.book : X.nav.header_button); }
  document.title = seo.title; document.querySelector('meta[name=description]').content = seo.description;
  document.querySelectorAll('.nav a').forEach(a => a.toggleAttribute('aria-current', a.dataset.r === r) || a.removeAttribute('aria-current'));
  document.querySelectorAll('.nav a').forEach(a => a.dataset.r === r ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  document.getElementById('chip').style.display = r === 'check' ? 'none' : '';
  if (render) window.scrollTo(0, 0);
  if (PRERENDER) return;
  if (!r) initFlip();
  wire(); wireCheck(); wireBook(); wireTabs(); wireFilter();
  if (r && r !== 'check') main.querySelector('h1')?.setAttribute('tabindex', '-1');
  if (r && r !== 'check' && route.moved) main.querySelector('h1')?.focus({ preventScroll: true });
  route.moved = true;
  onScroll();
}
function wireTabs() {
  const tabs = [...document.querySelectorAll('.tabs [role=tab]')]; if (!tabs.length) return;
  const sel = b => { tabs.forEach(x => { const on = x === b; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; }); b.focus(); };
  tabs.forEach((b, i) => { b.onclick = () => sel(b); b.onkeydown = e => { const k = { ArrowDown: 1, ArrowUp: -1, ArrowLeft: root.dir === 'rtl' ? 1 : -1, ArrowRight: root.dir === 'rtl' ? -1 : 1 }[e.key]; if (k) { e.preventDefault(); sel(tabs[(i + k + tabs.length) % tabs.length]); } }; });
}
function wireFilter() {
  const bs = [...document.querySelectorAll('[data-f]')]; if (!bs.length) return;
  bs.forEach(b => b.onclick = () => { bs.forEach(x => x.setAttribute('aria-pressed', x === b));
    document.querySelectorAll('.print').forEach(p => p.classList.toggle('hide', b.dataset.f !== 'all' && p.dataset.s !== b.dataset.f)); });
}
function onScroll() { document.getElementById('hdr').classList.toggle('solid', scrollY > 40 && !(location.hash.replace(/^#\/?/, '') === '' && scrollY < (document.getElementById('flip')?.offsetHeight || 0) - innerHeight)); }
addEventListener('scroll', onScroll, { passive: true });
function boot() { T = COPY[L]; X = T.extras; U = UI[L]; A = ALT[L];
  // the Hebrew Home is already in the HTML (prerendered by build): enhance it in place on first boot
  const pre = !boot.done && !PRERENDER && L === 'he' && document.getElementById('main').dataset.pre === 'he' && !location.hash.replace(/^#\/?/, '');
  boot.done = true; chrome(!pre); route(null, !pre); root.classList.remove('wait-en'); }
addEventListener('hashchange', () => route());
addEventListener('keydown', e => { if (e.key === 'Escape') { const m = document.getElementById('menu'); if (m.classList.contains('open')) m.querySelector('.close').click(); } });
// fonts are inlined; wait for them (at most 700 ms) so the first layout is the final one (no shift)
Promise.race([Promise.all(['400 1em Bellefair', '400 1em Plex', '500 1em Plex'].map(f => document.fonts.load(f, 'אבג abc'))), new Promise(r => setTimeout(r, 400))]).then(boot, boot);
})();
