import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div 
      className={`bg-white rounded border border-gray-100 p-6 sm:p-8 
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50' : ''} 
        ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
