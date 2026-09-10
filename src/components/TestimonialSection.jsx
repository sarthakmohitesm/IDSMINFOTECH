import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { HiStar, HiArrowRight, HiArrowLeft, HiXMark, HiArrowUpRight } from 'react-icons/hi2';
import { Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    type: 'Specific',
    text: "We were hesitant about switching to ERP, but IDMS made the transition smooth. Their system is intuitive, and their support is outstanding. It feels like the software was built just for us.",
    author: "Chetan Singrodia",
    company: "Industrial Manufacturing Unit",
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
    type: 'Specific',
    text: "I was impressed by their ability to understand my initial concept and translate it into a functional application.",
    author: "Nilesh Joshi",
    company: "Rangavishwa Enterprises",
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
    text: "We were looking for a reliable, flexible ERP solution that could grow with us—and we found that with IDMS. Their Smart ERP doesn't just manage data, it connects everything and everyone in our organization. What we appreciate most is how the platform simplifies complex processes without sacrificing functionality. It's a real game-changer for growing businesses like ours.",
    author: "Devendra Bane",
    company: "Pune Metagraph",
    accent: "#2563EB"
  },
  {
    type: 'Generic',
    text: "IDMS's Smart ERP gave us visibility, control, and peace of mind. Managing multiple functions from a single platform has saved us countless hours and reduced operational errors. The insights we get from real-time dashboards have helped us make faster, better decisions. The system feels modern and well thought out, and the transition was much smoother than expected.",
    author: "M Sudarshan",
    company: "Integral Labels",
    accent: "#2563EB"
  },
  {
    type: 'Generic',
    text: "The Smart ERP from IDMS Infotech has added real value to how we run our organization. From day one, it helped bring clarity to our workflows and made our teams more productive. The customization options and user-friendly design make it suitable for any kind of setup. We now operate with far more confidence and accuracy across departments.",
    author: "Sanjeev Manan",
    company: "Continental Electrical Industries Pvt Ltd",
    accent: "#2563EB"
  }
];

const TestimonialCard = ({ testimonial, onClick, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - 24);
    y.set(e.clientY - rect.top - 24);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative snap-start shrink-0 w-[85vw] md:w-[340px] lg:w-[360px] xl:w-[380px] rounded border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:cursor-none hover:shadow-[0_16px_45px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300 transform-gpu"
    >
      {/* Dynamic Hover Cursor Badge (Desktop Only) */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0 z-50 pointer-events-none hidden md:flex will-change-transform"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] opacity-0 shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-300 scale-50 group-hover:scale-110 group-hover:opacity-100">
          <HiArrowUpRight className="text-white" size={18} />
        </div>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col pointer-events-none">
        {/* Quote Icon + Rating Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-blue-50 flex items-center justify-center border border-blue-100">
              <Quote className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={16} className="text-amber-400" />
              ))}
            </div>
          </div>
          <span className="text-[13px] font-bold text-[#0B0F19] bg-slate-50 border border-slate-200/80 px-2.5 py-0.5 rounded-full">5.0</span>
        </div>

        {/* Testimonial Quote */}
        <p className="text-[14px] sm:text-[15px] text-[#4B5563] font-normal leading-[1.7] mb-6 overflow-hidden line-clamp-5">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-3.5 mt-auto border-t border-slate-100 pt-5 pointer-events-none">
        <div className="w-11 h-11 rounded bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shadow-sm shrink-0">
          <span className="text-[16px] font-bold text-white uppercase">{testimonial.author.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-[#0B0F19] truncate">{testimonial.author}</div>
          <div className="text-[12px] text-[#64748B] font-medium mt-0.5 truncate">
            {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].offsetWidth + 24;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].offsetWidth + 24;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden select-none">
      {/* Background Subtle Grid (same as Hero / Problem / Solution) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-70"
        aria-hidden="true"
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-b from-blue-100/40 via-sky-50/20 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        {/* HEADER (matching ProblemSection / SolutionSection style) */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] mb-10 sm:mb-12">
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
                Trusted by Industry Leaders
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

            {/* NAVIGATION ARROWS (Desktop) */}
            <div className="hidden md:flex gap-2.5 pb-2 shrink-0">
              <button
                type="button"
                onClick={scrollLeft}
                className="flex h-11 w-11 items-center justify-center rounded border border-slate-200/90 bg-white text-[#0B0F19] shadow-sm transition-all hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
              >
                <HiArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="flex h-11 w-11 items-center justify-center rounded border border-slate-200/90 bg-white text-[#0B0F19] shadow-sm transition-all hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
              >
                <HiArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* CARDS SCROLLER CONTAINER */}
        <div className="relative max-w-[1440px] mx-auto pl-4 sm:pl-6 lg:pl-[80px] pr-0">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 pt-2 -mt-2 pr-4 lg:pr-[80px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                index={idx}
                testimonial={testimonial}
                onClick={() => setSelectedTestimonial(testimonial)}
              />
            ))}
          </div>

          {/* Fade Edge (Right) */}
          <div className="absolute right-0 top-0 bottom-0 w-[60px] lg:w-[100px] bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
        </div>

        {/* NAVIGATION ARROWS (Mobile) */}
        <div className="flex md:hidden justify-center gap-3 mt-6 px-4">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded border border-slate-200/90 bg-white text-[#0B0F19] shadow-sm transition-all active:bg-[#2563EB] active:text-white"
          >
            <HiArrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="flex h-11 w-11 items-center justify-center rounded border border-slate-200/90 bg-white text-[#0B0F19] shadow-sm transition-all active:bg-[#2563EB] active:text-white"
          >
            <HiArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Side Drawer Modal */}
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
              className="fixed top-[75px] md:top-[85px] right-2 md:right-6 bottom-2 md:bottom-6 w-[calc(100%-16px)] md:w-[360px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.2)] z-[101] flex flex-col overflow-hidden rounded border border-slate-200/60"
            >
              {/* Top Banner Area */}
              <div className="relative h-[220px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] flex-shrink-0 flex items-center justify-center overflow-hidden">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-5 right-5 w-9 h-9 bg-white/15 hover:bg-white text-white hover:text-[#2563EB] rounded flex items-center justify-center transition-all z-10 backdrop-blur-sm"
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
                  <div className="w-[90px] h-[90px] rounded bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.25)] border border-white/30 rotate-[8deg] transform hover:rotate-0 transition-transform duration-500">
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
                  <div className="w-12 h-12 rounded bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
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

      {/* Hide Scrollbar Cross-Browser Global CSS fix */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
