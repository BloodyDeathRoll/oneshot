// tools/test/site-check.test.mjs — the pure parts of the post-CMS acceptance suite and monitor
// (tools/site-check.mjs): booking hand-off parsing, HTML reference extraction, SEO plumbing, forecast
// freshness, video sniffing, the monitor's targets, and the CMS parity normaliser
// (deploy/managed/lib/parity.mjs). No network, no browser.
//
//   npm test

import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  checkHandoff, checkContactLink, checkFormHandoff, collectTargets, cssUrls, extractRefs, forecastFreshness,
  formHandoff, isEngineUrl, isPreviewUrl, parseISODate, parseSrcset, robotsInfo, sitemapLocs, sniffVideo, videoRenditions,
} from '../site-check-lib.mjs'
import { lineDiff, parity, stripSeedPrefix } from '../../deploy/managed/lib/parity.mjs'

const today = new Date('2026-10-05T12:00:00Z')
const BL = 'https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers'

test('hand-off: start + end, start + duration are well formed', () => {
  assert.equal(checkHandoff(`${BL}?couple=1&start=2027-02-20&end=2027-02-27`, { today }).ok, true)
  assert.equal(checkHandoff(`${BL}?female=0&male=0&couple=1&start=2027-02-20&duration=8`, { today }).ok, true)
  const c = checkHandoff(`${BL}?start=2027-02-20&end=2027-02-27`, { today })
  assert.deepEqual([c.start, c.end, c.duration], ['2027-02-20', '2027-02-27', null])
})

test('hand-off: never an end without a start', () => {
  const c = checkHandoff(`${BL}?couple=1&end=2027-02-27`, { today })
  assert.equal(c.ok, false)
  assert.match(c.problems.join(), /end without a start/)
})

test('hand-off: a start needs an end or a duration, real dates, end after start, not in the past', () => {
  assert.match(checkHandoff(`${BL}?start=2027-02-20`, { today }).problems.join(), /without an end or a duration/)
  assert.match(checkHandoff(`${BL}?start=2027-02-30&end=2027-03-02`, { today }).problems.join(), /not a YYYY-MM-DD date/)
  assert.match(checkHandoff(`${BL}?start=20-02-2027&duration=8`, { today }).problems.join(), /not a YYYY-MM-DD date/)
  assert.match(checkHandoff(`${BL}?start=2027-02-20&end=2027-02-20`, { today }).problems.join(), /not after/)
  assert.match(checkHandoff(`${BL}?start=2026-10-04&end=2026-10-11`, { today }).problems.join(), /in the past/)
  assert.equal(checkHandoff(`${BL}?start=2026-10-05&end=2026-10-12`, { today }).ok, true, 'today is not the past')
  assert.match(checkHandoff(`${BL}?start=2027-02-20&duration=0`, { today }).problems.join(), /whole number/)
})

test('hand-off: OTA spellings, plain listing links, requireDates, https', () => {
  assert.equal(checkHandoff('https://www.booking.com/hotel/lk/x.html?checkin=2027-01-02&checkout=2027-01-05', { today }).ok, true)
  assert.match(checkHandoff('https://www.booking.com/hotel/lk/x.html?checkout=2027-01-05', { today }).problems.join(), /checkout without a start/)
  assert.equal(checkHandoff('https://www.booking.com/hotel/lk/the-lavish-haven.html', { today }).ok, true)
  assert.match(checkHandoff(BL, { today, requireDates: true }).problems.join(), /no start date/)
  assert.match(checkHandoff('http://www.booking.com/hotel/lk/x.html', { today }).problems.join(), /not https/)
  assert.equal(checkHandoff('not a url', { today }).ok, false)
})

test('dates and engines', () => {
  assert.ok(parseISODate('2028-02-29'))
  assert.equal(parseISODate('2027-02-29'), null)
  assert.equal(isEngineUrl(BL), true)
  assert.equal(isEngineUrl('https://www.hostelworld.com/hostels/p/1/x/'), true)
  assert.equal(isEngineUrl('https://rosa.surf/spot/kabalana'), false)
})

test('contact links', () => {
  assert.equal(checkContactLink('https://wa.me/972523593240?text=Hi').ok, true)
  assert.equal(checkContactLink('https://wa.me/12').ok, false)
  assert.equal(checkContactLink('tel:+94 77 000 0101').ok, true)
  assert.equal(checkContactLink('tel:abc').ok, false)
})

test('srcset and css url()', () => {
  assert.deepEqual(parseSrcset('photos/a-640.webp 640w, photos/a-1066.webp 1066w'), ['photos/a-640.webp', 'photos/a-1066.webp'])
  assert.deepEqual(parseSrcset('a.jpg 1x,b.jpg 2x'), ['a.jpg', 'b.jpg'])
  assert.deepEqual(cssUrls(`@font-face{src:url("/f/x.woff2") format("woff2")} .a{background:url(img/b.webp)} .c{mask:url(data:image/svg+xml;x)} .d{fill:url(#g)}`), ['/f/x.woff2', 'img/b.webp'])
})

const PAGE = `<!doctype html><html><head><meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://x.os1.workers.dev/"><link rel="stylesheet" href="/s.css"><link rel="preconnect" href="https://fonts.example">
<style>.h{background:url(img/bg.webp)}</style></head><body>
<!-- <img src="commented.jpg"> -->
<a href="book/">Book package now</a> <a href="https://wa.me/94770000101">WhatsApp</a>
<picture><source type="image/webp" srcset="photos/a-640.webp 640w, photos/a-1066.webp 1066w"><img src="photos/a-640.jpg" alt=""></picture>
<video poster="video/p.jpg" data-hero-video><source data-src="video/v.m1280.webm" type="video/webm; codecs=&quot;av01.0.08M.08&quot;"></video>
<div data-mp4="../video/l.d1920.mp4" data-json="https://rosa-data-opal.vercel.app/data/spots/kabalana.json" data-rosa="https://rosa.surf/widget/?spot=kabalana&amp;theme=light"></div>
<script>const s = '<img src="in-script.jpg">'</script><script src="/app.js"></script>
<form class="bk" method="get" action="${BL.replace('level-2-rollers', 'level-1-fomies')}">
<input type="radio" name="level" value="level-1-fomies" form="none" checked>
<select id="f-start" name="start" required><option value="">Choose</option><option value="2026-10-24">24 Oct</option><option value="2026-10-31">31 Oct</option></select>
<select name="duration" required><option value="8">7 nights</option><option value="15">14 nights</option></select>
<input name="couple" type="number" value="0"><button type="submit" formaction="${BL}">Book</button></form>
</body></html>`

test('extractRefs: links, assets incl. lazy video sources, forms, robots, forecast', () => {
  const r = extractRefs(PAGE, 'https://x.os1.workers.dev/')
  const urls = r.assets.map((a) => a.url.replace('https://x.os1.workers.dev', ''))
  for (const u of ['/s.css', '/photos/a-640.webp', '/photos/a-1066.webp', '/photos/a-640.jpg', '/video/p.jpg', '/video/v.m1280.webm', '/video/l.d1920.mp4', '/img/bg.webp', '/app.js']) assert.ok(urls.includes(u), `missing ${u}`)
  for (const u of ['/commented.jpg', '/in-script.jpg']) assert.ok(!urls.includes(u), `should not include ${u}`)
  assert.ok(!r.assets.some((a) => a.url.includes('rosa')), 'third-party data-* URLs are not page assets')
  assert.ok(!r.assets.some((a) => a.url.includes('fonts.example')), 'preconnect is not an asset')
  assert.equal(r.assets.find((a) => a.url.endsWith('v.m1280.webm')).type, 'video/webm; codecs="av01.0.08M.08"')
  assert.deepEqual(r.links.filter((l) => !l.rel).map((l) => l.url), ['https://x.os1.workers.dev/book/', 'https://wa.me/94770000101'])
  assert.equal(r.robots, 'noindex, nofollow')
  assert.equal(r.canonical, 'https://x.os1.workers.dev/')
  assert.deepEqual(r.forecastJson, ['https://rosa-data-opal.vercel.app/data/spots/kabalana.json'])
  assert.equal(r.forms.length, 1)
  assert.deepEqual(r.forms[0].fields.map((f) => f.name), ['start', 'duration', 'couple'], 'form="none" radios are not submitted')
})

test('form hand-off: the stay a GET form would send', () => {
  const [form] = extractRefs(PAGE, 'https://x.os1.workers.dev/book/').forms
  const fh = formHandoff(form)
  assert.equal(fh.engine, true)
  assert.deepEqual(fh.targets, [BL.replace('level-2-rollers', 'level-1-fomies'), BL])
  assert.equal(fh.start.name, 'start')
  assert.deepEqual(fh.start.options, ['2026-10-24', '2026-10-31'])
  assert.deepEqual(fh.duration.options, ['8', '15'])
  assert.deepEqual(checkFormHandoff(fh, { today }), [])
  assert.match(checkFormHandoff(fh, { today: new Date('2026-11-01') }).join(), /every start option is in the past/)
  assert.match(checkFormHandoff({ ...fh, duration: null }, { today }).join(), /without an end or a duration field/)
  assert.match(checkFormHandoff({ ...fh, start: null, end: 'end' }, { today }).join(), /end without a start field/)
  assert.match(checkFormHandoff({ ...fh, method: 'post' }, { today }).join(), /method post/)
})

test('SEO plumbing: preview rule and robots.txt', () => {
  assert.equal(isPreviewUrl('https://layday-surf.os1.workers.dev/'), true)
  assert.equal(isPreviewUrl('http://127.0.0.1:8799/'), true)
  assert.equal(isPreviewUrl('https://www.layday-surf.com/'), false)
  const preview = `# Preview build\nUser-agent: *\nDisallow: /\n\nUser-agent: GPTBot\nUser-agent: ClaudeBot\nDisallow: /\n`
  assert.deepEqual(robotsInfo(preview), { starGroup: true, disallowAll: true, sitemaps: [] })
  const prod = `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: https://www.x.com/sitemap.xml\n`
  assert.deepEqual(robotsInfo(prod), { starGroup: true, disallowAll: false, sitemaps: ['https://www.x.com/sitemap.xml'] })
  assert.equal(robotsInfo(`User-agent: GPTBot\nDisallow: /\n`).disallowAll, false, 'a named group alone does not close the site')
  assert.deepEqual(sitemapLocs('<urlset><url><loc>https://x.com/</loc></url><url><loc> https://x.com/book/?a=1&amp;b=2 </loc></url></urlset>'), ['https://x.com/', 'https://x.com/book/?a=1&b=2'])
})

test('forecast freshness: < 24 h, current.h as [min, max] or a number', () => {
  const now = new Date('2026-10-05T12:00:00Z')
  assert.equal(forecastFreshness({ generated_at: '2026-10-05T08:26:20+00:00', current: { h: [0.3, 0.5] } }, { now }).ok, true)
  assert.equal(forecastFreshness({ generated_at: '2026-10-05T08:26:20+00:00', current: { h: 0.4 } }, { now }).ok, true)
  const stale = forecastFreshness({ generated_at: '2026-10-04T11:00:00Z', current: { h: [0.3, 0.5] } }, { now })
  assert.equal(stale.ok, false)
  assert.match(stale.problem, /stale: 25 h/)
  assert.equal(forecastFreshness({ generated_at: '2026-10-05T08:00:00Z', current: {} }, { now }).problem, 'no current.h')
  assert.equal(forecastFreshness({}, { now }).ok, false)
})

test('video: container sniffing and the renditions of a videos.generated.json', () => {
  assert.equal(sniffVideo(Buffer.from([0, 0, 0, 0x20, ...Buffer.from('ftypisom')])), 'mp4')
  assert.equal(sniffVideo(Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x9f])), 'webm')
  assert.equal(sniffVideo(Buffer.from('<!doctype html>')), null)
  const m = { recipe: 'v1', videos: { 'gs-hero-loop.mp4': { tiers: {
    d1920: { webm: { src: 'video/gs-hero-loop.d1920.webm', type: 'video/webm', width: 1728, height: 972 }, mp4: { src: 'video/gs-hero-loop.d1920.mp4', type: 'video/mp4', width: 1728, height: 972 } },
    m720: { mp4: { src: 'video/gs-hero-loop.m720.mp4', type: 'video/mp4', width: 720, height: 406 } },
  }, poster: { src: 'video/gs-hero-loop-poster.1280.jpg' } } } }
  assert.deepEqual(videoRenditions(m).map((r) => r.src), ['video/gs-hero-loop.d1920.webm', 'video/gs-hero-loop.d1920.mp4', 'video/gs-hero-loop.m720.mp4'])
})

test('monitor targets: deploy.json sites, preview lines, delivered domains, void skipped, one row per URL', () => {
  const L = (slug, from, to, agent, note, extra = {}) => ({ slug, from_state: from, to_state: to, agent, note, ...extra })
  const ledger = [
    L('ka', 'passed', 'passed', 'deployer', 'PREVIEW DEPLOY only. Worker created -> https://ka-surf-hostel.os1.workers.dev, version 1'),
    L('ka', 'passed', 'packaged', 'deployer', 'Station 6 (managed adapter)'),
    L('lay', 'passed', 'passed', 'deployer', "PREVIEW DEPLOY: Worker renamed 'layday-surf' -> https://layday-surf.os1.workers.dev; old https://layday-surf-ahangama.os1.workers.dev never deployed"),
    L('gs', 'passed', 'passed', 'orchestrator', 'PREVIEW DEPLOY (static, no CMS) -> https://global-surf-lodge-kabalana.os1.workers.dev (200)'),
    L('gone', 'passed', 'previewed', 'orchestrator', 'https://gone.os1.workers.dev'),
    L('gone', 'previewed', 'void', 'human', 'voided'),
    L('new', 'passed', 'previewed', 'orchestrator', 'preview https://new-brand.os1.workers.dev/ version 9'),
    L('seo', 'passed', 'passed', 'seo', 'robots on https://ka-surf-hostel.os1.workers.dev'),
  ]
  const deploys = {
    ka: { adapter: 'managed', worker: 'ka-surf-hostel', cms: 'https://cms.example', steps: [{ step: 'deploy', ok: true, evidence: { url: 'https://ka-surf-hostel.os1.workers.dev', live: { url: 'https://ka-surf-hostel.os1.workers.dev/' } } }] },
    sold: { adapter: 'managed', worker: 'sold', cms: 'https://cms.example', steps: [{ step: 'deploy', ok: true, evidence: {} }, { step: 'attach_domain', ok: true, evidence: { domain: 'www.sold-surf.com' } }] },
  }
  const t = collectTargets({ ledger, deploys, wrangler: { lay: 'layday-surf' } })
  assert.deepEqual(t.sites.map((s) => [s.slug, s.url, s.kind]), [
    ['gs', 'https://global-surf-lodge-kabalana.os1.workers.dev/', 'preview'],
    ['ka', 'https://ka-surf-hostel.os1.workers.dev/', 'cms-built'],
    ['lay', 'https://layday-surf.os1.workers.dev/', 'preview'],
    ['new', 'https://new-brand.os1.workers.dev/', 'preview'],
    ['sold', 'https://sold.os1.workers.dev/', 'cms-built'],
    ['sold', 'https://www.sold-surf.com/', 'production'],
  ])
  assert.deepEqual(t.cms, ['https://cms.example'])
})

test('parity: the whole <slug>-<sha256:8>- prefix goes, whatever the file is called', () => {
  const slug = 'global-surf-adventures'
  const cms = `<img src="photos/${slug}-1a2b3c4d-img-002-640.webp"><source data-src="video/${slug}-0f0e0d0c-gs-hero-loop.d1920.mp4"><a href="other-tenant-1a2b3c4d-img-1.jpg">`
  assert.equal(stripSeedPrefix(cms, slug), '<img src="photos/img-002-640.webp"><source data-src="video/gs-hero-loop.d1920.mp4"><a href="other-tenant-1a2b3c4d-img-1.jpg">')
  assert.equal(stripSeedPrefix(`${slug}-NOTHEX12-x.jpg`, slug), `${slug}-NOTHEX12-x.jpg`, 'only an 8-hex hash is a seed prefix')
  const local = '<img src="photos/img-002-640.webp"><source data-src="video/gs-hero-loop.d1920.mp4">'
  const p = parity(local, cms.replace(/<a [^>]*>/, ''), slug)
  assert.equal(p.identical, true)
  const d = parity(local, cms.replace('gs-hero-loop', 'gs-other'), slug)
  assert.equal(d.identical, false)
  assert.equal(d.differingCount, 2)
  assert.deepEqual(lineDiff('<a>\n<b>', '<a>\n<c>'), [{ line: 2, local: '<b>', cms: '<c>' }])
})
