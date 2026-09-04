import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TechnologyHero from '../components/TechnologyHero';
import TechnologyStack from '../components/TechnologyStack';
import TechnologyStackToggle from '../components/TechnologyStackToggle';
import TechnologyLogosRow from '../components/TechnologyLogosRow';

import smartErpBanner from '../assets/pics/2smart-erp-section.png';
import requestDemoCta from '../assets/shapes/request-demo-cta.svg';

const CTA_IMG_SHADOW =
  'bg-transparent [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))] group-hover:[filter:drop-shadow(0_2px_6px_rgb(15_23_42/0.16))_drop-shadow(0_8px_18px_rgb(30_58_138/0.14))]';

const CTA_SVG_LINK =
  'inline-block origin-center leading-none transition-transform duration-200 ease-out hover:scale-[calc(37/35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

const Technology = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TechnologyHero />
      <TechnologyStack />
      <TechnologyStackToggle />

      {/* SMART ERP BANNER SECTION - FULL WIDTH WITH OVERLAY */}
      <div className="w-full bg-white relative flex justify-center items-center overflow-hidden h-auto group cursor-default z-10">
        <div
          className="absolute top-0 left-0 right-0 z-30 pointer-events-none h-px w-full shrink-0"
          style={{
            background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
          }}
          aria-hidden
        />

        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={smartErpBanner}
            alt="Smart ERP Section"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center z-20 pointer-events-none">
          <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-[80px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-[650px] p-4 md:p-6 pointer-events-auto"
            >
              <h2 className="text-[22px] font-semibold text-[#ff0096] mb-3 leading-tight text-left">
                Driving Intelligent Growth
              </h2>
              <div className="text-gray-600 mb-6 leading-tight text-left">
                <span className="text-[32px] md:text-[35px] font-bold text-[#122a66] block mb-4">
                  Turn complexity into clarity with <br />Smart ERP.
                </span>
                <span className="text-[16px] font-regular text-gray-500">
                  Gain visibility, streamline workflows, and scale with confidence.
                </span>
              </div>
              <div className="flex gap-4">
                <Link to="/contact" aria-label="Request a Demo" className={CTA_SVG_LINK}>
                  <img
                    src={requestDemoCta}
                    alt="Request a Demo"
                    width={276}
                    height={53}
                    className="h-[35px] w-auto bg-transparent"
                    decoding="async"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none h-[2px] w-full shrink-0"
          style={{
            background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
          }}
          aria-hidden
        />
      </div>

      <TechnologyLogosRow />
    </div>
  );
};

export default Technology;
