import axios from 'axios';

const base = import.meta.env.VITE_API_URL;

/**
 * Sends a form to the backend: POST {VITE_API_URL}/api/forms/{formKey}
 * Without VITE_API_URL the form runs in DEMO mode: data is only kept in this browser.
 */
export async function submitForm(formKey, payload) {
  if (base) {
    const { data } = await axios.post(`${base.replace(/\/$/, '')}/api/forms/${formKey}`, payload, { timeout: 15000 });
    return data;
  }
  try {
    const list = JSON.parse(localStorage.getItem('fpc_demo_submissions') || '[]');
    list.push({ formKey, ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem('fpc_demo_submissions', JSON.stringify(list));
  } catch (e) { /* storage unavailable */ }
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, demo: true };
}
