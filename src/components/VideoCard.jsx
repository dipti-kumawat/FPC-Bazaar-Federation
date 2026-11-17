import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const EASE = 'cubic-bezier(.22,.8,.24,1)';
const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Self-hosted video card. Shows the poster with a play button. Clicking zooms the video out of the
 * card to the middle of the screen (and back on close). Esc, the X button or a click outside closes it.
 */
export default function VideoCard({ src, poster, title, desc, wide = false }) {
  const [mounted, setMounted] = useState(false);
  const origin = useRef(null);
  const btnRef = useRef(null);
  const boxRef = useRef(null);
  const backRef = useRef(null);
  const videoRef = useRef(null);
  const closing = useRef(false);

  const open = () => { origin.current = btnRef.current.getBoundingClientRect(); closing.current = false; setMounted(true); };

  // Zoom in: the box starts exactly over the card and grows to its final place.
  useLayoutEffect(() => {
    if (!mounted) return;
    const box = boxRef.current; const back = backRef.current; const v = videoRef.current;
    const play = () => { v?.play().catch(() => {}); };
    if (reduced() || !origin.current) { play(); return; }
    const to = box.getBoundingClientRect(); const from = origin.current;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const s = from.width / to.width;
    back.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease-out', fill: 'both' });
    const a = box.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${s})`, borderRadius: '10px' }, { transform: 'translate(0,0) scale(1)', borderRadius: '2px' }],
      { duration: 420, easing: EASE, fill: 'both' });
    a.onfinish = () => { a.cancel(); back.getAnimations().forEach((x) => x.cancel()); play(); };
  }, [mounted]);

  const close = useCallback(() => {
    if (closing.current) return; closing.current = true;
    const box = boxRef.current; const back = backRef.current; const v = videoRef.current;
    v?.pause();
    const done = () => { setMounted(false); btnRef.current?.focus({ preventScroll: true }); };
    if (reduced() || !origin.current || !box) { done(); return; }
    const from = btnRef.current.getBoundingClientRect(); const to = box.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const s = from.width / to.width;
    back.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease-in', fill: 'both' });
    const a = box.animate(
      [{ transform: 'translate(0,0) scale(1)', borderRadius: '2px' }, { transform: `translate(${dx}px, ${dy}px) scale(${s})`, borderRadius: '10px' }],
      { duration: 340, easing: EASE, fill: 'both' });
    a.onfinish = done;
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [mounted, close]);

  const boxStyle = { aspectRatio: wide ? '16 / 9' : '9 / 16', width: wide ? 'min(92vw, 1000px)' : 'min(92vw, calc(86vh * 9 / 16))' };

  return (
    <>
      <figure className="card overflow-hidden">
        <button ref={btnRef} type="button" onClick={open} aria-label={`Play: ${title}`}
          className={`group relative block w-full bg-brand-950 ${wide ? 'aspect-video' : 'aspect-[9/16]'}`}>
          {poster && <img src={poster} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />}
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-500 bg-brand-900/85 text-gold-400 shadow-lift transition group-hover:scale-110 group-hover:bg-brand-800" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
        <figcaption className="p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-brand-900">{title}</h3>
          {desc && <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>}
        </figcaption>
      </figure>

      {mounted && createPortal(
        <div role="dialog" aria-modal="true" aria-label={title} onClick={close} className="fixed inset-0 z-[100] grid place-items-center p-4">
          <div ref={backRef} className="absolute inset-0 bg-black/85" aria-hidden="true" />
          <button type="button" onClick={close} aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/50 text-2xl leading-none text-white hover:bg-black/80">×</button>
          <div className="relative flex flex-col items-center">
            <div ref={boxRef} onClick={(e) => e.stopPropagation()} style={{ ...boxStyle, willChange: 'transform' }} className="overflow-hidden bg-black shadow-2xl">
              <video ref={videoRef} className="h-full w-full object-contain" controls playsInline preload="auto" poster={poster} aria-label={title}>
                <source src={src} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-center font-display text-base font-semibold text-white">{title}</p>
          </div>
        </div>, document.body)}
    </>
  );
}