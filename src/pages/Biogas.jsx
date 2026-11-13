import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Steps, Verify } from '../components/ui.jsx';

export default function Biogas() {
  useSeo('biogas');
  const c = useC(); const b = c.biogas;
  return (
    <>
      <PageHero title={b.title} sub={b.sub} crumb={b.crumb} kind="biogas" slot="biogas" />
      <Band>
        <SectionTitle>{b.modelTitle}</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {b.model.map((m) => (
            <Verify key={m.h} flag={m.verify}><div className="h-full border-l-4 border-brand-600 bg-white p-6 shadow-sm"><h3 className="text-xl font-extrabold text-brand-900">{m.h}</h3><p className="mt-2 text-slate-700">{m.t}</p></div></Verify>
          ))}
        </div>
      </Band>
      <Band className="bg-white">
        <SectionTitle>{b.structureTitle}</SectionTitle>
        <Steps items={b.structure} />
        <Verify flag="noInvestBuyback"><ul className="mt-10 flex flex-wrap justify-center gap-3">{b.chips.map((x) => <li key={x} className="rounded-full bg-brand-100 px-5 py-2 font-bold text-brand-900">{x}</li>)}</ul></Verify>
      </Band>
      <Band>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
          <div><h2 className="text-2xl font-extrabold text-brand-900">{b.statesTitle}</h2><p className="mt-2 text-slate-700">{b.statesNote}</p></div>
          <ul className="grid grid-cols-2 gap-3">{b.states.map((s) => <li key={s} className="border border-brand-200 bg-white px-4 py-4 text-center text-lg font-bold text-brand-800">{s}</li>)}</ul>
        </div>
      </Band>
      <section className="bg-brand-800 py-12 text-white"><div className="container-x grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
        <p className="text-2xl font-extrabold">{b.closing}</p>
        <div className="md:text-right"><LLink to="/partners-investors" className="btn-light">{b.cta}</LLink></div>
      </div></section>
    </>
  );
}
