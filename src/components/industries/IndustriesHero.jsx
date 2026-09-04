import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import waveLeft from '../../assets/shapes/wave-left.svg';
import waveRight from '../../assets/shapes/wave-right.svg';
import requestDemoCta from '../../assets/shapes/request-demo-cta.svg';

const CTA_IMG_SHADOW =
  'bg-transparent [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))]';
const CTA_SVG_LINK =
  'inline-block origin-center leading-none transition-transform duration-200 ease-out hover:scale-[calc(36/35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';
const industriesHeroImage = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80';

export default function IndustriesHero() {
  return (
    <section className="relative h-[calc(100vh-103px)] min-h-[520px] w-full bg-black overflow-hidden flex items-center">
      {/* Waves from CTASection */}
      <img
        src={waveLeft}
        alt=""
        className="pointer-events-none absolute -left-[10%] z-10 -top-[20%] h-[min(231%,739px)] w-auto max-w-[min(110.88vw,1040px)] select-none object-contain object-left-top opacity-50 mix-blend-screen"
        decoding="async"
        aria-hidden
      />
      <img
        src={waveRight}
        alt=""
        className="pointer-events-none absolute -bottom-[40%] -right-[5%] z-10 h-[min(202.4%,634px)] w-auto max-w-[min(109.12vw,986px)] select-none object-contain object-right-bottom opacity-50 mix-blend-screen"
        decoding="async"
        aria-hidden
      />

      <motion.img
        src={industriesHeroImage}
        alt="Industries hero background"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121]/90 via-[#0B1121]/70 to-transparent z-10" />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 lg:px-[80px]">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-[-0.02em]">
            Architected for the Complexity <br className="hidden md:block"/> of Your Industry
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-10">
            A unified platform integrating core operations, scalable workflows, and strict compliance without the overhead.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/contact" aria-label="Request a Demo" className={CTA_SVG_LINK}>
              <img
                src={requestDemoCta}
                alt="Request a Demo"
                width={276}
                height={53}
                className={`h-[40px] w-auto ${CTA_IMG_SHADOW}`}
                decoding="async"
              />
            </Link>
          </div>
        </motion.div>
      </div>
      
      <div
        className="absolute bottom-0 z-20 pointer-events-none h-[2px] w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}
