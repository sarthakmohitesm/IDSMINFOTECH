import React from 'react';
import { motion } from 'framer-motion';
import { Zap, LayoutGrid, ShieldCheck } from 'lucide-react';

const TechnologyPillars = () => {
  const pillars = [
    {
      title: "Speed to Value",
      desc: "Shared backend for MEAN/MERN accelerates pilots and reduces rework.",
      icon: Zap,
      color: "#468BEF"
    },
    {
      title: "Modular Scale",
      desc: "Add modules without rewrites; stable contracts between layers.",
      icon: LayoutGrid,
      color: "#9600FA"
    },
    {
      title: "Enterprise-ready",
      desc: "RBAC, audit logs and compliance baked in from day one.",
      icon: ShieldCheck,
      color: "#FF0078"
    }
  ];

  return (
    <section className="relative py-20 lg:py-24 px-6 bg-[#f8fafc] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#468BEF]/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#9600FA]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-10 rounded-[5px] bg-white border border-gray-100/50 group hover:border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: pillar.color }}
              ></div>

              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-[5px] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-all duration-300 relative z-10"
                style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
              >
                <pillar.icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-[#111827] mb-4 font-noto-sans relative z-10">
                {pillar.title}
              </h3>
              
              <p className="text-lg text-[#4B5563] leading-relaxed font-medium font-noto-sans relative z-10">
                {pillar.desc}
              </p>

              {/* Decorative underline */}
              <div 
                className="absolute bottom-0 left-10 right-10 h-[3px] rounded-t-[5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"
                style={{ backgroundColor: pillar.color }}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Big CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden rounded-[5px] bg-gradient-to-r from-[#9600FA] via-[#468BEF] to-[#0FC2C0] p-1 shadow-2xl"
        >
          {/* Inner Content */}
          <div className="bg-gradient-to-r from-[#591BFF] via-[#468BEF] to-[#0FC2C0] rounded-[5px] px-8 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Pick MEAN or MERN.<br />
                Keep everything else consistent.
              </h2>
              <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl">
                Security, CI/CD, monitoring and data design stay identical — with Python, ML and GenAI options on top.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#468BEF] px-8 py-4 rounded-[5px] text-lg font-bold font-noto-sans shadow-xl shadow-blue-500/30 shrink-0 transition-shadow hover:shadow-white/20"
            >
              Book a Technical Demo
            </motion.button>
          </div>
          
          {/* Decorative mesh/noise on top */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyPillars;
