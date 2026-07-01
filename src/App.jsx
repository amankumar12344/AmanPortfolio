import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Global Layout Components
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import NeonCursor from './components/NeonCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import HireMeWidget from './components/HireMeWidget';
import ScrollToTop from './components/ScrollToTop';

// Portfolio Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Admin from './sections/Admin';

const App = () => {
  const [isAdminPath, setIsAdminPath] = useState(window.location.pathname === '/admin');
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminPath(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isAdminPath) {
    return <Admin />;
  }

  // Track scrolling intersection to update current section in Navbar
  useEffect(() => {
    if (showSplash) return;

    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -65% 0px', // Triggers when section occupies the active mid-region
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [showSplash]);

  return (
    <>
      {/* Cinematic Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <div className="relative min-h-screen bg-[#030712] overflow-x-hidden selection:bg-[#00f0ff] selection:text-[#030712]">
          
          {/* Top Neon Scroll progress */}
          <ScrollProgressBar />

          {/* Sticky Navigation Header */}
          <Navbar activeSection={activeSection} />

          {/* Background Canvas Particles */}
          <ParticleBackground />

          {/* Glowing cursor trail (Hidden on mobile) */}
          <NeonCursor />

          {/* Main Portfolio Sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Journey />
            <Projects />
            <Achievements />
            <Contact />
          </main>

          {/* Bottom Footer Section */}
          <Footer />

          {/* Pulse Hire Me Trigger */}
          <HireMeWidget />

          {/* Circular progress return to top button */}
          <ScrollToTop />
        </div>
      )}
    </>
  );
};

export default App;
