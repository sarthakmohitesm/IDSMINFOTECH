import React from 'react';

/** Same 1px gradient band as CTASection (page CTA band top edge). */
export default function SectionGradientDivider() {
  return (
    <div
      className="relative z-10 h-px w-full shrink-0 pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
      }}
      aria-hidden
    />
  );
}
