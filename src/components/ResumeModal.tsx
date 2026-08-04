import { X, Download, Copy, Check, FileText, ExternalLink, GraduationCap, Briefcase, Code2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { personalInfo, skillCategories, projects, educationHistory, experienceHistory } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `MURALI KRISHNA
AI & Machine Learning Engineer | B.Tech CSE (AI & ML)
Location: ${personalInfo.location}
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}

CAREER OBJECTIVE
${personalInfo.careerGoal}

EDUCATION
${educationHistory.map(e => `- ${e.degree} | ${e.institution} (${e.period}) - CGPA: ${e.cgpa}`).join('\n')}

TECHNICAL SKILLS
- Programming: Python, Java, SQL, JavaScript, HTML, CSS
- AI / Machine Learning: Machine Learning, Deep Learning, Scikit-learn, Pandas, NumPy, Matplotlib, OpenCV, NLP, TensorFlow, PyTorch
- Tools: Git, GitHub, Firebase, Flask, Tailwind CSS, VS Code

FEATURED PROJECTS
${projects.map(p => `- ${p.title}: ${p.shortDescription} [Stack: ${p.tags.join(', ')}]`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#080d26] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6 text-white my-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600/20 text-cyan-300 border border-blue-400/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{personalInfo.name} - Resume</h3>
              <p className="text-xs text-cyan-300 font-mono">Curriculum Vitae / PDF Export</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 border border-white/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <a
              href={personalInfo.resumeUrl || "/assets/resume.pdf"}
              download
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-all flex items-center gap-1.5 shadow-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Preview */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6 font-sans text-xs sm:text-sm">
          {/* Header info */}
          <div className="border-b border-white/10 pb-4 space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">{personalInfo.name}</h1>
            <p className="text-xs text-cyan-300 font-mono font-bold">{personalInfo.role}</p>
            <p className="text-slate-400 text-xs">{personalInfo.location} | {personalInfo.email}</p>
          </div>

          {/* Objective */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">Career Objective</h4>
            <p className="text-slate-300 font-light leading-relaxed">{personalInfo.careerGoal}</p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">Education</h4>
            {educationHistory.map((e) => (
              <div key={e.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{e.degree}</span>
                  <span className="text-cyan-300 font-mono">{e.period}</span>
                </div>
                <div className="text-slate-400 text-xs">{e.institution} • CGPA: {e.cgpa}</div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">Technical Competencies</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white">Languages:</span> Python, Java, SQL, JavaScript, HTML, CSS
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white">AI / ML:</span> Scikit-learn, Pandas, NumPy, OpenCV, NLP, TensorFlow, PyTorch
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">Key Engineering Projects</h4>
            <div className="space-y-2">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex justify-between font-bold text-cyan-300">
                    <span>{p.title}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{p.category}</span>
                  </div>
                  <p className="text-slate-300 text-xs font-light">{p.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
