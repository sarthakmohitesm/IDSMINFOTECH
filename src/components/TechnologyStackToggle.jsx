import React from 'react';
import { motion } from 'framer-motion';
import MernStack from '../assets/pics/mern.svg';
import MeanStack from '../assets/pics/mean.svg';
import SectionGradientDivider from './ui/SectionGradientDivider';

/* ─── Stack copy ──────────────────────────────────────────────── */
const stackData = {
  MERN:
    'At IDMS, we use the MERN stack to build fast, reliable, and highly scalable web applications for modern businesses. MongoDB serves as our primary NoSQL database, helping us manage large and evolving volumes of operational data with flexibility and speed. Express.js powers our secure API layer, React.js enables dynamic and responsive user experiences, and Node.js ties everything together through a high-performance JavaScript runtime. This unified stack lets us accelerate development, reduce integration complexity, and deliver tailored solutions that align with each client\'s business goals.',
  MEAN:
    'At IDMS, we use the MEAN stack to deliver powerful, structured, and enterprise-grade web applications that are built for scale. MongoDB provides a flexible data foundation, Express.js enables robust and secure backend services, Angular helps us create consistent and maintainable front-end architecture, and Node.js ensures efficient server-side execution across the application lifecycle. With MEAN, we can implement complex business logic, role-based workflows, and data-intensive modules while maintaining performance and code quality.',
};

const stackSections = [
  {
    key: 'MERN',
    title: 'MERN Stack at IDMS',
    content: stackData.MERN,
    image: MernStack,
    imageAlt: 'MERN stack visual',
    reverseOnDesktop: false,
    background: '#ebebff',
    showGrid: false,
  },
  {
    key: 'MEAN',
    title: 'MEAN Stack at IDMS',
    content: stackData.MEAN,
    image: MeanStack,
    imageAlt: 'MEAN stack visual',
    reverseOnDesktop: true,
    background: '#ffffff',
    showGrid: true,
  },
];

/* ─── Two separate sections: MERN (lavender) + MEAN (white) ───── */
export default function TechnologyStackToggle() {
  return (
    <>
      {stackSections.map((section) => (
        <React.Fragment key={section.key}>
        <section
          className={`relative flex flex-col justify-center overflow-hidden px-4 lg:px-20 ${
            section.key === 'MEAN'
              ? 'pt-8 pb-10 lg:pt-10 lg:pb-12'
              : 'py-10 lg:py-12'
          }`}
          style={{ background: section.background }}
          aria-labelledby={`${section.key.toLowerCase()}-heading`}
        >
          {section.showGrid ? (
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.4]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />
          ) : null}

          <div className="relative z-10 w-full">
            <div
              className={`grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10 ${
                section.reverseOnDesktop
                  ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
                  : ''
              }`}
            >
              {/* Image Container */}
              <motion.div
                initial={{ opacity: 0, x: section.reverseOnDesktop ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="p-0"
              >
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="mx-auto w-full max-w-85 object-contain"
                />
              </motion.div>

              {/* Text Content Container */}
              <motion.div
                initial={{ opacity: 0, x: section.reverseOnDesktop ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className={
                  section.key === 'MEAN' ? 'p-0 lg:pl-29' : 'p-0'
                }
              >
                <h3
                  id={`${section.key.toLowerCase()}-heading`}
                  className="font-noto-sans text-[30px] font-black leading-tight tracking-[-0.03em] text-[#122a66]"
                >
                  {section.title}
                </h3>
                <p className="mt-3 max-w-prose font-noto-sans text-[15px] leading-snug text-slate-600">
                  {section.content}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <SectionGradientDivider />
        </React.Fragment>
      ))}
    </>
  );
}
