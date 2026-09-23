import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Mail,
  User,
  Building2,
  Phone,
  MessageSquare,
  ArrowRight,
  MapPin,
  Clock,
  Send,
  Check,
  ChevronDown,
  Paperclip,
  X,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  Banknote,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import OfficeLocationMap, { OFFICE_ADDRESS_LINES, MAP_LINK } from '../components/OfficeLocationMap';
import countryData from '../utils/country.json';
import flagUs from '../assets/4x3/us.svg';
import flagGb from '../assets/4x3/gb.svg';
import flagIn from '../assets/4x3/in.svg';
import flagAu from '../assets/4x3/au.svg';
import flagDe from '../assets/4x3/de.svg';
import flagJp from '../assets/4x3/jp.svg';

const CONTACT_EMAIL = 'samarth@idmsinfotech.com';

const DIAL_CODE_MAP = {
  us: '+1',
  gb: '+44',
  in: '+91',
  au: '+61',
  de: '+49',
  jp: '+81',
};

const FLAG_SRC_MAP = {
  us: flagUs,
  gb: flagGb,
  in: flagIn,
  au: flagAu,
  de: flagDe,
  jp: flagJp,
};

const COUNTRIES = countryData
  .filter((country) => DIAL_CODE_MAP[country.code] && FLAG_SRC_MAP[country.code])
  .map((country) => ({
    iso: country.code,
    code: DIAL_CODE_MAP[country.code],
    name: country.name,
  }));

function getFlagSrc(iso) {
  return FLAG_SRC_MAP[iso] || '';
}

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/idms-infotech-pvt-ltd/', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://www.youtube.com/@idmsinfotech', label: 'YouTube', Icon: FaYoutube },
  { href: 'https://www.instagram.com/idmsinfotech/', label: 'Instagram', Icon: FaInstagram },
];

const INDUSTRIES = [
  'Discrete Manufacturing',
  'Process & Chemical Manufacturing',
  'Printing & Packaging',
  'Coating & Adhesives',
  'Plastic Moulding & Extrusion',
  'Automotive & Engineering',
  'Logistics / Trading',
  'Other Enterprise',
];

const KEY_BENEFITS = [
  'Customized module walkthrough for your plant',
  'Rapid zero-downtime migration strategy',
  'Direct access to senior ERP solution architects',
];

export default function Contact() {
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | success
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Country selector
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((country) => country.iso === 'in') || COUNTRIES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Industry selector
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const industryDropdownRef = useRef(null);

  // File attachment
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target)) {
        setIsIndustryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setSubmitError('File size exceeds 15MB limit. Please choose a smaller file.');
        return;
      }
      setSelectedFile(file);
      setSubmitError('');
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitState === 'submitting' || submitState === 'success') return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitState('submitting');
    setSubmitError('');

    try {
      const fullName = String(fd.get('fullName') ?? '').trim();
      const company = String(fd.get('company') ?? '').trim();
      const email = String(fd.get('email') ?? '').trim();
      const phoneInput = String(fd.get('phone') ?? '').trim();
      const requirement = String(fd.get('requirement') ?? '').trim();
      const budget = String(fd.get('budget') ?? '').trim();
      const phone = `${selectedCountry.code} ${phoneInput}`.trim();

      const subject = `Enterprise ERP Inquiry: ${fullName} (${company})`;
      const bodyLines = [
        `Dear Smart ERP Team,`,
        ``,
        `I would like to request an enterprise walkthrough for my operations:`,
        `----------------------------------------------------`,
        `Full Name:     ${fullName}`,
        `Company:       ${company}`,
        `Work Email:    ${email}`,
        `Contact Phone: ${phone}`,
        `Industry:      ${selectedIndustry || 'Not Specified'}`,
        `Budget/Scale:  ${budget || 'Not Provided'}`,
        `Attachment:    ${selectedFile ? selectedFile.name : 'None'}`,
        `----------------------------------------------------`,
        ``,
        `Operational Requirements / Goals:`,
        requirement,
        ``,
        `Thank you.`,
      ];

      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      // Open email client
      window.location.href = mailtoLink;

      setSubmitState('success');
      form.reset();
      setSelectedIndustry('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      window.setTimeout(() => setSubmitState('idle'), 4000);
    } catch (err) {
      setSubmitState('idle');
      setSubmitError('Unable to generate inquiry link. Please write directly to samarth@idmsinfotech.com');
      window.setTimeout(() => setSubmitError(''), 7000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-noto-sans text-[#0B0F19] pt-[72px] pb-16 lg:pb-24 overflow-hidden">
      {/* Background Subtle SaaS Grid - Matches Main Page */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Top Ambient Glows - Matches HeroSaaS on Main Page */}
      <div
        className="absolute -top-32 left-1/4 -translate-x-1/2 w-[600px] sm:w-[800px] h-[450px] bg-gradient-to-b from-blue-100/50 via-sky-50/25 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-pink-100/35 via-blue-50/20 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Page Header / Pill Badge ─── */}
        <div className="text-center max-w-3xl mx-auto pt-6 sm:pt-8 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-white/95 shadow-[0_2px_8px_rgba(37,99,235,0.08)] mb-4 text-[13px] font-semibold text-slate-700 backdrop-blur-sm select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
            </span>
            <span className="text-[#2563EB] font-bold uppercase tracking-wider text-[11px]">Direct Connection</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Enterprise Solution Architects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[34px] sm:text-[44px] lg:text-[48px] font-extrabold tracking-[-0.03em] text-[#0B0F19] leading-[1.12] mb-4"
          >
            Let&apos;s build your <span className="bg-gradient-to-r from-[#1e82e6] to-[#0083ff] bg-clip-text text-transparent">smart factory</span> operations.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[15px] sm:text-[17px] text-[#64748B] leading-relaxed max-w-2xl mx-auto"
          >
            Tell us about your production plants, supply chain, or workflows. We will guide you with a custom Smart ERP walkthrough tailored specifically to your operational scale.
          </motion.p>
        </div>

        {/* ─── Main Two-Column Container ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ═══════════ LEFT COLUMN: Channels & Headquarters (5 cols) ═══════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Channels Card */}
            <div className="rounded-2xl bg-white border border-slate-200/85 p-6 sm:p-7 shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#2563EB] mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                Direct Communication
              </h2>

              <div className="flex flex-col gap-4">
                {/* Email Card with Quick Copy */}
                <div className="group relative rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-white hover:shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#2563EB]">
                        <Mail className="w-[18px] h-[18px]" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                          Email Us Directly
                        </p>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="text-[15px] sm:text-[16px] font-bold text-[#0B0F19] transition-colors hover:text-[#2563EB] break-all inline-block mt-0.5"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy email to clipboard"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-[#2563EB] hover:border-blue-200 transition-colors shrink-0"
                    >
                      {copiedEmail ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {copiedEmail && (
                    <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
                      Copied email to clipboard!
                    </span>
                  )}
                </div>

                {/* Response Commitment Card */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#2563EB]">
                    <Clock className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                      Response Commitment
                    </p>
                    <p className="text-[14px] font-bold text-[#0B0F19] mt-0.5">
                      Within 2 business hours
                    </p>
                  </div>
                </div>

                {/* Rapid Assurance Points */}
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
                  {KEY_BENEFITS.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className="text-[13px] font-medium text-slate-700 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#64748B]">Connect with IDMS:</span>
                <div className="flex items-center gap-2.5">
                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg border border-slate-200/90 bg-white flex items-center justify-center text-slate-600 hover:text-[#2563EB] hover:border-blue-200 hover:shadow-sm transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Headquarters & Map Card */}
            <div className="rounded-2xl bg-white border border-slate-200/85 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#2563EB]">
                  <MapPin className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                      Global Headquarters
                    </p>
                    <a
                      href={MAP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] hover:underline"
                    >
                      <span>Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0B0F19] mt-0.5">
                    {OFFICE_ADDRESS_LINES[0]}
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mt-1">
                    {OFFICE_ADDRESS_LINES[1]}
                  </p>
                </div>
              </div>

              {/* Map Embed Container */}
              <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-slate-200/90 shadow-inner mt-1 bg-slate-100">
                <OfficeLocationMap hideAddressFooter />
              </div>
            </div>

          </div>

          {/* ═══════════ RIGHT COLUMN: Enterprise Demo / Inquiry Form (7 cols) ═══════════ */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-slate-200/85 p-6 sm:p-9 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-start gap-3.5 mb-7">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#2563EB] shadow-sm">
                  <Send className="w-5 h-5 -rotate-12 translate-x-0.5" strokeWidth={1.8} />
                </div>
                <div>
                  <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B0F19] tracking-tight leading-snug">
                    Request a Personalized Walkthrough
                  </h2>
                  <p className="text-[14px] text-[#64748B] mt-0.5 leading-relaxed">
                    Fill in your plant details below. Our technical specialists will respond with tailored workflow demonstrations.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
                
                {/* Row 1: Full Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#2563EB]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <User className="w-[17px] h-[17px]" strokeWidth={1.8} />
                      </div>
                      <input
                        name="fullName"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 pl-10 pr-4 py-3 text-[14px] text-[#0B0F19] placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company Name <span className="text-[#2563EB]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Building2 className="w-[17px] h-[17px]" strokeWidth={1.8} />
                      </div>
                      <input
                        name="company"
                        type="text"
                        required
                        placeholder="e.g. Apex Manufacturing Ltd"
                        className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 pl-10 pr-4 py-3 text-[14px] text-[#0B0F19] placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Work Email & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Work Email <span className="text-[#2563EB]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Mail className="w-[17px] h-[17px]" strokeWidth={1.8} />
                      </div>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="r.sharma@apexind.com"
                        className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 pl-10 pr-4 py-3 text-[14px] text-[#0B0F19] placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                      />
                    </div>
                  </div>

                  {/* Phone with Country Code Dropdown */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Contact Number <span className="text-[#2563EB]">*</span>
                    </label>
                    <div className="relative flex items-center rounded-xl border border-slate-200/90 bg-slate-50/50 transition-all duration-200 focus-within:bg-white focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10">
                      {/* Phone icon */}
                      <div className="pl-3.5 text-slate-400 pointer-events-none flex items-center">
                        <Phone className="w-[16px] h-[16px]" strokeWidth={1.8} />
                      </div>

                      {/* Country Flag Dropdown Trigger */}
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-1.5 pl-2.5 pr-2 py-3 text-[13px] font-semibold text-[#0B0F19] outline-none"
                        >
                          <img
                            src={getFlagSrc(selectedCountry.iso)}
                            width="18"
                            height="13"
                            alt={selectedCountry.name}
                            className="h-[13px] w-[18px] shrink-0 rounded-[2px] shadow-sm"
                          />
                          <span className="font-semibold text-slate-800">{selectedCountry.code}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 top-full mt-2 w-[230px] bg-white border border-slate-200 rounded-xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] z-40 overflow-hidden py-1"
                            >
                              {COUNTRIES.map((country) => (
                                <button
                                  key={country.iso}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="flex items-center w-full px-3.5 py-2 text-left text-[13px] hover:bg-blue-50/70 transition-colors"
                                >
                                  <img
                                    src={getFlagSrc(country.iso)}
                                    width="18"
                                    height="13"
                                    alt={country.name}
                                    className="h-[13px] w-[18px] shrink-0 mr-2.5 rounded-[2px] shadow-sm"
                                  />
                                  <span className="w-[36px] font-bold text-[#0B0F19]">{country.code}</span>
                                  <span className="text-slate-600 truncate">{country.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Phone Input */}
                      <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full bg-transparent pr-3 py-3 text-[14px] text-[#0B0F19] outline-none placeholder:text-slate-400"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Industry & Estimated Scale / Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Industry Dropdown */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Primary Industry
                    </label>
                    <div className="relative" ref={industryDropdownRef}>
                      <input type="hidden" name="industry" value={selectedIndustry} />
                      <button
                        type="button"
                        onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                        className={`flex w-full items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50/50 pl-3.5 pr-4 py-3 text-[14px] outline-none transition-all duration-200 ${
                          isIndustryDropdownOpen
                            ? 'bg-white border-[#2563EB] ring-4 ring-[#2563EB]/10'
                            : 'hover:border-slate-300 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Layers className="w-[16px] h-[16px] text-slate-400 shrink-0" strokeWidth={1.8} />
                          <span className={`truncate ${selectedIndustry ? 'text-[#0B0F19] font-medium' : 'text-slate-400'}`}>
                            {selectedIndustry || 'Select Industry (Optional)'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isIndustryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isIndustryDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] z-40 overflow-hidden py-1 max-h-60 overflow-y-auto"
                          >
                            {INDUSTRIES.map((ind) => (
                              <button
                                key={ind}
                                type="button"
                                onClick={() => {
                                  setSelectedIndustry(ind);
                                  setIsIndustryDropdownOpen(false);
                                }}
                                className="flex w-full items-center justify-start px-4 py-2.5 text-left text-[13px] hover:bg-blue-50/70 transition-colors text-slate-800 font-medium"
                              >
                                {ind}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Budget / Deployment Scale */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Plant Scale / Budget
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Banknote className="w-[17px] h-[17px]" strokeWidth={1.8} />
                      </div>
                      <input
                        name="budget"
                        type="text"
                        placeholder="e.g. 2 Plants / 150 Users"
                        className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 pl-10 pr-4 py-3 text-[14px] text-[#0B0F19] placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4: Operational Requirements */}
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Operational Requirements / Pain Points <span className="text-[#2563EB]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                      <MessageSquare className="w-[17px] h-[17px]" strokeWidth={1.8} />
                    </div>
                    <textarea
                      name="requirement"
                      required
                      rows={4}
                      placeholder="Describe your current production challenges, modules needed (e.g. inventory, batch tracking, multi-plant scheduling), or timeline..."
                      className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 pl-10 pr-4 pt-3.5 pb-3 text-[14px] text-[#0B0F19] placeholder:text-slate-400 outline-none resize-y min-h-[110px] transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                    />
                  </div>
                </div>

                {/* Row 5: Attachment & Submit Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                  {/* File input (Hidden) */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                  />

                  {/* Custom File Attachment Capsule */}
                  <div>
                    {selectedFile ? (
                      <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/80 px-3.5 py-2 text-[13px] font-semibold text-[#2563EB]">
                        <Paperclip className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[160px] sm:max-w-[200px]" title={selectedFile.name}>
                          {selectedFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="hover:text-red-600 transition-colors p-0.5 rounded-full hover:bg-blue-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-white px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:text-[#2563EB] hover:border-blue-200 transition-all focus:outline-none"
                      >
                        <Paperclip className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB]" strokeWidth={1.8} />
                        <span>Attach Specs / RFP</span>
                        <span className="text-[11px] text-slate-400">(Max 15MB)</span>
                      </button>
                    )}
                  </div>

                  {/* Primary CTA Submit Button - Matches Main Page Style */}
                  <button
                    type="submit"
                    disabled={submitState === 'submitting' || submitState === 'success'}
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1e82e6] to-[#0083ff] hover:from-[#1b76d1] hover:to-[#0074e0] text-white text-[15px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(30,130,230,0.3)] hover:shadow-[0_8px_24px_rgba(30,130,230,0.45)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none select-none"
                  >
                    {submitState === 'idle' ? (
                      <>
                        <span>Submit Walkthrough Request</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.2} />
                      </>
                    ) : submitState === 'submitting' ? (
                      <span>Opening Request…</span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                        Sent Successfully!
                      </span>
                    )}
                  </button>
                </div>

                {submitError && (
                  <p className="mt-2 text-[13px] font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100" role="alert">
                    {submitError}
                  </p>
                )}

                {/* ─── What happens next: Sleek Minimal Timeline ─── */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3.5">
                    <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
                      What Happens Next
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-md bg-blue-100 text-[#2563EB] text-[11px] font-bold flex items-center justify-center">01</span>
                        <span className="text-[12px] font-bold text-slate-800">Review</span>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-snug">Our ERP architect analyzes your plant requirements.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-md bg-blue-100 text-[#2563EB] text-[11px] font-bold flex items-center justify-center">02</span>
                        <span className="text-[12px] font-bold text-slate-800">Walkthrough</span>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-snug">30-min discovery call tailored to your operational workflows.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-md bg-blue-100 text-[#2563EB] text-[11px] font-bold flex items-center justify-center">03</span>
                        <span className="text-[12px] font-bold text-slate-800">Roadmap</span>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-snug">Clear module scope, integration plan, and timeline estimate.</p>
                    </div>
                  </div>
                </div>

                {/* Success Animation Overlay */}
                <AnimatePresence>
                  {submitState === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 flex items-center justify-center bg-white/95 backdrop-blur-md rounded-2xl p-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center flex flex-col items-center max-w-sm"
                      >
                        <div className="relative mb-4">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                            <Check className="w-8 h-8" strokeWidth={2.6} />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 animate-ping" />
                        </div>
                        <h3 className="text-[20px] font-bold text-[#0B0F19] tracking-tight mb-1.5">
                          Request Prepared
                        </h3>
                        <p className="text-[14px] text-[#64748B] leading-relaxed">
                          Your email client has opened with your requirements pre-filled. Our enterprise team will get in touch promptly.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
