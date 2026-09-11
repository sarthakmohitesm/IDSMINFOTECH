import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { HiStar, HiArrowRight, HiArrowLeft, HiXMark, HiArrowUpRight } from 'react-icons/hi2';
import { Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    type: 'Specific',
    text: "I was impressed by their ability to understand my initial concept and translate it into a functional application.",
    author: "Nilesh Joshi",
    company: "Rangavishwa Enterprises",
    accent: "#2563EB"
  },
  {
    type: 'Specific',
    text: "Managing multiple plants and teams was getting out of hand. With IDMS Smart ERP, we now track everything in one place with live dashboards and custom reports. Productivity has jumped, and we're finally in control.",
    author: "Uttam Gurjar",
    company: "Multi-location Enterprise",
    accent: "#2563EB"
  },
  {
    type: 'Generic',
    text: "Partnering with IDMS to develop HRMS was a turning point for our business. The system brought structure to our operations and gave us the confidence to scale without worrying about backend chaos.",
    author: "Shailendra Dhamdhere",
    company: "TalentCo HR Services LLP",
    accent: "#2563EB"
  },
  {
    type: 'Generic',
    text: "We were looking for a reliable solution that could grow with us, and IDMS doesn't just meet our needs — it exceeds them in every way.",
    author: "Devendra Pawar",
    company: "Pune Metal Works",
    accent: "#2563EB"
  },
  {
    type: 'Specific',
    text: "We were hesitant about switching to ERP, but IDMS made the transition smooth. Their system is intuitive, and their support is outstanding. It feels like the software was built just for us.",
    author: "Chetan Singrodia",
    company: "Industrial Manufacturing Unit",
    accent: "#2563EB"
  },
  {
    type: 'Generic',
    text: "IDMS's Smart ERP gave us visibility, control, and peace of mind. Managing multiple functions from a single platform has saved us countless hours and reduced operational errors.",
    author: "M Sudarshan",
    company: "Integral Labels",
    accent: "#2563EB"
  },
  {
    type: 'Generic',
    text: "The Smart ERP from IDMS Infotech has added real value to how we run our organization. From day one, it helped bring clarity to our workflows and made our teams more productive.",
    author: "Sanjeev Manan",
    company: "Continental Electrical Industries Pvt Ltd",
    accent: "#2563EB"
  }
];

/* ─── Single Testimonial Card ─── */
const TestimonialCard = ({ testimonial, isCenter, onClick, index }) => {
  return (
    <motion.div
      onClick={onClick}
      layout
      className={`
        relative rounded-2xl bg-white flex flex-col justify-between overflow-hidden cursor-pointer
        transition-all duration-500 ease-out transform-gpu select-none
        ${isCenter
          ? 'shadow-[0_20px_60px_rgba(37,99,235,0.13),0_4px_20px_rgba(15,23,42,0.08)] border-2 border-blue-200/60 z-20'
          : 'shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-slate-200/80 z-10 hover:shadow-[0_12px_35px_rgba(15,23,42,0.1)]'
        }
      `}
      style={{
        width: isCenter ? '380px' : '320px',
        minHeight: isCenter ? '320px' : '280px',
        padding: isCenter ? '32px' : '28px',
      }}
    >
      {/* Subtle top gradient on center card */}
      {isCenter && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 rounded-t-2xl" />
      )}

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Quote Icon + Rating Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className={`
              flex items-center justify-center rounded-lg border
              ${isCenter
                ? 'w-10 h-10 bg-blue-600 border-blue-600'
                : 'w-9 h-9 bg-blue-50 border-blue-100'
              }
            `}>
              <Quote className={`${isCenter ? 'w-5 h-5 text-white' : 'w-4 h-4 text-blue-600'}`} />
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={isCenter ? 18 : 16} className="text-amber-400" />
              ))}
            </div>
          </div>
          <span className={`
            font-bold bg-slate-50 border border-slate-200/80 rounded-full
            ${isCenter ? 'text-[14px] px-3 py-1 text-[#0B0F19]' : 'text-[13px] px-2.5 py-0.5 text-[#0B0F19]'}
          `}>
            5.0
          </span>
        </div>

        {/* Testimonial Quote */}
        <p className={`
          text-[#4B5563] font-normal leading-[1.75] mb-6 overflow-hidden
          ${isCenter ? 'text-[15px] line-clamp-6' : 'text-[14px] line-clamp-4'}
        `}>
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-3.5 mt-auto border-t border-slate-100 pt-5">
        <div className={`
          rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shadow-sm shrink-0
          ${isCenter ? 'w-12 h-12' : 'w-10 h-10'}
        `}>
          <span className={`font-bold text-white uppercase ${isCenter ? 'text-[17px]' : 'text-[15px]'}`}>
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <div className={`font-semibold text-[#0B0F19] truncate ${isCenter ? 'text-[15px]' : 'text-[14px]'}`}>
            {testimonial.author}
          </div>
          <div className={`text-[#64748B] font-medium mt-0.5 truncate ${isCenter ? 'text-[12px]' : 'text-[11px]'}`}>
            {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Testimonial Section ─── */
export default function TestimonialSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start with 2nd card centered
  const totalPages = Math.ceil(TESTIMONIALS.length / 3);
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate which cards are visible (show 3-4 at a time, center one is elevated)
  const getVisibleCards = useCallback(() => {
    const visibleCount = 4; // Show 4 cards at a time
    const startIdx = Math.max(0, activeIndex - 1);
    const cards = [];

    for (let i = 0; i < visibleCount; i++) {
      const idx = startIdx + i;
      if (idx < TESTIMONIALS.length) {
        cards.push({
          testimonial: TESTIMONIALS[idx],
          originalIndex: idx,
          isCenter: idx === activeIndex,
        });
      }
    }
    return cards;
  }, [activeIndex]);

  const scrollLeft = () => {
    setActiveIndex((prev) => {
      const newIdx = Math.max(0, prev - 1);
      setCurrentPage(Math.floor(newIdx / 3));
      return newIdx;
    });
  };

  const scrollRight = () => {
    setActiveIndex((prev) => {
      const newIdx = Math.min(TESTIMONIALS.length - 1, prev + 1);
      setCurrentPage(Math.floor(newIdx / 3));
      return newIdx;
    });
  };

  const goToPage = (page) => {
    const newIdx = Math.min(page * 3 + 1, TESTIMONIALS.length - 1);
    setActiveIndex(newIdx);
    setCurrentPage(page);
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-28 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #f8faff 30%, #eef2ff 50%, #f5f7ff 70%, #f0f4ff 100%)',
      }}
    >
      {/* ─── Decorative Background Elements ─── */}
      {/* Top-right blurred circle */}
      <div
        className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Bottom-left blurred circle */}
      <div
        className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full opacity-[0.1] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Mid-right floating circle */}
      <div
        className="absolute top-1/2 -right-10 w-[200px] h-[200px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Subtle floating dots */}
      <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-blue-300/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-32 right-[25%] w-3 h-3 rounded-full bg-indigo-300/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-28 left-[40%] w-2.5 h-2.5 rounded-full bg-blue-400/15 pointer-events-none" aria-hidden="true" />

      {/* Subtle connection lines / decorative streaks */}
      <div
        className="absolute top-[15%] right-[10%] w-[120px] h-[1px] opacity-[0.08] pointer-events-none rotate-[-20deg]"
        style={{ background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] left-[8%] w-[80px] h-[1px] opacity-[0.08] pointer-events-none rotate-[25deg]"
        style={{ background: 'linear-gradient(90deg, transparent, #818cf8, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        {/* ─── HEADER ─── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-200/80 bg-blue-50/70 text-blue-700 text-[12px] font-semibold tracking-wider uppercase mb-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Client Success</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-[32px] sm:text-[44px] font-extrabold tracking-tight text-[#0B0F19] leading-[1.12]"
              >
                Trusted by <span className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] bg-clip-text text-transparent">Industry Leaders</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[15px] sm:text-[16px] text-[#64748B] mt-2 max-w-xl"
              >
                Real feedback from enterprises that transformed their operations with IDMS Smart ERP.
              </motion.p>
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2.5 pb-2 shrink-0">
              <button
                type="button"
                onClick={scrollLeft}
                disabled={activeIndex <= 0}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-300
                  ${activeIndex <= 0
                    ? 'border-slate-200/60 bg-slate-50 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200/90 bg-white text-[#0B0F19] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)]'
                  }
                `}
              >
                <HiArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                disabled={activeIndex >= TESTIMONIALS.length - 1}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-300
                  ${activeIndex >= TESTIMONIALS.length - 1
                    ? 'border-slate-200/60 bg-slate-50 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200/90 bg-white text-[#0B0F19] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)]'
                  }
                `}
              >
                <HiArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── CARDS CAROUSEL ─── */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="flex items-center justify-center gap-6 lg:gap-8 overflow-hidden py-8">
            <AnimatePresence mode="popLayout">
              {visibleCards.map(({ testimonial, originalIndex, isCenter }) => (
                <motion.div
                  key={originalIndex}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.85,
                    scale: isCenter ? 1.05 : 0.95,
                    y: isCenter ? -12 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.85, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="shrink-0"
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isCenter={isCenter}
                    index={originalIndex}
                    onClick={() => setSelectedTestimonial(testimonial)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-[40px] lg:w-[80px] bg-gradient-to-r from-[#f0f4ff] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[40px] lg:w-[80px] bg-gradient-to-l from-[#f0f4ff] to-transparent z-20 pointer-events-none" />
        </div>

        {/* ─── PAGINATION DOTS ─── */}
        <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
          {Array.from({ length: totalPages }).map((_, page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              className={`
                rounded-full transition-all duration-400 ease-out
                ${currentPage === page
                  ? 'w-8 h-3 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] shadow-[0_2px_8px_rgba(37,99,235,0.35)]'
                  : 'w-3 h-3 bg-slate-300/70 hover:bg-slate-400/80'
                }
              `}
              aria-label={`Go to page ${page + 1}`}
            />
          ))}
        </div>

        {/* ─── Mobile Navigation ─── */}
        <div className="flex md:hidden justify-center gap-3 mt-6 px-4">
          <button
            type="button"
            onClick={scrollLeft}
            disabled={activeIndex <= 0}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all
              ${activeIndex <= 0
                ? 'border-slate-200/60 bg-slate-50 text-slate-300 cursor-not-allowed'
                : 'border-slate-200/90 bg-white text-[#0B0F19] active:bg-[#2563EB] active:text-white'
              }
            `}
          >
            <HiArrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            disabled={activeIndex >= TESTIMONIALS.length - 1}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all
              ${activeIndex >= TESTIMONIALS.length - 1
                ? 'border-slate-200/60 bg-slate-50 text-slate-300 cursor-not-allowed'
                : 'border-slate-200/90 bg-white text-[#0B0F19] active:bg-[#2563EB] active:text-white'
              }
            `}
          >
            <HiArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ─── Side Drawer Modal ─── */}
      <AnimatePresence>
        {selectedTestimonial && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="fixed top-[65px] left-0 right-0 bottom-0 bg-[#0B0F19]/50 backdrop-blur-[3px] z-[100]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-[75px] md:top-[85px] right-2 md:right-6 bottom-2 md:bottom-6 w-[calc(100%-16px)] md:w-[360px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.2)] z-[101] flex flex-col overflow-hidden rounded-2xl border border-slate-200/60"
            >
              {/* Top Banner Area */}
              <div className="relative h-[220px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] flex-shrink-0 flex items-center justify-center overflow-hidden">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-5 right-5 w-9 h-9 bg-white/15 hover:bg-white text-white hover:text-[#2563EB] rounded-lg flex items-center justify-center transition-all z-10 backdrop-blur-sm"
                >
                  <HiXMark size={20} strokeWidth={1} />
                </button>

                {/* Subtle grid in banner */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                  }}
                />

                {/* Glowing Center Core */}
                <div className="relative z-10 mt-4">
                  <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full scale-[2]" />
                  <div className="w-[90px] h-[90px] rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.25)] border border-white/30 rotate-[8deg] transform hover:rotate-0 transition-transform duration-500">
                    <span className="text-[40px] font-bold text-white uppercase" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
                      {selectedTestimonial.author.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Stars in banner */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1 z-10">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} size={18} className="text-amber-300" />
                  ))}
                </div>
              </div>

              {/* Detailed Content Area */}
              <div className="flex-1 p-7 sm:p-8 overflow-y-auto bg-white flex flex-col justify-between" style={{ scrollbarWidth: 'thin' }}>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-200/80 bg-blue-50/70 text-blue-700 text-[11px] font-semibold tracking-wider uppercase mb-4">
                    <Sparkles className="w-3 h-3" />
                    <span>Success Story</span>
                  </div>

                  <div className="text-[15px] text-[#4B5563] leading-[1.75] font-normal" style={{ whiteSpace: 'pre-line' }}>
                    {selectedTestimonial.text}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <span className="text-[18px] font-bold text-white uppercase">{selectedTestimonial.author.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-[#0B0F19]">{selectedTestimonial.author}</div>
                    <div className="text-[13px] text-[#64748B] font-medium mt-0.5 leading-tight">
                      {selectedTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
