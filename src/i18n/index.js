import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGS, isLang } from './langs.js';
import { loadLang } from './content.js';

// i18next only keeps the current language; the text itself comes from content.js (useC).
// First visit: the browser's language if the site has it, else English. Later visits: the last language used.
let saved = 'en';
try {
  const s = localStorage.getItem('fpc_lang');
  const browser = (navigator.language || '').slice(0, 2);
  saved = isLang(s) ? s : (LANGS.includes(browser) ? browser : 'en');
} catch (e) { /* ignore */ }

// The URL decides the language; start downloading it now so the first page waits as little as possible.
const fromUrl = (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : '');
loadLang(isLang(fromUrl) ? fromUrl : saved);

i18n.use(initReactI18next).init({ resources: {}, lng: saved, fallbackLng: 'en', interpolation: { escapeValue: false } });
export default i18n;
