import { defineConfig } from 'astro/config'

// One Astro project for this one site (CLAUDE.md: no shared template). Static output only; relative URLs
// everywhere so the same dist/ runs on *.workers.dev, in a subfolder, on the client's domain, or unzipped on
// any host. One page: the home page (dist/index.html), a port of mockups/interactive ("Where you start").
//
// SITE_URL (build env) is the site's public address. The default is an ASSUMPTION until station 6 names the Worker: no such
// deployment exists. SITE_URL= (empty) leaves the og:image tags out. The build says which it used.
// No SITE_URL, or one on *.workers.dev / localhost, is a PREVIEW (IS_PREVIEW in src/lib/site.mjs): noindex, robots Disallow,
// no sitemap, and of the absolute URLs only og:image. A real domain gets canonical, hreflang, og:url, JSON-LD url / image and
// the sitemap (station 4h).
const ASSUMED = 'https://sanjee-surf-school.os1.workers.dev/'
const fromEnv = process.env.SITE_URL
if (fromEnv === undefined) console.warn(`[site] SITE_URL not set: og:image uses the assumed host ${ASSUMED}`)
else console.log(`[site] SITE_URL=${fromEnv || '(empty: no og:image)'}`)

export default defineConfig({
  output: 'static',
  outDir: './dist',
  site: fromEnv === undefined ? ASSUMED : fromEnv || undefined,
  build: { format: 'directory', inlineStylesheets: 'always', assets: 'assets' },
  compressHTML: true,
  devToolbar: { enabled: false },
  cacheDir: './.astro/cache',
  vite: { cacheDir: './.astro/vite' },
})
