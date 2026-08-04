import { Project, SkillCategory, Certificate, Achievement, ExperienceItem, EducationItem, ServiceItem, BlogPost, Testimonial } from '../types';

export const personalInfo = {
  name: "JOGU MURALI KRISHNA",
  role: "AI & Machine Learning Engineer | Software Engineer",
  headline: "Passionate AI/ML & Software Engineer specializing in intelligent autonomous systems, machine learning pipelines, and full-stack AI web applications.",
  location: "Hyderabad, Telangana, India",
  dob: "01 August 2008",
  education: "B.Tech – Computer Science Engineering (Artificial Intelligence & Machine Learning)",
  institute: "Institute of Aeronautical Engineering",
  currentYear: "2nd Year",
  graduationPeriod: "2025 – 2029",
  cgpa: "8.8 (1st Semester)",
  email: "muralikrishnajogu@gmail.com",
  phone: "9392799575",
  github: "https://github.com/jogu-muralikrishna",
  linkedin: "https://www.linkedin.com/in/muralikrishna-jogu-b5a044394/",
  twitter: "",
  instagram: "https://www.instagram.com/jogu.muralikrishna?igsh=b2cyeGgyMnJ5a2Q2",
  youtube: "",
  leetcode: "https://leetcode.com/u/jogu-muralikrishna/",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/muralikrigqhc",
  hackerrank: "",
  codechef: "",
  codeforces: "",
  atcoder: "",
  codingninjas: "",
  kaggle: "",
  medium: "",
  devto: "",
  discord: "",
  telegram: "",
  portfolioUrl: "",
  resumeUrl: "/assets/resume.pdf",
  careerGoal: "To join a high-impact engineering team at a leading tech product company as an AI/ML Engineer and build scalable autonomous systems.",
  aboutText: "[Write your introduction here - Edit in src/data/portfolioData.ts or via Live Customizer]. I am Jogu Murali Krishna, an AI & Machine Learning Engineer currently in my 2nd year of B.Tech in CSE (AI & ML) at the Institute of Aeronautical Engineering, Hyderabad (2025 – 2029). I specialize in designing end-to-end Machine Learning pipelines, predictive intelligence, and full-stack AI web applications.",
  stats: [
    { label: "B.Tech GPA", value: "8.8" },
    { label: "Current Year", value: "2nd Year" },
    { label: "Graduation", value: "2025–2029" },
    { label: "AI/ML Projects", value: "2+" },
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 92, category: "Programming", status: "Mastered" },
      { name: "Java", level: 82, category: "Programming", status: "Proficient" },
      { name: "C / C++", level: 80, category: "Programming", status: "Proficient" },
      { name: "SQL", level: 85, category: "Programming", status: "Mastered" },
      { name: "JavaScript / TypeScript", level: 84, category: "Programming", status: "Proficient" },
      { name: "HTML5 / CSS3", level: 90, category: "Programming", status: "Mastered" },
    ]
  },
  {
    title: "Machine Learning & Artificial Intelligence",
    iconName: "BrainCircuit",
    skills: [
      { name: "Machine Learning Algorithms", level: 90, category: "AI/ML", status: "Mastered" },
      { name: "Supervised & Unsupervised Learning", level: 92, category: "AI/ML", status: "Mastered" },
      { name: "Scikit-learn", level: 88, category: "AI/ML", status: "Mastered" },
      { name: "Pandas & NumPy", level: 94, category: "AI/ML", status: "Mastered" },
      { name: "Matplotlib & Seaborn", level: 86, category: "AI/ML", status: "Proficient" },
      { name: "Computer Vision (OpenCV)", level: 82, category: "AI/ML", status: "Proficient" },
      { name: "Natural Language Processing (NLP)", level: 80, category: "AI/ML", status: "Proficient" },
      { name: "TensorFlow & PyTorch", level: 68, category: "AI/ML", status: "Learning" },
    ]
  },
  {
    title: "Web Development & Databases",
    iconName: "Globe",
    skills: [
      { name: "Flask", level: 88, category: "Web Development", status: "Mastered" },
      { name: "React 19 & Node.js", level: 82, category: "Web Development", status: "Proficient" },
      { name: "Tailwind CSS", level: 90, category: "Web Development", status: "Mastered" },
      { name: "SQLite & MySQL", level: 85, category: "Databases", status: "Mastered" },
      { name: "Firebase Realtime DB", level: 80, category: "Databases", status: "Proficient" },
      { name: "RESTful API Design", level: 88, category: "Web Development", status: "Mastered" },
    ]
  },
  {
    title: "Developer Tools & Frameworks",
    iconName: "Wrench",
    skills: [
      { name: "Git & GitHub", level: 92, category: "Tools", status: "Mastered" },
      { name: "VS Code & Jupyter Notebook", level: 96, category: "Tools", status: "Mastered" },
      { name: "Linux CLI & Bash", level: 80, category: "Tools", status: "Proficient" },
      { name: "Postman API Testing", level: 85, category: "Tools", status: "Proficient" },
    ]
  }
];

export const projects: Project[] = [
  {
    id: "blood-donor-management-system",
    title: "Blood Donor Management System",
    shortDescription: "Emergency location-based web application connecting blood donors with urgent hospital requests in real time.",
    fullDescription: "A life-saving full-stack web application designed to eliminate critical communication delays during medical emergencies by matching blood seekers with compatible nearby donors filtered by blood group and geolocation.",
    category: "Web Apps",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "Flask", "Firebase", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/jogu-muralikrishna/blood-donor-management-system",
    demoUrl: "",
    featured: true,
    problem: "Emergency blood requests in regional hospitals often face crucial delays due to fragmented donor lists and lack of instant location matching.",
    solution: "Engineered an automated emergency broadcast system with real-time blood group filter queries, live availability status, and automated alert routing.",
    architecture: [
      "Frontend: Clean, responsive glassmorphic UI built with Tailwind CSS",
      "Backend: Flask microservice managing donor authentication & request routes",
      "Database: Firebase Realtime Database storing encrypted donor credentials",
      "Alert Engine: Instant notification routing for urgent blood groups"
    ],
    keyFeatures: [
      "Real-time blood group search filter",
      "One-click Emergency SOS request trigger",
      "Secure donor profile verification & privacy protection",
      "Interactive blood availability status board"
    ],
    challengesSolved: [
      "Optimized query execution time for instant emergency searches",
      "Designed secure contact privacy masking so donor phone numbers are protected until request acceptance"
    ],
    metrics: [
      { label: "Donor Lookup Speed", value: "< 150ms" },
      { label: "System Uptime", value: "99.9%" },
      { label: "UI Latency", value: "60 FPS" }
    ],
    futureImprovements: [
      "Integrate an ML model to forecast seasonal blood inventory shortages across local blood banks."
    ]
  },
  {
    id: "personal-ai-assistant",
    title: "Personal AI Assistant",
    shortDescription: "Interactive intelligent desktop & web conversational assistant capable of natural voice execution, task automation, and search.",
    fullDescription: "An advanced multi-modal Personal AI Assistant built to streamline daily developer workflows. Features natural language processing, speech synthesis, real-time web querying, system command automation, and context memory.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "NLP", "Speech Recognition", "OpenAI API", "PyQt / React"],
    githubUrl: "https://github.com/jogu-muralikrishna/personal-ai-assistant",
    demoUrl: "",
    featured: true,
    problem: "Developers frequently switch contexts between terminal, search engine, and code editors for routine lookup and system management tasks.",
    solution: "Built a unified voice and text-driven AI agent capable of answering complex queries, executing bash commands, summarizing documents, and managing calendar schedules.",
    architecture: [
      "Speech Module: PyAudio & SpeechRecognition pipeline for voice activation",
      "Intelligence Layer: Custom LLM wrapper with conversation memory buffers",
      "Action Engine: Modular tool execution handlers for weather, news, and system tasks",
      "Interface: High-contrast cyberpunk HUD UI with reactive speech waveform"
    ],
    keyFeatures: [
      "Voice & Text input dual mode support",
      "Contextual conversation memory across multi-turn sessions",
      "Automated system task execution and web research summaries",
      "Futuristic reactive visual speech waveform animations"
    ],
    challengesSolved: [
      "Mitigated audio feedback noise using spectral gate noise suppression algorithms",
      "Designed fallback offline modes for local command execution when internet is disconnected"
    ],
    metrics: [
      { label: "Voice Recognition Accuracy", value: "96.2%" },
      { label: "Response Latency", value: "< 400ms" },
      { label: "Task Execution Rate", value: "99%" }
    ],
    futureImprovements: [
      "Incorporate local offline LLM quantization (Ollama/Llama-3) for complete air-gapped privacy."
    ]
  }
];

export const certificates: Certificate[] = [];

export const achievements: Achievement[] = [];

export const educationHistory: EducationItem[] = [
  {
    id: "edu-1",
    degree: "B.Tech – Computer Science Engineering (Artificial Intelligence & Machine Learning)",
    institution: "Institute of Aeronautical Engineering",
    location: "Hyderabad, Telangana, India",
    period: "2025 – 2029 (2nd Year)",
    cgpa: "8.8 GPA (1st Semester)",
    highlights: [
      "Specializing in Artificial Intelligence, Machine Learning, Computer Vision, and Neural Networks.",
      "Academic Performance: 8.8 GPA in 1st Semester.",
      "Active participant in technical coding clubs and campus AI workshops."
    ],
    coursework: [
      "Machine Learning Algorithms",
      "Data Structures & Algorithms",
      "Python Programming",
      "Object Oriented Programming (Java / C++)",
      "Database Management Systems",
      "Linear Algebra & Probability",
      "Discrete Mathematics"
    ]
  }
];

export const experienceHistory: ExperienceItem[] = [];

export const services: ServiceItem[] = [
  {
    id: "service-1",
    title: "AI & Machine Learning Solutions",
    shortDesc: "Custom machine learning model creation, predictive analytics, and algorithm optimization.",
    fullDesc: "Building end-to-end Machine Learning pipelines from dataset preprocessing and feature engineering to model training, evaluation, and web integration.",
    icon: "Brain",
    features: [
      "Supervised & Unsupervised Learning Models",
      "Predictive Data Analysis & Feature Engineering",
      "Model Evaluation & Hyperparameter Tuning",
      "RESTful API Integration for ML Models"
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"]
  },
  {
    id: "service-2",
    title: "Full-Stack Software Engineering",
    shortDesc: "Responsive web interfaces integrated with custom backend REST APIs and databases.",
    fullDesc: "Developing responsive, high-performance web products using React, Flask, Node.js, and modern CSS frameworks like Tailwind.",
    icon: "Globe",
    features: [
      "RESTful Backend Microservices",
      "Responsive Glassmorphic UI Design",
      "Database Integration (SQLite / Firebase)",
      "Clean Modular Code Architecture"
    ],
    techStack: ["Flask", "React", "Tailwind CSS", "Firebase", "JavaScript"]
  }
];

export const blogPosts: BlogPost[] = [];

export const testimonials: Testimonial[] = [];

export const githubStatsData = {
  username: "jogu-muralikrishna",
  totalContributions: 280,
  currentStreak: 12,
  longestStreak: 28,
  repositoriesCount: 2,
  starsCount: 15,
  topLanguages: [
    { name: "Python", percentage: 65, color: "#3572A5" },
    { name: "JavaScript / React", percentage: 20, color: "#f1e05a" },
    { name: "C / C++", percentage: 10, color: "#f34b7d" },
    { name: "HTML / CSS", percentage: 5, color: "#563d7c" },
  ]
};
