import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Img from '../Img.jsx';
import { imgSources } from '../../lib/images.js';

/**
 * Cross-fading photo slideshow with a slow zoom ("Ken Burns"), used inside the hero arch.
 * Pauses on hover/focus; shows only the first photo for visitors who prefer reduced motion.
 */
export default function HeroSlideshow({ slides, interval = 5500, label }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = slides.length;

  useEffect(() => {
    if (reduce || paused || n < 2) return undefined;
    const id = setTimeout(() => setI((x) => (x + 1) % n), interval);
    return () => clearTimeout(id);
  }, [i, paused, reduce, n, interval]);

  // Warm the next photo so the cross-fade never shows an empty frame.
  useEffect(() => {
    if (n < 2) return;
    const next = slides[(i + 1) % n];
    // Same responsive WebP the <Img> will pick, so the browser reuses it from cache.
    const { src, srcSet } = imgSources(next.src, next.src, 960);
    const img = new Image();
    if (srcSet) { img.sizes = '(min-width: 1024px) 28rem, 90vw'; img.srcset = srcSet; }
    img.src = src;
  }, [i, n, slides]);

  const s = slides[i];
  return (
    <div className="absolute inset-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} role="region" aria-roledescription="carousel" aria-label={label}>
      <AnimatePresence initial={false}>
        <motion.div
          key={s.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduce ? 0 : (interval + 1200) / 1000, ease: 'easeOut' }}
          >
            <Img src={s.src} alt={s.alt} sizes="(min-width: 1024px) 28rem, 90vw" priority={i === 0} style={s.pos ? { objectPosition: s.pos } : undefined} wrapClassName="absolute inset-0" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {n > 1 && (
        <div className="absolute inset-x-0 top-[14%] z-10 flex justify-center gap-2">
          {slides.map((x, k) => (
            <button key={x.src} type="button" onClick={() => setI(k)} aria-label={`${k + 1} / ${n}`} aria-current={k === i}
              className="h-1.5 overflow-hidden rounded-full bg-white/40 transition-all duration-500" style={{ width: k === i ? 28 : 8 }}>
              {k === i && !reduce && !paused && <motion.span key={i} className="block h-full bg-gold-400" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: interval / 1000, ease: 'linear' }} />}
              {k === i && (reduce || paused) && <span className="block h-full w-full bg-gold-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
