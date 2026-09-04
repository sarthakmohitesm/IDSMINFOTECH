import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, Eye, Clock, ChevronLeft, ChevronRight, Activity, Zap, CheckCircle2 } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'printing',
    category: 'Printing & Packaging',
    title: 'From Bottlenecks to Precision: Transforming Printing Operations',
    description: 'A leading printing and packaging manufacturer deployed IDMS Smart ERP to resolve critical substrate wastage and opaque job routing. By unifying their shop floor and inventory into a single source of truth, they achieved immediate operational clarity and significant cost savings.',
    metrics: [
      { icon: TrendingDown, value: '28%', sub: 'Reduction in Material Wastage', detail: 'Achieved through automated ink formulation tracking, exact substrate dimension calculations, and strict batch-level controls.' },
      { icon: Eye, value: '100%', sub: 'Real-Time Job Tracking', detail: 'Replaced siloed spreadsheet handovers with live, multi-stage visibility across prepress, printing, coating, slitting, and dispatch.' },
      { icon: Clock, value: '9-Month', sub: 'Complete ROI Timeline', detail: 'Recouped the entire ERP system investment in under a year exclusively through direct operational efficiencies.' }
    ]
  },
  {
    id: 'manufacturing',
    category: 'Discrete Manufacturing',
    title: 'Eliminating Blind Spots in High-Speed Assembly Lines',
    description: 'A mid-sized automotive parts manufacturer struggled with isolated legacy systems and severe inventory discrepancies. Scaling to our Smart ERP enabled real-time OEE tracking, instant QC gating, and complete synchronization across their production lines.',
    metrics: [
      { icon: Activity, value: '35%', sub: 'Increase in Machine OEE', detail: 'Proactive tracking of machine health and cycle times eliminated unscheduled micro-stoppages and bottlenecks.' },
      { icon: CheckCircle2, value: '99%', sub: 'Inventory Accuracy', detail: 'Real-time scanning and barcoding ensured that digital stock perfectly mirrored physical floor counts without end-of-month audits.' },
      { icon: Zap, value: '40%', sub: 'Cycle Time Acceleration', detail: 'Lead times shrank dramatically by removing manual job routing and digitizing paper-based QA approvals.' }
    ]
  },
  {
    id: 'logistics',
    category: 'Logistics & Distribution',
    title: 'Unifying Multi-Modal Complexities into One Dashboard',
    description: 'A high-velocity distribution enterprise needed to connect third-party logistics seamlessly with their central warehousing. Through IDMS, they automated route assignments, optimized bin packing, and introduced strict FEFO controls for perishable goods.',
    metrics: [
      { icon: TrendingDown, value: '18%', sub: 'Fuel Cost Reduction', detail: 'Intelligent route optimization and load-balancing algorithms lowered transit overhead instantly.' },
      { icon: Zap, value: '99.8%', sub: 'On-Time Dispatch Rate', detail: 'Warehouse automation and cross-docking visibility ended delays in sorting, loading, and packing.' },
      { icon: Clock, value: '3x Faster', sub: 'Billing Cycles', detail: 'Automated proof of delivery capture removed administrative lags in high-volume, multi-carrier invoicing.' }
    ]
  }
];

export default function CaseStudySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // High-end slide + fade transition
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
      filter: 'blur(8px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 20 : -20,
      opacity: 0,
      filter: 'blur(8px)'
    })
  };

  const currentStudy = CASE_STUDIES[currentIndex];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="bg-[#ebebff] py-10 flex items-center min-h-[500px]"
    >
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div 
          className="bg-white rounded-[5px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative mx-auto h-[540px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.35 },
                filter: { duration: 0.35 }
              }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_500px] h-full"
            >
              
              {/* Left Content */}
              <div className="p-8 lg:p-12 xl:p-16 flex flex-col bg-white h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#f0f7ff] text-[#122a66] text-[11px] font-bold uppercase tracking-widest mb-6 w-fit border border-[#c2e3ff] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e82e6]"></span> {currentStudy.category} PROOF
                </div>
                
                <div className="flex-1 min-h-0 flex flex-col justify-center">
                  <h2 className="text-[34px] md:text-[38px] font-bold text-[#122a66] mb-5 leading-[1.15] tracking-tight font-noto-sans">
                    {currentStudy.title}
                  </h2>
                  
                  <p className="text-[#374151] text-[17px] leading-relaxed max-w-xl line-clamp-4">
                    {currentStudy.description}
                  </p>
                </div>

                {/* Progress Tracking */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50 shrink-0">
                  <div className="flex gap-2">
                    {CASE_STUDIES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`h-1.5 rounded-[5px] transition-all duration-300 ${currentIndex === idx ? 'w-10 bg-[#1e82e6]' : 'w-3 bg-gray-200 hover:bg-gray-300'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-[#1e82e6]/30 bg-white text-[#1e82e6] transition-all hover:bg-[#1e82e6] hover:text-white"
                      aria-label="Previous Case Study"
                    >
                      <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-[#1e82e6]/30 bg-white text-[#1e82e6] transition-all hover:bg-[#1e82e6] hover:text-white"
                      aria-label="Next Case Study"
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Metrics */}
              <div className="p-8 lg:p-10 bg-[#fafbff] border-l border-gray-100 flex flex-col justify-center h-full">
                <div className="space-y-4">
                  {currentStudy.metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="bg-white rounded-[5px] p-5 border border-gray-100 flex gap-5 transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] group items-center">
                        <div className="w-12 h-12 rounded-[5px] bg-[#f0f7ff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1e82e6] group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6 text-[#1e82e6] group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col mb-1">
                            <span className="text-[22px] font-bold text-[#122a66] leading-none mb-1">{metric.value}</span>
                            <span className="text-[11px] font-bold text-[#1e82e6] tracking-tight uppercase leading-tight">{metric.sub}</span>
                          </div>
                          <p className="text-[#374151] text-[12px] leading-relaxed font-normal opacity-70">{metric.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

