import React from 'react';
import { motion } from 'framer-motion';
import whyIdmsImage from '../assets/pics/why_idms.png';

const WhyIDMS = () => {
  const points = [
    "Smart ERP for Enterprise Operations",
    "Scalable Custom ERP Architecture",
    "Industry-Specific Digital Solutions",
    "Fast ERP Implementation & Deployment",
    "Secure & Reliable Business Systems",
    "Long-term ERP Technology Partner"
  ];

  return (
    <section className="relative min-h-[90vh] w-full bg-[#ebebff] flex items-center overflow-hidden px-6 lg:px-[120px] py-12">
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex flex-col max-w-[520px]"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#0083FF] font-bold tracking-[0.2em] text-[15px] mb-4 uppercase flex items-center gap-2.5"
          >

            WHY IDMS INFOTECH
          </motion.p>

          <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold text-[#122a66] mb-4 font-noto-sans tracking-tight leading-[1.1]">
            Why Businesses Choose IDMS
          </h2>

          <p className="text-[15px] md:text-[15px] text-[#46505a] font-regular leading-relaxed font-noto-sans mb-8 opacity-80 max-w-[500px]">
            We deliver intelligent ERP and enterprise digital solutions tailored to modern business needs. IDMS Infotech combines scalable architecture, industry expertise, and rapid implementation to help organizations streamline operations and drive digital transformation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {points.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group"
              >
                <div className="flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#0083FF]/8 flex items-center justify-center group-hover:bg-[#0083FF] transition-all duration-300">
                  <svg className="w-3 h-3 text-[#0083FF] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#1e293b] font-semibold font-noto-sans text-[14px]">
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative h-[320px] md:h-[400px] lg:h-[440px] w-full max-w-[540px] rounded-[2px] overflow-hidden shadow-[0_18px_40px_-12px_rgba(15,23,42,0.08)] group"
          >
            <img
              src={whyIdmsImage}
              alt="Innovative Engineering Team"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 border-[1px] border-white/10 z-10 pointer-events-none" />

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 backdrop-blur-sm z-20 flex items-center justify-center border-l border-b border-white/10">
              <svg className="w-6 h-6 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 4V20M4 12H20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyIDMS;
