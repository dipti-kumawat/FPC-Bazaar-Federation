import { useC } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, Verify } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';

export default function Amul() {
  useSeo('amul');
  const c = useC(); const a = c.amul;
  return (
    <>
      <PageHero title={a.title} sub={a.sub} crumb={a.crumb} kind="parlour" slot="amul" />
      <Band>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Verify flag="amulPermission"><p className="border-l-4 border-gold-500 bg-brand-50 p-6 text-2xl font-extrabold text-brand-900">{a.claim}</p></Verify>
            <p className="mt-6 text-lg text-slate-700">{a.pending}</p>
          </div>
          <FormEngine formKey="amul" title={a.formH} />
        </div>
      </Band>
    </>
  );
}
