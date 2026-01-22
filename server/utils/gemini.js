/**
 * Gemini API Integration
 * 
 * Handles communication with Google's Gemini API for chat responses.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SYSTEM_PROMPT } = require('./persona');
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the model (using gemini-pro which is widely available)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Generation config
const generationConfig = {
    temperature: 0.8,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
};

/**
 * Send a message to Gemini with conversation history
 * @param {string} message - The user's new message
 * @param {Array} history - Previous messages in Gemini format
 * @returns {Promise<string>} - The AI's response
 */
async function sendMessageWithHistory(message, history = []) {
    try {
        // Build the full prompt with system context
        const fullPrompt = `${SYSTEM_PROMPT}

User message: ${message}

Respond as the AI Digital Twin:`;

        // Use generateContent for a simple request
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
            generationConfig,
        });

        const response = result.response.text();
        return response;
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        console.error('Full error:', JSON.stringify(error, null, 2));

        // Handle specific errors
        if (error.message?.includes('API_KEY') || error.message?.includes('API key')) {
            throw new Error('Invalid or missing Gemini API key');
        }
        if (error.message?.includes('quota')) {
            throw new Error('API quota exceeded. Please try again later.');
        }
        if (error.message?.includes('not found') || error.message?.includes('404')) {
            throw new Error('Gemini model not available. Please check API key.');
        }

        throw new Error('Failed to get AI response. Please try again.');
    }
}

module.exports = {
    sendMessageWithHistory
};
