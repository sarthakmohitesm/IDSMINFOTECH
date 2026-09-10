import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide2a from '../assets/landing/slide2a.png';
import slide1 from '../assets/landing/slide1.mp4';
import slide3 from '../assets/landing/slide3.mp4';
import slide5 from '../assets/landing/Slide5.mp4';
import { PRELOADER_HERO_VIDEO_AT_MS } from '../constants/preloaderTiming';

const SLIDES = [
  { type: 'video', src: slide3, alt: 'Technology and digital services' },
  { type: 'video', src: slide1 },
  { type: 'image', src: slide2a, alt: 'Smart ERP workspace', holdMs: 7000 },
  { type: 'video', src: slide5 },
];

/** Default time each slide stays visible when not overridden, ms */
const SLIDE_HOLD_MS = 8000;

/**
 * Hero height follows 16:9 vs viewport width, capped on very wide screens.
 * 16:9 vs viewport, capped on very wide screens.
 */
const HERO_HEIGHT_CLASS = 'h-[min(calc(100vw*9/16),672px)]';

/** All slides use the same fill so the hero rectangle is fully covered, no gaps. */
const MEDIA_FIT_CLASS = 'h-full w-full object-cover object-center';

export default function LandingHeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideshowReady, setSlideshowReady] = useState(false);
  const videoRefs = useRef({});

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSlideshowReady(true), PRELOADER_HERO_VIDEO_AT_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!slideshowReady) return;
    const holdMs = SLIDES[activeIndex].holdMs ?? SLIDE_HOLD_MS;
    const t = setTimeout(goNext, holdMs);
    return () => clearTimeout(t);
  }, [slideshowReady, activeIndex, goNext]);

  useEffect(() => {
    Object.values(videoRefs.current).forEach((el) => el?.pause());
    const slide = SLIDES[activeIndex];
    if (slide.type !== 'video') return;
    const el = videoRefs.current[activeIndex];
    if (!el) return;
    el.currentTime = 0;
    el.play().catch((e) => console.log('Hero slide video play blocked/failed:', e));
  }, [activeIndex]);

  return (
    <section
      className={`relative w-full -mt-[24px] md:-mt-[44px] z-0 overflow-hidden bg-black ${HERO_HEIGHT_CLASS}`}
      aria-label="Landing highlights"
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === activeIndex;
        const baseLayer =
          'absolute inset-0 transition-opacity ease-in-out duration-[900ms] motion-reduce:transition-none';

        if (slide.type === 'image') {
          return (
            <div
              key={i}
              className={baseLayer}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : i,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={MEDIA_FIT_CLASS}
                draggable={false}
              />
            </div>
          );
        }

        return (
          <div
            key={i}
            className={baseLayer}
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : i,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[i] = el;
                else delete videoRefs.current[i];
              }}
              src={slide.src}
              muted
              playsInline
              preload="auto"
              className={MEDIA_FIT_CLASS}
              aria-label={slide.alt}
            />
          </div>
        );
      })}

      {/* Content Overlay - Show only on first slide (slide3) */}
      {activeIndex === 0 && (
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-[1320px] mx-auto w-full px-6 lg:px-8">
            <motion.div className="max-w-[1200px]">
              {/* Heading - Character animation from left */}
              <motion.h1 className="text-[40px] font-bold leading-[1.15] text-white">
                {[
                  "From Chaos to Clarity – Make Informed ",
                  "Decisions with Real-Time Insights"
                ].map((part, partIdx) => (
                  <motion.span key={partIdx} className={`${partIdx === 1 ? "text-[#ffffff]" : ""} text-[40px]`}>
                    {part.split('').map((char, charIdx) => (
                      <motion.span
                        key={`${partIdx}-${charIdx}`}
                        className={(char === '—' || char === '–' || char === '-') ? 'text-[28px]' : 'text-[40px]'}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 3 + charIdx * 0.02,
                          ease: 'easeOut'
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {partIdx === 0 && <br />}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </div>
        </div>
      )}

      {/* Content Overlay - Show only on second slide (slide1) */}
      {activeIndex === 1 && (
        <div className="absolute inset-0 z-10">
          {/* Text positioned at bottom left with blurred background */}
          <div className="absolute bottom-32 left-12 lg:left-20 max-w-[800px] backdrop-blur-md bg-black/30 rounded flex items-center">
            <motion.h1 className="text-[40px] font-bold leading-tight text-white text-left w-full px-2 py-0">
              {[
                "Connect Every Machine, Process, and ",
                "Decision on One System"
              ].map((part, partIdx) => (
                <motion.span key={partIdx} className={`${partIdx === 1 ? "text-[#ffffff]" : ""} text-[40px]`}>
                  {part.split('').map((char, charIdx) => (
                    <motion.span
                      key={`${partIdx}-${charIdx}`}
                      className={(char === '—' || char === '–' || char === '-') ? 'text-[28px]' : 'text-[40px]'}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + charIdx * 0.02,
                        ease: 'easeOut'
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {partIdx === 0 && <br />}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>
      )}

      {/* Content Overlay - Show only on third slide (slide2a) */}
      {activeIndex === 2 && (
        <div className="absolute inset-0 z-10">
          {/* Text positioned at bottom left with blurred background */}
          <div className="absolute bottom-70 left-12 lg:left-16 max-w-[800px] backdrop-blur-md bg-black/30 rounded flex items-center">
            <motion.h1 className="text-[40px] font-bold leading-tight text-white text-left w-full px-2 py-0">
              {[
                "A Day Powered by Smart ERP — ",
                "Where Every Process Connects"
              ].map((part, partIdx) => (
                <motion.span key={partIdx} className={`${partIdx === 1 ? "text-[#ffffff]" : ""} text-[40px]`}>
                  {part.split('').map((char, charIdx) => (
                    <motion.span
                      key={`${partIdx}-${charIdx}`}
                      className={(char === '—' || char === '–' || char === '-') ? 'text-[28px]' : 'text-[40px]'}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + charIdx * 0.02,
                        ease: 'easeOut'
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {partIdx === 0 && <br />}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>
      )}

      {/* Content Overlay - Show only on fourth slide (slide5) */}
      {activeIndex === 3 && (
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-[1320px] mx-auto w-full px-6 lg:px-8">
            <motion.div className="max-w-[1200px] translate-y-12">
              {/* Heading - Character animation from left */}
              <motion.h1 className="text-[40px] font-bold leading-[1.15] text-white">
                {[
                  "Scale with Systems Built for ",
                  "Real-World Complexity"
                ].map((part, partIdx) => (
                  <motion.span key={partIdx} className={`${partIdx === 1 ? "text-[#ffffff]" : ""} text-[40px]`}>
                    {part.split('').map((char, charIdx) => (
                      <motion.span
                        key={`${partIdx}-${charIdx}`}
                        className={(char === '—' || char === '–' || char === '-') ? 'text-[28px]' : 'text-[40px]'}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 2 + charIdx * 0.02,
                          ease: 'easeOut'
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {partIdx === 0 && <br />}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-4">
        {/* Previous Button */}
        <button
          onClick={goPrev}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Next Button */}
        <button
          onClick={goNext}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </section>
  );
}