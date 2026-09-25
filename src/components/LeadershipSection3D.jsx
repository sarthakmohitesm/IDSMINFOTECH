import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';

import pic1 from '../assets/pics/06_JPG.avif';
import pic2 from '../assets/pics/07_JPG.avif';
import ruhanImage from '../assets/pics/Rohan.jpeg';
import nishigandhaImage from '../assets/pics/Nishigandha Mam.jpg';
import payalImage from '../assets/pics/Payal Mam.jpeg';
import nileshSarafImage from '../assets/pics/Nilesh_Saraf sir.jpg';

const LEADERS = [
  {
    name: 'Shailesh Deshpande',
    role: 'MANAGING DIRECTOR',
    image: pic2,
  },
  {
    name: 'Nikhil Moharil',
    role: 'TECHNICAL DIRECTOR',
    image: pic1,
  },
  {
    name: 'Rohan Pathradkar',
    role: 'GROUP PRODUCT MANAGER',
    image: ruhanImage,
  },
  {
    name: 'Nishigandha Kamlapurkar',
    role: 'GROUP PRODUCT MANAGER',
    image: nishigandhaImage,
  },
  {
    name: 'Payal Deo',
    role: 'GROUP PRODUCT MANAGER',
    image: payalImage,
  },
  {
    name: 'Nilesh Saraf',
    role: 'GROUP PRODUCT MANAGER',
    image: nileshSarafImage,
  },
];

/* ── Individual Portrait Card ── */
function PortraitCard({ person, index, delay = 0 }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 200, damping: 24 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springCfg);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group relative w-full select-none will-change-transform flex-shrink-0"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 bg-white flex flex-col transition-all duration-300"
      >
        {/* Top Portrait Image Section */}
        <div className="relative w-full aspect-[4/3.9] overflow-hidden bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1]">
          <img
            src={person.image}
            alt={person.name}
            className="absolute inset-0 w-full h-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Bottom Clean White Info Section */}
        <div className="p-3.5 sm:p-4 bg-white flex flex-col items-start min-h-[95px] justify-between">
          <div>
            <h3 className="text-[#0B0F19] font-bold text-[13.5px] sm:text-[14.5px] xl:text-[15px] font-noto-sans tracking-tight leading-snug truncate w-full">
              {person.name}
            </h3>
            <p className="text-[9.5px] sm:text-[10px] xl:text-[10.5px] font-bold uppercase tracking-[0.08em] font-noto-sans text-[#0066FF] mt-1 leading-tight">
              {person.role}
            </p>
          </div>
          {/* Accent bar at the bottom */}
          <div className="h-[2px] w-6 bg-[#0066FF]/60 rounded-full mt-2.5" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function LeadershipSection3D() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const bgLineY = useTransform(smoothScroll, [0, 1], [-15, 15]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none bg-white border-t border-slate-100"
    >
      {/* Subtle vertical and grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_40%,#000_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Ambient subtle blue glow */}
      <motion.div
        style={{ y: bgLineY, background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)' }}
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: bgLineY, background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
        className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full">

        {/* ── Section Header — Top Left ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 text-left"
        >
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100/90 mb-3.5">
            <span className="w-4 h-[2px] bg-[#0066FF] rounded-full" />
            <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#0066FF]">
              OUR LEADERSHIP
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-noto-sans text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#0B0F19] tracking-tight leading-[1.15]">
            The Minds Behind{' '}
            <span className="text-[#0066FF]">
              IDMS
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#475569] leading-relaxed max-w-xl font-noto-sans font-normal">
            Visionaries and engineers who have built one of India's most respected enterprise digital platforms.
          </p>
        </motion.div>

        {/* ── Leaders Row — 6 Cards in Single Row ── */}
        <div className="w-full">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 py-2">
            {LEADERS.map((person, i) => (
              <PortraitCard
                key={person.name}
                person={person}
                index={i}
                delay={i * 0.04}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
