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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative flex flex-col rounded-[5px] border border-[#c2e3ff] bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform-gpu min-h-[180px]"
    >
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Condensed Header Icon */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-[#0083FF]/20 bg-blue-50 text-[#0083FF] transition-all duration-300 group-hover:bg-[#0083FF] group-hover:text-white">
            <Icon size={20} />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-noto-sans text-[18px] font-bold tracking-tight text-[#122a66] mb-2 group-hover:text-[#0083FF] transition-colors duration-300">
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

const TechnologyStack = () => {
  return (
    <section className="bg-white px-6 py-12 lg:px-[80px] lg:py-16 overflow-hidden relative">
      {/* Decorative Radial Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,143,255,0.03)_0%,transparent_70%)]" />

      <div className="container mx-auto relative z-10">
        <div className="grid w-full gap-8 lg:grid-cols-[435px_1fr] lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="font-noto-sans text-[11px] font-bold uppercase tracking-[0.25em] text-blue-500">
              STACK OVERVIEW
            </div>
            <h2 className="mt-3 font-noto-sans text-[clamp(28px,3.5vw,44px)] font-black leading-[1.1] tracking-[-0.04em] text-[#122a66]">
              Engineering Stack for <br />
              Enterprise Platforms
            </h2>
            <p className="mt-4 font-noto-sans text-[15px] leading-relaxed text-slate-500 max-w-sm">
              Our platforms use a layered architecture built for ERP, HRMS, and business-critical applications. Each layer is optimized for scalability, security, and performance across enterprise deployments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {stackCards.map((card, index) => (
              <StackCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
