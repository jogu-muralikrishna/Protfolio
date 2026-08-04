import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#040714] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="space-y-2 text-center md:text-left">
            <a href="#hero" className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-[1.5px]">
                <div className="w-full h-full bg-[#080d26] rounded-[6px] flex items-center justify-center font-bold text-white text-xs">
                  MK
                </div>
              </div>
              <span className="font-bold text-white tracking-tight">{personalInfo.name}</span>
            </a>
            <p className="text-xs text-slate-400 font-light max-w-md">
              AI & Machine Learning Engineer • Institute of Aeronautical Engineering, Hyderabad.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#certificates" className="hover:text-white transition-colors">Certificates</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 transition-all border border-white/10"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-400 transition-all border border-white/10"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-all shadow-lg"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar & Telemetry Status */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ALL SYSTEMS OPERATIONAL
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">LATENCY: <strong className="text-cyan-400">12ms</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">UPTIME: <strong className="text-emerald-400">99.9%</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">VERSION: <strong className="text-purple-400">2.0.4-STABLE</strong></span>
          </div>

          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Murali Krishna • Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>using React & Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
