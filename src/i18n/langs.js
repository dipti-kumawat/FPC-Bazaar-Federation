// The site's languages. To add one: a translation file next to en.js with the same keys, an entry here,
// and the language's fields ({ en, hi, mr, gu }) in src/data and the pages that keep their own text.
export const LANGS = ['en', 'hi', 'mr', 'gu'];

/** Name of each language in its own script (language menu). */
export const LANG_NAMES = { en: 'English', hi: 'हिन्दी', mr: 'मराठी', gu: 'ગુજરાતી' };
/** Short label shown on the language button. */
export const LANG_SHORT = { en: 'EN', hi: 'हिं', mr: 'मरा', gu: 'ગુ' };
/** Locale for dates, numbers and sorting. */
export const LOCALES = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', gu: 'gu-IN' };

export const isLang = (l) => LANGS.includes(l);
/** Matches the language prefix of a path: /hi/about -> "/hi". */
export const LANG_PREFIX = new RegExp(`^/(${LANGS.join('|')})(?=/|$)`);

/** Picks the current-language value from a { en, hi, mr, gu } object; falls back to English. */
export const pick = (o, lang) => (o && typeof o === 'object' && !Array.isArray(o) ? (o[lang] ?? o.en) : o ?? '');
