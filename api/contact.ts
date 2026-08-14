import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Protected Admin messages view
  if (req.method === 'GET') {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || adminPassword.trim() === '') {
      return res.status(503).json({
        error: 'Service Unavailable: ADMIN_PASSWORD environment variable is not configured on the server.',
      });
    }

    const authHeader = req.headers.authorization || req.headers['x-admin-password'] || req.query.password;
    const providedToken = typeof authHeader === 'string' ? authHeader.replace(/^Bearer\s+/i, '').trim() : '';

    if (providedToken !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin credentials.' });
    }

    // Fetch stored contact messages from Upstash if configured
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      return res.status(200).json({
        messages: [],
        note: 'Upstash Redis environment variables are not set. No persisted messages found.',
      });
    }

    try {
      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });

      const keys = await redis.keys('contact:*');
      if (!keys || keys.length === 0) {
        return res.status(200).json({ messages: [] });
      }

      const messages = await Promise.all(
        keys.map(async (key) => {
          const data = await redis.hgetall(key);
          return { id: key, ...data };
        })
      );

      return res.status(200).json({ messages });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to retrieve messages from database.', details: err.message });
    }
  }

  // POST: Contact form submission
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { name, email, message, subject } = body;

      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required.' });
      }
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email address is required.' });
      }
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
      const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

      const submission = {
        name: name.trim(),
        email: email.trim(),
        subject: subject ? String(subject).trim() : 'General Inquiry',
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      if (redisUrl && redisToken) {
        const redis = new Redis({
          url: redisUrl,
          token: redisToken,
        });

        const entryId = `contact:${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        await redis.hset(entryId, submission);
      } else {
        console.log('Contact submission received (Upstash Redis env not configured):', submission);
      }

      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! Murali will get back to you shortly.',
      });
    } catch (error: any) {
      console.error('Error handling contact form:', error);
      return res.status(500).json({
        error: 'An internal server error occurred while sending your message. Please try again or reach out directly via email.',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
