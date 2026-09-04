import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import requestDemoCta from '../assets/shapes/request-demo-cta.svg';
import talkToTeam from '../assets/shapes/talk-to-team.svg';
import waveLeft from '../assets/shapes/wave-left.svg';
import waveRight from '../assets/shapes/wave-right.svg';

/**
 * Light drop-shadow that follows SVG alpha (no rectangular “card” behind the img).
 * `drop-shadow` on the img — do not edit the SVG files.
 */
const CTA_IMG_SHADOW =
  'bg-transparent [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))]';

/** ~+1px vs h-[35px] — same transition feel as Navbar request-demo link. */
const CTA_SVG_LINK =
  'inline-block origin-center leading-none transition-transform duration-200 ease-out hover:scale-[calc(36/35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

export default function CTASection() {
  return (
    <section className="relative flex h-[313px] min-h-[313px] max-h-[313px] w-full flex-col overflow-hidden bg-white">
      <img
        src={waveLeft}
        alt=""
        className="pointer-events-none absolute -left-[25%] z-0 -top-[45%] h-[min(231%,739px)] w-auto max-w-[min(110.88vw,1040px)] select-none object-contain object-left-top"
        decoding="async"
        aria-hidden
      />
      <img
        src={waveRight}
        alt=""
        className="pointer-events-none absolute -bottom-[95%] -right-[5%] z-0 h-[min(202.4%,634px)] w-auto max-w-[min(109.12vw,986px)] select-none object-contain object-right-bottom"
        decoding="async"
        aria-hidden
      />
      <div
        className="relative z-10 pointer-events-none h-px w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-2xls font-bold leading-tight sm:text-[1.65rem] md:text-3xl"
            style={{ color: '#1e82e6' }}
          >
            Run Your Operations Smarter
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-4 max-w-2xl !text-[18px] !leading-relaxed text-gray-600"
          >
            Gain complete visibility, streamline workflows, and make faster 
            <br /> decisions with Smart ERP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row sm:gap-3"
          >
            <Link to="/contact" aria-label="Request a Demo" className={CTA_SVG_LINK}>
              <img
                src={requestDemoCta}
                alt=""
                width={276}
                height={53}
                className={`h-[35px] w-auto ${CTA_IMG_SHADOW}`}
                decoding="async"
              />
            </Link>
            <Link to="/contact" aria-label="Talk to Our Team" className={CTA_SVG_LINK}>
              <img
                src={talkToTeam}
                alt=""
                width={276}
                height={53}
                className={`h-[35px] w-auto ${CTA_IMG_SHADOW}`}
                decoding="async"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
