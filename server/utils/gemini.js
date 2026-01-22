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

// Get the model - using gemini-1.5-flash which is the current recommended model
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_PROMPT,
});

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

        console.log('Making Gemini API request with model: gemini-1.5-flash');

        // Start a chat session with history
        const chat = model.startChat({
            generationConfig,
            history: history,
        });

        // Send the new message
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        console.log('Gemini response received successfully');
        return response;
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        console.error('Error status:', error.status);

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
