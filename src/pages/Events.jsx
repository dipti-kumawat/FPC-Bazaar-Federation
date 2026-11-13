import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { eventImages } from '../config/site.js';
import { PageHero, Band } from '../components/ui.jsx';
import { Pin, Arrow } from '../components/Icons.jsx';

export default function Events() {
  useSeo('events');
  const c = useC(); const e = c.eventsPage; const h = c.home;
  return (
    <>
      <PageHero title={e.title} sub={e.sub} crumb={e.crumb} />
      <Band>
        <div className="space-y-14">
          {h.events.map((ev, i) => (
            <article key={ev.title} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
              <div className="relative">
                <div className="absolute -inset-3 border border-gold-400/50" aria-hidden="true" />
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-900 shadow-lift"><img src={eventImages[i]} alt={ev.imageAlt} loading="lazy" className="h-full w-full object-cover" /></div>
              </div>
              <div>
                <p className="eyebrow">{ev.category}</p>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-brand-900 sm:text-3xl">{ev.title}</h2>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-gold-700"><Pin className="h-4 w-4" />{ev.location}</p>
                <p className="mt-4 text-lg leading-8 text-slate-600">{ev.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Band>
      <section className="relative isolate overflow-hidden bg-brand-900 py-14 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{e.ctaTitle}</h2><p className="mt-2 max-w-xl text-white/75">{e.ctaText}</p></div>
          <LLink to="/contact" className="btn-gold">{e.cta} <Arrow /></LLink>
        </div>
      </section>
    </>
  );
}
