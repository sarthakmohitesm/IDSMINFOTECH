import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Paperclip, Check, ChevronDown, Mail, User, Building2, AtSign, Phone, FileText, DollarSign, ArrowRight } from 'lucide-react';
import OfficeLocationMap from './OfficeLocationMap';
import countryData from '../utils/country.json';
import flagUs from '../assets/4x3/us.svg';
import flagGb from '../assets/4x3/gb.svg';
import flagIn from '../assets/4x3/in.svg';
import flagAu from '../assets/4x3/au.svg';
import flagDe from '../assets/4x3/de.svg';
import flagJp from '../assets/4x3/jp.svg';
import { buildContactPayload, postContact } from '../api/contact.js';

const CONTACT_EMAIL = 'info@idmsinfotech.com';

/** Unified input class matching the main page theme */
const inputClass =
  'contact-form-field w-full rounded border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] leading-normal text-[#0B0F19] outline-none transition-[border-color,box-shadow] duration-200 [font-size:16px] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]';

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

/** Icon wrapper for form fields */
function FieldIcon({ children }) {
  return (
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
      {children}
    </div>
  );
}

export default function ContactFormSection() {
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((country) => country.iso === 'in') || COUNTRIES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      window.setTimeout(() => setSubmitState('idle'), 3600);
    } catch (err) {
      setSubmitState('idle');
      setSubmitError(err instanceof Error ? err.message : 'Could not send your message.');
      window.setTimeout(() => setSubmitError(''), 8000);
    }
  };

  return (
    <section
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
      aria-label="Contact our team"
    >
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none opacity-30"
        aria-hidden="true"
      />

      {/* Ambient Glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-b from-blue-100/30 via-sky-50/15 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px]">
        {/* White Card Container */}
        <div className="rounded bg-white border border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.06)] p-8 sm:p-10 lg:p-14">
        <div className="flex flex-col lg:flex-row items-start w-full gap-12 lg:gap-16">

          {/* ─── LEFT SIDE ─── */}
          <div className="flex flex-col w-full lg:w-1/2">
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[2px] bg-[#2563EB] rounded-full" />
              <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#2563EB]">
                Let's Connect
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[36px] sm:text-[44px] font-extrabold tracking-tight text-[#0B0F19] leading-[1.12] mb-4"
            >
              Get in <span className="text-[#2563EB]">Touch</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed max-w-[480px] mb-6"
            >
              Tell us about your operations — we'll help you streamline processes,
              improve visibility, and scale with clarity.
            </motion.p>

            {/* Email */}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 group mb-8 w-fit"
            >
              <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-all duration-200">
                <Mail className="w-[18px] h-[18px] text-[#2563EB] group-hover:text-white transition-colors duration-200" />
              </div>
              <span className="text-[16px] font-semibold text-[#0B0F19] group-hover:text-[#2563EB] transition-colors duration-200">
                {CONTACT_EMAIL}
              </span>
            </motion.a>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 min-h-[280px] lg:min-h-[320px] w-full"
            >
              <div className="relative h-full min-h-[280px] lg:min-h-[320px] w-full overflow-hidden rounded border border-slate-200/90 bg-slate-50 shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
                <OfficeLocationMap />
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT SIDE: Form Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col w-full lg:w-1/2"
          >

              <form className="flex flex-col relative text-[16px] leading-normal [font-size:16px]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3.5 text-[16px] [font-size:16px]">

                  {/* Full Name */}
                  <div className="relative">
                    <FieldIcon><User className="w-[16px] h-[16px]" strokeWidth={1.5} /></FieldIcon>
                    <input name="fullName" required className={inputClass} placeholder="Full Name *" />
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <FieldIcon><Building2 className="w-[16px] h-[16px]" strokeWidth={1.5} /></FieldIcon>
                    <input name="company" required className={inputClass} placeholder="Company Name *" />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <FieldIcon><AtSign className="w-[16px] h-[16px]" strokeWidth={1.5} /></FieldIcon>
                    <input name="email" type="email" required className={inputClass} placeholder="Email *" />
                  </div>

                  {/* Phone Row */}
                  <div className="flex gap-3">
                    {/* Country Code Dropdown */}
                    <div className="relative shrink-0 w-[105px] sm:w-[120px]" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex w-full items-center justify-between rounded border bg-white px-3 py-3.5 text-[14px] font-medium leading-normal text-[#0B0F19] outline-none transition-[border-color,box-shadow] duration-200 [font-size:16px] ${isDropdownOpen ? 'border-[#2563EB] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]' : 'border-slate-200/90 hover:border-slate-300 focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]'}`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                           <img
                             src={getFlagSrc(selectedCountry.iso)}
                             width="20"
                             height="14"
                             alt={selectedCountry.name}
                             className="h-[14px] w-[20px] shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.25)]"
                           />
                           <span className="text-[14px] leading-normal font-semibold [font-size:14px]">{selectedCountry.code}</span>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 top-full mt-2 w-[240px] bg-white border border-slate-200 rounded shadow-[0_12px_32px_rgba(15,23,42,0.12)] z-30 overflow-hidden"
                          >
                            {COUNTRIES.map((country) => (
                              <button
                                key={country.iso}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsDropdownOpen(false);
                                }}
                                className="flex items-center justify-start w-full px-4 py-2.5 text-left text-[14px] leading-normal hover:bg-blue-50/60 transition-colors [font-size:14px]"
                              >
                                <img
                                  src={getFlagSrc(country.iso)}
                                  width="20"
                                  height="14"
                                  alt={country.name}
                                  className="h-[14px] w-[20px] shrink-0 mr-3 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.25)]"
                                />
                                <span className="w-[40px] font-semibold text-[14px] leading-normal text-[#0B0F19] [font-size:14px]">{country.code}</span>
                                <span className="ml-1 text-[14px] leading-normal text-[#64748B] [font-size:14px]">{country.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Phone Input */}
                    <div className="relative flex-1">
                      <FieldIcon><Phone className="w-[16px] h-[16px]" strokeWidth={1.5} /></FieldIcon>
                      <input name="phone" type="tel" required className={inputClass} placeholder="Contact Number *" />
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-4 text-[#94A3B8] pointer-events-none">
                      <FileText className="w-[16px] h-[16px]" strokeWidth={1.5} />
                    </div>
                    <textarea
                      name="requirement"
                      required
                      className={`${inputClass} min-h-[120px] resize-y pt-3.5`}
                      placeholder="Describe the Project *"
                    />
                  </div>

                  {/* Budget + Attach */}
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <FieldIcon><DollarSign className="w-[16px] h-[16px]" strokeWidth={1.5} /></FieldIcon>
                      <input name="budget" className={inputClass} placeholder="Estimated Budget" />
                    </div>

                    <div className="relative flex group shrink-0">
                      <button
                        type="button"
                        className="flex min-h-[48px] items-center gap-2 rounded border border-slate-200/90 bg-white px-5 text-[14px] leading-normal text-[#64748B] transition-all duration-200 hover:border-[#2563EB] hover:text-[#2563EB] focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] focus:outline-none [font-size:14px]"
                      >
                        <Paperclip className="w-[16px] h-[16px]" strokeWidth={1.5} />
                        <span className="font-medium">Attach</span>
                      </button>
                      {/* Tooltip */}
                      <div className="absolute right-0 bottom-full z-20 mb-3 hidden w-[220px] rounded bg-[#0B0F19] p-2.5 text-center text-[13px] leading-normal text-white shadow-lg pointer-events-none [font-size:13px] group-hover:block">
                        Attach any relevant documents.<br />Maximum 10mb.
                        <div className="absolute -bottom-1 right-6 sm:right-10 w-2.5 h-2.5 bg-[#0B0F19] rotate-45 transform"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {submitError ? (
                  <p className="mt-3 text-[14px] font-medium leading-snug text-red-600" role="alert">
                    {submitError}
                  </p>
                ) : null}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitState === 'submitting' || submitState === 'success'}
                  aria-label={
                    submitState === 'submitting'
                      ? 'Submitting'
                      : submitState === 'success'
                        ? 'Sent'
                        : 'Submit contact form'
                  }
                  className="group mt-5 inline-flex items-center justify-center gap-2 w-fit px-8 py-3.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitState === 'idle' ? (
                    <>
                      <span>Submit</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </>
                  ) : submitState === 'submitting' ? (
                    <span>Sending…</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                      Sent!
                    </span>
                  )}
                </button>

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
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-center flex flex-col items-center"
                      >
                        <div className="flex bg-green-500 rounded-full p-3 mb-4 shadow-sm">
                          <Check className="h-6 w-6 text-white" strokeWidth={3} />
                        </div>
                        <p className="mb-1 text-[16px] font-bold leading-normal text-[#0B0F19] [font-size:16px]">Received Successfully</p>
                        <p className="text-[14px] leading-normal text-[#64748B] [font-size:14px]">Our team will get back to you shortly.</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

          </motion.div>

        </div>
        </div>
      </div>
    </section>
  );
}
