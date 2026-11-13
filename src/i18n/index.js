import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.js';
import hi from './hi.js';

let saved = 'en';
try {
  const s = localStorage.getItem('fpc_lang');
  saved = s ? s : ((navigator.language || '').startsWith('hi') ? 'hi' : 'en');
} catch (e) { /* ignore */ }

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: saved === 'hi' ? 'hi' : 'en', fallbackLng: 'en', interpolation: { escapeValue: false },
});
export default i18n;
