import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TABS_DATA = [
  {
    id: 'erp',
    label: 'ERP Implementation',
    title: 'Fast, reliable roll‑outs tailored to manufacturing SMEs',
    subtitle: 'End-to-end implementation from blueprint to go-live without disrupting your shop floor.',
    bullets: [
      'Process mapping & cut‑over planning',
      'Config, custom fields, RBAC',
      'Training, UAT, go‑live & hyper‑care',
      'GST, e‑invoicing & compliance built‑in'
    ],
    ctaText: 'Start Your Roll‑out',
    ctaLink: '/contact',
    metrics: [
      { value: 98, suffix: '%', label: 'Go-Live Success' },
      { value: 40, suffix: '+', label: 'Clients Live' },
      { value: 3, suffix: '×', label: 'Faster Rollout' },
      { value: 24, suffix: '/7', label: 'Hyper-Care' }
    ],
    note: 'Based on our proven implementation methodology for India.'
  },
  {
    id: 'custom',
    label: 'Custom Development',
    title: 'Web apps, portals and extensions on MEAN/MERN & Python micro‑services',
    subtitle: 'We build exactly what you need to fill gaps in standard software.',
    bullets: [
      'Product design, prototyping & UI engineering',
      'Secure REST APIs, webhooks & integrations',
      'Reports, dashboards & BI exports',
      'SLA‑driven delivery with CI/CD'
    ],
    ctaText: 'Discuss a Build',
    ctaLink: '/contact',
    metrics: [
      { value: 100, suffix: '%', label: 'Code Quality' },
      { value: 50, suffix: '+', label: 'Custom Apps' },
      { value: 0, suffix: ' Days', label: 'Downtime' },
      { value: 14, suffix: ' Days', label: 'Sprint Cycles' }
    ],
    note: 'Enterprise-grade architecture and scalable foundations.'
  },
  {
    id: 'ai',
    label: 'Automation & AI/ML',
    title: 'From RPA automation to ML forecasting and GenAI copilots',
    subtitle: 'Unlock trapped value in operations with smart predictive layers.',
    bullets: [
      'Document processing, e‑invoicing & data unlock',
      'Demand planning, anomaly detection, SPC analytics',
      'GenAI smart forms & on‑screen assistants',
      'MLOps: retraining, metrics & governance'
    ],
    ctaText: 'Explore AI Use‑cases',
    ctaLink: '/contact',
    metrics: [
      { value: 85, suffix: '%', label: 'Time Saved' },
      { value: 10, suffix: 'x', label: 'ROI Potential' },
      { value: 99, suffix: '%', label: 'Accuracy Rate' },
      { value: 24, suffix: ' Hrs', label: 'Continuous Ops' }
    ],
    note: 'Models trained on specialized manufacturing datasets.'
  },
  {
    id: 'consulting',
    label: 'Process Consulting',
    title: 'Map, streamline and digitize end‑to‑end processes before automating',
    subtitle: 'We align your business objectives with technical capabilities.',
    bullets: [
      'As‑Is / To‑Be, SOPs & KPI frameworks',
      'Change management & adoption plans',
      'Compliance, audit trails & governance',
      'Roadmaps: quick wins → scale initiatives'
    ],
    ctaText: 'Book a Process Workshop',
    ctaLink: '/contact',
    metrics: [
      { value: 30, suffix: '%', label: 'Waste Reduction' },
      { value: 100, suffix: '%', label: 'Process Visibility' },
      { value: 60, suffix: ' Days', label: 'To Quick Wins' },
      { value: 5, suffix: ' Stages', label: 'Maturity Model' }
    ],
    note: 'Actionable roadmaps prioritizing high-impact areas.'
  }
];

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return ref;
}

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ minWidth: '24px' }}>
    <circle cx="12" cy="12" r="10" fill="transparent" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.2" />
    <path d="M8 12.5L10.5 15L16 9" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    let animationFrame;
    const duration = 1500;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * value));
      if (progress < 1) animationFrame = window.requestAnimationFrame(step);
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);
  return <span>{count}{suffix}</span>;
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const heroRef = useScrollReveal();
  const tabsRef = useScrollReveal();
  const processRef = useScrollReveal();
  const modelsRef = useScrollReveal();
  const bannerRef = useScrollReveal();

  return (
    <div className="solutions-override" style={{ backgroundColor: 'var(--color-bg-default)', minHeight: '100vh', paddingBottom: '0' }}>
      <style>{`
        .solutions-override {
          --color-text-primary: #111827;
          --color-text-secondary: #4B5563;
          --color-bg-default: #FFFFFF;
          --color-bg-section: #F7F9FC;
        }
        .solutions-override * {
          font-family: var(--font-noto-sans) !important;
        }
        .solutions-override span,
        .solutions-override p,
        .solutions-override a,
        .solutions-override button {
          font-size: inherit;
        }

        .sol-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .sol-reveal.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .sol-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
        }

        .sol-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--color-primary);
          color: var(--color-primary);
          border-radius: 9999px;
          padding: 10px 24px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
          background: transparent;
        }
        .sol-btn-outline:hover {
          background: var(--color-primary);
          color: var(--color-bg-default);
        }
        .sol-btn-outline-white {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(255,255,255,0.2);
          color: var(--color-bg-default);
          border-radius: 9999px;
          padding: 10px 24px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
          background: transparent;
        }
        .sol-btn-outline-white:hover {
          background: rgba(255,255,255,0.1);
        }

        .sol-tab-btn {
          padding: 12px 24px;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--color-text-secondary);
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .sol-tab-btn.active {
          color: var(--color-primary);
          background: rgba(0, 143, 255, 0.08);
          border-color: rgba(0, 143, 255, 0.2);
        }

        .sol-tab-panel {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          display: none;
        }
        .sol-tab-panel.active {
          opacity: 1;
          transform: translateY(0);
          display: grid;
        }

        .sol-glass-card {
          background: var(--color-bg-default);
          border: 1px solid rgba(0, 143, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          padding: 32px;
        }

        .sol-process-strip {
          display: flex;
          gap: 24px;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .sol-grid-2 { grid-template-columns: 1fr !important; }
          .sol-tabs-scroll {
            overflow-x: auto;
            padding-bottom: 12px;
            justify-content: flex-start !important;
          }
          .sol-process-strip { flex-direction: column !important; }
          .sol-model-grid { grid-template-columns: 1fr !important; }
          .sol-outcome-strip { flex-direction: column; }
          .sol-outcome-item { width: 100%; padding: 24px; }
          .sol-outcome-divider { width: 100%; height: 1px; }
        }

        .sol-model-card {
          background: var(--color-bg-default);
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .sol-model-card:hover {
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          border-color: rgba(0, 143, 255, 0.3);
          transform: translateY(-4px);
        }
        .sol-outcome-strip {
          background: var(--color-bg-default);
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          width: 100%;
          overflow: hidden;
        }
        .sol-outcome-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 32px 24px;
        }
        .sol-outcome-divider {
          width: 1px;
          height: 80px;
          background: rgba(0,0,0,0.05);
        }
        .sol-outcome-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(0, 143, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .sol-wave-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-top: 64px;
          height: 380px;
          gap: 16px;
        }
        .sol-wave-step {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-reveal.is-revealed .sol-wave-step {
          opacity: 1;
          transform: translateY(0);
        }
        .sol-wave-step:nth-child(2) { transition-delay: 0s; }
        .sol-wave-step:nth-child(3) { transition-delay: 0.15s; }
        .sol-wave-step:nth-child(4) { transition-delay: 0.30s; }
        .sol-wave-step:nth-child(5) { transition-delay: 0.45s; }
        .sol-wave-step:nth-child(6) { transition-delay: 0.60s; }

        .sol-wave-circle {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background-color: var(--color-bg-default);
          background-image: linear-gradient(rgba(0,143,255,0.06), rgba(0,143,255,0.06));
          border: 2px solid rgba(0,143,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
        }
        .sol-wave-step:hover .sol-wave-circle {
          background-image: linear-gradient(rgba(0,143,255,0.12), rgba(0,143,255,0.12));
          border-color: var(--color-primary);
          box-shadow: 0 0 0 8px rgba(0,143,255,0.1);
        }
        .sol-wave-icon { transition: all 0.3s ease; }
        .sol-wave-step:hover .sol-wave-icon { transform: scale(1.1); }

        .sol-wave-badge {
          position: absolute;
          top: 0;
          right: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-primary);
          color: var(--color-bg-default);
          font-weight: 800;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 3px var(--color-bg-default);
        }

        .sol-wave-content {
          position: absolute;
          width: 180px;
          text-align: center;
          transition: transform 0.3s ease;
          left: 50%;
          transform: translateX(-50%);
        }
        .sol-wave-content.up { bottom: calc(50% + 72px); }
        .sol-wave-content.down { top: calc(50% + 72px); }
        .sol-wave-step:hover .sol-wave-content.up { transform: translateX(-50%) translateY(-5px); }
        .sol-wave-step:hover .sol-wave-content.down { transform: translateX(-50%) translateY(5px); }

        .sol-wave-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 380px;
          pointer-events: none;
          z-index: 1;
          overflow: visible;
        }
        .sol-wave-path {
          fill: none;
          stroke: rgba(0,143,255,0.5);
          stroke-width: 2px;
          stroke-dasharray: 5, 5;
          opacity: 0;
          transition: opacity 0.8s ease 0.3s;
        }
        .sol-reveal.is-revealed .sol-wave-path { opacity: 1; }

        @media (max-width: 768px) {
          .sol-wave-container {
            display: flex;
            flex-direction: column;
            gap: 48px;
            height: auto;
            margin-top: 32px;
          }
          .sol-wave-content {
            position: relative;
            left: 0;
            transform: none !important;
            bottom: auto !important;
            top: auto !important;
            margin-top: 16px;
            width: 100%;
          }
          .sol-wave-svg { display: none; }
        }
      `}</style>

      {/* Hero */}
      <section className="sol-container sol-reveal" ref={heroRef} style={{ textAlign: 'center', paddingTop: '160px', paddingBottom: '100px' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,143,255,0.06) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
            Expert Services,<br />
            <span className="text-gradient-primary">Real-World Impact</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            From ERP implementation to AI automation and custom software — our service teams deliver measurable business outcomes across industries.
          </p>
        </div>
      </section>

      {/* Tabbed Services */}
      <section style={{ backgroundColor: 'var(--color-bg-section)' }}>
        <div className="sol-container sol-reveal" ref={tabsRef}>
          <div className="sol-tabs-scroll" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
            {TABS_DATA.map((tab, idx) => (
              <button key={tab.id} className={`sol-tab-btn ${activeTab === idx ? 'active' : ''}`} onClick={() => setActiveTab(idx)}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ background: 'var(--color-bg-default)', borderRadius: '24px', padding: '48px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
            {TABS_DATA.map((tab, idx) => (
              <div key={tab.id} className={`sol-tab-panel sol-grid-2 ${activeTab === idx ? 'active' : ''}`} style={{ gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: '800', color: 'var(--color-text-primary)' }}>{tab.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.6' }}>{tab.subtitle}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                    {tab.bullets.map((bullet, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <CheckIcon />
                        <span style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)', lineHeight: '1.5', fontWeight: '500' }}>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={tab.ctaLink} className="glow-cta">
                    <span className="glow-cta-inner">{tab.ctaText}</span>
                  </Link>
                </div>
                <div className="sol-glass-card">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
                    {tab.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="text-gradient-primary" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4px', lineHeight: '1' }}>
                          {activeTab === idx && <AnimatedCounter value={metric.value} suffix={metric.suffix} />}
                        </div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(0,143,255,0.04)', borderLeft: '3px solid var(--color-primary)', color: 'var(--color-text-secondary)', fontSize: '0.9rem', borderRadius: '0 8px 8px 0', fontWeight: '500' }}>
                    {tab.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Deliver */}
      <section className="sol-container sol-reveal" ref={processRef} style={{ maxWidth: '1280px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '16px' }}>Our Process</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'var(--color-text-primary)' }}>How We Deliver</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>A production‑first playbook that keeps releases reliable and reversible.</p>
        </div>
        <div className="sol-wave-container">
          <svg className="sol-wave-svg" viewBox="0 0 1000 380" preserveAspectRatio="none">
            <path className="sol-wave-path" d="M100 190 Q200 280 300 190 Q400 100 500 190 Q600 280 700 190 Q800 100 900 190" />
          </svg>
          {[
            { num: '01', title: 'Discovery', desc: 'Interviews, process maps, success metrics', icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="sol-wave-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
            { num: '02', title: 'Blueprint', desc: 'Solution design, data model, UX flows', icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="sol-wave-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> },
            { num: '03', title: 'Design & Plan', desc: 'Sprints, DevSecOps, code reviews, demos', icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="sol-wave-icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg> },
            { num: '04', title: 'Build & Review', desc: 'Sprints, DevSecOps, code reviews, QA & UAT', icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="sol-wave-icon"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg> },
            { num: '05', title: 'Go-Live', desc: 'Blue‑green deploy, rollback plan, hyper‑care', icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="sol-wave-icon"><polyline points="4 16 10 9 14 13 21 5"/><path d="M3 21v-18"/><path d="M3 21h18"/></svg> }
          ].map((step, idx) => {
            const isTop = idx % 2 === 0;
            return (
              <div key={idx} className="sol-wave-step group">
                <div className="sol-wave-circle">
                  {step.icon}
                  <div className="sol-wave-badge">{step.num}</div>
                </div>
                <div className={`sol-wave-content ${isTop ? 'up' : 'down'}`}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{step.title}</h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', padding: '0 10px' }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engagement Models */}
      <section style={{ backgroundColor: 'var(--color-bg-section)', paddingBottom: '40px' }}>
        <div className="sol-container sol-reveal" ref={modelsRef}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '16px' }}>How We Work Together</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'var(--color-text-primary)' }}>Choose Your Engagement Model</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Every model comes with the same enterprise-grade foundation.</p>
          </div>
          <div className="sol-model-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
            {[
              { num: '01', title: 'Fixed Scope', desc: 'Clear deliverables, timelines and acceptance criteria.', pill: 'Best for fixed budgets' },
              { num: '02', title: 'Dedicated Team', desc: 'Long‑running teams embedded with your product owners.', pill: 'Best for product teams' },
              { num: '03', title: 'Hybrid Model', desc: 'Fixed core + elastic capacity for spikes and R&D.', pill: 'Best for scaling' }
            ].map((model, idx) => (
              <div key={idx} className="sol-model-card group">
                <div style={{ position: 'absolute', top: '-10px', right: '10px', fontSize: '5rem', fontWeight: '900', color: 'var(--color-primary)', opacity: 0.07, lineHeight: 1 }}>{model.num}</div>
                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: 'var(--color-primary)' }}>{model.title}</h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '24px' }}>{model.desc}</p>
                </div>
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', background: 'rgba(0,143,255,0.08)', color: 'var(--color-primary)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.75rem', fontWeight: '700', marginTop: 'auto' }}>
                  {model.pill}
                </div>
              </div>
            ))}
          </div>
          <div className="sol-outcome-strip">
            <div className="sol-outcome-item group">
              <div className="sol-outcome-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px', color: 'var(--color-text-primary)' }}>Measurable Outcomes</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.4' }}>Time‑to‑invoice down, inventory turns up, process SLAs visible</p>
              </div>
            </div>
            <div className="sol-outcome-divider"></div>
            <div className="sol-outcome-item group">
              <div className="sol-outcome-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px', color: 'var(--color-text-primary)' }}>Enterprise‑Grade Security</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.4' }}>RBAC, audit logs, encryption, backups, compliance.</p>
              </div>
            </div>
            <div className="sol-outcome-divider"></div>
            <div className="sol-outcome-item group">
              <div className="sol-outcome-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px', color: 'var(--color-text-primary)' }}>Built to Extend</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.4' }}>APIs, webhooks, connectors — no vendor lock‑in.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="sol-reveal" ref={bannerRef} style={{ background: 'var(--color-bg-footer)', position: 'relative', overflow: 'hidden', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-magenta))' }}></div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,143,255,0.1) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800', marginBottom: '24px', color: 'var(--color-bg-default)' }}>Ready to transform your operations?</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>
            Let's align on outcomes and craft the right engagement model for you.
          </p>
          <Link to="/contact" className="sol-btn-outline-white">Talk to a Consultant</Link>
        </div>
      </section>
    </div>
  );
}
