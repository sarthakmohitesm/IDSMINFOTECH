import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
    num: '01',
    title: 'Lead Management',
    desc: 'Capture and qualify leads with pipeline visibility, follow-ups, and sales alignment from first touch to opportunity.',
    features: [
      'Lead capture & scoring',
      'Pipeline tracking',
      'Follow-up workflows',
      'Source attribution',
      'Sales handoff',
    ],
    image: leadsImage,
  },
  {
    num: '02',
    title: 'New Product Development',
    desc: 'Run product development with traceability, design collaboration, and documentation from concept through prototype.',
    features: [
      'Product development stages',
      'Full traceability',
      'Design collaboration',
      'Prototype tracking',
      'Specification control',
    ],
    image: npdImage,
  },
  {
    num: '03',
    title: 'Purchase',
    desc: 'Simplify procurement with vendor coordination, PO visibility, approvals, and clearer buying control across the supply chain.',
    features: [
      'PO automation',
      'Vendor management',
      'Approval tracking',
      'Price history',
      'Goods receipt alignment',
    ],
    image: purchaseImage,
  },
  {
    num: '04',
    title: 'Production',
    desc: 'Run the production floor with stronger job order visibility, resource planning, and output monitoring across operations.',
    features: [
      'Job order tracking',
      'Resource allocation',
      'Output monitoring',
      'Quality checkpoints',
      'WIP tracking',
    ],
    image: productionImage,
  },
  {
    num: '05',
    title: 'Quality',
    desc: 'Embed quality at every stage with audits, compliance checks, and consistent standards across the plant.',
    features: [
      'Quality audits',
      'Compliance checks',
      'Inspection workflows',
      'Defect logging',
      'Batch certification',
    ],
    image: qualityImage,
  },
  {
    num: '06',
    title: 'Sales',
    desc: 'Manage the full sales journey from quotations to orders with visibility that supports stronger growth and fulfillment.',
    features: [
      'Quotation & orders',
      'Order processing',
      'Customer tracking',
      'Pricing visibility',
      'Delivery coordination',
    ],
    image: salesImage,
  },
  {
    num: '07',
    title: 'Dispatch',
    desc: 'Coordinate the final leg of delivery with better control over packing, logistics, shipping, and customer communication.',
    features: [
      'Shipment planning',
      'Packing control',
      'Logistics tracking',
      'Carrier coordination',
      'Delivery confirmation',
    ],
    image: dispatchImage,
  },
  {
    num: '08',
    title: 'Stores / Inventory',
    desc: 'Keep inventory visible in real time with inward and outward tracking, material control, and stock alerts.',
    features: [
      'Real-time stock levels',
      'Inventory movement',
      'Smart alerts',
      'Stock valuation',
      'Expiry & batch control',
    ],
    image: storesImage,
  },
  {
    num: '09',
    title: 'Maintenance',
    desc: 'Reduce downtime with preventive and corrective maintenance scheduling that improves asset reliability and continuity.',
    features: [
      'Preventive scheduling',
      'Corrective work orders',
      'Asset lifecycle',
      'Spare parts linkage',
      'Breakdown analysis',
    ],
    image: maintenanceImage,
  },
  {
    num: '10',
    title: 'Human Resource',
    desc: 'Handle payroll, attendance, recruitment, and employee records with administrative workflows in one place.',
    features: [
      'Payroll & attendance',
      'Recruitment',
      'Employee records',
      'Performance & training',
      'HR policy workflows',
    ],
    image: hrImage,
  },
  {
    num: '11',
    title: 'Accounts',
    desc: 'Streamline billing, taxation, payables, receivables, and audit-ready records in one financial operating layer.',
    features: [
      'Billing & taxation',
      'Payables & receivables',
      'General ledger',
      'Bank reconciliation',
      'Audit-ready records',
    ],
    image: accountsImage,
  },
  {
    num: '12',
    title: 'Finance',
    desc: 'Monitor business health through budgeting, expenses, income visibility, and reporting with better operational clarity.',
    features: [
      'Budgeting insights',
      'Expense tracking',
      'Financial reporting',
      'Cash flow analysis',
      'Tax compliance',
    ],
    image: financeImage,
  },
];

function wrap(index) {
  return (index + MODULES.length) % MODULES.length;
}

export default function SolutionSection() {
  const LOOP_MODULES = [...MODULES, ...MODULES, ...MODULES];
  const [activeIndex, setActiveIndex] = useState(MODULES.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const activeModule = MODULES[activeIndex % MODULES.length];

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
    if (activeIndex >= MODULES.length * 2 || activeIndex < MODULES.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        if (activeIndex >= MODULES.length * 2) {
          setActiveIndex(activeIndex % MODULES.length + MODULES.length);
        } else if (activeIndex < MODULES.length) {
          setActiveIndex(activeIndex % MODULES.length + MODULES.length);
        }
      }, 600); // Matches the motion transition duration
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white py-16 sm:py-20 lg:py-24 select-none">
      {/* Subtle Grid on white background matching main section */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 60%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full min-w-0 max-w-[1440px] flex-col px-4 sm:px-6 lg:px-[80px]">

        {/* HEADER SECTION */}
        <div className="mb-8 flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between pr-4 lg:pr-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-200/80 bg-blue-50/70 text-blue-700 text-[12px] font-semibold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>Modular Platform</span>
            </div>
            <h2 className="text-[32px] sm:text-[44px] font-extrabold tracking-tight leading-[1.12] text-[#0B0F19]">
              A Unified Business Ecosystem
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#64748B] mt-2 max-w-xl">
              12 interconnected enterprise modules built for seamless end-to-end operational clarity.
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5 md:mt-0">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous module"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-xs backdrop-blur-sm transition-all hover:border-blue-400 hover:text-blue-600 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next module"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-xs backdrop-blur-sm transition-all hover:border-blue-400 hover:text-blue-600 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* IMAGE SCROLLER — fixed height */}
        <div className="relative h-[340px] w-full shrink-0 overflow-hidden">
          <motion.div
            animate={{ x: `calc(-${activeIndex} * (2% + 12px))` }}
            transition={{ duration: isTransitioning ? 0.6 : 0, ease: "easeInOut" }}
            className="flex h-full gap-3 items-stretch"
          >
            {LOOP_MODULES.map((module, idx) => {
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
                  key={`${module.num}-${idx}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setActiveIndex(idx);
                  }}
                  className={`relative h-full overflow-hidden rounded-2xl border border-slate-200/90 shadow-md shrink-0 cursor-pointer ${isTransitioning ? 'transition-all duration-700 ease-in-out' : ''
                    } ${widthClass}`}
                >
                  <img
                    src={module.image}
                    alt={module.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient and Label only for Active Card */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-6 py-5 animate-in fade-in duration-500">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest shadow-xs">
                        Module {module.num}
                      </span>
                    </div>
                  )}

                  {/* Visual darkening for inactive items */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* DESCRIPTION AREA - BELOW IMAGES */}
        <div className="mt-6 min-h-0 flex-1 pr-4 lg:pr-0">
          <motion.div
            key={`info-${activeIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <div className="flex flex-row items-start justify-between gap-4 mb-2">
              <div
                role="heading"
                aria-level={3}
                className="min-w-0 flex-1 pr-2 text-[26px] sm:text-[32px] font-extrabold leading-tight text-[#0B0F19]"
              >
                {activeModule.title}
              </div>
              <Link
                to="/platform"
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
              >
                <span>Learn More</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
            <div className="max-w-3xl text-[16px] leading-relaxed text-[#4B5563]">
              {activeModule.desc}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
