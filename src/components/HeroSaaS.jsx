import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import ModelViewer from './ui/ModelViewer';

export default function HeroSaaS() {
  return (
    <section className="relative w-full pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-28 bg-white overflow-hidden">
      {/* Background Subtle Grid Pattern (Nexus / Modern SaaS Style) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,#000_65%,transparent_100%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Top Ambient Glows */}
      <div
        className="absolute -top-32 left-1/4 -translate-x-1/2 w-[600px] sm:w-[800px] h-[420px] bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-indigo-100/40 via-blue-50/20 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Shifted Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-white/90 shadow-[0_2px_8px_rgba(37,99,235,0.08)] mb-6 text-[13px] font-medium text-slate-700 backdrop-blur-sm hover:border-blue-300 transition-colors cursor-default select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>v4.0 Enterprise Release is Live</span>
            </motion.div>

            {/* Hero Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[38px] sm:text-[52px] lg:text-[58px] xl:text-[66px] font-extrabold tracking-[-0.035em] text-[#0B0F19] leading-[1.08] mb-6 max-w-2xl"
            >
              Control your infrastructure <br className="hidden sm:inline" />
              at global scale.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[17px] sm:text-[19px] text-[#4B5563] max-w-xl font-normal leading-relaxed mb-8 sm:mb-10"
            >
              The unified operating system for modern enterprise. Manage users,
              security, and compliance from a single source of truth.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-start gap-3.5 mb-10 sm:mb-12"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                to="/platform"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-white hover:bg-slate-50 text-[#1E293B] text-[15px] font-semibold tracking-wide border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 active:scale-[0.98] transition-all duration-200"
              >
                <Play className="w-4 h-4 text-slate-500 fill-slate-500 transition-colors group-hover:text-blue-600 group-hover:fill-blue-600" />
                <span>View Product Tour</span>
              </Link>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/70 text-slate-500 text-[13px] font-medium"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Enterprise Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#2563EB]" />
                <span>Real-Time Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span>Modern ERP Cloud</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center w-full h-[380px] sm:h-[460px] lg:h-[540px]"
          >
            <ModelViewer scale={0.72} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
