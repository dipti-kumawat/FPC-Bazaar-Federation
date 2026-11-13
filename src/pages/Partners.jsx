import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, Verify } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';

export default function Partners() {
  useSeo('partners');
  const c = useC(); const p = c.partners;
  return (
    <>
      <PageHero title={p.title} sub={p.sub} crumb={p.crumb} kind="biogas" />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="border-l-4 border-brand-600 bg-white p-6 shadow-sm"><h2 className="text-xl font-extrabold text-brand-900">{p.cbgH}</h2><p className="mt-2 text-slate-700">{p.cbgT}</p><LLink to="/biogas-cbg" className="mt-3 inline-block font-semibold text-brand-700 hover:underline">{c.common.learnMore} →</LLink></div>
            <Verify flag="noInvestBuyback"><div className="border-l-4 border-gold-500 bg-white p-6 shadow-sm"><h2 className="text-xl font-extrabold text-brand-900">{p.pppH}</h2><p className="mt-2 text-slate-700">{p.pppT}</p><LLink to="/ppp-model" className="mt-3 inline-block font-semibold text-brand-700 hover:underline">{c.common.learnMore} →</LLink></div></Verify>
            <p className="text-slate-700">{p.who}</p>
          </div>
          <FormEngine formKey="investor" title={p.formH} />
        </div>
      </Band>
    </>
  );
}
