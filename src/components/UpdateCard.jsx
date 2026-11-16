import { useLang } from '../i18n/hooks.jsx';
import Reveal from './Reveal.jsx';
import { Pin } from './Icons.jsx';
import Img from './Img.jsx';

export function fmtDate(d, lang) {
  if (!d) return '';
  const dt = new Date(d); if (Number.isNaN(+dt)) return '';
  return dt.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** One news / event card. `u` is an entry of src/data/updates.js. */
export default function UpdateCard({ u }) {
  const lang = useLang(); const t = (x) => x?.[lang] ?? x?.en ?? '';
  return (
    <Reveal className="h-full"><article className="card card-hover group h-full overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-900">
        {u.image
          ? <Img src={u.image} alt={t(u.imageAlt) || t(u.title)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" onError={(e) => { e.currentTarget.style.display = 'none'; }} wrapClassName="h-full w-full" className="transition duration-700 group-hover:scale-105" />
          : <div className="bg-lattice h-full w-full" aria-hidden="true" />}
        <span className="absolute left-3 top-3 border border-white/25 bg-brand-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white">{t(u.category)}</span>
      </div>
      <div className="p-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[.14em] text-gold-700">
          {u.date && <span>{fmtDate(u.date, lang)}</span>}
          {u.location && <span className="flex items-center gap-1.5"><Pin className="h-3.5 w-3.5" />{t(u.location)}</span>}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-brand-900">{t(u.title)}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{t(u.description)}</p>
      </div>
    </article></Reveal>
  );
}
