import { useParams } from 'react-router-dom';
import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { draftMode } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import { ProductCard, SampleBadge, VerifiedBadge, TypeBadge, EmptyState } from '../components/market.jsx';
import FormEngine from '../components/FormEngine.jsx';
import { Pin } from '../components/Icons.jsx';
import { STATES, supplierById, categoryById, productsOf, initials } from '../data/marketplace.js';

export default function SupplierDetail() {
  useSeo('supplier');
  const { id } = useParams();
  const c = useC(); const t = useT(); const d = c.directory;
  const s = supplierById(id);
  const ok = s && (draftMode || s.verified);
  if (!ok) {
    return (
      <>
        <PageHero title={d.notFound} crumb={d.crumb} />
        <Band><EmptyState title={d.notFound} text={d.notFoundText}><LLink to="/suppliers" className="btn-primary">{d.backToDirectory}</LLink></EmptyState></Band>
      </>
    );
  }
  const products = productsOf(s.id);
  return (
    <>
      <PageHero title={t(s.name)} sub={`${t(s.district)}, ${t(STATES[s.state])}`} crumb={t(s.name)} crumbs={[{ to: '/suppliers', label: c.nav.suppliers }]} />
      <Band className="!pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="border border-brand-100 bg-white p-7 shadow-card">
              <div className="flex flex-wrap items-center gap-4">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-gold-500 bg-brand-800 font-display text-2xl font-semibold text-gold-300">{initials(s.name.en)}</span>
                <div className="flex flex-wrap items-center gap-2"><TypeBadge type={s.type} /><SampleBadge /><VerifiedBadge on={s.verified} /></div>
              </div>
              <p className="eyebrow mt-8">{d.about}</p>
              <p className="mt-4 text-lg leading-8 text-slate-700">{t(s.about)}</p>
              <dl className="mt-6 divide-y divide-brand-100 border-y border-brand-100">
                <div className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{d.typeLabel}</dt><dd className="font-semibold text-brand-900">{c.network.type[s.type]}</dd></div>
                <div className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{d.location}</dt><dd className="flex items-center gap-1.5 font-semibold text-brand-900"><Pin className="h-4 w-4 text-gold-600" />{t(s.district)}, {t(STATES[s.state])}</dd></div>
                <div className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{d.categoriesLabel}</dt><dd className="flex flex-wrap gap-1.5">{s.cats.map((k) => <span key={k} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{t(categoryById(k).name)}</span>)}</dd></div>
              </dl>
            </div>

            <h2 className="mb-6 mt-12 font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{d.productsTitle}</h2>
            {products.length ? <div className="grid gap-6 sm:grid-cols-2">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="text-slate-600">{d.noProducts}</p>}
          </div>

          <aside className="lg:sticky lg:top-32">
            <div className="border-t-[3px] border-gold-500 bg-brand-900 p-6 text-white shadow-lift">
              <h2 className="font-display text-2xl font-semibold text-white">{d.connectTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">{d.connectSub}</p>
            </div>
            <div className="mt-4"><FormEngine key={s.id} formKey="quote" initial={{ subject: t(s.name) }} /></div>
          </aside>
        </div>
        <LLink to="/suppliers" className="btn-outline mt-12">{d.backToDirectory}</LLink>
      </Band>
    </>
  );
}
