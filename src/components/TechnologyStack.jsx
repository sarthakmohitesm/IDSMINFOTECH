import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { Code2, Server, Database, Cloud, Cog, ShieldCheck } from 'lucide-react';

const stackCards = [
  {
    title: 'Frontend',
    description: 'React & Angular for enterprise dashboards and workflow-driven interfaces.',
    icon: Code2,
    accent: '#2563EB',
    glow: 'rgba(37,99,235,0.12)',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
  {
    title: 'Backend',
    description: 'Node.js services, REST/GraphQL API layers, and scalable business logic.',
    icon: Server,
    accent: '#0284C7',
    glow: 'rgba(2,132,199,0.12)',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200/80',
  },
  {
    title: 'Database',
    description: 'MongoDB & SQL for structured and document-based operational data.',
    icon: Database,
    accent: '#059669',
    glow: 'rgba(5,150,105,0.12)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
  {
    title: 'Cloud',
    description: 'AWS deployment, autoscaling, backups, and multi-region high availability.',
    icon: Cloud,
    accent: '#D97706',
    glow: 'rgba(217,119,6,0.12)',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  {
    title: 'DevOps',
    description: 'CI/CD pipelines, Docker, Kubernetes, and release management automation.',
    icon: Cog,
    accent: '#7C3AED',
    glow: 'rgba(124,58,237,0.12)',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
  },
  {
    title: 'Security',
    description: 'RBAC, audit logs, JWT, OAuth, and enterprise-grade access control systems.',
    icon: ShieldCheck,
    accent: '#DB2777',
    glow: 'rgba(219,39,119,0.12)',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200/80',
  },
];

/* ── 3D Tilt Card ── */
function StackCard3D({ card, index }) {
  const Icon = card.icon;
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 220, damping: 24 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springCfg);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
      className="group relative w-full select-none will-change-transform"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white rounded-lg border border-slate-200/90 p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_44px_rgba(15,23,42,0.10)] hover:border-slate-300/80 transition-all duration-300 overflow-hidden min-h-[190px] flex flex-col"
      >
        {/* Top glow blob on hover */}
        <div
          className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: card.glow }}
        />
        {/* Accent top line on hover */}
        <div
          className="absolute inset-x-0 top-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg"
          style={{ backgroundColor: card.accent }}
        />

        {/* Icon */}
        <div
          style={{ transform: 'translateZ(20px)', backgroundColor: card.glow }}
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 border transition-all duration-300"
        >
          <Icon size={20} style={{ color: card.accent }} />
        </div>

        {/* Content */}
        <div style={{ transform: 'translateZ(15px)' }}>
          <h3
            className="font-noto-sans text-[17px] font-bold tracking-tight text-[#0B0F19] mb-2 transition-colors duration-300"
            style={{ color: undefined }}
          >
            {card.title}
          </h3>
          <p className="font-noto-sans text-[13px] leading-relaxed text-[#64748B]">
            {card.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
const TechnologyStack = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const headingY = useTransform(smoothY, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-[#F8FAFF] to-white px-6 py-16 lg:px-[80px] lg:py-24 overflow-hidden border-t border-slate-200/80"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(to right,#e5e7eb 1px,transparent 1px),linear-gradient(to bottom,#e5e7eb 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%,#000 50%,transparent 100%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%,#000 50%,transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-b from-blue-50/60 to-transparent blur-3xl" aria-hidden="true" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: headingY }}
          className="grid gap-10 lg:grid-cols-[420px_1fr] lg:items-start mb-14"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#2563EB]" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#2563EB]">
                Stack Overview
              </span>
            </div>
            <h2 className="font-noto-sans text-[clamp(28px,3.2vw,46px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0B0F19] mb-4">
              Engineering Stack for{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#00C9FF] bg-clip-text text-transparent">
                Enterprise Platforms
              </span>
            </h2>
            <p className="font-noto-sans text-[15px] leading-relaxed text-[#475569] max-w-sm">
              A layered architecture built for ERP, HRMS, and business-critical applications — optimized for scalability, security, and performance across enterprise deployments.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-4 self-end lg:mt-10"
          >
            {[
              { value: '6+', label: 'Stack Layers', accent: '#2563EB' },
              { value: '99.9%', label: 'Uptime SLA', accent: '#059669' },
              { value: '<50ms', label: 'API Response', accent: '#7C3AED' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg border border-slate-200/90 p-4 text-center shadow-sm">
                <div className="text-[24px] font-extrabold font-noto-sans" style={{ color: stat.accent }}>{stat.value}</div>
                <div className="text-[11.5px] text-slate-500 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stackCards.map((card, index) => (
            <StackCard3D key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
