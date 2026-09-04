import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import idmsLogoOg from '../assets/shapes/idms-logo-og.svg';
import smartErpLogoHeader from '../assets/shapes/smart-erp-logo-header.svg';

const TAB_LINK_CLASS =
  'rounded-[4px] px-1 py-1 text-[15px] font-medium tracking-[0.06em] text-[#686868] transition-colors duration-200 hover:text-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

const TAB_ACTIVE_CLASS = 'text-[#2563EB]';

const ADMIN_TABS = [
  { id: 'contacts', label: 'Contact leads' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'gallery', label: 'Gallery' },
];

export default function AdminNavbar({ activeTab, onTabChange, onLogout }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = Math.max(0, document.documentElement.scrollTop || window.scrollY);
      const windowHeight = Math.max(
        0,
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      );
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeTab]);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 flex flex-col">
        <div className="h-[5px] w-full shrink-0 bg-[#DCF1FF]">
          <div
            className="h-full opacity-70 transition-all duration-100 ease-out"
            style={{
              background: 'linear-gradient(to right, #2563EB, #0083FF)',
              width: `${scrollProgress}%`,
              clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 50%, calc(100% - 3px) 100%, 0 100%)',
              minWidth: scrollProgress > 0 ? '14px' : '0',
            }}
          />
        </div>

        <nav className="relative z-50 flex h-[60px] w-full items-center bg-white shadow-[0_2px_8px_rgba(10,10,10,0.1)] transition-all duration-300">
          <div className="flex h-full w-full items-center justify-between gap-3 px-4 lg:px-[80px]">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Link
                to="/"
                className="flex shrink-0 items-center gap-3 rounded-[4px] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <img src={idmsLogoOg} alt="IDMS Infotech" className="h-[42px] w-auto" />
              </Link>
              <span className="hidden h-8 w-px shrink-0 bg-gray-200 sm:block" aria-hidden />
              <Link
                to="/platform"
                className="hidden shrink-0 items-center rounded-[4px] opacity-90 transition-all duration-200 ease-out hover:scale-[1.05] hover:opacity-100 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:flex"
                aria-label="Smart ERP"
              >
                <img src={smartErpLogoHeader} alt="" className="h-[23px] w-auto" aria-hidden />
              </Link>
              <div className="hidden min-w-0 flex-col sm:flex lg:hidden">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Admin</span>
                <span className="truncate text-sm font-semibold text-[#122a66]">CMS</span>
              </div>
            </div>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-8 lg:flex xl:gap-10">
              {ADMIN_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onTabChange(t.id)}
                  className={`${TAB_LINK_CLASS} ${activeTab === t.id ? TAB_ACTIVE_CLASS : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className={`${TAB_LINK_CLASS} hidden sm:inline`}
              >
                View site
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="hidden items-center gap-2 rounded-[5px] border border-solid border-[#1e82e6] bg-white px-3 py-2 text-sm font-medium text-[#1e82e6] transition-[background-color,color,box-shadow] duration-200 hover:bg-[#eef4fb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:inline-flex"
              >
                <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Log out
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="inline-flex rounded-[4px] p-2 text-[#0F0F0F] transition-colors hover:text-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] lg:hidden"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {mobileOpen ? (
        <div className="fixed left-0 right-0 top-[65px] z-40 max-h-[80vh] overflow-y-auto border-t border-gray-100 bg-white px-6 py-6 shadow-xl lg:hidden">
          <div className="flex flex-col gap-5">
            {ADMIN_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onTabChange(t.id);
                  setMobileOpen(false);
                }}
                className={`text-left text-lg font-semibold ${activeTab === t.id ? 'text-[#08137C]' : 'text-[#0F0F0F] hover:text-[#2563EB]'}`}
              >
                {t.label}
              </button>
            ))}
            <Link
              to="/"
              className="text-lg font-semibold text-[#0F0F0F] hover:text-[#2563EB]"
              onClick={() => setMobileOpen(false)}
            >
              View site
            </Link>
            <div className="mt-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-[5px] border border-solid border-[#1e82e6] py-3 text-sm font-semibold text-[#1e82e6]"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
                Log out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
