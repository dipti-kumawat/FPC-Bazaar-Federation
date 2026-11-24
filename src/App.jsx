import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useC } from './i18n/hooks.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
const Admin = lazy(() => import('./admin/Admin.jsx'));
import { loadPublicVendors } from './services/registry.js';
const About = lazy(() => import('./pages/About.jsx'));
const Ppp = lazy(() => import('./pages/Ppp.jsx'));
const Cluster = lazy(() => import('./pages/Cluster.jsx'));
const Gaushala = lazy(() => import('./pages/Gaushala.jsx'));
const EAuto = lazy(() => import('./pages/EAuto.jsx'));
const Amul = lazy(() => import('./pages/Amul.jsx'));
const Enzy = lazy(() => import('./pages/Enzy.jsx'));
const Biogas = lazy(() => import('./pages/Biogas.jsx'));
const Join = lazy(() => import('./pages/Join.jsx'));
const Partners = lazy(() => import('./pages/Partners.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const hub = (name) => lazy(() => import('./pages/Hubs.jsx').then((m) => ({ default: m[name] })));
const Services = hub('Services'); const Projects = hub('Projects'); const StatesMap = hub('StatesMap');
const FpoReg = hub('FpoReg'); const VendorReg = hub('VendorReg'); const Career = hub('Career');
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const GaushalaTourism = lazy(() => import('./pages/GaushalaTourism.jsx'));
const Marketplace = lazy(() => import('./pages/Marketplace.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Suppliers = lazy(() => import('./pages/Suppliers.jsx'));
const SupplierDetail = lazy(() => import('./pages/SupplierDetail.jsx'));
const Sourcing = lazy(() => import('./pages/Sourcing.jsx'));
const BusinessConnect = lazy(() => import('./pages/BusinessConnect.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const NgoRegistration = lazy(() => import('./pages/NgoRegistration.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/** Shown for a moment while a page's code is downloaded (pages load on demand). */
function PageLoader() {
  return <div className="grid min-h-[60vh] place-items-center" aria-busy="true"><span className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-200 border-t-gold-500" /></div>;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

function LangLayout() {
  const { lang } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const valid = lang === 'en' || lang === 'hi';
  if (valid && i18n.language !== lang) i18n.changeLanguage(lang);
  useEffect(() => {
    if (!valid) return;
    document.documentElement.lang = lang;
    try { localStorage.setItem('fpc_lang', lang); } catch (e) { /* ignore */ }
  }, [lang, valid]);
  const c = useC();
  if (!valid) return <Navigate to="/en" replace />;
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">{c.common.skip}</a>
      <ScrollProgress />
      <Header />
      <main id="main" key={location.pathname} className="anim-page"><Suspense fallback={<PageLoader />}><Outlet /></Suspense></main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => { loadPublicVendors(); }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to={`/${i18n.language === 'hi' ? 'hi' : 'en'}`} replace />} />
        <Route path="/admin/*" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="ppp-model" element={<Ppp />} />
          <Route path="cluster-centre" element={<Cluster />} />
          <Route path="gaushala-fertilizer" element={<Gaushala />} />
          <Route path="e-auto-delivery" element={<EAuto />} />
          <Route path="amul-parlour-cafe" element={<Amul />} />
          <Route path="enzybiotic-power-pro" element={<Enzy />} />
          <Route path="biogas-cbg" element={<Biogas />} />
          <Route path="gaushala-tourism" element={<GaushalaTourism />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/:id" element={<ProductDetail />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/:id" element={<SupplierDetail />} />
          <Route path="vendor/:id" element={<SupplierDetail />} />
          <Route path="sourcing" element={<Sourcing />} />
          <Route path="business-connect" element={<BusinessConnect />} />
          <Route path="events" element={<Events />} />
          <Route path="join-us" element={<Join />} />
          <Route path="partners-investors" element={<Partners />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="states-map" element={<StatesMap />} />
          <Route path="fpo-registration" element={<FpoReg />} />
          <Route path="ngo-registration" element={<NgoRegistration />} />
          <Route path="vendor-registration" element={<VendorReg />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="career" element={<Career />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}