import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Paperclip, Check, ChevronDown, Factory, Truck, Package, Cpu } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import OfficeLocationMap, { OFFICE_ADDRESS_LINES } from '../components/OfficeLocationMap';
import countryData from '../utils/country.json';
import flagUs from '../assets/4x3/us.svg';
import flagGb from '../assets/4x3/gb.svg';
import flagIn from '../assets/4x3/in.svg';
import flagAu from '../assets/4x3/au.svg';
import flagDe from '../assets/4x3/de.svg';
import flagJp from '../assets/4x3/jp.svg';
import submitBtnSvg from '../assets/shapes/submit-btn.svg';
import waveRight from '../assets/shapes/wave-right.svg';

const CONTACT_EMAIL = 'samarth@idmsinfotech.com';

const inputClass =
  'contact-form-field w-full rounded-[5px] border border-solid border-[#1e82e6] bg-white px-4 py-3 text-[14px] leading-normal text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[14px] placeholder:text-gray-500 focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.25)]';

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

const LABEL_CLASS =
  'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500';

const SOCIAL_TILE =
  'flex h-11 w-11 items-center justify-center rounded border border-gray-400/50 bg-white/70 text-gray-800 shadow-sm transition-colors hover:border-[#122a66] hover:text-[#122a66] sm:h-12 sm:w-12';

const SOCIAL_LINKS = [
  { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: '#', label: 'YouTube', Icon: FaYoutube },
  { href: '#', label: 'Instagram', Icon: FaInstagram },
];

const INDUSTRIES = [
  'Manufacturing',
  'Printing & Packaging',
  'Coating & Adhesives',
  'Plastic Moulding',
  'Logistics / Trading',
  'Other',
];

export default function Contact() {
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((country) => country.iso === 'in') || COUNTRIES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const industryDropdownRef = useRef(null);

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

      const subject = `New Business Inquiry - ${fullName} (${company})`;
      const bodyLines = [
        `Full Name: ${fullName}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Industry: ${selectedIndustry || 'Not Selected'}`,
        `Budget: ${budget || 'Not Provided'}`,
        '',
        'Requirements:',
        requirement
      ];

      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      // Open the user's default mail client
      window.location.href = mailtoLink;

      // Set UI to success state
      setSubmitState('success');
      form.reset();
      setSelectedIndustry('');
      window.setTimeout(() => setSubmitState('idle'), 3600);
    } catch (err) {
      setSubmitState('idle');
      setSubmitError('An error occurred. Please try again or email us directly.');
      window.setTimeout(() => setSubmitError(''), 8000);
    }
  };

  return (
    <div className="relative z-0 bg-white pt-[65px] font-noto-sans">
      <section
        className="relative z-0 w-full overflow-hidden px-4 pb-8 pt-0 lg:px-[80px] lg:pb-12 lg:pt-1"
        aria-label="Contact our team"
      >
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full flex-col lg:w-1/2 lg:-translate-y-3">
            <h1 className="mb-1 text-[40px] font-semibold leading-tight tracking-tight text-[#122a66]">
              Start the conversation
            </h1>
            <div className="mb-4 space-y-2">
              <p className="max-w-[600px] text-[18px] font-medium leading-relaxed text-gray-900">
                Tell us about your operations — we&apos;ll help you streamline processes, improve
                visibility, and scale with clarity.
              </p>
            </div>

            <div className="mb-8 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-3.5 w-3.5 text-green-700" strokeWidth={3.5} />
                </div>
                <span className="text-[14px] font-medium text-gray-700">Trusted by manufacturing teams</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-3.5 w-3.5 text-green-700" strokeWidth={3.5} />
                </div>
                <span className="text-[14px] font-medium text-gray-700">Faster ERP deployment cycles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-3.5 w-3.5 text-green-700" strokeWidth={3.5} />
                </div>
                <span className="text-[14px] font-medium text-gray-700">Built for real operations</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-x-12 gap-y-6 md:gap-x-16">
              <div>
                <div className="mb-2">
                  <span className="text-[15px] font-medium text-gray-500">Prefer email? Reach us at:</span>
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="w-fit border-b-2 border-gray-900 pb-1 text-[22px] font-medium text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600 inline-block"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div>
                <span className="text-[15px] font-medium text-gray-500">Connect with us</span>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className={SOCIAL_TILE}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-[22px] font-semibold text-[#122a66]">Visit our office</h2>
              <p className="text-[14px] font-medium leading-relaxed text-gray-900 mb-6">
                {OFFICE_ADDRESS_LINES.map((line, i) => (
                  <span key={line} className={i === 0 ? "text-[16px] font-bold text-[#ff0096]" : ""}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>

            {/* One positioning context for map + socials so wave % heights match CTASection (not a tiny socials-only box). */}
            <div className="relative isolate mt-2 w-full">
              <div className="relative z-10 flex min-h-[310px] w-full flex-1 flex-col bg-white rounded-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <div className="relative min-h-[310px] w-full flex-1 overflow-hidden rounded-[5px] border-2 border-[#1e82e6] bg-[#eef4fb]">
                  <OfficeLocationMap hideAddressFooter />
                </div>
              </div>

              <img
                src={waveRight}
                alt=""
                className="pointer-events-none absolute -bottom-[95%] -right-[65%] z-0 h-[min(283.36%,888px)] w-auto max-w-[min(152.77vw,1380px)] translate-x-[min(38vw,300px)] select-none object-contain object-right-bottom sm:translate-x-[min(48vw,400px)] lg:translate-x-[min(58vw,520px)]"
                decoding="async"
                aria-hidden
              />

            </div>
          </div>

          <div className="flex w-full flex-col lg:w-1/2">
            <div className="mb-6">
              <p className="text-[18px] font-semibold text-[#122a66]">Talk to our team — get a tailored walkthrough of Smart ERP for your operations.</p>
            </div>
            <form
              className="contact-page-form relative flex flex-col text-[14px] leading-normal"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-[10px] text-[14px]">
                <input name="fullName" required className={inputClass} placeholder="Full Name *" />
                <input name="company" required className={inputClass} placeholder="Company Name *" />
                <input name="email" type="email" required className={inputClass} placeholder="Email *" />

                <div className="flex gap-[10px]">
                  <div className="relative shrink-0 w-[95px] sm:w-[110px]" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex w-full items-center justify-between rounded-[5px] border border-solid border-[#1e82e6] bg-white px-2 py-3 text-[14px] font-medium leading-normal text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 sm:px-3 ${isDropdownOpen ? 'border-[#0E81FA] shadow-[0_0_0_3px_rgba(14,129,250,0.25)]' : 'hover:border-[#1e82e6] focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.25)]'}`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <img
                          src={getFlagSrc(selectedCountry.iso)}
                          width="20"
                          height="14"
                          alt={selectedCountry.name}
                          className="h-[14px] w-[20px] shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)]"
                        />
                        <span className="text-[14px] font-semibold leading-normal">
                          {selectedCountry.code}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
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
                              className="flex w-full items-center justify-start px-4 py-2.5 text-left text-[14px] leading-normal transition-colors hover:bg-gray-50"
                            >
                              <img
                                src={getFlagSrc(country.iso)}
                                width="20"
                                height="14"
                                alt={country.name}
                                className="h-[14px] w-[20px] shrink-0 mr-3 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.35)]"
                              />
                              <span className="w-[40px] text-[14px] font-semibold leading-normal text-gray-900">
                                {country.code}
                              </span>
                              <span className="ml-1 text-[14px] leading-normal text-gray-500">
                                {country.name}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className={`${inputClass} flex-1`}
                    placeholder="Contact Number *"
                  />
                </div>

                <div className="relative w-full" ref={industryDropdownRef}>
                  <input type="hidden" name="industry" value={selectedIndustry} />
                  <button
                    type="button"
                    onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                    className={`flex w-full items-center justify-between rounded-[5px] border border-solid border-[#1e82e6] bg-white px-4 py-3 text-[14px] leading-normal outline-none transition-[border-color,box-shadow] duration-200 ${isIndustryDropdownOpen ? 'border-[#0E81FA] shadow-[0_0_0_3px_rgba(14,129,250,0.25)]' : 'hover:border-[#1e82e6] focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.25)]'}`}
                  >
                    <span className={`text-[14px] leading-normal ${selectedIndustry ? 'text-gray-900 font-medium' : 'text-gray-500 font-normal'}`}>
                      {selectedIndustry || 'Industry (optional)'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${isIndustryDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isIndustryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-[5px] shadow-lg z-30 overflow-hidden"
                      >
                        {INDUSTRIES.map((industry) => (
                          <button
                            key={industry}
                            type="button"
                            onClick={() => {
                              setSelectedIndustry(industry);
                              setIsIndustryDropdownOpen(false);
                            }}
                            className="flex w-full items-center justify-start px-4 py-2.5 text-left text-[14px] leading-normal transition-colors hover:bg-gray-50"
                          >
                            <span className="text-[14px] font-medium leading-normal text-gray-900">
                              {industry}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <textarea
                  name="requirement"
                  required
                  className={`${inputClass} min-h-[140px] resize-none`}
                  placeholder="Tell us about your operations / requirements *"
                />

                <div className="flex gap-[10px]">
                  <input name="budget" className={`${inputClass} flex-1`} placeholder="Estimated Budget (optional)" />

                  <div className="relative flex group shrink-0">
                    <button
                      type="button"
                      className="flex min-h-[48px] flex-col items-center justify-center rounded-[5px] border border-solid border-[#1e82e6] bg-white px-4 text-[14px] leading-normal text-gray-600 transition-[border-color,box-shadow,color] duration-200 hover:border-[#0E81FA] hover:text-[#0E81FA] focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.2)] focus:outline-none sm:flex-row sm:px-6"
                    >
                      <Paperclip className="mb-1 h-[18px] w-[18px] sm:mb-0" strokeWidth={2.25} />
                      <span className="text-[14px] font-medium leading-normal text-inherit sm:ml-2">
                        Attach
                      </span>
                    </button>
                    <div className="pointer-events-none absolute bottom-full right-0 z-20 mb-3 hidden w-[220px] rounded bg-gray-900 p-2.5 text-center text-[14px] leading-normal text-white shadow-md group-hover:block">
                      Attach any relevant documents.
                      <br />
                      Maximum 10mb.
                      <div className="absolute -bottom-1 right-6 sm:right-10 w-2.5 h-2.5 bg-gray-900 rotate-45 transform" />
                    </div>
                  </div>
                </div>
              </div>

              {submitError ? (
                <p className="mt-2 text-[14px] font-medium leading-snug text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
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
                    className="group relative inline-flex items-center justify-center transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {submitState === 'idle' ? (
                      <img src={submitBtnSvg} alt="Submit" className="h-[35px] w-auto" />
                    ) : submitState === 'submitting' ? (
                      <span className="flex h-[35px] min-w-[120px] items-center justify-center rounded-[5px] bg-[#1e82e6] px-6 text-[14px] font-semibold text-white shadow-md">Sending…</span>
                    ) : (
                      <span className="flex h-[35px] min-w-[120px] items-center justify-center rounded-[5px] bg-green-500 px-6 text-[14px] font-semibold text-white shadow-md">Sent!</span>
                    )}
                  </button>
                </div>
              </div>

              {/* What happens next block */}
              <div className="mt-10 rounded-[5px] bg-gray-50 p-6 border border-gray-200/60 shadow-sm">
                <h3 className="text-[14px] font-bold text-[#122a66] mb-4">What happens next?</h3>
                <ul className="flex flex-col gap-3.5 text-[14px] font-medium text-gray-700">
                  <li className="flex gap-3 items-start">
                    <span className="flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded-full bg-[#1e82e6] text-[11px] font-bold text-white shadow-sm">1</span>
                    <span className="leading-snug">Our team reviews your requirements</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded-full bg-[#1e82e6] text-[11px] font-bold text-white shadow-sm">2</span>
                    <span className="leading-snug">We schedule a quick discovery call</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded-full bg-[#1e82e6] text-[11px] font-bold text-white shadow-sm">3</span>
                    <span className="leading-snug">You get a tailored ERP walkthrough</span>
                  </li>
                </ul>
              </div>

              <AnimatePresence>
                {submitState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-[6px] rounded-[5px]"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center flex flex-col items-center max-w-[320px] bg-white rounded shadow-[0_12px_40px_-10px_rgba(30,130,230,0.15)] border border-gray-100 p-8"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 mb-5 relative">
                        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping" />
                        <Check className="h-7 w-7 text-green-600" strokeWidth={3} />
                      </div>
                      <h4 className="mb-2 text-[20px] font-bold leading-tight text-[#122a66] tracking-tight">
                        Request Sent
                      </h4>
                      <p className="text-[15px] leading-relaxed text-gray-600">
                        Our ERP specialists will step in right away. We'll be in touch shortly.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
