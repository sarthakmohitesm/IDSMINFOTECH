import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Paperclip, Check, ChevronDown, Mail, User, Building2, Phone, MessageSquare, ArrowRight, MapPin, Clock, Send } from 'lucide-react';
import OfficeLocationMap from './OfficeLocationMap';
import countryData from '../utils/country.json';
import flagUs from '../assets/4x3/us.svg';
import flagGb from '../assets/4x3/gb.svg';
import flagIn from '../assets/4x3/in.svg';
import flagAu from '../assets/4x3/au.svg';
import flagDe from '../assets/4x3/de.svg';
import flagJp from '../assets/4x3/jp.svg';
import { buildContactPayload, postContact } from '../api/contact.js';

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

/** Field icon helper */
function FieldIcon({ children }) {
  return (
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center justify-center">
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded border border-slate-200/90 bg-white pl-10 pr-4 py-3 text-[14px] text-[#0B0F19] outline-none transition-all duration-200 placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10';

export default function ContactFormSection() {
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((country) => country.iso === 'in') || COUNTRIES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitState === 'submitting' || submitState === 'success') return;

    const form = e.currentTarget;
    setSubmitState('submitting');
    setSubmitError('');

    try {
      const payload = buildContactPayload(form, selectedCountry);
      await postContact(payload);
      setSubmitState('success');
      form.reset();
      setFileName('');
      window.setTimeout(() => setSubmitState('idle'), 3600);
    } catch (err) {
      setSubmitState('idle');
      setSubmitError(err instanceof Error ? err.message : 'Could not send your message.');
      window.setTimeout(() => setSubmitError(''), 8000);
    }
  };

  return (
    <section
      className="relative w-full bg-[#F8FAFC] py-12 lg:py-16 overflow-hidden flex items-center justify-center"
      aria-label="Contact our team"
    >
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Card Container */}
        <div className="rounded bg-white border border-slate-200/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* ─── LEFT COLUMN: Info & Map (5 cols) ─── */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Section Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2.5 mb-2.5"
                >
                  <div className="w-6 h-[2.5px] bg-[#2563EB] rounded-full" />
                  <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#2563EB]">
                    Let's Connect
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="text-[32px] sm:text-[38px] font-extrabold tracking-tight text-[#0B0F19] leading-[1.15] mb-2.5"
                >
                  Get in <span className="text-[#2563EB]">Touch</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[13px] sm:text-[14px] text-[#64748B] leading-relaxed mb-6 max-w-[500px]"
                >
                  Tell us about your possibilities — we'll help you streamline processes, improve visibility, and scale with clarity.
                </motion.p>

                {/* ─── 3 Info Items Row (Always 3 Columns Side-by-Side) ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="grid grid-cols-3 gap-2 sm:gap-3 mb-6"
                >
                  {/* Email Us */}
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Mail className="w-[15px] h-[15px] text-[#2563EB]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium tracking-wide">Email Us</p>
                      <p className="text-[11px] sm:text-[12px] font-semibold text-[#0B0F19] truncate" title="info@idmsinfotech.com">
                        info@domaintech.com
                      </p>
                    </div>
                  </div>

                  {/* Visit Us */}
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-[15px] h-[15px] text-[#2563EB]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium tracking-wide">Visit Us</p>
                      <p className="text-[11px] sm:text-[12px] font-semibold text-[#0B0F19] leading-tight">
                        Pune, Maharashtra,<br className="hidden sm:inline" /> India
                      </p>
                    </div>
                  </div>

                  {/* Quick Response */}
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Clock className="w-[15px] h-[15px] text-[#2563EB]" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium tracking-wide">Quick Response</p>
                      <p className="text-[11px] sm:text-[12px] font-semibold text-[#0B0F19] leading-tight">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Map Container */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full flex-1 min-h-[230px] lg:min-h-[250px] relative overflow-hidden rounded border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.05)]"
              >
                <OfficeLocationMap />
              </motion.div>
            </div>

            {/* ─── RIGHT COLUMN: Form Card (7 cols or equal) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-6 flex flex-col justify-between"
            >
              <div>
                {/* Form Header with Paper Plane Icon */}
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-full bg-blue-50/80 border border-blue-100/60 flex items-center justify-center shrink-0 text-[#2563EB]">
                    <Send className="w-5 h-5 -rotate-12 translate-x-0.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-[21px] sm:text-[23px] font-bold text-[#0B0F19] leading-snug">
                      Send us a message
                    </h3>
                    <p className="text-[13px] text-[#94A3B8] mt-0.5 leading-relaxed">
                      We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form className="flex flex-col relative" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3.5">

                    {/* Row 1: Full Name + Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <FieldIcon><User className="w-[15px] h-[15px]" strokeWidth={1.75} /></FieldIcon>
                        <input name="fullName" required className={inputClass} placeholder="Full Name *" />
                      </div>
                      <div className="relative">
                        <FieldIcon><Building2 className="w-[15px] h-[15px]" strokeWidth={1.75} /></FieldIcon>
                        <input name="company" required className={inputClass} placeholder="Company Name *" />
                      </div>
                    </div>

                    {/* Row 2: Email + Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Email */}
                      <div className="relative">
                        <FieldIcon><Mail className="w-[15px] h-[15px]" strokeWidth={1.75} /></FieldIcon>
                        <input name="email" type="email" required className={inputClass} placeholder="Email *" />
                      </div>

                      {/* Contact Number with Integrated Flag Selector */}
                      <div className="relative flex items-center rounded border border-slate-200/90 bg-white transition-all duration-200 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10">
                        {/* Phone icon */}
                        <div className="pl-3.5 text-[#94A3B8] pointer-events-none flex items-center">
                          <Phone className="w-[15px] h-[15px]" strokeWidth={1.75} />
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
                            <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full mt-2 w-[220px] bg-white border border-slate-200 rounded shadow-[0_12px_32px_rgba(15,23,42,0.12)] z-40 overflow-hidden py-1"
                              >
                                {COUNTRIES.map((country) => (
                                  <button
                                    key={country.iso}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="flex items-center w-full px-3 py-2 text-left text-[13px] hover:bg-blue-50/70 transition-colors"
                                  >
                                    <img
                                      src={getFlagSrc(country.iso)}
                                      width="18"
                                      height="13"
                                      alt={country.name}
                                      className="h-[13px] w-[18px] shrink-0 mr-2.5 rounded-[2px] shadow-sm"
                                    />
                                    <span className="w-[36px] font-semibold text-[#0B0F19]">{country.code}</span>
                                    <span className="text-[#64748B] truncate">{country.name}</span>
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
                          className="w-full bg-transparent pr-3 py-3 text-[14px] text-[#0B0F19] outline-none placeholder:text-[#94A3B8]"
                          placeholder="Contact Number *"
                        />
                      </div>
                    </div>

                    {/* Row 3: Project Description */}
                    <div className="relative">
                      <div className="absolute left-3.5 top-3.5 text-[#94A3B8] pointer-events-none">
                        <MessageSquare className="w-[15px] h-[15px]" strokeWidth={1.75} />
                      </div>
                      <textarea
                        name="requirement"
                        required
                        className={`${inputClass} min-h-[110px] resize-y pt-3 pl-10 rounded`}
                        placeholder="Describe the Project *"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="mt-2.5 text-[13px] font-medium text-red-600" role="alert">
                      {submitError}
                    </p>
                  )}

                  {/* Row 4: Attach File + Submit Button */}
                  <div className="flex items-center justify-between mt-5 gap-4">
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded border border-slate-200/90 bg-white px-4 sm:px-5 py-2.5 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:border-[#2563EB] hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
                    >
                      <Paperclip className="w-4 h-4" strokeWidth={1.75} />
                      <span className="truncate max-w-[140px] sm:max-w-[200px]">
                        {fileName || 'Attach File'}
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitState === 'submitting' || submitState === 'success'}
                      className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-2.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.35)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {submitState === 'idle' ? (
                        <>
                          <span>Submit</span>
                          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                        </>
                      ) : submitState === 'submitting' ? (
                        <span>Sending…</span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-4 h-4" strokeWidth={2.5} />
                          Sent!
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Success Overlay */}
                  <AnimatePresence>
                    {submitState === 'success' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="text-center flex flex-col items-center"
                        >
                          <div className="flex bg-green-500 rounded-full p-2.5 mb-3 shadow-sm">
                            <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
                          </div>
                          <p className="text-[15px] font-bold text-[#0B0F19]">Received Successfully</p>
                          <p className="text-[13px] text-[#64748B] mt-0.5">Our team will get back to you shortly.</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
