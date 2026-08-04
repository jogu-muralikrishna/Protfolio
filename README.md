# Premium Editable AI/ML Portfolio Website

A production-ready, ultra-modern personal portfolio website designed for AI/ML engineers, data scientists, and full-stack developers. Inspired by **OpenAI, Vercel, Linear, Framer, Apple, and GitHub**.

Built with **React 19, TypeScript, Tailwind CSS, Lucide Icons, and Motion**.

---

## ⚡ Master Quick Customization (No Code Required!)

You can customize all personal details, projects, skills, certificates, education, and experience in two simple ways:

### Option A: Use the In-Browser Live Data Customizer
1. Click the **"⚡ Customizer"** button in the top navigation bar or Hero section.
2. Edit your Name, Headline, Bio, Links, and Projects live on screen.
3. Click **"Copy portfolioData.ts Code"** and paste it into `/src/data/portfolioData.ts` to permanently save!

### Option B: Edit Central Data Configuration File directly
All portfolio content is stored cleanly inside a single file:
```
/src/data/portfolioData.ts
```

---

## 🖼️ How to Replace Profile Image
1. Simply place your profile photo into the public folder at:
   ```
   /public/images/profile.jpg
   ```
2. The website will automatically detect and load your profile photo!
3. If no image is provided, the website automatically falls back to a sleek vector AI avatar placeholder with your initials.

---

## 💼 How to Add or Edit Projects
Open `/src/data/portfolioData.ts` and duplicate any card inside the `projects` array:

```typescript
export const projects: Project[] = [
  {
    id: "my-new-ai-project",
    title: "Your Project Name",
    shortDescription: "Short summary for card view",
    fullDescription: "Detailed breakdown for full modal view",
    category: "AI/ML", // Options: 'AI/ML' | 'Web Apps' | 'Computer Vision' | 'NLP'
    image: "https://images.unsplash.com/photo-...",
    tags: ["Python", "PyTorch", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project",
    demoUrl: "https://your-demo-app.com",
    featured: true,
    problem: "Description of the problem solved",
    solution: "How your system solved it",
    architecture: ["Frontend details", "Backend details", "Model details"],
    keyFeatures: ["Feature 1", "Feature 2"],
    challengesSolved: ["Challenge 1 solved"],
    metrics: [{ label: "Accuracy", value: "96.5%" }],
    futureImprovements: ["Future enhancement 1"]
  }
];
```

---

## 📜 How to Add Certificates
Add objects to the `certificates` array in `portfolioData.ts`:

```typescript
export const certificates: Certificate[] = [
  {
    id: "cert-new",
    title: "AWS Certified Machine Learning Specialist",
    issuer: "Amazon Web Services",
    date: "2026",
    credentialId: "AWS-ML-12345",
    image: "https://images.unsplash.com/photo-...",
    verifyUrl: "https://aws.amazon.com/verify/12345",
    skillsCovered: ["SageMaker", "MLOps", "Model Deployment"]
  }
];
```

---

## 📄 How to Update Resume
1. Place your resume PDF in the public folder:
   ```
   /public/resume.pdf
   ```
2. Update the `resumeUrl` field in `portfolioData.ts`:
   ```typescript
   export const personalInfo = {
     ...
     resumeUrl: "/resume.pdf"
   }
   ```

---

## 🎨 How to Customize Accent Colors & Styling
All theme styling uses Tailwind CSS classes. You can adjust accent gradient overlays in `/src/data/portfolioData.ts` or customize the main CSS file at `/src/index.css`.

Default Color Palette:
- **Background**: `#050816` (Deep Cyber Dark)
- **Primary Accents**: Blue (`#2563EB`), Purple (`#7C3AED`), Cyan (`#06B6D4`)
- **Glow Borders**: Glassmorphism cards with `border-white/10` and `hover:border-cyan-500/40`

---

## 🚀 How to Deploy

### Option 1: Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel.com](https://vercel.com) -> **Add New Project**.
3. Import your repository. Vercel automatically detects Vite + React.
4. Click **Deploy**!

### Option 2: Deploy to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. Add build and deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`.

### Option 3: Deploy to Netlify
1. Connect your GitHub repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 🛠️ Local Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run dev server
npm run dev
```

Server runs on `http://localhost:3000`.

---

## 📄 License
Licensed under Apache 2.0. Built with React 19, TypeScript, and Tailwind CSS.
