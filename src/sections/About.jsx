import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLocationDot, FaBriefcase, FaCode, FaGraduationCap, FaAward } from 'react-icons/fa6';

const About = () => {
  // Ultra-performant cursor glow tracker that bypasses React re-renders
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const infoList = [
    { icon: <FaEnvelope className="text-[#00f0ff] w-4 h-4" />, label: 'Email', value: 'amannnkumarrrr@gmail.com', href: 'mailto:amannnkumarrrr@gmail.com' },
    { icon: <FaPhone className="text-[#00f0ff] w-4 h-4" />, label: 'Phone', value: '+91 99557 55518', href: 'tel:+919955755518' },
    { icon: <FaLocationDot className="text-[#00f0ff] w-4 h-4" />, label: 'Location', value: 'India', href: null },
    { icon: <FaBriefcase className="text-[#00f0ff] w-4 h-4" />, label: 'Availability', value: 'Open to Work / Freelance', href: null },
  ];

  const stats = [
    { icon: <FaCode className="text-[#00f0ff] w-6 h-6" />, value: '5+', label: 'Projects Completed' },
    { icon: <FaGraduationCap className="text-[#38bdf8] w-6 h-6" />, value: 'B.Tech', label: 'Computer Science' },
    { icon: <FaAward className="text-[#00f0ff] w-6 h-6" />, value: 'Kolkata', label: 'Full Stack Certified' },
  ];

  return (
    <section id="about" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] font-heading">
            Get To Know Me
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white mt-2 tracking-wide">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Biography Card (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold font-heading text-white tracking-wide">
              Who am I?
            </h3>
            
            <p className="text-gray-300 font-body text-sm md:text-base leading-relaxed">
              I am a passionate <strong className="text-[#00f0ff]">Java Developer with full-stack expertise</strong> who loves designing and developing scalable web applications. With a solid foundation in backend architecture, database modeling, and frontend integration, I strive to write clean, optimized, and maintainable code.
            </p>
            
            <p className="text-gray-400 font-body text-sm md:text-base leading-relaxed">
              My expertise lies in implementing enterprise-grade features such as REST API integration, microservices orchestration, caching, messaging queues, and responsive user interfaces. I hold a Bachelor of Technology in Computer Science & Engineering and have undergone rigorous full-stack training.
            </p>

            {/* Info Grid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-cyan-500/10 pt-6">
              {infoList.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-xs font-heading font-semibold text-gray-500 tracking-wider uppercase">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-body text-[#00f0ff] hover:text-[#38bdf8] transition-colors duration-300 break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-body text-gray-300">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards Column (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseMove={handleMouseMove}
                className="glass-card rounded-2xl p-6 flex items-center gap-6 group hover:translate-x-1.5 transition-transform duration-300"
              >
                {/* Stat Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Stat Text */}
                <div>
                  <div className="text-3xl font-extrabold font-heading text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold font-heading text-gray-500 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
