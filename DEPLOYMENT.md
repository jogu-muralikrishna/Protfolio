# Deployment Guide — Vercel

This project is a static Vite + React site with one serverless API route
(`/api/chat`) for the AI assistant widget. It deploys to Vercel with zero
extra configuration.

## 1. Push to GitHub (recommended)

```bash
git init
git add .
git commit -m "Portfolio ready for Vercel"
git branch -M main
git remote add origin https://github.com/jogu-muralikrishna/<your-repo-name>.git
git push -u origin main
```

Then in Vercel: **New Project -> Import Git Repository -> select the repo -> Deploy**.
Vercel auto-detects Vite from `vercel.json` — no build settings to change.

## 2. Or deploy directly from this folder (Vercel CLI)

```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

## 3. Environment variables

In **Vercel -> Project -> Settings -> Environment Variables**, add:

| Name | Value | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Gemini API key from https://aistudio.google.com/apikey | Optional — without it, `/api/chat` returns a friendly "not configured" message instead of erroring |

## 4. Adding your real assets

- Profile photo: add a file at `assets/profile.jpg`
- Resume PDF: add a file at `assets/resume.pdf`

Until these exist, the site correctly shows upload placeholders instead of
generating fake ones (per the project's content rules).

## 5. Local development

```bash
npm install
npm run dev       # Vite dev server (frontend only)
```

The `/api/chat` route only runs as a Vercel Function — to test it locally,
use the Vercel CLI instead of `npm run dev`:

```bash
vercel dev
```

## What changed from the AI Studio export

- Removed `server.ts` (Express) — Vercel doesn't run a long-lived Node
  server for static+serverless projects.
- Added `api/chat.ts` — the same AI assistant logic, converted to a Vercel
  serverless function. Also fixed the model name (`gemini-3.6-flash` isn't
  a real Gemini model; switched to `gemini-2.0-flash`).
- Removed the old `/api/resume/download` endpoint, which served a
  hardcoded, fabricated resume unrelated to `src/data/portfolioData.ts`
  (wrong email, wrong GitHub/LinkedIn, invented project results).
  The in-app Resume modal already generates resume text correctly from
  your real data — use that, or upload a real `assets/resume.pdf`.
