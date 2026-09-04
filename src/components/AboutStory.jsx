import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import starIcon from '../assets/star.svg';
import smallWaveJourney from '../assets/small-wave-journey.svg';

const journeyData = [
  {
    year: "2021",
    title: "Year of Incorporation",
    description:
      "IDMS Smart ERP was incorporated with a clear mission: build intelligent digital engineering into enterprise resource planning. We laid the legal and organizational groundwork for long-term product investment.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    year: "2022",
    title: "Year of Experimentation",
    description:
      "We explored architectures, delivery models, and partner workflows in real customer contexts—testing what scaled, retiring what did not, and sharpening our platform direction through disciplined experimentation.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    year: "2023",
    title: "Year of Optimization",
    description:
      "Performance, reliability, and implementation velocity became the focus. We optimized core services, tightened integrations, and improved time-to-value for complex industrial deployments.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    year: "2024",
    title: "Year of Expansion",
    description:
      "A year of geographic and capability expansion—new markets, deeper partnerships, and broader solution coverage—while keeping quality and support standards consistent as demand grew.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    year: "2025",
    title: "Year of Standardization",
    description:
      "We standardized delivery playbooks, reference architectures, and governance patterns so teams could repeat success at scale—turning proven practices into repeatable outcomes for customers.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
  },
  {
    year: "2026",
    title: "Year of Acceleration",
    description:
      "With foundations in place, we accelerated roadmap execution—faster releases, stronger automation, and sharper focus on outcomes—powering the next phase of enterprise modernization.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
  }
];

const journeyCount = journeyData.length;

function scrollProgressToIndex(scroll01) {
  const clamped = Math.min(Math.max(scroll01, 0), 1);
  return Math.min(Math.floor(clamped * journeyCount), journeyCount - 1);
}

/** Ring in star-local coords: 0° = right tip, 90° = bottom, 180° = left, 270° = top. Small gaps keep tips clear. */
function journeyRingPathSkipTips(cx, cy, r, gapDeg = 9) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const pt = (deg) => {
    const t = toRad(deg);
    return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
  };
  const segments = [
    [270 + gapDeg, 360 - gapDeg],
    [gapDeg, 90 - gapDeg],
    [90 + gapDeg, 180 - gapDeg],
    [180 + gapDeg, 270 - gapDeg],
  ];
  return segments
    .map(([a0, a1]) => {
      const p0 = pt(a0);
      const p1 = pt(a1);
      let delta = a1 - a0;
      if (delta < 0) delta += 360;
      const largeArc = delta > 180 ? 1 : 0;
      return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
    })
    .join(" ");
}

const JOURNEY_RING_PATH = journeyRingPathSkipTips(110, 110, 104, 9);

/**
 * Scroll length for this block (page scroll drives progress). Shorter than the original
 * 350vh/4-steps scale so the section takes less vertical space; still enough range per year.
 */
const JOURNEY_SECTION_HEIGHT_VH = Math.round((260 / 4) * journeyCount);

const STAR_TWEEN = { type: "tween", duration: 0.55, ease: "easeInOut" };

/** Match numbers section: brief lock so scroll cannot skip multiple years in one frame. */
const STEP_LOCK_MS = 1200;

const AboutStory = () => {
  const containerRef = useRef(null);
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for down, -1 for up
  const [isLocked, setIsLocked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    setActiveYearIndex(scrollProgressToIndex(scrollYProgress.get()));
  }, [scrollYProgress]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (isLocked) return;

      const targetIndex = scrollProgressToIndex(v);
      if (targetIndex === activeYearIndex) return;

      const nextStep = targetIndex > activeYearIndex ? activeYearIndex + 1 : activeYearIndex - 1;
      const finalIndex = Math.max(0, Math.min(nextStep, journeyCount - 1));
      if (finalIndex === activeYearIndex) return;

      setDirection(finalIndex > activeYearIndex ? 1 : -1);
      setActiveYearIndex(finalIndex);
      setIsLocked(true);
      window.setTimeout(() => setIsLocked(false), STEP_LOCK_MS);
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeYearIndex, isLocked]);

  const contentVariants = {
    enter: (dir) => ({
      y: dir > 0 ? 16 : -16,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      y: dir < 0 ? 16 : -16,
      opacity: 0,
    }),
  };

  const prevIdx = activeYearIndex > 0 ? activeYearIndex - 1 : null;
  const nextIdx = activeYearIndex < journeyCount - 1 ? activeYearIndex + 1 : null;

  /** Prev/next only: year + title on one horizontal row (title never below year) */
  const pinLabelClass =
    "inline-flex min-w-0 max-w-[min(92vw,440px)] flex-row flex-nowrap items-baseline justify-center gap-x-2.5 font-noto-sans text-[#0083FF]/58";

  /** Timeline-style node (ring blue) — on star tip when adjacent year is missing. */
  const tipDotClass =
    "pointer-events-none absolute left-1/2 top-0 z-[15] h-[10px] w-[10px] -translate-x-1/2 -translate-y-[calc(100%+3px)] rounded-full border-2 border-[#0083FF] bg-white shadow-[0_0_0_4px_rgba(0,131,255,0.12)] md:h-3 md:w-3 md:-translate-y-[calc(100%+4px)]";

  /** Current year at right tip of star (compact); full detail stays beside image */
  const currentPinClass =
    "flex max-w-[min(260px,46vw)] flex-col items-start gap-1 text-left font-noto-sans";

  return (
    <section
      ref={containerRef}
      className="relative w-full border-t border-[#e2e8f0] bg-white"
      style={{ height: `${JOURNEY_SECTION_HEIGHT_VH}vh` }}
      aria-label="Company journey"
    >
      {/* 103px matches About hero / layout shell so the band sits under the sticky Navbar */}
      <div className="sticky top-[103px] z-20 flex h-[calc(100vh-103px)] w-full flex-col overflow-x-clip overflow-y-visible bg-white">
        <header className="relative z-[22] mx-auto w-full max-w-[1240px] shrink-0 px-4 pt-5 pb-1 text-center md:px-8 md:pt-6 md:pb-1">
          <p className="mb-1.5 font-noto-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#0083FF] md:mb-2">
            Our journey
          </p>
          <h2 className="font-noto-sans text-2xl font-bold leading-tight tracking-tight text-[#122a66] md:text-3xl lg:text-4xl">
            Milestones that shaped IDMS
          </h2>
        </header>

        <div className="relative z-20 flex min-h-0 flex-1 w-full items-center overflow-x-clip">
        {/* Decorative wave — bottom-right, behind content */}
        <img
          src={smallWaveJourney}
          alt=""
          decoding="async"
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 z-0 w-[min(110vw,720px)] max-w-none h-auto select-none object-contain object-right-bottom"
        />
        {/* Star: same absolute slot as before (left edge); prev/next anchored to top/bottom tips (center axis) */}
        <div className="pointer-events-none absolute -left-[48px] top-[calc(50%-138px)] z-30 h-[260px] w-[260px] overflow-visible md:-left-[54px] md:top-[calc(50%-168px)] md:h-[320px] md:w-[320px]">
          <motion.div
            initial={false}
            animate={{ rotate: -90 * activeYearIndex }}
            transition={STAR_TWEEN}
            style={{ transformOrigin: "center" }}
            className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center will-change-transform"
          >
            <svg
              className="absolute inset-0 z-[5] h-full w-full text-[#0083FF]"
              viewBox="0 0 220 220"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <path
                d={JOURNEY_RING_PATH}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.05}
                strokeWidth={6}
                strokeDasharray="2 12"
                strokeLinecap="round"
              />
            </svg>
            <img src={starIcon} alt="" className="relative z-10 h-full w-full" />
            {prevIdx === null ? <div className={tipDotClass} aria-hidden /> : null}
          </motion.div>

          {prevIdx !== null ? (
            <div className="pointer-events-none absolute left-1/2 top-0 z-40 -translate-x-[calc(50%_-_4.5rem)] -translate-y-[calc(100%+6px)] md:-translate-x-[calc(50%_-_5rem)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={prevIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={pinLabelClass}
                >
                  <span className="shrink-0 text-[20px] font-bold tabular-nums leading-tight">
                    {journeyData[prevIdx].year}
                  </span>
                  <span className="min-w-0 max-w-[min(14rem,52vw)] truncate text-left text-[13px] font-medium leading-snug text-[#0083FF]/90 md:max-w-[18rem]">
                    {journeyData[prevIdx].title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}

          {nextIdx !== null ? (
            <div className="pointer-events-none absolute bottom-0 left-1/2 z-40 -translate-x-[calc(50%_-_4.5rem)] translate-y-[calc(100%+6px)] md:-translate-x-[calc(50%_-_5rem)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={nextIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={pinLabelClass}
                >
                  <span className="shrink-0 text-[20px] font-bold tabular-nums leading-tight">
                    {journeyData[nextIdx].year}
                  </span>
                  <span className="min-w-0 max-w-[min(14rem,52vw)] truncate text-left text-[13px] font-medium leading-snug text-[#0083FF]/90 md:max-w-[18rem]">
                    {journeyData[nextIdx].title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
          {nextIdx === null ? (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 z-40 h-[10px] w-[10px] -translate-x-1/2 translate-y-[calc(100%+3px)] rounded-full border-2 border-[#0083FF] bg-white shadow-[0_0_0_4px_rgba(0,131,255,0.12)] md:h-3 md:w-3 md:translate-y-[calc(100%+4px)]"
            />
          ) : null}

          {/* Current year at right tip of star (image + full copy column unchanged) */}
          <div className="pointer-events-none absolute right-0 top-1/2 z-40 -translate-y-1/2 translate-x-[calc(100%+5px)] md:translate-x-[calc(100%+15px)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeYearIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={currentPinClass}
              >
                <span className="text-[30px] font-bold tabular-nums leading-tight text-[#0f172a]">
                  {journeyData[activeYearIndex].year}
                </span>
                <span className="text-[15px] font-semibold leading-snug text-[#0083FF]">
                  {journeyData[activeYearIndex].title}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Image centered in main band; copy fixed on the right of this section */}
        <div className="relative z-20 flex min-h-0 w-full flex-1 items-start px-4 py-2 pl-[12%] pr-[4%] md:px-8 md:py-5 md:pl-[15%] md:pr-[5%]">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-6 md:flex-row md:items-start md:gap-10 lg:gap-12">
            <div className="flex w-full flex-1 items-start justify-center md:min-w-0 md:justify-end md:pl-0">
              <div className="relative h-[min(48vh,380px)] w-[min(80vw,330px)] shrink-0 -translate-x-1 overflow-hidden rounded-[5px] shadow-xl sm:h-[min(50vh,400px)] sm:w-[304px] sm:translate-x-0 md:h-[min(54vh,440px)] md:w-[360px] md:-translate-x-2 lg:-translate-x-1">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeYearIndex}
                    src={journeyData[activeYearIndex].image}
                    initial={{ opacity: 0, filter: "grayscale(100%)" }}
                    animate={{ opacity: 1, filter: "grayscale(0%)" }}
                    exit={{ opacity: 0, filter: "grayscale(50%)" }}
                    transition={{ duration: 0.55 }}
                    className="h-full w-full rounded-[5px] object-cover"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 rounded-[5px] bg-gradient-to-t from-black/15 to-transparent" />
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={activeYearIndex}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 320, damping: 32 },
                  opacity: { duration: 0.28 },
                }}
                className="flex w-full shrink-0 flex-col justify-start font-noto-sans md:w-[min(100%,440px)] md:max-w-[480px] lg:w-[min(100%,480px)] lg:max-w-[520px]"
                aria-live="polite"
              >
                <div className="mb-3 text-[30px] font-semibold leading-snug text-[#0083FF] md:mb-4">
                  {journeyData[activeYearIndex].title}
                </div>

                <p className="mb-0 font-noto-sans text-[16px] font-light leading-relaxed text-[#475569]">
                  {journeyData[activeYearIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
