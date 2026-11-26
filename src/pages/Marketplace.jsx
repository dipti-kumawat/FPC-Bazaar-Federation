import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { draftMode } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import { ProductCard, EmptyState } from '../components/market.jsx';
import { Icon, Search, Arrow } from '../components/Icons.jsx';
import { CATEGORIES, STATES, visibleProducts, supplierById } from '../data/marketplace.js';
import AnimatedGrid from '../components/motion/AnimatedGrid.jsx';

export default function Marketplace() {
  useSeo('marketplace');
  const c = useC(); const t = useT(); const m = c.market;
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || ''; const cat = params.get('cat') || ''; const state = params.get('state') || ''; const sort = params.get('sort') || '';
  const set = (k, v) => { const p = new URLSearchParams(params); if (v) p.set(k, v); else p.delete(k); setParams(p, { replace: true }); };
  const all = visibleProducts();

  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((k) => [k.id, all.filter((p) => p.cat === k.id).length])), [all]);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = all.filter((p) => {
      if (cat && p.cat !== cat) return false;
      if (state && p.state !== state) return false;
      if (!needle) return true;
      const sup = supplierById(p.supplier);
      const all = (o) => (o ? Object.values(o) : []); // search matches the name in any language
      const hay = [...all(p.name), ...all(sup?.name), ...all(CATEGORIES.find((k) => k.id === p.cat)?.name)].join(' ').toLowerCase();
      return hay.includes(needle);
    });
    if (sort === 'az') out = [...out].sort((a, b) => t(a.name).localeCompare(t(b.name)));
    return out;
  }, [all, q, cat, state, sort, t]);
  const filtered = q || cat || state;

  return (
    <>
      <PageHero title={m.title} sub={m.sub} crumb={m.crumb} />
      <Band className="!pt-10">
        {draftMode && <p className="mb-6 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{c.network.draftNote}</p>}

        <div className="border border-brand-100 bg-white p-4 shadow-card sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr]">
            <label className="relative block">
              <span className="sr-only">{m.search}</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500" />
              <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder={m.search} className="field pl-11" />
            </label>
            <label><span className="sr-only">{m.state}</span>
              <select value={state} onChange={(e) => set('state', e.target.value)} className="field"><option value="">{m.allStates}</option>{Object.entries(STATES).map(([k, v]) => <option key={k} value={k}>{t(v)}</option>)}</select>
            </label>
            <label><span className="sr-only">{m.sort}</span>
              <select value={sort} onChange={(e) => set('sort', e.target.value)} className="field"><option value="">{m.sortNew}</option><option value="az">{m.sortAz}</option></select>
            </label>
          </div>
          <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label={m.category}>
            <button type="button" onClick={() => set('cat', '')} aria-pressed={!cat} className={`chip shrink-0 ${!cat ? 'chip-on' : 'hover:border-brand-500'}`}>{m.allCategories} <span className="opacity-70">{all.length}</span></button>
            {CATEGORIES.map((k) => (
              <button key={k.id} type="button" onClick={() => set('cat', cat === k.id ? '' : k.id)} aria-pressed={cat === k.id} className={`chip shrink-0 ${cat === k.id ? 'chip-on' : 'hover:border-brand-500'}`}>
                <Icon name={k.icon} className="h-4 w-4" />{t(k.name)} <span className="opacity-70">{counts[k.id]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold text-brand-900" aria-live="polite">{m.results.replace('{n}', list.length)}</p>
          {filtered && <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm font-semibold text-brand-700 underline underline-offset-4">{m.clear}</button>}
        </div>

        {all.length === 0 ? (
          <EmptyState title={m.soonTitle} text={m.soonText}><LLink to="/business-connect?form=supplier" className="btn-primary">{m.listSupplier}</LLink></EmptyState>
        ) : list.length === 0 ? (
          <EmptyState title={m.noResults} text={m.noResultsText}>
            <LLink to="/sourcing" className="btn-primary">{m.postRequest}</LLink>
            <button type="button" className="btn-outline" onClick={() => setParams({}, { replace: true })}>{m.clear}</button>
          </EmptyState>
        ) : (
          <AnimatedGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" items={list} getKey={(p) => p.id} render={(p) => <ProductCard p={p} />} />
        )}

        <p className="mt-10 text-sm text-slate-500">{m.modelNote}</p>
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-900 py-14 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{c.homeBiz.sourcingTitle}</h2><p className="mt-2 max-w-xl text-white/75">{c.homeBiz.sourcingBody}</p></div>
          <div className="flex flex-wrap gap-3"><LLink to="/sourcing" className="btn-gold">{m.postRequest} <Arrow /></LLink><LLink to="/business-connect?form=supplier" className="btn-ghost-light">{m.listSupplier}</LLink></div>
        </div>
      </section>
    </>
  );
}
