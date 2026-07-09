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

// Define the sendResume tool
const sendResumeTool = {
    name: "sendResume",
    description: "Sends Ronin's resume to the user's email address via an external webhook.",
    parameters: {
        type: "OBJECT",
        properties: {
            emailAddress: {
                type: "STRING",
                description: "The email address to send the resume to."
            }
        },
        required: ["emailAddress"]
    }
};

// Get the model
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
    tools: [{ functionDeclarations: [sendResumeTool] }],
    toolConfig: { functionCallingConfig: { mode: "AUTO" } }
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

        // Start chat with history
        const chat = model.startChat({
            history: history,
            generationConfig: generationConfig
        });

        console.log('Sending message to Gemini...');
        let result = await chat.sendMessage(message);

        // Check if the model decided to call a function
        const functionCalls = result.response.functionCalls();
        if (functionCalls && functionCalls.length > 0) {
            const call = functionCalls[0];
            
            if (call.name === "sendResume") {
                const email = call.args.emailAddress;
                console.log(`Model requested to send resume to: ${email}`);
                
                try {
                    const webhookUrl = process.env.N8N_WEBHOOK_URL;
                    if (!webhookUrl) {
                        throw new Error("N8N_WEBHOOK_URL is not configured in .env");
                    }
                    
                    // Trigger the n8n webhook
                    const webhookResponse = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    });
                    
                    const responseData = webhookResponse.ok ? 
                        "Successfully sent the resume to " + email : 
                        "Failed to send the resume. The webhook returned an error.";
                        
                    // Send the function response back to the model
                    result = await chat.sendMessage([{
                        functionResponse: {
                            name: "sendResume",
                            response: { result: responseData }
                        }
                    }]);
                } catch (webhookError) {
                    console.error("Webhook Error:", webhookError);
                    // Tell the model it failed
                    result = await chat.sendMessage([{
                        functionResponse: {
                            name: "sendResume",
                            response: { error: webhookError.message || "Failed to trigger webhook" }
                        }
                    }]);
                }
            }
        }

        return result.response.text();
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
