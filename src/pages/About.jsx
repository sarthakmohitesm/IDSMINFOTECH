import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  Workflow,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import PageBackground from '../components/ui/PageBackground';
import AboutStory from '../components/AboutStory';
import WhyIDMS from '../components/WhyIDMS';
import LeadershipSection3D from '../components/LeadershipSection3D';

import smartErpLogo from '../assets/shapes/smart-erp-logo-header.svg';

export default function About() {
  return (
    <PageBackground>
      {/* ─────────────────────────────────────────────────────────────
          SMART ERP FEATURE SHOWCASE - FULL VIEWPORT FIT ("ONE TAB")
          Optimized to fit completely within one screen without scrolling
      ───────────────────────────────────────────────────────────── */}
      <section
        id="about-smart-erp"
        className="relative w-full min-h-[calc(100vh-103px)] lg:h-[calc(100vh-103px)] max-h-[850px] flex items-center py-4 sm:py-6 lg:py-0 bg-white border-b border-slate-200/80 overflow-hidden select-none"
      >
        {/* Subtle Grid Background matching main page */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_60%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Ambient Bloom */}
        <div
          className="absolute -top-20 right-1/4 w-[500px] h-[350px] bg-gradient-to-b from-blue-100/30 via-sky-50/20 to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

            {/* LEFT COLUMN: Narrative & Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col items-start"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-200/80 bg-pink-50/80 text-[#FF007A] text-[11px] font-bold tracking-wider uppercase mb-2.5 sm:mb-3 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A] animate-pulse" />
                <span>Driving Intelligent Growth</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] xl:text-[40px] font-extrabold text-[#0B0F19] tracking-[-0.03em] leading-[1.12] mb-2 sm:mb-2.5 font-noto-sans">
                Turn complexity into clarity with <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0083FF] via-[#0284C7] to-[#122a66] bg-clip-text text-transparent">
                  Smart ERP.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] leading-relaxed mb-3.5 sm:mb-4 max-w-xl font-normal font-noto-sans">
                Gain visibility, streamline workflows, and scale with confidence. A unified enterprise operating system designed to eliminate operational silos across manufacturing and engineering.
              </p>

              {/* 3 Core Capability Blocks */}
              <div className="space-y-2 w-full max-w-xl mb-4 sm:mb-5">
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100/80 text-[#2563EB] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[13px] sm:text-[13.5px] font-bold text-[#0B0F19] leading-tight">Unified Operational Core</h2>
                    <p className="text-[11.5px] sm:text-[12px] text-[#64748B] mt-0.5 leading-tight truncate">
                      Connects 12 critical modules from Leads to Accounts with real-time data sync.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100/80 text-[#059669] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[13px] sm:text-[13.5px] font-bold text-[#0B0F19] leading-tight">Real-Time Shop Floor Telemetry</h2>
                    <p className="text-[11.5px] sm:text-[12px] text-[#64748B] mt-0.5 leading-tight truncate">
                      Sub-second tracking for WIP, inventory tolerances, and production throughput.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100/80 text-[#4F46E5] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[13px] sm:text-[13.5px] font-bold text-[#0B0F19] leading-tight">Audit-Ready Governance</h2>
                    <p className="text-[11.5px] sm:text-[12px] text-[#64748B] mt-0.5 leading-tight truncate">
                      Built-in GST compliance, automated e-invoicing, and immutable audit logs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13.5px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
                <Link
                  to="/platform"
                  className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded bg-white hover:bg-slate-50 text-[#1E293B] text-[13.5px] font-semibold tracking-wide border border-slate-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:border-slate-300 active:scale-[0.98] transition-all duration-200"
                >
                  <span>Explore All Modules</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Interactive Smart ERP Command Center Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 xl:col-span-6 relative w-full"
            >
              <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-blue-50/20 p-4 sm:p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] relative overflow-hidden">
                {/* Decorative Top Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: 'linear-gradient(90deg, #0083FF 0%, #2563EB 50%, #00C9FF 100%)',
                  }}
                />

                {/* Card Header with Smart ERP Branding & Live Status */}
                <div className="flex items-center justify-between gap-3 pb-3 sm:pb-3.5 border-b border-slate-200/70">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={smartErpLogo}
                      alt="Smart ERP Logo"
                      className="h-5 sm:h-6 w-auto object-contain"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10.5px] sm:text-[11px] font-semibold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
                    </span>
                    <span>12 Modules Active</span>
                  </div>
                </div>

                {/* Interactive Workflow Node Visualizer */}
                <div className="py-3 sm:py-3.5">
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>Interconnected Workflow Matrix</span>
                    <span className="text-[#2563EB] text-[10px] font-semibold">Zero Blindspots</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    {[
                      { name: 'Lead Mgmt', code: 'MOD-01' },
                      { name: 'NPD Project', code: 'MOD-02' },
                      { name: 'Procurement', code: 'MOD-03' },
                      { name: 'Production', code: 'MOD-04' },
                      { name: 'Quality Hub', code: 'MOD-05' },
                      { name: 'Dispatch & OEE', code: 'MOD-06' },
                    ].map((mod, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-200/70 bg-white p-2 sm:p-2.5 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-default"
                      >
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <span>{mod.code}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="text-[11.5px] sm:text-[12px] font-bold text-[#0B0F19] mt-0.5">{mod.name}</div>
                        <div className="text-[9.5px] text-slate-500">Continuous Sync</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Telemetry Stats Row */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/70">
                  <div className="text-left">
                    <div className="text-[10px] font-medium text-slate-500">OTIF Dispatch</div>
                    <div className="text-[17px] sm:text-[19px] font-extrabold text-[#0B0F19] leading-tight">98.2%</div>
                    <div className="text-[9.5px] text-emerald-600 font-semibold">+6.4% vs prev</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-medium text-slate-500">Replication</div>
                    <div className="text-[17px] sm:text-[19px] font-extrabold text-[#2563EB] leading-tight">&lt; 8ms</div>
                    <div className="text-[9.5px] text-slate-400">Sub-second</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-medium text-slate-500">Accuracy</div>
                    <div className="text-[17px] sm:text-[19px] font-extrabold text-[#059669] leading-tight">99.8%</div>
                    <div className="text-[9.5px] text-slate-400">Audit-verified</div>
                  </div>
                </div>

                {/* Live Activity Stream footer */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <Workflow className="w-3 h-3 text-[#2563EB] flex-shrink-0" />
                    <span className="truncate">Automated shop-floor sync heartbeat verified across active plants</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 flex-shrink-0 ml-1.5">LIVE</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2nd Section (Narrative + Image) */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-20 px-4 lg:px-[80px] w-full bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Text Block */}
            <div className="lg:col-span-7 xl:col-span-7">
              <p className="text-[#0083FF] font-bold tracking-[0.2em] text-[11px] mb-4 uppercase">Our Mission</p>
              <h2 className="text-[40px] font-bold text-[#122a66] mb-2 font-noto-sans tracking-tight">
                Enterprise Modernization
              </h2>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                Partner of Choice
              </div>
              <p className="font-noto-sans text-[15px] leading-[1.6] text-[#475569] font-light max-w-xl">
                We are a trusted Digital Engineering partner, combining deep technical expertise and industry experience to help our clients anticipate what's next and answer questions before they're asked.
              </p>
              <p className="font-noto-sans text-[15px] leading-[1.6] text-[#475569] font-light mt-4 max-w-xl">
                Our proven solutions create unique competitive advantage for our clients by giving them the power to see beyond and rise above the complexities of modern engineering.
              </p>
            </div>

            {/* Right Image Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 xl:col-span-5 lg:ml-auto w-full max-w-[520px] relative rounded-[5px] overflow-hidden aspect-[1.3] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] group"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Digital Engineering Collaboration"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutStory />
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
      <WhyIDMS />
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />

      {/* 3rd Section: Animated 3D Leadership Team */}
      <LeadershipSection3D />

    </PageBackground>
  );
}
