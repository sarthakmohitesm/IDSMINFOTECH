import React from 'react';

const Section = ({ 
  children, 
  id, 
  className = '', 
  bg = 'white', // 'white', 'muted' (F7F9FC), 'dark' (0F172A)
  containerClass = ''
}) => {
  const bgClasses = {
    white: 'bg-bg-default',
    muted: 'bg-bg-section',
    dark: 'bg-bg-footer'
  };

  return (
    <section 
      id={id} 
      className={`py-20 md:py-24 lg:py-32 ${bgClasses[bg]} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-12 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
