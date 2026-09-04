import React, { useEffect, useState } from 'react';
import splashLogo from '../assets/shapes/splash_logo.svg';
import {
  PRELOADER_LOGO_ANIM_MS,
  PRELOADER_LOGO_DELAY_MS,
  PRELOADER_SLIDE_MS,
} from '../constants/preloaderTiming';

const slideEase = 'cubic-bezier(0.22, 1, 0.28, 1)';
const logoEase = 'cubic-bezier(0.2, 0.85, 0.25, 1)';

const Preloader = ({ isExiting }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const showId = setTimeout(() => {
      setMounted(true);
    }, PRELOADER_LOGO_DELAY_MS);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(showId);
    };
  }, []);

  useEffect(() => {
    if (isExiting) {
      document.body.style.overflow = '';
    }
  }, [isExiting]);

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      {/* Single panel + logo move together — smoother than sliding backdrop under a fixed logo */}
      <div
        className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.03)]"
        style={{
          background: 'linear-gradient(to bottom, #f9fafb 0%, #eef6ff 45%, #f9fafb 100%)',
          transform: isExiting ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
          transition: `transform ${PRELOADER_SLIDE_MS}ms ${slideEase}`,
          willChange: isExiting ? 'transform' : 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <img
          src={splashLogo}
          alt="IDMS Logo"
          className="h-auto w-[180px] drop-shadow-md sm:w-[200px] md:w-[240px] lg:w-[300px]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(0.62)',
            transformOrigin: 'center center',
            transition: `opacity ${PRELOADER_LOGO_ANIM_MS}ms ${logoEase}, transform ${PRELOADER_LOGO_ANIM_MS}ms ${logoEase}`,
          }}
          decoding="async"
        />
      </div>
    </div>
  );
};

export default Preloader;
