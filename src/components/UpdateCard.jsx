import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../i18n/hooks.jsx';
import { LOCALES } from '../i18n/langs.js';
import Reveal from './Reveal.jsx';
import { Pin } from './Icons.jsx';

export function fmtDate(d, lang) {
  if (!d) return '';
  const dt = new Date(d); if (Number.isNaN(+dt)) return '';
  return dt.toLocaleDateString(LOCALES[lang] || 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** One news / event card. `u` is an entry of src/data/updates.js. */
export default function UpdateCard({ u }) {
  const lang = useLang(); const t = (x) => x?.[lang] ?? x?.en ?? '';
  const [big, setBig] = useState(false);
  useEffect(() => {
    if (!big) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setBig(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [big]);
  const alt = t(u.imageAlt) || t(u.title);
  return (
    <>
    <Reveal className="h-full"><article className="card card-hover group h-full overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-900">
        {u.image && u.clipping
          ? <button type="button" onClick={() => setBig(true)} aria-label={alt} className="block h-full w-full cursor-zoom-in bg-white"><img src={u.image} alt={alt} loading="lazy" className="h-full w-full object-contain" /></button>
          : u.image
          ? <img src={u.image} alt={alt} loading="lazy" style={{ objectPosition: u.focus || 'center 35%' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          : <div className="bg-lattice h-full w-full" aria-hidden="true" />}
        <span className="absolute left-3 top-3 border border-white/25 bg-brand-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white">{t(u.category)}</span>
      </div>
      <div className="p-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[.14em] text-gold-700">
          {u.date && <span>{fmtDate(u.date, lang)}</span>}
          {t(u.location) && <span className="flex items-center gap-1.5"><Pin className="h-3.5 w-3.5" />{t(u.location)}</span>}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-brand-900">{t(u.title)}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{t(u.description)}</p>
      </div>
    </article></Reveal>
    {big && createPortal(
      <div role="dialog" aria-modal="true" aria-label={alt} onClick={() => setBig(false)} className="fixed inset-0 z-[100] grid cursor-zoom-out place-items-center bg-black/85 p-3">
        <button type="button" onClick={() => setBig(false)} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/50 text-2xl leading-none text-white hover:bg-black/80">×</button>
        <img src={u.image} alt={alt} className="max-h-[94vh] max-w-[96vw] bg-white object-contain shadow-2xl" />
      </div>, document.body)}
    </>
  );
}