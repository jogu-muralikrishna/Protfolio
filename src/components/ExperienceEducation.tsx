import { GraduationCap, Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { educationHistory as defaultEducationHistory, experienceHistory as defaultExperienceHistory } from '../data/portfolioData';

interface ExperienceEducationProps {
  educationHistory?: typeof defaultEducationHistory;
  experienceHistory?: typeof defaultExperienceHistory;
}

export default function ExperienceEducation({
  educationHistory = defaultEducationHistory,
  experienceHistory = defaultExperienceHistory
}: ExperienceEducationProps) {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACADEMIC & PROFESSIONAL TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Engineering Experience
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Academic foundation at Institute of Aeronautical Engineering alongside project roles and upcoming career milestones.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-white/10">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Education Timeline</h3>
            </div>

            <div className="space-y-8 relative pl-6 border-l-2 border-blue-500/30">
              {educationHistory.map((edu) => (
                <div key={edu.id} className="relative space-y-4 group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#050816] group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 backdrop-blur-xl space-y-4 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-blue-600/20 text-cyan-300 border border-blue-400/30 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </span>
                      <span className="text-emerald-400 font-bold">{edu.cgpa}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-mono text-purple-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{edu.institution}, {edu.location}</span>
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {edu.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Coursework Pills */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        Core Coursework
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-white/10">
              <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Engineering Experience</h3>
            </div>

            {experienceHistory.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3 backdrop-blur-xl">
                <Briefcase className="w-10 h-10 text-purple-400/60 mx-auto" />
                <h4 className="text-lg font-bold text-slate-200">Currently seeking internship opportunities.</h4>
                <p className="text-xs font-mono text-slate-400">
                  Open to software engineering and AI/ML intern roles to contribute to production intelligent systems.
                </p>
              </div>
            ) : (
              <div className="space-y-8 relative pl-6 border-l-2 border-purple-500/30">
                {experienceHistory.map((exp) => (
                  <div key={exp.id} className="relative space-y-4 group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#050816] group-hover:scale-125 transition-transform" />

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/40 backdrop-blur-xl space-y-4 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-400/30 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {exp.type}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-xs font-mono text-cyan-300">
                          {exp.company} • {exp.location}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {exp.description.map((desc, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-light leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span>{desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-purple-950/40 border border-purple-500/30 text-purple-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
