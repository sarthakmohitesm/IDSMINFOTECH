import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import getInTouch from '../../assets/shapes/get-in-touch.svg';

/** Light drop-shadow on img — follows SVG alpha; matches CTASection. */
const CTA_IMG_SHADOW =
  'bg-transparent [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))]';

/** ~+1px vs h-[30px] — matches CTASection / Navbar CTA motion. */
const CTA_SVG_LINK =
  'inline-block w-fit origin-center leading-none transition-transform duration-200 ease-out hover:scale-[calc(31/30)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

const SOCIAL_LINKS = [
  { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: '#', label: 'YouTube', Icon: FaYoutube },
  { href: '#', label: 'Instagram', Icon: FaInstagram },
];

const COL_HEAD = 'mb-2 text-lg font-semibold text-[#515151] md:text-[18px]';
const LINK =
  'block text-[14px] leading-snug text-[#a8a8a8] hover:text-[#515151] md:text-[15px]';

/** `index.css` @layer base sets `a, span { font-size: 16px }` — override with important. */
const LEGAL_TEXT = '!text-[13px] leading-normal text-[#b7b7b7]';

const SOLUTIONS = [
  { label: 'ERP Implementation', to: '/services' },
  { label: 'Production Management', to: '/services' },
  { label: 'Asset Tracking', to: '/services' },
  { label: 'Maintenance Management', to: '/services' },
  { label: 'Quality Control', to: '/services' },
];

const INDUSTRIES = [
  { label: 'Printing & Packaging', to: '/industries' },
  { label: 'Coating & Adhesives', to: '/industries' },
  { label: 'Helmet Manufacturing', to: '/industries' },
  { label: 'Plastic Moulding', to: '/industries' },
  { label: 'HR Services', to: '/industries' },
];

/** Layered bands below the card — matches footer.svg rects (cls-16 → cls-13). */
function FooterBottomBands() {
  return (
    <div className="flex w-full flex-col gap-[2px]" aria-hidden>
      <div className="h-[3px] w-full bg-[#a1acff]/30" />
      <div className="h-[5px] w-full bg-[#a1acff]/50" />
      <div className="h-2 w-full bg-[#a1acff]/70" />
      <div className="h-4 w-full bg-[#a1acff] md:h-[15px]" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-[#ebebff]">
      <div
        className="pointer-events-none h-px w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
      {/* Same horizontal inset as Navbar: `px-4 lg:px-[80px]` */}
      <div className="px-4 pb-5 pt-5 lg:px-[80px] lg:pb-6 lg:pt-6">
        <div className="flex flex-col overflow-hidden rounded-[5px] border-[0.5px] border-solid border-[#97a8f2] bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 sm:gap-0 sm:px-5 sm:py-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,0.95fr)] lg:px-6 lg:py-5">
            <div className="flex flex-col justify-start sm:border-solid sm:border-[#dddddd]/50 sm:border-r-[0.5px] sm:pr-4 lg:pr-5">
              <Link to="/" className="mb-2 flex items-center gap-2">
                <img src="/idms_logo.svg" alt="IDMS Infotech" className="h-12 w-auto md:h-[52px]" />
              </Link>
              <p className="mb-1 text-base font-semibold leading-tight text-[#3a4b87] md:text-[17px]">
                Driving Intelligent Growth
              </p>
              <p className="mb-3 max-w-none text-[15px] leading-relaxed text-[#a8a8a8] md:text-[15px] whitespace-nowrap">
                Smart ERP built for real-world operations.
              </p>
              <Link to="/contact" aria-label="Get in Touch" className={CTA_SVG_LINK}>
                <img
                  src={getInTouch}
                  alt=""
                  width={183}
                  height={53}
                  className={`h-[33px] w-auto ${CTA_IMG_SHADOW}`}
                  decoding="async"
                />
              </Link>
            </div>

            <div className="sm:border-solid sm:border-[#dddddd]/50 sm:border-r-[0.5px] sm:pl-4 lg:pl-6">
              <p className={COL_HEAD}>Solutions</p>
              <ul className="space-y-2.5">
                {SOLUTIONS.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={LINK}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:border-solid sm:border-[#dddddd]/50 sm:border-r-[0.5px] sm:pl-4 lg:pl-6">
              <p className={COL_HEAD}>Industries</p>
              <ul className="space-y-2.5">
                {INDUSTRIES.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={LINK}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:pl-4 lg:pl-6">
              <p className={COL_HEAD}>Connect with Us</p>
              <ul className="space-y-2.5">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={`group ${LINK} flex items-center gap-2.5`}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <Icon
                        className="h-[15px] w-[15px] shrink-0 text-[#a8a8a8] md:h-4 md:w-4 group-hover:text-[#515151]"
                        aria-hidden
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="px-4 pt-0 sm:px-5 lg:px-6">
              <div className="h-[0.5px] w-full bg-[#dddddd]/50" aria-hidden />
            </div>
            <div className="flex flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:px-5 lg:px-6">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
                <Link to="/privacy-policy" className={`${LEGAL_TEXT} hover:text-[#515151]`}>
                  Privacy Policy
                </Link>
                <span className="h-3 w-[0.5px] shrink-0 bg-[#dddddd]/50" aria-hidden />
                <Link to="/terms" className={`${LEGAL_TEXT} hover:text-[#515151]`}>
                  Terms of Use
                </Link>
              </div>
              <span className={`text-center sm:text-right ${LEGAL_TEXT}`}>
                © 2026 IDMS Infotech Private Limited. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>

      <FooterBottomBands />
    </footer>
  );
}
