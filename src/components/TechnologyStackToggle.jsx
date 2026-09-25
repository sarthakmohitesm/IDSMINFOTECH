import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Stack data ───────────────────────────────────────────────── */
const stacks = {
  MERN: {
    tagline: 'Fast, Flexible & Full-Stack',
    accent: '#2563EB',
    techs: [
      {
        name: 'MongoDB',
        role: 'Database',
        desc: 'Flexible NoSQL document database for scalable data storage.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        color: '#00A74A',
      },
      {
        name: 'Express.js',
        role: 'Backend',
        desc: 'Minimal, fast Node.js framework powering our secure API layer.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        color: '#444444',
      },
      {
        name: 'React.js',
        role: 'Frontend',
        desc: 'Component-driven UI library for dynamic, responsive experiences.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        color: '#61DAFB',
      },
      {
        name: 'Node.js',
        role: 'Runtime',
        desc: 'High-performance JavaScript runtime tying the full stack together.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        color: '#68A063',
      },
    ],
  },
  MEAN: {
    tagline: 'Structured, Scalable & Enterprise-Ready',
    accent: '#7C3AED',
    techs: [
      {
        name: 'MongoDB',
        role: 'Database',
        desc: 'Flexible data foundation for enterprise document storage.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        color: '#00A74A',
      },
      {
        name: 'Express.js',
        role: 'Backend',
        desc: 'Robust backend services and middleware architecture.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        color: '#444444',
      },
      {
        name: 'Angular',
        role: 'Frontend',
        desc: 'Enterprise-grade front-end architecture with TypeScript.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
        color: '#DD0031',
      },
      {
        name: 'Node.js',
        role: 'Runtime',
        desc: 'Efficient server-side execution across the application lifecycle.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        color: '#68A063',
      },
    ],
  },
};

/* ── Tech card ────────────────────────────────────────────────── */
function TechCard({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
      className="group relative flex flex-col rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300"
    >
      {/* Hover accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ backgroundColor: tech.color }}
      />

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${tech.color}12`, border: `1px solid ${tech.color}20` }}
        >
          <img src={tech.icon} alt={tech.name} className="w-5.5 h-5.5 object-contain" loading="lazy" />
        </div>
        <div>
          <h4 className="font-noto-sans text-[15px] font-bold text-[#0B0F19] leading-tight">{tech.name}</h4>
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">{tech.role}</span>
        </div>
      </div>

      <p className="font-noto-sans text-[13px] leading-[1.6] text-slate-500">{tech.desc}</p>
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function TechnologyStackToggle() {
  const [active, setActive] = useState('MERN');
  const stack = stacks[active];

  return (
    <section className="relative overflow-hidden bg-white border-t border-slate-100 px-6 lg:px-[80px] py-14 lg:py-16">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right,#e5e7eb 1px,transparent 1px),linear-gradient(to bottom,#e5e7eb 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%,#000 30%,transparent 100%)',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%,#000 30%,transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Header row: title left, toggle right */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="h-px w-7" style={{ background: `linear-gradient(to right, transparent, ${stack.accent})` }} />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: stack.accent }}>
                {active} Stack
              </span>
            </div>
            <h2 className="font-noto-sans text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.15] tracking-tight text-[#0B0F19]">
              {active} Stack at IDMS
            </h2>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[12.5px] font-semibold text-slate-400 mt-1 uppercase tracking-wider"
              >
                {stack.tagline}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center rounded-full p-1 border border-slate-200 bg-slate-50/80"
          >
            {['MERN', 'MEAN'].map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="relative px-5 py-2 text-[13px] font-bold rounded-full transition-colors duration-300 cursor-pointer"
                style={{ color: active === key ? '#fff' : '#94a3b8' }}
              >
                {active === key && (
                  <motion.div
                    layoutId="stackPill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: stacks[key].accent,
                      boxShadow: `0 3px 12px ${stacks[key].accent}30`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{key}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Tech cards: 4 columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stack.techs.map((tech, i) => (
              <TechCard key={tech.name + active} tech={tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
