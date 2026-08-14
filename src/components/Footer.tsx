import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 bg-[#080d26]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="font-mono font-bold text-white text-base">
                {portfolioData.personal.name}
              </span>
              <p className="text-xs text-slate-400">
                AI & Machine Learning Engineering Student
              </p>
            </div>
          </div>

          {/* Copyright text */}
          <div className="text-xs font-mono text-slate-400 text-center flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {portfolioData.personal.name}. Built with React 18, Vite & Tailwind CSS.</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>

        </div>
      </div>
    </footer>
  );
};
