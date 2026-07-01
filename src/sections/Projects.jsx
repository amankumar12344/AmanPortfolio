import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaBuildingColumns, FaLocationCrosshairs, FaUsersGear, FaCloudSun, FaFolderOpen, FaArrowRight } from 'react-icons/fa6';
import ProjectModal from '../components/ProjectModal';
import ProjectMockupPreview from '../components/ProjectMockupPreview';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback static project dataset
  const fallbackProjects = [
    {
      title: 'Lendo Application',
      category: 'fintech',
      description: 'Peer-to-peer lending platform tailored for SMEs in Saudi Arabia. Features virtual wallets, investor/borrower account tiers, real-time bid systems, and multi-channel transaction notifications.',
      longDescription: 'Developed full end-to-end integration mapping microservices for bid allocations, daily calculations of repayments, automated ledger postings, and notification dispatch using Kafka clusters for immediate broker updates.',
      tech: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'JPA', 'Hibernate', 'ReactJS', 'PostgreSQL'],
      icon: 'fa-wallet',
      github: 'https://github.com/amannnkumarrrr',
      live: null
    },
    {
      title: 'Bank Management System',
      category: 'enterprise',
      description: 'Full-scale enterprise banking system. Managed loan EMIs (monthly/yearly calculation models), multi-branch tracking, member and customer registrations (CRUD), daily transactions logs, bank holidays, and dynamic reports.',
      longDescription: 'Created dynamic branch logs auditing bank holidays and balance ledger records. Built using secure authorization barriers. The frontend is built as a Single Page App using React and integrated via Axios clients.',
      tech: ['Java', 'Spring Boot', 'Microservices', 'JPA', 'Hibernate', 'MySQL', 'ReactJS'],
      icon: 'fa-building-columns',
      github: 'https://github.com/amannnkumarrrr',
      live: null
    },
    {
      title: 'Faulty Machine Tracker',
      category: 'utility',
      description: 'Dual-role system linking operators and technicians. Machine Operators capture GPS coordinates and upload pictures of faults, while Service Engineers receive geo-tagged tickets and navigate to complete resolution tasks.',
      longDescription: 'Configured geo-spatial mapping layers that calculate technician-operator proximity coordinates. Integrated multipart image uploads storing equipment fault photos into relational databases.',
      tech: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'JPA', 'ReactJS'],
      icon: 'fa-location-crosshairs',
      github: 'https://github.com/amannnkumarrrr',
      live: null
    },
    {
      title: 'Employee Management System',
      category: 'crud',
      description: 'A full-stack enterprise record system with custom admin authentication, input form sanitization/validation, server-side pagination, and clean layered MVC controller mapping.',
      longDescription: 'Implemented server-side filtering on complex records alongside dynamic queries. Admin routes are secured against parameter tampering with secure cookies and route guards.',
      tech: ['Java', 'Spring MVC', 'Hibernate', 'SQL', 'JSP', 'Bootstrap'],
      icon: 'fa-users-gear',
      github: 'https://github.com/amannnkumarrrr',
      live: null
    },
    {
      title: 'Weather Report Service',
      category: 'utility',
      description: 'Real-time weather tracking utility. Calls OpenWeatherMap API, processes JSON payloads, runs internal caching, serves clean dashboards via Thymeleaf UI, and handles exceptions smoothly.',
      longDescription: 'Integrated JSON parsers converting external API coordinate payloads into metrics. Implemented memory caches caching weather statistics for up to 30 minutes to conserve API query allocations.',
      tech: ['Java', 'Spring Boot', 'REST API', 'OpenWeatherMap', 'Thymeleaf'],
      icon: 'fa-cloud-sun',
      github: 'https://github.com/amannnkumarrrr',
      live: null
    }
  ];

  useEffect(() => {
    // Dynamic Fetch from Sanity.io CMS
    const fetchProjects = async () => {
      // Prioritize local storage (from Admin panel settings), then env variables, then default placeholders
      const localProjectId = localStorage.getItem('sanity_project_id');
      const localDataset = localStorage.getItem('sanity_dataset') || 'production';
      const localToken = localStorage.getItem('sanity_token') || '';

      const envProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
      const envDataset = import.meta.env.VITE_SANITY_DATASET || 'production';

      const finalProjectId = localProjectId || envProjectId || 'YOUR_SANITY_PROJECT_ID';
      const finalDataset = localDataset || envDataset || 'production';
      const apiVersion = '2023-01-01';

      if (!finalProjectId || finalProjectId === 'YOUR_SANITY_PROJECT_ID') {
        // Automatically default to static projects without delay
        setProjects(fallbackProjects);
        setLoading(false);
        return;
      }

      const query = '*[_type == "project"] | order(orderRank asc)';
      const url = `https://${finalProjectId}.api.sanity.io/v${apiVersion}/data/query/${finalDataset}?query=${encodeURIComponent(query)}`;

      try {
        const headers = {};
        if (localToken) {
          headers['Authorization'] = `Bearer ${localToken}`;
        }
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error('API request failed');
        const data = await res.json();
        
        if (data.result && data.result.length > 0) {
          // Format Sanity data scheme to match fallback scheme
          const formatted = data.result.map((proj) => ({
            title: proj.title,
            category: proj.category,
            description: proj.description,
            longDescription: proj.longDescription || '',
            tech: proj.tech || [],
            icon: proj.icon || 'fa-folder-open',
            github: proj.github || 'https://github.com/amannnkumarrrr',
            live: proj.live || null,
            image: proj.image
          }));
          setProjects(formatted);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.warn('CMS fetch error, using fallback static projects. Error details:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectIcon = (iconName) => {
    switch (iconName) {
      case 'fa-wallet': return <FaWallet className="w-5 h-5 text-[#00f0ff]" />;
      case 'fa-building-columns': return <FaBuildingColumns className="w-5 h-5 text-[#38bdf8]" />;
      case 'fa-location-crosshairs': return <FaLocationCrosshairs className="w-5 h-5 text-[#00f0ff]" />;
      case 'fa-users-gear': return <FaUsersGear className="w-5 h-5 text-[#38bdf8]" />;
      case 'fa-cloud-sun': return <FaCloudSun className="w-5 h-5 text-[#00f0ff]" />;
      default: return <FaFolderOpen className="w-5 h-5 text-[#38bdf8]" />;
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'fintech': return 'Fintech';
      case 'enterprise': return 'Enterprise';
      case 'utility': return 'Utility / Geolocation';
      case 'crud': return 'CRUD';
      default: return cat;
    }
  };

  // Filter project array
  const filteredProjects = projects.filter(
    (proj) => filter === 'all' || proj.category === filter
  );

  const handleOpenModal = (proj) => {
    setSelectedProject(proj);
    setIsModalOpen(true);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] font-heading">
            Recent Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white mt-2 tracking-wide">
            Projects Showcase
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {['all', 'fintech', 'enterprise', 'utility', 'crud'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider font-heading transition-all duration-300 ${
                filter === cat
                  ? 'border-[#00f0ff] text-[#00f0ff] bg-cyan-950/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'border-cyan-500/10 text-gray-400 hover:text-[#00f0ff] hover:border-cyan-500/30 bg-cyan-950/5'
              }`}
            >
              {cat === 'all' ? 'All' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Skeleton Loaders (Shimmer) */}
          {loading &&
            Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 h-80 flex flex-col justify-between animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gray-800" />
                      <div className="w-20 h-4 rounded-full bg-gray-800" />
                    </div>
                    <div className="w-3/4 h-6 rounded bg-gray-800" />
                    <div className="w-full h-16 rounded bg-gray-800" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-12 h-5 rounded bg-gray-800" />
                    <div className="w-16 h-5 rounded bg-gray-800" />
                    <div className="w-14 h-5 rounded bg-gray-800" />
                  </div>
                </div>
              ))}

          {/* Real Project Cards with Framer Motion triggers */}
          {!loading && (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.title}
                  onClick={() => handleOpenModal(project)}
                  onMouseMove={handleMouseMove}
                  className="glass-card rounded-2xl p-5 h-[430px] flex flex-col justify-between group cursor-pointer hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Interactive CSS Mockup Preview */}
                    <ProjectMockupPreview category={project.category} />

                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/20 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        {getProjectIcon(project.icon)}
                      </div>
                      <span className="text-[10px] font-extrabold font-heading text-gray-500 uppercase tracking-widest bg-cyan-950/20 border border-cyan-500/10 px-2.5 py-1 rounded-full">
                        {getCategoryLabel(project.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold font-heading text-white group-hover:text-[#00f0ff] transition-colors duration-300 tracking-wide">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 font-body text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack row */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4 max-h-[50px] overflow-hidden">
                      {project.tech.slice(0, 4).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-900 border border-cyan-500/5 text-[#00f0ff]"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-900 border border-cyan-500/5 text-[#38bdf8]">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Arrow */}
                    <div className="flex items-center gap-1.5 text-xs font-bold font-heading text-[#00f0ff] group-hover:translate-x-1 transition-transform duration-300 uppercase tracking-widest mt-auto">
                      <span>View Details</span>
                      <FaArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-heading text-sm uppercase tracking-wider">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Pop up Modal Overlay */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
