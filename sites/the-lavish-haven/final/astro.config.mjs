import { defineConfig } from 'astro/config'

// One Astro project for this one site (CLAUDE.md: no shared template). Static output only;
// relative URLs everywhere so the same dist/ runs on *.workers.dev, in a subfolder, on the
// client's domain, or unzipped on any host.
export default defineConfig({
  output: 'static',
  outDir: './dist',
  site: process.env.SITE_URL || undefined,
  build: { format: 'file', inlineStylesheets: 'always', assets: 'assets' },
  compressHTML: true,
  devToolbar: { enabled: false },
  // caches stay inside this project, not in the shared (symlinked) node_modules
  cacheDir: './.astro/cache',
  vite: { cacheDir: './.astro/vite' },
})
