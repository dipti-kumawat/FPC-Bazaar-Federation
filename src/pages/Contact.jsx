import { useC } from '../i18n/hooks.jsx';
import { site } from '../config/site.js';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, Verify } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';

export default function Contact() {
  useSeo('contact');
  const c = useC(); const t = c.contact;
  return (
    <>
      <PageHero title={t.title} sub={t.sub} crumb={t.crumb} />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-brand-900">{t.detailsH}</h2>
            <Verify flag="contactDetails">
              <dl className="divide-y divide-brand-100 border-y border-brand-100">
                <div className="grid gap-1 py-4 sm:grid-cols-[110px_1fr]"><dt className="font-bold text-brand-800">{t.phones}</dt><dd className="space-y-1">{site.phones.map((p) => <div key={p.tel}><Verify flag={p.verify} inline><a href={`tel:${p.tel}`} className="text-lg font-semibold hover:underline">{p.display}</a></Verify></div>)}</dd></div>
                <div className="grid gap-1 py-4 sm:grid-cols-[110px_1fr]"><dt className="font-bold text-brand-800">{c.common.email}</dt><dd><a href={`mailto:${site.email}`} className="break-all font-semibold hover:underline">{site.email}</a></dd></div>
                <div className="grid gap-1 py-4 sm:grid-cols-[110px_1fr]"><dt className="font-bold text-brand-800">{t.officeH}</dt><dd>{t.office}</dd></div>
              </dl>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">{t.whatsappB}</a>
            </Verify>
          </div>
          <FormEngine formKey="contact" title={t.formH} />
        </div>
      </Band>
      <section className="pb-14"><div className="container-x">
        <h2 className="mb-4 text-2xl font-extrabold text-brand-900">{t.mapH}</h2>
        <div className="aspect-[16/7] min-h-[260px] overflow-hidden rounded-sm border border-brand-100">
          <iframe title={t.mapH} loading="lazy" className="h-full w-full" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`} />
        </div>
      </div></section>
    </>
  );
}
