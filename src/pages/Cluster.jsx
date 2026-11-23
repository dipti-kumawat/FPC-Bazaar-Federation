import { useState } from 'react';
import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { useLang } from '../i18n/hooks.jsx';
import { PageHero, Band, SectionTitle, Outcomes, Verify } from '../components/ui.jsx';
import { abcdServices } from './ABCD.jsx';

// One open item at a time; click again to close.
function Acc({ id, items, start = 0, children }) {
  const [sel, setSel] = useState(-1);
  return (
    <ul className="grid gap-2">
      {items.map((x, i) => {
        const open = sel === i;
        const row = (
          <li key={i} className={`overflow-hidden rounded-md border transition-colors ${open ? 'border-brand-600 bg-white shadow-sm' : 'border-brand-100 bg-white hover:bg-brand-50'}`}>
            <button type="button" id={`${id}-h-${i}`} aria-expanded={open} aria-controls={`${id}-p-${i}`} onClick={() => setSel(open ? -1 : i)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left font-semibold ${open ? 'bg-brand-600 text-white' : 'text-brand-900'}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm ${open ? 'bg-white text-brand-700' : 'bg-brand-100 text-brand-800'}`}>{start + i + 1}</span>
              <span className="flex-1">{x.n}</span>
              <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div id={`${id}-p-${i}`} role="region" aria-labelledby={`${id}-h-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">{children(x)}</div>
            </div>
          </li>
        );
        return x.verify ? <Verify key={i} flag="noInvestBuyback">{row}</Verify> : row;
      })}
    </ul>
  );
}

export default function Cluster() {
  useSeo('cluster');
  const c = useC(); const k = c.cluster; const lang = useLang(); const ab = abcdServices(lang);
  return (
    <>
      <PageHero title={k.title} sub={k.sub} crumb={k.crumb} kind="centre" slot="cluster" />
      <Band>
        <p className="mx-auto mb-10 max-w-3xl text-center text-xl text-slate-700">{k.intro}</p>
        <SectionTitle sub={ab.sub}>{ab.title}</SectionTitle>
        <div className="mx-auto grid max-w-6xl items-start gap-3 lg:grid-cols-2 lg:gap-6">
          {[ab.items.slice(0, 4), ab.items.slice(4)].map((col, n) => (
            <Acc key={n} id={`ab${n}`} items={col} start={n * 4}>{(x) => (
              <div className="border-l-4 border-gold-500 bg-brand-50/60">
                <img src={`/images/abcd/${x.img}.jpg`} alt={x.n} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <p className="px-5 py-4 text-slate-700">{x.d}</p>
              </div>
            )}</Acc>
          ))}
        </div>
      </Band>
      <Outcomes title={k.outcomesTitle} items={k.outcomes} />
    </>
  );
}