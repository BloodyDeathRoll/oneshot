/* the key scripts/photos.mjs writes each crop under: 'full' or 'r<h/w to 3 decimals>', plus '-tag' */
export const shapeKeyOf = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')
