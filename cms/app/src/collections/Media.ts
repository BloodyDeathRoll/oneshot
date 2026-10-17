import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { editors, editorsOrBuilder } from '../access/roles'
import { enforceOwnTenant } from '../hooks/enforceOwnTenant'
import { publishAfterChange, publishAfterDelete } from '../hooks/notifyPublisher'

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
export const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm'] as const

/**
 * Size caps per kind (schema v0.8). The request-level limit in payload.config.ts is the video cap,
 * so this hook is what keeps photos at their old 8 MB.
 */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024
export const MAX_VIDEO_BYTES = 20 * 1024 * 1024

const capBySize: CollectionBeforeValidateHook = ({ req }) => {
  const file = req.file
  if (!file) return
  const isVideo = (VIDEO_MIME_TYPES as readonly string[]).includes(file.mimetype)
  const cap = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES
  if (file.size > cap) {
    throw new APIError(
      `${isVideo ? 'Videos' : 'Photos'} can be at most ${cap / 1024 / 1024} MB; this file is ${(file.size / 1024 / 1024).toFixed(1)} MB.`,
      413,
      undefined,
      true,
    )
  }
}

/**
 * Tenant-scoped photos and videos. Nothing is public: files are served through Payload's access
 * control (`/api/media/file/<name>`), and the static build downloads them with the builder key, so
 * the live sites never talk to the CMS.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Photo or video', plural: 'Photos & videos' },
  admin: { group: 'My site', useAsTitle: 'filename' },
  access: {
    create: editors,
    read: editorsOrBuilder,
    update: editors,
    delete: editors,
  },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: [...IMAGE_MIME_TYPES, ...VIDEO_MIME_TYPES],
    // keep one original; Astro produces the responsive variants at build time
    imageSizes: [],
    // schema v0.10: the owner sets a photo's point of interest by clicking it; templates align motion on it
    focalPoint: true,
    // a video has no image thumbnail; the admin falls back to its file icon
    adminThumbnail: ({ doc }) =>
      typeof doc?.mimeType === 'string' && doc.mimeType.startsWith('video/') ? null : (doc?.url as string) || null,
  },
  hooks: {
    beforeValidate: [capBySize, enforceOwnTenant],
    afterChange: [publishAfterChange('media')],
    afterDelete: [publishAfterDelete('media')],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the photo or video for people who cannot see it.' },
    },
  ],
}
