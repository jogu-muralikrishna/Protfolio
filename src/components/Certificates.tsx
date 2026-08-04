import { useState } from 'react';
import { Sparkles, Award, ExternalLink, Eye, X, ShieldCheck } from 'lucide-react';
import { certificates as defaultCertificates } from '../data/portfolioData';
import { Certificate } from '../types';

interface CertificatesProps {
  certificates?: typeof defaultCertificates;
}

export default function Certificates({ certificates = defaultCertificates }: CertificatesProps) {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CREDENTIALS & VERIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional AI & ML <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Verified qualifications from global academic and industrial platforms in Machine Learning, Deep Learning, and Software Engineering.
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 max-w-xl mx-auto space-y-3">
            <Award className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No certificates added yet.</h3>
            <p className="text-xs font-mono text-slate-500">
              Future verified credentials in Machine Learning, AI, and Software Engineering will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl flex flex-col sm:flex-row gap-6 items-center justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-xl group"
              >
                {/* Image Preview Thumbnail */}
                <div
                  onClick={() => setActiveCert(cert)}
                  className="relative w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/10 flex-shrink-0 group/img"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cert.issuer}</span>
                    </span>
                    <span className="text-slate-400">{cert.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>

                  <div className="text-[11px] font-mono text-slate-400">
                    Credential ID: <span className="text-slate-200">{cert.credentialId}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skillsCovered.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setActiveCert(cert)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-cyan-300 transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Link</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Certificate Preview Modal */}
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setActiveCert(null)}>
            <div className="relative max-w-2xl w-full bg-[#080d26] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-6" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400">{activeCert.issuer}</span>
                <h3 className="text-2xl font-bold text-white">{activeCert.title}</h3>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={activeCert.image} alt={activeCert.title} className="w-full h-auto object-cover" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-400">ID: {activeCert.credentialId}</span>
                <a
                  href={activeCert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify Credential Online</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
