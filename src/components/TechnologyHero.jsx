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
    <section ref={sectionRef} className="relative w-full min-h-[480px] lg:h-[calc(100vh-64px)] lg:min-h-[500px] overflow-hidden bg-white select-none">

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

      {/* Glowing atmospheric elements */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-100/70 via-sky-50/40 to-transparent blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[400px] h-[400px] bg-gradient-radial from-blue-50/60 to-transparent blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[400px] h-[400px] bg-gradient-radial from-indigo-50/50 to-transparent blur-2xl" aria-hidden="true" />

      {/* Floating Language & Tech Logos with realistic 3D floating animation */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      >
        {[
          {
            name: 'React',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            top: '16%',
            left: '8%',
            glow: 'rgba(97,218,251,0.2)',
            delay: 0,
            floatDuration: 4.5,
          },
          {
            name: 'TypeScript',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
            top: '38%',
            left: '3%',
            glow: 'rgba(49,120,198,0.2)',
            delay: 0.3,
            floatDuration: 5.2,
          },
          {
            name: 'Python',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            top: '64%',
            left: '6%',
            glow: 'rgba(255,212,59,0.25)',
            delay: 0.6,
            floatDuration: 4.8,
          },
          {
            name: 'Digital Ocean',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg',
            top: '84%',
            left: '14%',
            glow: 'rgba(0,105,225,0.25)',
            delay: 0.2,
            floatDuration: 5.6,
          },
          {
            name: 'Node.js',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            top: '16%',
            right: '9%',
            glow: 'rgba(104,160,99,0.25)',
            delay: 0.15,
            floatDuration: 4.6,
          },
          {
            name: 'AWS Cloud',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
            top: '38%',
            right: '4%',
            glow: 'rgba(255,153,0,0.2)',
            delay: 0.45,
            floatDuration: 5.4,
          },
          {
            name: 'MongoDB',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
            top: '64%',
            right: '7%',
            glow: 'rgba(71,162,72,0.2)',
            delay: 0.7,
            floatDuration: 5.0,
          },
          {
            name: 'JavaScript',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            top: '84%',
            right: '15%',
            glow: 'rgba(247,223,30,0.25)',
            delay: 0.35,
            floatDuration: 4.9,
          },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.3 + item.delay },
              scale: { duration: 0.6, delay: 0.3 + item.delay },
              y: { duration: item.floatDuration, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
              rotate: { duration: item.floatDuration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
            }}
            className="absolute hidden md:flex items-center justify-center pointer-events-auto group cursor-pointer"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
          >
            {/* Ambient logo glow backdrop */}
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: item.glow }}
            />

            {/* Glassmorphic realistic logo tile */}
            <div className="relative flex flex-col items-center gap-1.5 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-[0_10px_25px_rgba(15,23,42,0.06),0_2px_6px_rgba(15,23,42,0.04)] group-hover:shadow-[0_18px_35px_rgba(15,23,42,0.12)] group-hover:border-blue-300/80 group-hover:-translate-y-1 transition-all duration-300">
              <img
                src={item.logo}
                alt={item.name}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <span className="text-[10.5px] font-semibold text-slate-500 tracking-tight group-hover:text-[#2563EB] transition-colors">
                {item.name}
              </span>
            </div>
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
