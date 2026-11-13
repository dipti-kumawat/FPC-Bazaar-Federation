import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Steps, Checklist, Outcomes, Verify, PhotoSlot } from '../components/ui.jsx';

export default function Gaushala() {
  useSeo('gaushala');
  const c = useC(); const g = c.gaushala;
  return (
    <>
      <PageHero title={g.title} sub={g.sub} crumb={g.crumb} kind="fert" slot="gaushala" />
      <Band>
        <SectionTitle>{g.stepsTitle}</SectionTitle>
        <Steps items={g.steps} />
        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6">
          {['fert', 'training', 'product'].map((k, i) => (
            <figure key={k}><div className="aspect-[4/3] overflow-hidden rounded-lg"><PhotoSlot kind={k} alt={g.photos[i]} /></div><figcaption className="mt-2 text-center text-xs font-semibold text-slate-600 sm:text-sm">{g.photos[i]}</figcaption></figure>
          ))}
        </div>
      </Band>
      <Band className="bg-white">
        <div className="grid gap-10 md:grid-cols-2">
          <Verify flag="amulPermission"><h2 className="mb-4 text-2xl font-extrabold text-brand-900">{g.partnership.h}</h2><Checklist items={g.partnership.items} /></Verify>
          <div><h2 className="mb-4 text-2xl font-extrabold text-brand-900">{g.training.h}</h2><Checklist items={g.training.items} /></div>
        </div>
      </Band>
      <Outcomes title={g.outcomesTitle} items={g.outcomes} />
    </>
  );
}
