import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Paperclip, Check, ChevronDown } from 'lucide-react';
import OfficeLocationMap from './OfficeLocationMap';
import countryData from '../utils/country.json';
import flagUs from '../assets/4x3/us.svg';
import flagGb from '../assets/4x3/gb.svg';
import flagIn from '../assets/4x3/in.svg';
import flagAu from '../assets/4x3/au.svg';
import flagDe from '../assets/4x3/de.svg';
import flagJp from '../assets/4x3/jp.svg';
import submitBtnSvg from '../assets/shapes/submit-btn.svg';
import { buildContactPayload, postContact } from '../api/contact.js';

const CONTACT_EMAIL = 'info@idmsinfotech.com';

/** Submit artwork (taller than footer CTA); shadows match CTASection / Footer. */
const SUBMIT_SVG_IMG =
  'block h-[40px] w-auto max-w-none shrink-0 object-contain bg-transparent transition-[filter] duration-200 ease-out [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))] group-hover:[filter:drop-shadow(0_2px_6px_rgb(15_23_42/0.16))_drop-shadow(0_8px_18px_rgb(30_58_138/0.14))]';

/** Scale on hover only — origin-bottom keeps baseline steady (no vertical jump). */
const SUBMIT_SVG_BUTTON_IDLE =
  'group mt-3 inline-block w-fit shrink-0 origin-bottom self-start border-0 bg-transparent p-0 leading-none transition-transform duration-200 ease-out hover:scale-[1.06] hover:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

const SUBMIT_SVG_BUTTON_BUSY =
  'mt-3 inline-flex h-[40px] shrink-0 items-center self-start border-0 bg-transparent p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] disabled:pointer-events-none disabled:opacity-60';

/** 16px values + placeholders; `rounded-[5px]` = 5px radius; placeholder sizing via .contact-form-field in index.css. */
const inputClass =
  'contact-form-field w-full rounded-[5px] border border-solid border-[#1e82e6] bg-white px-4 py-3 text-[14px] leading-normal text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 [font-size:16px] placeholder:text-gray-500 focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.25)]';

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
      className="relative w-full bg-white px-4 pb-10 pt-14 font-noto-sans lg:px-[80px] lg:pb-14 lg:pt-20"
      aria-label="Contact our team"
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-px"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
      <div className="flex flex-col lg:flex-row items-stretch w-full gap-12 lg:gap-16">

        {/* Left Side */}
        <div className="flex flex-col w-full lg:w-1/2 lg:-translate-y-3">
          <h2 className="text-[40px] tracking-tight font-semibold text-[#122a66] mb-1 leading-tight">
            Get in touch
          </h2>
          <div className="mb-3 space-y-2">
            <p className="text-[18px] text-gray-900 font-medium leading-relaxed max-w-[600px]">
              Tell us about your operations — we’ll help you streamline processes, improve visibility, and scale with clarity.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[22px] font-medium text-gray-900 border-b-2 border-gray-900 pb-1 w-fit hover:text-blue-600 hover:border-blue-600 transition-colors"
          >
            {CONTACT_EMAIL}
          </a>

          {/* Map: Maps JS API + styled JSON when VITE_GOOGLE_MAPS_API_KEY is set; else plain embed */}
          <div className="mt-4 flex min-h-[315px] w-full flex-1 flex-col">
            <div className="relative min-h-[315px] w-full flex-1 overflow-hidden rounded-[5px] border-2 border-[#1e82e6] bg-[#eef4fb]">
              <OfficeLocationMap />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col w-full lg:w-1/2">
          <form className="flex flex-col flex-1 relative text-[16px] leading-normal [font-size:16px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[10px] text-[16px] [font-size:16px]">
              <input name="fullName" required className={inputClass} placeholder="Full Name *" />
              <input name="company" required className={inputClass} placeholder="Company Name *" />
              <input name="email" type="email" required className={inputClass} placeholder="Email *" />

              <div className="flex gap-[10px]">
                <div className="relative shrink-0 w-[95px] sm:w-[110px]" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex w-full items-center justify-between rounded-[5px] border border-solid border-[#1e82e6] bg-white px-2 py-3 text-[16px] font-medium leading-normal text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 [font-size:16px] sm:px-3 ${isDropdownOpen ? 'border-[#0E81FA] shadow-[0_0_0_3px_rgba(14,129,250,0.25)]' : 'hover:border-[#1e82e6] focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.25)]'}`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                       <img
                         src={getFlagSrc(selectedCountry.iso)}
                         width="20"
                         height="14"
                         alt={selectedCountry.name}
                         className="h-[14px] w-[20px] shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)]"
                       />
                       <span className="text-[16px] leading-normal font-semibold [font-size:16px]">{selectedCountry.code}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-[240px] bg-white border border-gray-200 rounded-[5px] shadow-lg z-30 overflow-hidden"
                      >
                        {COUNTRIES.map((country) => (
                          <button
                            key={country.iso}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center justify-start w-full px-4 py-2.5 text-left text-[16px] leading-normal hover:bg-gray-50 transition-colors [font-size:16px]"
                          >
                            <img
                              src={getFlagSrc(country.iso)}
                              width="20"
                              height="14"
                              alt={country.name}
                              className="h-[14px] w-[20px] shrink-0 mr-3 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)]"
                            />
                            <span className="w-[40px] font-semibold text-[16px] leading-normal text-gray-900 [font-size:16px]">{country.code}</span>
                            <span className="ml-1 text-[16px] leading-normal text-gray-500 [font-size:16px]">{country.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <input name="phone" type="tel" required className={`${inputClass} flex-1`} placeholder="Contact Number *" />
              </div>

              <textarea
                name="requirement"
                required
                className={`${inputClass} min-h-[140px] resize-none`}
                placeholder="Describe the Project *"
              />

              <div className="flex gap-[10px]">
                <input name="budget" className={`${inputClass} flex-1`} placeholder="Estimated Budget" />

                <div className="relative flex group shrink-0">
                  <button
                    type="button"
                    className="flex min-h-[48px] flex-col items-center justify-center rounded-[5px] border border-solid border-[#1e82e6] bg-white px-4 text-[16px] leading-normal text-gray-600 transition-[border-color,box-shadow,color] duration-200 hover:border-[#0E81FA] hover:text-[#0E81FA] focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.2)] focus:outline-none [font-size:16px] sm:flex-row sm:px-6"
                  >
                    <Paperclip className="w-[18px] h-[18px] mb-1 sm:mb-0" strokeWidth={1.5} />
                    <span className="text-[15px] font-medium leading-normal text-inherit [font-size:14px] sm:ml-2">Attach</span>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute right-0 bottom-full z-20 mb-3 hidden w-[220px] rounded bg-gray-900 p-2.5 text-center text-[16px] leading-normal text-white shadow-md pointer-events-none [font-size:16px] group-hover:block">
                    Attach any relevant documents.<br />Maximum 10mb.
                    <div className="absolute -bottom-1 right-6 sm:right-10 w-2.5 h-2.5 bg-gray-900 rotate-45 transform"></div>
                  </div>
                </div>
              </div>
            </div>

            {submitError ? (
              <p className="mt-2 text-[15px] font-medium leading-snug text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}

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
              className={submitState === 'idle' ? SUBMIT_SVG_BUTTON_IDLE : SUBMIT_SVG_BUTTON_BUSY}
            >
              {submitState === 'idle' ? (
                <img
                  src={submitBtnSvg}
                  alt=""
                  width={188}
                  height={79}
                  className={SUBMIT_SVG_IMG}
                  decoding="async"
                />
              ) : submitState === 'submitting' ? (
                <span className="text-[16px] font-semibold text-[#1e82e6]">Sending…</span>
              ) : (
                <span className="text-[16px] font-semibold text-green-600">Sent!</span>
              )}
            </button>

            <AnimatePresence>
              {submitState === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg"
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
                    <p className="mb-1 text-[16px] font-bold leading-normal text-[#122a66] [font-size:16px]">Received Successfully</p>
                    <p className="text-[16px] leading-normal text-gray-600 [font-size:16px]">Our team will get back to you shortly.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>
    </section>
  );
}
