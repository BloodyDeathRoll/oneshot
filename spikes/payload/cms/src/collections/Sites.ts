import type { CollectionConfig } from 'payload'

import type { Access } from 'payload'

import { editors, editorsOrBuilder, isOwner, superAdminOnly } from '../access/roles'
import { isMultiTenant } from '../lib/profile'
import { enforceOwnTenant } from '../hooks/enforceOwnTenant'
import { publishAfterChange, publishAfterDelete } from '../hooks/notifyPublisher'
import { e164, hhmm, httpsUrl } from '../lib/validators'

/**
 * Site content — schema v0.1 (contract: /schemas/site-content.md).
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
            { name: 'tagline', type: 'text', localized: true, maxLength: 140 },
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
          label: 'Photos',
          fields: [
            {
              name: 'photos',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Photos' },
              maxRows: 24,
              admin: { description: 'The first photo is the big one at the top of the page.' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text', localized: true, maxLength: 140 },
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
                { name: 'whatsapp', type: 'text', required: true, validate: (v: unknown) => e164(v, { required: true }), admin: { description: 'The "Book on WhatsApp" button opens a chat with this number.' } },
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
              admin: { description: 'Other places people can book you (booking engine, Instagram, …).' },
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
