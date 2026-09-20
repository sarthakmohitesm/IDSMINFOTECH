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

const DIRECTORS = [
  {
    name: 'Shailesh Deshpande',
    role: 'Managing Director',
    image: pic2,
    accentColor: '#2563EB',
  },
  {
    name: 'Nikhil Moharil',
    role: 'Technical Director',
    image: pic1,
    accentColor: '#4F46E5',
  },
];

const MANAGERS = [
  {
    name: 'Rohan Pathradkar',
    role: 'Group Product Manager',
    image: ruhanImage,
    accentColor: '#0284C7',
  },
  {
    name: 'Nishigandha Kamlapurkar',
    role: 'Group Product Manager',
    image: nishigandhaImage,
    accentColor: '#059669',
  },
  {
    name: 'Payal Deo',
    role: 'Group Product Manager',
    image: payalImage,
    accentColor: '#7C3AED',
  },
  {
    name: 'Nilesh Saraf',
    role: 'Group Product Manager',
    image: nileshSarafImage,
    accentColor: '#DB2777',
  },
];

/* ── Individual Portrait Card ── */
function PortraitCard({ person, index, delay = 0, large = false }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 200, damping: 24 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg);

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group relative w-full select-none will-change-transform"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`relative w-full overflow-hidden rounded-lg ${large ? 'h-[420px] sm:h-[480px]' : 'h-[320px] sm:h-[370px]'}`}
      >
        {/* Portrait Image */}
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Permanent dark gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Hover shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${person.accentColor}22 0%, transparent 60%)` }}
        />

        {/* Accent top-left corner line */}
        <div
          className="absolute top-0 left-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderTop: `2px solid ${person.accentColor}`,
            borderLeft: `2px solid ${person.accentColor}`,
          }}
        />
        {/* Accent bottom-right corner line */}
        <div
          className="absolute bottom-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderBottom: `2px solid ${person.accentColor}`,
            borderRight: `2px solid ${person.accentColor}`,
          }}
        />

        {/* Name / Role block pinned to bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-5"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Accent line above name */}
          <div
            className="h-[2px] w-8 mb-3 rounded-full transition-all duration-500 group-hover:w-14"
            style={{ backgroundColor: person.accentColor }}
          />
          <h3 className="text-white font-bold text-[17px] sm:text-[19px] font-noto-sans tracking-tight leading-tight mb-1">
            {person.name}
          </h3>
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.18em] font-noto-sans"
            style={{ color: person.accentColor }}
          >
            {person.role}
          </p>
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

  const bgLineY = useTransform(smoothScroll, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-20 pb-28 md:pt-28 md:pb-36 px-4 lg:px-[80px] w-full overflow-hidden select-none bg-gradient-to-b from-[#F8FAFF] via-white to-[#F0F6FF] border-t border-slate-200/80"
    >
      {/* Subtle grid — matches rest of site */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Ambient glow orbs */}
      <motion.div
        style={{ y: bgLineY, background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)' }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: bgLineY, background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-18"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#2563EB]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#2563EB]">
              Our Leadership
            </span>
          </div>

          <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-extrabold text-[#0B0F19] font-noto-sans tracking-tight leading-[1.05] max-w-xl">
            The Minds Behind{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0083FF] to-[#00C9FF] bg-clip-text text-transparent">
              IDMS
            </span>
          </h2>
          <p className="mt-4 text-[15px] text-[#475569] leading-relaxed max-w-lg font-noto-sans">
            Visionaries and engineers who have built one of India's most respected enterprise digital platforms.
          </p>
        </motion.div>

        {/* ── Board of Directors — 2 large cards ── */}
        <div className="mb-4">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-slate-400 mb-5"
          >
            Board of Directors
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {DIRECTORS.map((person, i) => (
              <PortraitCard
                key={person.name}
                person={person}
                index={i}
                delay={i * 0.1}
                large={true}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-400">Management Team</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* ── Management Team — 4 smaller cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {MANAGERS.map((person, i) => (
            <PortraitCard
              key={person.name}
              person={person}
              index={i}
              delay={0.1 + i * 0.08}
              large={false}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
