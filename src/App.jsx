import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Platform from './pages/Platform';
import Technology from './pages/Technology';
import About from './pages/About';
import Contact from './pages/Contact';
import SolutionsPage from './pages/SolutionsPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Preloader from './components/Preloader';
import LazyClickSpark from './components/ui/LazyClickSpark';
import {
  PRELOADER_REMOVE_AT_MS,
  PRELOADER_REVEAL_CONTENT_AT_MS,
  PRELOADER_SLIDE_MS,
} from './constants/preloaderTiming';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // After logo finishes + hold, slide splash up and fade the site in (see preloaderTiming.js)
    const reveal = setTimeout(() => {
      setLoaded(true);
    }, PRELOADER_REVEAL_CONTENT_AT_MS);

    const remove = setTimeout(() => {
      setShowPreloader(false);
    }, PRELOADER_REMOVE_AT_MS);

    return () => {
      clearTimeout(reveal);
      clearTimeout(remove);
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader isExiting={loaded} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity ${PRELOADER_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.28, 1)`,
          visibility: loaded ? 'visible' : 'hidden',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Router>
          <LazyClickSpark
            sparkOnLightBackground="#00b3ff"
            sparkOnDarkBackground="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <ScrollToTop />
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<PageLayout />}>
                <Route index element={<Home />} />
                <Route path="platform" element={<Platform />} />
                <Route path="technology" element={<Technology />} />
                <Route path="about" element={<About />} />
                <Route path="solutions" element={<SolutionsPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="industries" element={<IndustriesPage />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPostDetail />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </LazyClickSpark>
        </Router>
      </div>
    </>
  );
}

export default App;
