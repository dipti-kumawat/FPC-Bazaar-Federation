import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Arrow } from '../Icons.jsx';

/**
 * Horizontal card rail: swipe on touch, click-and-drag with a mouse, or use the arrow buttons.
 * A thin gold bar shows how far along the rail you are.
 */
export default function DragScroller({ children, prevLabel = 'Previous', nextLabel = 'Next', className = '' }) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current; if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(() => { update(); const el = ref.current; el?.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { el?.removeEventListener('scroll', update); window.removeEventListener('resize', update); }; }, []);

  const by = (dir) => { const el = ref.current; if (!el) return; const card = el.querySelector(':scope > *'); const w = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8; el.scrollBy({ left: dir * w, behavior: 'smooth' }); };

  const onDown = (e) => { if (e.pointerType !== 'mouse') return; const el = ref.current; drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }; };
  const onMove = (e) => { const d = drag.current; if (!d.down) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 5) { d.moved = true; ref.current.style.scrollSnapType = 'none'; ref.current.classList.add('cursor-grabbing'); } ref.current.scrollLeft = d.left - dx; };
  const onUp = () => { const d = drag.current; if (!d.down) return; d.down = false; ref.current.classList.remove('cursor-grabbing'); ref.current.style.scrollSnapType = ''; };
  // A drag should not count as a click on the card underneath.
  const onClickCapture = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } };

  const arrow = 'grid h-11 w-11 place-items-center rounded-full border border-brand-200 bg-white text-brand-800 shadow-card transition hover:border-brand-500 hover:bg-brand-50 disabled:cursor-default disabled:opacity-40';
  return (
    <div className={className}>
      <div
        ref={ref}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className="no-scrollbar -mx-4 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 [&>*]:w-[82%] [&>*]:shrink-0 [&>*]:snap-start sm:[&>*]:w-[46%] lg:[&>*]:w-[31.5%]"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-brand-100" aria-hidden="true">
          <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-gold-500" style={{ scaleX: scrollXProgress }} />
        </div>
        <button type="button" onClick={() => by(-1)} disabled={edges.start} aria-label={prevLabel} className={arrow}><Arrow className="h-4 w-4 rotate-180" /></button>
        <button type="button" onClick={() => by(1)} disabled={edges.end} aria-label={nextLabel} className={arrow}><Arrow className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
