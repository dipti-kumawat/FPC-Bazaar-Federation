import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useC } from './i18n/hooks.jsx';
import { draftMode } from './config/site.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
import Admin from './admin/Admin.jsx';
import { loadPublicVendors } from './services/registry.js';
import About from './pages/About.jsx';
import Ppp from './pages/Ppp.jsx';
import Cluster from './pages/Cluster.jsx';
import Gaushala from './pages/Gaushala.jsx';
import EAuto from './pages/EAuto.jsx';
import Amul from './pages/Amul.jsx';
import Enzy from './pages/Enzy.jsx';
import Biogas from './pages/Biogas.jsx';
import Join from './pages/Join.jsx';
import Partners from './pages/Partners.jsx';
import Contact from './pages/Contact.jsx';
import Gallery from './pages/Gallery.jsx';
import { Services, Projects, StatesMap, FpoReg, VendorReg, Career } from './pages/Hubs.jsx';
import Privacy from './pages/Privacy.jsx';
import GaushalaTourism from './pages/GaushalaTourism.jsx';
import Marketplace from './pages/Marketplace.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Suppliers from './pages/Suppliers.jsx';
import SupplierDetail from './pages/SupplierDetail.jsx';
import Sourcing from './pages/Sourcing.jsx';
import BusinessConnect from './pages/BusinessConnect.jsx';
import Events from './pages/Events.jsx';
import NotFound from './pages/NotFound.jsx';

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
      {draftMode && <div className="bg-amber-300 px-4 py-2 text-center text-xs font-semibold text-amber-950 sm:text-sm">{c.common.draftBar}</div>}
      <ScrollProgress />
      <Header />
      <main id="main" key={location.pathname} className="anim-page"><Outlet /></main>
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
        <Route path="/admin/*" element={<Admin />} />
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