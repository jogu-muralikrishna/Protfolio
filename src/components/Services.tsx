import { Brain, Globe, Eye, MessageSquareText, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { services as defaultServices } from '../data/portfolioData';

interface ServicesProps {
  services?: typeof defaultServices;
}

export default function Services({ services = defaultServices }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'Globe':
        return Globe;
      case 'Eye':
        return Eye;
      default:
        return MessageSquareText;
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOLUTIONS & ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What I Can Build <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              For Your Engineering Team
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            From algorithmic machine learning models and computer vision pipelines to responsive full-stack AI web products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item) => {
            const IconComp = getIcon(item.icon);

            return (
              <div
                key={item.id}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 backdrop-blur-xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:translate-y-[-4px] shadow-2xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-cyan-300 border border-blue-400/30 group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">Service Offering</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    {item.fullDesc}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-all group/link"
                  >
                    <span>Inquire Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
