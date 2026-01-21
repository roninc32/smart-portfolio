/**
 * Chat API Routes
 * 
 * Handles chat messages with context-aware AI responses.
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { sendMessageWithHistory } = require('../utils/gemini');

/**
 * POST /api/chat
 * Send a message and get an AI response
 * 
 * Body: { message: string, sessionId: string }
 * Response: { response: string, sessionId: string }
 */
router.post('/', async (req, res) => {
    try {
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

        // Fetch last 10 messages for context
        const historyResult = await pool.query(
            `SELECT message_content, sender_type FROM chats
       WHERE session_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
            [sessionId]
        );

        // Convert to Gemini history format (reverse for chronological order)
        const history = historyResult.rows.reverse().map(row => ({
            role: row.sender_type === 'user' ? 'user' : 'model',
            parts: [{ text: row.message_content }]
        }));

        // Save user message to database
        await pool.query(
            `INSERT INTO chats (session_id, message_content, sender_type)
       VALUES ($1, $2, 'user')`,
            [sessionId, trimmedMessage]
        );

        // Get AI response with context
        const aiResponse = await sendMessageWithHistory(trimmedMessage, history);

        // Save AI response to database
        await pool.query(
            `INSERT INTO chats (session_id, message_content, sender_type)
       VALUES ($1, $2, 'ai')`,
            [sessionId, aiResponse]
        );

        // Return response
        res.json({
            response: aiResponse,
            sessionId: sessionId
        });

    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({
            error: error.message || 'Something went wrong. Please try again.'
        });
    }
});

/**
 * GET /api/chat/history/:sessionId
 * Get chat history for a session (optional endpoint for debugging)
 */
router.get('/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        const result = await pool.query(
            `SELECT id, message_content, sender_type, created_at 
       FROM chats 
       WHERE session_id = $1 
       ORDER BY created_at ASC`,
            [sessionId]
        );

        res.json({ messages: result.rows });
    } catch (error) {
        console.error('History Error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

module.exports = router;
