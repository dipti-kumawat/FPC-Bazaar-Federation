// Checks that every translation file has exactly the structure of en.js:
// same keys, same list lengths, the same {placeholders}, and untranslated fields (links, codes) unchanged.
// Run: node scripts/check-i18n.mjs
import en from '../src/i18n/en.js';
import hi from '../src/i18n/hi.js';
import mr from '../src/i18n/mr.js';
import gu from '../src/i18n/gu.js';

const KEEP = new Set(['path', 'verify', 'v']); // values that are links, flags or figures, not text
const holes = (s) => (s.match(/\{[a-z]+\}/gi) || []).sort().join(',');
let problems = 0; const same = [];
const bad = (lang, p, m) => { problems++; console.log(`${lang}: ${p}: ${m}`); };

function walk(a, b, p, lang, key) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return bad(lang, p, 'should be a list');
    if (a.length !== b.length) bad(lang, p, `list has ${b.length} items, English has ${a.length}`);
    // option lists: [code, label] pairs keep their code
    a.forEach((x, i) => {
      if (Array.isArray(x) && x.length === 2 && p.startsWith('options') && b[i]?.[0] !== x[0]) bad(lang, `${p}[${i}]`, `option code changed: ${b[i]?.[0]}`);
      walk(x, b[i], `${p}[${i}]`, lang, key);
    });
    return;
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object' || Array.isArray(b)) return bad(lang, p, 'should be an object');
    for (const k of Object.keys(a)) if (!(k in b)) bad(lang, `${p}.${k}`, 'missing');
    for (const k of Object.keys(b)) if (!(k in a)) bad(lang, `${p}.${k}`, 'extra key');
    for (const k of Object.keys(a)) if (k in b) walk(a[k], b[k], p ? `${p}.${k}` : k, lang, k);
    return;
  }
  if (typeof a !== typeof b) return bad(lang, p, `type ${typeof b}, English ${typeof a}`);
  if (typeof a !== 'string') return;
  if (!b.trim() && a.trim()) bad(lang, p, 'empty');
  if (holes(a) !== holes(b)) bad(lang, p, `placeholders ${holes(b) || 'none'}, English ${holes(a)}`);
  if (KEEP.has(key) && key !== 'v' && a !== b) bad(lang, p, `must stay "${a}"`);
  const code = /^options\..*\]\[0\]$/.test(p) || a.includes('@'); // option codes and email addresses stay as they are
  if (a === b && /[a-z]{4,}/.test(a) && !KEEP.has(key) && !code) same.push(`${lang}: ${p}: "${a.slice(0, 60)}"`);
}

for (const [lang, t] of Object.entries({ hi, mr, gu })) walk(en, t, '', lang, '');
if (same.length) console.log(`\nSame as English (check these are meant to stay in English):\n${same.join('\n')}`);
console.log(problems ? `\n${problems} problem(s).` : '\nAll translation files match en.js.');
process.exit(problems ? 1 : 0);
