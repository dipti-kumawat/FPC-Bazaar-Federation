import axios from 'axios';
import { addFromForm, FORM_TO_KIND } from './registry.js';

const base = import.meta.env.VITE_API_URL;
const isFile = (v) => typeof File !== 'undefined' && v instanceof File;

/**
 * Sends a form to the backend: POST {VITE_API_URL}/api/forms/{formKey}
 * Plain forms go as JSON. Forms with an uploaded file go as multipart/form-data (text fields + file parts).
 * Without VITE_API_URL the form runs in DEMO mode: data is only kept in this browser.
 */
export async function submitForm(formKey, payload) {
  const hasFile = Object.values(payload).some(isFile);
  if (base) {
    const url = `${base.replace(/\/$/, '')}/api/forms/${formKey}`;
    if (hasFile) {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => { if (isFile(v)) fd.append(k, v, v.name); else if (v !== undefined && v !== null) fd.append(k, String(v)); });
      const { data } = await axios.post(url, fd, { timeout: 60000 });
      return data;
    }
    const { data } = await axios.post(url, payload, { timeout: 15000 });
    return data;
  }
  const names = {}; const clean = {};
  Object.entries(payload).forEach(([k, v]) => { if (isFile(v)) names[k] = v.name; else clean[k] = v; });
  try {
    const list = JSON.parse(localStorage.getItem('fpc_demo_submissions') || '[]');
    list.push({ formKey, ...clean, files: names, savedAt: new Date().toISOString() });
    localStorage.setItem('fpc_demo_submissions', JSON.stringify(list));
  } catch (e) { /* storage unavailable */ }
  if (FORM_TO_KIND[formKey]) addFromForm(formKey, clean, names);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, demo: true };
}
