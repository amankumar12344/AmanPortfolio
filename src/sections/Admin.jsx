import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft, FaFloppyDisk, FaPlus, FaTrash, FaDatabase, FaRightFromBracket, FaSpinner, FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Credentials states stored in LocalStorage
  const [projectId, setProjectId] = useState('');
  const [dataset, setDataset] = useState('production');
  const [token, setToken] = useState('');

  // Active projects fetched from CMS
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Form states for creating new projects
  const [form, setForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'fintech',
    tech: '',
    icon: 'fa-wallet',
    orderRank: 1
  });

  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: null, message: '' });

  // Load state and configuration details on mount
  useEffect(() => {
    const logged = sessionStorage.getItem('admin_logged_in') === 'true';
    setIsLoggedIn(logged);

    const savedId = localStorage.getItem('sanity_project_id') || '';
    const savedDataset = localStorage.getItem('sanity_dataset') || 'production';
    const savedToken = localStorage.getItem('sanity_token') || '';

    setProjectId(savedId);
    setDataset(savedDataset);
    setToken(savedToken);
  }, []);

  // Fetch projects when logged in and credentials exist
  useEffect(() => {
    if (isLoggedIn && projectId) {
      fetchCurrentProjects();
    }
  }, [isLoggedIn, projectId, dataset, token]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Aman@2026') {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
    setPassword('');
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    localStorage.setItem('sanity_project_id', projectId.trim());
    localStorage.setItem('sanity_dataset', dataset.trim());
    localStorage.setItem('sanity_token', token.trim());
    alert('Sanity credentials saved to Local Storage!');
    fetchCurrentProjects();
  };

  const fetchCurrentProjects = async () => {
    if (!projectId) return;
    setLoadingProjects(true);
    const query = '*[_type == "project"] | order(orderRank asc)';
    const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      if (data.result) {
        setProjects(data.result);
      }
    } catch (err) {
      console.error('Error listing projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectId || !token) {
      setSubmitStatus({ loading: false, success: false, message: 'Project ID and Write Token are required.' });
      return;
    }

    setSubmitStatus({ loading: true, success: null, message: '' });

    const techArray = form.tech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const docId = `project-${Date.now()}`;
    const mutationUrl = `https://${projectId}.api.sanity.io/v2023-01-01/data/mutate/${dataset}`;

    const body = {
      mutations: [
        {
          createOrReplace: {
            _id: docId,
            _type: 'project',
            title: form.title.trim(),
            description: form.description.trim(),
            longDescription: form.longDescription.trim(),
            category: form.category,
            tech: techArray,
            icon: form.icon,
            orderRank: Number(form.orderRank)
          }
        }
      ]
    };

    try {
      const res = await fetch(mutationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const resData = await res.json();
      if (!res.ok || resData.error) {
        throw new Error(resData.error?.message || 'Failed to submit mutation');
      }

      setSubmitStatus({ loading: false, success: true, message: 'Project published successfully!' });
      
      // Reset form variables (keep orderRank incremental)
      setForm((prev) => ({
        title: '',
        description: '',
        longDescription: '',
        category: 'fintech',
        tech: '',
        icon: 'fa-wallet',
        orderRank: prev.orderRank + 1
      }));

      // Refresh list
      fetchCurrentProjects();
    } catch (err) {
      console.error('Add Project error:', err);
      setSubmitStatus({ loading: false, success: false, message: err.message || 'Error occurred.' });
    }

    setTimeout(() => {
      setSubmitStatus((prev) => ({ ...prev, success: null, message: '' }));
    }, 4000);
  };

  const handleDeleteProject = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    if (!projectId || !token) {
      alert('Project ID and Write Token are required to delete.');
      return;
    }

    const mutationUrl = `https://${projectId}.api.sanity.io/v2023-01-01/data/mutate/${dataset}`;
    const body = {
      mutations: [
        {
          delete: {
            id: docId
          }
        }
      ]
    };

    try {
      const res = await fetch(mutationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Delete mutation failed');
      
      // Refresh list
      fetchCurrentProjects();
      alert('Project deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting project: ' + err.message);
    }
  };

  const handleExit = () => {
    window.location.href = '/';
  };

  // Performant glows variables
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-300 py-12 px-6 flex flex-col items-center">
      
      {/* Background radial overlays */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-[#030712] to-[#030712] pointer-events-none z-0" />

      {/* Exit Button */}
      <button
        onClick={handleExit}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#00f0ff] border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl bg-gray-950/80 transition-all duration-300 z-10"
      >
        <FaArrowLeft className="w-3.5 h-3.5" />
        <span>Exit Admin</span>
      </button>

      {/* LOGIN OVERLAY */}
      {!isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mt-24 glass-card rounded-2xl p-8 relative z-10"
          onMouseMove={handleMouseMove}
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-[#00f0ff]">
              <FaLock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Admin Authentication</h2>
            <p className="text-xs text-gray-500 font-body">Enter credentials to unlock portfolio project management tools.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all"
              />
            </div>
            {loginError && <p className="text-xs font-semibold text-rose-500">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#030712] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:brightness-110"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      )}

      {/* DASHBOARD CONTENT */}
      {isLoggedIn && (
        <div className="w-full max-w-6xl space-y-8 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-cyan-500/10 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold font-heading text-white tracking-wide flex items-center gap-3">
                <FaDatabase className="text-[#00f0ff] w-7 h-7" />
                <span>Admin Dashboard</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1 font-body">Manage your portfolio projects databases dynamically.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/20 hover:border-rose-500/50 text-rose-400 bg-rose-950/10 hover:bg-rose-950/20 text-xs font-bold uppercase tracking-wider font-heading transition-all duration-300"
            >
              <FaRightFromBracket className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Settings and Creation Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Credentials Configuration Card */}
              <div className="glass-card rounded-2xl p-6" onMouseMove={handleMouseMove}>
                <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4 border-b border-cyan-500/10 pb-3 flex items-center gap-2">
                  <FaFloppyDisk className="text-[#00f0ff]" />
                  <span>Sanity API Credentials</span>
                </h3>
                <form onSubmit={handleSaveCredentials} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Project ID</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. xyz123ab"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Dataset</label>
                      <input
                        type="text"
                        required
                        placeholder="production"
                        value={dataset}
                        onChange={(e) => setDataset(e.target.value)}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Write Access Token</label>
                    <input
                      type="password"
                      required
                      placeholder="sk..."
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 hover:border-[#00f0ff] text-[#00f0ff] hover:text-white text-xs font-bold uppercase tracking-wider font-heading transition-all duration-300 shadow-sm"
                  >
                    Save Credentials
                  </button>
                </form>
              </div>

              {/* Add Project Form Card */}
              <div className="glass-card rounded-2xl p-6" onMouseMove={handleMouseMove}>
                <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4 border-b border-cyan-500/10 pb-3 flex items-center gap-2">
                  <FaPlus className="text-[#00f0ff]" />
                  <span>Publish New Project</span>
                </h3>
                
                <form onSubmit={handleAddProject} className="space-y-4">
                  {/* Title & Category & Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-6">
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Project Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Finance Hub"
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Category</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      >
                        <option value="fintech">Fintech</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="utility">Utility / Geolocation</option>
                        <option value="crud">CRUD Web App</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Order</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={form.orderRank}
                        onChange={(e) => setForm((prev) => ({ ...prev, orderRank: Number(e.target.value) }))}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Icon & Tech Stack */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Icon Design</label>
                      <select
                        value={form.icon}
                        onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      >
                        <option value="fa-wallet">Wallet (Fintech)</option>
                        <option value="fa-building-columns">Bank Pillars (Enterprise)</option>
                        <option value="fa-location-crosshairs">GPS Crosshairs (Geolocation)</option>
                        <option value="fa-users-gear">Users Cogwheels (CRUD Admin)</option>
                        <option value="fa-cloud-sun">Cloud and Sun (Utility/Weather)</option>
                        <option value="fa-folder-open">Default Folder</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Java, Spring Boot, PostgreSQL, React"
                        value={form.tech}
                        onChange={(e) => setForm((prev) => ({ ...prev, tech: e.target.value }))}
                        className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Short Description</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Brief overview explaining what the project does..."
                      value={form.description}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Detailed Description (Optional)</label>
                    <textarea
                      rows="4"
                      placeholder="Describe architectural challenges, integrations, APIs, logic flow etc..."
                      value={form.longDescription}
                      onChange={(e) => setForm((prev) => ({ ...prev, longDescription: e.target.value }))}
                      className="w-full bg-gray-900/60 border border-cyan-500/10 focus:border-[#00f0ff] rounded-xl py-2 px-3.5 text-white text-xs focus:outline-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitStatus.loading}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#030712] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] disabled:brightness-50 flex items-center justify-center gap-2"
                  >
                    {submitStatus.loading ? (
                      <>
                        <span>Publishing...</span>
                        <FaSpinner className="animate-spin w-4 h-4" />
                      </>
                    ) : submitStatus.success === true ? (
                      <>
                        <span>Published!</span>
                        <FaCircleCheck className="w-4 h-4" />
                      </>
                    ) : submitStatus.success === false ? (
                      <>
                        <span>Failed</span>
                        <FaCircleExclamation className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Add Project</span>
                        <FaPlus className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {submitStatus.message && (
                    <p
                      className={`text-center text-[10px] font-bold uppercase tracking-wider ${
                        submitStatus.success ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  )}
                </form>
              </div>

            </div>

            {/* Right Column: Database Projects List */}
            <div className="lg:col-span-5 w-full">
              <div className="glass-card rounded-2xl p-6" onMouseMove={handleMouseMove}>
                <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4 border-b border-cyan-500/10 pb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FaDatabase className="text-[#00f0ff]" />
                    <span>Projects List ({projects.length})</span>
                  </span>
                  {loadingProjects && <FaSpinner className="animate-spin text-[#00f0ff] w-4 h-4" />}
                </h3>

                {!projectId ? (
                  <p className="text-xs text-gray-500 text-center py-12">
                    Provide Sanity credentials to load project lists.
                  </p>
                ) : loadingProjects && projects.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-12">
                    Loading projects from Sanity...
                  </p>
                ) : projects.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-12">
                    No projects found in Sanity database. Add your first project!
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {projects.map((proj) => (
                      <div
                        key={proj._id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gray-950/60 border border-cyan-500/5 hover:border-cyan-500/15 transition-all duration-300"
                      >
                        <div className="space-y-1 pr-4">
                          <h4 className="text-xs font-bold text-white tracking-wide">{proj.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                              Order: {proj.orderRank || 'none'}
                            </span>
                            <span className="text-[9px] text-[#00f0ff] uppercase bg-cyan-950/20 px-2 py-0.5 rounded-md border border-cyan-500/10">
                              {proj.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          className="p-2 rounded-lg bg-rose-950/20 hover:bg-rose-950/50 border border-rose-500/10 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 transition-all duration-300"
                          aria-label="Delete project"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Admin;
