/**
 * Gemini API Integration
 * 
 * Handles communication with Google's Gemini API for chat responses.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SYSTEM_PROMPT } = require('./persona');
require('dotenv').config();

// Debug: Check if API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
console.log('Gemini API Key loaded:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');

if (!apiKey) {
    console.error('ERROR: GEMINI_API_KEY environment variable is not set!');
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey || 'dummy-key');

// Get the model - trying different format
const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

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
        // Check API key before making request
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not configured');
        }

        // Build the full prompt with system context
        const fullPrompt = `${SYSTEM_PROMPT}

User message: ${message}

Respond as the AI Digital Twin:`;

        console.log('Making Gemini API request...');

        // Use generateContent for a simple request
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
            generationConfig,
        });

        const response = result.response.text();
        console.log('Gemini response received successfully');
        return response;
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        console.error('Error status:', error.status);
        console.error('Error details:', error.errorDetails);

        // Handle specific errors
        if (error.message?.includes('API_KEY') || error.message?.includes('API key') || !apiKey) {
            throw new Error('Invalid or missing Gemini API key. Please check GEMINI_API_KEY in Koyeb.');
        }
        if (error.message?.includes('quota')) {
            throw new Error('API quota exceeded. Please try again later.');
        }
        if (error.message?.includes('not found') || error.message?.includes('404')) {
            throw new Error(`Gemini model error: ${error.message}`);
        }

        throw new Error('Failed to get AI response. Please try again.');
    }
}

module.exports = {
    sendMessageWithHistory
};
