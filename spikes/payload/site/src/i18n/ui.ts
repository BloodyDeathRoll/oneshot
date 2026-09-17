/**
 * Template-owned interface strings. These are NOT in the CMS: owners edit their content, the
 * template owns its own labels. (Sinhala strings here are spike placeholders — have a native
 * speaker review them before any client sees them.)
 */
import type { Day, Locale, Unit } from '../lib/content'

export const ui = {
  en: {
    langName: 'English',
    book: 'Book on WhatsApp',
    waGreeting: (name: string) => `Hi ${name}! I'd like to book.`,
    prices: 'Prices',
    photos: 'Photos',
    hours: 'Opening hours',
    contact: 'Find us',
    closed: 'Closed',
    map: 'Open in Maps',
    call: 'Call',
    email: 'Email',
    alsoBook: 'You can also book here',
    skip: 'Skip to content',
  },
  si: {
    langName: 'සිංහල',
    book: 'WhatsApp හරහා වෙන් කරන්න',
    waGreeting: (name: string) => `ආයුබෝවන් ${name}! මට වෙන් කිරීමක් කරන්න අවශ්‍යයි.`,
    prices: 'මිල ගණන්',
    photos: 'ඡායාරූප',
    hours: 'විවෘත වේලාවන්',
    contact: 'අපව සොයාගන්න',
    closed: 'වසා ඇත',
    map: 'සිතියමේ බලන්න',
    call: 'අමතන්න',
    email: 'ඊමේල්',
    alsoBook: 'මෙතැනින්ද වෙන් කළ හැක',
    skip: 'අන්තර්ගතයට යන්න',
  },
} as const

export const dayNames: Record<Locale, Record<Day, string>> = {
  en: { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' },
  si: { mon: 'සඳුදා', tue: 'අඟහරුවාදා', wed: 'බදාදා', thu: 'බ්‍රහස්පතින්දා', fri: 'සිකුරාදා', sat: 'සෙනසුරාදා', sun: 'ඉරිදා' },
}

export const unitNames: Record<Locale, Record<Unit, string>> = {
  en: { per_hour: 'per hour', per_lesson: 'per lesson', per_day: 'per day', per_week: 'per week', per_person: 'per person', flat: '' },
  si: { per_hour: 'පැයකට', per_lesson: 'පාඩමකට', per_day: 'දිනකට', per_week: 'සතියකට', per_person: 'එක් අයෙකුට', flat: '' },
}

export const formatPrice = (locale: Locale, price: number, currency: string): string =>
  new Intl.NumberFormat(locale === 'si' ? 'si-LK' : 'en-LK', {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price)
