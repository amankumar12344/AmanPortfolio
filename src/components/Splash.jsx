import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800); // 1.5s of display + 0.3s padding

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Monogram Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gray-950 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.25)]"
        >
          {/* Neon Ring Pulsing */}
          <span className="absolute inset-0 rounded-2xl border border-cyan-400 opacity-60 animate-pulse-slow" />
          
          <span className="text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-tr from-[#00f0ff] to-[#38bdf8] tracking-tighter">
            AK
          </span>
        </motion.div>

        {/* Animated Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 flex flex-col items-center"
        >
          <h2 className="text-sm font-semibold tracking-[0.3em] text-[#00f0ff] font-heading uppercase">
            Aman Kumar
          </h2>
          <p className="text-[10px] tracking-[0.15em] text-gray-500 mt-2 font-mono uppercase">
            Portfolio Loading...
          </p>
        </motion.div>

        {/* Neon line loader */}
        <div className="absolute bottom-[-40px] w-36 h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Splash;
