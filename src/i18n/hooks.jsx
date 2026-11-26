import { useEffect, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isLang, pick } from './langs.js';
import { subscribe, snapshot, loadLang, isReady, textFor } from './content.js';

export function useLang() { const { i18n } = useTranslation(); return isLang(i18n.language) ? i18n.language : 'en'; }
/** Text of the current language (English until that language's file has arrived). */
export function useC() { useSyncExternalStore(subscribe, snapshot); return textFor(useLang()); }
/** True once the language's text is available; starts the download if needed. */
export function useLangReady(lang) {
  useSyncExternalStore(subscribe, snapshot);
  useEffect(() => { loadLang(lang); }, [lang]);
  return isReady(lang);
}
/** Link that keeps the current language prefix: <LLink to="/about" /> */
export function LLink({ to = '', ...props }) { const lang = useLang(); return <Link to={`/${lang}${to}`} {...props} />; }
/** Picks the current-language string from a multilingual { en, hi, mr, gu } object (used by marketplace data). */
export function useT() { const lang = useLang(); return (o) => (o ? pick(o, lang) : ''); }
