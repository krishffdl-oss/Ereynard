import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// ── Components ──
import Cursor from './components/Cursor.jsx';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ServiceModal from './components/ServiceModal.jsx';
import CampaignModal from './components/CampaignModal.jsx';
import Chatbot from './components/Chatbot.jsx';

// ── Pages ──
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ClientsPage from './pages/ClientsPage.jsx';
import BlogPage, { BlogPostPage } from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ROICalculatorPage from './pages/ROICalculatorPage.jsx';
import MarketingRoastPage from './pages/MarketingRoastPage.jsx'; // ← ADD KIYA

// ── Scroll restoration on route change ──
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

// ── Inner app (inside BrowserRouter) ──
function AppInner() {
  const [loaded, setLoaded] = useState(false);
  const [svcKey, setSvcKey] = useState(null);
  const [campKey, setCampKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const esc = e => {
      if (e.key === 'Escape') {
        setSvcKey(null);
        setCampKey(null);
        document.body.style.overflow = '';
      }
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (svcKey || campKey) ? 'hidden' : '';
  }, [svcKey, campKey]);

  const openSvc = useCallback(k => setSvcKey(k), []);
  const openCamp = useCallback(k => setCampKey(k), []);
  const openContact = useCallback(() => {
    navigate('/contact-us');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [navigate]);

  const pageProps = { openSvc, openCamp, openContact };

  return (
    <>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <ScrollToTop />
      <Header openContact={openContact} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage {...pageProps} />} />
          <Route path="/about-us" element={<AboutPage {...pageProps} />} />
          <Route path="/services" element={<ServicesPage {...pageProps} />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage {...pageProps} />} />
          <Route path="/projects" element={<ProjectsPage {...pageProps} />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/roi-calculator" element={<ROICalculatorPage />} />
          <Route path="/marketing-roast" element={<MarketingRoastPage />} /> {/* ← ADD KIYA */}
          <Route path="*" element={<HomePage {...pageProps} />} />
        </Routes>
      </main>
      <Footer openSvc={openSvc} />
      <Chatbot />
      {svcKey && <ServiceModal svcKey={svcKey} onClose={() => setSvcKey(null)} />}
      {campKey && <CampaignModal campKey={campKey} onClose={() => setCampKey(null)} />}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </HelmetProvider>
  );
}