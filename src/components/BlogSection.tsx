import { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, Sparkles, X, Share2 } from 'lucide-react';
import { blogPosts } from '../data/portfolioData';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI WRITING & RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Insights & <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Blog
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Articles on machine learning pipelines, NLP algorithms, computer vision engineering, and software career takeaways.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 max-w-xl mx-auto space-y-3">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No blog articles published yet.</h3>
            <p className="text-xs font-mono text-slate-500">
              Future technical write-ups on machine learning models, system architecture, and AI development will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/40 backdrop-blur-xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:translate-y-[-4px] shadow-xl group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#080d26]/80 text-purple-300 backdrop-blur-md border border-purple-400/30">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => setActivePost(post)}
                    className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActivePost(post)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Article Reader Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setActivePost(null)}>
            <div
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#080d26] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6 text-white my-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono text-purple-300">
                  <span className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-400/40">
                    {activePost.category}
                  </span>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {activePost.title}
                </h2>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
                <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line space-y-4">
                {activePost.content}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex flex-wrap gap-2">
                  {activePost.tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-cyan-300 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => alert("Article link copied to clipboard!")}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
