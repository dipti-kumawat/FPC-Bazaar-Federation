import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band } from '../components/ui.jsx';

export default function Privacy() {
  useSeo('privacy');
  const c = useC(); const p = c.privacy;
  return (
    <>
      <PageHero title={p.title} crumb={p.crumb} />
      <Band>
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">{p.draft}</p>
          {p.sections.map((s) => <section key={s.h} className="mb-7"><h2 className="mb-2 text-xl font-extrabold text-brand-900">{s.h}</h2><p className="text-slate-700">{s.t}</p></section>)}
        </div>
      </Band>
    </>
  );
}
