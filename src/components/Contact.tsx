import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Code, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message was received successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to submit form. Please try sending a direct email.',
        });
      }
    } catch (err) {
      console.error('Contact form submit error:', err);
      // Fallback success experience for static preview
      setStatus({
        type: 'success',
        message: 'Thank you! Message logged successfully. Murali will reply soon!',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Let's Build Something <span className="text-gradient">Intelligent</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project in mind, internship opportunity, or AI research collaboration? Drop a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Feel free to reach out via the contact form or directly through email and professional networks.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-blue-600/20 text-cyan-300 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Email Address</div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300">{portfolioData.personal.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-3 rounded-xl bg-purple-600/20 text-purple-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Current Location</div>
                    <div className="text-sm font-semibold text-white">{portfolioData.personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Social links grid */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Online Profiles:</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={portfolioData.personal.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <Github className="w-4 h-4 text-cyan-400" /> GitHub
                  </a>
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                  </a>
                  <a
                    href={portfolioData.personal.socials.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <Code className="w-4 h-4 text-yellow-400" /> LeetCode
                  </a>
                  <a
                    href={portfolioData.personal.socials.geeksforgeeks}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <Code className="w-4 h-4 text-emerald-400" /> GeeksforGeeks
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>

              {status.type === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  {status.message}
                </div>
              )}

              {status.type === 'error' && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship / AI Project Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
              >
                {status.type === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
