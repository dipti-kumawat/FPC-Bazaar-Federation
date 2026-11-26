// Site text per language. English is part of the main bundle (and is the fallback);
// the other languages are separate files, downloaded only when a visitor uses that language.
import en from './en.js';

const loaded = { en };
const failed = {};
const pending = {};
const LOADERS = { hi: () => import('./hi.js'), mr: () => import('./mr.js'), gu: () => import('./gu.js') };

let version = 0; const subs = new Set();
export const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
export const snapshot = () => version;
const changed = () => { version += 1; subs.forEach((f) => f()); };

/** Starts downloading a language (once). If it cannot be downloaded the site stays in English. */
export function loadLang(lang) {
  if (loaded[lang] || failed[lang] || !LOADERS[lang]) return Promise.resolve();
  if (!pending[lang]) {
    pending[lang] = LOADERS[lang]()
      .then((m) => { loaded[lang] = m.default; })
      .catch(() => { failed[lang] = true; delete pending[lang]; })
      .finally(changed);
  }
  return pending[lang];
}
export const isReady = (lang) => !!loaded[lang] || !!failed[lang] || !LOADERS[lang];
export const textFor = (lang) => loaded[lang] || en;
