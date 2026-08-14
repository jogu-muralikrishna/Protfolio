# Jogu Murali Krishna - Full-Stack AI Portfolio

Full-stack dark-glass portfolio website built with **React 18 + TypeScript + Vite 5 + Tailwind CSS v3** and Vercel Serverless Functions.

## 🚀 Tech Stack
- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS v3, Framer Motion v11, Lucide Icons
- **Serverless Backend (Vercel Functions under `/api`)**:
  - `api/chat.ts`: Gemini 1.5 Flash AI Assistant route
  - `api/contact.ts`: Upstash Redis contact form persistence & protected admin route

## 🛠 Local Setup
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Check TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build
```

## 🌐 Vercel Deployment Instructions
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) -> **Import Repository**.
3. Vercel automatically detects `vite` framework and sets output directory to `dist`.
4. (Optional) Set Environment Variables in Vercel settings:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
   - `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST Token
   - `ADMIN_PASSWORD`: Password for `/api/contact` admin endpoint
5. Click **Deploy**.
