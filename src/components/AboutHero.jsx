import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, Factory, CheckCircle2, TrendingUp, LayoutTemplate, Settings, Database, Server, Workflow, Box, Shield, LineChart } from 'lucide-react';

const AboutHero = () => {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(400);
  const mouseOpacity = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Parallax mappings for the 3D stack based on mouse movement
  // Layer 1 (Top) - moves the most
  const x1 = useTransform(springX, [0, 1280], [-40, 40]);
  const y1 = useTransform(springY, [0, 800], [-40, 40]);
  
  // Layer 2 (Middle)
  const x2 = useTransform(springX, [0, 1280], [-20, 20]);
  const y2 = useTransform(springY, [0, 800], [-20, 20]);

  // Layer 3 (Bottom)
  const x3 = useTransform(springX, [0, 1280], [-5, 5]);
  const y3 = useTransform(springY, [0, 800], [-5, 5]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      mouseOpacity.set(1);
    };
    const handleLeave = () => {
      // Revert to center smoothly
      const rect = el.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
      mouseOpacity.set(0);
    };
    
    // Initial center set
    const initialRect = el.getBoundingClientRect();
    mouseX.set(initialRect.width / 2);
    mouseY.set(initialRect.height / 2);

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, mouseOpacity]);

  return (
    <section className="relative px-[2vw] pt-[124px] pb-8 bg-transparent overflow-hidden flex justify-center">
      <div className="relative w-full">
        {/* Main Hero Container */}
        <div 
          ref={heroRef}
          className="w-full min-h-[80vh] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] relative overflow-hidden flex items-center p-6 md:p-8 lg:px-12 lg:py-10"
        >
          {/* Cursor Glow */}
          <motion.div
            className="pointer-events-none absolute z-[1] rounded-full will-change-transform"
            style={{
              width: 400,
              height: 400,
              top: springY,
              left: springX,
              translate: '-50% -50%',
              background: 'radial-gradient(circle, rgba(0,201,255,0.05) 0%, rgba(0,143,255,0.04) 45%, transparent 70%)',
              filter: 'blur(50px)',
              opacity: mouseOpacity,
            }}
          />

          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-[1440px] mx-auto relative z-10">
            {/* Left Content */}
            <div className="flex flex-col items-start max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100/50 text-[#432172] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#432172] animate-pulse"></span>
                About Us
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-noto-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#111827] mb-8"
              >
                Building Smart ERP for the Heart of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] via-[#432172] to-[#008FFF]">
                  Indian Manufacturing
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-[#4B5563] leading-relaxed max-w-[540px] mb-10 font-medium font-noto-sans"
              >
                Since 2021, we've partnered with ambitious manufacturing SMEs to deliver enterprise-grade ERP, automation, and process excellence—without enterprise-grade complexity or cost.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 max-w-[540px]"
              >
                {[
                  { icon: Factory, label: "40+ Deployments", color: "#00C9FF" },
                  { icon: Building2, label: "20+ Industries", color: "#432172" },
                  { icon: CheckCircle2, label: "99.9% Success Rate", color: "#008FFF" }
                ].map((tag, i) => (
                  <motion.span 
                    key={i} 
                    whileHover={{ scale: 1.05, y: -2, transition: { type: "spring", stiffness: 400 } }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-white border border-gray-100 text-[#111827] text-sm font-bold shadow-[0_2px_12px_rgb(0,0,0,0.06)] whitespace-nowrap cursor-default group hover:shadow-lg transition-all"
                  >
                    <tag.icon className="w-4 h-4" style={{ color: tag.color }} />
                    {tag.label}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Right Graphic - 3D Parallax Exploded Stack */}
            <div className="relative flex flex-col items-center justify-center lg:items-end w-full h-[380px] pointer-events-none">
              
              <div 
                className="relative w-full max-w-[400px] h-[340px]"
                style={{ perspective: 1500 }}
              >
                <motion.div 
                  initial={{ opacity: 0, rotateX: 0, rotateY: 0 }}
                  animate={{ opacity: 1, rotateX: 60, rotateZ: -45, scale: 0.8 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  
                  {/* LAYER 3: Data / Foundation (Bottom Layer) */}
                  <motion.div 
                    style={{ x: x3, y: y3, translateZ: -60 }}
                    className="absolute w-[280px] h-[280px] bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-3xl border border-gray-700 shadow-[20px_20px_60px_rgba(0,0,0,0.15)] flex flex-col p-6 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#008FFF]/5"></div>
                    <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                        <Database className="w-5 h-5 text-[#008FFF]" />
                      </div>
                      <div>
                        <div className="text-white font-bold opacity-80 text-sm">Data Core</div>
                        <div className="text-emerald-400 text-xs font-mono">Status: Secure</div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="w-full h-2 bg-gray-800 rounded-full"><div className="w-3/4 h-full bg-[#008FFF] rounded-full"></div></div>
                      <div className="w-full h-2 bg-gray-800 rounded-full"><div className="w-1/2 h-full bg-[#008FFF] rounded-full"></div></div>
                      <div className="w-full h-2 bg-gray-800 rounded-full"><div className="w-5/6 h-full bg-[#008FFF] rounded-full"></div></div>
                    </div>
                    {/* Shadow cast onto ground */}
                    <div className="absolute -bottom-[60px] -right-[60px] w-full h-full bg-black/10 blur-xl -z-10"></div>
                  </motion.div>

                  {/* LAYER 2: Services / Automation (Middle Layer) */}
                  <motion.div 
                    style={{ x: x2, y: y2, translateZ: 40 }}
                    className="absolute w-[280px] h-[280px] bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_30px_60px_rgba(67,33,114,0.1)] flex flex-col p-6 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 border-b border-gray-200/50 pb-4">
                      <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#432172] to-[#00C9FF] flex items-center justify-center shadow-lg">
                        <Workflow className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#111827] font-bold text-sm">Logic Engine</div>
                        <div className="text-gray-500 text-xs font-mono">Processing...</div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 relative z-10">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-[#432172] animate-[spin_10s_linear_infinite]" />
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                        <Server className="w-5 h-5 text-[#00C9FF]" />
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-500" />
                      </div>
                    </div>
                    {/* Glowing linking beams */}
                    <svg className="absolute inset-0 w-full h-full p-6 text-purple-300 opacity-50 z-0">
                      <motion.path 
                         initial={{ pathLength: 0 }} 
                         animate={{ pathLength: 1 }} 
                         transition={{ duration: 2, repeat: Infinity }} 
                         d="M 40,160 L 160,160 M 100,160 L 100,200" 
                         stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" 
                      />
                    </svg>
                  </motion.div>

                  {/* LAYER 1: UI / Visuals (Top Layer) */}
                  <motion.div 
                    style={{ x: x1, y: y1, translateZ: 140 }}
                    className="absolute w-[280px] h-[280px] bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_40px_80px_rgba(0,143,255,0.2)] flex flex-col p-6 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <LayoutTemplate className="w-5 h-5 text-[#008FFF]" />
                      </div>
                      <div>
                        <div className="text-[#111827] font-bold text-sm">Smart Interface</div>
                        <div className="text-[#008FFF] text-xs font-mono tracking-widest uppercase">Admin Panel</div>
                      </div>
                    </div>
                    
                    {/* UI Dashboard Mockup elements */}
                    <div className="w-full flex gap-3 mb-4">
                      <div className="flex-1 h-20 bg-gradient-to-br from-[#008FFF]/10 to-[#008FFF]/5 rounded-2xl border border-blue-100/50 flex flex-col justify-center px-4">
                        <div className="text-[10px] text-gray-500 font-bold mb-1">REVENUE</div>
                        <div className="text-lg font-black text-[#111827] flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-emerald-500" /> +42%
                        </div>
                      </div>
                      <div className="flex-1 h-20 bg-gradient-to-br from-[#432172]/5 to-[#00C9FF]/5 rounded-2xl border border-purple-100/50 flex flex-col justify-center px-4">
                         <div className="text-[10px] text-gray-500 font-bold mb-1">UPTIME</div>
                         <div className="text-lg font-black text-[#111827] flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-[#432172]" /> 99.9%
                        </div>
                      </div>
                    </div>
                    
                    {/* Mini Chart Mockup */}
                    <div className="w-full h-16 bg-gray-50 rounded-2xl relative overflow-hidden flex items-end px-2 gap-1 pb-2">
                       {/* Animated chart bars */}
                       {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                         <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           animate={{ height: `${h}%` }}
                           transition={{ duration: 1, delay: 1.5 + (i * 0.1), type: "spring" }}
                           className="flex-1 bg-[#008FFF] rounded-sm opacity-80"
                         ></motion.div>
                       ))}
                    </div>

                  </motion.div>

                  {/* Floating particles around it */}
                  <motion.div 
                    animate={{ z: [0, 50, 0], opacity: [0.6, 1, 0.6] }} 
                    transition={{ duration: 3, repeat: Infinity }} 
                    className="absolute top-0 right-[40px] w-6 h-6 rounded-lg bg-[#00C9FF] shadow-[0_0_20px_#00C9FF] flex items-center justify-center"
                    style={{ translateZ: 100 }}
                  >
                    <Box className="w-3 h-3 text-white" />
                  </motion.div>

                  <motion.div 
                    animate={{ z: [0, 80, 0], opacity: [0.6, 1, 0.6] }} 
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }} 
                    className="absolute bottom-10 left-[20px] w-8 h-8 rounded-xl bg-[#008FFF] shadow-[0_0_20px_#008FFF] flex items-center justify-center"
                    style={{ translateZ: 80 }}
                  >
                    <LineChart className="w-4 h-4 text-white" />
                  </motion.div>

                  {/* MORE ADDED ELEMENTS for density */}
                  <motion.div 
                    animate={{ z: [0, 60, 0], opacity: [0.5, 0.9, 0.5] }} 
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} 
                    className="absolute -top-[20px] left-[60px] w-12 h-8 rounded-full bg-[#10B981] shadow-[0_0_20px_#10B981] flex items-center justify-center"
                    style={{ translateZ: 160 }}
                  >
                     <span className="text-[10px] font-bold text-white tracking-widest">SYNC</span>
                  </motion.div>

                  <motion.div 
                    animate={{ z: [0, -40, 0], opacity: [0.4, 0.8, 0.4] }} 
                    transition={{ duration: 5, repeat: Infinity, delay: 2 }} 
                    className="absolute bottom-[40px] right-[-20px] w-14 h-14 rounded-[12px] bg-gradient-to-br from-[#432172] to-[#591BFF] shadow-[0_0_30px_#432172] flex items-center justify-center border border-white/20"
                    style={{ translateZ: 120 }}
                  >
                     <Building2 className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    animate={{ z: [0, 100, 0], opacity: [0.7, 1, 0.7] }} 
                    transition={{ duration: 6, repeat: Infinity, delay: 1.5 }} 
                    className="absolute top-[140px] right-[-60px] w-20 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl"
                    style={{ translateZ: 40 }}
                  >
                     <span className="text-[10px] font-mono text-emerald-400 font-bold">200 OK</span>
                  </motion.div>

                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
