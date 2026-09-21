import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Factory,
  Cpu,
  Shield,
  Layers,
  BarChart3,
  Cog,
} from 'lucide-react';
import requestDemoCta from '../../assets/shapes/request-demo-cta.svg';

const CTA_IMG_SHADOW =
  'bg-transparent [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))]';
const CTA_SVG_LINK =
  'inline-block origin-center leading-none transition-transform duration-200 ease-out hover:scale-[calc(36/35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

/* ── Floating industry icon bubbles ───────────────────────────── */
const floatingIcons = [
  { Icon: Factory, top: '14%', left: '5%', size: 22, color: '#2563EB', delay: 0, dur: 4.2 },
  { Icon: Cpu, top: '28%', right: '7%', size: 20, color: '#7C3AED', delay: 0.4, dur: 5.0 },
  { Icon: Shield, top: '60%', left: '3%', size: 18, color: '#059669', delay: 0.8, dur: 4.6 },
  { Icon: Layers, top: '70%', right: '4%', size: 20, color: '#F59E0B', delay: 0.2, dur: 5.4 },
  { Icon: BarChart3, top: '18%', right: '22%', size: 16, color: '#EC4899', delay: 0.6, dur: 4.8 },
  { Icon: Cog, top: '76%', left: '18%', size: 18, color: '#0EA5E9', delay: 1.0, dur: 5.2 },
];

/* ── Stat pill ────────────────────────────────────────────────── */
function StatPill({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-sm shadow-sm"
    >
      <span className="text-[15px] font-extrabold tracking-tight text-[#2563EB]">{value}</span>
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

export default function IndustriesHero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const textY = useTransform(smooth, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[560px] lg:h-[calc(100vh-80px)] lg:min-h-[580px] overflow-hidden bg-white flex items-center select-none"
    >
      {/* ── Background grid ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right,#e5e7eb 1px,transparent 1px),linear-gradient(to bottom,#e5e7eb 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 50%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Soft gradient blobs ──────────────────────────────── */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-100/60 via-sky-50/30 to-transparent blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[400px] h-[400px] bg-gradient-radial from-indigo-50/50 to-transparent blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/4 -right-32 w-[400px] h-[400px] bg-gradient-radial from-blue-50/40 to-transparent blur-2xl" aria-hidden="true" />

      {/* ── Floating industry icons ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block" aria-hidden="true">
        {floatingIcons.map(({ Icon, top, left, right, size, color, delay, dur }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top, left, right }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: dur, ease: 'easeInOut' }}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <Icon size={size} color={color} strokeWidth={2} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 w-full max-w-[1440px] mx-auto px-6 lg:px-[80px] text-center"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/15 bg-[#2563EB]/[0.04] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2563EB]">
            Industry Solutions
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-noto-sans text-[clamp(34px,5.5vw,68px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0B0F19] mb-5"
        >
          Architected for the
          <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA]">
            {' '}Complexity of Your Industry
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-noto-sans text-[clamp(15px,1.4vw,18px)] leading-relaxed text-slate-500 max-w-2xl mx-auto mb-8"
        >
          A unified platform integrating core operations, scalable workflows, and
          strict compliance — engineered for manufacturing, logistics, and enterprise-grade environments.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <Link to="/contact" aria-label="Request a Demo" className={CTA_SVG_LINK}>
            <img
              src={requestDemoCta}
              alt="Request a Demo"
              width={276}
              height={53}
              className={`h-[42px] w-auto ${CTA_IMG_SHADOW}`}
              decoding="async"
            />
          </Link>
          <Link
            to="/platform"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white text-[14px] font-semibold text-[#0B0F19] shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
          >
            Explore Platform
          </Link>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <StatPill value="11+" label="Industries" delay={0.75} />
          <StatPill value="500+" label="Deployments" delay={0.85} />
          <StatPill value="99.9%" label="Uptime" delay={0.95} />
        </motion.div>
      </motion.div>

      {/* ── Bottom gradient line ──────────────────────────────── */}
      <div
        className="absolute bottom-0 z-20 pointer-events-none h-[2px] w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
