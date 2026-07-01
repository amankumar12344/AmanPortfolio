import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (totalHeight > 0) {
        const progress = (scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const circumference = 2 * Math.PI * 18; // Radius = 18. Circumference = 113.097
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[990] transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-950/80 border border-cyan-500/20 text-[#00f0ff] hover:text-[#38bdf8] hover:border-cyan-400/40 transition-colors duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
        aria-label="Scroll to top"
      >
        {/* SVG Progress Circle */}
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            className="stroke-gray-800/40 fill-none"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            className="stroke-[#00f0ff] fill-none transition-all duration-75 ease-out"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Icon */}
        <FaArrowUp className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default ScrollToTop;
