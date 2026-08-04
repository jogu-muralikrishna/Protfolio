import { X, Github, ExternalLink, Cpu, ShieldAlert, CheckCircle2, Award, Zap, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#080d26] border border-blue-500/30 rounded-3xl shadow-2xl overflow-y-auto text-white p-6 sm:p-8 space-y-8 my-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/30 text-cyan-300 border border-blue-400/40">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-600/30 text-purple-300 border border-purple-400/40">
                ★ Featured Project
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Banner Image / Placeholder */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video shadow-2xl bg-[#0a1128] flex items-center justify-center">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d26] via-transparent to-transparent opacity-80" />
            </>
          ) : (
            <div className="text-center p-8 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                <Layers className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-xs font-mono font-semibold text-slate-300">No Image Uploaded</p>
              <p className="text-[11px] text-slate-500 font-mono">Add an image URL in portfolioData.ts to feature custom screenshots.</p>
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Engineered Solution</span>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture & Flow */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <Layers className="w-5 h-5" />
            <span>System Architecture & Pipeline</span>
          </div>

          <div className="space-y-2.5">
            {project.architecture.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-cyan-300 flex items-center justify-center font-mono font-bold flex-shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features & Challenges Solved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Key Features</span>
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Engineering Challenges Solved</span>
            </h4>
            <ul className="space-y-2">
              {project.challengesSolved.map((chal, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Evaluation Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-blue-500/30 space-y-4">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Benchmark Results & Metrics</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-xl font-extrabold text-cyan-300">{m.value}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
