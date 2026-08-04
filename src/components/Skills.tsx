import { useState } from 'react';
import { Sparkles, Code2, BrainCircuit, Wrench, Flame, CheckCircle, GraduationCap } from 'lucide-react';
import { skillCategories as defaultSkillCategories } from '../data/portfolioData';

interface SkillsProps {
  skillCategories?: typeof defaultSkillCategories;
}

export default function Skills({ skillCategories = defaultSkillCategories }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Programming' | 'AI/ML' | 'Tools'>('All');

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const filteredSkills = activeTab === 'All'
    ? allSkills
    : allSkills.filter((s) => {
        if (activeTab === 'Programming') return s.category === 'Programming';
        if (activeTab === 'AI/ML') return s.category === 'AI/ML' || s.category === 'Future Stack';
        if (activeTab === 'Tools') return s.category === 'Tools';
        return true;
      });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Core AI, ML & Software Engineering <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skill Matrix
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Hands-on expertise across machine learning frameworks, data science libraries, programming languages, and modern development tools.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          {[
            { id: 'All', label: 'All Technologies' },
            { id: 'Programming', label: 'Programming' },
            { id: 'AI/ML', label: 'AI & Machine Learning' },
            { id: 'Tools', label: 'Tools & Frameworks' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const isLearning = skill.status === 'Learning' || skill.category === 'Future Stack';

            return (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-white/5 border transition-all duration-300 backdrop-blur-xl hover:translate-y-[-4px] shadow-xl group ${
                  isLearning
                    ? 'border-purple-500/30 hover:border-purple-400'
                    : 'border-white/10 hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl text-xs font-bold ${
                      isLearning ? 'bg-purple-600/20 text-purple-300' : 'bg-blue-600/20 text-cyan-300'
                    }`}>
                      {isLearning ? <GraduationCap className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                    isLearning
                      ? 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                      : 'bg-blue-950/60 border-blue-500/40 text-cyan-300'
                  }`}>
                    {skill.status || `${skill.level}%`}
                  </span>
                </div>

                {/* Animated Skill Level Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-[1px] border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isLearning
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>{isLearning ? 'Actively Practicing' : 'Production Ready'}</span>
                    <span>{skill.level}% Confidence</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Stack Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-[#080d26] border border-purple-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              <span>NEXT HORIZON FOCUS</span>
            </div>
            <h3 className="text-xl font-bold text-white">Deep Learning & Generative AI Systems</h3>
            <p className="text-slate-300 text-sm font-light max-w-2xl">
              Currently deepening practical expertise in PyTorch model architectures, TensorFlow computational graphs, HuggingFace transformers, and LLM fine-tuning techniques.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600/30 text-purple-200 border border-purple-400/40">
              PyTorch
            </span>
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600/30 text-orange-200 border border-orange-400/40">
              TensorFlow
            </span>
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600/30 text-cyan-200 border border-cyan-400/40">
              HuggingFace
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
