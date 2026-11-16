import { useLayoutEffect, useRef, useState } from 'react';
import { imgSources } from '../lib/images.js';

/**
 * Fast image: right-sized WebP for each screen (srcset), instant blurred preview while it loads,
 * lazy by default, and a soft fade-in. Falls back to the original file if it was never optimised.
 *
 * src       public URL ("/images/x.jpg") — or pass `mkey` + `src` for gallery files.
 * sizes     rendered width hint, e.g. "(min-width:1024px) 33vw, 100vw".
 * priority  above-the-fold image: load immediately with high priority.
 * fit       'cover' (default) or 'contain'.
 * wrapClassName  classes for the outer box (size / aspect ratio / rounding).
 */
export default function Img({ src, mkey, alt = '', sizes = '100vw', priority = false, fit = 'cover', className = '', wrapClassName = '', style, onError, natural = false, preferred = 960 }) {
  const key = mkey || src;
  const { src: url, srcSet, meta } = imgSources(key, src, preferred);
  const [loadedUrl, setLoadedUrl] = useState(null);
  const ref = useRef(null);
  const loaded = loadedUrl === url;

  // Cached images can finish before React attaches onLoad.
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setLoadedUrl(url);
  }, [url]);

  const box = natural && meta ? { aspectRatio: `${meta.w} / ${meta.h}` } : undefined;
  const positioned = /\b(absolute|fixed)\b/.test(wrapClassName);
  return (
    <span className={`${positioned ? '' : 'relative'} block overflow-hidden ${wrapClassName}`} style={box}>
      {meta && (
        <img src={meta.lqip} alt="" aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}
          style={style?.objectPosition ? { objectPosition: style.objectPosition } : undefined} />
      )}
      <img
        key={url}
        ref={ref}
        src={url}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        width={meta?.w}
        height={meta?.h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={() => setLoadedUrl(url)}
        onError={onError}
        style={style}
        className={`relative h-full w-full transition-opacity duration-700 ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${loaded || !meta ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </span>
  );
}
