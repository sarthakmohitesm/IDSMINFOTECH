import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';

import pic1 from '../assets/pics/06_JPG.avif';
import pic2 from '../assets/pics/07_JPG.avif';
import ruhanImage from '../assets/pics/Rohan.jpeg';
import nishigandhaImage from '../assets/pics/Nishigandha Mam.jpg';
import payalImage from '../assets/pics/Payal Mam.jpeg';
import nileshSarafImage from '../assets/pics/Nilesh_Saraf sir.jpg';

const LEADERS_DATA = [
  {
    name: "Shailesh Deshpande",
    role: "Managing Director",
    category: "Board of Directors",
    image: pic2,
    tag: "Corporate Strategy & Vision",
    bio: "Pioneering enterprise growth, cross-border client ecosystems, and digital transformation strategy.",
    badge: "Executive Board",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    glowColor: "rgba(37, 99, 235, 0.22)"
  },
  {
    name: "Nikhil Moharil",
    role: "Technical Director",
    category: "Board of Directors",
    image: pic1,
    tag: "Core Platform Architecture",
    bio: "Driving cloud-native engineering, high-throughput microservices, and multi-plant IoT scalability.",
    badge: "Technical Board",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    glowColor: "rgba(79, 70, 229, 0.22)"
  },
  {
    name: "Rohan Pathradkar",
    role: "Group Product Manager",
    category: "Management Team",
    image: ruhanImage,
    tag: "Product Ecosystem & Roadmap",
    bio: "Architecting modular ERP features, release velocity, and end-to-end user workflow fidelity.",
    badge: "Product Leadership",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200/80",
    glowColor: "rgba(2, 132, 199, 0.22)"
  },
  {
    name: "Nishigandha Kamlapurkar",
    role: "Group Product Manager",
    category: "Management Team",
    image: nishigandhaImage,
    tag: "Domain Solutions & Delivery",
    bio: "Translating complex manufacturing and discrete engineering workflows into intuitive digital systems.",
    badge: "Operations Leadership",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    glowColor: "rgba(16, 185, 129, 0.22)"
  },
  {
    name: "Payal Deo",
    role: "Group Product Manager",
    category: "Management Team",
    image: payalImage,
    tag: "Quality & Regulatory Governance",
    bio: "Spearheading audit compliance, enterprise testing rigor, and mission-critical governance standards.",
    badge: "Governance Leadership",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
    glowColor: "rgba(147, 51, 234, 0.22)"
  },
  {
    name: "Nilesh Saraf",
    role: "Group Product Manager",
    category: "Management Team",
    image: nileshSarafImage,
    tag: "Client Success & Implementations",
    bio: "Directing shop-floor rollouts, hyper-care customer onboarding, and scalable enterprise deployments.",
    badge: "Delivery Leadership",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200/80",
    glowColor: "rgba(236, 72, 153, 0.22)"
  }
];

/* ── Individual 3D Card with Scroll Parallax & Interactive Tilt ── */
function ScrollAnimatedLeaderCard({ leader, index, smoothScroll }) {
  const cardRef = useRef(null);

  // Column assignment for 3-column desktop layout (0 = left, 1 = center, 2 = right)
  const colIndex = index % 3;

  // ── Scroll Parallax & 3D Entry transforms based on column position ──
  // Left column: glides in with inward Y tilt and subtle vertical parallax
  const scrollY_Left = useTransform(smoothScroll, [0, 0.45, 1], [60, 0, -50]);
  const scrollRotateY_Left = useTransform(smoothScroll, [0.05, 0.35, 0.7], [-12, 0, 4]);

  // Center column: rises from deep perspective with dynamic Z float
  const scrollY_Center = useTransform(smoothScroll, [0, 0.45, 1], [90, 0, -75]);
  const scrollRotateX_Center = useTransform(smoothScroll, [0.05, 0.35, 0.7], [14, 0, -4]);

  // Right column: glides in from the right with inward Y tilt
  const scrollY_Right = useTransform(smoothScroll, [0, 0.45, 1], [60, 0, -50]);
  const scrollRotateY_Right = useTransform(smoothScroll, [0.05, 0.35, 0.7], [12, 0, -4]);

  // Select parallax transform based on column
  const scrollY = colIndex === 0 ? scrollY_Left : colIndex === 1 ? scrollY_Center : scrollY_Right;
  const baseRotateY = colIndex === 0 ? scrollRotateY_Left : colIndex === 2 ? scrollRotateY_Right : 0;
  const baseRotateX = colIndex === 1 ? scrollRotateX_Center : 0;

  // ── Mouse Cursor Interactive Physics ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 240, damping: 22 };
  const cursorRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const cursorRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // Dynamic light glare gradient coordinates (0% to 100%)
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, 85]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, 85]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: scrollY,
        perspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full select-none will-change-transform"
    >
      <motion.div
        style={{
          rotateX: cursorRotateX,
          rotateY: cursorRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03, y: -10 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative bg-white/95 rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_12px_35px_rgba(15,23,42,0.05)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.14)] hover:border-blue-300/80 transition-all duration-300 overflow-hidden"
      >
        {/* Dynamic 3D Specular Sheen Glare on Hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${glareX}% ${glareY}%, rgba(37, 99, 235, 0.14), transparent 75%)`,
          }}
        />

        {/* Ambient Color Glow Blob in Card Background */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-75 transition-opacity duration-500"
          style={{ backgroundColor: leader.glowColor }}
        />

        {/* Top Active Neon Border Accent */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#0083FF] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

        {/* ── LAYER 1: Category Tag (translateZ: 25px) ── */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="w-full flex items-center justify-between gap-2 mb-6"
        >
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wide uppercase ${leader.badgeColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{leader.badge}</span>
          </span>
          <span className="text-[11px] font-mono font-medium text-slate-400">
            0{index + 1}
          </span>
        </div>

        {/* ── LAYER 2: 3D Avatar Stage with Rotating Orbital Rings (translateZ: 50px) ── */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="relative h-[170px] w-[170px] mb-6 flex items-center justify-center"
        >
          {/* Outer Rotating Conic Orbital Ring */}
          <div
            className="absolute -inset-2.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-spin"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, #0083FF 35%, #00C9FF 70%, transparent 100%)',
              animationDuration: '9s',
            }}
          />

          {/* Inner Dashed Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/40 scale-105 group-hover:rotate-45 transition-transform duration-700" />

          {/* Avatar Disc */}
          <div className="relative h-[155px] w-[155px] rounded-full overflow-hidden p-1.5 bg-white shadow-xl border border-slate-100 z-10">
            <img
              src={leader.image}
              alt={leader.name}
              className="h-full w-full rounded-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
            />
          </div>

          {/* Floating Orbit Satellite Dot */}
          <div className="absolute -top-1 right-2 w-3 h-3 rounded-full bg-[#0083FF] border-2 border-white shadow-md z-20 group-hover:scale-125 transition-transform duration-300" />
        </div>

        {/* ── LAYER 3: Name & Role (translateZ: 35px) ── */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="flex flex-col items-center"
        >
          <h3 className="text-[21px] sm:text-[22px] font-extrabold text-[#0B0F19] font-noto-sans tracking-tight mb-1 group-hover:text-[#2563EB] transition-colors">
            {leader.name}
          </h3>
          <p className="text-[13.5px] font-bold text-[#0083FF] uppercase tracking-wider mb-2 font-noto-sans">
            {leader.role}
          </p>
          <div className="inline-block px-3 py-0.5 bg-slate-100/90 rounded-full text-[11px] font-semibold text-slate-600 mb-3">
            {leader.tag}
          </div>
          <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-2 max-w-[280px]">
            {leader.bio}
          </p>
        </div>

        {/* ── LAYER 4: Bottom Interactive Line (translateZ: 20px) ── */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-[11.5px] text-slate-400 font-medium"
        >
          <span className="flex items-center gap-1 text-[#2563EB] font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>IDMS Leadership</span>
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#0083FF]">
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section with Smooth Scroll Animations ── */
export default function LeadershipSection3D() {
  const sectionRef = useRef(null);

  // Track scroll progress across the leadership section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Parallax background orbs
  const bgOrb1_Y = useTransform(smoothScroll, [0, 1], [-60, 80]);
  const bgOrb2_Y = useTransform(smoothScroll, [0, 1], [60, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-16 pb-24 md:pt-24 md:pb-36 px-4 lg:px-[80px] w-full bg-gradient-to-b from-[#F8FAFF] via-white to-[#F8FAFF] border-t border-slate-200/80 overflow-hidden select-none"
    >
      {/* Subtle Background Grid Mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Volumetric Ambient Color Blooms with Scroll Parallax */}
      <motion.div
        style={{ y: bgOrb1_Y }}
        className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-blue-100/40 via-sky-50/20 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: bgOrb2_Y }}
        className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-indigo-100/35 via-purple-50/20 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20 flex flex-col items-center max-w-2xl"
        >
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-white/90 shadow-[0_2px_8px_rgba(37,99,235,0.08)] mb-4 text-[12px] font-bold text-[#0083FF] tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Expertise & Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B0F19] font-noto-sans tracking-tight mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0083FF] to-[#00C9FF] bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>

          <p className="text-[15px] sm:text-[16.5px] text-[#475569] leading-relaxed font-normal font-noto-sans">
            Seasoned enterprise architects, strategists, and product visionaries driving intelligent manufacturing and scalable digital operations.
          </p>

          <div className="mt-6 mx-auto h-1 w-20 bg-gradient-to-r from-[#2563EB] to-[#00C9FF] rounded-full" />
        </motion.div>

        {/* ── Responsive 3D Scroll Parallax Cards Grid (All Leaders Displayed) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full max-w-[1200px] mx-auto">
          {LEADERS_DATA.map((person, idx) => (
            <ScrollAnimatedLeaderCard
              key={person.name}
              leader={person}
              index={idx}
              smoothScroll={smoothScroll}
            />
          ))}
        </div>

        {/* ── Bottom Trust Note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 sm:mt-24 text-center"
        >
          <p className="text-slate-400 text-sm font-noto-sans font-normal tracking-wide flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-slate-200"></span>
            <span>Backed by strong leadership, empowering enterprises to scale with confidence</span>
            <span className="w-8 h-px bg-slate-200"></span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
