import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedinIn, FaPaperPlane, FaCircleCheck, FaCircleExclamation, FaCheck, FaExclamation } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize EmailJS public key on mount
  useEffect(() => {
    emailjs.init('G7MxgzY6_vZLEsBbr');
  }, []);

  // Validation functions
  const validateName = (val) => val.trim().length >= 3;
  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const validateSubject = (val) => val.trim().length >= 5;
  const validateMessage = (val) => val.trim().length >= 10;

  const validations = {
    name: validateName(form.name),
    email: validateEmail(form.email),
    subject: validateSubject(form.subject),
    message: validateMessage(form.message),
  };

  const isFormValid = validations.name && validations.email && validations.subject && validations.message;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleEmailCopy = (e) => {
    e.preventDefault();
    const email = 'amannnkumarrrr@gmail.com';
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
      setToastMessage('Email copied! Opening Gmail composer...');
      setTimeout(() => setToastMessage(null), 3000);
    }).catch((err) => {
      console.error('Could not copy email: ', err);
    });

    // Open Gmail Compose Window in new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Touch all fields to show any validation warnings
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isFormValid) {
      setStatus({ loading: false, success: false, message: 'Please fix validation errors first.' });
      return;
    }

    setStatus({ loading: true, success: null, message: '' });

    const templateParams = {
      name: form.name,
      email: form.email,
      title: form.subject, // matches EmailJS template variable 'title'
      message: form.message,
    };

    try {
      await emailjs.send('service_v8u8iio', 'template_9e7oaas', templateParams);
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#38bdf8', '#030712', '#ffffff']
      });

      setStatus({ loading: false, success: true, message: 'Message sent successfully!' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTouched({ name: false, email: false, subject: false, message: false });
    } catch (error) {
      console.error('EmailJS submit error:', error);
      setStatus({
        loading: false,
        success: false,
        message: error.text || 'Failed to dispatch email. Please try again.'
      });
    }

    // Reset status after a delay
    setTimeout(() => {
      setStatus((prev) => ({ ...prev, success: null, message: '' }));
    }, 5000);
  };

  const getInputClass = (field) => {
    const defaultStyle = 'w-full bg-gray-900/60 border rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 pr-10 font-body';
    if (!touched[field]) return `${defaultStyle} border-cyan-500/10 focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.1)]`;
    return validations[field]
      ? `${defaultStyle} border-emerald-500/30 focus:border-emerald-500 focus:shadow-[0_0_10px_rgba(16,185,129,0.1)]`
      : `${defaultStyle} border-rose-500/30 focus:border-rose-500 focus:shadow-[0_0_10px_rgba(244,63,94,0.1)]`;
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
    <section id="contact" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00f0ff] font-heading">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white mt-2 tracking-wide">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact Info Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              onMouseMove={handleMouseMove}
              className="glass-card rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold font-heading text-white tracking-wide">
                  Start a Conversation
                </h3>
                <p className="text-gray-400 font-body text-sm leading-relaxed">
                  Have an exciting project, open role, or just want to connect? Hit the form or contact me directly via the channels below. I'll get back to you as soon as possible.
                </p>

                {/* Info Cards Stack */}
                <div className="space-y-4 pt-4">
                  {/* Email (with Copy Toast action) */}
                  <a
                    href="mailto:amannnkumarrrr@gmail.com"
                    onClick={handleEmailCopy}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-cyan-500/5 hover:border-cyan-500/25 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[#00f0ff] group-hover:scale-105 transition-transform duration-300">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest">
                        Email Me
                      </span>
                      <span className="text-sm font-body text-[#00f0ff] break-all">
                        amannnkumarrrr@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+919955755518"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-cyan-500/5 hover:border-cyan-500/25 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[#38bdf8] group-hover:scale-105 transition-transform duration-300">
                      <FaPhone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest">
                        Call Me
                      </span>
                      <span className="text-sm font-body text-gray-300">
                        +91 99557 55518
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/aman-kumar-566403205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-cyan-500/5 hover:border-cyan-500/25 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[#00f0ff] group-hover:scale-105 transition-transform duration-300">
                      <FaLinkedinIn className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-semibold text-gray-500 uppercase tracking-widest">
                        LinkedIn
                      </span>
                      <span className="text-sm font-body text-gray-300">
                        Aman Kumar
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Validation Form Card */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              onMouseMove={handleMouseMove}
              className="glass-card rounded-2xl p-6 md:p-8 w-full"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name / Email Dual Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-xs font-semibold font-heading text-gray-400 uppercase tracking-widest mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Aman Kumar"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={getInputClass('name')}
                    />
                    {touched.name && (
                      <div className="absolute right-3.5 top-[39px] pointer-events-none">
                        {validations.name ? (
                          <FaCheck className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <FaExclamation className="w-3.5 h-3.5 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-xs font-semibold font-heading text-gray-400 uppercase tracking-widest mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      className={getInputClass('email')}
                    />
                    {touched.email && (
                      <div className="absolute right-3.5 top-[39px] pointer-events-none">
                        {validations.email ? (
                          <FaCheck className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <FaExclamation className="w-3.5 h-3.5 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-xs font-semibold font-heading text-gray-400 uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Project Collaboration"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={() => handleBlur('subject')}
                    className={getInputClass('subject')}
                  />
                  {touched.subject && (
                    <div className="absolute right-3.5 top-[39px] pointer-events-none">
                      {validations.subject ? (
                        <FaCheck className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <FaExclamation className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>

                {/* Message field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-xs font-semibold font-heading text-gray-400 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    placeholder="Hi Aman, I'd love to chat about..."
                    value={form.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    className={getInputClass('message')}
                  />
                  {touched.message && (
                    <div className="absolute right-3.5 top-[39px] pointer-events-none">
                      {validations.message ? (
                        <FaCheck className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <FaExclamation className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
                    status.loading
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/50'
                      : status.success === true
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : status.success === false
                      ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : 'bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#030712] hover:brightness-110 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  }`}
                >
                  {status.loading ? (
                    <>
                      <span>Sending...</span>
                      <div className="loader-spinner" />
                    </>
                  ) : status.success === true ? (
                    <>
                      <span>Sent Successfully!</span>
                      <FaCircleCheck className="w-4.5 h-4.5" />
                    </>
                  ) : status.success === false ? (
                    <>
                      <span>Failed to Send</span>
                      <FaCircleExclamation className="w-4.5 h-4.5" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Success/Error Status Text Notification */}
                {status.message && (
                  <div
                    className={`text-center text-xs font-semibold uppercase tracking-wider ${
                      status.success ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Slide-in Copy email toast indicator */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9990] flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-950 border border-cyan-500/20 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)] font-heading text-xs font-bold tracking-wider uppercase backdrop-blur-md"
          >
            <FaCircleCheck className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
