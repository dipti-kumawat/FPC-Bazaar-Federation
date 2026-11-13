import { useC, useT, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Steps } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';
import { Icon, Arrow } from '../components/Icons.jsx';
import { CATEGORIES } from '../data/marketplace.js';

export default function Sourcing() {
  useSeo('sourcing');
  const c = useC(); const t = useT(); const s = c.sourcing;
  const whoIcons = ['manufacturer', 'supplier', 'shield', 'farmer'];
  const stdIcons = ['doc', 'scale', 'grains', 'shield'];
  return (
    <>
      <PageHero title={s.title} sub={s.sub} crumb={s.crumb} />

      <Band>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow mb-4">{s.introTitle}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{c.homeBiz.sourcingTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-lg leading-8 text-slate-600">{s.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#request" className="btn-primary">{c.homeBiz.sourcingCta} <Arrow /></a><LLink to="/marketplace" className="btn-outline">{s.ctaMarket}</LLink></div>
          </div>
          <div>
            <p className="eyebrow mb-4">{s.whoTitle}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {s.who.map((w, i) => (
                <div key={w.h} className="card p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={whoIcons[i]} className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{w.h}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{w.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band className="bg-white">
        <SectionTitle sub={s.catSub} eyebrow={c.nav.marketplace}>{s.catTitle}</SectionTitle>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((k) => (
            <LLink key={k.id} to={`/marketplace?cat=${k.id}`} className="card card-hover group flex flex-col items-center px-4 py-7 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-300 bg-gold-50 text-brand-800 transition group-hover:bg-brand-800 group-hover:text-gold-400"><Icon name={k.icon} className="h-8 w-8" /></span>
              <span className="mt-4 font-display text-[15px] font-semibold leading-snug text-brand-900">{t(k.name)}</span>
            </LLink>
          ))}
        </div>
      </Band>

      <Band>
        <SectionTitle sub={s.processSub} eyebrow={c.sourcing.crumb}>{s.processTitle}</SectionTitle>
        <Steps items={s.steps} />
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x">
          <SectionTitle light sub={s.stdSub}>{s.stdTitle}</SectionTitle>
          <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {s.std.map((x, i) => (
              <div key={x.h} className="bg-brand-900 p-7">
                <Icon name={stdIcons[i]} className="h-9 w-9 text-gold-400" />
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{x.h}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{x.t}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/55">{s.stdNote}</p>
        </div>
      </section>

      <Band>
        <div className="mx-auto max-w-3xl">
          <SectionTitle>{s.faqTitle}</SectionTitle>
          <div className="divide-y divide-brand-100 border-y border-brand-100">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-brand-900 [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-500 text-gold-600 transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-5 pr-10 leading-7 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Band>

      <Band className="bg-brand-50" >
        <div id="request" className="grid scroll-mt-32 items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-4">{c.homeBiz.sourcingEyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{s.formTitle}</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-lg leading-8 text-slate-600">{s.formSub}</p>
            <ul className="mt-6 space-y-3">{c.homeBiz.sourcingPoints.map((x) => <li key={x} className="flex items-start gap-3 text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />{x}</li>)}</ul>
            <div className="mt-8 border-l-2 border-gold-500 bg-white p-5"><p className="font-display text-lg font-semibold text-brand-900">{s.ctaTitle}</p><p className="mt-1 text-sm text-slate-600">{s.ctaText}</p><div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-brand-700"><LLink to="/marketplace" className="underline underline-offset-4">{s.ctaMarket}</LLink><LLink to="/suppliers" className="underline underline-offset-4">{s.ctaDirectory}</LLink></div></div>
          </div>
          <FormEngine formKey="sourcing" title={c.formTitles.sourcing} />
        </div>
      </Band>
    </>
  );
}
