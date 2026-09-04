import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import punemetagraph from '../assets/customers/punemetagraph.svg';
import talentco from '../assets/customers/talentco.svg';
import sneham from '../assets/customers/sneham.svg';
import coroseal from '../assets/customers/coroseal.svg';
import renuka from '../assets/customers/renuka.svg';
import waco from '../assets/customers/waco.svg';
import acme from '../assets/customers/acme.svg';
import biolaxi from '../assets/customers/biolaxi.svg';
import ilabels from '../assets/customers/ilabels.svg';
import aurotapes from '../assets/customers/aurotapes.svg';
import adaids from '../assets/customers/adaids.svg';
import atp from '../assets/customers/atp.svg';
import continental from '../assets/customers/continental.svg';
import decaltech from '../assets/customers/decaltech.svg';
import dnd from '../assets/customers/dnd.svg';
import klaarglas from '../assets/customers/klaarglas.svg';
import rangvishwa from '../assets/customers/rangvishwa.svg';
import seriprints from '../assets/customers/seriprints.svg';
import vega from '../assets/customers/vega.svg';
import vegahitech from '../assets/customers/vegahitech.svg';
import vit from '../assets/customers/vit.svg';
import patternSvg from '../assets/shapes/pattern.svg';
import pattern2Svg from '../assets/shapes/pattern2.svg';

const CLIENTS = [
  { name: 'Pune Metagraph', logo: punemetagraph },
  { name: 'Talentco', logo: talentco },
  { name: 'Sneham', logo: sneham },
  { name: 'Coroseal', logo: coroseal },
  { name: 'Renuka', logo: renuka },
  { name: 'Waco', logo: waco },
  { name: 'Acme', logo: acme },
  { name: 'Biolaxi', logo: biolaxi },
  { name: 'Ilabels', logo: ilabels },
  { name: 'Aurotapes', logo: aurotapes },
  { name: 'Adaids', logo: adaids },
  { name: 'ATP', logo: atp },
  { name: 'Continental', logo: continental },
  { name: 'DecalTech', logo: decaltech },
  { name: 'DND', logo: dnd },
  { name: 'Klaarglas', logo: klaarglas },
  { name: 'Rangvishwa', logo: rangvishwa },
  { name: 'Seriprints', logo: seriprints },
  { name: 'Vega', logo: vega },
  { name: 'VIT', logo: vit },
  { name: 'Vega Hitech', logo: vegahitech },
];

export default function ClientShowcase() {
  const [activeIndex, setActiveIndex] = useState(5); // Start slightly offset to allow initial smooth scrolling
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Pause scroll while inspecting

  // Create a dynamic sliding window of indices to support infinite continuous scrolling
  // without creating a massive DOM tree that runs out after a few hours
  const visibleIndices = Array.from({ length: 21 }, (_, i) => activeIndex - 10 + i);

  useEffect(() => {
    if (isPaused) return; // Halt scroll immediately to prevent lag/stutter while hovered
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 2500); // 2.5 seconds pause
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="clients"
      className="w-full relative h-[350px] px-[60px] flex flex-col justify-center overflow-hidden bg-white"
    >
      <img
        src={pattern2Svg}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-auto max-w-none select-none"
        draggable={false}
        aria-hidden
      />
      <img
        src={patternSvg}
        alt=""
        className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-auto max-w-none select-none"
        draggable={false}
        aria-hidden
      />
      {/* Same gradient hairline as ContactFormSection / TestimonialSection top edge */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-px"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />

      <div className="max-w-[1200px] mx-auto h-full w-full relative z-[2] flex flex-col justify-center">
        {/* SMALL HEADER */}
        <div className="absolute top-[64px] left-0 right-0 flex items-center justify-center gap-8">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 100, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-[2px] bg-gradient-to-r from-transparent to-[#0083FF]/60"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[25px] font-bold text-[#122a66] uppercase tracking-[0.3em] font-noto-sans"
          >
            Powering Success Across Industries
          </motion.span>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 100, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-[2px] bg-gradient-to-l from-transparent to-[#0083FF]/60"
          />
        </div>

        {/* LOGO CAROUSEL CONTAINER */}
        <div className="relative h-[120px] flex items-center justify-center overflow-visible mt-[100px]">
          {/* VIEWFINDER CAPTURE FRAME (Dynamic Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[105px] pointer-events-none z-30 hidden md:block">
            {/* Corners */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-[2px] border-l-[2px] border-[#0083FF] transition-all duration-500 ease-out ${isCenterHovered ? '-translate-x-3 -translate-y-3 scale-150' : ''}`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-[2px] border-r-[2px] border-[#0083FF] transition-all duration-500 ease-out ${isCenterHovered ? 'translate-x-3 -translate-y-3 scale-150' : ''}`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-[2px] border-l-[2px] border-[#0083FF] transition-all duration-500 ease-out ${isCenterHovered ? '-translate-x-3 translate-y-3 scale-150' : ''}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-[2px] border-r-[2px] border-[#0083FF] transition-all duration-500 ease-out ${isCenterHovered ? 'translate-x-3 translate-y-3 scale-150' : ''}`} />
          </div>

          {/* INNER CLIPPED TRACK */}
          <div className="absolute inset-0 overflow-hidden w-full h-full">
            {/* FADE MASKS */}
            <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-white to-transparent z-40 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-white to-transparent z-40 pointer-events-none" />

            {/* STEPPING SCROLLER */}
            <div className="absolute inset-y-0" style={{ left: '50%' }}>
            <motion.div
              className="absolute inset-y-0"
              // 270px is the total width occupied by one item cell
              animate={{ x: `calc(-${activeIndex * 270 + 135}px)` }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} // Smooth snap
            >
              {visibleIndices.map((idx) => {
                const normalizedIdx = ((idx % CLIENTS.length) + CLIENTS.length) % CLIENTS.length;
                const client = CLIENTS[normalizedIdx];
                const distFromActive = Math.abs(idx - activeIndex);
                const logoWrapClass =
                  distFromActive === 0
                    ? 'opacity-100 scale-125 group-hover:scale-[1.35]'
                    : distFromActive === 1
                      ? 'opacity-60 scale-75'
                      : 'opacity-[0.65] scale-75';

                return (
                  <div
                    key={idx}
                    className="group absolute top-0 bottom-0 flex items-center justify-center cursor-pointer w-[270px]"
                    style={{ left: `${idx * 270}px` }}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => {
                      setIsPaused(true);
                      if (activeIndex === idx) setIsCenterHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsPaused(false);
                      setIsCenterHovered(false);
                    }}
                  >
                    <div
                      className={`flex h-[50px] w-[180px] items-center justify-center transition-all duration-500 ease-out ${logoWrapClass}`}
                    >
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full cursor-default"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          src={client.logo}
                          alt={client.name}
                          className={`max-w-full max-h-full object-contain ${['Klaarglas', 'Renuka', 'ATP'].includes(client.name) ? 'scale-[1.4]' : ''}`}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          {/* END INNER CLIPPED TRACK */}
          </div>
        </div>
      </div>
    </section>
  );
}
