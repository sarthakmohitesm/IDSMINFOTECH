import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory, Code2, Cpu, ShieldCheck, Plug, TrendingUp,
  Target, Eye, Heart, ChevronDown, BadgeCheck, Globe, Rocket,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import img06 from '../assets/pics/06_JPG.avif';
import img07 from '../assets/pics/07_JPG.avif';

/* ─── DATA ─────────────────────────────────────── */

const expertiseBranches = [
  {
    title: "Manufacturing Domain",
    icon: Factory,
    color: "#468BEF",
    bg: "#ffffff",
    border: "#E5E7EB",
    children: ["Smart Inventory", "Production Planning", "Shop Floor Control", "Quality Management"]
  },
  {
    title: "Engineering",
    icon: Code2,
    color: "#9600FA",
    bg: "#ffffff",
    border: "#E5E7EB",
    children: ["BOM Management", "CAD Integration", "PLM Workflow", "Revision Control"]
  },
  {
    title: "Automation & AI",
    icon: Cpu,
    color: "#468BEF",
    bg: "#ffffff",
    border: "#E5E7EB",
    children: ["IoT Monitoring", "Predictive Analytics", "AI Forecasting", "Smart Reporting"]
  },
  {
    title: "Security & Compliance",
    icon: ShieldCheck,
    color: "#9600FA",
    bg: "#ffffff",
    border: "#E5E7EB",
    children: ["GST Compliance", "Audit Trails", "Role-based Access", "Data Encryption"]
  },
  {
    title: "Integrations",
    icon: Plug,
    color: "#468BEF",
    bg: "#ffffff",
    border: "#E5E7EB",
    children: ["Tally/SAP Sync", "Bank API", "E-way Bill", "CRM Connect"]
  },
  {
    title: "Outcomes",
    icon: TrendingUp,
    color: "#9600FA",
    bg: "#ffffff",
    border: "#E5E7EB",
    children: ["Cost Reduction", "Efficiency Gains", "Real-time Visibility", "Scalable Growth"]
  },
];

const driverTree = {
  root: { title: "Our Foundation", color: "#9600FA" },
  branches: [
    {
      title: "Vision",
      icon: Eye,
      color: "#468BEF",
      bg: "#ffffff",
      border: "#E5E7EB",
      desc: "Be the digital technology leader valued for its innovation and excellence.",
      leaves: ["Innovation", "Excellence", "Technology Leadership"]
    },
    {
      title: "Mission",
      icon: Target,
      color: "#468BEF",
      bg: "#ffffff",
      border: "#E5E7EB",
      desc: "To create customer value through digital transformation.",
      leaves: ["Customer Value", "Digital Scale", "Transformative Tech"]
    },
    {
      title: "Core Values",
      icon: Heart,
      color: "#468BEF",
      bg: "#ffffff",
      border: "#E5E7EB",
      desc: "The principles that steer our journey and define our excellence:",
      leaves: ["Leadership", "Trust", "Innovation", "Passion", "Integrity", "Team work"]
    }
  ]
};

/* ─── EXPERTISE TREE ───────────────────────────── */
function ExpertiseTree() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-[#9600FA] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#9600FA] animate-pulse"></span>What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 font-noto-sans">
            Our Expertise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9600FA] to-[#468BEF]">(No Hype)</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-noto-sans">
            A single partner delivering <strong className="text-[#111827]">outcomes</strong>, not vendor sprawl.
            Click any branch to explore.
          </p>
        </motion.div>

        {/* Root node */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 px-10 py-5 rounded bg-gradient-to-r from-[#9600FA] to-[#468BEF] text-white text-xl font-bold font-noto-sans shadow-[0_0_40px_rgba(150,0,250,0.25)] mb-0"
          >
            IDMS Smart ERP Platform
          </motion.div>

          {/* Vertical stem from root */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 40 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-[2px] bg-gradient-to-b from-[#9600FA] to-[#468BEF] origin-top"
          ></motion.div>

          {/* Branches Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {expertiseBranches.map((branch, i) => (
              <div key={branch.title} className="flex flex-col items-center relative">

                {/* Horizontal Connector (BRIDGE) - only on LG screens where it's 6 columns */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="hidden lg:block absolute top-0 h-[2px] z-0"
                  style={{
                    background: branch.color,
                    left: i === 0 ? '50%' : '-8px',
                    right: i === 5 ? '50%' : '-8px',
                    originX: i === 0 ? 0 : i === 5 ? 1 : 0.5
                  }}
                ></motion.div>

                {/* Vertical drop to node */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 32 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  className="w-[2px] origin-top -mt-[1px] relative z-10"
                  style={{ background: branch.color }}
                ></motion.div>

                {/* Branch card node */}
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full rounded p-4 text-center shadow-md border-2 transition-all cursor-pointer relative z-10"
                  style={{
                    backgroundColor: branch.bg,
                    borderColor: expanded === i ? branch.color : branch.border,
                    boxShadow: expanded === i ? `0 0 20px ${branch.color}30` : undefined
                  }}
                >
                  <div className="w-10 h-10 mx-auto rounded flex items-center justify-center mb-2 shadow-sm" style={{ backgroundColor: `${branch.color}20` }}>
                    <branch.icon className="w-5 h-5" style={{ color: branch.color }} />
                  </div>
                  <div className="text-xs font-bold text-[#111827] font-noto-sans leading-tight mb-1">{branch.title}</div>
                  <ChevronDown
                    className="w-3 h-3 mx-auto transition-transform duration-300"
                    style={{ color: branch.color, transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </motion.button>

                {/* Leaf nodes - expand on click */}
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full overflow-hidden relative z-10"
                    >
                      <div className="w-[2px] h-4 mx-auto rounded-full" style={{ background: branch.color }}></div>
                      <div className="flex flex-col gap-2">
                        {branch.children.map((leaf, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-center gap-2 px-3 py-2 rounded text-xs font-medium font-noto-sans"
                            style={{ backgroundColor: `${branch.color}10`, color: branch.color, border: `1px solid ${branch.color}25` }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: branch.color }}></span>
                            {leaf}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* ─── WHAT DRIVES US TREE ──────────────────────── */
function WhatDrivesUsTree() {
  const [activeFoundation, setActiveFoundation] = useState(null);

  const foundationCards = [
    {
      eyebrow: 'Vision',
      title: 'Vision',
      desc: driverTree.branches[0].desc,
      detailTitle: 'Digital Leadership Through Vision',
      icon: Eye,
      iconBg: 'bg-[#468BEF1a]',
      iconColor: 'text-[#468BEF]',
      border: 'border-[#e7ecf6]',
      background: 'bg-[linear-gradient(180deg,#fbfdff_0%,#f7faff_100%)]',
      accent: 'bg-[#468BEF]',
      accentText: 'text-[#468BEF]',
      hoverShadow: '0 24px 46px rgba(70,139,239,0.16)',
      panelGradient: 'from-[#eef6ff] via-[#f6f9ff] to-[#ffffff]',
      panelGlow: 'bg-[radial-gradient(circle,rgba(70,139,239,0.24)_0%,rgba(70,139,239,0.06)_42%,transparent_74%)]',
      status: 'ACTIVE',
      statusTone: 'bg-[#EAF4FF] text-[#468BEF]',
      accentLine: 'from-[#468BEF] to-[#8FC4FF]',
      details:
        'Our vision is to shape the future of manufacturing technology with systems that are trusted, intelligent, and designed to move enterprises forward with confidence.',
      leaves: driverTree.branches[0].leaves,
    },
    {
      eyebrow: 'Mission',
      title: 'Mission',
      desc: driverTree.branches[1].desc,
      detailTitle: 'Customer Value In Motion',
      icon: Target,
      iconBg: 'bg-[#9600FA14]',
      iconColor: 'text-[#9600FA]',
      border: 'border-[#ece8f8]',
      background: 'bg-[linear-gradient(180deg,#fffafe_0%,#f8f4ff_100%)]',
      accent: 'bg-[#9600FA]',
      accentText: 'text-[#9600FA]',
      hoverShadow: '0 24px 46px rgba(150,0,250,0.15)',
      panelGradient: 'from-[#f8f1ff] via-[#fcf8ff] to-[#ffffff]',
      panelGlow: 'bg-[radial-gradient(circle,rgba(150,0,250,0.22)_0%,rgba(150,0,250,0.06)_42%,transparent_74%)]',
      status: 'LIVE',
      statusTone: 'bg-[#F4E8FF] text-[#9600FA]',
      accentLine: 'from-[#9600FA] to-[#C773FF]',
      details:
        'Our mission is execution-focused: simplify complexity, accelerate adoption, and help customers create measurable value through practical digital transformation.',
      leaves: driverTree.branches[1].leaves,
    },
    {
      eyebrow: 'Core Values',
      title: 'Core Values',
      desc: driverTree.branches[2].desc,
      detailTitle: 'The Principles Behind Every Move',
      icon: Heart,
      iconBg: 'bg-[#FF007814]',
      iconColor: 'text-[#FF0078]',
      border: 'border-[#f4e6ef]',
      background: 'bg-[linear-gradient(180deg,#fffafb_0%,#fff4f8_100%)]',
      accent: 'bg-[#FF0078]',
      accentText: 'text-[#FF0078]',
      hoverShadow: '0 24px 46px rgba(255,0,120,0.14)',
      panelGradient: 'from-[#fff1f7] via-[#fff7fa] to-[#ffffff]',
      panelGlow: 'bg-[radial-gradient(circle,rgba(255,0,120,0.20)_0%,rgba(255,0,120,0.06)_42%,transparent_74%)]',
      status: 'GUIDING',
      statusTone: 'bg-[#FFE8F3] text-[#FF0078]',
      accentLine: 'from-[#FF0078] to-[#FF76B4]',
      details:
        'Our values shape how we build, support, and grow: with leadership, trust, innovation, passion, integrity, and strong teamwork at every stage.',
      leaves: driverTree.branches[2].leaves,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-20">
      <div className="pointer-events-none absolute left-1/2 top-[8%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(150,0,250,0.1)_0%,rgba(70,139,239,0.06)_44%,transparent_76%)]" />
      <div className="pointer-events-none absolute left-[16%] top-[30%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(255,0,120,0.08)_0%,transparent_72%)]" />
      <div className="pointer-events-none absolute right-[14%] top-[36%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(70,139,239,0.08)_0%,transparent_72%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="font-noto-sans text-4xl font-bold text-[#111827] md:text-5xl">
            What <span className="bg-gradient-to-r from-[#FF0078] via-[#9600FA] to-[#468BEF] bg-clip-text text-transparent">Drives Us</span>
          </h2>
        </motion.div>

        <div className="relative rounded border border-[#e8ebf3] bg-white/88 p-5 shadow-[0_20px_42px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {foundationCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveFoundation(card)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.015, boxShadow: card.hoverShadow }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 + index * 0.06, duration: 0.28 }}
                  className={`group relative overflow-hidden rounded border p-7 text-left shadow-[0_14px_32px_rgba(15,23,42,0.06)] lg:col-span-4 ${card.border} ${card.background}`}
                >
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/75 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-5 flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ duration: 0.22 }}
                      className={`flex h-14 w-14 items-center justify-center rounded shadow-sm transition-shadow duration-300 group-hover:shadow-[0_16px_26px_rgba(15,23,42,0.10)] ${card.iconBg}`}
                    >
                      <Icon className={`h-7 w-7 ${card.iconColor}`} />
                    </motion.div>
                    <div>
                      <div className={`font-noto-sans text-[11px] font-bold uppercase tracking-[0.22em] ${card.accentText}`}>{card.eyebrow}</div>
                      <h3 className="font-noto-sans text-3xl font-bold text-[#111827] transition-transform duration-300 group-hover:translate-x-1">{card.title}</h3>
                    </div>
                  </div>
                  <p className="font-noto-sans text-sm leading-relaxed text-[#4b5563] transition-colors duration-300 group-hover:text-[#374151]">{card.desc}</p>
                  <motion.div
                    initial={false}
                    animate={{ width: '6rem' }}
                    whileHover={{ width: '8rem' }}
                    transition={{ duration: 0.24 }}
                    className={`mt-6 h-[2px] rounded-full ${card.accent}`}
                  />
                  <div className="mt-5 flex items-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className={`font-noto-sans text-[11px] font-bold uppercase tracking-[0.2em] ${card.accentText}`}>Tap To Explore</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.012, boxShadow: '0 30px 58px rgba(48,126,207,0.28)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
            className="mt-5"
          >
            <div className="group mx-auto w-full rounded border border-white/70 bg-[linear-gradient(135deg,#468BEF_0%,#10B981_100%)] p-8 text-white shadow-[0_24px_48px_rgba(48,126,207,0.24)] md:max-w-[1040px] md:p-10">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.08 }}
                transition={{ duration: 0.22 }}
                className="mb-5 flex h-12 w-12 items-center justify-center rounded border border-white/40 bg-white/15 transition-colors duration-300 group-hover:bg-white/20"
              >
                <BadgeCheck className="h-7 w-7 text-white" />
              </motion.div>
              <div className="font-noto-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 transition-transform duration-300 group-hover:translate-x-1">Outcome</div>
              <h3 className="mt-2 font-noto-sans text-4xl font-bold transition-transform duration-300 group-hover:translate-x-1 md:text-5xl">Customer Success</h3>
              <p className="mt-4 max-w-[520px] font-noto-sans text-base leading-relaxed text-white/88 transition-colors duration-300 group-hover:text-white">The only outcome that matters</p>
              <motion.div
                initial={false}
                animate={{ width: '7rem' }}
                whileHover={{ width: '10rem' }}
                transition={{ duration: 0.24 }}
                className="mt-6 h-[2px] rounded-full bg-white/65"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeFoundation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0c0f14]/70 px-4 py-6 backdrop-blur-[4px]"
            onClick={() => setActiveFoundation(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-auto flex w-full max-w-[620px] overflow-hidden rounded border border-white/60 bg-black/95 shadow-[0_22px_70px_rgba(0,0,0,0.32)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className={`relative min-h-[170px] flex-1 overflow-hidden bg-gradient-to-br ${activeFoundation.panelGradient} p-3 md:p-4`}>
                <div className={`pointer-events-none absolute inset-0 ${activeFoundation.panelGlow}`} />
                <div className="pointer-events-none absolute left-[10%] top-[14%] h-12 w-12 rounded-full border border-white/70 bg-white/55 shadow-[0_18px_40px_rgba(15,23,42,0.08)]" />
                <div className="pointer-events-none absolute right-[14%] top-[18%] h-8 w-8 rounded-full border border-white/70 bg-white/45 shadow-[0_14px_28px_rgba(15,23,42,0.08)]" />
                <div className="pointer-events-none absolute bottom-[16%] left-[18%] h-14 w-14 rounded border border-white/70 bg-white/55 shadow-[0_20px_40px_rgba(15,23,42,0.08)]" />
                <div className="pointer-events-none absolute bottom-[12%] right-[12%] h-10 w-10 rounded border border-white/70 bg-white/55 shadow-[0_16px_32px_rgba(15,23,42,0.08)]" />

                <div className="relative z-10 flex h-full flex-col justify-between rounded border border-black/8 bg-black/94 p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.24)]">
                  <div className="overflow-hidden rounded border border-white/5 bg-[linear-gradient(135deg,#101217_0%,#171c23_100%)]">
                    <div className={`relative h-[96px] w-full overflow-hidden bg-gradient-to-br ${activeFoundation.accentLine}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.22)_18%,transparent_40%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_28%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.10)_18%,transparent_42%)]" />
                      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(11,14,20,0.22)_100%)]" />
                      <div className="absolute left-[10%] top-[18%] h-[56%] w-[28%] rounded border border-white/30 bg-white/22 backdrop-blur-sm" />
                      <div className="absolute left-[34%] top-[12%] h-[64%] w-[24%] rounded border border-white/30 bg-white/20 backdrop-blur-sm" />
                      <div className="absolute right-[11%] bottom-[12%] h-[44%] w-[30%] rounded border border-white/30 bg-white/18 backdrop-blur-sm" />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-white/70">
                    <div className="font-noto-sans text-[9px] font-bold uppercase tracking-[0.2em]">
                      {activeFoundation.eyebrow}
                    </div>
                    <div className="h-[2px] w-12 rounded-full bg-white/25" />
                  </div>
                </div>
              </div>

              <div className="relative flex w-full max-w-[240px] flex-col justify-center bg-[#f8f7f4] p-4 md:p-5">
                <button
                  type="button"
                  onClick={() => setActiveFoundation(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#8d8d8d] text-white transition-transform duration-200 hover:scale-105"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className={`font-noto-sans text-[9px] font-bold uppercase tracking-[0.2em] ${activeFoundation.accentText}`}>
                  {activeFoundation.eyebrow}
                </div>
                <h3 className="mt-1.5 font-noto-sans text-[20px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#313548] md:text-[22px]">
                  {activeFoundation.detailTitle}
                </h3>
                <p className="mt-1.5 font-noto-sans text-[12px] leading-relaxed text-[#8a90a0]">{activeFoundation.title}</p>

                <div className="mt-3.5">
                  <div className="font-noto-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#a2a8b5]">Current Status</div>
                  <div className={`mt-1.5 inline-flex rounded px-3 py-1.5 font-noto-sans text-[11px] font-bold uppercase tracking-[0.08em] ${activeFoundation.statusTone}`}>
                    {activeFoundation.status}
                  </div>
                </div>

                <div className="mt-3.5">
                  <div className="font-noto-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#a2a8b5]">Remarks</div>
                  <p className="mt-1.5 font-noto-sans text-[11px] leading-relaxed text-[#707784]">{activeFoundation.details}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeFoundation.leaves.map((leaf) => (
                    <span
                      key={leaf}
                      className="rounded-full border border-[#dce1ea] bg-white px-2.5 py-1 font-noto-sans text-[9px] font-bold uppercase tracking-[0.12em] text-[#4b5563]"
                    >
                      {leaf}
                    </span>
                  ))}
                </div>

                <div className="mt-3.5 h-px w-full bg-[#e7e9ee]" />

                <button
                  type="button"
                  onClick={() => setActiveFoundation(null)}
                  className={`mt-3 font-noto-sans text-[10px] font-bold uppercase tracking-[0.18em] ${activeFoundation.accentText}`}
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── TEAM ─────────────────────────────────────── */
const team = [
  {
    name: 'Shailesh Deshpande',
    role: 'Managing Director',
    image: img07,
    color: "#FF0078",
    bio: "With over 25 years of experience in the manufacturing domain, Shailesh is the visionary architect behind the IDMS ERP ecosystem. His deep understanding of shop-floor dynamics and enterprise complexities has enabled hundreds of SMEs to scale through digital transformation.",
    expertise: ["Strategic Planning", "ERP Architecture", "Business Process Re-engineering", "Manufacturing Excellence"]
  },
  {
    name: 'Nikhil Moharil',
    role: 'Technical Director',
    image: img06,
    color: "#9600FA",
    bio: "A technology veteran specializing in high-performance web architectures and industrial automation. Nikhil leads the engineering team in building scalable, secure, and future-ready solutions that bridge the gap between complex data and user-centric interfaces.",
    expertise: ["Full-Stack Engineering", "System Security", "IoT Integrations", "Database Optimization"]
  }
];

function OurTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = team[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % team.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + team.length) % team.length);

  return (
    <section className="py-14 bg-transparent overflow-hidden relative">
      <div className="pointer-events-none absolute left-[12%] top-[20%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,0,120,0.08)_0%,transparent_72%)]" />
      <div className="pointer-events-none absolute right-[10%] top-[18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(150,0,250,0.08)_0%,transparent_72%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="mx-auto mb-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#FF0078] via-[#9600FA] to-[#468BEF]"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] font-noto-sans">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0078] via-[#9600FA] to-[#468BEF]">Leadership</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-noto-sans text-sm leading-relaxed text-gray-500 md:text-base">
            Strategic minds behind IDMS Smart ERP, shaping practical transformation for modern manufacturing.
          </p>
        </motion.div>

        <div className="relative rounded border border-[#eceff6] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,250,255,0.92)_100%)] px-5 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#9600FA]/20 to-transparent" />
          <div className="relative group/nav">
            {/* Side Arrows */}
            <button
              onClick={handlePrev}
              className="hidden lg:flex absolute left-[-40px] xl:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-100 bg-white/80 backdrop-blur-md items-center justify-center text-gray-400 hover:text-[#9600FA] hover:border-[#9600FA] hover:shadow-lg transition-all duration-300 z-50 group/arrow"
            >
              <ChevronLeft className="w-5 h-5 group-hover/arrow:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="hidden lg:flex absolute right-[-40px] xl:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-100 bg-white/80 backdrop-blur-md items-center justify-center text-gray-400 hover:text-[#FF0078] hover:border-[#FF0078] hover:shadow-lg transition-all duration-300 z-50 group/arrow"
            >
              <ChevronRight className="w-5 h-5 group-hover/arrow:translate-x-0.5 transition-transform" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Profile Image Column */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div
                    className="relative w-full max-w-[360px] aspect-[0.95/1.1] max-h-[390px] cursor-pointer group/img"
                    onClick={handleNext}
                  >
                    <div className="absolute inset-0 translate-x-4 translate-y-4 rounded bg-[linear-gradient(135deg,rgba(255,0,120,0.10),rgba(150,0,250,0.08),rgba(70,139,239,0.10))] blur-[2px]" />
                    {/* Decorative Frame Elements - Top Right */}
                    <motion.div
                      initial={{ width: 0, height: 0 }}
                      animate={{ width: 64, height: 64 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                      className="absolute -top-3 -right-3 border-t-2 border-r-2 border-[#FF0078]/40 z-0"
                    />

                    {/* Decorative Frame Elements - Bottom Left */}
                    <motion.div
                      initial={{ width: 0, height: 0 }}
                      animate={{ width: 64, height: 64 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                      className="absolute -bottom-3 -left-3 border-b-2 border-l-2 border-[#9600FA]/40 z-0"
                    />

                    <div className="relative w-full h-full overflow-hidden rounded shadow-[0_26px_60px_rgba(15,23,42,0.16)] border border-gray-100 bg-white z-10">
                      <img
                        src={current.image}
                        alt={current.name}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FF0078]/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Information Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-[#111827] font-noto-sans mb-1 leading-tight">
                      {current.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="rounded-full border border-[#FF0078]/15 bg-[#fff7fb] px-3 py-1 text-[#FF0078] font-bold tracking-[0.1em] uppercase text-[11px] md:text-xs">
                        {current.role}
                      </p>
                      <div className="h-[1px] w-10 bg-gray-200"></div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        IDMS Smart ERP Leadership
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded border border-[#eceff5] bg-[linear-gradient(180deg,#ffffff_0%,#fafbff_100%)] p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
                    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-[radial-gradient(circle,rgba(150,0,250,0.08)_0%,transparent_70%)]" />
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div className="font-noto-sans text-[11px] font-black uppercase tracking-[0.24em] text-[#9600FA]">
                        Leadership Perspective
                      </div>
                      <div className="font-noto-sans text-5xl font-bold leading-none text-[#9600FA]/12">"</div>
                    </div>
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed font-noto-sans italic">
                      "{current.bio}"
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-[2px] w-14 rounded-full bg-gradient-to-r from-[#FF0078] to-[#9600FA]"></div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Strategic direction for manufacturing-led growth
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom indicator for small screens and visual reference */}
          <div className="mt-10 flex justify-center gap-3">
            {team.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-gradient-to-r from-[#FF0078] to-[#9600FA]' : 'w-4 bg-gray-200'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ──────────────────────────────── */
export default function AboutExtra() {
  return (
    <>
      {/* <ExpertiseTree /> */}
      <WhatDrivesUsTree />
      <OurTeam />
    </>
  );
}
