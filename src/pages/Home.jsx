import React from 'react';
import HeroSaaS from '../components/HeroSaaS';
import SolutionSection from '../components/SolutionSection';
import ProblemSection from '../components/ProblemSection';
import ValueSection from '../components/ValueSection';
import PerformanceSection from '../components/PerformanceSection';
import ClientShowcase from '../components/ClientShowcase';
import TestimonialSection from '../components/TestimonialSection';
import ContactFormSection from '../components/ContactFormSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* SECTION 1 - PROFESSIONAL SAAS HERO */}
      <HeroSaaS />

      <ProblemSection />
      <SolutionSection />
      <ValueSection />
      <PerformanceSection />

      <ClientShowcase />

      <TestimonialSection />

      <ContactFormSection />
    </div>
  );
}
