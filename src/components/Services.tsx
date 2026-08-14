import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Eye, Code2, BarChart3, Wrench, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit':
        return <BrainCircuit className="w-7 h-7 text-blue-400" />;
      case 'Eye':
        return <Eye className="w-7 h-7 text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-7 h-7 text-purple-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-7 h-7 text-emerald-400" />;
      default:
        return <Wrench className="w-7 h-7 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Capabilities & Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Engineering services spanning machine learning model training, vision analytics, and modern AI application integration.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl space-y-5 hover:border-cyan-500/40 glass-card-hover group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
