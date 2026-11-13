import { flags, draftMode, images } from '../config/site.js';
import { useC, LLink } from '../i18n/hooks.jsx';
import PhotoSlot from './PhotoSlot.jsx';
import { Arrow, Check } from './Icons.jsx';
import Reveal from './Reveal.jsx';

/** Hides content until its verification flag is true. In draft mode it is shown with a yellow outline. */
export function Verify({ flag, children, inline = false }) {
  const c = useC();
  if (!flag || flags[flag]) return children;
  if (!draftMode) return null;
  const Tag = inline ? 'span' : 'div';
  return (
    <Tag className={`relative rounded-md outline outline-2 outline-offset-4 outline-amber-400 ${inline ? 'mt-4 inline-block px-1' : 'p-4 pt-6'}`}>
      <span className="absolute -top-3 left-2 z-10 rounded bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-amber-950">{c.common.toVerify}</span>
      {children}
    </Tag>
  );
}

export function SectionTitle({ children, sub, light = false, left = false, eyebrow }) {
  return (
    <Reveal variant="none" stagger className={`mb-10 ${left ? '' : 'text-center'}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${light ? 'eyebrow-light' : ''} ${left ? '' : 'eyebrow-center'}`}>{eyebrow}</p>}
      <h2 className={`font-display text-[1.75rem] font-semibold leading-tight sm:text-4xl ${light ? 'text-white' : 'text-brand-900'}`}>{children}</h2>
      <span className={`gold-rule mt-4 ${left ? '' : 'mx-auto'}`} />
      {sub && <p className={`mt-4 max-w-2xl text-[17px] leading-8 ${left ? '' : 'mx-auto'} ${light ? 'text-white/75' : 'text-slate-600'}`}>{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ title, sub, crumb, crumbs, kind, slot }) {
  const c = useC();
  const img = slot && images[slot];
  const trail = crumbs || [];
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white">
      <div className="bg-lattice absolute inset-0 -z-10 opacity-90" aria-hidden="true" />
      <div className={`container-x grid items-center gap-10 py-14 lg:py-20 ${img ? 'lg:grid-cols-[1.35fr_.65fr]' : ''}`}>
        <div>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-white/60">
            <LLink to="" className="hover:text-gold-400">{c.common.home}</LLink>
            {trail.map((t) => <span key={t.to} className="flex items-center gap-2"><span aria-hidden="true" className="text-gold-500">/</span><LLink to={t.to} className="hover:text-gold-400">{t.label}</LLink></span>)}
            <span aria-hidden="true" className="text-gold-500">/</span><span className="font-semibold text-gold-400">{crumb}</span>
          </nav>
          <h1 className="max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          <span className="gold-rule mt-6" />
          {sub && <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{sub}</p>}
        </div>
        {img && (
          <div className="relative mx-auto hidden w-full max-w-xs lg:block">
            <div className="absolute -inset-2.5 arch border border-gold-400/40" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-brand-950"><PhotoSlot slot={slot} kind={kind} alt={title} /></div>
          </div>
        )}
      </div>
      <div className="h-[3px] bg-gradient-to-r from-brand-700 via-gold-500 to-brand-700" />
    </section>
  );
}

/** Horizontal (md+) / vertical numbered steps. */
export function Steps({ items }) {
  return (
    <div>
      <ol className="hidden md:grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((s, i) => (
          <li key={i} className="relative list-none px-3 text-center">
            {i < items.length - 1 && <span className="absolute left-1/2 top-6 h-px w-full bg-gold-400" aria-hidden="true" />}
            <Reveal delay={i * 130}><Verify flag={s.verify}>
              <span className="relative z-10 mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border-2 border-gold-500 bg-paper font-display text-lg font-bold text-brand-800">{i + 1}</span>
              <h3 className="font-display text-base font-semibold text-brand-900">{s.h}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{s.t}</p>
            </Verify></Reveal>
          </li>
        ))}
      </ol>
      <ol className="grid gap-6 md:hidden">
        {items.map((s, i) => (
          <li key={i} className="flex list-none gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-gold-500 bg-paper font-display font-bold text-brand-800">{i + 1}</span>
            <Verify flag={s.verify}><div><h3 className="font-display font-semibold text-brand-900">{s.h}</h3><p className="text-slate-600">{s.t}</p></div></Verify>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Checklist({ items }) {
  return (
    <ul className="divide-y divide-brand-100 border-y border-brand-100">
      {items.map((it, i) => {
        const text = typeof it === 'string' ? it : it.t;
        const flag = typeof it === 'string' ? null : it.verify;
        return (
          <li key={i} className="relative py-3.5 pl-9 leading-7 text-slate-700">
            <span className="absolute left-0 top-[1.1rem] grid h-5 w-5 place-items-center rounded-full bg-gold-100 text-brand-800" aria-hidden="true"><Check className="h-3 w-3" /></span>
            <Verify flag={flag} inline>{text}</Verify>
          </li>
        );
      })}
    </ul>
  );
}

export function Outcomes({ title, items }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white">
      <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x">
        <SectionTitle light>{title}</SectionTitle>
        <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
          {items.map((t, i) => (
            <div key={i} className="bg-brand-900 p-7">
              <p className="font-display text-3xl font-semibold text-gold-400">0{i + 1}</p>
              <p className="mt-3 text-lg font-semibold leading-snug">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ item }) {
  const c = useC();
  return (
    <Reveal className="h-full"><LLink to={item.path} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[3/2] overflow-hidden bg-brand-900">
        <div className="h-full w-full transition duration-700 group-hover:scale-105"><PhotoSlot slot={item.key} kind={item.kind} alt={item.title} /></div>
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-500 transition duration-500 group-hover:scale-x-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[17px] font-semibold leading-snug text-brand-900">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.short}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:text-brand-900">{c.common.learnMore} <Arrow className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </LLink></Reveal>
  );
}

export function Band({ children, className = '' }) {
  return <section className={`py-16 sm:py-20 ${className}`}><div className="container-x">{children}</div></section>;
}
export { PhotoSlot };
