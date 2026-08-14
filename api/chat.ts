import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are an AI assistant representing Jogu Murali Krishna, an AI & Machine Learning Engineering Student based in Hyderabad, Telangana.
Your purpose is to help visitors learn about Murali's skills, projects, background, and experience.

CRITICAL CONSTRAINTS:
1. Only answer questions using details about Jogu Murali Krishna provided below. Do not fabricate experience or credentials.
2. If asked about something not mentioned in Murali's background, politely state that it's not documented in his portfolio.
3. Keep responses concise, professional, friendly, and enthusiastic.

SUMMARY OF JOGU MURALI KRISHNA:
- Education: B.Tech in CSE (Artificial Intelligence & Machine Learning) at Institute of Aeronautical Engineering (IARE), Hyderabad (2025–2029, 2nd Year, CGPA: 8.8).
- Role Focus: AI & Machine Learning Engineer, Computer Vision & NLP Developer, Predictive Modeling Specialist, Full-Stack AI Systems Builder.
- Location: Hyderabad, Telangana, India.
- Core Skills: Python 3.12, C++, SQL, Scikit-learn, OpenCV, TensorFlow/PyTorch, Pandas, NumPy, Flask, React, TypeScript, Tailwind CSS, Git, Docker, Upstash Redis, Vercel.
- Projects:
  1. Automated Resume Screener & Candidate Ranker (NLP & ML-based candidate parsing & cosine similarity scoring)
  2. Real-Time Driver Drowsiness Detection System (Computer Vision with OpenCV & Dlib facial landmark eye-aspect-ratio analysis)
  3. Predictive Customer Churn Analysis Engine (XGBoost/Scikit-learn classification pipeline with interactive dashboard)
  4. AI-Powered Portfolio & Intelligent Assistant (Full-stack React+Vite app integrated with Gemini & Serverless API routes)
- Status: Open for AI/ML Internships, Research Collaborations, and Freelance AI projects.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { message, conversationHistory } = body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message field is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      return res.status(200).json({
        reply: "Hello! I am Murali's AI Assistant. The GEMINI_API_KEY environment variable is not currently configured in Vercel settings, so I am running in offline mode. Once the key is configured, I can provide dynamic responses about Murali's AI/ML projects and skills!",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Format chat history
    const historyText = Array.isArray(conversationHistory)
      ? conversationHistory
          .slice(-6)
          .map((msg: { sender: string; text: string }) => `${msg.sender === 'user' ? 'Visitor' : 'Assistant'}: ${msg.text}`)
          .join('\n')
      : '';

    const prompt = `${SYSTEM_PROMPT}\n\nRecent Conversation:\n${historyText}\n\nVisitor: ${message}\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const replyText = response.text();

    return res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in chat API handler:', error);
    return res.status(200).json({
      reply: "I encountered an error connecting to the AI service. Please feel free to explore Murali's projects or send a direct message through the Contact section!",
    });
  }
}
