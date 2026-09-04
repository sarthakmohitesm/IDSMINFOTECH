import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import waveRightPurple from '../assets/shapes/wave-right-purple.svg';

const STEPS = [
  {
    number: "45+",
    label: "Implementations",
    image: "/performance_step1.png",
    text: "Delivering excellence through robust implementations across diverse global environments."
  },
  {
    number: "10+",
    label: "Industries Served",
    image: "/performance_step2.png",
    text: "Deep expertise spanning across multiple sectors from Finance to Manufacturing."
  },
  {
    number: "750+",
    label: "Active Users",
    image: "/performance_step3.png",
    text: "Trusted by thousands of professionals daily for their mission-critical operations."
  },
  {
    number: "99.9%",
    label: "System Reliability",
    image: "/performance_step4.png",
    text: "Zero compromise on stability. Ensuring your business stays online, always."
  }
];

const PerformanceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [[activeIndex, direction], setActiveStep] = useState([0, 0]);
  const [isLocked, setIsLocked] = useState(false);

  // Sync scroll progress to active index with a 1.2-second forced hold
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      if (isLocked) return;

      const targetIndex = Math.min(Math.floor(v * STEPS.length), STEPS.length - 1);

      if (targetIndex !== activeIndex) {
        // Force single-step movement: never skip a step
        const nextStep = targetIndex > activeIndex ? activeIndex + 1 : activeIndex - 1;

        // Final bounds check
        const finalIndex = Math.max(0, Math.min(nextStep, STEPS.length - 1));

        if (finalIndex !== activeIndex) {
          setActiveStep([finalIndex, finalIndex > activeIndex ? 1 : -1]);
          setIsLocked(true);

          // Lock the section for 1.2 seconds to force the user to view it
          setTimeout(() => {
            setIsLocked(false);
          }, 1200);
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, isLocked]);

  const imgVariants = {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, x: 0, opacity: 1 },
    exit: { x: -200, opacity: 0 }
  };

  const textVariants = {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, x: 0, opacity: 1 },
    exit: { x: 200, opacity: 0 }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[350vh]">
      <div className="sticky top-0 h-screen w-full flex items-center bg-[#ebebff] px-4 md:px-[6vw] lg:px-[10vw] overflow-hidden relative">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-px"
          style={{
            background:
              'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.45]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden
        />
        <img
          src={waveRightPurple}
          alt=""
          className="pointer-events-none absolute -bottom-[20%] -right-[5%] z-0 h-[min(60vh,634px)] w-auto max-w-[90vw] select-none object-contain object-right-bottom"
          decoding="async"
        />

        {/* Animated Scroll Indicator */}
        <div className="absolute top-20 right-8 md:top-32 md:right-16 flex flex-col items-center justify-center z-50">
          <span className="text-[#9797ff] uppercase tracking-[0.25em] text-[11px] md:text-[13px] font-semibold -mb-2 z-10 opacity-90 text-center">
            SCROLL
          </span>
          <div className="flex flex-col items-center -space-y-8 md:-space-y-10">
            {[0, 1, 2, 3].map((i) => (
              <motion.svg
                key={i}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 1 - i * 0.2, 0.1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9797ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="4 9 12 16 20 9" />
              </motion.svg>
            ))}
          </div>
        </div>

        <div className="max-w-[1300px] relative z-10 mx-auto w-full flex flex-col h-full justify-center">

          {/* Static Branding Header */}
          <div className="text-center mb-6 md:mb-8">
            <motion.h2 className="text-[#122a66] !text-[30px] md:!text-[40px] font-bold">
              IDMS Infotech in Numbers
            </motion.h2>
          </div>

          {/* Dynamic Collector Stats Bar - Enriched & Moved Closer */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8 md:mb-12 lg:mb-20 min-h-[50px]">
            <AnimatePresence mode="popLayout">
              {STEPS.map((step, idx) => (
                (idx <= activeIndex) && (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`flex items-center gap-3 ${idx > 0 ? 'border-l border-gray-300 pl-6' : ''}`}
                  >
                    <span className="text-[#1089d1] text-[20px] md:text-[26px] font-extrabold">{step.number}</span>
                    <span className="text-gray-500 text-[14px] md:text-[17px] font-normal">{step.label}</span>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Main Interactive Layout Area */}
          <div className="relative">
            {/* Minimalist Stat Box - Refined Size */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`box-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute top-[-25px] lg:top-[-35px] left-1/2 -translate-x-1/2 bg-[#1e82e6] text-white w-[65px] h-[65px] md:w-[95px] md:h-[95px] rounded-[5px] shadow-2xl flex items-center justify-center z-30"
              >
                <span className="text-[20px] md:text-[28px] font-bold leading-none text-center">
                  {STEPS[activeIndex].number}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Shifting Content Container - Moved right but Box stays center */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 translate-x-0 lg:translate-x-10">

              {/* Left Column: Image Area - Shorter Aspect Ratio */}
              <div className="relative w-full lg:w-1/2 max-w-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`img-${activeIndex}`}
                    variants={imgVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    className="relative aspect-[16/9] z-10"
                  >
                    <div className="w-full h-full rounded-[5px] overflow-hidden shadow-xl border border-gray-100 bg-white">
                      <img
                        src={STEPS[activeIndex].image}
                        alt={STEPS[activeIndex].label}
                        className="w-full h-full object-cover opacity-95"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Text Area */}
              <div className="w-full lg:w-1/2 max-w-[500px] min-h-[250px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeIndex}`}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <h3 className="text-[#122a66] !text-[30px] font-semibold mb-4 uppercase tracking-tight leading-tight">
                      {STEPS[activeIndex].label}
                    </h3>
                    <p className="text-gray-600 !text-[18px] leading-relaxed mb-8 max-w-[450px]">
                      {STEPS[activeIndex].text}
                      <br /><br />
                      IDMS Infotech collaborates with clients worldwide, ensuring top-tier service delivery across all time zones.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-px"
          style={{
            background:
              'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
          }}
          aria-hidden
        />
      </div>
    </section>
  );
};

export default PerformanceSection;
