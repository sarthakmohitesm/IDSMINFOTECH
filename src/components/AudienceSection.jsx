import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineLink, HiOutlinePresentationChartBar, HiOutlineCog8Tooth } from 'react-icons/hi2';
import { TbBuildingFactory2 } from 'react-icons/tb';

/* ==========================================================================
   STAT COUNTER COMPONENT
   ========================================================================== */
function StatCounter({ endValue, suffix = "", duration = 1600, gradient }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp = null;
    const finalVal = parseFloat(endValue);
    const isInt = Number.isInteger(finalVal);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * finalVal;
      
      setCount(isInt ? Math.floor(current) : current.toFixed(0));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, endValue, duration]);

  return (
    <div ref={ref} className={`text-[36px] font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${gradient} leading-none mb-1`}>
      {count}{suffix}
    </div>
  );
}

/* ==========================================================================
   AUDIENCE CARD COMPONENT
   ========================================================================== */
function AudienceCard({ 
  icon: Icon, 
  iconBg, 
  stat, 
  subLabel, 
  title, 
  desc, 
  accentGrad, 
  cornerGlow, 
  statGrad, 
  duration 
}) {
  return (
    <div className="group relative bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-[32px_24px_28px] flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.055)]">
      
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${accentGrad}`} />
      
      {/* Corner Glow */}
      <div 
        className={`absolute -top-[40px] -right-[40px] w-[120px] h-[120px] rounded-full blur-[30px] opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none ${cornerGlow}`}
      />

      {/* Stat Section & Icon Row */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <StatCounter 
            endValue={stat.value} 
            suffix={stat.suffix} 
            duration={duration} 
            gradient={statGrad} 
          />
          <div className="text-[11px] text-[rgba(255,255,255,0.3)] font-normal uppercase tracking-[0.04em]">
            {subLabel}
          </div>
        </div>

        {/* Icon */}
        <div className={`w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-[22px] text-white transition-transform duration-300 group-hover:scale-110 ${iconBg}`}>
          <Icon />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[rgba(255,255,255,0.06)] w-full mb-4" />

      {/* Title & Desc */}
      <h4 className="text-[16px] font-bold text-white tracking-tight mb-2">
        {title}
      </h4>
      <p className="text-[13px] text-[rgba(255,255,255,0.4)] leading-[1.65]">
        {desc}
      </p>
    </div>
  );
}

/* ==========================================================================
   MAIN AUDIENCE SECTION
   ========================================================================== */
export default function AudienceSection() {
  const cards = [
    {
      icon: TbBuildingFactory2,
      iconBg: "bg-[rgba(70,139,239,0.12)]",
      stat: { value: "64", suffix: "%" },
      subLabel: "reduction in production delays",
      title: "Manufacturing Businesses",
      desc: "Production lines, raw material flow, and quality compliance — fully connected.",
      accentGrad: "from-transparent via-[#468BEF] to-transparent",
      cornerGlow: "bg-[radial-gradient(circle,rgba(70,139,239,0.15)_0%,transparent_70%)]",
      statGrad: "from-[#468BEF] to-[#9600FA]",
      duration: 1600
    },
    {
      icon: HiOutlineCog8Tooth,
      iconBg: "bg-[rgba(150,0,250,0.12)]",
      stat: { value: "3", suffix: "x" },
      subLabel: "improvement in asset uptime",
      title: "Industrial Operations",
      desc: "Asset fleets, machine uptime, and maintenance cycles managed in real time.",
      accentGrad: "from-transparent via-[#9600FA] to-transparent",
      cornerGlow: "bg-[radial-gradient(circle,rgba(150,0,250,0.15)_0%,transparent_70%)]",
      statGrad: "from-[#9600FA] to-[#FF0078]",
      duration: 1200
    },
    {
      icon: HiOutlineLink,
      iconBg: "bg-[rgba(255,0,120,0.12)]",
      stat: { value: "11", suffix: "" },
      subLabel: "departments in full sync",
      title: "Multi-Department Enterprises",
      desc: "Finance, operations, and sales aligned — one source of truth across every team.",
      accentGrad: "from-transparent via-[#FF0078] to-transparent",
      cornerGlow: "bg-[radial-gradient(circle,rgba(255,0,120,0.15)_0%,transparent_70%)]",
      statGrad: "from-[#FF0078] to-[#468BEF]",
      duration: 1400
    },
    {
      icon: HiOutlinePresentationChartBar,
      iconBg: "bg-[rgba(70,139,239,0.08)]",
      stat: { value: "3", suffix: "s" },
      subLabel: "to access any live report",
      title: "Leadership Teams",
      desc: "Real-time performance visibility — not weekly PDF reports delivered too late.",
      accentGrad: "from-transparent via-[rgba(70,139,239,0.7)] to-transparent",
      cornerGlow: "bg-[radial-gradient(circle,rgba(70,139,239,0.12)_0%,transparent_70%)]",
      statGrad: "from-[#468BEF] to-[#FF0078]",
      duration: 1000
    }
  ];

  return (
    <section 
      id="industries"
      className="w-full relative py-[100px] px-[60px] overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0F172A 0%, #1a0a2e 60%, #0F172A 100%)'
      }}
    >
      {/* GRID OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* TOP GLOW */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(150,0,250,0.07) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-[2]">
        
        {/* HEADER */}
        <div className="text-center mb-[64px] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full text-[11px] font-bold text-[rgba(255,255,255,0.5)] uppercase tracking-widest mb-6"
          >
            Built For
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white mb-4 leading-[1.1] tracking-tight"
          >
            Smart ERP Is Designed for <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(120deg,#468BEF,#9600FA,#FF0078)]">
              Enterprises Ready to Scale
            </span>
          </motion.h2>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <AudienceCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* CLOSING LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-[56px] text-center"
        >
          <p className="text-[16px] text-[rgba(255,255,255,0.3)] italic leading-relaxed">
            If your business has outgrown spreadsheets and disconnected software,{' '}
            <strong className="text-[rgba(255,255,255,0.65)] font-medium not-italic">
              Smart ERP was built for your next stage.
            </strong>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
