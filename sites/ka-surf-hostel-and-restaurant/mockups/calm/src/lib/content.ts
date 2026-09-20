import data from '../tenant/content.json';

export type Photo = {
  id: string; alt: string; asset: string; license: string;
  width: number; height: number; src: string; srcset: string;
  bytes: Record<string, number>;
};

export const c = data as typeof data & { photos: Record<string, Photo> };

/** Copy blocks in a slot, in the order the copywriter wrote them. */
export const blocks = (slot: string) => c.copyBlocks.filter((b) => b.slot === slot);

/** One copy block by slot + index; throws rather than rendering a hole. */
export const block = (slot: string, i = 0) => {
  const b = blocks(slot)[i];
  if (!b) throw new Error(`content.json has no copyBlocks[slot=${slot}][${i}]`);
  return b;
};

/** A paragraph array, so the template never ships a "\n\n" as text. */
export const paras = (body: string) => body.split('\n\n').map((p) => p.trim()).filter(Boolean);

export const photo = (id: string): Photo => {
  const p = c.photos[id];
  if (!p) throw new Error(`photos.json does not declare ${id}`);
  return p;
};

export const rating = (platform: string) => c.ratings.find((r) => r.platform === platform);
