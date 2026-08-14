import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Database, Wrench, Sparkles, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'AI & ML', 'Web & Databases', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? portfolioData.skills
    : portfolioData.skills.filter((s) => s.category === activeCategory);

  const getStatusBadge = (status: Skill['status']) => {
    switch (status) {
      case 'Mastered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Proficient':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Learning':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            Technical Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Skills & <span className="text-gradient">Proficiencies</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Categorized technical capabilities, libraries, and frameworks backing my engineering workflow.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-panel p-5 rounded-2xl space-y-3 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-base">{skill.name}</h3>
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(skill.status)}`}>
                    {skill.status}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-cyan-300">{skill.level}%</span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2.5 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full rounded-full bg-hero-gradient shadow-glow-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
