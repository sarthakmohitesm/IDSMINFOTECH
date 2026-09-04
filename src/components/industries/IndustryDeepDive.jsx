import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Target, Layers, Settings, Zap, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import splashLogo from '../../assets/shapes/splash_logo.svg';

const DEEP_DIVE_DATA = [
  {
    id: 'printing',
    label: 'Printing & Packaging',
    title: 'Precision Controls for Complex Press Scheduling',
    description: 'Generic ERP platforms fail at substrate calculations, multi-stage job routing, and ink batch tracking. IDMS is built to manage the volatility of material costs and the fast-paced nature of printing operations.',
    pains: [
      'Non-linear job routing (prepress, printing, coating)',
      'Substrate calculation and ink wastage measurement',
      'Batch-level traceability for sensitive packaging'
    ],
    solutions: [
      { title: 'Substrate & Ink Tracking', desc: 'Manage GSM and consumption.' },
      { title: 'Smart Press Scheduling', desc: 'Optimize machine sequencing.' }
    ],
    metrics: [
      { value: '25%', label: 'Less Wastage' },
      { value: '18%', label: 'Uptime Up' }
    ],
    quote: "IDMS transformed our roll-to-roll operations with real-time margin visibility."
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    title: 'Shop-Floor Intelligence for Modern Factories',
    description: 'Align your inventory, machines, and workforce. IDMS provides a single source of truth for discrete and process manufacturing workflows, optimizing production cycles in real-time.',
    pains: [
      'Inventory leakage and stock discrepancies',
      'Unplanned machine downtime & maintenance',
      'Inaccurate Cost of Goods Sold (COGS)'
    ],
    solutions: [
      { title: 'Machine-Level Efficiency', desc: 'Track OEE and health.' },
      { title: 'Quality Gates', desc: 'Integrated QC checkpoints.' }
    ],
    metrics: [
      { value: '32%', label: 'OEE Increase' },
      { value: '20%', label: 'Stock Saving' }
    ],
    quote: "The shop-floor intelligence has eliminated stock discrepancies entirely."
  },
  {
    id: 'logistics',
    label: 'Logistics / Ops',
    title: 'Optimized Movement for High-Velocity Ops',
    description: 'Track movement, manage field assets, and optimize routes. IDMS bridges the gap between the warehouse and the last mile with intelligent tracking systems.',
    pains: [
      'Fuel and resource wastage',
      'Lack of real-time movement visibility',
      'Inefficient route and load planning'
    ],
    solutions: [
      { title: 'Route Optimization', desc: 'Reduce travel time and fuel.' },
      { title: 'Asset Visibility', desc: 'Real-time GPS status tracking.' }
    ],
    metrics: [
      { value: '18%', label: 'Fuel Savings' },
      { value: '95%', label: 'On-Time Del.' }
    ],
    quote: "Last-mile tracking is now our biggest competitive advantage."
  }
];

const AnimatedCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div>
      <div className="text-3xl font-bold text-[#008FFF]">
        {count}{suffix}
      </div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">{label}</div>
    </div>
  );
};

export default function IndustryDeepDive() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full min-h-[95vh] bg-gradient-to-b from-[#f8fbff] to-white py-12 flex flex-col justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-[60px] relative z-10">

        {/* Header Section: Title + Right aligned Tabs */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[36px] md:text-[40px] font-bold text-[#122a66] leading-tight tracking-tight">
              Industry-Specific ERP Capabilities
            </h2>
          </div>

          <div className="flex-shrink-0">
            <div className="flex p-1 bg-white rounded-[5px] border border-gray-200 shadow-sm">
              {DEEP_DIVE_DATA.map((tab, idx) => (
                <button
                  key={tab.id}
                  className={`relative px-6 py-2.5 rounded-[5px] text-[12px] font-bold transition-all duration-300 ${activeTab === idx ? 'text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === idx && (
                    <motion.div
                      layoutId="activeDeepDiveTab"
                      className="absolute inset-0 bg-[#008FFF] rounded-[5px] shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
            >
              {/* Main Content Card */}
              <div className="bg-white rounded-[5px] p-8 lg:p-9 border border-gray-100 shadow-sm flex flex-col h-full min-h-[440px]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-[2px] bg-[#008FFF]" />
                  <span className="text-[11px] font-bold text-[#008FFF] tracking-[0.2em] uppercase">Industry Solution</span>
                </div>

                <h3 className="text-[28px] md:text-[34px] font-bold text-[#122a66] mb-4 font-noto-sans tracking-tight leading-tight">
                  {DEEP_DIVE_DATA[activeTab].title}
                </h3>

                <p className="text-slate-600 text-[16px] leading-relaxed mb-6 max-w-2xl font-light">
                  {DEEP_DIVE_DATA[activeTab].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Traditional Challenges</p>
                    {DEEP_DIVE_DATA[activeTab].pains.map((pain, i) => (
                      <div key={i} className="flex gap-2.5 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
                        <span className="text-slate-700 text-[14px] font-medium leading-tight">{pain}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Expert Solutions</p>
                    {DEEP_DIVE_DATA[activeTab].solutions.map((sol, i) => (
                      <div key={i} className="flex gap-3.5">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#008FFF]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-[14px] leading-snug">{sol.title}</h4>
                          <p className="text-slate-500 text-[12px] mt-0.5">{sol.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="flex flex-col gap-4">
                {/* Metrics Card */}
                <div className="bg-[#ebebff]/50 backdrop-blur-sm rounded-[5px] p-8 relative overflow-hidden border border-gray-100 shadow-md flex-1 flex flex-col justify-center min-h-[260px]">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
                  <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#008FFF] mb-8 text-center">Outcome Benchmarks</p>

                  <div className="relative z-10 grid grid-cols-2 lg:grid-cols-1 gap-8">
                    {DEEP_DIVE_DATA[activeTab].metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-5 px-3">
                        <div className="w-10 h-10 rounded-[5px] bg-white flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
                          {i === 0 ? <Zap className="w-5 h-5 text-[#008FFF]" /> : <BarChart3 className="w-5 h-5 text-[#008FFF]" />}
                        </div>
                        <AnimatedCounter value={metric.value} label={metric.label} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote Card */}
                <div className="bg-[#008FFF] rounded-[5px] p-7 text-white relative overflow-hidden min-h-[140px] flex items-center shadow-lg shadow-blue-500/10">
                  <div className="absolute -bottom-8 -right-8 opacity-[0.18]">
                    <img
                      src={splashLogo}
                      alt=""
                      className="w-37 h-auto"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <p className="relative z-10 text-[15px] font-medium leading-[1.6] italic opacity-95">
                    "{DEEP_DIVE_DATA[activeTab].quote}"
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
