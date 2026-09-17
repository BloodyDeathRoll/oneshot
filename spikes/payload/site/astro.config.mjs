import { defineConfig } from 'astro/config'

// One template, many tenants. The publisher sets TENANT_SLUG and OUT_DIR per build, so two
// tenants never share an output (or cache) directory.
const tenant = process.env.TENANT_SLUG || 'unknown-tenant'

export default defineConfig({
  output: 'static',
  outDir: process.env.OUT_DIR || `./dist/${tenant}`,
  cacheDir: process.env.ASTRO_CACHE_DIR || `./node_modules/.astro-cache/${tenant}`,
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['en', 'si'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
})
