import { useEffect, useRef } from 'react';

/** Thin gold bar at the very top that fills as the page is scrolled. */
export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]" aria-hidden="true"><div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" /></div>;
}
