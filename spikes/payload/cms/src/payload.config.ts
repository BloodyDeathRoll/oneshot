import { postgresAdapter } from '@payloadcms/db-postgres'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { isSuperAdmin } from './access/roles'
import { Builders } from './collections/Builders'
import { Media } from './collections/Media'
import { Sites } from './collections/Sites'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { bootstrap } from './lib/bootstrap'
import { isMultiTenant, PROFILE } from './lib/profile'
import { migrations as multiTenantMigrations } from './migrations/multi-tenant'
import { migrations as singleTenantMigrations } from './migrations/single-tenant'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const serverURL = process.env.SERVER_URL || 'http://localhost:3100'

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Oneshot CMS (spike)' },
  },
  // same collections and fields in both profiles; `tenants` only exists on the shared server
  collections: isMultiTenant ? [Sites, Media, Tenants, Users, Builders] : [Sites, Media, Users, Builders],
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'si', label: 'සිංහල' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // the plugin adds tenant columns, so each profile has its own migration history
    migrationDir: path.resolve(dirname, 'migrations', PROFILE),
    // production containers migrate on boot; `next dev` uses drizzle push instead
    prodMigrations: isMultiTenant ? multiTenantMigrations : singleTenantMigrations,
  }),
  plugins: [
    multiTenantPlugin({
      enabled: isMultiTenant,
      collections: {
        sites: { isGlobal: true },
        media: {},
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],
  cors: [serverURL],
  csrf: [serverURL],
  graphQL: { disable: true },
  upload: { limits: { fileSize: 8 * 1024 * 1024 }, abortOnLimit: true },
  sharp,
  telemetry: false,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  onInit: bootstrap,
})
