import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import idmsLogoOg from '../../assets/shapes/idms-logo-og.svg';
import smartErpLogoHeader from '../../assets/shapes/smart-erp-logo-header.svg';
import { NAV_LINKS, INDUSTRIES_MANUFACTURING_SUBLINKS, ABOUT_SUBLINKS } from './navigation';

const MEGA_MENU_LINK_CLASS =
  'block text-[15px] font-medium tracking-[0.06em] text-[#686868] transition-colors hover:text-[#2563EB]';

/** Three columns: up to 4 links each (same as Industries mega menu). */
function splitMegaMenuColumns(links) {
  return [links.slice(0, 4), links.slice(4, 8), links.slice(8, 12)];
}

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownHref, setOpenDropdownHref] = useState(null);
  const closeDropdownTimerRef = useRef(null);
  const location = useLocation();

  const clearCloseDropdownTimer = () => {
    if (closeDropdownTimerRef.current != null) {
      clearTimeout(closeDropdownTimerRef.current);
      closeDropdownTimerRef.current = null;
    }
  };

  const scheduleCloseDropdown = () => {
    clearCloseDropdownTimer();
    closeDropdownTimerRef.current = setTimeout(() => {
      setOpenDropdownHref(null);
      closeDropdownTimerRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => clearCloseDropdownTimer();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = Math.max(0, document.documentElement.scrollTop || window.scrollY);
      const windowHeight = Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
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
    if (closeDropdownTimerRef.current != null) {
      clearTimeout(closeDropdownTimerRef.current);
      closeDropdownTimerRef.current = null;
    }
    setOpenDropdownHref(null);
  }, [location.pathname]);

  const navLinks = NAV_LINKS;

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 flex flex-col">
        {/* Scroll Progress Bar at the very top */}
        <div className="w-full h-[4px] bg-[#DCF1FF]/60 backdrop-blur-md flex-shrink-0">
          <div
            className="h-full opacity-85 transition-all duration-[100ms] ease-out"
            style={{
              background: 'linear-gradient(to right, #2563EB, #0083FF)',
              width: `${scrollProgress}%`,
              clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 50%, calc(100% - 3px) 100%, 0 100%)',
              minWidth: scrollProgress > 0 ? '14px' : '0'
            }}
          />
        </div>

        {/* Main Header Container with Glass Effect */}
        <nav className="w-full h-[60px] bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-slate-200/50 shadow-[0_4px_20px_-2px_rgba(10,10,10,0.06)] flex items-center transition-all duration-300 relative z-50">
          <div className="w-full px-4 lg:px-[80px] flex items-center justify-between h-full">

            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 rounded-[4px] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              <img src={idmsLogoOg} alt="IDMS Infotech Logo" className="h-[42px] w-auto" />
            </Link>

            <div className="hidden lg:flex flex-1 items-center justify-end min-w-0 h-full pt-[2px] pl-6 xl:pl-8 gap-5 xl:gap-6">
              <div className="flex items-center gap-10 xl:gap-12 shrink-0">
                <Link
                  to="/platform"
                  className="flex shrink-0 items-center rounded-[4px] opacity-90 transition-all duration-200 ease-out hover:scale-[1.05] hover:opacity-100 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] pb-2"
                  aria-label="Smart ERP"
                >
                  <img src={smartErpLogoHeader} alt="" className="h-[23px] w-auto" aria-hidden />
                </Link>
                {navLinks.map((link) => {
                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                const dropdownOpen = link.hasDropdown && openDropdownHref === link.href;
                const megaChunks =
                  link.href === '/industries'
                    ? splitMegaMenuColumns(INDUSTRIES_MANUFACTURING_SUBLINKS)
                    : link.href === '/about'
                    ? splitMegaMenuColumns(ABOUT_SUBLINKS)
                    : null;

                  return (
                    <div
                      key={link.href}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => {
                        if (link.hasDropdown) {
                          clearCloseDropdownTimer();
                          setOpenDropdownHref(link.href);
                        }
                      }}
                      onMouseLeave={() => {
                        if (link.hasDropdown) {
                          scheduleCloseDropdown();
                        }
                      }}
                    >
                      <Link
                        to={link.href}
                        className={`enterprise-nav-link ${isActive ? 'active' : ''}`}
                      >
                        {link.label}
                        {link.hasDropdown && (
                          <ChevronDown
                            className={`w-[16px] h-[16px] ml-[6px] text-current transition-all duration-300 transform ${dropdownOpen ? 'opacity-100 rotate-180' : 'opacity-70'}`}
                            strokeWidth={2.5}
                          />
                        )}
                      </Link>

                      {/* Mega Menu Dropdown (Full Width Sheet) */}
                      {link.hasDropdown && (
                        <div
                          role="presentation"
                          onMouseEnter={() => {
                            clearCloseDropdownTimer();
                            setOpenDropdownHref(link.href);
                          }}
                          onMouseLeave={scheduleCloseDropdown}
                          className={`fixed top-[64px] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-[#e5e5e5]/80 shadow-[0_12px_32px_rgba(10,10,10,0.08)] transition-all duration-300 z-40 overflow-hidden before:content-[''] before:absolute before:left-0 before:right-0 before:-top-3 before:h-3 before:pointer-events-auto ${
                            dropdownOpen
                              ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                              : 'pointer-events-none invisible opacity-0 -translate-y-2'
                          }`}
                        >
                          <div className="w-full px-4 lg:px-[80px] py-8 mx-auto max-w-[1400px]">
                            {megaChunks && (
                              <div className="grid w-full max-w-[1024px] grid-cols-3 gap-x-10 lg:gap-x-14">
                                <div className="col-span-3 flex min-h-[44px] items-end pb-4">
                                  <Link to={link.href} className="group/all inline-flex items-center gap-2 transition-colors duration-200">
                                    <span className="flex items-center text-[18px] font-medium text-[#0F0F0F] group-hover/all:text-[#2563EB]">
                                      All {link.label}
                                    </span>
                                    <ArrowRight className="h-5 w-5 text-[#0F0F0F] transition-all duration-200 group-hover/all:translate-x-1.5 group-hover/all:text-[#2563EB]" strokeWidth={2.5} />
                                  </Link>
                                </div>
                                <div className="col-span-3 mb-5 h-px w-full bg-[#d2d2d2]" />
                                {megaChunks.map((columnItems, colIdx) => (
                                  <ul key={colIdx} className="min-w-0 space-y-4">
                                    {columnItems.map((sub) => (
                                      <li key={`${sub.href}-${sub.label}`}>
                                        <Link to={sub.href} className={MEGA_MENU_LINK_CLASS}>
                                          {sub.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2 xl:px-6 xl:py-2.5 rounded-full bg-gradient-to-r from-[#1e82e6] to-[#0083ff] text-white text-[14px] xl:text-[15px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(30,130,230,0.3)] hover:shadow-[0_6px_22px_rgba(30,130,230,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                aria-label="Request a demo"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </div>

            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-[#0F0F0F] hover:text-[#2563EB] focus:outline-none">
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="lg:hidden fixed top-[64px] left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/80 shadow-xl px-6 py-6 flex flex-col gap-7 z-40 max-h-[80vh] overflow-y-auto">
          <Link
            to="/platform"
            className="flex items-center justify-start rounded-[4px] opacity-90 transition-all duration-200 ease-out hover:opacity-100 active:scale-[0.98]"
            onClick={() => setIsOpen(false)}
            aria-label="Smart ERP"
          >
            <img src={smartErpLogoHeader} alt="" className="h-[42px] w-auto max-w-full" aria-hidden />
          </Link>
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-xl font-semibold ${location.pathname === link.href ? 'text-[#08137C]' : 'text-[#0F0F0F] hover:text-[#2563EB]'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100/80 mt-2 flex flex-col gap-4">
            <Link
              to="/contact"
              className="group flex w-full items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#1e82e6] to-[#0083ff] text-white text-[15px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(30,130,230,0.3)] hover:shadow-[0_6px_22px_rgba(30,130,230,0.45)] active:scale-[0.98] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              aria-label="Request a demo"
              onClick={() => setIsOpen(false)}
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
