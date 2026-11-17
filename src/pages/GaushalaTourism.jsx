import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { videosFor } from '../data/videos.js';
import { useSeo } from '../lib/useSeo.js';
import { images } from '../config/site.js';
import { PageHero, Band, SectionTitle, Steps, Checklist, Verify } from '../components/ui.jsx';
import VideoCard from '../components/VideoCard.jsx';
import { Icon, Arrow } from '../components/Icons.jsx';

export default function GaushalaTourism() {
  const lang = useLang();
  useSeo('gaushalaTourism');
  const c = useC(); const g = c.gaushalaTourism;
  const featIcons = ['connect', 'inputs', 'processed'];
  const objIcons = ['shield', 'grains', 'farmer', 'inputs'];
  const Table = ({ head, rows }) => (
    <div className="overflow-hidden border border-brand-100 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand-800 text-gold-200"><tr><th className="px-4 py-3 font-semibold">{head[0]}</th><th className="px-4 py-3 font-semibold">{head[1]}</th></tr></thead>
        <tbody className="divide-y divide-brand-100">{rows.map(([a, b]) => <tr key={a}><td className="px-4 py-3 font-semibold text-brand-900">{a}</td><td className="px-4 py-3 text-slate-600">{b}</td></tr>)}</tbody>
      </table>
    </div>
  );
  return (
    <>
      <PageHero title={g.title} sub={g.sub} crumb={g.crumb} kind="fert" slot="gaushalaTourism" />

      <Band>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow mb-4">{g.summaryTitle}</p>
            {g.summary.map((p) => <p key={p} className="mb-4 text-lg leading-8 text-slate-600">{p}</p>)}
            <p className="mt-6 border-l-2 border-gold-500 bg-gold-50 p-4 text-sm leading-6 text-slate-600">{g.note}</p>
          </div>
          <figure>
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full border border-gold-400/60" aria-hidden="true" />
              <div className="relative overflow-hidden bg-brand-900"><img src={images.gaushalaTourism} alt={g.illus} loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
            </div>
            <figcaption className="mt-7 text-xs text-slate-500">{g.illus}</figcaption>
          </figure>
        </div>
      </Band>

      <Band className="bg-white">
        <SectionTitle eyebrow={g.crumb}>{g.conceptTitle}</SectionTitle>
        <div className="grid gap-10 lg:grid-cols-2">
          <div><p className="mb-3 font-display text-xl font-semibold text-brand-900">{g.conceptLead}</p><Checklist items={g.concept} /><p className="mt-5 text-sm font-semibold text-brand-800">{g.conceptNote}</p></div>
          <div className="grid gap-4">
            {g.features.map((f, i) => (
              <div key={f.h} className="card flex gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={featIcons[i]} className="h-6 w-6" /></span>
                <div><h3 className="font-display text-lg font-semibold text-brand-900">{f.h}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{f.t}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band>
        <SectionTitle sub={g.revenueSub}>{g.revenueTitle}</SectionTitle>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <ul className="grid gap-3 sm:grid-cols-2">{g.revenue.map((r) => <li key={r} className="flex items-start gap-3 border border-brand-100 bg-white px-4 py-3 text-sm font-semibold text-brand-900"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />{r}</li>)}</ul>
          <div className="relative isolate overflow-hidden bg-brand-900 p-7 text-white">
            <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
            <h3 className="font-display text-2xl font-semibold text-white">{g.impactTitle}</h3>
            <span className="gold-rule mt-3" />
            <ul className="mt-5 space-y-3">{g.impact.map((x) => <li key={x} className="flex items-start gap-3 text-white/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />{x}</li>)}</ul>
          </div>
        </div>
      </Band>

      <Band className="bg-brand-50">
        <SectionTitle sub={g.objectivesSub}>{g.objectivesTitle}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {g.objectives.map((o, i) => (
            <div key={o.h} className="card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-300 bg-gold-50 text-brand-800"><Icon name={objIcons[i]} className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{o.h}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{o.t}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">{g.crumb}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900">{g.villagesTitle}</h2>
            <span className="gold-rule mt-4" />
            <p className="mb-3 mt-5 font-semibold text-slate-700">{g.villagesLead}</p>
            <Checklist items={g.villages} />
          </div>
          <div className="grid gap-4 self-center">
            {g.principles.map((p) => <div key={p.h} className="border-l-2 border-gold-500 bg-white p-5 shadow-card"><h3 className="font-display text-lg font-semibold text-brand-900">{p.h}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{p.t}</p></div>)}
          </div>
        </div>
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x">
          <SectionTitle light>{g.stayTitle}</SectionTitle>
          <div className="grid gap-10 lg:grid-cols-2">
            <div><p className="mb-4 font-display text-xl font-semibold text-gold-300">{g.stayFeaturesH}</p>
              <ul className="space-y-3">{g.stay.map((s) => <li key={s} className="flex items-start gap-3 text-white/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />{s}</li>)}</ul></div>
            <div><p className="mb-4 font-display text-xl font-semibold text-gold-300">{g.stayTypesH}</p><Table head={[g.typeCol, g.guestCol]} rows={g.stayTypes} /></div>
          </div>
        </div>
      </section>

      <Band>
        <SectionTitle sub={g.journeySub}>{g.journeyTitle}</SectionTitle>
        <Steps items={g.journey} />
      </Band>

      <Band className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div><h2 className="mb-5 font-display text-2xl font-semibold text-brand-900">{g.sustainTitle}</h2><Checklist items={g.sustain} /></div>
          <Verify flag="gaushalaJobs">
            <h2 className="mb-2 font-display text-2xl font-semibold text-brand-900">{g.jobsTitle}</h2>
            <p className="mb-4 font-semibold text-brand-700">{g.jobsLead}</p>
            <Table head={[g.category, g.jobsCol]} rows={g.jobs} />
            <p className="mt-3 text-xs text-slate-500">{g.jobsNote}</p>
          </Verify>
        </div>
      </Band>

      <Band>
        <div className="grid items-center gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div className="mx-auto w-full max-w-xs"><VideoCard src="/videos/desi-cow-ghee.mp4" poster="/videos/desi-cow-ghee.jpg" title={c.homeBiz.videos.items[1].t} desc={c.homeBiz.videos.items[1].d} /></div>
          <div><p className="eyebrow mb-4">{c.homeBiz.videos.eyebrow}</p><h2 className="font-display text-3xl font-semibold leading-tight text-brand-900">{g.videoTitle}</h2><span className="gold-rule mt-4" /><p className="mt-5 text-lg leading-8 text-slate-600">{g.videoSub}</p></div>
        </div>
      {videosFor('gaushala').length > 0 && (
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
            {videosFor('gaushala').map((v) => <VideoCard key={v.id} src={v.src} poster={v.poster} title={v.title[lang]} desc={v.desc[lang]} />)}
          </div>
        )}
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-800 py-14 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{g.ctaTitle}</h2><p className="mt-2 max-w-xl text-white/75">{g.ctaText}</p></div>
          <div className="flex flex-wrap gap-3"><LLink to="/partners-investors" className="btn-gold">{g.ctaPrimary} <Arrow /></LLink><LLink to="/contact" className="btn-ghost-light">{g.ctaSecondary}</LLink></div>
        </div>
      </section>
    </>
  );
}