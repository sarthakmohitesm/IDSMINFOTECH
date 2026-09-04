import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import indus1 from '../../assets/pics/indus1.png';
import indus2 from '../../assets/pics/indus2.png';
import indus3 from '../../assets/pics/indus3.png';

export default function HowErpAdapts() {
  const images = [
    { src: indus1, alt: 'Sector Analysis' },
    { src: indus2, alt: 'Configuration' },
    { src: indus3, alt: 'Deployment' },
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 9000);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  const steps = [
    {
      title: "Operational Audit & Gap Mapping",
      desc: "We begin by understanding your planning, production, and dispatch workflows to identify operational gaps and define a clear implementation roadmap."
    },
    {
      title: "Intelligent Module Configuration",
      desc: "Modules are configured to match your industry processes, enabling streamlined scheduling, inventory visibility, and connected operational control."
    },
    {
      title: "Phased Deployment & Scalable Adoption",
      desc: "IDMS is rolled out in phases to ensure smooth adoption, real-time visibility, and scalable performance across departments."
    }
  ];

  return (
    <section className="relative flex h-[560px] w-full flex-col overflow-hidden bg-white select-none">
      {/* Top Separator Line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px w-full"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 w-full min-w-0 flex-1 flex-row">
        {/* LEFT SIDE: INDUSTRY STRIPS */}
        <div className="relative flex h-full w-[54%] shrink-0 overflow-hidden bg-white">
          <div className="relative h-full w-full">
            {images.map((image, index) => (
              <img
                key={image.alt}
                src={image.src}
                alt={image.alt}
                className={`absolute left-0 top-1/2 h-full w-auto max-w-none -translate-y-1/2 object-contain object-left transition-opacity duration-1000 ${index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="flex h-full w-[46%] flex-col justify-center bg-white pl-3 pr-4 pt-4 pb-10 sm:pr-6 lg:pl-6 lg:pr-[80px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="mb-2 font-noto-sans text-[28px] font-bold leading-[1.2] text-[#122a66]">
              Turn Industry Logic into Operational Execution
            </h1>

            <p className="mb-6 font-noto-sans text-[14px] leading-relaxed text-[#374151] opacity-80">
              IDMS Smart ERP is designed to adapt to your industry workflows. From understanding your operations to configuring modules and deploying across teams, our structured approach ensures faster adoption, operational clarity, and scalable performance.
            </p>

            <div className="space-y-5">
              {steps.map((step, idx) => (
                <div key={idx} className="group flex flex-col gap-0.5">
                  <h2 className="font-noto-sans text-[20px] font-bold text-[#1e82e6] group-hover:text-[#122a66] transition-colors">
                    {step.title}
                  </h2>
                  <p className="font-noto-sans text-[14px] leading-relaxed text-[#4b5563] opacity-90">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Separator Line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px w-full"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}


