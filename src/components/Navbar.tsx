import { useState, useEffect } from 'react';
import { Bot, Menu, X, Download, Github, Linkedin, Sparkles, Settings } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenAi: () => void;
  onOpenResume: () => void;
  onOpenCustomizer?: () => void;
}

export default function Navbar({ onOpenAi, onOpenResume, onOpenCustomizer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
      setScrolled(currentScroll > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'certificates', 'experience', 'services', 'github', 'blog', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Scroll Progress Bar */}
      <div className="w-full h-1 bg-slate-800/40 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        className={`px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 ${
          scrolled
            ? 'bg-[#050816]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 p-[2px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center font-extrabold text-lg text-white bg-[#080d26]">
                MK
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight transition-colors flex items-center gap-2 text-white group-hover:text-cyan-400">
                {personalInfo.name}
              </span>
              <span className="text-[11px] text-slate-400 font-mono tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI/ML Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full p-1.5 bg-white/5 border border-white/10 backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Customize Data Button */}
            {onOpenCustomizer && (
              <button
                onClick={onOpenCustomizer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all"
                title="Edit data in real time"
              >
                <Settings className="w-3.5 h-3.5 text-purple-400" />
                <span>Customizer</span>
              </button>
            )}

            {/* Ask AI Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 border border-blue-500/40 text-cyan-300 hover:border-cyan-400 hover:scale-105 transition-all shadow-sm"
              title="Interactive AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>Ask AI</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/20 text-slate-200 hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-600/30 text-cyan-300 border border-blue-400/40"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-white/15 text-white bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b transition-all duration-300 bg-[#080d26]/95 border-white/10 text-white backdrop-blur-xl px-6 py-6 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600/20 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              {onOpenCustomizer && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 bg-purple-500/20 border border-purple-500/30 text-purple-300"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize Portfolio Data</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAi();
                }}
                className="w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Chat with AI Assistant</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10"
              >
                <Download className="w-4 h-4" />
                <span>View / Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

