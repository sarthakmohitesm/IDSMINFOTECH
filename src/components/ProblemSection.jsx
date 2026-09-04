import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Package,
  TrendingUp,
  Factory,
  Users,
  Clock,
  CheckCircle2,
  Check,
  Sparkles
} from 'lucide-react';

export default function ProblemSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_60%,transparent_100%)] pointer-events-none opacity-70"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          PART 1: BEFORE SMART ERP (Exact match to requested design)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 flex flex-col items-center"
        >
          <div className="text-[13px] sm:text-[14px] text-[#3B82F6] font-bold uppercase tracking-[0.2em] mb-3">
            THE REALITY CHECK
          </div>

          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#0F172A] tracking-[-0.025em] leading-[1.12] mb-3.5">
            This is how most businesses operate.
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#64748B] max-w-2xl text-center font-normal leading-relaxed">
            Manual processes, disconnected data, and delayed decisions cost enterprises more than they realise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_16px_45px_rgba(15,23,42,0.05)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* LEFT COLUMN: Headings & CTA */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="text-[12px] font-bold text-[#FF1E56] uppercase tracking-[0.14em] mb-2.5">
                BEFORE SMART ERP
              </div>
              <h3 className="text-[32px] sm:text-[38px] font-extrabold text-[#0B0F19] tracking-[-0.03em] leading-[1.12] mb-3">
                Disconnected today. <br />
                Costly tomorrow.
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] leading-relaxed mb-6 max-w-sm">
                Silos between departments lead to delays, errors and lost opportunities.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('after-smart-erp')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#FFD0DB] text-[#FF1E56] hover:bg-[#FFF5F7] text-[13px] font-semibold transition-all shadow-2xs"
                >
                  <span>See how Smart ERP fixes this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CENTER COLUMN: Radial Network Diagram */}
            <div className="lg:col-span-5 relative w-full h-[280px] flex items-center justify-center select-none">
              {/* SVG Connecting Lines with Broken Markers */}
              <svg
                viewBox="0 0 400 280"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Dotted Connection Lines */}
                <line x1="200" y1="140" x2="105" y2="52" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="140" x2="295" y2="52" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="140" x2="88" y2="140" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="140" x2="312" y2="140" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="140" x2="105" y2="228" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="140" x2="295" y2="228" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Broken ✕ Markers on lines */}
                {/* 1. To Finance */}
                <circle cx="152" cy="96" r="7.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
                <path d="M 149.5 93.5 L 154.5 98.5 M 154.5 93.5 L 149.5 98.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />

                {/* 2. To Inventory */}
                <circle cx="248" cy="96" r="7.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
                <path d="M 245.5 93.5 L 250.5 98.5 M 250.5 93.5 L 245.5 98.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />

                {/* 3. To Sales */}
                <circle cx="144" cy="140" r="7.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
                <path d="M 141.5 137.5 L 146.5 142.5 M 146.5 137.5 L 141.5 142.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />

                {/* 4. To Production */}
                <circle cx="256" cy="140" r="7.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
                <path d="M 253.5 137.5 L 258.5 142.5 M 258.5 137.5 L 253.5 142.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />

                {/* 5. To HR */}
                <circle cx="152" cy="184" r="7.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
                <path d="M 149.5 181.5 L 154.5 186.5 M 154.5 181.5 L 149.5 186.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />

                {/* 6. To Analytics */}
                <circle cx="248" cy="184" r="7.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
                <path d="M 245.5 181.5 L 250.5 186.5 M 250.5 181.5 L 245.5 186.5" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Central Warning Triangle Circle */}
              <div className="w-16 h-16 rounded-full bg-[#FFF1F2] border border-[#FFE4E6] flex items-center justify-center text-[#F43F5E] shadow-sm z-10">
                <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
              </div>

              {/* 6 Outer Department Badges */}
              {/* 1. Finance (Top Left) */}
              <div className="absolute top-2 left-2 sm:left-4 z-10 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 shadow-xs flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#FFF1F2] text-[#F43F5E] flex items-center justify-center text-xs font-bold">
                  $
                </span>
                <span className="text-[13px] font-semibold text-slate-800">Finance</span>
              </div>

              {/* 2. Inventory (Top Right) */}
              <div className="absolute top-2 right-2 sm:right-4 z-10 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 shadow-xs flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center">
                  <Package className="w-3.5 h-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-slate-800">Inventory</span>
              </div>

              {/* 3. Sales (Middle Left) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 shadow-xs flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-slate-800">Sales</span>
              </div>

              {/* 4. Production (Middle Right) */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 shadow-xs flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center">
                  <Factory className="w-3.5 h-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-slate-800">Production</span>
              </div>

              {/* 5. HR (Bottom Left) */}
              <div className="absolute bottom-2 left-4 sm:left-6 z-10 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 shadow-xs flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-slate-800">HR</span>
              </div>

              {/* 6. Analytics (Bottom Right) */}
              <div className="absolute bottom-2 right-4 sm:right-6 z-10 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 shadow-xs flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-slate-800">Analytics</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Pain Points & Stats */}
            <div className="lg:col-span-3 flex flex-col justify-center gap-4">
              <div className="space-y-4">
                {/* Pain Point 1 */}
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF1E56] shrink-0 mt-1.5" />
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 leading-snug">
                      Finance & Inventory Gap
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">
                      3-5 days to reconcile and close books.
                    </div>
                  </div>
                </div>

                {/* Pain Point 2 */}
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF1E56] shrink-0 mt-1.5" />
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 leading-snug">
                      Outdated Sales Quotes
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">
                      Old pricing data leads to margin loss.
                    </div>
                  </div>
                </div>

                {/* Pain Point 3 */}
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF1E56] shrink-0 mt-1.5" />
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 leading-snug">
                      Manual Spreadsheet Sync
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">
                      Teams lose hours in repetitive tasks.
                    </div>
                  </div>
                </div>

                {/* Pain Point 4 */}
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF1E56] shrink-0 mt-1.5" />
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 leading-snug">
                      Data Conflicts & Audit Risk
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5">
                      Inconsistent data increases compliance risk.
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 my-1" />

              {/* Bottom Metrics */}
              <div className="flex items-center gap-5 pt-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[26px] font-extrabold text-[#FF1E56] tracking-tight leading-none">
                    14
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight">
                    Unresolved <br /> Discrepancies
                  </span>
                </div>

                <div className="h-7 w-px bg-slate-200" />

                <div className="flex items-center gap-2.5">
                  <span className="text-[26px] font-extrabold text-[#FF1E56] tracking-tight leading-none">
                    72 hrs
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight">
                    Reporting <br /> Lag
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION CONNECTOR PILL
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-200/90 bg-white shadow-[0_4px_16px_rgba(37,99,235,0.1)] text-[12px] font-bold tracking-wider uppercase text-blue-700">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Smart ERP Transforms The Outcome</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART 2: UNIFIED INTELLIGENCE (AFTER SMART ERP)
      ───────────────────────────────────────────────────────────── */}
      <section id="after-smart-erp" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200/80 bg-emerald-50/70 text-emerald-700 text-[12px] font-semibold tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Unified Intelligence</span>
          </div>

          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#0B0F19] tracking-[-0.025em] leading-[1.12] mb-4">
            This is how modern businesses operate.
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#4B5563] max-w-2xl text-center font-normal leading-relaxed">
            Real-time data, connected departments, and faster decisions — all from a single unified system.
          </p>
        </motion.div>

        {/* Professional "After" Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-blue-200/80 bg-white shadow-[0_25px_60px_-15px_rgba(37,99,235,0.12)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50/70 via-[#F8FAFC] to-emerald-50/40 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[12px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                After Smart ERP
              </span>
              <span className="text-[13px] font-semibold text-slate-800 hidden sm:inline">
                Operations Command Dashboard
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] font-semibold text-emerald-700">Live</span>
              <span className="text-[12px] text-slate-500 hidden sm:inline">· All 11 departments synced</span>
            </div>
          </div>

          {/* 4 Metric KPI Cards */}
          <div className="p-6 sm:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Production Output', val: '94.8%', trend: '↑ 12% this week', accent: 'text-blue-600', sub: 'Target: 90%' },
                { label: 'Open Orders', val: '247', trend: '↑ 18 active today', accent: 'text-indigo-600', sub: 'Automated Queue' },
                { label: 'On-Time Dispatch', val: '98.2%', trend: '↑ Above SLA', accent: 'text-emerald-600', sub: 'Zero Stockout' },
                { label: 'Dept. Sync Status', val: '11 / 11', trend: '✓ All Connected', accent: 'text-blue-600', sub: 'Zero Lag' }
              ].map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200/80 bg-[#FAFAFA] hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all"
                >
                  <div className="text-[12px] font-semibold text-slate-500 mb-1">
                    {m.label}
                  </div>
                  <div className={`text-[28px] font-bold tracking-tight ${m.accent} mb-1`}>
                    {m.val}
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-emerald-600">{m.trend}</span>
                    <span className="text-slate-400 font-mono">{m.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom 2-Col Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left: Performance Throughput (8 cols) */}
              <div className="lg:col-span-8 p-5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800">
                      Weekly Manufacturing Throughput
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Automated machine telemetry & scrap recovery monitoring
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200/70">
                    +18.4% vs Last Month
                  </span>
                </div>

                <div className="flex items-end gap-3 h-[72px] pt-2">
                  {[
                    { h: 65, label: 'Mon', color: 'bg-blue-500' },
                    { h: 80, label: 'Tue', color: 'bg-indigo-500' },
                    { h: 58, label: 'Wed', color: 'bg-blue-600' },
                    { h: 95, label: 'Thu', color: 'bg-blue-500' },
                    { h: 78, label: 'Fri', color: 'bg-indigo-600' },
                    { h: 92, label: 'Sat', color: 'bg-emerald-500' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className={`w-full rounded-t-md ${bar.color} opacity-90 transition-all duration-700 ease-out`}
                        style={{
                          height: `${bar.h}%`,
                          transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
                          transformOrigin: 'bottom'
                        }}
                      />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Connected Modules Status (4 cols) */}
              <div className="lg:col-span-4 p-5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] flex flex-col justify-between">
                <div className="text-[13px] font-bold text-slate-800 mb-3">
                  Live Module Sync Matrix
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Production & Shopfloor', status: 'Live' },
                    { name: 'Stores & Inventory', status: 'Live' },
                    { name: 'Quality Inspection', status: 'Live' },
                    { name: 'Finance & Invoicing', status: 'Live' }
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-200/60 text-[12px]"
                    >
                      <span className="font-semibold text-slate-700">{row.name}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
