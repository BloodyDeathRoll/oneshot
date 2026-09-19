// The template's view of schemas/site-content.md v0.2. Nothing here is hard-coded content.
export type Block = { slot: 'intro'|'about'|'offer'|'info'; heading?: string|null; body: string };
export type Room = { label: string; beds?: string|null; sleeps?: number|null; note?: string|null };
export type Amenity = { label: string; note?: string|null };
export type Rating = { platform: string; score: number; scale: '5'|'10'; count: number; url?: string|null };
export type Testimonial = { quote: string; author: string; source: string; date?: string|null };
export type Link = { label: string; url: string };
export type Content = {
  businessName: string; tagline?: string|null; copyBlocks: Block[];
  spot?: string|null; season?: string|null;
  rooms?: Room[]; amenities?: Amenity[]; ratings?: Rating[]; testimonials?: Testimonial[];
  stayInfo?: { checkInFrom?: string; checkInTo?: string; checkOutTo?: string; note?: string|null };
  contact: { phone?: string|null; whatsapp?: string|null; email?: string|null; address?: string|null; mapUrl?: string|null };
  bookingLinks?: Link[]; photos?: { src: string; alt: string }[];
};
export const blocks = (c: Content, slot: Block['slot']) => (c.copyBlocks || []).filter(b => b.slot === slot);
export const paras = (b: Block) => b.body.split(/\n\s*\n/);
export const photo = (c: Content, i: number) => (c.photos && c.photos.length) ? c.photos[i % c.photos.length] : null;
