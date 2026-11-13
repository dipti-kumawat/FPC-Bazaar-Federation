import { site, flags, draftMode } from '../config/site.js';
import { useC } from '../i18n/hooks.jsx';

export default function WhatsAppFloat() {
  const c = useC();
  return (
    <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={c.common.whatsapp}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#1F9D55] px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#188046]" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" /><path d="M9 8c0 4 3 7 7 7l1-2-2-1-1 1c-1-.4-2.6-2-3-3l1-1-1-2-2 1Z" fill="currentColor" stroke="none" /></svg>
      <span className="hidden sm:inline">{c.common.whatsapp}</span>
    </a>
  );
}
