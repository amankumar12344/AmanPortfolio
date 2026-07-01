import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const words = ['Java Developer', 'Full Stack Developer', 'Backend Engineer'];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing speed configuration
  useEffect(() => {
    const currentWord = words[wordIdx];
    let timer;

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 50);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 100);
    }

    // Word boundary transitions
    if (!isDeleting && charIdx === currentWord.length) {
      // Pause at full word
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx === 0) {
      // Move to next word
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, wordIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 md:pt-32 overflow-hidden bg-transparent"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-[#00f0ff]/10 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[10%] w-80 h-80 bg-[#38bdf8]/10 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center my-auto relative z-10">
        
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="md:col-span-7 space-y-6 text-left"
        >
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00f0ff] font-heading font-semibold text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            Welcome to my space
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Hi, I'm <br className="sm:hidden" />
            <span className="text-gradient-cyan-blue">Aman Kumar</span>
          </h1>

          {/* Subheading Typing Loop */}
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-300">
            I am a{' '}
            <span className="text-[#00f0ff] font-mono border-r-2 border-[#00f0ff] pr-1.5 animate-pulse">
              {typedText}
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 font-body text-sm sm:text-base leading-relaxed max-w-xl">
            Java Developer (Full Stack) specializing in building highly scalable, secure, and robust web applications. I design end-to-end architectures using Spring Boot, Microservices, and modern frontend technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#030712] font-semibold font-heading tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 text-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-cyan-500/30 hover:border-[#00f0ff] bg-cyan-950/10 hover:bg-cyan-950/30 text-[#00f0ff] hover:text-white font-semibold font-heading tracking-wide transition-all duration-300 text-sm"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Graphic/Profile Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="md:col-span-5 flex justify-center relative py-6"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            
            {/* Animated Glow Border Frame */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/30 p-2 animate-pulse-slow">
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#00f0ff]/50 animate-[spin_40s_linear_infinite]" />
            </div>

            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#38bdf8] opacity-20 filter blur-xl animate-pulse-slow" />

            {/* Profile Image Wrapper */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.3)]">
              <img
                src="/assets/profile.jpg"
                alt="Aman Kumar"
                className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
              />
            </div>

          </div>
        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="flex justify-center pb-6 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-xs tracking-widest uppercase font-heading text-gray-500 hover:text-[#00f0ff] transition-colors duration-300"
        >
          <span>Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 bg-[#00f0ff] rounded-full"
            />
          </div>
        </a>
      </div>

      {/* "Open to Work" Marquee Banner */}
      <div className="relative w-full overflow-hidden border-t border-b border-cyan-500/10 bg-gray-950/60 py-4 backdrop-blur-md">
        <div className="animate-marquee-slow flex gap-12 text-sm font-extrabold uppercase font-heading tracking-widest text-[#00f0ff] drop-shadow-[0_0_4px_rgba(0,240,255,0.3)]">
          {Array(8)
            .fill('Open to Work / Freelance / Remote')
            .map((text, idx) => (
              <span key={idx} className="flex items-center gap-6">
                <span>{text}</span>
                <span className="text-[#38bdf8]">•</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
