import { defineConfig } from 'astro/config'

// One Astro project for this one site (CLAUDE.md: no shared template). Static output only; relative URLs
// everywhere so the same dist/ runs on *.workers.dev, in a subfolder, on the client's domain, or unzipped on
// any host. Two pages: the home page with the booking drawer (dist/index.html) and the same booking form as
// a page of its own (dist/book/index.html), the URL the drawer pushes and the JS-off path.
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
