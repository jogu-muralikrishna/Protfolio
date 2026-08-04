import React, { useState, useEffect } from 'react';
import {
  X, Copy, Check, Sparkles, User, Briefcase, GraduationCap, Award, FileCode,
  Layers, Plus, Trash2, Upload, ShieldCheck, Trophy, Wrench, Inbox, RotateCw,
  Search, Mail, Calendar, MessageSquare, AlertCircle, Loader2
} from 'lucide-react';
import {
  personalInfo, projects, skillCategories, educationHistory, experienceHistory,
  certificates, achievements, services, githubStatsData
} from '../data/portfolioData';
import type { Project, SkillCategory, Certificate, Achievement, ExperienceItem, EducationItem, ServiceItem } from '../types';

interface PortfolioDataShape {
  personalInfo: typeof personalInfo & { avatarUrl?: string };
  projects: typeof projects;
  skillCategories: typeof skillCategories;
  educationHistory: typeof educationHistory;
  experienceHistory: typeof experienceHistory;
  certificates: typeof certificates;
  achievements: typeof achievements;
  services: typeof services;
  githubStatsData: typeof githubStatsData;
}

interface OwnerCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateData: (newData: PortfolioDataShape) => void;
  currentData: PortfolioDataShape;
}

type TabId = 'inbox' | 'profile' | 'projects' | 'skills' | 'certificates' | 'achievements' | 'experience' | 'education' | 'services' | 'export';

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: 'inbox', label: 'Inbox Messages', icon: Inbox },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'certificates', label: 'Certificates', icon: ShieldCheck },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'experience', label: 'Experience', icon: Layers },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'services', label: 'Services', icon: Award },
  { id: 'export', label: 'Export Code', icon: FileCode },
];

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-[11px] font-mono text-slate-400 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
    />
  </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string }> = ({ label, value, onChange, rows = 2, hint }) => (
  <div>
    <label className="block text-[11px] font-mono text-slate-400 mb-1">{label}{hint && <span className="text-slate-500 normal-case"> ({hint})</span>}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
    />
  </div>
);

const SectionCard: React.FC<{ children: React.ReactNode; onDelete: () => void }> = ({ children, onDelete }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative">
    <button
      onClick={onDelete}
      title="Delete this item"
      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
    {children}
  </div>
);

const AddButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all"
  >
    <Plus className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

export const OwnerCustomizerModal: React.FC<OwnerCustomizerModalProps> = ({ isOpen, onClose, onUpdateData, currentData }) => {
  const [activeTab, setActiveTab] = useState<TabId>('inbox');
  const [copied, setCopied] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Contact Messages Inbox state
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState('');
  const [inboxSearch, setInboxSearch] = useState('');

  const fetchMessages = async () => {
    setLoadingMessages(true);
    setMessagesError('');

    let localMsgs: any[] = [];
    try {
      localMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    } catch (e) {
      localMsgs = [];
    }

    let remoteMsgs: any[] = [];

    try {
      const res = await fetch('/api/contact', {
        headers: {
          'x-admin-password': 'Murali@93927'
        }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.messages)) {
        remoteMsgs = data.messages;
      } else if (data.notice) {
        console.warn('Redis notice:', data.notice);
      }
    } catch (err: any) {
      console.warn('Network error fetching remote messages:', err);
    } finally {
      const combined = [...remoteMsgs, ...localMsgs];
      const seen = new Set<string>();
      const uniqueMessages = combined.filter((m) => {
        const key = m.id || `${m.email}-${m.receivedAt}-${m.message}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      uniqueMessages.sort((a, b) => {
        const tA = new Date(a.receivedAt || 0).getTime();
        const tB = new Date(b.receivedAt || 0).getTime();
        return tB - tA;
      });

      setMessages(uniqueMessages);
      setLoadingMessages(false);
    }
  };

  const deleteLocalMessage = (id: string, index: number) => {
    try {
      const updated = messages.filter((m, i) => (m.id ? m.id !== id : i !== index));
      setMessages(updated);
      const localOnly = updated.filter((m) => !m.redisStored);
      localStorage.setItem('portfolio_messages', JSON.stringify(localOnly));
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'inbox') {
      fetchMessages();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const patch = (key: keyof PortfolioDataShape, value: any) => {
    onUpdateData({ ...currentData, [key]: value });
  };

  const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleProfileChange = (field: string, value: string) => {
    patch('personalInfo', { ...currentData.personalInfo, [field]: value });
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    const list = [...currentData.projects];
    list[index] = { ...list[index], ...updates };
    patch('projects', list);
  };
  const addProject = () => {
    const blank: Project = {
      id: uid('project'), title: 'New Project Title', shortDescription: 'A short one-line summary.',
      fullDescription: 'A longer description of the project.', category: 'AI/ML', image: '', tags: ['New Tag'],
      githubUrl: '', demoUrl: '', featured: false, problem: '', solution: '', architecture: [], keyFeatures: [],
      challengesSolved: [], metrics: [], futureImprovements: []
    };
    patch('projects', [...currentData.projects, blank]);
  };
  const deleteProject = (index: number) => patch('projects', currentData.projects.filter((_, i) => i !== index));

  const updateSkillCategory = (catIndex: number, updates: Partial<SkillCategory>) => {
    const list = [...currentData.skillCategories];
    list[catIndex] = { ...list[catIndex], ...updates };
    patch('skillCategories', list);
  };
  const addSkillCategory = () => {
    const blank: SkillCategory = { title: 'New Category', iconName: 'Code2', skills: [] };
    patch('skillCategories', [...currentData.skillCategories, blank]);
  };
  const deleteSkillCategory = (catIndex: number) => patch('skillCategories', currentData.skillCategories.filter((_, i) => i !== catIndex));
  const addSkill = (catIndex: number) => {
    const list = [...currentData.skillCategories];
    list[catIndex] = { ...list[catIndex], skills: [...list[catIndex].skills, { name: 'New Skill', level: 50, category: 'Programming', status: 'Learning' }] };
    patch('skillCategories', list);
  };
  const updateSkill = (catIndex: number, skillIndex: number, field: string, value: any) => {
    const list = [...currentData.skillCategories];
    const skills = [...list[catIndex].skills];
    skills[skillIndex] = { ...skills[skillIndex], [field]: value };
    list[catIndex] = { ...list[catIndex], skills };
    patch('skillCategories', list);
  };
  const deleteSkill = (catIndex: number, skillIndex: number) => {
    const list = [...currentData.skillCategories];
    list[catIndex] = { ...list[catIndex], skills: list[catIndex].skills.filter((_, i) => i !== skillIndex) };
    patch('skillCategories', list);
  };

  const updateCertificate = (index: number, updates: Partial<Certificate>) => {
    const list = [...currentData.certificates];
    list[index] = { ...list[index], ...updates };
    patch('certificates', list);
  };
  const addCertificate = () => {
    const blank: Certificate = {
      id: uid('cert'), title: 'New Certificate Title', issuer: 'Issuing Organization', date: 'Month Year',
      credentialId: '', image: '', verifyUrl: '', skillsCovered: []
    };
    patch('certificates', [...currentData.certificates, blank]);
  };
  const deleteCertificate = (index: number) => patch('certificates', currentData.certificates.filter((_, i) => i !== index));
  const handleCertImageUpload = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) { alert('Please choose an image file.'); return; }
    const reader = new FileReader();
    reader.onload = () => updateCertificate(index, { image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const updateAchievement = (index: number, updates: Partial<Achievement>) => {
    const list = [...currentData.achievements];
    list[index] = { ...list[index], ...updates };
    patch('achievements', list);
  };
  const addAchievement = () => {
    const blank: Achievement = { id: uid('ach'), year: new Date().getFullYear().toString(), title: 'New Achievement', organization: '', description: '', category: 'Academic', icon: 'Award', image: '' };
    patch('achievements', [...currentData.achievements, blank]);
  };
  const deleteAchievement = (index: number) => patch('achievements', currentData.achievements.filter((_, i) => i !== index));
  const handleAchievementImageUpload = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) { alert('Please choose an image file.'); return; }
    const reader = new FileReader();
    reader.onload = () => updateAchievement(index, { image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const updateExperience = (index: number, updates: Partial<ExperienceItem>) => {
    const list = [...currentData.experienceHistory];
    list[index] = { ...list[index], ...updates };
    patch('experienceHistory', list);
  };
  const addExperience = () => {
    const blank: ExperienceItem = { id: uid('exp'), role: 'New Role', company: 'Company Name', location: '', period: '', type: 'Internship', description: [], skills: [] };
    patch('experienceHistory', [...currentData.experienceHistory, blank]);
  };
  const deleteExperience = (index: number) => patch('experienceHistory', currentData.experienceHistory.filter((_, i) => i !== index));

  const updateEducation = (index: number, updates: Partial<EducationItem>) => {
    const list = [...currentData.educationHistory];
    list[index] = { ...list[index], ...updates };
    patch('educationHistory', list);
  };
  const addEducation = () => {
    const blank: EducationItem = { id: uid('edu'), degree: 'New Degree', institution: 'Institution Name', location: '', period: '', cgpa: '', highlights: [], coursework: [] };
    patch('educationHistory', [...currentData.educationHistory, blank]);
  };
  const deleteEducation = (index: number) => patch('educationHistory', currentData.educationHistory.filter((_, i) => i !== index));

  const updateService = (index: number, updates: Partial<ServiceItem>) => {
    const list = [...currentData.services];
    list[index] = { ...list[index], ...updates };
    patch('services', list);
  };
  const addService = () => {
    const blank: ServiceItem = { id: uid('service'), title: 'New Service', shortDesc: '', fullDesc: '', icon: 'Brain', features: [], techStack: [] };
    patch('services', [...currentData.services, blank]);
  };
  const deleteService = (index: number) => patch('services', currentData.services.filter((_, i) => i !== index));

  const generateTsCode = () => {
    return `// ==========================================
// MASTER EDITABLE PORTFOLIO DATA CONFIGURATION
// File: src/data/portfolioData.ts
// Paste this entire file over your existing portfolioData.ts to persist changes permanently.
// ==========================================

export const personalInfo = ${JSON.stringify(currentData.personalInfo, null, 2)};

export const skillCategories = ${JSON.stringify(currentData.skillCategories, null, 2)};

export const projects = ${JSON.stringify(currentData.projects, null, 2)};

export const certificates = ${JSON.stringify(currentData.certificates, null, 2)};

export const achievements = ${JSON.stringify(currentData.achievements, null, 2)};

export const educationHistory = ${JSON.stringify(currentData.educationHistory, null, 2)};

export const experienceHistory = ${JSON.stringify(currentData.experienceHistory, null, 2)};

export const services = ${JSON.stringify(currentData.services, null, 2)};

export const blogPosts = [];

export const testimonials = [];

export const githubStatsData = ${JSON.stringify(currentData.githubStatsData, null, 2)};
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTsCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0a0f29] border border-blue-500/30 w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white relative">

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-[#0a0f29]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Portfolio Live Data Customizer</h2>
              <p className="text-xs text-slate-400">Edit every section live. Changes apply instantly across the whole site.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-white/[0.02] px-4 gap-1 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-3 text-xs font-mono font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-all ${
                  isActive ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* INBOX TAB */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-cyan-400" />
                    <span>Contact Messages Inbox</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real-time messages sent by visitors through your website contact form.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">
                    {messages.length} Messages
                  </span>
                  <button
                    onClick={fetchMessages}
                    disabled={loadingMessages}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 flex items-center gap-1.5 text-xs font-mono disabled:opacity-50"
                    title="Refresh Inbox"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={inboxSearch}
                  onChange={(e) => setInboxSearch(e.target.value)}
                  placeholder="Search by sender name, email, subject, or message text..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Loading State */}
              {loadingMessages && (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-mono">Fetching contact messages...</p>
                </div>
              )}

              {/* Error / Not Connected State */}
              {messagesError && !loadingMessages && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Database Connection Setup Required</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {messagesError === 'Storage not configured' || messagesError.includes('Storage')
                      ? 'Your Vercel backend function is live, but your free Upstash Redis Database needs to be connected in Vercel Storage settings to save messages.'
                      : 'Could not reach the /api/contact serverless endpoint. If testing on local localhost, deploy your changes to Vercel to test live!'}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 font-mono text-[11px] text-slate-300">
                    <p className="text-cyan-400 font-bold">Quick 2-Step Setup on Vercel:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-400">
                      <li>Go to <strong className="text-white">Vercel Dashboard</strong> → your project → <strong className="text-white">Storage</strong> tab → click <strong className="text-cyan-300">Connect Database (Upstash Redis)</strong>.</li>
                      <li>Go to <strong className="text-white">Deployments</strong> tab → click <strong className="text-white">...</strong> → <strong className="text-cyan-300">Redeploy</strong>.</li>
                    </ol>
                  </div>

                  <div className="pt-1 flex items-center gap-3">
                    <button
                      onClick={fetchMessages}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-mono font-semibold hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Re-test Connection</span>
                    </button>
                    <a
                      href="https://vercel.com/dashboard"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-mono hover:bg-white/20 transition-all"
                    >
                      Open Vercel Dashboard ↗
                    </a>
                  </div>
                </div>
              )}

              {/* Messages List */}
              {!loadingMessages && !messagesError && (
                <>
                  {messages.length === 0 ? (
                    <div className="py-16 text-center space-y-3 bg-white/5 rounded-2xl border border-white/10 p-6">
                      <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
                      <h4 className="text-sm font-bold text-white">No messages yet</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        When visitors send a message on your website, they will appear here automatically!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                      {messages
                        .filter((msg) => {
                          if (!inboxSearch.trim()) return true;
                          const q = inboxSearch.toLowerCase();
                          return (
                            msg.name?.toLowerCase().includes(q) ||
                            msg.email?.toLowerCase().includes(q) ||
                            msg.subject?.toLowerCase().includes(q) ||
                            msg.message?.toLowerCase().includes(q)
                          );
                        })
                        .map((msg, index) => (
                          <div
                            key={msg.id || index}
                            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                              <div className="space-y-0.5">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                  <span>{msg.name}</span>
                                  {msg.subject && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                      {msg.subject}
                                    </span>
                                  )}
                                </h4>
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1.5 font-mono"
                                >
                                  <Mail className="w-3 h-3" />
                                  <span>{msg.email}</span>
                                </a>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                <span>
                                  {msg.receivedAt
                                    ? new Date(msg.receivedAt).toLocaleString()
                                    : 'Recently'}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-black/30 p-3 rounded-xl border border-white/5 font-sans">
                              {msg.message}
                            </p>

                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => deleteLocalMessage(msg.id, index)}
                                className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-mono flex items-center gap-1 transition-all"
                                title="Delete Message"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `From: ${msg.name} <${msg.email}>\nSubject: ${msg.subject || 'N/A'}\n\n${msg.message}`
                                  );
                                  setCopiedMsgId(msg.id || String(index));
                                  setTimeout(() => setCopiedMsgId(null), 2000);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-mono flex items-center gap-1 transition-all"
                              >
                                {copiedMsgId === (msg.id || String(index)) ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-slate-400" />
                                    <span>Copy Message</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name" value={currentData.personalInfo.name} onChange={(v) => handleProfileChange('name', v)} />
                <Field label="Role / Title" value={currentData.personalInfo.role} onChange={(v) => handleProfileChange('role', v)} />
                <Field label="Email Address" value={currentData.personalInfo.email} onChange={(v) => handleProfileChange('email', v)} />
                <Field label="Location" value={currentData.personalInfo.location} onChange={(v) => handleProfileChange('location', v)} />
                <Field label="GitHub URL" value={currentData.personalInfo.github} onChange={(v) => handleProfileChange('github', v)} />
                <Field label="LinkedIn URL" value={currentData.personalInfo.linkedin} onChange={(v) => handleProfileChange('linkedin', v)} />
                <Field label="Institute" value={currentData.personalInfo.institute} onChange={(v) => handleProfileChange('institute', v)} />
                <Field label="CGPA" value={currentData.personalInfo.cgpa} onChange={(v) => handleProfileChange('cgpa', v)} />
              </div>
              <TextAreaField label="Headline" value={currentData.personalInfo.headline} onChange={(v) => handleProfileChange('headline', v)} rows={2} />
              <TextAreaField label="About Me Text" value={currentData.personalInfo.aboutText} onChange={(v) => handleProfileChange('aboutText', v)} rows={4} />
              <TextAreaField label="Career Goal" value={currentData.personalInfo.careerGoal} onChange={(v) => handleProfileChange('careerGoal', v)} rows={2} />
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Add, edit, or remove project cards.</p>
                <AddButton label="Add New Project" onClick={addProject} />
              </div>
              <div className="space-y-3">
                {currentData.projects.map((proj, idx) => (
                  <SectionCard key={proj.id} onDelete={() => deleteProject(idx)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                      <Field label="Title" value={proj.title} onChange={(v) => updateProject(idx, { title: v })} />
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                        <select
                          value={proj.category}
                          onChange={(e) => updateProject(idx, { category: e.target.value as Project['category'] })}
                          className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="AI/ML">AI/ML</option>
                          <option value="Web Apps">Web Apps</option>
                          <option value="Computer Vision">Computer Vision</option>
                          <option value="NLP">NLP</option>
                        </select>
                      </div>
                      <Field label="Image URL" value={proj.image} onChange={(v) => updateProject(idx, { image: v })} />
                      <Field label="GitHub URL" value={proj.githubUrl} onChange={(v) => updateProject(idx, { githubUrl: v })} />
                      <Field label="Demo URL" value={proj.demoUrl || ''} onChange={(v) => updateProject(idx, { demoUrl: v })} />
                      <Field label="Tags (comma separated)" value={proj.tags.join(', ')} onChange={(v) => updateProject(idx, { tags: v.split(',').map(s => s.trim()).filter(Boolean) })} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Short Description" value={proj.shortDescription} onChange={(v) => updateProject(idx, { shortDescription: v })} rows={2} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Full Description" value={proj.fullDescription} onChange={(v) => updateProject(idx, { fullDescription: v })} rows={3} />
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Add skill categories, then add individual skills inside each one.</p>
                <AddButton label="Add Category" onClick={addSkillCategory} />
              </div>
              <div className="space-y-4">
                {currentData.skillCategories.map((cat, catIdx) => (
                  <SectionCard key={catIdx} onDelete={() => deleteSkillCategory(catIdx)}>
                    <div className="pr-8">
                      <Field label="Category Title" value={cat.title} onChange={(v) => updateSkillCategory(catIdx, { title: v })} />
                    </div>
                    <div className="space-y-2 pt-2">
                      {cat.skills.map((skill, skillIdx) => (
                        <div key={skillIdx} className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-black/30 border border-white/5">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(catIdx, skillIdx, 'name', e.target.value)}
                            className="flex-1 min-w-[120px] px-2 py-1 rounded-md bg-black/40 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                            placeholder="Skill name"
                          />
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={skill.level}
                            onChange={(e) => updateSkill(catIdx, skillIdx, 'level', Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded-md bg-black/40 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                            title="Level %"
                          />
                          <select
                            value={skill.status || 'Learning'}
                            onChange={(e) => updateSkill(catIdx, skillIdx, 'status', e.target.value)}
                            className="px-2 py-1 rounded-md bg-black/40 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                          >
                            <option value="Mastered">Mastered</option>
                            <option value="Proficient">Proficient</option>
                            <option value="Learning">Learning</option>
                            <option value="Upcoming">Upcoming</option>
                          </select>
                          <button
                            onClick={() => deleteSkill(catIdx, skillIdx)}
                            className="p-1.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addSkill(catIdx)}
                        className="mt-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1 hover:bg-cyan-500/20"
                      >
                        <Plus className="w-3 h-3" /> Add Skill
                      </button>
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Upload a certificate image directly from your device, or paste an image URL.</p>
                <AddButton label="Add Certificate" onClick={addCertificate} />
              </div>
              <div className="space-y-3">
                {currentData.certificates.length === 0 && (
                  <p className="text-xs text-slate-500 italic">No certificates yet — click "Add Certificate" to add your first one.</p>
                )}
                {currentData.certificates.map((cert, idx) => (
                  <SectionCard key={cert.id} onDelete={() => deleteCertificate(idx)}>
                    <div className="flex flex-col sm:flex-row gap-4 pr-8">
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <div className="w-24 h-24 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
                          {cert.image ? (
                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                          ) : (
                            <ShieldCheck className="w-8 h-8 text-slate-600" />
                          )}
                        </div>
                        <label className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer hover:bg-cyan-500/20">
                          <Upload className="w-3 h-3" /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleCertImageUpload(idx, file);
                              e.target.value = '';
                            }}
                          />
                        </label>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Title" value={cert.title} onChange={(v) => updateCertificate(idx, { title: v })} />
                        <Field label="Issuer" value={cert.issuer} onChange={(v) => updateCertificate(idx, { issuer: v })} />
                        <Field label="Date" value={cert.date} onChange={(v) => updateCertificate(idx, { date: v })} />
                        <Field label="Credential ID" value={cert.credentialId} onChange={(v) => updateCertificate(idx, { credentialId: v })} />
                        <Field label="Verify URL" value={cert.verifyUrl} onChange={(v) => updateCertificate(idx, { verifyUrl: v })} />
                        <Field label="Image URL (alternative to upload)" value={cert.image} onChange={(v) => updateCertificate(idx, { image: v })} />
                        <div className="md:col-span-2">
                          <Field label="Skills Covered (comma separated)" value={cert.skillsCovered.join(', ')} onChange={(v) => updateCertificate(idx, { skillsCovered: v.split(',').map(s => s.trim()).filter(Boolean) })} />
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Add hackathon wins, academic honors, or open source milestones.</p>
                <AddButton label="Add Achievement" onClick={addAchievement} />
              </div>
              <div className="space-y-3">
                {currentData.achievements.length === 0 && (
                  <p className="text-xs text-slate-500 italic">No achievements yet — click "Add Achievement" to add your first one.</p>
                )}
                {currentData.achievements.map((ach, idx) => (
                  <SectionCard key={ach.id} onDelete={() => deleteAchievement(idx)}>
                    <div className="flex flex-col sm:flex-row gap-4 pr-8">
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <div className="w-24 h-24 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
                          {ach.image ? (
                            <img src={ach.image} alt={ach.title} className="w-full h-full object-cover" />
                          ) : (
                            <Trophy className="w-8 h-8 text-slate-600" />
                          )}
                        </div>
                        <label className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer hover:bg-cyan-500/20">
                          <Upload className="w-3 h-3" /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleAchievementImageUpload(idx, file);
                              e.target.value = '';
                            }}
                          />
                        </label>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Title" value={ach.title} onChange={(v) => updateAchievement(idx, { title: v })} />
                        <Field label="Year" value={ach.year} onChange={(v) => updateAchievement(idx, { year: v })} />
                        <Field label="Organization" value={ach.organization} onChange={(v) => updateAchievement(idx, { organization: v })} />
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                          <select
                            value={ach.category}
                            onChange={(e) => updateAchievement(idx, { category: e.target.value as Achievement['category'] })}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                          >
                            <option value="Hackathon">Hackathon</option>
                            <option value="Academic">Academic</option>
                            <option value="Open Source">Open Source</option>
                            <option value="Certification">Certification</option>
                          </select>
                        </div>
                        <Field label="Image URL (alternative to upload)" value={ach.image || ''} onChange={(v) => updateAchievement(idx, { image: v })} />
                        <div className="md:col-span-2">
                          <TextAreaField label="Description" value={ach.description} onChange={(v) => updateAchievement(idx, { description: v })} rows={2} />
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Add internships, project roles, or upcoming positions.</p>
                <AddButton label="Add Experience" onClick={addExperience} />
              </div>
              <div className="space-y-3">
                {currentData.experienceHistory.length === 0 && (
                  <p className="text-xs text-slate-500 italic">No experience entries yet — click "Add Experience" to add your first one.</p>
                )}
                {currentData.experienceHistory.map((exp, idx) => (
                  <SectionCard key={exp.id} onDelete={() => deleteExperience(idx)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                      <Field label="Role" value={exp.role} onChange={(v) => updateExperience(idx, { role: v })} />
                      <Field label="Company" value={exp.company} onChange={(v) => updateExperience(idx, { company: v })} />
                      <Field label="Location" value={exp.location} onChange={(v) => updateExperience(idx, { location: v })} />
                      <Field label="Period" value={exp.period} onChange={(v) => updateExperience(idx, { period: v })} />
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">Type</label>
                        <select
                          value={exp.type}
                          onChange={(e) => updateExperience(idx, { type: e.target.value as ExperienceItem['type'] })}
                          className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="Internship">Internship</option>
                          <option value="Project Role">Project Role</option>
                          <option value="Upcoming">Upcoming</option>
                        </select>
                      </div>
                      <Field label="Skills (comma separated)" value={exp.skills.join(', ')} onChange={(v) => updateExperience(idx, { skills: v.split(',').map(s => s.trim()).filter(Boolean) })} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Description" hint="one point per line" value={exp.description.join('\n')} onChange={(v) => updateExperience(idx, { description: v.split('\n').map(s => s.trim()).filter(Boolean) })} rows={3} />
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Add schools, colleges, or degrees.</p>
                <AddButton label="Add Education" onClick={addEducation} />
              </div>
              <div className="space-y-3">
                {currentData.educationHistory.map((edu, idx) => (
                  <SectionCard key={edu.id} onDelete={() => deleteEducation(idx)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                      <Field label="Degree" value={edu.degree} onChange={(v) => updateEducation(idx, { degree: v })} />
                      <Field label="Institution" value={edu.institution} onChange={(v) => updateEducation(idx, { institution: v })} />
                      <Field label="Location" value={edu.location} onChange={(v) => updateEducation(idx, { location: v })} />
                      <Field label="Period" value={edu.period} onChange={(v) => updateEducation(idx, { period: v })} />
                      <Field label="CGPA" value={edu.cgpa} onChange={(v) => updateEducation(idx, { cgpa: v })} />
                      <Field label="Coursework (comma separated)" value={edu.coursework.join(', ')} onChange={(v) => updateEducation(idx, { coursework: v.split(',').map(s => s.trim()).filter(Boolean) })} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Highlights" hint="one point per line" value={edu.highlights.join('\n')} onChange={(v) => updateEducation(idx, { highlights: v.split('\n').map(s => s.trim()).filter(Boolean) })} rows={3} />
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Services you offer, shown on the "What I Can Do" section.</p>
                <AddButton label="Add Service" onClick={addService} />
              </div>
              <div className="space-y-3">
                {currentData.services.map((svc, idx) => (
                  <SectionCard key={svc.id} onDelete={() => deleteService(idx)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                      <Field label="Title" value={svc.title} onChange={(v) => updateService(idx, { title: v })} />
                      <Field label="Tech Stack (comma separated)" value={svc.techStack.join(', ')} onChange={(v) => updateService(idx, { techStack: v.split(',').map(s => s.trim()).filter(Boolean) })} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Short Description" value={svc.shortDesc} onChange={(v) => updateService(idx, { shortDesc: v })} rows={2} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Full Description" value={svc.fullDesc} onChange={(v) => updateService(idx, { fullDesc: v })} rows={2} />
                    </div>
                    <div className="pr-8">
                      <TextAreaField label="Features" hint="one per line" value={svc.features.join('\n')} onChange={(v) => updateService(idx, { features: v.split('\n').map(s => s.trim()).filter(Boolean) })} rows={3} />
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          )}

          {/* EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300">
                  Copy this and paste it over <code className="text-cyan-300">src/data/portfolioData.ts</code> on GitHub to make your edits permanent (otherwise they reset on page reload).
                </p>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <div className="relative rounded-2xl bg-black/80 border border-white/10 p-4 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto">
                <pre>{generateTsCode()}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Changes are live now — visit "Export Code" tab to save them permanently</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-semibold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default OwnerCustomizerModal;
