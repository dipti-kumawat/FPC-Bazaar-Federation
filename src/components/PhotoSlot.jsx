import { images } from '../config/site.js';
import Img from './Img.jsx';

/**
 * Displays an approved project photograph when its slot is configured.
 * Until real photographs are supplied, show a restrained editorial placeholder
 * rather than a synthetic illustration that could be mistaken for project evidence.
 */
export default function PhotoSlot({ slot, kind, alt = '', className = '', person, sizes = '(min-width: 1024px) 40vw, 100vw', priority = false }) {
  const src = slot && images[slot];
  if (src && person) {
    return (
      <div className={`bg-lattice relative grid h-full w-full place-items-center overflow-hidden bg-brand-800 py-6 ${className}`}>
        <Img src={src} alt={alt} sizes="176px" preferred={480} style={{ objectPosition: '50% 18%' }} wrapClassName="h-40 w-40 rounded-full border-[3px] border-gold-500 shadow-lift sm:h-44 sm:w-44" />
      </div>
    );
  }
  if (src) {
    return (
      <Img src={src} alt={alt} sizes={sizes} priority={priority} wrapClassName={`h-full w-full ${className}`} />
    );
  }

  if (person) {
    const mono = person.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    return (
      <div className={`bg-lattice relative grid h-full w-full place-items-center overflow-hidden bg-brand-800 ${className}`} role="img" aria-label={alt}>
        <div className="text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-gold-500 font-display text-3xl font-semibold text-gold-300">{mono}</span>
          <span className="mx-auto mt-3 block h-px w-10 bg-gold-500/70" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative grid h-full w-full place-items-center overflow-hidden bg-brand-900 ${className}`}
      role="img"
      aria-label={alt ? `${alt} — photograph to be added` : 'Project photograph to be added'}
    >
      <div className="absolute inset-0 opacity-30" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(circle at 78% 18%, #B69A62 0, transparent 25%), linear-gradient(135deg, transparent 45%, rgba(246,243,234,.12) 45.2%, transparent 45.8%)' }} />
      <div className="relative mx-6 max-w-xs text-center">
        <span className="mx-auto mb-4 block h-px w-12 bg-gold-500" />
        <p className="text-[10px] font-bold uppercase tracking-[.24em] text-gold-400">FPC Bazaar Federation</p>
        <p className="mt-2 font-display text-xl font-semibold text-paper">{alt || 'Project showcase'}</p>
        <p className="mt-2 text-xs text-white/60">Official project photograph to be added</p>
      </div>
    </div>
  );
}
