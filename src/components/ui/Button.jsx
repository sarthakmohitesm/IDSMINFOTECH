import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full px-6 py-3 text-sm md:text-base cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-primary border border-primary hover:bg-gray-50 hover:-translate-y-0.5 shadow-sm',
    outline: 'bg-transparent text-white border border-white hover:bg-white/10'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
