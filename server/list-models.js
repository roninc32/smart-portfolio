// Quick script to list available Gemini models for your API key
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    console.log('API Key:', process.env.GEMINI_API_KEY?.slice(0, 10) + '...');
    console.log('\nFetching available models...\n');

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
        );
        const data = await response.json();

        if (data.error) {
            console.error('Error:', data.error.message);
            return;
        }

        console.log('Available models:');
        data.models?.forEach(model => {
            console.log(`  - ${model.name} (${model.displayName})`);
        });
    } catch (error) {
        console.error('Failed:', error.message);
    }
}

listModels();
