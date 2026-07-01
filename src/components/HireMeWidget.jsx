import React from 'react';
import { FaComments } from 'react-icons/fa';

const HireMeWidget = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[990]">
      <a
        href="#contact"
        className="pulse-glow-button relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#38bdf8] text-[#030712] hover:text-white transition-colors duration-300 group"
        aria-label="Hire Me Button"
      >
        {/* Pulsing Back Rings */}
        <span className="absolute inset-0 rounded-full bg-[#00f0ff] opacity-40 animate-ping" />
        <span className="absolute -inset-1.5 rounded-full border border-[#38bdf8] opacity-25 animate-pulse-slow" />
        
        {/* Icon */}
        <FaComments className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />

        {/* Hover Tooltip */}
        <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/90 text-[#00f0ff] border border-cyan-500/20 text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg pointer-events-none whitespace-nowrap tracking-wider font-heading">
          LET'S TALK!
        </span>
      </a>
    </div>
  );
};

export default HireMeWidget;
