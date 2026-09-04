import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Factory,
  Layers3,
  ShieldCheck,
} from 'lucide-react';

const sectionIntro =
  "Built by IDMS Infotech to unify operations, eliminate data silos, and deliver real-time decision intelligence across your enterprise.";

const dashboardMetrics = [
  { label: 'Production', value: '94%', trend: '↑ 12% this week', tone: '#468BEF' },
  { label: 'Open Orders', value: '247', trend: '↑ 18 today', tone: '#7C3AED' },
  { label: 'On-time Dispatch', value: '98.2%', trend: '↑ above target', tone: '#FF0078' },
  { label: 'Dept Sync', value: '11/11', trend: '✓ all connected', tone: '#10B981' },
];

const qualityPoints = [
  'Quality standards enforced',
  'Approval workflows active',
  'Compliance fully tracked',
];

const growthBars = [
  { quarter: 'Q1', value: '+18%', height: '30%' },
  { quarter: 'Q2', value: '+34%', height: '48%' },
  { quarter: 'Q3', value: '+52%', height: '70%' },
  { quarter: 'Q4', value: '+78%', height: '100%' },
];

const connectedStats = [
  { value: '↑78%', label: 'Operational Efficiency' },
  { value: '↓64%', label: 'Report Turnaround Time' },
  { value: '3x', label: 'Faster Decision Making' },
  { value: '360°', label: 'Department Connectivity' },
];

const bottomHighlights = [
  { value: '94%', label: 'Production Output', sub: 'avg. across deployments' },
  { value: '98%', label: 'On-time Delivery', sub: 'across all dispatch modules' },
  { value: '11/11', label: 'Modules Connected', sub: 'zero blind spots' },
];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function ValueSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,251,0.5)_0%,rgba(255,255,255,0)_100%)]" />
      <div className="relative mx-auto max-w-[1320px]">
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="text-[18px] text-[#468BEF] font-bold uppercase tracking-[0.22em] mb-5">
            Smart ERP Platform
          </div>
          <h2 className="font-noto-sans text-[40px] font-bold leading-[0.98] tracking-tight text-[#122a66] mb-6">
            Enterprise Operations Made Intelligent
          </h2>
          <p className="text-[15px] text-[#6B7280] max-w-[650px] text-center font-medium leading-relaxed">
            {sectionIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-5">
            {/* Hero Dashboard Card */}
            <GridCard
              className="md:col-span-8 md:row-span-1 md:min-h-[380px] ring-1 ring-blue-100"
              isHero={true}
              title="Smart ERP Command Center"
              subtitle="Live visibility across production, orders, and department sync — all in one unified system."
            >
              <DashboardVisual />
            </GridCard>

            {/* Intelligence Card - Right Column */}
            <GridCard
              className="md:col-span-4 md:row-span-1 md:min-h-[380px]"
              title="Real-Time Enterprise Intelligence"
              subtitle="Real-time insights across every department, enabling faster and more accurate business decisions."
            >
              <IntelligenceVisual />
            </GridCard>

            {/* Second Row - 3 Equal Cards */}
            <GridCard
              className="md:col-span-4 md:row-span-1 md:min-h-[240px]"
              title="Built-in Compliance & Quality Control"
              subtitle="Ensure compliance, enforce workflows, and maintain quality standards across operations."
            >
              <QualityVisual />
            </GridCard>

            <GridCard
              className="md:col-span-4 md:row-span-1 md:min-h-[240px]"
              title="Operational Performance Insights"
              subtitle="Track efficiency improvements and performance growth across business cycles."
            >
              <GrowthVisual />
            </GridCard>

            <GridCard
              className="md:col-span-4 md:row-span-1 md:min-h-[240px]"
              title="Modular & Scalable Architecture"
              subtitle="Every business function connected through a flexible and scalable ERP core."
            >
              <ModuleCoreVisual />
            </GridCard>

            {/* Full Width Connected Operations */}
            <GridCard
              className="md:col-span-12 md:row-span-1"
              title="Unified Enterprise Operations"
              subtitle="One platform connecting every department, process, and data point across your enterprise."
            >
              <ConnectedOperationsVisual />
            </GridCard>
          </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-12 text-center"
        >
          <span className="font-noto-sans text-[16px] text-[#9CA3AF]">Powered by</span>
          <span className="font-noto-sans text-[16px] font-semibold text-[#122a66]"> IDMS Infotech Smart ERP</span>
          <span className="font-noto-sans text-[16px] text-[#9CA3AF]"> — delivering accuracy, speed, and complete operational control.</span>
        </motion.div>
      </div>
    </section>
  );
}

function GridCard({ title, subtitle, className = '', isHero = false, children }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      <div className="flex h-full flex-col">
        <div className={isHero ? 'mb-8' : 'mb-6'}>
          <div className={`font-noto-sans font-semibold leading-tight text-[#122a66] ${isHero ? 'text-[20px]' : 'text-[16px]'}`}>
            {title}
          </div>
          <p className={`mt-1.5 font-noto-sans leading-relaxed text-[#9CA3AF] ${isHero ? 'max-w-none text-[14px]' : 'max-w-[420px] text-[13px]'}`}>
            {subtitle}
          </p>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="grid h-full gap-4 md:grid-cols-[1.2fr_1fr]">
      <div className="relative overflow-hidden rounded-[5px] border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#468BEF]"></div>
            <span className="text-[11px] font-semibold text-gray-600">PRODUCTION TRACKER</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Production</div>
              <div className="mt-2 text-[28px] font-bold text-[#468BEF]">94%</div>
            </div>
            <div className="h-2 rounded-full bg-gray-100">
              <div className="h-full w-[94%] rounded-full bg-[#468BEF]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[5px] bg-white p-3 border border-gray-100">
              <div className="text-[10px] text-gray-500">Status</div>
              <div className="mt-1 text-[13px] font-semibold text-[#10B981]">Live</div>
            </div>
            <div className="rounded-[5px] bg-white p-3 border border-gray-100">
              <div className="text-[10px] text-gray-500">Orders</div>
              <div className="mt-1 text-[13px] font-semibold text-[#111827]">247</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {dashboardMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className="rounded-[5px] border border-gray-100 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-medium text-gray-500">{metric.label}</div>
                <div className="mt-2 text-[28px] font-bold" style={{ color: metric.tone }}>
                  {metric.value}
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${metric.tone}15`, color: metric.tone }}>
                {index === 0 && <Factory className="h-5 w-5" />}
                {index === 1 && <CircleDollarSign className="h-5 w-5" />}
                {index === 2 && <Activity className="h-5 w-5" />}
                {index === 3 && <Layers3 className="h-5 w-5" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntelligenceVisual() {
  const feedCards = [
    { label: 'Production', value: '94%', tone: '#468BEF' },
    { label: 'Orders', value: '247', tone: '#FF0078' },
    { label: 'Quality', value: 'Live', tone: '#10B981' },
    { label: 'Dispatch', value: '98.2%', tone: '#7C3AED' },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        <div className="rounded-[5px] border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-700">LIVE FEED</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[10px] font-semibold text-[#10B981]">Synced</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {feedCards.map((item) => (
              <div key={item.label} className="rounded-[5px] bg-white p-3 border border-gray-100">
                <div className="text-[10px] text-gray-500">{item.label}</div>
                <div className="mt-1 text-[16px] font-bold" style={{ color: item.tone }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[12px] font-semibold text-gray-700 mb-3">Key Metrics</div>
        <div className="rounded-[5px] bg-white p-3 border border-gray-100 text-center">
          <div className="text-[10px] text-gray-500">Modules Connected</div>
          <div className="mt-1 text-[20px] font-bold text-[#468BEF]">11/11</div>
        </div>
      </div>
    </div>
  );
}

function QualityVisual() {
  return (
    <div className="flex h-full flex-col justify-between space-y-2.5">
      <div className="rounded-[5px] border border-gray-100 bg-white p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-700">Compliance</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Standards enforced</div>
          </div>
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#FF007815]">
            <ShieldCheck className="h-4 w-4 text-[#FF0078]" />
          </div>
        </div>
        <div className="mt-2 inline-block rounded-full bg-[#FF007815] px-2.5 py-0.5 text-[10px] font-semibold text-[#FF0078]">
          Active
        </div>
      </div>

      <div className="space-y-1.5">
        {qualityPoints.map((point) => (
          <div key={point} className="flex items-start gap-2.5 rounded-[5px] border border-gray-100 bg-white p-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg shrink-0 bg-[#10B98115]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
            </div>
            <span className="text-[11px] text-gray-700 font-medium">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthVisual() {
  return (
    <div className="h-full flex flex-col">
      {/* Top: Efficiency Metric */}
      <div className="rounded-[5px] border border-purple-200 bg-linear-to-br from-purple-50 to-purple-100/50 p-4 mb-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] font-bold text-purple-900 uppercase tracking-wider mb-1.5">Efficiency Gain</div>
            <div className="bg-linear-to-r from-[#7C3AED] to-[#FF0078] bg-clip-text text-[36px] font-bold text-transparent leading-none">
              69%
            </div>
          </div>
          <div className="text-[11px] font-semibold text-purple-700">vs. baseline</div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-700 font-medium">Improvement Rate</span>
            <span className="text-[10px] font-bold text-purple-900">Excellent</span>
          </div>
          <div className="h-2 rounded-full bg-purple-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '69%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-linear-to-r from-[#7C3AED] via-[#FF0078] to-[#FF0078]"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
}

function ModuleCoreVisual() {
  const modules = [
    { label: 'Sales', icon: '📊', color: '#468BEF' },
    { label: 'Planning', icon: '📅', color: '#7C3AED' },
    { label: 'Production', icon: '⚙️', color: '#FF0078' },
    { label: 'Quality', icon: '✓', color: '#10B981' },
    { label: 'Dispatch', icon: '🚀', color: '#F59E0B' },
    { label: 'Finance', icon: '💰', color: '#06B6D4' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* ERP Core Badge */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-4 flex items-center justify-center"
      >
        <div className="relative h-12 w-12 rounded-full border-2 border-blue-300 flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 shadow-md">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#468BEF]/10 to-[#7C3AED]/10" />
          <Boxes className="h-5 w-5 text-[#468BEF] relative z-10" />
        </div>
      </motion.div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {modules.map((module, idx) => (
          <motion.div
            key={module.label}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.08, y: -3 }}
            className="group"
          >
            <div 
              className="relative overflow-hidden rounded-[5px] border-2 bg-white p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
              style={{ borderColor: `${module.color}30` }}
            >
              {/* Gradient background accent */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{ backgroundColor: module.color }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
                <div 
                  className="text-xl flex items-center justify-center h-8 w-8 rounded-[5px]"
                  style={{ backgroundColor: `${module.color}15` }}
                >
                  {module.icon}
                </div>
                <span 
                  className="text-[10px] font-bold text-center leading-tight transition-colors group-hover:opacity-80"
                  style={{ color: module.color }}
                >
                  {module.label}
                </span>
              </div>

              {/* Border glow on hover */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ 
                  boxShadow: `inset 0 0 8px ${module.color}20`,
                  borderRadius: '8px'
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ConnectedOperationsVisual() {
  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        <div className="rounded-[5px] border border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6">
          <div className="text-[12px] font-bold uppercase tracking-widest text-indigo-900 mb-2">Enterprise Command Center</div>
          <div className="text-[18px] font-bold text-[#122a66] mb-4">One Platform. Total Control.</div>
          <p className="text-[13px] text-gray-700 leading-relaxed">
            All departments, processes, and data points connected through a single unified system — eliminating silos and enabling real-time control.
          </p>
          
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="rounded-[5px] bg-white p-4 text-center border border-indigo-100 hover:border-indigo-300 transition-colors">
              <div className="text-[11px] text-gray-600 font-bold uppercase tracking-wider">Status</div>
              <div className="mt-2 text-[18px] font-bold text-[#10B981] flex items-center justify-center gap-1">
                <span>✓</span> Live
              </div>
            </div>
            <div className="rounded-[5px] bg-white p-4 text-center border border-indigo-100 hover:border-indigo-300 transition-colors">
              <div className="text-[11px] text-gray-600 font-bold uppercase tracking-wider">Modules</div>
              <div className="mt-2 text-[18px] font-bold text-[#468BEF]">11/11</div>
            </div>
            <div className="rounded-[5px] bg-white p-4 text-center border border-indigo-100 hover:border-indigo-300 transition-colors">
              <div className="text-[11px] text-gray-600 font-bold uppercase tracking-wider">Sync</div>
              <div className="mt-2 text-[18px] font-bold text-[#7C3AED]">98%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {bottomHighlights.map((item) => (
            <div key={item.label} className="rounded-[5px] border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-[#468BEF] to-[#FF0078] bg-clip-text text-[32px] font-bold text-transparent">
                {item.value}
              </div>
              <div className="mt-2 text-[13px] font-bold text-[#122a66]">{item.label}</div>
              <div className="mt-0.5 text-[11px] text-gray-600">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {connectedStats.map((stat) => (
          <div key={stat.label} className="rounded-[5px] border border-gray-200 bg-white p-5 hover:shadow-md transition-all group">
            <div className="bg-gradient-to-r from-[#468BEF] to-[#9600FA] bg-clip-text text-[32px] font-bold text-transparent group-hover:from-[#3461BD] group-hover:to-[#7B2BD2] transition-all">
              {stat.value}
            </div>
            <div className="mt-2 text-[12px] font-bold text-gray-700 uppercase tracking-wider">{stat.label}</div>
            <div className="mt-4 h-1 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#468BEF] to-[#FF0078]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
