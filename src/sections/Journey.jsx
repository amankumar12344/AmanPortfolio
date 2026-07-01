import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarDays, FaGraduationCap, FaCertificate, FaSchool } from 'react-icons/fa6';

const Journey = () => {
  const timelineEvents = [
    {
      icon: <FaGraduationCap className="w-5 h-5 text-[#00f0ff]" />,
      date: '2019 - 2023',
      title: 'B.Tech in Computer Science & Engineering',
      institution: 'B.B.S.B.E.C, Fatehgarh Sahib, Punjab (PTU)',
      description: 'Earned my Bachelor\'s degree in Computer Science and Engineering. Built a strong foundation in core computer science subjects, algorithms, data structures, and database principles, while actively programming in Java.',
      side: 'left'
    },
    {
      icon: <FaCertificate className="w-5 h-5 text-[#38bdf8]" />,
      date: 'Post-B.Tech Training',
      title: 'Java Full-Stack Web Development',
      institution: 'Q-Spider & J-Spider, Kolkata',
      description: 'Completed an intensive Java Full-Stack developer course after graduating B.Tech. Specialized in building enterprise-grade Java backends, database modeling (MySQL/PostgreSQL), ORM tools (Hibernate/JPA), Spring MVC, Spring Boot, Microservices orchestration, and modern ReactJS frontends.',
      side: 'right'
    },
    {
      icon: <FaSchool className="w-5 h-5 text-[#00f0ff]" />,
      date: '2018',
      title: '12th Grade (PCM)',
      institution: 'M.R.G High School, Madhubani',
      description: 'Completed higher secondary schooling focusing on Physics, Chemistry, and Mathematics (PCM), which polished analytical, logical thinking, and problem-solving skills.',
      side: 'left'
    }
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="journey" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] font-heading">
            Milestones
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white mt-2 tracking-wide">
            My Journey
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Vertical Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f0ff] via-[#38bdf8] to-transparent -translate-x-1/2" />

          {/* Timeline Nodes Grid */}
          <div className="space-y-12 md:space-y-20">
            {timelineEvents.map((event, idx) => {
              const isLeft = event.side === 'left';
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Outer Floating Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gray-950 border border-[#00f0ff] -translate-x-1/2 z-10 shadow-[0_0_10px_#00f0ff] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                  </div>

                  {/* Spacer Column (Empty side on desktop) */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                    onMouseMove={handleMouseMove}
                    className="w-full pl-10 md:pl-0 md:w-1/2 md:px-8"
                  >
                    <div className="glass-card rounded-2xl p-6 relative group hover:scale-[1.01] transition-transform duration-300">
                      
                      {/* Date Header */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#00f0ff] font-heading tracking-wide mb-3">
                        <FaCalendarDays className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>

                      {/* Title & Institution */}
                      <h3 className="text-lg md:text-xl font-bold font-heading text-white mb-1 group-hover:text-[#00f0ff] transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="text-xs font-semibold font-heading text-gray-400 uppercase tracking-wider mb-4">
                        {event.institution}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 font-body text-sm leading-relaxed">
                        {event.description}
                      </p>

                      {/* Custom Icon Circle Badge */}
                      <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 shadow-md">
                        {event.icon}
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Journey;
