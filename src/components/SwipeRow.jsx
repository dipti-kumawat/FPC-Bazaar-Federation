import { Children, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Horizontal swipe row. Phones: swipe with the finger. Desktop: drag with the mouse, or use the arrows.
 * Shows about 4 cards on large screens, 2 on tablets and 1.2 on phones; the rest appear when you swipe.
 * Every child becomes one slide. Add as many children as you like.
 */
export default function SwipeRow({ children, label = 'Swipe to see more', three = false }) {
  const ref = useRef(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const [edge, setEdge] = useState({ start: true, end: false });
  const [dots, setDots] = useState({ n: 1, i: 0 });
  const items = Children.toArray(children);

  const measure = useCallback(() => {
    const el = ref.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    const pages = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setDots({ n: pages, i: max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1)) });
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current; if (!el) return undefined;
    const ro = new ResizeObserver(measure); ro.observe(el);
    return () => ro.disconnect();
  }, [measure, items.length]);

  const go = (dir) => { const el = ref.current; el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' }); };

  const down = (e) => { if (e.pointerType !== 'mouse') return; const el = ref.current; drag.current = { on: true, x: e.clientX, left: el.scrollLeft, moved: false }; };
  const move = (e) => {
    const d = drag.current; if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) { d.moved = true; ref.current.style.scrollSnapType = 'none'; ref.current.style.cursor = 'grabbing'; }
    if (d.moved) ref.current.scrollLeft = d.left - dx;
  };
  const up = () => {
    const el = ref.current; const d = drag.current; if (!d.on) return;
    d.on = false; el.style.cursor = ''; el.style.scrollSnapType = '';
    if (d.moved) setTimeout(() => { d.moved = false; }, 0);
  };
  const swallowClick = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } };

  const arrow = 'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-brand-200 bg-white text-brand-800 shadow-lift transition hover:bg-brand-800 hover:text-white disabled:opacity-0 md:grid';

  return (
    <div className="relative" role="region" aria-label={label}>
      <button type="button" aria-label="Previous" onClick={() => go(-1)} disabled={edge.start} className={`${arrow} -left-3 lg:-left-6`}>
        <svg viewBox="0 0 20 20" className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
      </button>
      <button type="button" aria-label="Next" onClick={() => go(1)} disabled={edge.end} className={`${arrow} -right-3 lg:-right-6`}>
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
      </button>

      <div ref={ref} onScroll={measure} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onClickCapture={swallowClick}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
        {items.map((child, i) => (
          <div key={child.key ?? i} className={`w-[78%] shrink-0 snap-start sm:w-[calc(50%-10px)] ${three ? 'lg:w-[calc(33.333%-14px)]' : 'lg:w-[calc(25%-15px)]'}`}>{child}</div>
        ))}
      </div>

      {dots.n > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2" aria-hidden="true">
          {Array.from({ length: dots.n }).map((_, i) => <span key={i} className={`h-2 rounded-full transition-all ${i === dots.i ? 'w-6 bg-gold-500' : 'w-2 bg-brand-200'}`} />)}
        </div>
      )}
      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[.18em] text-slate-400 md:hidden">{label}</p>
    </div>
  );
}