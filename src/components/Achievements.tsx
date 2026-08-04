import { Trophy, Award, GitCommit, GraduationCap, Sparkles, Star } from 'lucide-react';
import { achievements as defaultAchievements } from '../data/portfolioData';

interface AchievementsProps {
  achievements?: typeof defaultAchievements;
}

export default function Achievements({ achievements = defaultAchievements }: AchievementsProps) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Hackathon':
        return Trophy;
      case 'Academic':
        return GraduationCap;
      case 'Open Source':
        return GitCommit;
      default:
        return Award;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HONORS & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key Achievements & <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              Competitive Milestones
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Hackathons, national algorithm contests, open-source open contributions, and academic excellence recognitions.
          </p>
        </div>

        {/* Timeline / Cards Grid */}
        {achievements.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 max-w-xl mx-auto space-y-3">
            <Trophy className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No achievements added yet.</h3>
            <p className="text-xs font-mono text-slate-500">
              Future hackathon wins, academic honors, and competitive coding milestones will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((item) => {
              const IconComp = getIcon(item.category);

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-yellow-500/40 backdrop-blur-xl flex gap-5 items-start transition-all duration-300 hover:translate-y-[-4px] shadow-xl group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30 flex-shrink-0 group-hover:scale-110 transition-transform overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <IconComp className="w-6 h-6" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/30">
                        {item.category}
                      </span>
                      <span className="text-slate-400 font-bold">{item.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-yellow-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs font-mono text-cyan-400">
                      {item.organization}
                    </p>

                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
