import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  MousePointer,
  ExternalLink,
  Layers,
  Sliders,
  Maximize2
} from 'lucide-react';

import leadsImage from '../assets/modules/leads.png';
import npdImage from '../assets/modules/npd.png';
import purchaseImage from '../assets/modules/purchase.png';
import productionImage from '../assets/modules/production.png';
import qualityImage from '../assets/modules/quality.png';
import salesImage from '../assets/modules/sales.png';
import dispatchImage from '../assets/modules/dispatch.png';
import storesImage from '../assets/modules/stores.png';
import maintenanceImage from '../assets/modules/maintenance.png';
import hrImage from '../assets/modules/hr.png';
import accountsImage from '../assets/modules/accounts.png';
import financeImage from '../assets/modules/finance.png';

const MODULES = [
  {
    id: 'leads',
    title: 'Lead Management',
    tagline: 'CRM & Growth',
    badgeText: 'Pipeline Optimization',
    desc: 'Capture and qualify leads with pipeline visibility, follow-ups, and sales alignment from first touch to opportunity.',
    items: [
      'Lead capture & scoring',
      'Pipeline tracking',
      'Follow-up workflows',
      'Source attribution',
      'Sales handoff'
    ],
    impact: 'Impact: Shorter sales cycles; clear CRM visibility',
    image: leadsImage,
    accentColor: '#2563EB',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'npd',
    title: 'New Product Development',
    tagline: 'R&D & Innovation',
    badgeText: 'Lifecycle Traceability',
    desc: 'Run product development with traceability, design collaboration, and documentation from concept through prototype.',
    items: [
      'Product development stages',
      'Full traceability',
      'Design collaboration',
      'Prototype tracking',
      'Specification control'
    ],
    impact: 'Impact: Faster time-to-market; design control',
    image: npdImage,
    accentColor: '#7C3AED',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'purchase',
    title: 'Purchase',
    tagline: 'Supply Chain Control',
    badgeText: 'Vendor Automation',
    desc: 'Simplify procurement with vendor coordination, PO visibility, approvals, and clearer buying control across the supply chain.',
    items: [
      'PO automation',
      'Vendor management',
      'Approval tracking',
      'Price history',
      'Goods receipt alignment'
    ],
    impact: 'Impact: Optimized spending; vendor transparency',
    image: purchaseImage,
    accentColor: '#059669',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'production',
    title: 'Production',
    tagline: 'Shop Floor Intelligence',
    badgeText: 'Real-time Line Telemetry',
    desc: 'Run the production floor with stronger job order visibility, resource planning, and output monitoring across operations.',
    items: [
      'Job order tracking',
      'Resource allocation',
      'Output monitoring',
      'Quality checkpoints',
      'WIP tracking'
    ],
    impact: 'Impact: Maximum throughput; real-time line visibility',
    image: productionImage,
    accentColor: '#D97706',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'quality',
    title: 'Quality',
    tagline: 'Compliance & Standards',
    badgeText: 'Zero-Defect Protocol',
    desc: 'Embed quality at every stage with audits, compliance checks, and consistent standards across the plant.',
    items: [
      'Quality audits',
      'Compliance checks',
      'Inspection workflows',
      'Defect logging',
      'Batch certification'
    ],
    impact: 'Impact: Zero-defect delivery; full compliance',
    image: qualityImage,
    accentColor: '#DC2626',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'sales',
    title: 'Sales',
    tagline: 'Revenue Operations',
    badgeText: 'Quotation Engine',
    desc: 'Manage the full sales journey from quotations to orders with visibility that supports stronger growth and fulfillment.',
    items: [
      'Quotation & orders',
      'Order processing',
      'Customer tracking',
      'Pricing visibility',
      'Delivery coordination'
    ],
    impact: 'Impact: Higher deal velocity; customer satisfaction',
    image: salesImage,
    accentColor: '#2563EB',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'dispatch',
    title: 'Dispatch',
    tagline: 'Fulfillment & Logistics',
    badgeText: 'Carrier Coordination',
    desc: 'Coordinate the final leg of delivery with better control over packing, logistics, shipping, and customer communication.',
    items: [
      'Shipment planning',
      'Packing control',
      'Logistics tracking',
      'Carrier coordination',
      'Delivery confirmation'
    ],
    impact: 'Impact: On-time delivery; accurate packing',
    image: dispatchImage,
    accentColor: '#0D9488',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    id: 'stores',
    title: 'Stores / Inventory',
    tagline: 'Stock Precision',
    badgeText: 'Real-time Inward/Outward',
    desc: 'Keep inventory visible in real time with inward and outward tracking, material control, and stock alerts.',
    items: [
      'Real-time stock levels',
      'Inventory movement',
      'Smart alerts',
      'Stock valuation',
      'Expiry & batch control'
    ],
    impact: 'Impact: Accurate inventory; reduced wastage',
    image: storesImage,
    accentColor: '#EA580C',
    tagColor: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    tagline: 'Asset Health',
    badgeText: 'Predictive Scheduling',
    desc: 'Reduce downtime with preventive and corrective maintenance scheduling that improves asset reliability and continuity.',
    items: [
      'Preventive scheduling',
      'Corrective work orders',
      'Asset lifecycle',
      'Spare parts linkage',
      'Breakdown analysis'
    ],
    impact: 'Impact: Higher uptime; extended machine life',
    image: maintenanceImage,
    accentColor: '#4F46E5',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'hr',
    title: 'Human Resource',
    tagline: 'People Management',
    badgeText: 'Talent & Attendance Suite',
    desc: 'Handle payroll, attendance, recruitment, and employee records with administrative workflows in one place.',
    items: [
      'Payroll & attendance',
      'Recruitment',
      'Employee records',
      'Performance & training',
      'HR policy workflows'
    ],
    impact: 'Impact: Efficient administration; happy workforce',
    image: hrImage,
    accentColor: '#0284C7',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  {
    id: 'accounts',
    title: 'Accounts',
    tagline: 'Financial Integrity',
    badgeText: 'Audit-Ready Ledgers',
    desc: 'Streamline billing, taxation, payables, receivables, and audit-ready records in one financial operating layer.',
    items: [
      'Billing & taxation',
      'Payables & receivables',
      'General ledger',
      'Bank reconciliation',
      'Audit-ready records'
    ],
    impact: 'Impact: Clean accounting; faster closures',
    image: accountsImage,
    accentColor: '#059669',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'finance',
    title: 'Finance',
    tagline: 'Executive Intelligence',
    badgeText: 'Budget & Cashflow Analytics',
    desc: 'Monitor business health through budgeting, expenses, income visibility, and reporting with better operational clarity.',
    items: [
      'Budgeting insights',
      'Expense tracking',
      'Financial reporting',
      'Cash flow analysis',
      'Tax compliance'
    ],
    impact: 'Impact: Smart decisions; healthy bottom line',
    image: financeImage,
    accentColor: '#2563EB',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
  }
];

/* ─── 3D Interactive Tilt Card Component with Glare & Depth ─── */
function Interactive3DDisplay({ activeModule }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 22, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [9, -9]);
  const rotateY = useTransform(smoothX, [0, 1], [-9, 9]);

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[620px] rounded-2xl bg-white border border-slate-200/90 shadow-[0_28px_65px_-10px_rgba(15,23,42,0.18),0_10px_24px_-5px_rgba(37,99,235,0.08)] overflow-hidden transition-shadow duration-300"
      >
        {/* macOS-style top chrome window bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/95 border-b border-slate-200/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-[11px] font-semibold text-slate-500 tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              IDMS Smart ERP &bull; {activeModule.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
              Live Workspace
            </span>
          </div>
        </div>

        {/* Screenshot Image Container */}
        <div className="relative aspect-[16/10] sm:aspect-[16/10.2] w-full overflow-hidden bg-slate-100">
          <motion.img
            key={activeModule.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            src={activeModule.image}
            alt={activeModule.title}
            className="w-full h-full object-cover object-top"
          />

          {/* Dynamic Light Glare Overlay */}
          <motion.div
            style={{
              background: `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255,255,255,0.28) 0%, transparent 80%)`,
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
          />

          {/* Bottom gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

          {/* Floating 3D Badge on Top of Image */}
          <div
            style={{ transform: 'translateZ(32px)' }}
            className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11.5px] sm:text-xs font-semibold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {activeModule.badgeText}
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold shadow">
              <Sparkles className="w-3 h-3 text-[#2563EB]" />
              Enterprise Feature
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PlatformModules() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const manualTimeoutRef = useRef(null);

  // Monitor scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate active index from scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (isManualOverride) return;
      // Clamp latest between 0 and 1
      const progress = Math.max(0, Math.min(latest, 0.999));
      const targetIndex = Math.floor(progress * MODULES.length);
      setActiveIndex(Math.min(targetIndex, MODULES.length - 1));
    });

    return () => unsubscribe();
  }, [smoothProgress, isManualOverride]);

  // Jump to specific module and smoothly scroll to its position in container
  const jumpToModule = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, MODULES.length - 1));
    setActiveIndex(clampedIndex);
    setIsManualOverride(true);

    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualOverride(false);
    }, 1200);

    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScroll = containerTop + (clampedIndex / MODULES.length) * totalScrollable + 20;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrev = () => jumpToModule(activeIndex - 1);
  const handleNext = () => jumpToModule(activeIndex + 1);

  const activeModule = MODULES[activeIndex] || MODULES[0];

  return (
    <section
      ref={containerRef}
      // Height gives ample scroll track to cycle through 12 modules comfortably
      className="relative w-full bg-[#FAFBFD] select-none"
      style={{ height: '340vh' }}
    >
      {/* Top Hairline Divider */}
      <div
        className="absolute top-0 left-0 right-0 z-30 pointer-events-none h-px w-full"
        style={{ background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)' }}
        aria-hidden="true"
      />

      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-4 pb-5 sm:pt-6 sm:pb-6">

        {/* Ambient Volumetric Color Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(219,234,254,0.65)_0%,transparent_70%)] rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(238,242,255,0.7)_0%,transparent_70%)] rounded-full blur-3xl" />
        </div>

        {/* ── 1. HEADER & INTERACTIVE MODULE PILL BAR ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] z-20 shrink-0">
          {/* Top text row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3.5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-[#2563EB] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modular Operating Architecture</span>
              </div>
              <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-extrabold tracking-tight text-[#0F172A] leading-tight">
                Explore All 11+ Modules in <span className="text-[#2563EB]">3D Perspective</span>
              </h2>
            </div>

            {/* Hint & Navigation Buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <MousePointer className="w-3.5 h-3.5 text-[#2563EB] animate-bounce" />
                <span>Scroll page to rotate modules</span>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-9 h-9 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 disabled:opacity-35 disabled:hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Previous module"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-lg min-w-[58px] text-center shadow-xs">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(MODULES.length).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === MODULES.length - 1}
                  className="w-9 h-9 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 disabled:opacity-35 disabled:hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Next module"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scrollable Pill Rail */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1 pt-0.5">
            <div className="flex items-center gap-2 min-w-max">
              {MODULES.map((m, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => jumpToModule(idx)}
                    className={`
                      px-3.5 py-1.5 rounded-full text-[12px] sm:text-[12.5px] font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer
                      ${isActive
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25 scale-[1.03]'
                        : 'bg-white/90 text-slate-600 hover:bg-slate-100/90 border border-slate-200/80 shadow-xs hover:text-slate-900'
                      }
                    `}
                  >
                    <span className={`text-[10px] font-bold opacity-75 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{m.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 2. MAIN 3D SHOWCASE STAGE ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] z-20 flex-1 flex items-center my-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* ── LEFT COLUMN: MODULE DETAILS ── */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule.id}
                  initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start"
                >
                  {/* Category Pill */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-[0.16em] border mb-3.5 shadow-xs ${activeModule.tagColor}`}>
                    <span>{activeModule.tagline}</span>
                  </div>

                  {/* Module Title */}
                  <h3 className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold tracking-tight text-[#0F172A] leading-[1.12] mb-3.5">
                    {activeModule.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-5 max-w-lg">
                    {activeModule.desc}
                  </p>

                  {/* Bullet Points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 w-full">
                    {activeModule.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                        </div>
                        <span className="text-[13px] sm:text-[13.5px] font-medium text-slate-700 leading-snug">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Impact Highlight Box */}
                  <div className="w-full p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50/90 via-indigo-50/60 to-purple-50/90 border border-purple-100 shadow-xs mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100/90 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700 shadow-xs">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <p className="text-[13px] sm:text-[13.5px] font-bold text-purple-900 leading-snug">
                      {activeModule.impact}
                    </p>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-3.5">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <span>Request Module Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </Link>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={activeIndex === MODULES.length - 1}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-[13.5px] font-semibold border border-slate-200/90 shadow-xs hover:border-slate-300 disabled:opacity-40 transition-all cursor-pointer"
                    >
                      <span>Next Module</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT COLUMN: 3D INTERACTIVE TILT SCREEN ── */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[300px] sm:min-h-[420px]">
              <Interactive3DDisplay activeModule={activeModule} />
            </div>

          </div>
        </div>

        {/* ── 3. BOTTOM PROGRESS TRACK ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] z-20 shrink-0">
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200/70">
            {/* Active category details */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">{activeModule.title}</span>
              <span>&bull;</span>
              <span>{activeModule.tagline}</span>
            </div>

            {/* Segmented Progress Indicator */}
            <div className="flex-1 max-w-md hidden sm:flex items-center gap-1.5 mx-4">
              {MODULES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => jumpToModule(i)}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'bg-[#2563EB] scale-y-125'
                      : i < activeIndex
                      ? 'bg-blue-200'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={MODULES[i].title}
                />
              ))}
            </div>

            {/* Module count */}
            <div className="text-xs font-bold text-slate-600">
              <span className="text-[#2563EB]">{activeIndex + 1}</span> of {MODULES.length}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Hairline Divider */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none h-[2px] w-full"
        style={{ background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)' }}
        aria-hidden="true"
      />
    </section>
  );
}
