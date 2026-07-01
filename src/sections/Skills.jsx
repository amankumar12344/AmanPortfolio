import React from 'react';
import { motion } from 'framer-motion';
import { FaSliders, FaServer, FaCode, FaDatabase, FaScrewdriverWrench } from 'react-icons/fa6';

const Skills = () => {
  const coreProficiencies = [
    { name: 'Java / J2EE', percentage: 90 },
    { name: 'Spring Boot & Microservices', percentage: 85 },
    { name: 'Hibernate / JPA', percentage: 85 },
    { name: 'REST APIs & Kafka', percentage: 80 },
    { name: 'ReactJS & UI Integration', percentage: 75 },
    { name: 'Databases (SQL / NoSQL)', percentage: 80 },
  ];

  const categories = [
    {
      title: 'Backend & Architecture',
      icon: <FaServer className="text-[#00f0ff] w-4.5 h-4.5" />,
      badges: [
        { name: 'Java', icon: 'devicon-java-plain colored' },
        { name: 'J2EE', icon: 'devicon-java-plain colored' },
        { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
        { name: 'Spring MVC', icon: 'devicon-spring-plain colored' },
        { name: 'Microservices', icon: null },
        { name: 'Hibernate', icon: null },
        { name: 'JPA', icon: null },
        { name: 'REST API', icon: null },
        { name: 'Kafka', icon: 'devicon-apache-plain colored' },
        { name: 'Web Services', icon: null },
        { name: 'SDLC', icon: null },
      ]
    },
    {
      title: 'Frontend UI',
      icon: <FaCode className="text-[#38bdf8] w-4.5 h-4.5" />,
      badges: [
        { name: 'HTML5', icon: 'devicon-html5-plain colored' },
        { name: 'CSS3', icon: 'devicon-css3-plain colored' },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        { name: 'ReactJS', icon: 'devicon-react-original colored' },
        { name: 'Tailwind CSS', icon: null }
      ]
    },
    {
      title: 'Database Systems',
      icon: <FaDatabase className="text-[#00f0ff] w-4.5 h-4.5" />,
      badges: [
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'SQL', icon: null }
      ]
    },
    {
      title: 'Developer Tools & OS',
      icon: <FaScrewdriverWrench className="text-[#38bdf8] w-4.5 h-4.5" />,
      badges: [
        { name: 'Git', icon: 'devicon-git-plain colored' },
        { name: 'Maven', icon: 'devicon-maven-plain colored' },
        { name: 'Docker', icon: 'devicon-docker-plain colored' },
        { name: 'IntelliJ IDEA', icon: 'devicon-intellij-plain colored' },
        { name: 'Eclipse', icon: 'devicon-eclipse-plain colored' },
        { name: 'Windows OS', icon: 'devicon-windows8-original colored' }
      ]
    }
  ];

  // SVG parameters
  const radius = 35;
  const circumference = 2 * Math.PI * radius; // 219.91

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] font-heading">
            My Toolbox
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white mt-2 tracking-wide">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Circular Progress Rings (Core Proficiencies) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            className="lg:col-span-6 glass-card rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold font-heading text-white tracking-wide mb-8 flex items-center gap-3">
              <FaSliders className="text-[#00f0ff] w-5 h-5" />
              Core Proficiencies
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-4 justify-items-center">
              {coreProficiencies.map((skill, idx) => {
                const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      
                      {/* Ring Track */}
                      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          className="stroke-gray-800/40 fill-none"
                          strokeWidth="4"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r={radius}
                          className="stroke-[#00f0ff] fill-none"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: idx * 0.1, ease: 'easeOut' }}
                          strokeDasharray={circumference}
                        />
                      </svg>

                      {/* Percentage Text */}
                      <span className="text-lg font-bold font-mono text-white group-hover:text-[#00f0ff] transition-colors duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
                        {skill.percentage}%
                      </span>
                    </div>

                    <span className="text-xs font-semibold font-heading text-gray-400 max-w-[110px] uppercase tracking-wider leading-relaxed">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Categorized Badges */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-6 w-full">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseMove={handleMouseMove}
                className="glass-card rounded-2xl p-5 md:p-6"
              >
                {/* Category Heading */}
                <h4 className="text-sm font-bold font-heading text-white tracking-wider uppercase mb-4 flex items-center gap-3 border-b border-cyan-500/10 pb-3">
                  <span className="bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
                    {category.icon}
                  </span>
                  {category.title}
                </h4>

                {/* Badge Grid Container */}
                <div className="flex flex-wrap gap-2.5">
                  {category.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center text-xs font-semibold px-3 py-2 rounded-xl bg-gray-900/60 border border-cyan-500/5 hover:border-cyan-500/25 hover:bg-cyan-950/10 hover:text-white text-gray-300 transition-all duration-300 shadow-sm"
                    >
                      {badge.icon && <i className={`${badge.icon} mr-1.5 w-3.5 h-3.5`} />}
                      {badge.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
