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

// Model configuration
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_PROMPT,
});

// Generation config
const generationConfig = {
    temperature: 0.8,  // Slightly creative but consistent
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
        // Start a chat session with history
        const chat = model.startChat({
            generationConfig,
            history: history,
        });

        // Send the new message
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return response;
    } catch (error) {
        console.error('Gemini API Error:', error);

        // Handle specific errors
        if (error.message?.includes('API_KEY')) {
            throw new Error('Invalid or missing Gemini API key');
        }
        if (error.message?.includes('quota')) {
            throw new Error('API quota exceeded. Please try again later.');
        }

        throw new Error('Failed to get AI response. Please try again.');
    }
}

module.exports = {
    sendMessageWithHistory
};
