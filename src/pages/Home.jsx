
import { useC, LLink } from '../i18n/hooks.jsx';
import { initiativeList, site, eventImages } from '../config/site.js';
import { useSeo } from '../lib/useSeo.js';
import { useRegistryTick } from '../services/registry.js';
import UpdateCard from '../components/UpdateCard.jsx';
import { sortedUpdates, HOME_COUNT } from '../data/updates.js';
import { SectionTitle, ProjectCard, PhotoSlot, Band, Verify } from '../components/ui.jsx';
import { ProductCard, SupplierCard } from '../components/market.jsx';
import { Icon, Arrow, Check, Pin } from '../components/Icons.jsx';
import VideoCard from '../components/VideoCard.jsx';
import SwipeRow from '../components/SwipeRow.jsx';
import { videosFor } from '../data/videos.js';
import Marquee from '../components/Marquee.jsx';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import { CATEGORIES, SUPPLIER_TYPES, visibleProducts, visibleSuppliers } from '../data/marketplace.js';
import { useT, useLang } from '../i18n/hooks.jsx';

const ROLE_IMG = { farmer: '/images/gaushala-hero.jpg', fpo: '/images/events/abcd-mou-gujarat.jpg', manufacturer: '/images/1.jpeg', supplier: '/images/3.jpeg' };
const ROLE_POS = { farmer: 'center', fpo: 'center', manufacturer: 'center', supplier: 'center 30%' };
const TICKER_ICONS = { gaushala: 'inputs', gaushalaTourism: 'dairy', cluster: 'manufacturer', biogas: 'equipment', eauto: 'supplier', amul: 'processed', enzy: 'feed', ppp: 'connect' };

export default function Home() {
  const lang = useLang();
  useSeo('home'); useRegistryTick();
  const c = useC(); const t = useT();
  const h = c.home; const b = c.homeBiz;
  const items = initiativeList.filter((item) => !['ppp', 'gaushalaTourism'].includes(item.key)).map((item) => ({ ...item, ...c.initiatives[item.key] }));
  const products = visibleProducts().filter((_, i) => [0, 3, 7, 10].includes(i)).slice(0, 4);
  const suppliers = visibleSuppliers().filter((_, i) => [0, 5, 6, 8].includes(i)).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div>
            <p className="eyebrow eyebrow-light anim-rise mb-7" style={{ '--d': '.05s' }}>{b.hero.eyebrow}</p>
            <h1 style={{ '--d': '.18s' }} className="anim-rise hero-title font-display text-[2.45rem] font-semibold leading-[1.06] text-white sm:text-6xl lg:text-[4.1rem]">
              {b.hero.l1}
              <span className="mt-2 block text-gold-400">{b.hero.l2}</span>
            </h1>
            <p style={{ '--d': '.34s' }} className="anim-rise mt-7 max-w-xl text-lg leading-8 text-white/75">{b.hero.sub}</p>
            <div style={{ '--d': '.5s' }} className="anim-rise mt-9 flex flex-wrap gap-3">
              <LLink to="/marketplace" className="btn-gold">{b.hero.primary} <Arrow /></LLink>
              <LLink to="/business-connect" className="btn-ghost-light">{b.hero.secondary}</LLink>
            </div>
            <ul style={{ '--d': '.66s' }} className="anim-rise mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
              {SUPPLIER_TYPES.map((k) => <li key={k} className="flex items-center gap-2.5 text-sm font-semibold text-white/80"><Icon name={k} className="h-5 w-5 text-gold-400" />{c.network.types[k]}</li>)}
            </ul>
          </div>
          <div style={{ '--d': '.25s' }} className="anim-pop relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
            <div className="absolute -inset-3 arch border border-gold-400/40" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-brand-900 shadow-lift"><PhotoSlot slot="gaushalaHero" kind="fert" alt={h.hero.imageAlt} /></div>
            <div style={{ '--d': '1s' }} className="anim-float absolute -bottom-7 -left-4 w-48 overflow-hidden rounded-sm border-4 border-brand-950 shadow-lift sm:-left-10 sm:w-60">
              <img src="/images/fpc-stall.jpg" alt="FPC Bazar Federation stall at an agriculture expo" loading="lazy" className="aspect-[16/10] w-full object-cover" />
            </div>
            <div style={{ '--d': '2.2s' }} className="anim-float absolute -bottom-6 -right-2 max-w-[15rem] border-l-[3px] border-gold-500 bg-paper p-4 text-brand-950 shadow-lift sm:-right-6">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold-700">{b.hero.statLabel}</p>
              <p className="mt-1 font-display text-lg font-semibold">{b.hero.statValue}</p>
              <p className="mt-0.5 break-all text-[10px] tracking-wide text-slate-500">CIN {site.cin}</p>
            </div>
          </div>
        </div>
        <div className="h-[3px] bg-gradient-to-r from-brand-700 via-gold-500 to-brand-700" />
      </section>

      {/* INITIATIVES TICKER */}
      <section className="border-b border-brand-100 bg-white py-5" aria-label={c.nav.initiatives}>
        <Marquee seconds={50} label={c.nav.initiatives}>
          {initiativeList.map((it) => (
            <LLink key={it.key} to={it.path} className="flex shrink-0 items-center gap-3 border border-brand-100 bg-paper px-5 py-3 transition hover:border-gold-400 hover:bg-gold-50">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={TICKER_ICONS[it.key]} className="h-5 w-5" /></span>
              <span className="whitespace-nowrap text-sm font-semibold text-brand-900">{c.initiatives[it.key].title}</span>
            </LLink>
          ))}
        </Marquee>
      </section>

      {/* NETWORK */}
      <Band>
        <SectionTitle eyebrow={b.networkEyebrow} sub={b.networkSub}>{b.networkTitle}</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SUPPLIER_TYPES.map((k, i) => (
            <Reveal key={k} delay={i * 110} className="relative">
              <LLink to={`/business-connect?form=connect&role=${k}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-900">
                  <img src={ROLE_IMG[k]} alt="" loading="lazy" style={{ objectPosition: ROLE_POS[k] }} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent" aria-hidden="true" />
                  <span className="absolute left-5 top-3 font-display text-4xl font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,.65)]">0{i + 1}</span>
                </div>
                <span className="relative z-10 -mt-7 ml-6 grid h-14 w-14 place-items-center rounded-full border-[3px] border-white bg-brand-800 text-gold-400 shadow-card transition group-hover:bg-gold-500 group-hover:text-brand-950"><Icon name={k} className="h-7 w-7" /></span>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
                  <h3 className="font-display text-xl font-semibold text-brand-900">{c.network.roles[k].t}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{c.network.roles[k].d}</p>
                  <ul className="mt-4 space-y-2 border-t border-brand-100 pt-4">
                    {c.connect.offers[k].slice(0, 2).map((o) => <li key={o} className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{o}</li>)}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">{b.joinAs.replace('{role}', c.network.roles[k].t)} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </LLink>
              {i < SUPPLIER_TYPES.length - 1 && <span className="pointer-events-none absolute -right-[30px] top-[78px] z-20 hidden h-9 w-9 place-items-center rounded-full border-2 border-paper bg-gold-500 text-brand-950 shadow-card xl:grid" aria-hidden="true"><Arrow className="h-4 w-4" /></span>}
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <Verify flag="networkStats">
            <dl className="mt-12 grid overflow-hidden border-b-4 border-gold-500 bg-brand-900 text-white sm:grid-cols-2 lg:grid-cols-4">
              {b.networkStats.map((st) => (
                <div key={st.l} className="border-white/10 px-6 py-6 text-center sm:border-r sm:last:border-r-0">
                  <dt className="font-display text-3xl font-semibold text-gold-400 sm:text-4xl"><CountUp value={st.v} /></dt>
                  <dd className="mt-1 text-sm text-white/75">{st.l}</dd>
                </div>
              ))}
            </dl>
          </Verify>
        </Reveal>
      </Band>

      {/* MARKETPLACE */}
      <Band className="bg-white">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{b.marketEyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{b.marketTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-lg leading-8 text-slate-600">{b.marketSub}</p>
          </div>
          <LLink to="/marketplace" className="btn-primary shrink-0">{b.marketCta} <Arrow /></LLink>
        </div>
        <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIES.map((k) => (
            <LLink key={k.id} to={`/marketplace?cat=${k.id}`} className="group flex items-center gap-3 border border-brand-100 bg-paper px-4 py-3.5 transition hover:border-gold-400 hover:bg-gold-50">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={k.icon} className="h-5 w-5" /></span>
              <span className="min-w-0 break-words text-[13.5px] font-semibold leading-snug text-brand-900">{t(k.name)}</span>
            </LLink>
          ))}
        </div>
        {products.length > 0 && (<><p className="mb-6 font-display text-xl font-semibold text-brand-900">{b.featured}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div></>)}
      </Band>

      {/* BUSINESS CONNECT FLOW */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x">
          <SectionTitle light eyebrow={b.flowEyebrow} sub={b.flowSub}>{b.flowTitle}</SectionTitle>
          <ol className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-4">
            {c.connect.steps.map((s, i) => (
              <li key={s.h} className="list-none bg-brand-900 p-7">
                <span className="font-display text-4xl font-semibold text-gold-400">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.h}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{s.t}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center"><LLink to="/business-connect" className="btn-gold">{c.nav.connectCta} <Arrow /></LLink></div>
        </div>
      </section>

      {/* SUPPLIER DIRECTORY */}
      <Band>
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{b.suppliersEyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{b.suppliersTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-lg leading-8 text-slate-600">{b.suppliersSub}</p>
          </div>
          <LLink to="/suppliers" className="btn-outline shrink-0">{b.suppliersCta} <Arrow /></LLink>
        </div>
        {suppliers.length > 0 && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{suppliers.map((s) => <SupplierCard key={s.id} s={s} />)}</div>}
      </Band>

      {/* SOURCING */}
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">{b.sourcingEyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{b.sourcingTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-lg leading-8 text-slate-600">{b.sourcingBody}</p>
            <div className="mt-8 flex flex-wrap gap-3"><LLink to="/sourcing" className="btn-primary">{b.sourcingCta} <Arrow /></LLink><LLink to="/sourcing" className="btn-outline">{b.sourcingMore}</LLink></div>
          </div>
          <div className="border-t-[3px] border-gold-500 bg-white p-8 shadow-card">
            <ul className="space-y-5">
              {b.sourcingPoints.map((x, i) => (
                <li key={x} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-gold-500 font-display text-lg font-semibold text-brand-800">{i + 1}</span>
                  <p className="pt-1.5 text-lg font-semibold leading-snug text-brand-900">{x}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="bg-paper-grain py-16 text-center sm:py-24">
        <div className="container-x">
          <p className="eyebrow eyebrow-center mb-6">{h.hero.motto}</p>
          <p className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.15] text-brand-900 sm:text-6xl">{h.hero.l1} <span className="text-gold-600">{h.hero.l2}</span></p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">{h.hero.sub}</p>
        </div>
      </section>

      {/* GAUSHALA FEATURE */}
      <Band className="bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <Reveal variant="left"><div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-gold-400/60" aria-hidden="true" />
            <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-brand-900">
              <PhotoSlot slot="gaushalaTourism" kind="fert" alt={h.gaushalaFeature.imageAlt} />
              <span className="absolute left-4 top-4 bg-paper px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-brand-800">{h.gaushalaFeature.tag}</span>
              <span className="absolute bottom-3 right-3 bg-brand-950/80 px-2.5 py-1 text-[10px] font-semibold text-white/90">{b.concept}</span>
            </div>
          </div></Reveal>
          <Reveal variant="right"><div>
            <p className="eyebrow mb-4">{h.gaushalaFeature.eyebrow}</p>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{h.gaushalaFeature.title}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{h.gaushalaFeature.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {h.gaushalaFeature.pillars.map((pillar) => <li key={pillar} className="flex items-start gap-3 text-sm font-semibold text-ink"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-100 text-brand-800"><Check className="h-3 w-3" /></span>{pillar}</li>)}
            </ul>
            <p className="mt-6 text-xs leading-6 text-slate-500">{h.gaushalaFeature.note}</p>
            <LLink to="/gaushala-tourism" className="btn-primary mt-6">{h.gaushalaFeature.cta} <Arrow /></LLink>
          </div></Reveal>
        </div>
      </Band>

      {/* INITIATIVES */}
      <Band>
        <SectionTitle sub={h.projectsSub} eyebrow={c.nav.initiatives}>{h.projects}</SectionTitle>
        <SwipeRow three label={lang === 'hi' ? 'और पहल देखने के लिए स्वाइप करें' : 'Swipe to see more initiatives'}>{items.map((item) => <ProjectCard key={item.key} item={item} />)}</SwipeRow>
      </Band>

      {/* EVENTS */}
      <Band className="bg-brand-50/70">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{h.eventsEyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{h.eventsTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-lg leading-8 text-slate-600">{h.eventsSub}</p>
          </div>
          <LLink to="/events" className="btn-outline shrink-0">{b.eventsAll} <Arrow /></LLink>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sortedUpdates().slice(0, HOME_COUNT).map((u) => <UpdateCard key={u.id} u={u} />)}
        </div>
        <div className="mt-10 text-center"><LLink to="/events" className="btn-primary">{b.eventsAll} <Arrow /></LLink></div>
      </Band>

      {/* VIDEOS */}
      <Band className="bg-white">
        <SectionTitle eyebrow={b.videos.eyebrow} sub={b.videos.sub}>{b.videos.title}</SectionTitle>
        <div className="mx-auto max-w-6xl"><SwipeRow label={lang === 'hi' ? 'और वीडियो देखने के लिए स्वाइप करें' : 'Swipe to see more videos'}>
          <VideoCard src="/videos/mineral-mixture.mp4" poster="/videos/mineral-mixture.jpg" title={b.videos.items[0].t} desc={b.videos.items[0].d} />
          <VideoCard src="/videos/desi-cow-ghee.mp4" poster="/videos/desi-cow-ghee.jpg" title={b.videos.items[1].t} desc={b.videos.items[1].d} />
          {videosFor('home').map((v) => <VideoCard key={v.id} src={v.src} poster={v.poster} title={v.title[lang]} desc={v.desc[lang]} />)}
        </SwipeRow></div>
      </Band>

      {/* FOCUS AREAS */}
      <Band>
        <SectionTitle sub={h.prioritiesSub}>{h.prioritiesTitle}</SectionTitle>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {h.priorities.map((priority, index) => (
            <Reveal key={priority.h}><div className="border-t border-gold-500/70 pt-5">
              <p className="font-display text-2xl font-semibold text-gold-500">0{index + 1}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-brand-900">{priority.h}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{priority.t}</p>
            </div></Reveal>
          ))}
        </div>
      </Band>

      {/* VISION */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="eyebrow eyebrow-light">{h.visionEyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{h.visionTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">{h.vision}</p>
            <p className="mt-3 text-xs text-white/50">{c.common.visionNote}</p>
          </div>
          <dl className="grid grid-cols-2 gap-8 border-l border-gold-500/60 pl-6 sm:pl-10">
            {h.stats.map((stat) => (
              <div key={stat.l}>
                <dt className="font-display text-3xl font-semibold text-gold-400 sm:text-4xl"><CountUp value={stat.v} /></dt>
                <dd className="mt-1 text-xs leading-5 text-white/70">{stat.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* E-AUTO */}
      <Band>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left"><div className="relative">
            <div className="absolute -bottom-4 -left-4 h-full w-full border border-gold-400/60" aria-hidden="true" />
            <div className="img-zoom relative aspect-[5/3] overflow-hidden bg-brand-900"><PhotoSlot slot="eauto" kind="eauto" alt={h.eauto.imageAlt} /></div>
          </div></Reveal>
          <Reveal variant="right"><div>
            <p className="eyebrow mb-4">{h.eauto.eyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{h.eauto.h}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-lg leading-8 text-slate-600">{h.eauto.t}</p>
            <LLink to="/e-auto-delivery" className="btn-outline mt-6">{h.eauto.cta} <Arrow /></LLink>
          </div></Reveal>
        </div>
      </Band>

      {/* AUDIENCES + CTA */}
      <section className="bg-cream py-14">
        <div className="container-x">
          <SectionTitle>{h.audiencesTitle}</SectionTitle>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {h.audiences.map((audience) => <li key={audience} className="border border-brand-200 bg-paper px-4 py-2 text-sm font-semibold text-brand-800">{audience}</li>)}
          </ul>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-brand-800 py-20 text-white sm:py-24">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x text-center">
          <p className="eyebrow eyebrow-light eyebrow-center">{h.cta.eyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">{h.cta.h}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">{h.cta.t}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <LLink to="/join-us" className="btn-gold">{h.cta.b1}</LLink>
            <LLink to="/partners-investors" className="btn-ghost-light">{h.cta.b2}</LLink>
          </div>
        </div>
      </section>
    </>
  );
}
