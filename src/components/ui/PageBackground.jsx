import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const PageBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-white">
      {/* ── Fixed Static Grid ────────────────────────── */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* ── Moving Light/Pulse on Grid ───────────────── */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #9600FA 1.5px, transparent 1.5px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px'
        }}
      />

      {/* ── Floating Glows / Bokehs ──────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        {/* Glow 1 */}
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 150, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-100/30 blur-[120px]"
        />
        {/* Glow 2 */}
        <motion.div
          animate={{
            x: [0, -150, 50, 0],
            y: [0, -100, 150, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[120px]"
        />
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
