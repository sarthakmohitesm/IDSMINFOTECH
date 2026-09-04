import React from 'react';
import { motion } from 'framer-motion';

import SectionGradientDivider from './ui/SectionGradientDivider';

/** Remote hero background (replace URL with any direct image link you prefer). */
const TECH_HERO_BG_URL =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80';

const TechnologyHero = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative h-[calc(100vh-103px)] min-h-130 w-full overflow-hidden bg-slate-950">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${TECH_HERO_BG_URL})` }}
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="mx-auto flex w-full max-w-370 px-6 sm:px-10 lg:px-14">
              <motion.div
                className="max-w-170 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="mt-4 font-noto-sans text-[clamp(34px,4.6vw,64px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                  Built for Enterprise Software at Scale
                </h1>

                <p className="mt-5 max-w-155 font-noto-sans text-[clamp(15px,1.2vw,20px)] leading-relaxed text-white/88">
                  Modern architecture powering ERP, HRMS, and custom business platforms.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <SectionGradientDivider />
    </section>
  );
};

export default TechnologyHero;
