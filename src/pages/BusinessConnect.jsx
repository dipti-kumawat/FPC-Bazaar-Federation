import { useSearchParams } from 'react-router-dom';
import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { site } from '../config/site.js';
import { PageHero, Band, SectionTitle, Steps, Verify } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';
import { Icon, Check, Arrow } from '../components/Icons.jsx';
import { SUPPLIER_TYPES } from '../data/marketplace.js';

const TABS = ['connect', 'supplier'];

export default function BusinessConnect() {
  useSeo('connect');
  const c = useC(); const b = c.connect;
  const [params, setParams] = useSearchParams();
  const active = TABS.includes(params.get('form')) ? params.get('form') : 'connect';
  const role = SUPPLIER_TYPES.includes(params.get('role')) ? params.get('role') : '';
  const initial = active === 'connect' && role ? { role } : undefined;
  const pick = (k) => setParams({ form: k }, { replace: true });
  const valueIcons = ['shield', 'connect', 'scale'];

  return (
    <>
      <PageHero title={b.title} sub={b.sub} crumb={b.crumb} />

      <Band>
        <SectionTitle sub={b.rolesSub} eyebrow={c.homeBiz.networkEyebrow}>{b.rolesTitle}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPLIER_TYPES.map((k) => (
            <article key={k} className="card flex flex-col p-6">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={k} className="h-7 w-7" /></span>
              <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">{c.network.roles[k].t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.network.roles[k].d}</p>
              <ul className="mt-4 space-y-2 border-t border-brand-100 pt-4">{b.offers[k].map((o) => <li key={o} className="flex items-start gap-2.5 text-sm text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" />{o}</li>)}</ul>
              <a href={`?form=connect&role=${k}#start`} onClick={(e) => { e.preventDefault(); setParams({ form: 'connect', role: k }, { replace: true }); document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand-700 hover:text-brand-900">{c.nav.connectCta} <Arrow /></a>
            </article>
          ))}
        </div>
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x">
          <SectionTitle light sub={b.flowSub} eyebrow={c.homeBiz.flowEyebrow}>{b.flowTitle}</SectionTitle>
          <ol className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-4">
            {b.steps.map((s, i) => (
              <li key={s.h} className="list-none bg-brand-900 p-7">
                <span className="font-display text-4xl font-semibold text-gold-400">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.h}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Band className="bg-white">
        <SectionTitle>{b.valuesTitle}</SectionTitle>
        <div className="grid gap-8 md:grid-cols-3">
          {b.values.map((v, i) => (
            <div key={v.h} className="border-t border-gold-500 pt-5"><Icon name={valueIcons[i]} className="h-9 w-9 text-brand-700" /><h3 className="mt-4 font-display text-xl font-semibold text-brand-900">{v.h}</h3><p className="mt-2 leading-7 text-slate-600">{v.t}</p></div>
          ))}
        </div>
      </Band>

      <Band className="bg-brand-50">
        <div id="start" className="scroll-mt-32">
          <SectionTitle sub={b.formsSub} eyebrow={c.nav.connect}>{b.formsTitle}</SectionTitle>
          <div className="mx-auto max-w-3xl">
            <div role="tablist" aria-label={b.formsTitle} className="mb-6 flex flex-wrap justify-center gap-2">
              {TABS.map((k) => <button key={k} role="tab" type="button" aria-selected={active === k} onClick={() => pick(k)} className={`chip !px-5 !py-2.5 !text-sm ${active === k ? 'chip-on' : 'hover:border-brand-500'}`}>{b.tabs[k]}</button>)}
            </div>
            <div role="tabpanel"><FormEngine key={`${active}-${role}`} formKey={active} title={c.formTitles[active]} initial={initial} /></div>
            <p className="mt-5 border-l-2 border-gold-500 bg-white p-4 text-sm leading-6 text-slate-600">{b.trustNote}</p>
          </div>
        </div>
      </Band>

      <Band>
        <div className="flex flex-col items-start justify-between gap-6 border border-gold-300 bg-gold-50 p-8 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl font-semibold text-brand-900">{b.contactTitle}</h2><p className="mt-1 text-slate-600">{b.contactText}</p></div>
          <div className="flex flex-wrap gap-3">
            <Verify flag="contactDetails"><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary">{c.common.whatsapp}</a></Verify>
            <LLink to="/contact" className="btn-outline">{c.nav.contact}</LLink>
          </div>
        </div>
      </Band>
    </>
  );
}
