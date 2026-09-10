import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Users, Award } from 'lucide-react';

const STEPS = [
  {
    number: "45+",
    label: "Implementations",
    subtitle: "Global Enterprise Deployments",
    image: "/performance_step1.png",
    icon: Award,
    badgeText: "Enterprise Grade",
    text: "Delivering excellence through robust implementations across diverse global environments.",
    subtext: "IDMS Infotech collaborates with clients worldwide, ensuring top-tier service delivery across all time zones with tailored workflows.",
    tags: ["Zero Downtime Cutover", "Multi-Entity Support", "100% On-Time Go-Live"],
    accent: "#2563EB",
    statPill: "45+ Live Workspaces"
  },
  {
    number: "10+",
    label: "Industries Served",
    subtitle: "Cross-Sector Versatility",
    image: "/performance_step2.png",
    icon: TrendingUp,
    badgeText: "Multi-Industry Fit",
    text: "Deep expertise spanning across multiple sectors from Finance to Manufacturing.",
    subtext: "Purpose-built modular architectures configured specifically to each industry's rigorous compliance and operational workflows.",
    tags: ["Automotive & Engineering", "Process & Chemical", "Discrete Manufacturing"],
    accent: "#2563EB",
    statPill: "10+ Industry Frameworks"
  },
  {
    number: "750+",
    label: "Active Users",
    subtitle: "Daily Mission-Critical Operations",
    image: "/performance_step3.png",
    icon: Users,
    badgeText: "High Concurrency",
    text: "Trusted by thousands of professionals daily for their mission-critical operations.",
    subtext: "High-concurrency architecture featuring role-based governance, audit logs, and instantaneous transaction speeds.",
    tags: ["Sub-second Response", "Role-Based Governance", "Unified Team Workflows"],
    accent: "#2563EB",
    statPill: "750+ Daily Concurrent"
  },
  {
    number: "99.9%",
    label: "System Reliability",
    subtitle: "Zero-Compromise Stability",
    image: "/performance_step4.png",
    icon: ShieldCheck,
    badgeText: "High Availability",
    text: "Zero compromise on stability. Ensuring your business stays online, always.",
    subtext: "Enterprise disaster recovery, automated continuous database backups, and high-availability clustered infrastructure.",
    tags: ["99.9% Uptime SLA", "Automated Redundancy", "Continuous Backups"],
    accent: "#2563EB",
    statPill: "99.9% Verified SLA"
  }
];

/* ── Hardware-Accelerated Smooth Stacking Card (Crisp & Zero-Lag) ── */
function CrispStackCard({ step, index, smoothProgress, onSelect }) {
  const IconComponent = step.icon;

  // Declarative range transforms running directly on GPU compositor thread (No JS loop lag)
  // Card 0: Starts in place, shifts up by 18px each time a card stacks over it
  const y0 = useTransform(smoothProgress, [0, 0.28, 0.58, 0.85], [0, -18, -36, -54]);

  // Card 1: Enters between 0.08 and 0.28, shifts up when Card 2 & 3 stack
  const y1 = useTransform(smoothProgress, [0.08, 0.28, 0.58, 0.85], [520, 0, -18, -36]);
  const opacity1 = useTransform(smoothProgress, [0.08, 0.16], [0, 1]);

  // Card 2: Enters between 0.38 and 0.58, shifts up when Card 3 stacks
  const y2 = useTransform(smoothProgress, [0.38, 0.58, 0.85], [520, 0, -18]);
  const opacity2 = useTransform(smoothProgress, [0.38, 0.46], [0, 1]);

  // Card 3: Enters between 0.68 and 0.88
  const y3 = useTransform(smoothProgress, [0.68, 0.88], [520, 0]);
  const opacity3 = useTransform(smoothProgress, [0.68, 0.76], [0, 1]);

  let yValue = y0;
  let opacityValue = null;

  if (index === 1) {
    yValue = y1;
    opacityValue = opacity1;
  } else if (index === 2) {
    yValue = y2;
    opacityValue = opacity2;
  } else if (index === 3) {
    yValue = y3;
    opacityValue = opacity3;
  }

  const zIndex = 10 + index * 10;

  return (
    <motion.div
      style={{
        y: yValue,
        opacity: opacityValue || 1,
        zIndex,
      }}
      onClick={() => onSelect(index)}
      className="absolute top-0 left-0 right-0 w-full max-w-[880px] mx-auto transform-gpu cursor-pointer"
    >
      {/* Solid white card with high-performance CSS shadow — razor-sharp fonts with zero blur */}
      <div className="relative rounded bg-white border border-slate-200/90 p-5 sm:p-6 md:p-7 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.16),0_0_0_1px_rgba(37,99,235,0.08)]">
        
        {/* Top Floating Pill Badge */}
        <div className="absolute -top-4 left-6 sm:left-8 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#2563EB] text-white shadow-[0_6px_16px_rgba(37,99,235,0.3)] text-[12px] font-bold tracking-wide">
          <IconComponent className="w-3.5 h-3.5 text-blue-100" />
          <span>{step.number}</span>
          <span className="text-blue-200 border-l border-blue-400/50 pl-1.5 font-medium text-[11px]">
            {step.label}
          </span>
        </div>

        {/* Card Inner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7 items-center pt-2">
          
          {/* Left Column: Software Showcase Window */}
          <div className="md:col-span-6">
            <div className="relative rounded overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
              {/* macOS Header */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform View
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  IDMS Core
                </span>
              </div>

              {/* Screenshot Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={step.image}
                  alt={step.label}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Tag over Image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:right-auto bg-slate-900/95 text-white px-3 py-1.5 rounded border border-white/15 flex items-center gap-2 shadow-lg">
                  <span className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center font-extrabold text-[10px] text-white">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-medium text-slate-200 truncate">
                    {step.statPill}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Value Text */}
          <div className="md:col-span-6 flex flex-col justify-center">
            {/* Step category tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] text-[10px] font-extrabold tracking-wider uppercase border border-blue-200/80">
                Milestone 0{index + 1} / 04
              </span>
              <span className="text-slate-400 text-[11px] font-semibold truncate">
                {step.subtitle}
              </span>
            </div>

            {/* Stat Number & Headline */}
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="text-[#2563EB] text-[38px] sm:text-[44px] font-black tracking-tight leading-none">
                {step.number}
              </span>
              <h3 className="text-[#0B0F19] text-[20px] sm:text-[23px] font-extrabold tracking-[-0.02em] leading-tight">
                {step.label}
              </h3>
            </div>

            {/* Primary Text */}
            <p className="text-[#334155] text-[13.5px] sm:text-[14.5px] font-medium leading-relaxed mb-2.5">
              {step.text}
            </p>

            {/* Enterprise Quote Box */}
            <div className="text-[#64748B] text-[12px] sm:text-[12.5px] leading-relaxed mb-3 border-l-2 border-[#2563EB] pl-3 py-1 bg-blue-50/50 rounded-r-lg">
              {step.subtext}
            </div>

            {/* Verified Feature Chips */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              {step.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100/90 border border-slate-200/80 text-[#0F172A] text-[11px] font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#2563EB]" />
                  {tag}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function PerformanceSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  // Scroll tracking across sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Silky smooth spring physics for 60fps scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setProgressPercent(Math.round(v * 100));
      // Map to 4 discrete active index zones
      const idx = Math.min(3, Math.floor(v * 4));
      setActiveIndex(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const handleStepClick = (index) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;
    const targetScroll = containerTop + (index / (STEPS.length - 1)) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[360vh] bg-white">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-white pt-20 pb-4">

        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-30" />

        {/* Engineering Grid Background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_30%,transparent_100%)] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Soft Radial Ambient Lighting */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[500px] bg-gradient-to-tr from-blue-100/50 via-sky-50/40 to-indigo-50/20 blur-3xl pointer-events-none z-0 rounded-full"
          aria-hidden="true"
        />

        {/* --- 1. HEADER & MILESTONE TRACKER --- */}
        <div className="relative z-30 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title & Pill */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 text-[#2563EB] text-[11px] font-bold tracking-wider uppercase mb-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              Enterprise Performance & Scalability
            </div>
            <h2 className="text-[#0B0F19] text-[26px] sm:text-[32px] font-extrabold tracking-[-0.03em] leading-tight">
              IDMS Infotech in Numbers
            </h2>
          </div>

          {/* Interactive Milestone Tabs */}
          <div className="relative max-w-[960px] mx-auto">
            {/* Background connection track */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-slate-200/80 hidden md:block -z-0" />
            
            {/* Active progress fill line */}
            <div
              className="absolute top-1/2 left-4 -translate-y-1/2 h-[2px] bg-[#2563EB] transition-all duration-300 hidden md:block -z-0"
              style={{
                width: `calc(${(activeIndex / (STEPS.length - 1)) * 100}% * 0.94)`
              }}
            />

            {/* Step Tabs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 relative z-10">
              {STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                const isPassed = idx < activeIndex;

                return (
                  <button
                    key={step.label}
                    onClick={() => handleStepClick(idx)}
                    className={`group relative text-left p-2 sm:p-2.5 rounded transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-white border-[#2563EB] shadow-[0_6px_20px_rgba(37,99,235,0.12)] ring-1 ring-[#2563EB]/25 scale-[1.02]'
                        : isPassed
                        ? 'bg-slate-50/90 border-slate-200 hover:bg-white hover:border-slate-300'
                        : 'bg-white/70 border-slate-200/70 hover:bg-white hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[10px] font-extrabold tracking-wider uppercase ${
                        isActive ? 'text-[#2563EB]' : 'text-slate-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-[16px] sm:text-[18px] font-black tracking-tight leading-none ${
                        isActive ? 'text-[#2563EB]' : 'text-[#0B0F19]'
                      }`}>
                        {step.number}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-medium text-slate-600 truncate">
                        {step.label}
                      </span>
                    </div>

                    {/* Active Bottom Glow Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#2563EB] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- 2. SMOOTH HARDWARE-ACCELERATED STACKING STAGE --- */}
        <div className="relative z-20 w-full flex-1 flex items-center justify-center my-auto px-4">
          <div className="relative w-full max-w-[880px] h-[380px] flex items-center justify-center">
            {STEPS.map((step, idx) => (
              <CrispStackCard
                key={step.label}
                step={step}
                index={idx}
                smoothProgress={smoothProgress}
                onSelect={handleStepClick}
              />
            ))}
          </div>
        </div>

        {/* --- 3. BOTTOM CONTROLS & CUE --- */}
        <div className="relative z-30 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Milestone Step Indicator Pills */}
          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleStepClick(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-7 h-2 bg-[#2563EB]'
                    : i < activeIndex
                    ? 'w-2 h-2 bg-blue-300 hover:bg-blue-400'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
            <span className="text-[11px] font-bold text-slate-500 ml-2">
              0{activeIndex + 1} <span className="text-slate-300">/</span> 04
            </span>
          </div>

          {/* Interactive Scroll Cue */}
          <div className="flex items-center gap-2 text-slate-400 text-[12px] font-medium">
            <span className="hidden sm:inline tracking-wider uppercase text-[10px] font-bold text-slate-500">
              Scroll to explore
            </span>
            <div className="w-4 h-5 rounded-full border border-slate-300 flex items-start justify-center p-0.5">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-[#2563EB]"
              />
            </div>
            <span className="text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              {progressPercent}%
            </span>
          </div>

        </div>

        {/* Bottom subtle divider border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-30" />
      </div>
    </section>
  );
}
