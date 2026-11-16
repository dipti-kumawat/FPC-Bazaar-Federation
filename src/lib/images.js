import manifest from '../data/image-manifest.json';

/** Real size, available WebP widths and blur preview for an image (see scripts/optimize-images.mjs). */
export const imgMeta = (key) => (key ? manifest[key] : undefined);

/**
 * Responsive sources for an image key ("/images/x.jpg" or "gallery/x.jpg").
 * Falls back to the original file when the image has not been optimised yet.
 */
export function imgSources(key, original, preferred = 960) {
  const m = imgMeta(key);
  if (!m) return { src: original || key, srcSet: undefined, meta: undefined };
  const pick = m.v.find((w) => w >= preferred) ?? m.v[m.v.length - 1];
  return { src: `${m.base}-${pick}.webp`, srcSet: m.v.map((w) => `${m.base}-${w}.webp ${w}w`).join(', '), meta: m };
}
