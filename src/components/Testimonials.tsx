import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, MessageSquare } from 'lucide-react';
import { testimonials } from '../data/portfolioData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & RECOMMENDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What Mentors & Peers Say
          </h2>
          <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 max-w-xl mx-auto space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No endorsements added yet.</h3>
            <p className="text-xs font-mono text-slate-500">
              Future mentor recommendations and peer testimonials will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & RECOMMENDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What Mentors & Peers Say <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Murali Krishna
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Feedback from academic leaders, engineering hackathon leads, and industry mentors.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-8 relative overflow-hidden">
            <Quote className="w-16 h-16 text-blue-500/20 absolute -top-2 -left-2 pointer-events-none" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-xl text-slate-200 font-light leading-relaxed italic">
              "{current.text}"
            </p>

            {/* User Profile */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{current.name}</h4>
                  <p className="text-xs font-mono text-cyan-300">{current.role} • {current.organization}</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
