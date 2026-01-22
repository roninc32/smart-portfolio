/**
 * Chat API Route
 * POST /api/chat
 * 
 * Handles chat messages with AI responses using Gemini.
 */

const { sendMessageWithHistory } = require('./lib/gemini');

// Simple in-memory rate limiting (per serverless instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 15; // requests per window

function checkRateLimit(ip) {
    const now = Date.now();
    const userData = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

    if (now > userData.resetTime) {
        userData.count = 0;
        userData.resetTime = now + RATE_LIMIT_WINDOW;
    }

    userData.count++;
    rateLimitMap.set(ip, userData);

    return userData.count <= RATE_LIMIT_MAX;
}

module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Rate limiting
        const clientIP = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                error: 'Whoa there! 🐎 Too many messages. Please wait a minute before trying again.'
            });
        }

        const { message, sessionId } = req.body;

        // Validate input
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }
        if (!sessionId || typeof sessionId !== 'string') {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        // Trim and limit message length
        const trimmedMessage = message.trim().slice(0, 1000);
        if (!trimmedMessage) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }

        // Get AI response (no history persistence in serverless without DB)
        const aiResponse = await sendMessageWithHistory(trimmedMessage, []);

        // Return response
        return res.status(200).json({
            response: aiResponse,
            sessionId: sessionId
        });

    } catch (error) {
        console.error('Chat Error:', error);
        return res.status(500).json({
            error: error.message || 'Something went wrong. Please try again.'
        });
    }
};
