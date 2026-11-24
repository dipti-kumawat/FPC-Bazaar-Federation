import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useC, useLang } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band } from '../components/ui.jsx';
import { API_MODE, trackApplication } from '../services/registry.js';

const BADGE = { verified: 'bg-emerald-100 text-emerald-800', pending: 'bg-amber-100 text-amber-900', rejected: 'bg-red-100 text-red-800' };

/** Public "Track your application": reference number + mobile number -> status (and the reason, if rejected). */
export default function TrackApplication() {
  useSeo('track');
  const c = useC(); const lang = useLang(); const t = c.track;
  const [params] = useSearchParams();
  const [reference, setReference] = useState(params.get('ref') || '');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [result, setResult] = useState(null);
  const day = (v) => (v ? new Date(v).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '');

  async function submit(e) {
    e.preventDefault(); setBusy(true); setError(''); setResult(null);
    try { setResult(await trackApplication(reference, phone)); }
    catch (err) { setError(err.response?.status === 404 ? t.notFound : err.response?.data?.message || c.formCommon.error); }
    finally { setBusy(false); }
  }

  return (
    <>
      <PageHero title={t.title} sub={t.sub} crumb={t.crumb} />
      <Band>
        <div className="mx-auto grid max-w-3xl gap-8">
          <form onSubmit={submit} className="rounded-sm border border-brand-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="track-ref" className="mb-1 block text-sm font-semibold text-slate-800">{t.reference}</label>
                <input id="track-ref" className="field" value={reference} onChange={(e) => setReference(e.target.value)} required maxLength={40} autoComplete="off" />
              </div>
              <div>
                <label htmlFor="track-phone" className="mb-1 block text-sm font-semibold text-slate-800">{t.phone}</label>
                <input id="track-phone" className="field" type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={20} autoComplete="tel" />
              </div>
            </div>
            {!API_MODE && <p className="mt-4 text-sm text-amber-800">{c.formCommon.demo}</p>}
            {error && <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
            <button type="submit" disabled={busy || !API_MODE} className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-60">{busy ? t.checking : t.check}</button>
          </form>

          {result && (
            <section role="status" className="rounded-sm border border-brand-200 bg-brand-50 p-6">
              <p className="text-sm text-slate-600">{t.kinds[result.kind] || result.kind}</p>
              <h2 className="mt-1 text-2xl font-extrabold text-brand-900">{result.name}</h2>
              <p className="mt-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${BADGE[result.status] || ''}`}>{result.status}</span></p>
              <p className="mt-3 font-semibold text-brand-800">{t[result.status]}</p>
              {result.reason && <p className="mt-2"><b className="text-red-700">{t.reason}:</b> {result.reason}</p>}
              <dl className="mt-4 grid gap-1 text-sm sm:grid-cols-[160px_1fr]">
                <dt className="font-bold text-brand-800">{t.submitted}</dt><dd>{day(result.submittedAt)}</dd>
                {result.decidedAt && <><dt className="font-bold text-brand-800">{t.decided}</dt><dd>{day(result.decidedAt)}</dd></>}
              </dl>
              <p className="mt-4 text-sm"><Link to="/admin" className="font-semibold text-brand-700 underline">{t.login}</Link></p>
            </section>
          )}
        </div>
      </Band>
    </>
  );
}
