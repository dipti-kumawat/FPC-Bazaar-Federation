import { useParams } from 'react-router-dom';
import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { draftMode } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import { ProductCard, SampleBadge, VerifiedBadge, GreenTick, TypeBadge, EmptyState } from '../components/market.jsx';
import FormEngine from '../components/FormEngine.jsx';
import { Pin, Check } from '../components/Icons.jsx';
import { useRegistryTick } from '../services/registry.js';
import { STATES, supplierById, categoryById, productsOf, initials } from '../data/marketplace.js';

export default function SupplierDetail() {
  useSeo('supplier');
  useRegistryTick();
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
      <PageHero title={t(s.name)} sub={[t(s.district), t(STATES[s.state])].filter(Boolean).join(', ')} crumb={t(s.name)} crumbs={[{ to: '/suppliers', label: c.nav.suppliers }]} />
      <Band className="!pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="border border-brand-100 bg-white p-7 shadow-card">
              <div className="flex flex-wrap items-center gap-4">
                {s.logo ? <img src={s.logo} alt={t(s.name)} className="h-20 w-20 shrink-0 rounded-full border-2 border-gold-500 bg-white object-contain" /> : <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-gold-500 bg-brand-800 font-display text-2xl font-semibold text-gold-300">{initials(s.name.en)}</span>}
                {s.verified && <span className="flex items-center gap-2 text-sm font-bold text-emerald-700"><GreenTick className="h-7 w-7" />{c.vendorPage.verifiedFull}</span>}
                <div className="flex flex-wrap items-center gap-2"><TypeBadge type={s.type} /><SampleBadge /><VerifiedBadge on={s.verified} /></div>
              </div>
              {t(s.about) && <><p className="eyebrow mt-8">{d.about}</p>
              <p className="mt-4 text-lg leading-8 text-slate-700">{t(s.about)}</p></>}
              <dl className="mt-6 divide-y divide-brand-100 border-y border-brand-100">
                <div className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{d.typeLabel}</dt><dd className="font-semibold text-brand-900">{c.network.type[s.type]}</dd></div>
                <div className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{d.location}</dt><dd className="flex items-center gap-1.5 font-semibold text-brand-900"><Pin className="h-4 w-4 text-gold-600" />{[t(s.district), t(STATES[s.state])].filter(Boolean).join(', ')}</dd></div>
                <div className="grid gap-1 py-3.5 sm:grid-cols-[150px_1fr]"><dt className="text-sm font-bold uppercase tracking-wider text-gold-700">{d.categoriesLabel}</dt><dd className="flex flex-wrap gap-1.5">{s.cats.map((k) => <span key={k} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{t(categoryById(k).name)}</span>)}</dd></div>
              </dl>
            </div>

            <h2 className="mb-6 mt-12 font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{s.registry ? c.vendorPage.products : d.productsTitle}</h2>
            {s.registry
              ? (s.productList?.length ? <ul className="grid gap-2 sm:grid-cols-2">{s.productList.map((x) => <li key={x} className="flex items-start gap-2.5 border border-brand-100 bg-white p-3 text-slate-800"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{x}</li>)}</ul> : <p className="text-slate-600">{d.noProducts}</p>)
              : (products.length ? <div className="grid gap-6 sm:grid-cols-2">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="text-slate-600">{d.noProducts}</p>)}
            {s.pastWork?.length > 0 && (<>
              <h2 className="mb-5 mt-12 font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{c.vendorPage.pastWork}</h2>
              <ul className="space-y-3 border-l-2 border-gold-500 pl-5">{s.pastWork.map((x) => <li key={x} className="leading-7 text-slate-700">{x}</li>)}</ul>
            </>)}
            {s.certificates?.length > 0 && (<>
              <h2 className="mb-5 mt-12 font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{c.vendorPage.certificates}</h2>
              <ul className="flex flex-wrap gap-2">{s.certificates.map((x) => <li key={x} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-800"><GreenTick className="h-4 w-4" />{x}</li>)}</ul>
            </>)}
          </div>

          <aside className="lg:sticky lg:top-32">
            <div className="border-t-[3px] border-gold-500 bg-brand-900 p-6 text-white shadow-lift">
              <h2 className="font-display text-2xl font-semibold text-white">{d.connectTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">{d.connectSub}</p>
            </div>
            {s.contact?.name && <div className="mt-4 border border-brand-100 bg-white p-5"><p className="eyebrow mb-2">{c.vendorPage.contact}</p><p className="font-display text-lg font-semibold text-brand-900">{s.contact.name}</p>{s.contact.phone && <a href={`tel:+91${s.contact.phone}`} className="mt-1 inline-block font-semibold text-brand-700 underline">{c.vendorPage.call}: {s.contact.phone}</a>}</div>}
            <div className="mt-4"><FormEngine key={s.id} formKey="quote" initial={{ subject: t(s.name) }} /></div>
          </aside>
        </div>
        <LLink to="/suppliers" className="btn-outline mt-12">{d.backToDirectory}</LLink>
      </Band>
    </>
  );
}