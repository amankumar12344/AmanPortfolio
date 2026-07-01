import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Enable scroll lock release if mobile menu closed
    document.body.style.overflow = 'unset';

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'unset';
      return newState;
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[990] transition-all duration-500 ${
          isScrolled
            ? 'bg-gray-950/80 backdrop-blur-md border-b border-cyan-500/10 py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="text-2xl font-extrabold font-heading text-white tracking-wide"
          >
            Aman<span className="text-[#00f0ff]">.dev</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-semibold tracking-wider font-heading uppercase transition-all duration-300 hover:text-[#00f0ff] ${
                    isActive
                      ? 'text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.4)]'
                      : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Let's Talk CTA (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-5 py-2.5 rounded-xl border border-cyan-500/30 hover:border-[#00f0ff] bg-cyan-950/20 hover:bg-cyan-950/40 text-[#00f0ff] hover:text-white text-xs font-bold uppercase tracking-widest font-heading transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              Let's Talk
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="flex md:hidden text-gray-300 hover:text-[#00f0ff] transition-colors duration-300 p-2 z-[999]"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#030712]/98 backdrop-blur-lg z-[985] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xl font-bold font-heading uppercase tracking-widest transition-all duration-300 hover:text-[#00f0ff] ${
                  isActive
                    ? 'text-[#00f0ff] scale-105 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]'
                    : 'text-gray-400'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="px-8 py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#030712] hover:brightness-110 text-sm font-bold uppercase tracking-wider font-heading transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
