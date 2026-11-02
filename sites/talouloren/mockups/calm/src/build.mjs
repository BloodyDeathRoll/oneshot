// Builds dist/index.html for the talouloren calm mockup from the passed copy (copy/he.json + en.json).
// One file, hash routes. Hebrew is rendered into the DOM; English sits in a <template> and is swapped
// in by the language toggle. Usage: node sites/talouloren/mockups/calm/src/build.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const copyDir = join(here, '../../../copy')
const he = JSON.parse(readFileSync(join(copyDir, 'he.json'), 'utf8'))
const en = JSON.parse(readFileSync(join(copyDir, 'en.json'), 'utf8'))
// fonts inlined as data URIs (self-hosted, and they load from file:// too); files from make-media.sh
const css = readFileSync(join(here, 'page.css'), 'utf8').replace(/url\(fonts\/([a-z-]+\.woff2)\)/g, (_, f) =>
  `url(data:font/woff2;base64,${readFileSync(join(here, '../dist/fonts', f)).toString('base64')})`)
const js = readFileSync(join(here, 'page.js'), 'utf8')

// Interface labels the template owns (schema: "interface labels belong to the template").
const UI = {
  he: { film: 'הסרט', soon: 'בקרוב', portrait: 'צילום בדרך', portraitEn: 'Portrait coming', ledby: 'טל ושחר', demo: 'דוגמה',
    payDemo: 'תשלום לדוגמה', card: 'מספר כרטיס', exp: 'תוקף', cvc: 'CVC', session: 'פגישה', length: 'משך', price: 'מחיר', when: 'מועד',
    pick: 'בוחרים יום ושעה', closeFilm: 'סגירת הסרט', play: 'הפעלה', skip: 'דילוג לתוכן', snMade: 'מה שחר עושה', steps: 'שלבים',
    openMenu: 'פתיחת התפריט', pains: 'חמישה כאבים', budget: 'תקציב', start: 'מתי מתחילים', lang: 'he', other: 'en', dir: 'rtl',
    toShahar: 'לאתר של שחר', more: 'לפרטים', noEpisodes: 'אחרי הסרטון', read: 'לסיפור המלא', shTitle: 'טל אורן ושחר נאור' },
  en: { film: 'The film', soon: 'Soon', portrait: 'Portrait coming', portraitEn: 'צילום בדרך', ledby: 'Tal & Shahar', demo: 'Example',
    payDemo: 'Sample payment', card: 'Card number', exp: 'Expiry', cvc: 'CVC', session: 'Session', length: 'Length', price: 'Price', when: 'When',
    pick: 'Pick a day and a time', closeFilm: 'Close the film', play: 'Play', skip: 'Skip to content', snMade: 'What Shahar makes', steps: 'Steps',
    openMenu: 'Open the menu', pains: 'Five pains', budget: 'Budget', start: 'When to start', lang: 'en', other: 'he', dir: 'ltr',
    toShahar: "Shahar's site", more: 'Details', noEpisodes: 'After the video', read: 'Read the full story', shTitle: 'Tal Oren and Shahar Naor' },
}

const YT = Object.fromEntries(Object.entries({
  '001': '0J8i5Tvlztw', '002': '1ikpV4NPTOY', '004': '3RocZwVhmUA', '006': '9PoA_GZo7SY', '007': 'ATWRaeFv2Fk', '009': 'CCw5TYrMkdY',
  '010': 'ccyOcrzwUY0', '011': 'clzMDU8pogc', '012': 'ctGDSAsvv1A', '013': 'CYXYhGudBEs', '015': 'dFteLZPyKiM', '016': 'eedsf4vtOx8',
  '018': 'ffXXusMA4nY', '019': 'f--wex3ZqsE', '020': 'gCu6UgP9TXQ', '021': 'guhE-lmTy0A', '022': 'gULimbsqZgk', '023': 'hoSK8Drn7b8',
  '024': 'H_oTTaODt64', '027': 'IzAxFuZ9-1g', '028': 'kXRJmGj5pBo', '029': 'l5AyYFkqAuc', '030': 'lKlsB-PTwx0', '035': 'OM3cWkuxVnc',
  '036': 'Pg30FZFj-Qs', '037': 'PNagC0cqX_k', '038': 'ptY68466mgM', '039': 'R_b-XLJs6cM', '040': 'RijPilaHbcU', '041': 'RKOtsYN15jU',
  '042': 'rYBhEfcPM0Q', '043': 'S3lSR3ALyHw', '045': 'Smfp2-TYeNY', '046': 'SUXru7qiZFI', '048': 'U52Lrz14nGk', '049': 'U9fPLZX08Qw',
  '052': 'WsmYOrHHrRg', '053': 'wVWD0D7cBOg', '055': 'X1U4tMQ0WTc', '058': 'yHGw0ObrWqU', '059': 'yM2YALs5pdQ', '060': 'YTwMzvCGKW8', '067': 'sD75-5HI0NM',
}).map(([k, v]) => ['vid-' + k, v]))
const POSTER = { // poster image per video id (dist/img), 16:9 unless noted
  'vid-038': 'case-amdocs', 'vid-022': 'case-maccabi', 'vid-055': 'case-seat', 'vid-020': 'case-park-bavli',
  'vid-029': 'w-wella', 'vid-060': 'w-eugene-perma', 'vid-042': 'w-calvin-klein', 'vid-013': 'w-visa-cal', 'vid-058': 'w-doron-shefer',
  'vid-024': 'w-amt', 'vid-023': 'w-rita', 'vid-016': 'b-taboola', 'vid-035': 'b-taboola-hilton', 'vid-019': 'b-kornit', 'vid-053': 'b-kornit-recap',
  'vid-021': 'b-bezeq', 'vid-006': 'b-clalit', 'vid-002': 'b-philip-morris', 'vid-041': 'b-mercedes', 'vid-039': 'b-success-drive', 'vid-045': 'b-castro',
  'vid-027': 'boots-027', 'vid-036': 'hero-1280',
}
const TALL = { 'vid-009': 'tall-v-009', 'vid-030': 'tall-v-030', 'vid-040': 'tall-v-040', 'vid-007': 'tall-v-amos', 'vid-004': 'tall-v-amos2',
  'vid-011': 'tall-v-ronen', 'vid-012': 'tall-v-joya', 'vid-010': 'tall-v-magic', 'vid-048': 'tall-v-natali', 'vid-059': 'tall-v-ella', 'vid-027': 'tall-boots-027' }
const CASE_VIDEO = { amdocs: 'vid-038', maccabi: 'vid-022', seat: 'vid-055', 'park-bavli': 'vid-020', wella: 'vid-029', 'eugene-perma': 'vid-060',
  'calvin-klein': 'vid-042', 'visa-cal': 'vid-013', 'doron-shefer': 'vid-058', rita: 'vid-023', amt: 'vid-024' }
const WA = '972504635536' // dossier contact.whatsapp, +972504635536

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// visible placeholders for undecided values; Latin runs isolated inside Hebrew text
const t = (s, L) => String(s ?? '').split(/(\{[a-z0-9_]+\}|[A-Za-z][A-Za-z0-9'’&.\- ]*[A-Za-z0-9.])/i).map((seg, i) => {
  if (i % 2 === 0) return esc(seg)
  if (seg[0] === '{') { const k = seg.slice(1, -1); return `<span class="ph" data-key="${k}" title="${esc(seg)}">${esc(phLabel(k, L))}</span>` }
  return L === 'he' ? `<bdi dir="ltr" lang="en">${esc(seg)}</bdi>` : esc(seg)
}).join('')
// placeholder marks: what is coming, in words, with the key in the title for the owner
const PH = {
  he: { price: 'מחיר בקרוב', case_story: 'הסיפור המלא בקרוב', session_length: 'משך בקרוב', check_minutes: 'כמה', partnership_capacity: 'מספר', budget_ranges: 'טווחי תקציב בקרוב',
    turnaround: 'זמן קצר', consent_text: 'נוסח ההסכמה בקרוב', privacy_policy: 'מדיניות הפרטיות בקרוב', accessibility: 'בקרוב', name_to_confirm: 'שם בבדיקה',
    first_name: 'שם', business_name: 'שם העסק', date: 'תאריך', time: 'שעה', partner_name: 'טל או שחר', observation: 'מה שראינו אצלכם', first_move: 'הצעד הראשון שלכם',
    service_name: 'שירות', hero_film_caption: 'הסרט', _: 'בקרוב' },
  en: { price: 'Price coming', case_story: 'Full story coming', session_length: 'Length coming', check_minutes: 'A few', partnership_capacity: 'A few', budget_ranges: 'Budget ranges coming',
    turnaround: 'a short time', consent_text: 'Consent wording coming', privacy_policy: 'Privacy policy coming', accessibility: 'Coming', name_to_confirm: 'Name to confirm',
    first_name: 'friend', business_name: 'Your business', date: 'date', time: 'time', partner_name: 'Tal or Shahar', observation: 'What we saw', first_move: 'Your first move',
    service_name: 'a service', hero_film_caption: 'The film', _: 'Coming' },
}
const phLabel = (k, L) => { const m = PH[L]; if (m[k]) return m[k]; for (const p of ['price', 'case_story', 'accessibility', 'observation']) if (k.startsWith(p) || k.endsWith('_' + p) || k.includes(p)) return m[p]; return m._ }
const paras = s => String(s ?? '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean)
const P = (s, L) => paras(s).map(p => `<p>${t(p, L)}</p>`).join('')
const wa = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
  play: '<svg viewBox="0 0 14 16" aria-hidden="true" fill="currentColor"><path d="M0 0l14 8-14 8z"/></svg>',
  plus: '<svg viewBox="0 0 14 14" aria-hidden="true" stroke="currentColor" stroke-width="1.6"><path d="M7 0v14M0 7h14"/></svg>',
  x: '<svg viewBox="0 0 14 14" aria-hidden="true" stroke="currentColor" stroke-width="1.6"><path d="M1 1l12 12M13 1L1 13"/></svg>',
  tick: '<svg viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6.5l2.5 2.5L10 3"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10 15V9l5.2 3Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3Zm7 0h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
}
const ARR = '<span class="arr" aria-hidden="true">←</span>'
const img = (name, alt, w, h, extra = '') => `<img src="img/${name}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`

function render(L) {
  const C = L === 'he' ? he : en, X = C.extras, U = UI[L], T = s => t(s, L)
  const S = Object.fromEntries(C.services.map(s => [s.slug, s]))
  const cs = Object.fromEntries(C.caseStudies.map(c => [c.slug, c]))
  const btnCheck = (cls = 'btn btn-gold') => `<a class="${cls}" href="#/check">${T(X.cta.check)}</a>`
  const btnBook = (cls = 'btn btn-gold') => `<a class="${cls}" href="#/book">${T(X.cta.book)}</a>`
  const btnWa = (msg = X.msg.whatsapp_prefill, label = X.cta.whatsapp) => `<a class="btn btn-wa" href="${wa(msg)}" target="_blank" rel="noopener">${ICON.wa}<span>${T(label)}</span></a>`
  const video = (id, label, cls = 'poster', ratio = '16/9') => {
    const yt = YT[id], p = POSTER[id]
    return `<a class="${cls}" href="https://www.youtube.com/watch?v=${yt}" data-film="${yt}" data-label="${esc(label)}" aria-label="${esc(U.play + ': ' + label)}" target="_blank" rel="noopener">${p ? img(p, '', 1280, 720) : ''}<span class="play">${ICON.play}</span></a>`
  }
  const enCase = Object.fromEntries(en.caseStudies.map(c => [c.slug, c.title]))
  const enBrand = { 'vid-021': 'Bezeq', 'vid-006': 'Clalit', 'vid-002': 'Philip Morris', 'vid-016': 'Taboola', 'vid-027': en.videos[4].description }
  const lab = v => L === 'he' || !/[\u0590-\u05FF]/.test(v.label) ? v.label : (v.case ? enCase[v.case] : enBrand[v.id] || v.label)
  const tcard = (v, cap) => `<a class="tcard" href="https://www.youtube.com/watch?v=${YT[v.id]}" data-film="${YT[v.id]}" data-tall="${['vid-009', 'vid-030', 'vid-040'].includes(v.id) ? 1 : ''}" data-label="${esc(lab(v))}" aria-label="${esc(U.play + ': ' + (cap && cap[0] !== '{' ? cap : lab(v)))}" target="_blank" rel="noopener"><span class="im">${img(TALL[v.id] || POSTER[v.id], '', 405, 720)}<span class="play">${ICON.play}</span><span class="lab">${T(cap && cap !== v.label ? cap : lab(v))}</span></span></a>`
  const endcard = `<div class="tcard endcard"><div class="im"><div><p>${T(X.home.final.heading)}</p>${btnCheck('btn btn-gold')}</div></div></div>`
  const nav = ['story', 'launch', 'partnership', 'work', 'about', 'brands', 'watch', 'course']
  const navLinks = nav.map(k => `<a href="#/${k}" data-nav="${k}">${T(X.nav[k])}</a>`).join('')
  const priceBlock = (label, v) => `<div class="price-b"><span class="lbl">${T(label)}</span><span class="v">${T(v)}</span></div>`
  const endSec = (heading, btn) => `<section class="sec end"><div class="wrap"><h2 class="sec-h">${T(heading)}</h2><div class="cta-row">${btn}${btnWa()}</div></div></section>`
  const steps = C.extras.method_steps
  const methodList = (upto) => `<ol class="method">${steps.map((s, i) => `<li class="${i < upto ? '' : 'off'}"><span class="n">${String(s.n).padStart(2, '0')}</span><span>${T(s.title)}</span></li>`).join('')}</ol>`
  const tal = C.team[0], sha = C.team[1]
  const shPlaceholder = `<div class="portrait-ph" role="img" aria-label="${esc(U.portrait + ': ' + sha.name)}"><div class="sq"><div><span>${T(U.portrait)}</span><small lang="${U.other}">${esc(U.portraitEn)}</small></div></div></div>`
  const partnerCards = (big) => `
    <div class="partners-g">
      <article class="partner"><div class="frame">${img('tal-portrait', L === 'he' ? 'טל אורן יושב על כיסא מול קיר לבנים, תחת אור אחד, בשחור־לבן' : 'Tal Oren seated on a chair against a brick wall, under one light, black and white', 864, 1080)}</div>
        <h3>${T(tal.name)}</h3><p class="role">${T(tal.role)}</p><p class="bio">${T(tal.bio)}</p>
        ${big ? `<h4 class="kicker" style="margin-top:28px">${T(X.pages.about.tal_brings_label)}</h4><p class="bio">${T(paras(C.copyBlocks[3].body)[1].split('. ')[0] + '.')}</p>` : ''}</article>
      <article class="partner"><div class="frame">${shPlaceholder}</div>
        <h3>${T(sha.name)}</h3><p class="role">${T(sha.role)}</p><p class="bio">${T(sha.bio)}</p>
        <a class="link-arrow" href="${sha.url}" target="_blank" rel="noopener">${T(U.toShahar)} ${ARR}</a>
        ${big ? `<h4 class="kicker" style="margin-top:20px">${T(X.pages.about.shahar_brings_label)}</h4><p class="bio">${T(paras(C.copyBlocks[3].body)[1].split('. ').slice(1, 2).join('. ') + '.')}</p>` : ''}
        <p class="strip-note">${T(X.home.proof.nbc_note)}</p>
        <div class="strip">
          <div class="t">${img('sn-pale-force', L === 'he' ? 'Pale Force: קונאן אובריאן ודמות מצוירת בגלימה ורודה, עם לוגו NBC' : 'Pale Force: Conan O\'Brien beside a cartoon hero in a pink cape, NBC logo', 700, 525)}</div>
          <div class="t">${img('sn-coca-cola', L === 'he' ? 'אתר של קוקה־קולה ישראל: לב אדום גדול ודמויות צבעוניות בנוף ירוק' : 'Coca-Cola Israel web project: a big red heart and coloured figures in a green landscape', 700, 525)}</div>
          <div class="t">${img('sn-privex', L === 'he' ? 'PRIVEX: לוגו לבן על רקע כחול עם פנים רובוטיות' : 'PRIVEX: white logo on blue with a robotic face', 700, 525)}</div>
        </div></article>
    </div>`

  // ---------- home ----------
  const pains = paras(C.copyBlocks[1].body)
  const [flipLead, ladderRaw] = C.copyBlocks[2].body.split(/:\s*/)
  const ladder = ladderRaw.replace(/\.$/, '').split(/,\s*/)
  const caseCard = slug => { const c = cs[slug], v = CASE_VIDEO[slug]
    return `<article class="case">${video(v, c.title)}<p class="who"><span>${T(c.sector)}</span></p><h3>${T(c.client)}</h3><p class="out">${T(c.outcome)}</p><p class="before">${T(c.challenge)}</p><a class="link-arrow" href="#/work/${slug}">${T(X.cta.read_case)} ${ARR}</a></article>` }
  const door = (slug, pic, alt) => { const s = S[slug]
    return `<article class="door"><a href="#/${slug}" class="pic" tabindex="-1" aria-hidden="true"><span class="px" data-px>${img(pic, alt, 800, 1000)}</span></a>
      <h3>${T(s.title)}</h3><p class="sum">${T(s.summary)}</p>
      <p class="meta"><span>${T(s.format)}</span><span>${T(X.pages[slug].price_label)} ${T(X.pages[slug].price)}</span></p>
      <a class="btn btn-line" href="#/${slug}">${T(U.more)}: ${T(s.title)} ${ARR}</a></article>` }
  const altStory = L === 'he' ? 'גבר קירח בחליפה שחורה צוחק בקול, כוס בידו, בשחור־לבן על רקע אפור' : 'A bald man in a black suit laughing out loud, glass in hand, black and white on grey'
  const altLaunch = L === 'he' ? 'גבר בז׳קט שחור קופץ מול אותיות LOVE מוארות בנורות, בשחור־לבן' : 'A man in a black jacket leaping in front of lit LOVE marquee letters, black and white'
  const altBand = L === 'he' ? 'מארז WELLA שחור עם כיתוב זהב ובקבוקים, תחת אור אחד' : 'A black WELLA box with gold type and bottles, under one light'

  const home = `
  <section class="hero" aria-label="${esc(C.businessName)}">
    <div class="hero-media" aria-hidden="true">
      <img src="img/hero-1280.webp" srcset="img/hero-1280.webp 1280w, img/hero-1920.webp 1920w" sizes="100vw" width="1920" height="1080" alt="" fetchpriority="high">
      <video muted loop playsinline preload="none" disablepictureinpicture poster="img/hero-1280.webp" data-hero>
        <source data-src="video/hero-m1280.webm" type="video/webm" media="(max-width: 1100px)">
        <source data-src="video/hero-m1280.mp4" type="video/mp4" media="(max-width: 1100px)">
        <source data-src="video/hero-d1920.webm" type="video/webm">
        <source data-src="video/hero-d1920.mp4" type="video/mp4">
      </video>
    </div>
    <div class="hero-c">
      <p class="eyebrow" lang="en" dir="ltr">${esc(X.home.hero.eyebrow)}</p>
      <h1>${T(C.copyBlocks[0].heading)}</h1>
      <nav class="seg" aria-label="${esc(X.home.doors_title)}"><a href="#/story">${T(X.home.hero.door_story)}</a><a href="#/launch">${T(X.home.hero.door_launch)}</a></nav>
    </div>
    <div class="ledby">
      <div class="pair">
        <div class="faces"><span class="face">${img('tal-avatar', tal.name, 240, 240)}</span><span class="face ph-face" role="img" aria-label="${esc(sha.name + ': ' + U.portrait)}">${T(U.soon)}</span></div>
        <p><strong>${T(X.home.partners_title)}</strong><span>${T(tal.role)} · ${T(sha.role)}</span></p>
      </div>
      <a class="film-btn" href="https://www.youtube.com/watch?v=${YT['vid-036']}" data-film="${YT['vid-036']}" data-label="${esc(X.video_library.course_trailer.label)}" target="_blank" rel="noopener"><span class="ring">${ICON.play}</span>${T(U.film)}</a>
    </div>
  </section>

  <section class="sec mirror" aria-labelledby="mirror-h">
    <div class="wrap">
      <p class="lead">${T(C.copyBlocks[0].body)}</p>
      <div class="mirror-grid">
        <div><h2 id="mirror-h" class="kicker">${T(C.copyBlocks[1].heading)}</h2>
          <ol class="pains">${pains.map((p, i) => `<li><span>${T(p)}</span><span class="n" aria-hidden="true">0${i + 1}</span></li>`).join('')}</ol></div>
        <p class="rail" aria-hidden="true">${T(C.copyBlocks[1].heading)}</p>
      </div>
    </div>
  </section>

  <section class="sec band flip" aria-labelledby="flip-h">
    <div class="wrap">
      <h2 id="flip-h" class="sec-h">${T(C.copyBlocks[2].heading)}</h2>
      <p>${T(flipLead)}:</p>
      <ol class="ladder">${ladder.map((w, i) => `<li><span class="i" aria-hidden="true">${i + 1}</span>${T(w)}</li>`).join('')}</ol>
    </div>
  </section>

  <section class="sec doors" aria-labelledby="doors-h">
    <div class="wrap">
      <h2 id="doors-h" class="sec-h">${T(X.home.doors_title)}</h2>
      <div class="doors-g">${door('story', 'door-story', altStory)}${door('launch', 'door-launch', altLaunch)}</div>
    </div>
  </section>

  <section class="sec how" aria-labelledby="how-h">
    <div class="wrap">
      <h2 id="how-h" class="sec-h">${T(X.home.how.title)}</h2>
      <ol class="steps">
        <li><span class="num">1</span><h3>${T(X.home.how.step1)}</h3><p>${T(S['spotlight-check'].summary)} ${T(S['spotlight-check'].format)}.</p></li>
        <li><span class="num">2</span><h3>${T(X.home.how.step2)}</h3><p>${T(S['clarity-session'].summary)}</p></li>
        <li><span class="num">3</span><h3>${T(X.home.how.step3_title)}</h3><p>${T(X.home.how.step3_body)}</p></li>
      </ol>
      <div class="cta-row">${btnCheck()}${btnBook('btn btn-line')}</div>
    </div>
  </section>

  <section class="pband work-band" aria-labelledby="wella-h">
    <div class="bg" data-px>${img('band-1920', altBand, 1920, 1280, ' srcset="img/band-phone.webp 1000w, img/band-1920.webp 1920w" sizes="100vw"')}</div>
    <div class="wrap"><div class="txt">
      <p class="kicker">${T(cs.wella.client)} · ${T(cs.wella.sector)}</p>
      <h2 id="wella-h" lang="en" dir="ltr">${esc(cs.wella.title)}</h2>
      <p class="sum">${T(cs.wella.outcome)}</p>
      <a class="btn btn-line" href="#/work/wella">${T(X.cta.read_case)} ${ARR}</a>
    </div></div>
  </section>

  <section class="sec proof" aria-labelledby="proof-h">
    <div class="wrap">
      <h2 id="proof-h" class="sec-h">${T(X.home.proof.title)}</h2>
      <div class="stats">${X.home.proof.stats.map(s => `<p class="stat"><b>${T(s.value)}</b><span>${T(s.label)}</span></p>`).join('')}</div>
      <div class="names">
        <h3 class="vh">${T(X.home.proof.title)}</h3>
        <span aria-hidden="true"></span>
        <p class="wall">${C.clientLogos.map(c => `<bdi>${esc(c.name)}</bdi>`).join(' <span class="sep" aria-hidden="true">·</span> ')}</p>
        <h3>${T(X.home.proof.people_title)}</h3>
        <p class="wall">${X.home.proof.people.map(n => `<bdi>${esc(n)}</bdi>`).join(' <span class="sep" aria-hidden="true">·</span> ')}</p>
        <p class="note">${T(X.home.proof.sectors)}</p>
        <p class="note">${T(X.home.proof.nbc_note)}</p>
      </div>
    </div>
  </section>

  <section class="sec cases" aria-labelledby="cases-h">
    <div class="wrap">
      <h2 id="cases-h" class="sec-h">${T(X.home.cases_title)}</h2>
      <div class="cases-g" data-swipe>${X.home.cases_order.map(caseCard).join('')}</div>
      <div class="dots" data-dots>${X.home.cases_order.map((s, i) => `<button type="button" aria-label="${esc(cs[s].client)}" aria-current="${i === 0}"><i></i></button>`).join('')}</div>
    </div>
  </section>

  <section class="sec partners" aria-labelledby="partners-h">
    <div class="wrap">
      <div class="partners-intro"><div><p class="kicker">${T(X.home.partners_title)}</p><h2 id="partners-h" class="sec-h">${T(C.copyBlocks[3].heading)}</h2></div>
        <div class="body">${P(C.copyBlocks[3].body, L)}</div></div>
      ${partnerCards(false)}
    </div>
  </section>

  <section class="pband people-band" aria-labelledby="pband-h">
    <div class="bg" data-px>${img('workshop-1920', L === 'he' ? 'טל אורן מדבר מול קהל בסדנה, ליד רול־אפ של המרכז לליווי עסקים, בשחור־לבן' : 'Tal Oren talking to a workshop audience beside a business-centre roll-up banner, black and white', 1920, 1080, ' srcset="img/workshop-phone.webp 864w, img/workshop-1920.webp 1920w" sizes="100vw"')}</div>
    <div class="wrap"><div class="txt">
      <h2 id="pband-h">${T(X.home.partnership_band.heading)}</h2>
      <p class="sum">${T(S.partnership.summary)}</p>
      <p class="breath">${T(paras(S.partnership.body)[1])}</p>
      <p class="meta"><span>${T(S.partnership.format)}</span></p>
      <a class="btn btn-line" href="#/partnership">${T(X.home.partnership_band.button)} ${ARR}</a>
    </div></div>
  </section>

  <section class="sec faq" aria-labelledby="faq-h">
    <div class="wrap faq-g">
      <h2 id="faq-h" class="sec-h">${T(X.home.faq.title)}</h2>
      <div>${X.home.faq.items.map(f => `<details><summary>${T(f.q)}<span class="pm">${ICON.plus}</span></summary><p class="ans">${T(f.a)}</p></details>`).join('')}</div>
    </div>
  </section>

  <section class="sec final" id="book" aria-labelledby="final-h">
    <div class="wrap">
      <h2 id="final-h" class="sec-h">${T(X.home.final.heading)}</h2>
      <p>${T(C.closing)}</p>
      <div class="cta-row">${btnCheck()}${btnWa(S['spotlight-check'].ctaText)}</div>
    </div>
  </section>`

  // ---------- story / launch ----------
  const doorPage = (slug, pic, alt, upto) => { const s = S[slug], pg = X.pages[slug], b = paras(s.body)
    return `
  <section class="sec page-top"><div class="wrap split">
    <div><p class="kicker">${T(s.title)}</p><h1>${T(pg.headline)}</h1><p class="sum">${T(s.summary)}</p>
      <p class="meta"><span>${T(s.format)}</span></p>${btnCheck()}</div>
    <div class="pic"><span class="px" data-px>${img(pic, alt, 800, 1000)}</span></div>
  </div></section>
  <section class="sec"><div class="wrap two"><h2 class="sec-h">${T(pg.pain_heading)}</h2><div class="prose"><p class="big-line">${T(b[0])}</p></div></div></section>
  <section class="sec band"><div class="wrap two"><h2 class="sec-h">${T(pg.get_heading)}</h2><div class="prose"><p class="big-line" style="color:#222">${T(b[1])}</p><p style="margin-top:20px;color:#444">${T(s.audience)}</p></div></div></section>
  <section class="sec"><div class="wrap two"><div><h2 class="sec-h">${T(pg.method_heading)}</h2><p class="mute" style="margin-top:16px">${T(C.method.intro)}</p></div>${methodList(upto)}</div></section>
  <section class="sec" style="padding-top:0"><div class="wrap">${priceBlock(pg.price_label, pg.price)}</div></section>
  ${endSec(pg.end_heading, btnCheck())}` }

  // ---------- partnership ----------
  const pp = X.pages.partnership, pb = paras(S.partnership.body)
  const partnership = `
  <section class="pband people-band page-top" style="padding-top:var(--header)" aria-labelledby="pp-h">
    <div class="bg" data-px>${img('workshop-1920', L === 'he' ? 'טל אורן מדבר מול קהל בסדנה, ליד רול־אפ של המרכז לליווי עסקים, בשחור־לבן' : 'Tal Oren talking to a workshop audience beside a business-centre roll-up banner, black and white', 1920, 1080, ' srcset="img/workshop-phone.webp 864w, img/workshop-1920.webp 1920w" sizes="100vw"')}</div>
    <div class="wrap"><div class="txt"><p class="kicker">${T(S.partnership.title)}</p><h1 id="pp-h" class="display" style="font-size:clamp(40px,4.6vw,66px);line-height:1.1">${T(pp.headline)}</h1>
      <p class="sum">${T(S.partnership.summary)}</p>${btnBook()}</div></div>
  </section>
  <section class="sec"><div class="wrap two"><h2 class="sec-h">${T(pp.pain_heading)}</h2><div class="prose"><p class="big-line">${T(pb[0])}</p><p class="big-line" style="margin-top:28px;color:#fff">${T(pb[1])}</p></div></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap"><h2 class="sec-h">${T(pp.how_heading)}</h2>
    <div class="cols3" style="margin-top:48px"><div><span class="n">1</span><p>${T(pb[2])}</p></div><div><span class="n">2</span><p>${T(S.partnership.format)}</p></div><div><span class="n">3</span><p>${T(S.partnership.summary)}</p></div></div></div></section>
  <section class="sec band"><div class="wrap two"><h2 class="sec-h">${T(pp.who_heading)}</h2><p class="big-line" style="color:#222">${T(S.partnership.audience)}</p></div></section>
  <section class="sec"><div class="wrap" style="display:grid;gap:16px">${priceBlock(pp.price_label, pp.price)}<div class="price-b"><span class="v">${T(pp.capacity)}</span></div></div></section>
  ${endSec(pp.end_heading, btnBook())}`

  // ---------- work ----------
  const pw = X.pages.work, sectorKey = { [he.caseStudies[0].sector]: 'organisations', [en.caseStudies[0].sector]: 'organisations' }
  const sectorOf = c => { const i = C.caseStudies.indexOf(c), s = he.caseStudies[i].sector; return s === 'ארגונים' ? 'organisations' : s === 'יזמים' ? 'entrepreneurs' : 'brands' }
  const work = `
  <section class="sec page-top"><div class="wrap">
    <h1 class="sec-h" style="font-size:clamp(48px,6vw,96px)">${T(pw.headline)}</h1>
    <p class="lead" style="margin-top:24px">${T(pw.intro)}</p>
    <p class="mute" style="margin-top:18px;max-width:34em">${T(pw.pain)}</p>
    <div style="margin-top:48px" class="tabs" role="group" aria-label="${esc(pw.filter.all)}" data-filter>
      ${['all', 'organisations', 'entrepreneurs', 'brands'].map((k, i) => `<button type="button" data-f="${k}" aria-pressed="${i === 0}">${T(pw.filter[k])}</button>`).join('')}
    </div>
    <ul class="rows">${C.caseStudies.map(c => `<li data-sector="${sectorOf(c)}"><a href="#/work/${c.slug}"><span class="c">${T(c.client)}<small>${T(c.sector)}</small></span><span class="l">${T(c.title)}. ${T(c.outcome)}</span><span class="th">${img(POSTER[CASE_VIDEO[c.slug]], '', 640, 360)}</span></a></li>`).join('')}</ul>
  </div></section>
  <section class="sec" style="padding-top:0"><div class="wrap">
    <h2 class="sec-h">${T(pw.voices_heading)}</h2><p class="mute" style="margin-top:14px;max-width:34em">${T(pw.voices_intro)}</p>
    <div class="tall-row" style="margin-top:36px">${X.video_library.voices.filter(v => !v.page).map(v => tcard(v, v.caption)).join('')}</div>
  </div></section>
  ${endSec(pw.end_heading, btnBook())}`
  const casePage = c => { const v = CASE_VIDEO[c.slug], did = pw.case_what_we_did[c.slug]
    return `<section class="view" data-route="work/${c.slug}" data-title="${esc(c.client + " · " + C.businessName)}">
    <section class="sec page-top"><div class="wrap">
      <a class="link-arrow mute" href="#/work" style="margin-bottom:24px"><span class="arr" style="display:inline-block;transform:scaleX(-1)" aria-hidden="true">←</span> ${T(pw.headline)}</a>
      <p class="kicker">${T(c.sector)}</p><h1 class="sec-h" style="font-size:clamp(44px,5.6vw,84px)">${T(c.client)}</h1><p class="lead" style="margin-top:18px">${T(c.title)}</p>
      <div style="margin-top:48px">${video(v, c.title)}</div>
      <div class="case-parts" style="margin-top:64px">
        <div><h3>${T(pw.case_sections.before)}</h3>${P(c.challenge, L)}</div>
        <div><h3>${T(pw.case_sections.did)}</h3>${P(did, L)}</div>
        <div><h3>${T(pw.case_sections.after)}</h3>${P(c.outcome, L)}</div>
      </div></div></section>
    ${endSec(pw.end_heading, btnBook())}</section>` }

  // ---------- about ----------
  const pa = X.pages.about
  const about = `
  <section class="sec page-top"><div class="wrap">
    <h1 class="sec-h" style="font-size:clamp(48px,6vw,96px)">${T(pa.headline)}</h1>
    <div class="partners-intro" style="margin-top:28px"><p class="lead">${T(C.copyBlocks[3].heading)}</p><div class="body">${P(paras(C.copyBlocks[3].body)[0], L)}</div></div>
    ${partnerCards(true)}
  </div></section>
  <section class="sec" style="padding-top:0"><div class="wrap">
    <h2 class="sec-h">${T(pw.voices_heading)}</h2>
    <div class="tall-row" style="margin-top:36px">${X.video_library.voices.filter(v => !v.page).slice(0, 6).map(v => tcard(v, v.caption)).join('')}</div>
  </div></section>
  ${endSec(pa.end_heading, btnBook())}`

  // ---------- brands ----------
  const pr = X.pages.brands, F = pr.form
  const brandFilms = X.video_library.proof.filter(v => v.page === 'brands')
  const brands = `
  <section class="sec page-top"><div class="wrap">
    <h1 class="sec-h" style="font-size:clamp(48px,6vw,96px)">${T(pr.headline)}</h1>
    <p class="lead" style="margin-top:24px">${T(pr.pain)}</p><p class="big-line mute" style="margin-top:20px">${T(pr.solution)}</p>
  </div></section>
  <section class="sec" style="padding-top:0"><div class="wrap"><h2 class="sec-h">${T(pr.films_heading)}</h2>
    <div class="films-g" style="margin-top:40px">${brandFilms.map(v => `<div>${video(v.id, lab(v))}<p class="lab">${T(lab(v))}</p></div>`).join('')}</div></div></section>
  <section class="sec band"><div class="wrap two"><h2 class="sec-h">${T(pr.services_heading)}</h2><div><p class="big-line" style="color:#222">${T(S.craft.summary)}</p><p style="margin-top:16px;color:#444">${T(S.craft.body)}</p></div></div></section>
  <section class="sec"><div class="wrap two"><h2 class="sec-h">${T(F.heading)}</h2>
    <form class="form-g" data-mock novalidate>
      ${['name', 'company', 'role', 'email', 'phone'].map(k => `<label class="fl"><input name="${k}" type="${k === 'email' ? 'email' : k === 'phone' ? 'tel' : 'text'}" placeholder=" " ${['name', 'email', 'phone'].includes(k) ? 'required' : ''} autocomplete="${{ name: 'name', company: 'organization', role: 'organization-title', email: 'email', phone: 'tel' }[k]}"><span>${T(F[k])}</span><small class="err">${T(k === 'email' ? X.form.invalid_email : k === 'phone' ? X.form.invalid_phone : X.form.required)}</small></label>`).join('')}
      <label class="fl full"><textarea name="need" placeholder=" " required></textarea><span>${T(F.need)}</span><small class="err">${T(X.form.required)}</small></label>
      <div class="full"><button class="btn btn-gold" type="submit">${T(F.submit)}</button><p class="ok-msg" role="status">${T(X.form.success)}</p></div>
    </form></div></section>`

  // ---------- watch ----------
  const pwa = X.pages.watch, lib = X.video_library
  const seriesItems = { flip: [], two_chairs: [], boots: lib.boots, proof: lib.proof.filter(v => ['vid-038', 'vid-022', 'vid-055', 'vid-020', 'vid-029', 'vid-042', 'vid-013', 'vid-058', 'vid-024'].includes(v.id)), headlights: [], voices: lib.voices }
  const watch = `
  <section class="sec page-top" style="padding-bottom:40px"><div class="wrap">
    <h1 class="sec-h" style="font-size:clamp(48px,6vw,96px)">${T(pwa.headline)}</h1>
    <p class="lead" style="margin-top:24px">${T(pwa.intro)}</p><p class="mute" style="margin-top:16px">${T(pwa.pain)}</p>
  </div></section>
  <section style="padding-bottom:80px"><div class="wrap">
    ${pwa.series.map(s => `<div class="series"><div class="series-h"><h2>${T(s.name)}</h2><p>${T(s.line)}</p></div>
      ${seriesItems[s.key].length ? `<div class="tall-row">${seriesItems[s.key].map(v => tcard(v, v.caption)).join('')}${endcard}</div>` : `<p class="empty">${T(pwa.empty_series)}</p>`}</div>`).join('')}
  </div></section>
  ${endSec(X.home.final.heading, btnCheck())}`

  // ---------- course ----------
  const pc = X.pages.course, co = S.course
  const course = `
  <section class="sec page-top"><div class="wrap split">
    <div><p class="kicker">${T(X.nav.course)}</p><h1 lang="en" dir="ltr" style="text-align:start">${esc(pc.headline)}</h1><p class="sum">${T(co.summary)}</p><p class="meta"><span>${T(co.format)}</span><span>${T(pc.price_label)} ${T(pc.price)}</span></p>
      <a class="btn btn-gold" href="${wa(co.ctaText)}" target="_blank" rel="noopener">${T(X.cta.buy_course)}</a></div>
    <div>${video('vid-036', lib.course_trailer.label)}</div>
  </div></section>
  <section class="sec" style="padding-top:0"><div class="wrap two"><h2 class="sec-h">${T(pc.pain)}</h2><p class="big-line mute">${T(co.body)}</p></div></section>
  <section class="sec" style="padding-top:0"><div class="wrap two"><h2 class="sec-h">${T(pc.lessons_heading)}</h2>${methodList(10)}</div></section>
  <section class="sec" style="padding-top:0"><div class="wrap"><h2 class="sec-h">${T(pc.voices_heading)}</h2>
    <div class="tall-row" style="margin-top:36px">${lib.voices.filter(v => v.page === 'course').map(v => tcard(v, v.caption)).join('')}</div>
    <div style="margin-top:48px">${priceBlock(pc.price_label, pc.price)}</div></div></section>
  ${endSec(X.home.final.heading, `<a class="btn btn-gold" href="${wa(co.ctaText)}" target="_blank" rel="noopener">${T(X.cta.buy_course)}</a>`)}`

  // ---------- check ----------
  const ck = X.pages.check
  const qField = (q, i) => {
    const id = `q${i + 1}`
    if (q.input === 'text') return `<label class="fl field"><input id="${id}" name="${id}" type="text" placeholder=" " ${q.optional ? '' : 'data-req'}><span>${T(q.q)}</span></label>`
    if (q.input === 'textarea') return `<label class="fl field"><textarea id="${id}" name="${id}" placeholder=" " data-req></textarea><span>${T(q.q)}</span></label>${q.none ? `<label class="consent"><input type="checkbox" name="${id}-none" data-none>${T(q.none)}</label>` : ''}`
    if (q.input === 'single' || q.input === 'multi') return `<div class="opts" role="${q.input === 'single' ? 'radiogroup' : 'group'}" aria-label="${esc(q.q)}" data-req>${q.options.map((o, k) => `<label class="opt ${q.input === 'multi' ? 'multi' : ''}"><input type="${q.input === 'single' ? 'radio' : 'checkbox'}" name="${id}" value="${k}"><span class="tick">${ICON.tick}</span>${T(o)}</label>`).join('')}</div>`
    if (q.input === 'budget_when') return `<p class="kicker" style="margin-top:32px">${T(U.budget)}</p><div class="opts" role="radiogroup" aria-label="${esc(U.budget)}"><label class="opt"><input type="radio" name="${id}b" value="0"><span class="tick">${ICON.tick}</span>${T(q.budget)}</label></div>
      <p class="kicker" style="margin-top:28px">${T(U.start)}</p><div class="opts" role="radiogroup" aria-label="${esc(U.start)}" data-req>${q.when.map((o, k) => `<label class="opt"><input type="radio" name="${id}" value="${k}"><span class="tick">${ICON.tick}</span>${T(o)}</label>`).join('')}</div>`
  }
  const check = `
  <form class="sitting" data-check novalidate>
    <div class="stage"><div class="inner">
      <div class="q on" data-q="0">
        <p class="eyebrow" lang="en" dir="ltr" style="display:inline-block">${esc(C.tagline)}</p>
        <h1 class="display" style="margin-top:18px;font-size:clamp(48px,6vw,88px);line-height:1.05">${T(ck.intro.title)}</h1>
        <p class="lead" style="margin-top:20px;font-size:clamp(22px,2.2vw,28px)">${T(S['spotlight-check'].body)}</p>
        <p class="intro-meta">${ck.intro.meta.split(' · ').map(m => `<span>${T(m)}</span>`).join('')}</p>
        <button type="button" class="btn btn-gold" style="margin-top:36px" data-next>${T(ck.intro.start)} ${ARR}</button>
      </div>
      ${ck.questions.map((q, i) => `<fieldset class="q" data-q="${i + 1}" style="border:0;padding:0;margin:0">
        <div class="prog-row"><span>${T(ck.progress.replace('{n}', i + 1))}</span><span>${q.optional ? T(q.hint) : ''}</span></div>
        <div class="prog" style="--p:${(i + 1) * 10}%"><i></i></div>
        <legend class="vh">${T(q.q)}</legend><h2 aria-hidden="true">${T(q.q)}</h2>
        ${qField(q, i)}
      </fieldset>`).join('')}
      <fieldset class="q" data-q="11" style="border:0;padding:0;margin:0">
        <div class="prog-row"><span>✓</span></div><div class="prog" style="--p:100%"><i></i></div>
        <legend class="vh">${T(ck.contact.title)}</legend><h2 aria-hidden="true">${T(ck.contact.title)}</h2>
        <div class="form-g" style="margin-top:32px">
          <label class="fl full"><input name="name" type="text" placeholder=" " autocomplete="name" data-req><span>${T(X.form.name)}</span><small class="err">${T(X.form.required)}</small></label>
          <label class="fl"><input name="email" type="email" placeholder=" " autocomplete="email" data-req><span>${T(X.form.email)}</span><small class="err">${T(X.form.invalid_email)}</small></label>
          <label class="fl"><input name="phone" type="tel" placeholder=" " autocomplete="tel" data-req><span>${T(X.form.phone)}</span><small class="err">${T(X.form.invalid_phone)}</small></label>
        </div>
        <label class="consent"><input type="checkbox" name="consent" data-req>${T(ck.contact.consent)}</label>
      </fieldset>
    </div></div>
    <div class="check-nav" hidden>
      <button type="button" class="btn btn-line" data-back>${T(X.cta.back)}</button>
      <span class="why" aria-live="polite"></span>
      <button type="button" class="btn btn-gold" data-next disabled>${T(X.cta.next)} ${ARR}</button>
      <button type="submit" class="btn btn-gold" data-submit hidden>${T(ck.contact.submit)}</button>
    </div>
  </form>`

  // ---------- thanks / snapshot / book / booked ----------
  const th = X.pages.thanks
  const thanks = `<section class="done"><div>
    <h1 data-firstname>${T(th.title)}</h1><p>${T(th.body)}</p>
    <p style="margin-top:56px" class="kicker">${T(th.meanwhile)}</p>
    <div class="tall-row thanks-row" style="margin-top:12px">${[lib.voices[0], lib.boots[0], lib.voices[4]].map(v => tcard(v, v.caption)).join('')}</div>
    <a class="btn btn-line" href="#/">${T(X.cta.home)}</a></div></section>`
  const sn = X.pages.snapshot, demoScores = [3, 2, 4, 2, 1]
  const snapshot = `<section class="print-wrap sec" style="padding-bottom:120px"><div class="wrap">
    <article class="print">
      <span class="demo">${T(U.demo)}</span>
      <h1 data-bizname>${T(sn.title)}</h1><p class="intro">${T(sn.intro)}</p>
      <h2>${T(sn.scores_title)} · ${T(sn.scale)}</h2>
      <div class="reads">${sn.dimensions.map((d, i) => `<div class="read"><div><b>${T(d.name)}</b><small>${T(d.q)}</small></div><div class="scale" role="img" aria-label="${esc(d.name)}: ${demoScores[i]} / 5">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= demoScores[i] ? 'f' : ''}"></i>`).join('')}</div><span class="v">${demoScores[i]}</span></div>`).join('')}</div>
      <h2>${T(sn.noticed_title)}</h2>
      <ol class="obs">${[1, 2, 3].map(n => `<li><span class="n">${n}</span>${T(`{observation_${n}}`)}</li>`).join('')}</ol>
      <h2>${T(sn.first_move_title)}</h2><p class="big-line" style="color:#222">${T('{first_move}')}</p>
      <h2>${T(sn.path_title)}</h2>
      <div class="path-card"><b>${T(sn.paths.story)}</b><a class="link-arrow" href="#/story">${T(S.story.format)} ${ARR}</a></div>
      <p class="signed"><img src="img/sig-black.svg" alt="" width="183" height="30" onerror="this.remove()"><span>${T(sn.signed)}</span></p>
      <div class="cta">${btnBook('btn btn-ink')}<p>${T(sn.cta_line)}</p></div>
    </article></div></section>`
  const bk = X.pages.book
  const book = `<section class="sec page-top" style="padding-bottom:120px"><div class="wrap">
    <h1 class="sec-h" style="font-size:clamp(44px,5.6vw,84px)">${T(bk.title)}</h1>
    <p class="lead" style="margin-top:14px">${T(S['clarity-session'].summary)}</p>
    <form class="book-g" style="margin-top:48px" data-book novalidate>
      <div>
        <div class="blk"><h2><span class="n">01</span>${T(bk.step_time)}</h2>
          <div class="week" data-week aria-label="${esc(U.pick)}"></div>
          <div class="chips" data-slots>${['09:00', '10:30', '12:00', '14:00', '16:30', '18:00'].map(s => `<button type="button" class="chip" aria-pressed="false" data-slot="${s}">${s}</button>`).join('')}</div>
        </div>
        <div class="blk"><h2><span class="n">02</span>${T(bk.step_details)}</h2>
          <div class="form-g">
            <label class="fl full"><input name="name" placeholder=" " autocomplete="name" required><span>${T(X.form.name)}</span><small class="err">${T(X.form.required)}</small></label>
            <label class="fl"><input name="email" type="email" placeholder=" " autocomplete="email" required><span>${T(X.form.email)}</span><small class="err">${T(X.form.invalid_email)}</small></label>
            <label class="fl"><input name="phone" type="tel" placeholder=" " autocomplete="tel" required><span>${T(X.form.phone)}</span><small class="err">${T(X.form.invalid_phone)}</small></label>
          </div></div>
        <div class="blk"><h2><span class="n">03</span>${T(bk.step_pay)}</h2>
          <span class="pay-demo">${T(U.payDemo)}</span>
          <div class="form-g">
            <label class="fl full"><input inputmode="numeric" placeholder=" " autocomplete="off" data-noname><span>${T(U.card)}</span></label>
            <label class="fl"><input inputmode="numeric" placeholder=" " autocomplete="off" data-noname><span>${T(U.exp)}</span></label>
            <label class="fl"><input inputmode="numeric" placeholder=" " autocomplete="off" data-noname><span>${T(U.cvc)}</span></label>
          </div></div>
      </div>
      <aside class="sum-card"><h2>${T(S['clarity-session'].title)}</h2>
        <dl><dt>${T(U.when)}</dt><dd data-when>—</dd><dt>${T(U.length)}</dt><dd>${T(X.placeholders.session_length)}</dd><dt>${T(U.price)}</dt><dd>${T(X.placeholders.price_session)}</dd></dl>
        <p class="credit">${T(S['clarity-session'].body)}</p>
        <button class="btn btn-gold" type="submit">${T(bk.pay_button)}</button>
        <p class="why mute" style="margin-top:12px;font-size:14px" aria-live="polite"></p>
      </aside>
    </form></div></section>`
  const bd = X.pages.booked
  const booked = `<section class="done"><div><h1>${T(bd.title)}</h1><p data-booked>${T(bd.body)}</p><a class="btn btn-line" href="#/">${T(X.cta.home)}</a></div></section>`

  const legal = (title, body) => `<section class="sec page-top"><div class="wrap two"><h1 class="sec-h">${T(title)}</h1><div class="prose">${P(body, L)}</div></div></section>`

  // ---------- chrome ----------
  const header = `
  <a class="skip" href="#main">${T(U.skip)}</a>
  <header class="hdr" data-hdr><div class="wrap">
    <a class="logo" href="#/" aria-label="${esc(C.businessName)}"><img src="img/sig-gold.svg" alt="${esc(C.businessName)}" width="183" height="30"></a>
    <nav class="nav" aria-label="${esc(X.nav.menu)}">${navLinks}</nav>
    <div class="hdr-end">
      <button class="lang" type="button" data-lang lang="${U.other}">${esc(X.nav.lang_switch)}</button>
      <a class="btn btn-gold" href="#/check">${T(X.nav.header_button)}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="sheet" aria-label="${esc(U.openMenu)}" data-menu><i></i></button>
    </div>
  </div></header>
  <nav class="sheet" id="sheet" aria-label="${esc(X.nav.menu)}" data-sheet><a href="#/" data-nav="">${T(X.nav.home)}</a>${navLinks}<a class="btn btn-gold" href="#/check" style="margin-top:24px;align-self:flex-start;font:600 17px/1 var(--text)">${T(X.nav.header_button)}</a></nav>`
  const footer = `
  <footer class="ftr"><div class="wrap">
    <p class="ftr-line" lang="en" dir="ltr">${esc(C.tagline)}</p>
    <div class="ftr-g">
      <div><a class="logo" href="#/"><img src="img/sig-gold.svg" alt="${esc(C.businessName)}" width="207" height="34" loading="lazy"></a>
        <p style="margin-top:20px">${T(C.newsletter.label)}</p>
        <form class="news" data-mock novalidate><label class="fl"><input type="email" name="email" placeholder=" " autocomplete="email" required><span>${T(X.form.email)}</span><small class="err">${T(X.form.invalid_email)}</small></label><button class="btn btn-line" type="submit">${T(X.footer.newsletter_button)}</button><p class="ok-msg" role="status" style="position:absolute">${T(X.form.success)}</p></form>
      </div>
      <div><h4>${T(X.nav.menu)}</h4><ul>${nav.map(k => `<li><a href="#/${k}">${T(X.nav[k])}</a></li>`).join('')}</ul></div>
      <div><h4>${T(X.cta.whatsapp)}</h4>
        <div class="contact-b">${btnWa()}<a class="btn btn-wa" href="tel:${C.contact.phone}">${ICON.phone}<span dir="ltr">050-463-5536</span></a><a class="btn btn-wa" href="mailto:${C.contact.email}">${ICON.mail}<span dir="ltr">${esc(C.contact.email)}</span></a></div>
        <div class="socials">${C.socialLinks.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.platform}">${ICON[s.platform]}</a>`).join('')}</div>
      </div>
    </div>
    <div class="ftr-b"><span>${T(X.footer.rights.replace('{year}', '2026'))}</span><span><a href="#/privacy">${T(X.footer.privacy)}</a> · <a href="#/accessibility">${T(X.footer.accessibility)}</a></span></div>
  </div></footer>
  <div class="bar"><a class="btn btn-gold bar-check" href="#/check">${T(X.nav.header_button)}</a><a class="btn btn-gold bar-book" href="#/book">${T(X.cta.book)}</a><a class="wa" href="${wa(X.msg.whatsapp_prefill)}" target="_blank" rel="noopener" aria-label="${esc(X.cta.whatsapp)}">${ICON.wa}</a></div>
  <a class="wa-chip" href="${wa(X.msg.whatsapp_prefill)}" target="_blank" rel="noopener" aria-label="${esc(X.cta.whatsapp)}">${ICON.wa}<span>${T(X.cta.whatsapp)}</span></a>
  <dialog class="film" data-dialog aria-label="${esc(U.film)}"><button class="x" type="button" data-close aria-label="${esc(U.closeFilm)}">${ICON.x}</button><div class="box"></div><p class="cap"></p></dialog>`

  const view = (route, html, title) => `<div class="view" data-route="${route}" data-title="${esc(title)}">${html}</div>`
  const seo = X.seo
  const main = `<main id="main" tabindex="-1">
    ${view('', home, seo.home.title)}
    ${view('story', doorPage('story', 'door-story', altStory, 7), seo.story.title)}
    ${view('launch', doorPage('launch', 'door-launch', altLaunch, 10), seo.launch.title)}
    ${view('partnership', partnership, seo.partnership.title)}
    ${view('work', work, seo.work.title)}
    ${C.caseStudies.map(casePage).join('')}
    ${view('about', about, seo.about.title)}
    ${view('brands', brands, seo.brands.title)}
    ${view('watch', watch, seo.watch.title)}
    ${view('course', course, seo.course.title)}
    ${view('check', check, seo.check.title)}
    ${view('thanks', thanks, seo.check.title)}
    ${view('snapshot', snapshot, C.businessName)}
    ${view('book', book, bk.title + ' · ' + C.businessName)}
    ${view('booked', booked, bd.title + ' · ' + C.businessName)}
    ${view('privacy', legal(X.pages.privacy.title, X.pages.privacy.body), X.pages.privacy.title)}
    ${view('accessibility', legal(X.pages.accessibility.title, C.legal.accessibilityStatement + '\n\n' + C.legal.accessibilityContact), X.pages.accessibility.title)}
    ${view('404', `<section class="done"><div><h1 style="font-size:clamp(40px,5vw,72px)">${T(X.pages.not_found.title)}</h1><p>${T(X.pages.not_found.body)}</p><a class="btn btn-line" href="#/">${T(X.cta.home)}</a></div></section>`, X.pages.not_found.title)}
  </main>`
  return header + main + footer
}

const html = `<!doctype html>
<html lang="he" dir="rtl" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(he.extras.seo.home.title)}</title>
<meta name="description" content="${esc(he.extras.seo.home.description)}">
<meta name="theme-color" content="#0f0f0f">
<style>${css}</style>
<script>/* hold the hero text until the inlined fonts are decoded, so the headline never reflows (scroll CLS) */
(function(r){r.classList.add('fonts-wait');var go=function(){r.classList.remove('fonts-wait')};if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go);setTimeout(go,1200)})(document.documentElement)</script>
</head>
<body>
<div id="app">${render('he')}</div>
<template id="tpl-en">${render('en')}</template>
<script>${js}</script>
</body>
</html>
`
writeFileSync(join(here, '../dist/index.html'), html)
console.log('dist/index.html', (html.length / 1024).toFixed(0), 'KB')
