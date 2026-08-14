import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, CheckCircle2, AlertCircle, Layers, TrendingUp, Sparkles, Lightbulb } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#080d26]/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a1128] border border-white/15 rounded-3xl shadow-2xl z-10 custom-scrollbar text-slate-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-3xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-600/40 border border-blue-400/40 text-cyan-300 mb-2">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">

            {/* Quick Action Links & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Overview / Full Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Project Overview
              </h3>
              <p className="text-slate-300 leading-relaxed text-base">
                {project.fullDescription}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-2">
                <h4 className="font-bold text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  The Problem
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  The Solution
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Architecture */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  Architecture & Tech Stack
                </h3>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  {project.architecture.map((arch, i) => (
                    <p key={i} className="text-sm font-mono text-cyan-300 flex items-center gap-2">
                      <span className="text-purple-400">►</span> {arch}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Impact & Performance Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center">
                      <div className="text-2xl font-extrabold text-gradient">{m.value}</div>
                      <div className="text-xs font-mono text-slate-400 mt-1 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Future Improvements */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Roadmap & Future Improvements
                </h3>
                <ul className="space-y-2">
                  {project.futureImprovements.map((item, i) => (
                    <li key={i} className="text-sm text-slate-300 font-mono flex items-center gap-2">
                      <span className="text-yellow-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
