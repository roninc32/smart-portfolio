/**
 * Chat API Routes
 * 
 * Handles chat messages with context-aware AI responses.
 * Works with or without database connection.
 */

const express = require('express');
const router = express.Router();
const { isConnected, safeQuery } = require('../config/db');
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

        // Fetch last 10 messages for context (if DB is available)
        let history = [];
        if (isConnected()) {
            try {
                const historyResult = await safeQuery(
                    `SELECT message_content, sender_type FROM chats
                     WHERE session_id = $1
                     ORDER BY created_at DESC
                     LIMIT 10`,
                    [sessionId]
                );

                // Convert to Gemini history format (reverse for chronological order)
                history = historyResult.rows.reverse().map(row => ({
                    role: row.sender_type === 'user' ? 'user' : 'model',
                    parts: [{ text: row.message_content }]
                }));
            } catch (dbError) {
                console.warn('Could not fetch history:', dbError.message);
            }
        }

        // Save user message to database (if available)
        if (isConnected()) {
            try {
                await safeQuery(
                    `INSERT INTO chats (session_id, message_content, sender_type)
                     VALUES ($1, $2, 'user')`,
                    [sessionId, trimmedMessage]
                );
            } catch (dbError) {
                console.warn('Could not save user message:', dbError.message);
            }
        }

        // Get AI response with context
        const aiResponse = await sendMessageWithHistory(trimmedMessage, history);

        // Save AI response to database (if available)
        if (isConnected()) {
            try {
                await safeQuery(
                    `INSERT INTO chats (session_id, message_content, sender_type)
                     VALUES ($1, $2, 'ai')`,
                    [sessionId, aiResponse]
                );
            } catch (dbError) {
                console.warn('Could not save AI response:', dbError.message);
            }
        }

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

        if (!isConnected()) {
            return res.json({ messages: [], note: 'Database not available' });
        }

        const result = await safeQuery(
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
