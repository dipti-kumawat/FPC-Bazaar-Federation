import { useMemo, useState } from 'react';
import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band } from '../components/ui.jsx';
import UpdateCard from '../components/UpdateCard.jsx';
import { Arrow } from '../components/Icons.jsx';
import { sortedUpdates } from '../data/updates.js';

const PAGE = 9;

export default function Events() {
  useSeo('events');
  const c = useC(); const lang = useLang(); const e = c.eventsPage;
  const all = useMemo(() => sortedUpdates(), []);
  const cats = useMemo(() => [...new Set(all.map((u) => u.category?.[lang] ?? u.category?.en).filter(Boolean))], [all, lang]);
  const [cat, setCat] = useState(''); const [shown, setShown] = useState(PAGE);
  const list = cat ? all.filter((u) => (u.category?.[lang] ?? u.category?.en) === cat) : all;
  const pick = (k) => { setCat(k); setShown(PAGE); };
  return (
    <>
      <PageHero title={e.title} sub={e.sub} crumb={e.crumb} />
      <Band>
        {cats.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={e.title}>
            {['', ...cats].map((k) => (
              <button key={k || 'all'} type="button" role="tab" aria-selected={cat === k} onClick={() => pick(k)}
                className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition ${cat === k ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'}`}>{k || e.all}</button>
            ))}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.slice(0, shown).map((u) => <UpdateCard key={u.id} u={u} />)}</div>
        <div className="mt-10 flex flex-col items-center gap-3">
          {shown < list.length && <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn-outline">{e.more}</button>}
          <p className="text-sm text-slate-500">{e.count.replace('{n}', list.length)}</p>
        </div>
      </Band>
      <section className="relative isolate overflow-hidden bg-brand-900 py-14 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{e.ctaTitle}</h2><p className="mt-2 max-w-xl text-white/75">{e.ctaText}</p></div>
          <LLink to="/contact" className="btn-gold">{e.cta} <Arrow /></LLink>
        </div>
      </section>
    </>
  );
}
