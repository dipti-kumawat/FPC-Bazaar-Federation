import { useState } from 'react';
import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { draftMode } from '../config/site.js';
import { STATES, categoryById, supplierById, productsOf, initials } from '../data/marketplace.js';
import { Icon, Arrow, Pin, Check } from './Icons.jsx';
import Reveal from './Reveal.jsx';
import Img from './Img.jsx';

const ART = {
  grains: ['from-brand-800 to-brand-600', 'text-gold-400'],
  produce: ['from-brand-700 to-brand-400', 'text-gold-200'],
  spices: ['from-gold-700 to-brand-800', 'text-gold-200'],
  dairy: ['from-gold-100 to-gold-300', 'text-brand-800'],
  inputs: ['from-brand-900 to-brand-600', 'text-gold-400'],
  processed: ['from-gold-500 to-gold-700', 'text-brand-950'],
  equipment: ['from-brand-100 to-brand-300', 'text-brand-800'],
  feed: ['from-brand-600 to-brand-900', 'text-gold-300'],
};

/** Illustrated category tile used instead of product photos until real product photos are approved. */
export function CategoryArt({ cat, className = '', iconClass = 'h-16 w-16' }) {
  const c = categoryById(cat); const [bg, fg] = ART[cat] || ART.grains;
  return (
    <div className={`bg-lattice relative grid place-items-center overflow-hidden bg-gradient-to-br ${bg} ${className}`} role="img" aria-label={c?.name.en}>
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-white/20" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full border border-white/15" aria-hidden="true" />
      <Icon name={c?.icon} className={`relative ${iconClass} ${fg} transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6`} strokeWidth={1.2} />
    </div>
  );
}

/**
 * Real product photo if /images/products/<product-id>.jpg exists, otherwise the illustrated category tile.
 * To add a photo, just save it as public/images/products/<product-id>.jpg (ids are in src/data/marketplace.js).
 */
export function ProductImage({ p, className = '', iconClass, alt = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <CategoryArt cat={p.cat} className={className} iconClass={iconClass} />;
  return (
    <div className={`relative overflow-hidden bg-brand-900 ${className}`}>
      <Img src={`/images/products/${p.id}.jpg`} alt={alt} sizes="(min-width: 1024px) 25vw, 50vw" onError={() => setFailed(true)} wrapClassName="absolute inset-0 h-full w-full" />
    </div>
  );
}

export function SampleBadge() {
  const c = useC();
  if (!draftMode) return null;
  return <span className="rounded-sm bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-950">{c.network.sample}</span>;
}

/** Green verified tick: shown only for Verified FPOs and vendors. */
export function GreenTick({ className = 'h-6 w-6' }) {
  const c = useC();
  return <span role="img" aria-label={c.vendorPage.verifiedFull} title={c.vendorPage.verifiedFull} className={`inline-grid shrink-0 place-items-center rounded-full bg-emerald-600 text-white shadow-sm ${className}`}><Check className="h-[62%] w-[62%]" /></span>;
}

export function VerifiedBadge({ on }) {
  const c = useC();
  if (!on) return null;
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-800 py-0.5 pl-0.5 pr-2.5 text-[10px] font-bold uppercase tracking-wider text-gold-300"><GreenTick className="h-4 w-4" />{c.network.verified}</span>;
}

export function TypeBadge({ type }) {
  const c = useC();
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-700"><Icon name={type} className="h-3.5 w-3.5" />{c.network.type[type]}</span>;
}

export function ProductCard({ p }) {
  const c = useC(); const t = useT();
  const cat = categoryById(p.cat); const sup = supplierById(p.supplier);
  return (
    <Reveal className="h-full"><LLink to={`/marketplace/${p.id}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ProductImage p={p} className="aspect-[16/10]" alt={t(p.name)} />
        <span className="absolute left-3 top-3 rounded-sm bg-paper/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-800">{t(cat.name)}</span>
        <span className="absolute bottom-3 left-3 flex gap-1"><SampleBadge /><VerifiedBadge on={p.verified} /></span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-brand-900">{t(p.name)}</h3>
        <p className="mt-1.5 text-sm text-slate-600">{t(sup?.name)}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-500"><Pin className="h-3.5 w-3.5 text-gold-600" />{t(STATES[p.state])}</p>
        <div className="mt-4 flex items-end justify-between border-t border-brand-100 pt-3">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-gold-700">{c.market.moq}</p><p className="text-sm font-semibold text-brand-900">{t(p.moq)}</p></div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">{c.market.requestQuote} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </div>
      </div>
    </LLink></Reveal>
  );
}

export function SupplierCard({ s }) {
  const c = useC(); const t = useT();
  const count = productsOf(s.id).length;
  return (
    <Reveal className="h-full"><LLink to={s.registry ? `/vendor/${s.slug}` : `/suppliers/${s.id}`} className="card card-hover group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-gold-500 bg-brand-800 font-display text-lg font-semibold text-gold-300">{initials(s.name.en)}</span>
        <span className="flex flex-wrap justify-end gap-1"><SampleBadge /><VerifiedBadge on={s.verified} /></span>
      </div>
      <div className="mt-4"><TypeBadge type={s.type} /></div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-brand-900">{t(s.name)}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-600"><Pin className="h-3.5 w-3.5 text-gold-600" />{[t(s.district), t(STATES[s.state])].filter(Boolean).join(', ')}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{t(s.about)}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">{s.cats.map((k) => <li key={k} className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-800">{t(categoryById(k).name)}</li>)}</ul>
      <div className="mt-auto flex items-center justify-between border-t border-brand-100 pt-4 mt-5">
        <span className="text-[13px] font-semibold text-slate-500">{count} {count === 1 ? c.directory.productWord : c.directory.productsWord}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">{c.directory.viewProfile} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </LLink></Reveal>
  );
}

export function EmptyState({ title, text, children }) {
  return (
    <div className="border border-dashed border-brand-200 bg-white px-6 py-14 text-center">
      <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700"><Icon name="grains" className="h-7 w-7" /></span>
      <h3 className="font-display text-xl font-semibold text-brand-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-slate-600">{text}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}