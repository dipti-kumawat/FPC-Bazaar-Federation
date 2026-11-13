import { useC, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';

export default function NotFound() {
  useSeo('notFound');
  const c = useC();
  return (
    <section className="container-x py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-brand-900">{c.notFound.h}</h1>
      <p className="mt-2 text-slate-700">{c.notFound.t}</p>
      <LLink to="" className="btn-primary mt-8">{c.common.back}</LLink>
    </section>
  );
}
