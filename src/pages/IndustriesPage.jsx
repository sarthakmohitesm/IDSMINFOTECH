import React from 'react';
import IndustriesHero from '../components/industries/IndustriesHero';
import IndustriesGrid from '../components/industries/IndustriesGrid';
import IndustryDeepDive from '../components/industries/IndustryDeepDive';
import HowErpAdapts from '../components/industries/HowErpAdapts';
import CaseStudySection from '../components/industries/CaseStudySection';
import SectionGradientDivider from '../components/ui/SectionGradientDivider';

export default function IndustriesPage() {
  return (
    <div className="industries-override" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <style>{`
        .industries-override * {
          font-family: var(--font-noto-sans) !important;
        }
        .text-gradient-primary {
          background: linear-gradient(135deg, #008FFF, #00C9FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ind-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ind-card:hover {
          box-shadow: 0 20px 40px rgba(0, 143, 255, 0.08);
          border-color: rgba(0, 143, 255, 0.3);
          transform: translateY(-8px);
        }
        .sol-tab-btn {
          padding: 12px 24px;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid transparent;
          color: #6B7280;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .sol-tab-btn.active {
          color: #008FFF;
          background: rgba(0, 143, 255, 0.08);
          border-color: rgba(0, 143, 255, 0.2);
        }
        .wave-step {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }
        .wave-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid rgba(0,143,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
          transition: all 0.3s ease;
        }
        .wave-step:hover .wave-circle {
          border-color: #008FFF;
          box-shadow: 0 0 0 8px rgba(0,143,255,0.1);
          transform: scale(1.05);
        }
        .wave-num {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #008FFF;
          color: #FFF;
          font-size: 10px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #FFF;
        }
        @media (max-width: 768px) {
          .ind-grid { grid-template-columns: 1fr !important; }
          .deep-dive-split { grid-template-columns: 1fr !important; }
          .wave-container { flex-direction: column !important; gap: 40px; }
          .wave-svg { display: none; }
        }
      `}</style>
      
      <IndustriesHero />
      <HowErpAdapts />
      <IndustriesGrid />
      <IndustryDeepDive />
      <SectionGradientDivider />
      <CaseStudySection />

    </div>
  );
}
