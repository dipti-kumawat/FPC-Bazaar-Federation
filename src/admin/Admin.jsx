import { useEffect, useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, NavLink, Navigate, Link, useNavigate } from 'react-router-dom';
import { draftMode } from '../config/site.js';
import { STATES, CATEGORIES } from '../data/marketplace.js';
import Logo from '../components/Logo.jsx';
import { Check } from '../components/Icons.jsx';
import { API_MODE, ROLES, KINDS, STATUSES, DEMO_USERS, getSession, login, logout, listRegistrations, decide, downloadDocument, resetDemo, useRegistryTick, api, refreshSession, forgotPassword, downloadExport } from '../services/registry.js';

import { Users, Enquiries, Notifications, Audit, ChangePassword, message } from './Management.jsx';

// Admin panel. English only (staff tool). Not indexed. Roles and rules: src/services/registry.js and docs/ADMIN_API.md

const KIND_LABEL = { fpo: 'FPO', vendor: 'Company / Vendor', ngo: 'NGO', projecthead: 'Project Head', member: 'Member', job: 'Job applicant' };
const FILE_LABEL = { certificate: 'Certificate', pan: 'PAN', boardResolution: 'Board resolution', logo: 'Logo', feeSlip: 'Fee slip', resume: 'Resume' };
const DATA_LABEL = { district: 'District', cin: 'CIN', kisanCount: 'Kisan count', odop: 'ODOP', contact: 'Contact person', phone: 'Phone', email: 'Email', gst: 'GST', turnover: 'Turnover', productCategory: 'Product category', supplyState: 'Supply state',
  about: 'About', productList: 'Product list', pastWork: 'Past work', experience: 'Experience', projectType: 'Project type', organisation: 'Organisation', position: 'Position', location: 'Location', qualification: 'Qualification', message: 'Message' };
const stateName = (k) => STATES[k]?.en || k || '-';
const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-');
const show = (k, v) => (k === 'productCategory' ? CATEGORIES.find((c) => c.id === v)?.name.en || v : k === 'supplyState' ? stateName(v) : v);

function Badge({ status }) {
  const m = { verified: 'bg-emerald-100 text-emerald-800', pending: 'bg-amber-100 text-amber-900', rejected: 'bg-red-100 text-red-800' }[status];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${m}`}>{status === 'verified' && <Check className="h-3 w-3" />}{status}</span>;
}

function useRows(filters) {
  const tick = useRegistryTick();
  const [rows, setRows] = useState(null); const [err, setErr] = useState('');
  const key = JSON.stringify(filters);
  useEffect(() => { let on = true; setErr(''); listRegistrations(filters).then((r) => on && setRows(r)).catch((e) => on && setErr(e.message || 'Could not load')); return () => { on = false; }; }, [key, tick]); // eslint-disable-line
  return { rows, err };
}

/* ---------- Login ---------- */
function Login({ onDone }) {
  const [u, setU] = useState(''); const [p, setP] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const demoOk = draftMode && !API_MODE;
  const [forgot, setForgot] = useState(false), [notice, setNotice] = useState('');
  async function go(e) { e.preventDefault(); setBusy(true); setErr(''); try { if (forgot) { const r = await forgotPassword(u); setNotice(r.message); } else { await login(u, p); onDone(); } } catch (x) { setErr(x.response?.data?.message || x.message || 'Login failed'); } setBusy(false); }
  return (
    <div className="grid min-h-screen place-items-center bg-brand-950 bg-lattice p-4">
      <div className="w-full max-w-md border-t-4 border-gold-500 bg-paper p-7 shadow-lift">
        <Link to="/en" aria-label="Back to site"><Logo /></Link>
        <h1 className="mt-6 font-display text-2xl font-semibold text-brand-900">{forgot ? 'Reset your password' : 'Admin sign in'}</h1>
        <p className="mt-1 text-sm text-slate-600">Admin &gt; State Head &gt; Project Head &gt; Vendor &gt; FPO</p>
        {!API_MODE && !draftMode ? (
          <p className="mt-6 border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800">The admin panel needs the backend. Set VITE_API_URL and deploy the admin API (docs/ADMIN_API.md).</p>
        ) : (
          <form onSubmit={go} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-800">Username<input className="field mt-1" value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" required /></label>
            {!forgot && <label className="block text-sm font-semibold text-slate-800">Password<input type="password" className="field mt-1" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" required /></label>}
            {err && <p role="alert" className="rounded bg-red-50 p-3 text-sm font-medium text-red-700">{err}</p>}
            <button className="btn-primary w-full disabled:opacity-60" disabled={busy}>{busy ? 'Please wait…' : forgot ? 'Send reset link' : 'Sign in'}</button>
            {notice && <p role="status" className="text-sm text-green-800">{notice}</p>}
            {API_MODE && <button type="button" className="text-sm underline" onClick={() => { setForgot(!forgot); setNotice(''); setErr(''); }}>{forgot ? 'Back to sign in' : 'Forgot password?'}</button>}
          </form>
        )}
        {demoOk && (
          <div className="mt-6 border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950">
            <p className="font-bold">Demo mode (no backend connected). Data stays in this browser only. Not secure.</p>
            <table className="mt-2 w-full"><tbody>{DEMO_USERS.map((d) => <tr key={d.username} className="border-t border-amber-200"><td className="py-1 pr-2 font-semibold">{ROLES[d.role].label}</td><td className="pr-2">{d.username}</td><td>{d.password}</td></tr>)}</tbody></table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Layout ---------- */
function Shell({ s, children }) {
  const nav = useNavigate(); const role = ROLES[s.role];
  const link = ({ isActive }) => `whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold ${isActive ? 'border-gold-400 text-white' : 'border-transparent text-white/70 hover:text-white'}`;
  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-brand-900 text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3"><span className="font-display text-lg font-semibold">FPC Admin</span><span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-xs font-bold text-brand-950">{role.label}</span></div>
          <div className="flex items-center gap-3 text-sm"><span className="hidden text-white/70 sm:inline">{s.name}{s.state ? ` · ${stateName(s.state)}` : ''}</span><Link to="/en" className="text-white/80 underline">View site</Link>
            <button type="button" onClick={() => { logout(); nav('/admin'); }} className="rounded border border-white/30 px-3 py-1 font-semibold hover:bg-white/10">Sign out</button></div>
        </div>
        <nav className="container-x -mb-px flex gap-1 overflow-x-auto" aria-label="Admin">
          <NavLink end to="/admin" className={link}>Dashboard</NavLink>
          <NavLink to="/admin/registrations" className={link}>Registrations</NavLink>
          {API_MODE && ['admin', 'state_head'].includes(s.role) && <NavLink to="/admin/users" className={link}>Users</NavLink>}
          {API_MODE && s.role === 'admin' && <><NavLink to="/admin/enquiries" className={link}>Enquiries</NavLink><NavLink to="/admin/notifications" className={link}>Email status</NavLink><NavLink to="/admin/audit" className={link}>Activity log</NavLink></>}
          {API_MODE && <NavLink to="/admin/password" className={link}>Change password</NavLink>}
          {role.rejected && <NavLink to="/admin/rejected" className={link}>Rejection dashboard</NavLink>}
        </nav>
      </header>
      <main className="container-x py-8">{children}</main>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ s }) {
  const { rows, err } = useRows({});
  const tick = useRegistryTick();
  const [stats, setStats] = useState(null), [statsError, setStatsError] = useState('');
  useEffect(() => { if (!API_MODE) return; let active = true; api().get('/api/admin/stats').then(r => { if (active) setStats(r.data); }).catch(e => { if (active) setStatsError(message(e)); }); return () => { active = false; }; }, [tick]);
  if (err) return <p className="text-red-700">{err}</p>;
  if (!rows) return <p>Loading…</p>;
  const countStatus = st => stats ? Object.values(stats.registrations).reduce((n, counts) => n + (counts[st] || 0), 0) : rows.filter(r => r.status === st).length;
  const countKind = (kind, st) => stats ? stats.registrations[kind]?.[st] || 0 : rows.filter(r => r.kind === kind && r.status === st).length;
  const cards = [['pending', 'Pending review', 'border-amber-400'], ['verified', 'Verified', 'border-emerald-500'], ['rejected', 'Rejected', 'border-red-500']];
  const pending = rows.filter((r) => r.status === 'pending').slice(0, 6);
  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-brand-900">Dashboard</h1>
      {statsError && <p role="alert" className="text-red-700">{statsError}</p>}
      {stats && s.role === 'admin' && <Link to="/admin/enquiries" className="mt-3 inline-block underline">New enquiries: {stats.enquiriesNew || 0}</Link>}
      <p className="mt-1 text-slate-600">{ROLES[s.role].scope === 'all' ? 'All registrations' : ROLES[s.role].scope === 'state' ? `Registrations in ${stateName(s.state)}` : 'Your registration'}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">{cards.map(([k, l, b]) => <Link key={k} to={`/admin/registrations?status=${k}`} className={`border-t-4 bg-white p-5 shadow-card ${b}`}><p className="text-4xl font-semibold text-brand-900">{countStatus(k)}</p><p className="mt-1 text-sm font-semibold text-slate-600">{l}</p></Link>)}</div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="bg-white p-5 shadow-card"><h2 className="mb-3 font-display text-lg font-semibold text-brand-900">By type</h2>
          <table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase text-slate-500"><th className="py-1">Type</th><th>Pending</th><th>Verified</th><th>Rejected</th></tr></thead>
            <tbody>{KINDS.map((k) => <tr key={k} className="border-t border-brand-100"><td className="py-2 font-semibold">{KIND_LABEL[k]}</td>{STATUSES.map((st) => <td key={st}>{countKind(k, st)}</td>)}</tr>)}</tbody></table></section>
        <section className="bg-white p-5 shadow-card"><h2 className="mb-3 font-display text-lg font-semibold text-brand-900">Waiting for review</h2>
          {pending.length ? <ul className="divide-y divide-brand-100">{pending.map((r) => <li key={r.id} className="flex items-center justify-between gap-3 py-2.5 text-sm"><span><b>{r.name}</b><span className="block text-xs text-slate-500">{KIND_LABEL[r.kind]} · {stateName(r.state)} · {fmt(r.createdAt)}</span></span><Link to={`/admin/registrations?open=${r.id}`} className="font-semibold text-brand-700 underline">Review</Link></li>)}</ul> : <p className="text-sm text-slate-500">Nothing is waiting.</p>}</section>
      </div>
      {!API_MODE && <button type="button" onClick={resetDemo} className="mt-8 text-xs text-slate-500 underline">Reset demo data</button>}
    </>
  );
}

/* ---------- Record detail + decision ---------- */
function Detail({ r, s, onClose }) {
  const can = ROLES[s.role].decide; const [reason, setReason] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);
  const act = async (st) => { setBusy(true); setErr(''); try { const saved = await decide(r.id, st, reason); setNotice(saved?.account || { message: 'Decision saved.' }); } catch (e) { setErr(e.response?.data?.message || e.message); } setBusy(false); };
  useEffect(() => { const k = (e) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, [onClose]);
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={r.name} className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <motion.div className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-lift" onClick={(e) => e.stopPropagation()}
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex items-start justify-between gap-3"><div><p className="eyebrow">{KIND_LABEL[r.kind]}</p><h2 className="mt-1 font-display text-2xl font-semibold text-brand-900">{r.name}</h2></div><button type="button" onClick={onClose} aria-label="Close" className="text-3xl leading-none text-slate-500">×</button></div>
        <div className="mt-3"><Badge status={r.status} /> <span className="ml-2 text-xs text-slate-500">Applied {fmt(r.createdAt)}</span></div>
        {r.status !== 'pending' && <p className="mt-3 text-sm text-slate-600">Decision by {r.decidedBy || '-'} on {fmt(r.decidedAt)}{r.reason && <><br /><b className="text-red-700">Reason:</b> {r.reason}</>}</p>}
        <dl className="mt-5 divide-y divide-brand-100 border-y border-brand-100 text-sm">
          <div className="grid grid-cols-[130px_1fr] gap-2 py-2"><dt className="font-semibold text-slate-500">State</dt><dd>{stateName(r.state)}</dd></div>
          {Object.entries(r.data || {}).filter(([k, v]) => v && DATA_LABEL[k]).map(([k, v]) => <div key={k} className="grid grid-cols-[130px_1fr] gap-2 py-2"><dt className="font-semibold text-slate-500">{DATA_LABEL[k]}</dt><dd className="whitespace-pre-line break-words">{show(k, v)}</dd></div>)}
        </dl>
        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-500">Documents</h3>
        {Object.entries(r.files || {}).filter(([, v]) => v).length ? <ul className="mt-2 space-y-2">{Object.entries(r.files).filter(([, v]) => v).map(([k, v]) => (
          <li key={k} className="flex items-center justify-between gap-3 rounded border border-brand-100 p-2.5 text-sm"><span><b>{FILE_LABEL[k] || k}</b><span className="block text-xs text-slate-500">{v}</span></span>
            {API_MODE ? <button type="button" onClick={() => downloadDocument(r.id, k, v).catch(e => setErr(message(e)))} className="font-semibold text-brand-700 underline">Download</button> : <span className="text-xs text-slate-400">demo: name only</span>}</li>))}</ul> : <p className="mt-2 text-sm text-slate-500">No documents.</p>}
        {notice && <div role="status" className="mt-5 rounded bg-green-50 p-4 text-sm"><p>{notice.message}</p>{notice.tempPassword && <><p>Username: {notice.username}</p><p>One-time password: <code>{notice.tempPassword}</code></p><p>The user must change this at sign-in. Email delivery can be checked in Email status.</p></>}</div>}
        {can && !notice && (
          <div className="mt-6 border-t border-brand-100 pt-5">
            <label className="block text-sm font-semibold text-slate-800">Reason (required to reject)<textarea rows={3} className="field mt-1" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. CIN does not match the certificate" /></label>
            {err && <p role="alert" className="mt-2 text-sm font-medium text-red-700">{err}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {r.status !== 'verified' && <button type="button" disabled={busy} onClick={() => act('verified')} className="rounded bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">Verify</button>}
              {r.status !== 'rejected' && <button type="button" disabled={busy} onClick={() => act('rejected')} className="rounded bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60">Reject</button>}
              {r.status !== 'pending' && <button type="button" disabled={busy} onClick={() => act('pending')} className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Move to pending</button>}
            </div>
          </div>
        )}
        {!can && <p className="mt-6 rounded bg-slate-50 p-3 text-xs text-slate-600">Your role can view but not verify or reject.</p>}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Registrations ---------- */
function Registrations({ s }) {
  const [sp, setSp] = useSearchParams2();
  const f = { kind: sp.get('kind') || '', status: sp.get('status') || '', state: sp.get('state') || '', q: sp.get('q') || '' };
  const { rows, err } = useRows(f);
  const [exportError, setExportError] = useState('');
  const set = (k, v) => { const p = new URLSearchParams(sp); if (v) p.set(k, v); else p.delete(k); p.delete('open'); setSp(p); };
  const open = rows?.find((r) => r.id === sp.get('open'));
  const close = useCallback(() => { const p = new URLSearchParams(sp); p.delete('open'); setSp(p); }, [sp, setSp]);
  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-brand-900">Registrations</h1>
      {API_MODE && ROLES[s.role].scope !== 'own' && <button className="btn-outline mt-4" onClick={() => downloadExport('registrations', f).catch(e => setExportError(message(e)))}>Export Excel</button>}
      {exportError && <p role="alert" className="text-red-700">{exportError}</p>}
      <div className="mt-5 grid gap-3 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
        <select aria-label="Type" className="field" value={f.kind} onChange={(e) => set('kind', e.target.value)}><option value="">All types</option>{KINDS.map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}</select>
        <select aria-label="Status" className="field" value={f.status} onChange={(e) => set('status', e.target.value)}><option value="">All statuses</option>{STATUSES.map((k) => <option key={k} value={k}>{k}</option>)}</select>
        <select aria-label="State" className="field" value={f.state} onChange={(e) => set('state', e.target.value)}><option value="">All states</option>{Object.keys(STATES).map((k) => <option key={k} value={k}>{stateName(k)}</option>)}</select>
        <input aria-label="Search" className="field" placeholder="Search name, CIN, GST" value={f.q} onChange={(e) => set('q', e.target.value)} />
      </div>
      {err && <p className="mt-4 text-red-700">{err}</p>}
      {!rows ? <p className="mt-6">Loading…</p> : (
        <div className="mt-5 overflow-x-auto bg-white shadow-card">
          <table className="w-full min-w-[640px] text-sm"><thead><tr className="bg-brand-50 text-left text-xs uppercase tracking-wide text-slate-600"><th className="p-3">Name</th><th>Type</th><th>State</th><th>Applied</th><th>Status</th><th /></tr></thead>
            <tbody>{rows.map((r) => <tr key={r.id} className="border-t border-brand-100"><td className="p-3 font-semibold text-brand-900">{r.name}</td><td>{KIND_LABEL[r.kind]}</td><td>{stateName(r.state)}</td><td>{fmt(r.createdAt)}</td><td><Badge status={r.status} /></td>
              <td className="pr-3 text-right"><button type="button" onClick={() => setSp(new URLSearchParams({ ...Object.fromEntries(sp), open: r.id }))} className="font-semibold text-brand-700 underline">{ROLES[s.role].decide ? 'Review' : 'View'}</button></td></tr>)}
              {!rows.length && <tr><td colSpan="6" className="p-8 text-center text-slate-500">No registrations found.</td></tr>}</tbody></table>
        </div>
      )}
      <AnimatePresence>{open && <Detail key={open.id} r={open} s={s} onClose={close} />}</AnimatePresence>
    </>
  );
}

/* ---------- Rejection dashboard ---------- */
const REJ_TABS = [['fpo', 'FPOs Rejected'], ['vendor', 'Company Rejected'], ['ngo', 'NGO Rejected']];
function Rejected({ s }) {
  const [tab, setTab] = useState('fpo'); const [openId, setOpenId] = useState('');
  const { rows, err } = useRows({ status: 'rejected' });
  if (!ROLES[s.role].rejected) return <Navigate to="/admin" replace />;
  const list = (rows || []).filter((r) => r.kind === tab); const open = rows?.find((r) => r.id === openId);
  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-brand-900">Rejection dashboard</h1>
      <p className="mt-1 text-slate-600">Rejected records are only visible here. They never appear on the public website.</p>
      <div role="tablist" className="mt-5 flex flex-wrap gap-2">{REJ_TABS.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} className={`rounded-full border-2 px-5 py-2 text-sm font-bold ${tab === k ? 'border-red-600 bg-red-600 text-white' : 'border-red-200 bg-white text-red-700 hover:bg-red-50'}`}>{l} <span className="opacity-80">({(rows || []).filter((r) => r.kind === k).length})</span></button>)}</div>
      {err && <p className="mt-4 text-red-700">{err}</p>}
      <div className="mt-5 overflow-x-auto bg-white shadow-card">
        <table className="w-full min-w-[640px] text-sm"><thead><tr className="bg-red-50 text-left text-xs uppercase tracking-wide text-red-800"><th className="p-3">Name</th><th>State</th><th>Reason</th><th>Date</th><th>Documents</th></tr></thead>
          <tbody>{list.map((r) => <tr key={r.id} className="border-t border-brand-100 align-top"><td className="p-3 font-semibold text-brand-900">{r.name}</td><td>{stateName(r.state)}</td><td className="max-w-xs py-3 pr-3 text-red-800">{r.reason || '-'}</td><td className="whitespace-nowrap">{fmt(r.decidedAt)}</td>
            <td><button type="button" onClick={() => setOpenId(r.id)} className="font-semibold text-brand-700 underline">View ({Object.values(r.files || {}).filter(Boolean).length})</button></td></tr>)}
            {rows && !list.length && <tr><td colSpan="5" className="p-8 text-center text-slate-500">Nothing rejected in this list.</td></tr>}</tbody></table>
      </div>
      <AnimatePresence>{open && <Detail key={open.id} r={open} s={s} onClose={() => setOpenId('')} />}</AnimatePresence>
    </>
  );
}

import { useSearchParams } from 'react-router-dom';
const useSearchParams2 = () => { const [p, set] = useSearchParams(); return [p, (v) => set(v, { replace: true })]; };

/* ---------- Entry ---------- */
export default function Admin() {
  const tick = useRegistryTick(); const [, force] = useState(0);
  const [checking, setChecking] = useState(API_MODE && !!getSession());
  const [sessionError, setSessionError] = useState('');
  useEffect(() => { if (!API_MODE || !getSession()) return; refreshSession().catch(e => { if (e.response?.status !== 401) setSessionError(message(e)); }).finally(() => setChecking(false)); }, []);
  useEffect(() => { document.title = 'Admin | FPC Bazaar Federation'; const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'; document.head.appendChild(m); return () => m.remove(); }, []);
  const s = useMemo(() => getSession(), [tick]); // eslint-disable-line
  if (checking) return <p className="p-8">Checking your session…</p>;
  if (sessionError) return <div className="p-8"><p role="alert">{sessionError}</p><button className="underline" onClick={() => window.location.reload()}>Retry connection</button></div>;
  if (s?.mustChangePassword) return <div className="min-h-screen bg-paper p-8"><ChangePassword forced /></div>;
  if (!s) return <Login onDone={() => force((n) => n + 1)} />;
  return (
    <Shell s={s}>
      <Routes>
        <Route index element={<Dashboard s={s} />} />
        <Route path="users" element={<Users s={s} />} />
        <Route path="enquiries" element={<Enquiries s={s} />} />
        <Route path="notifications" element={<Notifications s={s} />} />
        <Route path="audit" element={<Audit s={s} />} />
        <Route path="password" element={<ChangePassword />} />
        <Route path="registrations" element={<Registrations s={s} />} />
        <Route path="rejected" element={<Rejected s={s} />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Shell>
  );
}
