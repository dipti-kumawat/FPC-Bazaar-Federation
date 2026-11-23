
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { eventImages, images } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import Img from '../components/Img.jsx';
import { imgSources } from '../lib/images.js';

const PAGE = 24;

// Every image dropped in src/assets/gallery (optionally inside a sub-folder = category) is picked up automatically.
const found = import.meta.glob('../assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });

const plain = (name) => (/^[a-z]{0,6}[-_ ]?\d+$/i.test(name) ? '' : name);
const pretty = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

const fromFiles = Object.entries(found).map(([path, src]) => {
  const parts = path.split('/gallery/')[1].split('/');
  const file = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  return {
    src,
    key: `gallery/${parts.join('/')}`,
    cat: parts.length > 1 ? parts[0] : '',
    label: plain(file) ? pretty(file) : '',
  };
}).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));

// Photos already on the site, so the gallery is never empty.
const seed = [
  ...eventImages.map((src) => ({ src, key: src, cat: 'events', label: '' })),
  {
    src: images.stall || '/images/fpc-stall.jpg',
    key: images.stall || '/images/fpc-stall.jpg',
    cat: 'events',
    label: '',
  },
];

export default function Gallery() {
  useSeo('gallery');
  const c = useC();
  const g = c.gallery;

  const all = useMemo(
    () => [...fromFiles, ...seed.filter((s) => !fromFiles.some((f) => f.src === s.src))],
    []
  );

  const cats = useMemo(
    () => [...new Set(all.map((x) => x.cat).filter(Boolean))],
    [all]
  );

  const [cat, setCat] = useState('');
  const [open, setOpen] = useState(-1);
  const [shown, setShown] = useState(PAGE);
  const [dir, setDir] = useState(1);

  const list = cat ? all.filter((x) => x.cat === cat) : all;

  const step = useCallback((d) => {
    setDir(d);
    setOpen((i) => (i < 0 ? i : (i + d + list.length) % list.length));
  }, [list.length]);

  useEffect(() => {
    if (open < 0) return;

    const k = (e) => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    document.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [open, step]);

  const catName = (k) => g.cats[k] || pretty(k);

  return (
    <>
      <PageHero title={g.title} sub={g.sub} crumb={g.crumb} />

      <Band>
        {cats.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={g.title}>
            {['', ...cats].map((k) => (
              <button
                key={k || 'all'}
                type="button"
                role="tab"
                aria-selected={cat === k}
                onClick={() => {
                  setCat(k);
                  setShown(PAGE);
                  setOpen(-1);
                }}
                className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition ${
                  cat === k
                    ? 'border-brand-700 bg-brand-700 text-white'
                    : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'
                }`}
              >
                {k ? catName(k) : g.all}
              </button>
            ))}
          </div>
        )}

        <motion.div
          key={cat || 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {list.slice(0, shown).map((p, i) => (
            <motion.div
              key={p.src}
              className="mb-4 break-inside-avoid"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.08,
                ease: [0.2, 0.7, 0.2, 1],
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setDir(1);
                  setOpen(i);
                }}
                aria-label={`${g.view} ${p.label || i + 1}`}
                className="group relative block w-full overflow-hidden border border-brand-100 bg-brand-900 shadow-card"
              >
                <Img
                  src={p.src}
                  mkey={p.key}
                  alt={p.label || g.alt}
                  natural
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition duration-700 group-hover:scale-105"
                />

                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-500 transition duration-500 group-hover:scale-x-100" />

                {p.label && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-left text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                    {p.label}
                  </span>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3">
          {shown < list.length && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="btn-outline"
            >
              {g.more}
            </button>
          )}

          <p className="text-sm text-slate-500">
            {g.count.replace('{n}', list.length)}
          </p>
        </div>
      </Band>

      <AnimatePresence>
        {open >= 0 && list[open] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={g.title}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4"
            onClick={() => setOpen(-1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={list[open].src}
                custom={dir}
                {...(() => {
                  const o = imgSources(list[open].key, list[open].src, 1600);
                  return { src: o.src, srcSet: o.srcSet };
                })()}
                sizes="92vw"
                alt={list[open].label || g.alt}
                className="max-h-[88vh] max-w-full cursor-grab object-contain active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                drag={list.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -70) step(1);
                  else if (info.offset.x > 70) step(-1);
                }}
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setOpen(-1)}
              aria-label={c.common.close}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
            >
              ×
            </button>

            {list.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label={g.prev}
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label={g.next}
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
                >
                  ›
                </button>
              </>
            )}

            <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-white">
              {list[open].label && <span>{list[open].label} · </span>}
              <span className="text-white/60">
                {open + 1} / {list.length}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
