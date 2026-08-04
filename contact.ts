import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const LIST_KEY = 'contact_messages';
const ADMIN_PASSWORD = 'Murali@93927';

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (redisClient) return redisClient;

  // Support all Upstash & Vercel KV environment variable naming standards
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_URL ||
    process.env.REST_URL;

  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_TOKEN ||
    process.env.REST_TOKEN;

  if (!url || !token) return null;

  try {
    redisClient = new Redis({ url, token });
    return redisClient;
  } catch (err) {
    console.error('Failed to initialize Upstash Redis:', err);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS & Header Handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const redis = getRedis();

  // Save a new message
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          // keep original body if JSON parse fails
        }
      }

      const { name, email, subject, message } = body ?? {};

      if (!name || !email || !message) {
        return res.status(400).json({
          error: 'Missing fields',
          message: 'Name, email, and message are required.'
        });
      }

      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        subject: subject ? String(subject).slice(0, 300) : '',
        message: String(message).slice(0, 5000),
        receivedAt: new Date().toISOString(),
      };

      if (redis) {
        await redis.lpush(LIST_KEY, JSON.stringify(entry));
        await redis.ltrim(LIST_KEY, 0, 499); // Keep latest 500 messages
      }

      return res.status(200).json({
        success: true,
        entry,
        redisStored: Boolean(redis)
      });
    } catch (error: any) {
      console.error('Error saving contact message:', error);
      return res.status(500).json({
        error: 'Failed to save message',
        message: error?.message || 'Internal server error'
      });
    }
  }

  // Retrieve messages (password-protected)
  if (req.method === 'GET') {
    try {
      const password = req.headers['x-admin-password'] || req.query?.password;
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Incorrect admin password.' });
      }

      if (!redis) {
        return res.status(200).json({
          messages: [],
          redisConfigured: false,
          notice: 'Redis storage not connected in Vercel yet.'
        });
      }

      const raw = await redis.lrange<string>(LIST_KEY, 0, 499);
      const messages = raw
        .map((item) => {
          try {
            return typeof item === 'string' ? JSON.parse(item) : item;
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      return res.status(200).json({
        messages,
        redisConfigured: true
      });
    } catch (error: any) {
      console.error('Error fetching contact messages:', error);
      return res.status(500).json({
        error: 'Failed to fetch messages',
        message: error?.message || 'Internal server error'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
