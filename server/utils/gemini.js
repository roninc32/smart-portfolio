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

// List available models on startup
async function listAvailableModels() {
    console.log('Fetching available Gemini models...');
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        const data = await response.json();

        if (data.error) {
            console.error('Model list error:', data.error.message);
            return null;
        }

        console.log('Available models:');
        const generateModels = [];
        data.models?.forEach(model => {
            if (model.supportedGenerationMethods?.includes('generateContent')) {
                console.log(`  ✓ ${model.name}`);
                generateModels.push(model.name);
            }
        });
        return generateModels;
    } catch (error) {
        console.error('Failed to list models:', error.message);
        return null;
    }
}

// Call on startup
listAvailableModels().then(models => {
    if (models && models.length > 0) {
        console.log(`Using first available model: ${models[0]}`);
    }
});

// Get the model - using gemini-2.5-flash which is available
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
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

        // Build prompt with system instruction inline
        const fullPrompt = `${SYSTEM_PROMPT}

User: ${message}

Respond naturally as Ronin's AI twin:`;

        console.log('Making Gemini API request...');

        // Use generateContent directly
        const result = await model.generateContent(fullPrompt);
        const response = result.response.text();

        console.log('Gemini response received successfully');
        return response;
    } catch (error) {
        console.error('Gemini API Error:', error.message);

        // Handle specific errors
        if (error.message?.includes('API_KEY') || error.message?.includes('API key') || !apiKey) {
            throw new Error('Invalid or missing Gemini API key.');
        }
        if (error.message?.includes('quota')) {
            throw new Error('API quota exceeded. Please try again later.');
        }
        if (error.message?.includes('not found') || error.message?.includes('404')) {
            throw new Error(`Model not available. Check Koyeb logs for available models.`);
        }

        throw new Error('Failed to get AI response. Please try again.');
    }
}

module.exports = {
    sendMessageWithHistory
};
