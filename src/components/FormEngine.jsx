import { useRef, useState } from 'react';
import { FORMS, EXTRA_LABELS } from '../config/forms.js';
import { submitForm } from '../services/formService.js';
import { API_MODE } from '../services/registry.js';
import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { STATES, CATEGORIES } from '../data/marketplace.js';

const MAX_MB = 5; const OK_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const optionsFor = (o, c, lang) => (o === 'states' ? Object.entries(STATES).map(([k, v]) => [k, v[lang] || v.en]).sort((a, b) => a[1].localeCompare(b[1]))
  : o === 'productCats' ? CATEGORIES.map((x) => [x.id, x.name[lang] || x.name.en]) : o === 'ngoType' ? [['trust', lang === 'hi' ? 'ट्रस्ट' : 'Trust'], ['society', lang === 'hi' ? 'सोसायटी' : 'Society'], ['section8', lang === 'hi' ? 'धारा 8 कंपनी' : 'Section 8 company']] : c.options[o]);

const phoneRe = /^[6-9]\d{9}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// FPO and vendor applicants may choose their own password with the form (only when the backend is connected).
const LOGIN_FORMS = ['fpo', 'vendor'];
const passwordOk = (p) => p.length >= 10 && /[A-Za-z\u0900-\u097F]/.test(p) && /\d/.test(p) && new TextEncoder().encode(p).length <= 72;

function check(f, raw, c) {
  if (f.t === 'file') {
    if (!raw) return f.r ? c.required : '';
    if (!OK_TYPES.includes(raw.type)) return c.fileType;
    if (raw.size > MAX_MB * 1024 * 1024) return c.fileBig.replace('{n}', MAX_MB);
    return '';
  }
  const v = (raw ?? '').toString().trim();
  if (f.r && !v) return c.required;
  if (!v) return '';
  if (f.t === 'tel' && !phoneRe.test(v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''))) return c.phone;
  if (f.t === 'email' && !emailRe.test(v)) return c.email;
  if (f.t === 'number') {
    const n = Number(v);
    if (Number.isNaN(n) || n < (f.min ?? 0) || n > (f.max ?? Infinity)) return c.range.replace('{min}', f.min ?? 0).replace('{max}', f.max ?? '');
  }
  return '';
}

/** Schema-driven form: validation, consent, honeypot + time-trap spam protection, API submit. */
export default function FormEngine({ formKey, title, initial }) {
  const c = useC();
  const lang = useLang();
  const fields = FORMS[formKey];
  const fc = c.formCommon;
  const [values, setValues] = useState(initial || {});
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');
  const [demo, setDemo] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [reference, setReference] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const canLogin = API_MODE && LOGIN_FORMS.includes(formKey);
  const [wantLogin, setWantLogin] = useState(false);
  const [pw, setPw] = useState(''); const [pw2, setPw2] = useState('');
  const opened = useRef(Date.now());
  const honey = useRef('');

  const set = (n, v) => { setValues((o) => ({ ...o, [n]: v })); if (errors[n]) setErrors((e) => ({ ...e, [n]: '' })); };

  async function onSubmit(e) {
    e.preventDefault();
    const errs = {};
    fields.forEach((f) => { const m = check(f, values[f.n], fc); if (m) errs[f.n] = m; });
    if (!consent) errs._consent = fc.consentReq;
    if (canLogin && wantLogin) {
      if (!passwordOk(pw)) errs.password = fc.passwordRule;
      else if (pw !== pw2) errs.passwordConfirm = fc.passwordMatch;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector(`#${formKey}-form [aria-invalid="true"], #${formKey}-form [data-err="1"]`);
      first?.focus?.();
      return;
    }
    // Spam protection: bots fill the hidden field or submit instantly. Pretend success, send nothing.
    if (honey.current) { setStatus('ok'); return; }
    setServerMessage(''); setStatus('sending');
    try {
      const extra = canLogin && wantLogin ? { password: pw, passwordConfirm: pw2 } : {};
      const res = await submitForm(formKey, { ...values, ...extra, lang, consent: true, page: window.location.pathname });
      setDemo(!!res?.demo); setReference(res?.id || ''); setLoginResult(res?.login || ''); setPw(''); setPw2('');
      setStatus('ok');
    } catch (err) { setErrors(err.response?.data?.errors || {}); setServerMessage(err.response?.data?.message || fc.error); setStatus('error'); }
  }

  if (status === 'ok') {
    return (
      <div role="status" className="rounded-sm border border-brand-200 bg-brand-50 p-6">
        <p className="text-lg font-bold text-brand-800">{fc.success}</p>
        {reference && <p className="mt-2 text-sm">{fc.reference}: <b className="select-all">{reference}</b></p>}
        {reference && <p className="mt-1 text-sm"><LLink to={`/track-application?ref=${reference}`} className="font-semibold text-brand-700 underline">{fc.trackLink}</LLink></p>}
        {loginResult === 'confirm_email' && <p className="mt-3 text-sm font-semibold text-brand-800">{fc.loginConfirm}</p>}
        {loginResult === 'after_verification' && <p className="mt-3 text-sm text-slate-700">{fc.loginLater}</p>}
        {demo && <p className="mt-2 text-sm text-amber-800">{fc.demo}</p>}
        <button type="button" className="btn-outline mt-4" onClick={() => { setValues(initial || {}); setConsent(false); setStatus('idle'); setReference(''); setLoginResult(''); setWantLogin(false); opened.current = Date.now(); }}>{fc.again}</button>
      </div>
    );
  }

  return (
    <form id={`${formKey}-form`} onSubmit={onSubmit} noValidate className="rounded-sm border border-brand-100 bg-white p-5 shadow-sm sm:p-7">
      {title && <h3 className="mb-5 text-xl font-extrabold text-brand-900">{title}</h3>}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${formKey}-${f.n}`;
          const label = c.fieldLabels[f.n] || EXTRA_LABELS[f.n]?.[lang === 'hi' ? 1 : 0] || f.n;
          const err = errors[f.n];
          const common = { id, name: f.n, value: f.t === 'file' ? undefined : values[f.n] ?? '', onChange: (e) => set(f.n, e.target.value), 'aria-invalid': err ? 'true' : undefined, 'aria-describedby': err ? `${id}-e` : undefined, className: `field ${err ? 'field-err' : ''}` };
          return (
            <div key={f.n} className={f.t === 'textarea' ? 'sm:col-span-2' : ''}>
              <label htmlFor={id} className="mb-1 block text-sm font-semibold text-slate-800">{label}{!f.r && <span className="ml-1 font-normal text-slate-500">{fc.optional}</span>}</label>
              {f.t === 'textarea' ? <textarea rows={4} {...common} />
                : f.t === 'file' ? (
                  <div><input id={id} name={f.n} type="file" accept=".pdf,.jpg,.jpeg,.png" aria-invalid={err ? 'true' : undefined} onChange={(e) => set(f.n, e.target.files?.[0] || null)} className={`field file:mr-3 file:rounded file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-800 ${err ? 'field-err' : ''}`} /><p className="mt-1 text-xs text-slate-500">{fc.fileHint.replace('{n}', MAX_MB)}</p></div>
                ) : f.t === 'select' ? (
                  <select {...common}><option value="">{fc.select}</option>{optionsFor(f.o, c, lang).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                ) : <input type={f.t} inputMode={f.t === 'tel' || f.t === 'number' ? 'numeric' : undefined} autoComplete={f.n === 'name' ? 'name' : f.n === 'phone' ? 'tel' : f.n === 'email' ? 'email' : undefined} {...common} />}
              {err && <p id={`${id}-e`} className="mt-1 text-sm font-medium text-red-600">{err}</p>}
            </div>
          );
        })}
      </div>
      {canLogin && (
        <div className="mt-5 rounded-sm border border-brand-100 bg-brand-50/50 p-4">
          <label className="flex items-start gap-3 text-sm font-semibold text-slate-800">
            <input type="checkbox" checked={wantLogin} onChange={(e) => { setWantLogin(e.target.checked); setErrors((o) => ({ ...o, password: '', passwordConfirm: '' })); }} className="mt-0.5 h-5 w-5 shrink-0 accent-brand-600" />
            <span>{fc.createLogin}</span>
          </label>
          {wantLogin && (
            <>
              <p className="mt-2 text-sm text-slate-600">{fc.createLoginHint}</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formKey}-password`} className="mb-1 block text-sm font-semibold text-slate-800">{fc.password}</label>
                  <input id={`${formKey}-password`} type="password" autoComplete="new-password" maxLength={72} value={pw} onChange={(e) => { setPw(e.target.value); setErrors((o) => ({ ...o, password: '' })); }} aria-invalid={errors.password ? 'true' : undefined} className={`field ${errors.password ? 'field-err' : ''}`} />
                  <p className="mt-1 text-xs text-slate-500">{fc.passwordRule}</p>
                  {errors.password && <p className="mt-1 text-sm font-medium text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor={`${formKey}-password2`} className="mb-1 block text-sm font-semibold text-slate-800">{fc.passwordConfirm}</label>
                  <input id={`${formKey}-password2`} type="password" autoComplete="new-password" maxLength={72} value={pw2} onChange={(e) => { setPw2(e.target.value); setErrors((o) => ({ ...o, passwordConfirm: '' })); }} aria-invalid={errors.passwordConfirm ? 'true' : undefined} className={`field ${errors.passwordConfirm ? 'field-err' : ''}`} />
                  {errors.passwordConfirm && <p className="mt-1 text-sm font-medium text-red-600">{errors.passwordConfirm}</p>}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {/* Honeypot: invisible to people, bots fill it. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" onChange={(e) => { honey.current = e.target.value; }} /></label>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" checked={consent} data-err={errors._consent ? '1' : undefined} onChange={(e) => { setConsent(e.target.checked); setErrors((o) => ({ ...o, _consent: '' })); }} className="mt-1 h-5 w-5 shrink-0 accent-brand-600" />
        <span>{fc.consent} <LLink to="/privacy-policy" className="font-semibold text-brand-700 underline">{fc.privacyLink}</LLink></span>
      </label>
      {errors._consent && <p className="mt-1 text-sm font-medium text-red-600">{errors._consent}</p>}
      {status === 'error' && <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{serverMessage || fc.error}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-60">{status === 'sending' ? fc.sending : fc.submit}</button>
    </form>
  );
}