// Registrations (FPO, vendor, NGO, project head, member, job) and their review status.
// DEMO MODE (no VITE_API_URL): everything is kept in this browser's localStorage with a few sample records.
// API MODE (VITE_API_URL set): the same functions call the backend. Contract: docs/ADMIN_API.md
import { useSyncExternalStore } from 'react';
import axios from 'axios';
import { draftMode } from '../config/site.js';

const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const API_MODE = !!base;
const KEY = 'fpc_registry_v1';
const SESSION = 'fpc_admin_session';

export const KINDS = ['fpo', 'vendor', 'ngo', 'projecthead', 'member', 'job'];
export const FORM_TO_KIND = { fpo: 'fpo', vendor: 'vendor', projecthead: 'projecthead', member: 'member', job: 'job', ngo: 'ngo' };
export const STATUSES = ['pending', 'verified', 'rejected'];

/**
 * Hierarchy: Admin > State Head > Project Head > Vendor > FPO.
 * scope: 'all' = every record, 'state' = records of the user's state, 'own' = only the user's own record.
 * decide: may verify / reject.  (Assumption, easy to change here.)
 */
export const ROLES = {
  admin: { label: 'Admin', scope: 'all', decide: true, rejected: true },
  state_head: { label: 'State Head', scope: 'state', decide: true, rejected: true },
  project_head: { label: 'Project Head', scope: 'state', decide: false, rejected: true },
  vendor: { label: 'Vendor', scope: 'own', decide: false, rejected: false },
  fpo: { label: 'FPO', scope: 'own', decide: false, rejected: false },
};

// Demo logins exist only in demo mode. With VITE_API_URL set at build time this becomes [] and the
// usernames/passwords are left out of the production bundle (the backend has its own real logins).
export const DEMO_USERS = import.meta.env.VITE_API_URL ? [] : [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Federation Admin' },
  { username: 'rajasthan-head', password: 'state123', role: 'state_head', state: 'rajasthan', name: 'State Head, Rajasthan' },
  { username: 'project-head', password: 'project123', role: 'project_head', state: 'rajasthan', name: 'Project Head, Rajasthan' },
  { username: 'vendor', password: 'vendor123', role: 'vendor', own: 'seed-vendor-1', name: 'Aravali Organics (vendor)' },
  { username: 'fpo', password: 'fpo123', role: 'fpo', own: 'seed-fpo-1', name: 'Hadoti Kisan FPO (FPO)' },
];

const d = (n) => new Date(Date.now() - n * 864e5).toISOString();
const seed = () => ([
  { id: 'seed-fpo-1', kind: 'fpo', status: 'verified', state: 'rajasthan', name: 'Hadoti Kisan Producer Company', createdAt: d(40), decidedAt: d(30), decidedBy: 'Federation Admin', reason: '', sample: true,
    data: { district: 'Baran', cin: 'U01100RJ2020PTC000001', kisanCount: 850, odop: 'Coriander', contact: 'Ramesh Meena', phone: '9876500001' }, files: { certificate: 'certificate.pdf', pan: 'pan.pdf', boardResolution: 'resolution.pdf' } },
  { id: 'seed-fpo-2', kind: 'fpo', status: 'pending', state: 'gujarat', name: 'Saurashtra Kisan FPO', createdAt: d(3), decidedAt: '', decidedBy: '', reason: '', sample: true,
    data: { district: 'Rajkot', cin: 'U01100GJ2021PTC000002', kisanCount: 420, odop: 'Cumin', contact: 'Hiren Patel', phone: '9876500002' }, files: { certificate: 'certificate.pdf', pan: 'pan.pdf', boardResolution: 'resolution.pdf' } },
  { id: 'seed-fpo-3', kind: 'fpo', status: 'rejected', state: 'rajasthan', name: 'Marwar Agro Collective', createdAt: d(20), decidedAt: d(12), decidedBy: 'Federation Admin', reason: 'CIN does not match the registration certificate.', sample: true,
    data: { district: 'Jodhpur', cin: 'U01100RJ2019PTC000003', kisanCount: 120, odop: 'Bajra', contact: 'Mohan Lal', phone: '9876500003' }, files: { certificate: 'certificate.pdf', pan: 'pan.pdf', boardResolution: 'resolution.pdf' } },
  { id: 'seed-vendor-1', kind: 'vendor', status: 'verified', state: 'rajasthan', name: 'Aravali Bio Inputs', slug: 'aravali-bio-inputs', createdAt: d(50), decidedAt: d(44), decidedBy: 'Federation Admin', reason: '', sample: true,
    data: { gst: '08ABCDE1234F1Z5', turnover: '1.2 crore', productCategory: 'inputs', supplyState: 'rajasthan', district: 'Udaipur', contact: 'Sunil Joshi', phone: '9876500004', about: 'Vermicompost and organic bio-fertilisers made from gaushala cow dung.',
      productList: 'Vermicompost\nGaushala organic fertiliser\nPanchgavya liquid', pastWork: 'Supplied 120 tonnes of vermicompost to 6 FPOs in Mewar.\nOrganic input training for 300 farmers.' }, files: { logo: '', certificate: 'organic-cert.pdf' } },
  { id: 'seed-vendor-2', kind: 'vendor', status: 'pending', state: 'maharashtra', name: 'Sahyadri Natural Feeds', slug: 'sahyadri-natural-feeds', createdAt: d(2), decidedAt: '', decidedBy: '', reason: '', sample: true,
    data: { gst: '27ABCDE1234F1Z5', turnover: '80 lakh', productCategory: 'feed', supplyState: 'maharashtra', district: 'Pune', contact: 'Amit Kale', phone: '9876500005', about: '', productList: '', pastWork: '' }, files: { logo: '', certificate: 'fssai.pdf' } },
  { id: 'seed-vendor-3', kind: 'vendor', status: 'rejected', state: 'gujarat', name: 'GreenLeaf Traders', slug: 'greenleaf-traders', createdAt: d(25), decidedAt: d(18), decidedBy: 'Federation Admin', reason: 'GST number could not be verified.', sample: true,
    data: { gst: '24ABCDE1234F1Z5', turnover: '30 lakh', productCategory: 'produce', supplyState: 'gujarat', district: 'Surat', contact: 'Neha Shah', phone: '9876500006', about: '', productList: '', pastWork: '' }, files: { logo: '', certificate: 'cert.pdf' } },
  { id: 'seed-ngo-1', kind: 'ngo', status: 'rejected', state: 'mp', name: 'Gram Vikas Seva Samiti', createdAt: d(30), decidedAt: d(21), decidedBy: 'Federation Admin', reason: 'Registration documents are incomplete (80G / 12A missing).', sample: true,
    data: { district: 'Indore', contact: 'Kailash Verma', phone: '9876500007' }, files: { certificate: 'ngo-reg.pdf' } },
  { id: 'seed-ph-1', kind: 'projecthead', status: 'pending', state: 'rajasthan', name: 'Dinesh Sharma', createdAt: d(1), decidedAt: '', decidedBy: '', reason: '', sample: true,
    data: { experience: '8 years', projectType: 'dairy', phone: '9876500008' }, files: {} },
]);

// ---- tiny external store so pages re-render after changes ----
let cache = null; let version = 0; const subs = new Set();
const emit = () => { version += 1; subs.forEach((f) => f()); };
export const useRegistryTick = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => version);

function readLocal() {
  if (cache) return cache;
  try { const raw = localStorage.getItem(KEY); cache = raw ? JSON.parse(raw) : null; } catch (e) { cache = null; }
  if (!cache) { cache = seed(); writeLocal(); }
  return cache;
}
function writeLocal() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) { /* ignore */ } }

const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'vendor';

/** Called by formService in demo mode: stores a new registration as Pending. */
export function addFromForm(formKey, payload, fileNames) {
  const kind = FORM_TO_KIND[formKey]; if (!kind) return;
  const list = readLocal();
  const name = payload.fpoName || payload.companyName || payload.ngoName || payload.name || 'Applicant';
  let slug; if (kind === 'vendor') { slug = slugify(name); let n = 2; while (list.some((r) => r.slug === slug)) slug = `${slugify(name)}-${n++}`; }
  const { fpoName, companyName, consent, page, lang, ...rest } = payload;
  const state = payload.state || payload.supplyState || '';
  list.unshift({ id: `r-${Date.now().toString(36)}`, kind, status: 'pending', state, name, slug, createdAt: new Date().toISOString(), decidedAt: '', decidedBy: '', reason: '',
    data: { ...rest, contact: payload.name }, files: fileNames || {} });
  writeLocal(); emit();
}

// ---- API helpers ----
const token = () => { try { return JSON.parse(sessionStorage.getItem(SESSION) || '{}').token; } catch (e) { return ''; } };
export function api() {
  const client = axios.create({ baseURL: base, timeout: 15000, headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
  client.interceptors.response.use(r => r, error => {
    if (error.response?.status === 401 && error.config?.headers?.Authorization) logout();
    if (error.response?.data?.code === 'password_change_required') {
      const session = getSession(); if (session) saveSession({ ...session, mustChangePassword: true });
    }
    return Promise.reject(error);
  });
  return client;
}
function saveSession(s) {
  sessionStorage.setItem(SESSION, JSON.stringify(s)); emit(); return s;
}
function sessionFrom(data, previous = {}) {
  return { ...previous, token: data.token || previous.token, username: data.username || previous.username,
    role: data.role, name: data.name, state: data.state, own: data.recordId, mustChangePassword: !!data.mustChangePassword };
}
export async function refreshSession() {
  if (!API_MODE || !getSession()?.token) return getSession();
  const { data } = await api().get('/api/auth/me'); return saveSession(sessionFrom(data, getSession()));
}
export async function changePassword(currentPassword, newPassword) {
  const { data } = await api().post('/api/auth/change-password', { currentPassword, newPassword });
  return saveSession(sessionFrom(data, getSession()));
}
/** Public: status of an application by its reference number and the mobile number used in the form. */
export async function trackApplication(reference, phone) {
  const { data } = await axios.post(`${base}/api/public/track`, { reference: reference.trim(), phone: phone.trim() }, { timeout: 15000 }); return data;
}
/** Sends a new email-confirmation link to a self-registered login that has not been switched on yet. */
export async function resendConfirmation(username) {
  const { data } = await axios.post(`${base}/api/auth/resend-confirmation`, { username }, { timeout: 15000 }); return data;
}
export async function forgotPassword(username) {
  const { data } = await axios.post(`${base}/api/auth/forgot-password`, { username }, { timeout: 15000 }); return data;
}
export async function downloadExport(kind, filters = {}) {
  const { data } = await api().get(`/api/admin/export/${kind}`, { params: filters, responseType: 'blob' });
  const url = URL.createObjectURL(data); const anchor = document.createElement('a');
  anchor.href = url; anchor.download = `fpc-${kind}.xlsx`; document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---- session ----
export const getSession = () => { try { return JSON.parse(sessionStorage.getItem(SESSION) || 'null'); } catch (e) { return null; } };
export const logout = () => { try { sessionStorage.removeItem(SESSION); } catch (e) { /* ignore */ } emit(); };

/**
 * Resolves to the session object, or (API mode) to { otpRequired, challenge, email, ... } when the server
 * emailed a sign-in code: then call verifyOtp(challenge, code). Throws on a wrong password.
 */
export async function login(username, password) {
  let s;
  if (API_MODE) {
    const { data } = await api().post('/api/auth/login', { username, password });
    if (data.otpRequired) return { ...data, username: username.trim().toLowerCase() };
    s = sessionFrom(data, { username: username.trim().toLowerCase() });
  } else {
    const u = DEMO_USERS.find((x) => x.username === username.trim() && x.password === password);
    if (!u) throw new Error('Wrong username or password');
    s = { role: u.role, name: u.name, state: u.state, own: u.own, demo: true };
  }
  try { sessionStorage.setItem(SESSION, JSON.stringify(s)); } catch (e) { /* ignore */ }
  emit(); return s;
}

/** Second sign-in step: the 6-digit code from the email. Saves and returns the session. */
export async function verifyOtp(challenge, code, username) {
  const { data } = await axios.post(`${base}/api/auth/verify-otp`, { challenge, code }, { timeout: 15000 });
  return saveSession(sessionFrom(data, { username }));
}
/** Emails a new code for the same sign-in. */
export async function resendOtp(challenge) {
  const { data } = await axios.post(`${base}/api/auth/resend-otp`, { challenge }, { timeout: 15000 }); return data;
}

const inScope = (r, s) => {
  const sc = ROLES[s.role]?.scope;
  if (sc === 'all') return true;
  if (sc === 'state') return r.state === s.state;
  return r.id === s.own;
};

/** Admin list. filters: { kind, status, state, q } */
export async function listRegistrations(filters = {}) {
  const s = getSession(); if (!s) throw new Error('Not signed in');
  let rows;
  if (API_MODE) { const { data } = await api().get('/api/admin/registrations', { params: filters }); rows = data.items || data; }
  else rows = readLocal().filter((r) => inScope(r, s));
  const q = (filters.q || '').toLowerCase();
  return rows.filter((r) => (!filters.kind || r.kind === filters.kind) && (!filters.status || r.status === filters.status) && (!filters.state || r.state === filters.state)
    && (!q || `${r.name} ${r.data?.contact || ''} ${r.data?.cin || ''} ${r.data?.gst || ''}`.toLowerCase().includes(q)));
}

/** status: 'verified' | 'rejected' | 'pending'. reason is required for rejected. */
export async function decide(id, status, reason = '') {
  const s = getSession(); if (!s || !ROLES[s.role]?.decide) throw new Error('You are not allowed to do this');
  if (status === 'rejected' && !reason.trim()) throw new Error('Please write the reason for rejection');
  if (API_MODE) { const { data } = await api().patch(`/api/admin/registrations/${id}`, { status, reason }); publicLoaded = false; loadPublicVendors(); emit(); return data; }
  const r = readLocal().find((x) => x.id === id); if (!r) throw new Error('Record not found');
  r.status = status; r.reason = status === 'rejected' ? reason.trim() : ''; r.decidedAt = new Date().toISOString(); r.decidedBy = s.name;
  writeLocal(); emit();
}

export async function downloadDocument(id, key, filename) {
  const { data } = await api().get(`/api/admin/registrations/${encodeURIComponent(id)}/files/${encodeURIComponent(key)}`, { responseType: 'blob' });
  const url = URL.createObjectURL(data); const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename || 'document'; document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export const fileUrl = (id, key) => (API_MODE ? `${base}/api/admin/registrations/${id}/files/${key}?token=${encodeURIComponent(token() || '')}` : '');

export function resetDemo() { cache = seed(); writeLocal(); emit(); }

// ---- public side: verified vendors shaped like marketplace suppliers ----
let publicApi = []; let publicLoaded = false; let publicStatus = 'loading';
export const publicVendorStatus = () => publicStatus;
export function loadPublicVendors() {
  if (!API_MODE || publicLoaded) return; publicLoaded = true; publicStatus = 'loading'; emit();
  axios.get(`${base}/api/public/vendors`, { timeout: 15000, params: { _refresh: Date.now() } }).then(({ data }) => { publicApi = (data.items || data).map(toSupplier); publicStatus = 'ready'; emit(); }).catch(() => { publicLoaded = false; publicStatus = 'error'; emit(); });
}
const SUP_TYPE = { vendor: 'supplier' };
function toSupplier(r) {
  const x = r.data || r;
  const t = (v) => ({ en: v, hi: v });
  return {
    id: r.slug, slug: r.slug, type: r.supplierType || SUP_TYPE[r.kind] || 'supplier', state: r.state, cats: [x.productCategory].filter(Boolean),
    name: t(r.name), district: t(x.district || ''), about: t(x.about || ''), sample: !!r.sample, verified: true, registry: true,
    logo: r.logoUrl || '', productList: (x.productList || '').split('\n').map((v) => v.trim()).filter(Boolean),
    pastWork: (x.pastWork || '').split('\n').map((v) => v.trim()).filter(Boolean),
    certificates: Object.entries(r.files || {}).filter(([k, v]) => k === 'certificate' && v).map(([, v]) => v),
    contact: { name: x.contact || '', phone: x.phone || '' },
  };
}
/** Verified vendors only. Rejected and pending ones never appear on the public site. */
export function publicVendors() {
  if (API_MODE) return publicApi;
  return readLocal().filter((r) => r.kind === 'vendor' && r.status === 'verified' && (draftMode || !r.sample)).map(toSupplier);
}
