import React from 'react';
import TechnologyHero from '../components/TechnologyHero';
import TechnologyStack from '../components/TechnologyStack';
import TechnologyStackToggle from '../components/TechnologyStackToggle';
import TechnologyLogosRow from '../components/TechnologyLogosRow';

const Technology = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TechnologyHero />
      <TechnologyStack />
      <TechnologyStackToggle />
      <TechnologyLogosRow />
    </div>
  );
};

export default Technology;
