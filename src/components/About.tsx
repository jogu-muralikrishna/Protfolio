import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Target, Cpu, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About: React.FC = () => {
  const edu = portfolioData.personal.education[0];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Background & Mission
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            About <span className="text-gradient">Jogu Murali Krishna</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Engineering intelligent systems at the intersection of machine learning, vision algorithms, and scalable web software.
          </p>
        </div>

        {/* 3 Main Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-3xl space-y-4 hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Education & Academics</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-semibold text-cyan-300">{edu.degree}</p>
              <p className="text-slate-400">{edu.institution}</p>
              <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-white/10 text-slate-400">
                <span>{edu.period}</span>
                <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {edu.score}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Location & Base */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-8 rounded-3xl space-y-4 hover:border-purple-500/40 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Location & Readiness</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Based in <strong className="text-white">{portfolioData.personal.location}</strong>. Open for hybrid/remote internships, AI research initiatives, and collaborative software projects globally.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active Status: Available
            </div>
          </motion.div>

          {/* Card 3: Technical Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl space-y-4 hover:border-cyan-500/40 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Core Engineering Focus</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Specializing in Computer Vision (OpenCV/Dlib), Natural Language Processing (Scikit-learn/TF-IDF), Predictive Analytics (XGBoost), and modern React serverless applications.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs font-mono text-purple-300">
              Tech Stack: Python 3.12, C++, React, SQL
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
