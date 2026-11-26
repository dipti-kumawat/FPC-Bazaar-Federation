import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useC, useLang } from '../i18n/hooks.jsx';
import { LANGS, LANG_PREFIX, LOCALES } from '../i18n/langs.js';

function upsert(selector, make, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) { el = make(); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}
const meta = (attr, name) => () => { const m = document.createElement('meta'); m.setAttribute(attr, name); return m; };
const link = (rel) => () => { const k = document.createElement('link'); k.rel = rel; return k; };

/** Sets title, description, canonical and hreflang for the current page and language. */
export function useSeo(key) {
  const c = useC();
  const lang = useLang();
  const { pathname } = useLocation();
  useEffect(() => {
    const s = c.seo[key] || c.seo.home;
    document.title = `${s.t} | FPC Bazaar Federation`;
    upsert('meta[name="description"]', meta('name', 'description'), { content: s.d });
    upsert('meta[property="og:title"]', meta('property', 'og:title'), { content: s.t });
    upsert('meta[property="og:description"]', meta('property', 'og:description'), { content: s.d });
    const rest = pathname.replace(LANG_PREFIX, '');
    const origin = window.location.origin;
    LANGS.forEach((l) => upsert(`link[hreflang="${l}"]`, link('alternate'), { hreflang: l, href: `${origin}/${l}${rest}` }));
    upsert('link[hreflang="x-default"]', link('alternate'), { hreflang: 'x-default', href: `${origin}/en${rest}` });
    upsert('meta[property="og:locale"]', meta('property', 'og:locale'), { content: LOCALES[lang].replace('-', '_') });
    upsert('link[rel="canonical"]', link('canonical'), { href: `${origin}/${lang}${rest}` });
  }, [key, lang, c, pathname]);
}
