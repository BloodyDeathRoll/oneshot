import type { CollectionConfig } from 'payload'

import { editors, editorsOrBuilder } from '../access/roles'
import { enforceOwnTenant } from '../hooks/enforceOwnTenant'
import { publishAfterChange, publishAfterDelete } from '../hooks/notifyPublisher'

/**
 * Tenant-scoped photos. Nothing is public: files are served through Payload's access control
 * (`/api/media/file/<name>`), and the static build downloads them with the builder key, so the
 * live sites never talk to the CMS.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Photo', plural: 'Photos' },
  admin: { group: 'My site', useAsTitle: 'filename' },
  access: {
    create: editors,
    read: editorsOrBuilder,
    update: editors,
    delete: editors,
  },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    // keep one original; Astro produces the responsive variants at build time
    imageSizes: [],
    adminThumbnail: ({ doc }) => (doc?.url as string) || null,
  },
  hooks: {
    beforeValidate: [enforceOwnTenant],
    afterChange: [publishAfterChange('media')],
    afterDelete: [publishAfterDelete('media')],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the photo for people who cannot see it.' },
    },
  ],
}
