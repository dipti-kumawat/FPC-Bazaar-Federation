import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Verify, Checklist, Band, PhotoSlot } from '../components/ui.jsx';
import { draftMode, flags } from '../config/site.js';

export default function Ppp() {
  useSeo('ppp');
  const c = useC(); const p = c.ppp;
  return (
    <>
      <PageHero title={p.title} sub={p.sub} crumb={p.crumb} kind="polyhouse" slot="ppp" />
      {/* At launch, this whole block is hidden until the claim is verified, so no empty band is left behind. */}
      {(flags.noInvestBuyback || draftMode) && <Band>
        <Verify flag="noInvestBuyback">
          <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">{p.p1.h}</h2>
          <p className="mt-2 max-w-3xl text-lg text-slate-700">{p.p1.t}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <div className="border-l-4 border-gold-500 bg-brand-50 p-6"><h3 className="text-xl font-extrabold text-brand-900">{p.p1.zeroH}</h3><p className="mt-2">{p.p1.zeroT}</p></div>
            <div className="grid grid-cols-3 gap-3">
              {[['polyhouse', p.p1.photos[0]], ['dairy', p.p1.photos[1]], ['biogas', p.p1.photos[2]]].map(([k, l]) => (
                <figure key={k}><div className="aspect-[3/4] overflow-hidden rounded-lg"><PhotoSlot kind={k} alt={l} /></div><figcaption className="mt-1 text-center text-xs font-semibold text-slate-600">{l}</figcaption></figure>
              ))}
            </div>
          </div>
        </Verify>
      </Band>}
      <Band className="bg-white">
        <div className="grid gap-10 md:grid-cols-2">
          <div><h2 className="mb-4 text-2xl font-extrabold text-brand-900">{p.p2.h}</h2><Checklist items={p.p2.items} /></div>
          <div><h2 className="text-2xl font-extrabold text-brand-900">{p.p3.h}</h2><p className="mb-4 text-slate-600">{p.p3.sub}</p><Checklist items={p.p3.items} /></div>
        </div>
      </Band>
      <Verify flag="noInvestBuyback">
        <section className="bg-brand-800 py-12 text-white"><div className="container-x grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
          <div><h2 className="text-3xl font-extrabold text-white">{p.banner.h}</h2><p className="mt-2 text-lg text-white/85">{p.banner.t}</p></div>
          <div className="md:text-right"><LLink to="/partners-investors" className="btn-light">{p.cta}</LLink></div>
        </div></section>
      </Verify>
    </>
  );
}
