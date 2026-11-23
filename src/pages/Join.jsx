import { useSearchParams } from 'react-router-dom';
import { useC, LLink, useLang } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';

const KEYS = ['register', 'eauto', 'amul', 'investor', 'product'];

export default function Join() {
  useSeo('join');
  const c = useC(); const lang = useLang(); const [params, setParams] = useSearchParams();
  const active = KEYS.includes(params.get('form')) ? params.get('form') : 'register';
  return (
    <>
      <PageHero title={c.join.title} sub={c.join.sub} crumb={c.join.crumb} kind="training" />
      <Band>
        <LLink to="/ngo-registration" className="btn-outline mb-6">{lang === 'hi' ? 'NGO पंजीकरण' : 'Register an NGO'}</LLink>
        <div role="tablist" aria-label={c.join.title} className="mb-6 flex flex-wrap gap-2">
          {KEYS.map((k) => (
            <button key={k} role="tab" type="button" aria-selected={active === k} onClick={() => setParams({ form: k }, { replace: true })}
              className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold ${active === k ? 'border-brand-600 bg-brand-600 text-white' : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'}`}>{c.join.tabs[k]}</button>
          ))}
        </div>
        <div role="tabpanel" className="max-w-3xl"><FormEngine key={active} formKey={active} title={c.formTitles[active]} /></div>
      </Band>
    </>
  );
}
