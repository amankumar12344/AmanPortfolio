import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import ProjectMockupPreview from './ProjectMockupPreview';

const ProjectModal = ({ isOpen, onClose, project }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const techIcons = (techName) => {
    const name = techName.toLowerCase();
    if (name.includes('java') && !name.includes('javascript')) return <i className="devicon-java-plain colored mr-1.5" />;
    if (name.includes('spring') || name.includes('boot')) return <i className="devicon-spring-plain colored mr-1.5" />;
    if (name.includes('react')) return <i className="devicon-react-original colored mr-1.5" />;
    if (name.includes('postgresql')) return <i className="devicon-postgresql-plain colored mr-1.5" />;
    if (name.includes('mysql')) return <i className="devicon-mysql-plain colored mr-1.5" />;
    if (name.includes('bootstrap')) return <i className="devicon-bootstrap-plain colored mr-1.5" />;
    if (name.includes('kafka')) return <i className="devicon-apache-plain colored mr-1.5" />;
    if (name.includes('git')) return <i className="devicon-git-plain colored mr-1.5" />;
    if (name.includes('docker')) return <i className="devicon-docker-plain colored mr-1.5" />;
    return null;
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'fintech': return 'Fintech';
      case 'enterprise': return 'Enterprise';
      case 'utility': return 'Utility / Geolocation';
      case 'crud': return 'CRUD Web App';
      default: return category;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl bg-gray-950/90 border border-cyan-500/20 p-6 md:p-8 z-10 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#00f0ff] p-2 hover:bg-gray-900/50 rounded-full transition-all duration-300 z-20"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* HD Visual Interface Mockup Banner */}
            <div className="mb-6 relative z-10">
              <ProjectMockupPreview category={project.category} heightClass="h-48" />
            </div>

            {/* Category Tag */}
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full w-fit mb-4">
              {getCategoryLabel(project.category)}
            </span>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white mb-4 tracking-wide">
              {project.title}
            </h3>

            {/* Divider */}
            <div className="w-20 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mb-6" />

            {/* Description */}
            <div className="text-gray-300 leading-relaxed mb-6 font-body text-sm md:text-base space-y-4">
              <p>{project.description}</p>
              {project.longDescription && <p className="text-gray-400">{project.longDescription}</p>}
            </div>

            {/* Tech Stack Heading */}
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] mb-3 font-heading">
              Tech Stack Used
            </h4>

            {/* Tech Badges Grid */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {(project.tech || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-900/80 border border-cyan-500/5 hover:border-cyan-400/25 text-[#00f0ff] transition-all duration-300"
                >
                  {techIcons(tech)}
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 mt-auto border-t border-cyan-500/10 pt-6">
              <a
                href={project.github || 'https://github.com/amannnkumarrrr'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 border border-cyan-500/25 hover:border-[#00f0ff] hover:bg-cyan-500/5 text-white hover:text-[#00f0ff] transition-all duration-300 font-heading text-sm font-semibold tracking-wide"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#030712] hover:brightness-110 font-heading text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
