import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    accentColor: '#0066FF',
  },
  {
    name: 'Nikhil Mohan',
    role: 'TECHNICAL DIRECTOR',
    image: pic1,
    accentColor: '#0066FF',
  },
  {
    name: 'Rohan Pathwankar',
    role: 'GROUP PRODUCT MANAGER',
    image: ruhanImage,
    accentColor: '#0066FF',
  },
  {
    name: 'Priya Deshpande',
    role: 'HEAD – HR & ADMIN',
    image: nishigandhaImage,
    accentColor: '#0066FF',
  },
  {
    name: 'Minal Jadhav',
    role: 'FINANCE MANAGER',
    image: payalImage,
    accentColor: '#0066FF',
  },
  {
    name: 'Vivek Desai',
    role: 'OPERATIONS HEAD',
    image: nileshSarafImage,
    accentColor: '#0066FF',
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
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
        <div className="relative w-full aspect-[4/3.9] overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300">
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
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const bgLineY = useTransform(smoothScroll, [0, 1], [-20, 20]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-14 xl:px-20 overflow-hidden select-none bg-white border-t border-slate-200/80"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_40%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Ambient glow orbs */}
      <motion.div
        style={{ y: bgLineY, background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)' }}
        className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: bgLineY, background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[70px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto relative z-10 w-full">

        {/* ── Section Header — Top Left ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10"
        >
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100 mb-3">
            <span className="w-5 h-[2px] bg-[#0066FF] rounded-full" />
            <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#0066FF]">
              OUR LEADERSHIP
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#0B0F19] font-noto-sans tracking-tight leading-tight">
            The Minds Behind{' '}
            <span className="text-[#0066FF]">
              IDMS
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#475569] leading-relaxed max-w-xl font-noto-sans">
            Visionaries and engineers who have built one of India's most respected enterprise digital platforms.
          </p>
        </motion.div>

        {/* ── Leaders Row / Carousel with Left & Right Arrows ── */}
        <div className="relative w-full flex items-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 text-[#0066FF] flex items-center justify-center hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Previous Leaders"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Grid / Container */}
          <div
            ref={carouselRef}
            className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
          >
            {LEADERS.map((person, i) => (
              <PortraitCard
                key={person.name}
                person={person}
                index={i}
                delay={i * 0.05}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 text-[#0066FF] flex items-center justify-center hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Next Leaders"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
