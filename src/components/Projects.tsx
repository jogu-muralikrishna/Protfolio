import { useState } from 'react';
import { Sparkles, Search, Github, ExternalLink, ArrowRight, Eye, Code2 } from 'lucide-react';
import { projects as defaultProjects } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  projects?: typeof defaultProjects;
}

export default function Projects({ projects = defaultProjects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI/ML', 'Web Apps', 'Computer Vision', 'NLP'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED WORK & CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered AI Systems & <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Machine Learning Solutions
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Real-world machine learning models, computer vision pipelines, NLP classifiers, and full-stack web applications.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
            />
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white/5 border border-white/10 rounded-3xl p-8">
            <Code2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No matching projects found</h3>
            <p className="text-xs text-slate-400 font-light">Try searching for alternative keywords like "Python", "Flask", or "ML".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:translate-y-[-6px] shadow-xl"
              >
                {/* Image & Category Overlay */}
                <div className="relative aspect-video overflow-hidden bg-[#0a1128] flex items-center justify-center">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080d26] via-transparent to-transparent opacity-90" />
                    </>
                  ) : (
                    <div className="text-center p-6 space-y-1">
                      <Code2 className="w-8 h-8 text-cyan-400/60 mx-auto" />
                      <p className="text-xs font-mono font-semibold text-slate-300">No Image Uploaded</p>
                      <p className="text-[10px] text-slate-500 font-mono">Project Screenshot Optional</p>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#080d26]/80 backdrop-blur-md text-cyan-300 border border-cyan-400/30">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-900/80 backdrop-blur-md text-purple-300 border border-purple-400/30">
                        Featured
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-blue-600/90 text-white hover:bg-cyan-500 shadow-lg transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-10"
                    title="View Case Study"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/5 border border-white/10 text-slate-300">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-all group/btn"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10"
                          title="GitHub Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-400/40 transition-all"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
