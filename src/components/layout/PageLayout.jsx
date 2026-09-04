import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CTASection from '../CTASection';

export default function PageLayout() {
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isContactPage && <CTASection />}
      <Footer />
    </div>
  );
}
