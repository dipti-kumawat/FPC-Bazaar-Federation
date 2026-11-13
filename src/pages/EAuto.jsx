import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Steps, Checklist } from '../components/ui.jsx';

export default function EAuto() {
  useSeo('eauto');
  const c = useC(); const e = c.eauto;
  return (
    <>
      <PageHero title={e.title} sub={e.sub} crumb={e.crumb} kind="eauto" slot="eauto" />
      <Band>
        <div className="mx-auto max-w-3xl"><h2 className="mb-4 text-2xl font-extrabold text-brand-900">{e.problemsTitle}</h2><Checklist items={e.problems} /></div>
      </Band>
      <Band className="bg-white">
        <SectionTitle>{e.modelTitle}</SectionTitle>
        <Steps items={e.steps} />
      </Band>
      <Band>
        <SectionTitle>{e.benefitsTitle}</SectionTitle>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {e.benefits.map((b) => <div key={b.h} className="border-t-4 border-brand-600 pt-3"><h3 className="text-lg font-extrabold text-brand-900">{b.h}</h3><p className="mt-1 text-slate-600">{b.t}</p></div>)}
        </div>
        <p className="mt-12 text-center text-2xl font-extrabold text-brand-700">{e.tagline}</p>
      </Band>
      <section className="bg-brand-600 py-12 text-white"><div className="container-x grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
        <div><h2 className="text-3xl font-extrabold text-white">{e.cta.h}</h2><p className="mt-2 text-lg text-white/90">{e.cta.t}</p></div>
        <div className="md:text-right"><LLink to="/join-us?form=eauto" className="btn-light">{e.cta.b}</LLink></div>
      </div></section>
    </>
  );
}
