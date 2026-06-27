import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import WhatsAppPopup from './components/WhatsAppPopup'
import CookieConsent from './components/CookieConsent'
import PageSkeleton from './components/PageSkeleton'

import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))

const ContactRedirect = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || localStorage.getItem('referral_code') || sessionStorage.getItem('referral_code');
    let message = "Hi CodeHTML, I am interested in your development services. I'd like to get started on discussing our custom project requirements.";
    if (ref) {
      message += ` (Referral Code: ${ref})`;
    }
    window.location.replace(`https://wa.me/919303228082?text=${encodeURIComponent(message)}`);
  }, []);
  return null;
};


const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'))
const CityHome = lazy(() => import('./pages/CityHome'))
const FAQ = lazy(() => import('./pages/FAQ'))
const GrowthGuide = lazy(() => import('./pages/GrowthGuide'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const RecoverPage = lazy(() => import('./pages/RecoverPage'))
const HirePage = lazy(() => import('./pages/HirePage'))
const TechStackPage = lazy(() => import('./pages/TechStackPage'))
const IndustryCountryPage = lazy(() => import('./pages/IndustryCountryPage'))
const Locations = lazy(() => import('./pages/Locations'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Refund = lazy(() => import('./pages/Refund'))
const AgencyPartner = lazy(() => import('./pages/AgencyPartner'))
const PricingGuideDubai = lazy(() => import('./pages/PricingGuideDubai'))
const Pricing = lazy(() => import('./pages/Pricing'))
const RestaurantWebsiteDubai = lazy(() => import('./pages/services/RestaurantWebsiteDubai'))
const ClinicWebsiteDubai = lazy(() => import('./pages/services/ClinicWebsiteDubai'))
const RealEstateWebsiteDubai = lazy(() => import('./pages/services/RealEstateWebsiteDubai'))
const Resources = lazy(() => import('./pages/Resources'))
// New Restructured Categories Templates
const ProductsIndex = lazy(() => import('./pages/products/ProductsIndex'))
const ProductDetail = lazy(() => import('./pages/products/ProductDetail'))
const AISolutionsIndex = lazy(() => import('./pages/ai-solutions/AISolutionsIndex'))
const AISolutionDetail = lazy(() => import('./pages/ai-solutions/AISolutionDetail'))
const GetMoreCustomersIndex = lazy(() => import('./pages/get-more-customers/GetMoreCustomersIndex'))
const GetMoreCustomersDetail = lazy(() => import('./pages/get-more-customers/GetMoreCustomersDetail'))
const ServicesIndex = lazy(() => import('./pages/services-new/ServicesIndex'))
const ServiceDetailNew = lazy(() => import('./pages/services-new/ServiceDetailNew'))
const InstagramReels = lazy(() => import('./pages/InstagramReels'))
const PartnerDashboard = lazy(() => import('./pages/PartnerDashboard'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'))
const AdminPartners = lazy(() => import('./pages/admin/AdminPartners'))
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'))
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor'))
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolio'))
const AdminResources = lazy(() => import('./pages/admin/AdminResources'))
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const CompetitorAlternative = lazy(() => import('./pages/CompetitorAlternative'))
const WebDevDubaiPillar = lazy(() => import('./pages/WebDevDubaiPillar'))

// New SEO-optimized landing pages
const DubaiWebDevelopment = lazy(() => import('./pages/DubaiWebDevelopment'))
const DubaiMobileAppDevelopment = lazy(() => import('./pages/DubaiMobileAppDevelopment'))
const AppDeveloperNearMeDubai = lazy(() => import('./pages/AppDeveloperNearMeDubai'))
const CaseStudySwigato = lazy(() => import('./pages/CaseStudySwigato'))
const CaseStudyAlayaRealty = lazy(() => import('./pages/CaseStudyAlayaRealty'))
const CaseStudySLCC = lazy(() => import('./pages/CaseStudySLCC'))
const AboutCodeHTML = lazy(() => import('./pages/AboutCodeHTML'))
const HTMLDevelopmentServices = lazy(() => import('./pages/HTMLDevelopmentServices'))

// Component to scroll window to top on route change and persist referral codes
function ScrollToTop() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const refInUrl = params.get('ref');
    const refInStorage = localStorage.getItem('referral_code') || sessionStorage.getItem('referral_code');
    const isSpecialRoute = pathname.startsWith('/admin') || pathname.startsWith('/partner');

    if (refInUrl) {
      if (localStorage.getItem('referral_code') !== refInUrl) {
        localStorage.setItem('referral_code', refInUrl);
      }
      if (sessionStorage.getItem('referral_code') !== refInUrl) {
        sessionStorage.setItem('referral_code', refInUrl);
      }
    } else if (refInStorage && !isSpecialRoute) {
      params.set('ref', refInStorage);
      navigate({
        pathname,
        search: `?${params.toString()}`
      }, { replace: true });
    }
  }, [search, pathname, navigate]);

  // Global click interceptor to append partner referral code to outbound WhatsApp links
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      // Intercept wa.me links that target our contact number
      if (href && href.includes('wa.me/919303228082')) {
        const refCode = localStorage.getItem('referral_code') || sessionStorage.getItem('referral_code');
        if (refCode && !href.includes('referral') && !href.includes('ref=')) {
          e.preventDefault();
          
          try {
            const urlObj = new URL(href);
            let text = urlObj.searchParams.get('text') || '';
            if (text) {
              if (text.endsWith('.')) {
                text = text.slice(0, -1);
              }
              text += ` (Referral Code: ${refCode})`;
              urlObj.searchParams.set('text', text);
            } else {
              urlObj.searchParams.set('text', `Hi CodeHTML, I am interested in your development services. I'd like to get started on discussing our custom project requirements. (Referral Code: ${refCode})`);
            }
            
            const target = anchor.getAttribute('target');
            if (target === '_blank') {
              window.open(urlObj.toString(), '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = urlObj.toString();
            }
          } catch (err) {
            console.error("Failed to parse WhatsApp link URL:", err);
            const separator = href.includes('?') ? '&' : '?';
            const updatedHref = `${href}${separator}text=${encodeURIComponent(` (Referral Code: ${refCode})`)}`;
            const target = anchor.getAttribute('target');
            if (target === '_blank') {
              window.open(updatedHref, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = updatedHref;
            }
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}

// Redirect helpers for legacy URLs
function ServiceRedirect() {
  const { slug } = useParams();
  const mapping = {
    'custom-website-development': '/services/corporate-websites',
    'web-application-development': '/services/custom-web-applications',
    'saas-development': '/products/erp-system',
    'mobile-app-development': '/services/mobile-apps',
    'ai-automation': '/ai-solutions/ai-voice-chatbots',
    'startup-launch-services': '/services/digital-transformation-strategy',
    'growth-digital-presence': '/get-more-customers/website-seo',
  };
  const redirectUrl = mapping[slug] || '/services';
  return <Navigate to={redirectUrl} replace />;
}

function SectorRedirect() {
  const { slug } = useParams();
  const mapping = {
    'real-estate': '/products/crm-system',
    'hospitality': '/products/booking-system',
    'professional-services': '/services/corporate-websites',
    'e-commerce': '/products/online-store',
    'healthcare': '/products/hospital-system',
    'tech-startups': '/products/erp-system',
    'luxury-rentals': '/products/fleet-management',
    'family-offices': '/services/corporate-websites',
  };
  const redirectUrl = mapping[slug] || '/products';
  return <Navigate to={redirectUrl} replace />;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', background: '#fff' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="classic-theme min-h-screen flex flex-col">
          <Navbar />
          <WhatsAppPopup />
          <CookieConsent />
          <div className="flex-grow">
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<CaseStudy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostDetail />} />

                {/* New Restructured Category Routes */}
                <Route path="/products" element={<ProductsIndex />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/ai-solutions" element={<AISolutionsIndex />} />
                <Route path="/ai-solutions/:slug" element={<AISolutionDetail />} />
                <Route path="/get-more-customers" element={<GetMoreCustomersIndex />} />
                <Route path="/get-more-customers/:slug" element={<GetMoreCustomersDetail />} />
                <Route path="/services" element={<ServicesIndex />} />
                <Route path="/services/:slug" element={<ServiceDetailNew />} />

                {/* 301 Redirects for Legacy URLs */}
                <Route path="/service/:slug" element={<ServiceRedirect />} />
                <Route path="/sector/:slug" element={<SectorRedirect />} />
                <Route path="/services/saas-development" element={<Navigate to="/products/erp-system" replace />} />
                <Route path="/services/custom-software-development" element={<Navigate to="/services/corporate-websites" replace />} />

                {/* Standard Pages */}
                <Route path="/restaurant-website-design-dubai" element={<RestaurantWebsiteDubai />} />
                <Route path="/clinic-website-design-dubai" element={<ClinicWebsiteDubai />} />
                <Route path="/real-estate-website-design-dubai" element={<RealEstateWebsiteDubai />} />
                <Route path="/grow/:slug" element={<GrowthGuide />} />
                <Route path="/contact" element={<ContactRedirect />} />
                <Route path="/partner" element={<AgencyPartner />} />
                <Route path="/partner/dashboard" element={
                  <ProtectedRoute allowedRoles={['partner']}>
                    <PartnerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/terms-conditions" element={<Terms />} />
                <Route path="/refund-policy" element={<Refund />} />
                
                {/* Comparison Pages */}
                <Route path="/compare/:topic" element={<ComparePage />} />
                 
                 {/* Resources Pages */}
                 <Route path="/resources" element={<Resources />} />
                 <Route path="/instagram" element={<InstagramReels />} />
                 <Route path="/reels" element={<InstagramReels />} />
                  {/* Admin Panel Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="leads" element={<AdminLeads />} />
                    <Route path="partners" element={<AdminPartners />} />
                    <Route path="blogs" element={<AdminBlogs />} />
                    <Route path="blogs/new" element={<AdminBlogEditor />} />
                    <Route path="blogs/edit/:slug" element={<AdminBlogEditor />} />
                    <Route path="portfolio" element={<AdminPortfolio />} />
                    <Route path="resources" element={<AdminResources />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                
                {/* Niche Landing Pages */}
                <Route path="/recover/:slug" element={<RecoverPage />} />
                <Route path="/hire/:slug" element={<HirePage />} />
                <Route path="/tech/:slug" element={<TechStackPage />} />
                <Route path="/industry/:industry/:country" element={<IndustryCountryPage />} />
                <Route path="/:competitor-alternative" element={<CompetitorAlternative />} />
                <Route path="/webcastle-alternative" element={<CompetitorAlternative />} />
                <Route path="/web-development-dubai-guide" element={<WebDevDubaiPillar />} />
                
                {/* New High-Impact SEO Landing Pages */}
                <Route path="/dubai-web-development" element={<DubaiWebDevelopment />} />
                <Route path="/dubai-mobile-app-development" element={<DubaiMobileAppDevelopment />} />
                <Route path="/app-developer-near-me-dubai" element={<AppDeveloperNearMeDubai />} />
                <Route path="/case-study/swigato" element={<CaseStudySwigato />} />
                <Route path="/case-study/alaya-realty" element={<CaseStudyAlayaRealty />} />
                <Route path="/case-study/slcc" element={<CaseStudySLCC />} />
                <Route path="/about-codehtml" element={<AboutCodeHTML />} />
                <Route path="/html-development-services" element={<HTMLDevelopmentServices />} />
                
                {/* Locations Page */}
                <Route path="/locations" element={<Locations />} />
                
                {/* SEO Content Pages */}
                <Route path="/website-cost-in-dubai" element={<PricingGuideDubai />} />

                <Route path="/pricing" element={<Pricing />} />

                {/* Dynamic flat city pages matching /web-design-dubai */}
                <Route path="/:slug" element={<CityHome />} />
                
                {/* Legacy dynamic paths fallbacks */}
                <Route path="/area/:slug" element={<CityHome />} />
                <Route path="/city/:slug" element={<CityHome />} />
                <Route path="/ecommerce/:slug" element={<CityHome />} />
                <Route path="/whatsapp-bot/:slug" element={<CityHome />} />
                <Route path="/:serviceSlug/:sectorSlug/:slug" element={<CityHome />} />
              </Routes>
            </Suspense>
          </div>
          
          <Footer />
        </div>
      </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
