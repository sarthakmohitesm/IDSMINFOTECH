import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  FileSpreadsheet,
  Clock,
  ShieldAlert,
  DollarSign,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Activity,
  Check,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
          PART 1: THE REALITY CHECK (BEFORE SMART ERP)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-200/80 bg-rose-50/70 text-rose-700 text-[12px] font-semibold tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>The Reality Check</span>
          </div>

          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#0B0F19] tracking-[-0.025em] leading-[1.12] mb-4">
            This is how most businesses operate.
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#4B5563] max-w-2xl text-center font-normal leading-relaxed">
            Manual processes, disconnected data, and delayed decisions cost enterprises more than they realise.
          </p>
        </motion.div>

        {/* Professional "Before" Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-rose-50/70 via-[#F8FAFC] to-amber-50/40 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Before Smart ERP
              </span>
              <span className="text-[13px] font-semibold text-slate-700 hidden sm:inline">
                Fragmented Operations & Data Silos
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[12px] font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>4 Critical Bottlenecks Active</span>
            </div>
          </div>

          {/* Body: Left Table / Right Impact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-white">
            {/* Left: Refined Operations Tracker (7 cols) */}
            <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-200/90 bg-[#FAFAFA] overflow-hidden shadow-xs">
              <div className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-700 ml-1">
                    Shop Floor Production Tracker
                  </span>
                </div>
                <span className="text-[11px] font-mono text-rose-600 bg-rose-50 border border-rose-200/70 px-2 py-0.5 rounded-md font-medium">
                  Desynced · 3d lag
                </span>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-slate-100/70 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-3">Order ID</div>
                <div className="col-span-3">Dept</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-3 text-right">Friction</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-200/60 bg-white">
                {[
                  { id: '#4521', dept: 'Production', status: 'Delayed', statusCls: 'bg-rose-50 text-rose-700 border-rose-200', note: 'Low Stock' },
                  { id: '#4522', dept: 'Stores & WH', status: 'Unknown', statusCls: 'bg-slate-100 text-slate-600 border-slate-200', note: 'BOM Drift' },
                  { id: '#4523', dept: 'Finance', status: 'Pending Rec', statusCls: 'bg-amber-50 text-amber-700 border-amber-200', note: 'No PO Match' },
                  { id: '#4524', dept: 'Quality QA', status: 'Failed Audit', statusCls: 'bg-rose-50 text-rose-700 border-rose-200', note: 'Paper Log' }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-slate-50/60 transition-colors text-[13px]">
                    <div className="col-span-3 font-mono font-semibold text-slate-800">
                      {row.id}
                    </div>
                    <div className="col-span-3 text-slate-600 font-medium">
                      {row.dept}
                    </div>
                    <div className="col-span-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${row.statusCls}`}>
                        {row.status}
                      </span>
                    </div>
                    <div className="col-span-3 text-right text-[12px] font-mono text-slate-500">
                      {row.note}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto px-4 py-3 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between text-[12px] text-slate-500">
                <span>Total unresolved discrepancies: <strong className="text-slate-800">14 items</strong></span>
                <span className="text-rose-600 font-medium">Reporting lag: 72 hrs</span>
              </div>
            </div>

            {/* Right: 4 High-End Friction Cards (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              {[
                {
                  icon: DollarSign,
                  iconColor: 'text-rose-600',
                  iconBg: 'bg-rose-100/70',
                  border: 'border-rose-200/80',
                  bg: 'bg-rose-50/40',
                  title: 'Finance & Inventory Gap',
                  desc: 'Warehouse physical inventory desynchronized from finance ledgers by 3 to 5 business days.'
                },
                {
                  icon: FileSpreadsheet,
                  iconColor: 'text-amber-600',
                  iconBg: 'bg-amber-100/70',
                  border: 'border-amber-200/80',
                  bg: 'bg-amber-50/40',
                  title: 'Outdated Sales Quotes',
                  desc: 'Sales quotes calculated using outdated raw material prices, creating unrecoverable margin loss.'
                },
                {
                  icon: Clock,
                  iconColor: 'text-blue-600',
                  iconBg: 'bg-blue-100/70',
                  border: 'border-blue-200/80',
                  bg: 'bg-blue-50/40',
                  title: 'Manual Spreadsheet Sync',
                  desc: 'Teams maintain 3+ isolated Excel files to manually reconcile PO receipts and dispatches.'
                },
                {
                  icon: ShieldAlert,
                  iconColor: 'text-rose-600',
                  iconBg: 'bg-rose-100/70',
                  border: 'border-rose-200/80',
                  bg: 'bg-rose-50/40',
                  title: 'Data Conflicts & Audit Risk',
                  desc: 'Paper logs and multiple versions of truth leave compliance inspections open to human error.'
                }
              ].map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border ${card.border} ${card.bg} hover:bg-white hover:shadow-sm transition-all duration-200 flex items-start gap-3`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-bold text-slate-800 leading-snug">
                        {card.title}
                      </div>
                      <div className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                        {card.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION CONNECTOR PILL
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-200/90 bg-white shadow-[0_4px_16px_rgba(37,99,235,0.1)] text-[12px] font-bold tracking-wider uppercase text-blue-700">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Smart ERP Transforms The Outcome</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART 2: UNIFIED INTELLIGENCE (AFTER SMART ERP)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
