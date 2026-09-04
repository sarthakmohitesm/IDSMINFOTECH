import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { HiStar, HiArrowRight, HiArrowLeft, HiXMark, HiArrowUpRight } from 'react-icons/hi2';

const TESTIMONIALS = [
  {
    type: 'Specific',
    text: "We were hesitant about switching to ERP, but IDMS made the transition smooth. Their system is intuitive, and their support is outstanding. It feels like the software was built just for us.",
    author: "Chetan Singrodia",
    company: "Industrial Manufacturing Unit",
    accent: "#468BEF"
  },
  {
    type: 'Specific',
    text: "Managing multiple plants and teams was getting out of hand. With IDMS Smart ERP, we now track everything in one place with live dashboards and custom reports. Productivity has jumped, and we’re finally in control.",
    author: "Uttam Gurjar",
    company: "Multi-location Enterprise",
    accent: "#FF0078"
  },
  {
    type: 'Specific',
    text: "I was impressed by their ability to understand my initial concept and translate it into a functional application.",
    author: "Nilesh Joshi",
    company: "Rangavishwa Enterprises",
    accent: "#9600FA"
  },
  {
    type: 'Generic',
    text: "Partnering with IDMS to develop HRMS was a turning point for our business. The system brought structure to our operations and gave us the confidence to scale without worrying about backend chaos.",
    author: "Shailendra Dhamdhere",
    company: "TalentCo HR Services LLP",
    accent: "#468BEF"
  },
  {
    type: 'Generic',
    text: "We were looking for a reliable, flexible ERP solution that could grow with us—and we found that with IDMS. Their Smart ERP doesn’t just manage data, it connects everything and everyone in our organization. What we appreciate most is how the platform simplifies complex processes without sacrificing functionality. It’s a real game-changer for growing businesses like ours.",
    author: "Devendra Bane",
    company: "Pune Metagraph",
    accent: "#FF0078"
  },
  {
    type: 'Generic',
    text: "IDMS’s Smart ERP gave us visibility, control, and peace of mind. Managing multiple functions from a single platform has saved us countless hours and reduced operational errors. The insights we get from real-time dashboards have helped us make faster, better decisions. The system feels modern and well thought out, and the transition was much smoother than expected.",
    author: "M Sudarshan",
    company: "Integral Labels",
    accent: "#9600FA"
  },
  {
    type: 'Generic',
    text: "The Smart ERP from IDMS Infotech has added real value to how we run our organization. From day one, it helped bring clarity to our workflows and made our teams more productive. The customization options and user-friendly design make it suitable for any kind of setup. We now operate with far more confidence and accuracy across departments.",
    author: "Sanjeev Manan",
    company: "Continental Electrical Industries Pvt Ltd",
    accent: "#468BEF"
  }
];

const TestimonialCard = ({ testimonial, onClick, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - 24); // 24 is half of 48px width
    y.set(e.clientY - rect.top - 24);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative snap-start shrink-0 w-[85vw] md:w-[320px] lg:w-[350px] xl:w-[360px] rounded-[5px] border border-[#c2e3ff] bg-white p-8 flex flex-col justify-between overflow-hidden shadow-sm md:cursor-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform-gpu"
    >
      {/* Dynamic Hover Cursor Badge (Desktop Only) */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0 z-50 pointer-events-none hidden md:flex will-change-transform"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1e82e6] bg-white opacity-0 shadow-[0_4px_20px_rgba(30,130,230,0.2)] transition-all duration-300 scale-50 group-hover:scale-110 group-hover:opacity-100">
          <HiArrowUpRight className="text-[#1e82e6]" size={20} />
        </div>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col pointer-events-none">
        {/* 5.0 Rating Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[22px] font-medium text-[#111827] font-noto-sans">5.0</span>
          <div className="flex gap-1 text-[#0083FF]">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} size={20} />
            ))}
          </div>
        </div>

        {/* Testimonial Quote */}
        <p className="text-[15px] text-gray-700 font-medium leading-[1.6] mb-8 overflow-hidden line-clamp-5 font-noto-sans">
          “{testimonial.text}”
        </p>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-4 mt-auto border-t border-[#0083FF]/10 pt-6 pointer-events-none">
        <div className="w-[46px] h-[46px] rounded-[5px] bg-white flex items-center justify-center overflow-hidden border border-[#0083FF]/20 shadow-sm">
          <span className="text-[18px] font-bold text-[#0083FF] uppercase">{testimonial.author.charAt(0)}</span>
        </div>
        <div>
          <div className="text-[14px] font-bold text-[#111827] font-noto-sans">{testimonial.author}</div>
          <div className="text-[11px] text-gray-500 font-medium mt-0.5 font-noto-sans">
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
      const cardWidth = scrollRef.current.children[0].offsetWidth + 24; // width + gap
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].offsetWidth + 24; // width + gap
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[600px] flex flex-col pt-14 w-full bg-[#ebebff] overflow-hidden select-none">
      {/* Same gradient hairline as Footer top edge */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-px"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)'
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-px"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)'
        }}
      />

      {/* Subtle grid on light background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 w-full pl-4 lg:pl-[80px] pr-0">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pr-4 lg:pr-[80px]">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(24px,2.5vw,36px)] font-bold tracking-tight text-[#122a66] leading-tight whitespace-nowrap font-noto-sans"
            >
              Trusted Success — Client Testimonials
            </motion.h2>
          </div>

          {/* NAVIGATION ARROWS (Desktop) */}
          <div className="hidden md:flex gap-3 pb-2">
            <button
              type="button"
              onClick={scrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/80 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-all hover:bg-[#1e82e6] hover:text-white"
            >
              <HiArrowLeft size={20} strokeWidth={1.35} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/80 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-all hover:bg-[#1e82e6] hover:text-white"
            >
              <HiArrowRight size={20} strokeWidth={1.35} />
            </button>
          </div>
        </div>

        {/* CARDS SCROLLER CONTAINER */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 -mt-4 px-2 -mx-2 relative z-10 pr-4 lg:pr-[80px]"
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
        </div>

        {/* NAVIGATION ARROWS (Mobile) */}
        <div className="flex md:hidden justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/80 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-all active:bg-[#1e82e6] active:text-white"
          >
            <HiArrowLeft size={22} strokeWidth={2.35} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/80 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-all active:bg-[#1e82e6] active:text-white"
          >
            <HiArrowRight size={22} strokeWidth={2.35} />
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
              className="fixed top-[65px] left-0 right-0 bottom-0 bg-[#001021]/60 backdrop-blur-[2px] z-[100]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-[75px] md:top-[85px] right-2 md:right-6 bottom-2 md:bottom-6 w-[calc(100%-16px)] md:w-[320px] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden rounded-[5px]"
            >
              {/* Top Banner Area (Bright Blue) */}
              <div className="relative h-[240px] bg-[#1e82e6] flex-shrink-0 flex items-center justify-center overflow-hidden">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-6 right-6 w-8 h-8 bg-white/20 hover:bg-white text-white hover:text-[#0083FF] rounded-[5px] flex items-center justify-center transition-all z-10 shadow-sm"
                >
                  <HiXMark size={20} strokeWidth={1} />
                </button>

                {/* Glowing Center Core */}
                <div className="relative z-10 mt-6">
                  <div className="absolute inset-0 bg-white/30 blur-[40px] rounded-full scale-150" />
                  <div className="w-[100px] h-[100px] rounded-[5px] bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white/40 rotate-[10deg] transform hover:rotate-0 transition-transform duration-500">
                    <span className="text-[44px] font-bold text-white uppercase font-noto-sans" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                      {selectedTestimonial.author.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Cross-beams */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/10 -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.5)] hidden" />
              </div>

              {/* Detailed Content Area */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-white flex flex-col justify-between" style={{ scrollbarWidth: 'thin' }}>
                <div>
                  <h3 className="text-[20px] font-bold text-[#122a66] mb-5 leading-tight font-noto-sans">Client Success Story</h3>

                  <div className="text-[15px] text-gray-700 leading-relaxed font-medium font-noto-sans" style={{ whiteSpace: 'pre-line' }}>
                    {selectedTestimonial.text}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-[5px] bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100 shrink-0">
                    <span className="text-[18px] font-bold text-[#0083FF] uppercase">{selectedTestimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-[16px] font-bold text-[#111827] font-noto-sans">{selectedTestimonial.author}</div>
                    <div className="text-[13px] text-gray-500 font-medium mt-0.5 max-w-[200px] leading-tight font-noto-sans">
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
