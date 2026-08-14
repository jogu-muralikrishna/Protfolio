import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Certificates: React.FC = () => {
  const { certificates, achievements } = portfolioData;

  const hasCertificates = certificates && certificates.length > 0;
  const hasAchievements = achievements && achievements.length > 0;

  // Prompt condition: "Certificates & Achievements — only renders if data exists"
  if (!hasCertificates && !hasAchievements) {
    return null;
  }

  return (
    <section id="certificates" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Credentials
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Certificates & <span className="text-gradient">Achievements</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-3xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-white text-lg">{cert.title}</h3>
                <p className="text-slate-400 text-sm">{cert.issuer} • {cert.issueDate}</p>
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
