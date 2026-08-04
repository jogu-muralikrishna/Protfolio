import { Brain, GraduationCap, MapPin, Target, Sparkles, Rocket, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { personalInfo as defaultPersonalInfo } from '../data/portfolioData';

interface AboutProps {
  personalInfo?: typeof defaultPersonalInfo;
}

export default function About({ personalInfo = defaultPersonalInfo }: AboutProps) {
  const strengths = [
    {
      title: "End-to-End ML Pipelines",
      description: "Proficient in raw data extraction, feature engineering, cross-validation, and deploying models as scalable web APIs.",
      icon: Brain,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Full-Stack AI Integration",
      description: "Combining modern backend frameworks like Flask & Express with React frontends for intelligent interactive web applications.",
      icon: Cpu,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Algorithmic Problem Solving",
      description: "Strong understanding of data structures, search algorithms, linear algebra, and mathematical statistics.",
      icon: Rocket,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Clean Production Code",
      description: "Writing modular, well-documented, testable Python & JavaScript code adhering to engineering best practices.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT ME & MY JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Passionate About Engineering <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligent Autonomous Systems
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Bridging the gap between theoretical machine learning research and real-world software applications.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story Card */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-blue-500/30 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Who I Am</h3>
                  <p className="text-xs text-cyan-400 font-mono">AI & Machine Learning Undergraduate</p>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed font-light">
                {personalInfo.aboutText}
              </p>

              <p className="text-slate-300 text-base leading-relaxed font-light">
                My passion lies in crafting models that solve real operational bottlenecks — whether that’s speeding up emergency blood donor matching, classifying medical diagnostic markers, or processing live computer vision streams in real time.
              </p>
            </div>

            {/* Quick Details Chips */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <GraduationCap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">Institute</div>
                  <div className="text-xs font-semibold text-white">{personalInfo.institute}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">Location</div>
                  <div className="text-xs font-semibold text-white">{personalInfo.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal & Mission Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-[#080d26] border border-blue-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                <Target className="w-3.5 h-3.5" />
                <span>CAREER MISSION</span>
              </div>

              <h3 className="text-2xl font-bold text-white leading-snug">
                Building Tomorrow's AI Software Infrastructure
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {personalInfo.careerGoal}
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Mastering Deep Learning & Transformer Architectures",
                  "Building Production-Grade Machine Learning APIs",
                  "Contributing to Open Source AI Libraries",
                  "Collaborating with High-Impact Product Teams"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Degree Target: 2027</span>
              <span className="text-cyan-400 font-bold">CGPA: 8.8 / 10</span>
            </div>
          </div>

        </div>

        {/* Core Strengths Grid */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
            Core Technical Pillars & Strengths
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 backdrop-blur-xl hover:translate-y-[-4px] transition-all duration-300 space-y-4 shadow-lg group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-3 text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-full h-full" />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
