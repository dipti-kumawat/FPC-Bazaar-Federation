import { useEffect, useRef, useState } from 'react';

/**
 * Animates its content in when it scrolls into view.
 * variant: 'up' (default), 'left', 'right', 'zoom', 'fade', or 'none' (used with `stagger`).
 * stagger: children rise one after another (used for section titles).
 * Without a `delay`, siblings in a grid stagger automatically through CSS.
 * Nothing is hidden for people who prefer reduced motion.
 */
export default function Reveal({ children, delay = 0, className = '', variant = 'up', stagger = false }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setOn(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-v={variant} className={`reveal ${stagger ? 'rv-stagger' : ''} ${on ? 'reveal-in' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
