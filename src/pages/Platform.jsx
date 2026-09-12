import React from 'react';
import PlatformHero from '../components/PlatformHero';
import PlatformModules from '../components/PlatformModules';

export default function Platform() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1 - HERO */}
      <PlatformHero />

      {/* SECTION 2 - MODULES (Alternating Layout) */}
      <PlatformModules />
    </div>
  );
}
