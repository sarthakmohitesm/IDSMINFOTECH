import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiStar, HiArrowRight, HiArrowLeft, HiXMark } from 'react-icons/hi2';
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

/* ─── Compact Stage Testimonial Card with 3D Tilt & Floating Bob ─── */
const TestimonialCard = ({
  testimonial,
  isCenter,
  onClick,
  cardWidth,
  floatDelay = 0
}) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -5, 0, 3.5, 0],
      }}
      transition={{
        y: {
          duration: 4.8 + floatDelay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay * 0.3,
        },
      }}
      style={{
        perspective: 900,
        width: `${cardWidth}px`,
      }}
      className="shrink-0 select-none will-change-transform"
    >
      <motion.div
        animate={{
          scale: isCenter ? 1.05 : 0.94,
          y: isCenter ? -8 : 0,
          opacity: isCenter ? 1 : 0.86,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`
          relative rounded bg-white flex flex-col justify-between overflow-hidden cursor-pointer
          transition-shadow duration-500 ease-out transform-gpu
          ${isCenter
            ? 'p-5 sm:p-6 min-h-[290px] sm:min-h-[310px] max-h-[330px] shadow-[0_18px_48px_rgba(37,99,235,0.16),0_6px_18px_rgba(15,23,42,0.06)] border-2 border-blue-500 z-20'
            : 'p-4.5 sm:p-5 min-h-[270px] sm:min-h-[285px] max-h-[305px] shadow-[0_6px_24px_rgba(15,23,42,0.05)] border border-slate-200/90 z-10 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)] hover:border-slate-300'
          }
        `}
      >
        {/* Specular Glare Reflection on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 rounded"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
            ),
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header: Quote Icon + 5 Stars + 5.0 Rating Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`
                flex items-center justify-center rounded transition-colors duration-300
                ${isCenter
                  ? 'w-8 h-8 bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'w-7.5 h-7.5 bg-blue-50 text-blue-600 border border-blue-100'
                }
              `}>
                <Quote className={`${isCenter ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
              </div>

              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} size={isCenter ? 15 : 13.5} className="text-amber-400" />
                ))}
              </div>
            </div>

            <span className={`
              font-bold rounded-full border border-slate-200/80 bg-slate-50 text-[#0B0F19]
              ${isCenter ? 'text-[11.5px] px-2.5 py-0.5' : 'text-[11px] px-2 py-0.5'}
            `}>
              5.0
            </span>
          </div>

          {/* Testimonial Quote Text */}
          <p className={`
            text-[#4B5563] font-normal leading-[1.6] mb-3 overflow-hidden
            ${isCenter ? 'text-[13px] sm:text-[13.5px] line-clamp-4' : 'text-[12px] sm:text-[12.5px] line-clamp-3'}
          `}>
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>

        {/* Author Info */}
        <div className="relative z-10 flex items-center gap-2.5 mt-auto border-t border-slate-100 pt-3">
          <div className={`
            rounded bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shadow-sm shrink-0
            ${isCenter ? 'w-9 h-9' : 'w-8 h-8'}
          `}>
            <span className={`font-bold text-white uppercase ${isCenter ? 'text-[14px]' : 'text-[13px]'}`}>
              {testimonial.author.charAt(0)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className={`font-bold text-[#0B0F19] truncate ${isCenter ? 'text-[13.5px]' : 'text-[12.5px]'}`}>
              {testimonial.author}
            </div>
            <div className={`text-[#64748B] font-medium truncate mt-0.5 ${isCenter ? 'text-[11.5px]' : 'text-[10.5px]'}`}>
              {testimonial.company}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Testimonial Section (Fitted in One Tab Viewport, No Bubbles) ─── */
export default function TestimonialSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const N = TESTIMONIALS.length;
  const COPIES = 9;
  const CENTER_COPY = 4;
  const INITIAL_INDEX = CENTER_COPY * N; // index 28

  const [virtualIndex, setVirtualIndex] = useState(INITIAL_INDEX);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Multi-copy items list with stable keys
  const trackItems = useMemo(() => {
    return Array.from({ length: COPIES }, (_, copyIdx) =>
      TESTIMONIALS.map((t, origIdx) => ({
        ...t,
        uniqueKey: `${copyIdx}-${origIdx}`,
        virtualIdx: copyIdx * N + origIdx,
      }))
    ).flat();
  }, [N]);

  // Dynamic card geometry
  const cardMetrics = useMemo(() => {
    if (containerWidth < 640) {
      const width = Math.min(containerWidth - 48, 300);
      const gap = 16;
      return { cardWidth: width, gap, step: width + gap, isMobile: true };
    } else if (containerWidth < 1024) {
      const width = 290;
      const gap = 18;
      return { cardWidth: width, gap, step: width + gap, isMobile: false };
    } else {
      const width = 320;
      const gap = 22;
      return { cardWidth: width, gap, step: width + gap, isMobile: false };
    }
  }, [containerWidth]);

  // Compute track translateX to position the active card at activeLeftOffset:
  // Card (virtualIndex - 1) peeks on the left
  // Card (virtualIndex) is the hero Active Card
  // Card (virtualIndex + 1) is fully visible to the right
  // Card (virtualIndex + 2) peeks on the far right
  const trackTranslateX = useMemo(() => {
    const { cardWidth, gap, step, isMobile } = cardMetrics;

    if (isMobile) {
      return (containerWidth - cardWidth) / 2 - virtualIndex * step;
    }

    // On desktop / tablet: ensure the card before the active one is fully visible
    const activeLeftOffset = Math.max(cardWidth + gap + 40, (containerWidth - 1140) / 2 + cardWidth + gap + 40);
    return activeLeftOffset - virtualIndex * step;
  }, [cardMetrics, containerWidth, virtualIndex]);

  // Current real active index modulo N
  const activeDotIndex = ((virtualIndex % N) + N) % N;

  // Silent infinite wrap: keeps virtualIndex within safe boundaries
  useEffect(() => {
    if (virtualIndex >= (COPIES - 2) * N || virtualIndex <= 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        const normalized = ((virtualIndex % N) + N) % N + CENTER_COPY * N;
        setVirtualIndex(normalized);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitionEnabled(true);
          });
        });
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [virtualIndex, N]);

  // Navigation handlers
  const scrollLeft = () => {
    setIsTransitionEnabled(true);
    setVirtualIndex((prev) => prev - 1);
  };

  const scrollRight = () => {
    setIsTransitionEnabled(true);
    setVirtualIndex((prev) => prev + 1);
  };

  const goToDot = (targetIdx) => {
    setIsTransitionEnabled(true);
    let diff = targetIdx - activeDotIndex;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setVirtualIndex((prev) => prev + diff);
  };

  // Auto-play disabled per user request
  // useEffect(() => {
  //   if (isHovered) return;
  //   const interval = setInterval(() => {
  //     scrollRight();
  //   }, 5500);
  //   return () => clearInterval(interval);
  // }, [isHovered]);

  return (
    <section
      className="relative w-full pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 lg:pb-16 overflow-hidden select-none flex flex-col justify-start min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #F0F5FF 0%, #F8FAFF 40%, #EDF3FF 100%)',
      }}
    >
      <div className="relative z-10 w-full">
        {/* ─── SECTION HEADER ─── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] mb-4 sm:mb-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="min-w-0">
              {/* Badge: • CLIENT SUCCESS */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-blue-200/90 bg-blue-50/80 text-blue-700 text-[11px] font-bold tracking-wider uppercase mb-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Client Success</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold tracking-tight text-[#0B0F19] leading-tight"
              >
                Trusted by{' '}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#4338CA] bg-clip-text text-transparent">
                  Industry Leaders
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-[13px] sm:text-[14px] text-[#64748B] mt-1 max-w-xl leading-relaxed"
              >
                Real feedback from enterprises that transformed their operations with IDMS Smart ERP.
              </motion.p>
            </div>

            {/* Desktop Navigation Circular Arrows (Top Right) */}
            <div className="hidden md:flex gap-2.5 pb-1 shrink-0">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-sm text-[#0B0F19] shadow-sm transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:scale-105 active:scale-95"
              >
                <HiArrowLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-sm text-[#0B0F19] shadow-sm transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] hover:shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:scale-105 active:scale-95"
              >
                <HiArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* ─── CAROUSEL STAGE VIEWPORT ─── */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full overflow-hidden py-8 sm:py-9"
        >
          {/* Continuous smooth sliding track */}
          <motion.div
            animate={{ x: trackTranslateX }}
            transition={
              isTransitionEnabled
                ? { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
            style={{
              gap: `${cardMetrics.gap}px`,
            }}
            className="flex items-center will-change-transform"
          >
            {trackItems.map((item, idx) => {
              const isCenter = idx === virtualIndex;
              const floatDelay = (idx % N) * 0.4;

              return (
                <TestimonialCard
                  key={item.uniqueKey}
                  testimonial={item}
                  isCenter={isCenter}
                  cardWidth={cardMetrics.cardWidth}
                  floatDelay={floatDelay}
                  onClick={() => setSelectedTestimonial(item)}
                />
              );
            })}
          </motion.div>

          {/* Right Edge Soft Peek Gradient Fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[50px] sm:w-[80px] lg:w-[110px] pointer-events-none z-30"
            style={{
              background: 'linear-gradient(to left, #EDF3FF 0%, rgba(237,243,255,0.7) 45%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* ─── PAGINATION DOTS (7 dots, active is blue pill) ─── */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToDot(idx)}
              className={`
                rounded-full transition-all duration-400 ease-out cursor-pointer
                ${activeDotIndex === idx
                  ? 'w-6 h-2 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] shadow-[0_2px_6px_rgba(37,99,235,0.35)]'
                  : 'w-2 h-2 bg-slate-300/80 hover:bg-slate-400'
                }
              `}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* ─── Mobile Navigation Buttons ─── */}
        <div className="flex md:hidden justify-center gap-2.5 mt-4 px-4">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-200/90 bg-white text-[#0B0F19] shadow-sm transition-all active:bg-[#2563EB] active:text-white"
          >
            <HiArrowLeft size={17} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-200/90 bg-white text-[#0B0F19] shadow-sm transition-all active:bg-[#2563EB] active:text-white"
          >
            <HiArrowRight size={17} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ─── Side Drawer Modal for full story view ─── */}
      <AnimatePresence>
        {selectedTestimonial && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="fixed top-[65px] left-0 right-0 bottom-0 bg-[#0B0F19]/50 backdrop-blur-[3px] z-[100]"
            />

            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-[75px] md:top-[85px] right-2 md:right-6 bottom-2 md:bottom-6 w-[calc(100%-16px)] md:w-[380px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.2)] z-[101] flex flex-col overflow-hidden rounded border border-slate-200/60"
            >
              <div className="relative h-[200px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] flex-shrink-0 flex items-center justify-center overflow-hidden">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/15 hover:bg-white text-white hover:text-[#2563EB] rounded flex items-center justify-center transition-all z-10 backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <HiXMark size={18} strokeWidth={1} />
                </button>

                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />

                <div className="relative z-10 mt-2">
                  <div className="absolute inset-0 bg-white/20 blur-[40px] rounded-full scale-[2]" />
                  <div className="w-[80px] h-[80px] rounded bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.25)] border border-white/30 rotate-[6deg] transform hover:rotate-0 transition-transform duration-500">
                    <span className="text-[34px] font-bold text-white uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                      {selectedTestimonial.author.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} size={16} className="text-amber-300" />
                  ))}
                </div>
              </div>

              <div className="flex-1 p-6 sm:p-7 overflow-y-auto bg-white flex flex-col justify-between" style={{ scrollbarWidth: 'thin' }}>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-200/80 bg-blue-50/70 text-blue-700 text-[11px] font-semibold tracking-wider uppercase mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>Success Story</span>
                  </div>

                  <div className="text-[14px] text-[#4B5563] leading-[1.7] font-normal" style={{ whiteSpace: 'pre-line' }}>
                    {selectedTestimonial.text}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <span className="text-[16px] font-bold text-white uppercase">{selectedTestimonial.author.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-[#0B0F19]">{selectedTestimonial.author}</div>
                    <div className="text-[12px] text-[#64748B] font-medium mt-0.5 leading-tight">
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
