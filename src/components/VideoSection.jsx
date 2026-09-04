import React from 'react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  return (
    <section className="bg-white py-12 px-4 h-screen flex items-center overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {}
        }}
        className="max-w-[900px] mx-auto flex flex-col items-center w-full"
      >
        {/* Logo Animation */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="mb-12 -mt-20"
        >
          <img 
            src="/idms_logo.svg" 
            alt="IDMS Logo" 
            className="h-16 w-auto"
          />
        </motion.div>

        {/* Video Animation */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(10px)" },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: "blur(0px)",
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
            }
          }}
          className="relative w-full max-w-[800px] aspect-video rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-gray-100"
        >
          <iframe
            className="absolute inset-0 w-full h-full shadow-inner"
            src="https://www.youtube.com/embed/U5qbpDkXvTU"
            title="IDMS Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
}
