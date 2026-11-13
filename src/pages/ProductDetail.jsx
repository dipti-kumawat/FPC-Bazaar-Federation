import { useParams } from 'react-router-dom';
import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { draftMode } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import { ProductImage, ProductCard, SampleBadge, VerifiedBadge, TypeBadge, EmptyState } from '../components/market.jsx';
import FormEngine from '../components/FormEngine.jsx';
import { Arrow, Pin } from '../components/Icons.jsx';
import { STATES, productById, supplierById, categoryById, visibleProducts, initials } from '../data/marketplace.js';

export default function ProductDetail() {
  useSeo('product');
  const { id } = useParams();
  const c = useC(); const t = useT(); const m = c.market;
  const p = productById(id);
  const ok = p && (draftMode || p.verified);

  if (!ok) {
    return (
      <>
        <PageHero title={m.notFound} crumb={m.crumb} />
        <Band><EmptyState title={m.notFound} text={m.notFoundText}><LLink to="/marketplace" className="btn-primary">{m.backToMarket}</LLink></EmptyState></Band>
      </>
    );
  }
  const sup = supplierById(p.supplier); const cat = categoryById(p.cat);
  const related = visibleProducts().filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3);
  const rows = [[m.specCategory, t(cat.name)], [m.specSupplier, t(sup.name)], [m.specOrigin, `${t(sup.district)}, ${t(STATES[p.state])}`], [m.specMoq, t(p.moq)], [m.specPack, t(p.pack)], [m.specSeason, t(p.season)]];

  return (
    <>
      <PageHero title={t(p.name)} sub={t(cat.name)} crumb={t(p.name)} crumbs={[{ to: '/marketplace', label: c.nav.marketplace }]} />
      <Band className="!pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="relative overflow-hidden border border-brand-100 shadow-card">
              <ProductImage p={p} className="aspect-[16/9]" iconClass="h-28 w-28" alt={t(p.name)} />
              <span className="absolute left-4 top-4 flex gap-1.5"><SampleBadge /><VerifiedBadge on={p.verified} /></span>
            </div>
            <p className="eyebrow mt-10">{m.specs}</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">{t(p.desc)}</p>
            <dl className="mt-6 divide-y divide-brand-100 border-y border-brand-100">
              {rows.map(([k, v]) => <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[170px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{k}</dt><dd className="font-semibold text-brand-900">{v}</dd></div>)}
              <div className="grid gap-1 py-3.5 sm:grid-cols-[170px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{m.priceOnRequest}</dt><dd className="text-slate-600">{m.modelNote}</dd></div>
            </dl>

            <div className="mt-10 border border-brand-100 bg-white p-6 shadow-card">
              <p className="eyebrow mb-4">{m.aboutSupplier}</p>
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-gold-500 bg-brand-800 font-display text-lg font-semibold text-gold-300">{initials(sup.name.en)}</span>
                <div>
                  <TypeBadge type={sup.type} />
                  <h3 className="mt-2 font-display text-xl font-semibold text-brand-900">{t(sup.name)}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600"><Pin className="h-3.5 w-3.5 text-gold-600" />{t(sup.district)}, {t(STATES[sup.state])}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{t(sup.about)}</p>
                  <LLink to={`/suppliers/${sup.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">{m.viewSupplier} <Arrow /></LLink>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32">
            <div className="border-t-[3px] border-gold-500 bg-brand-900 p-6 text-white shadow-lift">
              <h2 className="font-display text-2xl font-semibold text-white">{m.quoteTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">{m.quoteSub}</p>
              <ol className="mt-5 space-y-3 border-t border-white/15 pt-5">
                {m.trust.map((x, i) => <li key={x} className="flex items-start gap-3 text-sm text-white/85"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-500 text-xs font-bold text-gold-400">{i + 1}</span>{x}</li>)}
              </ol>
            </div>
            <div className="mt-4"><FormEngine key={p.id} formKey="quote" initial={{ subject: t(p.name) }} /></div>
          </aside>
        </div>
      </Band>

      {related.length > 0 && (
        <Band className="bg-white !pt-14">
          <h2 className="mb-8 font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{m.related}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
          <LLink to="/marketplace" className="btn-outline mt-8">{m.backToMarket}</LLink>
        </Band>
      )}
    </>
  );
}
