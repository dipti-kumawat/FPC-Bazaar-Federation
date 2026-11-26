import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import Logo from './Logo.jsx';
import { LANGS, LANG_NAMES, LANG_SHORT, LANG_PREFIX } from '../i18n/langs.js';

const PAGES = [['/about', 'about'], ['/services', 'services'], ['/projects', 'projects'], ['/states-map', 'statesMap'], ['/fpo-registration', 'fpoReg'], ['/vendor-registration', 'vendorReg'], ['/gallery', 'gallery'], ['/career', 'career'], ['/contact', 'contact']];

function useGoLang() {
  const lang = useLang(); const nav = useNavigate(); const loc = useLocation();
  return (l) => { if (l !== lang) nav(`${loc.pathname.replace(LANG_PREFIX, `/${l}`)}${loc.search}${loc.hash}`); };
}

/** Header: one compact button (the bar has no room for four), with a menu of the four languages. */
function LangMenu() {
  const lang = useLang(); const c = useC(); const go = useGoLang();
  const [open, setOpen] = useState(false); const box = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const out = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') { setOpen(false); box.current?.querySelector('button')?.focus(); } };
    document.addEventListener('mousedown', out); document.addEventListener('touchstart', out); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', out); document.removeEventListener('touchstart', out); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="menu" aria-expanded={open} aria-label={`${c.common.switchLang}: ${LANG_NAMES[lang]}`}
        className="inline-flex items-center gap-1 rounded-full border border-brand-800/30 p-0.5 pr-2 text-[13px] font-bold text-brand-800 transition hover:bg-brand-50">
        <span lang={lang} className="min-w-[38px] rounded-full bg-gold-500 px-2.5 py-1 text-center text-brand-950 sm:min-w-[44px]">{LANG_SHORT[lang]}</span>
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}><path d="M5 8l5 5 5-5" /></svg>
      </button>
      {open && (
        <ul role="menu" aria-label={c.common.switchLang} className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-[3px] border border-brand-100 bg-white py-1 shadow-lift">
          {LANGS.map((l) => (
            <li key={l} role="none">
              <button type="button" role="menuitemradio" aria-checked={lang === l} lang={l} onClick={() => { setOpen(false); go(l); }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[15px] font-semibold transition ${lang === l ? 'bg-brand-50 text-brand-900' : 'text-slate-700 hover:bg-brand-50 hover:text-brand-900'}`}>
                {LANG_NAMES[l]}{lang === l && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-500" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Mobile menu: all four as buttons (there is room there). */
function LangPills() {
  const lang = useLang(); const c = useC(); const go = useGoLang();
  return (
    <div role="group" aria-label={c.common.switchLang} className="inline-flex overflow-hidden rounded-full border border-brand-800/30 p-0.5 text-[13px] font-bold">
      {LANGS.map((l) => (
        <button key={l} type="button" onClick={() => go(l)} aria-pressed={lang === l} lang={l} aria-label={LANG_NAMES[l]}
          className={`min-w-[40px] rounded-full px-2.5 py-1 transition ${lang === l ? 'bg-gold-500 text-brand-950' : 'text-brand-800 hover:bg-brand-50'}`}>{LANG_SHORT[l]}</button>
      ))}
    </div>
  );
}

export default function Header() {
  const c = useC(); const lang = useLang(); const loc = useLocation(); const [open, setOpen] = useState(false);
  const link = ({ isActive }) => `relative whitespace-nowrap px-[7px] py-2 text-[14px] font-semibold transition hover:text-brand-600 after:absolute after:inset-x-[7px] after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 ${isActive ? 'text-brand-900 after:scale-x-100' : 'text-slate-700 after:scale-x-0 hover:after:scale-x-100'}`;
  const close = () => setOpen(false);
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  // Mobile drawer: lock page scroll and close with Escape.
  useEffect(() => {
    if (!open) return undefined;
    const k = (e) => e.key === 'Escape' && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', k);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', k); };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 shadow-[0_1px_0_rgba(16,59,45,.08)]">
      <div className="border-b-2 border-gold-500/70 bg-paper/95 backdrop-blur">
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <LLink to="" aria-label="FPC Bazaar Federation" onClick={close}><Logo tagline="belowXl" /></LLink>
          <nav className="hidden items-center xl:flex" aria-label="Main">
            <NavLink end to={`/${lang}`} className={link}>{c.nav.home}</NavLink>
            {PAGES.map(([to, k]) => <NavLink key={to} to={`/${lang}${to}`} className={link}>{c.nav[k]}</NavLink>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangMenu />
            {/* Login: a text button while the menu is collapsed; on wide screens the nav is full, so the same square style as the menu button
                (the nav links use 7 px side padding so it fits beside them). */}
            <Link to="/admin" className="btn-outline hidden sm:inline-flex xl:hidden">{c.nav.login}</Link>
            <Link to="/admin" title={c.nav.login} aria-label={c.nav.login} className="hidden h-11 w-11 place-items-center rounded-[3px] border border-brand-800/30 text-brand-900 transition hover:bg-brand-50 xl:grid">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
            </Link>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-[3px] border border-brand-800/30 xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? c.common.close : c.common.menu} onClick={() => setOpen(!open)}>
              <span className="relative block h-0.5 w-5 bg-brand-900 before:absolute before:-top-1.5 before:block before:h-0.5 before:w-5 before:bg-brand-900 after:absolute after:top-1.5 after:block after:h-0.5 after:w-5 after:bg-brand-900" style={open ? { background: 'transparent' } : undefined} />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="absolute inset-0 bg-brand-950/55 backdrop-blur-[2px]" onClick={close} aria-hidden="true" />
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l-2 border-gold-500/70 bg-white shadow-lift"
            >
              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-brand-100 px-4">
                <LangPills />
                <button type="button" onClick={close} aria-label={c.common.close} className="grid h-11 w-11 place-items-center rounded-[3px] border border-brand-800/30 text-2xl leading-none text-brand-900">×</button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
                {[['', c.nav.home], ...PAGES.map(([to, k]) => [to, c.nav[k]])].map(([to, t], i) => (
                  <motion.div key={to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.035, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
                    <LLink to={to} onClick={close} className="block border-b border-brand-100 py-3.5 font-display text-lg font-semibold text-brand-900 transition hover:pl-1 hover:text-brand-600">{t}</LLink>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.35 }}>
                  <LLink to="/track-application" onClick={close} className="block border-b border-brand-100 py-3.5 font-display text-lg font-semibold text-brand-900 transition hover:pl-1 hover:text-brand-600">{c.nav.track}</LLink>
                  <Link to="/admin" onClick={close} className="btn-outline mt-6 w-full">{c.nav.login}</Link>
                  <LLink to="/business-connect" onClick={close} className="btn-primary mt-3 w-full">{c.nav.connectCta}</LLink>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
