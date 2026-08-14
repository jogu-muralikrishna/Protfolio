import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Bot, FileText, Github, Linkedin, Code, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Hero: React.FC = () => {
  // Typewriter effect state
  const roles = portfolioData.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullRole.length) {
        timer = setTimeout(() => {
          setCurrentText(fullRole.slice(0, currentText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullRole.slice(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  const floatingBadges = [
    { label: 'Scikit-learn', border: 'border-blue-500/40', delayClass: 'animate-float-0', posClass: '-top-4 -left-4 sm:-top-6 sm:-left-6' },
    { label: 'Python 3.12', border: 'border-purple-500/30', delayClass: 'animate-float-1', posClass: '-top-4 -right-4 sm:-top-6 sm:-right-6' },
    { label: 'OpenCV CV', border: 'border-cyan-500/40', delayClass: 'animate-float-2', posClass: '-bottom-4 -left-4 sm:-bottom-6 sm:-left-6' },
    { label: 'Pandas & SQL', border: 'border-emerald-500/40', delayClass: 'animate-float-3', posClass: '-bottom-4 -right-4 sm:-bottom-6 sm:-right-6' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                {portfolioData.personal.status}
              </span>
            </div>

            {/* Typewriter Role Title */}
            <div className="flex items-center gap-2.5 font-mono text-cyan-300 text-sm sm:text-base font-medium tracking-wide bg-blue-950/40 border border-blue-500/30 px-4 py-2 rounded-xl w-fit backdrop-blur-md">
              <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-400">$</span>
              <span>{currentText}</span>
              <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-blink" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineering <br />
              <span className="text-gradient">Intelligent Systems</span> <br />
              & Modern AI
            </h1>

            {/* Bio summary */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Hi, I'm <strong className="text-white">{portfolioData.personal.name}</strong> — a 2nd-year B.Tech CSE (AI & ML) student at Institute of Aeronautical Engineering, Hyderabad. I design computer vision algorithms, predictive models, and full-stack AI web systems.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.03]"
              >
                Explore Projects
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#chat-widget"
                onClick={(e) => {
                  e.preventDefault();
                  const chatBtn = document.getElementById('ai-chat-toggle');
                  if (chatBtn) chatBtn.click();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-cyan-300 bg-blue-950/60 border border-blue-500/40 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:scale-[1.03]"
              >
                <Bot className="w-5 h-5 text-cyan-400" />
                Ask AI Assistant
              </a>

              {/* Ghost CTA */}
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-medium text-slate-300 bg-white/5 border border-white/15 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mr-2">Connect:</span>
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/10 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/10 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.personal.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/10 transition-all"
                title="LeetCode Profile"
              >
                <Code className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/10 transition-all"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Avatar & Floating Badges */}
          <motion.div
            className="lg:col-span-5 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Soft Pulsing Gradient Halo */}
              <div className="absolute -inset-4 rounded-full bg-hero-gradient blur-2xl opacity-35 animate-pulse-slow" />
              
              {/* Main Avatar Glass Container */}
              <div className="relative w-full h-full rounded-full p-2 bg-white/5 border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden">
                <img
                  src={portfolioData.personal.avatarUrl}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover rounded-full filter brightness-105 contrast-105"
                />
              </div>

              {/* 4 Floating Glass Pills around corners */}
              {floatingBadges.map((badge, idx) => (
                <div
                  key={badge.label}
                  className={`absolute ${badge.posClass} ${badge.delayClass} ${badge.border} bg-[#0a1128]/95 border px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-mono font-medium text-slate-200 z-20`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Stat Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {portfolioData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-panel p-5 rounded-2xl text-center hover:border-cyan-500/30 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
                {stat.value}
                <span className="text-cyan-400 text-xl font-normal">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
