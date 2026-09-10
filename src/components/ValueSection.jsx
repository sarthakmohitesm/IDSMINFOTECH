import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Database,
  Building2,
  Clock,
  ShieldCheck,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Zap,
  Share2,
  Radio,
  Workflow,
  BrainCircuit,
  Boxes,
  Cpu,
} from 'lucide-react';
import DigitalTwin3DStage from './ui/DigitalTwin3DStage';

/* ── Layer Telemetry Data for Right Card ── */
const layerData = {
  1: {
    layerNumber: 'Layer 01',
    badgeText: 'ENTERPRISE FOUNDATION',
    badgeTone: '#059669',
    badgeBg: 'bg-emerald-50 text-[#059669] border border-emerald-200/60',
    title: 'Multi-Plant IoT & Resilient Data Fabric',
    description:
      'Industrial data backbone engineered for sub-milisecond edge replication, automated failover, and strict ISO/SOC 2 compliance.',
    slaLabel: 'INFRASTRUCTURE UPTIME SLA',
    slaValue: '99.99%',
    slaPill: 'Multi-region sync',
    metrics: [
      { icon: Building2, label: 'Connected Plants', value: '3 Plants' },
      { icon: Clock, label: 'Data Replication', value: '< 8ms' },
      { icon: ShieldCheck, label: 'Audit Compliance', value: 'Grade A' },
    ],
    liveStream: [
      { time: '14:33:04', text: 'Multi-plant database sync heartbeat verified across hubs.' },
      { time: '14:27:18', text: 'Immutable compliance audit log sealed for regulatory inspection.' },
    ],
    footerTag: 'ISO 27001 & SOC 2 Type II',
    icon: Database,
  },
  2: {
    layerNumber: 'Layer 02',
    badgeText: 'SYNCHRONIZED OPERATIONS',
    badgeTone: '#4F46E5',
    badgeBg: 'bg-indigo-50 text-[#4F46E5] border border-indigo-200/60',
    title: '11 Mission-Critical ERP Modules',
    description:
      'Connects Sales, Purchase, Production, Quality, Stores, and Dispatch into an automated, zero-blindspot workflow matrix.',
    slaLabel: 'OVERALL EQUIPMENT EFFECTIVENESS',
    slaValue: '94.8%',
    slaPill: '+12.4% vs baseline',
    metrics: [
      { icon: Workflow, label: 'Active Modules', value: '11/11 Live' },
      { icon: Boxes, label: 'In-Flight Orders', value: '247 Orders' },
      { icon: TrendingUp, label: 'OTIF Dispatch', value: '98.2%' },
    ],
    liveStream: [
      { time: '14:35:42', text: 'Work Order #WO-4892 passed automated tolerance inspection.' },
      { time: '14:31:10', text: 'Central procurement PO auto-approved for Grade-A inventory.' },
    ],
    footerTag: 'Zero Blindspot Workflow Core',
    icon: Workflow,
  },
  3: {
    layerNumber: 'Layer 03',
    badgeText: 'DECISION INTELLIGENCE',
    badgeTone: '#0284C7',
    badgeBg: 'bg-sky-50 text-[#0284C7] border border-sky-200/60',
    title: 'Real-Time Executive Intelligence Engine',
    description:
      'Aggregates multi-plant sensor telemetry, production throughput, and demand forecasts into sub-second actionable insights for leadership.',
    slaLabel: 'DECISION VELOCITY MULTIPLIER',
    slaValue: '3.4x',
    slaPill: '< 12ms Latency',
    metrics: [
      { icon: BrainCircuit, label: 'Query Latency', value: '< 12ms' },
      { icon: Cpu, label: 'Anomaly Detect', value: '99.8%' },
      { icon: TrendingUp, label: 'Forecast Acc.', value: '96.4%' },
    ],
    liveStream: [
      { time: '14:36:12', text: 'Predictive bottleneck mitigated for Q3 assembly line.' },
      { time: '14:32:05', text: 'Executive KPI consolidation report generated in 0.8s.' },
    ],
    footerTag: 'Autonomous Decision Engine',
    icon: BrainCircuit,
  },
};

export default function ValueSection() {
  const [activeLayer, setActiveLayer] = useState(1);
  const [viewMode, setViewMode] = useState('stacked');
  const [activeMode, setActiveMode] = useState('monitor');

  const current = layerData[activeLayer];
  const CurrentIcon = current.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/60 to-[#F8FAFC] py-3.5 sm:py-4.5">
      {/* ── BACKGROUND DECORATIVE ELEMENTS (Matching Screenshot) ── */}
      {/* Top Left Floating 3D Torus Glass Graphic */}
      <div className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 rounded-full border-[18px] border-white/60 shadow-[inset_0_4px_12px_rgba(255,255,255,0.8),0_12px_24px_rgba(148,163,184,0.12)] -rotate-12 opacity-80" />

      {/* Top Right Green Floating Sphere */}
      <div className="pointer-events-none absolute top-4 right-12 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-300 to-teal-500 shadow-lg shadow-emerald-400/30" />

      {/* Top Right Curving Teal Accent Wave Line */}
      <svg
        className="pointer-events-none absolute top-0 right-0 w-[340px] h-[160px] text-teal-400/40 opacity-70"
        fill="none"
        viewBox="0 0 340 160"
      >
        <path
          d="M 340 15 C 260 50, 220 120, 120 110 C 60 100, 20 135, 0 160"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>

      {/* Subtle Background Radial Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">

        {/* ── TOP SECTION HEADER ── */}
        <div className="text-center mb-2.5">
          {/* Green Dot Badge: • SMART ERP PLATFORM */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-bold text-slate-700 tracking-wider uppercase mb-1 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
            Smart ERP Platform
          </div>

          {/* Heading: Enterprise Operations Made Intelligent */}
          <h2 className="font-noto-sans text-[22px] sm:text-[26px] lg:text-[30px] font-extrabold tracking-tight text-[#0F172A] leading-tight mb-1">
            Enterprise Operations Made{' '}
            <span className="text-[#059669]">Intelligent</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[11.5px] sm:text-[12.5px] text-[#64748B] max-w-2xl mx-auto font-normal leading-relaxed">
            Built by IDMS Infotech to unify operations, eliminate data silos, and deliver real-time decision intelligence across your enterprise.
          </p>
        </div>

        {/* ── MAIN SHOWCASE: Two Symmetrical Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch min-h-[380px] lg:h-[380px] mb-3">

          {/* ── LEFT 7 COLS: INTERACTIVE 3D DIGITAL TWIN ── */}
          <div className="lg:col-span-7 h-full">
            <DigitalTwin3DStage
              activeLayer={activeLayer}
              onSelectLayer={setActiveLayer}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              activeMode={activeMode}
              onSelectMode={setActiveMode}
            />
          </div>

          {/* ── RIGHT 5 COLS: ENTERPRISE FOUNDATION CONSOLE ── */}
          <div className="lg:col-span-5 h-full bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Top Row: Icon + Badge + Layer Tag */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded-md bg-emerald-50 text-[#059669]">
                        <CurrentIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[10.5px] font-bold tracking-wider uppercase text-[#059669]">
                        {current.badgeText}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-400">
                      {current.layerNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-[17px] font-extrabold text-[#0F172A] tracking-tight leading-snug mb-0.5">
                    {current.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
                    {current.description}
                  </p>

                  {/* Highlight KPI Box: Infrastructure Uptime SLA */}
                  <div className="rounded-xl bg-[#F0FDF4] border border-emerald-100 p-2.5 sm:p-3 mb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider">
                        {current.slaLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <TrendingUp className="h-2.5 w-2.5" />
                        {current.slaPill}
                      </span>
                    </div>
                    <div className="text-3xl font-black text-[#059669] tracking-tight leading-none">
                      {current.slaValue}
                    </div>
                  </div>

                  {/* 3 Metric Cards Row */}
                  <div className="grid grid-cols-3 gap-2 mb-2.5">
                    {current.metrics.map((m) => {
                      const Icon = m.icon;
                      return (
                        <div
                          key={m.label}
                          className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-2 flex items-center gap-2"
                        >
                          <div className="h-6 w-6 rounded-md bg-white border border-slate-200/80 flex items-center justify-center text-[#059669] shrink-0 shadow-2xs">
                            <Icon className="h-3 w-3" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[8.5px] text-slate-400 font-medium truncate">
                              {m.label}
                            </div>
                            <div className="text-[11.5px] font-extrabold text-slate-800 leading-tight">
                              {m.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Live Industrial Stream Log */}
                  <div className="rounded-xl border border-slate-200/70 bg-slate-50/40 p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9.5px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Radio className="h-3 w-3 text-cyan-500 animate-pulse" />
                        LIVE INDUSTRIAL STREAM
                      </span>
                      <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Active Feed
                      </span>
                    </div>
                    <div className="space-y-1 text-[9.5px] text-slate-600 leading-tight">
                      {current.liveStream.map((log, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="font-mono text-[8.5px] text-slate-400 bg-white border border-slate-200/70 px-1 py-0.5 rounded shrink-0">
                            {log.time}
                          </span>
                          <span className="truncate">{log.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer: Audit Validated + ISO Compliance */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1 text-[#059669] font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" />
                    Audit Validated
                  </span>
                  <span className="font-medium text-slate-400">
                    {current.footerTag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ── BOTTOM FULL-WIDTH KPI & TRUST STRIP (Matching Screenshot) ── */}
        <div className="mt-3 sm:mt-4 rounded-2xl border border-slate-200/90 bg-white py-2 px-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          
          {/* Stat 1: 78% Operational Efficiency */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ArrowUp className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 leading-none">78%</span>
              <span className="text-[9.5px] font-medium text-slate-500">Operational Efficiency</span>
            </div>
          </div>

          {/* Stat 2: 64% Report Turnaround */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ArrowDown className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 leading-none">64%</span>
              <span className="text-[9.5px] font-medium text-slate-500">Report Turnaround</span>
            </div>
          </div>

          {/* Stat 3: 3x Decision Velocity */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Zap className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 leading-none">3x</span>
              <span className="text-[9.5px] font-medium text-slate-500">Decision Velocity</span>
            </div>
          </div>

          {/* Stat 4: 360° Department Connectivity */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Share2 className="h-3 w-3 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 leading-none">360°</span>
              <span className="text-[9.5px] font-medium text-slate-500">Department Connectivity</span>
            </div>
          </div>

          {/* Badge 1: 99.99% SLA */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10.5px] font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            99.99% SLA
          </div>

          {/* Badge 2: ISO 9001/27001 */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10.5px] font-bold">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
            ISO 9001/27001
          </div>

          {/* Badge 3: IDMS Smart ERP */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10.5px] font-bold">
            <span className="text-slate-500">⬡</span>
            IDMS Smart ERP
          </div>

        </div>

      </div>
    </section>
  );
}
