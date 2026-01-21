// Test gemini-2.5-flash model
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test25() {
    console.log('Testing gemini-2.5-flash...\n');

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent('Say "Hello!" in 3 words max.');
        console.log('✅ SUCCESS! Response:', result.response.text());
    } catch (error) {
        console.error('❌ ERROR:', error.message?.slice(0, 200));
    }
}

test25();
