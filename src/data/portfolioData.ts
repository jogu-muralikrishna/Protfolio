import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Jogu Murali Krishna',
    role: 'AI & Machine Learning Engineering Student',
    tagline: 'Architecting intelligent algorithms, computer vision pipelines, and full-stack AI solutions.',
    bio: 'Passionate 2nd-year B.Tech CSE (AI & ML) student at Institute of Aeronautical Engineering, Hyderabad. Dedicated to building performant machine learning models, computer vision systems, and modern web interfaces integrated with generative AI.',
    location: 'Hyderabad, Telangana',
    email: 'jogumuralikrishna@gmail.com',
    phone: '+91 98765 43210',
    status: 'Available for AI/ML Internships & Projects',
    education: [
      {
        degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
        institution: 'Institute of Aeronautical Engineering (IARE)',
        location: 'Hyderabad, Telangana',
        period: '2025 – 2029 (2nd Year)',
        score: '8.8 CGPA',
        highlights: [
          'Specializing in Deep Learning, Computer Vision, Data Structures, and Predictive Analytics.',
          'Active participant in AI hackathons and algorithmic programming platforms.',
          'Consistently maintaining high academic standing with an 8.8 CGPA.',
        ],
      },
    ],
    socials: {
      github: 'https://github.com/jogumuralikrishna',
      linkedin: 'https://linkedin.com/in/jogumuralikrishna',
      leetcode: 'https://leetcode.com/jogumuralikrishna',
      geeksforgeeks: 'https://geeksforgeeks.org/user/jogumuralikrishna',
    },
    resumeUrl: '/resume.pdf',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },

  roles: [
    'AI & Machine Learning Engineer',
    'Computer Vision & NLP Developer',
    'Predictive Modeling Specialist',
    'Full-Stack AI Systems Builder',
  ],

  stats: [
    { label: 'Academic CGPA', value: '8.8', suffix: '/10' },
    { label: 'AI/ML Projects Built', value: '12', suffix: '+' },
    { label: 'Algorithms Solved', value: '250', suffix: '+' },
    { label: 'System Uptime / Precision', value: '99', suffix: '%' },
  ],

  skills: [
    // Languages
    { name: 'Python 3.12', level: 92, category: 'Languages', status: 'Mastered' },
    { name: 'C++', level: 85, category: 'Languages', status: 'Mastered' },
    { name: 'TypeScript / JavaScript', level: 88, category: 'Languages', status: 'Proficient' },
    { name: 'SQL', level: 84, category: 'Languages', status: 'Proficient' },

    // AI & ML
    { name: 'Scikit-learn', level: 90, category: 'AI & ML', status: 'Mastered' },
    { name: 'OpenCV & Computer Vision', level: 86, category: 'AI & ML', status: 'Mastered' },
    { name: 'Pandas & NumPy', level: 92, category: 'AI & ML', status: 'Mastered' },
    { name: 'TensorFlow / PyTorch', level: 75, category: 'AI & ML', status: 'Learning' },
    { name: 'NLP & HuggingFace', level: 80, category: 'AI & ML', status: 'Proficient' },

    // Web & Databases
    { name: 'React 18 & Vite', level: 88, category: 'Web & Databases', status: 'Mastered' },
    { name: 'Tailwind CSS v3', level: 90, category: 'Web & Databases', status: 'Mastered' },
    { name: 'Flask / FastAPI', level: 82, category: 'Web & Databases', status: 'Proficient' },
    { name: 'Upstash Redis & MongoDB', level: 78, category: 'Web & Databases', status: 'Proficient' },

    // Tools
    { name: 'Git & GitHub', level: 88, category: 'Tools', status: 'Mastered' },
    { name: 'Vercel / Cloud Deploy', level: 85, category: 'Tools', status: 'Mastered' },
    { name: 'Docker Containers', level: 72, category: 'Tools', status: 'Learning' },
    { name: 'Jupyter & Google Colab', level: 92, category: 'Tools', status: 'Mastered' },
  ],

  projects: [
    {
      id: 'automated-resume-screener',
      title: 'Automated Resume Screener & Candidate Ranker',
      shortDescription: 'AI-driven candidate matching engine utilizing Natural Language Processing and cosine similarity scoring.',
      fullDescription: 'An intelligent recruitment tool that automatically parses PDF/DOCX resumes, extracts key technical skills, experience metrics, and education details, and computes Semantic TF-IDF and BERT embedding vector similarity against custom job descriptions to rank candidates objectively.',
      category: 'AI/ML',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
      tags: ['Python', 'NLP', 'Scikit-learn', 'Flask', 'React', 'TF-IDF'],
      githubUrl: 'https://github.com/jogumuralikrishna/resume-screener-ai',
      demoUrl: 'https://resume-screener-ai.vercel.app',
      featured: true,
      problem: 'Recruiters spend hundreds of manual hours filtering resumes with low accuracy and high subconscious bias.',
      solution: 'Built an NLP pipeline leveraging scikit-learn TF-IDF vectorizer and cosine similarity metrics to automatically rank 500+ candidates in under 5 seconds.',
      architecture: [
        'Frontend: React 18, TypeScript, Tailwind CSS, Framer Motion',
        'Backend: Flask REST API, NLTK, Spacy NLP Engine',
        'Database: Upstash Redis for cached candidate similarity vectors',
      ],
      keyFeatures: [
        'Automated PDF/DOCX document text extraction',
        'Skill taxonomy matching across 200+ tech stacks',
        'Interactive similarity score dashboard with keyword breakdown',
        'Exportable candidate ranking reports in CSV/PDF format',
      ],
      challengesSolved: [
        'Handled unstructured PDF text formatting anomalies using regex fallback mechanisms.',
        'Optimized vector computation time by batching TF-IDF matrix multiplications.',
      ],
      metrics: [
        { label: 'Parsing Speed', value: '< 1.2s' },
        { label: 'Match Accuracy', value: '94.5%' },
        { label: 'Time Saved', value: '85%' },
      ],
      futureImprovements: [
        'Integrate LLM-based soft skills evaluation using Gemini 1.5 Pro API.',
        'Add support for multi-language resume parsing.',
      ],
    },
    {
      id: 'drowsiness-detection-system',
      title: 'Real-Time Driver Drowsiness Detection System',
      shortDescription: 'Computer Vision safety application tracking Eye Aspect Ratio (EAR) to prevent fatigue accidents.',
      fullDescription: 'A real-time edge computer vision monitor that analyzes facial landmarks using OpenCV and Dlib. It continuously measures the Eye Aspect Ratio (EAR) and mouth gaping metrics to issue immediate audio-visual alert triggers when eye closure exceeds physiological thresholds.',
      category: 'Computer Vision',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
      tags: ['Python', 'OpenCV', 'Dlib', 'Computer Vision', 'Pygame Alerts'],
      githubUrl: 'https://github.com/jogumuralikrishna/drowsiness-detection-cv',
      demoUrl: '',
      featured: true,
      problem: 'Driver fatigue causes over 20% of serious highway accidents worldwide due to delayed reaction times.',
      solution: 'Engineered an OpenCV camera feed analyzer that tracks 68 facial landmarks in real time and calculates Eye Aspect Ratio (EAR) continuously.',
      architecture: [
        'Video Processing: OpenCV 4 webcam stream pipeline',
        'Facial Detection: Dlib 68-point shape predictor',
        'Alert Logic: Multi-frame EAR thresholding with Pygame audio triggers',
      ],
      keyFeatures: [
        'Real-time webcam facial landmark detection at 30+ FPS',
        'Instant audio siren trigger upon detecting closed eyes for > 1.5 seconds',
        'Head tilt & yawn duration tracking for comprehensive fatigue scoring',
        'Low-light enhancement mode using CLAHE histogram equalization',
      ],
      challengesSolved: [
        'Reduced false positives caused by natural eye blinking by enforcing multi-frame temporal confirmation.',
        'Maintained 30 FPS processing on CPU devices by cropping frames to detected face bounding boxes.',
      ],
      metrics: [
        { label: 'Frame Rate', value: '35 FPS' },
        { label: 'Detection Accuracy', value: '96.2%' },
        { label: 'Latency', value: '< 40ms' },
      ],
      futureImprovements: [
        'Deploy model to Raspberry Pi zero with edge TPU acceleration.',
        'Integrate infrared camera stream support for night driving.',
      ],
    },
    {
      id: 'customer-churn-predictor',
      title: 'Predictive Customer Churn Analysis Engine',
      shortDescription: 'Supervised Machine Learning pipeline for telecom churn prediction with interactive risk scoring.',
      fullDescription: 'A machine learning system engineered with XGBoost, LightGBM, and Random Forest classification models to predict customer churn probabilities in telecom and SaaS subscriptions. Includes automated feature engineering, SHAP explainability graphs, and risk mitigation recommendations.',
      category: 'AI/ML',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      tags: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Streamlit', 'SHAP'],
      githubUrl: 'https://github.com/jogumuralikrishna/customer-churn-ml',
      demoUrl: 'https://customer-churn-ml.streamlit.app',
      featured: true,
      problem: 'Subscription businesses suffer silent customer attrition without early intervention warning indicators.',
      solution: 'Trained an ensemble ML classification model achieving 89.2% ROC-AUC on 10,000+ customer records to flag high-risk accounts prior to cancellation.',
      architecture: [
        'ML Pipeline: Scikit-learn Pipelines, XGBoost Classifier',
        'Explainability: SHAP (SHapley Additive exPlanations) values generator',
        'Dashboard: Streamlit interactive analytics UI',
      ],
      keyFeatures: [
        'Automated data cleaning, one-hot encoding, and standard scaling',
        'SHAP feature importance plots explaining why specific customers churn',
        'Custom risk score thresholds tailored to business retention budgets',
        'Batch CSV customer scoring with automated alert tagging',
      ],
      challengesSolved: [
        'Resolved severe class imbalance (80:20 non-churn vs churn) using SMOTE oversampling techniques.',
        'Prevented data leakage by embedding scaling and encoding inside cross-validation pipelines.',
      ],
      metrics: [
        { label: 'ROC-AUC Score', value: '0.892' },
        { label: 'Precision', value: '87.4%' },
        { label: 'Recall', value: '84.1%' },
      ],
      futureImprovements: [
        'Incorporate time-series survival analysis models (Cox Proportional Hazards).',
        'Add automated email outreach webhook triggers for high-risk customer tiers.',
      ],
    },
    {
      id: 'ai-portfolio-assistant',
      title: 'Intelligent AI Portfolio & Interactive Assistant',
      shortDescription: 'Dark-glass modern React portfolio with Gemini-backed AI chat widget & serverless backend.',
      fullDescription: 'A full-stack web portfolio built with React 18, TypeScript, Vite 5, Tailwind CSS v3, and Framer Motion. Features a custom Gemini AI chatbot serverless route (`api/chat.ts`) and an Upstash Redis-backed contact form (`api/contact.ts`).',
      category: 'Web Apps',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Gemini API', 'Upstash Redis'],
      githubUrl: 'https://github.com/jogumuralikrishna/ai-portfolio',
      demoUrl: 'https://jogumuralikrishna.vercel.app',
      featured: true,
      problem: 'Static portfolio websites lack interactive engagement and real-time query resolution for prospective recruiters.',
      solution: 'Created an intelligent dark-glass React application backed by serverless Gemini AI routes that answers visitor queries about skills and projects in real time.',
      architecture: [
        'Frontend: React 18, TypeScript, Tailwind CSS v3, Framer Motion v11, Lucide React',
        'Serverless APIs: Vercel Functions (/api/chat.ts, /api/contact.ts)',
        'Database & AI: Upstash Redis for message storage, Google Gemini 1.5 Flash API',
      ],
      keyFeatures: [
        'AI dark glass UI theme with dynamic glow orbs and custom cursor follower',
        'Typewriter role animation with blinking cursor block',
        'Gemini-powered chatbot widget with graceful fallback mode',
        'Upstash Redis contact form persistence with protected admin endpoint',
      ],
      challengesSolved: [
        'Eliminated native binary Vercel deployment failures by using Tailwind CSS v3 with PostCSS.',
        'Guaranteed zero downtime when API keys are absent by building resilient fallback state handlers.',
      ],
      metrics: [
        { label: 'Lighthouse Score', value: '98/100' },
        { label: 'First Contentful Paint', value: '0.6s' },
        { label: 'Deploy Errors', value: '0' },
      ],
      futureImprovements: [
        'Add voice-to-text input capability for the AI chat widget.',
        'Integrate GitHub API live commit graph activity widget.',
      ],
    },
  ],

  experienceHistory: [],
  certificates: [],
  achievements: [],
  testimonials: [],

  services: [
    {
      id: 'ai-ml-development',
      title: 'AI & Machine Learning Engineering',
      description: 'End-to-end development of predictive ML models, classification systems, and regression engines using Scikit-learn, XGBoost, and Python.',
      iconName: 'BrainCircuit',
      techStack: ['Python 3.12', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost', 'Jupyter'],
    },
    {
      id: 'computer-vision-solutions',
      title: 'Computer Vision & Image Processing',
      description: 'Real-time video analysis, facial landmark detection, eye aspect ratio analysis, and image classification built with OpenCV and Dlib.',
      iconName: 'Eye',
      techStack: ['OpenCV', 'Dlib', 'Python', 'Image Processing', 'CNNs'],
    },
    {
      id: 'fullstack-ai-apps',
      title: 'Full-Stack AI Web Applications',
      description: 'Interactive web frontends integrated with RESTful ML microservices, serverless API functions, and generative AI APIs.',
      iconName: 'Code2',
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Flask', 'Vercel API'],
    },
    {
      id: 'data-analytics-nlp',
      title: 'NLP & Data Science Analytics',
      description: 'Natural Language Processing text mining, TF-IDF vector similarity matching, automated document parsing, and data visualization dashboards.',
      iconName: 'BarChart3',
      techStack: ['NLTK', 'Spacy', 'TF-IDF', 'Streamlit', 'SQL', 'Data Analytics'],
    },
  ],
};
