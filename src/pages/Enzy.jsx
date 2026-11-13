import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Verify, PhotoSlot, Checklist } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';

export default function Enzy() {
  useSeo('enzy');
  const c = useC(); const z = c.enzy;
  return (
    <>
      <PageHero title={z.title} sub={z.sub} crumb={z.crumb} kind="product" slot="enzy" />
      <Verify flag="enzyClaims">
        <section className="bg-brand-800 py-4 text-center text-white"><div className="container-x"><p className="font-extrabold">{z.header}</p><p className="text-sm text-white/85">{z.strip}</p></div></section>
        <Band>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1.4fr]">
            <div className="mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm border border-brand-100 bg-white"><PhotoSlot slot="enzy" kind="product" alt={z.product.n} /></div>
            <div><h2 className="text-2xl font-extrabold text-brand-900">{z.product.n}</h2><p className="mt-2 text-lg">{z.product.t}</p><p className="mt-1 text-slate-600">{z.product.by}</p></div>
          </div>
        </Band>
        <Band className="bg-white">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-t-4 border-red-400 bg-red-50/50 p-6"><h3 className="mb-3 text-xl font-extrabold text-red-900">{z.beforeH}</h3><ul className="space-y-2">{z.before.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="border-t-4 border-brand-600 bg-brand-50 p-6"><h3 className="mb-3 text-xl font-extrabold text-brand-900">{z.afterH}</h3><ul className="space-y-2">{z.after.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </Band>
        <Band>
          <SectionTitle>{z.benefitsTitle}</SectionTitle>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">{z.benefits.map((b) => <div key={b.h} className="border-t-4 border-brand-600 pt-3"><h3 className="text-lg font-extrabold text-brand-900">{b.h}</h3><p className="mt-1 text-slate-600">{b.t}</p></div>)}</div>
          <p className="mt-10 text-center text-xl font-bold text-brand-700">{z.closing}</p>
        </Band>
      </Verify>
      <Band className="bg-white"><div className="mx-auto max-w-2xl"><FormEngine formKey="product" title={z.formH} /></div></Band>
    </>
  );
}
