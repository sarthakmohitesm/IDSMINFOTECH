import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
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
    <section className="relative flex h-[640px] w-full flex-col overflow-hidden bg-[#ebebff] pt-14 pb-28 md:pb-32 lg:pb-40 select-none">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background:
            'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
      {/* Subtle grid on light blue */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
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
              A Unified Business <span className="!text-[40px]">Ecosystem</span>
            </h2>
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

        {/* IMAGE SCROLLER — fixed height (shorter strip) */}
        <div className="relative h-[330px] w-full shrink-0 overflow-hidden">
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
                  className={`relative h-full overflow-hidden rounded-[5px] border border-[#c2e3ff] shrink-0 ${isTransitioning ? 'transition-all duration-700 ease-in-out' : ''
                    } ${widthClass}`}
                >
                  <img
                    src={module.image}
                    alt={module.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Gradient and Label only for Active Card */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/45 px-6 py-4 animate-in fade-in duration-500">
                      <span className="font-noto-sans text-xs font-bold uppercase tracking-widest text-white/90">
                        Module {module.num}
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

        {/* DESCRIPTION AREA - BELOW IMAGES */}
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
                {activeModule.title}
              </div>
              <Link
                to="/platform"
                className="group mt-[5px] inline-flex h-10 shrink-0 items-center justify-center rounded-[5px] border border-[#1e82e6] bg-white px-5 font-noto-sans text-sm font-bold text-[#1e82e6] shadow-sm transition-all hover:bg-[#1e82e6] hover:text-white"
              >
                Learn More
                <ArrowUpRight
                  className="ml-2 h-4 w-4 text-[#1e82e6] transition-colors group-hover:text-white"
                  strokeWidth={2.25}
                />
              </Link>
            </div>
            <div className="max-w-2xl font-noto-sans text-[18px] leading-relaxed text-[#374151]">
              {activeModule.desc}
            </div>
          </motion.div>
        </div>

      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px"
        style={{
          background:
            'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}
