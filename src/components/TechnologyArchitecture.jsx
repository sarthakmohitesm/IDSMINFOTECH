import React from 'react';
import { motion } from 'framer-motion';

const bentoCards = [
  {
    title: 'Enterprise ERP Platforms',
    text: 'Modular ERP systems built for finance, inventory, operations, and workflow automation across business departments.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    className: 'lg:col-span-7 lg:row-span-2 min-h-[520px]',
  },
  {
    title: 'HRMS & Workforce Systems',
    text: 'Employee lifecycle management including attendance, payroll, approvals, and workforce analytics.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    className: 'lg:col-span-5 min-h-[250px]',
  },
  {
    title: 'Custom Business Applications',
    text: 'Tailored enterprise software designed around operational workflows and business processes.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    className: 'lg:col-span-5 min-h-[250px]',
  },
  {
    title: 'Cloud-Native Deployment',
    text: 'Scalable infrastructure with automated deployment and high availability architecture.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    className: 'lg:col-span-3 min-h-[240px]',
  },
  {
    title: 'AI & Automation',
    text: 'Intelligent automation, document processing, and analytics-driven workflows.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    className: 'lg:col-span-3 min-h-[240px]',
  },
  {
    title: 'API-First Integrations',
    text: 'ERP integrations, third-party systems, and enterprise data exchange architecture.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    className: 'lg:col-span-6 min-h-[240px]',
  },
];

const fallbackArchitectureImage =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80';

function BentoCard({ card, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-[5px] border border-slate-200/80 bg-white shadow-[0_8px_26px_rgba(15,23,42,0.04)] transition-all duration-300 ${card.className}`}
    >
      <div className="absolute inset-0">
        <img
          src={card.image}
          alt={card.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackArchitectureImage;
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04)_35%,rgba(2,6,23,0.14)_62%,rgba(2,6,23,0.72)_100%)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <div className="max-w-136">
          <div className="font-noto-sans text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)]">
            {card.title}
          </div>
          <p className="mt-2 max-w-136 font-noto-sans text-[13px] leading-relaxed text-white/82 sm:text-[14px]">
            {card.text}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

const TechnologyArchitecture = () => {
  return (
    <section className="bg-[#f8fafc] px-4 pb-20 sm:px-6 lg:px-20 lg:pb-24">
      <div className="mx-auto max-w-370">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:auto-rows-[240px]">
          {bentoCards.map((card, index) => (
            <BentoCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyArchitecture;
