import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import MernStack from '../assets/pics/mern.svg';
import MeanStack from '../assets/pics/mean.svg';

const stackSections = [
  {
    key: 'MERN',
    label: 'MERN Stack',
    tagline: 'Fast, Flexible & Full-Stack',
    title: 'MERN Stack at IDMS',
    content:
      'At IDMS, we use the MERN stack to build fast, reliable, and highly scalable web applications for modern businesses. MongoDB serves as our primary NoSQL database, Express.js powers our secure API layer, React.js enables dynamic and responsive user experiences, and Node.js ties everything together through a high-performance JavaScript runtime.',
    image: MernStack,
    imageAlt: 'MERN stack visual',
    reverse: false,
    accent: '#2563EB',
    pills: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
  },
  {
    key: 'MEAN',
    label: 'MEAN Stack',
    tagline: 'Structured, Scalable & Enterprise-Ready',
    title: 'MEAN Stack at IDMS',
    content:
      'At IDMS, we use the MEAN stack to deliver powerful, structured, and enterprise-grade web applications built for scale. MongoDB provides a flexible data foundation, Express.js enables robust backend services, Angular delivers consistent front-end architecture, and Node.js ensures efficient server-side execution throughout the application lifecycle.',
    image: MeanStack,
    imageAlt: 'MEAN stack visual',
    reverse: true,
    accent: '#7C3AED',
    pills: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
  },
];

function StackSection({ section, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const imgY = useTransform(smooth, [0, 1], [section.reverse ? -30 : 30, section.reverse ? 30 : -30]);
  const textY = useTransform(smooth, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden border-t border-slate-200/80 px-6 lg:px-[80px] py-20 lg:py-28 ${
        index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFF]'
      }`}
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right,#e5e7eb 1px,transparent 1px),linear-gradient(to bottom,#e5e7eb 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000 40%,transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000 40%,transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Glow blob */}
      <div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
        style={{
          backgroundColor: section.accent,
          top: '20%',
          [section.reverse ? 'right' : 'left']: '-5%',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className={`grid grid-cols-1 items-center gap-12 lg:gap-20 lg:grid-cols-2 ${section.reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>

          {/* Image */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, x: section.reverse ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Glow ring behind image */}
            <div
              className="absolute w-[280px] h-[280px] rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: section.accent }}
            />
            <img
              src={section.image}
              alt={section.imageAlt}
              className="relative z-10 w-full max-w-[380px] object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: section.reverse ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${section.accent})` }} />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: section.accent }}>
                {section.label}
              </span>
            </div>

            <h3 className="font-noto-sans text-[clamp(26px,3vw,40px)] font-extrabold leading-tight tracking-[-0.03em] text-[#0B0F19] mb-2">
              {section.title}
            </h3>
            <p className="text-[13px] font-semibold text-slate-400 mb-5 uppercase tracking-wider">{section.tagline}</p>

            <p className="font-noto-sans text-[15px] leading-[1.75] text-[#475569] mb-7 max-w-lg">
              {section.content}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {section.pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold border"
                  style={{
                    color: section.accent,
                    borderColor: `${section.accent}30`,
                    backgroundColor: `${section.accent}08`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: section.accent }} />
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function TechnologyStackToggle() {
  return (
    <>
      {stackSections.map((section, i) => (
        <StackSection key={section.key} section={section} index={i} />
      ))}
    </>
  );
}
