import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import { STATES, CATEGORIES } from '../data/marketplace.js';
import { Check } from '../components/Icons.jsx';
import { API_MODE, listRegistrations, downloadDocument, useRegistryTick, fileUrl } from '../services/registry.js';
import { message } from './Management.jsx';

// "My account" for vendor and FPO logins: only their own registration, its status and what they can do next.
// Rules (docs/ADMIN_API.md): vendor / FPO see only their own record and status; they cannot verify or edit.

const KIND = { fpo: 'FPO', vendor: 'Company / Vendor' };
const FILE_LABEL = { certificate: 'Certificate', pan: 'PAN card', boardResolution: 'Board resolution', logo: 'Logo' };
const FIELDS = {
  fpo: [['cin', 'CIN'], ['district', 'District'], ['kisanCount', 'Number of farmers'], ['odop', 'ODOP product'], ['contact', 'Contact person'], ['phone', 'Phone'], ['email', 'Email']],
  vendor: [['gst', 'GST'], ['turnover', 'Turnover'], ['productCategory', 'Product category'], ['supplyState', 'Supplies to'], ['district', 'District'], ['contact', 'Contact person'], ['phone', 'Phone'], ['email', 'Email']],
};
const stateName = (k) => STATES[k]?.en || k || '-';
const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const show = (k, v) => (k === 'productCategory' ? CATEGORIES.find((c) => c.id === v)?.name.en || v : k === 'supplyState' ? stateName(v) : v);
const lines = (v) => String(v || '').split('\n').map((x) => x.trim()).filter(Boolean);

function Card({ title, children, className = '' }) {
  return <section className={`bg-white p-5 shadow-card sm:p-6 ${className}`}>{title && <h2 className="mb-4 font-display text-lg font-semibold text-brand-900">{title}</h2>}{children}</section>;
}

const STATUS = {
  pending: { label: 'Under review', pill: 'bg-amber-100 text-amber-900', box: 'border-amber-400 bg-amber-50' },
  verified: { label: 'Verified', pill: 'bg-emerald-100 text-emerald-800', box: 'border-emerald-500 bg-emerald-50' },
  rejected: { label: 'Not approved', pill: 'bg-red-100 text-red-800', box: 'border-red-500 bg-red-50' },
};

function Steps({ r }) {
  const done = r.status !== 'pending';
  const last = r.status === 'rejected' ? 'Not approved' : 'Verified';
  const steps = [['Submitted', fmt(r.createdAt), true], ['Review by the federation', done ? 'Done' : 'In progress', done], [last, done ? fmt(r.decidedAt) : 'Waiting', done]];
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {steps.map(([t, d, ok], i) => {
        const current = !ok && i === 1;
        const bad = ok && i === 2 && r.status === 'rejected';
        const dot = bad ? 'bg-red-600 text-white' : ok ? 'bg-brand-800 text-white' : current ? 'border-2 border-amber-500 bg-white text-amber-700' : 'border-2 border-brand-100 bg-white text-slate-400';
        return (
          <li key={t} className="flex items-center gap-3 sm:flex-col sm:items-start">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${dot}`}>{bad ? '×' : ok ? <Check className="h-4 w-4" /> : i + 1}</span>
            <span><b className="block text-sm text-brand-900">{t}</b><span className="text-xs text-slate-500">{d}</span></span>
          </li>
        );
      })}
    </ol>
  );
}

function Help() {
  const phone = site.phones[0];
  return (
    <Card title="Need help?">
      <p className="text-sm text-slate-600">Talk to the federation team about your application.</p>
      <ul className="mt-4 space-y-2 text-sm">
        <li><a href={`tel:${phone.tel}`} className="font-semibold text-brand-700 underline">Call {phone.display}</a></li>
        <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 underline">WhatsApp</a></li>
        <li><a href={`mailto:${site.email}`} className="break-all font-semibold text-brand-700 underline">{site.email}</a></li>
      </ul>
    </Card>
  );
}

export default function MyAccount({ s }) {
  const tick = useRegistryTick();
  const [r, setR] = useState(undefined); const [err, setErr] = useState(''); const [docErr, setDocErr] = useState(''); const [copied, setCopied] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  useEffect(() => { let on = true; setErr(''); listRegistrations({}).then((rows) => on && setR(rows.find((x) => x.id === s.own) || rows[0] || null)).catch((e) => on && setErr(message(e))); return () => { on = false; }; }, [tick, s.own]);

  if (err) return <p role="alert" className="text-red-700">{err}</p>;
  if (r === undefined) return <p>Loading…</p>;
  if (!r) return <div className="mx-auto max-w-xl"><Card title="No application found"><p className="text-sm text-slate-600">This login is not linked to an application. Please contact the federation.</p></Card><div className="mt-6"><Help /></div></div>;

  const st = STATUS[r.status] || STATUS.pending;
  const isVendor = r.kind === 'vendor';
  const data = r.data || {};
  const files = Object.entries(r.files || {}).filter(([, v]) => v);
  const copy = async () => { try { await navigator.clipboard.writeText(r.id); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) { /* clipboard blocked: the number is on screen */ } };
  const logoSrc = API_MODE && r.files?.logo ? fileUrl(r.id, 'logo') : '';
  const profileItems = [['Logo', !!r.files?.logo], ['About the company', !!data.about], ['Product list', lines(data.productList).length > 0], ['Past work', lines(data.pastWork).length > 0], ['Certificate', !!r.files?.certificate], ['Contact person', !!data.contact]];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Who and where it stands */}
      <section className="flex flex-col gap-5 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:p-6">
        {isVendor && logoSrc && logoOk
          ? <img src={logoSrc} alt="" onError={() => setLogoOk(false)} className="h-16 w-16 shrink-0 rounded border border-brand-100 object-contain" />
          : <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded bg-brand-800 font-display text-2xl font-semibold text-paper">{(r.name || '?').trim().charAt(0).toUpperCase()}</span>}
        <div className="min-w-0 flex-1">
          <p className="eyebrow">{KIND[r.kind] || r.kind}</p>
          <h1 className="mt-1 break-words font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{r.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{[data.district, stateName(r.state)].filter(Boolean).join(', ')}</p>
        </div>
        <div className="sm:text-right">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold ${st.pill}`}>{r.status === 'verified' && <Check className="h-4 w-4" />}{st.label}</span>
          <p className="mt-2 text-xs text-slate-500">Reference no.</p>
          <p className="flex items-center gap-2 sm:justify-end"><code className="break-all text-sm font-semibold text-brand-900">{r.id}</code>
            <button type="button" onClick={copy} className="text-xs font-semibold text-brand-700 underline">{copied ? 'Copied' : 'Copy'}</button></p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* What it means and what to do */}
          <section className={`border-l-4 p-5 sm:p-6 ${st.box}`}>
            {r.status === 'pending' && <>
              <h2 className="font-display text-xl font-semibold text-brand-900">Your application is under review</h2>
              <p className="mt-2 text-sm text-slate-700">The federation team is checking your details and documents. You will get an email as soon as a decision is made. You do not need to do anything now.</p>
              {isVendor && <p className="mt-2 text-sm text-slate-700">Once verified, your company gets a public profile page with a green tick in the Supplier Directory.</p>}
            </>}
            {r.status === 'verified' && <>
              <h2 className="font-display text-xl font-semibold text-emerald-900">{isVendor ? 'Your company is verified' : 'Your FPO is verified'}{fmt(r.decidedAt) && <span className="font-sans text-sm font-normal text-slate-600"> · {fmt(r.decidedAt)}</span>}</h2>
              {isVendor ? <>
                <p className="mt-2 text-sm text-slate-700">Your public profile is live with a green tick. Buyers, FPOs and farmers can find you in the Supplier Directory.</p>
                {r.slug && <div className="mt-4 flex flex-wrap gap-3"><a href={`/en/vendor/${r.slug}`} target="_blank" rel="noreferrer" className="btn-primary">View my public profile</a><a href="/en/suppliers" target="_blank" rel="noreferrer" className="btn-outline">Supplier Directory</a></div>}
              </> : <p className="mt-2 text-sm text-slate-700">Your FPO is a verified member of the FPC Bazaar Federation network. Contact the federation team for business linkage and project support.</p>}
            </>}
            {r.status === 'rejected' && <>
              <h2 className="font-display text-xl font-semibold text-red-900">Your application was not approved{fmt(r.decidedAt) && <span className="font-sans text-sm font-normal text-slate-600"> · {fmt(r.decidedAt)}</span>}</h2>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-red-800">Reason</p>
              <p className="mt-1 whitespace-pre-line rounded bg-white p-3 text-sm text-slate-800">{r.reason || 'No reason was recorded. Please contact the federation.'}</p>
              <p className="mt-3 text-sm text-slate-700"><b>What to do:</b> send the corrected details or documents to the federation team (contact on this page). They can reopen this application, so you do not need to register again.</p>
            </>}
            <div className="mt-6 border-t border-black/5 pt-5"><Steps r={r} /></div>
          </section>

          {isVendor && (
            <Card title="Your public profile">
              <p className="-mt-2 mb-4 text-sm text-slate-600">{r.status === 'verified' ? 'These details are shown on your public page.' : 'These details will be shown on your public page after verification.'}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {profileItems.map(([label, ok]) => (
                  <li key={label} className="flex items-center gap-2.5 rounded border border-brand-100 px-3 py-2.5 text-sm">
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-bold ${ok ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{ok ? <Check className="h-3 w-3" /> : '–'}</span>
                    <span className={ok ? 'font-semibold text-brand-900' : 'text-slate-500'}>{label}{!ok && <span className="text-xs"> · not added</span>}</span>
                  </li>
                ))}
              </ul>
              {profileItems.some(([, ok]) => !ok) && <p className="mt-4 text-xs text-slate-500">A complete profile gets more enquiries. To add or change something, contact the federation team.</p>}
              {(lines(data.productList).length > 0 || data.about) && (
                <dl className="mt-5 space-y-4 border-t border-brand-100 pt-5 text-sm">
                  {data.about && <div><dt className="font-semibold text-slate-500">About</dt><dd className="mt-1 whitespace-pre-line text-slate-800">{data.about}</dd></div>}
                  {lines(data.productList).length > 0 && <div><dt className="font-semibold text-slate-500">Products</dt><dd className="mt-2 flex flex-wrap gap-2">{lines(data.productList).map((p) => <span key={p} className="rounded-full bg-brand-50 px-3 py-1 text-brand-900">{p}</span>)}</dd></div>}
                  {lines(data.pastWork).length > 0 && <div><dt className="font-semibold text-slate-500">Past work</dt><dd className="mt-1"><ul className="list-disc space-y-1 pl-5 text-slate-800">{lines(data.pastWork).map((p) => <li key={p}>{p}</li>)}</ul></dd></div>}
                </dl>
              )}
            </Card>
          )}

          <Card title="Your details">
            <dl className="grid gap-x-6 text-sm sm:grid-cols-2">
              <div className="border-b border-brand-100 py-2.5"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">State</dt><dd className="mt-0.5 text-slate-900">{stateName(r.state)}</dd></div>
              {(FIELDS[r.kind] || []).filter(([k]) => data[k]).map(([k, label]) => (
                <div key={k} className="border-b border-brand-100 py-2.5"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-0.5 break-words text-slate-900">{show(k, data[k])}</dd></div>
              ))}
            </dl>
          </Card>

          <Card title="Your documents">
            {files.length ? <ul className="space-y-2">{files.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-3 rounded border border-brand-100 p-3 text-sm">
                <span className="min-w-0"><b className="text-brand-900">{FILE_LABEL[k] || k}</b><span className="block truncate text-xs text-slate-500">{v}</span></span>
                {API_MODE ? <button type="button" onClick={() => { setDocErr(''); downloadDocument(r.id, k, v).catch((e) => setDocErr(message(e))); }} className="shrink-0 font-semibold text-brand-700 underline">Download</button> : <span className="text-xs text-slate-400">demo</span>}
              </li>))}</ul> : <p className="text-sm text-slate-500">No documents uploaded.</p>}
            {docErr && <p role="alert" className="mt-2 text-sm text-red-700">{docErr}</p>}
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Your login">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Username</p>
            <p className="mt-0.5 break-all text-sm font-semibold text-slate-900">{s.username || data.email || '-'}</p>
            {API_MODE && <Link to="/admin/password" className="btn-outline mt-4 w-full">Change password</Link>}
          </Card>
          <Help />
        </aside>
      </div>
    </div>
  );
}
