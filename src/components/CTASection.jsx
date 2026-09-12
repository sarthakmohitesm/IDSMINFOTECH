import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const cardRef = useRef(null);

  // Smooth mouse-following spotlight glow coordinates
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const spotlightBg = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(550px circle at ${x * 100}% ${y * 100}%, rgba(37, 99, 235, 0.08), transparent 70%)`
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-24 overflow-hidden select-none">
      {/* ─── AMBIENT BACKGROUND GLOWS ─── */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] bg-gradient-to-tr from-blue-300/35 via-sky-200/25 to-transparent rounded-full blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] bg-gradient-to-bl from-indigo-300/30 via-blue-200/20 to-transparent rounded-full blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle Background Blueprint Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── MAIN INTERACTIVE ENTERPRISE CARD ─── */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded bg-white border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.08),0_0_0_1px_rgba(37,99,235,0.06)] p-8 sm:p-12 lg:p-16 overflow-hidden transform-gpu"
        >
          {/* Mouse-follow dynamic spotlight glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />

          {/* Top Edge Animated Shimmer Hairline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-20">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"
            />
          </div>

          {/* Inner Geometric Tech Grid Watermark in Corners */}
          <div
            className="absolute top-0 right-0 w-[240px] h-[240px] opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2563EB 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[240px] h-[240px] opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2563EB 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* ─── CARD MAIN CONTENT (Zero Added Text) ─── */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            
            {/* Animated Eyebrow Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-200/90 bg-white/95 shadow-[0_2px_8px_rgba(37,99,235,0.08)] mb-5 text-[12px] sm:text-[13px] font-medium text-slate-700 select-none transition-all duration-300 hover:border-blue-300 hover:shadow-[0_4px_12px_rgba(37,99,235,0.12)] cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span>Get Started with Smart ERP</span>
            </motion.div>

            {/* High-Impact Animated Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-4 text-[30px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.035em] text-[#0B0F19] leading-[1.12]"
            >
              Run Your Operations{' '}
              <span className="relative inline-block text-[#2563EB]">
                Smarter
                {/* Animated gradient underline highlight */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 bottom-0.5 sm:bottom-1 w-full h-[3px] bg-gradient-to-r from-[#2563EB] to-indigo-500 rounded-full origin-left"
                />
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mb-8 max-w-2xl text-[16px] sm:text-[18px] text-[#4B5563] font-normal leading-relaxed"
            >
              Gain complete visibility, streamline workflows, and make faster decisions with Smart ERP.
            </motion.p>

            {/* ─── CALL TO ACTION BUTTONS ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3.5"
            >
              {/* Primary: Request a Demo with Shimmer Beam Sweep */}
              <Link
                to="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold tracking-wide shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_26px_rgba(37,99,235,0.48)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {/* Shimmer Sweep Animation */}
                <motion.span
                  animate={{ x: ['-250%', '300%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                />
                <span className="relative z-10">Request a Demo</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>

              {/* Secondary: Talk to Our Team */}
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded bg-white hover:bg-slate-50 text-[#1E293B] text-[15px] font-semibold tracking-wide border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-300"
              >
                <span>Talk to Our Team</span>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
