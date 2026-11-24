import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api, changePassword, downloadExport, listRegistrations, logout } from '../services/registry.js';
import { STATES } from '../data/marketplace.js';

export const message = e => e.response?.data?.message || e.message || 'Request failed. Please try again.';
export function useAdminData(path) {
  const [data, setData] = useState(null), [error, setError] = useState(''), [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion(n => n + 1), []);
  useEffect(() => {
    let active = true; setError('');
    api().get(path).then(r => { if (active) setData(r.data); }).catch(e => { if (active) setError(message(e)); });
    return () => { active = false; };
  }, [path, version]);
  return { data, error, reload };
}
const ErrorText = ({ value }) => value ? <p role="alert" className="my-4 rounded bg-red-50 p-3 text-red-800">{value}</p> : null;
const Label = ({ children, title }) => <label className="block text-sm font-semibold">{title}{children}</label>;
const when = value => value ? new Date(value).toLocaleString('en-IN') : '—';
const allowed = (s, roles) => roles.includes(s.role);

export function ChangePassword({ forced = false }) {
  const [current, setCurrent] = useState(''), [next, setNext] = useState(''), [confirm, setConfirm] = useState('');
  const [error, setError] = useState(''), [busy, setBusy] = useState(false), [success, setSuccess] = useState(false);
  async function submit(e) {
    e.preventDefault(); setError(''); setSuccess(false);
    if (next !== confirm) { setError('The new passwords do not match.'); return; }
    setBusy(true);
    try { await changePassword(current, next); setCurrent(''); setNext(''); setConfirm(''); setSuccess(true); }
    catch (e) { setError(message(e)); } finally { setBusy(false); }
  }
  return <section className="mx-auto max-w-lg bg-white p-6 shadow-card">
    <h1 className="font-display text-2xl font-semibold text-brand-900">{forced ? 'Set your own password' : 'Change password'}</h1>
    <p className="mt-2 text-sm text-slate-600">{forced ? 'Change your one-time password before continuing. ' : ''}Use at least 10 characters with letters and numbers.</p>
    <form onSubmit={submit} className="mt-5 space-y-4">
      <Label title="Current password"><input className="field mt-1" type="password" autoComplete="current-password" value={current} onChange={e => setCurrent(e.target.value)} required /></Label>
      <Label title="New password"><input className="field mt-1" type="password" autoComplete="new-password" minLength={10} maxLength={72} value={next} onChange={e => setNext(e.target.value)} required /></Label>
      <Label title="Confirm new password"><input className="field mt-1" type="password" autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} required /></Label>
      <ErrorText value={error} />{success && <p role="status" className="text-green-800">Password changed successfully.</p>}
      <button disabled={busy} className="btn-primary">{busy ? 'Saving…' : 'Save password'}</button>
      {forced && <button type="button" onClick={logout} className="ml-4 underline">Sign out</button>}
    </form>
  </section>;
}

export function Users({ s }) {
  if (!allowed(s, ['admin', 'state_head'])) return <Navigate to="/admin" replace />;
  return <UsersContent s={s} />;
}
function UsersContent({ s }) {
  const { data, error, reload } = useAdminData('/api/admin/users');
  const [issue, setIssue] = useState(''), [issued, setIssued] = useState(null), [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ username: '', name: '', role: 'project_head', state: s.state || '', recordId: '' });
  const [records, setRecords] = useState([]);
  const [doomed, setDoomed] = useState(null), [typed, setTyped] = useState(''), [done, setDone] = useState('');
  useEffect(() => { if (s.role === 'admin') listRegistrations({ status: 'verified' }).then(setRecords).catch(e => setIssue(message(e))); }, [s.role]);
  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const partner = ['vendor', 'fpo'].includes(form.role);
  async function action(fn) {
    setIssue(''); setIssued(null); setBusy(true);
    try { const result = await fn(); if (result?.data?.tempPassword) setIssued(result.data); reload(); }
    catch (e) { setIssue(message(e)); } finally { setBusy(false); }
  }
  return <>
    <h1 className="font-display text-3xl font-semibold text-brand-900">Users</h1>
    <ErrorText value={error || issue} />
    {done && <p role="status" className="my-4 rounded border border-green-300 bg-green-50 p-3 text-green-900">{done} <button className="ml-2 underline" onClick={() => setDone('')}>Dismiss</button></p>}
    {doomed && <DeleteBox u={doomed} typed={typed} setTyped={setTyped} busy={busy} onCancel={() => { setDoomed(null); setTyped(''); }}
      onConfirm={() => action(async () => {
        const { data: r } = await api().delete(`/api/admin/users/${doomed.id}`);
        setDoomed(null); setTyped('');
        setDone(`Deleted ${r.username}${r.applicationDeleted ? `, with the application and ${r.filesDeleted} document(s)` : ''}.`);
        if (['vendor', 'fpo'].includes(r.role)) setRecords(list => list.filter(x => x.id !== doomed.recordId));
      })} />}
    {issued && <div role="status" className="my-4 border border-green-300 bg-green-50 p-4"><b>One-time login details</b><p>Username: {issued.user.username}</p><p>Password: <code>{issued.tempPassword}</code></p><p>Shown once here. The user must change it at sign-in. Check Email status for delivery.</p><button onClick={() => setIssued(null)} className="mt-2 underline">Dismiss credentials</button></div>}
    <form className="my-6 grid gap-4 bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-3" onSubmit={e => { e.preventDefault(); action(async () => { const result = await api().post('/api/admin/users', form); setForm(f => ({ ...f, username: '', name: '' })); return result; }); }}>
      <Label title="Email / username"><input type="email" className="field mt-1" value={form.username} onChange={e => set('username', e.target.value)} required /></Label>
      <Label title="Full name"><input className="field mt-1" value={form.name} onChange={e => set('name', e.target.value)} maxLength={100} required /></Label>
      <Label title="Role"><select className="field mt-1" value={form.role} onChange={e => set('role', e.target.value)}>{(s.role === 'admin' ? ['admin', 'state_head', 'project_head', 'vendor', 'fpo'] : ['project_head']).map(role => <option key={role}>{role}</option>)}</select></Label>
      {['state_head', 'project_head'].includes(form.role) && <Label title="State"><select className="field mt-1" value={form.state} onChange={e => set('state', e.target.value)} required disabled={s.role === 'state_head'}><option value="">Choose state</option>{Object.entries(STATES).map(([key, value]) => <option value={key} key={key}>{value.en}</option>)}</select></Label>}
      {partner && <Label title="Verified registration"><select className="field mt-1" value={form.recordId} onChange={e => set('recordId', e.target.value)} required><option value="">Choose registration</option>{records.filter(r => r.kind === form.role).map(r => <option value={r.id} key={r.id}>{r.name}</option>)}</select></Label>}
      <div className="self-end"><button className="btn-primary" disabled={busy}>Create login</button></div>
    </form>
    {!data ? <p>Loading…</p> : <div className="overflow-x-auto bg-white"><table className="w-full min-w-[700px] text-sm"><thead><tr className="bg-brand-50 text-left"><th className="p-3">Name / username</th><th>Role</th><th>State</th><th>Status</th><th>Actions</th></tr></thead><tbody>{data.items.map(u => <tr key={u.id} className="border-t"><td className="p-3"><b>{u.name}</b><p>{u.username}</p></td><td>{u.role}</td><td>{u.state || '—'}</td><td>{u.active ? 'Active' : 'Disabled'}{u.mustChangePassword && <p className="text-xs">Password change required</p>}</td><td className="space-x-3"><button disabled={busy || u.username === s.username} className="underline disabled:opacity-40" onClick={() => action(() => api().patch(`/api/admin/users/${u.id}`, { active: !u.active }))}>{u.active ? 'Disable' : 'Enable'}</button><button disabled={busy || u.username === s.username} className="underline disabled:opacity-40" onClick={() => { if (window.confirm(`Reset the password for ${u.username}? Existing sessions will end.`)) action(() => api().post(`/api/admin/users/${u.id}/reset-password`)); }}>Reset password</button>{s.role === 'admin' && u.username !== s.username && <button disabled={busy} className="font-semibold text-red-700 underline disabled:opacity-40" onClick={() => { setDoomed(u); setTyped(''); setDone(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Delete</button>}</td></tr>)}</tbody></table></div>}
  </>;
}

/** Permanent delete needs the email typed again: it removes data from the database. */
function DeleteBox({ u, typed, setTyped, busy, onCancel, onConfirm }) {
  const partner = ['vendor', 'fpo'].includes(u.role);
  const ok = typed.trim().toLowerCase() === u.username;
  return <section role="alertdialog" aria-labelledby="del-title" className="my-6 border-l-4 border-red-600 bg-red-50 p-5">
    <h2 id="del-title" className="font-display text-xl font-semibold text-red-900">Delete {u.name} permanently?</h2>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
      <li>The login <b>{u.username}</b> ({u.role}) is removed from the database and signed out everywhere.</li>
      {partner && <li>Their application, all uploaded documents{u.role === 'vendor' ? ' and their public profile page' : ''} are deleted too.</li>}
      <li>This cannot be undone (only from a server backup). The activity log keeps a line saying who deleted it.</li>
    </ul>
    <label className="mt-4 block text-sm font-semibold text-red-900">Type <code className="rounded bg-white px-1">{u.username}</code> to confirm
      <input className="field mt-2 block max-w-md" value={typed} onChange={e => setTyped(e.target.value)} autoComplete="off" autoFocus /></label>
    <div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={!ok || busy} onClick={onConfirm} className="rounded bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50">{busy ? 'Deleting…' : 'Delete permanently'}</button>
      <button type="button" onClick={onCancel} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Cancel</button></div>
  </section>;
}

export function Enquiries({ s }) {
  if (s.role !== 'admin') return <Navigate to="/admin" replace />;
  return <EnquiriesContent />;
}
function EnquiriesContent() {
  const [filter, setFilter] = useState('');
  const { data, error, reload } = useAdminData(`/api/admin/enquiries${filter ? '?status=' + filter : ''}`);
  const [issue, setIssue] = useState('');
  return <>
    <h1 className="font-display text-3xl font-semibold text-brand-900">Enquiries</h1>
    <div className="my-4 flex flex-wrap gap-3"><select aria-label="Enquiry status" className="field max-w-xs" value={filter} onChange={e => setFilter(e.target.value)}><option value="">All statuses</option>{['new', 'replied', 'closed'].map(v => <option key={v}>{v}</option>)}</select><button className="btn-outline" onClick={() => downloadExport('enquiries', { status: filter }).catch(e => setIssue(message(e)))}>Export Excel</button></div>
    <ErrorText value={error || issue} />
    {!data ? <p>Loading…</p> : data.items.length ? data.items.map(e => <Enquiry key={e.id} entry={e} reload={reload} />) : <p>No enquiries found.</p>}
  </>;
}
function Enquiry({ entry: e, reload }) {
  const [status, setStatus] = useState(e.status), [note, setNote] = useState(e.note || ''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  async function save(event) { event.preventDefault(); setBusy(true); setError(''); try { await api().patch(`/api/admin/enquiries/${e.id}`, { status, note }); reload(); } catch (e) { setError(message(e)); } finally { setBusy(false); } }
  return <details className="mb-3 border border-brand-100 bg-white p-4"><summary className="cursor-pointer font-semibold">{e.data.name || e.data.organisation || 'Enquiry'} · {e.formKey} · {e.status} · {when(e.createdAt)}</summary>
    <dl className="my-4 grid gap-2 text-sm sm:grid-cols-2">{Object.entries(e.data).map(([k, v]) => <div key={k}><dt className="font-semibold">{k}</dt><dd className="whitespace-pre-wrap break-words">{v}</dd></div>)}</dl>
    <form onSubmit={save} className="space-y-3"><Label title="Status"><select className="field" value={status} onChange={e => setStatus(e.target.value)}>{['new', 'replied', 'closed'].map(v => <option key={v}>{v}</option>)}</select></Label><Label title="Internal note"><textarea className="field" maxLength={1000} value={note} onChange={e => setNote(e.target.value)} /></Label><ErrorText value={error} /><button className="btn-primary" disabled={busy}>Save enquiry</button></form>
  </details>;
}

export function Notifications({ s }) {
  if (s.role !== 'admin') return <Navigate to="/admin" replace />;
  return <NotificationsContent />;
}
function NotificationsContent() {
  const { data, error, reload } = useAdminData('/api/admin/notifications');
  const [issue, setIssue] = useState(''), [busy, setBusy] = useState('');
  async function retry(id) { setBusy(id); setIssue(''); try { await api().post(`/api/admin/notifications/${id}/retry`); reload(); } catch (e) { setIssue(message(e)); } finally { setBusy(''); } }
  return <><h1 className="font-display text-3xl font-semibold text-brand-900">Email status</h1>
    <p className="mt-2 text-slate-600">{data ? !data.enabled ? 'Email is disabled.' : data.sandbox ? 'Sandbox mode: messages are tested without delivery.' : 'Live email delivery is enabled.' : 'Loading…'} Accepted means the provider accepted the email; inbox delivery is tracked by Brevo.</p>
    <button className="btn-outline my-4" onClick={reload}>Refresh status</button><ErrorText value={error || issue} />
    {data && <div className="overflow-x-auto bg-white"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-brand-50"><tr><th className="p-3">Notification</th><th>Status</th><th>Attempts</th><th>Created</th><th>Details</th><th /></tr></thead><tbody>{data.items.map(j => <tr key={j.id} className="border-t"><td className="p-3">{j.kind}</td><td>{j.status}</td><td>{j.attempts}</td><td>{when(j.createdAt)}</td><td className="max-w-xs break-all">{j.lastError || j.providerMessageId || '—'}</td><td>{j.status === 'failed' && <button className="underline" disabled={!!busy} onClick={() => retry(j.id)}>Retry</button>}</td></tr>)}{!data.items.length && <tr><td colSpan={6} className="p-5">No notifications yet.</td></tr>}</tbody></table></div>}
  </>;
}

export function Audit({ s }) {
  if (s.role !== 'admin') return <Navigate to="/admin" replace />;
  return <AuditContent />;
}
function AuditContent() {
  const { data, error, reload } = useAdminData('/api/admin/audit');
  return <><h1 className="font-display text-3xl font-semibold text-brand-900">Activity log</h1><button className="btn-outline my-4" onClick={reload}>Refresh</button><ErrorText value={error} />
    {data && <ul className="divide-y bg-white p-4">{data.items.map(e => <li className="py-3 text-sm" key={e.id}><b>{e.actorName || 'System'} · {e.action}</b><p>{e.summary}</p><p className="text-slate-500">{when(e.at)}</p></li>)}</ul>}
  </>;
}
