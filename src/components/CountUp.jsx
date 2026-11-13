import { useEffect, useRef, useState } from 'react';

/**
 * Counts up to the number inside `value` (e.g. "6,000+", "Section 8", "2022") when it scrolls into view,
 * then stops on the exact original text. Reduced-motion users just see the final value.
 */
const fmt = new Intl.NumberFormat('en-IN');

export default function CountUp({ value, duration = 2200, className = '' }) {
  const m = String(value).match(/^(\D*)([\d,]+)(.*)$/);
  const ref = useRef(null);
  const [text, setText] = useState(m ? `${m[1]}${m[2].startsWith('0') ? m[2] : (isYear(m[2]) ? Number(m[2].replace(/,/g, '')) - 40 : 0)}${m[3]}` : String(value));

  useEffect(() => {
    if (!m) return undefined;
    const end = Number(m[2].replace(/,/g, ''));
    const start = isYear(m[2]) ? end - 40 : 0;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setText(String(value)); return undefined; }
    let raf; let done = false;
    const run = () => {
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const n = Math.round(start + (end - start) * eased);
        setText(p >= 1 ? String(value) : `${m[1]}${isYear(m[2]) ? n : fmt.format(n)}${m[3]}`);
        if (p < 1) raf = requestAnimationFrame(step); else done = true;
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !done) { io.disconnect(); run(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} className={`tabular-nums ${className}`} aria-label={String(value)}>{text}</span>;
}

function isYear(s) { const n = Number(s); return !s.includes(',') && n >= 1900 && n <= 2100; }
