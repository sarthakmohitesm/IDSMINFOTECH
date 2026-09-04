import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import printImage from '../../assets/industry/print.png';
import tapingImage from '../../assets/industry/taping.png';
import helmetImage from '../../assets/industry/helmet.png';
import injectionImage from '../../assets/industry/injection.png';
import frpImage from '../../assets/industry/frp.png';
import machineImage from '../../assets/industry/machine.png';
import panelImage from '../../assets/industry/panel.png';
import chemicalImage from '../../assets/industry/chemical.png';
import emsImage from '../../assets/industry/ems.png';
import defenceImage from '../../assets/industry/defence.png';
import hrImage from '../../assets/industry/hr.png';

const INDUSTRIES = [
  {
    num: '01',
    title: 'Printing & Packaging',
    desc: 'Control job tickets, plate/cylinder usage, substrate consumption, and dispatch sequencing across short and long print runs.',
    image: printImage,
  },
  {
    num: '02',
    title: 'Coating & Adhesives',
    desc: 'Track batch mixing, viscosity checks, QC holds, and rework decisions from raw material issue to finished lot release.',
    image: tapingImage,
  },
  {
    num: '03',
    title: 'Helmet Manufacturing',
    desc: 'Plan shell, lining, and assembly operations with traceability for molds, test results, and stage-wise quality checkpoints.',
    image: helmetImage,
  },
  {
    num: '04',
    title: 'Plastic Moulding',
    desc: 'Monitor machine cycles, mold changes, scrap trends, and batch output while linking production to order-wise commitments.',
    image: injectionImage,
  },
  {
    num: '05',
    title: 'FRP / Composite Manufacturing',
    desc: 'Manage resin mix ratios, layup schedules, curing windows, and inspection records for each production batch.',
    image: frpImage,
  },
  {
    num: '06',
    title: 'Machine Manufacturing',
    desc: 'Coordinate BOM-driven fabrication, machining, assembly, and test-run sign-off with job-level progress tracking.',
    image: machineImage,
  },
  {
    num: '07',
    title: 'Electrical Panels & Systems',
    desc: 'Track panel assembly, wiring stages, testing protocols, and dispatch readiness against project delivery milestones.',
    image: panelImage,
  },
  {
    num: '08',
    title: 'Chemical Processing',
    desc: 'Handle recipe control, batch execution, in-process quality checks, and compliance logs with full lot traceability.',
    image: chemicalImage,
  },
  {
    num: '09',
    title: 'Electronics Manufacturing Services (EMS)',
    desc: 'Control SMT and assembly flow, revision handling, test outcomes, and serialized traceability from PCB to shipment.',
    image: emsImage,
  },
  {
    num: '10',
    title: 'Defence Equipment Manufacturing',
    desc: 'Track controlled workflows, document approvals, inspection evidence, and compliance checkpoints at every stage.',
    image: defenceImage,
  },
  {
    num: '11',
    title: 'HR & Workforce Operations',
    desc: 'Manage attendance, shift allocation, skill mapping, and manpower utilization aligned with production plans.',
    image: hrImage,
  },
];

export default function IndustriesGrid() {
  // Repeat the array to create a long track for the infinite loop effect
  const LOOP_INDUSTRIES = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];
  const [activeIndex, setActiveIndex] = useState(INDUSTRIES.length * 2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const activeIndustry = INDUSTRIES[activeIndex % INDUSTRIES.length];

  const goNext = () => {
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
  };

  // Seamless jump to maintain infinite loop
  useEffect(() => {
    const baseLength = INDUSTRIES.length;
    if (activeIndex >= baseLength * 3 || activeIndex < baseLength * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        if (activeIndex >= baseLength * 3) {
          setActiveIndex((activeIndex % baseLength) + (baseLength * 2));
        } else if (activeIndex < baseLength * 2) {
          setActiveIndex((activeIndex % baseLength) + (baseLength * 2));
        }
      }, 600); // Matches the transition duration
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <section className="relative flex h-[640px] w-full flex-col overflow-hidden bg-[#ebebff] pt-14 pb-28 md:pb-32 lg:pb-40 select-none">
      {/* Subtle grid on light blue */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full min-w-0 max-w-[1440px] flex-col px-4 sm:px-6 lg:px-[80px]">

        {/* HEADER SECTION */}
        <div className="mb-8 flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between pr-4 lg:pr-0">
          <div className="min-w-0">
            <h2 className="font-noto-sans !text-[40px] font-bold tracking-tight leading-[1.1] text-[#122a66]">
              Industries <span className="!text-[40px]">We Cater To</span>
            </h2>
            <p className="text-[#374151] mt-2 text-lg">Operational workflows mapped to each industry from planning to dispatch.</p>
          </div>
          <div className="flex shrink-0 gap-3 md:mt-0">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/80 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-all hover:bg-[#1e82e6] hover:text-white"
            >
              <HiArrowLeft size={20} strokeWidth={0.75} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/80 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-all hover:bg-[#1e82e6] hover:text-white"
            >
              <HiArrowRight size={20} strokeWidth={0.75} />
            </button>
          </div>
        </div>

        {/* IMAGE SCROLLER */}
        <div className="relative h-[330px] w-full shrink-0 overflow-hidden">
          <motion.div
            animate={{ x: `calc(-${activeIndex} * (2% + 12px))` }}
            transition={{ duration: isTransitioning ? 0.6 : 0, ease: "easeInOut" }}
            className="flex h-full gap-3 items-stretch"
          >
            {LOOP_INDUSTRIES.map((industry, idx) => {
              const isActive = activeIndex === idx;
              const diff = idx - activeIndex;

              let widthClass = "flex-[0_0_2%]";
              if (isActive) widthClass = "flex-[0_0_50%]";
              else if (diff === 1) widthClass = "flex-[0_0_12%]";
              else if (diff === 2) widthClass = "flex-[0_0_9%]";
              else if (diff === 3) widthClass = "flex-[0_0_7%]";
              else if (diff === 4) widthClass = "flex-[0_0_5%]";
              else if (diff === 5) widthClass = "flex-[0_0_3%]";
              else if (diff < 0 || diff >= 6) widthClass = "flex-[0_0_2%]";

              return (
                <div
                  key={`${industry.num}-${idx}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setActiveIndex(idx);
                  }}
                  className={`relative h-full overflow-hidden rounded-[5px] border border-[#c2e3ff] shrink-0 cursor-pointer ${isTransitioning ? 'transition-all duration-700 ease-in-out' : ''
                    } ${widthClass}`}
                >
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient and Label only for Active Card */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/45 px-6 py-4 animate-in fade-in duration-500">
                      <span className="font-noto-sans text-xs font-bold uppercase tracking-widest text-white/90">
                        Sector {industry.num}
                      </span>
                    </div>
                  )}

                  {/* Visual darkening for inactive items */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/15 transition-colors duration-300" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* DESCRIPTION AREA */}
        <div className="mt-4 min-h-0 flex-1 pr-4 lg:pr-0">
          <motion.div
            key={`info-${activeIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <div className="flex flex-row items-start justify-between gap-4">
              <div
                role="heading"
                aria-level={3}
                className="min-w-0 flex-1 pr-2 font-noto-sans text-[30px] font-medium leading-tight text-[#122a66]"
              >
                {activeIndustry.title}
              </div>
            </div>
            <div className="max-w-2xl font-noto-sans text-[18px] leading-relaxed text-[#374151]">
              {activeIndustry.desc}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Separator Line — Matches CTA design */}
      <div
        className="absolute bottom-0 z-20 pointer-events-none h-px w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}
