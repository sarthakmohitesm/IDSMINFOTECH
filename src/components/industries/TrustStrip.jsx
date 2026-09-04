import React from 'react';
import { motion } from 'framer-motion';

export default function TrustStrip() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-900 py-16 border-t border-gray-800"
    >
      <div className="container mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12">
        {[
          { label: 'Industries Served', val: '6+' },
          { label: 'Successful Go-Lives', val: '40+' },
          { label: 'Avg. ROI in Months', val: '8-12' },
          { label: 'Uptime Reliability', val: '99.9%' }
        ].map((item, i) => (
          <div key={i} className="text-center md:text-left">
            <div className="text-3xl font-extrabold text-white mb-1">{item.val}</div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
