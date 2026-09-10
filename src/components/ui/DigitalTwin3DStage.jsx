import React from 'react';
import {
  Activity,
  BarChart3,
  Sliders,
  TrendingUp,
  BrainCircuit,
  Workflow,
  Database,
} from 'lucide-react';
import SmartFactory3D from './SmartFactory3D';

export default function DigitalTwin3DStage({
  activeLayer = 1,
  onSelectLayer = () => {},
  viewMode = 'stacked',
  onToggleViewMode = () => {},
  activeMode = 'monitor',
  onSelectMode = () => {},
}) {
  const sidebarButtons = [
    { id: 'monitor', label: 'Monitor', icon: Activity },
    { id: 'analyze', label: 'Analyze', icon: BarChart3 },
    { id: 'optimize', label: 'Optimize', icon: Sliders },
    { id: 'grow', label: 'Grow', icon: TrendingUp },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#08121f] via-[#0B1528] to-[#0d1c31] rounded-2xl p-3 sm:p-4 flex flex-col justify-between overflow-hidden select-none border border-slate-800/90 shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,rgba(16,185,129,0.05)_45%,transparent_70%)] rounded-full blur-2xl pointer-events-none" />

      {/* ── TOP HEADER ── */}
      <div className="relative z-30 flex items-center justify-between gap-2 border-b border-white/10 pb-2">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold text-white tracking-wider uppercase">
            INTERACTIVE 3D DIGITAL TWIN
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center p-0.5 bg-[#07101c]/90 rounded-full border border-white/15 text-[9.5px] font-semibold">
          <button
            onClick={() => onToggleViewMode('stacked')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              viewMode === 'stacked'
                ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Stacked
          </button>
          <button
            onClick={() => onToggleViewMode('exploded')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              viewMode === 'exploded'
                ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Exploded
          </button>
        </div>
      </div>

      {/* ── MIDDLE STAGE: Sidebar + Large 3D WebGL Canvas + Non-Overlapping Hotspot Badges ── */}
      <div className="relative flex-1 flex items-stretch justify-between my-1 min-h-[270px]">
        {/* Left vertical sidebar tools */}
        <div className="relative z-30 flex flex-col justify-center gap-1.5 shrink-0 pr-2">
          {sidebarButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = activeMode === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => onSelectMode(btn.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── 3D CANVAS & FIXED NON-OVERLAPPING LAYER BADGES ── */}
        <div className="relative flex-1 w-full h-full min-h-[260px] sm:min-h-[280px]">

          {/* Fixed Outer Badge: L3 AI Decision (Top-Left) */}
          <button
            onClick={() => onSelectLayer(3)}
            className={`absolute top-2 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold transition-all cursor-pointer ${
              activeLayer === 3
                ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-400 shadow-md shadow-cyan-500/30 scale-105'
                : 'bg-slate-900/70 text-slate-400 border border-slate-700/70 hover:text-white'
            }`}
          >
            <BrainCircuit className="h-3 w-3 text-cyan-400" />
            <span>L3 · AI Decision</span>
          </button>

          {/* Fixed Outer Badge: L2 Operations (Top-Right) */}
          <button
            onClick={() => onSelectLayer(2)}
            className={`absolute top-2 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold transition-all cursor-pointer ${
              activeLayer === 2
                ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-400 shadow-md shadow-indigo-500/30 scale-105'
                : 'bg-slate-900/70 text-slate-400 border border-slate-700/70 hover:text-white'
            }`}
          >
            <Workflow className="h-3 w-3 text-indigo-400" />
            <span>L2 · 11 Modules</span>
          </button>

          {/* Fixed Outer Badge: L1 Data Fabric (Bottom-Right) */}
          <button
            onClick={() => onSelectLayer(1)}
            className={`absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold transition-all cursor-pointer ${
              activeLayer === 1
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400 shadow-md shadow-emerald-500/30 scale-105'
                : 'bg-slate-900/70 text-slate-400 border border-slate-700/70 hover:text-white'
            }`}
          >
            <Database className="h-3 w-3 text-emerald-400" />
            <span>L1 · Data Fabric</span>
          </button>

          {/* High Quality WebGL Smart Factory 3D Model */}
          <SmartFactory3D
            activeLayer={activeLayer}
            onSelectLayer={onSelectLayer}
            viewMode={viewMode}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* ── BOTTOM BAR INSIDE 3D CARD: Clean Layer Legend ── */}
      <div className="relative z-30 flex items-center justify-between border-t border-white/10 pt-2 text-[9.5px]">
        <span className="text-slate-400 font-medium">Select Architecture Layer:</span>

        {/* Legend buttons */}
        <div className="flex items-center gap-3 font-semibold">
          <button
            onClick={() => onSelectLayer(3)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              activeLayer === 3
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            L3: AI Decision
          </button>
          <button
            onClick={() => onSelectLayer(2)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              activeLayer === 2
                ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            L2: Operations
          </button>
          <button
            onClick={() => onSelectLayer(1)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              activeLayer === 1
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            L1: Data Fabric
          </button>
        </div>
      </div>
    </div>
  );
}
