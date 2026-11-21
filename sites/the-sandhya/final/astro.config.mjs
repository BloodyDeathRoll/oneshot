import { defineConfig } from 'astro/config'

// One Astro project for this one site (CLAUDE.md: no shared template). Static output only, relative URLs
// everywhere, so the same dist/ runs on *.workers.dev, in a subfolder, on the client's domain, or unzipped
// on any host. One page: the home page ported from the picked calm mockup ("The Artwork").
// CSS is inlined and every script is inline, so the page needs no /_astro/ path.
export default defineConfig({
  output: 'static',
  outDir: './dist',
  site: process.env.SITE_URL || undefined,
  build: { format: 'directory', inlineStylesheets: 'always', assets: 'assets' },
  compressHTML: true,
  devToolbar: { enabled: false },
  cacheDir: './.astro/cache',
  vite: { cacheDir: './.astro/vite' },
})
