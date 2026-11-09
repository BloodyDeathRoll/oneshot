#!/usr/bin/env node
// sites/the-sandhya/final/scripts/fonts.mjs — self-hosts the two families (hard constraint 10): copies the
// pinned Fontsource latin files from node_modules into public/fonts/, with their OFL licences. Fonts never
// go in git; this is their recipe (listed in scripts/make-media.sh's `# media:` header). Run by `npm run build`.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..')
const NM = join(SITE, 'node_modules')
const OUT = join(SITE, 'public/fonts')
mkdirSync(OUT, { recursive: true })
const files = [
  ['@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2', 'schibsted-grotesk-latin-wght-normal.woff2'],
  ['@fontsource-variable/schibsted-grotesk/LICENSE', 'license-schibsted-grotesk.txt'],
  ['@fontsource/sacramento/files/sacramento-latin-400-normal.woff2', 'sacramento-latin-400-normal.woff2'],
  ['@fontsource/sacramento/LICENSE', 'license-sacramento.txt'],
]
for (const [from, to] of files) copyFileSync(join(NM, from), join(OUT, to))
console.log(`fonts: ${files.length} files in public/fonts`)
