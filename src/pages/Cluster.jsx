import { useState } from 'react';
import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Outcomes, PhotoSlot } from '../components/ui.jsx';

// Pin positions (percent of the illustration) for the six parts of the centre.
const PINS = [[24, 62], [40, 62], [56, 62], [72, 62], [38, 31], [62, 31]];

export default function Cluster() {
  useSeo('cluster');
  const c = useC(); const k = c.cluster; const [sel, setSel] = useState(0);
  return (
    <>
      <PageHero title={k.title} sub={k.sub} crumb={k.crumb} kind="centre" slot="cluster" />
      <Band>
        <p className="mx-auto mb-10 max-w-3xl text-center text-xl text-slate-700">{k.intro}</p>
        <SectionTitle sub={k.explore}>{k.componentsTitle}</SectionTitle>
        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative aspect-[8/5] overflow-hidden rounded-sm border border-brand-100 bg-white">
            <PhotoSlot slot="cluster" kind="centre" alt={k.title} />
            {PINS.map(([x, y], i) => (
              <button key={i} type="button" onClick={() => setSel(i)} aria-label={k.components[i].n} aria-pressed={sel === i}
                style={{ left: `${x}%`, top: `${y}%` }}
                className={`absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-sm font-extrabold shadow ${sel === i ? 'bg-gold-500 text-white' : 'bg-brand-600 text-white'}`}>{i + 1}</button>
            ))}
          </div>
          <div>
            <div className="rounded-sm border-l-4 border-gold-500 bg-brand-50 p-6" aria-live="polite">
              <p className="text-sm font-bold text-brand-700">{sel + 1} / 6</p>
              <h3 className="mt-1 text-2xl font-extrabold text-brand-900">{k.components[sel].n}</h3>
              <p className="mt-2 text-lg text-slate-700">{k.components[sel].d}</p>
            </div>
            <ul className="mt-4 grid gap-1">
              {k.components.map((x, i) => (
                <li key={i}><button type="button" onClick={() => setSel(i)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-semibold ${sel === i ? 'bg-brand-600 text-white' : 'hover:bg-brand-50'}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm ${sel === i ? 'bg-white text-brand-700' : 'bg-brand-100 text-brand-800'}`}>{i + 1}</span>{x.n}</button></li>
              ))}
            </ul>
          </div>
        </div>
      </Band>
      <Outcomes title={k.outcomesTitle} items={k.outcomes} />
    </>
  );
}
