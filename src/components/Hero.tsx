import { useState, useEffect } from 'react';
import { ArrowRight, Download, Sparkles, Github, Linkedin, Mail, Code, Terminal, Brain, Cpu, Database, Settings } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ProfileAvatar from './ProfileAvatar';

interface HeroProps {
  onOpenAi: () => void;
  onOpenResume: () => void;
  onOpenCustomizer?: () => void;
  avatarUrl?: string;
  onAvatarChange?: (dataUrl: string) => void;
}

export default function Hero({ onOpenAi, onOpenResume, onOpenCustomizer, avatarUrl, onAvatarChange }: HeroProps) {
  const titles = [
    "AI & Machine Learning Engineer",
    "Computer Vision & NLP Developer",
    "Predictive Modeling Specialist",
    "Full-Stack AI Systems Builder"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold tracking-wide text-cyan-300">
                Open to AI/ML Roles &amp; Internships
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">{personalInfo.location}</span>
            </div>

            {onOpenCustomizer && (
              <button
                onClick={onOpenCustomizer}
                className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-md"
                title="Edit portfolio data or profile details"
              >
                <Settings className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
                <span>Customize Data</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Hello, I'm <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>

            <div className="h-10 sm:h-12 flex items-center">
              <p className="text-xl sm:text-2xl font-mono font-medium text-cyan-300 flex items-center">
                <Terminal className="w-5 h-5 mr-2.5 text-blue-400 inline-block" />
                <span>{displayText}</span>
                <span className="w-2 h-6 bg-cyan-400 ml-1.5 animate-pulse inline-block" />
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
            {personalInfo.headline} Crafting intelligent machine learning pipelines, predictive neural architectures, and full-stack AI web products that turn raw data into scalable real-world solutions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a href="#projects" className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group">
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button onClick={onOpenAi} className="px-6 py-3.5 rounded-2xl font-semibold text-sm bg-blue-950/60 border border-blue-500/40 text-cyan-300 hover:border-cyan-400 hover:bg-blue-900/60 transition-all flex items-center justify-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Assistant</span>
            </button>

            <button onClick={onOpenResume} className="px-5 py-3.5 rounded-2xl font-medium text-sm bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          <div className="pt-4 flex items-center gap-4 text-slate-400 text-sm">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-mono">Connect:</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all" title="GitHub Profile">
              <Github className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-blue-400 border border-white/10 transition-all" title="LinkedIn Profile">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-cyan-400 border border-white/10 transition-all" title="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 border-t border-white/10">
            {personalInfo.stats.map((stat, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
          <div className="relative">

            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 opacity-30 blur-xl animate-pulse" />

            <ProfileAvatar
              src={avatarUrl || (personalInfo as any).avatarUrl || "/images/profile.jpg"}
              name={personalInfo.name}
              size="hero"
              onImageSelected={onAvatarChange}
            />

            <div className="absolute -top-4 -left-4 px-3.5 py-2 rounded-2xl bg-[#0a1128]/90 border border-blue-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 animate-bounce-slow">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white">Scikit-learn</span>
            </div>

            <div className="absolute top-1/4 -right-6 px-3.5 py-2 rounded-2xl bg-[#0a1128]/90 border border-purple-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 animate-bounce-slow delay-300">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">Python 3.12</span>
            </div>

            <div className="absolute bottom-6 -left-6 px-3.5 py-2 rounded-2xl bg-[#0a1128]/90 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 animate-bounce-slow delay-700">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">OpenCV CV</span>
            </div>

            <div className="absolute -bottom-4 right-4 px-3.5 py-2 rounded-2xl bg-[#0a1128]/90 border border-emerald-500/40 backdrop-blur-md shadow-xl flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Pandas &amp; SQL</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
