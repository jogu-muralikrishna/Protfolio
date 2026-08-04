import { Github, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

// Note: this section intentionally does NOT show contribution counts, streaks,
// commit numbers, or star/fork counts, since those aren't available from
// portfolioData.ts and displaying invented numbers would be misleading.
// It links directly to the real GitHub profile and repos instead.
export default function GithubSection() {
  if (!personalInfo.github) return null;

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPEN SOURCE & CODE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            GitHub <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Profile & Repositories
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Explore the real, up-to-date activity and code directly on GitHub.
          </p>
        </div>

        {/* Profile link card */}
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Github className="w-7 h-7" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{personalInfo.name}</div>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-cyan-400 hover:underline"
            >
              {personalInfo.github.replace('https://', '')}
            </a>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
