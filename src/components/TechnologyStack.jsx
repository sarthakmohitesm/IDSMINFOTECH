import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Cloud, Cog, ShieldCheck } from 'lucide-react';

const stackCards = [
  {
    title: 'Frontend',
    description: 'React, Angular for enterprise dashboards and workflow-driven interfaces',
    icon: Code2,
  },
  {
    title: 'Backend',
    description: 'Node.js services, API layers, and scalable business logic',
    icon: Server,
  },
  {
    title: 'Database',
    description: 'MongoDB, SQL systems for structured and document-based data',
    icon: Database,
  },
  {
    title: 'Cloud',
    description: 'AWS deployment, autoscaling, backups, and high availability',
    icon: Cloud,
  },
  {
    title: 'DevOps',
    description: 'CI/CD pipelines, Docker builds, release management',
    icon: Cog,
  },
  {
    title: 'Security',
    description: 'RBAC, audit logs, JWT, OAuth, enterprise-grade access control',
    icon: ShieldCheck,
  },
];

function StackCard({ card, index }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col rounded-xl border border-[#c2e3ff] bg-white p-5 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,131,255,0.09)] hover:-translate-y-1 hover:border-[#0083FF]/40 min-h-[175px]"
    >
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Icon */}
          <div className="flex items-center mb-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0083FF]/20 bg-[#f0f7ff] text-[#0083FF] transition-all duration-300 group-hover:bg-[#0083FF] group-hover:text-white group-hover:scale-105">
              <Icon size={20} strokeWidth={2.2} />
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="font-noto-sans text-[17px] font-bold tracking-tight text-[#122a66] mb-1.5 group-hover:text-[#0083FF] transition-colors duration-300">
            {card.title}
          </h3>
          <p className="font-noto-sans text-[13px] leading-relaxed text-slate-500">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechnologyStack() {
  return (
    <section className="bg-[#EFF6FF] px-6 py-12 lg:px-[80px] lg:py-16 overflow-hidden relative border-t border-blue-100 min-h-screen flex items-center">
      {/* Decorative Radial Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,143,255,0.03)_0%,transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid w-full gap-8 lg:grid-cols-[380px_1fr] xl:grid-cols-[430px_1fr] lg:items-center lg:gap-12">
          {/* Left Column: Heading & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="font-noto-sans text-[11.5px] font-bold uppercase tracking-[0.25em] text-[#0083FF]">
              STACK OVERVIEW
            </div>
            <h2 className="mt-3 font-noto-sans text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.15] tracking-tight text-[#122a66]">
              Engineering Stack for <br className="hidden sm:inline" />
              Enterprise Platforms
            </h2>
            <p className="mt-4 font-noto-sans text-[14.5px] leading-relaxed text-slate-500 max-w-sm">
              Our platforms use a layered architecture built for ERP, HRMS, and business-critical applications. Each layer is optimized for scalability, security, and performance across enterprise deployments.
            </p>
          </motion.div>

          {/* Right Column: 3x2 Grid of Stack Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stackCards.map((card, index) => (
              <StackCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
