import { useC, LLink } from '../i18n/hooks.jsx';
import { site, initiativeList, marketNav } from '../config/site.js';
import { Verify } from './ui.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const c = useC();
  const h = 'mb-4 font-display text-[15px] font-semibold tracking-wide text-gold-400';
  const a = 'text-sm text-white/75 transition hover:text-white';
  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-white/80">
      <div className="bg-lattice absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="h-[3px] bg-gradient-to-r from-brand-700 via-gold-500 to-brand-700" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">{c.footer.about}</p>
          <p className="mt-3 text-sm text-white/60">{c.footer.office}</p>
          <p className="mt-5 inline-block border border-gold-500/50 px-3 py-1.5 text-[11px] font-semibold tracking-[.14em] text-gold-400">CIN {site.cin}</p>
        </div>
        <div>
          <h3 className={h}>{c.nav.marketplaceMenu}</h3>
          <ul className="space-y-2.5">{marketNav.map((m) => <li key={m.key}><LLink to={m.path} className={a}>{c.nav[m.key]}</LLink></li>)}</ul>
        </div>
        <div>
          <h3 className={h}>{c.footer.initiatives}</h3>
          <ul className="space-y-2.5">{initiativeList.map((i) => <li key={i.key}><LLink to={i.path} className={a}>{c.initiatives[i.key].title}</LLink></li>)}</ul>
        </div>
        <div>
          <h3 className={h}>{c.footer.quick}</h3>
          <ul className="space-y-2.5">
            {[['', c.nav.home], ['/about', c.nav.about], ['/events', c.nav.events], ['/partners-investors', c.nav.partners], ['/join-us', c.nav.join], ['/contact', c.nav.contact], ['/privacy-policy', c.footer.privacy]].map(([to, t]) => <li key={to}><LLink to={to} className={a}>{t}</LLink></li>)}
          </ul>
        </div>
        <div>
          <h3 className={h}>{c.footer.contact}</h3>
          <Verify flag="contactDetails">
            <ul className="space-y-2.5 text-sm">
              {site.phones.map((p) => <li key={p.tel}><Verify flag={p.verify} inline><a href={`tel:${p.tel}`} className="hover:text-white hover:underline">{p.display}</a></Verify></li>)}
              <li><a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">{site.email}</a></li>
              <li>{site.website}</li>
            </ul>
          </Verify>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">© {new Date().getFullYear()} FPC Bazaar Federation. {c.footer.rights}</div>
    </footer>
  );
}
