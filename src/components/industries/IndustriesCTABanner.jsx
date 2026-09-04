import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function IndustriesCTABanner() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden relative" 
      style={{ backgroundColor: '#0B1121' }}
    >
      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #008FFF, #00C9FF)' }}></div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to see how IDMS fits your operations?</h2>
          <p className="text-lg text-gray-400 mb-12">
            Our experts don't just speak code — they speak your industry language. Schedule a workshop to discuss your specific operational challenges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <Link to="/contact" className="px-10 py-5 bg-gradient-primary text-white font-bold rounded-full text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
               Request Demo
             </Link>
             <Link to="/contact" className="px-10 py-5 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/5 transition-colors">
               Talk to Expert
             </Link>
          </div>
        </div>
      </div>
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(0, 143, 255, 0.05) 0%, transparent 60%)', pointerEvents: 'none', borderRadius: '50%' }}></div>
    </motion.section>
  );
}
