import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechnologyHero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const textY = useTransform(smoothY, [0, 1], [0, 80]);
  const bgScale = useTransform(smoothY, [0, 1], [1, 1.08]);

  return (
    <section ref={sectionRef} className="relative w-full h-[calc(100vh-103px)] min-h-[560px] overflow-hidden bg-white select-none">

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'linear-gradient(to right,#e5e7eb 1px,transparent 1px),linear-gradient(to bottom,#e5e7eb 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-100/60 via-sky-50/30 to-transparent blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[350px] h-[350px] bg-gradient-radial from-indigo-100/40 to-transparent blur-2xl" aria-hidden="true" />

      {/* Scrolling background tech pattern */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Decorative floating code blocks */}
        {[
          { top: '15%', left: '7%', text: 'React.js', delay: 0 },
          { top: '28%', right: '8%', text: 'Node.js', delay: 0.1 },
          { top: '62%', left: '5%', text: 'MongoDB', delay: 0.2 },
          { top: '70%', right: '6%', text: 'AWS Cloud', delay: 0.15 },
          { top: '45%', left: '3%', text: 'Docker', delay: 0.05 },
          { top: '50%', right: '4%', text: 'CI/CD', delay: 0.12 },
        ].map((tag, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + tag.delay }}
            className="absolute px-3 py-1.5 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-sm text-[11px] font-mono font-semibold text-slate-400 shadow-sm"
            style={{ top: tag.top, left: tag.left, right: tag.right }}
          >
            {tag.text}
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200/80 bg-white/90 shadow-[0_2px_10px_rgba(37,99,235,0.08)] mb-5 text-[11.5px] font-bold text-[#2563EB] tracking-widest uppercase backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          Enterprise Technology Stack
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-noto-sans text-[clamp(36px,5vw,72px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#0B0F19] mb-5 max-w-4xl"
        >
          Built for Enterprise{' '}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0083FF] to-[#00C9FF] bg-clip-text text-transparent">
            Software at Scale
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-noto-sans text-[clamp(15px,1.2vw,18px)] text-[#475569] leading-relaxed max-w-xl mb-8"
        >
          Modern cloud-native architecture powering ERP, HRMS, and custom business platforms — engineered for performance, security, and scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-[0_4px_18px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </Link>
          <Link
            to="/platform"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white border border-slate-200 text-[#1E293B] text-[14px] font-semibold shadow-sm hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            Explore Platform
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default TechnologyHero;
