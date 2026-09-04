import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items = [],
  activeHref: defaultActiveHref,
  className = "",
  ease = "power2.easeOut",
  baseColor = "transparent",
  pillColor = "#f3f4f6", // tailwind bg-gray-100
  hoveredPillTextColor = "#000000",
  pillTextColor = "#6b7280", // tailwind text-gray-500
  theme = "light",
  initialLoadAnimation = false,
}) {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const itemsRef = useRef([]);
  const location = useLocation();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const currentPathWithHash = location ? location.pathname + location.hash : defaultActiveHref;
  const currentPathWithoutHash = location ? location.pathname : defaultActiveHref;
  
  const activeIndex = items.findIndex(item => 
    item.href === currentPathWithHash || 
    item.href === currentPathWithoutHash || 
    item.href === defaultActiveHref
  );
  
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    const updatePillPosition = (animate = true) => {
      // If no valid index to display, smoothly hide the pill and return
      if (!pillRef.current || displayIndex === -1 || !itemsRef.current[displayIndex]) {
        if (pillRef.current) {
          gsap.to(pillRef.current, { opacity: 0, duration: 0.3, ease });
        }
        return;
      }

      const activeElement = itemsRef.current[displayIndex];
      const containerRect = containerRef.current.getBoundingClientRect();
      const itemRect = activeElement.getBoundingClientRect();

      const left = itemRect.left - containerRect.left;
      const width = itemRect.width;

      if (animate) {
        gsap.to(pillRef.current, {
          x: left,
          width: width,
          opacity: 1,
          duration: 0.3,
          ease: ease,
        });
      } else {
        gsap.set(pillRef.current, {
          x: left,
          width: width,
          opacity: 1,
        });
      }
    };

    updatePillPosition(true);
    
    const handleResize = () => updatePillPosition(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayIndex, ease, initialLoadAnimation]);

  return (
    <div className={`flex items-center gap-6 ${className}`} style={{ backgroundColor: baseColor }}>
      {logo && (
        <Link to="/" className="flex items-center shrink-0 mr-4">
          {typeof logo === 'string' ? <img src={logo} alt={logoAlt} className="h-9 md:h-[44px] w-auto" /> : logo}
        </Link>
      )}

      <div 
        ref={containerRef}
        className="relative flex items-center w-max mx-auto"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          ref={pillRef}
          className="absolute h-full rounded-full pointer-events-none"
          style={{ backgroundColor: pillColor, left: 0, top: 0, opacity: 0, zIndex: 0 }}
        />

        {items.map((item, index) => {
          const isSelected = index === displayIndex;
          
          return (
             <Link
                key={index}
                to={item.href}
                className="relative z-10 px-4 py-2 text-[17px] font-semibold transition-colors duration-200"
                style={{
                  color: isSelected ? hoveredPillTextColor : pillTextColor,
                }}
                ref={(el) => (itemsRef.current[index] = el)}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {item.label}
              </Link>
          );
        })}
      </div>
    </div>
  );
}
