import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageBackground from '../components/ui/PageBackground';
import AboutStory from '../components/AboutStory';
import WhyIDMS from '../components/WhyIDMS';


import pic1 from '../assets/pics/06_JPG.avif';
import pic2 from '../assets/pics/07_JPG.avif';
import ruhanImage from '../assets/pics/Rohan.jpeg';
import nishigandhaImage from '../assets/pics/Nishigandha Mam.jpg';
import payalImage from '../assets/pics/Payal Mam.jpeg';
import nileshSarafImage from '../assets/pics/Nilesh_Saraf sir.jpg';
import smartErpBanner from '../assets/pics/2smart-erp-section.png';
import requestDemoCta from '../assets/shapes/request-demo-cta.svg';

const CTA_IMG_SHADOW =
  'bg-transparent [filter:drop-shadow(0_1px_3px_rgb(15_23_42/0.12))_drop-shadow(0_4px_10px_rgb(15_23_42/0.07))] group-hover:[filter:drop-shadow(0_2px_6px_rgb(15_23_42/0.16))_drop-shadow(0_8px_18px_rgb(30_58_138/0.14))]';

const CTA_SVG_LINK =
  'inline-block origin-center leading-none transition-transform duration-200 ease-out hover:scale-[calc(37/35)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

const aboutHeroImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';

const leadershipData = {
  "Board of Directors": [
    { name: "Shailesh Deshpande", role: "Managing Director", image: pic2 },
    { name: "Nikhil Moharil", role: "Technical Director", image: pic1 }
  ],
  "Management Team": [
    { name: "Rohan Pathradkar ", role: "Group Product Manager", image: ruhanImage },
    { name: "Nishigandha Kamlapurkar", role: "Group Product Manager", image: nishigandhaImage },
    { name: "Payal Deo", role: "Group Product Manager", image: payalImage },
    { name: "Nilesh Saraf ", role: "Group Product Manager", image: nileshSarafImage }
  ]
};

export default function About() {

  return (
    <PageBackground>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-103px)] min-h-[520px] w-full bg-black overflow-hidden flex items-center">
        <motion.img
          src={aboutHeroImage}
          alt="About hero background"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />


        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-20">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-[#0083FF] font-bold tracking-[0.2em] text-xs mb-4 uppercase flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-[#0083FF]"></span>
              Who we are
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-8 font-noto-sans tracking-tight">
              Building scalable digital platforms that power modern businesses
            </h1>
            <p className="text-lg md:text-xl text-white font-light leading-relaxed font-noto-sans max-w-xl opacity-90">
              Engineering high-performance applications with modern architecture and a vision for future-ready enterprises.
            </p>
          </motion.div>
        </div>

      </section>

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

      {/* 2nd Section (Narrative + Image) */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-20 px-4 lg:px-[80px] w-full bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Text Block */}
            <div className="lg:col-span-7 xl:col-span-7">
              <p className="text-[#0083FF] font-bold tracking-[0.2em] text-[11px] mb-4 uppercase">Our Mission</p>
              <h2 className="text-[40px] font-bold text-[#122a66] mb-2 font-noto-sans tracking-tight">
                Enterprise Modernization
              </h2>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-6">
                Partner of Choice
              </div>
              <p className="font-noto-sans text-[15px] leading-[1.6] text-[#475569] font-light max-w-xl">
                We are a trusted Digital Engineering partner, combining deep technical expertise and industry experience to help our clients anticipate what's next and answer questions before they're asked.
              </p>
              <p className="font-noto-sans text-[15px] leading-[1.6] text-[#475569] font-light mt-4 max-w-xl">
                Our proven solutions create unique competitive advantage for our clients by giving them the power to see beyond and rise above the complexities of modern engineering.
              </p>
            </div>

            {/* Right Image Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 xl:col-span-5 lg:ml-auto w-full max-w-[520px] relative rounded-[5px] overflow-hidden aspect-[1.3] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] group"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Digital Engineering Collaboration"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutStory />
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />
      <WhyIDMS />
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />

      {/* 3rd Section: Our Leadership (Full Grid) */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 lg:px-[80px] w-full bg-white border-t border-[#f1f5f9]">
        <div className="max-w-[1444px] mx-auto flex flex-col items-center">

          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <p className="text-[#0083FF] font-bold tracking-[0.25em] text-[12px] mb-4 uppercase">Expertise & Vision</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#122a66] font-noto-sans tracking-tight mb-6">
              Our Leadership Team
            </h2>
            <div className="mt-8 mx-auto h-1 w-20 bg-[#0083FF] rounded-full" />
          </div>

          {/* Responsive Cards Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 w-full max-w-[1140px] mx-auto">
              {[...leadershipData["Board of Directors"], ...leadershipData["Management Team"]].map((person, idx) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.03,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className={`relative bg-white border rounded-[5px] flex flex-col items-center text-center transition-all duration-500 group px-8 py-10 mx-auto w-full overflow-hidden
                    ${idx === 0 
                      ? "shadow-[0_8px_30px_rgba(37,85,235,0.12)] border-[#2555eb]/20 bg-[#f8fbff]" 
                      : "shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-[#e2e8f0] hover:shadow-[0_20px_40px_rgba(37,85,235,0.08)]"
                    }`}
                >
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#2555eb]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Blue Glow Effect */}
                  <div className="absolute -inset-1 bg-[#2555eb]/[0.03] rounded-[10px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-center scale-x-0 rounded-t-[5px] bg-[#0083FF] transition-transform duration-700 cubic-bezier(.22,1,.36,1) group-hover:scale-x-100" />
                  
                  {/* Image Container */}
                  <div className="relative h-[180px] w-[180px] mb-8 z-10 transition-transform duration-500">
                    {/* Static Dashed Border */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0083FF]/30 scale-110" />
                    
                    <div className="h-full w-full rounded-full overflow-hidden p-1 bg-white shadow-xl relative z-10">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full rounded-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Text Container */}
                  <h3 className="text-2xl font-bold text-[#122a66] font-noto-sans tracking-tight mb-2.5">
                    {person.name}
                  </h3>
                  <p className="text-[15px] text-[#475569] font-medium font-noto-sans tracking-wide">
                    {person.role}
                  </p>

                  {/* Animated Line Interaction */}
                  <div className="mt-8 w-10 h-[2.5px] bg-[#e2e8f0] group-hover:w-24 group-hover:bg-[#0083FF] transition-all duration-700 cubic-bezier(.22,1,.36,1)" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional CTA Link */}
          <div className="mt-20 text-center">
            <p className="text-gray-400 text-sm font-noto-sans font-light tracking-wide italic">
              Backed by strong leadership, we help businesses scale with confidence.
            </p>
          </div>

        </div>
      </section>

    </PageBackground>
  );
}
