import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { initiativeList, marketNav } from '../config/site.js';
import Logo from './Logo.jsx';
import { Icon, Chevron } from './Icons.jsx';

function LangSwitch({ dark = false }) {
  const lang = useLang(); const c = useC(); const nav = useNavigate(); const loc = useLocation();
  const go = (l) => { if (l !== lang) nav(`${loc.pathname.replace(/^\/(en|hi)/, `/${l}`)}${loc.search}${loc.hash}`); };
  return (
    <div role="group" aria-label={c.common.switchLang} className={`inline-flex overflow-hidden rounded-full border p-0.5 text-[13px] font-bold ${dark ? 'border-white/25' : 'border-brand-800/30'}`}>
      {['en', 'hi'].map((l) => (
        <button key={l} type="button" onClick={() => go(l)} aria-pressed={lang === l} lang={l}
          className={`min-w-[38px] rounded-full px-2.5 py-1 transition sm:min-w-[44px] sm:px-3 ${lang === l ? 'bg-gold-500 text-brand-950' : dark ? 'text-white/80 hover:text-white' : 'text-brand-800 hover:bg-brand-50'}`}>{l === 'en' ? 'EN' : 'हिं'}</button>
      ))}
    </div>
  );
}

export default function Header() {
  const c = useC(); const lang = useLang(); const loc = useLocation(); const [open, setOpen] = useState(false);
  const items = initiativeList.map((i) => ({ ...i, ...c.initiatives[i.key] }));
  const mk = marketNav.map((m) => ({ ...m, title: c.nav[m.key], desc: c.nav.desc[m.key] }));
  const rest = loc.pathname.replace(/^\/(en|hi)/, '');
  const inMarket = marketNav.some((m) => rest.startsWith(m.path));
  const inInit = initiativeList.some((m) => rest.startsWith(m.path));
  const link = ({ isActive }) => `relative whitespace-nowrap px-2.5 py-2 text-[14px] font-semibold transition hover:text-brand-600 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 ${isActive ? 'text-brand-900 after:scale-x-100' : 'text-slate-700 after:scale-x-0 hover:after:scale-x-100'}`;
  const trigger = (on) => `flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[14px] font-semibold transition hover:text-brand-600 ${on ? 'text-brand-900' : 'text-slate-700'}`;
  const close = () => setOpen(false);
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className="sticky top-0 z-40 shadow-[0_1px_0_rgba(16,59,45,.08)]">
      <div className="border-b-2 border-gold-500/70 bg-paper/95 backdrop-blur">
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <LLink to="" aria-label="FPC Bazaar Federation" onClick={close}><Logo tagline="belowXl" /></LLink>
          <nav className="hidden items-center xl:flex" aria-label="Main">
            <NavLink end to={`/${lang}`} className={link}>{c.nav.home}</NavLink>
            <NavLink to={`/${lang}/about`} className={link}>{c.nav.about}</NavLink>
            <div className="group relative">
              <button type="button" className={trigger(inMarket)} aria-haspopup="true">{c.nav.marketplaceMenu} <Chevron /></button>
              <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-1 border border-brand-100 border-t-[3px] border-t-gold-500 bg-white p-3 shadow-lift">
                  {mk.map((m) => (
                    <LLink key={m.key} to={m.path} className="flex gap-3 rounded-[3px] p-3 transition hover:bg-brand-50">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={m.icon} className="h-6 w-6" /></span>
                      <span><span className="block font-display text-[15px] font-semibold text-brand-900">{m.title}</span><span className="mt-0.5 block text-[12.5px] leading-5 text-slate-500">{m.desc}</span></span>
                    </LLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="group relative">
              <button type="button" className={trigger(inInit)} aria-haspopup="true">{c.nav.initiatives} <Chevron /></button>
              <div className="invisible absolute left-0 top-full z-50 w-80 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="border border-brand-100 border-t-[3px] border-t-gold-500 bg-white p-2 shadow-lift">
                  {items.map((i) => <LLink key={i.key} to={i.path} className="block rounded-[3px] px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-800">{i.title}</LLink>)}
                </div>
              </div>
            </div>
            <NavLink to={`/${lang}/events`} className={link}>{c.nav.events}</NavLink>
            <NavLink to={`/${lang}/partners-investors`} className={link}>{c.nav.partners}</NavLink>
            <NavLink to={`/${lang}/contact`} className={link}>{c.nav.contact}</NavLink>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="xl:hidden"><LangSwitch /></div>
            <div className="hidden xl:block"><LangSwitch /></div>
            <LLink to="/business-connect" className="btn-primary btn-sm hidden whitespace-nowrap xl:inline-flex">{c.nav.connectCta}</LLink>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-[3px] border border-brand-800/30 xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? c.common.close : c.common.menu} onClick={() => setOpen(!open)}>
              <span className="relative block h-0.5 w-5 bg-brand-900 before:absolute before:-top-1.5 before:block before:h-0.5 before:w-5 before:bg-brand-900 after:absolute after:top-1.5 after:block after:h-0.5 after:w-5 after:bg-brand-900" style={open ? { background: 'transparent' } : undefined} />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="max-h-[calc(100vh-76px)] overflow-y-auto border-b border-brand-100 bg-white px-4 pb-8 pt-2 shadow-lift xl:hidden" aria-label="Mobile">
          {[['', c.nav.home], ['/about', c.nav.about]].map(([to, t]) => <LLink key={to} to={to} onClick={close} className="block border-b border-brand-100 py-3.5 font-display text-lg font-semibold text-brand-900">{t}</LLink>)}
          <p className="eyebrow mt-5 mb-1">{c.nav.marketplaceMenu}</p>
          {mk.map((m) => <LLink key={m.key} to={m.path} onClick={close} className="flex items-center gap-3 border-b border-brand-100 py-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-brand-800 text-gold-400"><Icon name={m.icon} className="h-5 w-5" /></span><span className="font-semibold text-slate-800">{m.title}</span></LLink>)}
          <p className="eyebrow mt-5 mb-1">{c.nav.initiatives}</p>
          {items.map((i) => <LLink key={i.key} to={i.path} onClick={close} className="block border-b border-brand-100 py-2.5 pl-1 text-slate-700">{i.title}</LLink>)}
          {[['/events', c.nav.events], ['/partners-investors', c.nav.partners], ['/contact', c.nav.contact]].map(([to, t]) => <LLink key={to} to={to} onClick={close} className="mt-1 block border-b border-brand-100 py-3.5 font-display text-lg font-semibold text-brand-900">{t}</LLink>)}
          <LLink to="/business-connect" onClick={close} className="btn-primary mt-6 w-full">{c.nav.connectCta}</LLink>
          <LLink to="/join-us" onClick={close} className="btn-outline mt-3 w-full">{c.nav.register}</LLink>
        </nav>
      )}
    </header>
  );
}
