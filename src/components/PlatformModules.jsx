import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
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
    title: 'Lead Management',
    tagline: 'CRM & Growth',
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
  },
  {
    title: 'New Product Development',
    tagline: 'R&D & Innovation',
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
  },
  {
    title: 'Purchase',
    tagline: 'Supply Chain Control',
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
  },
  {
    title: 'Production',
    tagline: 'Shop Floor Intelligence',
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
  },
  {
    title: 'Quality',
    tagline: 'Compliance & Standards',
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
  },
  {
    title: 'Sales',
    tagline: 'Revenue Operations',
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
  },
  {
    title: 'Dispatch',
    tagline: 'Fulfillment & Logistics',
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
  },
  {
    title: 'Stores / Inventory',
    tagline: 'Stock Precision',
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
  },
  {
    title: 'Maintenance',
    tagline: 'Asset Health',
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
  },
  {
    title: 'Human Resource',
    tagline: 'People Management',
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
  },
  {
    title: 'Accounts',
    tagline: 'Financial Integrity',
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
  },
  {
    title: 'Finance',
    tagline: 'Executive Intelligence',
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
  }
];

export default function PlatformModules() {
  const [showAll, setShowAll] = useState(false);

  const visibleModules = showAll ? MODULES : MODULES.slice(0, 6);

  return (
    <section className="w-full bg-white overflow-hidden pb-20">
      {/* ALTERNATING MODULE ROWS */}
      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          {visibleModules.map((module, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col md:flex-row w-full min-h-[440px] mb-6 md:mb-0 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* CONTENT SIDE - Strict 50% */}
                <div
                  className={`w-full md:w-1/2 flex items-center py-10 px-6 ${isEven
                    ? 'lg:px-[80px] justify-center'
                    : 'lg:pl-12 lg:pr-[80px] justify-center lg:justify-start'
                    } ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafbfc]'
                    }`}
                >
                  <div className="max-w-[480px] w-full">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-blue-600">
                      {module.tagline}
                    </div>
                    <h3 className="font-noto-sans text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-[#122a66]">
                      {module.title}
                    </h3>
                    <p className="text-[15px] mb-6 leading-relaxed text-[#4B5563]">
                      {module.desc}
                    </p>

                    <div className="space-y-3 mb-8">
                      {module.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-green-200 bg-green-50 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[14px] font-medium text-[#374151] leading-tight tracking-tight">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* IMPACT BOX */}
                    <div className="bg-[#f5f3ff] border border-purple-100 rounded-[8px] p-4 mb-6 shadow-sm">
                      <p className="text-[13px] font-bold text-purple-700">
                        {module.impact}
                      </p>
                    </div>


                  </div>
                </div>

                {/* IMAGE SIDE - Strict 50% */}
                <div className="w-full md:w-1/2 relative overflow-hidden min-h-[320px] md:min-h-[500px]">
                  <motion.img
                    initial={{ scale: 1.05, opacity: 0.9 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    src={module.image}
                    alt={module.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply opacity-20"></div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* VIEW ALL BUTTON */}
      {!showAll && (
        <div className="w-full flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-blue-100/50"
          >
            <Plus className="w-5 h-5" />
            View All Modules
          </motion.button>
        </div>
      )}
    </section>
  );
}
