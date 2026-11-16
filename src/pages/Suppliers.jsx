import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { draftMode } from '../config/site.js';
import { useRegistryTick } from '../services/registry.js';
import { PageHero, Band } from '../components/ui.jsx';
import { SupplierCard, EmptyState } from '../components/market.jsx';
import { Icon, Search, Arrow } from '../components/Icons.jsx';
import { CATEGORIES, STATES, SUPPLIER_TYPES, visibleSuppliers } from '../data/marketplace.js';

export default function Suppliers() {
  useSeo('suppliers'); useRegistryTick();
  const c = useC(); const t = useT(); const d = c.directory;
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || ''; const type = params.get('type') || ''; const state = params.get('state') || ''; const cat = params.get('cat') || '';
  const set = (k, v) => { const p = new URLSearchParams(params); if (v) p.set(k, v); else p.delete(k); setParams(p, { replace: true }); };
  const all = visibleSuppliers();
  const counts = useMemo(() => Object.fromEntries(SUPPLIER_TYPES.map((k) => [k, all.filter((s) => s.type === k).length])), [all]);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all.filter((s) => {
      if (type && s.type !== type) return false;
      if (state && s.state !== state) return false;
      if (cat && !s.cats.includes(cat)) return false;
      if (!needle) return true;
      const hay = [s.name.en, s.name.hi, s.district.en, s.district.hi, STATES[s.state].en, STATES[s.state].hi, ...s.cats.map((k) => CATEGORIES.find((x) => x.id === k)?.name.en)].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [all, q, type, state, cat]);
  const filtered = q || type || state || cat;

  return (
    <>
      <PageHero title={d.title} sub={d.sub} crumb={d.crumb} />
      <Band className="!pt-10">
        {draftMode && <p className="mb-6 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{c.network.draftNote}</p>}
        <div className="border border-brand-100 bg-white p-4 shadow-card sm:p-5">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label={d.typeLabel}>
            <button type="button" onClick={() => set('type', '')} aria-pressed={!type} className={`chip shrink-0 ${!type ? 'chip-on' : 'hover:border-brand-500'}`}>{d.allTypes} <span className="opacity-70">{all.length}</span></button>
            {SUPPLIER_TYPES.map((k) => (
              <button key={k} type="button" onClick={() => set('type', type === k ? '' : k)} aria-pressed={type === k} className={`chip shrink-0 ${type === k ? 'chip-on' : 'hover:border-brand-500'}`}>
                <Icon name={k} className="h-4 w-4" />{c.network.types[k]} <span className="opacity-70">{counts[k]}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.6fr_1fr_1fr]">
            <label className="relative block"><span className="sr-only">{d.search}</span><Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500" /><input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder={d.search} className="field pl-11" /></label>
            <label><span className="sr-only">{c.market.state}</span><select value={state} onChange={(e) => set('state', e.target.value)} className="field"><option value="">{d.allStates}</option>{Object.entries(STATES).map(([k, v]) => <option key={k} value={k}>{t(v)}</option>)}</select></label>
            <label><span className="sr-only">{c.market.category}</span><select value={cat} onChange={(e) => set('cat', e.target.value)} className="field"><option value="">{d.allCategories}</option>{CATEGORIES.map((k) => <option key={k.id} value={k.id}>{t(k.name)}</option>)}</select></label>
          </div>
        </div>

        <div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold text-brand-900" aria-live="polite">{d.results.replace('{n}', list.length)}</p>
          {filtered && <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm font-semibold text-brand-700 underline underline-offset-4">{d.clear}</button>}
        </div>

        {all.length === 0 ? (
          <EmptyState title={d.soonTitle} text={d.soonText}><LLink to="/business-connect?form=supplier" className="btn-primary">{d.listCta}</LLink></EmptyState>
        ) : list.length === 0 ? (
          <EmptyState title={d.noResults} text={d.noResultsText}><button type="button" className="btn-outline" onClick={() => setParams({}, { replace: true })}>{d.clear}</button></EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => <SupplierCard key={s.id} s={s} />)}</div>
        )}
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-900 py-14 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{d.listCtaTitle}</h2><p className="mt-2 max-w-xl text-white/75">{d.listCtaText}</p></div>
          <LLink to="/business-connect?form=supplier" className="btn-gold">{d.listCta} <Arrow /></LLink>
        </div>
      </section>
    </>
  );
}