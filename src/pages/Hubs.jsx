import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { initiativeList, marketNav, flags, networkStates } from '../config/site.js';
import { INDIA_SHAPES, INDIA_VIEWBOX, INDIA_LABELS } from '../data/indiaMap.js';
import { PageHero, Band, SectionTitle, ProjectCard, Checklist, Verify } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';
import Reveal from '../components/Reveal.jsx';
import VideoCard from '../components/VideoCard.jsx';
import { videosFor } from '../data/videos.js';
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
  const c = useC(); const lang = useLang(); const h = c.hub.projects;
  const items = initiativeList.map((i) => ({ ...i, ...c.initiatives[i.key] }));
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      {videosFor('projects').map((v) => (
        <Band key={v.id} className="bg-white">
          <div className="mx-auto max-w-4xl"><VideoCard wide src={v.src} poster={v.poster} title={v.title[lang]} desc={v.desc[lang]} /></div>
        </Band>
      ))}
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

/** 17 States Map: India map. Highlighted states come from `networkStates` in config; shapes live in data/indiaMap.js. */
const MAP_CSS = `
@keyframes fpcMapIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
@keyframes fpcSheen{from{transform:translateX(-160px)}to{transform:translateX(760px)}}
@keyframes fpcRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.fpc-st{transform-box:fill-box;transform-origin:center;animation:fpcMapIn .7s cubic-bezier(.22,.8,.24,1) backwards;transition:transform .35s cubic-bezier(.22,.8,.24,1),filter .35s}
.fpc-st2{transform-box:fill-box;transform-origin:center}
.fpc-st,.fpc-st2,.fpc-st:focus,.fpc-st2:focus{outline:none}
.fpc-hi{transform-box:fill-box;transform-origin:center;transform:scale(1.05);filter:drop-shadow(0 7px 7px rgba(6,35,26,.42));pointer-events:none;transition:transform .35s}
.fpc-sheen{animation:fpcSheen 5.5s ease-in-out 1.6s infinite}
.fpc-rise{animation:fpcRise .8s cubic-bezier(.22,.8,.24,1) 1.2s backwards}
@media (prefers-reduced-motion:reduce){.fpc-st,.fpc-sheen,.fpc-rise{animation:none!important}.fpc-st,.fpc-hi{transition:none}}
`;
// Font size so a name fits inside its state: `r` is the room around the label point.
function labelLayout(name, r, hi) {
  const k = hi ? 0.62 : 0.56;
  const sp = name.indexOf(' ');
  const one = (2 * r * 0.88) / (name.length * k);
  if (sp > 0 && name.length > 9) {
    const words = [name.slice(0, sp), name.slice(sp + 1)];
    const two = (2 * r * 0.8) / (Math.max(words[0].length, words[1].length) * k);
    if (two > one * 1.15) return { lines: words, f: Math.max(6, Math.min(10, two)) };
  }
  return { lines: [name], f: Math.max(6, Math.min(10, one)) };
}
export function StatesMap() {
  useSeo('states');
  const c = useC(); const lang = useLang(); const h = c.hub.states;
  const on = new Set(networkStates);
  const nameOf = (sh) => (lang === 'hi' ? sh.hi : sh.en) || sh.en || sh.id;
  const [hover, setHover] = useState(null);
  const [spot, setSpot] = useState(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => { const t = setTimeout(() => setEntered(true), 1500); return () => clearTimeout(t); }, []);
  const ids = INDIA_SHAPES.filter((x) => on.has(x.id));
  // Idle spotlight: when nobody is pointing at the map, walk through the network states one by one.
  useEffect(() => {
    if (hover || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) { setSpot(null); return undefined; }
    let i = 0; const list = ids.map((x) => x.id);
    const t = setInterval(() => { setSpot(list[i % list.length]); i += 1; }, 2200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);
  const hi = hover || spot;
  const shape = INDIA_SHAPES.find((x) => x.id === hi);
  const active = ids.map((x) => ({ id: x.id, n: String(nameOf(x)) })).sort((p, q) => p.n.localeCompare(q.n, lang === 'hi' ? 'hi' : 'en'));
  const L = lang === 'hi'
    ? { eyebrow: 'हमारा नेटवर्क', head: 'पूरे भारत में फैला नेटवर्क', legendOn: 'महासंघ नेटवर्क वाले राज्य', legendOff: 'अन्य राज्य', hint: 'किसी राज्य पर कर्सर ले जाएँ', inNet: 'नेटवर्क में शामिल', notYet: 'अभी नेटवर्क में नहीं', list: 'नेटवर्क के राज्य', listSub: 'जहाँ महासंघ के एफपीओ और साझेदार सक्रिय हैं' }
    : { eyebrow: 'Our network', head: 'A network spread across India', legendOn: 'States in the Federation network', legendOff: 'Other states', hint: 'Hover over a state', inNet: 'In the network', notYet: 'Not in the network yet', list: 'Network states', listSub: 'Where Federation FPOs and partners are active' };
  return (
    <>
      <style>{MAP_CSS}</style>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[4px] bg-gradient-to-b from-white to-[#FBF7EA] p-5 shadow-lift ring-1 ring-gold-500/50 sm:p-9">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#E6A23C]/15 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#2F8F5B]/15 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="fpc-rise">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-700">{L.eyebrow}</p>
                  <p className="mt-2 max-w-[15ch] font-display text-2xl font-semibold leading-tight text-brand-900 sm:text-3xl">{L.head}</p>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-[#E6A23C] to-transparent" />
                </div>
                <div className="pointer-events-none min-w-[168px] rounded-md border border-gold-500/50 bg-white/90 px-3.5 py-2.5 text-sm shadow-md backdrop-blur" aria-live="polite">
                  {shape ? (<><p className="font-semibold text-brand-900">{nameOf(shape)}</p><p className={`mt-0.5 flex items-center gap-1.5 text-xs font-semibold ${on.has(shape.id) ? 'text-brand-600' : 'text-slate-500'}`}><span className={`h-1.5 w-1.5 rounded-full ${on.has(shape.id) ? 'bg-brand-600' : 'bg-slate-400'}`} />{on.has(shape.id) ? L.inNet : L.notYet}</p></>) : <p className="text-slate-500">{L.hint}</p>}
                </div>
              </div>
              <svg viewBox={INDIA_VIEWBOX} role="img" aria-label={h.title} className="relative mx-auto -mt-2 block h-auto w-full max-w-[520px]">
                <defs>
                  <linearGradient id="gHarvest" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E6A23C" /><stop offset="0.5" stopColor="#2F8F5B" /><stop offset="1" stopColor="#0B5D3B" /></linearGradient>
                  <linearGradient id="gHarvestHi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F6B94F" /><stop offset="0.5" stopColor="#3FA46C" /><stop offset="1" stopColor="#0F7048" /></linearGradient>
                  <linearGradient id="gSheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.5" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
                  <clipPath id="gActive">{ids.map((sh) => <path key={sh.id} d={sh.d} />)}</clipPath>
                </defs>
                <g>
                  {INDIA_SHAPES.map((sh) => {
                    const isOn = on.has(sh.id); const hv = hi === sh.id;
                    return (
                      <path key={sh.id + sh.d.slice(0, 8)} id={`st-${sh.id}-${sh.d.length}`} d={sh.d} onMouseEnter={() => setHover(sh.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(sh.id)} onBlur={() => setHover(null)}
                        onClick={() => setHover(sh.id)} tabIndex={-1} className={`${entered ? 'fpc-st2' : 'fpc-st'} cursor-pointer`} style={{ animationDelay: `${(sh.d.length % 17) * 40}ms` }}
                        fill={isOn ? (hv ? 'url(#gHarvestHi)' : 'url(#gHarvest)') : (hv ? '#D3CAAE' : '#E6E0CC')}
                        stroke="#FBF8EF" strokeWidth={isOn ? 1.3 : 1} strokeLinejoin="round">
                        <title>{nameOf(sh)}</title>
                      </path>
                    );
                  })}
                </g>
                {shape && (() => { const big = shape.id; const src = INDIA_SHAPES.filter((x) => x.id === big); return src.map((x) => <use key={x.d.length} href={`#st-${x.id}-${x.d.length}`} className="fpc-hi" />); })()}
                <g clipPath="url(#gActive)" pointerEvents="none" aria-hidden="true"><rect className="fpc-sheen" x="0" y="-20" width="90" height="760" fill="url(#gSheen)" transform="skewX(-16)" /></g>
                <g className="pointer-events-none max-sm:hidden" fontWeight="700" textAnchor="middle" style={{ paintOrder: 'stroke', strokeLinejoin: 'round' }}>
                  {Object.entries(INDIA_LABELS).map(([id, l]) => {
                    const sh = INDIA_SHAPES.find((x) => x.id === id); if (!sh || !on.has(id)) return null;
                    const name = String(nameOf(sh)); const [x, y] = l.at; const isHi = hi === id;
                    if (l.out) {
                      const [tx, ty] = [x + l.out[0], y + l.out[1]];
                      return (<g key={id} style={{ fontSize: 8.5 }}><line x1={x} y1={y} x2={tx - Math.sign(l.out[0]) * 4} y2={ty - 3} stroke="#765F36" strokeWidth="0.8" /><circle cx={x} cy={y} r="2.6" fill="#E6A23C" stroke="#fff" strokeWidth="1" /><text x={tx} y={ty} textAnchor={l.out[0] < 0 ? 'end' : 'start'} fill="#0B3B2A" stroke="#fff" strokeWidth="2.4" style={isHi ? { fontSize: 9.5 } : undefined}>{name}</text></g>);
                    }
                    const { lines, f } = labelLayout(name, l.r, lang === 'hi');
                    const fs = isHi ? f * 1.12 : f;
                    return (<text key={id} x={x} y={y - ((lines.length - 1) * fs * 0.55) + fs * 0.35} fill="#fff" stroke="rgba(6,35,26,0.62)" strokeWidth={Math.max(1.6, fs * 0.28)} style={{ fontSize: fs, transition: 'font-size .3s' }}>{lines.map((w, i) => <tspan key={i} x={x} dy={i ? fs * 1.08 : 0}>{w}</tspan>)}</text>);
                  })}
                </g>
              </svg>
              <div className="relative mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-1.5 border-t border-gold-500/30 pt-4 text-xs font-medium tracking-wide text-slate-600">
                <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-gradient-to-r from-[#E6A23C] via-[#2F8F5B] to-[#0B5D3B]" />{L.legendOn}</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-[#E6E0CC]" />{L.legendOff}</span>
              </div>
            </div>
          </Reveal>
          <div>
            <p className="mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-700">{L.eyebrow}</p>
            <Verify flag="networkStats">
              <div className="mt-4 grid grid-cols-2 divide-x divide-gold-500/40 border-y border-gold-500/40">
                {c.homeBiz.networkStats.slice(0, 2).map((s) => (
                  <div key={s.l} className="px-5 py-6 first:pl-0"><p className="font-display text-5xl font-semibold leading-none text-brand-800">{s.v}</p><p className="mt-3 text-sm font-medium uppercase tracking-wider text-slate-600">{s.l}</p></div>
                ))}
              </div>
            </Verify>
            <p className="mt-8 text-lg leading-8 text-slate-700">{h.body}</p>
            <h3 className="mt-10 font-display text-2xl font-semibold text-brand-900">{L.list}</h3>
            <p className="mt-1 text-sm text-slate-500">{L.listSub}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 border-t border-gold-500/40">
              {active.map((x, i) => (<li key={x.id}><button type="button" onMouseEnter={() => setHover(x.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(x.id)} onBlur={() => setHover(null)}
                className={`group flex w-full items-center gap-3 border-b border-gold-500/25 py-2.5 text-left font-medium transition ${hi === x.id ? 'text-gold-700' : 'text-brand-900'}`}>
                <span className="w-5 text-xs font-bold tabular-nums text-gold-600">{String(i + 1).padStart(2, '0')}</span><span className="flex-1">{x.n}</span>
                <span aria-hidden="true" className={`h-1.5 w-1.5 rotate-45 bg-gold-500 transition ${hi === x.id ? 'scale-150' : 'scale-75 opacity-60'}`} /></button></li>))}
            </ul>
            <div className="mt-8"><Verify flag="networkStats">
              <p className="text-sm text-slate-600">{h.pendingList}</p>
            </Verify></div>
            <LLink to="/fpo-registration" className="btn-primary mt-8">{c.nav.fpoReg}</LLink>
          </div>
        </div>
      </Band>
    </>
  );
}

function RegPage({ seo, k, formKey }) {
  useSeo(seo);
  const c = useC(); const h = c.hub[k];
  return (
    <>
      <PageHero title={h.title} sub={h.sub} crumb={h.crumb} />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="mb-5 font-display text-2xl font-semibold text-brand-900">{h.whyTitle}</h2>
            <Checklist items={h.why} />
            <h3 className="mb-3 mt-8 font-display text-lg font-semibold text-brand-900">{h.docsTitle}</h3>
            <ul className="space-y-2 text-slate-700">{h.docs.map((d) => <li key={d} className="flex items-start gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />{d}</li>)}</ul>
            <p className="mt-6 border-l-4 border-gold-500 bg-white p-4 text-sm leading-6 text-slate-700">{h.statusNote}</p>
            {h.note && <p className="mt-4 text-sm leading-6 text-slate-600">{h.note}</p>}
          </div>
          <FormEngine key={formKey} formKey={formKey} title={c.formTitles[formKey]} />
        </div>
      </Band>
    </>
  );
}

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
        <div role="tablist" aria-label={h.title} className="mb-8 flex flex-wrap gap-2">
          {CAREER_TABS.map((k) => (
            <button key={k} type="button" role="tab" aria-selected={active === k} onClick={() => setParams({ form: k }, { replace: true })}
              className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold transition ${active === k ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'}`}>{h.tabs[k]}</button>
          ))}
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold text-brand-900">{h.tabs[active]}</h2>
            <p className="mb-6 text-slate-600">{h.tabNote[active]}</p>
            <Checklist items={h.why} />
            {active === 'job' && (
              <div className="mt-8 border border-dashed border-brand-200 bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-brand-900">{h.openTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{h.openText}</p>
              </div>
            )}
          </div>
          <FormEngine key={active} formKey={active} title={c.formTitles[active]} />
        </div>
      </Band>
    </>
  );
}