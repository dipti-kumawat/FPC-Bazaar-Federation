import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import en from './en.js';
import hi from './hi.js';

const content = { en, hi };
export function useLang() { const { i18n } = useTranslation(); return i18n.language === 'hi' ? 'hi' : 'en'; }
export function useC() { return content[useLang()]; }
/** Link that keeps the current language prefix: <LLink to="/about" /> */
export function LLink({ to = '', ...props }) { const lang = useLang(); return <Link to={`/${lang}${to}`} {...props} />; }
/** Picks the current-language string from a bilingual { en, hi } object (used by marketplace data). */
export function useT() { const lang = useLang(); return (o) => (o ? o[lang] ?? o.en : ''); }
