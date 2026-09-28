import type { Access, CollectionConfig, Field } from 'payload'

import { editors, editorsOrBuilder, isOwner, superAdminOnly, superAdminOnlyField } from '../access/roles'
import { isMultiTenant } from '../lib/profile'
import { enforceOwnTenant } from '../hooks/enforceOwnTenant'
import { evidenceRowsDeleteOnly } from '../hooks/evidenceRowsDeleteOnly'
import { publishAfterChange, publishAfterDelete } from '../hooks/notifyPublisher'
import { e164, hhmm, httpsUrl, isoDate, slugId, yearMonth } from '../lib/validators'
import { IMAGE_MIME_TYPES, VIDEO_MIME_TYPES } from './Media'

/**
 * Site content — schema v0.8 (contract: /schemas/site-content.md).
 *
 * Registered with the multi-tenant plugin as `isGlobal`: exactly one document per tenant, shown
 * to the owner as a single "My site" form. Localized fields hold en + si values.
 */
export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
export const CURRENCIES = ['LKR', 'USD', 'EUR'] as const
export const UNITS = [
  { value: 'per_hour', label: 'per hour' },
  { value: 'per_lesson', label: 'per lesson' },
  { value: 'per_day', label: 'per day' },
  { value: 'per_week', label: 'per week' },
  { value: 'per_person', label: 'per person' },
  { value: 'flat', label: 'flat price' },
] as const
export const BUSINESS_TYPES = ['surf_school', 'surf_camp', 'beach_lodging', 'board_rental', 'surf_shop', 'shaper', 'other'] as const
export const PLATFORMS = ['google', 'booking', 'hostelworld', 'agoda', 'tripadvisor', 'airbnb', 'other'] as const
export const SPOKEN = ['en', 'si', 'ta', 'ru', 'de', 'fr', 'es', 'it', 'sv', 'other'] as const
export const LEVELS = ['first_time', 'beginner', 'intermediate', 'advanced'] as const

const opts = (values: readonly string[]) => values.map((v) => ({ label: v, value: v }))

/** Upload pickers only offer (and validation only accepts) media of the right kind. */
const onlyVideos = { mimeType: { in: [...VIDEO_MIME_TYPES] } }
const onlyImages = { mimeType: { in: [...IMAGE_MIME_TYPES] } }

/** price / currency / unit, all optional — lessons[] and rentals[] (priceList[] has its own, required). */
const optionalPrice: Field = {
  type: 'row',
  fields: [
    { name: 'price', type: 'number', min: 0, admin: { width: '34%' } },
    { name: 'currency', type: 'select', options: [...CURRENCIES], admin: { width: '33%' } },
    { name: 'unit', type: 'select', options: UNITS.map((u) => ({ ...u })), admin: { width: '33%' } },
  ],
}

/**
 * multi-tenant: the site document is created during tenant provisioning (super-admin).
 * single-tenant: the owner may create it, once — the collection is a singleton.
 */
const createSite: Access = async (args) => {
  if (isMultiTenant) return superAdminOnly(args)
  if (!isOwner(args.req.user)) return false
  const { totalDocs } = await args.req.payload.count({ collection: 'sites', req: args.req })
  return totalDocs === 0
}

export const Sites: CollectionConfig = {
  slug: 'sites',
  labels: { singular: 'My site', plural: 'My site' },
  admin: { useAsTitle: 'businessName', group: 'My site' },
  access: {
    // owners edit their one document; creating/deleting it is part of tenant provisioning
    create: createSite,
    read: editorsOrBuilder,
    update: editors,
    delete: superAdminOnly,
  },
  hooks: {
    beforeValidate: [enforceOwnTenant],
    beforeChange: [evidenceRowsDeleteOnly(['ratings', 'testimonials'])],
    afterChange: [publishAfterChange('sites')],
    afterDelete: [publishAfterDelete('sites')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basics',
          fields: [
            { name: 'businessName', type: 'text', required: true, maxLength: 80 },
            {
              name: 'businessType',
              type: 'select',
              required: true,
              defaultValue: 'surf_school',
              options: opts(BUSINESS_TYPES),
              admin: { description: 'What the business mainly earns its money doing.' },
            },
            { name: 'tagline', type: 'text', localized: true, maxLength: 140 },
            {
              name: 'featureLine',
              type: 'text',
              localized: true,
              maxLength: 140,
              admin: { description: 'A short line over the feature photo. Empty = no line.' },
            },
            {
              name: 'closing',
              type: 'text',
              localized: true,
              maxLength: 140,
              admin: { description: 'The line beside the last booking button. Empty = no line.' },
            },
            {
              name: 'languages',
              type: 'select',
              hasMany: true,
              required: true,
              defaultValue: ['en'],
              options: [
                { label: 'English', value: 'en' },
                { label: 'සිංහල (Sinhala)', value: 'si' },
              ],
              admin: { description: 'Languages the public site is published in. English is always on.' },
              validate: (value: unknown) =>
                (Array.isArray(value) && value.includes('en')) || 'English must stay enabled.',
            },
            {
              name: 'languagesSpoken',
              type: 'select',
              hasMany: true,
              options: opts(SPOKEN),
              admin: { description: 'Languages guests can be served in.' },
            },
          ],
        },
        {
          label: 'Text',
          fields: [
            {
              name: 'copyBlocks',
              type: 'array',
              labels: { singular: 'Text block', plural: 'Text blocks' },
              maxRows: 8,
              admin: { description: 'Short pieces of text. The design decides where each slot appears.' },
              fields: [
                {
                  name: 'slot',
                  type: 'select',
                  required: true,
                  defaultValue: 'about',
                  options: [
                    { label: 'Intro (top of page)', value: 'intro' },
                    { label: 'About us', value: 'about' },
                    { label: 'What we offer', value: 'offer' },
                    { label: 'Good to know', value: 'info' },
                  ],
                },
                { name: 'heading', type: 'text', localized: true, maxLength: 120 },
                { name: 'body', type: 'textarea', localized: true, required: true, maxLength: 1500 },
              ],
            },
          ],
        },
        {
          label: 'Opening hours',
          fields: [
            {
              name: 'openingHours',
              type: 'array',
              labels: { singular: 'Hours row', plural: 'Hours rows' },
              maxRows: 7,
              admin: { description: 'Days that are not listed are shown as closed.' },
              fields: [
                {
                  name: 'days',
                  type: 'select',
                  hasMany: true,
                  required: true,
                  options: DAYS.map((d) => ({ label: d.toUpperCase(), value: d })),
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'opens', type: 'text', required: true, validate: (v: unknown) => hhmm(v, { required: true }), admin: { placeholder: '07:00', width: '50%' } },
                    { name: 'closes', type: 'text', required: true, validate: (v: unknown) => hhmm(v, { required: true }), admin: { placeholder: '18:00', width: '50%' } },
                  ],
                },
              ],
            },
            { name: 'hoursNote', type: 'text', localized: true, maxLength: 200, admin: { description: 'e.g. "Closed on Poya days".' } },
          ],
        },
        {
          label: 'Prices',
          fields: [
            {
              name: 'priceList',
              type: 'array',
              labels: { singular: 'Price', plural: 'Prices' },
              maxRows: 30,
              fields: [
                { name: 'label', type: 'text', localized: true, required: true, maxLength: 80 },
                {
                  type: 'row',
                  fields: [
                    { name: 'price', type: 'number', required: true, min: 0, admin: { width: '34%' } },
                    { name: 'currency', type: 'select', required: true, defaultValue: 'LKR', options: [...CURRENCIES], admin: { width: '33%' } },
                    { name: 'unit', type: 'select', required: true, defaultValue: 'per_lesson', options: UNITS.map((u) => ({ ...u })), admin: { width: '33%' } },
                  ],
                },
                { name: 'note', type: 'text', localized: true, maxLength: 140 },
              ],
            },
          ],
        },
        {
          label: 'Photos & video',
          fields: [
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              filterOptions: onlyVideos,
              admin: {
                description:
                  'Optional. A short clip (8–20 seconds) shown silently and on a loop at the top of the page, instead of the first photo. Needs a poster image below.',
              },
            },
            {
              name: 'heroVideoPoster',
              type: 'upload',
              relationTo: 'media',
              filterOptions: onlyImages,
              // a video is never shown without a still in front of it (slow phones, Save-Data, reduced motion)
              validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) =>
                !siblingData?.heroVideo || Boolean(value) || 'A video needs a poster image: the still shown until it plays.',
              admin: {
                description: 'The still shown before the video plays, and instead of it on slow connections.',
                condition: (_, siblingData) => Boolean(siblingData?.heroVideo),
              },
            },
            {
              name: 'photos',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Photos' },
              maxRows: 24,
              admin: { description: 'The first photo is the big one at the top of the page.' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, filterOptions: onlyImages },
                { name: 'caption', type: 'text', localized: true, maxLength: 140 },
              ],
            },
            {
              name: 'videos',
              type: 'array',
              labels: { singular: 'Video', plural: 'Videos' },
              maxRows: 6,
              admin: { description: 'More short clips. The design decides where they play; each needs a poster image.' },
              fields: [
                { name: 'video', type: 'upload', relationTo: 'media', required: true, filterOptions: onlyVideos },
                { name: 'poster', type: 'upload', relationTo: 'media', required: true, filterOptions: onlyImages },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  required: true,
                  maxLength: 200,
                  admin: { description: 'What the video shows, for people who cannot see it.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Rooms & stay',
          admin: { description: 'For places people stay at. Leave empty otherwise.' },
          fields: [
            {
              name: 'rooms',
              type: 'array',
              labels: { singular: 'Room', plural: 'Rooms' },
              maxRows: 20,
              fields: [
                { name: 'label', type: 'text', localized: true, required: true, maxLength: 80 },
                { name: 'beds', type: 'text', localized: true, maxLength: 80 },
                { name: 'sleeps', type: 'number', min: 1 },
                { name: 'note', type: 'text', localized: true, maxLength: 140 },
                { name: 'photo', type: 'upload', relationTo: 'media', filterOptions: onlyImages },
              ],
            },
            {
              name: 'stayInfo',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'checkInFrom', type: 'text', validate: (v: unknown) => hhmm(v), admin: { placeholder: '14:00', width: '25%' } },
                    { name: 'checkInTo', type: 'text', validate: (v: unknown) => hhmm(v), admin: { placeholder: '22:00', width: '25%' } },
                    { name: 'checkOutFrom', type: 'text', validate: (v: unknown) => hhmm(v), admin: { placeholder: '08:00', width: '25%' } },
                    { name: 'checkOutTo', type: 'text', validate: (v: unknown) => hhmm(v), admin: { placeholder: '11:00', width: '25%' } },
                  ],
                },
                { name: 'minNights', type: 'number', min: 1 },
                { name: 'note', type: 'text', localized: true, maxLength: 200 },
              ],
            },
          ],
        },
        {
          label: 'Lessons',
          admin: { description: 'For surf schools and camps. Leave empty otherwise.' },
          fields: [
            {
              name: 'lessons',
              type: 'array',
              labels: { singular: 'Lesson', plural: 'Lessons' },
              maxRows: 20,
              fields: [
                { name: 'label', type: 'text', localized: true, required: true, maxLength: 80 },
                { name: 'durationMin', type: 'number', min: 1, admin: { description: 'Minutes.' } },
                { name: 'level', type: 'select', hasMany: true, options: opts(LEVELS) },
                { name: 'groupSize', type: 'text', localized: true, maxLength: 60 },
                { name: 'includes', type: 'text', localized: true, maxLength: 140 },
                optionalPrice,
              ],
            },
            {
              name: 'credentials',
              type: 'array',
              labels: { singular: 'Credential', plural: 'Credentials' },
              maxRows: 8,
              fields: [{ name: 'label', type: 'text', localized: true, required: true, maxLength: 100 }],
            },
          ],
        },
        {
          label: 'Rentals & shop',
          admin: { description: 'For board rental, surf shops and shapers. Leave empty otherwise.' },
          fields: [
            {
              name: 'rentals',
              type: 'array',
              labels: { singular: 'Rental', plural: 'Rentals' },
              maxRows: 30,
              fields: [
                { name: 'label', type: 'text', localized: true, required: true, maxLength: 80 },
                optionalPrice,
                { name: 'note', type: 'text', localized: true, maxLength: 140 },
              ],
            },
            {
              name: 'brands',
              type: 'array',
              labels: { singular: 'Brand', plural: 'Brands' },
              maxRows: 20,
              fields: [{ name: 'label', type: 'text', required: true, maxLength: 60 }],
            },
            {
              name: 'shaping',
              type: 'group',
              fields: [
                { name: 'boardTypes', type: 'text', localized: true, maxLength: 200 },
                { name: 'leadTime', type: 'text', localized: true, maxLength: 100 },
                { name: 'customOrder', type: 'textarea', localized: true, maxLength: 600 },
              ],
            },
          ],
        },
        {
          label: 'Amenities',
          fields: [
            {
              name: 'amenities',
              type: 'array',
              labels: { singular: 'Amenity', plural: 'Amenities' },
              maxRows: 40,
              admin: { description: 'A flat list. The design groups and orders them.' },
              fields: [
                { name: 'label', type: 'text', localized: true, required: true, maxLength: 60 },
                { name: 'note', type: 'text', localized: true, maxLength: 80, admin: { description: 'e.g. "additional charge", "on request".' } },
              ],
            },
          ],
        },
        {
          label: 'Surf',
          fields: [
            { name: 'spot', type: 'text', localized: true, maxLength: 200, admin: { description: 'The wave you sit on, in your words.' } },
            { name: 'season', type: 'text', localized: true, maxLength: 200 },
            {
              name: 'forecast',
              type: 'group',
              admin: { description: 'The surf forecast block for your break, by Rosa.' },
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: false, label: 'Show the forecast' },
                {
                  name: 'rosaSpotId',
                  type: 'text',
                  validate: (v: unknown) => slugId(v),
                  // the owner cannot retype the spot: a near-miss would silently show another break
                  access: { create: superAdminOnlyField, update: superAdminOnlyField },
                  admin: { description: 'Set by Oneshot.' },
                },
                { name: 'spotName', type: 'text', maxLength: 60 },
              ],
            },
          ],
        },
        {
          label: 'Reviews',
          admin: {
            description:
              'Ratings and guest quotes are copied from the platforms, word for word. You can delete a row; new rows are added by Oneshot.',
          },
          fields: [
            {
              name: 'ratings',
              type: 'array',
              labels: { singular: 'Rating', plural: 'Ratings' },
              maxRows: 6,
              fields: [
                { name: 'platform', type: 'select', required: true, options: opts(PLATFORMS) },
                {
                  type: 'row',
                  fields: [
                    { name: 'score', type: 'number', required: true, min: 0, admin: { width: '34%' } },
                    { name: 'scale', type: 'select', required: true, options: opts(['5', '10']), admin: { width: '33%' } },
                    { name: 'count', type: 'number', required: true, min: 1, admin: { width: '33%' } },
                  ],
                },
                { name: 'url', type: 'text', validate: (v: unknown) => httpsUrl(v) },
                { name: 'capturedAt', type: 'text', required: true, validate: (v: unknown) => isoDate(v, { required: true }), admin: { placeholder: 'YYYY-MM-DD' } },
              ],
            },
            {
              name: 'testimonials',
              type: 'array',
              labels: { singular: 'Guest quote', plural: 'Guest quotes' },
              maxRows: 12,
              fields: [
                // not localized: a guest's words are not translated
                { name: 'quote', type: 'textarea', required: true, maxLength: 600 },
                { name: 'author', type: 'text', required: true },
                { name: 'source', type: 'select', required: true, options: opts(PLATFORMS) },
                { name: 'date', type: 'text', validate: (v: unknown) => yearMonth(v), admin: { placeholder: 'YYYY-MM' } },
              ],
            },
          ],
        },
        {
          label: 'Contact & booking',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'phone', type: 'text', validate: (v: unknown) => e164(v) },
                // optional since schema v0.7: without it the booking links or the phone are the main action
                { name: 'whatsapp', type: 'text', validate: (v: unknown) => e164(v), admin: { description: 'When set, the "Book on WhatsApp" button opens a chat with this number.' } },
                { name: 'email', type: 'email' },
                { name: 'address', type: 'textarea', localized: true, maxLength: 300 },
                { name: 'mapUrl', type: 'text', validate: (v: unknown) => httpsUrl(v), admin: { description: 'Google Maps share link.' } },
              ],
            },
            {
              name: 'bookingLinks',
              type: 'array',
              labels: { singular: 'Booking link', plural: 'Booking links' },
              maxRows: 6,
              admin: { description: 'Places people can book you (booking engine, Booking.com, …).' },
              fields: [
                { name: 'label', type: 'text', localized: true, required: true, maxLength: 60 },
                { name: 'url', type: 'text', required: true, validate: (v: unknown) => httpsUrl(v, { required: true }) },
              ],
            },
          ],
        },
      ],
    },
  ],
}
