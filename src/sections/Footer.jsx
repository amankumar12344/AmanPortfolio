import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

const Footer = () => {
  const [typedLogo, setTypedLogo] = useState('');
  const textLogo = 'Aman.dev';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedLogo(textLogo.substring(0, index + 1));
      index++;
      if (index === textLogo.length) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const emailCopyHandler = (e) => {
    e.preventDefault();
    const email = 'amannnkumarrrr@gmail.com';
    navigator.clipboard.writeText(email);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
  };

  return (
    <footer className="relative bg-gray-950 border-t border-cyan-500/10 py-12 overflow-hidden">
      
      {/* Background glow shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-[#00f0ff]/5 rounded-full filter blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Animated typed Logo */}
        <div className="text-center md:text-left space-y-2.5">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="text-xl font-extrabold font-heading text-white tracking-wide block"
          >
            {typedLogo}
            <span className="text-[#00f0ff] animate-pulse">|</span>
          </a>
          <p className="text-xs text-gray-500 font-body max-w-xs leading-relaxed">
            Building clean backend systems and responsive enterprise-grade frontend applications.
          </p>
        </div>

        {/* Center: Social links icons */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:amannnkumarrrr@gmail.com"
            onClick={emailCopyHandler}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 border border-cyan-500/10 hover:border-[#00f0ff] text-gray-400 hover:text-[#00f0ff] shadow-sm transition-all duration-300"
            aria-label="Email"
          >
            <FaEnvelope className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/aman-kumar-566403205"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 border border-cyan-500/10 hover:border-[#00f0ff] text-gray-400 hover:text-[#00f0ff] shadow-sm transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 border border-cyan-500/10 hover:border-[#00f0ff] text-gray-400 hover:text-[#00f0ff] shadow-sm transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right space-y-1.5">
          <p className="text-xs text-gray-600 font-body">
            &copy; {new Date().getFullYear()} Aman Kumar. All rights reserved.
          </p>
          <a
            href="/admin"
            className="inline-block text-[10px] font-mono uppercase tracking-widest text-gray-700 hover:text-[#00f0ff] hover:drop-shadow-[0_0_3px_rgba(0,240,255,0.4)] transition-all duration-300"
          >
            Admin Portal
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
