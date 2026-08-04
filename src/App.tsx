import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import ExperienceEducation from './components/ExperienceEducation';
import Services from './components/Services';
import GithubSection from './components/GithubSection';
import BlogSection from './components/BlogSection';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import CustomCursor from './components/CustomCursor';
import AskAiWidget from './components/AskAiWidget';
import ResumeModal from './components/ResumeModal';
import OwnerCustomizerModal from './components/OwnerCustomizerModal';

import {
  personalInfo,
  projects,
  skillCategories,
  educationHistory,
  experienceHistory,
  certificates,
  achievements,
  services,
  githubStatsData
} from './data/portfolioData';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultPortfolioData = {
    personalInfo: { ...personalInfo, avatarUrl: (personalInfo as any).avatarUrl || '' },
    projects,
    skillCategories,
    educationHistory,
    experienceHistory,
    certificates,
    achievements,
    services,
    githubStatsData
  };

  // Single source of truth for the whole site. Loads saved edits from
  // localStorage on first render, falling back to the defaults above.
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolioData');
      return saved ? { ...defaultPortfolioData, ...JSON.parse(saved) } : defaultPortfolioData;
    } catch {
      return defaultPortfolioData;
    }
  });

  // Persist every change so a refresh keeps the latest edits.
  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    } catch {
      // ignore quota/storage errors
    }
  }, [portfolioData]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#050816';
    document.body.style.color = '#ffffff';
  }, []);

  const handleOpenCustomizer = () => {
    const entered = window.prompt('Enter customizer password:');
    if (entered === null) return; // user cancelled
    if (entered === 'Murali@93927') {
      setIsCustomizerOpen(true);
    } else {
      alert('Incorrect password.');
    }
  };

  const handleAvatarChange = (dataUrl: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, avatarUrl: dataUrl }
    }));
  };

  return (
    <div className="min-h-screen relative font-sans bg-[#050816] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient Background Globs */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#2563EB] rounded-full blur-[140px] opacity-20 pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#7C3AED] rounded-full blur-[140px] opacity-20 pointer-events-none z-0" />

      {/* Background Neural Particles */}
      <BackgroundParticles />

      {/* Glow Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        onOpenAi={() => setIsAiOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={handleOpenCustomizer}
      />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero
          onOpenAi={() => setIsAiOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCustomizer={handleOpenCustomizer}
          avatarUrl={portfolioData.personalInfo.avatarUrl}
          onAvatarChange={handleAvatarChange}
        />
        <About personalInfo={portfolioData.personalInfo} />
        <Skills skillCategories={portfolioData.skillCategories} />
        <Projects projects={portfolioData.projects} />
        <Certificates certificates={portfolioData.certificates} />
        <Achievements achievements={portfolioData.achievements} />
        <ExperienceEducation
          educationHistory={portfolioData.educationHistory}
          experienceHistory={portfolioData.experienceHistory}
        />
        <Services services={portfolioData.services} />
        <GithubSection />
        <BlogSection />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AskAiWidget isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Live Data Customizer Modal — edit everything here, changes apply instantly */}
      <OwnerCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onUpdateData={(newData) => setPortfolioData(newData)}
        currentData={portfolioData}
      />
    </div>
  );
}
