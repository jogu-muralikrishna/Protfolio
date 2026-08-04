import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are "Murali AI", the personal intelligent AI Assistant on the portfolio website of Jogu Murali Krishna.
Jogu Murali Krishna is a B.Tech CSE (Artificial Intelligence & Machine Learning) student at the
Institute of Aeronautical Engineering, Hyderabad, India.

Only answer using information the visitor can already see on the portfolio site
(About, Skills, Projects, Certificates, Achievements, Experience & Education, Contact sections).
If you don't know something because it isn't on the site, say so honestly instead of inventing details.
Never state statistics, project outcomes, links, or credentials that are not present on the page.

Persona: professional, confident, concise, and helpful to recruiters and visitors.
Keep answers under 3 short paragraphs unless asked for more detail.
`;

let genAI: GoogleGenerativeAI | null = null;
function getGenAI(): GoogleGenerativeAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // keep as is
      }
    }

    const { message, conversationHistory } = body ?? {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGenAI();

    if (!ai) {
      return res.status(200).json({
        reply:
          "The AI assistant isn't configured yet — set a GEMINI_API_KEY environment variable in the Vercel project settings to enable live answers. In the meantime, feel free to explore the Projects, Skills, and Contact sections directly!",
        mode: 'unconfigured',
      });
    }

    let promptText = `${SYSTEM_PROMPT}\n\nUser Question: ${message}`;
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      const historyStr = conversationHistory
        .map((h: { sender: string; text: string }) => `${h.sender}: ${h.text}`)
        .join('\n');
      promptText = `${SYSTEM_PROMPT}\n\nRecent Chat History:\n${historyStr}\n\nUser Question: ${message}`;
    }

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const reply = response.text() || "Sorry, I couldn't generate a response right now.";

    return res.status(200).json({ reply, mode: 'gemini' });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to generate AI response',
      message: error?.message ?? 'Unknown error',
    });
  }
}
