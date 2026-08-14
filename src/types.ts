export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'AI/ML' | 'Web Apps' | 'Computer Vision' | 'NLP' | string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string[];
  keyFeatures: string[];
  challengesSolved: string[];
  metrics: ProjectMetric[];
  futureImprovements: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: 'Languages' | 'AI & ML' | 'Web & Databases' | 'Tools';
  status: 'Mastered' | 'Proficient' | 'Learning';
  icon?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  techStack: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    status: string;
    education: EducationItem[];
    socials: {
      github: string;
      linkedin: string;
      leetcode: string;
      geeksforgeeks: string;
    };
    resumeUrl: string;
    avatarUrl: string;
  };
  roles: string[];
  stats: { label: string; value: string; suffix?: string }[];
  skills: Skill[];
  projects: Project[];
  experienceHistory: ExperienceItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  testimonials: { quote: string; author: string; title: string }[];
  services: ServiceItem[];
}
