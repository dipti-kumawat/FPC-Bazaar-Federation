import { useSearchParams } from 'react-router-dom';
import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { initiativeList, marketNav, flags, networkStates } from '../config/site.js';
import { STATE_TILES } from '../data/states.js';
import { PageHero, Band, SectionTitle, ProjectCard, Checklist, Verify } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';
import Reveal from '../components/Reveal.jsx';
import { Icon, Arrow } from '../components/Icons.jsx';

/** Services: what the Federation offers (marketplace, directory, sourcing, business connect) + registration shortcuts. */
export function Services() {
  useSeo('services');
  const c = useC(); const h = c.hub.services;
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <SectionTitle eyebrow={h.eyebrow} sub={h.listSub}>{h.listTitle}</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          {marketNav.map((m) => (
            <Reveal key={m.key} className="h-full">
              <LLink to={m.path} className="card card-hover group flex h-full gap-5 p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={m.icon} className="h-7 w-7" /></span>
                <span>
                  <span className="block font-display text-xl font-semibold text-brand-900">{c.nav[m.key]}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{h.items[m.key]}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:text-brand-900">{c.common.learnMore} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </span>
              </LLink>
            </Reveal>
          ))}
        </div>
      </Band>
      <Band className="bg-white !pt-14">
        <SectionTitle eyebrow={h.regEyebrow} sub={h.regSub}>{h.regTitle}</SectionTitle>
        <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <LLink to="/fpo-registration" className="btn-primary">{c.nav.fpoReg}</LLink>
          <LLink to="/vendor-registration" className="btn-outline">{c.nav.vendorReg}</LLink>
        </div>
      </Band>
    </>
  );
}

/** Projects: every initiative of the Federation. */
export function Projects() {
  useSeo('projects');
  const c = useC(); const h = c.hub.projects;
  const items = initiativeList.map((i) => ({ ...i, ...c.initiatives[i.key] }));
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <ProjectCard key={item.key} item={item} />)}</div>
        <div className="mt-10 flex flex-wrap gap-3">
          <LLink to="/events" className="btn-outline">{h.events}</LLink>
          <LLink to="/partners-investors" className="btn-outline">{h.partners}</LLink>
        </div>
      </Band>
    </>
  );
}

/** 17 States Map: schematic tile map of India. Highlighted states come from `networkStates` in config. */
export function StatesMap() {
  useSeo('states');
  const c = useC(); const lang = useLang(); const h = c.hub.states;
  const on = new Set(networkStates);
  const shown = flags.networkStats ? on : new Set();
  const cols = 7; const rows = 7;
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div role="img" aria-label={h.title} className="card overflow-x-auto p-4 sm:p-6">
              <div className="mx-auto grid min-w-[360px] max-w-[640px] gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, auto)` }}>
                {STATE_TILES.map(([id, x, y, en, hi]) => {
                  const name = lang === 'hi' ? hi : en; const active = shown.has(id);
                  return (
                    <div key={id} title={name} style={{ gridColumn: x - 1, gridRow: y + 1 }}
                      className={`grid aspect-square place-items-center rounded-[3px] p-0.5 text-center text-[9px] font-semibold leading-tight transition sm:text-[10.5px] ${active ? 'bg-brand-800 text-gold-300 hover:bg-brand-700' : 'bg-brand-50 text-brand-800/70 hover:bg-gold-100'}`}>
                      {name}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-xs text-slate-500">{h.note}</p>
            </div>
          </Reveal>
          <div>
            <Verify flag="networkStats">
              <div className="grid grid-cols-2 gap-4">
                {c.homeBiz.networkStats.slice(0, 2).map((s) => (
                  <div key={s.l} className="border-t-[3px] border-gold-500 bg-brand-900 p-5 text-white"><p className="font-display text-3xl font-semibold text-gold-300">{s.v}</p><p className="mt-1 text-sm text-white/75">{s.l}</p></div>
                ))}
              </div>
            </Verify>
            <p className="mt-6 leading-8 text-slate-700">{h.body}</p>
            <Verify flag="networkStats">
              <p className="mt-4 text-sm text-slate-600">{h.pendingList}</p>
            </Verify>
            <LLink to="/fpo-registration" className="btn-primary mt-6">{c.nav.fpoReg}</LLink>
          </div>
        </div>
      </Band>
    </>
  );
}

function RegPage({ seo, k, formKey, initial, list = true }) {
  useSeo(seo);
  const c = useC(); const h = c.hub[k];
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="mb-5 font-display text-2xl font-semibold text-brand-900">{h.whyTitle}</h2>
            {list && <Checklist items={h.why} />}
            {h.note && <p className="mt-5 text-sm leading-6 text-slate-600">{h.note}</p>}
            {h.docs && (
              <div className="mt-8 border-l-[3px] border-gold-500 bg-white p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-brand-900">{h.docsTitle}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">{h.docs.map((d) => <li key={d} className="flex gap-2"><span className="text-gold-600" aria-hidden="true">•</span>{d}</li>)}</ul>
                {h.statusNote && <p className="mt-4 text-sm leading-6 text-slate-600">{h.statusNote}</p>}
              </div>
            )}
          </div>
          <FormEngine key={formKey} formKey={formKey} title={c.formTitles[formKey]} initial={initial} />
        </div>
      </Band>
    </>
  );
}

// These two forms feed the admin approval workflow (Pending → Verified / Rejected). See src/services/registry.js.
export const FpoReg = () => <RegPage seo="fpoReg" k="fpoReg" formKey="fpo" />;
export const VendorReg = () => <RegPage seo="vendorReg" k="vendorReg" formKey="vendor" />;

const CAREER_TABS = ['job', 'projecthead', 'member'];

export function Career() {
  useSeo('career');
  const c = useC(); const h = c.hub.career;
  const [params, setParams] = useSearchParams();
  const active = CAREER_TABS.includes(params.get('form')) ? params.get('form') : 'job';
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="mb-5 font-display text-2xl font-semibold text-brand-900">{h.whyTitle}</h2>
            <Checklist items={h.why} />
            <div className="mt-8 border border-dashed border-brand-200 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-brand-900">{h.openTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{h.openText}</p>
            </div>
          </div>
          <div>
            <div role="tablist" aria-label={h.title} className="mb-4 flex flex-wrap gap-2">
              {CAREER_TABS.map((k) => (
                <button key={k} role="tab" type="button" aria-selected={active === k} onClick={() => setParams({ form: k }, { replace: true })}
                  className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold transition ${active === k ? 'border-brand-600 bg-brand-600 text-white' : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'}`}>{h.tabs[k]}</button>
              ))}
            </div>
            {h.tabNote?.[active] && <p className="mb-4 text-sm leading-6 text-slate-600">{h.tabNote[active]}</p>}
            <div role="tabpanel"><FormEngine key={active} formKey={active} title={c.formTitles[active]} /></div>
          </div>
        </div>
      </Band>
    </>
  );
}
