import { useEffect, useMemo, useState, useCallback } from 'react';
import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { eventImages, images } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import Reveal from '../components/Reveal.jsx';

// Every image dropped in src/assets/gallery (optionally inside a sub-folder = category) is picked up automatically.
const found = import.meta.glob('../assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });

const pretty = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
const fromFiles = Object.entries(found).map(([path, src]) => {
  const parts = path.split('/gallery/')[1].split('/');
  const file = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  return { src, cat: parts.length > 1 ? parts[0] : '', label: pretty(file) };
}).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));

// Photos already on the site, so the gallery is never empty.
const seed = [...eventImages.map((src) => ({ src, cat: 'events', label: '' })), { src: images.stall || '/images/fpc-stall.jpg', cat: 'events', label: '' }];

export default function Gallery() {
  useSeo('gallery');
  const c = useC(); const g = c.gallery;
  const all = useMemo(() => [...fromFiles, ...seed.filter((s) => !fromFiles.some((f) => f.src === s.src))], []);
  const cats = useMemo(() => [...new Set(all.map((x) => x.cat).filter(Boolean))], [all]);
  const [cat, setCat] = useState('');
  const list = cat ? all.filter((x) => x.cat === cat) : all;
  const [open, setOpen] = useState(-1);
  const step = useCallback((d) => setOpen((i) => (i < 0 ? i : (i + d + list.length) % list.length)), [list.length]);
  useEffect(() => {
    if (open < 0) return;
    const k = (e) => { if (e.key === 'Escape') setOpen(-1); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open, step]);
  const catName = (k) => g.cats[k] || pretty(k);

  return (
    <>
      <PageHero title={g.title} sub={g.sub} crumb={g.crumb} />
      <Band>
        {cats.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={g.title}>
            {['', ...cats].map((k) => (
              <button key={k || 'all'} type="button" role="tab" aria-selected={cat === k} onClick={() => setCat(k)}
                className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition ${cat === k ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'}`}>{k ? catName(k) : g.all}</button>
            ))}
          </div>
        )}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {list.map((p, i) => (
            <Reveal key={p.src} className="mb-4 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} aria-label={`${g.view} ${p.label || i + 1}`} className="group relative block w-full overflow-hidden border border-brand-100 bg-brand-900 shadow-card">
                <img src={p.src} alt={p.label || g.alt} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-500 transition duration-500 group-hover:scale-x-100" />
                {p.label && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-left text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">{p.label}</span>}
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">{g.count.replace('{n}', list.length)}</p>
      </Band>

      {open >= 0 && list[open] && (
        <div role="dialog" aria-modal="true" aria-label={g.title} className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4" onClick={() => setOpen(-1)}>
          <img src={list[open].src} alt={list[open].label || g.alt} className="max-h-[88vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <button type="button" onClick={() => setOpen(-1)} aria-label={c.common.close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">×</button>
          {list.length > 1 && <>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={g.prev} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">‹</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={g.next} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">›</button>
          </>}
          {list[open].label && <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-white">{list[open].label}</p>}
        </div>
      )}
    </>
  );
}
