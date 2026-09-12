import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  X,
  Layers,
  Users,
  ShieldCheck,
  Zap,
  Sparkles,
  Home,
  LayoutGrid,
  MessageSquare,
  Settings,
  TrendingUp,
  BarChart2,
  ExternalLink,
  Shield,
  Check
} from 'lucide-react';
import demoVideo from '../assets/landing/Slide5.mp4';

export default function PlatformHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Interactive mouse tracking for 3D perspective background tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const gridRotateX = useTransform(smoothMouseY, [-300, 300], [58, 52]);
  const gridRotateZ = useTransform(smoothMouseX, [-500, 500], [-3, 3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F8FAFF] via-[#FFFFFF] to-[#F1F5F9] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden select-none">

      {/* ─── 3D BRIGHT DEPTH BACKGROUND EFFECT (NO 3D OBJECTS) ─── */}

      {/* Ambient Volumetric Color Blooms */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Blue Core Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5],
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] bg-[radial-gradient(circle,rgba(219,234,254,0.8)_0%,rgba(191,219,254,0.4)_40%,transparent_70%)] rounded-full blur-3xl"
        />

        {/* Soft Violet/Indigo Accent Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-[15%] right-[-5%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-[radial-gradient(circle,rgba(224,231,255,0.75)_0%,rgba(238,242,255,0.35)_45%,transparent_70%)] rounded-full blur-3xl"
        />
      </div>

      {/* 3D Perspective Grid Floor (Smooth Cursor Tilt Physics) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%] overflow-hidden pointer-events-none"
        style={{ perspective: '850px' }}
      >
        <motion.div
          style={{
            rotateX: gridRotateX,
            rotateZ: gridRotateZ,
            transformOrigin: 'bottom center',
          }}
          className="absolute -bottom-16 -left-[20%] -right-[20%] h-[150%] origin-bottom"
        >
          {/* Grid Mesh */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(37, 99, 235, 0.14) 1.5px, transparent 1.5px),
                linear-gradient(90deg, rgba(37, 99, 235, 0.14) 1.5px, transparent 1.5px)
              `,
              backgroundSize: '65px 65px',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 85%)',
            }}
          />

          {/* Glowing Horizon Pulse Wave Traveling Forward */}
          <motion.div
            animate={{ y: ['120%', '-20%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2.5px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.6), rgba(96, 165, 250, 0.8), transparent)',
              boxShadow: '0 0 18px rgba(37, 99, 235, 0.45)',
            }}
          />
        </motion.div>

        {/* Seamless White Fade to Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
      </div>

      {/* 3D Concentric Orbit Rings in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] pointer-events-none opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full border border-blue-200/60 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[110px] rounded-full border border-indigo-200/50"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[220px] rounded-full border border-sky-300/40 border-dotted"
        />
      </div>

      {/* ─── MAIN HERO CONTENT ─── */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[80px] w-full">
        
        {/* Top Split Layout: Text (Left) + 3D Dashboard Composition (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ─── LEFT COLUMN: HERO CONTENT ─── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-blue-200/90 bg-[#EFF6FF] mb-5 sm:mb-6 shadow-[0_2px_8px_rgba(37,99,235,0.06)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#2563EB] tracking-wide">
                Smart ERP Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[40px] sm:text-[52px] md:text-[58px] lg:text-[64px] font-extrabold tracking-[-0.035em] text-[#0F172A] leading-[1.06] mb-5 sm:mb-6"
            >
              Turn Complexity Into{' '}
              <span className="relative inline-block text-[#2563EB] font-extrabold whitespace-nowrap">
                Clarity
                {/* Curved SVG swoosh underline matching mockup */}
                <svg
                  className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 w-full overflow-visible"
                  height="14"
                  viewBox="0 0 200 14"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                    d="M2 9C55 2.5 145 2.5 198 11"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] sm:text-[17.5px] text-[#475569] max-w-xl font-normal leading-[1.6] mb-8 sm:mb-9"
            >
              Unified ERP platform to streamline your operations, boost productivity and drive growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Primary Button: Request a Demo */}
              <Link
                to="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {/* Shimmer sweep */}
                <motion.span
                  animate={{ x: ['-250%', '300%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                />
                <span className="relative z-10">Request a Demo</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>

              {/* Secondary Button: Watch Overview */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded bg-white hover:bg-slate-50 text-[#1E293B] text-[15px] font-semibold border border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] active:scale-[0.98] transition-all duration-200"
              >
                <span className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center transition-colors group-hover:border-[#2563EB] group-hover:bg-blue-50">
                  <Play className="w-2.5 h-2.5 text-slate-700 group-hover:text-[#2563EB] ml-0.5 fill-slate-700 group-hover:fill-[#2563EB]" />
                </span>
                <span>Watch Overview</span>
              </button>
            </motion.div>

          </div>

          {/* ─── RIGHT COLUMN: 3D FLOATING SAAS DASHBOARD COMPOSITION ─── */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6 lg:py-2">
            <div className="relative w-full max-w-[620px]">

              {/* ── 1. MAIN FLOATING "OVERVIEW" DASHBOARD WINDOW ── */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-20 flex gap-2.5 sm:gap-3 items-start"
              >
                {/* Left Blue App Dock Strip */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:flex flex-col gap-2 p-1.5 rounded bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] shadow-[0_12px_28px_rgba(37,99,235,0.35)] text-white/80"
                >
                  <div className="w-9 h-9 rounded bg-white/20 text-white flex items-center justify-center shadow-inner cursor-pointer">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer">
                    <Settings className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* Main Overview Dashboard Card */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex-1 rounded bg-white/95 border border-slate-200/90 shadow-[0_24px_55px_rgba(15,23,42,0.12)] backdrop-blur-xl p-4 sm:p-5"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] sm:text-[16px] font-bold text-slate-800 tracking-tight">
                        Overview
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* 3 Metric Tiles (Total Revenue, Orders, Customers) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-3.5">
                    {/* Metric 1 */}
                    <div className="p-2.5 rounded bg-slate-50/90 border border-slate-100/90 hover:border-blue-200 transition-colors">
                      <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                        Total Revenue
                      </div>
                      <div className="text-[13px] sm:text-[15px] font-extrabold text-slate-900 mt-0.5 tracking-tight">
                        ₹ 12,480
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                        <TrendingUp className="w-2.5 h-2.5" /> 12.5%
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="p-2.5 rounded bg-slate-50/90 border border-slate-100/90 hover:border-blue-200 transition-colors">
                      <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                        Orders
                      </div>
                      <div className="text-[13px] sm:text-[15px] font-extrabold text-slate-900 mt-0.5 tracking-tight">
                        248
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                        <TrendingUp className="w-2.5 h-2.5" /> 8.3%
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="p-2.5 rounded bg-slate-50/90 border border-slate-100/90 hover:border-blue-200 transition-colors">
                      <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                        Customers
                      </div>
                      <div className="text-[13px] sm:text-[15px] font-extrabold text-slate-900 mt-0.5 tracking-tight">
                        1,502
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                        <TrendingUp className="w-2.5 h-2.5" /> 14.2%
                      </div>
                    </div>
                  </div>

                  {/* Main Undulating Spline Wave Chart */}
                  <div className="relative w-full h-[120px] sm:h-[135px] rounded bg-gradient-to-b from-blue-50/50 via-white to-transparent p-2 border border-blue-50/80 overflow-hidden">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 360 100"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="heroBlueWaveFill2" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.32" />
                          <stop offset="65%" stopColor="#60A5FA" stopOpacity="0.10" />
                          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path
                        d="M 0,85 C 35,80 65,70 95,78 C 130,86 160,60 195,50 C 235,38 270,55 305,32 C 330,16 345,18 360,12 L 360,100 L 0,100 Z"
                        fill="url(#heroBlueWaveFill2)"
                      />

                      {/* Line Stroke */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.6, ease: 'easeInOut' }}
                        d="M 0,85 C 35,80 65,70 95,78 C 130,86 160,60 195,50 C 235,38 270,55 305,32 C 330,16 345,18 360,12"
                        stroke="#2563EB"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />

                      {/* Glowing Point on Peak */}
                      <circle cx="305" cy="32" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
                      <circle cx="305" cy="32" r="10" fill="#2563EB" opacity="0.25" className="animate-ping origin-center" />
                    </svg>

                    {/* Horizontal Reference Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25 p-2">
                      <div className="border-b border-dashed border-slate-300 w-full" />
                      <div className="border-b border-dashed border-slate-300 w-full" />
                      <div className="border-b border-dashed border-slate-300 w-full" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── 2. FLOATING CARD TOP-RIGHT: REAL-TIME ANALYTICS ── */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute -top-7 -right-2 sm:-right-5 z-30 w-[170px] sm:w-[200px] p-3 rounded bg-white/95 border border-slate-200/90 shadow-[0_18px_40px_rgba(37,99,235,0.18)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BarChart2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11.5px] sm:text-[12px] font-bold text-slate-800">
                    Real-time Analytics
                  </span>
                </div>
                {/* Mini Wave Chart */}
                <div className="w-full h-8 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                    <path
                      d="M 0,22 Q 25,5 50,18 T 100,8"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,22 Q 25,5 50,18 T 100,8 L 100,30 L 0,30 Z"
                      fill="#E0F2FE"
                      opacity="0.6"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* ── 3. FLOATING CARD BOTTOM-RIGHT: SECURE & RELIABLE ── */}
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute top-[52%] -right-2 sm:-right-6 z-30 p-3 rounded bg-white/95 border border-slate-200/90 shadow-[0_18px_40px_rgba(16,185,129,0.18)] backdrop-blur-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  <Shield className="w-4 h-4 fill-emerald-600 text-white" />
                </div>
                <div>
                  <div className="text-[12px] sm:text-[12.5px] font-bold text-slate-800 leading-tight">
                    Secure & Reliable
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" /> Enterprise Grade
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* ─── BOTTOM FLOATING METRICS BAR (EXACT TO MOCKUP & 4PX RADIUS) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 sm:mt-14 lg:mt-16 w-full"
        >
          <div className="rounded bg-white/95 border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur-xl px-6 py-4 sm:py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">

              {/* Metric 1: 11 Modules */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 first:pt-0 md:pt-0 md:px-4 first:md:pl-2">
                <div className="w-11 h-11 rounded bg-[#EFF6FF] border border-blue-100 flex items-center justify-center shrink-0 shadow-sm text-[#2563EB]">
                  <Layers className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] leading-tight">
                    11 Modules
                  </div>
                  <div className="text-[12px] sm:text-[12.5px] font-medium text-[#64748B] mt-0.5">
                    Unified Platform
                  </div>
                </div>
              </div>

              {/* Metric 2: 750+ Users */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 first:pt-0 md:pt-0 md:px-4">
                <div className="w-11 h-11 rounded bg-[#FAF5FF] border border-purple-100 flex items-center justify-center shrink-0 shadow-sm text-[#9333EA]">
                  <Users className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] leading-tight">
                    750+ Users
                  </div>
                  <div className="text-[12px] sm:text-[12.5px] font-medium text-[#64748B] mt-0.5">
                    Daily Active
                  </div>
                </div>
              </div>

              {/* Metric 3: 99.9% Uptime */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 first:pt-0 md:pt-0 md:px-4">
                <div className="w-11 h-11 rounded bg-[#ECFDF5] border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm text-[#059669]">
                  <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] leading-tight">
                    99.9%
                  </div>
                  <div className="text-[12px] sm:text-[12.5px] font-medium text-[#64748B] mt-0.5">
                    Uptime SLA
                  </div>
                </div>
              </div>

              {/* Metric 4: Real-time Analytics */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 first:pt-0 md:pt-0 md:px-4">
                <div className="w-11 h-11 rounded bg-[#EFF6FF] border border-sky-100 flex items-center justify-center shrink-0 shadow-sm text-[#0284C7]">
                  <Zap className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] leading-tight">
                    Real-time
                  </div>
                  <div className="text-[12px] sm:text-[12.5px] font-medium text-[#64748B] mt-0.5">
                    Analytics
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>

      {/* ─── VIDEO MODAL (TRIGGERED BY 'WATCH OVERVIEW') ─── */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-black rounded overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close overview video"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full">
                <video
                  src={demoVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
