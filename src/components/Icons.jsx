/** Line icons for categories, network roles and UI. All use currentColor. */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

const SHAPES = {
  grains: <><path d="M24 44V12" /><path d="M24 20c-6 0-9-4-9-9 6 0 9 4 9 9ZM24 20c6 0 9-4 9-9-6 0-9 4-9 9ZM24 30c-6 0-9-4-9-9 6 0 9 4 9 9ZM24 30c6 0 9-4 9-9-6 0-9 4-9 9ZM24 40c-6 0-9-4-9-9 6 0 9 4 9 9ZM24 40c6 0 9-4 9-9-6 0-9 4-9 9Z" /><path d="M24 12c-2-3-2-6 0-8 2 2 2 5 0 8Z" /></>,
  produce: <><path d="M24 14c-4-3-12-1-12 9 0 9 6 17 12 17s12-8 12-17c0-10-8-12-12-9Z" /><path d="M24 14c0-4 2-7 6-8" /></>,
  dairy: <><path d="M19 5h10v6l4 6v24a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3V17l4-6Z" /><path d="M15 24h18M19 5v6M29 5v6" /></>,
  inputs: <><path d="M24 40V22" /><path d="M24 26c-8 0-12-5-12-11 8 0 12 5 12 11ZM24 22c0-6 4-10 11-10 0 7-4 10-11 10Z" /><path d="M10 40h28" /></>,
  spices: <><path d="M30 12c6 4 8 12 2 20-4 6-12 9-20 9 6-6 10-9 12-17 1-5 3-9 6-12Z" /><path d="M30 12c1-3 3-5 6-5" /></>,
  processed: <><path d="M16 7h16v6H16z" /><path d="M14 13h20v4c3 2 4 5 4 8v13a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V25c0-3 1-6 4-8Z" /><path d="M14 25h20v9H14z" /></>,
  equipment: <><circle cx="24" cy="24" r="6" /><circle cx="24" cy="24" r="13" /><path d="M24 5v6M24 37v6M5 24h6M37 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" /></>,
  feed: <><rect x="7" y="14" width="34" height="22" rx="3" /><path d="M7 22h34M7 29h34M18 14v22M30 14v22" /></>,
  farmer: <><circle cx="24" cy="15" r="6" /><path d="M16 11h16M10 42c0-9 6-15 14-15s14 6 14 15" /></>,
  fpo: <><circle cx="24" cy="12" r="5" /><circle cx="10" cy="35" r="5" /><circle cx="38" cy="35" r="5" /><path d="M21 16.5 13 31M27 16.5 35 31M15 36h18" /></>,
  manufacturer: <><path d="M6 42V22l11 7v-7l11 7V12h8v30Z" /><path d="M4 42h40M34 12V6" /></>,
  supplier: <><path d="M4 12h26v22H4z" /><path d="M30 20h9l5 7v7H30z" /><circle cx="14" cy="36" r="4" fill="#fff" /><circle cx="36" cy="36" r="4" fill="#fff" /></>,
  connect: <><circle cx="12" cy="24" r="6" /><circle cx="36" cy="24" r="6" /><path d="M18 24h12M26 20l4 4-4 4" /></>,
  shield: <><path d="M24 5 8 11v11c0 10 7 17 16 21 9-4 16-11 16-21V11Z" /><path d="m16 24 6 6 11-12" /></>,
  doc: <><path d="M12 5h18l8 8v30H12z" /><path d="M30 5v8h8M18 24h14M18 31h14M18 38h8" /></>,
  scale: <><path d="M24 6v36M10 42h28M10 14h28" /><path d="m10 14-6 14h12ZM38 14l-6 14h12Z" /></>,
  pin: <><path d="M24 44s13-12 13-23a13 13 0 0 0-26 0c0 11 13 23 13 23Z" /><circle cx="24" cy="21" r="5" /></>,
};

export function Icon({ name, className = 'h-6 w-6', ...rest }) {
  const shape = SHAPES[name] || SHAPES.grains;
  return <svg viewBox="0 0 48 48" className={className} {...S} aria-hidden="true" {...rest}>{shape}</svg>;
}

export const Arrow = ({ className = 'h-4 w-4' }) => <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>;
export const Search = ({ className = 'h-5 w-5' }) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
export const Chevron = ({ className = 'h-3.5 w-3.5' }) => <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>;
export const Check = ({ className = 'h-4 w-4' }) => <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 10.5 4 4 8-9" /></svg>;
export const Pin = ({ className = 'h-4 w-4' }) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>;
