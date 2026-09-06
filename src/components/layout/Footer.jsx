import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { ArrowUpRight, Mail } from 'lucide-react';

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

const SOCIAL_LINKS = [
  {
    href: 'https://www.linkedin.com',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
    color: 'hover:text-[#0077B5] hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30',
  },
  {
    href: 'https://www.youtube.com',
    label: 'YouTube',
    Icon: FaYoutube,
    color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30',
  },
  {
    href: 'https://www.instagram.com',
    label: 'Instagram',
    Icon: FaInstagram,
    color: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] pt-12 sm:pt-16 pb-8 sm:pb-12">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-10 border-b border-slate-200/70">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col lg:col-span-4 lg:pr-8">
            <Link to="/" className="mb-4 inline-block">
              <img src="/idms_logo.svg" alt="IDMS Infotech" className="h-10 w-auto sm:h-12" />
            </Link>
            <h3 className="!text-[17px] font-bold text-[#0B0F19] tracking-tight mb-2">
              Driving Intelligent Growth
            </h3>
            <p className="!text-[14px] text-[#64748B] leading-relaxed mb-6 max-w-sm">
              Smart ERP built for real-world operations, eliminating silos and enabling real-time enterprise control.
            </p>
            
            <div>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white !text-[14px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="lg:col-span-3">
            <p className="!text-[15px] font-bold text-[#0B0F19] tracking-tight mb-4">
              Solutions
            </p>
            <ul className="space-y-3">
              {SOLUTIONS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="!text-[14px] text-[#64748B] hover:text-[#2563EB] hover:translate-x-0.5 transition-all duration-150 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="lg:col-span-3">
            <p className="!text-[15px] font-bold text-[#0B0F19] tracking-tight mb-4">
              Industries
            </p>
            <ul className="space-y-3">
              {INDUSTRIES.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="!text-[14px] text-[#64748B] hover:text-[#2563EB] hover:translate-x-0.5 transition-all duration-150 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect with Us */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <p className="!text-[15px] font-bold text-[#0B0F19] tracking-tight mb-4">
                Connect with Us
              </p>
              <ul className="space-y-2.5 mb-6">
                {SOCIAL_LINKS.map(({ href, label, Icon, color }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 !text-[14px] text-[#64748B] hover:text-[#0B0F19] transition-colors py-1"
                    >
                      <span className={`w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 flex items-center justify-center transition-all ${color}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium group-hover:text-[#0B0F19] transition-colors">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 pt-2 text-[#64748B] !text-[13px]">
              <a
                href="mailto:info@idmsinfotech.com"
                className="flex items-center gap-2 text-[#64748B] hover:text-[#2563EB] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>info@idmsinfotech.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 !text-[13px] text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-4 text-[#64748B]">
            <Link to="/contact" className="hover:text-[#0B0F19] transition-colors">
              Privacy Policy
            </Link>
            <span className="h-3 w-px bg-slate-200" aria-hidden />
            <Link to="/contact" className="hover:text-[#0B0F19] transition-colors">
              Terms of Use
            </Link>
            <span className="h-3 w-px bg-slate-200" aria-hidden />
            <Link to="/contact" className="hover:text-[#0B0F19] transition-colors">
              Security
            </Link>
          </div>

          <p className="text-[#64748B] text-center sm:text-right">
            © {currentYear} IDMS Infotech Private Limited. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
