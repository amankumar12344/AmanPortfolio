import React, { useEffect, useState, useRef } from 'react';

const NeonCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Hide cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsHidden(false);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    const speed = 0.16; // Lerp speed
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const updateOutline = () => {
      outlineX += (mouseX - outlineX) * speed;
      outlineY += (mouseY - outlineY) * speed;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(updateOutline);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .btn, .project-card, .method-item, .skills-category-card, .mobile-menu-btn, input, textarea')) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .btn, .project-card, .method-item, .skills-category-card, .mobile-menu-btn, input, textarea')) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    updateOutline();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Central Neon Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#00f0ff] rounded-full pointer-events-none z-[9999] shadow-[0_0_8px_#00f0ff] transition-transform duration-100 ease-out"
      />
      {/* Trailing Glow Ring */}
      <div
        ref={outlineRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00f0ff] pointer-events-none z-[9998] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'scale-[1.6] bg-[rgba(0,240,255,0.08)] border-[#38bdf8] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
            : 'scale-100 bg-transparent'
        }`}
      />
    </>
  );
};

export default NeonCursor;
