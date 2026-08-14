import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ExperienceItem } from '../types';

export const ExperienceEducation: React.FC = () => {
  const { education } = portfolioData.personal;
  const { experienceHistory } = portfolioData;

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            Timeline & Qualifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Education & <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Academic achievements, coursework foundation, and hands-on engineering milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Education Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Academic Journey</h3>
            </div>

            <div className="space-y-6">
              {education.map((item, idx) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-3xl space-y-4 hover:border-blue-500/40 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.degree}</h4>
                      <p className="text-cyan-300 text-sm font-semibold">{item.institution}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {item.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      {item.location}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">►</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Industry Experience (Graceful Empty State if empty) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work & Experience</h3>
            </div>

            {experienceHistory && experienceHistory.length > 0 ? (
              <div className="space-y-6">
                {experienceHistory.map((exp: ExperienceItem, idx: number) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-panel p-6 rounded-3xl space-y-4 hover:border-purple-500/40 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                        <p className="text-purple-300 text-sm font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Graceful Empty State UI */
              <div className="glass-panel p-8 rounded-3xl text-center space-y-4 border-dashed border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                  <Award className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold text-white">Seeking Internship Opportunities</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Currently a 2nd-year B.Tech CSE (AI & ML) student actively looking for AI/ML engineering internships and software roles to apply computer vision, NLP, and model optimization skills.
                </p>
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-blue-600/30 border border-blue-500/40 text-cyan-300 hover:bg-blue-600/50 transition-all"
                  >
                    Hire / Invite for Internship
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
