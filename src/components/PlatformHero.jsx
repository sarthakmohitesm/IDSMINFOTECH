import React from 'react';
import heroImg from '../assets/landing/slide2a.png';

export default function PlatformHero() {
  return (
    <div className="relative w-full h-[min(calc(100vw*7/16),625px)] overflow-hidden bg-white">
      {/* Background Image - Clean with no overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="IDMS Platform"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
