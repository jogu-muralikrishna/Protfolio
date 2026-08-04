export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'AI/ML' | 'Web Apps' | 'Computer Vision' | 'NLP';
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
  metrics: { label: string; value: string }[];
  futureImprovements: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    category: 'Programming' | 'AI/ML' | 'Tools' | 'Future Stack' | 'Web Development' | 'Databases';
    status?: 'Mastered' | 'Proficient' | 'Learning' | 'Upcoming';
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  verifyUrl: string;
  skillsCovered: string[];
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  category: 'Hackathon' | 'Academic' | 'Open Source' | 'Certification';
  icon: string;
  image?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Internship' | 'Project Role' | 'Upcoming';
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
  coursework: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  techStack: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  text: string;
  rating: number;
}
