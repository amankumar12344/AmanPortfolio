import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaUserGraduate, FaDatabase, FaAward } from 'react-icons/fa6';

const Achievements = () => {
  const achievements = [
    {
      icon: <FaCertificate className="w-6 h-6 text-[#00f0ff]" />,
      title: 'Full-Stack Java Web Development',
      issuer: 'Q-Spider & J-Spider, Kolkata',
      date: 'Dec 2024',
      description: 'Completed rigorous curriculum covering Java, Spring Boot, Microservices, Hibernate, JPA, Databases, and modern ReactJS integration.',
    },
    {
      icon: <FaUserGraduate className="w-6 h-6 text-[#38bdf8]" />,
      title: 'B.Tech in Computer Science & Engineering',
      issuer: 'B.B.S.B.E.C, Punjab (PTU)',
      date: 'July 2023',
      description: 'Graduated with a strong foundation in Object-Oriented systems, Algorithm structures, software architectures, and database configurations.',
    },
    {
      icon: <FaDatabase className="w-6 h-6 text-[#00f0ff]" />,
      title: 'Relational Database Architecture (SQL)',
      issuer: 'Q-Spider Training',
      date: 'Sept 2024',
      description: 'Mastered SQL query tuning, database normalizations, indexing algorithms, and schema definitions in MySQL and PostgreSQL.',
    },
    {
      icon: <FaAward className="w-6 h-6 text-[#38bdf8]" />,
      title: 'Enterprise Spring Application Design',
      issuer: 'J-Spider, Kolkata',
      date: 'Oct 2024',
      description: 'Awarded for designing high-performance REST APIs, securing backend services, and orchestrating Kafka messaging systems.',
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
    <section id="achievements" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] font-heading">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white mt-2 tracking-wide">
            Achievements & Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseMove={handleMouseMove}
              className="glass-card rounded-2xl p-6 md:p-8 flex items-start gap-6 hover:scale-[1.01] transition-transform duration-300 group"
            >
              
              {/* Badge Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Text Context */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#00f0ff] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-mono">
                    {item.date}
                  </span>
                </div>
                
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-heading">
                  {item.issuer}
                </h4>

                <p className="text-gray-400 font-body text-xs sm:text-sm leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
