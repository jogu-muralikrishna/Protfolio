import React from 'react';
import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Certificates } from './components/Certificates';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#080d26] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Particle Canvas & Glow Orbs */}
      <Background />

      {/* Desktop Custom Cursor Follower */}
      <CustomCursor />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="relative z-10 space-y-12">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceEducation />
        <Certificates />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Gemini AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
